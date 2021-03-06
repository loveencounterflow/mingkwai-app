// Generated by CoffeeScript 1.9.1
(function() {
  var BD;

  window['BD'] = BD = {};

  BD._dom_from_hint = function(hint) {
    return hint.get(0);
  };


  /* `CS`: Computed Style */

  BD._number_from_cs = function(dom, cs_name) {
    return parseFloat(getComputedStyle(dom)[cs_name]);
  };

  BD.CSS = {};

  BD.css = (function(_this) {
    return function(hint, cs_name) {
      return BD._number_from_cs(BD._dom_from_hint(hint), cs_name);
    };
  })(this);

  BD.get_rectangle = (function(_this) {
    return function(hint, key) {
      var R;
      if (key == null) {
        key = null;
      }
      R = (BD._dom_from_hint(hint)).getBoundingClientRect();
      if (key != null) {
        return R[key];
      } else {
        return R;
      }
    };
  })(this);


  /* Now avaliable as `npm install jquery-replace-text`:
  
  #-----------------------------------------------------------------------------------------------------------
  $.fn.text_nodes = ->
     * http://refactormycode.com/codes/341-jquery-all-descendent-text-nodes-within-a-node
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
   */

}).call(this);
