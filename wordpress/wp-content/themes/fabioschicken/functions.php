<?php
add_action( 'after_setup_theme', 'fabioschicken_setup' );
function fabioschicken_setup(){
	add_theme_support( 'post-thumbnails' );
	register_nav_menus([
		'primary' => 'Primary Menu'
	]);
}

// wp-admin/admin-ajax.php?action=get_blog_info
add_action( 'wp_ajax_get_blog_info', 'get_blog_info' );
add_action( 'wp_ajax_nopriv_get_blog_info', 'get_blog_info' );
function get_blog_info(){
	wp_send_json([
		'name'				=> get_bloginfo( 'name' ),
		'description'	=> get_bloginfo( 'description' )
	]);
}

add_action( 'wp_ajax_get_nav_menu', 'get_nav_menu' );
add_action( 'wp_ajax_nopriv_get_nav_menu', 'get_nav_menu' );
function get_nav_menu(){
	$nav_id = $_GET[ 'id' ];
	if( !isset( $nav_id ) || empty( $nav_id ) ) {
		wp_send_json_error( 'id field required' );
	}

	if( !has_nav_menu( $nav_id ) ) {
		wp_send_json_error( 'nav not found' );
	}

	wp_send_json_success( wp_nav_menu([
		'theme_location'	=> $nav_id,
		'container'				=> '',
		'echo'						=> false
	]));
}