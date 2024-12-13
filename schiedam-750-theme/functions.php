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
