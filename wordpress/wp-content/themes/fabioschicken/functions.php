<?php
add_action( 'admin_menu', 'remove_admin_menu_items' );
function remove_admin_menu_items() {
  remove_menu_page( 'edit.php' );
  remove_menu_page( 'upload.php' );
  remove_menu_page( 'edit.php?post_type=page' );
  remove_menu_page( 'edit-comments.php' );
  remove_menu_page( 'tools.php' );
}

add_action( 'after_setup_theme', 'fabioschicken_setup' );
function fabioschicken_setup(){
  add_theme_support( 'post-thumbnails' );
  set_post_thumbnail_size( 1200, 9999 );
  add_theme_support( 'title-tag' );
}