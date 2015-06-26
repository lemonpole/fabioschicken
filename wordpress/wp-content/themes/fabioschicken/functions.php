<?php
// wp-admin/admin-ajax.php?action=get_blog_info
add_action('wp_ajax_nopriv_get_blog_info', 'get_blog_info_callback');
function get_blog_info_callback(){
	wp_send_json([
		'name' => get_bloginfo('name'),
		'description' => get_bloginfo('description')
	]);
}
