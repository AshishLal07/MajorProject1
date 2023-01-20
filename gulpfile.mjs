import gulp from 'gulp';
import cssnano from 'gulp-cssnano'; //minify css file
import rev from 'gulp-rev';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
// let gulp =  import('gulp')
// let cssnano =  import('gulp-cssnano');
// let rev =  import('gulp-rev');
// let dartSass =  import('sass');
// let sass = import('gulp-sass');
import uglify from 'gulp-uglify-es'// minify js files
import imagemin from 'gulp-imagemin'; // minify images files
import {deleteSync} from  'del';
const sass = gulpSass(dartSass);
const uglifyjs = uglify.default;



// to use es models add "type:models" in package library

gulp.task('css',function(done){
    console.log('minifying css...');
    // ** means every file and folder inside sass and *.scss means every extension of this criteria
    gulp.src('./assets/sass/**/*.scss') 
    .pipe(sass())  // converting sass to css
    .pipe(cssnano()) // compresing to nano
    .pipe(gulp.dest('./assets/css')) // sending to destination css

     gulp.src('./assets/**/*.css') // taking converted files from css folder
    .pipe(rev())    //pipe is used to continouse middleware and revise the file name
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest('public/assets/rev-manifest.json',{  //manifest store the details of what file name changed into object
        base: './public/assets',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets')) // sending the changed name files to public/assets
    
    done();
});


gulp.task('images',function(done){
    console.log('minifying images...');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest('public/assets/rev-manifest.json',{ //pass the path of the manifest as parameter before the options if we want the merge to work
        base: './public/assets',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

gulp.task('js',function(done){
    console.log('minifying js...');
    gulp.src('./assets/**/*.js')
    .pipe(uglifyjs())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest('public/assets/rev-manifest.json',{
        base: './public/assets',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});
// to empty the public/assets directory

gulp.task('clean:assets',function(done){
    deleteSync('./public/assets');
    done();
});

// to run the all tasks together
gulp.task('build', gulp.series('clean:assets','css','js','images'),function(done){
    console.log('building the assets');
    done();
})