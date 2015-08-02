// Generated by CoffeeScript 1.9.1
(function() {
  var $, $async, $get_slugs_v1, $get_slugs_v2, CND, D, HOTMETAL, MKTS, XCSS, _get_slugs_container, after, alert, badge, debug, document, echo, glyph_replacements, help, info, jQuery, later, log, now, rpr, sleep, step, suspend, try_slug_hotml_v2, try_slug_v1, urge, warn, whisper, window;

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

  glyph_replacements = require('./glyph-replacements');


  /* https://github.com/meryn/performance-now */

  now = require('performance-now');


  /* The module-globals become available when `demo` is called with `app` argument */

  jQuery = null;

  MKTS = null;

  window = null;

  document = null;

  _get_slugs_container = function(gcolumn) {
    var R;
    R = jQuery('container');
    if (R.length === 0) {
      R = jQuery("<container style='display:block'></container>");
      gcolumn.append(R);
    }
    return R;
  };


  /*
  V1
   */

  try_slug_v1 = (function(_this) {
    return function(container, block_hotml, line_nr, start_idx, stop_idx) {
      var block_tag, client_rectangle, client_rectangles, client_width, container_width, excess, line_count, line_counter, slug_hotml, slug_html, slug_jq;
      slug_hotml = HOTMETAL.slice(block_hotml, start_idx, stop_idx + 1);
      block_tag = slug_hotml[0][0][0];
      HOTMETAL.TAG.set(block_tag, 'line-nr', line_nr);
      if (line_nr === 1) {
        HOTMETAL.TAG.add_class(block_tag, 'first');
      } else {
        HOTMETAL.TAG.add_class(block_tag, 'middle');
      }
      slug_html = HOTMETAL.as_html(slug_hotml);
      slug_jq = jQuery(slug_html);
      line_counter = slug_jq.children()[0];
      container.append(slug_jq);
      client_rectangles = line_counter.getClientRects();
      container_width = container.width();
      client_rectangle = client_rectangles[0];
      client_width = client_rectangle['right'] - container.offset()['left'];
      excess = Math.max(0, Math.floor(client_width - container_width));

      /* TAINT arbitrary precision limit */
      if (excess < 3) {
        excess = 0;
      }
      if (excess > 0) {
        warn(slug_html);
        warn("exceeding container by " + (excess.toFixed(1)) + "px");
      }
      line_count = client_rectangles.length;
      return [slug_hotml, slug_html, line_count, excess];
    };
  })(this);

  $get_slugs_v1 = function(gcolumn) {
    var container;
    container = _get_slugs_container(gcolumn);
    return $((function(_this) {
      return function(block_hotml, send) {
        var excess, excesses, good_slug_html, html_lines, is_finished, last_line_block_tag, last_line_hotml, last_line_html, last_start_idx, line_count, line_nr, new_class, ref, slice_hotml, slices, slug_html, start_idx, stop_idx, trial_count;
        start_idx = 0;
        stop_idx = 0;
        trial_count = 0;
        last_start_idx = block_hotml.length - 1;
        html_lines = [];
        slices = [];
        excesses = [];
        slug_html = null;
        good_slug_html = null;
        is_finished = false;
        line_nr = 0;
        while (!is_finished) {
          trial_count += +1;
          good_slug_html = slug_html;
          line_nr = html_lines.length + 1;
          ref = try_slug_v1(container, block_hotml, line_nr, start_idx, stop_idx), slice_hotml = ref[0], slug_html = ref[1], line_count = ref[2], excess = ref[3];
          if (stop_idx >= last_start_idx) {
            excesses.push(excess);
            slices.push(slice_hotml);
            html_lines.push(slug_html);
            is_finished = true;
            continue;
          }
          if (line_count > 1) {
            if (trial_count === 1) {
              throw new Error("not yet implemented");
            }
            excesses.push(excess);
            slices.push(slice_hotml);
            html_lines.push(good_slug_html);
            start_idx = stop_idx;
            stop_idx = start_idx - 1;
          }
          stop_idx += +1;
          if (start_idx >= last_start_idx) {
            throw new Error("not yet implemented");
          }
        }
        excess = excesses[excesses.length - 1];
        new_class = slices.length === 1 ? 'single' : 'last';
        last_line_hotml = slices[slices.length - 1];
        last_line_block_tag = last_line_hotml[0][0][0];
        HOTMETAL.TAG.remove_class(last_line_block_tag, 'middle');
        HOTMETAL.TAG.remove_class(last_line_block_tag, 'first');
        HOTMETAL.TAG.add_class(last_line_block_tag, new_class);
        if (excess > 0) {
          HOTMETAL.TAG.add_class(last_line_block_tag, 'excess');
        }
        last_line_html = HOTMETAL.as_html(last_line_hotml);
        html_lines[html_lines.length - 1] = last_line_html;
        container.empty();
        send(html_lines);
        return help(((trial_count / html_lines.length).toFixed(2)) + " trials per line");
      };
    })(this));
  };


  /*
  V2
   */

  try_slug_hotml_v2 = (function(_this) {
    return function(container, slug_hotml, line_nr) {
      var block_tag, client_rectangle, client_rectangles, client_width, container_width, excess, line_count, line_counter, slug_html, slug_jq;
      block_tag = slug_hotml[0][0][0];
      HOTMETAL.TAG.set(block_tag, 'line-nr', line_nr);
      if (line_nr != null) {
        if (line_nr === 1) {
          HOTMETAL.TAG.add_class(block_tag, 'first');
        } else {
          HOTMETAL.TAG.add_class(block_tag, 'middle');
        }
      }
      slug_html = HOTMETAL.as_html(slug_hotml);
      slug_jq = jQuery(slug_html);
      line_counter = slug_jq.children()[0];
      container.append(slug_jq);
      client_rectangles = line_counter.getClientRects();
      container_width = container.width();
      client_rectangle = client_rectangles[0];
      client_width = client_rectangle['right'] - container.offset()['left'];
      excess = Math.max(0, Math.floor(client_width - container_width));

      /* TAINT arbitrary precision limit */
      if (excess < 3) {
        excess = 0;
      }
      if (excess > 0) {
        warn(slug_html);
        warn("exceeding container by " + (excess.toFixed(1)) + "px");
      }
      line_count = client_rectangles.length;
      return [slug_html, line_count, excess];
    };
  })(this);

  $get_slugs_v2 = function(gcolumn) {
    var container;
    container = _get_slugs_container(gcolumn);
    return $((function(_this) {
      return function(block_hotml, send) {
        var estimate_line_count, excess, excesses, good_slug_html, html_lines, is_finished, last_line_block_tag, last_line_hotml, last_line_html, last_start_idx, line_count, line_nr, mode, new_class, parts_count, parts_per_line, ref, ref1, ref2, slug_hotml, slug_html, slugs_hotml, start_idx, stop_idx, stop_idx_delta, trial_count;
        html_lines = [];
        slugs_hotml = [];
        excesses = [];

        /* Typeset entire block to determine overall metrics: */
        ref = try_slug_hotml_v2(container, block_hotml, null), slug_html = ref[0], line_count = ref[1], excess = ref[2];

        /* Adjust line count, assuming last line is approx. half full: */
        estimate_line_count = line_count === 1 ? 1 : line_count - 0.5;
        parts_count = block_hotml.length;
        parts_per_line = parts_count / estimate_line_count;
        urge('parts_per_line:', parts_per_line);

        /* Try to slice block so that it is approx. one line long: */
        start_idx = 0;
        stop_idx_delta = Math.floor(parts_per_line + 0.5);
        stop_idx = start_idx + stop_idx_delta;
        line_nr = 1;

        /* !!!!!!!!! */
        stop_idx = 7;

        /* !!!!!!!!! */
        slug_hotml = HOTMETAL.slice(block_hotml, start_idx, stop_idx + 1);
        ref1 = try_slug_hotml_v2(container, slug_hotml, line_nr), slug_html = ref1[0], line_count = ref1[1], excess = ref1[2];
        debug('©qSCez', stop_idx, slug_html);
        debug('©qSCez', line_count);
        switch ((mode = line_count === 1 ? 'growing' : 'shrinking')) {
          case 'growing':
            trial_count = 0;
            last_start_idx = block_hotml.length - 1;
            slug_html = null;
            good_slug_html = null;
            is_finished = false;
            while (!is_finished) {
              stop_idx += +1;
              trial_count += +1;
              good_slug_html = slug_html;
              line_nr = html_lines.length + 1;
              slug_hotml = HOTMETAL.slice(block_hotml, start_idx, stop_idx + 1);
              ref2 = try_slug_hotml_v2(container, slug_hotml, line_nr), slug_html = ref2[0], line_count = ref2[1], excess = ref2[2];
              debug('©V9DYQ', trial_count, start_idx, stop_idx, slug_html);
              if (stop_idx >= last_start_idx) {
                excesses.push(excess);
                slugs_hotml.push(slug_hotml);
                html_lines.push(slug_html);
                is_finished = true;
                continue;
              }
              if (line_count > 1) {
                if (trial_count === 1) {
                  throw new Error("not yet implemented");
                }
                excesses.push(excess);
                slugs_hotml.push(slug_hotml);
                html_lines.push(good_slug_html);
                start_idx = stop_idx;
                stop_idx = start_idx - 1;
              }
              if (start_idx >= last_start_idx) {
                throw new Error("not yet implemented");
              }
            }
            break;
          case 'shrinking':
            throw new Error("not yet implemented");
        }
        excess = excesses[excesses.length - 1];
        new_class = slugs_hotml.length === 1 ? 'single' : 'last';
        last_line_hotml = slugs_hotml[slugs_hotml.length - 1];
        last_line_block_tag = last_line_hotml[0][0][0];
        HOTMETAL.TAG.remove_class(last_line_block_tag, 'middle');
        HOTMETAL.TAG.remove_class(last_line_block_tag, 'first');
        HOTMETAL.TAG.add_class(last_line_block_tag, new_class);
        if (excess > 0) {
          HOTMETAL.TAG.add_class(last_line_block_tag, 'excess');
        }
        last_line_html = HOTMETAL.as_html(last_line_hotml);
        html_lines[html_lines.length - 1] = last_line_html;
        container.empty();
        send(html_lines);
        return help(((trial_count / html_lines.length).toFixed(2)) + " trials per line");
      };
    })(this));
  };

  this.demo = function(app, md, settings, handler) {
    var BD, XXX_t0, XXX_times, arity, as_html, format, gcolumn, gcolumn_left, gcolumn_offset, gcolumn_top, input, mark_chrs, mark_lines, matter, mm_from_npx, mm_from_rpx, npx_from_mm, ref, rpx_from_mm, target_column, zoomer, ƒ;
    debug('©E054j', 'demo');
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
    target_column = (jQuery('galley column')).eq(1);
    zoomer = jQuery('zoomer');
    input = D.create_throughstream();
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
      return function(hotml, send) {

        /* split document into blocks */
        var block_hotml, i, len, ref1, results;
        ref1 = HOTMETAL.slice_toplevel_tags(hotml);
        results = [];
        for (i = 0, len = ref1.length; i < len; i++) {
          block_hotml = ref1[i];
          results.push(send(block_hotml));
        }
        return results;
      };
    })(this))).pipe($async((function(_this) {
      return function(data, done) {
        return later(function() {
          return done(data);
        });
      };
    })(this))).pipe($((function(_this) {
      return function(block_hotml, send) {

        /* Wrap block contents in `line-counter`; method analoguous to `jQuery.wrapInner` */
        block_hotml[0][0].push(['line-counter', {}]);
        block_hotml[block_hotml.length - 1][2].unshift(['line-counter']);
        return send(block_hotml);
      };
    })(this))).pipe($get_slugs_v2(gcolumn)).pipe($((function(_this) {
      return function(html_lines, send) {
        var html_line, i, len;
        for (i = 0, len = html_lines.length; i < len; i++) {
          html_line = html_lines[i];
          target_column.append(html_line);
        }
        return send(html_lines);
      };
    })(this))).pipe(D.$on_end(function() {
      var description, dt, i, len, ref1;
      XXX_times.push(["finished", new Date() - XXX_t0]);
      for (i = 0, len = XXX_times.length; i < len; i++) {
        ref1 = XXX_times[i], description = ref1[0], dt = ref1[1];
        debug('©1enOB', description, (dt / 1000).toFixed(3));
      }
      return handler();
    }));
    input.write(md);
    return input.end();
  };

  this.demo_v1 = function(app, md, settings, handler) {
    var BD, arity, as_html, format, gcolumn, gcolumn_left, gcolumn_offset, gcolumn_top, input, live, mark_chrs, mark_lines, matter, mm_from_npx, mm_from_rpx, npx_from_mm, ref, rpx_from_mm, t0, zoomer, ƒ;
    debug('©E054j', 'demo');
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
    window.gcolumn = gcolumn;
    input = D.create_throughstream();
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
    live = true;
    live = false;
    mark_chrs = true;
    mark_lines = false;
    t0 = +new Date();
    input.pipe(as_html).pipe((function(_this) {
      return function() {

        /* TAINT temporary fix for CJK Ext. B-related bug; see
        https://productforums.google.com/forum/#!category-topic/chrome/report-a-problem-and-get-troubleshooting-help/mac/Stable/_bLJl0pNS4Y
        Regex matches CJK Ext. B codepoints; constructed using http://apps.timwhitlock.info/js/regex.
        Also see https://github.com/mathiasbynens/regenerate.
         */
        var matcher;
        matcher = /([\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\udede]+)/g;
        return $(function(html, send) {
          return send(html.replace(matcher, '<cjkxbfix>$1</cjkxbfix>'));
        });
      };
    })(this)()).pipe(D.HTML.$split({
      disperse: true,
      hyphenation: true,
      whitespace: false,
      chrs: true
    })).pipe((function(_this) {
      return function() {

        /* character replacements */
        return $(function(tags_and_chrs, send) {
          var chr, chr_idx, element_idx, i, j, len, ref1, ref2, text_element;
          for (element_idx = i = 1, ref1 = tags_and_chrs.length; i < ref1; element_idx = i += +2) {
            text_element = tags_and_chrs[element_idx];
            for (chr_idx = j = 0, len = text_element.length; j < len; chr_idx = ++j) {
              chr = text_element[chr_idx];
              text_element[chr_idx] = (ref2 = glyph_replacements[chr]) != null ? ref2 : chr;
            }
          }
          return send(tags_and_chrs);
        });
      };
    })(this)()).pipe($((function(_this) {
      return function(tags_and_chrs, send) {
        var e, idx;
        return send(((function() {
          var i, len, results;
          results = [];
          for (idx = i = 0, len = tags_and_chrs.length; i < len; idx = ++i) {
            e = tags_and_chrs[idx];
            results.push(idx % 2 ? e.join('') : e);
          }
          return results;
        })()).join(''));
      };
    })(this))).pipe(D.$show()).pipe((function(_this) {
      return function() {
        return $(function(html, send) {

          /* Build galley HTML structure */

          /* We're receiving the HTML of a text batch that is divided into block elements;
          typically those are headers, paragraphs, code blocks and so on. We wrap all of those into a
          common `<div>` with a unique ID so jQuery can build an HTML fragment with a single root element
          and we can easily refer back to this particular batch. Furthermore, we wrap all the contents of
          top level blocks into `<span>`s with class `.line-counter` that we can then use to find the
          enclosing rectangles of each line in each block.
           */
          var batch, batch_id, batch_info, blocks;
          matter['batch-idx'] += +1;
          batch_id = "mkts-galley-batch-" + matter['batch-idx'];
          batch = jQuery(("<div id='" + batch_id + "' class='mkts-galley-batch'>") + html + "</div>");
          blocks = batch.children();
          blocks.wrapInner("<span class='line-counter'></span>");
          (blocks.find('.line-counter')).attr('id', function(idx) {
            return "mkts-lc-" + idx;
          });
          batch_info = {
            '~isa': 'MKTS/LINESETTER/batch-info',
            '%batch': batch,
            '%blocks': blocks,
            'batch-id': batch_id
          };
          return send(batch_info);
        });
      };
    })(this)()).pipe((function(_this) {
      return function() {
        return $(function(batch_info, send) {
          var batch, batch_id, block, block_idx, block_info, block_infos, blocks, client_rectangle, client_rectangles, height, height_px, i, j, left, len, line_count, line_counter, line_counters, ref1, top, width, zleft, ztop;
          batch = batch_info['%batch'];
          blocks = batch_info['%blocks'];
          batch_id = batch_info['batch-id'];
          block_infos = [];
          line_counters = blocks.find('.line-counter');
          gcolumn.append(batch);
          debug('©4QfDG', "typesetting " + blocks.length + " blocks into galley...");
          for (block_idx = i = 0, ref1 = blocks.length; 0 <= ref1 ? i < ref1 : i > ref1; block_idx = 0 <= ref1 ? ++i : --i) {
            block = blocks.eq(block_idx);
            line_counter = line_counters.eq(block_idx);
            client_rectangles = (line_counter.get(0)).getClientRects();
            line_count = client_rectangles.length;
            height_px = BD.get_rectangle(block, 'height');
            block_info = {
              '~isa': 'MKTS/LINESETTER/block-info',
              '%block': block,
              'line-count': line_count,
              'height.px': height_px
            };
            block_infos.push(block_info);
            if (mark_lines) {
              for (j = 0, len = client_rectangles.length; j < len; j++) {
                client_rectangle = client_rectangles[j];
                left = client_rectangle.left, top = client_rectangle.top, width = client_rectangle.width, height = client_rectangle.height;
                zleft = left - gcolumn_left;
                ztop = top - gcolumn_top;
                batch.append(jQuery("<div style='position:absolute;left:" + zleft + "px;top:" + ztop + "px;width:" + width + "px;height:" + height + "px;outline:1px solid rgba(255,0,0,0.25);'></div>"));
              }
            }
          }
          debug('©4QfDG', "...done");
          return send(block_infos);
        });
      };
    })(this)()).pipe((function(_this) {
      return function() {
        return $(function(block_infos, send, end) {
          var block, block_height_px, block_idx, block_info, caret, column, column_count, columns, current_line_count, height_nmm, height_rmm, i, len, page, pages, target_height_px;
          if (block_infos != null) {
            MKTS.VIEW.show_pages();
            caret = matter.caret;
            pages = jQuery('artboard.pages page');
            page = null;
            columns = null;
            column_count = null;
            column = null;
            target_height_px = null;
            current_line_count = null;

            /* Move to target */
            for (block_idx = i = 0, len = block_infos.length; i < len; block_idx = ++i) {
              block_info = block_infos[block_idx];
              if (page == null) {
                page = pages.eq(caret['page-nr'] - 1);
              }
              if (columns == null) {
                columns = page.find('column');
              }
              if (column_count == null) {
                column_count = columns.length;
              }
              if (column_count < 1) {
                warn("skipped " + (block_infos.length - block_idx) + " blocks because of missing columns");
                break;
              }
              if (column == null) {
                column = columns.eq(caret['column-nr'] - 1);
              }
              if (current_line_count == null) {
                current_line_count = 0;
              }
              if (target_height_px == null) {
                target_height_px = BD.get_rectangle(column, 'height');
              }
              height_nmm = current_line_count * 5;
              height_rmm = mm_from_rpx(caret['y.px']);
              current_line_count += block_info['line-count'];
              block = block_info['%block'];
              block_height_px = block_info['height.px'];
              column.append(block);
              caret['y.px'] += block_height_px;
              if (caret['y.px'] < target_height_px) {
                continue;
              }
              caret['column-nr'] += +1;
              caret['y.px'] = 0;
              column = null;
              current_line_count = null;
              urge('©08Nsv', MKTS.CARET.as_url(app, matter));
              if (caret['column-nr'] > column_count) {
                page = null;
                columns = null;
                column_count = null;
                target_height_px = null;
                caret['column-nr'] = 1;
                caret['page-nr'] += +1;
                caret['y.px'] = 0;
                help('©l4U89', MKTS.CARET.as_url(app, matter));
              }
            }
          }
          if (end != null) {
            end();
            return handler(null);
          }
        });
      };
    })(this)());
    input.write(md);
    return input.end();
  };

}).call(this);
