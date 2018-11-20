<?php
/**
 * Twenty Seventeen functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 */

/**
 * Twenty Seventeen only works in WordPress 4.7 or later.
 */
if ( version_compare( $GLOBALS['wp_version'], '4.7-alpha', '<' ) ) {
	require get_template_directory() . '/inc/back-compat.php';
	return;
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function jcs_setup() {
	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	// add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	// add_image_size( 'twentyseventeen-featured-image', 2000, 1200, true );
	// add_image_size( 'twentyseventeen-thumbnail-avatar', 100, 100, true );
	// add_image_size( 'custom-thumbnail', 690, 788, true );

	// Set the default content width.
	$GLOBALS['content_width'] = 525;

	// This theme uses wp_nav_menu() in two locations.
	register_nav_menus( array(
		'top'    => __( 'Top Menu', 'twentyseventeen' ),
		'social' => __( 'Social Links Menu', 'twentyseventeen' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	/*
	 * Enable support for Post Formats.
	 *
	 * See: https://codex.wordpress.org/Post_Formats
	 */
	add_theme_support( 'post-formats', array(
		'aside',
		'image',
		'video',
		'quote',
		'link',
		'gallery',
		'audio',
	) );

	/*
	 * This theme styles the visual editor to resemble the theme style,
	 * specifically font, colors, and column width.
 	 */
	add_editor_style( array( 'assets/css/editor-style.css' ) );

}
add_action( 'after_setup_theme', 'jcs_setup' );

/* Remove the Theme Editor Menu from the WordPress Dashboard */
function remove_editor_menu() {
	remove_action('admin_menu', '_add_themes_utility_last', 101);
}
add_action('_admin_menu', 'remove_editor_menu', 1);

/*
	* Enable Options Page available with ACF if exists
	*
	*/
if(function_exists('acf_add_options_page')) {
	acf_add_options_page();
}

remove_action( 'woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10);
remove_action( 'woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10);

/*
* Controllers
*/

function getCategoryFromTaxo($post)
{
	$type = $post->post_type;
	$names = array();
	$slugs = array();
	$ids = array();
	switch($type):
		default:
			$taxo = 'category';
		break;
	endswitch;

	$categories = get_the_terms($post,$taxo);
	if(isset($categories) && !empty($categories)):
		foreach($categories as $cat):
			array_push($names,$cat->name);
			array_push($slugs,$cat->slug);
			array_push($ids,$cat->term_id);
		endforeach;
	endif;
	return array('names'=>$names,'slugs'=>$slugs,'ids'=>$ids);
}


/*
* REST
*/

function globalInfo() {
	$global = array();
	$global['sitename'] = get_option('blogname');
	$global['sitedesc'] = get_option('blogdescription');
	$global['sitedesc_fr'] = $global['sitedesc'];
	$global['sitedesc_en'] = get_option('options_blogdescription_en');
	$global['tagline_fr'] = wpautop(get_option('options_tagline_fr'));
	$global['tagline_en'] = wpautop(get_option('options_tagline_en'));
	$global['social'] = get_option('wpseo_social');
	$global['social']['twitter_site'] = '@'.$global['social']['twitter_site'];
	$global['metaImg'] = $global['social']['og_default_image'];
	$global['contact']['address'] = wpautop(get_option('options_contact_address'));
	$global['contact']['email'] = get_option('options_contact_email');
	$global['contact']['phone'] = get_option('options_contact_phone');
	$global['contact']['gmaps'] = get_option('options_gmaps_position');
	$global['contact']['gmaps']['link'] = 'https://www.google.fr/maps/place/'.urlencode(strip_tags($global['contact']['address']));
	return $global;
}

function metaInfo($data)
{
	$postID = $data['id'];
	$meta = array();
	$meta['metaTitle_fr'] = get_post_meta($postID,'seo_title_fr',true);
	$meta['metaDescription_fr'] = get_post_meta($postID,'seo_description_fr',true);
	$meta['metaTitle_en'] = get_post_meta($postID,'seo_title_en',true);
	$meta['metaDescription_en'] = get_post_meta($postID,'seo_description_en',true);
	return $meta;
}

function preparePost($post)
{
	$data = array();
	$data['post_title'] = $post->post_title;
	$data['post_excerpt'] = getExcerpt($post);
	$data['post_name'] = $post->post_name;
	$data['post_type'] = $post->post_type;
	$data['id'] = $post->ID;
	$data['media_full'] = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID),'full');
	$data['media_large'] = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID),'large');
	$data['media_medium'] = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID),'medium');
	$data['categories'] = getCategoryFromTaxo($post);
	return $data;
}

function getPostNext($data)
{
	global $post;
	$postID = $data['id'];
    $post = get_post($postID);
	$next_post = get_next_post();

	if($next_post == ""):
		return 0;
	endif;
	$data = preparePost($next_post);
	return $data;
}

function getPostPrev($data)
{
	global $post;
	$postID = $data['id'];
    $post = get_post($postID);
	$prev_post = get_previous_post();
	if($prev_post == ""):
		return 0;
	endif;
	$data = preparePost($next_post);
	return $data;
}

function acfRestPerField($data)
{
	$postID = $data['id'];
	$field = $data['field'];
	return get_field($field,$postID);
}

function acfRestPage($data)
{
	$postID = $data['id'];
	$data = array();
	$data = get_fields($postID);
	$data['media'] = wp_get_attachment_image_src(get_post_thumbnail_id($postID),'full');
	return $data;
}

function acfRestTerm($data)
{
	$postID = $data['id'];
	$field = $data['field'];
	return get_field($data['field'],"term_$postID");
}


add_action('rest_api_init', function () {
	register_rest_route('jcs/v1', '/global/', array(
		'methods' => 'GET',
		'callback' => 'globalInfo',
	));
	register_rest_route('jcs/v1', '/seo/(?P<id>\d+)', array(
		'methods' => 'GET',
		'callback' => 'metaInfo',
	));
	register_rest_route('jcs/v1', '/post_previous/(?P<id>\d+)', array(
		'methods' => 'GET',
		'callback' => 'getPostPrev',
	));
	register_rest_route('jcs/v1', '/post_next/(?P<id>\d+)', array(
		'methods' => 'GET',
		'callback' => 'getPostNext',
	));
	register_rest_route('jcs/v1', '/acf_field/(?P<id>\d+)/(?P<field>[a-zA-Z0-9-_]+)', array(
		'methods' => 'GET',
		'callback' => 'acfRestPerField',
	));
	register_rest_route('jcs/v1', '/acf_fields/(?P<id>\d+)/page', array(
		'methods' => 'GET',
		'callback' => 'acfRestPage',
	));
	register_rest_route('jcs/v1', '/acf_term/(?P<id>\d+)/(?P<field>[a-zA-Z0-9-_]+)', array(
		'methods' => 'GET',
		'callback' => 'acfRestTerm',
	));
});
