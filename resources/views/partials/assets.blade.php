<!-- Styles -->
<link rel="stylesheet" type="text/css" href="{{ URL::asset('public/build/front'.Config::get('app.minify').'.css') }}" media="all" />
<!-- Javascript -->
<script type="text/javascript" src="{{ URL::asset('public/build/top'.Config::get('app.minify').'.js') }}"></script>
<script type="text/javascript">
// <![CDATA[
var config = {
    lang: "{{ config('app.locale') }}",
    pathAssets: "{{ URL::asset('public') }}"
}
// ]]>
</script>