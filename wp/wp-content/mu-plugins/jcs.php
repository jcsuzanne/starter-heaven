<?php
/**
 * @package JCS
 * @version 1.0
 */
/*
Plugin Name: JCS
Description: Plugin to set up custom elements for JCS Website
Author: Jean-Christophe Suzanne
Version: 1.0
Author URI: http://www.jcsuzanne.com
*/

// Add excerpt to page //
function my_add_excerpts_to_pages() {
     add_post_type_support( 'page', 'excerpt' );
}
add_action( 'init', 'my_add_excerpts_to_pages' );


function flushcache( ) {
    // global $wpdb;
    $link = home_url().'/flushcache';
    wp_remote_get($link);
}
add_action( 'save_post', 'flushcache' );
add_action('wp_insert_comment','flushcache');
add_action('acf/save_post', 'flushcache' , 15);

// AUTHORIZE SVG
function cc_mime_types($mimes) {
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');

// Disable Resize for Gif
function disable_upload_sizes( $sizes, $metadata ) {

    // Get filetype data.
    $filetype = wp_check_filetype($metadata['file']);

    // Check if is gif.
    if($filetype['type'] == 'image/gif') {
        // Unset sizes if file is gif.
        $sizes = array();
    }

    // Return sizes you want to create from image (None if image is gif.)
    return $sizes;
}
add_filter('intermediate_image_sizes_advanced', 'disable_upload_sizes', 10, 2);

/**
 * Set the Attachment Display Settings "Size To" default to "Full"
 *
 * This function is attached to the 'after_setup_theme' action hook.
 */
function default_attachment_display_settings() {
	update_option( 'image_default_size', 'full' );
}
add_action( 'after_setup_theme', 'default_attachment_display_settings' );


/**
 * Builds the Video shortcode output.
 *
 * This implements the functionality of the Video Shortcode for displaying
 * WordPress mp4s in a post.
 *
 * @since 3.6.0
 *
 * @global int $content_width
 * @staticvar int $instance
 *
 * @param array  $attr {
 *     Attributes of the shortcode.
 *
 *     @type string $src      URL to the source of the video file. Default empty.
 *     @type int    $height   Height of the video embed in pixels. Default 360.
 *     @type int    $width    Width of the video embed in pixels. Default $content_width or 640.
 *     @type string $poster   The 'poster' attribute for the `<video>` element. Default empty.
 *     @type string $loop     The 'loop' attribute for the `<video>` element. Default empty.
 *     @type string $autoplay The 'autoplay' attribute for the `<video>` element. Default empty.
 *     @type string $preload  The 'preload' attribute for the `<video>` element.
 *                            Default 'metadata'.
 *     @type string $class    The 'class' attribute for the `<video>` element.
 *                            Default 'wp-video-shortcode'.
 * }
 * @param string $content Shortcode content.
 * @return string|void HTML content to display video.
 */
function wp_video_shortcode_jcs( $attr, $content = '' ) {
	global $content_width;
	$post_id = get_post() ? get_the_ID() : 0;

	static $instance = 0;
	$instance++;

	/**
	 * Filters the default video shortcode output.
	 *
	 * If the filtered output isn't empty, it will be used instead of generating
	 * the default video template.
	 *
	 * @since 3.6.0
	 *
	 * @see wp_video_shortcode()
	 *
	 * @param string $html     Empty variable to be replaced with shortcode markup.
	 * @param array  $attr     Attributes of the shortcode. @see wp_video_shortcode()
	 * @param string $content  Video shortcode content.
	 * @param int    $instance Unique numeric ID of this video shortcode instance.
	 */
	$override = apply_filters( 'wp_video_shortcode_override', '', $attr, $content, $instance );
	if ( '' !== $override ) {
		return $override;
	}

	$video = null;

	$default_types = wp_get_video_extensions();
	$defaults_atts = array(
		'src'      => '',
		'poster'   => '',
		'loop'     => '',
		'autoplay' => '',
		'preload'  => 'metadata',
		'width'    => 640,
		'height'   => 360,
		'class'    => 'wp-video-shortcode',
	);

	foreach ( $default_types as $type ) {
		$defaults_atts[$type] = '';
	}

	$atts = shortcode_atts( $defaults_atts, $attr, 'video' );

	if ( is_admin() ) {
		// shrink the video so it isn't huge in the admin
		if ( $atts['width'] > $defaults_atts['width'] ) {
			$atts['height'] = round( ( $atts['height'] * $defaults_atts['width'] ) / $atts['width'] );
			$atts['width'] = $defaults_atts['width'];
		}
	} else {
		// if the video is bigger than the theme
		if ( ! empty( $content_width ) && $atts['width'] > $content_width ) {
			$atts['height'] = round( ( $atts['height'] * $content_width ) / $atts['width'] );
			$atts['width'] = $content_width;
		}
	}

	$is_vimeo = $is_youtube = false;
	$yt_pattern = '#^https?://(?:www\.)?(?:youtube\.com/watch|youtu\.be/)#';
	$vimeo_pattern = '#^https?://(.+\.)?vimeo\.com/.*#';

	$primary = false;
	if ( ! empty( $atts['src'] ) ) {
		$is_vimeo = ( preg_match( $vimeo_pattern, $atts['src'] ) );
		$is_youtube = (  preg_match( $yt_pattern, $atts['src'] ) );
		if ( ! $is_youtube && ! $is_vimeo ) {
			$type = wp_check_filetype( $atts['src'], wp_get_mime_types() );
			if ( ! in_array( strtolower( $type['ext'] ), $default_types ) ) {
				return sprintf( '<a class="wp-embedded-video" href="%s">%s</a>', esc_url( $atts['src'] ), esc_html( $atts['src'] ) );
			}
		}

		if ( $is_vimeo ) {
		    wp_enqueue_script( 'mediaelement-vimeo' );
		}

		$primary = true;
		array_unshift( $default_types, 'src' );
	} else {
		foreach ( $default_types as $ext ) {
			if ( ! empty( $atts[ $ext ] ) ) {
				$type = wp_check_filetype( $atts[ $ext ], wp_get_mime_types() );
				if ( strtolower( $type['ext'] ) === $ext ) {
					$primary = true;
				}
			}
		}
	}

	if ( ! $primary ) {
		$videos = get_attached_media( 'video', $post_id );
		if ( empty( $videos ) ) {
			return;
		}

		$video = reset( $videos );
		$atts['src'] = wp_get_attachment_url( $video->ID );
		if ( empty( $atts['src'] ) ) {
			return;
		}

		array_unshift( $default_types, 'src' );
	}

	/**
	 * Filters the media library used for the video shortcode.
	 *
	 * @since 3.6.0
	 *
	 * @param string $library Media library used for the video shortcode.
	 */
	$library = apply_filters( 'wp_video_shortcode_library', 'mediaelement' );
	if ( 'mediaelement' === $library && did_action( 'init' ) ) {
		wp_enqueue_style( 'wp-mediaelement' );
		wp_enqueue_script( 'wp-mediaelement' );
		wp_enqueue_script( 'mediaelement-vimeo' );
	}

	// Mediaelement has issues with some URL formats for Vimeo and YouTube, so
	// update the URL to prevent the ME.js player from breaking.
	if ( 'mediaelement' === $library ) {
		if ( $is_youtube ) {
			// Remove `feature` query arg and force SSL - see #40866.
			$atts['src'] = remove_query_arg( 'feature', $atts['src'] );
			$atts['src'] = set_url_scheme( $atts['src'], 'https' );
		} elseif ( $is_vimeo ) {
			// Remove all query arguments and force SSL - see #40866.
			$parsed_vimeo_url = wp_parse_url( $atts['src'] );
			$vimeo_src = 'https://' . $parsed_vimeo_url['host'] . $parsed_vimeo_url['path'];

			// Add loop param for mejs bug - see #40977, not needed after #39686.
			$loop = $atts['loop'] ? '1' : '0';
			$atts['src'] = add_query_arg( 'loop', $loop, $vimeo_src );
		}
	}

	/**
	 * Filters the class attribute for the video shortcode output container.
	 *
	 * @since 3.6.0
	 * @since 4.9.0 The `$atts` parameter was added.
	 *
	 * @param string $class CSS class or list of space-separated classes.
	 * @param array  $atts  Array of video shortcode attributes.
	 */
	$atts['class'] = apply_filters( 'wp_video_shortcode_class', $atts['class'], $atts );

	$html_atts = array(
		'class'    => $atts['class'],
		'id'       => sprintf( 'video-%d-%d', $post_id, $instance ),
		'width'    => absint( $atts['width'] ),
		'height'   => absint( $atts['height'] ),
		'poster'   => esc_url( $atts['poster'] ),
		'loop'     => wp_validate_boolean( $atts['loop'] ),
		'autoplay' => wp_validate_boolean( $atts['autoplay'] ),
		'preload'  => $atts['preload'],
	);

	// Fix for Chrome Autoplay
	if($atts['autoplay'] == "true"):
		$html_atts['muted'] = "muted";
	endif;

	// These ones should just be omitted altogether if they are blank
	foreach ( array( 'poster', 'loop', 'autoplay', 'preload' ) as $a ) {
		if ( empty( $html_atts[$a] ) ) {
			unset( $html_atts[$a] );
		}
	}

	$attr_strings = array();
	foreach ( $html_atts as $k => $v ) {
		$attr_strings[] = $k . '="' . esc_attr( $v ) . '"';
	}

	$html = '';
	if ( 'mediaelement' === $library && 1 === $instance ) {
		$html .= "<!--[if lt IE 9]><script>document.createElement('video');</script><![endif]-->\n";
	}
	$html .= sprintf( '<video %s controls="controls">', join( ' ', $attr_strings ) );

	$fileurl = '';
	$source = '<source type="%s" src="%s" />';
	foreach ( $default_types as $fallback ) {
		if ( ! empty( $atts[ $fallback ] ) ) {
			if ( empty( $fileurl ) ) {
				$fileurl = $atts[ $fallback ];
			}
			if ( 'src' === $fallback && $is_youtube ) {
				$type = array( 'type' => 'video/youtube' );
			} elseif ( 'src' === $fallback && $is_vimeo ) {
				$type = array( 'type' => 'video/vimeo' );
			} else {
				$type = wp_check_filetype( $atts[ $fallback ], wp_get_mime_types() );
			}
			$url = add_query_arg( '_', $instance, $atts[ $fallback ] );
			$html .= sprintf( $source, $type['type'], esc_url( $url ) );
		}
	}

	if ( ! empty( $content ) ) {
		if ( false !== strpos( $content, "\n" ) ) {
			$content = str_replace( array( "\r\n", "\n", "\t" ), '', $content );
		}
		$html .= trim( $content );
	}

	if ( 'mediaelement' === $library ) {
		$html .= wp_mediaelement_fallback( $fileurl );
	}
	$html .= '</video>';

	$width_rule = '';
	if ( ! empty( $atts['width'] ) ) {
		$width_rule = sprintf( 'width: %dpx;', $atts['width'] );
	}
	$output = sprintf( '<div style="%s" class="wp-video">%s</div>', $width_rule, $html );

	/**
	 * Filters the output of the video shortcode.
	 *
	 * @since 3.6.0
	 *
	 * @param string $output  Video shortcode HTML output.
	 * @param array  $atts    Array of video shortcode attributes.
	 * @param string $video   Video file.
	 * @param int    $post_id Post ID.
	 * @param string $library Media library used for the video shortcode.
	 */
	return apply_filters( 'wp_video_shortcode', $output, $atts, $video, $post_id, $library );
}
add_shortcode( 'video', 'wp_video_shortcode_jcs' );

// ADD slug to POSTS
add_action('admin_menu','remove_default_post_type');

function remove_default_post_type() {
    remove_menu_page('edit.php');
}

add_action( 'init', 'my_new_default_post_type', 1 );
function my_new_default_post_type() {

    register_post_type( 'post', array(
        'labels' => array(
            'name_admin_bar' => _x( 'Post', 'add new on admin bar' ),
        ),
        'public'  => true,
        '_builtin' => false,
        '_edit_link' => 'post.php?post=%d',
        'capability_type' => 'post',
        'map_meta_cap' => true,
        'hierarchical' => false,
        'rewrite' => array( 'slug' => 'news' ),
        'query_var' => false,
        'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'trackbacks', 'custom-fields', 'comments', 'revisions', 'post-formats' ),
		'show_in_rest'=> true,
		'rest_base' => 'posts',
		'rest_controller_class' => 'WP_REST_Posts_Controller',
    ) );
}

// MENU ORDER
function custom_menu_order($menu_ord) {
    if (!$menu_ord) return true;

    return array(
        'index.php', // Dashboard
        'acf-options',
        'separator1', // First separator
        'upload.php', // Media
        'edit.php', // Posts
        'edit.php?post_type=page', // Pages
        // 'edit.php?post_type=works', // Pages
        'link-manager.php', // Links
        'edit-comments.php', // Comments
        'separator2', // Second separator
        'themes.php', // Appearance
        'plugins.php', // Plugins
        'users.php', // Users
        'tools.php', // Tools
        'edit.php?post_type=acf-field-group', // Last separator,
        'options-general.php', // Settings
        'ai1wm_export', // Last separator,
        'separator-last', // Last separator
    );
}
add_filter('custom_menu_order', 'custom_menu_order'); // Activate custom_menu_order
add_filter('menu_order', 'custom_menu_order');


// Register Custom Post Type
// function works_post_type() {

// 	$labels = array(
// 		'name'                  => _x( 'Works', 'Post Type General Name', 'text_domain' ),
// 		'singular_name'         => _x( 'Work', 'Post Type Singular Name', 'text_domain' ),
// 		'menu_name'             => __( 'Works', 'text_domain' ),
// 		'name_admin_bar'        => __( 'Work', 'text_domain' ),
// 		'archives'              => __( 'Work Archives', 'text_domain' ),
// 		'attributes'            => __( 'Work Attributes', 'text_domain' ),
// 		'parent_item_colon'     => __( 'Parent Item:', 'text_domain' ),
// 		'all_items'             => __( 'All Works', 'text_domain' ),
// 		'add_new_item'          => __( 'Add a Work', 'text_domain' ),
// 		'add_new'               => __( 'Add a Work', 'text_domain' ),
// 		'new_item'              => __( 'New Item', 'text_domain' ),
// 		'edit_item'             => __( 'Edit Item', 'text_domain' ),
// 		'update_item'           => __( 'Update Item', 'text_domain' ),
// 		'view_item'             => __( 'View Item', 'text_domain' ),
// 		'view_items'            => __( 'View Items', 'text_domain' ),
// 		'search_items'          => __( 'Search Item', 'text_domain' ),
// 		'not_found'             => __( 'Not found', 'text_domain' ),
// 		'not_found_in_trash'    => __( 'Not found in Trash', 'text_domain' ),
// 		'featured_image'        => __( 'Featured Image', 'text_domain' ),
// 		'set_featured_image'    => __( 'Set featured image', 'text_domain' ),
// 		'remove_featured_image' => __( 'Remove featured image', 'text_domain' ),
// 		'use_featured_image'    => __( 'Use as featured image', 'text_domain' ),
// 		'insert_into_item'      => __( 'Insert into item', 'text_domain' ),
// 		'uploaded_to_this_item' => __( 'Uploaded to this item', 'text_domain' ),
// 		'items_list'            => __( 'Items list', 'text_domain' ),
// 		'items_list_navigation' => __( 'Items list navigation', 'text_domain' ),
// 		'filter_items_list'     => __( 'Filter items list', 'text_domain' ),
// 	);
// 	$args = array(
// 		'label'                 => __( 'Work', 'text_domain' ),
// 		'description'           => __( 'Catalogue des Works', 'text_domain' ),
// 		'labels'                => $labels,
// 		'supports'              => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions'),
// 		'taxonomies'            => array( 'works_categories' ),
// 		'hierarchical'          => false,
// 		'public'                => true,
// 		'show_ui'               => true,
// 		'show_in_menu'          => true,
// 		'menu_position'         => 0,
// 		'menu_icon'             => 'dashicons-heart',
// 		'show_in_admin_bar'     => true,
// 		'show_in_nav_menus'     => true,
// 		'can_export'            => true,
// 		'has_archive'           => true,
// 		'exclude_from_search'   => false,
// 		'publicly_queryable'    => true,
// 		'capability_type'       => 'page',
// 		'show_in_rest'          => true,
// 	);
// 	register_post_type( 'works', $args );

// }
// add_action( 'init', 'works_post_type', 0 );


// Register Custom Taxonomy
// function works_taxonomy() {

// 	$labels = array(
// 		'name'                       => _x( 'Work Taxonomies', 'Taxonomy General Name', 'text_domain' ),
// 		'singular_name'              => _x( 'Work Taxonomy', 'Taxonomy Singular Name', 'text_domain' ),
// 		'menu_name'                  => __( 'Catégories Works', 'text_domain' ),
// 		'all_items'                  => __( 'Toutes les catégories Works', 'text_domain' ),
// 		'parent_item'                => __( 'Parent Item', 'text_domain' ),
// 		'parent_item_colon'          => __( 'Parent Item:', 'text_domain' ),
// 		'new_item_name'              => __( 'New Item Name', 'text_domain' ),
// 		'add_new_item'               => __( 'Ajouter une nouvelle catégorie Work', 'text_domain' ),
// 		'edit_item'                  => __( 'Edit Item', 'text_domain' ),
// 		'update_item'                => __( 'Update Item', 'text_domain' ),
// 		'view_item'                  => __( 'View Item', 'text_domain' ),
// 		'separate_items_with_commas' => __( 'Separate items with commas', 'text_domain' ),
// 		'add_or_remove_items'        => __( 'Add or remove items', 'text_domain' ),
// 		'choose_from_most_used'      => __( 'Choose from the most used', 'text_domain' ),
// 		'popular_items'              => __( 'Popular Items', 'text_domain' ),
// 		'search_items'               => __( 'Search Items', 'text_domain' ),
// 		'not_found'                  => __( 'Not Found', 'text_domain' ),
// 		'no_terms'                   => __( 'No items', 'text_domain' ),
// 		'items_list'                 => __( 'Items list', 'text_domain' ),
// 		'items_list_navigation'      => __( 'Items list navigation', 'text_domain' ),
// 	);
// 	$args = array(
// 		'labels'                     => $labels,
// 		'hierarchical'               => true,
// 		'public'                     => true,
// 		'show_ui'                    => true,
// 		'show_admin_column'          => true,
// 		'show_in_nav_menus'          => true,
// 		'show_tagcloud'              => true,
// 		'show_in_rest'               => true,
// 	);
// 	register_taxonomy( 'works_categories', array( 'works' ), $args );

// }
// add_action( 'init', 'works_taxonomy', 0 );