<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link https://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wordpress');

/** MySQL database username */
define('DB_USER', 'wordpress');

/** MySQL database password */
define('DB_PASSWORD', 'wordpress');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'uRMr--xKDZ#:u#v$Ydue_Fhq}{H:Pm(;a,Dw`_|ycL&H%<iZ1_Yzzfm[S? (Acoq');
define('SECURE_AUTH_KEY',  '3V/XgK^_P<Q_.GazqL9s6UX13IzBj2HW}dYd&?1D?7Sp+B5Yp><gb)s`[kN&(5qb');
define('LOGGED_IN_KEY',    'BHqwk!C.q^U jCVaTLfaq9:H3y]W;NGB$J_o1?Ry#0|ompAZVO>R/E&q|9u:j0,:');
define('NONCE_KEY',        'lE$:-+ik:OM~IR2Y@]x?~T`C[+JmQAA^;EZ}.+m-`n~t^ ]FM4K&-|5^$!;q;c0B');
define('AUTH_SALT',        'v]r~5.9|KuRUJ}m;uH>zwyL-,<9?3}5}tVR1VE$Pu|3!e1@#*iman$Iz>sO|1D,]');
define('SECURE_AUTH_SALT', 'y)#QKk-mee)}+Q0.A0b-mJ:.B?#8_;k|Lez-++q&]+K_bYb 3jg?]A 0][jg9/O/');
define('LOGGED_IN_SALT',   'MKN@sw_c)>/E&]9^vwCiMNX3|acj sX+iv`2+}3ftT#h+z3;_2HPK5i~6&prpC7Z');
define('NONCE_SALT',       'y$TquM;VeRQR,p5m%Z+>-]!-}7SI[e5fs0!GBSi[4J-aQZ;|l7*=M!:*Oo?StsKw');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
