<?php
/**
 * WordPress Starter Theme Customizer functionality
 *
 * @package WordPress Starter Theme
 * @subpackage Function
 * @since WordPress Starter Theme 1.0
 */

/**
 * Sets up the WordPress core custom header and custom background features.
 *
 * @since WordPress Starter Theme 1.0
 */
function _wst_custom_header_and_background() {
	/**
	 * Filter the arguments used when adding 'custom-background' support in WordPress Starter Theme.
	 *
	 * @since WordPress Starter Theme 1.0
	 *
	 * @param array $args {
	 *     An array of custom-background support arguments.
	 *
	 *     @type string $default-color Default color of the background.
	 * }
	 */
    add_theme_support( 'custom-background', array(
        'default-color' => 'ffffff'
    ) );

	/**
	 * Filter the arguments used when adding 'custom-header' support in WordPress Starter Theme.
	 *
	 * @since WordPress Starter Theme 1.0
	 *
	 * @param array $args {
	 *     An array of custom-header support arguments.
	 *
	 *     @type string $default-text-color Default color of the header text.
	 *     @type int      $width            Width in pixels of the custom header image. Default 1200.
	 *     @type int      $height           Height in pixels of the custom header image. Default 280.
	 *     @type bool     $flex-height      Whether to allow flexible-height header images. Default true.
	 *     @type callable $wp-head-callback Callback function used to style the header image and text
	 *                                      displayed on the blog.
	 * }
	 */
    add_theme_support( 'custom-header', array(
		'default-text-color'     => '',
		'width'                  => 1200,
		'height'                 => 280,
		'flex-height'            => true,
	) );
}
add_action( 'after_setup_theme', '_wst_custom_header_and_background' );

/**
 * Customizer.
 *
 * @since WordPress Starter Theme 1.0
 *
 * @param WP_Customize_Manager $wp_customize Customizer object.
 */
function _wst_customize_register( $wp_customize ) {
    // Add logo setting and control.
    $wp_customize->add_setting('logo');

    $wp_customize->add_control(
        new WP_Customize_Image_Control(
           $wp_customize,
           'logo',
           array(
               'label'      => __( 'Upload a logo', '_wst' ),
               'section'    => 'title_tagline',
               'settings'   => 'logo',
           )
       )
    );
}
add_action( 'customize_register', '_wst_customize_register', 11 );
