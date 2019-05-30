var gulp = require('gulp'),
  uglify = require('gulp-uglify');
imagemin = require('gulp-imagemin');
htmlmin = require('gulp-htmlmin');
cssmin = require('gulp-minify-css');

gulp.task('yasuoJs', function () {
  gulp.src('dist/videos/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/video'));
});


gulp.task('Imagemin', function () {
  gulp.src('dist/videos/assets/*.{png,jpg,gif,ico}')
    .pipe(imagemin({
      optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
      progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
      interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
      multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    }))
    .pipe(gulp.dest('dist/video/asset'));
});

gulp.task('yasuoTupian2', function () {
  gulp.src('dist/videos/assests/animal/*.{png,jpg,gif,ico,svg}')
    .pipe(imagemin({
      optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
      progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
      interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
      multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    }))
    .pipe(gulp.dest('dist/video/assets/images/animal'));
});
gulp.task('yasuoTupian3', function () {
  gulp.src('dist/videos/assests/fill/*.{png,jpg,gif,ico}')
    .pipe(imagemin({
      optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
      progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
      interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
      multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    }))
    .pipe(gulp.dest('dist/video/asset/images/fill'));
});
gulp.task('yasuoTupian4', function () {
  gulp.src('dist/videos/assests/outline/*.{png,jpg,gif,ico}')
    .pipe(imagemin({
      optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
      progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
      interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
      multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    }))
    .pipe(gulp.dest('dist/video/assets/outline'));
});
gulp.task('yasuoTupian5', function () {
  gulp.src('dist/videos/assests/twotone/*.{png,jpg,gif,ico}')
    .pipe(imagemin({
      optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
      progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
      interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
      multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    }))
    .pipe(gulp.dest('dist/video/assets/twotone'));
});

