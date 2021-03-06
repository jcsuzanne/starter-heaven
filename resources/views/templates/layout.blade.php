<!doctype html>
<html class="no-js lang-{!! config('app.locale') !!} currentView--@yield('jscontroller')" lang="{!! config('app.locale') !!}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
@include('partials.seo')
@include('partials.favicon')
@include('partials.assets')
@include('partials.analytics')
</head>
<body>
<div id="master">
    <!-- view start -->
    <div class="main-content" id="barba-wrapper" role="main"><div class="barba-container" data-namespace="@yield('jscontroller')">@yield('view')</div></div>
    <!-- view end -->
    <div class="main-transition" id="jsView--transition"></div>
</div>
@include('partials.scripts')
</body>
</html>