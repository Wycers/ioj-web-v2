(function(t) {
  function e(e) {
    for (
      var i, r, l = e[0], a = e[1], c = e[2], h = 0, d = [];
      h < l.length;
      h++
    )
      (r = l[h]),
        Object.prototype.hasOwnProperty.call(o, r) && o[r] && d.push(o[r][0]),
        (o[r] = 0);
    for (i in a) Object.prototype.hasOwnProperty.call(a, i) && (t[i] = a[i]);
    u && u(e);
    while (d.length) d.shift()();
    return s.push.apply(s, c || []), n();
  }
  function n() {
    for (var t, e = 0; e < s.length; e++) {
      for (var n = s[e], i = !0, l = 1; l < n.length; l++) {
        const a = n[l];
        0 !== o[a] && (i = !1);
      }
      i && (s.splice(e--, 1), (t = r((r.s = n[0]))));
    }
    return t;
  }
  var i = {},
    o = { app: 0 },
    s = [];
  function r(e) {
    if (i[e]) return i[e].exports;
    const n = (i[e] = { i: e, l: !1, exports: {} });
    return t[e].call(n.exports, n, n.exports, r), (n.l = !0), n.exports;
  }
  (r.m = t),
    (r.c = i),
    (r.d = function(t, e, n) {
      r.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
    }),
    (r.r = function(t) {
      'undefined' !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(t, '__esModule', { value: !0 });
    }),
    (r.t = function(t, e) {
      if ((1 & e && (t = r(t)), 8 & e)) return t;
      if (4 & e && 'object' === typeof t && t && t.__esModule) return t;
      const n = Object.create(null);
      if (
        (r.r(n),
        Object.defineProperty(n, 'default', { enumerable: !0, value: t }),
        2 & e && 'string' != typeof t)
      )
        for (const i in t)
          r.d(
            n,
            i,
            function(e) {
              return t[e];
            }.bind(null, i)
          );
      return n;
    }),
    (r.n = function(t) {
      const e =
        t && t.__esModule
          ? function() {
              return t['default'];
            }
          : function() {
              return t;
            };
      return r.d(e, 'a', e), e;
    }),
    (r.o = function(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (r.p = '');
  let l = (window['webpackJsonp'] = window['webpackJsonp'] || []),
    a = l.push.bind(l);
  (l.push = e), (l = l.slice());
  for (let c = 0; c < l.length; c++) e(l[c]);
  var u = a;
  s.push([0, 'chunk-vendors']), n();
})({
  0: function(t, e, n) {
    t.exports = n('56d7');
  },
  '0361': function(t, e, n) {
    'use strict';
    const i = n('6bcd'),
      o = n.n(i);
    o.a;
  },
  '0b0d': function(t, e, n) {},
  2395: function(t, e, n) {},
  3230: function(t, e, n) {
    'use strict';
    const i = n('0b0d'),
      o = n.n(i);
    o.a;
  },
  '477d': function(t, e, n) {
    'use strict';
    const i = n('d8da'),
      o = n.n(i);
    o.a;
  },
  '56d7': function(t, e, n) {
    'use strict';
    n.r(e);
    n('e260'), n('e6cf'), n('cca6'), n('a79d');
    const i = n('2b0e'),
      o = function() {
        const t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          'div',
          { attrs: { id: 'app' } },
          [
            n('VueBlocksContainer', {
              ref: 'container',
              staticClass: 'container',
              attrs: { blocksContent: t.blocks, scene: t.scene },
              on: {
                'update:scene': function(e) {
                  t.scene = e;
                },
                blockSelect: t.selectBlock,
                blockDeselect: t.deselectBlock,
              },
              nativeOn: {
                contextmenu: function(e) {
                  return t.showContextMenu(e);
                },
                click: function(e) {
                  return t.closeContextMenu(e);
                },
              },
            }),
            n('VueBlockProperty', {
              attrs: { property: t.selectedBlockProperty },
              on: { save: t.saveProperty },
            }),
            n('label', [
              n(
                'select',
                {
                  directives: [
                    {
                      name: 'model',
                      rawName: 'v-model',
                      value: t.selectedType,
                      expression: 'selectedType',
                    },
                  ],
                  attrs: { name: 'type' },
                  on: {
                    change: function(e) {
                      const n = Array.prototype.filter
                        .call(e.target.options, function(t) {
                          return t.selected;
                        })
                        .map(function(t) {
                          const e = '_value' in t ? t._value : t.value;
                          return e;
                        });
                      t.selectedType = e.target.multiple ? n : n[0];
                    },
                  },
                },
                [
                  t._l(t.selectBlocksType, function(e) {
                    return [
                      n(
                        'optgroup',
                        { attrs: { label: e } },
                        t._l(t.filteredBlocks(e), function(e) {
                          return n('option', { domProps: { value: e.name } }, [
                            t._v(t._s(e.title || e.name)),
                          ]);
                        }),
                        0
                      ),
                    ];
                  }),
                ],
                2
              ),
            ]),
            n(
              'button',
              {
                on: {
                  click: function(e) {
                    return e.stopPropagation(), t.addBlock(e);
                  },
                },
              },
              [t._v('Add')]
            ),
            t._v(' | '),
            n('label', { attrs: { for: 'useContextMenu' } }, [
              n('input', {
                directives: [
                  {
                    name: 'model',
                    rawName: 'v-model',
                    value: t.useContextMenu,
                    expression: 'useContextMenu',
                  },
                ],
                attrs: { type: 'checkbox', id: 'useContextMenu' },
                domProps: {
                  checked: Array.isArray(t.useContextMenu)
                    ? t._i(t.useContextMenu, null) > -1
                    : t.useContextMenu,
                },
                on: {
                  change: function(e) {
                    const n = t.useContextMenu,
                      i = e.target,
                      o = !!i.checked;
                    if (Array.isArray(n)) {
                      const s = null,
                        r = t._i(n, s);
                      i.checked
                        ? r < 0 && (t.useContextMenu = n.concat([s]))
                        : r > -1 &&
                          (t.useContextMenu = n
                            .slice(0, r)
                            .concat(n.slice(r + 1)));
                    } else t.useContextMenu = o;
                  },
                },
              }),
              t._v('Use right click for Add blocks '),
            ]),
            n(
              'ul',
              {
                directives: [
                  {
                    name: 'show',
                    rawName: 'v-show',
                    value: t.contextMenu.isShow,
                    expression: 'contextMenu.isShow',
                  },
                ],
                ref: 'contextMenu',
                style: {
                  top: t.contextMenu.top + 'px',
                  left: t.contextMenu.left + 'px',
                },
                attrs: { id: 'contextMenu', tabindex: '-1' },
                on: { blur: t.closeContextMenu },
              },
              [
                t._l(t.selectBlocksType, function(e) {
                  return [
                    n('li', { staticClass: 'label' }, [t._v(t._s(e))]),
                    t._l(t.filteredBlocks(e), function(e) {
                      return n(
                        'li',
                        {
                          on: {
                            click: function(n) {
                              return t.addBlockContextMenu(e.name);
                            },
                          },
                        },
                        [t._v(t._s(e.title || e.name) + ' ')]
                      );
                    }),
                  ];
                }),
              ],
              2
            ),
          ],
          1
        );
      },
      s = [],
      r =
        (n('4de4'),
        n('7db0'),
        n('c975'),
        n('d81d'),
        n('d3b7'),
        n('ddb0'),
        n('3c4e')),
      l = n.n(r),
      a = function() {
        const t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          'div',
          { staticClass: 'vue-container' },
          [
            n('VueLink', { attrs: { lines: t.lines } }),
            t._l(t.blocks, function(e) {
              return n(
                'VueBlock',
                t._b(
                  {
                    key: e.id,
                    attrs: { options: t.optionsForChild },
                    on: {
                      update: t.updateScene,
                      linkingStart: function(n) {
                        return t.linkingStart(e, n);
                      },
                      linkingStop: function(n) {
                        return t.linkingStop(e, n);
                      },
                      linkingBreak: function(n) {
                        return t.linkingBreak(e, n);
                      },
                      select: function(n) {
                        return t.blockSelect(e);
                      },
                      delete: function(n) {
                        return t.blockDelete(e);
                      },
                    },
                  },
                  'VueBlock',
                  e,
                  !1,
                  !0
                )
              );
            }),
          ],
          2
        );
      },
      c = [],
      u =
        (n('a4d3'),
        n('e01a'),
        n('d28b'),
        n('99af'),
        n('4160'),
        n('45fc'),
        n('b0c0'),
        n('3ca3'),
        n('159b'),
        n('2909'));
    function h(t) {
      const e = t.getBoundingClientRect(),
        n = window.pageYOffset,
        i = window.pageXOffset,
        o = e.top + n,
        s = e.left + i;
      return { top: Math.round(o), left: Math.round(s) };
    }
    const d = { getOffsetRect: h };
    function p(t, e) {
      const n = e.pageX || e.clientX + document.documentElement.scrollLeft,
        i = e.pageY || e.clientY + document.documentElement.scrollTop,
        o = h(t),
        s = n - o.left,
        r = i - o.top;
      return { x: s, y: r };
    }
    const f = { getMousePosition: p },
      m = function() {
        const t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          'div',
          {
            staticClass: 'vue-block',
            class: { selected: t.selected },
            style: t.style,
          },
          [
            n('header', { style: t.headerStyle }, [
              t._v(' ' + t._s(t.title) + ' '),
              n('a', { staticClass: 'delete', on: { click: t.deleteBlock } }, [
                t._v('x'),
              ]),
            ]),
            n(
              'div',
              { staticClass: 'inputs' },
              t._l(t.inputs, function(e, i) {
                return n('div', { staticClass: 'input' }, [
                  n('div', {
                    staticClass: 'circle inputSlot',
                    class: { active: e.active },
                    on: {
                      mouseup: function(e) {
                        return t.slotMouseUp(e, i);
                      },
                      mousedown: function(e) {
                        return t.slotBreak(e, i);
                      },
                    },
                  }),
                  t._v(' ' + t._s(e.label) + ' '),
                ]);
              }),
              0
            ),
            n(
              'div',
              { staticClass: 'outputs' },
              t._l(t.outputs, function(e, i) {
                return n('div', { staticClass: 'output' }, [
                  n('div', {
                    staticClass: 'circle',
                    class: { active: e.active },
                    on: {
                      mousedown: function(e) {
                        return t.slotMouseDown(e, i);
                      },
                    },
                  }),
                  t._v(' ' + t._s(e.label) + ' '),
                ]);
              }),
              0
            ),
          ]
        );
      },
      y = [],
      v =
        (n('a9e3'),
        {
          name: 'VueBlock',
          props: {
            x: {
              type: Number,
              default: 0,
              validator: function(t) {
                return 'number' === typeof t;
              },
            },
            y: {
              type: Number,
              default: 0,
              validator: function(t) {
                return 'number' === typeof t;
              },
            },
            selected: Boolean,
            title: { type: String, default: 'Title' },
            inputs: Array,
            outputs: Array,
            options: { type: Object },
          },
          created: function() {
            (this.mouseX = 0),
              (this.mouseY = 0),
              (this.lastMouseX = 0),
              (this.lastMouseY = 0),
              (this.linking = !1),
              (this.dragging = !1);
          },
          mounted: function() {
            document.documentElement.addEventListener(
              'mousemove',
              this.handleMove,
              !0
            ),
              document.documentElement.addEventListener(
                'mousedown',
                this.handleDown,
                !0
              ),
              document.documentElement.addEventListener(
                'mouseup',
                this.handleUp,
                !0
              );
          },
          beforeDestroy: function() {
            document.documentElement.removeEventListener(
              'mousemove',
              this.handleMove,
              !0
            ),
              document.documentElement.removeEventListener(
                'mousedown',
                this.handleDown,
                !0
              ),
              document.documentElement.removeEventListener(
                'mouseup',
                this.handleUp,
                !0
              );
          },
          data: function() {
            return { width: this.options.width, hasDragged: !1 };
          },
          methods: {
            handleMove: function(t) {
              if (
                ((this.mouseX =
                  t.pageX || t.clientX + document.documentElement.scrollLeft),
                (this.mouseY =
                  t.pageY || t.clientY + document.documentElement.scrollTop),
                this.dragging && !this.linking)
              ) {
                const e = this.mouseX - this.lastMouseX,
                  n = this.mouseY - this.lastMouseY;
                (this.lastMouseX = this.mouseX),
                  (this.lastMouseY = this.mouseY),
                  this.moveWithDiff(e, n),
                  (this.hasDragged = !0);
              }
            },
            handleDown: function(t) {
              (this.mouseX =
                t.pageX || t.clientX + document.documentElement.scrollLeft),
                (this.mouseY =
                  t.pageY || t.clientY + document.documentElement.scrollTop),
                (this.lastMouseX = this.mouseX),
                (this.lastMouseY = this.mouseY);
              const e = t.target || t.srcElement;
              this.$el.contains(e) &&
                1 === t.which &&
                ((this.dragging = !0),
                this.$emit('select'),
                t.preventDefault && t.preventDefault());
            },
            handleUp: function() {
              this.dragging &&
                ((this.dragging = !1),
                this.hasDragged && (this.save(), (this.hasDragged = !1))),
                this.linking && (this.linking = !1);
            },
            slotMouseDown: function(t, e) {
              (this.linking = !0),
                this.$emit('linkingStart', e),
                t.preventDefault && t.preventDefault();
            },
            slotMouseUp: function(t, e) {
              this.$emit('linkingStop', e),
                t.preventDefault && t.preventDefault();
            },
            slotBreak: function(t, e) {
              (this.linking = !0),
                this.$emit('linkingBreak', e),
                t.preventDefault && t.preventDefault();
            },
            save: function() {
              this.$emit('update');
            },
            deleteBlock: function() {
              this.$emit('delete');
            },
            moveWithDiff: function(t, e) {
              const n = this.x + t / this.options.scale,
                i = this.y + e / this.options.scale;
              this.$emit('update:x', n), this.$emit('update:y', i);
            },
          },
          computed: {
            style: function() {
              return {
                top: this.options.center.y + this.y * this.options.scale + 'px',
                left:
                  this.options.center.x + this.x * this.options.scale + 'px',
                width: this.width + 'px',
                transform: 'scale(' + this.options.scale + ')',
                transformOrigin: 'top left',
              };
            },
            headerStyle: function() {
              return { height: this.options.titleHeight + 'px' };
            },
          },
        }),
      g = v,
      k = (n('3230'), n('2877')),
      x = Object(k['a'])(g, m, y, !1, null, '9a4bcc94', null),
      b = x.exports,
      S = function() {
        const t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          'svg',
          { attrs: { width: '100%', height: '100%' } },
          [
            t._l(t.renderedPathes, function(e) {
              return n('g', [
                t.outline
                  ? n('path', { style: e.outlineStyle, attrs: { d: e.data } })
                  : t._e(),
                n('path', { style: e.style, attrs: { d: e.data } }),
              ]);
            }),
            n(
              'g',
              t._l(t.renderedArrows, function(t) {
                return n('path', {
                  style: t.style,
                  attrs: {
                    d: 'M -1 -1 L 0 1 L 1 -1 z',
                    transform: t.transform,
                  },
                });
              }),
              0
            ),
          ],
          2
        );
      },
      D = [],
      M = {
        props: {
          lines: {
            type: Array,
            default: function() {
              return [];
            },
          },
          outline: { type: Boolean, default: !1 },
        },
        methods: {
          distance: function(t, e, n, i) {
            return Math.sqrt((n - t) * (n - t) + (i - e) * (i - e));
          },
          computeConnectionPoint: function(t, e, n, i, o) {
            const s = this.distance(t, e, n, i),
              r = { x: t, y: e },
              l = { x: t + 0.25 * s, y: e },
              a = { x: n - 0.25 * s, y: i },
              c = { x: n, y: i },
              u = (1 - o) * (1 - o) * (1 - o),
              h = (1 - o) * (1 - o) * 3 * o,
              d = 3 * (1 - o) * (o * o),
              p = o * o * o,
              f = u * r.x + h * l.x + d * a.x + p * c.x,
              m = u * r.y + h * l.y + d * a.y + p * c.y;
            return { x: f, y: m };
          },
        },
        computed: {
          renderedPathes: function() {
            const t = this;
            if (!this.lines) return [];
            const e = [];
            return (
              this.lines.forEach(function(n) {
                const i = 0.25 * t.distance(n.x1, n.y1, n.x2, n.y2);
                e.push({
                  data: 'M '
                    .concat(n.x1, ', ')
                    .concat(n.y1, ' C ')
                    .concat(n.x1 + i, ', ')
                    .concat(n.y1, ', ')
                    .concat(n.x2 - i, ', ')
                    .concat(n.y2, ', ')
                    .concat(n.x2, ', ')
                    .concat(n.y2),
                  style: n.style,
                  outlineStyle: n.outlineStyle,
                });
              }),
              e
            );
          },
          renderedArrows: function() {
            const t = this;
            if (!this.lines) return [];
            const e = [];
            return (
              this.lines.forEach(function(n) {
                const i = t.computeConnectionPoint(n.x1, n.y1, n.x2, n.y2, 0.5),
                  o = t.computeConnectionPoint(n.x1, n.y1, n.x2, n.y2, 0.51),
                  s = -Math.atan2(o.x - i.x, o.y - i.y),
                  r = (180 * (s >= 0 ? s : 2 * Math.PI + s)) / Math.PI;
                e.push({
                  transform: 'translate('
                    .concat(i.x, ', ')
                    .concat(i.y, ') rotate(')
                    .concat(r, ')'),
                  style: {
                    stroke: n.style.stroke,
                    strokeWidth: 2 * n.style.strokeWidth,
                    fill: n.style.stroke,
                  },
                });
              }),
              e
            );
          },
        },
      },
      w = M,
      C = Object(k['a'])(w, S, D, !1, null, '56aa24a8', null),
      B = C.exports,
      E = {
        name: 'VueBlockContainer',
        components: { VueBlock: b, VueLink: B },
        props: {
          blocksContent: {
            type: Array,
            default: function() {
              return [];
            },
          },
          scene: {
            type: Object,
            default: { blocks: [], links: [], container: {} },
          },
          options: { type: Object },
        },
        mounted: function() {
          document.documentElement.addEventListener(
            'mousemove',
            this.handleMove,
            !0
          ),
            document.documentElement.addEventListener(
              'mousedown',
              this.handleDown,
              !0
            ),
            document.documentElement.addEventListener(
              'mouseup',
              this.handleUp,
              !0
            ),
            document.documentElement.addEventListener(
              'wheel',
              this.handleWheel,
              !0
            ),
            (this.centerX = this.$el.clientWidth / 2),
            (this.centerY = this.$el.clientHeight / 2),
            this.importBlocksContent(),
            this.importScene();
        },
        beforeDestroy: function() {
          document.documentElement.removeEventListener(
            'mousemove',
            this.handleMove,
            !0
          ),
            document.documentElement.removeEventListener(
              'mousedown',
              this.handleDown,
              !0
            ),
            document.documentElement.removeEventListener(
              'mouseup',
              this.handleUp,
              !0
            ),
            document.documentElement.removeEventListener(
              'wheel',
              this.handleWheel,
              !0
            );
        },
        created: function() {
          (this.mouseX = 0),
            (this.mouseY = 0),
            (this.lastMouseX = 0),
            (this.lastMouseY = 0),
            (this.minScale = 0.2),
            (this.maxScale = 5),
            (this.linking = !1),
            (this.linkStartData = null),
            (this.inputSlotClassName = 'inputSlot'),
            (this.defaultScene = { blocks: [], links: [], container: {} });
        },
        data: function() {
          return {
            dragging: !1,
            centerX: 0,
            centerY: 0,
            scale: 1,
            nodes: [],
            blocks: [],
            links: [],
            tempLink: null,
            selectedBlock: null,
            hasDragged: !1,
          };
        },
        computed: {
          optionsForChild: function() {
            return {
              width: 200,
              titleHeight: 20,
              scale: this.scale,
              inputSlotClassName: this.inputSlotClassName,
              center: { x: this.centerX, y: this.centerY },
            };
          },
          container: function() {
            return {
              centerX: this.centerX,
              centerY: this.centerY,
              scale: this.scale,
            };
          },
          lines: function() {
            let t = this,
              e = [],
              n = !0,
              i = !1,
              o = void 0;
            try {
              for (
                var s,
                  r = function() {
                    const n = s.value,
                      i = t.blocks.find(function(t) {
                        return t.id === n.originID;
                      }),
                      o = t.blocks.find(function(t) {
                        return t.id === n.targetID;
                      });
                    if (!i || !o)
                      return (
                        console.log('Remove invalid link', n),
                        t.removeLink(n.id),
                        'continue'
                      );
                    if (i.id === o.id)
                      return (
                        console.log('Loop detected, remove link', n),
                        t.removeLink(n.id),
                        'continue'
                      );
                    const r = t.getConnectionPos(i, n.originSlot, !1),
                      l = t.getConnectionPos(o, n.targetSlot, !0);
                    if (!r || !l)
                      return (
                        console.log('Remove invalid link (slot not exist)', n),
                        t.removeLink(n.id),
                        'continue'
                      );
                    const a = r.x,
                      c = r.y,
                      u = l.x,
                      h = l.y;
                    e.push({
                      x1: a,
                      y1: c,
                      x2: u,
                      y2: h,
                      style: {
                        stroke: '#F85',
                        strokeWidth: 4 * t.scale,
                        fill: 'none',
                      },
                      outlineStyle: {
                        stroke: '#666',
                        strokeWidth: 6 * t.scale,
                        strokeOpacity: 0.6,
                        fill: 'none',
                      },
                    });
                  },
                  l = this.links[Symbol.iterator]();
                !(n = (s = l.next()).done);
                n = !0
              )
                r();
            } catch (a) {
              (i = !0), (o = a);
            } finally {
              try {
                n || null == l.return || l.return();
              } finally {
                if (i) throw o;
              }
            }
            return (
              this.tempLink &&
                ((this.tempLink.style = {
                  stroke: '#8f8f8f',
                  strokeWidth: 4 * this.scale,
                  fill: 'none',
                }),
                e.push(this.tempLink)),
              e
            );
          },
        },
        methods: {
          handleMove: function(t) {
            const e = f.getMousePosition(this.$el, t);
            if (((this.mouseX = e.x), (this.mouseY = e.y), this.dragging)) {
              const n = this.mouseX - this.lastMouseX,
                i = this.mouseY - this.lastMouseY;
              (this.lastMouseX = this.mouseX),
                (this.lastMouseY = this.mouseY),
                (this.centerX += n),
                (this.centerY += i),
                (this.hasDragged = !0);
            }
            if (this.linking && this.linkStartData) {
              const o = this.getConnectionPos(
                this.linkStartData.block,
                this.linkStartData.slotNumber,
                !1
              );
              this.tempLink = {
                x1: o.x,
                y1: o.y,
                x2: this.mouseX,
                y2: this.mouseY,
              };
            }
          },
          handleDown: function(t) {
            const e = t.target || t.srcElement;
            if ((e === this.$el || e.matches('svg, svg *')) && 1 === t.which) {
              this.dragging = !0;
              const n = f.getMousePosition(this.$el, t);
              (this.mouseX = n.x),
                (this.mouseY = n.y),
                (this.lastMouseX = this.mouseX),
                (this.lastMouseY = this.mouseY),
                this.deselectAll(),
                t.preventDefault && t.preventDefault();
            }
          },
          handleUp: function(t) {
            const e = t.target || t.srcElement;
            this.dragging &&
              ((this.dragging = !1),
              this.hasDragged && (this.updateScene(), (this.hasDragged = !1))),
              !this.$el.contains(e) ||
                ('string' === typeof e.className &&
                  -1 !== e.className.indexOf(this.inputSlotClassName)) ||
                ((this.linking = !1),
                (this.tempLink = null),
                (this.linkStartData = null));
          },
          handleWheel: function(t) {
            const e = t.target || t.srcElement;
            if (this.$el.contains(e)) {
              t.preventDefault && t.preventDefault();
              const n = Math.pow(1.1, -0.01 * t.deltaY);
              if (((this.scale *= n), this.scale < this.minScale))
                return void (this.scale = this.minScale);
              if (this.scale > this.maxScale)
                return void (this.scale = this.maxScale);
              const i = { x: this.mouseX, y: this.mouseY },
                o = (i.x - this.centerX) * (n - 1),
                s = (i.y - this.centerY) * (n - 1);
              (this.centerX -= o), (this.centerY -= s), this.updateScene();
            }
          },
          getConnectionPos: function(t, e, n) {
            if (t && -1 !== e) {
              let i = 0,
                o = 0;
              if (
                ((i += t.x),
                (o += t.y),
                (o += this.optionsForChild.titleHeight),
                n && t.inputs.length > e)
              );
              else {
                if (n || !(t.outputs.length > e))
                  return void console.error(
                    'slot ' + e + ' not found, is input: ' + n,
                    t
                  );
                i += this.optionsForChild.width;
              }
              return (
                (o += 11),
                (o += 16 * e),
                (i *= this.scale),
                (o *= this.scale),
                (i += this.centerX),
                (o += this.centerY),
                { x: i, y: o }
              );
            }
          },
          linkingStart: function(t, e) {
            this.linkStartData = { block: t, slotNumber: e };
            const n = this.getConnectionPos(
              this.linkStartData.block,
              this.linkStartData.slotNumber,
              !1
            );
            (this.tempLink = {
              x1: n.x,
              y1: n.y,
              x2: this.mouseX,
              y2: this.mouseY,
            }),
              (this.linking = !0);
          },
          linkingStop: function(t, e) {
            if (this.linkStartData && t && e > -1) {
              this.links = this.links.filter(function(n) {
                return !(n.targetID === t.id && n.targetSlot === e);
              });
              const n = Math.max.apply(
                Math,
                [0].concat(
                  Object(u['a'])(
                    this.links.map(function(t) {
                      return t.id;
                    })
                  )
                )
              );
              this.linkStartData.block.id !== t.id &&
                (this.links.push({
                  id: n + 1,
                  originID: this.linkStartData.block.id,
                  originSlot: this.linkStartData.slotNumber,
                  targetID: t.id,
                  targetSlot: e,
                }),
                this.updateScene());
            }
            (this.linking = !1),
              (this.tempLink = null),
              (this.linkStartData = null);
          },
          linkingBreak: function(t, e) {
            if (t && e > -1) {
              const n = this.links.find(function(n) {
                return n.targetID === t.id && n.targetSlot === e;
              });
              if (n) {
                const i = this.blocks.find(function(t) {
                  return t.id === n.originID;
                });
                (this.links = this.links.filter(function(n) {
                  return !(n.targetID === t.id && n.targetSlot === e);
                })),
                  this.linkingStart(i, n.originSlot),
                  this.updateScene();
              }
            }
          },
          removeLink: function(t) {
            this.links = this.links.filter(function(e) {
              return !(e.id === t);
            });
          },
          addNewBlock: function(t, e, n) {
            const i = Math.max.apply(
                Math,
                [0].concat(
                  Object(u['a'])(
                    this.blocks.map(function(t) {
                      return t.id;
                    })
                  )
                )
              ),
              o = this.nodes.find(function(e) {
                return e.name === t;
              });
            if (o) {
              const s = this.createBlock(o, i + 1);
              void 0 === e || void 0 === n
                ? ((e = (this.$el.clientWidth / 2 - this.centerX) / this.scale),
                  (n = (this.$el.clientHeight / 2 - this.centerY) / this.scale))
                : ((e = (e - this.centerX) / this.scale),
                  (n = (n - this.centerY) / this.scale)),
                (s.x = e),
                (s.y = n),
                this.blocks.push(s),
                this.updateScene();
            }
          },
          createBlock: function(t, e) {
            const n = [],
              i = [],
              o = {};
            return (
              t.fields.forEach(function(t) {
                if ('input' === t.attr)
                  n.push({ name: t.name, label: t.label || t.name });
                else if ('output' === t.attr)
                  i.push({ name: t.name, label: t.label || t.name });
                else {
                  o[t.attr] || (o[t.attr] = {});
                  const e = l()({}, t);
                  delete e['name'],
                    delete e['attr'],
                    o[t.attr][t.name] || (o[t.attr][t.name] = {}),
                    (o[t.attr][t.name] = e);
                }
              }),
              {
                id: e,
                x: 0,
                y: 0,
                selected: !1,
                name: t.name,
                title: t.title || t.name,
                inputs: n,
                outputs: i,
                values: o,
              }
            );
          },
          deselectAll: function() {
            const t = this,
              e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : null;
            this.blocks.forEach(function(n) {
              n.id !== e && n.selected && t.blockDeselect(n);
            });
          },
          blockSelect: function(t) {
            (t.selected = !0),
              (this.selectedBlock = t),
              this.deselectAll(t.id),
              this.$emit('blockSelect', t);
          },
          blockDeselect: function(t) {
            (t.selected = !1),
              t &&
                this.selectedBlock &&
                this.selectedBlock.id === t.id &&
                (this.selectedBlock = null),
              this.$emit('blockDeselect', t);
          },
          blockDelete: function(t) {
            const e = this;
            t.selected && this.blockDeselect(t),
              this.links.forEach(function(n) {
                (n.originID !== t.id && n.targetID !== t.id) ||
                  e.removeLink(n.id);
              }),
              (this.blocks = this.blocks.filter(function(e) {
                return e.id !== t.id;
              })),
              this.updateScene();
          },
          prepareBlocks: function(t) {
            const e = this;
            return t
              .map(function(t) {
                const n = e.nodes.find(function(e) {
                  return e.name === t.name;
                });
                if (!n) return null;
                let i = e.createBlock(n, t.id);
                return (
                  (i = l()(i, t, {
                    arrayMerge: function(t, e) {
                      return 0 === e.length ? t : e;
                    },
                  })),
                  i
                );
              })
              .filter(function(t) {
                return !!t;
              });
          },
          prepareBlocksLinking: function(t, e) {
            if (!t) return [];
            const n = [];
            return (
              t.forEach(function(t) {
                const i = e.filter(function(e) {
                    return e.targetID === t.id;
                  }),
                  o = e.filter(function(e) {
                    return e.originID === t.id;
                  });
                t.inputs.forEach(function(e, n) {
                  t.inputs[n].active = i.some(function(t) {
                    return t.targetSlot === n;
                  });
                }),
                  t.outputs.forEach(function(e, n) {
                    t.outputs[n].active = o.some(function(t) {
                      return t.originSlot === n;
                    });
                  }),
                  n.push(t);
              }),
              n
            );
          },
          importBlocksContent: function() {
            this.blocksContent && (this.nodes = l()([], this.blocksContent));
          },
          importScene: function() {
            let t = this,
              e = l()(this.defaultScene, this.scene),
              n = this.prepareBlocks(e.blocks);
            if (
              ((n = this.prepareBlocksLinking(n, e.links)), this.selectedBlock)
            ) {
              const i = n.find(function(e) {
                return t.selectedBlock.id === e.id;
              });
              i && (i.selected = !0);
            }
            (this.blocks = n), (this.links = l()([], e.links));
            const o = e.container;
            o.centerX && (this.centerX = o.centerX),
              o.centerY && (this.centerY = o.centerY),
              o.scale && (this.scale = o.scale);
          },
          exportScene: function() {
            const t = l()([], this.blocks),
              e = t.map(function(t) {
                return (
                  delete t['inputs'],
                  delete t['outputs'],
                  delete t['selected'],
                  t
                );
              });
            return { blocks: e, links: this.links, container: this.container };
          },
          updateScene: function() {
            this.$emit('update:scene', this.exportScene());
          },
        },
        watch: {
          blocksContent: function() {
            this.importBlocksContent();
          },
          scene: function() {
            this.importScene();
          },
        },
      },
      _ = E,
      Y = (n('477d'), Object(k['a'])(_, a, c, !1, null, 'cd11bc44', null)),
      I = Y.exports,
      X = function() {
        const t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          'div',
          { staticClass: 'blocks-properties' },
          [
            t._l(t.properties, function(e) {
              return n('div', { staticClass: 'property' }, [
                n('label', { attrs: { for: e.name } }, [
                  t._v(t._s(e.label || e.name) + ':'),
                ]),
                n('br'),
                n('input', {
                  directives: [
                    {
                      name: 'model',
                      rawName: 'v-model',
                      value: e.value,
                      expression: 'p.value',
                    },
                  ],
                  attrs: { type: 'text' },
                  domProps: { value: e.value },
                  on: {
                    input: function(n) {
                      n.target.composing || t.$set(e, 'value', n.target.value);
                    },
                  },
                }),
              ]);
            }),
            n(
              'button',
              {
                on: {
                  click: function(e) {
                    return e.preventDefault(), t.save(e);
                  },
                },
              },
              [t._v('Save')]
            ),
          ],
          2
        );
      },
      P = [],
      $ = {
        name: 'VueBlockProperty',
        props: ['property'],
        data: function() {
          return { properties: [] };
        },
        methods: {
          loadProperties: function() {
            this.properties = this.property;
          },
          save: function() {
            this.$emit('save', this.properties);
          },
        },
        watch: {
          property: function() {
            this.loadProperties();
          },
        },
      },
      L = $,
      O = (n('0361'), Object(k['a'])(L, X, P, !1, null, 'd11cfc5a', null)),
      T = O.exports,
      A = {
        name: 'App',
        components: { VueBlocksContainer: I, VueBlockProperty: T },
        data: function() {
          return {
            blocks: [
              {
                name: 'text',
                title: 'Text',
                family: 'Animations',
                description: 'Show text',
                fields: [
                  {
                    name: 'text',
                    label: 'Text',
                    type: 'string',
                    attr: 'property',
                  },
                  {
                    name: 'delay',
                    label: 'Delay (s)',
                    type: 'number',
                    attr: 'property',
                  },
                  { name: 'Show', type: 'event', attr: 'input' },
                  { name: 'Hide', type: 'event', attr: 'input' },
                  { name: 'onShow', type: 'event', attr: 'output' },
                  { name: 'onHide', type: 'event', attr: 'output' },
                ],
              },
              {
                name: 'animation',
                title: 'Animation',
                family: 'Animations',
                description: 'Show animation',
                fields: [
                  {
                    name: 'animation',
                    label: 'Animation',
                    type: 'animation',
                    attr: 'property',
                  },
                  { name: 'Play', type: 'event', attr: 'input' },
                  { name: 'Stop', type: 'event', attr: 'input' },
                  { name: 'onEnd', type: 'event', attr: 'output' },
                ],
              },
              {
                name: 'Chat message',
                family: 'Events',
                description: '',
                fields: [
                  {
                    name: 'message',
                    label: 'Activation message',
                    type: 'string',
                    attr: 'property',
                  },
                  { name: 'onMessage', type: 'event', attr: 'output' },
                ],
              },
              {
                name: 'delay',
                title: 'Delay',
                family: 'Time',
                description: '',
                fields: [
                  {
                    name: 'delay',
                    label: 'Delay (s)',
                    type: 'number',
                    attr: 'property',
                    value: 1,
                  },
                  { name: 'input', type: 'event', attr: 'input' },
                  { name: 'output', type: 'event', attr: 'output' },
                ],
              },
              {
                name: 'shortcuts',
                title: 'Shortcuts',
                family: 'Events',
                description: 'Press shortcut for call event',
                fields: [
                  {
                    name: 'keys',
                    label: 'Activation keys',
                    type: 'keys',
                    attr: 'property',
                  },
                  { name: 'onPress', type: 'event', attr: 'output' },
                ],
              },
              {
                name: 'splitter',
                title: 'Splitter',
                family: 'Helpers',
                description: 'Press shortcut for call event',
                fields: [
                  { name: 'input', type: 'event', attr: 'input' },
                  { name: 'output', type: 'event', attr: 'output' },
                  { name: 'output', type: 'event', attr: 'output' },
                  { name: 'output', type: 'event', attr: 'output' },
                  { name: 'output', type: 'event', attr: 'output' },
                ],
              },
            ],
            scene: {
              blocks: [
                {
                  id: 2,
                  x: -700,
                  y: -69,
                  name: 'Chat message',
                  title: 'Chat message',
                  values: { property: [{ name: 'message', type: 'string' }] },
                },
                {
                  id: 4,
                  x: -157,
                  y: -68.5,
                  name: 'text',
                  title: 'Text',
                  values: {
                    property: { text: { label: 'Text', type: 'string' } },
                  },
                },
                {
                  id: 5,
                  x: 136,
                  y: -48.5,
                  name: 'text',
                  title: 'Text',
                  values: {
                    property: { text: { label: 'Text', type: 'string' } },
                  },
                },
                {
                  id: 6,
                  x: -440,
                  y: -15.5,
                  name: 'delay',
                  title: 'Delay',
                  values: {
                    property: {
                      delay: { label: 'Delay (s)', type: 'number', value: 1 },
                    },
                  },
                },
                {
                  id: 7,
                  x: -694,
                  y: 60.5,
                  name: 'shortcuts',
                  title: 'Shortcuts',
                  values: {
                    property: {
                      keys: { label: 'Activation keys', type: 'keys' },
                    },
                  },
                },
                {
                  id: 8,
                  x: -163,
                  y: 59.5,
                  name: 'text',
                  title: 'Text',
                  values: {
                    property: { text: { label: 'Text', type: 'string' } },
                  },
                },
                {
                  id: 9,
                  x: -429,
                  y: 125.5,
                  name: 'delay',
                  title: 'Delay',
                  values: {
                    property: {
                      delay: { label: 'Delay (s)', type: 'number', value: 1 },
                    },
                  },
                },
                {
                  id: 10,
                  x: 126,
                  y: 127.5,
                  name: 'text',
                  title: 'Text',
                  values: {
                    property: { text: { label: 'Text', type: 'string' } },
                  },
                },
                {
                  id: 11,
                  x: -856,
                  y: 252.5,
                  name: 'shortcuts',
                  title: 'Shortcuts',
                  values: {
                    property: {
                      keys: { label: 'Activation keys', type: 'keys' },
                    },
                  },
                },
                {
                  id: 12,
                  x: -616,
                  y: 319.5,
                  name: 'delay',
                  title: 'Delay',
                  values: {
                    property: {
                      delay: { label: 'Delay (s)', type: 'number', value: 1 },
                    },
                  },
                },
                {
                  id: 13,
                  x: -381,
                  y: 252.5,
                  name: 'text',
                  title: 'Text',
                  values: {
                    property: { text: { label: 'Text', type: 'string' } },
                  },
                },
                {
                  id: 14,
                  x: 166,
                  y: 266.5,
                  name: 'text',
                  title: 'Text',
                  values: {
                    property: { text: { label: 'Text', type: 'string' } },
                  },
                },
                {
                  id: 15,
                  x: -149,
                  y: 269.5,
                  name: 'delay',
                  title: 'Delay',
                  values: {
                    property: {
                      delay: { label: 'Delay (s)', type: 'number', value: 1 },
                    },
                  },
                },
                {
                  id: 16,
                  x: 413,
                  y: 267.5,
                  name: 'animation',
                  title: 'Animation',
                  values: {
                    property: {
                      animation: { label: 'Animation', type: 'animation' },
                    },
                  },
                },
                {
                  id: 17,
                  x: 13,
                  y: 380.5,
                  name: 'delay',
                  title: 'Delay',
                  values: {
                    property: {
                      delay: { label: 'Delay (s)', type: 'number', value: 1 },
                    },
                  },
                },
              ],
              links: [
                {
                  id: 3,
                  originID: 2,
                  originSlot: 0,
                  targetID: 4,
                  targetSlot: 0,
                },
                {
                  id: 6,
                  originID: 7,
                  originSlot: 0,
                  targetID: 8,
                  targetSlot: 0,
                },
                {
                  id: 7,
                  originID: 7,
                  originSlot: 0,
                  targetID: 9,
                  targetSlot: 0,
                },
                {
                  id: 8,
                  originID: 9,
                  originSlot: 0,
                  targetID: 10,
                  targetSlot: 0,
                },
                {
                  id: 9,
                  originID: 9,
                  originSlot: 0,
                  targetID: 8,
                  targetSlot: 1,
                },
                {
                  id: 10,
                  originID: 2,
                  originSlot: 0,
                  targetID: 6,
                  targetSlot: 0,
                },
                {
                  id: 11,
                  originID: 6,
                  originSlot: 0,
                  targetID: 4,
                  targetSlot: 1,
                },
                {
                  id: 12,
                  originID: 4,
                  originSlot: 1,
                  targetID: 5,
                  targetSlot: 0,
                },
                {
                  id: 13,
                  originID: 11,
                  originSlot: 0,
                  targetID: 13,
                  targetSlot: 0,
                },
                {
                  id: 14,
                  originID: 11,
                  originSlot: 0,
                  targetID: 12,
                  targetSlot: 0,
                },
                {
                  id: 15,
                  originID: 12,
                  originSlot: 0,
                  targetID: 13,
                  targetSlot: 1,
                },
                {
                  id: 16,
                  originID: 13,
                  originSlot: 1,
                  targetID: 15,
                  targetSlot: 0,
                },
                {
                  id: 17,
                  originID: 15,
                  originSlot: 0,
                  targetID: 14,
                  targetSlot: 0,
                },
                {
                  id: 18,
                  originID: 14,
                  originSlot: 0,
                  targetID: 16,
                  targetSlot: 0,
                },
                {
                  id: 19,
                  originID: 14,
                  originSlot: 1,
                  targetID: 16,
                  targetSlot: 1,
                },
                {
                  id: 20,
                  originID: 15,
                  originSlot: 0,
                  targetID: 17,
                  targetSlot: 0,
                },
                {
                  id: 21,
                  originID: 17,
                  originSlot: 0,
                  targetID: 14,
                  targetSlot: 1,
                },
              ],
              container: { centerX: 1042, centerY: 140, scale: 1 },
            },
            selectedBlock: null,
            selectedType: 'delay',
            useContextMenu: !0,
            contextMenu: { isShow: !1, mouseX: 0, mouseY: 0, top: 0, left: 0 },
          };
        },
        computed: {
          selectedBlockProperty: function() {
            return this.selectedBlock &&
              this.selectedBlock.values &&
              this.selectedBlock.values.property
              ? this.selectedBlock.values.property
              : null;
          },
          selectBlocksType: function() {
            return this.blocks
              .map(function(t) {
                return t.family;
              })
              .filter(function(t, e, n) {
                return n.indexOf(t) === e;
              });
          },
        },
        methods: {
          selectBlock: function(t) {
            console.log('select', t), (this.selectedBlock = t);
          },
          deselectBlock: function(t) {
            console.log('deselect', t), (this.selectedBlock = null);
          },
          filteredBlocks: function(t) {
            return this.blocks.filter(function(e) {
              return e.family === t;
            });
          },
          addBlock: function() {
            console.log(this.selectedType),
              this.$refs.container.addNewBlock(this.selectedType);
          },
          saveProperty: function(t) {
            const e = this;
            console.log(t);
            const n = this.scene,
              i = n.blocks.find(function(t) {
                return t.id === e.selectedBlock.id;
              });
            (i.values.property = t), (this.scene = l()({}, n));
          },
          showContextMenu: function(t) {
            this.useContextMenu &&
              (t.preventDefault && t.preventDefault(),
              (this.contextMenu.isShow = !0),
              (this.contextMenu.mouseX = t.x),
              (this.contextMenu.mouseY = t.y),
              this.$nextTick(function() {
                this.setMenu(t.y, t.x), this.$refs.contextMenu.focus();
              }));
          },
          setMenu: function(t, e) {
            const n = 5,
              i = this.$refs.contextMenu,
              o = this.$refs.container.$el.getBoundingClientRect(),
              s = o.right - i.offsetWidth - n,
              r = o.bottom - i.offsetHeight - n;
            console.log(this.$refs.container),
              console.log(o),
              e > s && (e = s),
              t > r && (t = r),
              (this.contextMenu.top = t),
              (this.contextMenu.left = e);
          },
          addBlockContextMenu: function(t) {
            const e = d.getOffsetRect(this.$refs.container.$el),
              n = this.contextMenu.mouseX - e.left,
              i = this.contextMenu.mouseY - e.top;
            this.$refs.container.addNewBlock(t, n, i), this.closeContextMenu();
          },
          closeContextMenu: function() {
            this.contextMenu.isShow = !1;
          },
        },
        watch: {
          blocks: function(t) {
            console.log('blocks', JSON.stringify(t));
          },
          scene: function(t) {
            console.log('scene', JSON.stringify(t));
          },
        },
      },
      N = A,
      j = (n('7c55'), Object(k['a'])(N, o, s, !1, null, null, null)),
      W = j.exports;
    (i['a'].config.productionTip = !1),
      new i['a']({
        render: function(t) {
          return t(W);
        },
      }).$mount('#app');
  },
  '6bcd': function(t, e, n) {},
  '7c55': function(t, e, n) {
    'use strict';
    const i = n('2395'),
      o = n.n(i);
    o.a;
  },
  d8da: function(t, e, n) {},
});
//# sourceMappingURL=app.76c2ed65.js.map
