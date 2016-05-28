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
    <!-- Styles -->
    <link rel="stylesheet" type="text/css" href="<?= URL::asset('assets/build/top'.Config::get('app.minify').'.css') ?>" media="all" />
    <link rel="stylesheet" type="text/css" href="<?= URL::asset('assets/build/front'.Config::get('app.minify').'.css') ?>" media="all" />
    <!-- Javascript -->
    <script type="text/javascript" src="<?= URL::asset('assets/build/top'.Config::get('app.minify').'.js') ?>"></script>
    <script type="text/javascript">
    // <![CDATA[
    var config = {
        lang : "<?= config('app.locale') ?>",
        pathAssets : "<?= URL::asset('assets') ?>"
    }
    // ]]>
    </script>
</head>
<body role="document" data-controller="<?= $jscontroller ?>" data-method data-event>
<div id="master">
    <!-- view -->
    <section id="main-content" role="main" data-controller="<?= $jscontroller ?>"><?= $view ?></section>
</div>
<script type="text/javascript" src="<?= URL::asset('assets/build/front'.Config::get('app.minify').'.js') ?>"></script>
</body>
</html>