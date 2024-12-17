<?php

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

// Enqueue styles and scripts.
function my_theme_enqueue_assets()
{
    wp_enqueue_style(
        'theme-styling',
        get_stylesheet_uri(),
        array(),
        wp_get_theme()->get('Version')
    );

    wp_enqueue_style(
        'bundled-styling',
        get_template_directory_uri() . '/dist/index.css',
        array(),
        wp_get_theme()->get('Version')
    );

    wp_enqueue_script(
        'react-script',
        get_template_directory_uri() . '/dist/index.js',
        array(),
        '1.0.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'my_theme_enqueue_assets');

// Add theme support.
function my_theme_setup()
{
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
}
add_action('after_setup_theme', 'my_theme_setup');


// Register a navigation menu.
function my_theme_register_menus()
{
    register_nav_menus(
        array(
            'primary-menu' => __('Primary Menu', 'my-theme'),
        )
    );
}
add_action('init', 'my_theme_register_menus');


// Register custom REST API endpoint for menu items
add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/menu/', [
        'methods' => 'GET',
        'callback' => 'get_menu_items',
        'args' => [
            'menu' => [
                'required' => true,
                'validate_callback' => function ($param, $request, $key) {
                    return is_string($param);
                }
            ],
        ],
        'permission_callback' => '__return_true',
    ]);
});

function get_menu_by_location($location) {
    // Get all registered menu locations
    $locations = get_nav_menu_locations();

    // Check if the specified location exists
    if (!isset($locations[$location])) {
        return [];
    }

    // Get the menu object ID for the specified location
    $menu_id = $locations[$location];

    // Fetch the menu items for this menu
    $menu_items = wp_get_nav_menu_items($menu_id);

    return $menu_items;
}

/**
 * Callback function to fetch menu items by menu name.
 *
 * @param WP_REST_Request $request The REST API request.
 * @return WP_REST_Response|WP_Error
 */
function get_menu_items($request)
{
    $menu_name = $request->get_param('menu');

    // Get the menu items
    $menu_items = get_menu_by_location($menu_name);

    if (empty($menu_items)) {
        return new WP_REST_Response(['message' => 'No menu items found'], 200);
    }

    return new WP_REST_Response($menu_items, 200);
}
