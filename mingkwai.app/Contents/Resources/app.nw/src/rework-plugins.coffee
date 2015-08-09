
############################################################################################################
njs_path                  = require 'path'
njs_fs                    = require 'fs'
#...........................................................................................................
CND                       = require 'cnd'
rpr                       = CND.rpr.bind CND
badge                     = '眀快排字机/rework-plugins'
log                       = CND.get_logger 'plain',     badge
info                      = CND.get_logger 'info',      badge
whisper                   = CND.get_logger 'whisper',   badge
alert                     = CND.get_logger 'alert',     badge
debug                     = CND.get_logger 'debug',     badge
warn                      = CND.get_logger 'warn',      badge
help                      = CND.get_logger 'help',      badge
urge                      = CND.get_logger 'urge',      badge
#...........................................................................................................


#-----------------------------------------------------------------------------------------------------------
walk_rules = ( ast, handler ) ->
  for entry in ast[ 'rules' ]
    { type, } = entry
    switch type
      when 'media'
        { media, rules, } = entry
        handler null, media, rule for rule in entry[ 'rules' ]
      when 'rule'
        handler null, '*', entry
      when 'font-face', 'comment'
        null
        # warn "ignored CSS AST entry of type #{rpr type}"
      else
        return handler new Error "unknown type #{rpr type}"

#-----------------------------------------------------------------------------------------------------------
@foobar_super = ->
  return ( ast, rw ) =>
    for { selectors, declarations, position, } in ast[ 'rules' ]
      continue unless declarations?
      for declaration in declarations
        { property, value, } = declaration
        continue unless /^-mkts-foobar$/.test property
        declaration[ 'property' ] = '-moz-supercssyeah'

#-----------------------------------------------------------------------------------------------------------
@collect = ( matchers..., handler ) ->
  ### Collect all matching properties and call handler with a list of matched CSS declarations; each
  declaration will be a pod `{ selectors, property, value, }`. ###
  matchers  = ( [ s, CND.type_of s, ] for s in matchers )
  rules     = []
  Z         =
    '%selectors': {}
    'rules':      rules
  #.........................................................................................................
  return ( ast ) =>
    walk_rules ast, ( error, media, rule ) ->
      throw error if error?
      { selectors, declarations, } = rule
      for declaration in declarations
        { property, value, } = declaration
        for [ matcher, type, ] in matchers
          switch type
            when 'text'     then continue unless property is matcher
            when 'jsregex'  then continue unless matcher.test property
            else return handler new Error "unknown matcher type #{rpr type}"
          rules.push { media, selectors, property, value, }
          idx = rules.length - 1
          ### TAINT selectors not properly ordered ###
          for selector in selectors
            ( Z[ '%selectors' ][ selector ]?= [] ).push idx
    #.......................................................................................................
    handler null, Z



