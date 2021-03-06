// Generated by CoffeeScript 1.9.1
(function() {
  var CND, badge, debug, help, info, rpr, warn, xcss_rules;

  CND = require('cnd');

  rpr = CND.rpr;

  badge = 'MKTS/mingkwai-styles-fix';

  warn = CND.get_logger('warn', badge);

  help = CND.get_logger('help', badge);

  debug = CND.get_logger('debug', badge);

  info = CND.get_logger('info', badge);

  xcss_rules = require('./xcss-rules');

  this.rules_from_node = function(app, node) {
    var R, i, idx, idxs, len, property, ref, rules, selector, selectors, value;
    if (node.length !== 1) {
      throw new Error("argument `node` must contain single element, has " + node.length);
    }
    R = {};
    selectors = xcss_rules['%selectors'], rules = xcss_rules.rules;

    /* TAINT selectors not properly ordered */
    for (selector in selectors) {
      idxs = selectors[selector];
      if (!node.is(selector)) {
        continue;
      }
      for (i = 0, len = idxs.length; i < len; i++) {
        idx = idxs[i];
        ref = rules[idx], property = ref.property, value = ref.value;
        R[property] = value;
      }
    }
    return R;
  };

}).call(this);
