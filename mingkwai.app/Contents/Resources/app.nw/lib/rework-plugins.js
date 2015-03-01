// Generated by CoffeeScript 1.9.0
(function() {
  var CND, alert, badge, debug, help, info, log, njs_fs, njs_path, rpr, urge, warn, whisper;

  njs_path = require('path');

  njs_fs = require('fs');

  CND = require('cnd');

  rpr = CND.rpr.bind(CND);

  badge = '眀快排字机/rework-plugins';

  log = CND.get_logger('plain', badge);

  info = CND.get_logger('info', badge);

  whisper = CND.get_logger('whisper', badge);

  alert = CND.get_logger('alert', badge);

  debug = CND.get_logger('debug', badge);

  warn = CND.get_logger('warn', badge);

  help = CND.get_logger('help', badge);

  urge = CND.get_logger('urge', badge);

  this.foobar_super = function() {
    return (function(_this) {
      return function(ast, rw) {
        var declaration, declarations, position, property, selectors, value, _i, _len, _ref, _ref1, _results;
        _ref = ast['rules'];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          _ref1 = _ref[_i], selectors = _ref1.selectors, declarations = _ref1.declarations, position = _ref1.position;
          if (declarations == null) {
            continue;
          }
          _results.push((function() {
            var _j, _len1, _results1;
            _results1 = [];
            for (_j = 0, _len1 = declarations.length; _j < _len1; _j++) {
              declaration = declarations[_j];
              property = declaration.property, value = declaration.value;
              if (!/^foobar$/.test(property)) {
                continue;
              }
              _results1.push(declaration['property'] = '-moz-supercssyeah');
            }
            return _results1;
          })());
        }
        return _results;
      };
    })(this);
    return null;
  };

}).call(this);
