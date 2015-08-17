(function() {
  var CND, alert, badge, debug, help, info, log, njs_fs, njs_path, rpr, urge, walk_rules, warn, whisper,
    slice = [].slice;

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

  walk_rules = function(ast, handler) {
    var entry, i, j, len, len1, media, ref, ref1, rule, rules, type;
    ref = ast['rules'];
    for (i = 0, len = ref.length; i < len; i++) {
      entry = ref[i];
      type = entry.type;
      switch (type) {
        case 'media':
          media = entry.media, rules = entry.rules;
          ref1 = entry['rules'];
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            rule = ref1[j];
            handler(null, media, rule);
          }
          break;
        case 'rule':
          handler(null, '*', entry);
          break;
        case 'font-face':
        case 'comment':
          null;
          break;
        default:
          return handler(new Error("unknown type " + (rpr(type))));
      }
    }
  };

  this.foobar_super = function() {
    return (function(_this) {
      return function(ast, rw) {
        var declaration, declarations, i, len, position, property, ref, ref1, results, selectors, value;
        ref = ast['rules'];
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          ref1 = ref[i], selectors = ref1.selectors, declarations = ref1.declarations, position = ref1.position;
          if (declarations == null) {
            continue;
          }
          results.push((function() {
            var j, len1, results1;
            results1 = [];
            for (j = 0, len1 = declarations.length; j < len1; j++) {
              declaration = declarations[j];
              property = declaration.property, value = declaration.value;
              if (!/^-mkts-foobar$/.test(property)) {
                continue;
              }
              results1.push(declaration['property'] = '-moz-supercssyeah');
            }
            return results1;
          })());
        }
        return results;
      };
    })(this);
  };

  this.collect = function() {
    var Z, handler, i, matchers, rules, s;
    matchers = 2 <= arguments.length ? slice.call(arguments, 0, i = arguments.length - 1) : (i = 0, []), handler = arguments[i++];

    /* Collect all matching properties and call handler with a list of matched CSS declarations; each
    declaration will be a pod `{ selectors, property, value, }`.
     */
    matchers = (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = matchers.length; j < len; j++) {
        s = matchers[j];
        results.push([s, CND.type_of(s)]);
      }
      return results;
    })();
    rules = [];
    Z = {
      '%selectors': {},
      'rules': rules
    };
    return (function(_this) {
      return function(ast) {
        walk_rules(ast, function(error, media, rule) {
          var base, declaration, declarations, idx, j, k, l, len, len1, len2, matcher, property, ref, selector, selectors, type, value;
          if (error != null) {
            throw error;
          }
          selectors = rule.selectors, declarations = rule.declarations;
          for (j = 0, len = declarations.length; j < len; j++) {
            declaration = declarations[j];
            property = declaration.property, value = declaration.value;
            for (k = 0, len1 = matchers.length; k < len1; k++) {
              ref = matchers[k], matcher = ref[0], type = ref[1];
              switch (type) {
                case 'text':
                  if (property !== matcher) {
                    continue;
                  }
                  break;
                case 'jsregex':
                  if (!matcher.test(property)) {
                    continue;
                  }
                  break;
                default:
                  return handler(new Error("unknown matcher type " + (rpr(type))));
              }
              rules.push({
                media: media,
                selectors: selectors,
                property: property,
                value: value
              });
              idx = rules.length - 1;

              /* TAINT selectors not properly ordered */
              for (l = 0, len2 = selectors.length; l < len2; l++) {
                selector = selectors[l];
                ((base = Z['%selectors'])[selector] != null ? base[selector] : base[selector] = []).push(idx);
              }
            }
          }
        });
        return handler(null, Z);
      };
    })(this);
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJld29yay1wbHVnaW5zLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtBQUFBLE1BQUEsaUdBQUE7SUFBQTs7RUFBQSxRQUFBLEdBQTRCLE9BQUEsQ0FBUSxNQUFSOztFQUM1QixNQUFBLEdBQTRCLE9BQUEsQ0FBUSxJQUFSOztFQUU1QixHQUFBLEdBQTRCLE9BQUEsQ0FBUSxLQUFSOztFQUM1QixHQUFBLEdBQTRCLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBUixDQUFhLEdBQWI7O0VBQzVCLEtBQUEsR0FBNEI7O0VBQzVCLEdBQUEsR0FBNEIsR0FBRyxDQUFDLFVBQUosQ0FBZSxPQUFmLEVBQTRCLEtBQTVCOztFQUM1QixJQUFBLEdBQTRCLEdBQUcsQ0FBQyxVQUFKLENBQWUsTUFBZixFQUE0QixLQUE1Qjs7RUFDNUIsT0FBQSxHQUE0QixHQUFHLENBQUMsVUFBSixDQUFlLFNBQWYsRUFBNEIsS0FBNUI7O0VBQzVCLEtBQUEsR0FBNEIsR0FBRyxDQUFDLFVBQUosQ0FBZSxPQUFmLEVBQTRCLEtBQTVCOztFQUM1QixLQUFBLEdBQTRCLEdBQUcsQ0FBQyxVQUFKLENBQWUsT0FBZixFQUE0QixLQUE1Qjs7RUFDNUIsSUFBQSxHQUE0QixHQUFHLENBQUMsVUFBSixDQUFlLE1BQWYsRUFBNEIsS0FBNUI7O0VBQzVCLElBQUEsR0FBNEIsR0FBRyxDQUFDLFVBQUosQ0FBZSxNQUFmLEVBQTRCLEtBQTVCOztFQUM1QixJQUFBLEdBQTRCLEdBQUcsQ0FBQyxVQUFKLENBQWUsTUFBZixFQUE0QixLQUE1Qjs7RUFLNUIsVUFBQSxHQUFhLFNBQUUsR0FBRixFQUFPLE9BQVA7QUFDWCxRQUFBO0FBQUE7QUFBQSxTQUFBLHFDQUFBOztNQUNJLE9BQVUsTUFBVjtBQUNGLGNBQU8sSUFBUDtBQUFBLGFBQ08sT0FEUDtVQUVNLGNBQUEsS0FBRixFQUFTLGNBQUE7QUFDVDtBQUFBLGVBQUEsd0NBQUE7O1lBQUEsT0FBQSxDQUFRLElBQVIsRUFBYyxLQUFkLEVBQXFCLElBQXJCO0FBQUE7QUFGRztBQURQLGFBSU8sTUFKUDtVQUtJLE9BQUEsQ0FBUSxJQUFSLEVBQWMsR0FBZCxFQUFtQixLQUFuQjtBQURHO0FBSlAsYUFNTyxXQU5QO0FBQUEsYUFNb0IsU0FOcEI7VUFPSTtBQURnQjtBQU5wQjtBQVVJLGlCQUFPLE9BQUEsQ0FBWSxJQUFBLEtBQUEsQ0FBTSxlQUFBLEdBQWUsQ0FBQyxHQUFBLENBQUksSUFBSixDQUFELENBQXJCLENBQVo7QUFWWDtBQUZGO0VBRFc7O0VBZ0JiLElBQUMsQ0FBQSxZQUFELEdBQWdCLFNBQUE7QUFDZCxXQUFPLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBRSxHQUFGLEVBQU8sRUFBUDtBQUNMLFlBQUE7QUFBQTtBQUFBO2FBQUEscUNBQUE7eUJBQU0saUJBQUEsV0FBVyxvQkFBQSxjQUFjLGdCQUFBO1VBQzdCLElBQWdCLG9CQUFoQjtBQUFBLHFCQUFBOzs7O0FBQ0E7aUJBQUEsZ0RBQUE7O2NBQ0ksdUJBQUEsUUFBRixFQUFZLG9CQUFBO2NBQ1osSUFBQSxDQUFnQixnQkFBZ0IsQ0FBQyxJQUFqQixDQUFzQixRQUF0QixDQUFoQjtBQUFBLHlCQUFBOzs0QkFDQSxXQUFhLENBQUEsVUFBQSxDQUFiLEdBQTRCO0FBSDlCOzs7QUFGRjs7TUFESztJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUE7RUFETzs7RUFVaEIsSUFBQyxDQUFBLE9BQUQsR0FBVyxTQUFBO0FBQ1QsUUFBQTtJQURXLHFHQUFhOztBQUN4Qjs7O0lBRUEsUUFBQTs7QUFBYztXQUFBLDBDQUFBOztxQkFBQSxDQUFFLENBQUYsRUFBSyxHQUFHLENBQUMsT0FBSixDQUFZLENBQVosQ0FBTDtBQUFBOzs7SUFDZCxLQUFBLEdBQVk7SUFDWixDQUFBLEdBQ0U7TUFBQSxZQUFBLEVBQWMsRUFBZDtNQUNBLE9BQUEsRUFBYyxLQURkOztBQUdGLFdBQU8sQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFFLEdBQUY7UUFDTCxVQUFBLENBQVcsR0FBWCxFQUFnQixTQUFFLEtBQUYsRUFBUyxLQUFULEVBQWdCLElBQWhCO0FBQ2QsY0FBQTtVQUFBLElBQWUsYUFBZjtBQUFBLGtCQUFNLE1BQU47O1VBQ0UsaUJBQUEsU0FBRixFQUFhLG9CQUFBO0FBQ2IsZUFBQSw4Q0FBQTs7WUFDSSx1QkFBQSxRQUFGLEVBQVksb0JBQUE7QUFDWixpQkFBQSw0Q0FBQTtpQ0FBTSxrQkFBUztBQUNiLHNCQUFPLElBQVA7QUFBQSxxQkFDTyxNQURQO2tCQUN1QixJQUFnQixRQUFBLEtBQVksT0FBNUI7QUFBQSw2QkFBQTs7QUFBaEI7QUFEUCxxQkFFTyxTQUZQO2tCQUV1QixJQUFBLENBQWdCLE9BQU8sQ0FBQyxJQUFSLENBQWEsUUFBYixDQUFoQjtBQUFBLDZCQUFBOztBQUFoQjtBQUZQO0FBR08seUJBQU8sT0FBQSxDQUFZLElBQUEsS0FBQSxDQUFNLHVCQUFBLEdBQXVCLENBQUMsR0FBQSxDQUFJLElBQUosQ0FBRCxDQUE3QixDQUFaO0FBSGQ7Y0FJQSxLQUFLLENBQUMsSUFBTixDQUFXO2dCQUFFLE9BQUEsS0FBRjtnQkFBUyxXQUFBLFNBQVQ7Z0JBQW9CLFVBQUEsUUFBcEI7Z0JBQThCLE9BQUEsS0FBOUI7ZUFBWDtjQUNBLEdBQUEsR0FBTSxLQUFLLENBQUMsTUFBTixHQUFlOztBQUNyQjtBQUNBLG1CQUFBLDZDQUFBOztnQkFDRSxrREFBcUIsQ0FBQSxRQUFBLFFBQUEsQ0FBQSxRQUFBLElBQWEsRUFBbEMsQ0FBc0MsQ0FBQyxJQUF2QyxDQUE0QyxHQUE1QztBQURGO0FBUkY7QUFGRjtRQUhjLENBQWhCO2VBZ0JBLE9BQUEsQ0FBUSxJQUFSLEVBQWMsQ0FBZDtNQWpCSztJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUE7RUFURTtBQTVDWCIsImZpbGUiOiJyZXdvcmstcGx1Z2lucy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIlxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5uanNfcGF0aCAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSAncGF0aCdcbm5qc19mcyAgICAgICAgICAgICAgICAgICAgPSByZXF1aXJlICdmcydcbiMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuQ05EICAgICAgICAgICAgICAgICAgICAgICA9IHJlcXVpcmUgJ2NuZCdcbnJwciAgICAgICAgICAgICAgICAgICAgICAgPSBDTkQucnByLmJpbmQgQ05EXG5iYWRnZSAgICAgICAgICAgICAgICAgICAgID0gJ+ecgOW/q+aOkuWtl+acui9yZXdvcmstcGx1Z2lucydcbmxvZyAgICAgICAgICAgICAgICAgICAgICAgPSBDTkQuZ2V0X2xvZ2dlciAncGxhaW4nLCAgICAgYmFkZ2VcbmluZm8gICAgICAgICAgICAgICAgICAgICAgPSBDTkQuZ2V0X2xvZ2dlciAnaW5mbycsICAgICAgYmFkZ2VcbndoaXNwZXIgICAgICAgICAgICAgICAgICAgPSBDTkQuZ2V0X2xvZ2dlciAnd2hpc3BlcicsICAgYmFkZ2VcbmFsZXJ0ICAgICAgICAgICAgICAgICAgICAgPSBDTkQuZ2V0X2xvZ2dlciAnYWxlcnQnLCAgICAgYmFkZ2VcbmRlYnVnICAgICAgICAgICAgICAgICAgICAgPSBDTkQuZ2V0X2xvZ2dlciAnZGVidWcnLCAgICAgYmFkZ2Vcbndhcm4gICAgICAgICAgICAgICAgICAgICAgPSBDTkQuZ2V0X2xvZ2dlciAnd2FybicsICAgICAgYmFkZ2VcbmhlbHAgICAgICAgICAgICAgICAgICAgICAgPSBDTkQuZ2V0X2xvZ2dlciAnaGVscCcsICAgICAgYmFkZ2VcbnVyZ2UgICAgICAgICAgICAgICAgICAgICAgPSBDTkQuZ2V0X2xvZ2dlciAndXJnZScsICAgICAgYmFkZ2VcbiMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuXG5cbiMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxud2Fsa19ydWxlcyA9ICggYXN0LCBoYW5kbGVyICkgLT5cbiAgZm9yIGVudHJ5IGluIGFzdFsgJ3J1bGVzJyBdXG4gICAgeyB0eXBlLCB9ID0gZW50cnlcbiAgICBzd2l0Y2ggdHlwZVxuICAgICAgd2hlbiAnbWVkaWEnXG4gICAgICAgIHsgbWVkaWEsIHJ1bGVzLCB9ID0gZW50cnlcbiAgICAgICAgaGFuZGxlciBudWxsLCBtZWRpYSwgcnVsZSBmb3IgcnVsZSBpbiBlbnRyeVsgJ3J1bGVzJyBdXG4gICAgICB3aGVuICdydWxlJ1xuICAgICAgICBoYW5kbGVyIG51bGwsICcqJywgZW50cnlcbiAgICAgIHdoZW4gJ2ZvbnQtZmFjZScsICdjb21tZW50J1xuICAgICAgICBudWxsXG4gICAgICAgICMgd2FybiBcImlnbm9yZWQgQ1NTIEFTVCBlbnRyeSBvZiB0eXBlICN7cnByIHR5cGV9XCJcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIGhhbmRsZXIgbmV3IEVycm9yIFwidW5rbm93biB0eXBlICN7cnByIHR5cGV9XCJcblxuIy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5AZm9vYmFyX3N1cGVyID0gLT5cbiAgcmV0dXJuICggYXN0LCBydyApID0+XG4gICAgZm9yIHsgc2VsZWN0b3JzLCBkZWNsYXJhdGlvbnMsIHBvc2l0aW9uLCB9IGluIGFzdFsgJ3J1bGVzJyBdXG4gICAgICBjb250aW51ZSB1bmxlc3MgZGVjbGFyYXRpb25zP1xuICAgICAgZm9yIGRlY2xhcmF0aW9uIGluIGRlY2xhcmF0aW9uc1xuICAgICAgICB7IHByb3BlcnR5LCB2YWx1ZSwgfSA9IGRlY2xhcmF0aW9uXG4gICAgICAgIGNvbnRpbnVlIHVubGVzcyAvXi1ta3RzLWZvb2JhciQvLnRlc3QgcHJvcGVydHlcbiAgICAgICAgZGVjbGFyYXRpb25bICdwcm9wZXJ0eScgXSA9ICctbW96LXN1cGVyY3NzeWVhaCdcblxuIy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5AY29sbGVjdCA9ICggbWF0Y2hlcnMuLi4sIGhhbmRsZXIgKSAtPlxuICAjIyMgQ29sbGVjdCBhbGwgbWF0Y2hpbmcgcHJvcGVydGllcyBhbmQgY2FsbCBoYW5kbGVyIHdpdGggYSBsaXN0IG9mIG1hdGNoZWQgQ1NTIGRlY2xhcmF0aW9uczsgZWFjaFxuICBkZWNsYXJhdGlvbiB3aWxsIGJlIGEgcG9kIGB7IHNlbGVjdG9ycywgcHJvcGVydHksIHZhbHVlLCB9YC4gIyMjXG4gIG1hdGNoZXJzICA9ICggWyBzLCBDTkQudHlwZV9vZiBzLCBdIGZvciBzIGluIG1hdGNoZXJzIClcbiAgcnVsZXMgICAgID0gW11cbiAgWiAgICAgICAgID1cbiAgICAnJXNlbGVjdG9ycyc6IHt9XG4gICAgJ3J1bGVzJzogICAgICBydWxlc1xuICAjLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG4gIHJldHVybiAoIGFzdCApID0+XG4gICAgd2Fsa19ydWxlcyBhc3QsICggZXJyb3IsIG1lZGlhLCBydWxlICkgLT5cbiAgICAgIHRocm93IGVycm9yIGlmIGVycm9yP1xuICAgICAgeyBzZWxlY3RvcnMsIGRlY2xhcmF0aW9ucywgfSA9IHJ1bGVcbiAgICAgIGZvciBkZWNsYXJhdGlvbiBpbiBkZWNsYXJhdGlvbnNcbiAgICAgICAgeyBwcm9wZXJ0eSwgdmFsdWUsIH0gPSBkZWNsYXJhdGlvblxuICAgICAgICBmb3IgWyBtYXRjaGVyLCB0eXBlLCBdIGluIG1hdGNoZXJzXG4gICAgICAgICAgc3dpdGNoIHR5cGVcbiAgICAgICAgICAgIHdoZW4gJ3RleHQnICAgICB0aGVuIGNvbnRpbnVlIHVubGVzcyBwcm9wZXJ0eSBpcyBtYXRjaGVyXG4gICAgICAgICAgICB3aGVuICdqc3JlZ2V4JyAgdGhlbiBjb250aW51ZSB1bmxlc3MgbWF0Y2hlci50ZXN0IHByb3BlcnR5XG4gICAgICAgICAgICBlbHNlIHJldHVybiBoYW5kbGVyIG5ldyBFcnJvciBcInVua25vd24gbWF0Y2hlciB0eXBlICN7cnByIHR5cGV9XCJcbiAgICAgICAgICBydWxlcy5wdXNoIHsgbWVkaWEsIHNlbGVjdG9ycywgcHJvcGVydHksIHZhbHVlLCB9XG4gICAgICAgICAgaWR4ID0gcnVsZXMubGVuZ3RoIC0gMVxuICAgICAgICAgICMjIyBUQUlOVCBzZWxlY3RvcnMgbm90IHByb3Blcmx5IG9yZGVyZWQgIyMjXG4gICAgICAgICAgZm9yIHNlbGVjdG9yIGluIHNlbGVjdG9yc1xuICAgICAgICAgICAgKCBaWyAnJXNlbGVjdG9ycycgXVsgc2VsZWN0b3IgXT89IFtdICkucHVzaCBpZHhcbiAgICAjLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICAgIGhhbmRsZXIgbnVsbCwgWlxuXG5cblxuIl19