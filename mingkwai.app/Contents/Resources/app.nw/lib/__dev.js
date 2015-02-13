// Generated by CoffeeScript 1.9.0
(function() {
  var $, $break_lines, $consume_lines, $convert_to_html, $hyphenate, $produce_lines, $throttle_items, CND, D, D2, LINESETTER, LODASH, after, alert, badge, debug, echo, help, info, log, njs_fs, njs_path, prune_buffer, rpr, sleep, step, suspend, urge, warn, whisper,
    __slice = [].slice;

  (require('guy-trace')).limit(10);

  njs_path = require('path');

  njs_fs = require('fs');

  CND = require('cnd');

  rpr = CND.rpr.bind(CND);

  badge = '眀快排字机/__dev';

  log = CND.get_logger('plain', badge);

  info = CND.get_logger('info', badge);

  alert = CND.get_logger('alert', badge);

  debug = CND.get_logger('debug', badge);

  warn = CND.get_logger('warn', badge);

  urge = CND.get_logger('urge', badge);

  whisper = CND.get_logger('whisper', badge);

  help = CND.get_logger('help', badge);

  echo = CND.echo.bind(CND);

  suspend = require('coffeenode-suspend');

  step = suspend.step;

  after = suspend.after;

  sleep = suspend.sleep;

  D2 = require('pipedreams2');

  D = require('pipedreams');

  $ = D2.remit.bind(D2);

  LODASH = require('lodash');

  LINESETTER = require('./LINESETTER');

  D2.$break_lines = function(settings) {

    /* Uses the [linebreak](https://github.com/devongovett/linebreak) module to find line break opportunities
    in a text using the Unicode Line Breaking Algorithm (UAX #14). For each text that arrives in the stream,
    `$break_lines` will send out one ore more 'events' (lists) of the format
    
    ```
    [ 'line-breaker-part', idx, part, required, position, ]
    ```
    
    where the first part identifies the event type, `idx` is a running enumeration of texts that have arrived,
    `part` is part of the text in question, `required` indicates whether a line break after that part is
    optional or required, and `position` contains the index of the first character *after* the current `part`.
    
    When `incremental` is set to `true`, then `part` will be the next substring after which a linebreak is
    possible; when `incremental` is set to `false` (the default), then `part` will contain the entire
    text up to the breakpoint; therefore, given a text `'So. Here we go!'`, the events will be either
    (with `incremental` set to `false`):
    
    ```coffee
    [ 'line-breaker-part', 0, 'So. ', false, 4 ]
    [ 'line-breaker-part', 0, 'Here ', false, 9 ]
    [ 'line-breaker-part', 0, 'we ', false, 12 ]
    [ 'line-breaker-part', 0, 'go!', false, 15 ]
    [ 'line-breaker-part', 0, null, null, null ]
    ```
    
    or (with `incremental` set to `true`):
    
    ```coffee
    [ 'line-breaker-part', 0, 'So. ', false, 4 ]
    [ 'line-breaker-part', 0, 'So. Here ', false, 9 ]
    [ 'line-breaker-part', 0, 'So. Here we ', false, 12 ]
    [ 'line-breaker-part', 0, 'So. Here we go!', false, 15 ]
    [ 'line-breaker-part', 0, null, null, null ]
    ```
     */

    /* https://github.com/devongovett/linebreak */
    var LineBreaker, idx, incremental, last_position, _ref;
    LineBreaker = require('linebreak');
    idx = -1;
    last_position = null;
    incremental = (_ref = settings != null ? settings['incremental'] : void 0) != null ? _ref : true;
    return $((function(_this) {
      return function(text, send) {
        var breakpoint, line_breaker, part, position, required;
        idx += +1;
        line_breaker = new LineBreaker(text);
        breakpoint = null;
        while (breakpoint = line_breaker.nextBreak()) {
          position = breakpoint.position, required = breakpoint.required;
          if (incremental && (last_position != null)) {
            part = text.slice(last_position, breakpoint.position);
          } else {
            part = text.slice(0, breakpoint.position);
          }
          last_position = position;
          send(['line-breaker-part', idx, part, required, position]);
        }
        return send(['line-breaker-part', idx, null, null, null]);
      };
    })(this));
  };

  D2.break_lines = function(text, settings) {
    var LineBreaker, R, breakpoint, extended, incremental, last_position, line_breaker, part, position, required, _ref, _ref1;
    LineBreaker = require('linebreak');
    last_position = null;
    incremental = (_ref = settings != null ? settings['incremental'] : void 0) != null ? _ref : true;
    extended = (_ref1 = settings != null ? settings['extended'] : void 0) != null ? _ref1 : false;
    line_breaker = new LineBreaker(text);
    R = [];
    while (breakpoint = line_breaker.nextBreak()) {
      position = breakpoint.position, required = breakpoint.required;
      if (incremental && (last_position != null)) {
        part = text.slice(last_position, breakpoint.position);
      } else {
        part = text.slice(0, breakpoint.position);
      }
      last_position = position;
      R.push(extended ? [part, required, position] : part);
    }
    return R;
  };

  $break_lines = function() {
    return $(function(event, send) {
      if (event[0] === 'text') {
        event[0] = 'text-parts';
        event[1] = D2.break_lines(event[1], {
          incremental: true
        });
      }
      return send(event);
    });
  };

  D2.$disperse_texts = function() {
    return $(function(event, send) {
      var tail, text_part, type, _i, _len, _ref, _results;
      type = event[0], tail = 2 <= event.length ? __slice.call(event, 1) : [];
      if (type === 'text-parts') {
        _ref = tail[0];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          text_part = _ref[_i];
          _results.push(send(['text-part', text_part]));
        }
        return _results;
      } else {
        return send(event);
      }
    });
  };

  $hyphenate = function() {
    var P, hyphenate;
    P = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    hyphenate = D2.new_hyphenator.apply(D2, P);
    return $(function(event, send) {
      if (event[0] === 'text') {
        event[1] = hyphenate(event[1]);
      }
      return send(event);
    });
  };

  prune_buffer = function(buffer, last_buffer_length) {
    var closed_tag_count, idx, tail, type, _i, _ref, _ref1;
    closed_tag_count = 0;
    for (idx = _i = _ref = last_buffer_length - 1; _i >= 0; idx = _i += -1) {
      _ref1 = buffer[idx], type = _ref1[0], tail = 2 <= _ref1.length ? __slice.call(_ref1, 1) : [];
      switch (type) {
        case 'text-part':
        case 'empty-tag':
        case 'lone-tag':
          buffer.splice(idx, 1);
          break;
        case 'close-tag':
          buffer.splice(idx, 1);
          closed_tag_count += +1;
          break;
        case 'open-tag':
          if (closed_tag_count > 0) {
            buffer.splice(idx, 1);
            closed_tag_count += -1;
          }
          break;
        default:
          warn("ignored event of type " + (rpr(type)));
      }
    }
    return buffer;
  };

  $produce_lines = function(source, state) {
    var buffer, f, last_buffer;
    buffer = [];
    last_buffer = null;
    state['next'] = false;
    f = (function(_this) {
      return function(event, send) {
        var tail, type;
        type = event[0], tail = 2 <= event.length ? __slice.call(event, 1) : [];
        if (state['next']) {
          if (last_buffer == null) {
            throw new Error("should never happen");
          }
          state['next'] = false;
          send(['set-line', last_buffer, false]);
          prune_buffer(buffer, last_buffer.length);
          last_buffer = null;
        }
        switch (type) {
          case 'open-tag':
          case 'close-tag':
            return buffer.push(event);
          case 'lone-tag':
          case 'empty-tag':
            buffer.push(event);
            last_buffer = LODASH.clone(buffer);
            return send(['test-line', buffer, false]);
          case 'text-part':
            buffer.push(event);
            last_buffer = LODASH.clone(buffer);
            return send(['test-line', buffer, false]);
        }
      };
    })(this);
    return $((function(_this) {
      return function(event, send) {
        var tail, type;
        type = event[0], tail = 2 <= event.length ? __slice.call(event, 1) : [];
        switch (type) {
          case 'end':

            /* TAINT buffer may be empty at this point */
            send(['set-line', buffer, true]);
            return send(event);
          default:
            return f(event, send);
        }
      };
    })(this));
  };

  $convert_to_html = function() {
    return $((function(_this) {
      return function(meta_event, send) {
        var buffer, event, html, is_last, meta_type, open_tags, tag_name, tail, type, _i, _j, _len, _len1;
        meta_type = meta_event[0], buffer = meta_event[1], is_last = meta_event[2];
        switch (meta_type) {
          case 'test-line':
          case 'set-line':

            /* Note: as per
            https://medium.com/the-javascript-collection/lets-write-fast-javascript-2b03c5575d9e#1e23, using
            `+=` should be faster than `[].join ''`.
             */
            html = '';
            open_tags = [];
            for (_i = 0, _len = buffer.length; _i < _len; _i++) {
              event = buffer[_i];
              type = event[0], tail = 2 <= event.length ? __slice.call(event, 1) : [];
              switch (type) {
                case 'open-tag':
                  html += LINESETTER._render_open_tag.apply(LINESETTER, tail);
                  open_tags.unshift(tail[0]);
                  break;
                case 'close-tag':
                  html += LINESETTER._render_close_tag(tail[0]);
                  open_tags.shift();
                  break;
                case 'lone-tag':
                  html += LINESETTER._render_open_tag.apply(LINESETTER, tail);
                  break;
                case 'empty-tag':
                  html += LINESETTER._render_empty_tag.apply(LINESETTER, tail);
                  break;
                case 'text-part':

                  /* TAINT escaping `<`, `>`, `&` ??? */
                  html += tail[0];
                  break;
                default:
                  warn("ignored event of type " + (rpr(type)));
              }
            }
            for (_j = 0, _len1 = open_tags.length; _j < _len1; _j++) {
              tag_name = open_tags[_j];
              html += LINESETTER._render_close_tag(tag_name);
            }
            return send([meta_type, html, is_last]);
          case 'end':
            return send(meta_event);
          default:
            return warn("ignored event of meta-type " + (rpr(meta_type)));
        }
      };
    })(this));
  };

  $consume_lines = function(state, text, test_line, accept_line, handler) {
    return $((function(_this) {
      return function(meta_event, send) {
        var html, is_last, meta_type;
        meta_type = meta_event[0], html = meta_event[1], is_last = meta_event[2];
        switch (meta_type) {
          case 'test-line':
            return state['next'] = test_line(html);
          case 'set-line':
            return accept_line(html, is_last);
          case 'end':
            return handler(null);
          default:
            return warn("ignored event of meta-type " + (rpr(meta_type)));
        }
      };
    })(this));
  };


  /* -> LINESETTER */

  $throttle_items = function(items_per_second) {
    var buffer, count, emit, has_ended, idx, start, timer, _send;
    buffer = [];
    count = 0;
    idx = 0;
    _send = null;
    timer = null;
    has_ended = false;
    emit = function() {
      var data;
      if ((data = buffer[idx]) !== void 0) {
        buffer[idx] = void 0;
        idx += +1;
        count += -1;
        _send(data);
      }
      if (has_ended && count < 1) {
        clearInterval(timer);
        _send.end();
      }
      return null;
    };
    start = function() {
      return timer = setInterval(emit, 1 / items_per_second * 1000);
    };
    return $((function(_this) {
      return function(data, send, end) {
        if (data != null) {
          if (_send == null) {
            _send = send;
            start();
          }
          buffer.push(data);
          count += +1;
        }
        if (end != null) {
          return has_ended = true;
        }
      };
    })(this));
  };

  this.demo_3 = function() {
    var accept_line, test_line, text_idx, texts, typeset_text;
    text_idx = -1;
    texts = ["<i>It's <b>very</b> supercalifragilistic</i>, http://<wbr>x.com <span class='x'></span>she said, exasperated, and certainly"];
    test_line = (function(_this) {
      return function(html) {

        /* Must return whether HTML exceeds line length. */
        return html.length > 25;
      };
    })(this);
    accept_line = (function(_this) {
      return function(html, is_last) {
        help(html, is_last ? '*' : '');
        return null;
      };
    })(this);
    typeset_text = (function(_this) {
      return function(text, test_line, accept_line, handler) {
        var input;
        input = D2.create_throughstream();
        input.pipe(D2.HTML.$parse()).pipe($throttle_items(5)).pipe(D2.$show());
        input.on('end', function() {
          whisper("input ended.");
          return handler(null);
        });
        info('©28u', rpr(text));
        input.write(text);
        return input.end();
      };
    })(this);
    step((function(_this) {
      return function*(resume) {
        var text, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = texts.length; _i < _len; _i++) {
          text = texts[_i];
          _results.push((yield typeset_text(text, test_line, accept_line, resume)));
        }
        return _results;
      };
    })(this));
    return null;
  };

  if (module.parent == null) {
    this.demo_3();
  }

}).call(this);
