<?php
namespace FC16\PostTypes;

class Foods {
  const NAME              = 'fc16_foods';
  const METABOX_ID        = self::NAME . '_mb';
  const METABOX_NONCE     = self::METABOX_ID . '_nonce';
  const META_DESCR        = self::NAME . '_descr';
  const DEFAULT_SETTINGS  = array(
    'labels'                => array(
      'name'          => ( 'Foods' ),
      'singular_name' => ( 'Food Item' )
    ),
    'public'                => true,
    'menu_icon'             => 'dashicons-carrot',
    'supports'              => array(
      'title'
    ),
    'register_meta_box_cb'  => array( __CLASS__, 'register_meta_box' ),
    'taxonomies'            => array(
      'category'
    )
  );
  const CATEGORIES        = array(
    ( 'Food Platters' ),
    ( 'Popular Platters' ),
    ( 'Appetizers/Drinks' ),
    ( 'Daily Specials' )
  );

  public static function init() {
    add_action( 'init', array( __CLASS__, 'register' ) );
    add_action( 'save_post', array( __CLASS__, 'save_post' ), 10, 3 );
    add_action( 'wp_ajax_foods', array( __CLASS__, 'get_all_foods' ) );
    add_action( 'wp_ajax_nopriv_foods', array( __CLASS__, 'get_all_foods' ) );

    self::register_taxonomies();
  }

  public static function register() {
    register_post_type( self::NAME, self::DEFAULT_SETTINGS );
  }

  public static function register_meta_box() {
    add_meta_box( self::METABOX_ID, ( 'Description' ), array( __CLASS__, 'render_meta_box' ), self::NAME, 'normal' );
  }

  public static function render_meta_box( $post ) {
    // add nonce field so we can check for it later
    wp_nonce_field( self::METABOX_ID, self::METABOX_NONCE );

    // load any existing values from db and render editor
    $value = get_post_meta( $post->ID, self::META_DESCR, true );
    wp_editor( $value, self::META_DESCR, array(
      'media_buttons' => false,
      'teeny'         => true,
      'textarea_name' => self::META_DESCR
    ));
  }

  public static function save_post( $post_id, $post, $update ) {
    // some sanity checks first
    if( self::NAME != $post->post_type
      || !isset( $_POST[ self::METABOX_NONCE ] )
      || !wp_verify_nonce( $_POST[ self::METABOX_NONCE ], self::METABOX_ID )
      || defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE
    ) {
      return;
    }

    // okay we got this far. safe to modify the data now!
    $data = sanitize_text_field( $_POST[ self::META_DESCR ] );
    update_post_meta( $post_id, self::META_DESCR, $data );
  }

  private static function register_taxonomies() {
    foreach( self::CATEGORIES as $cat ) {
      $term_exists = term_exists( $cat, 'category' );
      if( $term !== 0 && $term !== null ) {
        continue;
      }

      wp_insert_term( $cat, 'category' );
    }
  }

  public static function get_all_foods() {
    $posts = get_posts( array(
      'post_type' => self::NAME
    ));

    wp_send_json_success( $posts );
  }
}