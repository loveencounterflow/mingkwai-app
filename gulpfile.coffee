

############################################################################################################
join                      = ( require 'path' ).join
#...........................................................................................................
CND                       = require 'cnd'
badge                     = 'MKTS/gulp'
warn                      = CND.get_logger 'warn',    badge
#...........................................................................................................
gulp                      = require 'gulp'
coffee                    = require 'gulp-coffee'
stylus                    = require 'gulp-stylus'
shell                     = require 'gulp-shell'
#...........................................................................................................
sourcemaps                = require 'gulp-sourcemaps'
#...........................................................................................................
root                      = './mingkwai.app/Contents/Resources/app.nw'

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
  gulp.src join root, 'src/*.coffee'
    .pipe sourcemaps.init()
    .pipe coffee().on 'error', warn
    .pipe sourcemaps.write()
    .pipe gulp.dest join root, 'lib'
  return null

#-----------------------------------------------------------------------------------------------------------
gulp.task 'build-stylus', ->
  gulp.src join root, 'src/*.styl'
    .pipe sourcemaps.init()
    .pipe stylus().on 'error', warn
    .pipe sourcemaps.write()
    .pipe gulp.dest join root, 'lib'
  return null

#-----------------------------------------------------------------------------------------------------------
gulp.task 'build-html', shell.task [
  'node --harmony ./mingkwai.app/Contents/Resources/app.nw/lib/generate-html.js'
  ]



