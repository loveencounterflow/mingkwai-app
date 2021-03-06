





# #-----------------------------------------------------------------------------------------------------------
# BD.style_of = ( element ) -> window.getComputedStyle element.get 0
# BD.box_of   = ( element ) -> ( element.get 0 ).getBoundingClientRect()

# #-----------------------------------------------------------------------------------------------------------
# BD.height_of = ( element ) ->
#   ### jQuery rounds to integer pixels; this is more precise. ###
#   ### TAINT algorithm not really tested; discrepencies to jQuery (apart from floating point issue) are known ###
#   style   = @style_of element
#   height  = parseFloat style[ 'height' ]
#   unless isFinite height
#     height = ( @box_of element )[ 'height' ]
#   return height \
#     - ( parseFloat style[ 'border-top-width'    ] ) \
#     - ( parseFloat style[ 'border-bottom-width' ] ) \
#     - ( parseFloat style[ 'margin-top'          ] ) \
#     - ( parseFloat style[ 'margin-bottom'       ] ) \
#     - ( parseFloat style[ 'padding-top'         ] ) \
#     - ( parseFloat style[ 'padding-bottom'      ] )

# #-----------------------------------------------------------------------------------------------------------
# BD.width_of = ( element ) ->
#   ### jQuery rounds to integer pixels; this is more precise. ###
#   ### TAINT algorithm not really tested; discrepencies to jQuery (apart from floating point issue) are known ###
#   style   = @style_of element
#   height  = parseFloat style[ 'width' ]
#   unless isFinite width
#     width = ( @box_of element )[ 'width' ]
#   return width \
#     - ( parseFloat style[ 'border-left-width'   ] ) \
#     - ( parseFloat style[ 'border-right-width'  ] ) \
#     - ( parseFloat style[ 'margin-left'         ] ) \
#     - ( parseFloat style[ 'margin-right'        ] ) \
#     - ( parseFloat style[ 'padding-left'        ] ) \
#     - ( parseFloat style[ 'padding-right'       ] )

# #-----------------------------------------------------------------------------------------------------------
# BD.top_of = ( element, y = null ) ->
#   return ( y ? window.scrollY ) + ( @box_of element )[ 'top' ]

# #-----------------------------------------------------------------------------------------------------------
# BD.bottom_of = ( element, y = null ) ->
#   return ( @top_of element, y ) + @height_of element

# #-----------------------------------------------------------------------------------------------------------
# BD.relative_top_of = ( element, selector, y = null ) ->
#   return ( @top_of element, y ) - ( @top_of element.parents selector, y )

# #-----------------------------------------------------------------------------------------------------------
# BD.relative_bottom_of = ( element, selector, y = null ) ->
#   return ( @relative_top_of element, selector, y ) + @height_of element


# # BD.x_height_of = ( element ) -> @height_of element

#-----------------------------------------------------------------------------------------------------------
window[ 'BD' ] = BD = {}

#-----------------------------------------------------------------------------------------------------------
BD._dom_from_hint   = ( hint ) -> hint.get 0
### `CS`: Computed Style ###
BD._number_from_cs  = ( dom, cs_name ) -> parseFloat getComputedStyle( dom )[ cs_name ]

#-----------------------------------------------------------------------------------------------------------
BD.CSS = {}

#-----------------------------------------------------------------------------------------------------------
BD.css = ( hint, cs_name ) => BD._number_from_cs ( BD._dom_from_hint hint ), cs_name

#-----------------------------------------------------------------------------------------------------------
BD.get_rectangle = ( hint, key = null ) =>
  R     = ( BD._dom_from_hint hint ).getBoundingClientRect()
  return if key? then R[ key ] else R

### Now avaliable as `npm install jquery-replace-text`:

#-----------------------------------------------------------------------------------------------------------
$.fn.text_nodes = ->
  # http://refactormycode.com/codes/341-jquery-all-descendent-text-nodes-within-a-node
  R = []
  @each ->
    fn = arguments.callee
    ( $ @ ).contents().each ->
      if @nodeType == 3
        R.push @
      else
        fn.apply $ @
  return $ R

#-----------------------------------------------------------------------------------------------------------
$.fn.replace_text = ( matcher, replacement, is_raw = no ) ->
  to_be_removed = if is_raw then null else []
  @text_nodes().each ( idx ) ->
    if ( new_value = @nodeValue.replace matcher, replacement ) isnt @nodeValue
      if not is_raw and '<' in new_value
        ( $ @ ).before new_value
        to_be_removed.push @
      else
        @nodeValue = new_value
    ( $ to_be_removed ).remove() if not is_raw and to_be_removed.length > 0
