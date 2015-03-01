

############################################################################################################
njs_path                  = require 'path'
njs_fs                    = require 'fs-extra'
join                      = njs_path.join
#...........................................................................................................
CND                       = require 'cnd'
rpr                       = CND.rpr
badge                     = 'MKTS/gulp'
warn                      = CND.get_logger 'warn',    badge
help                      = CND.get_logger 'help',    badge
debug                     = CND.get_logger 'debug',    badge
info                      = CND.get_logger 'info',    badge
#...........................................................................................................
gulp                      = require 'gulp'
coffee                    = require 'gulp-coffee'
stylus                    = require 'gulp-stylus'
shell                     = require 'gulp-shell'
zip                       = require 'gulp-zip'
rework                    = require 'rework'
#...........................................................................................................
sourcemaps                = require 'gulp-sourcemaps'
#...........................................................................................................
D                         = require 'pipedreams2'
$                         = D.remit.bind D
#...........................................................................................................
# app_name                  = njs_path.basename __dirname
app_name                  = 'mingkwai.app'
app_root                  = "./#{app_name}"
release_root              = './releases'
module_root               = join app_root, 'Contents/Resources/app.nw'
#...........................................................................................................

#-----------------------------------------------------------------------------------------------------------
get_timestamp = ->
  unless handler?
    R = ( new Date() ).toISOString()
    R = R.replace 'T', '-'
    R = R.replace /:/g, '-'
    R = R.replace /\..*$/g, ''
    return R

#-----------------------------------------------------------------------------------------------------------
archive_name    = "#{app_name}_#{get_timestamp()}"
temp_route      = join '/tmp', archive_name
### TAINT application-dependent ###
temp_app_route  = join temp_route, 'mingkwai.app'
zip_glob        = "#{temp_route}/**/*"
zip_name        = "#{archive_name}.zip"
npm_route       = join temp_app_route, 'Contents/Resources/app.nw'
modules_route   = join npm_route, 'node_modules'
source_route    = 'mingkwai.app'

#-----------------------------------------------------------------------------------------------------------
gulp.task 'hello', ->
  console.log('Hello world task called')

#-----------------------------------------------------------------------------------------------------------
gulp.task 'build', [
  'build-coffee'
  'build-stylus'
  'build-css-rework'
  'build-html'
  ]

#-----------------------------------------------------------------------------------------------------------
gulp.task 'build-coffee', ->
  return gulp.src join module_root, 'src/*.coffee'
    # .pipe D.$show()
    .pipe sourcemaps.init()
    .pipe coffee().on 'error', warn
    .pipe sourcemaps.write()
    .pipe gulp.dest join module_root, 'lib'

#-----------------------------------------------------------------------------------------------------------
gulp.task 'build-stylus', ->
  return gulp.src join module_root, 'src/mingkwai-main.styl'
    .pipe sourcemaps.init()
    .pipe stylus().on 'error', warn
    .pipe sourcemaps.write()
    .pipe gulp.dest join module_root, 'lib'

#-----------------------------------------------------------------------------------------------------------
gulp.task 'build-css-rework', [ 'build-coffee', 'build-stylus', ], ( handler ) ->
  RWP           = require join __dirname, module_root, './lib/rework-plugins'
  input_route   = join module_root, 'lib/mingkwai-main.css'
  output_route  = join module_root, 'lib/mingkwai-reworked-main.css'
  #.........................................................................................................
  css = njs_fs.readFile input_route, encoding: 'utf-8', ( error, css ) =>
    return handler error if error?
    #.......................................................................................................
    rw  = rework css, { source: input_route, }
    rw  = rw.use RWP.foobar_super()
    #.......................................................................................................
    css = rw.toString { sourcemap: true }
    #.......................................................................................................
    njs_fs.writeFile output_route, css, encoding: 'utf-8', ( error ) =>
      return handler error if error?
      handler null

#-----------------------------------------------------------------------------------------------------------
gulp.task 'build-html', shell.task [
  'node --harmony ./mingkwai.app/Contents/Resources/app.nw/lib/generate-html.js'
  ]

#-----------------------------------------------------------------------------------------------------------
gulp.task 'make-archive', [ 'make-app', ], ->
  help "archiving #{zip_glob}"
  help "to #{release_root}"
  return gulp.src zip_glob
    .pipe zip zip_name
    # .pipe D.$show()
    .pipe gulp.dest release_root

#-----------------------------------------------------------------------------------------------------------
gulp.task 'make', [
  'make-app'
  'make-archive'
  ]

#-----------------------------------------------------------------------------------------------------------
gulp.task 'make-app', ->
  #.........................................................................................................
  info "creating #{temp_app_route}"
  njs_fs.mkdirpSync temp_app_route
  info "copying from #{source_route} to #{temp_app_route}"
  #.........................................................................................................
  njs_fs.copySync source_route, temp_app_route
  for filename in njs_fs.readdirSync modules_route
    module_locator = join modules_route, filename
    if ( njs_fs.lstatSync module_locator ).isSymbolicLink()
      warn "removing #{module_locator}"
      njs_fs.unlinkSync module_locator
  #.........................................................................................................
  command = "cd #{npm_route} && npm install"
  info "executing #{rpr command}"
  return gulp.src ''
    .pipe shell command
    .pipe gulp.dest ''

############################################################################################################
help()
help "      -=(#)=-"
help()
help "    #{app_name}"
help()
help "      -=(#)=-"
help()



# #-----------------------------------------------------------------------------------------------------------
# @get_archiving_command_and_arguments = ( project_locator, archive_locator ) ->
#   ### thx to http://qntm.org/bash
#   ###
#   volume_name     = ( njs_path.basename archive_locator ).replace /\..*$/, ''
#   archive_format  = options[ 'archive-format']
#   @validate_archive_format archive_format
#   # volume_name     = BASH.escape volume_name
#   # project_locator = BASH.escape project_locator
#   # archive_locator = BASH.escape archive_locator
#   # return [ "/usr/bin/env", ['hdiutil', 'help', ] ]
#   # return "hdiutil create -format UDZO -srcfolder #{project_locator} -volname #{volume_name} #{archive_locator}"
#   command         = 'hdiutil'
#   arguments_      = [
#     'create'
#     '-format'
#     archive_format
#     '-srcfolder'
#     project_locator
#     '-volname'
#     volume_name
#     archive_locator ]
#   return [ command, arguments_, ]
