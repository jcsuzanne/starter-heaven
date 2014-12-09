// Trottle
var gulp                    =   require('gulp');
var connect                 =   require('gulp-connect');
var throttle                =   require('gulp-throttle');

gulp.task('test', function() {
  connect.server();
  throttle({
    local_port: '8081',
    remote_port: '8080',
    upstream: 2000,
    downstream: 2000,
    keep_alive: true });
});