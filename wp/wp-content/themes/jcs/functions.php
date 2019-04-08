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
	$GLOBALS['content_width'] = 1920;

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
	* Remove Paragraph Tags From Around Images
	*
	*/
// function filter_ptags_on_images($content){
// 	return preg_replace('​/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(<\/a>)?\s*<\/p>/iU', '\1\2\3', $content);
// }
// add_filter('the_content', 'filter_ptags_on_images');
// remove_filter( 'the_content', 'wpautop' );
function filter_ptags_on_images( $content ) {
    $content = preg_replace('/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(<\/a>)?\s*<\/p>/iU', '\1\2\3', $content);
    return preg_replace('/<p>\s*(<iframe .*>*.<\/iframe>)\s*<\/p>/iU', '\1', $content);
}
add_filter('the_content', 'filter_ptags_on_images');

function div_wrapper($content) {
    // match any iframes
    $pattern = '~<iframe.*</iframe>|<embed.*</embed>~';
    preg_match_all($pattern, $content, $matches);

    foreach ($matches[0] as $match) {
        // wrap matched iframe with div
        $wrappedframe = '<div class="iframe-container">' . $match . '</div>';

        //replace original iframe with new in content
        $content = str_replace($match, $wrappedframe, $content);
    }

    return $content;
}
add_filter('the_content', 'div_wrapper');


// add acf values to revisions rest api
add_filter( 'rest_prepare_revision', function( $response, $post ) {
    $data = $response->get_data();
    $data['fields'] = get_fields( $post->ID );
    return rest_ensure_response( $data );
}, 10, 2 );

/*
* Controllers
*/

function getAcfPost($post)
{
	$id = $post['id'];
	$the_post = get_post($id);
	$fields = get_fields($id);
	$fields['yoast_title'] = get_post_meta($id,'_yoast_wpseo_title',true);
	$fields['yoast_desc'] = get_post_meta($id,'_yoast_wpseo_metadesc',true);
	return $fields;
}


function getCategoryFromTaxo($post,$type='')
{
	$type = $post->post_type;
	$names = array();
	$slugs = array();
	$ids = array();
	$raw = array();
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
			array_push($raw,$cat);
		endforeach;
	endif;
	return array('names'=>$names,'slugs'=>$slugs,'ids'=>$ids,'raw'=>$raw);
}

function seoAcf($post)
{
	$id = $post['id'];
	$seo = array(
		'seo_title'=>get_field('seo_title',$id),
		'seo_description'=>get_field('seo_description',$id),
	);
	return $seo;
}

/*
* REST
*/
function getParentWorks($post)
{
	$idParent = $post['parent'];
	$postParent = null;
	if($idParent != 0):
		$postParent = get_post($idParent);
	endif;
	return $postParent;
}

function getVisuals($post)
{
	$id = $post['featured_media'];
	$visuals = array();
	$visuals['full'] = wp_get_attachment_image_src($id,'full');
	$visuals['normal'] = wp_get_attachment_image_src($id,'large');
	$visuals['tablet'] = wp_get_attachment_image_src($id,'medium');
	return $visuals;
}

function getVisualList($post)
{
	$response = array();
	$visuals = get_field('visual_list');
	$response['full'] = array($visuals['url'],$visuals['width'],$visuals['height']);
	$response['normal'] = array($visuals['sizes']['large'],$visuals['sizes']['large-width'],$visuals['sizes']['large-width']);
	$response['tablet'] = array($visuals['sizes']['medium'],$visuals['sizes']['medium-width'],$visuals['sizes']['medium-width']);
	return $response;
}

function getVisualTaxo($category)
{
	$catId = $category['id'];
	return get_field('visual',"term_$catId");
}

function renderCategories($post)
{
	$terms = array();
	$slugs = array();
	$categories = array();
	if(isset($post['categories']) && !empty($post['categories'])):
		foreach($post['categories'] as $k=>$cat):
			$term = get_term($cat);
			$categories[$k] = $term;
			array_push($terms,$term->name);
			array_push($slugs,$term->slug);
		endforeach;
	endif;
	return array('entries'=>$categories,'names'=>$terms,'slugs'=>$slugs);
}

function renderTags($post)
{
	$terms = array();
	$slugs = array();
	$categories = array();
	if(isset($post['tags']) && !empty($post['tags'])):
		foreach($post['tags'] as $k=>$cat):
			$term = get_term($cat);
			$categories[$k] = $term;
			array_push($terms,$term->name);
			array_push($slugs,$term->slug);
		endforeach;
	endif;
	return array('entries'=>$categories,'names'=>$terms,'slugs'=>$slugs);
}

function globalInfo() {
	$global = array();
	$fields = get_fields('option');
	$global['fields'] = $fields;
	$global['sitename'] = get_option('blogname');
	$global['sitedesc'] = get_option('blogdescription');
	// $global['sitedesc_fr'] = $global['sitedesc'];
	// $global['sitedesc_en'] = get_option('options_blogdescription_en');
	// $global['tagline_fr'] = wpautop(get_option('options_tagline_fr'));
	// $global['tagline_en'] = wpautop(get_option('options_tagline_en'));
	$global['social']['links'] = $fields['social'];
	$global['social']['twitter_site'] = '@'.$fields['twitter_site'];
	$metaImg = $fields['meta_og_image'];
	$global['metaImg'] = array('url'=>$metaImg['url'],'width'=>$metaImg['width'],'height'=>$metaImg['height']);
	$global['contact']['address'] = wpautop($fields['contact_address']);
	$global['contact']['email'] = $fields['contact_email'];
	$global['contact']['phone'] = $fields['contact_phone'];
	$global['contact']['gmaps'] = $fields['gmaps_position'];
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
	$data['categories'] = getCategoryFromTaxo($post,$post->post_type);
	return $data;
}

function getExcerpt($post)
{
	$type = $post->post_type;
	switch($type):
		case 'post':
			$excerpt = $post->post_excerpt;
		break;
		default:
			$excerpt = get_field('short_description',$post->ID);
		break;
	endswitch;
	return $excerpt;
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
	$data = preparePost($prev_post);
	return $data;
}

function acfRestPerField($data)
{
	$postID = $data['id'];
	$field = $data['field'];
	return get_field($field,$postID);
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
	register_rest_route('jcs/v1', '/acf/(?P<id>\d+)', array(
		'methods' => 'GET',
		'callback' => 'getAcfPost',
	));
	register_rest_route('jcs/v1', '/acf_field/(?P<id>\d+)/(?P<field>[a-zA-Z0-9-_]+)', array(
		'methods' => 'GET',
		'callback' => 'acfRestPerField',
	));
	register_rest_route('jcs/v1', '/acf_term/(?P<id>\d+)/(?P<field>[a-zA-Z0-9-_]+)', array(
		'methods' => 'GET',
		'callback' => 'acfRestTerm',
	));
});

// Enhanced Rest Response
function enhancedWC()
{
	register_rest_field('page','seo_acf',
		array(
			'get_callback' => 'seoAcf'
		)
	);
	register_rest_field('post','categories_rendered',
		array(
			'get_callback' => 'renderCategories'
		)
	);
	register_rest_field('post','visuals',
		array(
			'get_callback' => 'getVisuals'
		)
	);
	register_rest_field('page','visuals',
		array(
			'get_callback' => 'getVisuals'
		)
	);
}
add_action( 'rest_api_init', 'enhancedWC' );

// To fix the header authorization on 1&1 hosting (https://github.com/WP-API/Basic-Auth/issues/35#issuecomment-473690015)
#add_filter('flush_rewrite_rules_hard','__return_false');