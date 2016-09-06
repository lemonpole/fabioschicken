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
  const INIT_CATEGORIES   = array(
    ( 'Food Platters' ),
    ( 'Popular Platters' ),
    ( 'Appetizers/Drinks' ),
    ( 'Daily Specials' )
  );

  public static function init() {
    add_action( 'init', array( __CLASS__, 'wp_init' ) );
    add_action( 'save_post', array( __CLASS__, 'save_post' ), 10, 3 );
    add_action( 'wp_ajax_foods', array( __CLASS__, 'get_all_foods' ) );
    add_action( 'wp_ajax_nopriv_foods', array( __CLASS__, 'get_all_foods' ) );
    add_action( 'wp_ajax_bloginfo', array( __CLASS__, 'get_bloginfo' ) );
    add_action( 'wp_ajax_nopriv_bloginfo', array( __CLASS__, 'get_bloginfo' ) );

    self::register_taxonomies();
  }

  public static function wp_init() {
    header( 'Access-Control-Allow-Origin: *' ); // needed to allow front-end to send ajax requests
    register_post_type( self::NAME, self::DEFAULT_SETTINGS );
  }

  public static function register_meta_box() {
    add_meta_box( self::METABOX_ID, ( 'Description' ), array( __CLASS__, 'render_meta_box' ), self::NAME, 'normal' );
  }

  public static function render_meta_box( $post ) {
    // add nonce field so we can check for it later
    wp_nonce_field( self::METABOX_ID, self::METABOX_NONCE );

    // load any existing values from db and render editor
    wp_editor( $post->post_content, self::META_DESCR, array(
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

    // unhook this function so it doesn't loop infinitely!
    remove_action( 'save_post', array( __CLASS__, 'save_post' ) );

    // okay we got this far. safe to modify the data now!
    // updating the post calls save_post again which is why we disabled it above
    $data = sanitize_text_field( $_POST[ self::META_DESCR ] );
    $post->post_content = $data;

    wp_update_post( $post );
  }

  private static function register_taxonomies() {
    foreach( self::INIT_CATEGORIES as $cat ) {
      $term = term_exists( $cat, 'category' );
      if( $term !== 0 && $term !== null ) {
        continue;
      }

      wp_insert_term( $cat, 'category' );
    }
  }

  /*
  * wp-admin/admin-ajax.php?action=foods
  * Gets all foods custom post type and groups them by category
  *
  * TODO: HOLY SHIT REFACTOR PLZZZZ
  */
  public static function get_all_foods() {
    // get all categories we're going to need to group by
    $categories = get_categories( array(
      'taxonomy'  => 'category',
      'parent'    => 0,
      'exclude'   => 1 // don't show: Uncategorized'
    ));

    // fetch any children the top-level categories may have
    foreach( $categories as $category ) {
      $category->{'children'} = get_categories( array(
        'child_of'  => $category->term_id
      ));
    }

    // get the posts for each category
    // if it has no children we place them directly in the object
    // if it has children we loop through those instead
    $result = [];
    foreach( $categories as $category ) {
      if( sizeof( $category->children ) === 0 ) {
        $result[ $category->name ] = get_posts( array(
          'post_type'   => self::NAME,
          'category'    => $category->term_id,
          'numberposts' => 0
        ));
      } else {
        $result[ $category->name ][ 'children' ] = [];
      }

      foreach( $category->children as $child_cat ) {
        $result[ $category->name ][ 'children' ][ $child_cat->name ] = get_posts( array(
          'post_type'   => self::NAME,
          'category'    => $child_cat->term_id,
          'numberposts' => 0
        ));
      }
    }

    wp_send_json_success( $result );
  }

  public static function get_bloginfo() {
    $name = get_bloginfo( 'name' );
    $description = get_bloginfo( 'description' );

    wp_send_json_success([
      'name'        => $name,
      'description' => $description
    ]);
  }
}