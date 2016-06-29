<!-- Styles -->
<link rel="stylesheet" type="text/css" href="<?= URL::asset('assets/build/top'.Config::get('app.minify').'.css') ?>" media="all" />
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