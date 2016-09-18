<?php
namespace FC16\PostTypes;

class Foods {
  const NAME              = 'fc16_foods';
  const METABOXES         = array(
    'descr' => array(
      'id'    => self::NAME . '_descr_mb',
      'nonce' => self::NAME . '_descr_mb_nonce',
      'name'  => self::NAME . '_descr',
      'label' => 'Description'
    ),
    'price' => array(
      'id'    => self::NAME . '_price_mb',
      'nonce' => self::NAME . '_price_mb_nonce',
      'name'  => self::NAME . '_price',
      'label' => 'Price'
    )
  );
  const DEFAULT_SETTINGS  = array(
    'labels' => array(
      'name'          => ( 'Foods' ),
      'singular_name' => ( 'Food Item' )
    ),
    'public' => true,
    'menu_icon' => 'dashicons-carrot',
    'supports'  => array(
      'title'
    ),
    'register_meta_box_cb' => array( __CLASS__, 'register_meta_boxes' ),
    'taxonomies' => array(
      'category'
    )
  );
  const INIT_CATEGORIES = array(
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

  public static function register_meta_boxes() {
    add_meta_box(
      self::METABOXES[ 'price' ][ 'id' ],
      self::METABOXES[ 'price' ][ 'label' ],
      array( __CLASS__, 'render_price_meta_box' ),
      self::NAME,
      'normal'
    );

    add_meta_box(
      self::METABOXES[ 'descr' ][ 'id' ],
      self::METABOXES[ 'descr' ][ 'label' ],
      array( __CLASS__, 'render_descr_meta_box' ),
      self::NAME,
      'normal'
    );
  }

  public static function render_price_meta_box( $post ) {
    // fetch price value if it exists to preload into the textbox
    // if price is empty preload it with a default val
    $price = get_post_meta( $post->ID, self::METABOXES[ 'price' ][ 'name' ], true );
    $price = ( empty( $price ) ? '0.00' : $price );

    // add nonce field so we can check for it later
    wp_nonce_field( self::METABOXES[ 'price' ][ 'id' ], self::METABOXES[ 'price' ][ 'nonce' ] );

    // render the html for the textbox
    echo '<label class="screen-reader-text" for="'
      . self::METABOXES[ 'price' ][ 'id' ]
      . '">Deck</label>';
    echo '<input type="number" step="0.01" min="0" class="widefat'
      . '" id="' . self::METABOXES[ 'price' ][ 'id' ]
      . '" name="' . self::METABOXES[ 'price' ][ 'name' ]
      . '" value="' . $price
      . '" />';
  }

  public static function render_descr_meta_box( $post ) {
    // add nonce field so we can check for it later
    wp_nonce_field( self::METABOXES[ 'descr' ][ 'id' ], self::METABOXES[ 'descr' ][ 'nonce' ] );

    // load any existing values from db and render editor
    wp_editor( $post->post_content, self::METABOXES[ 'descr' ][ 'name' ], array(
      'media_buttons' => false,
      'teeny'         => true,
      'textarea_name' => self::METABOXES[ 'descr' ][ 'name' ]
    ));
  }

  public static function save_post( $post_id, $post, $update ) {
    // some sanity checks first
    if( self::NAME != $post->post_type
      || !isset( $_POST[ self::METABOXES[ 'descr' ][ 'nonce' ] ] )
      || !wp_verify_nonce( $_POST[ self::METABOXES[ 'descr' ][ 'nonce' ] ], self::METABOXES[ 'descr' ][ 'id' ] )
      || defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE
    ) {
      return;
    }

    // unhook this function so it doesn't loop infinitely!
    remove_action( 'save_post', array( __CLASS__, 'save_post' ) );

    // okay we got this far. safe to modify the data now!
    // sanitize description field
    $descr = sanitize_text_field( $_POST[ self::METABOXES[ 'descr' ][ 'name' ] ] );
    $post->post_content = $descr;

    // sanitize price field. it must be in the format of a price.
    $price = sanitize_text_field( $_POST[ self::METABOXES[ 'price' ][ 'name' ] ] );
    update_post_meta( $post_id, self::METABOXES[ 'price' ][ 'name' ], $price );

    // updating the post calls save_post again which is why we disabled it above
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

  private static function get_posts_with_metadata( $args ) {
    // get the posts that match the required args
    $posts = get_posts( $args );

    // loop through each post and append the relevant meta data
    foreach( $posts as $post ) {
      $price = get_post_meta( $post->ID, self::METABOXES[ 'price' ][ 'name' ], true );
      $post->price = $price;
    }

    return $posts;
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
        $result[ $category->name ] = self::get_posts_with_metadata( array(
          'post_type'   => self::NAME,
          'category'    => $category->term_id,
          'numberposts' => 0
        ));
      } else {
        $result[ $category->name ][ 'children' ] = [];
      }

      foreach( $category->children as $child_cat ) {
        $result[ $category->name ][ 'children' ][ $child_cat->name ] = self::get_posts_with_metadata( array(
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