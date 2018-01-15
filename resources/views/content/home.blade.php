@extends('templates/layout')

@section('metaTitle', $metaTitle)
@section('metaDescription', $metaDescription)
@section('jscontroller', $jscontroller)

@section('view')
<h1>{!!$item['content']['rendered']!!}</h1>
@endsection