###

# `

# /*!
#  * jQuery replaceText - v1.1 - 11/21/2009
#  * http://benalman.com/projects/jquery-replacetext-plugin/
#  *
#  * Copyright (c) 2009 "Cowboy" Ben Alman
#  * Dual licensed under the MIT and GPL licenses.
#  * http://benalman.com/about/license/
#  * /

# // https://raw.githubusercontent.com/cowboy/jquery-replacetext/master/jquery.ba-replacetext.js

# // Script: jQuery replaceText: String replace for your jQueries!
# //
# // *Version: 1.1, Last updated: 11/21/2009*
# //
# // Project Home - http://benalman.com/projects/jquery-replacetext-plugin/
# // GitHub       - http://github.com/cowboy/jquery-replacetext/
# // Source       - http://github.com/cowboy/jquery-replacetext/raw/master/jquery.ba-replacetext.js
# // (Minified)   - http://github.com/cowboy/jquery-replacetext/raw/master/jquery.ba-replacetext.min.js (0.5kb)
# //
# // About: License
# //
# // Copyright (c) 2009 "Cowboy" Ben Alman,
# // Dual licensed under the MIT and GPL licenses.
# // http://benalman.com/about/license/
# //
# // About: Examples
# //
# // This working example, complete with fully commented code, illustrates one way
# // in which this plugin can be used.
# //
# // replaceText - http://benalman.com/code/projects/jquery-replacetext/examples/replacetext/
# //
# // About: Support and Testing
# //
# // Information about what version or versions of jQuery this plugin has been
# // tested with, and what browsers it has been tested in.
# //
# // jQuery Versions - 1.3.2, 1.4.1
# // Browsers Tested - Internet Explorer 6-8, Firefox 2-3.6, Safari 3-4, Chrome, Opera 9.6-10.1.
# //
# // About: Release History
# //
# // 1.1 - (11/21/2009) Simplified the code and API substantially.
# // 1.0 - (11/21/2009) Initial release

# (function($){
#   '$:nomunge'; // Used by YUI compressor.

#   // Method: jQuery.fn.replaceText
#   //
#   // Replace text in specified elements. Note that only text content will be
#   // modified, leaving all tags and attributes untouched. The new text can be
#   // either text or HTML.
#   //
#   // Uses the String prototype replace method, full documentation on that method
#   // can be found here:
#   //
#   // https://developer.mozilla.org/En/Core_JavaScript_1.5_Reference/Objects/String/Replace
#   //
#   // Usage:
#   //
#   // > jQuery('selector').replaceText( search, replace [, text_only ] );
#   //
#   // Arguments:
#   //
#   //  search - (RegExp|String) A RegExp object or substring to be replaced.
#   //    Because the String prototype replace method is used internally, this
#   //    argument should be specified accordingly.
#   //  replace - (String|Function) The String that replaces the substring received
#   //    from the search argument, or a function to be invoked to create the new
#   //    substring. Because the String prototype replace method is used internally,
#   //    this argument should be specified accordingly.
#   //  text_only - (Boolean) If true, any HTML will be rendered as text. Defaults
#   //    to false.
#   //
#   // Returns:
#   //
#   //  (jQuery) The initial jQuery collection of elements.

#   $.fn.replace_text = function( search, replace, text_only ) {
#     return this.each(function(){
#       var node = this.firstChild,
#         val,
#         new_val,

#         // Elements to be removed at the end.
#         remove = [];

#       // Only continue if firstChild exists.
#       if ( node ) {

#         // Loop over all childNodes.
#         do {

#           // Only process text nodes.
#           if ( node.nodeType === 3 ) {

#             // The original node value.
#             val = node.nodeValue;

#             // The new value.
#             new_val = val.replace( search, replace );

#             // Only replace text if the new value is actually different!
#             if ( new_val !== val ) {

#               if ( !text_only && /</.test( new_val ) ) {
#                 // The new value contains HTML, set it in a slower but far more
#                 // robust way.
#                 $(node).before( new_val );

#                 // Don't remove the node yet, or the loop will lose its place.
#                 remove.push( node );
#               } else {
#                 // The new value contains no HTML, so it can be set in this
#                 // very fast, simple way.
#                 node.nodeValue = new_val;
#               }
#             }
#           }

#         } while ( node = node.nextSibling );
#       }

#       // Time to remove those elements!
#       remove.length && $(remove).remove();
#     });
#   };

# })(jQuery);
# `

