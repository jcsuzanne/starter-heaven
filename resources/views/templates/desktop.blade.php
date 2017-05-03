<!doctype html>
<html class="no-js lang-{!! config('app.locale') !!}" lang="{!! config('app.locale') !!}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @include('partials.seo')
    @include('partials.favicon')
    @include('partials.assets')
    <link rel="stylesheet" type="text/css" href="{!! URL::asset('assets/build/front'.Config::get('app.minify').'.css') !!}" media="all" />
    @include('partials.analytics')
</head>
<body class="page-{!! $jscontroller !!}" data-controller="{!! $jscontroller !!}">
<div id="master" class="page-{!! $jscontroller !!}" data-controller="{!! $jscontroller !!}">
    <!-- view -->
    <section id="main-content" role="main" data-controller="{!! $jscontroller !!}">{!! $view !!}</section>
</div>
@include('partials.desktop.scripts')
</body>
</html>