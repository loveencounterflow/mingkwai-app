(function() {
  var ARTBOARD, BOTTOMMARGIN, BOX, BUTTON, CELL, CHASE, CHASEWRAP, CHR, CND, COLUMN, CSS, GALLEY, GAP, HBOX, HGAP, HRIBBON, JS, LEFTMARGIN, MARGIN, OVERLAY, PAGE, PAPER, RIBBON, RIGHTMARGIN, ROW, RULER, STYLUS, TEACUP, TOOL, TOPMARGIN, VBOX, VGAP, VRIBBON, XHGAP, ZOOMER, _STYLUS, alert, badge, debug, help, info, log, name_, njs_fs, njs_path, rpr, urge, warn, whisper,
    slice = [].slice;

  njs_path = require('path');

  njs_fs = require('fs');

  CND = require('cnd');

  rpr = CND.rpr.bind(CND);

  badge = '眀快排字机/TEMPLATES';

  log = CND.get_logger('plain', badge);

  info = CND.get_logger('info', badge);

  whisper = CND.get_logger('whisper', badge);

  alert = CND.get_logger('alert', badge);

  debug = CND.get_logger('debug', badge);

  warn = CND.get_logger('warn', badge);

  help = CND.get_logger('help', badge);

  urge = CND.get_logger('urge', badge);

  TEACUP = require('coffeenode-teacup');

  CHR = require('coffeenode-chr');

  _STYLUS = require('stylus');

  for (name_ in TEACUP) {
    eval("var " + name_ + " = TEACUP[ " + (rpr(name_)) + " ]");
  }

  ARTBOARD = new_tag(function() {
    var p;
    p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return TAG.apply(null, ['artboard'].concat(slice.call(p)));
  });

  PAGE = new_tag(function() {
    var p;
    p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return TAG.apply(null, ['page'].concat(slice.call(p)));
  });

  PAPER = new_tag(function() {
    var p;
    p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return TAG.apply(null, ['paper'].concat(slice.call(p)));
  });

  TOOL = new_tag(function() {
    var p;
    p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return TAG.apply(null, ['tool'].concat(slice.call(p)));
  });

  OVERLAY = new_tag(function() {
    var p;
    p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return TAG.apply(null, ['overlay'].concat(slice.call(p)));
  });


  /* JCH GUI */

  BOX = new_tag(function() {
    var p;
    p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return TAG.apply(null, ['box'].concat(slice.call(p)));
  });

  HBOX = new_tag(function() {
    var p;
    p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return TAG.apply(null, ['hbox'].concat(slice.call(p)));
  });

  VBOX = new_tag(function() {
    var p;
    p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return TAG.apply(null, ['vbox'].concat(slice.call(p)));
  });

  RIBBON = new_tag(function() {
    var p;
    p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return TAG.apply(null, ['ribbon'].concat(slice.call(p)));
  });

  HRIBBON = new_tag(function() {
    var p;
    p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return TAG.apply(null, ['hribbon'].concat(slice.call(p)));
  });

  VRIBBON = new_tag(function() {
    var p;
    p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return TAG.apply(null, ['vribbon'].concat(slice.call(p)));
  });

  ZOOMER = new_tag(function() {
    var p;
    p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return TAG.apply(null, ['zoomer'].concat(slice.call(p)));
  });

  COLUMN = new_tag(function() {
    var p;
    p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return TAG.apply(null, ['column'].concat(slice.call(p)));
  });

  GAP = new_tag(function() {
    var p;
    p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return TAG.apply(null, ['gap'].concat(slice.call(p)));
  });

  ROW = new_tag(function() {
    var p;
    p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return TAG.apply(null, ['row'].concat(slice.call(p)));
  });

  CELL = new_tag(function() {
    var p;
    p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return TAG.apply(null, ['cell'].concat(slice.call(p)));
  });

  RULER = new_tag(function() {
    var p;
    p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return TAG.apply(null, ['ruler'].concat(slice.call(p)));
  });

  VGAP = new_tag(function() {
    var p;
    p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return TAG.apply(null, ['vgap'].concat(slice.call(p)));
  });

  HGAP = new_tag(function() {
    var p;
    p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return TAG.apply(null, ['hgap'].concat(slice.call(p)));
  });

  XHGAP = new_tag(function() {
    var p;
    p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return TAG.apply(null, ['xhgap'].concat(slice.call(p)));
  });

  CHASE = new_tag(function() {
    var p;
    p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return TAG.apply(null, ['chase'].concat(slice.call(p)));
  });

  CHASEWRAP = new_tag(function() {
    var p;
    p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return TAG.apply(null, ['chasewrap'].concat(slice.call(p)));
  });

  MARGIN = new_tag(function() {
    var p;
    p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return TAG.apply(null, ['margin'].concat(slice.call(p)));
  });

  LEFTMARGIN = new_tag(function() {
    var p;
    p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return TAG.apply(null, ['leftmargin'].concat(slice.call(p)));
  });

  RIGHTMARGIN = new_tag(function() {
    var p;
    p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return TAG.apply(null, ['rightmargin'].concat(slice.call(p)));
  });

  TOPMARGIN = new_tag(function() {
    var p;
    p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return TAG.apply(null, ['topmargin'].concat(slice.call(p)));
  });

  BOTTOMMARGIN = new_tag(function() {
    var p;
    p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return TAG.apply(null, ['bottommargin'].concat(slice.call(p)));
  });


  /* WORKSPACE (IMPOSITION) */

  GALLEY = new_tag(function() {
    var p;
    p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return TAG.apply(null, ['galley'].concat(slice.call(p)));
  });


  /* TAINT should be implemented using Polymer / Shadow DOM */

  BUTTON = function() {

    /* MaterializeCSS-compatible button */
    return A('.btn.waves-effect.waves-light', {
      href: '#'
    }, (function(_this) {
      return function() {
        TEXT("Demo");
        return I('.mdi-action-search.right');
      };
    })(this));
  };

  JS = new_tag(function(route) {
    return SCRIPT({
      type: 'text/javascript',
      src: route
    });
  });

  CSS = new_tag(function(route) {
    return LINK({
      rel: 'stylesheet',
      href: route
    });
  });

  STYLUS = function(source) {
    return STYLE({}, _STYLUS.render(source));
  };

  this.font_test = function(app, md, settings, handler) {
    var n, triplets;
    n = 10;
    triplets = [[0x0061, 0x007a, 'u-latn'], [0x2e80, 0x2eff, 'u-cjk-rad2'], [0x2f00, 0x2fdf, 'u-cjk-rad1'], [0x3000, 0x303f, 'u-cjk-sym'], [0x31c0, 0x31ef, 'u-cjk-strk'], [0x3200, 0x32ff, 'u-cjk-enclett'], [0x3300, 0x33ff, 'u-cjk-cmp'], [0x3400, 0x4dbf, 'u-cjk-xa'], [0x4e00, 0x9fff, 'u-cjk'], [0xe000, 0xf8ff, 'jzr'], [0xf900, 0xfaff, 'u-cjk-cmpi1'], [0xfe30, 0xfe4f, 'u-cjk-cmpf'], [0x20000, 0x2b81f, 'u-cjk-xb'], [0x2a700, 0x2b73f, 'u-cjk-xc'], [0x2b740, 0x2b81f, 'u-cjk-xd'], [0x2f800, 0x2fa1f, 'u-cjk-cmpi2']];
    return render((function(_this) {
      return function() {
        DOCTYPE(5);
        return HTML(function() {
          HEAD(function() {
            META({
              charset: 'utf-8'
            });
            TITLE('mingkwai');
            LINK({
              rel: 'shortcut icon',
              href: './favicon.icon'
            });
            CSS('./html5doctor-css-reset.css');
            JS('./jquery-2.1.3.js');
            CSS('./jquery-ui-1.11.3.custom/jquery-ui.css');
            JS('./jquery-ui-1.11.3.custom/jquery-ui.js');
            JS('./jquery.event.drag-2.2/jquery.event.drag-2.2.js');
            JS('./outerHTML-2.1.0.js');
            JS('./blaidddrwg.js');
            JS('./jquery-transit.js');
            JS('./browser.js');
            JS('./process-xcss-rules.js');
            CSS('./materialize/css/materialize.css');
            JS('./materialize/js/materialize.min.js');
            return CSS('./mkts-main.rework.css');
          });
          return BODY({
            style: "transform:scale(2);transform-origin:top left;"
          }, function() {
            var _, cid, j, len, ref, rsg;
            H1(function() {
              return "Ligatures";
            });
            P(function() {
              TEXT("Standard Ligatures* (feature liga): fluffy, shy, official; ");
              return EM("gg, nagy, gjuha, Qyteti.");
            });
            H1(function() {
              return "Unicode Ranges";
            });
            DIV(function() {
              var cid, cids, j, k, len, ref, ref1, results, results1;
              ref1 = [
                (function() {
                  results1 = [];
                  for (var k = ref = 0x2a6d6 - 9; ref <= 0x2a6d6 ? k <= 0x2a6d6 : k >= 0x2a6d6; ref <= 0x2a6d6 ? k++ : k--){ results1.push(k); }
                  return results1;
                }).apply(this), [173824, 173825, 173826, 173827, 173828, 173829, 173830, 173831, 173832, 173833, 173834]
              ];
              results = [];
              for (j = 0, len = ref1.length; j < len; j++) {
                cids = ref1[j];
                results.push((function() {
                  var l, len1, results2;
                  results2 = [];
                  for (l = 0, len1 = cids.length; l < len1; l++) {
                    cid = cids[l];
                    results2.push(TEXT(CHR.as_uchr(cid)));
                  }
                  return results2;
                })());
              }
              return results;
            });
            for (j = 0, len = triplets.length; j < len; j++) {
              ref = triplets[j], cid = ref[0], _ = ref[1], rsg = ref[2];
              P(function() {
                SPAN(function() {
                  var i, k, ref1, results;
                  results = [];
                  for (i = k = 0, ref1 = n; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
                    results.push(SPAN({
                      style: "display:inline-block;"
                    }, function() {
                      return CHR.as_uchr(cid + i);
                    }));
                  }
                  return results;
                });
                return SPAN(function() {
                  return TEXT("(" + rsg + ")");
                });
              });
            }
            H1(function() {
              return "Other Stuff";
            });
            P({
              style: "font-family:'spincycle-eot','lastresort';"
            }, function() {
              SPAN(function() {
                return "一丁";
              });
              return SPAN(function() {
                return "abcdef (spincycle-eot)";
              });
            });
            P({
              style: "font-family:'spincycle-embedded-opentype','lastresort';"
            }, function() {
              SPAN(function() {
                return "一丁";
              });
              return SPAN(function() {
                return "abcdef (spincycle-embedded-opentype)";
              });
            });
            P({
              style: "font-family:'spincycle-woff2','lastresort';"
            }, function() {
              SPAN(function() {
                return "一丁";
              });
              return SPAN(function() {
                return "abcdef (spincycle-woff2)";
              });
            });
            P({
              style: "font-family:'spincycle-woff','lastresort';"
            }, function() {
              SPAN(function() {
                return "一丁";
              });
              return SPAN(function() {
                return "abcdef (spincycle-woff)";
              });
            });
            P({
              style: "font-family:'spincycle-truetype','lastresort';"
            }, function() {
              SPAN(function() {
                return "一丁";
              });
              return SPAN(function() {
                return "abcdef (spincycle-truetype)";
              });
            });
            P({
              style: "font-family:'spincycle-svg','lastresort';"
            }, function() {
              SPAN(function() {
                return "一丁";
              });
              return SPAN(function() {
                return "abcdef (spincycle-svg)";
              });
            });
            return P({
              style: "font-family:'lastresort';"
            }, function() {
              SPAN(function() {
                return "一丁";
              });
              return SPAN(function() {
                return "abcdef (lastresort)";
              });
            });
          });
        });
      };
    })(this));
  };

  this.test_page = function() {
    return render((function(_this) {
      return function() {
        DOCTYPE(5);
        return HTML(function() {
          HEAD(function() {
            META({
              charset: 'utf-8'
            });
            JS('./jquery-2.1.3.js');
            JS('./outerHTML-2.1.0.js');
            JS('./browser.js');
            STYLE('', "html, body {\n  margin:                 0;\n  padding:                0;\n}\n.gauge {\n  position:               absolute;\n  outline:                1px solid red;\n}");
            return COFFEESCRIPT(function() {
              return ($('document')).ready(function() {
                var d_npx, d_rpx, gauge, j, results;
                log = console.log.bind(console);
                gauge = $("<div id='meter-gauge' style='position:absolute;'></div>");
                ($('body')).append(gauge);
                results = [];
                for (d_npx = j = 1; j <= 1000; d_npx = ++j) {
                  gauge.css('height', d_npx + "px");
                  d_rpx = gauge[0].getBoundingClientRect()['height'];
                  results.push(log(d_npx, d_rpx));
                }
                return results;
              });
            });
          });
          return BODY(function() {});
        });
      };
    })(this));
  };

  this.splash_window = function() {
    return render((function(_this) {
      return function() {
        DOCTYPE(5);
        return HTML(function() {
          STYLE('', "body, html {\n  width:                    100%;\n  height:                   100%;\n  overflow:                 hidden;\n}\nbody {\n  width:                    100%;\n  height:                   100%;\n  background-color:         rgba( 255, 255, 255, 0.0 );\n  background-image:         url(./mingkwai-logo-circled.png);\n  background-size:          contain;\n  background-repeat:        no-repeat;\n  background-position:      50%;\n}");
          return BODY(function() {});
        });
      };
    })(this));
  };

  this.NORMAL_layout = function() {
    return render((function(_this) {
      return function() {
        DOCTYPE(5);
        return HTML(function() {
          HEAD(function() {
            META({
              charset: 'utf-8'
            });
            TITLE('mingkwai (NORMAL_layout)');
            LINK({
              rel: 'shortcut icon',
              href: './favicon.icon'
            });
            CSS('./html5doctor-css-reset.css');
            JS('./jquery-2.1.3.js');
            CSS('./jquery-ui-1.11.3.custom/jquery-ui.css');
            JS('./jquery-ui-1.11.3.custom/jquery-ui.js');
            JS('./jquery.event.drag-2.2/jquery.event.drag-2.2.js');
            JS('./outerHTML-2.1.0.js');
            JS('../node_modules/jquery-replace-text/jquery-replace-text.js');
            JS('./blaidddrwg.js');
            JS('./jquery-transit.js');
            JS('./browser.js');
            JS('./process-xcss-rules.js');
            CSS('./materialize/css/materialize.css');
            JS('./materialize/js/materialize.min.js');
            CSS('./mkts-main.rework.css');
            return STYLE("body {\n  font-size: 4mm;\n}");
          });
          COFFEESCRIPT(function() {
            return ($(document)).ready(function() {
              var dragging, page_x, page_y, scroll_x, scroll_y, shifted;
              window.zoomer = $('zoomer');
              scroll_x = null;
              scroll_y = null;
              page_x = null;
              page_y = null;
              dragging = false;
              shifted = false;
              return ($(document)).on('keyup keydown', function(event) {
                shifted = event.shiftKey;
                return true;
              });

              /* DRAGGING / HAND TOOL SUPPORT */
            });
          });
          return BODY(function() {
            ARTBOARD('.galley', function() {
              return ZOOMER(function() {
                return GALLEY(function() {
                  OVERLAY("Galley");
                  return CHASE(function() {
                    TOPMARGIN(function() {});
                    HBOX(function() {
                      LEFTMARGIN(function() {});
                      COLUMN(function() {});
                      VGAP(function() {});
                      COLUMN(function() {});
                      VGAP(function() {});
                      COLUMN(function() {});
                      return RIGHTMARGIN(function() {});
                    });
                    return BOTTOMMARGIN(function() {});
                  });
                });
              });
            });
            ARTBOARD('.pages', function() {
              return ZOOMER(function() {
                var j, page_nr, results;
                results = [];
                for (page_nr = j = 1; j <= 5; page_nr = ++j) {
                  results.push(PAGE(function() {
                    OVERLAY(page_nr);
                    RULER('.horizontal');
                    RULER('.vertical');
                    return CHASE(function() {
                      TOPMARGIN(function() {});
                      HBOX(function() {
                        LEFTMARGIN(function() {});
                        COLUMN(function() {});
                        VGAP(function() {});
                        COLUMN(function() {});
                        VGAP(function() {});
                        COLUMN(function() {});
                        return RIGHTMARGIN(function() {});
                      });
                      return BOTTOMMARGIN(function() {});
                    });
                  }));
                }
                return results;
              });
            });
            return HRIBBON('.draggable', {
              style: 'height:20mm;'
            }, function() {
              I('.small.mkts-tool-hand', {
                action: 'tool-mode-hand'
              });
              I('.small.mdi-editor-insert-chart', {
                action: 'editor-insert-chart'
              });
              I('.small.mdi-action-3d-rotation', {
                action: 'action-3d-rotation'
              });
              I('.small.mdi-action-assignment', {
                action: 'action-assignment'
              });
              I('.small.mdi-image-blur-on', {
                action: 'image-blur-on'
              });
              I('.small.mdi-action-print', {
                action: 'action-print'
              });
              I('.small.mdi-action-cached', {
                action: 'action-cached'
              });
              I('.small.mdi-content-content-cut', {
                action: 'content-content-cut'
              });
              return I('.small.mdi-content-content-copy', {
                action: 'content-content-copy'
              });
            });
          });
        });
      };
    })(this));
  };


  /*  * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */


  /*  * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */


  /*  * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */


  /*  * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */


  /*  * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */


  /*  * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */


  /*  * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */


  /*  * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */


  /* just for testing of CSS @font-face, unicode-range */

  this.FONTTEST_layout = function() {
    return render((function(_this) {
      return function() {
        DOCTYPE(5);
        return HTML(function() {
          HEAD(function() {
            META({
              charset: 'utf-8'
            });
            TITLE('mingkwai');
            LINK({
              rel: 'shortcut icon',
              href: './favicon.icon'
            });
            CSS('./html5doctor-css-reset.css');
            JS('./jquery-2.1.3.js');
            CSS('./jquery-ui-1.11.3.custom/jquery-ui.css');
            JS('./jquery-ui-1.11.3.custom/jquery-ui.js');
            JS('./jquery.event.drag-2.2/jquery.event.drag-2.2.js');
            JS('./outerHTML-2.1.0.js');
            JS('./blaidddrwg.js');
            JS('./jquery-transit.js');
            JS('./browser.js');
            CSS('./materialize/css/materialize.css');
            JS('./materialize/js/materialize.min.js');
            CSS('./mkts-main.rework.css');
            return STYLE("@font-face {\n  font-family:    'ampersand';\n  src:            local('Schwabacher');\n  unicode-range:  U+0026;\n}\n\n@font-face {\n  font-family:    'cjk';\n  src:            local('Sun-ExtA');\n  unicode-range:  U+4e00-9fff;\n}\n\n@font-face {\n  font-family:    'cjk';\n  src:            local('sunflower-u-cjk-xb');\n  unicode-range:  U+20000-2b81f;\n}\n\n@font-face {\n  font-family:    'cjk';\n  src:            local('jizura3b');\n  unicode-range:  U+e000-f8ff;\n}\n\n@font-face {\n  font-family:    'ancientsymbols';\n  src:            local('Geneva');\n  unicode-range:  U+10190-1019B;\n}\n\nbody, html {\n  font-family:    'ampersand', 'cjk', 'ancientsymbols', 'Source Code Pro';\n}\n\n");
          });
          return BODY(function() {
            return RAW("<div>&amp;</div>\n<div>𐆓</div>\n<div>一丁丂七丄丅丆万丈三 u-cjk</div>\n<div>𠀀𠀁𠀂𠀃𠀄𠀅𠀆𠀇𠀈𠀉 u-cjk-xb</div>\n<div> jzr</div>");
          });
        });
      };
    })(this));
  };


  /*  * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */


  /*  * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */


  /*  * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */


  /*  * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */


  /*  * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */


  /*  * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */


  /*  * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */


  /*  * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */


  /* for testing of possible rendering bug related to CSS `display: flex; height: ...;` */

  this.FLEXHEIGHTTEST_layout = function() {
    return render((function(_this) {
      return function() {
        DOCTYPE(5);
        return HTML(function() {
          HEAD(function() {
            META({
              charset: 'utf-8'
            });
            TITLE('mingkwai');
            JS('./jquery-2.1.3.js');
            JS('./blaidddrwg.js');
            JS('./browser.js');
            return STYLUS("\nhtml\n  font-size:        3mm\n\nchase\ncolumn\n  outline:                1px dotted red\n  outline-offset:         -1px\n\nchase\n  position:               relative\n  left:                   4.5mm\n  top:                    8mm\n  // width:                  201mm\n  // /* ### TAINT ### */\n  height:                 278.85mm\n  display:                flex\n  flex-direction:         column\n  float:                  left\n\ncolumn\n  display:                block\n  flex-shrink:            1\n  flex-grow:              1\n");
          });
          return BODY(function() {
            return CHASE(function() {
              return COLUMN(function() {
                var idx, j, results;
                results = [];
                for (idx = j = 0; j < 90; idx = ++j) {
                  results.push(DIV("" + idx));
                }
                return results;
              });
            });
          });
        });
      };
    })(this));
  };


  /* rendering with float instead of flex */

  this.FLOAT_layout = function() {
    return render((function(_this) {
      return function() {
        DOCTYPE(5);
        return HTML(function() {
          HEAD(function() {
            META({
              charset: 'utf-8'
            });
            TITLE('mingkwai');
            JS('./jquery-2.1.3.js');
            JS('./blaidddrwg.js');
            JS('./browser.js');
            return STYLUS("\n\n/* ------------------------------------------------------------------------------------------------------ */\n/* Experimentally detected that `$paper-height = 297mm - 0.13mm` is not enough but\n  `297mm - 0.15mm` is enough to avoid intervening blank pages in the PDF. */\n$paper-width                = 210mm\n$paper-height               = 297mm - 0.15mm\n// $paper-width                = 210mm\n// $paper-height               = 297mm\n/* ...................................................................................................... */\n// 'gutters' in typographic terms (non-printable areas) become 'paddings' in CSS:\n$gutter-left                = 4.5mm\n$gutter-right               = $gutter-left\n$gutter-top                 = 8mm\n$gutter-bottom              = 10mm\n/* ...................................................................................................... */\n// 'margins' in typographic terms (areas outside the main content) become 'paddings' in CSS:\n$margin-left                = 15mm\n$margin-right               = $margin-left\n$margin-top                 = 11mm\n$margin-bottom              = 5mm\n/* ...................................................................................................... */\n$gap-vertical-width         = 5mm\n/* ...................................................................................................... */\n// the chase represents the printable area; inside, flanked by the margins, is the main content area:\n$chase-width                = $paper-width  - $gutter-left  - $gutter-right\n$chase-height               = $paper-height - $gutter-top   - $gutter-bottom\n/* ...................................................................................................... */\n$galley-width               = $paper-width\n/* ...................................................................................................... */\n$epsilon                    = 1mm\n\n\n/* ------------------------------------------------------------------------------------------------------ */\npaper\npage\n width:                   $paper-width\n height:                  $paper-height\n display:                 block\n\nhtml\n  font-size:              4mm\n\noverlay\n  display:                block\n  position:               absolute\n\nmargin\n  display:                block\n\nmargin.left\nmargin.right\n  float:                  left\n  height:                 100%\n\nmargin.left\n  min-width:              $margin-left\n  max-width:              $margin-left\n\nmargin.right\n  min-width:              $margin-right\n  max-width:              $margin-right\n\nmargin.top\nmargin.bottom\n  width:                  100%\n\nmargin.top\n  min-height:             $margin-top\n  max-height:             $margin-top\n\nmargin.bottom\n  min-height:             $margin-bottom\n  max-height:             $margin-bottom\n\nchase\ncolumn\nbox\nmargin\ngap\npage\n  outline:                1px dotted red\n  outline-offset:         -1px\n\nchase\n  position:               relative\n  left:                   $gutter-left\n  top:                    $gutter-top\n  width:                  $chase-width\n  height:                 $chase-height\n  display:                block\n\nbox\n  display:                block\n  float:                  left\n  width:                  $chase-width - $margin-left - $margin-right - $epsilon\n  height:                 10mm\n  background-color: #ddd\n\ngap\n  display:                block\n  width:                  $gap-vertical-width\n  float:                  left\n  height:                 100%\n\ncolumn\n  display:                block\n  height:                 100%\n  float:                  left\n\n.columns-3 column\n  width:                  ( ( $chase-width - 2 * $gap-vertical-width ) / 3 )");
          });
          return BODY(function() {
            return ARTBOARD('.pages', function() {
              return ZOOMER(function() {
                return PAGE(function() {
                  return CHASE(function() {
                    MARGIN('.top', function() {});
                    MARGIN('.left', function() {});
                    BOX('.horizontal.columns-3', function() {
                      return COLUMN(function() {});
                    });
                    MARGIN('.right', function() {});
                    return MARGIN('.bottom', function() {});
                  });
                });
              });
            });
          });
        });
      };
    })(this));
  };


  /* rendering with float instead of flex */

  this.TABLE_layout = function() {
    return render((function(_this) {
      return function() {
        DOCTYPE(5);
        return HTML(function() {
          var COLUMNBOX;
          HEAD(function() {
            META({
              charset: 'utf-8'
            });
            TITLE('mingkwai');
            JS('./jquery-2.1.3.js');
            JS('./blaidddrwg.js');
            JS('./browser.js');
            return STYLUS("\n\n/* ------------------------------------------------------------------------------------------------------ */\n/* Experimentally detected that `$paper-height = 297mm - 0.13mm` is not enough but\n  `297mm - 0.15mm` is enough to avoid intervening blank pages in the PDF. */\n$paper-width                = 210mm\n$paper-height               = 297mm - 0.15mm\n// $paper-width                = 210mm\n// $paper-height               = 297mm\n/* ...................................................................................................... */\n// 'gutters' in typographic terms (non-printable areas) become 'paddings' in CSS:\n$gutter-left                = 4.5mm\n$gutter-right               = $gutter-left\n$gutter-top                 = 8mm\n$gutter-bottom              = 10mm\n/* ...................................................................................................... */\n// 'margins' in typographic terms (areas outside the main content) become 'paddings' in CSS:\n$margin-left                = 15mm\n$margin-right               = $margin-left\n$margin-top                 = 11mm\n$margin-bottom              = 5mm\n/* ...................................................................................................... */\n$gap-vertical-width         = 5mm\n/* ...................................................................................................... */\n// the chase represents the printable area; inside, flanked by the margins, is the main content area:\n$chase-width                = $paper-width  - $gutter-left  - $gutter-right\n$chase-height               = $paper-height - $gutter-top   - $gutter-bottom\n/* ...................................................................................................... */\n$galley-width               = $paper-width\n\n\n/* ------------------------------------------------------------------------------------------------------ */\npaper\npage\n width:                   $paper-width\n height:                  $paper-height\n display:                 block\n\nhtml\n  font-size:              4mm\n\n.chase\ncolumn\nbox\nmargin\ngap\npage\n  outline:                1px dotted red\n  outline-offset:         -1px\n\n.chase\n  border-collapse:        collapse\n  margin:                 0\n  padding:                0\n  position:               relative\n  left:                   $gutter-left\n  top:                    $gutter-top\n  width:                  $chase-width\n  height:                 $chase-height\n\n.margin\n  margin:                 0\n  padding:                0\n\n.margin.margin-left\n  height:                 $chase-height\n  width:                  $margin-left\n\n.margin.margin-right\n  height:                 $chase-height\n  width:                  $margin-right\n\n.margin.margin-top\n.margin.margin-bottom\n  width:                  $galley-width - $margin-left - $margin-right\n\n.margin.margin-top\n  height:                 $margin-top\n\n.margin.margin-bottom\n  height:                 $margin-bottom\n\n.gap\n  margin:                 0\n  padding:                0\n  width:                  $gap-vertical-width\n  min-width:              $gap-vertical-width\n  max-width:              $gap-vertical-width\n\n.columnbox\n.column\n  border-collapse:        collapse\n  margin:                 0\n  padding:                0\n  height:                 100%\n\n.columnbox\n  width:                  100%\n\n.column.columns-3\n  width:                  ( ( $chase-width - 2 * $gap-vertical-width ) / 3 )\n  min-width:              ( ( $chase-width - 2 * $gap-vertical-width ) / 3 )\n  max-width:              ( ( $chase-width - 2 * $gap-vertical-width ) / 3 )\n\ntd\n  outline: 1px solid green");
          });
          CHASE = function() {
            var p;
            p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return TABLE('.chase', function() {
              TR(function() {
                TD('.margin.margin-left', {
                  rowspan: 3
                });
                TD('.margin.margin-top');
                return TD('.margin.margin-right', {
                  rowspan: 3
                });
              });
              TR(function() {
                return TD.apply(null, ['.main'].concat(slice.call(p)));
              });
              return TR(function() {
                return TD('.margin.margin-bottom');
              });
            });
          };
          COLUMNBOX = function(column_count) {
            return TABLE('.columnbox', function() {
              return TR(function() {
                var column_nr, j, ref, results;
                results = [];
                for (column_nr = j = 1, ref = column_count; 1 <= ref ? j <= ref : j >= ref; column_nr = 1 <= ref ? ++j : --j) {
                  if (column_nr !== 1) {
                    TD('.gap.vertical');
                  }
                  results.push(TD(".column.columns-" + column_count, function() {
                    if (column_nr === 1) {
                      return TEXT("xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx\nxxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx\nxxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx\nxxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx\nxxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx\nxxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx\nxxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx\nxxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx\nxxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx\nxxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx\nxxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx\nxxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx");
                    }
                  }));
                }
                return results;
              });
            });
          };
          return BODY(function() {
            return ARTBOARD('.pages', function() {
              return ZOOMER(function() {
                return PAGE(function() {
                  return CHASE({}, function() {
                    return COLUMNBOX(3, function() {});
                  });
                });
              });
            });
          });
        });
      };
    })(this));
  };


  /* rendering with float instead of flex */

  this.INLINEBLOCK_layout = function() {
    return render((function(_this) {
      return function() {
        DOCTYPE(5);
        return HTML(function() {
          HEAD(function() {
            META({
              charset: 'utf-8'
            });
            TITLE('mingkwai');
            JS('./jquery-2.1.3.js');
            JS('./blaidddrwg.js');
            JS('./browser.js');
            return STYLUS("\n\n/* ------------------------------------------------------------------------------------------------------ */\n/* Experimentally detected that `$paper-height = 297mm - 0.13mm` is not enough but\n  `297mm - 0.15mm` is enough to avoid intervening blank pages in the PDF. */\n$paper-width                = 210mm\n$paper-height               = 297mm - 0.15mm\n// $paper-width                = 210mm\n// $paper-height               = 297mm\n/* ...................................................................................................... */\n// 'gutters' in typographic terms (non-printable areas) become 'paddings' in CSS:\n$gutter-left                = 4.5mm\n$gutter-right               = $gutter-left\n$gutter-top                 = 8mm\n$gutter-bottom              = 10mm\n/* ...................................................................................................... */\n// 'margins' in typographic terms (areas outside the main content) become 'paddings' in CSS:\n$margin-left                = 15mm\n$margin-right               = $margin-left\n$margin-top                 = 11mm\n$margin-bottom              = 5mm\n/* ...................................................................................................... */\n$gap-vertical-width         = 5mm\n/* ...................................................................................................... */\n// the chase represents the printable area; inside, flanked by the margins, is the main content area:\n$chase-width                = $paper-width  - $gutter-left  - $gutter-right\n$chase-height               = $paper-height - $gutter-top   - $gutter-bottom\n/* ...................................................................................................... */\n$galley-width               = $paper-width\n/* ...................................................................................................... */\n$epsilon                    = 1mm\n\n\n/* ------------------------------------------------------------------------------------------------------ */\npaper\npage\n width:                   $paper-width\n height:                  $paper-height\n display:                 block\n\nhtml\n  font-size:              4mm\n\noverlay\n  display:                block\n  position:               absolute\n\nmargin\n  background-color:       #e994ae\n\nmargin.left\nmargin.right\n  display:                inline-block\n  height:                 100%\n\nmargin.left\n  min-width:              $margin-left\n  max-width:              $margin-left\n\nmargin.right\n  min-width:              $margin-right\n  max-width:              $margin-right\n\nmargin.top\nmargin.bottom\n  display:                block\n  width:                  $chase-width\n\nmargin.top\n  min-height:             $margin-top\n  max-height:             $margin-top\n\nmargin.bottom\n  min-height:             $margin-bottom\n  max-height:             $margin-bottom\n\nchase\ncolumn\nbox\nmargin\ngap\npage\n  outline:                1px dotted red\n  outline-offset:         -1px\n\nchase\n  position:               relative\n  left:                   $gutter-left\n  top:                    $gutter-top\n  width:                  $chase-width\n  height:                 $chase-height\n  display:                block\n\nrow\n  display:                inline-block\n  width:                  $chase-width\n  white-space:            nowrap\n  // !!!!!\n  height:                 10mm\n\ngap\n  display:                inline-block\n  width:                  $gap-vertical-width\n  height:                 100%\n  background-color: #ddd\n\ncolumn\n  display:                inline-block\n  white-space:            normal\n  height:                 100%\n\n.columns-3 column\n  width:                  ( ( $chase-width - 2 * $gap-vertical-width - $margin-left - $margin-right ) / 3 )");
          });
          return BODY(function() {
            return ARTBOARD('.pages', function() {
              return ZOOMER(function() {
                return PAGE(function() {
                  return CHASE(function() {
                    MARGIN('.top', function() {});
                    ROW('.horizontal.columns-3', function() {
                      MARGIN('.left', function() {});
                      COLUMN(function() {});
                      GAP('.vertical', function() {});
                      COLUMN(function() {});
                      GAP('.vertical', function() {});
                      COLUMN(function() {});
                      return MARGIN('.right', function() {});
                    });
                    return MARGIN('.bottom', function() {});
                  });
                });
              });
            });
          });
        });
      };
    })(this));
  };

  this.layout = this.FONTTEST_layout;

  this.layout = this.FLEXHEIGHTTEST_layout;

  this.layout = this.TABLE_layout;

  this.layout = this.FLOAT_layout;

  this.layout = this.INLINEBLOCK_layout;

  this.layout = this.NORMAL_layout;

}).call(this);

//# sourceMappingURL=data:application/json;base64,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QixTQUFBLEdBQUEsQ0FBakI7b0JBVjJCLENBQTdCOzJCQVdBLE1BQUEsQ0FBTyxTQUFQLEVBQWtCLFNBQUEsR0FBQSxDQUFsQjtrQkFiSSxDQUFOO2dCQUZHLENBQUw7Y0FGSyxDQUFQO1lBRGlCLENBQW5CO1VBREcsQ0FBTDtRQTNIRyxDQUFMO01BRlk7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQVA7RUFGYTs7RUFxSnRCLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBQyxDQUFBOztFQUNYLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBQyxDQUFBOztFQUNYLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBQyxDQUFBOztFQUNYLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBQyxDQUFBOztFQUNYLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBQyxDQUFBOztFQUNYLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBQyxDQUFBO0FBdmlDWCIsImZpbGUiOiJURU1QTEFURVMuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJcblxuXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbm5qc19wYXRoICAgICAgICAgICAgICAgICAgPSByZXF1aXJlICdwYXRoJ1xubmpzX2ZzICAgICAgICAgICAgICAgICAgICA9IHJlcXVpcmUgJ2ZzJ1xuIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG5DTkQgICAgICAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSAnY25kJ1xucnByICAgICAgICAgICAgICAgICAgICAgICA9IENORC5ycHIuYmluZCBDTkRcbmJhZGdlICAgICAgICAgICAgICAgICAgICAgPSAn55yA5b+r5o6S5a2X5py6L1RFTVBMQVRFUydcbmxvZyAgICAgICAgICAgICAgICAgICAgICAgPSBDTkQuZ2V0X2xvZ2dlciAncGxhaW4nLCAgICAgYmFkZ2VcbmluZm8gICAgICAgICAgICAgICAgICAgICAgPSBDTkQuZ2V0X2xvZ2dlciAnaW5mbycsICAgICAgYmFkZ2VcbndoaXNwZXIgICAgICAgICAgICAgICAgICAgPSBDTkQuZ2V0X2xvZ2dlciAnd2hpc3BlcicsICAgYmFkZ2VcbmFsZXJ0ICAgICAgICAgICAgICAgICAgICAgPSBDTkQuZ2V0X2xvZ2dlciAnYWxlcnQnLCAgICAgYmFkZ2VcbmRlYnVnICAgICAgICAgICAgICAgICAgICAgPSBDTkQuZ2V0X2xvZ2dlciAnZGVidWcnLCAgICAgYmFkZ2Vcbndhcm4gICAgICAgICAgICAgICAgICAgICAgPSBDTkQuZ2V0X2xvZ2dlciAnd2FybicsICAgICAgYmFkZ2VcbmhlbHAgICAgICAgICAgICAgICAgICAgICAgPSBDTkQuZ2V0X2xvZ2dlciAnaGVscCcsICAgICAgYmFkZ2VcbnVyZ2UgICAgICAgICAgICAgICAgICAgICAgPSBDTkQuZ2V0X2xvZ2dlciAndXJnZScsICAgICAgYmFkZ2VcbiMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuIyBNS1RTICAgICAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSAnLi9tYWluJ1xuVEVBQ1VQICAgICAgICAgICAgICAgICAgICA9IHJlcXVpcmUgJ2NvZmZlZW5vZGUtdGVhY3VwJ1xuQ0hSICAgICAgICAgICAgICAgICAgICAgICA9IHJlcXVpcmUgJ2NvZmZlZW5vZGUtY2hyJ1xuIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG5fU1RZTFVTICAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSAnc3R5bHVzJ1xuIyBhc19jc3MgICAgICAgICAgICAgICAgICAgID0gU1RZTFVTLnJlbmRlci5iaW5kIFNUWUxVU1xuIyBzdHlsZV9yb3V0ZSAgICAgICAgICAgICAgID0gbmpzX3BhdGguam9pbiBfX2Rpcm5hbWUsICcuLi9zcmMvbWluZ2t3YWktdHlwZXNldHRlci5zdHlsJ1xuIyBjc3MgICAgICAgICAgICAgICAgICAgICAgID0gYXNfY3NzIG5qc19mcy5yZWFkRmlsZVN5bmMgc3R5bGVfcm91dGUsIGVuY29kaW5nOiAndXRmLTgnXG4jLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cblxuIz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4jIFRFQUNVUCBOQU1FU1BBQ0UgQUNRVUlTSVRJT05cbiMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZm9yIG5hbWVfIG9mIFRFQUNVUFxuICBldmFsIFwidmFyICN7bmFtZV99ID0gVEVBQ1VQWyAje3JwciBuYW1lX30gXVwiXG5cbiMgIy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIG1ha2VfdGFnID0gKCBuYW1lICkgLT5cbiMgICBtZXRob2RfbmFtZSA9IG5hbWUudG9VcHBlckNhc2UoKVxuIyAgIHRhZ19uYW1lICAgID0gbmFtZS50b0xvd2VyQ2FzZSgpXG4jICAgIyBldmFsIFwidmFyICN7bWV0aG9kX25hbWV9ID0gbmV3X3RhZyggZnVuY3Rpb24oKSB7IHJldHVybiBUQUcuYXBwbHkgJyN7bWV0aG9kX25hbWV9JywgcC4uLil9XCJcbiMgICBldmFsIFwiXCJcIlxuIyAgICAgdmFyICN7bWV0aG9kX25hbWV9ID0gbmV3X3RhZyhmdW5jdGlvbigpIHtcbiMgICAgICAgdmFyIHA7XG4jICAgICAgIHAgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiMgICAgICAgcmV0dXJuIFRBRy5hcHBseShudWxsLCBbJyN7bWV0aG9kX25hbWV9J10uY29uY2F0KHNsaWNlLmNhbGwocCkpKTtcbiMgICAgIH0pO1wiXCJcIlxuXG4jLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbkFSVEJPQVJEICAgICAgICAgICAgPSBuZXdfdGFnICggcC4uLiApIC0+IFRBRyAnYXJ0Ym9hcmQnLCAgICAgICAgIHAuLi5cblBBR0UgICAgICAgICAgICAgICAgPSBuZXdfdGFnICggcC4uLiApIC0+IFRBRyAncGFnZScsICAgICAgICAgICAgIHAuLi5cblBBUEVSICAgICAgICAgICAgICAgPSBuZXdfdGFnICggcC4uLiApIC0+IFRBRyAncGFwZXInLCAgICAgICAgICAgIHAuLi5cblRPT0wgICAgICAgICAgICAgICAgPSBuZXdfdGFnICggcC4uLiApIC0+IFRBRyAndG9vbCcsICAgICAgICAgICAgIHAuLi5cbk9WRVJMQVkgICAgICAgICAgICAgPSBuZXdfdGFnICggcC4uLiApIC0+IFRBRyAnb3ZlcmxheScsICAgICAgICAgIHAuLi5cbiMgV1JBUCAgICAgICAgICAgICAgICA9IG5ld190YWcgKCBwLi4uICkgLT4gVEFHICd3cmFwJywgICAgICAgICAgICAgcC4uLlxuIyBCT1hFUiAgICAgICAgICAgICAgID0gbmV3X3RhZyAoIHAuLi4gKSAtPiBUQUcgJ2JveGVyJywgICAgICAgICAgICBwLi4uXG4jIFBBTkVMICAgICAgICAgICAgICAgPSBuZXdfdGFnICggcC4uLiApIC0+IFRBRyAncGFuZWwnLCAgICAgICAgICAgIHAuLi5cbiMgR1JJUCAgICAgICAgICAgICAgICA9IG5ld190YWcgKCBwLi4uICkgLT4gVEFHICdncmlwJywgICAgICAgICAgICAgcC4uLlxuIyBPVVRFUiAgICAgICAgICAgICAgID0gbmV3X3RhZyAoIHAuLi4gKSAtPiBUQUcgJ291dGVyJywgICAgICAgICAgICBwLi4uXG4jIExJTkUgICAgICAgICAgICAgICAgPSBuZXdfdGFnICggcC4uLiApIC0+IFRBRyAnbGluZScsICAgICAgICAgICAgIHAuLi5cbiMgQ09SSyAgICAgICAgICAgICAgICA9IG5ld190YWcgKCBwLi4uICkgLT4gVEFHICdjb3JrJywgICAgICAgICAgICAgcC4uLlxuIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG4jIyMgSkNIIEdVSSAjIyNcbkJPWCAgICAgICAgICAgICAgICAgPSBuZXdfdGFnICggcC4uLiApIC0+IFRBRyAnYm94JywgICAgICAgICAgICAgIHAuLi5cbkhCT1ggICAgICAgICAgICAgICAgPSBuZXdfdGFnICggcC4uLiApIC0+IFRBRyAnaGJveCcsICAgICAgICAgICAgIHAuLi5cblZCT1ggICAgICAgICAgICAgICAgPSBuZXdfdGFnICggcC4uLiApIC0+IFRBRyAndmJveCcsICAgICAgICAgICAgIHAuLi5cblJJQkJPTiAgICAgICAgICAgICAgPSBuZXdfdGFnICggcC4uLiApIC0+IFRBRyAncmliYm9uJywgICAgICAgICAgIHAuLi5cbkhSSUJCT04gICAgICAgICAgICAgPSBuZXdfdGFnICggcC4uLiApIC0+IFRBRyAnaHJpYmJvbicsICAgICAgICAgIHAuLi5cblZSSUJCT04gICAgICAgICAgICAgPSBuZXdfdGFnICggcC4uLiApIC0+IFRBRyAndnJpYmJvbicsICAgICAgICAgIHAuLi5cblpPT01FUiAgICAgICAgICAgICAgPSBuZXdfdGFnICggcC4uLiApIC0+IFRBRyAnem9vbWVyJywgICAgICAgICAgIHAuLi5cbkNPTFVNTiAgICAgICAgICAgICAgPSBuZXdfdGFnICggcC4uLiApIC0+IFRBRyAnY29sdW1uJywgICAgICAgICAgIHAuLi5cbkdBUCAgICAgICAgICAgICAgICAgPSBuZXdfdGFnICggcC4uLiApIC0+IFRBRyAnZ2FwJywgICAgICAgICAgICAgIHAuLi5cblJPVyAgICAgICAgICAgICAgICAgPSBuZXdfdGFnICggcC4uLiApIC0+IFRBRyAncm93JywgICAgICAgICAgICAgIHAuLi5cbkNFTEwgICAgICAgICAgICAgICAgPSBuZXdfdGFnICggcC4uLiApIC0+IFRBRyAnY2VsbCcsICAgICAgICAgICAgIHAuLi5cblJVTEVSICAgICAgICAgICAgICAgPSBuZXdfdGFnICggcC4uLiApIC0+IFRBRyAncnVsZXInLCAgICAgICAgICAgIHAuLi5cblZHQVAgICAgICAgICAgICAgICAgPSBuZXdfdGFnICggcC4uLiApIC0+IFRBRyAndmdhcCcsICAgICAgICAgICAgIHAuLi5cbkhHQVAgICAgICAgICAgICAgICAgPSBuZXdfdGFnICggcC4uLiApIC0+IFRBRyAnaGdhcCcsICAgICAgICAgICAgIHAuLi5cblhIR0FQICAgICAgICAgICAgICAgPSBuZXdfdGFnICggcC4uLiApIC0+IFRBRyAneGhnYXAnLCAgICAgICAgICAgIHAuLi5cbkNIQVNFICAgICAgICAgICAgICAgPSBuZXdfdGFnICggcC4uLiApIC0+IFRBRyAnY2hhc2UnLCAgICAgICAgICAgIHAuLi5cbkNIQVNFV1JBUCAgICAgICAgICAgPSBuZXdfdGFnICggcC4uLiApIC0+IFRBRyAnY2hhc2V3cmFwJywgICAgICAgIHAuLi5cbk1BUkdJTiAgICAgICAgICAgICAgPSBuZXdfdGFnICggcC4uLiApIC0+IFRBRyAnbWFyZ2luJywgICAgICAgICAgIHAuLi5cbkxFRlRNQVJHSU4gICAgICAgICAgPSBuZXdfdGFnICggcC4uLiApIC0+IFRBRyAnbGVmdG1hcmdpbicsICAgICAgIHAuLi5cblJJR0hUTUFSR0lOICAgICAgICAgPSBuZXdfdGFnICggcC4uLiApIC0+IFRBRyAncmlnaHRtYXJnaW4nLCAgICAgIHAuLi5cblRPUE1BUkdJTiAgICAgICAgICAgPSBuZXdfdGFnICggcC4uLiApIC0+IFRBRyAndG9wbWFyZ2luJywgICAgICAgIHAuLi5cbkJPVFRPTU1BUkdJTiAgICAgICAgPSBuZXdfdGFnICggcC4uLiApIC0+IFRBRyAnYm90dG9tbWFyZ2luJywgICAgIHAuLi5cblxuIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG4jIyMgV09SS1NQQUNFIChJTVBPU0lUSU9OKSAjIyNcbkdBTExFWSAgICAgID0gbmV3X3RhZyAoIHAuLi4gKSAtPiBUQUcgJ2dhbGxleScsICAgcC4uLlxuXG4jLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cbiMjIyBUQUlOVCBzaG91bGQgYmUgaW1wbGVtZW50ZWQgdXNpbmcgUG9seW1lciAvIFNoYWRvdyBET00gIyMjXG5CVVRUT04gPSAtPlxuICAjIyMgTWF0ZXJpYWxpemVDU1MtY29tcGF0aWJsZSBidXR0b24gIyMjXG4gIEEgJy5idG4ud2F2ZXMtZWZmZWN0LndhdmVzLWxpZ2h0JywgaHJlZjogJyMnLCA9PlxuICAgIFRFWFQgXCJEZW1vXCJcbiAgICBJICcubWRpLWFjdGlvbi1zZWFyY2gucmlnaHQnXG4jLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cbkpTICAgICAgICAgID0gbmV3X3RhZyAoIHJvdXRlICkgLT4gU0NSSVBUIHR5cGU6ICd0ZXh0L2phdmFzY3JpcHQnLCAgc3JjOiByb3V0ZVxuQ1NTICAgICAgICAgPSBuZXdfdGFnICggcm91dGUgKSAtPiBMSU5LICAgcmVsOiAgJ3N0eWxlc2hlZXQnLCAgICAgIGhyZWY6IHJvdXRlXG5TVFlMVVMgICAgICA9ICggc291cmNlICkgLT4gU1RZTEUge30sIF9TVFlMVVMucmVuZGVyIHNvdXJjZVxuXG4jPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiNcbiMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuQGZvbnRfdGVzdCA9ICggYXBwLCBtZCwgc2V0dGluZ3MsIGhhbmRsZXIgKSAtPlxuICBuICAgICAgICAgICA9IDEwXG4gIHRyaXBsZXRzICAgID0gW1xuICAgIFsgIDB4MDA2MSwgIDB4MDA3YSwgICAgJ3UtbGF0bicsICAgICAgICBdXG4gICAgWyAgMHgyZTgwLCAgMHgyZWZmLCAgICAndS1jamstcmFkMicsICAgIF1cbiAgICBbICAweDJmMDAsICAweDJmZGYsICAgICd1LWNqay1yYWQxJywgICAgXVxuICAgIFsgIDB4MzAwMCwgIDB4MzAzZiwgICAgJ3UtY2prLXN5bScsICAgICBdXG4gICAgWyAgMHgzMWMwLCAgMHgzMWVmLCAgICAndS1jamstc3RyaycsICAgIF1cbiAgICBbICAweDMyMDAsICAweDMyZmYsICAgICd1LWNqay1lbmNsZXR0JywgXVxuICAgIFsgIDB4MzMwMCwgIDB4MzNmZiwgICAgJ3UtY2prLWNtcCcsICAgICBdXG4gICAgWyAgMHgzNDAwLCAgMHg0ZGJmLCAgICAndS1jamsteGEnLCAgICAgIF1cbiAgICBbICAweDRlMDAsICAweDlmZmYsICAgICd1LWNqaycsICAgICAgICAgXVxuICAgIFsgIDB4ZTAwMCwgIDB4ZjhmZiwgICAgJ2p6cicsICAgICAgICAgICBdXG4gICAgWyAgMHhmOTAwLCAgMHhmYWZmLCAgICAndS1jamstY21waTEnLCAgIF1cbiAgICBbICAweGZlMzAsICAweGZlNGYsICAgICd1LWNqay1jbXBmJywgICAgXVxuICAgIFsgMHgyMDAwMCwgMHgyYjgxZiwgICAgJ3UtY2prLXhiJywgICAgICBdXG4gICAgWyAweDJhNzAwLCAweDJiNzNmLCAgICAndS1jamsteGMnLCAgICAgIF1cbiAgICBbIDB4MmI3NDAsIDB4MmI4MWYsICAgICd1LWNqay14ZCcsICAgICAgXVxuICAgIFsgMHgyZjgwMCwgMHgyZmExZiwgICAgJ3UtY2prLWNtcGkyJywgICBdXG4gICAgXVxuICAjLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG4gIHJldHVybiByZW5kZXIgPT5cbiAgICBET0NUWVBFIDVcbiAgICBIVE1MID0+XG4gICAgICBIRUFEID0+XG4gICAgICAgIE1FVEEgY2hhcnNldDogJ3V0Zi04J1xuICAgICAgICAjIE1FVEEgbmFtZTogJ3ZpZXdwb3J0JywgY29udGVudDogJ3dpZHRoPWRldmljZS13aWR0aDsgaW5pdGlhbC1zY2FsZT0xLjA7IG1heGltdW0tc2NhbGU9MS4wOyB1c2VyLXNjYWxhYmxlPTA7J1xuICAgICAgICBUSVRMRSAnbWluZ2t3YWknXG4gICAgICAgICMgVElUTEUgJ+ecgOW/q+aOkuWtl+acuidcbiAgICAgICAgTElOSyByZWw6ICdzaG9ydGN1dCBpY29uJywgaHJlZjogJy4vZmF2aWNvbi5pY29uJ1xuICAgICAgICBDU1MgJy4vaHRtbDVkb2N0b3ItY3NzLXJlc2V0LmNzcydcbiAgICAgICAgIyBDU1MgJy4vZm9udHMvd2ViZm9udGtpdC0yMDE1MDMxMS0wNzMxMzIvc3R5bGVzaGVldC5jc3MnXG4gICAgICAgIEpTICAnLi9qcXVlcnktMi4xLjMuanMnXG4gICAgICAgIENTUyAnLi9qcXVlcnktdWktMS4xMS4zLmN1c3RvbS9qcXVlcnktdWkuY3NzJ1xuICAgICAgICBKUyAgJy4vanF1ZXJ5LXVpLTEuMTEuMy5jdXN0b20vanF1ZXJ5LXVpLmpzJ1xuICAgICAgICBKUyAgJy4vanF1ZXJ5LmV2ZW50LmRyYWctMi4yL2pxdWVyeS5ldmVudC5kcmFnLTIuMi5qcydcbiAgICAgICAgSlMgICcuL291dGVySFRNTC0yLjEuMC5qcydcbiAgICAgICAgSlMgICcuL2JsYWlkZGRyd2cuanMnXG4gICAgICAgICMgSlMgICcuL2NvbnZlcnRQb2ludEZyb21QYWdlVG9Ob2RlLmpzJ1xuICAgICAgICBKUyAgJy4vanF1ZXJ5LXRyYW5zaXQuanMnXG4gICAgICAgIEpTICAnLi9icm93c2VyLmpzJ1xuICAgICAgICBKUyAgJy4vcHJvY2Vzcy14Y3NzLXJ1bGVzLmpzJ1xuICAgICAgICBDU1MgJy4vbWF0ZXJpYWxpemUvY3NzL21hdGVyaWFsaXplLmNzcydcbiAgICAgICAgSlMgICcuL21hdGVyaWFsaXplL2pzL21hdGVyaWFsaXplLm1pbi5qcydcbiAgICAgICAgQ1NTICcuL21rdHMtbWFpbi5yZXdvcmsuY3NzJ1xuICAgICAgIz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICBCT0RZIHN0eWxlOiBcInRyYW5zZm9ybTpzY2FsZSgyKTt0cmFuc2Zvcm0tb3JpZ2luOnRvcCBsZWZ0O1wiLCA9PlxuICAgICAgICBIMSA9PiBcIlwiXCJMaWdhdHVyZXNcIlwiXCJcbiAgICAgICAgUCA9PlxuICAgICAgICAgIFRFWFQgXCJcIlwiU3RhbmRhcmQgTGlnYXR1cmVzKiAoZmVhdHVyZSBsaWdhKTogZmx1ZmZ5LCBzaHksIG9mZmljaWFsOyBcIlwiXCJcbiAgICAgICAgICBFTSBcIlwiXCJnZywgbmFneSwgZ2p1aGEsIFF5dGV0aS5cIlwiXCJcbiAgICAgICAgIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICAgICAgICBIMSA9PiBcIlwiXCJVbmljb2RlIFJhbmdlc1wiXCJcIlxuICAgICAgICBESVYgPT5cbiAgICAgICAgICBmb3IgY2lkcyBpbiBbIFsgMHgyYTZkNiAtIDkgLi4gMHgyYTZkNiBdLCBbIDB4MmE3MDAgLi4gMHgyYTcwYSBdLCBdXG4gICAgICAgICAgICBmb3IgY2lkIGluIGNpZHNcbiAgICAgICAgICAgICAgVEVYVCBDSFIuYXNfdWNociBjaWRcbiAgICAgICAgZm9yIFsgY2lkLCBfLCByc2csIF0gaW4gdHJpcGxldHNcbiAgICAgICAgICBQID0+XG4gICAgICAgICAgICAjIFNQQU4gc3R5bGU6IFwiZm9udC1mYW1pbHk6J2NqaycsJ2xhc3RyZXNvcnQnO1wiLCA9PlxuICAgICAgICAgICAgU1BBTiA9PlxuICAgICAgICAgICAgICBmb3IgaSBpbiBbIDAgLi4uIG4gXVxuICAgICAgICAgICAgICAgIFNQQU4gc3R5bGU6IFwiZGlzcGxheTppbmxpbmUtYmxvY2s7XCIsID0+IENIUi5hc191Y2hyIGNpZCArIGlcbiAgICAgICAgICAgIFNQQU4gPT5cbiAgICAgICAgICAgICAgVEVYVCBcIigje3JzZ30pXCJcbiAgICAgICAgIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICAgICAgICBIMSA9PiBcIlwiXCJPdGhlciBTdHVmZlwiXCJcIlxuICAgICAgICBQIHN0eWxlOiBcImZvbnQtZmFtaWx5OidzcGluY3ljbGUtZW90JywnbGFzdHJlc29ydCc7XCIsID0+XG4gICAgICAgICAgU1BBTiA9PiBcIuS4gOS4gVwiXG4gICAgICAgICAgU1BBTiA9PiBcImFiY2RlZiAoc3BpbmN5Y2xlLWVvdClcIlxuICAgICAgICBQIHN0eWxlOiBcImZvbnQtZmFtaWx5OidzcGluY3ljbGUtZW1iZWRkZWQtb3BlbnR5cGUnLCdsYXN0cmVzb3J0JztcIiwgPT5cbiAgICAgICAgICBTUEFOID0+IFwi5LiA5LiBXCJcbiAgICAgICAgICBTUEFOID0+IFwiYWJjZGVmIChzcGluY3ljbGUtZW1iZWRkZWQtb3BlbnR5cGUpXCJcbiAgICAgICAgUCBzdHlsZTogXCJmb250LWZhbWlseTonc3BpbmN5Y2xlLXdvZmYyJywnbGFzdHJlc29ydCc7XCIsID0+XG4gICAgICAgICAgU1BBTiA9PiBcIuS4gOS4gVwiXG4gICAgICAgICAgU1BBTiA9PiBcImFiY2RlZiAoc3BpbmN5Y2xlLXdvZmYyKVwiXG4gICAgICAgIFAgc3R5bGU6IFwiZm9udC1mYW1pbHk6J3NwaW5jeWNsZS13b2ZmJywnbGFzdHJlc29ydCc7XCIsID0+XG4gICAgICAgICAgU1BBTiA9PiBcIuS4gOS4gVwiXG4gICAgICAgICAgU1BBTiA9PiBcImFiY2RlZiAoc3BpbmN5Y2xlLXdvZmYpXCJcbiAgICAgICAgUCBzdHlsZTogXCJmb250LWZhbWlseTonc3BpbmN5Y2xlLXRydWV0eXBlJywnbGFzdHJlc29ydCc7XCIsID0+XG4gICAgICAgICAgU1BBTiA9PiBcIuS4gOS4gVwiXG4gICAgICAgICAgU1BBTiA9PiBcImFiY2RlZiAoc3BpbmN5Y2xlLXRydWV0eXBlKVwiXG4gICAgICAgIFAgc3R5bGU6IFwiZm9udC1mYW1pbHk6J3NwaW5jeWNsZS1zdmcnLCdsYXN0cmVzb3J0JztcIiwgPT5cbiAgICAgICAgICBTUEFOID0+IFwi5LiA5LiBXCJcbiAgICAgICAgICBTUEFOID0+IFwiYWJjZGVmIChzcGluY3ljbGUtc3ZnKVwiXG4gICAgICAgIFAgc3R5bGU6IFwiZm9udC1mYW1pbHk6J2xhc3RyZXNvcnQnO1wiLCA9PlxuICAgICAgICAgIFNQQU4gPT4gXCLkuIDkuIFcIlxuICAgICAgICAgIFNQQU4gPT4gXCJhYmNkZWYgKGxhc3RyZXNvcnQpXCJcblxuXG5cblxuIz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4jXG4jLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbkB0ZXN0X3BhZ2UgPSAtPlxuICAjLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG4gIHJldHVybiByZW5kZXIgPT5cbiAgICBET0NUWVBFIDVcbiAgICBIVE1MID0+XG4gICAgICBIRUFEID0+XG4gICAgICAgIE1FVEEgY2hhcnNldDogJ3V0Zi04J1xuICAgICAgICBKUyAgJy4vanF1ZXJ5LTIuMS4zLmpzJ1xuICAgICAgICBKUyAgJy4vb3V0ZXJIVE1MLTIuMS4wLmpzJ1xuICAgICAgICAjIEpTICAnLi9ibGFpZGRkcndnLmpzJ1xuICAgICAgICBKUyAgJy4vYnJvd3Nlci5qcydcbiAgICAgICAgU1RZTEUgJycsIFwiXCJcIlxuICAgICAgICAgICAgaHRtbCwgYm9keSB7XG4gICAgICAgICAgICAgIG1hcmdpbjogICAgICAgICAgICAgICAgIDA7XG4gICAgICAgICAgICAgIHBhZGRpbmc6ICAgICAgICAgICAgICAgIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuZ2F1Z2Uge1xuICAgICAgICAgICAgICBwb3NpdGlvbjogICAgICAgICAgICAgICBhYnNvbHV0ZTtcbiAgICAgICAgICAgICAgb3V0bGluZTogICAgICAgICAgICAgICAgMXB4IHNvbGlkIHJlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBcIlwiXCJcbiAgICAgICAgIz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICBDT0ZGRUVTQ1JJUFQgLT5cbiAgICAgICAgICAoICQgJ2RvY3VtZW50JyApLnJlYWR5IC0+XG4gICAgICAgICAgICBsb2cgICAgICAgICAgICAgICAgICAgPSBjb25zb2xlLmxvZy5iaW5kIGNvbnNvbGVcbiAgICAgICAgICAgICMgIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG4gICAgICAgICAgICAjIGdhdWdlcyAgICAgICAgICAgICAgICA9ICQgJy5nYXVnZSdcbiAgICAgICAgICAgICMgZm9yIGdhdWdlX2lkeCBpbiBbIDAgLi4uIGdhdWdlcy5sZW5ndGggXVxuICAgICAgICAgICAgIyAgIGdhdWdlICAgICAgICAgICAgICAgPSBnYXVnZXMuZXEgZ2F1Z2VfaWR4XG4gICAgICAgICAgICAjICAgaGVpZ2h0X25weCAgICAgICAgICA9IHBhcnNlSW50ICggZ2F1Z2UuY3NzICdoZWlnaHQnICksIDEwXG4gICAgICAgICAgICAjICAgaGVpZ2h0X3JweF9hICAgICAgICA9IGdhdWdlLmhlaWdodCgpXG4gICAgICAgICAgICAjICAgaGVpZ2h0X3JweF9iICAgICAgICA9IGdhdWdlWyAwIF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClbICdoZWlnaHQnIF1cbiAgICAgICAgICAgICMgICBsb2cgZ2F1Z2VfaWR4ICsgMSwgaGVpZ2h0X25weCwgaGVpZ2h0X3JweF9hLCBoZWlnaHRfcnB4X2JcbiAgICAgICAgICAgICMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICAgICAgICAgICAgZ2F1Z2UgICAgICAgICA9ICQgXCI8ZGl2IGlkPSdtZXRlci1nYXVnZScgc3R5bGU9J3Bvc2l0aW9uOmFic29sdXRlOyc+PC9kaXY+XCJcbiAgICAgICAgICAgICggJCAnYm9keScgKS5hcHBlbmQgZ2F1Z2VcbiAgICAgICAgICAgIGZvciBkX25weCBpbiBbIDEgLi4gMTAwMCBdXG4gICAgICAgICAgICAgIGdhdWdlLmNzcyAnaGVpZ2h0JywgXCIje2RfbnB4fXB4XCJcbiAgICAgICAgICAgICAgZF9ycHggPSBnYXVnZVsgMCBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpWyAnaGVpZ2h0JyBdXG4gICAgICAgICAgICAgIGxvZyBkX25weCwgZF9ycHhcblxuICAgICAgIz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICBCT0RZID0+XG5cbiMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuQHNwbGFzaF93aW5kb3cgPSAtPlxuICAjLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG4gIHJldHVybiByZW5kZXIgPT5cbiAgICBET0NUWVBFIDVcbiAgICBIVE1MID0+XG4gICAgICBTVFlMRSAnJywgXCJcIlwiXG4gICAgICAgIGJvZHksIGh0bWwge1xuICAgICAgICAgIHdpZHRoOiAgICAgICAgICAgICAgICAgICAgMTAwJTtcbiAgICAgICAgICBoZWlnaHQ6ICAgICAgICAgICAgICAgICAgIDEwMCU7XG4gICAgICAgICAgb3ZlcmZsb3c6ICAgICAgICAgICAgICAgICBoaWRkZW47XG4gICAgICAgIH1cbiAgICAgICAgYm9keSB7XG4gICAgICAgICAgd2lkdGg6ICAgICAgICAgICAgICAgICAgICAxMDAlO1xuICAgICAgICAgIGhlaWdodDogICAgICAgICAgICAgICAgICAgMTAwJTtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAgICAgICAgIHJnYmEoIDI1NSwgMjU1LCAyNTUsIDAuMCApO1xuICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6ICAgICAgICAgdXJsKC4vbWluZ2t3YWktbG9nby1jaXJjbGVkLnBuZyk7XG4gICAgICAgICAgYmFja2dyb3VuZC1zaXplOiAgICAgICAgICBjb250YWluO1xuICAgICAgICAgIGJhY2tncm91bmQtcmVwZWF0OiAgICAgICAgbm8tcmVwZWF0O1xuICAgICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246ICAgICAgNTAlO1xuICAgICAgICB9XG4gICAgICAgIFwiXCJcIlxuICAgICAgICAgICMgcG9zaXRpb246ICAgICAgICAgICAgICAgICBmaXhlZDtcbiAgICAgICAgICAjIHRvcDogICAgICAgICAgICAgICAgICAgICAgMTBtbTtcbiAgICAgICAgICAjIGxlZnQ6ICAgICAgICAgICAgICAgICAgICAgMTBtbTtcbiAgICAgIEJPRFkgPT5cblxuIy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5ATk9STUFMX2xheW91dCA9IC0+XG4gICMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cbiAgcmV0dXJuIHJlbmRlciA9PlxuICAgIERPQ1RZUEUgNVxuICAgIEhUTUwgPT5cbiAgICAgIEhFQUQgPT5cbiAgICAgICAgTUVUQSBjaGFyc2V0OiAndXRmLTgnXG4gICAgICAgICMgTUVUQSBuYW1lOiAndmlld3BvcnQnLCBjb250ZW50OiAnd2lkdGg9ZGV2aWNlLXdpZHRoOyBpbml0aWFsLXNjYWxlPTEuMDsgbWF4aW11bS1zY2FsZT0xLjA7IHVzZXItc2NhbGFibGU9MDsnXG4gICAgICAgIFRJVExFICdtaW5na3dhaSAoTk9STUFMX2xheW91dCknXG4gICAgICAgICMgVElUTEUgJ+ecgOW/q+aOkuWtl+acuidcbiAgICAgICAgTElOSyByZWw6ICdzaG9ydGN1dCBpY29uJywgaHJlZjogJy4vZmF2aWNvbi5pY29uJ1xuICAgICAgICBDU1MgJy4vaHRtbDVkb2N0b3ItY3NzLXJlc2V0LmNzcydcbiAgICAgICAgIyAjIENTUyAnLi9mb250cy93ZWJmb250a2l0LTIwMTUwMzExLTA3MzEzMi9zdHlsZXNoZWV0LmNzcydcbiAgICAgICAgSlMgICcuL2pxdWVyeS0yLjEuMy5qcydcbiAgICAgICAgQ1NTICcuL2pxdWVyeS11aS0xLjExLjMuY3VzdG9tL2pxdWVyeS11aS5jc3MnXG4gICAgICAgIEpTICAnLi9qcXVlcnktdWktMS4xMS4zLmN1c3RvbS9qcXVlcnktdWkuanMnXG4gICAgICAgIEpTICAnLi9qcXVlcnkuZXZlbnQuZHJhZy0yLjIvanF1ZXJ5LmV2ZW50LmRyYWctMi4yLmpzJ1xuICAgICAgICBKUyAgJy4vb3V0ZXJIVE1MLTIuMS4wLmpzJ1xuICAgICAgICBKUyAgJy4uL25vZGVfbW9kdWxlcy9qcXVlcnktcmVwbGFjZS10ZXh0L2pxdWVyeS1yZXBsYWNlLXRleHQuanMnXG4gICAgICAgIEpTICAnLi9ibGFpZGRkcndnLmpzJ1xuICAgICAgICAjIEpTICAnLi9jb252ZXJ0UG9pbnRGcm9tUGFnZVRvTm9kZS5qcydcbiAgICAgICAgSlMgICcuL2pxdWVyeS10cmFuc2l0LmpzJ1xuICAgICAgICBKUyAgJy4vYnJvd3Nlci5qcydcbiAgICAgICAgSlMgICcuL3Byb2Nlc3MteGNzcy1ydWxlcy5qcydcbiAgICAgICAgQ1NTICcuL21hdGVyaWFsaXplL2Nzcy9tYXRlcmlhbGl6ZS5jc3MnXG4gICAgICAgIEpTICAnLi9tYXRlcmlhbGl6ZS9qcy9tYXRlcmlhbGl6ZS5taW4uanMnXG4gICAgICAgIENTUyAnLi9ta3RzLW1haW4ucmV3b3JrLmNzcydcbiAgICAgICAgU1RZTEUgXCJcIlwiXG4gICAgICAgICAgYm9keSB7XG4gICAgICAgICAgICBmb250LXNpemU6IDRtbTtcbiAgICAgICAgICB9XG4gICAgICAgICAgXCJcIlwiXG4gICAgICAjPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIENPRkZFRVNDUklQVCA9PlxuICAgICAgICAoICQgZG9jdW1lbnQgKS5yZWFkeSAtPlxuICAgICAgICAgICMgIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cbiAgICAgICAgICAjIHN0YXJ0X25vZGUgID0gKCAkICdwYWdlIGNvbHVtbiBwJyApLmNvbnRlbnRzKCkuZXEgMFxuICAgICAgICAgICMgc3RhcnRfZG9tICAgPSBzdGFydF9ub2RlLmdldCAwXG4gICAgICAgICAgIyAjIGVuZE5vZGUgPSAkKCdzcGFuLnNlY29uZCcpLmNvbnRlbnRzKCkuZ2V0KDApO1xuICAgICAgICAgICMgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpXG4gICAgICAgICAgIyBpZHggICA9IDBcbiAgICAgICAgICAjIHRleHQgID0gc3RhcnRfbm9kZS50ZXh0KClcbiAgICAgICAgICAjIHdoaWxlIGlkeCA8IHRleHQubGVuZ3RoXG4gICAgICAgICAgIyAgIHJhbmdlLnNldFN0YXJ0IHN0YXJ0X2RvbSwgaWR4XG4gICAgICAgICAgIyAgIGlkeCArPSBpZiAoIHRleHQuY29kZVBvaW50QXQgaWR4ICkgPiAweGZmZmYgdGhlbiArMiBlbHNlICsxXG4gICAgICAgICAgIyAgIHJhbmdlLnNldEVuZCBzdGFydF9kb20sIGlkeFxuICAgICAgICAgICMgICB7IGJvdHRvbSwgaGVpZ2h0LCBsZWZ0LCByaWdodCwgdG9wLCB3aWR0aCB9ID0gcmFuZ2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAjICAgdCA9IHJhbmdlLnRvU3RyaW5nKClcbiAgICAgICAgICAjICAgY29uc29sZS5sb2cgKCBpZiB0IGlzICdcXHUwMGFkJyB0aGVuICd+JyBlbHNlIHQgKSwgbGVmdCwgdG9wXG4gICAgICAgICAgIyAjIHJhbmdlLnNldEVuZCAgIHN0YXJ0X25vZGUsIDBcbiAgICAgICAgICAjICMgY29uc29sZS5sb2cgcmFuZ2UudG9TdHJpbmcoKVxuICAgICAgICAgICMgIyBjb25zb2xlLmxvZyByYW5nZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgICMgd2luZG93Lm15cmFuZ2UgPSByYW5nZVxuICAgICAgICAgICMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG4gICAgICAgICAgIyBnZXRCb3VuZGluZ0NsaWVudFJlY3RcbiAgICAgICAgICB3aW5kb3cuem9vbWVyID0gJCAnem9vbWVyJ1xuICAgICAgICAgICMgem9vbWVyLmRyYWdnYWJsZSgpXG4gICAgICAgICAgc2Nyb2xsX3ggID0gbnVsbFxuICAgICAgICAgIHNjcm9sbF95ICA9IG51bGxcbiAgICAgICAgICBwYWdlX3ggICAgPSBudWxsXG4gICAgICAgICAgcGFnZV95ICAgID0gbnVsbFxuICAgICAgICAgIGRyYWdnaW5nICA9IG5vXG4gICAgICAgICAgc2hpZnRlZCAgID0gbm9cbiAgICAgICAgICAoICQgZG9jdW1lbnQgKS5vbiAna2V5dXAga2V5ZG93bicsICggZXZlbnQgKSAtPiBzaGlmdGVkID0gZXZlbnQuc2hpZnRLZXk7IHJldHVybiB0cnVlXG4gICAgICAgICAgIyMjIERSQUdHSU5HIC8gSEFORCBUT09MIFNVUFBPUlQgIyMjXG4gICAgICAgICAgIyAoICQgZG9jdW1lbnQgKS5vbiAnZHJhZ3N0YXJ0JywgKCBldmVudCwgZGF0YSApIC0+XG4gICAgICAgICAgIyAgIGNvbnNvbGUubG9nICdkcmFnc3RhcnQnLCBldmVudFxuICAgICAgICAgICMgICBzY3JvbGxfeCAgPSAoICQgd2luZG93ICkuc2Nyb2xsTGVmdCgpXG4gICAgICAgICAgIyAgIHNjcm9sbF95ICA9ICggJCB3aW5kb3cgKS5zY3JvbGxUb3AoKVxuICAgICAgICAgICMgICBwYWdlX3ggICAgPSBldmVudC5wYWdlWFxuICAgICAgICAgICMgICBwYWdlX3kgICAgPSBldmVudC5wYWdlWVxuICAgICAgICAgICMgICBkcmFnZ2luZyAgPSB5ZXNcbiAgICAgICAgICAjICAgKCAkICdib2R5JyApLmFkZENsYXNzICdncmFiYmluZydcbiAgICAgICAgICAjICMgKCAkIGRvY3VtZW50ICkub24gJ2RyYWcnLCAoIGV2ZW50LCBkYXRhICkgLT5cbiAgICAgICAgICAjICMgICBjb25zb2xlLmxvZyAnZHJhZycsIFsgZGF0YS5kZWx0YVgsIGRhdGEuZGVsdGFZLCBdXG4gICAgICAgICAgIyAjICAgKCAkIHdpbmRvdyApLnNjcm9sbExlZnQgc2Nyb2xsX3ggLSBkYXRhLmRlbHRhWFxuICAgICAgICAgICMgIyAgICggJCB3aW5kb3cgKS5zY3JvbGxUb3AgIHNjcm9sbF95IC0gZGF0YS5kZWx0YVlcbiAgICAgICAgICAjICggJCBkb2N1bWVudCApLm9uICdtb3VzZW1vdmUnLCAoIGV2ZW50ICkgLT5cbiAgICAgICAgICAjICAgcmV0dXJuIHVubGVzcyBkcmFnZ2luZ1xuICAgICAgICAgICMgICBmYWN0b3IgPSAxICMgaWYgc2hpZnRlZCB0aGVuIDIgZWxzZSAxXG4gICAgICAgICAgIyAgICggJCB3aW5kb3cgKS5zY3JvbGxMZWZ0ICggJCB3aW5kb3cgKS5zY3JvbGxMZWZ0KCkgKyAoIHBhZ2VfeCAtIGV2ZW50LnBhZ2VYICkgKiBmYWN0b3JcbiAgICAgICAgICAjICAgKCAkIHdpbmRvdyApLnNjcm9sbFRvcCAgKCAkIHdpbmRvdyApLnNjcm9sbFRvcCgpICArICggcGFnZV95IC0gZXZlbnQucGFnZVkgKSAqIGZhY3RvclxuICAgICAgICAgICMgIyAoICQgZG9jdW1lbnQgKS5vbiAnZHJhZ2luaXQnLCAoIGV2ZW50ICkgLT5cbiAgICAgICAgICAjICMgICBjb25zb2xlLmxvZyAnZHJhZ2luaXQnLCBldmVudFxuICAgICAgICAgICMgKCAkIGRvY3VtZW50ICkub24gJ2RyYWdlbmQnLCAoIGV2ZW50ICkgLT5cbiAgICAgICAgICAjICAgIyBjb25zb2xlLmxvZyAnZHJhZ2VuZCcsIGV2ZW50XG4gICAgICAgICAgIyAgIGRyYWdnaW5nICA9IG5vXG4gICAgICAgICAgIyAgICggJCAnYm9keScgKS5yZW1vdmVDbGFzcyAnZ3JhYmJpbmcnXG5cbiAgICAgICAgICAjICggJCBkb2N1bWVudCApLm9uICdkcmFnJywgICAgICAgIC0+IGNvbnNvbGUubG9nICdkcmFnJzsgcmV0dXJuIHRydWVcbiAgICAgICAgICAjICggJCBkb2N1bWVudCApLm9uICd0b3VjaHN0YXJ0JywgIC0+IGNvbnNvbGUubG9nICd0b3VjaHN0YXJ0JzsgcmV0dXJuIHRydWVcbiAgICAgICAgICAjICggJCBkb2N1bWVudCApLm9uICd0b3VjaG1vdmUnLCAgIC0+IGNvbnNvbGUubG9nICd0b3VjaG1vdmUnOyByZXR1cm4gdHJ1ZVxuICAgICAgICAgICMgKCAkIGRvY3VtZW50ICkub24gJ3RvdWNoZW5kJywgICAgLT4gY29uc29sZS5sb2cgJ3RvdWNoZW5kJzsgcmV0dXJuIHRydWVcbiAgICAgICAgICAjICggJCBkb2N1bWVudCApLm9uICd0b3VjaGNhbmNlbCcsIC0+IGNvbnNvbGUubG9nICd0b3VjaGNhbmNlbCc7IHJldHVybiB0cnVlXG4gICAgICAgICAgIyAoICQgZG9jdW1lbnQgKS5vbiAnc2Nyb2xsc3RhcnQnLCAtPiBjb25zb2xlLmxvZyAnc2Nyb2xsc3RhcnQnOyByZXR1cm4gdHJ1ZVxuICAgICAgICAgICMgKCAkIGRvY3VtZW50ICkub24gJ3Njcm9sbHN0b3AnLCAgLT4gY29uc29sZS5sb2cgJ3Njcm9sbHN0b3AnOyByZXR1cm4gdHJ1ZVxuICAgICAgICAgICMgKCAkIGRvY3VtZW50ICkub24gJ3N3aXBlJywgICAgICAgLT4gY29uc29sZS5sb2cgJ3N3aXBlJzsgcmV0dXJuIHRydWVcbiAgICAgICAgICAjICggJCBkb2N1bWVudCApLm9uICdzd2lwZWxlZnQnLCAgIC0+IGNvbnNvbGUubG9nICdzd2lwZWxlZnQnOyByZXR1cm4gdHJ1ZVxuICAgICAgICAgICMgKCAkIGRvY3VtZW50ICkub24gJ3N3aXBlcmlnaHQnLCAgLT4gY29uc29sZS5sb2cgJ3N3aXBlcmlnaHQnOyByZXR1cm4gdHJ1ZVxuICAgICAgICAgICMgKCAkIGRvY3VtZW50ICkub24gJ3RhcCcsICAgICAgICAgLT4gY29uc29sZS5sb2cgJ3RhcCc7IHJldHVybiB0cnVlXG4gICAgICAgICAgIyAoICQgZG9jdW1lbnQgKS5vbiAndGFwaG9sZCcsICAgICAtPiBjb25zb2xlLmxvZyAndGFwaG9sZCc7IHJldHVybiB0cnVlXG4gICAgICAgICAgIyAoICQgZG9jdW1lbnQgKS5vbiAnbW91c2Vkb3duJywgICAtPiBjb25zb2xlLmxvZyAnbW91c2Vkb3duJzsgcmV0dXJuIHRydWVcbiAgICAgICAgICAjICggJCBkb2N1bWVudCApLm9uICdtb3VzZXVwJywgICAgIC0+IGNvbnNvbGUubG9nICdtb3VzZXVwJzsgcmV0dXJuIHRydWVcbiAgICAgICAgICAjICggJCBkb2N1bWVudCApLm9uICdtb3VzZW1vdmUnLCAgIC0+IGNvbnNvbGUubG9nICdtb3VzZW1vdmUnOyByZXR1cm4gdHJ1ZVxuICAgICAgICAjICggJCBkb2N1bWVudCApLm9uICdtb3VzZW1vdmUnLCAoIGV2ZW50ICkgLT5cbiAgICAgICAgIyAgIGFwcCAgICAgICAgICAgICAgICAgPSB3aW5kb3dbICdhcHAnIF1cbiAgICAgICAgIyAgIFsgcGFnZV94LCBwYWdlX3ksIF0gPSBbIGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSwgXVxuICAgICAgICAjICAgem1yICAgICAgICAgICAgICAgICA9IHdpbmRvdy5jb252ZXJ0UG9pbnRGcm9tUGFnZVRvTm9kZSAoIGFwcFsgJ3pvb21lcicgXS5nZXQgMCApLCBwYWdlX3gsIHBhZ2VfeVxuICAgICAgICAjICAgY29uc29sZS5sb2cgJ8KpWUM2RUcnLCBbIHBhZ2VfeCwgcGFnZV95LCBdLCB6bXJcbiAgICAgICAgIyAgIHdpbmRvd1sgJ2FwcCcgXVsgJ21vdXNlLXBvc2l0aW9uJyBdID0gWyBwYWdlX3gsIHBhZ2VfeSwgXVxuICAgICAgICAjICAgKCAkICcjdGcnICkuY3NzICdsZWZ0JywgXCIje3ptclsgJ3gnIF19cHhcIlxuICAgICAgICAjICAgKCAkICcjdGcnICkuY3NzICd0b3AnLCAgXCIje3ptclsgJ3knIF19cHhcIlxuICAgICAgICAjICggJCBkb2N1bWVudCApLm9uICdtb3VzZW1vdmUnLCAoIGV2ZW50ICkgLT5cbiAgICAgICAgIyAgICMgY29uc29sZS5sb2cgJ8KpWUM2RUcnLCBbIGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSwgXVxuICAgICAgICAjICAgd2luZG93WyAnYXBwJyBdWyAnbW91c2UtcG9zaXRpb24nIF0gPSBbIGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSwgXVxuICAgICAgIz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICBCT0RZID0+XG4gICAgICAgICMgQSBzdHlsZTogXCJkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3otaW5kZXg6MTAwMDtcIiwgaHJlZjogJy4vZm9udC10ZXN0Lmh0bWwnLCA9PiBcImZvbnQtdGVzdFwiXG4gICAgICAgICMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICAgICAgICBBUlRCT0FSRCAnLmdhbGxleScsID0+XG4gICAgICAgICAgWk9PTUVSID0+XG4gICAgICAgICAgICBHQUxMRVkgPT5cbiAgICAgICAgICAgICAgT1ZFUkxBWSBcIkdhbGxleVwiXG4gICAgICAgICAgICAgIENIQVNFID0+XG4gICAgICAgICAgICAgICAgVE9QTUFSR0lOID0+XG4gICAgICAgICAgICAgICAgSEJPWCA9PlxuICAgICAgICAgICAgICAgICAgTEVGVE1BUkdJTiA9PlxuICAgICAgICAgICAgICAgICAgQ09MVU1OID0+XG4gICAgICAgICAgICAgICAgICBWR0FQID0+XG4gICAgICAgICAgICAgICAgICBDT0xVTU4gPT5cbiAgICAgICAgICAgICAgICAgIFZHQVAgPT5cbiAgICAgICAgICAgICAgICAgIENPTFVNTiA9PlxuICAgICAgICAgICAgICAgICAgUklHSFRNQVJHSU4gPT5cbiAgICAgICAgICAgICAgICBCT1RUT01NQVJHSU4gPT5cbiAgICAgICAgQVJUQk9BUkQgJy5wYWdlcycsID0+XG4gICAgICAgICAgWk9PTUVSID0+XG4gICAgICAgICAgICBmb3IgcGFnZV9uciBpbiBbIDEgLi4gNSBdXG4gICAgICAgICAgICAgIFBBR0UgPT5cbiAgICAgICAgICAgICAgICBPVkVSTEFZIHBhZ2VfbnJcbiAgICAgICAgICAgICAgICBSVUxFUiAnLmhvcml6b250YWwnXG4gICAgICAgICAgICAgICAgUlVMRVIgJy52ZXJ0aWNhbCdcbiAgICAgICAgICAgICAgICAjIENIQVNFV1JBUCA9PlxuICAgICAgICAgICAgICAgIENIQVNFID0+XG4gICAgICAgICAgICAgICAgICBUT1BNQVJHSU4gPT5cbiAgICAgICAgICAgICAgICAgIEhCT1ggPT5cbiAgICAgICAgICAgICAgICAgICAgTEVGVE1BUkdJTiA9PlxuICAgICAgICAgICAgICAgICAgICBDT0xVTU4gPT5cbiAgICAgICAgICAgICAgICAgICAgVkdBUCA9PlxuICAgICAgICAgICAgICAgICAgICBDT0xVTU4gPT5cbiAgICAgICAgICAgICAgICAgICAgVkdBUCA9PlxuICAgICAgICAgICAgICAgICAgICBDT0xVTU4gPT5cbiAgICAgICAgICAgICAgICAgICAgUklHSFRNQVJHSU4gPT5cbiAgICAgICAgICAgICAgICAgIEJPVFRPTU1BUkdJTiA9PlxuXG4gICAgICAgIEhSSUJCT04gJy5kcmFnZ2FibGUnLCBzdHlsZTogJ2hlaWdodDoyMG1tOycsID0+XG4gICAgICAgICAgSSAnLnNtYWxsLm1rdHMtdG9vbC1oYW5kJywgICAgICAgICAgICBhY3Rpb246ICd0b29sLW1vZGUtaGFuZCdcbiAgICAgICAgICBJICcuc21hbGwubWRpLWVkaXRvci1pbnNlcnQtY2hhcnQnLCAgIGFjdGlvbjogJ2VkaXRvci1pbnNlcnQtY2hhcnQnXG4gICAgICAgICAgSSAnLnNtYWxsLm1kaS1hY3Rpb24tM2Qtcm90YXRpb24nLCAgICBhY3Rpb246ICdhY3Rpb24tM2Qtcm90YXRpb24nXG4gICAgICAgICAgSSAnLnNtYWxsLm1kaS1hY3Rpb24tYXNzaWdubWVudCcsICAgICBhY3Rpb246ICdhY3Rpb24tYXNzaWdubWVudCdcbiAgICAgICAgICBJICcuc21hbGwubWRpLWltYWdlLWJsdXItb24nLCAgICAgICAgIGFjdGlvbjogJ2ltYWdlLWJsdXItb24nXG4gICAgICAgICAgSSAnLnNtYWxsLm1kaS1hY3Rpb24tcHJpbnQnLCAgICAgICAgICBhY3Rpb246ICdhY3Rpb24tcHJpbnQnXG4gICAgICAgICAgSSAnLnNtYWxsLm1kaS1hY3Rpb24tY2FjaGVkJywgICAgICAgICBhY3Rpb246ICdhY3Rpb24tY2FjaGVkJ1xuICAgICAgICAgIEkgJy5zbWFsbC5tZGktY29udGVudC1jb250ZW50LWN1dCcsICAgYWN0aW9uOiAnY29udGVudC1jb250ZW50LWN1dCdcbiAgICAgICAgICBJICcuc21hbGwubWRpLWNvbnRlbnQtY29udGVudC1jb3B5JywgIGFjdGlvbjogJ2NvbnRlbnQtY29udGVudC1jb3B5J1xuXG5cblxuIyMjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAgIyMjXG4jIyMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICAjIyNcbiMjIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgICMjI1xuIyMjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAgIyMjXG4jIyMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICAjIyNcbiMjIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgICMjI1xuIyMjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAgIyMjXG4jIyMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICAjIyNcblxuIy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIyMganVzdCBmb3IgdGVzdGluZyBvZiBDU1MgQGZvbnQtZmFjZSwgdW5pY29kZS1yYW5nZSAjIyNcbkBGT05UVEVTVF9sYXlvdXQgPSAtPlxuICAjLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG4gIHJldHVybiByZW5kZXIgPT5cbiAgICBET0NUWVBFIDVcbiAgICBIVE1MID0+XG4gICAgICBIRUFEID0+XG4gICAgICAgIE1FVEEgY2hhcnNldDogJ3V0Zi04J1xuICAgICAgICBUSVRMRSAnbWluZ2t3YWknXG4gICAgICAgIExJTksgcmVsOiAnc2hvcnRjdXQgaWNvbicsIGhyZWY6ICcuL2Zhdmljb24uaWNvbidcbiAgICAgICAgQ1NTICcuL2h0bWw1ZG9jdG9yLWNzcy1yZXNldC5jc3MnXG4gICAgICAgICMgIyBDU1MgJy4vZm9udHMvd2ViZm9udGtpdC0yMDE1MDMxMS0wNzMxMzIvc3R5bGVzaGVldC5jc3MnXG4gICAgICAgIEpTICAnLi9qcXVlcnktMi4xLjMuanMnXG4gICAgICAgIENTUyAnLi9qcXVlcnktdWktMS4xMS4zLmN1c3RvbS9qcXVlcnktdWkuY3NzJ1xuICAgICAgICBKUyAgJy4vanF1ZXJ5LXVpLTEuMTEuMy5jdXN0b20vanF1ZXJ5LXVpLmpzJ1xuICAgICAgICBKUyAgJy4vanF1ZXJ5LmV2ZW50LmRyYWctMi4yL2pxdWVyeS5ldmVudC5kcmFnLTIuMi5qcydcbiAgICAgICAgSlMgICcuL291dGVySFRNTC0yLjEuMC5qcydcbiAgICAgICAgSlMgICcuL2JsYWlkZGRyd2cuanMnXG4gICAgICAgICMgSlMgICcuL2NvbnZlcnRQb2ludEZyb21QYWdlVG9Ob2RlLmpzJ1xuICAgICAgICBKUyAgJy4vanF1ZXJ5LXRyYW5zaXQuanMnXG4gICAgICAgIEpTICAnLi9icm93c2VyLmpzJ1xuICAgICAgICAjIEpTICAnLi9wcm9jZXNzLXhjc3MtcnVsZXMuanMnXG4gICAgICAgIENTUyAnLi9tYXRlcmlhbGl6ZS9jc3MvbWF0ZXJpYWxpemUuY3NzJ1xuICAgICAgICBKUyAgJy4vbWF0ZXJpYWxpemUvanMvbWF0ZXJpYWxpemUubWluLmpzJ1xuICAgICAgICBDU1MgJy4vbWt0cy1tYWluLnJld29yay5jc3MnXG4gICAgICAgIFNUWUxFIFwiXCJcIlxuICAgICAgICAgIEBmb250LWZhY2Uge1xuICAgICAgICAgICAgZm9udC1mYW1pbHk6ICAgICdhbXBlcnNhbmQnO1xuICAgICAgICAgICAgc3JjOiAgICAgICAgICAgIGxvY2FsKCdTY2h3YWJhY2hlcicpO1xuICAgICAgICAgICAgdW5pY29kZS1yYW5nZTogIFUrMDAyNjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBAZm9udC1mYWNlIHtcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAgICAnY2prJztcbiAgICAgICAgICAgIHNyYzogICAgICAgICAgICBsb2NhbCgnU3VuLUV4dEEnKTtcbiAgICAgICAgICAgIHVuaWNvZGUtcmFuZ2U6ICBVKzRlMDAtOWZmZjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBAZm9udC1mYWNlIHtcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAgICAnY2prJztcbiAgICAgICAgICAgIHNyYzogICAgICAgICAgICBsb2NhbCgnc3VuZmxvd2VyLXUtY2prLXhiJyk7XG4gICAgICAgICAgICB1bmljb2RlLXJhbmdlOiAgVSsyMDAwMC0yYjgxZjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBAZm9udC1mYWNlIHtcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAgICAnY2prJztcbiAgICAgICAgICAgIHNyYzogICAgICAgICAgICBsb2NhbCgnaml6dXJhM2InKTtcbiAgICAgICAgICAgIHVuaWNvZGUtcmFuZ2U6ICBVK2UwMDAtZjhmZjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBAZm9udC1mYWNlIHtcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAgICAnYW5jaWVudHN5bWJvbHMnO1xuICAgICAgICAgICAgc3JjOiAgICAgICAgICAgIGxvY2FsKCdHZW5ldmEnKTtcbiAgICAgICAgICAgIHVuaWNvZGUtcmFuZ2U6ICBVKzEwMTkwLTEwMTlCO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJvZHksIGh0bWwge1xuICAgICAgICAgICAgZm9udC1mYW1pbHk6ICAgICdhbXBlcnNhbmQnLCAnY2prJywgJ2FuY2llbnRzeW1ib2xzJywgJ1NvdXJjZSBDb2RlIFBybyc7XG4gICAgICAgICAgfVxuXG5cbiAgICAgICAgICBcIlwiXCJcbiAgICAgICAgIyBodG1sIHtcbiAgICAgICAgIyAgIHRleHQtcmVuZGVyaW5nOiAgZ2VvbWV0cmljUHJlY2lzaW9uO1xuICAgICAgICAjICAgfVxuICAgICAgIyAtd2Via2l0LWZvbnQtZmVhdHVyZS1zZXR0aW5nczogIFwibGlnYVwiIDEsIFwiZGxpZ1wiIDE7XG4gICAgICAjIC8vIHRleHQtcmVuZGVyaW5nOiAgICAgICAgICAgICAgICAgb3B0aW1pemVMZWdpYmlsaXR5XG4gICAgICAjIC8vIGZvbnQtdmFyaWFudC1saWdhdHVyZXM6ICAgICAgICAgY29tbW9uLWxpZ2F0dXJlc1xuICAgICAgIyAvLyBmb250LWtlcm5pbmc6ICAgICAgICAgICAgICAgICAgIG5vcm1hbFxuICAgICAgIz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICBCT0RZID0+XG4gICAgICAgIFJBVyBcIlwiXCJcbiAgICAgICAgICA8ZGl2PiZhbXA7PC9kaXY+XG4gICAgICAgICAgPGRpdj7wkIaTPC9kaXY+XG4gICAgICAgICAgPGRpdj7kuIDkuIHkuILkuIPkuITkuIXkuIbkuIfkuIjkuIkgdS1jams8L2Rpdj5cbiAgICAgICAgICA8ZGl2PvCggIDwoICB8KCAgvCggIPwoICE8KCAhfCggIbwoICH8KCAiPCggIkgdS1jamsteGI8L2Rpdj5cbiAgICAgICAgICA8ZGl2Pu6AgO6Age6Agu6Ag+6AhO6Ahe6Ahu6Ah+6AiO6AiSBqenI8L2Rpdj5cbiAgICAgICAgICBcIlwiXCJcblxuIyMjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAgIyMjXG4jIyMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICAjIyNcbiMjIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgICMjI1xuIyMjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAgIyMjXG4jIyMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICAjIyNcbiMjIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgICMjI1xuIyMjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAgIyMjXG4jIyMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICAjIyNcblxuIy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIyMgZm9yIHRlc3Rpbmcgb2YgcG9zc2libGUgcmVuZGVyaW5nIGJ1ZyByZWxhdGVkIHRvIENTUyBgZGlzcGxheTogZmxleDsgaGVpZ2h0OiAuLi47YCAjIyNcbkBGTEVYSEVJR0hUVEVTVF9sYXlvdXQgPSAtPlxuICAjLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG4gIHJldHVybiByZW5kZXIgPT5cbiAgICBET0NUWVBFIDVcbiAgICBIVE1MID0+XG4gICAgICBIRUFEID0+XG4gICAgICAgIE1FVEEgY2hhcnNldDogJ3V0Zi04J1xuICAgICAgICBUSVRMRSAnbWluZ2t3YWknXG4gICAgICAgIEpTICAnLi9qcXVlcnktMi4xLjMuanMnXG4gICAgICAgIEpTICAnLi9ibGFpZGRkcndnLmpzJ1xuICAgICAgICBKUyAgJy4vYnJvd3Nlci5qcydcbiAgICAgICAgU1RZTFVTIFwiXCJcIlxuXG4gICAgICAgICAgaHRtbFxuICAgICAgICAgICAgZm9udC1zaXplOiAgICAgICAgM21tXG5cbiAgICAgICAgICBjaGFzZVxuICAgICAgICAgIGNvbHVtblxuICAgICAgICAgICAgb3V0bGluZTogICAgICAgICAgICAgICAgMXB4IGRvdHRlZCByZWRcbiAgICAgICAgICAgIG91dGxpbmUtb2Zmc2V0OiAgICAgICAgIC0xcHhcblxuICAgICAgICAgIGNoYXNlXG4gICAgICAgICAgICBwb3NpdGlvbjogICAgICAgICAgICAgICByZWxhdGl2ZVxuICAgICAgICAgICAgbGVmdDogICAgICAgICAgICAgICAgICAgNC41bW1cbiAgICAgICAgICAgIHRvcDogICAgICAgICAgICAgICAgICAgIDhtbVxuICAgICAgICAgICAgLy8gd2lkdGg6ICAgICAgICAgICAgICAgICAgMjAxbW1cbiAgICAgICAgICAgIC8vIC8qICMjIyBUQUlOVCAjIyMgKi9cbiAgICAgICAgICAgIGhlaWdodDogICAgICAgICAgICAgICAgIDI3OC44NW1tXG4gICAgICAgICAgICBkaXNwbGF5OiAgICAgICAgICAgICAgICBmbGV4XG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogICAgICAgICBjb2x1bW5cbiAgICAgICAgICAgIGZsb2F0OiAgICAgICAgICAgICAgICAgIGxlZnRcblxuICAgICAgICAgIGNvbHVtblxuICAgICAgICAgICAgZGlzcGxheTogICAgICAgICAgICAgICAgYmxvY2tcbiAgICAgICAgICAgIGZsZXgtc2hyaW5rOiAgICAgICAgICAgIDFcbiAgICAgICAgICAgIGZsZXgtZ3JvdzogICAgICAgICAgICAgIDFcblxuICAgICAgICAgICAgICAgICAgICBcIlwiXCJcbiAgICAgICM9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgQk9EWSA9PlxuICAgICAgICBDSEFTRSA9PlxuICAgICAgICAgIENPTFVNTiA9PlxuICAgICAgICAgICAgZm9yIGlkeCBpbiBbIDAgLi4uIDkwIF1cbiAgICAgICAgICAgICAgRElWIFwiI3tpZHh9XCJcblxuICAgICAgIyBESVYgJy5jaGFzZScsID0+XG4gICAgICAjICAgRElWICcuY29sdW1uJywgPT5cbiAgICAgICMgICAgIGZvciBpZHggaW4gWyAwIC4uLiA5MCBdXG4gICAgICAjICAgICAgIERJViBcIiN7aWR4fVwiXG5cblxuIy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIyMgcmVuZGVyaW5nIHdpdGggZmxvYXQgaW5zdGVhZCBvZiBmbGV4ICMjI1xuQEZMT0FUX2xheW91dCA9IC0+XG4gICMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cbiAgcmV0dXJuIHJlbmRlciA9PlxuICAgIERPQ1RZUEUgNVxuICAgIEhUTUwgPT5cbiAgICAgIEhFQUQgPT5cbiAgICAgICAgTUVUQSBjaGFyc2V0OiAndXRmLTgnXG4gICAgICAgIFRJVExFICdtaW5na3dhaSdcbiAgICAgICAgSlMgICcuL2pxdWVyeS0yLjEuMy5qcydcbiAgICAgICAgSlMgICcuL2JsYWlkZGRyd2cuanMnXG4gICAgICAgIEpTICAnLi9icm93c2VyLmpzJ1xuICAgICAgICBTVFlMVVMgXCJcIlwiXG5cblxuICAgICAgICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICAgICAgICAgIC8qIEV4cGVyaW1lbnRhbGx5IGRldGVjdGVkIHRoYXQgYCRwYXBlci1oZWlnaHQgPSAyOTdtbSAtIDAuMTNtbWAgaXMgbm90IGVub3VnaCBidXRcbiAgICAgICAgICAgIGAyOTdtbSAtIDAuMTVtbWAgaXMgZW5vdWdoIHRvIGF2b2lkIGludGVydmVuaW5nIGJsYW5rIHBhZ2VzIGluIHRoZSBQREYuICovXG4gICAgICAgICAgJHBhcGVyLXdpZHRoICAgICAgICAgICAgICAgID0gMjEwbW1cbiAgICAgICAgICAkcGFwZXItaGVpZ2h0ICAgICAgICAgICAgICAgPSAyOTdtbSAtIDAuMTVtbVxuICAgICAgICAgIC8vICRwYXBlci13aWR0aCAgICAgICAgICAgICAgICA9IDIxMG1tXG4gICAgICAgICAgLy8gJHBhcGVyLWhlaWdodCAgICAgICAgICAgICAgID0gMjk3bW1cbiAgICAgICAgICAvKiAuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4gKi9cbiAgICAgICAgICAvLyAnZ3V0dGVycycgaW4gdHlwb2dyYXBoaWMgdGVybXMgKG5vbi1wcmludGFibGUgYXJlYXMpIGJlY29tZSAncGFkZGluZ3MnIGluIENTUzpcbiAgICAgICAgICAkZ3V0dGVyLWxlZnQgICAgICAgICAgICAgICAgPSA0LjVtbVxuICAgICAgICAgICRndXR0ZXItcmlnaHQgICAgICAgICAgICAgICA9ICRndXR0ZXItbGVmdFxuICAgICAgICAgICRndXR0ZXItdG9wICAgICAgICAgICAgICAgICA9IDhtbVxuICAgICAgICAgICRndXR0ZXItYm90dG9tICAgICAgICAgICAgICA9IDEwbW1cbiAgICAgICAgICAvKiAuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4gKi9cbiAgICAgICAgICAvLyAnbWFyZ2lucycgaW4gdHlwb2dyYXBoaWMgdGVybXMgKGFyZWFzIG91dHNpZGUgdGhlIG1haW4gY29udGVudCkgYmVjb21lICdwYWRkaW5ncycgaW4gQ1NTOlxuICAgICAgICAgICRtYXJnaW4tbGVmdCAgICAgICAgICAgICAgICA9IDE1bW1cbiAgICAgICAgICAkbWFyZ2luLXJpZ2h0ICAgICAgICAgICAgICAgPSAkbWFyZ2luLWxlZnRcbiAgICAgICAgICAkbWFyZ2luLXRvcCAgICAgICAgICAgICAgICAgPSAxMW1tXG4gICAgICAgICAgJG1hcmdpbi1ib3R0b20gICAgICAgICAgICAgID0gNW1tXG4gICAgICAgICAgLyogLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uICovXG4gICAgICAgICAgJGdhcC12ZXJ0aWNhbC13aWR0aCAgICAgICAgID0gNW1tXG4gICAgICAgICAgLyogLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uICovXG4gICAgICAgICAgLy8gdGhlIGNoYXNlIHJlcHJlc2VudHMgdGhlIHByaW50YWJsZSBhcmVhOyBpbnNpZGUsIGZsYW5rZWQgYnkgdGhlIG1hcmdpbnMsIGlzIHRoZSBtYWluIGNvbnRlbnQgYXJlYTpcbiAgICAgICAgICAkY2hhc2Utd2lkdGggICAgICAgICAgICAgICAgPSAkcGFwZXItd2lkdGggIC0gJGd1dHRlci1sZWZ0ICAtICRndXR0ZXItcmlnaHRcbiAgICAgICAgICAkY2hhc2UtaGVpZ2h0ICAgICAgICAgICAgICAgPSAkcGFwZXItaGVpZ2h0IC0gJGd1dHRlci10b3AgICAtICRndXR0ZXItYm90dG9tXG4gICAgICAgICAgLyogLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uICovXG4gICAgICAgICAgJGdhbGxleS13aWR0aCAgICAgICAgICAgICAgID0gJHBhcGVyLXdpZHRoXG4gICAgICAgICAgLyogLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uICovXG4gICAgICAgICAgJGVwc2lsb24gICAgICAgICAgICAgICAgICAgID0gMW1tXG5cblxuICAgICAgICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICAgICAgICAgIHBhcGVyXG4gICAgICAgICAgcGFnZVxuICAgICAgICAgICB3aWR0aDogICAgICAgICAgICAgICAgICAgJHBhcGVyLXdpZHRoXG4gICAgICAgICAgIGhlaWdodDogICAgICAgICAgICAgICAgICAkcGFwZXItaGVpZ2h0XG4gICAgICAgICAgIGRpc3BsYXk6ICAgICAgICAgICAgICAgICBibG9ja1xuXG4gICAgICAgICAgaHRtbFxuICAgICAgICAgICAgZm9udC1zaXplOiAgICAgICAgICAgICAgNG1tXG5cbiAgICAgICAgICBvdmVybGF5XG4gICAgICAgICAgICBkaXNwbGF5OiAgICAgICAgICAgICAgICBibG9ja1xuICAgICAgICAgICAgcG9zaXRpb246ICAgICAgICAgICAgICAgYWJzb2x1dGVcblxuICAgICAgICAgIG1hcmdpblxuICAgICAgICAgICAgZGlzcGxheTogICAgICAgICAgICAgICAgYmxvY2tcblxuICAgICAgICAgIG1hcmdpbi5sZWZ0XG4gICAgICAgICAgbWFyZ2luLnJpZ2h0XG4gICAgICAgICAgICBmbG9hdDogICAgICAgICAgICAgICAgICBsZWZ0XG4gICAgICAgICAgICBoZWlnaHQ6ICAgICAgICAgICAgICAgICAxMDAlXG5cbiAgICAgICAgICBtYXJnaW4ubGVmdFxuICAgICAgICAgICAgbWluLXdpZHRoOiAgICAgICAgICAgICAgJG1hcmdpbi1sZWZ0XG4gICAgICAgICAgICBtYXgtd2lkdGg6ICAgICAgICAgICAgICAkbWFyZ2luLWxlZnRcblxuICAgICAgICAgIG1hcmdpbi5yaWdodFxuICAgICAgICAgICAgbWluLXdpZHRoOiAgICAgICAgICAgICAgJG1hcmdpbi1yaWdodFxuICAgICAgICAgICAgbWF4LXdpZHRoOiAgICAgICAgICAgICAgJG1hcmdpbi1yaWdodFxuXG4gICAgICAgICAgbWFyZ2luLnRvcFxuICAgICAgICAgIG1hcmdpbi5ib3R0b21cbiAgICAgICAgICAgIHdpZHRoOiAgICAgICAgICAgICAgICAgIDEwMCVcblxuICAgICAgICAgIG1hcmdpbi50b3BcbiAgICAgICAgICAgIG1pbi1oZWlnaHQ6ICAgICAgICAgICAgICRtYXJnaW4tdG9wXG4gICAgICAgICAgICBtYXgtaGVpZ2h0OiAgICAgICAgICAgICAkbWFyZ2luLXRvcFxuXG4gICAgICAgICAgbWFyZ2luLmJvdHRvbVxuICAgICAgICAgICAgbWluLWhlaWdodDogICAgICAgICAgICAgJG1hcmdpbi1ib3R0b21cbiAgICAgICAgICAgIG1heC1oZWlnaHQ6ICAgICAgICAgICAgICRtYXJnaW4tYm90dG9tXG5cbiAgICAgICAgICBjaGFzZVxuICAgICAgICAgIGNvbHVtblxuICAgICAgICAgIGJveFxuICAgICAgICAgIG1hcmdpblxuICAgICAgICAgIGdhcFxuICAgICAgICAgIHBhZ2VcbiAgICAgICAgICAgIG91dGxpbmU6ICAgICAgICAgICAgICAgIDFweCBkb3R0ZWQgcmVkXG4gICAgICAgICAgICBvdXRsaW5lLW9mZnNldDogICAgICAgICAtMXB4XG5cbiAgICAgICAgICBjaGFzZVxuICAgICAgICAgICAgcG9zaXRpb246ICAgICAgICAgICAgICAgcmVsYXRpdmVcbiAgICAgICAgICAgIGxlZnQ6ICAgICAgICAgICAgICAgICAgICRndXR0ZXItbGVmdFxuICAgICAgICAgICAgdG9wOiAgICAgICAgICAgICAgICAgICAgJGd1dHRlci10b3BcbiAgICAgICAgICAgIHdpZHRoOiAgICAgICAgICAgICAgICAgICRjaGFzZS13aWR0aFxuICAgICAgICAgICAgaGVpZ2h0OiAgICAgICAgICAgICAgICAgJGNoYXNlLWhlaWdodFxuICAgICAgICAgICAgZGlzcGxheTogICAgICAgICAgICAgICAgYmxvY2tcblxuICAgICAgICAgIGJveFxuICAgICAgICAgICAgZGlzcGxheTogICAgICAgICAgICAgICAgYmxvY2tcbiAgICAgICAgICAgIGZsb2F0OiAgICAgICAgICAgICAgICAgIGxlZnRcbiAgICAgICAgICAgIHdpZHRoOiAgICAgICAgICAgICAgICAgICRjaGFzZS13aWR0aCAtICRtYXJnaW4tbGVmdCAtICRtYXJnaW4tcmlnaHQgLSAkZXBzaWxvblxuICAgICAgICAgICAgaGVpZ2h0OiAgICAgICAgICAgICAgICAgMTBtbVxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2RkZFxuXG4gICAgICAgICAgZ2FwXG4gICAgICAgICAgICBkaXNwbGF5OiAgICAgICAgICAgICAgICBibG9ja1xuICAgICAgICAgICAgd2lkdGg6ICAgICAgICAgICAgICAgICAgJGdhcC12ZXJ0aWNhbC13aWR0aFxuICAgICAgICAgICAgZmxvYXQ6ICAgICAgICAgICAgICAgICAgbGVmdFxuICAgICAgICAgICAgaGVpZ2h0OiAgICAgICAgICAgICAgICAgMTAwJVxuXG4gICAgICAgICAgY29sdW1uXG4gICAgICAgICAgICBkaXNwbGF5OiAgICAgICAgICAgICAgICBibG9ja1xuICAgICAgICAgICAgaGVpZ2h0OiAgICAgICAgICAgICAgICAgMTAwJVxuICAgICAgICAgICAgZmxvYXQ6ICAgICAgICAgICAgICAgICAgbGVmdFxuXG4gICAgICAgICAgLmNvbHVtbnMtMyBjb2x1bW5cbiAgICAgICAgICAgIHdpZHRoOiAgICAgICAgICAgICAgICAgICggKCAkY2hhc2Utd2lkdGggLSAyICogJGdhcC12ZXJ0aWNhbC13aWR0aCApIC8gMyApXG4gICAgICAgICAgICAgICAgICAgIFwiXCJcIlxuICAgICAgIz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICBCT0RZID0+XG4gICAgICAgIEFSVEJPQVJEICcucGFnZXMnLCA9PlxuICAgICAgICAgIFpPT01FUiA9PlxuICAgICAgICAgICAgIyBmb3IgcGFnZV9uciBpbiBbIDEgLi4gNSBdXG4gICAgICAgICAgICBQQUdFID0+XG4gICAgICAgICAgICAgICMgT1ZFUkxBWSBwYWdlX25yXG4gICAgICAgICAgICAgIENIQVNFID0+XG4gICAgICAgICAgICAgICAgTUFSR0lOICcudG9wJywgPT5cbiAgICAgICAgICAgICAgICBNQVJHSU4gJy5sZWZ0JywgPT5cbiAgICAgICAgICAgICAgICBCT1ggJy5ob3Jpem9udGFsLmNvbHVtbnMtMycsID0+XG4gICAgICAgICAgICAgICAgICBDT0xVTU4gPT5cbiAgICAgICAgICAgICAgICAgICAgIyBpZiBwYWdlX25yIGlzIDFcbiAgICAgICAgICAgICAgICAgICAgICAjIGZvciBpZHggaW4gWyAwIC4uLiA3MCBdXG4gICAgICAgICAgICAgICAgICAgICAgIyAgIERJViAnJywgXCIje2lkeH1cIlxuICAgICAgICAgICAgICAgICAgIyBHQVAgJy52ZXJ0aWNhbCcsID0+XG4gICAgICAgICAgICAgICAgICAjIENPTFVNTiA9PlxuICAgICAgICAgICAgICAgICAgIyBHQVAgJy52ZXJ0aWNhbCcsID0+XG4gICAgICAgICAgICAgICAgICAjIENPTFVNTiA9PlxuICAgICAgICAgICAgICAgIE1BUkdJTiAnLnJpZ2h0JywgPT5cbiAgICAgICAgICAgICAgICBNQVJHSU4gJy5ib3R0b20nLCA9PlxuXG4jLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMjIyByZW5kZXJpbmcgd2l0aCBmbG9hdCBpbnN0ZWFkIG9mIGZsZXggIyMjXG5AVEFCTEVfbGF5b3V0ID0gLT5cbiAgIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICByZXR1cm4gcmVuZGVyID0+XG4gICAgRE9DVFlQRSA1XG4gICAgSFRNTCA9PlxuICAgICAgSEVBRCA9PlxuICAgICAgICBNRVRBIGNoYXJzZXQ6ICd1dGYtOCdcbiAgICAgICAgVElUTEUgJ21pbmdrd2FpJ1xuICAgICAgICBKUyAgJy4vanF1ZXJ5LTIuMS4zLmpzJ1xuICAgICAgICBKUyAgJy4vYmxhaWRkZHJ3Zy5qcydcbiAgICAgICAgSlMgICcuL2Jyb3dzZXIuanMnXG4gICAgICAgIFNUWUxVUyBcIlwiXCJcblxuXG4gICAgICAgICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gICAgICAgICAgLyogRXhwZXJpbWVudGFsbHkgZGV0ZWN0ZWQgdGhhdCBgJHBhcGVyLWhlaWdodCA9IDI5N21tIC0gMC4xM21tYCBpcyBub3QgZW5vdWdoIGJ1dFxuICAgICAgICAgICAgYDI5N21tIC0gMC4xNW1tYCBpcyBlbm91Z2ggdG8gYXZvaWQgaW50ZXJ2ZW5pbmcgYmxhbmsgcGFnZXMgaW4gdGhlIFBERi4gKi9cbiAgICAgICAgICAkcGFwZXItd2lkdGggICAgICAgICAgICAgICAgPSAyMTBtbVxuICAgICAgICAgICRwYXBlci1oZWlnaHQgICAgICAgICAgICAgICA9IDI5N21tIC0gMC4xNW1tXG4gICAgICAgICAgLy8gJHBhcGVyLXdpZHRoICAgICAgICAgICAgICAgID0gMjEwbW1cbiAgICAgICAgICAvLyAkcGFwZXItaGVpZ2h0ICAgICAgICAgICAgICAgPSAyOTdtbVxuICAgICAgICAgIC8qIC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiAqL1xuICAgICAgICAgIC8vICdndXR0ZXJzJyBpbiB0eXBvZ3JhcGhpYyB0ZXJtcyAobm9uLXByaW50YWJsZSBhcmVhcykgYmVjb21lICdwYWRkaW5ncycgaW4gQ1NTOlxuICAgICAgICAgICRndXR0ZXItbGVmdCAgICAgICAgICAgICAgICA9IDQuNW1tXG4gICAgICAgICAgJGd1dHRlci1yaWdodCAgICAgICAgICAgICAgID0gJGd1dHRlci1sZWZ0XG4gICAgICAgICAgJGd1dHRlci10b3AgICAgICAgICAgICAgICAgID0gOG1tXG4gICAgICAgICAgJGd1dHRlci1ib3R0b20gICAgICAgICAgICAgID0gMTBtbVxuICAgICAgICAgIC8qIC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiAqL1xuICAgICAgICAgIC8vICdtYXJnaW5zJyBpbiB0eXBvZ3JhcGhpYyB0ZXJtcyAoYXJlYXMgb3V0c2lkZSB0aGUgbWFpbiBjb250ZW50KSBiZWNvbWUgJ3BhZGRpbmdzJyBpbiBDU1M6XG4gICAgICAgICAgJG1hcmdpbi1sZWZ0ICAgICAgICAgICAgICAgID0gMTVtbVxuICAgICAgICAgICRtYXJnaW4tcmlnaHQgICAgICAgICAgICAgICA9ICRtYXJnaW4tbGVmdFxuICAgICAgICAgICRtYXJnaW4tdG9wICAgICAgICAgICAgICAgICA9IDExbW1cbiAgICAgICAgICAkbWFyZ2luLWJvdHRvbSAgICAgICAgICAgICAgPSA1bW1cbiAgICAgICAgICAvKiAuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4gKi9cbiAgICAgICAgICAkZ2FwLXZlcnRpY2FsLXdpZHRoICAgICAgICAgPSA1bW1cbiAgICAgICAgICAvKiAuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4gKi9cbiAgICAgICAgICAvLyB0aGUgY2hhc2UgcmVwcmVzZW50cyB0aGUgcHJpbnRhYmxlIGFyZWE7IGluc2lkZSwgZmxhbmtlZCBieSB0aGUgbWFyZ2lucywgaXMgdGhlIG1haW4gY29udGVudCBhcmVhOlxuICAgICAgICAgICRjaGFzZS13aWR0aCAgICAgICAgICAgICAgICA9ICRwYXBlci13aWR0aCAgLSAkZ3V0dGVyLWxlZnQgIC0gJGd1dHRlci1yaWdodFxuICAgICAgICAgICRjaGFzZS1oZWlnaHQgICAgICAgICAgICAgICA9ICRwYXBlci1oZWlnaHQgLSAkZ3V0dGVyLXRvcCAgIC0gJGd1dHRlci1ib3R0b21cbiAgICAgICAgICAvKiAuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4gKi9cbiAgICAgICAgICAkZ2FsbGV5LXdpZHRoICAgICAgICAgICAgICAgPSAkcGFwZXItd2lkdGhcblxuXG4gICAgICAgICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gICAgICAgICAgcGFwZXJcbiAgICAgICAgICBwYWdlXG4gICAgICAgICAgIHdpZHRoOiAgICAgICAgICAgICAgICAgICAkcGFwZXItd2lkdGhcbiAgICAgICAgICAgaGVpZ2h0OiAgICAgICAgICAgICAgICAgICRwYXBlci1oZWlnaHRcbiAgICAgICAgICAgZGlzcGxheTogICAgICAgICAgICAgICAgIGJsb2NrXG5cbiAgICAgICAgICBodG1sXG4gICAgICAgICAgICBmb250LXNpemU6ICAgICAgICAgICAgICA0bW1cblxuICAgICAgICAgIC5jaGFzZVxuICAgICAgICAgIGNvbHVtblxuICAgICAgICAgIGJveFxuICAgICAgICAgIG1hcmdpblxuICAgICAgICAgIGdhcFxuICAgICAgICAgIHBhZ2VcbiAgICAgICAgICAgIG91dGxpbmU6ICAgICAgICAgICAgICAgIDFweCBkb3R0ZWQgcmVkXG4gICAgICAgICAgICBvdXRsaW5lLW9mZnNldDogICAgICAgICAtMXB4XG5cbiAgICAgICAgICAuY2hhc2VcbiAgICAgICAgICAgIGJvcmRlci1jb2xsYXBzZTogICAgICAgIGNvbGxhcHNlXG4gICAgICAgICAgICBtYXJnaW46ICAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBwYWRkaW5nOiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBwb3NpdGlvbjogICAgICAgICAgICAgICByZWxhdGl2ZVxuICAgICAgICAgICAgbGVmdDogICAgICAgICAgICAgICAgICAgJGd1dHRlci1sZWZ0XG4gICAgICAgICAgICB0b3A6ICAgICAgICAgICAgICAgICAgICAkZ3V0dGVyLXRvcFxuICAgICAgICAgICAgd2lkdGg6ICAgICAgICAgICAgICAgICAgJGNoYXNlLXdpZHRoXG4gICAgICAgICAgICBoZWlnaHQ6ICAgICAgICAgICAgICAgICAkY2hhc2UtaGVpZ2h0XG5cbiAgICAgICAgICAubWFyZ2luXG4gICAgICAgICAgICBtYXJnaW46ICAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBwYWRkaW5nOiAgICAgICAgICAgICAgICAwXG5cbiAgICAgICAgICAubWFyZ2luLm1hcmdpbi1sZWZ0XG4gICAgICAgICAgICBoZWlnaHQ6ICAgICAgICAgICAgICAgICAkY2hhc2UtaGVpZ2h0XG4gICAgICAgICAgICB3aWR0aDogICAgICAgICAgICAgICAgICAkbWFyZ2luLWxlZnRcblxuICAgICAgICAgIC5tYXJnaW4ubWFyZ2luLXJpZ2h0XG4gICAgICAgICAgICBoZWlnaHQ6ICAgICAgICAgICAgICAgICAkY2hhc2UtaGVpZ2h0XG4gICAgICAgICAgICB3aWR0aDogICAgICAgICAgICAgICAgICAkbWFyZ2luLXJpZ2h0XG5cbiAgICAgICAgICAubWFyZ2luLm1hcmdpbi10b3BcbiAgICAgICAgICAubWFyZ2luLm1hcmdpbi1ib3R0b21cbiAgICAgICAgICAgIHdpZHRoOiAgICAgICAgICAgICAgICAgICRnYWxsZXktd2lkdGggLSAkbWFyZ2luLWxlZnQgLSAkbWFyZ2luLXJpZ2h0XG5cbiAgICAgICAgICAubWFyZ2luLm1hcmdpbi10b3BcbiAgICAgICAgICAgIGhlaWdodDogICAgICAgICAgICAgICAgICRtYXJnaW4tdG9wXG5cbiAgICAgICAgICAubWFyZ2luLm1hcmdpbi1ib3R0b21cbiAgICAgICAgICAgIGhlaWdodDogICAgICAgICAgICAgICAgICRtYXJnaW4tYm90dG9tXG5cbiAgICAgICAgICAuZ2FwXG4gICAgICAgICAgICBtYXJnaW46ICAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBwYWRkaW5nOiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICB3aWR0aDogICAgICAgICAgICAgICAgICAkZ2FwLXZlcnRpY2FsLXdpZHRoXG4gICAgICAgICAgICBtaW4td2lkdGg6ICAgICAgICAgICAgICAkZ2FwLXZlcnRpY2FsLXdpZHRoXG4gICAgICAgICAgICBtYXgtd2lkdGg6ICAgICAgICAgICAgICAkZ2FwLXZlcnRpY2FsLXdpZHRoXG5cbiAgICAgICAgICAuY29sdW1uYm94XG4gICAgICAgICAgLmNvbHVtblxuICAgICAgICAgICAgYm9yZGVyLWNvbGxhcHNlOiAgICAgICAgY29sbGFwc2VcbiAgICAgICAgICAgIG1hcmdpbjogICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIHBhZGRpbmc6ICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIGhlaWdodDogICAgICAgICAgICAgICAgIDEwMCVcblxuICAgICAgICAgIC5jb2x1bW5ib3hcbiAgICAgICAgICAgIHdpZHRoOiAgICAgICAgICAgICAgICAgIDEwMCVcblxuICAgICAgICAgIC5jb2x1bW4uY29sdW1ucy0zXG4gICAgICAgICAgICB3aWR0aDogICAgICAgICAgICAgICAgICAoICggJGNoYXNlLXdpZHRoIC0gMiAqICRnYXAtdmVydGljYWwtd2lkdGggKSAvIDMgKVxuICAgICAgICAgICAgbWluLXdpZHRoOiAgICAgICAgICAgICAgKCAoICRjaGFzZS13aWR0aCAtIDIgKiAkZ2FwLXZlcnRpY2FsLXdpZHRoICkgLyAzIClcbiAgICAgICAgICAgIG1heC13aWR0aDogICAgICAgICAgICAgICggKCAkY2hhc2Utd2lkdGggLSAyICogJGdhcC12ZXJ0aWNhbC13aWR0aCApIC8gMyApXG5cbiAgICAgICAgICB0ZFxuICAgICAgICAgICAgb3V0bGluZTogMXB4IHNvbGlkIGdyZWVuXG4gICAgICAgICAgXCJcIlwiXG4gICAgICAjPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIENIQVNFID0gKCBwLi4uICkgPT5cbiAgICAgICAgVEFCTEUgJy5jaGFzZScsID0+XG4gICAgICAgICAgVFIgPT5cbiAgICAgICAgICAgIFREICcubWFyZ2luLm1hcmdpbi1sZWZ0Jywgcm93c3BhbjogM1xuICAgICAgICAgICAgVEQgJy5tYXJnaW4ubWFyZ2luLXRvcCdcbiAgICAgICAgICAgIFREICcubWFyZ2luLm1hcmdpbi1yaWdodCcsIHJvd3NwYW46IDNcbiAgICAgICAgICBUUiA9PlxuICAgICAgICAgICAgVEQgJy5tYWluJywgcC4uLlxuICAgICAgICAgIFRSID0+XG4gICAgICAgICAgICBURCAnLm1hcmdpbi5tYXJnaW4tYm90dG9tJ1xuICAgICAgIy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICBDT0xVTU5CT1ggPSAoIGNvbHVtbl9jb3VudCApID0+XG4gICAgICAgIFRBQkxFICcuY29sdW1uYm94JywgPT5cbiAgICAgICAgICBUUiA9PlxuICAgICAgICAgICAgZm9yIGNvbHVtbl9uciBpbiBbIDEgLi4gY29sdW1uX2NvdW50IF1cbiAgICAgICAgICAgICAgdW5sZXNzIGNvbHVtbl9uciBpcyAxXG4gICAgICAgICAgICAgICAgVEQgJy5nYXAudmVydGljYWwnXG4gICAgICAgICAgICAgIFREIFwiLmNvbHVtbi5jb2x1bW5zLSN7Y29sdW1uX2NvdW50fVwiLCA9PlxuICAgICAgICAgICAgICAgIGlmIGNvbHVtbl9uciBpcyAxXG4gICAgICAgICAgICAgICAgICBURVhUIFwiXCJcInh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHhcbiAgICAgICAgICAgICAgICAgICAgeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eFxuICAgICAgICAgICAgICAgICAgICB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4XG4gICAgICAgICAgICAgICAgICAgIHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHhcbiAgICAgICAgICAgICAgICAgICAgeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eFxuICAgICAgICAgICAgICAgICAgICB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4XG4gICAgICAgICAgICAgICAgICAgIHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHhcbiAgICAgICAgICAgICAgICAgICAgeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eFxuICAgICAgICAgICAgICAgICAgICB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4XG4gICAgICAgICAgICAgICAgICAgIHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHhcbiAgICAgICAgICAgICAgICAgICAgeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eFxuICAgICAgICAgICAgICAgICAgICB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4IHh4eCB4eHggeHh4XG4gICAgICAgICAgICAgICAgICAgIFwiXCJcIlxuICAgICAgIz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICBCT0RZID0+XG4gICAgICAgIEFSVEJPQVJEICcucGFnZXMnLCA9PlxuICAgICAgICAgIFpPT01FUiA9PlxuICAgICAgICAgICAgUEFHRSA9PlxuICAgICAgICAgICAgICBDSEFTRSB7fSwgPT5cbiAgICAgICAgICAgICAgICBDT0xVTU5CT1ggMywgPT5cbiAgICAgICAgICAgICAgICAjICAgTUFSR0lOICcubGVmdCcsID0+XG4gICAgICAgICAgICAgICAgIyAgIENPTFVNTiA9PlxuICAgICAgICAgICAgICAgICMgICAgIGZvciBpZHggaW4gWyAwIC4uLiA3MCBdXG4gICAgICAgICAgICAgICAgIyAgICAgICBESVYgJycsIFwiI3tpZHh9XCJcbiAgICAgICAgICAgICAgICAjICAgR0FQICcudmVydGljYWwnLCA9PlxuICAgICAgICAgICAgICAgICMgICBDT0xVTU4gPT5cbiAgICAgICAgICAgICAgICAjICAgR0FQICcudmVydGljYWwnLCA9PlxuICAgICAgICAgICAgICAgICMgICBDT0xVTU4gPT5cbiAgICAgICAgICAgICAgICAjICAgTUFSR0lOICcucmlnaHQnLCA9PlxuICAgICAgICAgICAgICAgICMgTUFSR0lOICcuYm90dG9tJywgPT5cblxuXG4jLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMjIyByZW5kZXJpbmcgd2l0aCBmbG9hdCBpbnN0ZWFkIG9mIGZsZXggIyMjXG5ASU5MSU5FQkxPQ0tfbGF5b3V0ID0gLT5cbiAgIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICByZXR1cm4gcmVuZGVyID0+XG4gICAgRE9DVFlQRSA1XG4gICAgSFRNTCA9PlxuICAgICAgSEVBRCA9PlxuICAgICAgICBNRVRBIGNoYXJzZXQ6ICd1dGYtOCdcbiAgICAgICAgVElUTEUgJ21pbmdrd2FpJ1xuICAgICAgICBKUyAgJy4vanF1ZXJ5LTIuMS4zLmpzJ1xuICAgICAgICBKUyAgJy4vYmxhaWRkZHJ3Zy5qcydcbiAgICAgICAgSlMgICcuL2Jyb3dzZXIuanMnXG4gICAgICAgIFNUWUxVUyBcIlwiXCJcblxuXG4gICAgICAgICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gICAgICAgICAgLyogRXhwZXJpbWVudGFsbHkgZGV0ZWN0ZWQgdGhhdCBgJHBhcGVyLWhlaWdodCA9IDI5N21tIC0gMC4xM21tYCBpcyBub3QgZW5vdWdoIGJ1dFxuICAgICAgICAgICAgYDI5N21tIC0gMC4xNW1tYCBpcyBlbm91Z2ggdG8gYXZvaWQgaW50ZXJ2ZW5pbmcgYmxhbmsgcGFnZXMgaW4gdGhlIFBERi4gKi9cbiAgICAgICAgICAkcGFwZXItd2lkdGggICAgICAgICAgICAgICAgPSAyMTBtbVxuICAgICAgICAgICRwYXBlci1oZWlnaHQgICAgICAgICAgICAgICA9IDI5N21tIC0gMC4xNW1tXG4gICAgICAgICAgLy8gJHBhcGVyLXdpZHRoICAgICAgICAgICAgICAgID0gMjEwbW1cbiAgICAgICAgICAvLyAkcGFwZXItaGVpZ2h0ICAgICAgICAgICAgICAgPSAyOTdtbVxuICAgICAgICAgIC8qIC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiAqL1xuICAgICAgICAgIC8vICdndXR0ZXJzJyBpbiB0eXBvZ3JhcGhpYyB0ZXJtcyAobm9uLXByaW50YWJsZSBhcmVhcykgYmVjb21lICdwYWRkaW5ncycgaW4gQ1NTOlxuICAgICAgICAgICRndXR0ZXItbGVmdCAgICAgICAgICAgICAgICA9IDQuNW1tXG4gICAgICAgICAgJGd1dHRlci1yaWdodCAgICAgICAgICAgICAgID0gJGd1dHRlci1sZWZ0XG4gICAgICAgICAgJGd1dHRlci10b3AgICAgICAgICAgICAgICAgID0gOG1tXG4gICAgICAgICAgJGd1dHRlci1ib3R0b20gICAgICAgICAgICAgID0gMTBtbVxuICAgICAgICAgIC8qIC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiAqL1xuICAgICAgICAgIC8vICdtYXJnaW5zJyBpbiB0eXBvZ3JhcGhpYyB0ZXJtcyAoYXJlYXMgb3V0c2lkZSB0aGUgbWFpbiBjb250ZW50KSBiZWNvbWUgJ3BhZGRpbmdzJyBpbiBDU1M6XG4gICAgICAgICAgJG1hcmdpbi1sZWZ0ICAgICAgICAgICAgICAgID0gMTVtbVxuICAgICAgICAgICRtYXJnaW4tcmlnaHQgICAgICAgICAgICAgICA9ICRtYXJnaW4tbGVmdFxuICAgICAgICAgICRtYXJnaW4tdG9wICAgICAgICAgICAgICAgICA9IDExbW1cbiAgICAgICAgICAkbWFyZ2luLWJvdHRvbSAgICAgICAgICAgICAgPSA1bW1cbiAgICAgICAgICAvKiAuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4gKi9cbiAgICAgICAgICAkZ2FwLXZlcnRpY2FsLXdpZHRoICAgICAgICAgPSA1bW1cbiAgICAgICAgICAvKiAuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4gKi9cbiAgICAgICAgICAvLyB0aGUgY2hhc2UgcmVwcmVzZW50cyB0aGUgcHJpbnRhYmxlIGFyZWE7IGluc2lkZSwgZmxhbmtlZCBieSB0aGUgbWFyZ2lucywgaXMgdGhlIG1haW4gY29udGVudCBhcmVhOlxuICAgICAgICAgICRjaGFzZS13aWR0aCAgICAgICAgICAgICAgICA9ICRwYXBlci13aWR0aCAgLSAkZ3V0dGVyLWxlZnQgIC0gJGd1dHRlci1yaWdodFxuICAgICAgICAgICRjaGFzZS1oZWlnaHQgICAgICAgICAgICAgICA9ICRwYXBlci1oZWlnaHQgLSAkZ3V0dGVyLXRvcCAgIC0gJGd1dHRlci1ib3R0b21cbiAgICAgICAgICAvKiAuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4gKi9cbiAgICAgICAgICAkZ2FsbGV5LXdpZHRoICAgICAgICAgICAgICAgPSAkcGFwZXItd2lkdGhcbiAgICAgICAgICAvKiAuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4gKi9cbiAgICAgICAgICAkZXBzaWxvbiAgICAgICAgICAgICAgICAgICAgPSAxbW1cblxuXG4gICAgICAgICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gICAgICAgICAgcGFwZXJcbiAgICAgICAgICBwYWdlXG4gICAgICAgICAgIHdpZHRoOiAgICAgICAgICAgICAgICAgICAkcGFwZXItd2lkdGhcbiAgICAgICAgICAgaGVpZ2h0OiAgICAgICAgICAgICAgICAgICRwYXBlci1oZWlnaHRcbiAgICAgICAgICAgZGlzcGxheTogICAgICAgICAgICAgICAgIGJsb2NrXG5cbiAgICAgICAgICBodG1sXG4gICAgICAgICAgICBmb250LXNpemU6ICAgICAgICAgICAgICA0bW1cblxuICAgICAgICAgIG92ZXJsYXlcbiAgICAgICAgICAgIGRpc3BsYXk6ICAgICAgICAgICAgICAgIGJsb2NrXG4gICAgICAgICAgICBwb3NpdGlvbjogICAgICAgICAgICAgICBhYnNvbHV0ZVxuXG4gICAgICAgICAgbWFyZ2luXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAgICAgICAjZTk5NGFlXG5cbiAgICAgICAgICBtYXJnaW4ubGVmdFxuICAgICAgICAgIG1hcmdpbi5yaWdodFxuICAgICAgICAgICAgZGlzcGxheTogICAgICAgICAgICAgICAgaW5saW5lLWJsb2NrXG4gICAgICAgICAgICBoZWlnaHQ6ICAgICAgICAgICAgICAgICAxMDAlXG5cbiAgICAgICAgICBtYXJnaW4ubGVmdFxuICAgICAgICAgICAgbWluLXdpZHRoOiAgICAgICAgICAgICAgJG1hcmdpbi1sZWZ0XG4gICAgICAgICAgICBtYXgtd2lkdGg6ICAgICAgICAgICAgICAkbWFyZ2luLWxlZnRcblxuICAgICAgICAgIG1hcmdpbi5yaWdodFxuICAgICAgICAgICAgbWluLXdpZHRoOiAgICAgICAgICAgICAgJG1hcmdpbi1yaWdodFxuICAgICAgICAgICAgbWF4LXdpZHRoOiAgICAgICAgICAgICAgJG1hcmdpbi1yaWdodFxuXG4gICAgICAgICAgbWFyZ2luLnRvcFxuICAgICAgICAgIG1hcmdpbi5ib3R0b21cbiAgICAgICAgICAgIGRpc3BsYXk6ICAgICAgICAgICAgICAgIGJsb2NrXG4gICAgICAgICAgICB3aWR0aDogICAgICAgICAgICAgICAgICAkY2hhc2Utd2lkdGhcblxuICAgICAgICAgIG1hcmdpbi50b3BcbiAgICAgICAgICAgIG1pbi1oZWlnaHQ6ICAgICAgICAgICAgICRtYXJnaW4tdG9wXG4gICAgICAgICAgICBtYXgtaGVpZ2h0OiAgICAgICAgICAgICAkbWFyZ2luLXRvcFxuXG4gICAgICAgICAgbWFyZ2luLmJvdHRvbVxuICAgICAgICAgICAgbWluLWhlaWdodDogICAgICAgICAgICAgJG1hcmdpbi1ib3R0b21cbiAgICAgICAgICAgIG1heC1oZWlnaHQ6ICAgICAgICAgICAgICRtYXJnaW4tYm90dG9tXG5cbiAgICAgICAgICBjaGFzZVxuICAgICAgICAgIGNvbHVtblxuICAgICAgICAgIGJveFxuICAgICAgICAgIG1hcmdpblxuICAgICAgICAgIGdhcFxuICAgICAgICAgIHBhZ2VcbiAgICAgICAgICAgIG91dGxpbmU6ICAgICAgICAgICAgICAgIDFweCBkb3R0ZWQgcmVkXG4gICAgICAgICAgICBvdXRsaW5lLW9mZnNldDogICAgICAgICAtMXB4XG5cbiAgICAgICAgICBjaGFzZVxuICAgICAgICAgICAgcG9zaXRpb246ICAgICAgICAgICAgICAgcmVsYXRpdmVcbiAgICAgICAgICAgIGxlZnQ6ICAgICAgICAgICAgICAgICAgICRndXR0ZXItbGVmdFxuICAgICAgICAgICAgdG9wOiAgICAgICAgICAgICAgICAgICAgJGd1dHRlci10b3BcbiAgICAgICAgICAgIHdpZHRoOiAgICAgICAgICAgICAgICAgICRjaGFzZS13aWR0aFxuICAgICAgICAgICAgaGVpZ2h0OiAgICAgICAgICAgICAgICAgJGNoYXNlLWhlaWdodFxuICAgICAgICAgICAgZGlzcGxheTogICAgICAgICAgICAgICAgYmxvY2tcblxuICAgICAgICAgIHJvd1xuICAgICAgICAgICAgZGlzcGxheTogICAgICAgICAgICAgICAgaW5saW5lLWJsb2NrXG4gICAgICAgICAgICB3aWR0aDogICAgICAgICAgICAgICAgICAkY2hhc2Utd2lkdGhcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiAgICAgICAgICAgIG5vd3JhcFxuICAgICAgICAgICAgLy8gISEhISFcbiAgICAgICAgICAgIGhlaWdodDogICAgICAgICAgICAgICAgIDEwbW1cblxuICAgICAgICAgIGdhcFxuICAgICAgICAgICAgZGlzcGxheTogICAgICAgICAgICAgICAgaW5saW5lLWJsb2NrXG4gICAgICAgICAgICB3aWR0aDogICAgICAgICAgICAgICAgICAkZ2FwLXZlcnRpY2FsLXdpZHRoXG4gICAgICAgICAgICBoZWlnaHQ6ICAgICAgICAgICAgICAgICAxMDAlXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGRkXG5cbiAgICAgICAgICBjb2x1bW5cbiAgICAgICAgICAgIGRpc3BsYXk6ICAgICAgICAgICAgICAgIGlubGluZS1ibG9ja1xuICAgICAgICAgICAgd2hpdGUtc3BhY2U6ICAgICAgICAgICAgbm9ybWFsXG4gICAgICAgICAgICBoZWlnaHQ6ICAgICAgICAgICAgICAgICAxMDAlXG5cbiAgICAgICAgICAuY29sdW1ucy0zIGNvbHVtblxuICAgICAgICAgICAgd2lkdGg6ICAgICAgICAgICAgICAgICAgKCAoICRjaGFzZS13aWR0aCAtIDIgKiAkZ2FwLXZlcnRpY2FsLXdpZHRoIC0gJG1hcmdpbi1sZWZ0IC0gJG1hcmdpbi1yaWdodCApIC8gMyApXG4gICAgICAgICAgICAgICAgICAgIFwiXCJcIlxuICAgICAgIz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICBCT0RZID0+XG4gICAgICAgIEFSVEJPQVJEICcucGFnZXMnLCA9PlxuICAgICAgICAgIFpPT01FUiA9PlxuICAgICAgICAgICAgIyBmb3IgcGFnZV9uciBpbiBbIDEgLi4gNSBdXG4gICAgICAgICAgICBQQUdFID0+XG4gICAgICAgICAgICAgICMgT1ZFUkxBWSBwYWdlX25yXG4gICAgICAgICAgICAgIENIQVNFID0+XG4gICAgICAgICAgICAgICAgTUFSR0lOICcudG9wJywgPT5cbiAgICAgICAgICAgICAgICBST1cgJy5ob3Jpem9udGFsLmNvbHVtbnMtMycsID0+XG4gICAgICAgICAgICAgICAgICBNQVJHSU4gJy5sZWZ0JywgPT5cbiAgICAgICAgICAgICAgICAgIENPTFVNTiA9PlxuICAgICAgICAgICAgICAgICAgICAjIGlmIHBhZ2VfbnIgaXMgMVxuICAgICAgICAgICAgICAgICAgICAgICMgZm9yIGlkeCBpbiBbIDAgLi4uIDcwIF1cbiAgICAgICAgICAgICAgICAgICAgICAjICAgRElWICcnLCBcIiN7aWR4fVwiXG4gICAgICAgICAgICAgICAgICBHQVAgJy52ZXJ0aWNhbCcsID0+XG4gICAgICAgICAgICAgICAgICBDT0xVTU4gPT5cbiAgICAgICAgICAgICAgICAgIEdBUCAnLnZlcnRpY2FsJywgPT5cbiAgICAgICAgICAgICAgICAgIENPTFVNTiA9PlxuICAgICAgICAgICAgICAgICAgTUFSR0lOICcucmlnaHQnLCA9PlxuICAgICAgICAgICAgICAgIE1BUkdJTiAnLmJvdHRvbScsID0+XG5cbiMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuQGxheW91dCA9IEBGT05UVEVTVF9sYXlvdXRcbkBsYXlvdXQgPSBARkxFWEhFSUdIVFRFU1RfbGF5b3V0XG5AbGF5b3V0ID0gQFRBQkxFX2xheW91dFxuQGxheW91dCA9IEBGTE9BVF9sYXlvdXRcbkBsYXlvdXQgPSBASU5MSU5FQkxPQ0tfbGF5b3V0XG5AbGF5b3V0ID0gQE5PUk1BTF9sYXlvdXRcblxuIl19