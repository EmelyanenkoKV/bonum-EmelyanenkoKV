'use strict';

import gulp from 'gulp';
import changed from 'gulp-changed';
import imageminZopfli from 'imagemin-zopfli';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';
import { paths } from '../gulpfile.babel';


// -------------------------------------
//   Task: images
// -------------------------------------

gulp.task('imagesWebp', function () {
  return gulp.src(paths.imagesWebp.src)
    .pipe(changed(paths.imagesWebp.dist))
    .pipe(imagemin([
      imageminPngquant({
        speed: 4,
        quality: [0.8, 0.95],
      }),
      imageminZopfli({
        more: false,
      }),
      imageminMozjpeg({
        progressive: true,
        quality: 90,
      }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: false },
          { removeUnusedNS: false },
          { removeUselessStrokeAndFill: false },
          { cleanupIDs: false },
          { removeComments: true },
          { removeEmptyAttrs: true },
          { removeEmptyText: true },
          { collapseGroups: true },
        ],
      }),
    ]))
      .pipe(webp())
    .pipe(gulp.dest(paths.imagesWebp.dist));
});
