<!doctype html>
<!--[if IE]><![endif]-->
<!--[if lt IE 7 ]> <html class="no-js ie6 oldie" lang="<?= App::getLocale() ?>"> <![endif]-->
<!--[if IE 7 ]>    <html class="no-js ie7 oldie" lang="<?= App::getLocale() ?>"> <![endif]-->
<!--[if IE 8 ]>    <html class="no-js ie8 oldie" lang="<?= App::getLocale() ?>"> <![endif]-->
<!--[if IE 9 ]>    <html class="no-js ie9" lang="<?= App::getLocale() ?>"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!-->
<html class="no-js" lang="<?= App::getLocale() ?>"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <?php include(app_path().'/views/templates/seo.blade.php'); ?>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Favicon -->
    <link rel="shortcut icon" href="<?= URL::asset('favicon.ico') ?>">
    <!-- Styles -->
    <link rel="stylesheet" type="text/css" href="<?= URL::asset('assets/build/top'.Config::get('app.minify').'.css') ?>" media="all" />
    <link rel="stylesheet" type="text/css" href="<?= URL::asset('assets/build/front'.Config::get('app.minify').'.css') ?>" media="all" />
    <!-- Javascript -->
    <script type="text/javascript" src="<?= URL::asset('assets/build/top'.Config::get('app.minify').'.js') ?>"></script>
    <script type="text/javascript">
    // <![CDATA[
    var config = {
        lang : "<?= App::getLocale() ?>",
        pathAssets : "<?= URL::asset('assets') ?>"
    }
    // ]]>
    </script>
</head>
<body role="document" data-controller="<?= $jscontroller ?>" data-method data-event>
<div id="master">
    <?php //include(app_path().'/views/layout/desktop/mainnav.php'); ?>
    <section id="main-content" role="main" data-controller="<?= $jscontroller ?>"><?= $view ?></section>
    <?php //include(app_path().'/views/layout/desktop/footer.php'); ?>
</div>
<script type="text/javascript" src="<?= URL::asset('assets/build/front'.Config::get('app.minify').'.js') ?>"></script>
</body>
</html>