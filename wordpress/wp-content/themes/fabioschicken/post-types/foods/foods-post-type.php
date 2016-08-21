<?php
namespace FC16\PostTypes;

class Foods {
  const NAME = 'fc16_foods';
  const DEFAULT_SETTINGS = array(
    'labels'      => array(
      'name'          => ( 'Foods' ),
      'singular_name' => ( 'Food Item' )
    ),
    'public'      => true,
    'menu_icon'   => 'dashicons-carrot',
    'supports'    => array(
      'title',
      'excerpt'
    ),
    'taxonomies'  => array(
      'category'
    )
  );

  public static function init() {
    add_action( 'init', array( get_called_class(), 'register' ) );
    add_action( 'wp_ajax_foods', array( get_called_class(), 'get_all_foods' ) );
    add_action( 'wp_ajax_nopriv_foods', array( get_called_class(), 'get_all_foods' ) );
  }

  public static function register() {
    register_post_type( self::NAME, self::DEFAULT_SETTINGS );
  }

  public static function get_all_foods() {
    $posts = get_posts( array(
      'post_type' => self::NAME
    ));

    wp_send_json_success( $posts );
  }
}