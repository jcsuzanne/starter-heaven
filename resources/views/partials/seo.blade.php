<title>@yield('metaTitle')</title>
<meta name="robots" content="index, follow">
<meta name="description" content="@yield('metaDescription')" />
<meta property="og:title" content="@yield('metaTitle')">
<meta property="og:site_name" content="{{ $shared['global']['sitename'] }}">
<meta property="og:url" content="{{ URL::current() }}">
<meta property="og:description" content="@yield('metaDescription')">
@if (isset($metaImg))
<meta property="og:image" content="@yield('metaImg')" />
<meta property="og:image:type" content="image/jpeg" />
@endif
@if (isset($metaImgWidth))
<meta property="og:image:width" content="@yield('metaImgWidth')" />
@endif
@if (isset($metaImgHeight))
<meta property="og:image:height" content="@yield('metaImgHeight')" />
@endif
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="{!! $shared['global']['social']['twitter_site'] !!}">
<meta name="twitter:title" content="@yield('metaTitle')">
<meta name="twitter:description" content="@yield('metaDescription')">
@if (isset($metaImg))
<meta name="twitter:image" content="@yield('metaImg')">
@endif
<link rel="canonical" href="{{ URL::current() }}" />