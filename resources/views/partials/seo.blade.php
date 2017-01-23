<?php
$title = (isset($metaTitle))?strip_tags($metaTitle):'';
$description = (isset($metaDescription))?$metaDescription:'';
$img = (isset($metaImg))?$metaImg:$shared['global']['metaImg'];
?>
<title>{{ $title }}</title>
<meta property="og:title" content="{{ $title }}">
<meta property="og:site_name" content="{{ $shared['global']['sitename'] }}">
<meta property="og:url" content="{{ URL::current() }}">
<meta property="og:description" content="{{ $description }}">
<meta property="og:image" content="{{ $img }}" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:width" content="800" />
<meta property="og:image:height" content="600" />
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="{!! $shared['global']['social']['twitter_site'] !!}">
<meta name="twitter:title" content="{{ $title }}">
<meta name="twitter:description" content="{{ $description }}">
<meta name="twitter:image:src" content="{{ $img }}">
<meta name="robots" content="index, follow">
<meta name="description" content="{{ $description }}" />
<link rel="canonical" href="{{ URL::current() }}" />