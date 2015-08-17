(function() {
  var CND, badge, debug, handler_by_properties, help, info, rpr, warn, xcss_rules;

  CND = require('cnd');

  rpr = CND.rpr;

  badge = 'MKTS/mingkwai-styles-fix';

  warn = CND.get_logger('warn', badge);

  help = CND.get_logger('help', badge);

  debug = CND.get_logger('debug', badge);

  info = CND.get_logger('info', badge);


  /* TAINT selectors not properly ordered */

  xcss_rules = require('./xcss-rules');

  handler_by_properties = {
    '-mkts-draggable': function(rule) {
      var i, len, media, property, results, selector, selectors, targets, value;
      media = rule.media, selectors = rule.selectors, property = rule.property, value = rule.value;
      if (value !== 'xy') {
        throw new Error("unknown value for xCSS property " + property + ": " + value);
      }
      results = [];
      for (i = 0, len = selectors.length; i < len; i++) {
        selector = selectors[i];
        targets = $(selector);
        targets.draggable();
        results.push(help("found " + targets.length + " targets for `" + selector + " { " + property + ": " + value + "; }`"));
      }
      return results;
    },
    '-mkts-columns': function(rule) {
      var media, property, selectors, value;
      media = rule.media, selectors = rule.selectors, property = rule.property, value = rule.value;
      if (value !== 'all' && value !== '1') {
        throw new Error("unknown value for xCSS property " + property + ": " + value);
      }
      return debug('©zpmvr', rule);
    },
    '-mkts-foobar': function(rule) {
      var property, selectors, value;
      selectors = rule.selectors, property = rule.property, value = rule.value;
      return debug('©uhbsC', rule);
    }
  };

  ($('document')).ready((function(_this) {
    return function() {
      var handler, i, len, property, ref, rule;
      ref = xcss_rules['rules'];
      for (i = 0, len = ref.length; i < len; i++) {
        rule = ref[i];
        property = rule.property;
        if ((handler = handler_by_properties[property]) != null) {
          handler(rule);
        } else {
          warn("no handler for xCSS property " + (rpr(property)) + "; skipping");
        }
      }

      /* Although not strictly xCSS rules, we process behaviors that rely on tag names (rather than
      style names used in names) right here.
       */
      ($('i')).on('mouseover', function(event) {
        return ($(this)).switchClass('small', 'medium');
      });
      ($('i')).on('mouseout', function(event) {
        return ($(this)).switchClass('medium', 'small');
      });
      return ($('tool, i')).on('click', function(event) {
        var action, method, ref1, ref2, ref3;
        if ((action = ($(this)).attr('action')) != null) {
          if ((method = (ref1 = window['app']) != null ? (ref2 = ref1['MKTS']) != null ? (ref3 = ref2['ACTIONS']) != null ? ref3[action] : void 0 : void 0 : void 0) != null) {
            help("clicked on tool; action " + (rpr(action)));
            method();
          } else {
            warn("unknown action " + (rpr(action)));
          }
        } else {
          warn("`<tool>` tag without `action` attribute");
        }
        return false;
      });
    };
  })(this));

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3MteGNzcy1ydWxlcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0E7QUFBQSxNQUFBOztFQUFBLEdBQUEsR0FBNEIsT0FBQSxDQUFRLEtBQVI7O0VBQzVCLEdBQUEsR0FBNEIsR0FBRyxDQUFDOztFQUNoQyxLQUFBLEdBQTRCOztFQUM1QixJQUFBLEdBQTRCLEdBQUcsQ0FBQyxVQUFKLENBQWUsTUFBZixFQUEwQixLQUExQjs7RUFDNUIsSUFBQSxHQUE0QixHQUFHLENBQUMsVUFBSixDQUFlLE1BQWYsRUFBMEIsS0FBMUI7O0VBQzVCLEtBQUEsR0FBNEIsR0FBRyxDQUFDLFVBQUosQ0FBZSxPQUFmLEVBQTJCLEtBQTNCOztFQUM1QixJQUFBLEdBQTRCLEdBQUcsQ0FBQyxVQUFKLENBQWUsTUFBZixFQUEwQixLQUExQjs7O0FBRTVCOztFQUNBLFVBQUEsR0FBNEIsT0FBQSxDQUFRLGNBQVI7O0VBRzVCLHFCQUFBLEdBR0U7SUFBQSxpQkFBQSxFQUFtQixTQUFFLElBQUY7QUFDakIsVUFBQTtNQUFFLGFBQUEsS0FBRixFQUFTLGlCQUFBLFNBQVQsRUFBb0IsZ0JBQUEsUUFBcEIsRUFBOEIsYUFBQTtNQUM5QixJQUFPLEtBQUEsS0FBUyxJQUFoQjtBQUNFLGNBQVUsSUFBQSxLQUFBLENBQU0sa0NBQUEsR0FBbUMsUUFBbkMsR0FBNEMsSUFBNUMsR0FBZ0QsS0FBdEQsRUFEWjs7QUFFQTtXQUFBLDJDQUFBOztRQUNFLE9BQUEsR0FBVSxDQUFBLENBQUUsUUFBRjtRQUNWLE9BQU8sQ0FBQyxTQUFSLENBQUE7cUJBQ0EsSUFBQSxDQUFLLFFBQUEsR0FBUyxPQUFPLENBQUMsTUFBakIsR0FBd0IsZ0JBQXhCLEdBQXdDLFFBQXhDLEdBQWlELEtBQWpELEdBQXNELFFBQXRELEdBQStELElBQS9ELEdBQW1FLEtBQW5FLEdBQXlFLE1BQTlFO0FBSEY7O0lBSmlCLENBQW5CO0lBVUEsZUFBQSxFQUFpQixTQUFFLElBQUY7QUFDZixVQUFBO01BQUUsYUFBQSxLQUFGLEVBQVMsaUJBQUEsU0FBVCxFQUFvQixnQkFBQSxRQUFwQixFQUE4QixhQUFBO01BQzlCLElBQU8sS0FBQSxLQUFXLEtBQVgsSUFBQSxLQUFBLEtBQWtCLEdBQXpCO0FBQ0UsY0FBVSxJQUFBLEtBQUEsQ0FBTSxrQ0FBQSxHQUFtQyxRQUFuQyxHQUE0QyxJQUE1QyxHQUFnRCxLQUF0RCxFQURaOzthQUVBLEtBQUEsQ0FBTSxRQUFOLEVBQWdCLElBQWhCO0lBSmUsQ0FWakI7SUFpQkEsY0FBQSxFQUFnQixTQUFFLElBQUY7QUFDZCxVQUFBO01BQUUsaUJBQUEsU0FBRixFQUFhLGdCQUFBLFFBQWIsRUFBdUIsYUFBQTthQUN2QixLQUFBLENBQU0sUUFBTixFQUFnQixJQUFoQjtJQUZjLENBakJoQjs7O0VBc0JGLENBQUUsQ0FBQSxDQUFFLFVBQUYsQ0FBRixDQUFnQixDQUFDLEtBQWpCLENBQXVCLENBQUEsU0FBQSxLQUFBO1dBQUEsU0FBQTtBQUVyQixVQUFBO0FBQUE7QUFBQSxXQUFBLHFDQUFBOztRQUNJLFdBQWMsS0FBZDtRQUNGLElBQUcsbURBQUg7VUFDRSxPQUFBLENBQVEsSUFBUixFQURGO1NBQUEsTUFBQTtVQUdFLElBQUEsQ0FBSywrQkFBQSxHQUErQixDQUFDLEdBQUEsQ0FBSSxRQUFKLENBQUQsQ0FBL0IsR0FBNkMsWUFBbEQsRUFIRjs7QUFGRjs7QUFZQTs7O01BT0EsQ0FBRSxDQUFBLENBQUUsR0FBRixDQUFGLENBQVMsQ0FBQyxFQUFWLENBQWEsV0FBYixFQUEwQixTQUFFLEtBQUY7ZUFDeEIsQ0FBRSxDQUFBLENBQUUsSUFBRixDQUFGLENBQU8sQ0FBQyxXQUFSLENBQW9CLE9BQXBCLEVBQTZCLFFBQTdCO01BRHdCLENBQTFCO01BR0EsQ0FBRSxDQUFBLENBQUUsR0FBRixDQUFGLENBQVMsQ0FBQyxFQUFWLENBQWEsVUFBYixFQUF5QixTQUFFLEtBQUY7ZUFDdkIsQ0FBRSxDQUFBLENBQUUsSUFBRixDQUFGLENBQU8sQ0FBQyxXQUFSLENBQW9CLFFBQXBCLEVBQThCLE9BQTlCO01BRHVCLENBQXpCO2FBR0EsQ0FBRSxDQUFBLENBQUUsU0FBRixDQUFGLENBQWUsQ0FBQyxFQUFoQixDQUFtQixPQUFuQixFQUE0QixTQUFFLEtBQUY7QUFDMUIsWUFBQTtRQUFBLElBQUcsMkNBQUg7VUFDRSxJQUFHLDhKQUFIO1lBQ0UsSUFBQSxDQUFLLDBCQUFBLEdBQTBCLENBQUMsR0FBQSxDQUFJLE1BQUosQ0FBRCxDQUEvQjtZQUNBLE1BQUEsQ0FBQSxFQUZGO1dBQUEsTUFBQTtZQUlFLElBQUEsQ0FBSyxpQkFBQSxHQUFpQixDQUFDLEdBQUEsQ0FBSSxNQUFKLENBQUQsQ0FBdEIsRUFKRjtXQURGO1NBQUEsTUFBQTtVQU9FLElBQUEsQ0FBSyx5Q0FBTCxFQVBGOztBQVNBLGVBQU87TUFWbUIsQ0FBNUI7SUEzQnFCO0VBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF2QjtBQXJDQSIsImZpbGUiOiJwcm9jZXNzLXhjc3MtcnVsZXMuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJcblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4jIG5qc19wYXRoICAgICAgICAgICAgICAgICAgPSByZXF1aXJlICdwYXRoJ1xuIyBuanNfZnMgICAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSAnZnMtZXh0cmEnXG4jIGpvaW4gICAgICAgICAgICAgICAgICAgICAgPSBuanNfcGF0aC5qb2luXG4jLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cbkNORCAgICAgICAgICAgICAgICAgICAgICAgPSByZXF1aXJlICdjbmQnXG5ycHIgICAgICAgICAgICAgICAgICAgICAgID0gQ05ELnJwclxuYmFkZ2UgICAgICAgICAgICAgICAgICAgICA9ICdNS1RTL21pbmdrd2FpLXN0eWxlcy1maXgnXG53YXJuICAgICAgICAgICAgICAgICAgICAgID0gQ05ELmdldF9sb2dnZXIgJ3dhcm4nLCAgICBiYWRnZVxuaGVscCAgICAgICAgICAgICAgICAgICAgICA9IENORC5nZXRfbG9nZ2VyICdoZWxwJywgICAgYmFkZ2VcbmRlYnVnICAgICAgICAgICAgICAgICAgICAgPSBDTkQuZ2V0X2xvZ2dlciAnZGVidWcnLCAgICBiYWRnZVxuaW5mbyAgICAgICAgICAgICAgICAgICAgICA9IENORC5nZXRfbG9nZ2VyICdpbmZvJywgICAgYmFkZ2VcbiMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuIyMjIFRBSU5UIHNlbGVjdG9ycyBub3QgcHJvcGVybHkgb3JkZXJlZCAjIyNcbnhjc3NfcnVsZXMgICAgICAgICAgICAgICAgPSByZXF1aXJlICcuL3hjc3MtcnVsZXMnXG5cbiMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuaGFuZGxlcl9ieV9wcm9wZXJ0aWVzID1cblxuICAjLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICctbWt0cy1kcmFnZ2FibGUnOiAoIHJ1bGUgKSAtPlxuICAgIHsgbWVkaWEsIHNlbGVjdG9ycywgcHJvcGVydHksIHZhbHVlLCB9ID0gcnVsZVxuICAgIHVubGVzcyB2YWx1ZSBpcyAneHknXG4gICAgICB0aHJvdyBuZXcgRXJyb3IgXCJ1bmtub3duIHZhbHVlIGZvciB4Q1NTIHByb3BlcnR5ICN7cHJvcGVydHl9OiAje3ZhbHVlfVwiXG4gICAgZm9yIHNlbGVjdG9yIGluIHNlbGVjdG9yc1xuICAgICAgdGFyZ2V0cyA9ICQgc2VsZWN0b3JcbiAgICAgIHRhcmdldHMuZHJhZ2dhYmxlKClcbiAgICAgIGhlbHAgXCJmb3VuZCAje3RhcmdldHMubGVuZ3RofSB0YXJnZXRzIGZvciBgI3tzZWxlY3Rvcn0geyAje3Byb3BlcnR5fTogI3t2YWx1ZX07IH1gXCJcblxuICAjLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICctbWt0cy1jb2x1bW5zJzogKCBydWxlICkgLT5cbiAgICB7IG1lZGlhLCBzZWxlY3RvcnMsIHByb3BlcnR5LCB2YWx1ZSwgfSA9IHJ1bGVcbiAgICB1bmxlc3MgdmFsdWUgaW4gWyAnYWxsJywgJzEnLCBdXG4gICAgICB0aHJvdyBuZXcgRXJyb3IgXCJ1bmtub3duIHZhbHVlIGZvciB4Q1NTIHByb3BlcnR5ICN7cHJvcGVydHl9OiAje3ZhbHVlfVwiXG4gICAgZGVidWcgJ8KpenBtdnInLCBydWxlXG5cbiAgIy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAnLW1rdHMtZm9vYmFyJzogKCBydWxlICkgLT5cbiAgICB7IHNlbGVjdG9ycywgcHJvcGVydHksIHZhbHVlLCB9ID0gcnVsZVxuICAgIGRlYnVnICfCqXVoYnNDJywgcnVsZVxuXG4jLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiggJCAnZG9jdW1lbnQnICkucmVhZHkgPT5cbiAgIyAoICQgJy5kcmFnZ2FibGUnICkuZHJhZ2dhYmxlKClcbiAgZm9yIHJ1bGUgaW4geGNzc19ydWxlc1sgJ3J1bGVzJyBdXG4gICAgeyBwcm9wZXJ0eSwgfSA9IHJ1bGVcbiAgICBpZiAoIGhhbmRsZXIgPSBoYW5kbGVyX2J5X3Byb3BlcnRpZXNbIHByb3BlcnR5IF0gKT9cbiAgICAgIGhhbmRsZXIgcnVsZVxuICAgIGVsc2VcbiAgICAgIHdhcm4gXCJubyBoYW5kbGVyIGZvciB4Q1NTIHByb3BlcnR5ICN7cnByIHByb3BlcnR5fTsgc2tpcHBpbmdcIlxuICAjLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG5cblxuICAjPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICMgVE9PTCBBQ1RJT05TXG4gICMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgIyMjIEFsdGhvdWdoIG5vdCBzdHJpY3RseSB4Q1NTIHJ1bGVzLCB3ZSBwcm9jZXNzIGJlaGF2aW9ycyB0aGF0IHJlbHkgb24gdGFnIG5hbWVzIChyYXRoZXIgdGhhblxuICBzdHlsZSBuYW1lcyB1c2VkIGluIG5hbWVzKSByaWdodCBoZXJlLiAjIyNcbiAgIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICAjICggJCAnZG9jdW1lbnQnICkub24gJ21vdXNlbW92ZScsICggZXZlbnQgKSAtPlxuICAjICAgZGVidWcgJ8KpWUM2RUcnLCBbIGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSwgXVxuICAjICAgd2luZG93WyAnYXBwJyBdWyAnbW91c2UtcG9zaXRpb24nIF0gPSBbIGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSwgXVxuICAjLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG4gICggJCAnaScgKS5vbiAnbW91c2VvdmVyJywgKCBldmVudCApIC0+XG4gICAgKCAkIEAgKS5zd2l0Y2hDbGFzcyAnc21hbGwnLCAnbWVkaXVtJ1xuICAjLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG4gICggJCAnaScgKS5vbiAnbW91c2VvdXQnLCAoIGV2ZW50ICkgLT5cbiAgICAoICQgQCApLnN3aXRjaENsYXNzICdtZWRpdW0nLCAnc21hbGwnXG4gICMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cbiAgKCAkICd0b29sLCBpJyApLm9uICdjbGljaycsICggZXZlbnQgKSAtPlxuICAgIGlmICggYWN0aW9uID0gKCAkIEAgKS5hdHRyICdhY3Rpb24nICk/XG4gICAgICBpZiAoIG1ldGhvZCA9IHdpbmRvd1sgJ2FwcCcgXT9bICdNS1RTJyBdP1sgJ0FDVElPTlMnIF0/WyBhY3Rpb24gXSApP1xuICAgICAgICBoZWxwIFwiY2xpY2tlZCBvbiB0b29sOyBhY3Rpb24gI3tycHIgYWN0aW9ufVwiXG4gICAgICAgIG1ldGhvZCgpXG4gICAgICBlbHNlXG4gICAgICAgIHdhcm4gXCJ1bmtub3duIGFjdGlvbiAje3JwciBhY3Rpb259XCJcbiAgICBlbHNlXG4gICAgICB3YXJuIFwiYDx0b29sPmAgdGFnIHdpdGhvdXQgYGFjdGlvbmAgYXR0cmlidXRlXCJcbiAgICAjLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICAgIHJldHVybiBmYWxzZVxuXG5cblxuXG5cblxuXG4iXX0=