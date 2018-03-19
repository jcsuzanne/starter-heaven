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
        'options-general.php', // Settings
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