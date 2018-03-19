<!-- Styles -->
<link rel="stylesheet" type="text/css" href="{{ URL::asset('public')}}{{ mix('/build/front.css') }}" media="all" />
<!-- Javascript -->
<script>
// <![CDATA[
var config = {
    env: "{{ config('app.env') }}",
    lang: "{{ config('app.locale') }}",
    pathAssets: "{{ URL::asset('public') }}",
    pathRoot : "{{ URL::asset('') }}"
}
// ]]>
</script>