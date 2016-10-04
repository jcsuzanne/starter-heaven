<!doctype html>
<!--[if IE]><![endif]-->
<!--[if lt IE 7 ]> <html class="no-js ie6 oldie" lang="<?= config('app.locale') ?>"> <![endif]-->
<!--[if IE 7 ]>    <html class="no-js ie7 oldie" lang="<?= config('app.locale') ?>"> <![endif]-->
<!--[if IE 8 ]>    <html class="no-js ie8 oldie" lang="<?= config('app.locale') ?>"> <![endif]-->
<!--[if IE 9 ]>    <html class="no-js ie9" lang="<?= config('app.locale') ?>"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!-->
<html class="no-js" lang="<?= config('app.locale') ?>"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @include('partials.seo')
    @include('partials.favicon')
    @include('partials.assets')
    <link rel="stylesheet" type="text/css" href="<?= URL::asset('assets/build/front'.Config::get('app.minify').'.css') ?>" media="all" />
    @include('partials.analytics')
</head>
<body data-controller="<?= $jscontroller ?>" data-method data-event>
<div id="master">
    <!-- view -->
    <section id="main-content" role="main" data-controller="<?= $jscontroller ?>"><?= $view ?></section>
</div>
@include('partials.desktop.scripts')
</body>
</html>