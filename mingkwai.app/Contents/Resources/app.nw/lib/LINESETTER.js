(function() {
  var $, $async, BD, CND, COLUMN, D, HOTMETAL, MKTS, XCSS, after, alert, app, badge, debug, document, echo, glyph_replacements, help, info, jQuery, later, log, mm_from_npx, mm_from_rpx, npx_from_mm, rpr, rpx_from_mm, sleep, step, suspend, urge, warn, whisper, window, ƒ;

  CND = require('cnd');

  rpr = CND.rpr.bind(CND);

  badge = '眀快排字机/LINESETTER';

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

  later = setImmediate;

  sleep = suspend.sleep;

  D = require('pipedreams2');

  $ = D.remit.bind(D);

  $async = D.remit_async.bind(D);

  HOTMETAL = D.HOTMETAL;

  XCSS = require('./XCSS');

  BD = require('./BLAIDDDRWG');

  glyph_replacements = require('./glyph-replacements');


  /* The module-globals become available when `demo` is called with `app` argument */

  jQuery = null;

  MKTS = null;

  window = null;

  document = null;

  app = null;

  mm_from_rpx = function(d) {
    return MKTS.GAUGE.mm_from_rpx(app, d);
  };

  mm_from_npx = function(d) {
    return MKTS.GAUGE.mm_from_npx(app, d);
  };

  rpx_from_mm = function(d) {
    return MKTS.GAUGE.rpx_from_mm(app, d);
  };

  npx_from_mm = function(d) {
    return MKTS.GAUGE.npx_from_mm(app, d);
  };

  ƒ = function(x, precision) {
    if (precision == null) {
      precision = 2;
    }
    return x.toFixed(precision);
  };

  this._get_slugs_container = function(gcolumn) {
    var R;
    R = jQuery('container');
    if (R.length === 0) {
      R = jQuery("<container style='display:block;width:100%;height:30mm;outline:1px solid red'></container>");
      gcolumn.append(R);
    }
    return R;
  };

  this.get_column_linecounts = function(strategy, line_count, column_count) {

    /* thx to http://stackoverflow.com/a/1244369/256361 */
    var R, col, i, ref;
    R = [];
    switch (strategy) {
      case 'even':
        for (col = i = 1, ref = column_count; 1 <= ref ? i <= ref : i >= ref; col = 1 <= ref ? ++i : --i) {
          R.push(Math.floor((line_count + column_count - col) / column_count));
        }
        break;
      default:
        throw new Error("unknown strategy " + (rpr(strategy)));
    }
    return R;
  };

  COLUMN = {};

  COLUMN.new_column = function(substrate, selector) {
    var R, elements, i, idx, lines, ref;
    R = {
      '~isa': 'LINESETTER/column',
      '%self': substrate,
      'lines': lines = [],
      'length': 0
    };
    if (selector != null) {
      elements = substrate.find(selector);
      for (idx = i = 0, ref = elements.length; 0 <= ref ? i < ref : i > ref; idx = 0 <= ref ? ++i : --i) {
        lines.push(elements.eq(idx));
      }
      R['length'] = elements.length;
    }
    return R;
  };

  COLUMN.push = function(me, line) {
    if (CND.isa_text(line)) {
      line = jQuery(line);
    }
    me['lines'].push(line);
    me['%self'].append(line);
    me['length'] = me['lines'].length;
    return me;
  };

  COLUMN.pop = function(me) {
    var R;
    if (me['length'] < 1) {
      throw new Error("unable to pop from empty list");
    }
    R = me['lines'].pop();
    R.detach();
    me['length'] = me['lines'].length;
    return R;
  };

  COLUMN.insert = function(me, line, idx) {
    if (CND.isa_text(line)) {
      line = jQuery(line);
    }
    if (idx != null) {
      me['lines'].splice(idx, 0, line);
      me['%self'][idx].before(line);
    } else {
      me['lines'].unshift(line);
      me['%self'].prepend(line);
    }
    me['length'] = me['lines'].length;
    return me;
  };

  COLUMN.pull = function(me) {
    var R;
    R = me['%lines'].shift();
    R.detach();
    me['length'] = me['lines'].length;
    return R;
  };

  COLUMN.pop_over = function(me, other, count, handler) {
    var _, arity, i, length, ref;
    if (count == null) {
      count = 1;
    }
    if (handler == null) {
      handler = null;
    }
    switch (arity = arguments.length) {
      case 2:
      case 4:
        null;
        break;
      case 3:
        if (CND.isa_function(count)) {
          handler = count;
          count = 1;
        }
        break;
      default:
        throw new Error("expected between 2 and 4 arguments, got " + arity);
    }
    if (handler != null) {
      return this.pop_over_async(me, other, count(handler));
    }
    if ((length = me['length']) < me['length']) {
      throw new Error("unable to divide with count " + count + " and length " + length);
    }
    if (!CND.isa(other, 'LINESETTER/column')) {
      other = this.new_column(substrate);
    }
    for (_ = i = 1, ref = count; 1 <= ref ? i <= ref : i >= ref; _ = 1 <= ref ? ++i : --i) {
      this.insert(other, this.pop(me));
    }
    return [me, other];
  };

  COLUMN.pop_over_async = function(me, other, count, handler) {
    var length;
    if ((length = me['length']) < me['length']) {
      throw new Error("unable to divide with count " + count + " and length " + length);
    }
    if (!CND.isa(other, 'LINESETTER/column')) {
      other = this.new_column(substrate);
    }
    return step((function(_this) {
      return function*(resume) {
        var _, i, line, ref;
        for (_ = i = 1, ref = count; 1 <= ref ? i <= ref : i >= ref; _ = 1 <= ref ? ++i : --i) {
          line = _this.pop(me);
          (yield after(0.001, resume));
          _this.insert(other, line);
        }
        return handler(null, [me, other]);
      };
    })(this));
  };

  this.$add_column_formatting_signals = function() {
    var last_columns_setting;
    last_columns_setting = null;
    return $((function(_this) {
      return function(block_hotml, send) {

        /* TAINT inefficient because we convert to HTML and then to jQuery merely to see whether an XCSS
        selector matches the block element
         */
        var columns_setting, node;
        node = jQuery(HOTMETAL.as_html(block_hotml));
        if ((columns_setting = (XCSS.rules_from_node(app, node))['-mkts-columns']) != null) {
          if (columns_setting !== last_columns_setting) {
            send(['columns', columns_setting]);
          }
        }
        return send(['block', block_hotml]);
      };
    })(this));
  };

  this.try_slug = (function(_this) {
    return function(container, block_hotml, line_nr, start_idx, stop_idx) {
      var block_tag, client_rectangle, client_rectangles, client_width, container_width, excess, is_too_long, line_count, slug_hotml, slug_html, slug_jq, width_gauge;
      slug_hotml = HOTMETAL.slice(block_hotml, start_idx, stop_idx + 1);
      block_tag = slug_hotml[0][0][0];
      HOTMETAL.TAG.set(block_tag, 'line-nr', line_nr);
      HOTMETAL.TAG.add_class(block_tag, 'slug');
      if (line_nr === 1) {
        HOTMETAL.TAG.add_class(block_tag, 'first');
      } else {
        HOTMETAL.TAG.add_class(block_tag, 'middle');
      }
      slug_html = HOTMETAL.as_html(slug_hotml);
      slug_jq = jQuery(slug_html);
      width_gauge = slug_jq.children()[0];
      container.append(slug_jq);
      client_rectangles = width_gauge.getClientRects();
      container_width = container.width();
      client_rectangle = client_rectangles[0];
      client_width = client_rectangle['right'] - container.offset()['left'];
      excess = Math.max(0, Math.floor(client_width - container_width));

      /* TAINT arbitrary precision limit */
      if (excess < 3) {
        excess = 0;
      }
      is_too_long = excess > 0;
      line_count = client_rectangles.length;
      return [slug_hotml, slug_html, is_too_long, excess];
    };
  })(this);

  this.$get_slugs = function(gcolumn) {
    var container;
    container = this._get_slugs_container(gcolumn);
    return $((function(_this) {
      return function(block_hotml, send) {
        var excess, excesses, good_excess, good_slice_hotml, good_slug_html, html_lines, i, is_finished, is_too_long, last_line_block_tag, last_line_hotml, last_start_idx, len, line_nr, new_class, ref, slice_hotml, slices, slug_hotml, slug_html, slug_idx, start_idx, stop_idx, tag_hotml, trial_count;
        start_idx = 0;
        stop_idx = 0;
        trial_count = 0;
        last_start_idx = block_hotml.length - 1;
        html_lines = [];
        slices = [];
        excesses = [];
        slug_html = null;
        good_slug_html = null;
        good_slice_hotml = null;
        good_excess = null;
        is_finished = false;
        line_nr = 0;
        debug('©Wo0m7', HOTMETAL.as_html(block_hotml));
        while (!is_finished) {
          trial_count += +1;
          good_slug_html = slug_html;
          good_slice_hotml = slice_hotml;
          good_excess = excess;
          line_nr = html_lines.length + 1;

          /* --------------------- */

          /* TAINT arbitrary limit */
          if (trial_count > 25) {
            urge("#########################");
            warn("too many trials; aborting");
            urge("#########################");
            break;
          }
          if (line_nr > 25) {
            urge("#########################");
            warn("too many lines; aborting");
            urge("#########################");
            break;
          }

          /* --------------------- */
          ref = _this.try_slug(container, block_hotml, line_nr, start_idx, stop_idx), slice_hotml = ref[0], slug_html = ref[1], is_too_long = ref[2], excess = ref[3];
          urge('©uaDsn', start_idx, stop_idx, slug_html);
          if (stop_idx >= last_start_idx) {
            debug('©xeQQw', '(1)');
            excesses.push(excess);
            slices.push(slice_hotml);
            html_lines.push(slug_html);
            is_finished = true;
            continue;
          }
          if (is_too_long) {
            debug('©xeQQw', '(2)');
            warn(slug_html);
            warn("exceeding container by " + (excess.toFixed(1)) + "px");
            debug('©hBuvs', good_slug_html);
            if (trial_count === 1) {
              help('©wxSPj', slug_html);
              excesses.push(excess);
              slices.push(slice_hotml);
              html_lines.push(slug_html);
              debug('©TmJFr', excesses.length, slices.length, html_lines.length, excesses);
              start_idx = stop_idx + 1;
              stop_idx = start_idx - 1;
              trial_count = 0;
            } else {
              debug('©xeQQw', '(3)');
              excesses.push(good_excess);
              slices.push(good_slice_hotml);
              html_lines.push(good_slug_html);
              start_idx = stop_idx;
              stop_idx = start_idx - 1;
              trial_count = 0;
            }
          }
          debug('©xeQQw', '(4)');
          stop_idx += +1;
          if (start_idx >= last_start_idx) {
            throw new Error("not yet implemented (2)");
          }
        }
        new_class = slices.length === 1 ? 'single' : 'last';
        last_line_hotml = slices[slices.length - 1];
        last_line_block_tag = last_line_hotml[0][0][0];
        HOTMETAL.TAG.remove_class(last_line_block_tag, 'middle');
        HOTMETAL.TAG.remove_class(last_line_block_tag, 'first');
        HOTMETAL.TAG.add_class(last_line_block_tag, new_class);
        for (slug_idx = i = 0, len = slices.length; i < len; slug_idx = ++i) {
          slug_hotml = slices[slug_idx];
          tag_hotml = slug_hotml[0][0][0];
          excess = excesses[slug_idx];
          if (excess > 0) {
            HOTMETAL.TAG.add_class(tag_hotml, 'excess');
          }
          HOTMETAL.TAG.set(tag_hotml, 'excess', excess.toFixed(2));
          slug_html = HOTMETAL.as_html(slug_hotml);
          html_lines[slug_idx] = slug_html;
        }

        /* deactivate this to keep seeing lines in the galley */
        container.empty();
        send(html_lines);
        return help(((trial_count / html_lines.length).toFixed(2)) + " trials per line");
      };
    })(this));
  };

  this.$xxx = function() {
    var line_count, lines, target_column, target_column_idx, target_columns;
    target_columns = jQuery('page column');
    target_column_idx = 0;
    target_column = target_columns.eq(target_column_idx);
    line_count = 0;
    lines = [];
    return $((function(_this) {
      return function(html_lines, send, end) {
        var bottom_mm, bottom_px, column_height_mm, column_rectangle, delta_y_px, epsilon_mm, height_mm, height_px, html_line, i, is_off, len, line, line_idx, overshoot_mm, rectangle, top_mm, top_px, width_mm, width_px;
        if (html_lines != null) {

          /* TAINT no need to recompute on each paragraph */
          column_rectangle = BD.get_rectangle(target_column);
          delta_y_px = column_rectangle['top'];
          column_height_mm = mm_from_npx(column_rectangle['height']);

          /* TAINT arbitrary precision */
          epsilon_mm = 0.5;
          for (line_idx = i = 0, len = html_lines.length; i < len; line_idx = ++i) {
            html_line = html_lines[line_idx];
            line_count += +1;
            line = jQuery(html_line);
            lines.push(line);
            target_column.append(line);
            rectangle = BD.get_rectangle(line);
            width_px = rectangle['width'];
            height_px = rectangle['height'];
            top_px = rectangle['top'] - delta_y_px;
            bottom_px = rectangle['bottom'] - delta_y_px;
            width_mm = mm_from_npx(width_px);
            height_mm = mm_from_npx(height_px);
            top_mm = mm_from_npx(top_px);
            bottom_mm = mm_from_npx(bottom_px);
            overshoot_mm = bottom_mm - column_height_mm;
            is_off = overshoot_mm >= epsilon_mm;
            if (is_off) {

              /* TAINT must detect when page full */
              target_column_idx += +1;
              target_column = target_columns.eq(target_column_idx);
              line.detach();
              target_column.append(line);
            }
          }
          send(html_lines);
        }
        if (end != null) {
          return end();
        }
      };
    })(this));
  };

  this.demo = function(app_, md, settings, handler) {
    var XXX_t0, XXX_times, arity, as_html, format, gcolumn, gcolumn_left, gcolumn_offset, gcolumn_top, input, mark_chrs, mark_lines, matter, ref, zoomer;
    switch (arity = arguments.length) {
      case 3:
        handler = settings;
        settings = {};
        break;
      case 4:
        null;
        break;
      default:
        throw new Error(" expected 3 or 4 arguments, got " + arity);
    }
    switch (format = (ref = settings['format']) != null ? ref : 'md') {
      case 'md':
        as_html = D.MD.$as_html();
        break;
      case 'html':
        as_html = D.$pass_through();
        break;
      default:
        return handler(new Error("unknown format " + (rpr(format))));
    }
    app = app_;
    matter = app['matter'];
    jQuery = app['jQuery'];
    MKTS = app['MKTS'];
    window = app['window'];
    document = window['document'];
    BD = window['BD'];
    gcolumn = (jQuery('galley column')).eq(0);
    gcolumn_offset = gcolumn.offset();
    gcolumn_left = gcolumn_offset['left'];
    gcolumn_top = gcolumn_offset['top'];
    zoomer = jQuery('zoomer');
    input = D.create_throughstream();
    mark_chrs = true;
    mark_lines = false;
    XXX_t0 = +new Date();
    XXX_times = [];
    input.pipe(as_html).pipe($((function(_this) {
      return function(html, send) {
        XXX_times.push(["html from markdown", new Date() - XXX_t0]);
        send(HOTMETAL.HTML.parse(html));
        return XXX_times.push(["html parsed into hotml", new Date() - XXX_t0]);
      };
    })(this))).pipe($((function(_this) {
      return function(document_hotml, send) {

        /* split document into blocks */
        return HOTMETAL.slice_toplevel_tags(document_hotml, function(error, block_hotml) {
          if (error != null) {
            send.error(error);
          }
          return send(block_hotml);
        });
      };
    })(this))).pipe($((function(_this) {
      return function(block_hotml, send) {

        /* TAINT use HOTMETAL library method */

        /* Wrap block contents in `w` tags used to measure line width;
        method analoguous to `jQuery.wrapInner`
         */
        var first_shred, last_shred;
        warn('#######################################################################');
        first_shred = block_hotml[0];
        last_shred = block_hotml[block_hotml.length - 1];
        first_shred[0].push(['w', {}]);
        last_shred[2].unshift(['w']);
        return send(block_hotml);
      };
    })(this))).pipe(this.$get_slugs(gcolumn)).pipe(this.$xxx()).pipe(D.$on_end(function() {

      /* show some text metrics */
      var description, dt, i, j, len, len1, name, names, ref1, style;
      style = window.getComputedStyle((jQuery('p.slug')).get(0));
      names = "font fontFamily fontKerning fontSize fontStretch fontStyle fontVariant fontVariantLigatures\nfontWeight wordSpacing letterSpacing".split(/\s+/);
      for (i = 0, len = names.length; i < len; i++) {
        name = names[i];
        help(name, style[name]);
      }

      /* !!! */
      XXX_times.push(["finished", new Date() - XXX_t0]);
      for (j = 0, len1 = XXX_times.length; j < len1; j++) {
        ref1 = XXX_times[j], description = ref1[0], dt = ref1[1];
        debug('©1enOB', description, (dt / 1000).toFixed(3));
      }
      return handler();
    }));
    input.write(md);
    return input.end();
  };

  this._demo_pop_over = function() {
    var columns, i, idx, target_columns;
    target_columns = jQuery('page column');
    columns = [];
    for (idx = i = 0; i <= 2; idx = ++i) {
      columns.push(COLUMN.new_column(target_columns.eq(idx), '.slug'));
    }
    debug('©1rmzT', columns[0].length, columns[1].length, columns[2].length);
    COLUMN.pop_over(columns[0], columns[1], 1);
    return debug('©1rmzT', columns[0].length, columns[1].length);
  };

  this._demo_pop_over_async = function() {
    var column, column_idx, column_linecounts, columns, columns_per_page, i, line_count, ref, target_columns;
    target_columns = jQuery('page column');
    columns = [];

    /* TAINT arbitrary constant */
    columns_per_page = 3;
    line_count = 0;
    for (column_idx = i = 0, ref = columns_per_page; 0 <= ref ? i < ref : i > ref; column_idx = 0 <= ref ? ++i : --i) {
      column = COLUMN.new_column(target_columns.eq(column_idx), '.slug');
      line_count += column['length'];
      columns.push(column);
    }
    column_linecounts = this.get_column_linecounts('even', line_count, columns_per_page);
    debug('©rnC7h', column_linecounts);
    return step((function(_this) {
      return function*(resume) {
        var j, ref1, results;
        results = [];
        for (column_idx = j = 0, ref1 = columns_per_page; 0 <= ref1 ? j < ref1 : j > ref1; column_idx = 0 <= ref1 ? ++j : --j) {
          column = columns[column_idx];
          results.push((yield* (function*() {
            var results1;
            results1 = [];
            while (column['length'] > column_linecounts[column_idx]) {

              /* TAINT invalid last column idx */
              results1.push((yield COLUMN.pop_over_async(columns[column_idx], columns[column_idx + 1], 1, resume)));
            }
            return results1;
          })()));
        }
        return results;
      };
    })(this));
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxJTkVTRVRURVIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BO0FBQUEsTUFBQTs7RUFBQSxHQUFBLEdBQTRCLE9BQUEsQ0FBUSxLQUFSOztFQUM1QixHQUFBLEdBQTRCLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBUixDQUFhLEdBQWI7O0VBQzVCLEtBQUEsR0FBNEI7O0VBQzVCLEdBQUEsR0FBNEIsR0FBRyxDQUFDLFVBQUosQ0FBZSxPQUFmLEVBQTBCLEtBQTFCOztFQUM1QixJQUFBLEdBQTRCLEdBQUcsQ0FBQyxVQUFKLENBQWUsTUFBZixFQUEwQixLQUExQjs7RUFDNUIsS0FBQSxHQUE0QixHQUFHLENBQUMsVUFBSixDQUFlLE9BQWYsRUFBMEIsS0FBMUI7O0VBQzVCLEtBQUEsR0FBNEIsR0FBRyxDQUFDLFVBQUosQ0FBZSxPQUFmLEVBQTBCLEtBQTFCOztFQUM1QixJQUFBLEdBQTRCLEdBQUcsQ0FBQyxVQUFKLENBQWUsTUFBZixFQUEwQixLQUExQjs7RUFDNUIsSUFBQSxHQUE0QixHQUFHLENBQUMsVUFBSixDQUFlLE1BQWYsRUFBMEIsS0FBMUI7O0VBQzVCLE9BQUEsR0FBNEIsR0FBRyxDQUFDLFVBQUosQ0FBZSxTQUFmLEVBQTBCLEtBQTFCOztFQUM1QixJQUFBLEdBQTRCLEdBQUcsQ0FBQyxVQUFKLENBQWUsTUFBZixFQUEwQixLQUExQjs7RUFDNUIsSUFBQSxHQUE0QixHQUFHLENBQUMsSUFBSSxDQUFDLElBQVQsQ0FBYyxHQUFkOztFQUU1QixPQUFBLEdBQTRCLE9BQUEsQ0FBUSxvQkFBUjs7RUFDNUIsSUFBQSxHQUE0QixPQUFPLENBQUM7O0VBQ3BDLEtBQUEsR0FBNEIsT0FBTyxDQUFDOztFQUNwQyxLQUFBLEdBQTRCOztFQUM1QixLQUFBLEdBQTRCLE9BQU8sQ0FBQzs7RUFFcEMsQ0FBQSxHQUE0QixPQUFBLENBQVEsYUFBUjs7RUFDNUIsQ0FBQSxHQUE0QixDQUFDLENBQUMsS0FBSyxDQUFDLElBQVIsQ0FBYSxDQUFiOztFQUM1QixNQUFBLEdBQTRCLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBZCxDQUFtQixDQUFuQjs7RUFFNUIsUUFBQSxHQUE0QixDQUFDLENBQUM7O0VBQzlCLElBQUEsR0FBNEIsT0FBQSxDQUFRLFFBQVI7O0VBQzVCLEVBQUEsR0FBNEIsT0FBQSxDQUFRLGNBQVI7O0VBQzVCLGtCQUFBLEdBQTRCLE9BQUEsQ0FBUSxzQkFBUjs7O0FBSzVCOztFQUNBLE1BQUEsR0FBNEI7O0VBQzVCLElBQUEsR0FBNEI7O0VBQzVCLE1BQUEsR0FBNEI7O0VBQzVCLFFBQUEsR0FBNEI7O0VBQzVCLEdBQUEsR0FBNEI7O0VBRTVCLFdBQUEsR0FBYyxTQUFFLENBQUY7V0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVgsQ0FBdUIsR0FBdkIsRUFBNEIsQ0FBNUI7RUFBVDs7RUFDZCxXQUFBLEdBQWMsU0FBRSxDQUFGO1dBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFYLENBQXVCLEdBQXZCLEVBQTRCLENBQTVCO0VBQVQ7O0VBQ2QsV0FBQSxHQUFjLFNBQUUsQ0FBRjtXQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBWCxDQUF1QixHQUF2QixFQUE0QixDQUE1QjtFQUFUOztFQUNkLFdBQUEsR0FBYyxTQUFFLENBQUY7V0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVgsQ0FBdUIsR0FBdkIsRUFBNEIsQ0FBNUI7RUFBVDs7RUFDZCxDQUFBLEdBQWMsU0FBRSxDQUFGLEVBQUssU0FBTDs7TUFBSyxZQUFZOztXQUFPLENBQUMsQ0FBQyxPQUFGLENBQVUsU0FBVjtFQUF4Qjs7RUFJZCxJQUFDLENBQUEsb0JBQUQsR0FBd0IsU0FBRSxPQUFGO0FBQ3RCLFFBQUE7SUFBQSxDQUFBLEdBQUksTUFBQSxDQUFPLFdBQVA7SUFDSixJQUFHLENBQUMsQ0FBQyxNQUFGLEtBQVksQ0FBZjtNQUNFLENBQUEsR0FBSSxNQUFBLENBQU8sNEZBQVA7TUFDSixPQUFPLENBQUMsTUFBUixDQUFlLENBQWYsRUFGRjs7QUFHQSxXQUFPO0VBTGU7O0VBV3hCLElBQUMsQ0FBQSxxQkFBRCxHQUF5QixTQUFFLFFBQUYsRUFBWSxVQUFaLEVBQXdCLFlBQXhCOztBQUN2QjtBQUFBLFFBQUE7SUFDQSxDQUFBLEdBQU07QUFFTixZQUFPLFFBQVA7QUFBQSxXQUVPLE1BRlA7QUFHSSxhQUFXLDJGQUFYO1VBQ0UsQ0FBQyxDQUFDLElBQUYsWUFBTyxDQUFFLFVBQUEsR0FBYSxZQUFiLEdBQTRCLEdBQTlCLElBQXVDLGFBQTlDO0FBREY7QUFERztBQUZQO0FBT0ksY0FBVSxJQUFBLEtBQUEsQ0FBTSxtQkFBQSxHQUFtQixDQUFDLEdBQUEsQ0FBSSxRQUFKLENBQUQsQ0FBekI7QUFQZDtBQVNBLFdBQU87RUFiZ0I7O0VBZ0J6QixNQUFBLEdBQVM7O0VBR1QsTUFBTSxDQUFDLFVBQVAsR0FBb0IsU0FBRSxTQUFGLEVBQWEsUUFBYjtBQUNsQixRQUFBO0lBQUEsQ0FBQSxHQUNFO01BQUEsTUFBQSxFQUFnQixtQkFBaEI7TUFDQSxPQUFBLEVBQWdCLFNBRGhCO01BRUEsT0FBQSxFQUFnQixLQUFBLEdBQVEsRUFGeEI7TUFHQSxRQUFBLEVBQWdCLENBSGhCOztJQUtGLElBQUcsZ0JBQUg7TUFDRSxRQUFBLEdBQVcsU0FBUyxDQUFDLElBQVYsQ0FBZSxRQUFmO0FBQ1gsV0FBMEMsNEZBQTFDO1FBQUEsS0FBSyxDQUFDLElBQU4sQ0FBYSxRQUFRLENBQUMsRUFBVCxDQUFZLEdBQVosQ0FBYjtBQUFBO01BQ0EsQ0FBRyxDQUFBLFFBQUEsQ0FBSCxHQUFnQixRQUFRLENBQUMsT0FIM0I7O0FBS0EsV0FBTztFQVpXOztFQWVwQixNQUFNLENBQUMsSUFBUCxHQUFjLFNBQUUsRUFBRixFQUFNLElBQU47SUFDWixJQUFzQixHQUFHLENBQUMsUUFBSixDQUFhLElBQWIsQ0FBdEI7TUFBQSxJQUFBLEdBQU8sTUFBQSxDQUFPLElBQVAsRUFBUDs7SUFDQSxFQUFJLENBQUEsT0FBQSxDQUFTLENBQUMsSUFBZCxDQUFtQixJQUFuQjtJQUNBLEVBQUksQ0FBQSxPQUFBLENBQVMsQ0FBQyxNQUFkLENBQXFCLElBQXJCO0lBQ0EsRUFBSSxDQUFBLFFBQUEsQ0FBSixHQUFpQixFQUFJLENBQUEsT0FBQSxDQUFTLENBQUM7QUFDL0IsV0FBTztFQUxLOztFQVFkLE1BQU0sQ0FBQyxHQUFQLEdBQWEsU0FBRSxFQUFGO0FBQ1gsUUFBQTtJQUFBLElBQW1ELEVBQUksQ0FBQSxRQUFBLENBQUosR0FBaUIsQ0FBcEU7QUFBQSxZQUFVLElBQUEsS0FBQSxDQUFNLCtCQUFOLEVBQVY7O0lBQ0EsQ0FBQSxHQUFJLEVBQUksQ0FBQSxPQUFBLENBQVMsQ0FBQyxHQUFkLENBQUE7SUFDSixDQUFDLENBQUMsTUFBRixDQUFBO0lBQ0EsRUFBSSxDQUFBLFFBQUEsQ0FBSixHQUFpQixFQUFJLENBQUEsT0FBQSxDQUFTLENBQUM7QUFDL0IsV0FBTztFQUxJOztFQVFiLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLFNBQUUsRUFBRixFQUFNLElBQU4sRUFBWSxHQUFaO0lBQ2QsSUFBc0IsR0FBRyxDQUFDLFFBQUosQ0FBYSxJQUFiLENBQXRCO01BQUEsSUFBQSxHQUFPLE1BQUEsQ0FBTyxJQUFQLEVBQVA7O0lBQ0EsSUFBRyxXQUFIO01BQ0UsRUFBSSxDQUFBLE9BQUEsQ0FBUyxDQUFDLE1BQWQsQ0FBcUIsR0FBckIsRUFBMEIsQ0FBMUIsRUFBNkIsSUFBN0I7TUFDQSxFQUFJLENBQUEsT0FBQSxDQUFXLENBQUEsR0FBQSxDQUFLLENBQUMsTUFBckIsQ0FBNEIsSUFBNUIsRUFGRjtLQUFBLE1BQUE7TUFJRSxFQUFJLENBQUEsT0FBQSxDQUFTLENBQUMsT0FBZCxDQUFzQixJQUF0QjtNQUNBLEVBQUksQ0FBQSxPQUFBLENBQVMsQ0FBQyxPQUFkLENBQXNCLElBQXRCLEVBTEY7O0lBTUEsRUFBSSxDQUFBLFFBQUEsQ0FBSixHQUFpQixFQUFJLENBQUEsT0FBQSxDQUFTLENBQUM7QUFDL0IsV0FBTztFQVRPOztFQVloQixNQUFNLENBQUMsSUFBUCxHQUFjLFNBQUUsRUFBRjtBQUNaLFFBQUE7SUFBQSxDQUFBLEdBQUksRUFBSSxDQUFBLFFBQUEsQ0FBVSxDQUFDLEtBQWYsQ0FBQTtJQUNKLENBQUMsQ0FBQyxNQUFGLENBQUE7SUFDQSxFQUFJLENBQUEsUUFBQSxDQUFKLEdBQWlCLEVBQUksQ0FBQSxPQUFBLENBQVMsQ0FBQztBQUMvQixXQUFPO0VBSks7O0VBT2QsTUFBTSxDQUFDLFFBQVAsR0FBa0IsU0FBRSxFQUFGLEVBQU0sS0FBTixFQUFhLEtBQWIsRUFBd0IsT0FBeEI7QUFDaEIsUUFBQTs7TUFENkIsUUFBUTs7O01BQUcsVUFBVTs7QUFDbEQsWUFBTyxLQUFBLEdBQVEsU0FBUyxDQUFDLE1BQXpCO0FBQUEsV0FDTyxDQURQO0FBQUEsV0FDVSxDQURWO1FBQ2lCO0FBQVA7QUFEVixXQUVPLENBRlA7UUFHSSxJQUFHLEdBQUcsQ0FBQyxZQUFKLENBQWlCLEtBQWpCLENBQUg7VUFDRSxPQUFBLEdBQVU7VUFDVixLQUFBLEdBQVUsRUFGWjs7QUFERztBQUZQO0FBT0ksY0FBVSxJQUFBLEtBQUEsQ0FBTSwwQ0FBQSxHQUEyQyxLQUFqRDtBQVBkO0lBU0EsSUFBbUQsZUFBbkQ7QUFBQSxhQUFPLElBQUMsQ0FBQSxjQUFELENBQWdCLEVBQWhCLEVBQW9CLEtBQXBCLEVBQTJCLEtBQUEsQ0FBTSxPQUFOLENBQTNCLEVBQVA7O0lBRUEsSUFBRyxDQUFFLE1BQUEsR0FBUyxFQUFJLENBQUEsUUFBQSxDQUFmLENBQUEsR0FBOEIsRUFBSSxDQUFBLFFBQUEsQ0FBckM7QUFDRSxZQUFVLElBQUEsS0FBQSxDQUFNLDhCQUFBLEdBQStCLEtBQS9CLEdBQXFDLGNBQXJDLEdBQW1ELE1BQXpELEVBRFo7O0lBRUEsSUFBQSxDQUFxQyxHQUFHLENBQUMsR0FBSixDQUFRLEtBQVIsRUFBZSxtQkFBZixDQUFyQztNQUFBLEtBQUEsR0FBUSxJQUFDLENBQUEsVUFBRCxDQUFZLFNBQVosRUFBUjs7QUFDQSxTQUFTLGdGQUFUO01BQ0UsSUFBQyxDQUFBLE1BQUQsQ0FBUSxLQUFSLEVBQWUsSUFBQyxDQUFBLEdBQUQsQ0FBSyxFQUFMLENBQWY7QUFERjtBQUVBLFdBQU8sQ0FBRSxFQUFGLEVBQU0sS0FBTjtFQWpCUzs7RUFvQmxCLE1BQU0sQ0FBQyxjQUFQLEdBQXdCLFNBQUUsRUFBRixFQUFNLEtBQU4sRUFBYSxLQUFiLEVBQW9CLE9BQXBCO0FBQ3RCLFFBQUE7SUFBQSxJQUFHLENBQUUsTUFBQSxHQUFTLEVBQUksQ0FBQSxRQUFBLENBQWYsQ0FBQSxHQUE4QixFQUFJLENBQUEsUUFBQSxDQUFyQztBQUNFLFlBQVUsSUFBQSxLQUFBLENBQU0sOEJBQUEsR0FBK0IsS0FBL0IsR0FBcUMsY0FBckMsR0FBbUQsTUFBekQsRUFEWjs7SUFFQSxJQUFBLENBQXFDLEdBQUcsQ0FBQyxHQUFKLENBQVEsS0FBUixFQUFlLG1CQUFmLENBQXJDO01BQUEsS0FBQSxHQUFRLElBQUMsQ0FBQSxVQUFELENBQVksU0FBWixFQUFSOztXQUNBLElBQUEsQ0FBSyxDQUFBLFNBQUEsS0FBQTthQUFBLFVBQUUsTUFBRjtBQUNILFlBQUE7QUFBQSxhQUFTLGdGQUFUO1VBQ0UsSUFBQSxHQUFPLEtBQUMsQ0FBQSxHQUFELENBQUssRUFBTDtVQUNQLE9BQU0sS0FBQSxDQUFNLEtBQU4sRUFBYSxNQUFiLENBQU47VUFDQSxLQUFDLENBQUEsTUFBRCxDQUFRLEtBQVIsRUFBZSxJQUFmO0FBSEY7ZUFJQSxPQUFBLENBQVEsSUFBUixFQUFjLENBQUUsRUFBRixFQUFNLEtBQU4sQ0FBZDtNQUxHO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFMO0VBSnNCOztFQWN4QixJQUFDLENBQUEsOEJBQUQsR0FBa0MsU0FBQTtBQUNoQyxRQUFBO0lBQUEsb0JBQUEsR0FBdUI7QUFDdkIsV0FBTyxDQUFBLENBQUUsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFFLFdBQUYsRUFBZSxJQUFmOztBQUNQOzs7QUFBQSxZQUFBO1FBRUEsSUFBQSxHQUFPLE1BQUEsQ0FBTyxRQUFRLENBQUMsT0FBVCxDQUFpQixXQUFqQixDQUFQO1FBQ1AsSUFBRyw4RUFBSDtVQUNFLElBQUcsZUFBQSxLQUFxQixvQkFBeEI7WUFDRSxJQUFBLENBQUssQ0FBRSxTQUFGLEVBQWEsZUFBYixDQUFMLEVBREY7V0FERjs7ZUFHQSxJQUFBLENBQUssQ0FBRSxPQUFGLEVBQVcsV0FBWCxDQUFMO01BUE87SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQUY7RUFGeUI7O0VBWWxDLElBQUMsQ0FBQSxRQUFELEdBQVksQ0FBQSxTQUFBLEtBQUE7V0FBQSxTQUFFLFNBQUYsRUFBYSxXQUFiLEVBQTBCLE9BQTFCLEVBQW1DLFNBQW5DLEVBQThDLFFBQTlDO0FBQ1YsVUFBQTtNQUFBLFVBQUEsR0FBOEIsUUFBUSxDQUFDLEtBQVQsQ0FBZSxXQUFmLEVBQTRCLFNBQTVCLEVBQXVDLFFBQUEsR0FBVyxDQUFsRDtNQUM5QixTQUFBLEdBQThCLFVBQVksQ0FBQSxDQUFBLENBQUssQ0FBQSxDQUFBLENBQUssQ0FBQSxDQUFBO01BQ3BELFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBYixDQUFpQixTQUFqQixFQUE0QixTQUE1QixFQUF1QyxPQUF2QztNQUNBLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBYixDQUF1QixTQUF2QixFQUFrQyxNQUFsQztNQUNBLElBQUcsT0FBQSxLQUFXLENBQWQ7UUFFRSxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQWIsQ0FBMkIsU0FBM0IsRUFBc0MsT0FBdEMsRUFGRjtPQUFBLE1BQUE7UUFLRSxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQWIsQ0FBMkIsU0FBM0IsRUFBc0MsUUFBdEMsRUFMRjs7TUFNQSxTQUFBLEdBQThCLFFBQVEsQ0FBQyxPQUFULENBQWlCLFVBQWpCO01BQzlCLE9BQUEsR0FBOEIsTUFBQSxDQUFPLFNBQVA7TUFDOUIsV0FBQSxHQUE4QixPQUFPLENBQUMsUUFBUixDQUFBLENBQW9CLENBQUEsQ0FBQTtNQUNsRCxTQUFTLENBQUMsTUFBVixDQUFpQixPQUFqQjtNQUNBLGlCQUFBLEdBQThCLFdBQVcsQ0FBQyxjQUFaLENBQUE7TUFDOUIsZUFBQSxHQUE4QixTQUFTLENBQUMsS0FBVixDQUFBO01BQzlCLGdCQUFBLEdBQThCLGlCQUFtQixDQUFBLENBQUE7TUFDakQsWUFBQSxHQUE4QixnQkFBa0IsQ0FBQSxPQUFBLENBQWxCLEdBQThCLFNBQVMsQ0FBQyxNQUFWLENBQUEsQ0FBb0IsQ0FBQSxNQUFBO01BQ2hGLE1BQUEsR0FBOEIsSUFBSSxDQUFDLEdBQUwsQ0FBUyxDQUFULEVBQVksSUFBSSxDQUFDLEtBQUwsQ0FBVyxZQUFBLEdBQWUsZUFBMUIsQ0FBWjs7QUFDOUI7TUFDQSxJQUFtQyxNQUFBLEdBQVMsQ0FBNUM7UUFBQSxNQUFBLEdBQThCLEVBQTlCOztNQUNBLFdBQUEsR0FBOEIsTUFBQSxHQUFTO01BQ3ZDLFVBQUEsR0FBOEIsaUJBQWlCLENBQUM7QUFDaEQsYUFBTyxDQUFFLFVBQUYsRUFBYyxTQUFkLEVBQXlCLFdBQXpCLEVBQXNDLE1BQXRDO0lBeEJHO0VBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQTs7RUEyQlosSUFBQyxDQUFBLFVBQUQsR0FBYyxTQUFFLE9BQUY7QUFDWixRQUFBO0lBQUEsU0FBQSxHQUFZLElBQUMsQ0FBQSxvQkFBRCxDQUFzQixPQUF0QjtBQUVaLFdBQU8sQ0FBQSxDQUFFLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBRSxXQUFGLEVBQWUsSUFBZjtBQUNQLFlBQUE7UUFBQSxTQUFBLEdBQW9CO1FBQ3BCLFFBQUEsR0FBb0I7UUFDcEIsV0FBQSxHQUFvQjtRQUNwQixjQUFBLEdBQW9CLFdBQVcsQ0FBQyxNQUFaLEdBQXFCO1FBQ3pDLFVBQUEsR0FBb0I7UUFDcEIsTUFBQSxHQUFvQjtRQUNwQixRQUFBLEdBQW9CO1FBQ3BCLFNBQUEsR0FBb0I7UUFDcEIsY0FBQSxHQUFvQjtRQUNwQixnQkFBQSxHQUFvQjtRQUNwQixXQUFBLEdBQW9CO1FBQ3BCLFdBQUEsR0FBb0I7UUFDcEIsT0FBQSxHQUFvQjtRQUNwQixLQUFBLENBQU0sUUFBTixFQUFnQixRQUFRLENBQUMsT0FBVCxDQUFpQixXQUFqQixDQUFoQjtBQUVBLGVBQUEsQ0FBTSxXQUFOO1VBQ0UsV0FBQSxJQUFlLENBQUM7VUFDaEIsY0FBQSxHQUFvQjtVQUNwQixnQkFBQSxHQUFvQjtVQUNwQixXQUFBLEdBQW9CO1VBQ3BCLE9BQUEsR0FBb0IsVUFBVSxDQUFDLE1BQVgsR0FBb0I7O0FBQ3hDOztBQUNBO1VBQ0EsSUFBRyxXQUFBLEdBQWMsRUFBakI7WUFDRSxJQUFBLENBQUssMkJBQUw7WUFDQSxJQUFBLENBQUssMkJBQUw7WUFDQSxJQUFBLENBQUssMkJBQUw7QUFDQSxrQkFKRjs7VUFLQSxJQUFHLE9BQUEsR0FBVSxFQUFiO1lBQ0UsSUFBQSxDQUFLLDJCQUFMO1lBQ0EsSUFBQSxDQUFLLDBCQUFMO1lBQ0EsSUFBQSxDQUFLLDJCQUFMO0FBQ0Esa0JBSkY7OztBQUtBO1VBQ0EsTUFHa0IsS0FBQyxDQUFBLFFBQUQsQ0FBVSxTQUFWLEVBQXFCLFdBQXJCLEVBQWtDLE9BQWxDLEVBQTJDLFNBQTNDLEVBQXNELFFBQXRELENBSGxCLEVBQUUsb0JBQUYsRUFDRSxrQkFERixFQUVFLG9CQUZGLEVBR0U7VUFDRixJQUFBLENBQUssUUFBTCxFQUFlLFNBQWYsRUFBMEIsUUFBMUIsRUFBb0MsU0FBcEM7VUFFQSxJQUFHLFFBQUEsSUFBWSxjQUFmO1lBQ0UsS0FBQSxDQUFNLFFBQU4sRUFBZ0IsS0FBaEI7WUFFQSxRQUFRLENBQUMsSUFBVCxDQUFnQixNQUFoQjtZQUNBLE1BQU0sQ0FBQyxJQUFQLENBQWdCLFdBQWhCO1lBQ0EsVUFBVSxDQUFDLElBQVgsQ0FBZ0IsU0FBaEI7WUFDQSxXQUFBLEdBQWM7QUFDZCxxQkFQRjs7VUFTQSxJQUFHLFdBQUg7WUFDRSxLQUFBLENBQU0sUUFBTixFQUFnQixLQUFoQjtZQUNBLElBQUEsQ0FBSyxTQUFMO1lBQ0EsSUFBQSxDQUFLLHlCQUFBLEdBQXlCLENBQUMsTUFBTSxDQUFDLE9BQVAsQ0FBZSxDQUFmLENBQUQsQ0FBekIsR0FBMkMsSUFBaEQ7WUFDQSxLQUFBLENBQU0sUUFBTixFQUFnQixjQUFoQjtZQUNBLElBQUcsV0FBQSxLQUFlLENBQWxCO2NBQ0UsSUFBQSxDQUFLLFFBQUwsRUFBZSxTQUFmO2NBQ0EsUUFBUSxDQUFDLElBQVQsQ0FBZ0IsTUFBaEI7Y0FDQSxNQUFNLENBQUMsSUFBUCxDQUFnQixXQUFoQjtjQUNBLFVBQVUsQ0FBQyxJQUFYLENBQWdCLFNBQWhCO2NBQ0EsS0FBQSxDQUFNLFFBQU4sRUFBZ0IsUUFBUSxDQUFDLE1BQXpCLEVBQWlDLE1BQU0sQ0FBQyxNQUF4QyxFQUFnRCxVQUFVLENBQUMsTUFBM0QsRUFBbUUsUUFBbkU7Y0FDQSxTQUFBLEdBQWMsUUFBQSxHQUFZO2NBQzFCLFFBQUEsR0FBYyxTQUFBLEdBQVk7Y0FDMUIsV0FBQSxHQUFjLEVBUmhCO2FBQUEsTUFBQTtjQVVFLEtBQUEsQ0FBTSxRQUFOLEVBQWdCLEtBQWhCO2NBQ0EsUUFBUSxDQUFDLElBQVQsQ0FBZ0IsV0FBaEI7Y0FDQSxNQUFNLENBQUMsSUFBUCxDQUFnQixnQkFBaEI7Y0FDQSxVQUFVLENBQUMsSUFBWCxDQUFnQixjQUFoQjtjQUNBLFNBQUEsR0FBYztjQUNkLFFBQUEsR0FBYyxTQUFBLEdBQVk7Y0FDMUIsV0FBQSxHQUFjLEVBaEJoQjthQUxGOztVQXVCQSxLQUFBLENBQU0sUUFBTixFQUFnQixLQUFoQjtVQUNBLFFBQUEsSUFBZ0IsQ0FBQztVQUVqQixJQUFHLFNBQUEsSUFBYSxjQUFoQjtBQUNFLGtCQUFVLElBQUEsS0FBQSxDQUFNLHlCQUFOLEVBRFo7O1FBNURGO1FBK0RBLFNBQUEsR0FBeUIsTUFBTSxDQUFDLE1BQVAsS0FBaUIsQ0FBcEIsR0FBMkIsUUFBM0IsR0FBeUM7UUFDL0QsZUFBQSxHQUFzQixNQUFRLENBQUEsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsQ0FBaEI7UUFDOUIsbUJBQUEsR0FBc0IsZUFBaUIsQ0FBQSxDQUFBLENBQUssQ0FBQSxDQUFBLENBQUssQ0FBQSxDQUFBO1FBQ2pELFFBQVEsQ0FBQyxHQUFHLENBQUMsWUFBYixDQUEyQixtQkFBM0IsRUFBZ0QsUUFBaEQ7UUFDQSxRQUFRLENBQUMsR0FBRyxDQUFDLFlBQWIsQ0FBMkIsbUJBQTNCLEVBQWdELE9BQWhEO1FBQ0EsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFiLENBQTJCLG1CQUEzQixFQUFnRCxTQUFoRDtBQUVBLGFBQUEsOERBQUE7O1VBQ0UsU0FBQSxHQUEwQixVQUFZLENBQUEsQ0FBQSxDQUFLLENBQUEsQ0FBQSxDQUFLLENBQUEsQ0FBQTtVQUNoRCxNQUFBLEdBQTBCLFFBQVUsQ0FBQSxRQUFBO1VBQ3BDLElBQThDLE1BQUEsR0FBUyxDQUF2RDtZQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBYixDQUF1QixTQUF2QixFQUFrQyxRQUFsQyxFQUFBOztVQUNBLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBYixDQUFpQixTQUFqQixFQUE0QixRQUE1QixFQUFzQyxNQUFNLENBQUMsT0FBUCxDQUFlLENBQWYsQ0FBdEM7VUFDQSxTQUFBLEdBQTBCLFFBQVEsQ0FBQyxPQUFULENBQWlCLFVBQWpCO1VBQzFCLFVBQVksQ0FBQSxRQUFBLENBQVosR0FBMEI7QUFONUI7O0FBUUE7UUFDQSxTQUFTLENBQUMsS0FBVixDQUFBO1FBQ0EsSUFBQSxDQUFLLFVBQUw7ZUFDQSxJQUFBLENBQU8sQ0FBQyxDQUFFLFdBQUEsR0FBYyxVQUFVLENBQUMsTUFBM0IsQ0FBbUMsQ0FBQyxPQUFwQyxDQUE0QyxDQUE1QyxDQUFELENBQUEsR0FBK0Msa0JBQXREO01BakdPO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFGO0VBSEs7O0VBdUdkLElBQUMsQ0FBQSxJQUFELEdBQVEsU0FBQTtBQUNOLFFBQUE7SUFBQSxjQUFBLEdBQXNCLE1BQUEsQ0FBTyxhQUFQO0lBQ3RCLGlCQUFBLEdBQXNCO0lBQ3RCLGFBQUEsR0FBc0IsY0FBYyxDQUFDLEVBQWYsQ0FBa0IsaUJBQWxCO0lBQ3RCLFVBQUEsR0FBc0I7SUFDdEIsS0FBQSxHQUFzQjtBQUV0QixXQUFPLENBQUEsQ0FBRSxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUUsVUFBRixFQUFjLElBQWQsRUFBb0IsR0FBcEI7QUFFUCxZQUFBO1FBQUEsSUFBRyxrQkFBSDs7QUFDRTtVQUNBLGdCQUFBLEdBQW9CLEVBQUUsQ0FBQyxhQUFILENBQWlCLGFBQWpCO1VBQ3BCLFVBQUEsR0FBb0IsZ0JBQWtCLENBQUEsS0FBQTtVQUN0QyxnQkFBQSxHQUFvQixXQUFBLENBQVksZ0JBQWtCLENBQUEsUUFBQSxDQUE5Qjs7QUFDcEI7VUFDQSxVQUFBLEdBQW9CO0FBRXBCLGVBQUEsa0VBQUE7O1lBQ0UsVUFBQSxJQUFnQixDQUFDO1lBQ2pCLElBQUEsR0FBZ0IsTUFBQSxDQUFPLFNBQVA7WUFDaEIsS0FBSyxDQUFDLElBQU4sQ0FBVyxJQUFYO1lBQ0EsYUFBYSxDQUFDLE1BQWQsQ0FBcUIsSUFBckI7WUFDQSxTQUFBLEdBQWdCLEVBQUUsQ0FBQyxhQUFILENBQWlCLElBQWpCO1lBQ2hCLFFBQUEsR0FBZ0IsU0FBVyxDQUFBLE9BQUE7WUFDM0IsU0FBQSxHQUFnQixTQUFXLENBQUEsUUFBQTtZQUMzQixNQUFBLEdBQWdCLFNBQVcsQ0FBQSxLQUFBLENBQVgsR0FBd0I7WUFDeEMsU0FBQSxHQUFnQixTQUFXLENBQUEsUUFBQSxDQUFYLEdBQXdCO1lBQ3hDLFFBQUEsR0FBZ0IsV0FBQSxDQUFZLFFBQVo7WUFDaEIsU0FBQSxHQUFnQixXQUFBLENBQVksU0FBWjtZQUNoQixNQUFBLEdBQWdCLFdBQUEsQ0FBWSxNQUFaO1lBQ2hCLFNBQUEsR0FBZ0IsV0FBQSxDQUFZLFNBQVo7WUFDaEIsWUFBQSxHQUFnQixTQUFBLEdBQVk7WUFDNUIsTUFBQSxHQUFnQixZQUFBLElBQWdCO1lBQ2hDLElBQUcsTUFBSDs7QUFDRTtjQUNBLGlCQUFBLElBQXNCLENBQUM7Y0FDdkIsYUFBQSxHQUFzQixjQUFjLENBQUMsRUFBZixDQUFrQixpQkFBbEI7Y0FDdEIsSUFBSSxDQUFDLE1BQUwsQ0FBQTtjQUNBLGFBQWEsQ0FBQyxNQUFkLENBQXFCLElBQXJCLEVBTEY7O0FBaEJGO1VBdUJBLElBQUEsQ0FBSyxVQUFMLEVBL0JGOztRQWlDQSxJQUFHLFdBQUg7aUJBR0UsR0FBQSxDQUFBLEVBSEY7O01BbkNPO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFGO0VBUEQ7O0VBbURSLElBQUMsQ0FBQSxJQUFELEdBQVEsU0FBRSxJQUFGLEVBQVEsRUFBUixFQUFZLFFBQVosRUFBc0IsT0FBdEI7QUFDTixRQUFBO0FBQUEsWUFBTyxLQUFBLEdBQVEsU0FBUyxDQUFDLE1BQXpCO0FBQUEsV0FDTyxDQURQO1FBRUksT0FBQSxHQUFZO1FBQ1osUUFBQSxHQUFZO0FBRlQ7QUFEUCxXQUlPLENBSlA7UUFLSTtBQURHO0FBSlA7QUFPSSxjQUFVLElBQUEsS0FBQSxDQUFNLGtDQUFBLEdBQW1DLEtBQXpDO0FBUGQ7QUFTQSxZQUFPLE1BQUEsOENBQWdDLElBQXZDO0FBQUEsV0FDTyxJQURQO1FBRUksT0FBQSxHQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBTCxDQUFBO0FBRFA7QUFEUCxXQUdPLE1BSFA7UUFJSSxPQUFBLEdBQVUsQ0FBQyxDQUFDLGFBQUYsQ0FBQTtBQURQO0FBSFA7QUFNSSxlQUFPLE9BQUEsQ0FBWSxJQUFBLEtBQUEsQ0FBTSxpQkFBQSxHQUFpQixDQUFDLEdBQUEsQ0FBSSxNQUFKLENBQUQsQ0FBdkIsQ0FBWjtBQU5YO0lBUUEsR0FBQSxHQUFzQjtJQUN0QixNQUFBLEdBQXNCLEdBQUssQ0FBQSxRQUFBO0lBQzNCLE1BQUEsR0FBc0IsR0FBSyxDQUFBLFFBQUE7SUFDM0IsSUFBQSxHQUFzQixHQUFLLENBQUEsTUFBQTtJQUMzQixNQUFBLEdBQXNCLEdBQUssQ0FBQSxRQUFBO0lBQzNCLFFBQUEsR0FBc0IsTUFBUSxDQUFBLFVBQUE7SUFDOUIsRUFBQSxHQUFzQixNQUFRLENBQUEsSUFBQTtJQUM5QixPQUFBLEdBQXNCLENBQUUsTUFBQSxDQUFPLGVBQVAsQ0FBRixDQUEwQixDQUFDLEVBQTNCLENBQThCLENBQTlCO0lBQ3RCLGNBQUEsR0FBc0IsT0FBTyxDQUFDLE1BQVIsQ0FBQTtJQUN0QixZQUFBLEdBQXNCLGNBQWdCLENBQUEsTUFBQTtJQUN0QyxXQUFBLEdBQXNCLGNBQWdCLENBQUEsS0FBQTtJQUN0QyxNQUFBLEdBQXNCLE1BQUEsQ0FBTyxRQUFQO0lBRXRCLEtBQUEsR0FBc0IsQ0FBQyxDQUFDLG9CQUFGLENBQUE7SUFHdEIsU0FBQSxHQUFzQjtJQUN0QixVQUFBLEdBQXNCO0lBQ3RCLE1BQUEsR0FBc0IsQ0FBSyxJQUFBLElBQUEsQ0FBQTtJQUMzQixTQUFBLEdBQXNCO0lBRXRCLEtBSUUsQ0FBQyxJQUpILENBSVEsT0FKUixDQWVFLENBQUMsSUFmSCxDQWVRLENBQUEsQ0FBRSxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUUsSUFBRixFQUFRLElBQVI7UUFDTixTQUFTLENBQUMsSUFBVixDQUFlLENBQUUsb0JBQUYsRUFBNEIsSUFBQSxJQUFBLENBQUEsQ0FBSixHQUFhLE1BQXJDLENBQWY7UUFDQSxJQUFBLENBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFkLENBQW9CLElBQXBCLENBQUw7ZUFDQSxTQUFTLENBQUMsSUFBVixDQUFlLENBQUUsd0JBQUYsRUFBZ0MsSUFBQSxJQUFBLENBQUEsQ0FBSixHQUFhLE1BQXpDLENBQWY7TUFITTtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBRixDQWZSLENBcUJFLENBQUMsSUFyQkgsQ0FxQlEsQ0FBQSxDQUFFLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBRSxjQUFGLEVBQWtCLElBQWxCOztBQUNOO2VBQ0EsUUFBUSxDQUFDLG1CQUFULENBQTZCLGNBQTdCLEVBQTZDLFNBQUUsS0FBRixFQUFTLFdBQVQ7VUFDM0MsSUFBb0IsYUFBcEI7WUFBQSxJQUFJLENBQUMsS0FBTCxDQUFXLEtBQVgsRUFBQTs7aUJBQ0EsSUFBQSxDQUFLLFdBQUw7UUFGMkMsQ0FBN0M7TUFGTTtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBRixDQXJCUixDQStCRSxDQUFDLElBL0JILENBK0JRLENBQUEsQ0FBRSxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUUsV0FBRixFQUFlLElBQWY7O0FBQ047O0FBQ0E7OztBQURBLFlBQUE7UUFHQSxJQUFBLENBQUsseUVBQUw7UUFDQSxXQUFBLEdBQWMsV0FBYSxDQUFBLENBQUE7UUFDM0IsVUFBQSxHQUFjLFdBQWEsQ0FBQSxXQUFXLENBQUMsTUFBWixHQUFxQixDQUFyQjtRQUMzQixXQUFhLENBQUEsQ0FBQSxDQUFHLENBQUMsSUFBakIsQ0FBMEIsQ0FBRSxHQUFGLEVBQU8sRUFBUCxDQUExQjtRQUNBLFVBQWEsQ0FBQSxDQUFBLENBQUcsQ0FBQyxPQUFqQixDQUEwQixDQUFFLEdBQUYsQ0FBMUI7ZUFDQSxJQUFBLENBQUssV0FBTDtNQVRNO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFGLENBL0JSLENBMENFLENBQUMsSUExQ0gsQ0EwQ1EsSUFBQyxDQUFBLFVBQUQsQ0FBWSxPQUFaLENBMUNSLENBNkNFLENBQUMsSUE3Q0gsQ0E2Q1EsSUFBQyxDQUFBLElBQUQsQ0FBQSxDQTdDUixDQStDSSxDQUFDLElBL0NMLENBK0NVLENBQUMsQ0FBQyxPQUFGLENBQVUsU0FBQTs7QUFDZDtBQUFBLFVBQUE7TUFDQSxLQUFBLEdBQVEsTUFBTSxDQUFDLGdCQUFQLENBQXdCLENBQUUsTUFBQSxDQUFPLFFBQVAsQ0FBRixDQUFtQixDQUFDLEdBQXBCLENBQXdCLENBQXhCLENBQXhCO01BRVIsS0FBQSxHQUFRLG1JQUVpQyxDQUFDLEtBRmxDLENBRXdDLEtBRnhDO0FBR1IsV0FBQSx1Q0FBQTs7UUFDRSxJQUFBLENBQUssSUFBTCxFQUFXLEtBQU8sQ0FBQSxJQUFBLENBQWxCO0FBREY7O0FBRUE7TUFDQSxTQUFTLENBQUMsSUFBVixDQUFlLENBQUUsVUFBRixFQUFrQixJQUFBLElBQUEsQ0FBQSxDQUFKLEdBQWEsTUFBM0IsQ0FBZjtBQUNBLFdBQUEsNkNBQUE7NkJBQU0sdUJBQWE7UUFDakIsS0FBQSxDQUFNLFFBQU4sRUFBZ0IsV0FBaEIsRUFBNkIsQ0FBRSxFQUFBLEdBQUssSUFBUCxDQUFhLENBQUMsT0FBZCxDQUFzQixDQUF0QixDQUE3QjtBQURGO2FBRUEsT0FBQSxDQUFBO0lBYmMsQ0FBVixDQS9DVjtJQThEQSxLQUFLLENBQUMsS0FBTixDQUFZLEVBQVo7V0FDQSxLQUFLLENBQUMsR0FBTixDQUFBO0VBdEdNOztFQXlHUixJQUFDLENBQUEsY0FBRCxHQUFrQixTQUFBO0FBQ2hCLFFBQUE7SUFBQSxjQUFBLEdBQXNCLE1BQUEsQ0FBTyxhQUFQO0lBQ3RCLE9BQUEsR0FBc0I7QUFDdEIsU0FBVyw4QkFBWDtNQUNFLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBTSxDQUFDLFVBQVAsQ0FBb0IsY0FBYyxDQUFDLEVBQWYsQ0FBa0IsR0FBbEIsQ0FBcEIsRUFBNkMsT0FBN0MsQ0FBYjtBQURGO0lBRUEsS0FBQSxDQUFNLFFBQU4sRUFBZ0IsT0FBUyxDQUFBLENBQUEsQ0FBRyxDQUFDLE1BQTdCLEVBQXFDLE9BQVMsQ0FBQSxDQUFBLENBQUcsQ0FBQyxNQUFsRCxFQUEwRCxPQUFTLENBQUEsQ0FBQSxDQUFHLENBQUMsTUFBdkU7SUFDQSxNQUFNLENBQUMsUUFBUCxDQUFnQixPQUFTLENBQUEsQ0FBQSxDQUF6QixFQUE4QixPQUFTLENBQUEsQ0FBQSxDQUF2QyxFQUE0QyxDQUE1QztXQUNBLEtBQUEsQ0FBTSxRQUFOLEVBQWdCLE9BQVMsQ0FBQSxDQUFBLENBQUcsQ0FBQyxNQUE3QixFQUFxQyxPQUFTLENBQUEsQ0FBQSxDQUFHLENBQUMsTUFBbEQ7RUFQZ0I7O0VBVWxCLElBQUMsQ0FBQSxvQkFBRCxHQUF3QixTQUFBO0FBQ3RCLFFBQUE7SUFBQSxjQUFBLEdBQXNCLE1BQUEsQ0FBTyxhQUFQO0lBQ3RCLE9BQUEsR0FBc0I7O0FBQ3RCO0lBQ0EsZ0JBQUEsR0FBc0I7SUFDdEIsVUFBQSxHQUFzQjtBQUV0QixTQUFrQiwyR0FBbEI7TUFDRSxNQUFBLEdBQWMsTUFBTSxDQUFDLFVBQVAsQ0FBb0IsY0FBYyxDQUFDLEVBQWYsQ0FBa0IsVUFBbEIsQ0FBcEIsRUFBb0QsT0FBcEQ7TUFDZCxVQUFBLElBQWMsTUFBUSxDQUFBLFFBQUE7TUFDdEIsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiO0FBSEY7SUFLQSxpQkFBQSxHQUFzQixJQUFDLENBQUEscUJBQUQsQ0FBdUIsTUFBdkIsRUFBK0IsVUFBL0IsRUFBMkMsZ0JBQTNDO0lBQ3RCLEtBQUEsQ0FBTSxRQUFOLEVBQWdCLGlCQUFoQjtXQUNBLElBQUEsQ0FBSyxDQUFBLFNBQUEsS0FBQTthQUFBLFVBQUUsTUFBRjtBQUNILFlBQUE7QUFBQTthQUFrQixnSEFBbEI7VUFDRSxNQUFBLEdBQVMsT0FBUyxDQUFBLFVBQUE7dUJBQ2xCOztBQUFBO21CQUFNLE1BQVEsQ0FBQSxRQUFBLENBQVIsR0FBcUIsaUJBQW1CLENBQUEsVUFBQSxDQUE5Qzs7QUFDRTs0QkFDQSxPQUFNLE1BQU0sQ0FBQyxjQUFQLENBQXNCLE9BQVMsQ0FBQSxVQUFBLENBQS9CLEVBQTZDLE9BQVMsQ0FBQSxVQUFBLEdBQWEsQ0FBYixDQUF0RCxFQUF3RSxDQUF4RSxFQUEyRSxNQUEzRSxDQUFOO1lBRkYsQ0FBQTs7Y0FBQTtBQUZGOztNQURHO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFMO0VBZHNCO0FBcGR4QiIsImZpbGUiOiJMSU5FU0VUVEVSLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyBuanNfcGF0aCAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSAncGF0aCdcbiMgbmpzX2ZzICAgICAgICAgICAgICAgICAgICA9IHJlcXVpcmUgJ2ZzJ1xuIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG5DTkQgICAgICAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSAnY25kJ1xucnByICAgICAgICAgICAgICAgICAgICAgICA9IENORC5ycHIuYmluZCBDTkRcbmJhZGdlICAgICAgICAgICAgICAgICAgICAgPSAn55yA5b+r5o6S5a2X5py6L0xJTkVTRVRURVInXG5sb2cgICAgICAgICAgICAgICAgICAgICAgID0gQ05ELmdldF9sb2dnZXIgJ3BsYWluJywgICBiYWRnZVxuaW5mbyAgICAgICAgICAgICAgICAgICAgICA9IENORC5nZXRfbG9nZ2VyICdpbmZvJywgICAgYmFkZ2VcbmFsZXJ0ICAgICAgICAgICAgICAgICAgICAgPSBDTkQuZ2V0X2xvZ2dlciAnYWxlcnQnLCAgIGJhZGdlXG5kZWJ1ZyAgICAgICAgICAgICAgICAgICAgID0gQ05ELmdldF9sb2dnZXIgJ2RlYnVnJywgICBiYWRnZVxud2FybiAgICAgICAgICAgICAgICAgICAgICA9IENORC5nZXRfbG9nZ2VyICd3YXJuJywgICAgYmFkZ2VcbnVyZ2UgICAgICAgICAgICAgICAgICAgICAgPSBDTkQuZ2V0X2xvZ2dlciAndXJnZScsICAgIGJhZGdlXG53aGlzcGVyICAgICAgICAgICAgICAgICAgID0gQ05ELmdldF9sb2dnZXIgJ3doaXNwZXInLCBiYWRnZVxuaGVscCAgICAgICAgICAgICAgICAgICAgICA9IENORC5nZXRfbG9nZ2VyICdoZWxwJywgICAgYmFkZ2VcbmVjaG8gICAgICAgICAgICAgICAgICAgICAgPSBDTkQuZWNoby5iaW5kIENORFxuIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG5zdXNwZW5kICAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSAnY29mZmVlbm9kZS1zdXNwZW5kJ1xuc3RlcCAgICAgICAgICAgICAgICAgICAgICA9IHN1c3BlbmQuc3RlcFxuYWZ0ZXIgICAgICAgICAgICAgICAgICAgICA9IHN1c3BlbmQuYWZ0ZXJcbmxhdGVyICAgICAgICAgICAgICAgICAgICAgPSBzZXRJbW1lZGlhdGVcbnNsZWVwICAgICAgICAgICAgICAgICAgICAgPSBzdXNwZW5kLnNsZWVwXG4jLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cbkQgICAgICAgICAgICAgICAgICAgICAgICAgPSByZXF1aXJlICdwaXBlZHJlYW1zMidcbiQgICAgICAgICAgICAgICAgICAgICAgICAgPSBELnJlbWl0LmJpbmQgRFxuJGFzeW5jICAgICAgICAgICAgICAgICAgICA9IEQucmVtaXRfYXN5bmMuYmluZCBEXG4jIExPREFTSCAgICAgICAgICAgICAgICAgICAgPSBELkxPREFTSFxuSE9UTUVUQUwgICAgICAgICAgICAgICAgICA9IEQuSE9UTUVUQUxcblhDU1MgICAgICAgICAgICAgICAgICAgICAgPSByZXF1aXJlICcuL1hDU1MnXG5CRCAgICAgICAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSAnLi9CTEFJREREUldHJ1xuZ2x5cGhfcmVwbGFjZW1lbnRzICAgICAgICA9IHJlcXVpcmUgJy4vZ2x5cGgtcmVwbGFjZW1lbnRzJ1xuIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG4jICMjIyBodHRwczovL2dpdGh1Yi5jb20vbWVyeW4vcGVyZm9ybWFuY2Utbm93ICMjI1xuIyBub3cgICAgICAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSAncGVyZm9ybWFuY2Utbm93J1xuIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG4jIyMgVGhlIG1vZHVsZS1nbG9iYWxzIGJlY29tZSBhdmFpbGFibGUgd2hlbiBgZGVtb2AgaXMgY2FsbGVkIHdpdGggYGFwcGAgYXJndW1lbnQgIyMjXG5qUXVlcnkgICAgICAgICAgICAgICAgICAgID0gbnVsbFxuTUtUUyAgICAgICAgICAgICAgICAgICAgICA9IG51bGxcbndpbmRvdyAgICAgICAgICAgICAgICAgICAgPSBudWxsXG5kb2N1bWVudCAgICAgICAgICAgICAgICAgID0gbnVsbFxuYXBwICAgICAgICAgICAgICAgICAgICAgICA9IG51bGxcbiMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxubW1fZnJvbV9ycHggPSAoIGQgKSAtPiBNS1RTLkdBVUdFLm1tX2Zyb21fcnB4IGFwcCwgZFxubW1fZnJvbV9ucHggPSAoIGQgKSAtPiBNS1RTLkdBVUdFLm1tX2Zyb21fbnB4IGFwcCwgZFxucnB4X2Zyb21fbW0gPSAoIGQgKSAtPiBNS1RTLkdBVUdFLnJweF9mcm9tX21tIGFwcCwgZFxubnB4X2Zyb21fbW0gPSAoIGQgKSAtPiBNS1RTLkdBVUdFLm5weF9mcm9tX21tIGFwcCwgZFxuxpIgICAgICAgICAgID0gKCB4LCBwcmVjaXNpb24gPSAyICkgLT4geC50b0ZpeGVkIHByZWNpc2lvblxuXG5cbiMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuQF9nZXRfc2x1Z3NfY29udGFpbmVyID0gKCBnY29sdW1uICkgLT5cbiAgUiA9IGpRdWVyeSAnY29udGFpbmVyJ1xuICBpZiBSLmxlbmd0aCBpcyAwXG4gICAgUiA9IGpRdWVyeSBcIjxjb250YWluZXIgc3R5bGU9J2Rpc3BsYXk6YmxvY2s7d2lkdGg6MTAwJTtoZWlnaHQ6MzBtbTtvdXRsaW5lOjFweCBzb2xpZCByZWQnPjwvY29udGFpbmVyPlwiXG4gICAgZ2NvbHVtbi5hcHBlbmQgUlxuICByZXR1cm4gUlxuXG5cbiM9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuIyBCQUxBTkNFRCBDT0xVTU5TXG4jLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbkBnZXRfY29sdW1uX2xpbmVjb3VudHMgPSAoIHN0cmF0ZWd5LCBsaW5lX2NvdW50LCBjb2x1bW5fY291bnQgKSAtPlxuICAjIyMgdGh4IHRvIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzEyNDQzNjkvMjU2MzYxICMjI1xuICBSICAgPSBbXVxuICAjLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG4gIHN3aXRjaCBzdHJhdGVneVxuICAgICMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG4gICAgd2hlbiAnZXZlbidcbiAgICAgIGZvciBjb2wgaW4gWyAxIC4uIGNvbHVtbl9jb3VudCBdXG4gICAgICAgIFIucHVzaCAoIGxpbmVfY291bnQgKyBjb2x1bW5fY291bnQgLSBjb2wgKSAvLyBjb2x1bW5fY291bnRcbiAgICAjLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICAgIGVsc2VcbiAgICAgIHRocm93IG5ldyBFcnJvciBcInVua25vd24gc3RyYXRlZ3kgI3tycHIgc3RyYXRlZ3l9XCJcbiAgIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICByZXR1cm4gUlxuXG4jLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbkNPTFVNTiA9IHt9XG5cbiMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuQ09MVU1OLm5ld19jb2x1bW4gPSAoIHN1YnN0cmF0ZSwgc2VsZWN0b3IgKSAtPlxuICBSID1cbiAgICAnfmlzYSc6ICAgICAgICAgJ0xJTkVTRVRURVIvY29sdW1uJ1xuICAgICclc2VsZic6ICAgICAgICBzdWJzdHJhdGVcbiAgICAnbGluZXMnOiAgICAgICAgbGluZXMgPSBbXVxuICAgICdsZW5ndGgnOiAgICAgICAwXG4gICMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cbiAgaWYgc2VsZWN0b3I/XG4gICAgZWxlbWVudHMgPSBzdWJzdHJhdGUuZmluZCBzZWxlY3RvclxuICAgIGxpbmVzLnB1c2ggKCBlbGVtZW50cy5lcSBpZHggKSBmb3IgaWR4IGluIFsgMCAuLi4gZWxlbWVudHMubGVuZ3RoIF1cbiAgICBSWyAnbGVuZ3RoJyBdID0gZWxlbWVudHMubGVuZ3RoXG4gICMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cbiAgcmV0dXJuIFJcblxuIy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5DT0xVTU4ucHVzaCA9ICggbWUsIGxpbmUgKSAtPlxuICBsaW5lID0galF1ZXJ5IGxpbmUgaWYgQ05ELmlzYV90ZXh0IGxpbmVcbiAgbWVbICdsaW5lcycgXS5wdXNoIGxpbmVcbiAgbWVbICclc2VsZicgXS5hcHBlbmQgbGluZVxuICBtZVsgJ2xlbmd0aCcgXSA9IG1lWyAnbGluZXMnIF0ubGVuZ3RoXG4gIHJldHVybiBtZVxuXG4jLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbkNPTFVNTi5wb3AgPSAoIG1lICkgLT5cbiAgdGhyb3cgbmV3IEVycm9yIFwidW5hYmxlIHRvIHBvcCBmcm9tIGVtcHR5IGxpc3RcIiBpZiBtZVsgJ2xlbmd0aCcgXSA8IDFcbiAgUiA9IG1lWyAnbGluZXMnIF0ucG9wKClcbiAgUi5kZXRhY2goKVxuICBtZVsgJ2xlbmd0aCcgXSA9IG1lWyAnbGluZXMnIF0ubGVuZ3RoXG4gIHJldHVybiBSXG5cbiMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuQ09MVU1OLmluc2VydCA9ICggbWUsIGxpbmUsIGlkeCApIC0+XG4gIGxpbmUgPSBqUXVlcnkgbGluZSBpZiBDTkQuaXNhX3RleHQgbGluZVxuICBpZiBpZHg/XG4gICAgbWVbICdsaW5lcycgXS5zcGxpY2UgaWR4LCAwLCBsaW5lXG4gICAgbWVbICclc2VsZicgXVsgaWR4IF0uYmVmb3JlIGxpbmVcbiAgZWxzZVxuICAgIG1lWyAnbGluZXMnIF0udW5zaGlmdCBsaW5lXG4gICAgbWVbICclc2VsZicgXS5wcmVwZW5kIGxpbmVcbiAgbWVbICdsZW5ndGgnIF0gPSBtZVsgJ2xpbmVzJyBdLmxlbmd0aFxuICByZXR1cm4gbWVcblxuIy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5DT0xVTU4ucHVsbCA9ICggbWUgKSAtPlxuICBSID0gbWVbICclbGluZXMnIF0uc2hpZnQoKVxuICBSLmRldGFjaCgpXG4gIG1lWyAnbGVuZ3RoJyBdID0gbWVbICdsaW5lcycgXS5sZW5ndGhcbiAgcmV0dXJuIFJcblxuIy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5DT0xVTU4ucG9wX292ZXIgPSAoIG1lLCBvdGhlciwgY291bnQgPSAxLCBoYW5kbGVyID0gbnVsbCApIC0+XG4gIHN3aXRjaCBhcml0eSA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICB3aGVuIDIsIDQgdGhlbiBudWxsXG4gICAgd2hlbiAzXG4gICAgICBpZiBDTkQuaXNhX2Z1bmN0aW9uIGNvdW50XG4gICAgICAgIGhhbmRsZXIgPSBjb3VudFxuICAgICAgICBjb3VudCAgID0gMVxuICAgIGVsc2VcbiAgICAgIHRocm93IG5ldyBFcnJvciBcImV4cGVjdGVkIGJldHdlZW4gMiBhbmQgNCBhcmd1bWVudHMsIGdvdCAje2FyaXR5fVwiXG4gICMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cbiAgcmV0dXJuIEBwb3Bfb3Zlcl9hc3luYyBtZSwgb3RoZXIsIGNvdW50IGhhbmRsZXIgaWYgaGFuZGxlcj9cbiAgIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICBpZiAoIGxlbmd0aCA9IG1lWyAnbGVuZ3RoJyBdICkgPCBtZVsgJ2xlbmd0aCcgXVxuICAgIHRocm93IG5ldyBFcnJvciBcInVuYWJsZSB0byBkaXZpZGUgd2l0aCBjb3VudCAje2NvdW50fSBhbmQgbGVuZ3RoICN7bGVuZ3RofVwiXG4gIG90aGVyID0gQG5ld19jb2x1bW4gc3Vic3RyYXRlIHVubGVzcyBDTkQuaXNhIG90aGVyLCAnTElORVNFVFRFUi9jb2x1bW4nXG4gIGZvciBfIGluIFsgMSAuLiBjb3VudCBdXG4gICAgQGluc2VydCBvdGhlciwgQHBvcCBtZVxuICByZXR1cm4gWyBtZSwgb3RoZXIsIF1cblxuIy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5DT0xVTU4ucG9wX292ZXJfYXN5bmMgPSAoIG1lLCBvdGhlciwgY291bnQsIGhhbmRsZXIgKSAtPlxuICBpZiAoIGxlbmd0aCA9IG1lWyAnbGVuZ3RoJyBdICkgPCBtZVsgJ2xlbmd0aCcgXVxuICAgIHRocm93IG5ldyBFcnJvciBcInVuYWJsZSB0byBkaXZpZGUgd2l0aCBjb3VudCAje2NvdW50fSBhbmQgbGVuZ3RoICN7bGVuZ3RofVwiXG4gIG90aGVyID0gQG5ld19jb2x1bW4gc3Vic3RyYXRlIHVubGVzcyBDTkQuaXNhIG90aGVyLCAnTElORVNFVFRFUi9jb2x1bW4nXG4gIHN0ZXAgKCByZXN1bWUgKSA9PlxuICAgIGZvciBfIGluIFsgMSAuLiBjb3VudCBdXG4gICAgICBsaW5lID0gQHBvcCBtZVxuICAgICAgeWllbGQgYWZ0ZXIgMC4wMDEsIHJlc3VtZVxuICAgICAgQGluc2VydCBvdGhlciwgbGluZVxuICAgIGhhbmRsZXIgbnVsbCwgWyBtZSwgb3RoZXIsIF1cblxuIz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4jXG4jLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbkAkYWRkX2NvbHVtbl9mb3JtYXR0aW5nX3NpZ25hbHMgPSAtPlxuICBsYXN0X2NvbHVtbnNfc2V0dGluZyA9IG51bGxcbiAgcmV0dXJuICQgKCBibG9ja19ob3RtbCwgc2VuZCApID0+XG4gICAgIyMjIFRBSU5UIGluZWZmaWNpZW50IGJlY2F1c2Ugd2UgY29udmVydCB0byBIVE1MIGFuZCB0aGVuIHRvIGpRdWVyeSBtZXJlbHkgdG8gc2VlIHdoZXRoZXIgYW4gWENTU1xuICAgIHNlbGVjdG9yIG1hdGNoZXMgdGhlIGJsb2NrIGVsZW1lbnQgIyMjXG4gICAgbm9kZSA9IGpRdWVyeSBIT1RNRVRBTC5hc19odG1sIGJsb2NrX2hvdG1sXG4gICAgaWYgKCBjb2x1bW5zX3NldHRpbmcgPSAoIFhDU1MucnVsZXNfZnJvbV9ub2RlIGFwcCwgbm9kZSApWyAnLW1rdHMtY29sdW1ucycgXSApP1xuICAgICAgaWYgY29sdW1uc19zZXR0aW5nIGlzbnQgbGFzdF9jb2x1bW5zX3NldHRpbmdcbiAgICAgICAgc2VuZCBbICdjb2x1bW5zJywgY29sdW1uc19zZXR0aW5nLCBdXG4gICAgc2VuZCBbICdibG9jaycsIGJsb2NrX2hvdG1sLCBdXG5cbiMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuQHRyeV9zbHVnID0gKCBjb250YWluZXIsIGJsb2NrX2hvdG1sLCBsaW5lX25yLCBzdGFydF9pZHgsIHN0b3BfaWR4ICkgPT5cbiAgc2x1Z19ob3RtbCAgICAgICAgICAgICAgICAgID0gSE9UTUVUQUwuc2xpY2UgYmxvY2tfaG90bWwsIHN0YXJ0X2lkeCwgc3RvcF9pZHggKyAxXG4gIGJsb2NrX3RhZyAgICAgICAgICAgICAgICAgICA9IHNsdWdfaG90bWxbIDAgXVsgMCBdWyAwIF1cbiAgSE9UTUVUQUwuVEFHLnNldCBibG9ja190YWcsICdsaW5lLW5yJywgbGluZV9uclxuICBIT1RNRVRBTC5UQUcuYWRkX2NsYXNzIGJsb2NrX3RhZywgJ3NsdWcnXG4gIGlmIGxpbmVfbnIgaXMgMVxuICAgICMgSE9UTUVUQUwuVEFHLnJlbW92ZV9jbGFzcyAgYmxvY2tfdGFnLCAnbWlkZGxlJ1xuICAgIEhPVE1FVEFMLlRBRy5hZGRfY2xhc3MgICAgIGJsb2NrX3RhZywgJ2ZpcnN0J1xuICBlbHNlXG4gICAgIyBIT1RNRVRBTC5UQUcucmVtb3ZlX2NsYXNzICBibG9ja190YWcsICdmaXJzdCdcbiAgICBIT1RNRVRBTC5UQUcuYWRkX2NsYXNzICAgICBibG9ja190YWcsICdtaWRkbGUnXG4gIHNsdWdfaHRtbCAgICAgICAgICAgICAgICAgICA9IEhPVE1FVEFMLmFzX2h0bWwgc2x1Z19ob3RtbFxuICBzbHVnX2pxICAgICAgICAgICAgICAgICAgICAgPSBqUXVlcnkgc2x1Z19odG1sXG4gIHdpZHRoX2dhdWdlICAgICAgICAgICAgICAgICA9IHNsdWdfanEuY2hpbGRyZW4oKVsgMCBdXG4gIGNvbnRhaW5lci5hcHBlbmQgc2x1Z19qcVxuICBjbGllbnRfcmVjdGFuZ2xlcyAgICAgICAgICAgPSB3aWR0aF9nYXVnZS5nZXRDbGllbnRSZWN0cygpXG4gIGNvbnRhaW5lcl93aWR0aCAgICAgICAgICAgICA9IGNvbnRhaW5lci53aWR0aCgpXG4gIGNsaWVudF9yZWN0YW5nbGUgICAgICAgICAgICA9IGNsaWVudF9yZWN0YW5nbGVzWyAwIF1cbiAgY2xpZW50X3dpZHRoICAgICAgICAgICAgICAgID0gY2xpZW50X3JlY3RhbmdsZVsgJ3JpZ2h0JyBdIC0gY29udGFpbmVyLm9mZnNldCgpWyAnbGVmdCcgXVxuICBleGNlc3MgICAgICAgICAgICAgICAgICAgICAgPSBNYXRoLm1heCAwLCBNYXRoLmZsb29yIGNsaWVudF93aWR0aCAtIGNvbnRhaW5lcl93aWR0aFxuICAjIyMgVEFJTlQgYXJiaXRyYXJ5IHByZWNpc2lvbiBsaW1pdCAjIyNcbiAgZXhjZXNzICAgICAgICAgICAgICAgICAgICAgID0gMCBpZiBleGNlc3MgPCAzXG4gIGlzX3Rvb19sb25nICAgICAgICAgICAgICAgICA9IGV4Y2VzcyA+IDBcbiAgbGluZV9jb3VudCAgICAgICAgICAgICAgICAgID0gY2xpZW50X3JlY3RhbmdsZXMubGVuZ3RoXG4gIHJldHVybiBbIHNsdWdfaG90bWwsIHNsdWdfaHRtbCwgaXNfdG9vX2xvbmcsIGV4Y2VzcywgXVxuXG4jLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbkAkZ2V0X3NsdWdzID0gKCBnY29sdW1uICkgLT5cbiAgY29udGFpbmVyID0gQF9nZXRfc2x1Z3NfY29udGFpbmVyIGdjb2x1bW5cbiAgIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICByZXR1cm4gJCAoIGJsb2NrX2hvdG1sLCBzZW5kICkgPT5cbiAgICBzdGFydF9pZHggICAgICAgICA9IDBcbiAgICBzdG9wX2lkeCAgICAgICAgICA9IDBcbiAgICB0cmlhbF9jb3VudCAgICAgICA9IDBcbiAgICBsYXN0X3N0YXJ0X2lkeCAgICA9IGJsb2NrX2hvdG1sLmxlbmd0aCAtIDFcbiAgICBodG1sX2xpbmVzICAgICAgICA9IFtdXG4gICAgc2xpY2VzICAgICAgICAgICAgPSBbXVxuICAgIGV4Y2Vzc2VzICAgICAgICAgID0gW11cbiAgICBzbHVnX2h0bWwgICAgICAgICA9IG51bGxcbiAgICBnb29kX3NsdWdfaHRtbCAgICA9IG51bGxcbiAgICBnb29kX3NsaWNlX2hvdG1sICA9IG51bGxcbiAgICBnb29kX2V4Y2VzcyAgICAgICA9IG51bGxcbiAgICBpc19maW5pc2hlZCAgICAgICA9IG5vXG4gICAgbGluZV9uciAgICAgICAgICAgPSAwXG4gICAgZGVidWcgJ8KpV28wbTcnLCBIT1RNRVRBTC5hc19odG1sIGJsb2NrX2hvdG1sXG4gICAgIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cbiAgICB1bnRpbCBpc19maW5pc2hlZFxuICAgICAgdHJpYWxfY291bnQgKz0gKzFcbiAgICAgIGdvb2Rfc2x1Z19odG1sICAgID0gc2x1Z19odG1sXG4gICAgICBnb29kX3NsaWNlX2hvdG1sICA9IHNsaWNlX2hvdG1sXG4gICAgICBnb29kX2V4Y2VzcyAgICAgICA9IGV4Y2Vzc1xuICAgICAgbGluZV9uciAgICAgICAgICAgPSBodG1sX2xpbmVzLmxlbmd0aCArIDFcbiAgICAgICMjIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0gIyMjXG4gICAgICAjIyMgVEFJTlQgYXJiaXRyYXJ5IGxpbWl0ICMjI1xuICAgICAgaWYgdHJpYWxfY291bnQgPiAyNVxuICAgICAgICB1cmdlIFwiIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1wiXG4gICAgICAgIHdhcm4gXCJ0b28gbWFueSB0cmlhbHM7IGFib3J0aW5nXCJcbiAgICAgICAgdXJnZSBcIiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcIlxuICAgICAgICBicmVha1xuICAgICAgaWYgbGluZV9uciA+IDI1XG4gICAgICAgIHVyZ2UgXCIjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXCJcbiAgICAgICAgd2FybiBcInRvbyBtYW55IGxpbmVzOyBhYm9ydGluZ1wiXG4gICAgICAgIHVyZ2UgXCIjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXCJcbiAgICAgICAgYnJlYWtcbiAgICAgICMjIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0gIyMjXG4gICAgICBbIHNsaWNlX2hvdG1sXG4gICAgICAgIHNsdWdfaHRtbFxuICAgICAgICBpc190b29fbG9uZ1xuICAgICAgICBleGNlc3MgICAgICBdID0gQHRyeV9zbHVnIGNvbnRhaW5lciwgYmxvY2tfaG90bWwsIGxpbmVfbnIsIHN0YXJ0X2lkeCwgc3RvcF9pZHhcbiAgICAgIHVyZ2UgJ8KpdWFEc24nLCBzdGFydF9pZHgsIHN0b3BfaWR4LCBzbHVnX2h0bWxcbiAgICAgICMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICAgICAgaWYgc3RvcF9pZHggPj0gbGFzdF9zdGFydF9pZHhcbiAgICAgICAgZGVidWcgJ8KpeGVRUXcnLCAnKDEpJ1xuICAgICAgICAjIHdhcm4gJzInLCBcInN0b3BfaWR4ID4gbGFzdF9zdGFydF9pZHhcIlxuICAgICAgICBleGNlc3Nlcy5wdXNoICAgZXhjZXNzXG4gICAgICAgIHNsaWNlcy5wdXNoICAgICBzbGljZV9ob3RtbFxuICAgICAgICBodG1sX2xpbmVzLnB1c2ggc2x1Z19odG1sXG4gICAgICAgIGlzX2ZpbmlzaGVkID0geWVzXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICAjLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cbiAgICAgIGlmIGlzX3Rvb19sb25nXG4gICAgICAgIGRlYnVnICfCqXhlUVF3JywgJygyKSdcbiAgICAgICAgd2FybiBzbHVnX2h0bWxcbiAgICAgICAgd2FybiBcImV4Y2VlZGluZyBjb250YWluZXIgYnkgI3tleGNlc3MudG9GaXhlZCAxfXB4XCJcbiAgICAgICAgZGVidWcgJ8KpaEJ1dnMnLCBnb29kX3NsdWdfaHRtbFxuICAgICAgICBpZiB0cmlhbF9jb3VudCBpcyAxXG4gICAgICAgICAgaGVscCAnwql3eFNQaicsIHNsdWdfaHRtbFxuICAgICAgICAgIGV4Y2Vzc2VzLnB1c2ggICBleGNlc3NcbiAgICAgICAgICBzbGljZXMucHVzaCAgICAgc2xpY2VfaG90bWxcbiAgICAgICAgICBodG1sX2xpbmVzLnB1c2ggc2x1Z19odG1sXG4gICAgICAgICAgZGVidWcgJ8KpVG1KRnInLCBleGNlc3Nlcy5sZW5ndGgsIHNsaWNlcy5sZW5ndGgsIGh0bWxfbGluZXMubGVuZ3RoLCBleGNlc3Nlc1xuICAgICAgICAgIHN0YXJ0X2lkeCAgID0gc3RvcF9pZHggICsgMVxuICAgICAgICAgIHN0b3BfaWR4ICAgID0gc3RhcnRfaWR4IC0gMVxuICAgICAgICAgIHRyaWFsX2NvdW50ID0gMFxuICAgICAgICBlbHNlXG4gICAgICAgICAgZGVidWcgJ8KpeGVRUXcnLCAnKDMpJ1xuICAgICAgICAgIGV4Y2Vzc2VzLnB1c2ggICBnb29kX2V4Y2Vzc1xuICAgICAgICAgIHNsaWNlcy5wdXNoICAgICBnb29kX3NsaWNlX2hvdG1sXG4gICAgICAgICAgaHRtbF9saW5lcy5wdXNoIGdvb2Rfc2x1Z19odG1sXG4gICAgICAgICAgc3RhcnRfaWR4ICAgPSBzdG9wX2lkeFxuICAgICAgICAgIHN0b3BfaWR4ICAgID0gc3RhcnRfaWR4IC0gMVxuICAgICAgICAgIHRyaWFsX2NvdW50ID0gMFxuICAgICAgIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG4gICAgICBkZWJ1ZyAnwql4ZVFRdycsICcoNCknXG4gICAgICBzdG9wX2lkeCAgICAgKz0gKzFcbiAgICAgICMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICAgICAgaWYgc3RhcnRfaWR4ID49IGxhc3Rfc3RhcnRfaWR4XG4gICAgICAgIHRocm93IG5ldyBFcnJvciBcIm5vdCB5ZXQgaW1wbGVtZW50ZWQgKDIpXCJcbiAgICAjLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICAgIG5ld19jbGFzcyAgICAgICAgICAgPSBpZiBzbGljZXMubGVuZ3RoIGlzIDEgdGhlbiAnc2luZ2xlJyBlbHNlICdsYXN0J1xuICAgIGxhc3RfbGluZV9ob3RtbCAgICAgPSBzbGljZXNbIHNsaWNlcy5sZW5ndGggLSAxIF1cbiAgICBsYXN0X2xpbmVfYmxvY2tfdGFnID0gbGFzdF9saW5lX2hvdG1sWyAwIF1bIDAgXVsgMCBdXG4gICAgSE9UTUVUQUwuVEFHLnJlbW92ZV9jbGFzcyAgbGFzdF9saW5lX2Jsb2NrX3RhZywgJ21pZGRsZSdcbiAgICBIT1RNRVRBTC5UQUcucmVtb3ZlX2NsYXNzICBsYXN0X2xpbmVfYmxvY2tfdGFnLCAnZmlyc3QnXG4gICAgSE9UTUVUQUwuVEFHLmFkZF9jbGFzcyAgICAgbGFzdF9saW5lX2Jsb2NrX3RhZywgbmV3X2NsYXNzXG4gICAgIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cbiAgICBmb3Igc2x1Z19ob3RtbCwgc2x1Z19pZHggaW4gc2xpY2VzXG4gICAgICB0YWdfaG90bWwgICAgICAgICAgICAgICA9IHNsdWdfaG90bWxbIDAgXVsgMCBdWyAwIF1cbiAgICAgIGV4Y2VzcyAgICAgICAgICAgICAgICAgID0gZXhjZXNzZXNbIHNsdWdfaWR4IF1cbiAgICAgIEhPVE1FVEFMLlRBRy5hZGRfY2xhc3MgdGFnX2hvdG1sLCAnZXhjZXNzJyBpZiBleGNlc3MgPiAwXG4gICAgICBIT1RNRVRBTC5UQUcuc2V0IHRhZ19ob3RtbCwgJ2V4Y2VzcycsIGV4Y2Vzcy50b0ZpeGVkIDJcbiAgICAgIHNsdWdfaHRtbCAgICAgICAgICAgICAgID0gSE9UTUVUQUwuYXNfaHRtbCBzbHVnX2hvdG1sXG4gICAgICBodG1sX2xpbmVzWyBzbHVnX2lkeCBdICA9IHNsdWdfaHRtbFxuICAgICMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG4gICAgIyMjIGRlYWN0aXZhdGUgdGhpcyB0byBrZWVwIHNlZWluZyBsaW5lcyBpbiB0aGUgZ2FsbGV5ICMjI1xuICAgIGNvbnRhaW5lci5lbXB0eSgpXG4gICAgc2VuZCBodG1sX2xpbmVzXG4gICAgaGVscCBcIiN7KCB0cmlhbF9jb3VudCAvIGh0bWxfbGluZXMubGVuZ3RoICkudG9GaXhlZCAyfSB0cmlhbHMgcGVyIGxpbmVcIlxuXG4jLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbkAkeHh4ID0gLT5cbiAgdGFyZ2V0X2NvbHVtbnMgICAgICA9IGpRdWVyeSAncGFnZSBjb2x1bW4nXG4gIHRhcmdldF9jb2x1bW5faWR4ICAgPSAwXG4gIHRhcmdldF9jb2x1bW4gICAgICAgPSB0YXJnZXRfY29sdW1ucy5lcSB0YXJnZXRfY29sdW1uX2lkeFxuICBsaW5lX2NvdW50ICAgICAgICAgID0gMFxuICBsaW5lcyAgICAgICAgICAgICAgID0gW11cbiAgIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICByZXR1cm4gJCAoIGh0bWxfbGluZXMsIHNlbmQsIGVuZCApID0+XG4gICAgIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cbiAgICBpZiBodG1sX2xpbmVzP1xuICAgICAgIyMjIFRBSU5UIG5vIG5lZWQgdG8gcmVjb21wdXRlIG9uIGVhY2ggcGFyYWdyYXBoICMjI1xuICAgICAgY29sdW1uX3JlY3RhbmdsZSAgPSBCRC5nZXRfcmVjdGFuZ2xlIHRhcmdldF9jb2x1bW5cbiAgICAgIGRlbHRhX3lfcHggICAgICAgID0gY29sdW1uX3JlY3RhbmdsZVsgJ3RvcCcgXVxuICAgICAgY29sdW1uX2hlaWdodF9tbSAgPSBtbV9mcm9tX25weCBjb2x1bW5fcmVjdGFuZ2xlWyAnaGVpZ2h0JyBdXG4gICAgICAjIyMgVEFJTlQgYXJiaXRyYXJ5IHByZWNpc2lvbiAjIyNcbiAgICAgIGVwc2lsb25fbW0gICAgICAgID0gMC41XG4gICAgICAjLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cbiAgICAgIGZvciBodG1sX2xpbmUsIGxpbmVfaWR4IGluIGh0bWxfbGluZXNcbiAgICAgICAgbGluZV9jb3VudCAgICs9ICsxXG4gICAgICAgIGxpbmUgICAgICAgICAgPSBqUXVlcnkgaHRtbF9saW5lXG4gICAgICAgIGxpbmVzLnB1c2ggbGluZVxuICAgICAgICB0YXJnZXRfY29sdW1uLmFwcGVuZCBsaW5lXG4gICAgICAgIHJlY3RhbmdsZSAgICAgPSBCRC5nZXRfcmVjdGFuZ2xlIGxpbmVcbiAgICAgICAgd2lkdGhfcHggICAgICA9IHJlY3RhbmdsZVsgJ3dpZHRoJyAgXVxuICAgICAgICBoZWlnaHRfcHggICAgID0gcmVjdGFuZ2xlWyAnaGVpZ2h0JyBdXG4gICAgICAgIHRvcF9weCAgICAgICAgPSByZWN0YW5nbGVbICd0b3AnICAgIF0gLSBkZWx0YV95X3B4XG4gICAgICAgIGJvdHRvbV9weCAgICAgPSByZWN0YW5nbGVbICdib3R0b20nIF0gLSBkZWx0YV95X3B4XG4gICAgICAgIHdpZHRoX21tICAgICAgPSBtbV9mcm9tX25weCB3aWR0aF9weFxuICAgICAgICBoZWlnaHRfbW0gICAgID0gbW1fZnJvbV9ucHggaGVpZ2h0X3B4XG4gICAgICAgIHRvcF9tbSAgICAgICAgPSBtbV9mcm9tX25weCB0b3BfcHhcbiAgICAgICAgYm90dG9tX21tICAgICA9IG1tX2Zyb21fbnB4IGJvdHRvbV9weFxuICAgICAgICBvdmVyc2hvb3RfbW0gID0gYm90dG9tX21tIC0gY29sdW1uX2hlaWdodF9tbVxuICAgICAgICBpc19vZmYgICAgICAgID0gb3ZlcnNob290X21tID49IGVwc2lsb25fbW1cbiAgICAgICAgaWYgaXNfb2ZmXG4gICAgICAgICAgIyMjIFRBSU5UIG11c3QgZGV0ZWN0IHdoZW4gcGFnZSBmdWxsICMjI1xuICAgICAgICAgIHRhcmdldF9jb2x1bW5faWR4ICArPSArMVxuICAgICAgICAgIHRhcmdldF9jb2x1bW4gICAgICAgPSB0YXJnZXRfY29sdW1ucy5lcSB0YXJnZXRfY29sdW1uX2lkeFxuICAgICAgICAgIGxpbmUuZGV0YWNoKClcbiAgICAgICAgICB0YXJnZXRfY29sdW1uLmFwcGVuZCBsaW5lXG4gICAgICAgICMgZGVidWcgJ8KpYlBldzQnLCBsaW5lX2lkeCwgKCDGkiBib3R0b21fbW0sIDEgKSwgKCDGkiBjb2x1bW5faGVpZ2h0X21tLCAxICksICggxpIgb3ZlcnNob290X21tLCAxICksIGlzX29mZiwgbGluZS50ZXh0KClbIC4uIDIwIF1cbiAgICAgIHNlbmQgaHRtbF9saW5lc1xuICAgICMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG4gICAgaWYgZW5kP1xuICAgICAgIyBkZWJ1ZyAnwqluR1FIbycsIGxpbmVfY291bnRcbiAgICAgICMgZGVidWcgJ8KpYmdzNjMnLCBAZ2V0X2NvbHVtbl9saW5lY291bnRzICdldmVuJywgbGluZV9jb3VudCwgY29sdW1uc19wZXJfcGFnZVxuICAgICAgZW5kKClcblxuXG4jPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiNcbiMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuQGRlbW8gPSAoIGFwcF8sIG1kLCBzZXR0aW5ncywgaGFuZGxlciApIC0+XG4gIHN3aXRjaCBhcml0eSA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICB3aGVuIDNcbiAgICAgIGhhbmRsZXIgICA9IHNldHRpbmdzXG4gICAgICBzZXR0aW5ncyAgPSB7fVxuICAgIHdoZW4gNFxuICAgICAgbnVsbFxuICAgIGVsc2VcbiAgICAgIHRocm93IG5ldyBFcnJvciBcIiBleHBlY3RlZCAzIG9yIDQgYXJndW1lbnRzLCBnb3QgI3thcml0eX1cIlxuICAjLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHN3aXRjaCBmb3JtYXQgPSBzZXR0aW5nc1sgJ2Zvcm1hdCcgXSA/ICdtZCdcbiAgICB3aGVuICdtZCdcbiAgICAgIGFzX2h0bWwgPSBELk1ELiRhc19odG1sKClcbiAgICB3aGVuICdodG1sJ1xuICAgICAgYXNfaHRtbCA9IEQuJHBhc3NfdGhyb3VnaCgpXG4gICAgZWxzZVxuICAgICAgcmV0dXJuIGhhbmRsZXIgbmV3IEVycm9yIFwidW5rbm93biBmb3JtYXQgI3tycHIgZm9ybWF0fVwiXG4gICMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgYXBwICAgICAgICAgICAgICAgICA9IGFwcF9cbiAgbWF0dGVyICAgICAgICAgICAgICA9IGFwcFsgJ21hdHRlcicgXVxuICBqUXVlcnkgICAgICAgICAgICAgID0gYXBwWyAnalF1ZXJ5JyBdXG4gIE1LVFMgICAgICAgICAgICAgICAgPSBhcHBbICdNS1RTJyAgIF1cbiAgd2luZG93ICAgICAgICAgICAgICA9IGFwcFsgJ3dpbmRvdycgXVxuICBkb2N1bWVudCAgICAgICAgICAgID0gd2luZG93WyAnZG9jdW1lbnQnIF1cbiAgQkQgICAgICAgICAgICAgICAgICA9IHdpbmRvd1sgJ0JEJyAgXVxuICBnY29sdW1uICAgICAgICAgICAgID0gKCBqUXVlcnkgJ2dhbGxleSBjb2x1bW4nICkuZXEgMFxuICBnY29sdW1uX29mZnNldCAgICAgID0gZ2NvbHVtbi5vZmZzZXQoKVxuICBnY29sdW1uX2xlZnQgICAgICAgID0gZ2NvbHVtbl9vZmZzZXRbICdsZWZ0JyBdXG4gIGdjb2x1bW5fdG9wICAgICAgICAgPSBnY29sdW1uX29mZnNldFsgJ3RvcCcgIF1cbiAgem9vbWVyICAgICAgICAgICAgICA9IGpRdWVyeSAnem9vbWVyJ1xuICAjIHdpbmRvdy5nY29sdW1uICAgICAgPSBnY29sdW1uICMgPj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+XG4gIGlucHV0ICAgICAgICAgICAgICAgPSBELmNyZWF0ZV90aHJvdWdoc3RyZWFtKClcblxuICAjLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIG1hcmtfY2hycyAgICAgICAgICAgPSB5ZXNcbiAgbWFya19saW5lcyAgICAgICAgICA9IG5vXG4gIFhYWF90MCAgICAgICAgICAgICAgPSArbmV3IERhdGUoKVxuICBYWFhfdGltZXMgICAgICAgICAgID0gW11cbiAgIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICBpbnB1dFxuICAgICMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG4gICAgIyAucGlwZSBELlRZUE8uJHF1b3RlcygpXG4gICAgIyAucGlwZSBELlRZUE8uJGRhc2hlcygpXG4gICAgLnBpcGUgYXNfaHRtbFxuICAgICMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG4gICAgIyAucGlwZSAkICggaHRtbCwgc2VuZCApID0+XG4gICAgIyAgICMjIyBUQUlOVCBRICYgRCBtZXRob2QgdG8gaW5zZXJ0IGxlYWRpbmcsIHRyYWlsaW5nIGJsb2NrIHN0dWZmICMjI1xuICAgICMgICAjIyMgRGVmaW5pdGlvbiBvZiB0aGVzZSBtdXN0IGdvIHRvIGRvY3VtZW50IENTUywgIyMjXG4gICAgIyAgICMjIyBzaG91bGQgdGhlbiBiZSBhcHBsaWVkIGJ5IFhDU1MgKD8pIGFuZCAvIG9yIE1EIHBhcnNlciAjIyNcbiAgICAjICAgaHRtbCA9IGh0bWwucmVwbGFjZSAvKDxwIGxvYz1cIlswLTksXStcIj4pL2dpLCAnJDEjIyMnXG4gICAgIyAgICMgaHRtbCA9IGh0bWwucmVwbGFjZSAvKDxcXC9wPikvZ2ksIFwiXCJcIiZuYnNwOzxzcGFuIHN0eWxlPSd3aGl0ZS1zcGFjZTpub3dyYXA7Jz4mbmJzcDt4Jm5ic3A7eCZuYnNwO3gmbmJzcDt4Jm5ic3A7eCZuYnNwO3gmbmJzcDt4Jm5ic3A7eCZuYnNwO3gmbmJzcDt4Jm5ic3A7eDwvc3Bhbj4kMVwiXCJcIlxuICAgICMgICBkZWJ1ZyAnwqk0UVBISicsIGh0bWxcbiAgICAjICAgc2VuZCBodG1sXG4gICAgIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cbiAgICAucGlwZSAkICggaHRtbCwgc2VuZCApID0+XG4gICAgICBYWFhfdGltZXMucHVzaCBbIFwiaHRtbCBmcm9tIG1hcmtkb3duXCIsIG5ldyBEYXRlKCkgLSBYWFhfdDAsIF1cbiAgICAgIHNlbmQgSE9UTUVUQUwuSFRNTC5wYXJzZSBodG1sXG4gICAgICBYWFhfdGltZXMucHVzaCBbIFwiaHRtbCBwYXJzZWQgaW50byBob3RtbFwiLCBuZXcgRGF0ZSgpIC0gWFhYX3QwLCBdXG4gICAgIyAucGlwZSBtYWtlIGNoYXJhY3RlciByZXBsYWNlbWVudHNcbiAgICAjLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICAgIC5waXBlICQgKCBkb2N1bWVudF9ob3RtbCwgc2VuZCApID0+XG4gICAgICAjIyMgc3BsaXQgZG9jdW1lbnQgaW50byBibG9ja3MgIyMjXG4gICAgICBIT1RNRVRBTC5zbGljZV90b3BsZXZlbF90YWdzIGRvY3VtZW50X2hvdG1sLCAoIGVycm9yLCBibG9ja19ob3RtbCApID0+XG4gICAgICAgIHNlbmQuZXJyb3IgZXJyb3IgaWYgZXJyb3I/XG4gICAgICAgIHNlbmQgYmxvY2tfaG90bWxcbiAgICAjLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICAgICMgLnBpcGUgJGFzeW5jICggZGF0YSwgZG9uZSApID0+IGxhdGVyID0+IGRvbmUgZGF0YVxuICAgICMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG4gICAgIyAucGlwZSBAJGFkZF9jb2x1bW5fZm9ybWF0dGluZ19zaWduYWxzKClcbiAgICAjLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICAgIC5waXBlICQgKCBibG9ja19ob3RtbCwgc2VuZCApID0+XG4gICAgICAjIyMgVEFJTlQgdXNlIEhPVE1FVEFMIGxpYnJhcnkgbWV0aG9kICMjI1xuICAgICAgIyMjIFdyYXAgYmxvY2sgY29udGVudHMgaW4gYHdgIHRhZ3MgdXNlZCB0byBtZWFzdXJlIGxpbmUgd2lkdGg7XG4gICAgICBtZXRob2QgYW5hbG9ndW91cyB0byBgalF1ZXJ5LndyYXBJbm5lcmAgIyMjXG4gICAgICB3YXJuICcjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIydcbiAgICAgIGZpcnN0X3NocmVkID0gYmxvY2tfaG90bWxbIDAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgbGFzdF9zaHJlZCAgPSBibG9ja19ob3RtbFsgYmxvY2tfaG90bWwubGVuZ3RoIC0gMSBdXG4gICAgICBmaXJzdF9zaHJlZFsgMCBdLnB1c2ggICAgIFsgJ3cnLCB7fSwgXVxuICAgICAgbGFzdF9zaHJlZFsgIDIgXS51bnNoaWZ0ICBbICd3JywgXVxuICAgICAgc2VuZCBibG9ja19ob3RtbFxuICAgICMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG4gICAgLnBpcGUgQCRnZXRfc2x1Z3MgZ2NvbHVtblxuICAgICMgLnBpcGUgJGdldF9zbHVnc192MiBnY29sdW1uXG4gICAgIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cbiAgICAucGlwZSBAJHh4eCgpXG4gICAgIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cbiAgICAgIC5waXBlIEQuJG9uX2VuZCAtPlxuICAgICAgICAjIyMgc2hvdyBzb21lIHRleHQgbWV0cmljcyAjIyNcbiAgICAgICAgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSAoIGpRdWVyeSAncC5zbHVnJyApLmdldCAwXG4gICAgICAgICMgZGVidWcgJ8KpOFJueGknLCAoIG5hbWUgZm9yIG5hbWUgb2Ygc3R5bGUgKVxuICAgICAgICBuYW1lcyA9IFwiXCJcIlxuICAgICAgICAgIGZvbnQgZm9udEZhbWlseSBmb250S2VybmluZyBmb250U2l6ZSBmb250U3RyZXRjaCBmb250U3R5bGUgZm9udFZhcmlhbnQgZm9udFZhcmlhbnRMaWdhdHVyZXNcbiAgICAgICAgICBmb250V2VpZ2h0IHdvcmRTcGFjaW5nIGxldHRlclNwYWNpbmdcIlwiXCIuc3BsaXQgL1xccysvXG4gICAgICAgIGZvciBuYW1lIGluIG5hbWVzXG4gICAgICAgICAgaGVscCBuYW1lLCBzdHlsZVsgbmFtZSBdXG4gICAgICAgICMjIyAhISEgIyMjXG4gICAgICAgIFhYWF90aW1lcy5wdXNoIFsgXCJmaW5pc2hlZFwiLCBuZXcgRGF0ZSgpIC0gWFhYX3QwLCBdXG4gICAgICAgIGZvciBbIGRlc2NyaXB0aW9uLCBkdCwgXSBpbiBYWFhfdGltZXNcbiAgICAgICAgICBkZWJ1ZyAnwqkxZW5PQicsIGRlc2NyaXB0aW9uLCAoIGR0IC8gMTAwMCApLnRvRml4ZWQgM1xuICAgICAgICBoYW5kbGVyKClcbiAgIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICBpbnB1dC53cml0ZSBtZFxuICBpbnB1dC5lbmQoKVxuXG4jLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbkBfZGVtb19wb3Bfb3ZlciA9IC0+XG4gIHRhcmdldF9jb2x1bW5zICAgICAgPSBqUXVlcnkgJ3BhZ2UgY29sdW1uJ1xuICBjb2x1bW5zICAgICAgICAgICAgID0gW11cbiAgZm9yIGlkeCBpbiBbIDAgLi4gMiBdXG4gICAgY29sdW1ucy5wdXNoIENPTFVNTi5uZXdfY29sdW1uICggdGFyZ2V0X2NvbHVtbnMuZXEgaWR4ICksICcuc2x1ZydcbiAgZGVidWcgJ8KpMXJtelQnLCBjb2x1bW5zWyAwIF0ubGVuZ3RoLCBjb2x1bW5zWyAxIF0ubGVuZ3RoLCBjb2x1bW5zWyAyIF0ubGVuZ3RoXG4gIENPTFVNTi5wb3Bfb3ZlciBjb2x1bW5zWyAwIF0sIGNvbHVtbnNbIDEgXSwgMVxuICBkZWJ1ZyAnwqkxcm16VCcsIGNvbHVtbnNbIDAgXS5sZW5ndGgsIGNvbHVtbnNbIDEgXS5sZW5ndGhcblxuIy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5AX2RlbW9fcG9wX292ZXJfYXN5bmMgPSAtPlxuICB0YXJnZXRfY29sdW1ucyAgICAgID0galF1ZXJ5ICdwYWdlIGNvbHVtbidcbiAgY29sdW1ucyAgICAgICAgICAgICA9IFtdXG4gICMjIyBUQUlOVCBhcmJpdHJhcnkgY29uc3RhbnQgIyMjXG4gIGNvbHVtbnNfcGVyX3BhZ2UgICAgPSAzXG4gIGxpbmVfY291bnQgICAgICAgICAgPSAwXG4gICMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cbiAgZm9yIGNvbHVtbl9pZHggaW4gWyAwIC4uLiBjb2x1bW5zX3Blcl9wYWdlIF1cbiAgICBjb2x1bW4gICAgICA9IENPTFVNTi5uZXdfY29sdW1uICggdGFyZ2V0X2NvbHVtbnMuZXEgY29sdW1uX2lkeCApLCAnLnNsdWcnXG4gICAgbGluZV9jb3VudCArPSBjb2x1bW5bICdsZW5ndGgnIF1cbiAgICBjb2x1bW5zLnB1c2ggY29sdW1uXG4gICMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cbiAgY29sdW1uX2xpbmVjb3VudHMgICA9IEBnZXRfY29sdW1uX2xpbmVjb3VudHMgJ2V2ZW4nLCBsaW5lX2NvdW50LCBjb2x1bW5zX3Blcl9wYWdlXG4gIGRlYnVnICfCqXJuQzdoJywgY29sdW1uX2xpbmVjb3VudHNcbiAgc3RlcCAoIHJlc3VtZSApID0+XG4gICAgZm9yIGNvbHVtbl9pZHggaW4gWyAwIC4uLiBjb2x1bW5zX3Blcl9wYWdlIF1cbiAgICAgIGNvbHVtbiA9IGNvbHVtbnNbIGNvbHVtbl9pZHggXVxuICAgICAgd2hpbGUgY29sdW1uWyAnbGVuZ3RoJyBdID4gY29sdW1uX2xpbmVjb3VudHNbIGNvbHVtbl9pZHggXVxuICAgICAgICAjIyMgVEFJTlQgaW52YWxpZCBsYXN0IGNvbHVtbiBpZHggIyMjXG4gICAgICAgIHlpZWxkIENPTFVNTi5wb3Bfb3Zlcl9hc3luYyBjb2x1bW5zWyBjb2x1bW5faWR4IF0sIGNvbHVtbnNbIGNvbHVtbl9pZHggKyAxIF0sIDEsIHJlc3VtZVxuICAgICAgIyBoYW5kbGVyIG51bGxcblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiJdfQ==