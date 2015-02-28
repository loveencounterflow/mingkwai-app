

############################################################################################################
join                      = ( require 'path' ).join
#...........................................................................................................
CND                       = require 'cnd'
badge                     = 'MKTS/gulp'
warn                      = CND.get_logger 'warn',    badge
info                      = CND.get_logger 'info',    badge
#...........................................................................................................
gulp                      = require 'gulp'
coffee                    = require 'gulp-coffee'
stylus                    = require 'gulp-stylus'
shell                     = require 'gulp-shell'
#...........................................................................................................
sourcemaps                = require 'gulp-sourcemaps'
#...........................................................................................................
app_root                  = './mingkwai.app'
release_root              = './releases'
module_root               = join app_root, 'Contents/Resources/app.nw'

#-----------------------------------------------------------------------------------------------------------
gulp.task 'hello', ->
  console.log('Hello world task called')

#-----------------------------------------------------------------------------------------------------------
gulp.task 'build', [
  'build-coffee'
  'build-stylus'
  'build-html'
  ]

#-----------------------------------------------------------------------------------------------------------
gulp.task 'build-coffee', ->
  gulp.src join module_root, 'src/*.coffee'
    .pipe sourcemaps.init()
    .pipe coffee().on 'error', warn
    .pipe sourcemaps.write()
    .pipe gulp.dest join module_root, 'lib'
  return null

#-----------------------------------------------------------------------------------------------------------
gulp.task 'build-stylus', ->
  gulp.src join module_root, 'src/*.styl'
    .pipe sourcemaps.init()
    .pipe stylus().on 'error', warn
    .pipe sourcemaps.write()
    .pipe gulp.dest join module_root, 'lib'
  return null

#-----------------------------------------------------------------------------------------------------------
gulp.task 'build-html', shell.task [
  'node --harmony ./mingkwai.app/Contents/Resources/app.nw/lib/generate-html.js'
  ]

#-----------------------------------------------------------------------------------------------------------
gulp.task 'make', [
  'make-app'
  ]

#-----------------------------------------------------------------------------------------------------------
gulp.task 'make-app', ->
  temp_route = join '/tmp', 'mingkwai.app' + CND.random_integer 1e5, 1e6
  info temp_route
  # gulp.src  join app_root, '**/*'
  # gulp.src( ( join app_root, '**/*' ), { base: app_root, } ).on 'error', warn
  # # gulp.src  '/Volumes/Storage/io/mingkwai-app/mingkwai.app/Contents/Info.plist'
  #   .pipe gulp.dest release_root
  return null



