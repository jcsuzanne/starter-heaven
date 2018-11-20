<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * e.g., it puts together the home page when no home.php file exists.
 *
 * Learn more: {@link https://codex.wordpress.org/Template_Hierarchy}
 *
 * @package WordPress
 * @subpackage JCS
 * @since JCS 1.0
 */


require __DIR__ . '/../../../wp-load.php';

$actual_link = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
if(isset($_GET['preview']) && $_GET['preview'] == true && isset($_GET['p']) && $_GET['p'] !== 0):
    $replace_link = str_replace('/admin/','/preview',$actual_link);
    header('Location:'.$replace_link);
else:
    $replace_link = str_replace('/admin/','/',$actual_link);
    // POST TYPE
    // $replace_link = str_replace('/slug_wp/','/slug_front/',$replace_link);
    $clean_link = substr($replace_link,0,-1);
    header('Location:'.$clean_link);
endif;