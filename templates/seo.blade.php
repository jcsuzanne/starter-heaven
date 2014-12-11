<?php
$title = (isset($seo->title))?strip_tags($seo->title):'';
$description = (isset($seo->description))?$seo->description:'';
$img = (isset($seo->img))?$seo->img:'';
?>
<title><?= $title ?></title>
<meta property="og:title" content="<?= $title ?>">
<meta property="og:site_name" content="<?= Lang::get('site.main') ?>">
<meta property="og:url" content="<?= URL::current() ?>">
<meta property="og:description" content="<?= $description ?>">
<meta property="og:image" content="<?= $img ?>" />
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@twitter">
<meta name="twitter:title" content="<?= $title ?>">
<meta name="twitter:description" content="<?= $description ?>">
<meta name="twitter:image:src" content="<?= $img ?>">
<link rel="canonical" href="<?= URL::current() ?>" />
<meta name="robots" content="index, follow">
<meta name="description" content="<?= $description ?>" />