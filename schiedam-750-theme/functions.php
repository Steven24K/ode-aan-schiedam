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
            'footer-menu' => __('Footer Menu', 'my-theme'),
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


// Add color field to category edit form
function add_category_color_field($term) {
    $color = get_term_meta($term->term_id, 'category_color', true);
    ?>
    <tr class="form-field">
        <th scope="row" valign="top"><label for="category_color"><?php _e('Color', 'my-theme'); ?></label></th>
        <td>
            <select name="category_color" id="category_color">
                <option value="sunny-yellow" <?php selected($color, 'sunny-yellow'); ?>>Sunny Yellow</option>
                <option value="fiery-red" <?php selected($color, 'fiery-red'); ?>>Fiery Red</option>
                <option value="just-black" <?php selected($color, 'just-black'); ?>>Just Black</option>
                <option value="just-white" <?php selected($color, 'just-white'); ?>>Just White</option>
                <option value="sky-blue" <?php selected($color, 'sky-blue'); ?>>Sky Blue</option>
                <option value="leafy-green" <?php selected($color, 'leafy-green'); ?>>Leafy Green</option>
                <option value="royal-purple" <?php selected($color, 'royal-purple'); ?>>Royal Purple</option>
                <option value="sunset-orange" <?php selected($color, 'sunset-orange'); ?>>Sunset Orange</option>
            </select>
        </td>
    </tr>
    <?php
}
add_action('category_edit_form_fields', 'add_category_color_field');

// Save category color field
function save_category_color_field($term_id) {
    if (isset($_POST['category_color'])) {
        update_term_meta($term_id, 'category_color', sanitize_text_field($_POST['category_color']));
    }
}
add_action('edited_category', 'save_category_color_field');

// Add color field to category add form
function add_category_color_field_to_add_form() {
    ?>
    <div class="form-field">
        <label for="category_color"><?php _e('Category Color', 'my-theme'); ?></label>
        <select name="category_color" id="category_color">
            <option value="sunny-yellow">Sunny Yellow</option>
            <option value="fiery-red">Fiery Red</option>
            <option value="just-black">Just Black</option>
            <option value="just-white">Just White</option>
            <option value="sky-blue">Sky Blue</option>
            <option value="leafy-green">Leafy Green</option>
            <option value="royal-purple">Royal Purple</option>
            <option value="sunset-orange">Sunset Orange</option>
        </select>
    </div>
    <?php
}
add_action('category_add_form_fields', 'add_category_color_field_to_add_form');

// Save category color field on add
function save_category_color_field_on_add($term_id) {
    if (isset($_POST['category_color'])) {
        add_term_meta($term_id, 'category_color', sanitize_text_field($_POST['category_color']), true);
    }
}
add_action('created_category', 'save_category_color_field_on_add');

// Register custom REST API endpoint for site info
add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/site-info/', [
        'methods' => 'GET',
        'callback' => 'get_site_info',
        'permission_callback' => '__return_true',
    ]);
});

/**
 * Callback function to fetch site info.
 *
 * @return WP_REST_Response
 */
function get_site_info()
{
    $categories = get_terms(array(
        'taxonomy' => 'category',
        'hide_empty' => false,
        'exclude' => get_option('default_category')
    ));

    foreach ($categories as $category) {
        $category->color = get_term_meta($category->term_id, 'category_color', true);
    }

    $home_id = get_option('page_on_front');
    $home_page = get_post($home_id);

    $home_page_content = array(
        'id' => $home_page->ID,
        'title' => $home_page->post_title,
        'content' => apply_filters('the_content', $home_page->post_content),
        'excerpt' => apply_filters('the_excerpt', $home_page->post_excerpt),
    );

    $site_info = array(
        'title' => get_bloginfo('name'),
        'slogan' => get_bloginfo('description'),
        'icon' => get_site_icon_url(),
        'logo' => get_theme_mod('custom_logo') ? wp_get_attachment_image_src(get_theme_mod('custom_logo'), 'full')[0] : '',
        "poem_count" => intval(wp_count_posts()->publish),
        "categories" => $categories,
        "home_page" => $home_page_content
    );

    return new WP_REST_Response($site_info, 200);
}
