// Определяем переменную "preprocessor"
const gulp = require('gulp');
// let preprocessor = 'sass';

// Определяем константы Gulp
const {src, dest, parallel, series, watch} = require('gulp');

// Подключаем Browsersync
const browserSync = require('browser-sync').create();

// Подключаем gulp-concat
const concat = require('gulp-concat');

// Подключаем gulp-uglify-es
const uglify = require('gulp-uglify-es').default;

// Подключаем модули gulp-sass и gulp-less
const less = require('gulp-less');
// const less = require('gulp-less');

// Подключаем Autoprefixer

const autoprefixer = require("gulp-autoprefixer");//работает под postcss
const csso = require("gulp-csso");

// Подключаем gulp-imagemin для работы с изображениями
const imagemin = require('gulp-imagemin');

const svgstore = require("gulp-svgstore");//собиральщик спрайта
const svgmin = require("gulp-svgmin");//минификатор SVG
const cheerio = require('gulp-cheerio');
// Подключаем модуль gulp-newer
const newer = require('gulp-newer');

// Подключаем модуль del
const del = require('del');

const rename = require("gulp-rename");
const replace = require("gulp-replace");

// Определяем логику работы Browsersync
function browsersync() {
    browserSync.init({ // Инициализация Browsersync
        server: {baseDir: 'build/'}, // Указываем папку сервера
        notify: false, // Отключаем уведомления
        online: true // Режим работы: true или false
    })
}

function scripts() {
    return src([
            // Берём файлы из источников
            // 'node_modules/jquery/dist/jquery.min.js', // Пример подключения библиотеки
            'app/js/script.js',
            'app/js/hotels_script.js', // Пользовательские скрипты, использующие библиотеку, должны быть
            // подключены в конце
        ],
        { allowEmpty: true }
    )
        .pipe(concat('script.min.js')) // Конкатенируем в один файл
        .pipe(dest('app/js/'))
        .pipe(uglify()) // Сжимаем JavaScript
        .pipe(dest('build/js/')) // Выгружаем готовый файл в папку назначения
        .pipe(browserSync.stream()) // Триггерим Browsersync для обновления страницы
}

function styles() {
    return src(['app/css/sanitize.css',
        'app/less/styles.less'], { allowEmpty: true }) // Выбираем источник: "app/sass/main.sass" или
    // "app/less/main.less"
        .pipe(less()) // Преобразуем значение переменной "preprocessor" в функцию
        .pipe(concat('style.css')) // Конкатенируем в файл app.min.css
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
        .pipe(dest('app/css'))// Создадим префиксы с помощью Autoprefixer
        .pipe(csso()) // Минифицируем стили
        .pipe(rename('style.min.css'))
        .pipe(dest('app/css/')) // Выгрузим результат в папку "app/css/"
        .pipe(dest('build/css/'))
        .pipe(browserSync.stream()); // Сделаем инъекцию в браузер
}

function images() {
    return src('app/img/src/**/*', { allowEmpty: true }) // Берём все изображения из папки источника
        .pipe(newer('app/img/dest/')) // Проверяем, было ли изменено (сжато) изображение ранее
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
        })) // Сжимаем и оптимизируем изображеня
        .pipe(dest('app/img/dest/'))
        .pipe(dest('build/img/'))// Выгружаем оптимизированные изображения в папку назначения
}

function cleanimg() {
    return del('app/img/dest/**/*', {force: true, allowEmpty: true }) // Удаляем всё содержимое папки "app/images/dest/"
}

function copyImg() {
    return src('app/img/dest/**/*')
        .pipe(dest('build/img/'))
}

function svg() {
    return src('app/img/src/*-ico.svg', { allowEmpty: true })
    // minify svg
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        // remove all fill, style and stroke declarations in out shapes
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
                $("svg").attr("style",  "display:none");
            },
            parserOptions: {xmlMode: true}
        }))
        // cheerio plugin create unnecessary string '&gt;', so replace it.
        .pipe(replace('&gt;', '>'))
        // build svg sprite
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(rename("sprite-svg.svg"))
        .pipe(dest('app/img/dest/'))
        .pipe(dest("build/img/"));
}

function buildcopy() {
    return src([ // Выбираем нужные файлы
        'app/css/**/*.min.css',
        'app/js/**/*.min.js',
        'app/fonts/**/*',
        'app/**/*.html',
    ], {base: 'app', allowEmpty: true}) // Параметр "base" сохраняет структуру проекта при копировании
        .pipe(dest('build/'))

    // Выгружаем в папку с финальной сборкой
}


gulp.task("htmlCopy", function() {
    return gulp.src("app/**/*.html", {allowEmpty: true})
        .pipe(gulp.dest("build"));
});

gulp.task("htmlUpdate", gulp.series("htmlCopy", function(done) {
    browserSync.reload();
    done();
}));


function cleandist() {
    return del('build/**/*', {force: true}) // Удаляем всё содержимое папки "dist/"
}

function startwatch() {

    // Выбираем все файлы JS в проекте, а затем исключим с суффиксом .min.js
    watch(['app/**/*.js', '!app/**/*.min.js'], series([scripts]));

    // Мониторим файлы препроцессора на изменения
    watch('app/**/less/**/*', series([styles]));

    // Мониторим файлы HTML на изменения
    watch(['app/**/*.html']).on('change', series(['htmlUpdate']));

    // Мониторим папку-источник изображений и выполняем images(), если есть изменения
    watch('app/img/src/**/*', series([images, svg, copyImg]));

}

// Экспортируем функцию browsersync() как таск browsersync. Значение после знака = это имеющаяся функция.
exports.browsersync = browsersync;

// Экспортируем функцию scripts() в таск scripts
exports.scripts = scripts;

// Экспортируем функцию styles() в таск styles
exports.styles = styles;

// Экспорт функции images() в таск images
exports.images = images;
exports.copyImg = copyImg;

// Экспортируем функцию cleanimg() как таск cleanimg
exports.cleanimg = cleanimg;

exports.svg = svg;

// Создаём новый таск "build", который последовательно выполняет нужные операции
exports.build = series(cleandist, styles, scripts, images, svg, copyImg, buildcopy);

// Экспортируем дефолтный таск с нужным набором функций
exports.default = parallel(browsersync, startwatch);