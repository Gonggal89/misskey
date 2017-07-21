/*!
 * Misskey v0.0.2147 | MIT Licensed, (c) syuilo 2014-2017
 * https://github.com/syuilo/misskey
 * built by testing-docker-41937946-f013-4f7b-b65e-4fb432eb74fc at Fri Jul 21 2017 17:29:24 GMT+0000 (UTC)
 * hash:09b7a328ecf94c39c3e8, chunkhash:90a4759080fc420efd6d
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 170);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* Riot v3.6.1, @license MIT */
(function (global, factory) {
	 true ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.riot = global.riot || {})));
}(this, (function (exports) { 'use strict';

var __TAGS_CACHE = [];
var __TAG_IMPL = {};
var GLOBAL_MIXIN = '__global_mixin';
var ATTRS_PREFIX = 'riot-';
var REF_DIRECTIVES = ['ref', 'data-ref'];
var IS_DIRECTIVE = 'data-is';
var CONDITIONAL_DIRECTIVE = 'if';
var LOOP_DIRECTIVE = 'each';
var LOOP_NO_REORDER_DIRECTIVE = 'no-reorder';
var SHOW_DIRECTIVE = 'show';
var HIDE_DIRECTIVE = 'hide';
var RIOT_EVENTS_KEY = '__riot-events__';
var T_STRING = 'string';
var T_OBJECT = 'object';
var T_UNDEF  = 'undefined';
var T_FUNCTION = 'function';
var XLINK_NS = 'http://www.w3.org/1999/xlink';
var SVG_NS = 'http://www.w3.org/2000/svg';
var XLINK_REGEX = /^xlink:(\w+)/;
var WIN = typeof window === T_UNDEF ? undefined : window;
var RE_SPECIAL_TAGS = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?|opt(?:ion|group))$/;
var RE_SPECIAL_TAGS_NO_OPTION = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?)$/;
var RE_EVENTS_PREFIX = /^on/;
var RE_RESERVED_NAMES = /^(?:_(?:item|id|parent)|update|root|(?:un)?mount|mixin|is(?:Mounted|Loop)|tags|refs|parent|opts|trigger|o(?:n|ff|ne))$/;
var RE_HTML_ATTRS = /([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g;
var CASE_SENSITIVE_ATTRIBUTES = { 'viewbox': 'viewBox' };
var RE_BOOL_ATTRS = /^(?:disabled|checked|readonly|required|allowfullscreen|auto(?:focus|play)|compact|controls|default|formnovalidate|hidden|ismap|itemscope|loop|multiple|muted|no(?:resize|shade|validate|wrap)?|open|reversed|seamless|selected|sortable|truespeed|typemustmatch)$/;
var IE_VERSION = (WIN && WIN.document || {}).documentMode | 0;

/**
 * Check Check if the passed argument is undefined
 * @param   { String } value -
 * @returns { Boolean } -
 */
function isBoolAttr(value) {
  return RE_BOOL_ATTRS.test(value)
}

/**
 * Check if passed argument is a function
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isFunction(value) {
  return typeof value === T_FUNCTION
}

/**
 * Check if passed argument is an object, exclude null
 * NOTE: use isObject(x) && !isArray(x) to excludes arrays.
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isObject(value) {
  return value && typeof value === T_OBJECT // typeof null is 'object'
}

/**
 * Check if passed argument is undefined
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isUndefined(value) {
  return typeof value === T_UNDEF
}

/**
 * Check if passed argument is a string
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isString(value) {
  return typeof value === T_STRING
}

/**
 * Check if passed argument is empty. Different from falsy, because we dont consider 0 or false to be blank
 * @param { * } value -
 * @returns { Boolean } -
 */
function isBlank(value) {
  return isUndefined(value) || value === null || value === ''
}

/**
 * Check if passed argument is a kind of array
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isArray(value) {
  return Array.isArray(value) || value instanceof Array
}

/**
 * Check whether object's property could be overridden
 * @param   { Object }  obj - source object
 * @param   { String }  key - object property
 * @returns { Boolean } -
 */
function isWritable(obj, key) {
  var descriptor = Object.getOwnPropertyDescriptor(obj, key);
  return isUndefined(obj[key]) || descriptor && descriptor.writable
}

/**
 * Check if passed argument is a reserved name
 * @param   { String } value -
 * @returns { Boolean } -
 */
function isReservedName(value) {
  return RE_RESERVED_NAMES.test(value)
}

var check = Object.freeze({
	isBoolAttr: isBoolAttr,
	isFunction: isFunction,
	isObject: isObject,
	isUndefined: isUndefined,
	isString: isString,
	isBlank: isBlank,
	isArray: isArray,
	isWritable: isWritable,
	isReservedName: isReservedName
});

/**
 * Shorter and fast way to select multiple nodes in the DOM
 * @param   { String } selector - DOM selector
 * @param   { Object } ctx - DOM node where the targets of our search will is located
 * @returns { Object } dom nodes found
 */
function $$(selector, ctx) {
  return Array.prototype.slice.call((ctx || document).querySelectorAll(selector))
}

/**
 * Shorter and fast way to select a single node in the DOM
 * @param   { String } selector - unique dom selector
 * @param   { Object } ctx - DOM node where the target of our search will is located
 * @returns { Object } dom node found
 */
function $(selector, ctx) {
  return (ctx || document).querySelector(selector)
}

/**
 * Create a document fragment
 * @returns { Object } document fragment
 */
function createFrag() {
  return document.createDocumentFragment()
}

/**
 * Create a document text node
 * @returns { Object } create a text node to use as placeholder
 */
function createDOMPlaceholder() {
  return document.createTextNode('')
}

/**
 * Check if a DOM node is an svg tag
 * @param   { HTMLElement }  el - node we want to test
 * @returns {Boolean} true if it's an svg node
 */
function isSvg(el) {
  return !!el.ownerSVGElement
}

/**
 * Create a generic DOM node
 * @param   { String } name - name of the DOM node we want to create
 * @param   { Boolean } isSvg - true if we need to use an svg node
 * @returns { Object } DOM node just created
 */
function mkEl(name) {
  return name === 'svg' ? document.createElementNS(SVG_NS, name) : document.createElement(name)
}

/**
 * Set the inner html of any DOM node SVGs included
 * @param { Object } container - DOM node where we'll inject new html
 * @param { String } html - html to inject
 */
/* istanbul ignore next */
function setInnerHTML(container, html) {
  if (!isUndefined(container.innerHTML))
    { container.innerHTML = html; }
    // some browsers do not support innerHTML on the SVGs tags
  else {
    var doc = new DOMParser().parseFromString(html, 'application/xml');
    var node = container.ownerDocument.importNode(doc.documentElement, true);
    container.appendChild(node);
  }
}

/**
 * Toggle the visibility of any DOM node
 * @param   { Object }  dom - DOM node we want to hide
 * @param   { Boolean } show - do we want to show it?
 */

function toggleVisibility(dom, show) {
  dom.style.display = show ? '' : 'none';
  dom['hidden'] = show ? false : true;
}

/**
 * Remove any DOM attribute from a node
 * @param   { Object } dom - DOM node we want to update
 * @param   { String } name - name of the property we want to remove
 */
function remAttr(dom, name) {
  dom.removeAttribute(name);
}

/**
 * Convert a style object to a string
 * @param   { Object } style - style object we need to parse
 * @returns { String } resulting css string
 * @example
 * styleObjectToString({ color: 'red', height: '10px'}) // => 'color: red; height: 10px'
 */
function styleObjectToString(style) {
  return Object.keys(style).reduce(function (acc, prop) {
    return (acc + " " + prop + ": " + (style[prop]) + ";")
  }, '')
}

/**
 * Get the value of any DOM attribute on a node
 * @param   { Object } dom - DOM node we want to parse
 * @param   { String } name - name of the attribute we want to get
 * @returns { String | undefined } name of the node attribute whether it exists
 */
function getAttr(dom, name) {
  return dom.getAttribute(name)
}

/**
 * Set any DOM attribute
 * @param { Object } dom - DOM node we want to update
 * @param { String } name - name of the property we want to set
 * @param { String } val - value of the property we want to set
 */
function setAttr(dom, name, val) {
  var xlink = XLINK_REGEX.exec(name);
  if (xlink && xlink[1])
    { dom.setAttributeNS(XLINK_NS, xlink[1], val); }
  else
    { dom.setAttribute(name, val); }
}

/**
 * Insert safely a tag to fix #1962 #1649
 * @param   { HTMLElement } root - children container
 * @param   { HTMLElement } curr - node to insert
 * @param   { HTMLElement } next - node that should preceed the current node inserted
 */
function safeInsert(root, curr, next) {
  root.insertBefore(curr, next.parentNode && next);
}

/**
 * Minimize risk: only zero or one _space_ between attr & value
 * @param   { String }   html - html string we want to parse
 * @param   { Function } fn - callback function to apply on any attribute found
 */
function walkAttrs(html, fn) {
  if (!html)
    { return }
  var m;
  while (m = RE_HTML_ATTRS.exec(html))
    { fn(m[1].toLowerCase(), m[2] || m[3] || m[4]); }
}

/**
 * Walk down recursively all the children tags starting dom node
 * @param   { Object }   dom - starting node where we will start the recursion
 * @param   { Function } fn - callback to transform the child node just found
 * @param   { Object }   context - fn can optionally return an object, which is passed to children
 */
function walkNodes(dom, fn, context) {
  if (dom) {
    var res = fn(dom, context);
    var next;
    // stop the recursion
    if (res === false) { return }

    dom = dom.firstChild;

    while (dom) {
      next = dom.nextSibling;
      walkNodes(dom, fn, res);
      dom = next;
    }
  }
}

var dom = Object.freeze({
	$$: $$,
	$: $,
	createFrag: createFrag,
	createDOMPlaceholder: createDOMPlaceholder,
	isSvg: isSvg,
	mkEl: mkEl,
	setInnerHTML: setInnerHTML,
	toggleVisibility: toggleVisibility,
	remAttr: remAttr,
	styleObjectToString: styleObjectToString,
	getAttr: getAttr,
	setAttr: setAttr,
	safeInsert: safeInsert,
	walkAttrs: walkAttrs,
	walkNodes: walkNodes
});

var styleNode;
var cssTextProp;
var byName = {};
var remainder = [];
var needsInject = false;

// skip the following code on the server
if (WIN) {
  styleNode = (function () {
    // create a new style element with the correct type
    var newNode = mkEl('style');
    setAttr(newNode, 'type', 'text/css');

    // replace any user node or insert the new one into the head
    var userNode = $('style[type=riot]');
    /* istanbul ignore next */
    if (userNode) {
      if (userNode.id) { newNode.id = userNode.id; }
      userNode.parentNode.replaceChild(newNode, userNode);
    }
    else { document.getElementsByTagName('head')[0].appendChild(newNode); }

    return newNode
  })();
  cssTextProp = styleNode.styleSheet;
}

/**
 * Object that will be used to inject and manage the css of every tag instance
 */
var styleManager = {
  styleNode: styleNode,
  /**
   * Save a tag style to be later injected into DOM
   * @param { String } css - css string
   * @param { String } name - if it's passed we will map the css to a tagname
   */
  add: function add(css, name) {
    if (name) { byName[name] = css; }
    else { remainder.push(css); }
    needsInject = true;
  },
  /**
   * Inject all previously saved tag styles into DOM
   * innerHTML seems slow: http://jsperf.com/riot-insert-style
   */
  inject: function inject() {
    if (!WIN || !needsInject) { return }
    needsInject = false;
    var style = Object.keys(byName)
      .map(function(k) { return byName[k] })
      .concat(remainder).join('\n');
    /* istanbul ignore next */
    if (cssTextProp) { cssTextProp.cssText = style; }
    else { styleNode.innerHTML = style; }
  }
};

/**
 * The riot template engine
 * @version v3.0.8
 */

var skipRegex = (function () { //eslint-disable-line no-unused-vars

  var beforeReChars = '[{(,;:?=|&!^~>%*/';

  var beforeReWords = [
    'case',
    'default',
    'do',
    'else',
    'in',
    'instanceof',
    'prefix',
    'return',
    'typeof',
    'void',
    'yield'
  ];

  var wordsLastChar = beforeReWords.reduce(function (s, w) {
    return s + w.slice(-1)
  }, '');

  var RE_REGEX = /^\/(?=[^*>/])[^[/\\]*(?:(?:\\.|\[(?:\\.|[^\]\\]*)*\])[^[\\/]*)*?\/[gimuy]*/;
  var RE_VN_CHAR = /[$\w]/;

  function prev (code, pos) {
    while (--pos >= 0 && /\s/.test(code[pos])){  }
    return pos
  }

  function _skipRegex (code, start) {

    var re = /.*/g;
    var pos = re.lastIndex = start++;
    var match = re.exec(code)[0].match(RE_REGEX);

    if (match) {
      var next = pos + match[0].length;

      pos = prev(code, pos);
      var c = code[pos];

      if (pos < 0 || ~beforeReChars.indexOf(c)) {
        return next
      }

      if (c === '.') {

        if (code[pos - 1] === '.') {
          start = next;
        }

      } else if (c === '+' || c === '-') {

        if (code[--pos] !== c ||
            (pos = prev(code, pos)) < 0 ||
            !RE_VN_CHAR.test(code[pos])) {
          start = next;
        }

      } else if (~wordsLastChar.indexOf(c)) {

        var end = pos + 1;

        while (--pos >= 0 && RE_VN_CHAR.test(code[pos])){  }
        if (~beforeReWords.indexOf(code.slice(pos + 1, end))) {
          start = next;
        }
      }
    }

    return start
  }

  return _skipRegex

})();

/**
 * riot.util.brackets
 *
 * - `brackets    ` - Returns a string or regex based on its parameter
 * - `brackets.set` - Change the current riot brackets
 *
 * @module
 */

/* global riot */

/* istanbul ignore next */
var brackets = (function (UNDEF) {

  var
    REGLOB = 'g',

    R_MLCOMMS = /\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\//g,

    R_STRINGS = /"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'|`[^`\\]*(?:\\[\S\s][^`\\]*)*`/g,

    S_QBLOCKS = R_STRINGS.source + '|' +
      /(?:\breturn\s+|(?:[$\w\)\]]|\+\+|--)\s*(\/)(?![*\/]))/.source + '|' +
      /\/(?=[^*\/])[^[\/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[\/\\]*)*?([^<]\/)[gim]*/.source,

    UNSUPPORTED = RegExp('[\\' + 'x00-\\x1F<>a-zA-Z0-9\'",;\\\\]'),

    NEED_ESCAPE = /(?=[[\]()*+?.^$|])/g,

    S_QBLOCK2 = R_STRINGS.source + '|' + /(\/)(?![*\/])/.source,

    FINDBRACES = {
      '(': RegExp('([()])|'   + S_QBLOCK2, REGLOB),
      '[': RegExp('([[\\]])|' + S_QBLOCK2, REGLOB),
      '{': RegExp('([{}])|'   + S_QBLOCK2, REGLOB)
    },

    DEFAULT = '{ }';

  var _pairs = [
    '{', '}',
    '{', '}',
    /{[^}]*}/,
    /\\([{}])/g,
    /\\({)|{/g,
    RegExp('\\\\(})|([[({])|(})|' + S_QBLOCK2, REGLOB),
    DEFAULT,
    /^\s*{\^?\s*([$\w]+)(?:\s*,\s*(\S+))?\s+in\s+(\S.*)\s*}/,
    /(^|[^\\]){=[\S\s]*?}/
  ];

  var
    cachedBrackets = UNDEF,
    _regex,
    _cache = [],
    _settings;

  function _loopback (re) { return re }

  function _rewrite (re, bp) {
    if (!bp) { bp = _cache; }
    return new RegExp(
      re.source.replace(/{/g, bp[2]).replace(/}/g, bp[3]), re.global ? REGLOB : ''
    )
  }

  function _create (pair) {
    if (pair === DEFAULT) { return _pairs }

    var arr = pair.split(' ');

    if (arr.length !== 2 || UNSUPPORTED.test(pair)) {
      throw new Error('Unsupported brackets "' + pair + '"')
    }
    arr = arr.concat(pair.replace(NEED_ESCAPE, '\\').split(' '));

    arr[4] = _rewrite(arr[1].length > 1 ? /{[\S\s]*?}/ : _pairs[4], arr);
    arr[5] = _rewrite(pair.length > 3 ? /\\({|})/g : _pairs[5], arr);
    arr[6] = _rewrite(_pairs[6], arr);
    arr[7] = RegExp('\\\\(' + arr[3] + ')|([[({])|(' + arr[3] + ')|' + S_QBLOCK2, REGLOB);
    arr[8] = pair;
    return arr
  }

  function _brackets (reOrIdx) {
    return reOrIdx instanceof RegExp ? _regex(reOrIdx) : _cache[reOrIdx]
  }

  _brackets.split = function split (str, tmpl, _bp) {
    // istanbul ignore next: _bp is for the compiler
    if (!_bp) { _bp = _cache; }

    var
      parts = [],
      match,
      isexpr,
      start,
      pos,
      re = _bp[6];

    var qblocks = [];
    var prevStr = '';
    var mark, lastIndex;

    isexpr = start = re.lastIndex = 0;

    while ((match = re.exec(str))) {

      lastIndex = re.lastIndex;
      pos = match.index;

      if (isexpr) {

        if (match[2]) {

          var ch = match[2];
          var rech = FINDBRACES[ch];
          var ix = 1;

          rech.lastIndex = lastIndex;
          while ((match = rech.exec(str))) {
            if (match[1]) {
              if (match[1] === ch) { ++ix; }
              else if (!--ix) { break }
            } else {
              rech.lastIndex = pushQBlock(match.index, rech.lastIndex, match[2]);
            }
          }
          re.lastIndex = ix ? str.length : rech.lastIndex;
          continue
        }

        if (!match[3]) {
          re.lastIndex = pushQBlock(pos, lastIndex, match[4]);
          continue
        }
      }

      if (!match[1]) {
        unescapeStr(str.slice(start, pos));
        start = re.lastIndex;
        re = _bp[6 + (isexpr ^= 1)];
        re.lastIndex = start;
      }
    }

    if (str && start < str.length) {
      unescapeStr(str.slice(start));
    }

    parts.qblocks = qblocks;

    return parts

    function unescapeStr (s) {
      if (prevStr) {
        s = prevStr + s;
        prevStr = '';
      }
      if (tmpl || isexpr) {
        parts.push(s && s.replace(_bp[5], '$1'));
      } else {
        parts.push(s);
      }
    }

    function pushQBlock(_pos, _lastIndex, slash) { //eslint-disable-line
      if (slash) {
        _lastIndex = skipRegex(str, _pos);
      }

      if (tmpl && _lastIndex > _pos + 2) {
        mark = '\u2057' + qblocks.length + '~';
        qblocks.push(str.slice(_pos, _lastIndex));
        prevStr += str.slice(start, _pos) + mark;
        start = _lastIndex;
      }
      return _lastIndex
    }
  };

  _brackets.hasExpr = function hasExpr (str) {
    return _cache[4].test(str)
  };

  _brackets.loopKeys = function loopKeys (expr) {
    var m = expr.match(_cache[9]);

    return m
      ? { key: m[1], pos: m[2], val: _cache[0] + m[3].trim() + _cache[1] }
      : { val: expr.trim() }
  };

  _brackets.array = function array (pair) {
    return pair ? _create(pair) : _cache
  };

  function _reset (pair) {
    if ((pair || (pair = DEFAULT)) !== _cache[8]) {
      _cache = _create(pair);
      _regex = pair === DEFAULT ? _loopback : _rewrite;
      _cache[9] = _regex(_pairs[9]);
    }
    cachedBrackets = pair;
  }

  function _setSettings (o) {
    var b;

    o = o || {};
    b = o.brackets;
    Object.defineProperty(o, 'brackets', {
      set: _reset,
      get: function () { return cachedBrackets },
      enumerable: true
    });
    _settings = o;
    _reset(b);
  }

  Object.defineProperty(_brackets, 'settings', {
    set: _setSettings,
    get: function () { return _settings }
  });

  /* istanbul ignore next: in the browser riot is always in the scope */
  _brackets.settings = typeof riot !== 'undefined' && riot.settings || {};
  _brackets.set = _reset;
  _brackets.skipRegex = skipRegex;

  _brackets.R_STRINGS = R_STRINGS;
  _brackets.R_MLCOMMS = R_MLCOMMS;
  _brackets.S_QBLOCKS = S_QBLOCKS;
  _brackets.S_QBLOCK2 = S_QBLOCK2;

  return _brackets

})();

/**
 * @module tmpl
 *
 * tmpl          - Root function, returns the template value, render with data
 * tmpl.hasExpr  - Test the existence of a expression inside a string
 * tmpl.loopKeys - Get the keys for an 'each' loop (used by `_each`)
 */

/* istanbul ignore next */
var tmpl = (function () {

  var _cache = {};

  function _tmpl (str, data) {
    if (!str) { return str }

    return (_cache[str] || (_cache[str] = _create(str))).call(
      data, _logErr.bind({
        data: data,
        tmpl: str
      })
    )
  }

  _tmpl.hasExpr = brackets.hasExpr;

  _tmpl.loopKeys = brackets.loopKeys;

  // istanbul ignore next
  _tmpl.clearCache = function () { _cache = {}; };

  _tmpl.errorHandler = null;

  function _logErr (err, ctx) {

    err.riotData = {
      tagName: ctx && ctx.__ && ctx.__.tagName,
      _riot_id: ctx && ctx._riot_id  //eslint-disable-line camelcase
    };

    if (_tmpl.errorHandler) { _tmpl.errorHandler(err); }
    else if (
      typeof console !== 'undefined' &&
      typeof console.error === 'function'
    ) {
      console.error(err.message);
      console.log('<%s> %s', err.riotData.tagName || 'Unknown tag', this.tmpl); // eslint-disable-line
      console.log(this.data); // eslint-disable-line
    }
  }

  function _create (str) {
    var expr = _getTmpl(str);

    if (expr.slice(0, 11) !== 'try{return ') { expr = 'return ' + expr; }

    return new Function('E', expr + ';')    // eslint-disable-line no-new-func
  }

  var RE_DQUOTE = /\u2057/g;
  var RE_QBMARK = /\u2057(\d+)~/g;

  function _getTmpl (str) {
    var parts = brackets.split(str.replace(RE_DQUOTE, '"'), 1);
    var qstr = parts.qblocks;
    var expr;

    if (parts.length > 2 || parts[0]) {
      var i, j, list = [];

      for (i = j = 0; i < parts.length; ++i) {

        expr = parts[i];

        if (expr && (expr = i & 1

            ? _parseExpr(expr, 1, qstr)

            : '"' + expr
                .replace(/\\/g, '\\\\')
                .replace(/\r\n?|\n/g, '\\n')
                .replace(/"/g, '\\"') +
              '"'

          )) { list[j++] = expr; }

      }

      expr = j < 2 ? list[0]
           : '[' + list.join(',') + '].join("")';

    } else {

      expr = _parseExpr(parts[1], 0, qstr);
    }

    if (qstr.length) {
      expr = expr.replace(RE_QBMARK, function (_, pos) {
        return qstr[pos]
          .replace(/\r/g, '\\r')
          .replace(/\n/g, '\\n')
      });
    }
    return expr
  }

  var RE_CSNAME = /^(?:(-?[_A-Za-z\xA0-\xFF][-\w\xA0-\xFF]*)|\u2057(\d+)~):/;
  var
    RE_BREND = {
      '(': /[()]/g,
      '[': /[[\]]/g,
      '{': /[{}]/g
    };

  function _parseExpr (expr, asText, qstr) {

    expr = expr
      .replace(/\s+/g, ' ').trim()
      .replace(/\ ?([[\({},?\.:])\ ?/g, '$1');

    if (expr) {
      var
        list = [],
        cnt = 0,
        match;

      while (expr &&
            (match = expr.match(RE_CSNAME)) &&
            !match.index
        ) {
        var
          key,
          jsb,
          re = /,|([[{(])|$/g;

        expr = RegExp.rightContext;
        key  = match[2] ? qstr[match[2]].slice(1, -1).trim().replace(/\s+/g, ' ') : match[1];

        while (jsb = (match = re.exec(expr))[1]) { skipBraces(jsb, re); }

        jsb  = expr.slice(0, match.index);
        expr = RegExp.rightContext;

        list[cnt++] = _wrapExpr(jsb, 1, key);
      }

      expr = !cnt ? _wrapExpr(expr, asText)
           : cnt > 1 ? '[' + list.join(',') + '].join(" ").trim()' : list[0];
    }
    return expr

    function skipBraces (ch, re) {
      var
        mm,
        lv = 1,
        ir = RE_BREND[ch];

      ir.lastIndex = re.lastIndex;
      while (mm = ir.exec(expr)) {
        if (mm[0] === ch) { ++lv; }
        else if (!--lv) { break }
      }
      re.lastIndex = lv ? expr.length : ir.lastIndex;
    }
  }

  // istanbul ignore next: not both
  var // eslint-disable-next-line max-len
    JS_CONTEXT = '"in this?this:' + (typeof window !== 'object' ? 'global' : 'window') + ').',
    JS_VARNAME = /[,{][\$\w]+(?=:)|(^ *|[^$\w\.{])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g,
    JS_NOPROPS = /^(?=(\.[$\w]+))\1(?:[^.[(]|$)/;

  function _wrapExpr (expr, asText, key) {
    var tb;

    expr = expr.replace(JS_VARNAME, function (match, p, mvar, pos, s) {
      if (mvar) {
        pos = tb ? 0 : pos + match.length;

        if (mvar !== 'this' && mvar !== 'global' && mvar !== 'window') {
          match = p + '("' + mvar + JS_CONTEXT + mvar;
          if (pos) { tb = (s = s[pos]) === '.' || s === '(' || s === '['; }
        } else if (pos) {
          tb = !JS_NOPROPS.test(s.slice(pos));
        }
      }
      return match
    });

    if (tb) {
      expr = 'try{return ' + expr + '}catch(e){E(e,this)}';
    }

    if (key) {

      expr = (tb
          ? 'function(){' + expr + '}.call(this)' : '(' + expr + ')'
        ) + '?"' + key + '":""';

    } else if (asText) {

      expr = 'function(v){' + (tb
          ? expr.replace('return ', 'v=') : 'v=(' + expr + ')'
        ) + ';return v||v===0?v:""}.call(this)';
    }

    return expr
  }

  _tmpl.version = brackets.version = 'v3.0.8';

  return _tmpl

})();

/* istanbul ignore next */
var observable$1 = function(el) {

  /**
   * Extend the original object or create a new empty one
   * @type { Object }
   */

  el = el || {};

  /**
   * Private variables
   */
  var callbacks = {},
    slice = Array.prototype.slice;

  /**
   * Public Api
   */

  // extend the el object adding the observable methods
  Object.defineProperties(el, {
    /**
     * Listen to the given `event` ands
     * execute the `callback` each time an event is triggered.
     * @param  { String } event - event id
     * @param  { Function } fn - callback function
     * @returns { Object } el
     */
    on: {
      value: function(event, fn) {
        if (typeof fn == 'function')
          { (callbacks[event] = callbacks[event] || []).push(fn); }
        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Removes the given `event` listeners
     * @param   { String } event - event id
     * @param   { Function } fn - callback function
     * @returns { Object } el
     */
    off: {
      value: function(event, fn) {
        if (event == '*' && !fn) { callbacks = {}; }
        else {
          if (fn) {
            var arr = callbacks[event];
            for (var i = 0, cb; cb = arr && arr[i]; ++i) {
              if (cb == fn) { arr.splice(i--, 1); }
            }
          } else { delete callbacks[event]; }
        }
        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Listen to the given `event` and
     * execute the `callback` at most once
     * @param   { String } event - event id
     * @param   { Function } fn - callback function
     * @returns { Object } el
     */
    one: {
      value: function(event, fn) {
        function on() {
          el.off(event, on);
          fn.apply(el, arguments);
        }
        return el.on(event, on)
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Execute all callback functions that listen to
     * the given `event`
     * @param   { String } event - event id
     * @returns { Object } el
     */
    trigger: {
      value: function(event) {
        var arguments$1 = arguments;


        // getting the arguments
        var arglen = arguments.length - 1,
          args = new Array(arglen),
          fns,
          fn,
          i;

        for (i = 0; i < arglen; i++) {
          args[i] = arguments$1[i + 1]; // skip first argument
        }

        fns = slice.call(callbacks[event] || [], 0);

        for (i = 0; fn = fns[i]; ++i) {
          fn.apply(el, args);
        }

        if (callbacks['*'] && event != '*')
          { el.trigger.apply(el, ['*', event].concat(args)); }

        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    }
  });

  return el

};

/**
 * Specialized function for looping an array-like collection with `each={}`
 * @param   { Array } list - collection of items
 * @param   {Function} fn - callback function
 * @returns { Array } the array looped
 */
function each(list, fn) {
  var len = list ? list.length : 0;
  var i = 0;
  for (; i < len; ++i) {
    fn(list[i], i);
  }
  return list
}

/**
 * Check whether an array contains an item
 * @param   { Array } array - target array
 * @param   { * } item - item to test
 * @returns { Boolean } -
 */
function contains(array, item) {
  return array.indexOf(item) !== -1
}

/**
 * Convert a string containing dashes to camel case
 * @param   { String } str - input string
 * @returns { String } my-string -> myString
 */
function toCamel(str) {
  return str.replace(/-(\w)/g, function (_, c) { return c.toUpperCase(); })
}

/**
 * Faster String startsWith alternative
 * @param   { String } str - source string
 * @param   { String } value - test string
 * @returns { Boolean } -
 */
function startsWith(str, value) {
  return str.slice(0, value.length) === value
}

/**
 * Helper function to set an immutable property
 * @param   { Object } el - object where the new property will be set
 * @param   { String } key - object key where the new property will be stored
 * @param   { * } value - value of the new property
 * @param   { Object } options - set the propery overriding the default options
 * @returns { Object } - the initial object
 */
function defineProperty(el, key, value, options) {
  Object.defineProperty(el, key, extend({
    value: value,
    enumerable: false,
    writable: false,
    configurable: true
  }, options));
  return el
}

/**
 * Extend any object with other properties
 * @param   { Object } src - source object
 * @returns { Object } the resulting extended object
 *
 * var obj = { foo: 'baz' }
 * extend(obj, {bar: 'bar', foo: 'bar'})
 * console.log(obj) => {bar: 'bar', foo: 'bar'}
 *
 */
function extend(src) {
  var obj, args = arguments;
  for (var i = 1; i < args.length; ++i) {
    if (obj = args[i]) {
      for (var key in obj) {
        // check if this property of the source object could be overridden
        if (isWritable(src, key))
          { src[key] = obj[key]; }
      }
    }
  }
  return src
}

var misc = Object.freeze({
	each: each,
	contains: contains,
	toCamel: toCamel,
	startsWith: startsWith,
	defineProperty: defineProperty,
	extend: extend
});

var settings$1 = extend(Object.create(brackets.settings), {
  skipAnonymousTags: true,
  // handle the auto updates on any DOM event
  autoUpdate: true
});

/**
 * Trigger DOM events
 * @param   { HTMLElement } dom - dom element target of the event
 * @param   { Function } handler - user function
 * @param   { Object } e - event object
 */
function handleEvent(dom, handler, e) {
  var ptag = this.__.parent,
    item = this.__.item;

  if (!item)
    { while (ptag && !item) {
      item = ptag.__.item;
      ptag = ptag.__.parent;
    } }

  // override the event properties
  /* istanbul ignore next */
  if (isWritable(e, 'currentTarget')) { e.currentTarget = dom; }
  /* istanbul ignore next */
  if (isWritable(e, 'target')) { e.target = e.srcElement; }
  /* istanbul ignore next */
  if (isWritable(e, 'which')) { e.which = e.charCode || e.keyCode; }

  e.item = item;

  handler.call(this, e);

  // avoid auto updates
  if (!settings$1.autoUpdate) { return }

  if (!e.preventUpdate) {
    var p = getImmediateCustomParentTag(this);
    // fixes #2083
    if (p.isMounted) { p.update(); }
  }
}

/**
 * Attach an event to a DOM node
 * @param { String } name - event name
 * @param { Function } handler - event callback
 * @param { Object } dom - dom node
 * @param { Tag } tag - tag instance
 */
function setEventHandler(name, handler, dom, tag) {
  var eventName,
    cb = handleEvent.bind(tag, dom, handler);

  // avoid to bind twice the same event
  // possible fix for #2332
  dom[name] = null;

  // normalize event name
  eventName = name.replace(RE_EVENTS_PREFIX, '');

  // cache the listener into the listeners array
  if (!contains(tag.__.listeners, dom)) { tag.__.listeners.push(dom); }
  if (!dom[RIOT_EVENTS_KEY]) { dom[RIOT_EVENTS_KEY] = {}; }
  if (dom[RIOT_EVENTS_KEY][name]) { dom.removeEventListener(eventName, dom[RIOT_EVENTS_KEY][name]); }

  dom[RIOT_EVENTS_KEY][name] = cb;
  dom.addEventListener(eventName, cb, false);
}

/**
 * Update dynamically created data-is tags with changing expressions
 * @param { Object } expr - expression tag and expression info
 * @param { Tag }    parent - parent for tag creation
 * @param { String } tagName - tag implementation we want to use
 */
function updateDataIs(expr, parent, tagName) {
  var conf, isVirtual, head, ref;

  if (expr.tag && expr.tagName === tagName) {
    expr.tag.update();
    return
  }

  isVirtual = expr.dom.tagName === 'VIRTUAL';
  // sync _parent to accommodate changing tagnames
  if (expr.tag) {
    // need placeholder before unmount
    if(isVirtual) {
      head = expr.tag.__.head;
      ref = createDOMPlaceholder();
      head.parentNode.insertBefore(ref, head);
    }

    expr.tag.unmount(true);
  }

  if (!isString(tagName)) { return }

  expr.impl = __TAG_IMPL[tagName];
  conf = {root: expr.dom, parent: parent, hasImpl: true, tagName: tagName};
  expr.tag = initChildTag(expr.impl, conf, expr.dom.innerHTML, parent);
  each(expr.attrs, function (a) { return setAttr(expr.tag.root, a.name, a.value); });
  expr.tagName = tagName;
  expr.tag.mount();
  if (isVirtual)
    { makeReplaceVirtual(expr.tag, ref || expr.tag.root); } // root exist first time, after use placeholder

  // parent is the placeholder tag, not the dynamic tag so clean up
  parent.__.onUnmount = function() {
    var delName = expr.tag.opts.dataIs,
      tags = expr.tag.parent.tags,
      _tags = expr.tag.__.parent.tags;
    arrayishRemove(tags, delName, expr.tag);
    arrayishRemove(_tags, delName, expr.tag);
    expr.tag.unmount();
  };
}

/**
 * Nomalize any attribute removing the "riot-" prefix
 * @param   { String } attrName - original attribute name
 * @returns { String } valid html attribute name
 */
function normalizeAttrName(attrName) {
  if (!attrName) { return null }
  attrName = attrName.replace(ATTRS_PREFIX, '');
  if (CASE_SENSITIVE_ATTRIBUTES[attrName]) { attrName = CASE_SENSITIVE_ATTRIBUTES[attrName]; }
  return attrName
}

/**
 * Update on single tag expression
 * @this Tag
 * @param { Object } expr - expression logic
 * @returns { undefined }
 */
function updateExpression(expr) {
  if (this.root && getAttr(this.root,'virtualized')) { return }

  var dom = expr.dom,
    // remove the riot- prefix
    attrName = normalizeAttrName(expr.attr),
    isToggle = contains([SHOW_DIRECTIVE, HIDE_DIRECTIVE], attrName),
    isVirtual = expr.root && expr.root.tagName === 'VIRTUAL',
    parent = dom && (expr.parent || dom.parentNode),
    // detect the style attributes
    isStyleAttr = attrName === 'style',
    isClassAttr = attrName === 'class',
    hasValue,
    isObj,
    value;

  // if it's a tag we could totally skip the rest
  if (expr._riot_id) {
    if (expr.isMounted) {
      expr.update();
    // if it hasn't been mounted yet, do that now.
    } else {
      expr.mount();
      if (isVirtual) {
        makeReplaceVirtual(expr, expr.root);
      }
    }
    return
  }
  // if this expression has the update method it means it can handle the DOM changes by itself
  if (expr.update) { return expr.update() }

  // ...it seems to be a simple expression so we try to calculat its value
  value = tmpl(expr.expr, isToggle ? extend({}, Object.create(this.parent), this) : this);
  hasValue = !isBlank(value);
  isObj = isObject(value);

  // convert the style/class objects to strings
  if (isObj) {
    isObj = !isClassAttr && !isStyleAttr;
    if (isClassAttr) {
      value = tmpl(JSON.stringify(value), this);
    } else if (isStyleAttr) {
      value = styleObjectToString(value);
    }
  }

  // remove original attribute
  if (expr.attr && (!expr.isAttrRemoved || !hasValue || value === false)) {
    remAttr(dom, expr.attr);
    expr.isAttrRemoved = true;
  }

  // for the boolean attributes we don't need the value
  // we can convert it to checked=true to checked=checked
  if (expr.bool) { value = value ? attrName : false; }
  if (expr.isRtag) { return updateDataIs(expr, this, value) }
  if (expr.wasParsedOnce && expr.value === value) { return }

  // update the expression value
  expr.value = value;
  expr.wasParsedOnce = true;

  // if the value is an object we can not do much more with it
  if (isObj && !isToggle) { return }
  // avoid to render undefined/null values
  if (isBlank(value)) { value = ''; }

  // textarea and text nodes have no attribute name
  if (!attrName) {
    // about #815 w/o replace: the browser converts the value to a string,
    // the comparison by "==" does too, but not in the server
    value += '';
    // test for parent avoids error with invalid assignment to nodeValue
    if (parent) {
      // cache the parent node because somehow it will become null on IE
      // on the next iteration
      expr.parent = parent;
      if (parent.tagName === 'TEXTAREA') {
        parent.value = value;                    // #1113
        if (!IE_VERSION) { dom.nodeValue = value; }  // #1625 IE throws here, nodeValue
      }                                         // will be available on 'updated'
      else { dom.nodeValue = value; }
    }
    return
  }


  // event handler
  if (isFunction(value)) {
    setEventHandler(attrName, value, dom, this);
  // show / hide
  } else if (isToggle) {
    toggleVisibility(dom, attrName === HIDE_DIRECTIVE ? !value : value);
  // handle attributes
  } else {
    if (expr.bool) {
      dom[attrName] = value;
    }

    if (attrName === 'value' && dom.value !== value) {
      dom.value = value;
    }

    if (hasValue && value !== false) {
      setAttr(dom, attrName, value);
    }

    // make sure that in case of style changes
    // the element stays hidden
    if (isStyleAttr && dom.hidden) { toggleVisibility(dom, false); }
  }
}

/**
 * Update all the expressions in a Tag instance
 * @this Tag
 * @param { Array } expressions - expression that must be re evaluated
 */
function updateAllExpressions(expressions) {
  each(expressions, updateExpression.bind(this));
}

var IfExpr = {
  init: function init(dom, tag, expr) {
    remAttr(dom, CONDITIONAL_DIRECTIVE);
    this.tag = tag;
    this.expr = expr;
    this.stub = createDOMPlaceholder();
    this.pristine = dom;

    var p = dom.parentNode;
    p.insertBefore(this.stub, dom);
    p.removeChild(dom);

    return this
  },
  update: function update() {
    this.value = tmpl(this.expr, this.tag);

    if (this.value && !this.current) { // insert
      this.current = this.pristine.cloneNode(true);
      this.stub.parentNode.insertBefore(this.current, this.stub);
      this.expressions = [];
      parseExpressions.apply(this.tag, [this.current, this.expressions, true]);
    } else if (!this.value && this.current) { // remove
      unmountAll(this.expressions);
      if (this.current._tag) {
        this.current._tag.unmount();
      } else if (this.current.parentNode) {
        this.current.parentNode.removeChild(this.current);
      }
      this.current = null;
      this.expressions = [];
    }

    if (this.value) { updateAllExpressions.call(this.tag, this.expressions); }
  },
  unmount: function unmount() {
    unmountAll(this.expressions || []);
  }
};

var RefExpr = {
  init: function init(dom, parent, attrName, attrValue) {
    this.dom = dom;
    this.attr = attrName;
    this.rawValue = attrValue;
    this.parent = parent;
    this.hasExp = tmpl.hasExpr(attrValue);
    return this
  },
  update: function update() {
    var old = this.value;
    var customParent = this.parent && getImmediateCustomParentTag(this.parent);
    // if the referenced element is a custom tag, then we set the tag itself, rather than DOM
    var tagOrDom = this.dom.__ref || this.tag || this.dom;

    this.value = this.hasExp ? tmpl(this.rawValue, this.parent) : this.rawValue;

    // the name changed, so we need to remove it from the old key (if present)
    if (!isBlank(old) && customParent) { arrayishRemove(customParent.refs, old, tagOrDom); }
    if (!isBlank(this.value) && isString(this.value)) {
      // add it to the refs of parent tag (this behavior was changed >=3.0)
      if (customParent) { arrayishAdd(
        customParent.refs,
        this.value,
        tagOrDom,
        // use an array if it's a looped node and the ref is not an expression
        null,
        this.parent.__.index
      ); }

      if (this.value !== old) {
        setAttr(this.dom, this.attr, this.value);
      }
    } else {
      remAttr(this.dom, this.attr);
    }

    // cache the ref bound to this dom node
    // to reuse it in future (see also #2329)
    if (!this.dom.__ref) { this.dom.__ref = tagOrDom; }
  },
  unmount: function unmount() {
    var tagOrDom = this.tag || this.dom;
    var customParent = this.parent && getImmediateCustomParentTag(this.parent);
    if (!isBlank(this.value) && customParent)
      { arrayishRemove(customParent.refs, this.value, tagOrDom); }
  }
};

/**
 * Convert the item looped into an object used to extend the child tag properties
 * @param   { Object } expr - object containing the keys used to extend the children tags
 * @param   { * } key - value to assign to the new object returned
 * @param   { * } val - value containing the position of the item in the array
 * @param   { Object } base - prototype object for the new item
 * @returns { Object } - new object containing the values of the original item
 *
 * The variables 'key' and 'val' are arbitrary.
 * They depend on the collection type looped (Array, Object)
 * and on the expression used on the each tag
 *
 */
function mkitem(expr, key, val, base) {
  var item = base ? Object.create(base) : {};
  item[expr.key] = key;
  if (expr.pos) { item[expr.pos] = val; }
  return item
}

/**
 * Unmount the redundant tags
 * @param   { Array } items - array containing the current items to loop
 * @param   { Array } tags - array containing all the children tags
 */
function unmountRedundant(items, tags) {
  var i = tags.length,
    j = items.length;

  while (i > j) {
    i--;
    remove.apply(tags[i], [tags, i]);
  }
}


/**
 * Remove a child tag
 * @this Tag
 * @param   { Array } tags - tags collection
 * @param   { Number } i - index of the tag to remove
 */
function remove(tags, i) {
  tags.splice(i, 1);
  this.unmount();
  arrayishRemove(this.parent, this, this.__.tagName, true);
}

/**
 * Move the nested custom tags in non custom loop tags
 * @this Tag
 * @param   { Number } i - current position of the loop tag
 */
function moveNestedTags(i) {
  var this$1 = this;

  each(Object.keys(this.tags), function (tagName) {
    moveChildTag.apply(this$1.tags[tagName], [tagName, i]);
  });
}

/**
 * Move a child tag
 * @this Tag
 * @param   { HTMLElement } root - dom node containing all the loop children
 * @param   { Tag } nextTag - instance of the next tag preceding the one we want to move
 * @param   { Boolean } isVirtual - is it a virtual tag?
 */
function move(root, nextTag, isVirtual) {
  if (isVirtual)
    { moveVirtual.apply(this, [root, nextTag]); }
  else
    { safeInsert(root, this.root, nextTag.root); }
}

/**
 * Insert and mount a child tag
 * @this Tag
 * @param   { HTMLElement } root - dom node containing all the loop children
 * @param   { Tag } nextTag - instance of the next tag preceding the one we want to insert
 * @param   { Boolean } isVirtual - is it a virtual tag?
 */
function insert(root, nextTag, isVirtual) {
  if (isVirtual)
    { makeVirtual.apply(this, [root, nextTag]); }
  else
    { safeInsert(root, this.root, nextTag.root); }
}

/**
 * Append a new tag into the DOM
 * @this Tag
 * @param   { HTMLElement } root - dom node containing all the loop children
 * @param   { Boolean } isVirtual - is it a virtual tag?
 */
function append(root, isVirtual) {
  if (isVirtual)
    { makeVirtual.call(this, root); }
  else
    { root.appendChild(this.root); }
}

/**
 * Manage tags having the 'each'
 * @param   { HTMLElement } dom - DOM node we need to loop
 * @param   { Tag } parent - parent tag instance where the dom node is contained
 * @param   { String } expr - string contained in the 'each' attribute
 * @returns { Object } expression object for this each loop
 */
function _each(dom, parent, expr) {

  // remove the each property from the original tag
  remAttr(dom, LOOP_DIRECTIVE);

  var mustReorder = typeof getAttr(dom, LOOP_NO_REORDER_DIRECTIVE) !== T_STRING || remAttr(dom, LOOP_NO_REORDER_DIRECTIVE),
    tagName = getTagName(dom),
    impl = __TAG_IMPL[tagName],
    parentNode = dom.parentNode,
    placeholder = createDOMPlaceholder(),
    child = getTag(dom),
    ifExpr = getAttr(dom, CONDITIONAL_DIRECTIVE),
    tags = [],
    oldItems = [],
    hasKeys,
    isLoop = true,
    isAnonymous = !__TAG_IMPL[tagName],
    isVirtual = dom.tagName === 'VIRTUAL';

  // parse the each expression
  expr = tmpl.loopKeys(expr);
  expr.isLoop = true;

  if (ifExpr) { remAttr(dom, CONDITIONAL_DIRECTIVE); }

  // insert a marked where the loop tags will be injected
  parentNode.insertBefore(placeholder, dom);
  parentNode.removeChild(dom);

  expr.update = function updateEach() {
    // get the new items collection
    expr.value = tmpl(expr.val, parent);

    var frag = createFrag(),
      items = expr.value,
      isObject$$1 = !isArray(items) && !isString(items),
      root = placeholder.parentNode;

    // if this DOM was removed the update here is useless
    // this condition fixes also a weird async issue on IE in our unit test
    if (!root) { return }

    // object loop. any changes cause full redraw
    if (isObject$$1) {
      hasKeys = items || false;
      items = hasKeys ?
        Object.keys(items).map(function (key) {
          return mkitem(expr, items[key], key)
        }) : [];
    } else {
      hasKeys = false;
    }

    if (ifExpr) {
      items = items.filter(function(item, i) {
        if (expr.key && !isObject$$1)
          { return !!tmpl(ifExpr, mkitem(expr, item, i, parent)) }

        return !!tmpl(ifExpr, extend(Object.create(parent), item))
      });
    }

    // loop all the new items
    each(items, function(item, i) {
      // reorder only if the items are objects
      var
        doReorder = mustReorder && typeof item === T_OBJECT && !hasKeys,
        oldPos = oldItems.indexOf(item),
        isNew = oldPos === -1,
        pos = !isNew && doReorder ? oldPos : i,
        // does a tag exist in this position?
        tag = tags[pos],
        mustAppend = i >= oldItems.length,
        mustCreate =  doReorder && isNew || !doReorder && !tag;

      item = !hasKeys && expr.key ? mkitem(expr, item, i) : item;

      // new tag
      if (mustCreate) {
        tag = new Tag$1(impl, {
          parent: parent,
          isLoop: isLoop,
          isAnonymous: isAnonymous,
          tagName: tagName,
          root: dom.cloneNode(isAnonymous),
          item: item,
          index: i,
        }, dom.innerHTML);

        // mount the tag
        tag.mount();

        if (mustAppend)
          { append.apply(tag, [frag || root, isVirtual]); }
        else
          { insert.apply(tag, [root, tags[i], isVirtual]); }

        if (!mustAppend) { oldItems.splice(i, 0, item); }
        tags.splice(i, 0, tag);
        if (child) { arrayishAdd(parent.tags, tagName, tag, true); }
      } else if (pos !== i && doReorder) {
        // move
        if (contains(items, oldItems[pos])) {
          move.apply(tag, [root, tags[i], isVirtual]);
          // move the old tag instance
          tags.splice(i, 0, tags.splice(pos, 1)[0]);
          // move the old item
          oldItems.splice(i, 0, oldItems.splice(pos, 1)[0]);
        }

        // update the position attribute if it exists
        if (expr.pos) { tag[expr.pos] = i; }

        // if the loop tags are not custom
        // we need to move all their custom tags into the right position
        if (!child && tag.tags) { moveNestedTags.call(tag, i); }
      }

      // cache the original item to use it in the events bound to this node
      // and its children
      tag.__.item = item;
      tag.__.index = i;
      tag.__.parent = parent;

      if (!mustCreate) { tag.update(item); }
    });

    // remove the redundant tags
    unmountRedundant(items, tags);

    // clone the items array
    oldItems = items.slice();

    // this condition is weird u
    root.insertBefore(frag, placeholder);
  };

  expr.unmount = function() {
    each(tags, function(t) { t.unmount(); });
  };

  return expr
}

/**
 * Walk the tag DOM to detect the expressions to evaluate
 * @this Tag
 * @param   { HTMLElement } root - root tag where we will start digging the expressions
 * @param   { Array } expressions - empty array where the expressions will be added
 * @param   { Boolean } mustIncludeRoot - flag to decide whether the root must be parsed as well
 * @returns { Object } an object containing the root noode and the dom tree
 */
function parseExpressions(root, expressions, mustIncludeRoot) {
  var this$1 = this;

  var tree = {parent: {children: expressions}};

  walkNodes(root, function (dom, ctx) {
    var type = dom.nodeType, parent = ctx.parent, attr, expr, tagImpl;
    if (!mustIncludeRoot && dom === root) { return {parent: parent} }

    // text node
    if (type === 3 && dom.parentNode.tagName !== 'STYLE' && tmpl.hasExpr(dom.nodeValue))
      { parent.children.push({dom: dom, expr: dom.nodeValue}); }

    if (type !== 1) { return ctx } // not an element

    var isVirtual = dom.tagName === 'VIRTUAL';

    // loop. each does it's own thing (for now)
    if (attr = getAttr(dom, LOOP_DIRECTIVE)) {
      if(isVirtual) { setAttr(dom, 'loopVirtual', true); } // ignore here, handled in _each
      parent.children.push(_each(dom, this$1, attr));
      return false
    }

    // if-attrs become the new parent. Any following expressions (either on the current
    // element, or below it) become children of this expression.
    if (attr = getAttr(dom, CONDITIONAL_DIRECTIVE)) {
      parent.children.push(Object.create(IfExpr).init(dom, this$1, attr));
      return false
    }

    if (expr = getAttr(dom, IS_DIRECTIVE)) {
      if (tmpl.hasExpr(expr)) {
        parent.children.push({isRtag: true, expr: expr, dom: dom, attrs: [].slice.call(dom.attributes)});
        return false
      }
    }

    // if this is a tag, stop traversing here.
    // we ignore the root, since parseExpressions is called while we're mounting that root
    tagImpl = getTag(dom);
    if(isVirtual) {
      if(getAttr(dom, 'virtualized')) {dom.parentElement.removeChild(dom); } // tag created, remove from dom
      if(!tagImpl && !getAttr(dom, 'virtualized') && !getAttr(dom, 'loopVirtual'))  // ok to create virtual tag
        { tagImpl = { tmpl: dom.outerHTML }; }
    }

    if (tagImpl && (dom !== root || mustIncludeRoot)) {
      if(isVirtual && !getAttr(dom, IS_DIRECTIVE)) { // handled in update
        // can not remove attribute like directives
        // so flag for removal after creation to prevent maximum stack error
        setAttr(dom, 'virtualized', true);

        var tag = new Tag$1({ tmpl: dom.outerHTML },
          {root: dom, parent: this$1},
          dom.innerHTML);
        parent.children.push(tag); // no return, anonymous tag, keep parsing
      } else {
        var conf = {root: dom, parent: this$1, hasImpl: true};
        parent.children.push(initChildTag(tagImpl, conf, dom.innerHTML, this$1));
        return false
      }
    }

    // attribute expressions
    parseAttributes.apply(this$1, [dom, dom.attributes, function(attr, expr) {
      if (!expr) { return }
      parent.children.push(expr);
    }]);

    // whatever the parent is, all child elements get the same parent.
    // If this element had an if-attr, that's the parent for all child elements
    return {parent: parent}
  }, tree);
}

/**
 * Calls `fn` for every attribute on an element. If that attr has an expression,
 * it is also passed to fn.
 * @this Tag
 * @param   { HTMLElement } dom - dom node to parse
 * @param   { Array } attrs - array of attributes
 * @param   { Function } fn - callback to exec on any iteration
 */
function parseAttributes(dom, attrs, fn) {
  var this$1 = this;

  each(attrs, function (attr) {
    if (!attr) { return false }

    var name = attr.name, bool = isBoolAttr(name), expr;

    if (contains(REF_DIRECTIVES, name)) {
      expr =  Object.create(RefExpr).init(dom, this$1, name, attr.value);
    } else if (tmpl.hasExpr(attr.value)) {
      expr = {dom: dom, expr: attr.value, attr: name, bool: bool};
    }

    fn(attr, expr);
  });
}

/*
  Includes hacks needed for the Internet Explorer version 9 and below
  See: http://kangax.github.io/compat-table/es5/#ie8
       http://codeplanet.io/dropping-ie8/
*/

var reHasYield  = /<yield\b/i;
var reYieldAll  = /<yield\s*(?:\/>|>([\S\s]*?)<\/yield\s*>|>)/ig;
var reYieldSrc  = /<yield\s+to=['"]([^'">]*)['"]\s*>([\S\s]*?)<\/yield\s*>/ig;
var reYieldDest = /<yield\s+from=['"]?([-\w]+)['"]?\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/ig;
var rootEls = { tr: 'tbody', th: 'tr', td: 'tr', col: 'colgroup' };
var tblTags = IE_VERSION && IE_VERSION < 10 ? RE_SPECIAL_TAGS : RE_SPECIAL_TAGS_NO_OPTION;
var GENERIC = 'div';
var SVG = 'svg';


/*
  Creates the root element for table or select child elements:
  tr/th/td/thead/tfoot/tbody/caption/col/colgroup/option/optgroup
*/
function specialTags(el, tmpl, tagName) {

  var
    select = tagName[0] === 'o',
    parent = select ? 'select>' : 'table>';

  // trim() is important here, this ensures we don't have artifacts,
  // so we can check if we have only one element inside the parent
  el.innerHTML = '<' + parent + tmpl.trim() + '</' + parent;
  parent = el.firstChild;

  // returns the immediate parent if tr/th/td/col is the only element, if not
  // returns the whole tree, as this can include additional elements
  /* istanbul ignore next */
  if (select) {
    parent.selectedIndex = -1;  // for IE9, compatible w/current riot behavior
  } else {
    // avoids insertion of cointainer inside container (ex: tbody inside tbody)
    var tname = rootEls[tagName];
    if (tname && parent.childElementCount === 1) { parent = $(tname, parent); }
  }
  return parent
}

/*
  Replace the yield tag from any tag template with the innerHTML of the
  original tag in the page
*/
function replaceYield(tmpl, html) {
  // do nothing if no yield
  if (!reHasYield.test(tmpl)) { return tmpl }

  // be careful with #1343 - string on the source having `$1`
  var src = {};

  html = html && html.replace(reYieldSrc, function (_, ref, text) {
    src[ref] = src[ref] || text;   // preserve first definition
    return ''
  }).trim();

  return tmpl
    .replace(reYieldDest, function (_, ref, def) {  // yield with from - to attrs
      return src[ref] || def || ''
    })
    .replace(reYieldAll, function (_, def) {        // yield without any "from"
      return html || def || ''
    })
}

/**
 * Creates a DOM element to wrap the given content. Normally an `DIV`, but can be
 * also a `TABLE`, `SELECT`, `TBODY`, `TR`, or `COLGROUP` element.
 *
 * @param   { String } tmpl  - The template coming from the custom tag definition
 * @param   { String } html - HTML content that comes from the DOM element where you
 *           will mount the tag, mostly the original tag in the page
 * @param   { Boolean } isSvg - true if the root node is an svg
 * @returns { HTMLElement } DOM element with _tmpl_ merged through `YIELD` with the _html_.
 */
function mkdom(tmpl, html, isSvg$$1) {
  var match   = tmpl && tmpl.match(/^\s*<([-\w]+)/),
    tagName = match && match[1].toLowerCase(),
    el = mkEl(isSvg$$1 ? SVG : GENERIC);

  // replace all the yield tags with the tag inner html
  tmpl = replaceYield(tmpl, html);

  /* istanbul ignore next */
  if (tblTags.test(tagName))
    { el = specialTags(el, tmpl, tagName); }
  else
    { setInnerHTML(el, tmpl); }

  return el
}

/**
 * Another way to create a riot tag a bit more es6 friendly
 * @param { HTMLElement } el - tag DOM selector or DOM node/s
 * @param { Object } opts - tag logic
 * @returns { Tag } new riot tag instance
 */
function Tag$2(el, opts) {
  // get the tag properties from the class constructor
  var ref = this;
  var name = ref.name;
  var tmpl = ref.tmpl;
  var css = ref.css;
  var attrs = ref.attrs;
  var onCreate = ref.onCreate;
  // register a new tag and cache the class prototype
  if (!__TAG_IMPL[name]) {
    tag$1(name, tmpl, css, attrs, onCreate);
    // cache the class constructor
    __TAG_IMPL[name].class = this.constructor;
  }

  // mount the tag using the class instance
  mountTo(el, name, opts, this);
  // inject the component css
  if (css) { styleManager.inject(); }

  return this
}

/**
 * Create a new riot tag implementation
 * @param   { String }   name - name/id of the new riot tag
 * @param   { String }   tmpl - tag template
 * @param   { String }   css - custom tag css
 * @param   { String }   attrs - root tag attributes
 * @param   { Function } fn - user function
 * @returns { String } name/id of the tag just created
 */
function tag$1(name, tmpl, css, attrs, fn) {
  if (isFunction(attrs)) {
    fn = attrs;

    if (/^[\w\-]+\s?=/.test(css)) {
      attrs = css;
      css = '';
    } else
      { attrs = ''; }
  }

  if (css) {
    if (isFunction(css))
      { fn = css; }
    else
      { styleManager.add(css); }
  }

  name = name.toLowerCase();
  __TAG_IMPL[name] = { name: name, tmpl: tmpl, attrs: attrs, fn: fn };

  return name
}

/**
 * Create a new riot tag implementation (for use by the compiler)
 * @param   { String }   name - name/id of the new riot tag
 * @param   { String }   tmpl - tag template
 * @param   { String }   css - custom tag css
 * @param   { String }   attrs - root tag attributes
 * @param   { Function } fn - user function
 * @returns { String } name/id of the tag just created
 */
function tag2$1(name, tmpl, css, attrs, fn) {
  if (css) { styleManager.add(css, name); }

  __TAG_IMPL[name] = { name: name, tmpl: tmpl, attrs: attrs, fn: fn };

  return name
}

/**
 * Mount a tag using a specific tag implementation
 * @param   { * } selector - tag DOM selector or DOM node/s
 * @param   { String } tagName - tag implementation name
 * @param   { Object } opts - tag logic
 * @returns { Array } new tags instances
 */
function mount$1(selector, tagName, opts) {
  var tags = [];
  var elem, allTags;

  function pushTagsTo(root) {
    if (root.tagName) {
      var riotTag = getAttr(root, IS_DIRECTIVE), tag;

      // have tagName? force riot-tag to be the same
      if (tagName && riotTag !== tagName) {
        riotTag = tagName;
        setAttr(root, IS_DIRECTIVE, tagName);
      }

      tag = mountTo(root, riotTag || root.tagName.toLowerCase(), opts);

      if (tag)
        { tags.push(tag); }
    } else if (root.length)
      { each(root, pushTagsTo); } // assume nodeList
  }

  // inject styles into DOM
  styleManager.inject();

  if (isObject(tagName)) {
    opts = tagName;
    tagName = 0;
  }

  // crawl the DOM to find the tag
  if (isString(selector)) {
    selector = selector === '*' ?
      // select all registered tags
      // & tags found with the riot-tag attribute set
      allTags = selectTags() :
      // or just the ones named like the selector
      selector + selectTags(selector.split(/, */));

    // make sure to pass always a selector
    // to the querySelectorAll function
    elem = selector ? $$(selector) : [];
  }
  else
    // probably you have passed already a tag or a NodeList
    { elem = selector; }

  // select all the registered and mount them inside their root elements
  if (tagName === '*') {
    // get all custom tags
    tagName = allTags || selectTags();
    // if the root els it's just a single tag
    if (elem.tagName)
      { elem = $$(tagName, elem); }
    else {
      // select all the children for all the different root elements
      var nodeList = [];

      each(elem, function (_el) { return nodeList.push($$(tagName, _el)); });

      elem = nodeList;
    }
    // get rid of the tagName
    tagName = 0;
  }

  pushTagsTo(elem);

  return tags
}

// Create a mixin that could be globally shared across all the tags
var mixins = {};
var globals = mixins[GLOBAL_MIXIN] = {};
var mixins_id = 0;

/**
 * Create/Return a mixin by its name
 * @param   { String }  name - mixin name (global mixin if object)
 * @param   { Object }  mix - mixin logic
 * @param   { Boolean } g - is global?
 * @returns { Object }  the mixin logic
 */
function mixin$1(name, mix, g) {
  // Unnamed global
  if (isObject(name)) {
    mixin$1(("__" + (mixins_id++) + "__"), name, true);
    return
  }

  var store = g ? globals : mixins;

  // Getter
  if (!mix) {
    if (isUndefined(store[name]))
      { throw new Error(("Unregistered mixin: " + name)) }

    return store[name]
  }

  // Setter
  store[name] = isFunction(mix) ?
    extend(mix.prototype, store[name] || {}) && mix :
    extend(store[name] || {}, mix);
}

/**
 * Update all the tags instances created
 * @returns { Array } all the tags instances
 */
function update$1() {
  return each(__TAGS_CACHE, function (tag) { return tag.update(); })
}

function unregister$1(name) {
  __TAG_IMPL[name] = null;
}

var version$1 = 'v3.6.1';


var core = Object.freeze({
	Tag: Tag$2,
	tag: tag$1,
	tag2: tag2$1,
	mount: mount$1,
	mixin: mixin$1,
	update: update$1,
	unregister: unregister$1,
	version: version$1
});

// counter to give a unique id to all the Tag instances
var __uid = 0;

/**
 * We need to update opts for this tag. That requires updating the expressions
 * in any attributes on the tag, and then copying the result onto opts.
 * @this Tag
 * @param   {Boolean} isLoop - is it a loop tag?
 * @param   { Tag }  parent - parent tag node
 * @param   { Boolean }  isAnonymous - is it a tag without any impl? (a tag not registered)
 * @param   { Object }  opts - tag options
 * @param   { Array }  instAttrs - tag attributes array
 */
function updateOpts(isLoop, parent, isAnonymous, opts, instAttrs) {
  // isAnonymous `each` tags treat `dom` and `root` differently. In this case
  // (and only this case) we don't need to do updateOpts, because the regular parse
  // will update those attrs. Plus, isAnonymous tags don't need opts anyway
  if (isLoop && isAnonymous) { return }

  var ctx = !isAnonymous && isLoop ? this : parent || this;
  each(instAttrs, function (attr) {
    if (attr.expr) { updateAllExpressions.call(ctx, [attr.expr]); }
    // normalize the attribute names
    opts[toCamel(attr.name).replace(ATTRS_PREFIX, '')] = attr.expr ? attr.expr.value : attr.value;
  });
}


/**
 * Tag class
 * @constructor
 * @param { Object } impl - it contains the tag template, and logic
 * @param { Object } conf - tag options
 * @param { String } innerHTML - html that eventually we need to inject in the tag
 */
function Tag$1(impl, conf, innerHTML) {
  if ( impl === void 0 ) impl = {};
  if ( conf === void 0 ) conf = {};

  var opts = extend({}, conf.opts),
    parent = conf.parent,
    isLoop = conf.isLoop,
    isAnonymous = !!conf.isAnonymous,
    skipAnonymous = settings$1.skipAnonymousTags && isAnonymous,
    item = cleanUpData(conf.item),
    index = conf.index, // available only for the looped nodes
    instAttrs = [], // All attributes on the Tag when it's first parsed
    implAttrs = [], // expressions on this type of Tag
    expressions = [],
    root = conf.root,
    tagName = conf.tagName || getTagName(root),
    isVirtual = tagName === 'virtual',
    isInline = !isVirtual && !impl.tmpl,
    propsInSyncWithParent = [],
    dom;

  // make this tag observable
  if (!skipAnonymous) { observable$1(this); }
  // only call unmount if we have a valid __TAG_IMPL (has name property)
  if (impl.name && root._tag) { root._tag.unmount(true); }

  // not yet mounted
  this.isMounted = false;

  defineProperty(this, '__', {
    isAnonymous: isAnonymous,
    instAttrs: instAttrs,
    innerHTML: innerHTML,
    tagName: tagName,
    index: index,
    isLoop: isLoop,
    isInline: isInline,
    // tags having event listeners
    // it would be better to use weak maps here but we can not introduce breaking changes now
    listeners: [],
    // these vars will be needed only for the virtual tags
    virts: [],
    tail: null,
    head: null,
    parent: null,
    item: null
  });

  // create a unique id to this tag
  // it could be handy to use it also to improve the virtual dom rendering speed
  defineProperty(this, '_riot_id', ++__uid); // base 1 allows test !t._riot_id
  defineProperty(this, 'root', root);
  extend(this, { opts: opts }, item);
  // protect the "tags" and "refs" property from being overridden
  defineProperty(this, 'parent', parent || null);
  defineProperty(this, 'tags', {});
  defineProperty(this, 'refs', {});

  if (isInline || isLoop && isAnonymous) {
    dom = root;
  } else {
    if (!isVirtual) { root.innerHTML = ''; }
    dom = mkdom(impl.tmpl, innerHTML, isSvg(root));
  }

  /**
   * Update the tag expressions and options
   * @param   { * }  data - data we want to use to extend the tag properties
   * @returns { Tag } the current tag instance
   */
  defineProperty(this, 'update', function tagUpdate(data) {
    var nextOpts = {},
      canTrigger = this.isMounted && !skipAnonymous;

    // make sure the data passed will not override
    // the component core methods
    data = cleanUpData(data);
    extend(this, data);
    updateOpts.apply(this, [isLoop, parent, isAnonymous, nextOpts, instAttrs]);

    if (canTrigger && this.isMounted && isFunction(this.shouldUpdate) && !this.shouldUpdate(data, nextOpts)) {
      return this
    }

    // inherit properties from the parent, but only for isAnonymous tags
    if (isLoop && isAnonymous) { inheritFrom.apply(this, [this.parent, propsInSyncWithParent]); }
    extend(opts, nextOpts);
    if (canTrigger) { this.trigger('update', data); }
    updateAllExpressions.call(this, expressions);
    if (canTrigger) { this.trigger('updated'); }

    return this

  }.bind(this));

  /**
   * Add a mixin to this tag
   * @returns { Tag } the current tag instance
   */
  defineProperty(this, 'mixin', function tagMixin() {
    var this$1 = this;

    each(arguments, function (mix) {
      var instance, obj;
      var props = [];

      // properties blacklisted and will not be bound to the tag instance
      var propsBlacklist = ['init', '__proto__'];

      mix = isString(mix) ? mixin$1(mix) : mix;

      // check if the mixin is a function
      if (isFunction(mix)) {
        // create the new mixin instance
        instance = new mix();
      } else { instance = mix; }

      var proto = Object.getPrototypeOf(instance);

      // build multilevel prototype inheritance chain property list
      do { props = props.concat(Object.getOwnPropertyNames(obj || instance)); }
      while (obj = Object.getPrototypeOf(obj || instance))

      // loop the keys in the function prototype or the all object keys
      each(props, function (key) {
        // bind methods to this
        // allow mixins to override other properties/parent mixins
        if (!contains(propsBlacklist, key)) {
          // check for getters/setters
          var descriptor = Object.getOwnPropertyDescriptor(instance, key) || Object.getOwnPropertyDescriptor(proto, key);
          var hasGetterSetter = descriptor && (descriptor.get || descriptor.set);

          // apply method only if it does not already exist on the instance
          if (!this$1.hasOwnProperty(key) && hasGetterSetter) {
            Object.defineProperty(this$1, key, descriptor);
          } else {
            this$1[key] = isFunction(instance[key]) ?
              instance[key].bind(this$1) :
              instance[key];
          }
        }
      });

      // init method will be called automatically
      if (instance.init)
        { instance.init.bind(this$1)(); }
    });
    return this
  }.bind(this));

  /**
   * Mount the current tag instance
   * @returns { Tag } the current tag instance
   */
  defineProperty(this, 'mount', function tagMount() {
    var this$1 = this;

    root._tag = this; // keep a reference to the tag just created

    // Read all the attrs on this instance. This give us the info we need for updateOpts
    parseAttributes.apply(parent, [root, root.attributes, function (attr, expr) {
      if (!isAnonymous && RefExpr.isPrototypeOf(expr)) { expr.tag = this$1; }
      attr.expr = expr;
      instAttrs.push(attr);
    }]);

    // update the root adding custom attributes coming from the compiler
    implAttrs = [];
    walkAttrs(impl.attrs, function (k, v) { implAttrs.push({name: k, value: v}); });
    parseAttributes.apply(this, [root, implAttrs, function (attr, expr) {
      if (expr) { expressions.push(expr); }
      else { setAttr(root, attr.name, attr.value); }
    }]);

    // initialiation
    updateOpts.apply(this, [isLoop, parent, isAnonymous, opts, instAttrs]);

    // add global mixins
    var globalMixin = mixin$1(GLOBAL_MIXIN);

    if (globalMixin && !skipAnonymous) {
      for (var i in globalMixin) {
        if (globalMixin.hasOwnProperty(i)) {
          this$1.mixin(globalMixin[i]);
        }
      }
    }

    if (impl.fn) { impl.fn.call(this, opts); }

    if (!skipAnonymous) { this.trigger('before-mount'); }

    // parse layout after init. fn may calculate args for nested custom tags
    parseExpressions.apply(this, [dom, expressions, isAnonymous]);

    this.update(item);

    if (!isAnonymous && !isInline) {
      while (dom.firstChild) { root.appendChild(dom.firstChild); }
    }

    defineProperty(this, 'root', root);
    defineProperty(this, 'isMounted', true);

    if (skipAnonymous) { return }

    // if it's not a child tag we can trigger its mount event
    if (!this.parent) {
      this.trigger('mount');
    }
    // otherwise we need to wait that the parent "mount" or "updated" event gets triggered
    else {
      var p = getImmediateCustomParentTag(this.parent);
      p.one(!p.isMounted ? 'mount' : 'updated', function () {
        this$1.trigger('mount');
      });
    }

    return this

  }.bind(this));

  /**
   * Unmount the tag instance
   * @param { Boolean } mustKeepRoot - if it's true the root node will not be removed
   * @returns { Tag } the current tag instance
   */
  defineProperty(this, 'unmount', function tagUnmount(mustKeepRoot) {
    var this$1 = this;

    var el = this.root,
      p = el.parentNode,
      ptag,
      tagIndex = __TAGS_CACHE.indexOf(this);

    if (!skipAnonymous) { this.trigger('before-unmount'); }

    // clear all attributes coming from the mounted tag
    walkAttrs(impl.attrs, function (name) {
      if (startsWith(name, ATTRS_PREFIX))
        { name = name.slice(ATTRS_PREFIX.length); }

      remAttr(root, name);
    });

    // remove all the event listeners
    this.__.listeners.forEach(function (dom) {
      Object.keys(dom[RIOT_EVENTS_KEY]).forEach(function (eventName) {
        dom.removeEventListener(eventName, dom[RIOT_EVENTS_KEY][eventName]);
      });
    });

    // remove this tag instance from the global virtualDom variable
    if (tagIndex !== -1)
      { __TAGS_CACHE.splice(tagIndex, 1); }

    if (p || isVirtual) {
      if (parent) {
        ptag = getImmediateCustomParentTag(parent);

        if (isVirtual) {
          Object.keys(this.tags).forEach(function (tagName) {
            arrayishRemove(ptag.tags, tagName, this$1.tags[tagName]);
          });
        } else {
          arrayishRemove(ptag.tags, tagName, this);
          // remove from _parent too
          if(parent !== ptag) {
            arrayishRemove(parent.tags, tagName, this);
          }
        }
      } else {
        // remove the tag contents
        setInnerHTML(el, '');
      }

      if (p && !mustKeepRoot) { p.removeChild(el); }
    }

    if (this.__.virts) {
      each(this.__.virts, function (v) {
        if (v.parentNode) { v.parentNode.removeChild(v); }
      });
    }

    // allow expressions to unmount themselves
    unmountAll(expressions);
    each(instAttrs, function (a) { return a.expr && a.expr.unmount && a.expr.unmount(); });

    // custom internal unmount function to avoid relying on the observable
    if (this.__.onUnmount) { this.__.onUnmount(); }

    if (!skipAnonymous) {
      this.trigger('unmount');
      this.off('*');
    }

    defineProperty(this, 'isMounted', false);

    delete this.root._tag;

    return this

  }.bind(this));
}

/**
 * Detect the tag implementation by a DOM node
 * @param   { Object } dom - DOM node we need to parse to get its tag implementation
 * @returns { Object } it returns an object containing the implementation of a custom tag (template and boot function)
 */
function getTag(dom) {
  return dom.tagName && __TAG_IMPL[getAttr(dom, IS_DIRECTIVE) ||
    getAttr(dom, IS_DIRECTIVE) || dom.tagName.toLowerCase()]
}

/**
 * Inherit properties from a target tag instance
 * @this Tag
 * @param   { Tag } target - tag where we will inherit properties
 * @param   { Array } propsInSyncWithParent - array of properties to sync with the target
 */
function inheritFrom(target, propsInSyncWithParent) {
  var this$1 = this;

  each(Object.keys(target), function (k) {
    // some properties must be always in sync with the parent tag
    var mustSync = !isReservedName(k) && contains(propsInSyncWithParent, k);

    if (isUndefined(this$1[k]) || mustSync) {
      // track the property to keep in sync
      // so we can keep it updated
      if (!mustSync) { propsInSyncWithParent.push(k); }
      this$1[k] = target[k];
    }
  });
}

/**
 * Move the position of a custom tag in its parent tag
 * @this Tag
 * @param   { String } tagName - key where the tag was stored
 * @param   { Number } newPos - index where the new tag will be stored
 */
function moveChildTag(tagName, newPos) {
  var parent = this.parent,
    tags;
  // no parent no move
  if (!parent) { return }

  tags = parent.tags[tagName];

  if (isArray(tags))
    { tags.splice(newPos, 0, tags.splice(tags.indexOf(this), 1)[0]); }
  else { arrayishAdd(parent.tags, tagName, this); }
}

/**
 * Create a new child tag including it correctly into its parent
 * @param   { Object } child - child tag implementation
 * @param   { Object } opts - tag options containing the DOM node where the tag will be mounted
 * @param   { String } innerHTML - inner html of the child node
 * @param   { Object } parent - instance of the parent tag including the child custom tag
 * @returns { Object } instance of the new child tag just created
 */
function initChildTag(child, opts, innerHTML, parent) {
  var tag = new Tag$1(child, opts, innerHTML),
    tagName = opts.tagName || getTagName(opts.root, true),
    ptag = getImmediateCustomParentTag(parent);
  // fix for the parent attribute in the looped elements
  defineProperty(tag, 'parent', ptag);
  // store the real parent tag
  // in some cases this could be different from the custom parent tag
  // for example in nested loops
  tag.__.parent = parent;

  // add this tag to the custom parent tag
  arrayishAdd(ptag.tags, tagName, tag);

  // and also to the real parent tag
  if (ptag !== parent)
    { arrayishAdd(parent.tags, tagName, tag); }

  return tag
}

/**
 * Loop backward all the parents tree to detect the first custom parent tag
 * @param   { Object } tag - a Tag instance
 * @returns { Object } the instance of the first custom parent tag found
 */
function getImmediateCustomParentTag(tag) {
  var ptag = tag;
  while (ptag.__.isAnonymous) {
    if (!ptag.parent) { break }
    ptag = ptag.parent;
  }
  return ptag
}

/**
 * Trigger the unmount method on all the expressions
 * @param   { Array } expressions - DOM expressions
 */
function unmountAll(expressions) {
  each(expressions, function(expr) {
    if (expr instanceof Tag$1) { expr.unmount(true); }
    else if (expr.tagName) { expr.tag.unmount(true); }
    else if (expr.unmount) { expr.unmount(); }
  });
}

/**
 * Get the tag name of any DOM node
 * @param   { Object } dom - DOM node we want to parse
 * @param   { Boolean } skipDataIs - hack to ignore the data-is attribute when attaching to parent
 * @returns { String } name to identify this dom node in riot
 */
function getTagName(dom, skipDataIs) {
  var child = getTag(dom),
    namedTag = !skipDataIs && getAttr(dom, IS_DIRECTIVE);
  return namedTag && !tmpl.hasExpr(namedTag) ?
                namedTag :
              child ? child.name : dom.tagName.toLowerCase()
}

/**
 * With this function we avoid that the internal Tag methods get overridden
 * @param   { Object } data - options we want to use to extend the tag instance
 * @returns { Object } clean object without containing the riot internal reserved words
 */
function cleanUpData(data) {
  if (!(data instanceof Tag$1) && !(data && isFunction(data.trigger)))
    { return data }

  var o = {};
  for (var key in data) {
    if (!RE_RESERVED_NAMES.test(key)) { o[key] = data[key]; }
  }
  return o
}

/**
 * Set the property of an object for a given key. If something already
 * exists there, then it becomes an array containing both the old and new value.
 * @param { Object } obj - object on which to set the property
 * @param { String } key - property name
 * @param { Object } value - the value of the property to be set
 * @param { Boolean } ensureArray - ensure that the property remains an array
 * @param { Number } index - add the new item in a certain array position
 */
function arrayishAdd(obj, key, value, ensureArray, index) {
  var dest = obj[key];
  var isArr = isArray(dest);
  var hasIndex = !isUndefined(index);

  if (dest && dest === value) { return }

  // if the key was never set, set it once
  if (!dest && ensureArray) { obj[key] = [value]; }
  else if (!dest) { obj[key] = value; }
  // if it was an array and not yet set
  else {
    if (isArr) {
      var oldIndex = dest.indexOf(value);
      // this item never changed its position
      if (oldIndex === index) { return }
      // remove the item from its old position
      if (oldIndex !== -1) { dest.splice(oldIndex, 1); }
      // move or add the item
      if (hasIndex) {
        dest.splice(index, 0, value);
      } else {
        dest.push(value);
      }
    } else { obj[key] = [dest, value]; }
  }
}

/**
 * Removes an item from an object at a given key. If the key points to an array,
 * then the item is just removed from the array.
 * @param { Object } obj - object on which to remove the property
 * @param { String } key - property name
 * @param { Object } value - the value of the property to be removed
 * @param { Boolean } ensureArray - ensure that the property remains an array
*/
function arrayishRemove(obj, key, value, ensureArray) {
  if (isArray(obj[key])) {
    var index = obj[key].indexOf(value);
    if (index !== -1) { obj[key].splice(index, 1); }
    if (!obj[key].length) { delete obj[key]; }
    else if (obj[key].length === 1 && !ensureArray) { obj[key] = obj[key][0]; }
  } else
    { delete obj[key]; } // otherwise just delete the key
}

/**
 * Mount a tag creating new Tag instance
 * @param   { Object } root - dom node where the tag will be mounted
 * @param   { String } tagName - name of the riot tag we want to mount
 * @param   { Object } opts - options to pass to the Tag instance
 * @param   { Object } ctx - optional context that will be used to extend an existing class ( used in riot.Tag )
 * @returns { Tag } a new Tag instance
 */
function mountTo(root, tagName, opts, ctx) {
  var impl = __TAG_IMPL[tagName],
    implClass = __TAG_IMPL[tagName].class,
    tag = ctx || (implClass ? Object.create(implClass.prototype) : {}),
    // cache the inner HTML to fix #855
    innerHTML = root._innerHTML = root._innerHTML || root.innerHTML;

  var conf = extend({ root: root, opts: opts }, { parent: opts ? opts.parent : null });

  if (impl && root) { Tag$1.apply(tag, [impl, conf, innerHTML]); }

  if (tag && tag.mount) {
    tag.mount(true);
    // add this tag to the virtualDom variable
    if (!contains(__TAGS_CACHE, tag)) { __TAGS_CACHE.push(tag); }
  }

  return tag
}

/**
 * makes a tag virtual and replaces a reference in the dom
 * @this Tag
 * @param { tag } the tag to make virtual
 * @param { ref } the dom reference location
 */
function makeReplaceVirtual(tag, ref) {
  var frag = createFrag();
  makeVirtual.call(tag, frag);
  ref.parentNode.replaceChild(frag, ref);
}

/**
 * Adds the elements for a virtual tag
 * @this Tag
 * @param { Node } src - the node that will do the inserting or appending
 * @param { Tag } target - only if inserting, insert before this tag's first child
 */
function makeVirtual(src, target) {
  var this$1 = this;

  var head = createDOMPlaceholder(),
    tail = createDOMPlaceholder(),
    frag = createFrag(),
    sib, el;

  this.root.insertBefore(head, this.root.firstChild);
  this.root.appendChild(tail);

  this.__.head = el = head;
  this.__.tail = tail;

  while (el) {
    sib = el.nextSibling;
    frag.appendChild(el);
    this$1.__.virts.push(el); // hold for unmounting
    el = sib;
  }

  if (target)
    { src.insertBefore(frag, target.__.head); }
  else
    { src.appendChild(frag); }
}

/**
 * Move virtual tag and all child nodes
 * @this Tag
 * @param { Node } src  - the node that will do the inserting
 * @param { Tag } target - insert before this tag's first child
 */
function moveVirtual(src, target) {
  var this$1 = this;

  var el = this.__.head,
    frag = createFrag(),
    sib;

  while (el) {
    sib = el.nextSibling;
    frag.appendChild(el);
    el = sib;
    if (el === this$1.__.tail) {
      frag.appendChild(el);
      src.insertBefore(frag, target.__.head);
      break
    }
  }
}

/**
 * Get selectors for tags
 * @param   { Array } tags - tag names to select
 * @returns { String } selector
 */
function selectTags(tags) {
  // select all tags
  if (!tags) {
    var keys = Object.keys(__TAG_IMPL);
    return keys + selectTags(keys)
  }

  return tags
    .filter(function (t) { return !/[^-\w]/.test(t); })
    .reduce(function (list, t) {
      var name = t.trim().toLowerCase();
      return list + ",[" + IS_DIRECTIVE + "=\"" + name + "\"]"
    }, '')
}


var tags = Object.freeze({
	getTag: getTag,
	inheritFrom: inheritFrom,
	moveChildTag: moveChildTag,
	initChildTag: initChildTag,
	getImmediateCustomParentTag: getImmediateCustomParentTag,
	unmountAll: unmountAll,
	getTagName: getTagName,
	cleanUpData: cleanUpData,
	arrayishAdd: arrayishAdd,
	arrayishRemove: arrayishRemove,
	mountTo: mountTo,
	makeReplaceVirtual: makeReplaceVirtual,
	makeVirtual: makeVirtual,
	moveVirtual: moveVirtual,
	selectTags: selectTags
});

/**
 * Riot public api
 */
var settings = settings$1;
var util = {
  tmpl: tmpl,
  brackets: brackets,
  styleManager: styleManager,
  vdom: __TAGS_CACHE,
  styleNode: styleManager.styleNode,
  // export the riot internal utils as well
  dom: dom,
  check: check,
  misc: misc,
  tags: tags
};

// export the core props/methods
var Tag$$1 = Tag$2;
var tag$$1 = tag$1;
var tag2$$1 = tag2$1;
var mount$$1 = mount$1;
var mixin$$1 = mixin$1;
var update$$1 = update$1;
var unregister$$1 = unregister$1;
var version$$1 = version$1;
var observable = observable$1;

var riot$1 = extend({}, core, {
  observable: observable$1,
  settings: settings,
  util: util,
});

exports.settings = settings;
exports.util = util;
exports.Tag = Tag$$1;
exports.tag = tag$$1;
exports.tag2 = tag2$$1;
exports.mount = mount$$1;
exports.mixin = mixin$$1;
exports.update = update$$1;
exports.unregister = unregister$$1;
exports.version = version$$1;
exports.observable = observable;
exports['default'] = riot$1;

Object.defineProperty(exports, '__esModule', { value: true });

})));


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Url = new URL(location.href);

const isRoot = Url.host.split('.')[0] == 'misskey';

const host = isRoot ? Url.host : Url.host.substring(Url.host.indexOf('.') + 1, Url.host.length);
const scheme = Url.protocol;
const url = `${scheme}//${host}`;
const apiUrl = `${scheme}//api.${host}`;
const devUrl = `${scheme}//dev.${host}`;
const aboutUrl = `${scheme}//about.${host}`;

/* harmony default export */ __webpack_exports__["a"] = ({
	host,
	scheme,
	url,
	apiUrl,
	devUrl,
	aboutUrl
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 2017 Julian Garnier
 Released under the MIT license
*/
var $jscomp$this=this;
(function(v,p){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (p),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"===typeof module&&module.exports?module.exports=p():v.anime=p()})(this,function(){function v(a){if(!g.col(a))try{return document.querySelectorAll(a)}catch(b){}}function p(a){return a.reduce(function(a,d){return a.concat(g.arr(d)?p(d):d)},[])}function w(a){if(g.arr(a))return a;g.str(a)&&(a=v(a)||a);return a instanceof NodeList||a instanceof HTMLCollection?[].slice.call(a):[a]}function F(a,b){return a.some(function(a){return a===b})}
function A(a){var b={},d;for(d in a)b[d]=a[d];return b}function G(a,b){var d=A(a),c;for(c in a)d[c]=b.hasOwnProperty(c)?b[c]:a[c];return d}function B(a,b){var d=A(a),c;for(c in b)d[c]=g.und(a[c])?b[c]:a[c];return d}function S(a){a=a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(a,b,d,h){return b+b+d+d+h+h});var b=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);a=parseInt(b[1],16);var d=parseInt(b[2],16),b=parseInt(b[3],16);return"rgb("+a+","+d+","+b+")"}function T(a){function b(a,b,c){0>
c&&(c+=1);1<c&&--c;return c<1/6?a+6*(b-a)*c:.5>c?b:c<2/3?a+(b-a)*(2/3-c)*6:a}var d=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(a);a=parseInt(d[1])/360;var c=parseInt(d[2])/100,d=parseInt(d[3])/100;if(0==c)c=d=a=d;else{var e=.5>d?d*(1+c):d+c-d*c,l=2*d-e,c=b(l,e,a+1/3),d=b(l,e,a);a=b(l,e,a-1/3)}return"rgb("+255*c+","+255*d+","+255*a+")"}function x(a){if(a=/([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg|rad|turn)?/.exec(a))return a[2]}function U(a){if(-1<a.indexOf("translate"))return"px";
if(-1<a.indexOf("rotate")||-1<a.indexOf("skew"))return"deg"}function H(a,b){return g.fnc(a)?a(b.target,b.id,b.total):a}function C(a,b){if(b in a.style)return getComputedStyle(a).getPropertyValue(b.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase())||"0"}function I(a,b){if(g.dom(a)&&F(V,b))return"transform";if(g.dom(a)&&(a.getAttribute(b)||g.svg(a)&&a[b]))return"attribute";if(g.dom(a)&&"transform"!==b&&C(a,b))return"css";if(null!=a[b])return"object"}function W(a,b){var d=U(b),d=-1<b.indexOf("scale")?
1:0+d;a=a.style.transform;if(!a)return d;for(var c=[],e=[],l=[],h=/(\w+)\((.+?)\)/g;c=h.exec(a);)e.push(c[1]),l.push(c[2]);a=l.filter(function(a,c){return e[c]===b});return a.length?a[0]:d}function J(a,b){switch(I(a,b)){case "transform":return W(a,b);case "css":return C(a,b);case "attribute":return a.getAttribute(b)}return a[b]||0}function K(a,b){var d=/^(\*=|\+=|-=)/.exec(a);if(!d)return a;b=parseFloat(b);a=parseFloat(a.replace(d[0],""));switch(d[0][0]){case "+":return b+a;case "-":return b-a;case "*":return b*
a}}function D(a){return g.obj(a)&&a.hasOwnProperty("totalLength")}function X(a,b){function d(c){c=void 0===c?0:c;return a.el.getPointAtLength(1<=b+c?b+c:0)}var c=d(),e=d(-1),l=d(1);switch(a.property){case "x":return c.x;case "y":return c.y;case "angle":return 180*Math.atan2(l.y-e.y,l.x-e.x)/Math.PI}}function L(a,b){var d=/-?\d*\.?\d+/g;a=D(a)?a.totalLength:a;if(g.col(a))b=g.rgb(a)?a:g.hex(a)?S(a):g.hsl(a)?T(a):void 0;else{var c=x(a);a=c?a.substr(0,a.length-c.length):a;b=b?a+b:a}b+="";return{original:b,
numbers:b.match(d)?b.match(d).map(Number):[0],strings:b.split(d)}}function Y(a,b){return b.reduce(function(b,c,e){return b+a[e-1]+c})}function M(a){return(a?p(g.arr(a)?a.map(w):w(a)):[]).filter(function(a,d,c){return c.indexOf(a)===d})}function Z(a){var b=M(a);return b.map(function(a,c){return{target:a,id:c,total:b.length}})}function aa(a,b){var d=A(b);if(g.arr(a)){var c=a.length;2!==c||g.obj(a[0])?g.fnc(b.duration)||(d.duration=b.duration/c):a={value:a}}return w(a).map(function(a,c){c=c?0:b.delay;
a=g.obj(a)&&!D(a)?a:{value:a};g.und(a.delay)&&(a.delay=c);return a}).map(function(a){return B(a,d)})}function ba(a,b){var d={},c;for(c in a){var e=H(a[c],b);g.arr(e)&&(e=e.map(function(a){return H(a,b)}),1===e.length&&(e=e[0]));d[c]=e}d.duration=parseFloat(d.duration);d.delay=parseFloat(d.delay);return d}function ca(a){return g.arr(a)?y.apply(this,a):N[a]}function da(a,b){var d;return a.tweens.map(function(c){c=ba(c,b);var e=c.value,l=J(b.target,a.name),h=d?d.to.original:l,h=g.arr(e)?e[0]:h,m=K(g.arr(e)?
e[1]:e,h),l=x(m)||x(h)||x(l);c.isPath=D(e);c.from=L(h,l);c.to=L(m,l);c.start=d?d.end:a.offset;c.end=c.start+c.delay+c.duration;c.easing=ca(c.easing);c.elasticity=(1E3-Math.min(Math.max(c.elasticity,1),999))/1E3;g.col(c.from.original)&&(c.round=1);return d=c})}function ea(a,b){return p(a.map(function(a){return b.map(function(b){var c=I(a.target,b.name);if(c){var d=da(b,a);b={type:c,property:b.name,animatable:a,tweens:d,duration:d[d.length-1].end,delay:d[0].delay}}else b=void 0;return b})})).filter(function(a){return!g.und(a)})}
function O(a,b,d){var c="delay"===a?Math.min:Math.max;return b.length?c.apply(Math,b.map(function(b){return b[a]})):d[a]}function fa(a){var b=G(ga,a),d=G(ha,a),c=Z(a.targets),e=[],g=B(b,d),h;for(h in a)g.hasOwnProperty(h)||"targets"===h||e.push({name:h,offset:g.offset,tweens:aa(a[h],d)});a=ea(c,e);return B(b,{children:[],animatables:c,animations:a,duration:O("duration",a,d),delay:O("delay",a,d)})}function n(a){function b(){return window.Promise&&new Promise(function(a){return Q=a})}function d(a){return f.reversed?
f.duration-a:a}function c(a){for(var b=0,c={},d=f.animations,e={};b<d.length;){var g=d[b],h=g.animatable,m=g.tweens;e.tween=m.filter(function(b){return a<b.end})[0]||m[m.length-1];e.isPath$1=e.tween.isPath;e.round=e.tween.round;e.eased=e.tween.easing(Math.min(Math.max(a-e.tween.start-e.tween.delay,0),e.tween.duration)/e.tween.duration,e.tween.elasticity);m=Y(e.tween.to.numbers.map(function(a){return function(b,c){c=a.isPath$1?0:a.tween.from.numbers[c];b=c+a.eased*(b-c);a.isPath$1&&(b=X(a.tween.value,
b));a.round&&(b=Math.round(b*a.round)/a.round);return b}}(e)),e.tween.to.strings);ia[g.type](h.target,g.property,m,c,h.id);g.currentValue=m;b++;e={isPath$1:e.isPath$1,tween:e.tween,eased:e.eased,round:e.round}}if(c)for(var k in c)E||(E=C(document.body,"transform")?"transform":"-webkit-transform"),f.animatables[k].target.style[E]=c[k].join(" ");f.currentTime=a;f.progress=a/f.duration*100}function e(a){if(f[a])f[a](f)}function g(){f.remaining&&!0!==f.remaining&&f.remaining--}function h(a){var h=f.duration,
l=f.offset,n=f.delay,P=f.currentTime,q=f.reversed,r=d(a),r=Math.min(Math.max(r,0),h);if(f.children){var p=f.children;if(r>=f.currentTime)for(var u=0;u<p.length;u++)p[u].seek(r);else for(u=p.length;u--;)p[u].seek(r)}r>l&&r<h?(c(r),!f.began&&r>=n&&(f.began=!0,e("begin")),e("run")):(r<=l&&0!==P&&(c(0),q&&g()),r>=h&&P!==h&&(c(h),q||g()));a>=h&&(f.remaining?(t=m,"alternate"===f.direction&&(f.reversed=!f.reversed)):(f.pause(),"Promise"in window&&(Q(),R=b()),f.completed||(f.completed=!0,e("complete"))),
k=0);e("update")}a=void 0===a?{}:a;var m,t,k=0,Q=null,R=b(),f=fa(a);f.reset=function(){var a=f.direction,b=f.loop;f.currentTime=0;f.progress=0;f.paused=!0;f.began=!1;f.completed=!1;f.reversed="reverse"===a;f.remaining="alternate"===a&&1===b?2:b;for(a=f.children.length;a--;)b=f.children[a],b.seek(b.offset),b.reset()};f.tick=function(a){m=a;t||(t=m);h((k+m-t)*n.speed)};f.seek=function(a){h(d(a))};f.pause=function(){var a=q.indexOf(f);-1<a&&q.splice(a,1);f.paused=!0};f.play=function(){f.paused&&(f.paused=
!1,t=0,k=d(f.currentTime),q.push(f),z||ja())};f.reverse=function(){f.reversed=!f.reversed;t=0;k=d(f.currentTime)};f.restart=function(){f.pause();f.reset();f.play()};f.finished=R;f.reset();f.autoplay&&f.play();return f}var ga={update:void 0,begin:void 0,run:void 0,complete:void 0,loop:1,direction:"normal",autoplay:!0,offset:0},ha={duration:1E3,delay:0,easing:"easeOutElastic",elasticity:500,round:0},V="translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY".split(" "),
E,g={arr:function(a){return Array.isArray(a)},obj:function(a){return-1<Object.prototype.toString.call(a).indexOf("Object")},svg:function(a){return a instanceof SVGElement},dom:function(a){return a.nodeType||g.svg(a)},str:function(a){return"string"===typeof a},fnc:function(a){return"function"===typeof a},und:function(a){return"undefined"===typeof a},hex:function(a){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a)},rgb:function(a){return/^rgb/.test(a)},hsl:function(a){return/^hsl/.test(a)},col:function(a){return g.hex(a)||
g.rgb(a)||g.hsl(a)}},y=function(){function a(a,d,c){return(((1-3*c+3*d)*a+(3*c-6*d))*a+3*d)*a}return function(b,d,c,e){if(0<=b&&1>=b&&0<=c&&1>=c){var g=new Float32Array(11);if(b!==d||c!==e)for(var h=0;11>h;++h)g[h]=a(.1*h,b,c);return function(h){if(b===d&&c===e)return h;if(0===h)return 0;if(1===h)return 1;for(var m=0,k=1;10!==k&&g[k]<=h;++k)m+=.1;--k;var k=m+(h-g[k])/(g[k+1]-g[k])*.1,l=3*(1-3*c+3*b)*k*k+2*(3*c-6*b)*k+3*b;if(.001<=l){for(m=0;4>m;++m){l=3*(1-3*c+3*b)*k*k+2*(3*c-6*b)*k+3*b;if(0===l)break;
var n=a(k,b,c)-h,k=k-n/l}h=k}else if(0===l)h=k;else{var k=m,m=m+.1,f=0;do n=k+(m-k)/2,l=a(n,b,c)-h,0<l?m=n:k=n;while(1e-7<Math.abs(l)&&10>++f);h=n}return a(h,d,e)}}}}(),N=function(){function a(a,b){return 0===a||1===a?a:-Math.pow(2,10*(a-1))*Math.sin(2*(a-1-b/(2*Math.PI)*Math.asin(1))*Math.PI/b)}var b="Quad Cubic Quart Quint Sine Expo Circ Back Elastic".split(" "),d={In:[[.55,.085,.68,.53],[.55,.055,.675,.19],[.895,.03,.685,.22],[.755,.05,.855,.06],[.47,0,.745,.715],[.95,.05,.795,.035],[.6,.04,.98,
.335],[.6,-.28,.735,.045],a],Out:[[.25,.46,.45,.94],[.215,.61,.355,1],[.165,.84,.44,1],[.23,1,.32,1],[.39,.575,.565,1],[.19,1,.22,1],[.075,.82,.165,1],[.175,.885,.32,1.275],function(b,c){return 1-a(1-b,c)}],InOut:[[.455,.03,.515,.955],[.645,.045,.355,1],[.77,0,.175,1],[.86,0,.07,1],[.445,.05,.55,.95],[1,0,0,1],[.785,.135,.15,.86],[.68,-.55,.265,1.55],function(b,c){return.5>b?a(2*b,c)/2:1-a(-2*b+2,c)/2}]},c={linear:y(.25,.25,.75,.75)},e={},l;for(l in d)e.type=l,d[e.type].forEach(function(a){return function(d,
e){c["ease"+a.type+b[e]]=g.fnc(d)?d:y.apply($jscomp$this,d)}}(e)),e={type:e.type};return c}(),ia={css:function(a,b,d){return a.style[b]=d},attribute:function(a,b,d){return a.setAttribute(b,d)},object:function(a,b,d){return a[b]=d},transform:function(a,b,d,c,e){c[e]||(c[e]=[]);c[e].push(b+"("+d+")")}},q=[],z=0,ja=function(){function a(){z=requestAnimationFrame(b)}function b(b){var c=q.length;if(c){for(var d=0;d<c;)q[d]&&q[d].tick(b),d++;a()}else cancelAnimationFrame(z),z=0}return a}();n.version="2.0.2";
n.speed=1;n.running=q;n.remove=function(a){a=M(a);for(var b=q.length;b--;)for(var d=q[b],c=d.animations,e=c.length;e--;)F(a,c[e].animatable.target)&&(c.splice(e,1),c.length||d.pause())};n.getValue=J;n.path=function(a,b){var d=g.str(a)?v(a)[0]:a,c=b||100;return function(a){return{el:d,property:a,totalLength:d.getTotalLength()*(c/100)}}};n.setDashoffset=function(a){var b=a.getTotalLength();a.setAttribute("stroke-dasharray",b);return b};n.bezier=y;n.easings=N;n.timeline=function(a){var b=n(a);b.pause();
b.duration=0;b.add=function(a){b.children.forEach(function(a){a.began=!0;a.completed=!0});w(a).forEach(function(a){var c=b.duration,d=a.offset;a.autoplay=!1;a.offset=g.und(d)?c:K(d,c);b.seek(a.offset);a=n(a);a.duration>c&&(b.duration=a.duration);a.began=!0;b.children.push(a)});b.reset();b.seek(0);b.autoplay&&b.restart();return b};return b};n.random=function(a,b){return Math.floor(Math.random()*(b-a+1))+a};return n});

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const NProgress = __webpack_require__(18);
NProgress.configure({
	trickleSpeed: 500,
	showSpinner: false
});

const root = document.getElementsByTagName('html')[0];

/* harmony default export */ __webpack_exports__["a"] = ({
	start: () => {
		root.classList.add('progress');
		NProgress.start();
	},
	done: () => {
		root.classList.remove('progress');
		NProgress.done();
	},
	set: val => {
		NProgress.set(val);
	}
});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_riot__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_riot___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_riot__);


const ev = __WEBPACK_IMPORTED_MODULE_0_riot__["observable"]();

/* harmony default export */ __webpack_exports__["default"] = (ev);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_riot__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_riot___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_riot__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(1);

const pictograph = __webpack_require__(15);


const escape = text =>
	text
		.replace(/>/g, '&gt;')
		.replace(/</g, '&lt;');

/* harmony default export */ __webpack_exports__["a"] = ((tokens, shouldBreak) => {
	if (shouldBreak == null) {
		shouldBreak = true;
	}

	const me = __WEBPACK_IMPORTED_MODULE_0_riot__["mixin"]('i').me;

	let text = tokens.map(token => {
		switch (token.type) {
			case 'text':
				return escape(token.content)
					.replace(/(\r\n|\n|\r)/g, shouldBreak ? '<br>' : ' ');
			case 'bold':
				return `<strong>${escape(token.bold)}</strong>`;
			case 'url':
				return `<mk-url href="${escape(token.content)}" target="_blank"></mk-url>`;
			case 'link':
				return `<a class="link" href="${escape(token.url)}" target="_blank" title="${escape(token.url)}">${escape(token.title)}</a>`;
			case 'mention':
				return `<a href="${__WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].url + '/' + escape(token.username)}" target="_blank" data-user-preview="${token.content}" ${me && me.username == token.username ? 'data-is-me' : ''}>${token.content}</a>`;
			case 'hashtag': // TODO
				return `<a>${escape(token.content)}</a>`;
			case 'code':
				return `<pre><code>${token.html}</code></pre>`;
			case 'inline-code':
				return `<code>${token.html}</code>`;
			case 'emoji':
				return pictograph.dic[token.emoji] || token.content;
		}
	}).join('');

	// Remove needless whitespaces
	text = text
		.replace(/ <code>/g, '<code>').replace(/<\/code> /g, '</code>')
		.replace(/<br><code><pre>/g, '<code><pre>').replace(/<\/code><\/pre><br>/g, '</code></pre>');

	return text;
});


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(1);
/**
 * API Request
 */



let spinner = null;
let pending = 0;

/**
 * Send a request to API
 * @param  {string|Object} i  Credential
 * @param  {string} endpoint  Endpoint
 * @param  {any} [data={}] Data
 * @return {Promise<any>} Response
 */
/* harmony default export */ __webpack_exports__["a"] = ((i, endpoint, data = {}) => {
	if (++pending === 1) {
		spinner = document.createElement('div');
		spinner.setAttribute('id', 'wait');
		document.body.appendChild(spinner);
	}

	// Append the credential
	if (i != null) data.i = typeof i === 'object' ? i.token : i;

	return new Promise((resolve, reject) => {
		// Send request
		fetch(endpoint.indexOf('://') > -1 ? endpoint : `${__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].apiUrl}/${endpoint}`, {
			method: 'POST',
			body: JSON.stringify(data),
			credentials: endpoint === 'signin' ? 'include' : 'omit'
		}).then(res => {
			if (--pending === 0) spinner.parentNode.removeChild(spinner);
			if (res.status === 200) {
				res.json().then(resolve);
			} else if (res.status === 204) {
				resolve();
			} else {
				res.json().then(err => {
					reject(err.error);
				});
			}
		}).catch(reject);
	});
});


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_riot__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_riot___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_riot__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(1);


const ReconnectingWebSocket = __webpack_require__(17);



/**
 * Misskey stream connection
 */
class Connection {
	constructor(endpoint, params) {
		// BIND -----------------------------------
		this.onOpen =    this.onOpen.bind(this);
		this.onClose =   this.onClose.bind(this);
		this.onMessage = this.onMessage.bind(this);
		this.send =      this.send.bind(this);
		this.close =     this.close.bind(this);
		// ----------------------------------------

		__WEBPACK_IMPORTED_MODULE_0_riot__["observable"](this);

		this.state = 'initializing';
		this.buffer = [];

		const host = __WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].apiUrl.replace('http', 'ws');
		const query = params
			? Object.keys(params)
				.map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
				.join('&')
			: null;

		this.socket = new ReconnectingWebSocket(`${host}/${endpoint}${query ? '?' + query : ''}`);
		this.socket.addEventListener('open', this.onOpen);
		this.socket.addEventListener('close', this.onClose);
		this.socket.addEventListener('message', this.onMessage);
	}

	/**
	 * Callback of when open connection
	 * @private
	 */
	onOpen() {
		this.state = 'connected';
		this.trigger('_connected_');

		// バッファーを処理
		const _buffer = [].concat(this.buffer); // Shallow copy
		this.buffer = []; // Clear buffer
		_buffer.forEach(message => {
			this.send(message); // Resend each buffered messages
		});
	}

	/**
	 * Callback of when close connection
	 * @private
	 */
	onClose() {
		this.state = 'reconnecting';
		this.trigger('_closed_');
	}

	/**
	 * Callback of when received a message from connection
	 * @private
	 */
	onMessage(message) {
		try {
			const msg = JSON.parse(message.data);
			if (msg.type) this.trigger(msg.type, msg.body);
		} catch(e) {
			// noop
		}
	}

	/**
	 * Send a message to connection
	 * @public
	 */
	send(message) {
		// まだ接続が確立されていなかったらバッファリングして次に接続した時に送信する
		if (this.state != 'connected') {
			this.buffer.push(message);
			return;
		};

		this.socket.send(JSON.stringify(message));
	}

	/**
	 * Close this connection
	 * @public
	 */
	close() {
		this.socket.removeEventListener('open', this.onOpen);
		this.socket.removeEventListener('message', this.onMessage);
	}
}

/* harmony default export */ __webpack_exports__["a"] = (Connection);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const summarize = post => {
	let summary = post.text ? post.text : '';

	// メディアが添付されているとき
	if (post.media) {
		summary += ` (${post.media.length}つのメディア)`;
	}

	// 投票が添付されているとき
	if (post.poll) {
		summary += ' (投票)';
	}

	// 返信のとき
	if (post.reply_to_id) {
		if (post.reply_to) {
			summary += ` RE: ${summarize(post.reply_to)}`;
		} else {
			summary += ' RE: ...';
		}
	}

	// Repostのとき
	if (post.repost_id) {
		if (post.repost) {
			summary += ` RP: ${summarize(post.repost)}`;
		} else {
			summary += ' RP: ...';
		}
	}

	return summary.trim();
};

/* harmony default export */ __webpack_exports__["a"] = (summarize);


/***/ }),
/* 9 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(1);


/* harmony default export */ __webpack_exports__["a"] = (() => {
	localStorage.removeItem('me');
	document.cookie = `i=; domain=.${__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].host}; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
	location.href = '/';
});


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Generate a UUID
 */
/* harmony default export */ __webpack_exports__["a"] = (() => {
	let uuid = '';

	for (let i = 0; i < 32; i++) {
		const random = Math.random() * 16 | 0;

		if (i == 8 || i == 12 || i == 16 || i == 20) {
			uuid += '-';
		}

		uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
	}

	return uuid;
});


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(13);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 13 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports.dic = __webpack_require__(16)
exports.decode = (text) => typeof text === 'string' ? text.replace(/:([a-zA-Z0-9+-_]*?):/g, (match, emoji) => exports.dic[emoji] || match) : text
exports.version = '61e16ae891b942738a2cf6bda7b3cbe3143d8521'
exports.hash = 'b23b355776c725f31eb5f42093d6a2b5025ea796'


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = {grinning:"😀",smiley:"😃",smile:"😄",grin:"😁",laughing:"😆",satisfied:"😆",sweat_smile:"😅",joy:"😂",rofl:"🤣",blush:"😊",innocent:"😇",slightly_smiling_face:"🙂",upside_down_face:"🙃",wink:"😉",relieved:"😌",heart_eyes:"😍",kissing_heart:"😘",kissing:"😗",kissing_smiling_eyes:"😙",kissing_closed_eyes:"😚",yum:"😋",stuck_out_tongue_winking_eye:"😜",stuck_out_tongue_closed_eyes:"😝",stuck_out_tongue:"😛",money_mouth_face:"🤑",hugs:"🤗",nerd_face:"🤓",sunglasses:"😎",clown_face:"🤡",cowboy_hat_face:"🤠",smirk:"😏",unamused:"😒",disappointed:"😞",pensive:"😔",worried:"😟",confused:"😕",slightly_frowning_face:"🙁",persevere:"😣",confounded:"😖",tired_face:"😫",weary:"😩",triumph:"😤",angry:"😠",rage:"😡",pout:"😡",no_mouth:"😶",neutral_face:"😐",expressionless:"😑",hushed:"😯",frowning:"😦",anguished:"😧",open_mouth:"😮",astonished:"😲",dizzy_face:"😵",flushed:"😳",scream:"😱",fearful:"😨",cold_sweat:"😰",cry:"😢",disappointed_relieved:"😥",drooling_face:"🤤",sob:"😭",sweat:"😓",sleepy:"😪",sleeping:"😴",roll_eyes:"🙄",thinking:"🤔",lying_face:"🤥",grimacing:"😬",zipper_mouth_face:"🤐",nauseated_face:"🤢",sneezing_face:"🤧",mask:"😷",face_with_thermometer:"🤒",face_with_head_bandage:"🤕",smiling_imp:"😈",imp:"👿",japanese_ogre:"👹",japanese_goblin:"👺",hankey:"💩",poop:"💩",shit:"💩",ghost:"👻",skull:"💀",alien:"👽",space_invader:"👾",robot:"🤖",jack_o_lantern:"🎃",smiley_cat:"😺",smile_cat:"😸",joy_cat:"😹",heart_eyes_cat:"😻",smirk_cat:"😼",kissing_cat:"😽",scream_cat:"🙀",crying_cat_face:"😿",pouting_cat:"😾",open_hands:"👐",raised_hands:"🙌",clap:"👏",pray:"🙏",handshake:"🤝","+1":"👍",thumbsup:"👍","-1":"👎",thumbsdown:"👎",fist_oncoming:"👊",facepunch:"👊",punch:"👊",fist_raised:"✊",fist:"✊",fist_left:"🤛",fist_right:"🤜",crossed_fingers:"🤞",metal:"🤘",ok_hand:"👌",point_left:"👈",point_right:"👉",point_up_2:"👆",point_down:"👇",hand:"✋",raised_hand:"✋",raised_back_of_hand:"🤚",raised_hand_with_fingers_splayed:"🖐",vulcan_salute:"🖖",wave:"👋",call_me_hand:"🤙",muscle:"💪",middle_finger:"🖕",fu:"🖕",selfie:"🤳",nail_care:"💅",ring:"💍",lipstick:"💄",kiss:"💋",lips:"👄",tongue:"👅",ear:"👂",nose:"👃",footprints:"👣",eye:"👁",eyes:"👀",speaking_head:"🗣",bust_in_silhouette:"👤",busts_in_silhouette:"👥",baby:"👶",boy:"👦",girl:"👧",man:"👨",woman:"👩",blonde_man:"👱",person_with_blond_hair:"👱",older_man:"👴",older_woman:"👵",man_with_gua_pi_mao:"👲",man_with_turban:"👳",policeman:"👮",cop:"👮",construction_worker_man:"👷",construction_worker:"👷",guardsman:"💂",male_detective:"🕵",detective:"🕵",mrs_claus:"🤶",santa:"🎅",princess:"👸",prince:"🤴",bride_with_veil:"👰",man_in_tuxedo:"🤵",angel:"👼",pregnant_woman:"🤰",bowing_man:"🙇",bow:"🙇",tipping_hand_woman:"💁",information_desk_person:"💁",sassy_woman:"💁",no_good_woman:"🙅",no_good:"🙅",ng_woman:"🙅",ok_woman:"🙆",raising_hand_woman:"🙋",raising_hand:"🙋",pouting_woman:"🙎",person_with_pouting_face:"🙎",frowning_woman:"🙍",person_frowning:"🙍",haircut_woman:"💇",haircut:"💇",massage_woman:"💆",massage:"💆",business_suit_levitating:"🕴",dancer:"💃",man_dancing:"🕺",dancing_women:"👯",dancers:"👯",walking_man:"🚶",walking:"🚶",running_man:"🏃",runner:"🏃",running:"🏃",couple:"👫",two_women_holding_hands:"👭",two_men_holding_hands:"👬",couple_with_heart_woman_man:"💑",couple_with_heart:"💑",couplekiss_man_woman:"💏",family_man_woman_boy:"👪",family:"👪",womans_clothes:"👚",shirt:"👕",tshirt:"👕",jeans:"👖",necktie:"👔",dress:"👗",bikini:"👙",kimono:"👘",high_heel:"👠",sandal:"👡",boot:"👢",mans_shoe:"👞",shoe:"👞",athletic_shoe:"👟",womans_hat:"👒",tophat:"🎩",mortar_board:"🎓",crown:"👑",rescue_worker_helmet:"⛑",school_satchel:"🎒",pouch:"👝",purse:"👛",handbag:"👜",briefcase:"💼",eyeglasses:"👓",dark_sunglasses:"🕶",closed_umbrella:"🌂",dog:"🐶",cat:"🐱",mouse:"🐭",hamster:"🐹",rabbit:"🐰",fox_face:"🦊",bear:"🐻",panda_face:"🐼",koala:"🐨",tiger:"🐯",lion:"🦁",cow:"🐮",pig:"🐷",pig_nose:"🐽",frog:"🐸",monkey_face:"🐵",see_no_evil:"🙈",hear_no_evil:"🙉",speak_no_evil:"🙊",monkey:"🐒",chicken:"🐔",penguin:"🐧",bird:"🐦",baby_chick:"🐤",hatching_chick:"🐣",hatched_chick:"🐥",duck:"🦆",eagle:"🦅",owl:"🦉",bat:"🦇",wolf:"🐺",boar:"🐗",horse:"🐴",unicorn:"🦄",bee:"🐝",honeybee:"🐝",bug:"🐛",butterfly:"🦋",snail:"🐌",shell:"🐚",beetle:"🐞",ant:"🐜",spider:"🕷",spider_web:"🕸",turtle:"🐢",snake:"🐍",lizard:"🦎",scorpion:"🦂",crab:"🦀",squid:"🦑",octopus:"🐙",shrimp:"🦐",tropical_fish:"🐠",fish:"🐟",blowfish:"🐡",dolphin:"🐬",flipper:"🐬",shark:"🦈",whale:"🐳",whale2:"🐋",crocodile:"🐊",leopard:"🐆",tiger2:"🐅",water_buffalo:"🐃",ox:"🐂",cow2:"🐄",deer:"🦌",dromedary_camel:"🐪",camel:"🐫",elephant:"🐘",rhinoceros:"🦏",gorilla:"🦍",racehorse:"🐎",pig2:"🐖",goat:"🐐",ram:"🐏",sheep:"🐑",dog2:"🐕",poodle:"🐩",cat2:"🐈",rooster:"🐓",turkey:"🦃",dove:"🕊",rabbit2:"🐇",mouse2:"🐁",rat:"🐀",chipmunk:"🐿",feet:"🐾",paw_prints:"🐾",dragon:"🐉",dragon_face:"🐲",cactus:"🌵",christmas_tree:"🎄",evergreen_tree:"🌲",deciduous_tree:"🌳",palm_tree:"🌴",seedling:"🌱",herb:"🌿",four_leaf_clover:"🍀",bamboo:"🎍",tanabata_tree:"🎋",leaves:"🍃",fallen_leaf:"🍂",maple_leaf:"🍁",mushroom:"🍄",ear_of_rice:"🌾",bouquet:"💐",tulip:"🌷",rose:"🌹",wilted_flower:"🥀",sunflower:"🌻",blossom:"🌼",cherry_blossom:"🌸",hibiscus:"🌺",earth_americas:"🌎",earth_africa:"🌍",earth_asia:"🌏",full_moon:"🌕",waning_gibbous_moon:"🌖",last_quarter_moon:"🌗",waning_crescent_moon:"🌘",new_moon:"🌑",waxing_crescent_moon:"🌒",first_quarter_moon:"🌓",moon:"🌔",waxing_gibbous_moon:"🌔",new_moon_with_face:"🌚",full_moon_with_face:"🌝",sun_with_face:"🌞",first_quarter_moon_with_face:"🌛",last_quarter_moon_with_face:"🌜",crescent_moon:"🌙",dizzy:"💫",star2:"🌟",sparkles:"✨",fire:"🔥",boom:"💥",collision:"💥",comet:"☄",sun_behind_small_cloud:"🌤",sun_behind_large_cloud:"🌥",sun_behind_rain_cloud:"🌦",rainbow:"🌈",cloud_with_rain:"🌧",cloud_with_lightning_and_rain:"⛈",cloud_with_lightning:"🌩",cloud_with_snow:"🌨",wind_face:"🌬",dash:"💨",tornado:"🌪",fog:"🌫",ocean:"🌊",droplet:"💧",sweat_drops:"💦",green_apple:"🍏",apple:"🍎",pear:"🍐",tangerine:"🍊",orange:"🍊",mandarin:"🍊",lemon:"🍋",banana:"🍌",watermelon:"🍉",grapes:"🍇",strawberry:"🍓",melon:"🍈",cherries:"🍒",peach:"🍑",pineapple:"🍍",kiwi_fruit:"🥝",avocado:"🥑",tomato:"🍅",eggplant:"🍆",cucumber:"🥒",carrot:"🥕",corn:"🌽",hot_pepper:"🌶",potato:"🥔",sweet_potato:"🍠",chestnut:"🌰",peanuts:"🥜",honey_pot:"🍯",croissant:"🥐",bread:"🍞",baguette_bread:"🥖",cheese:"🧀",egg:"🥚",fried_egg:"🍳",bacon:"🥓",pancakes:"🥞",fried_shrimp:"🍤",poultry_leg:"🍗",meat_on_bone:"🍖",pizza:"🍕",hotdog:"🌭",hamburger:"🍔",fries:"🍟",stuffed_flatbread:"🥙",taco:"🌮",burrito:"🌯",green_salad:"🥗",shallow_pan_of_food:"🥘",spaghetti:"🍝",ramen:"🍜",stew:"🍲",fish_cake:"🍥",sushi:"🍣",bento:"🍱",curry:"🍛",rice:"🍚",rice_ball:"🍙",rice_cracker:"🍘",oden:"🍢",dango:"🍡",shaved_ice:"🍧",ice_cream:"🍨",icecream:"🍦",cake:"🍰",birthday:"🎂",custard:"🍮",lollipop:"🍭",candy:"🍬",chocolate_bar:"🍫",popcorn:"🍿",doughnut:"🍩",cookie:"🍪",milk_glass:"🥛",baby_bottle:"🍼",tea:"🍵",sake:"🍶",beer:"🍺",beers:"🍻",clinking_glasses:"🥂",wine_glass:"🍷",tumbler_glass:"🥃",cocktail:"🍸",tropical_drink:"🍹",champagne:"🍾",spoon:"🥄",fork_and_knife:"🍴",plate_with_cutlery:"🍽",basketball:"🏀",football:"🏈",tennis:"🎾",volleyball:"🏐",rugby_football:"🏉","8ball":"🎱",ping_pong:"🏓",badminton:"🏸",goal_net:"🥅",ice_hockey:"🏒",field_hockey:"🏑",cricket:"🏏",bow_and_arrow:"🏹",fishing_pole_and_fish:"🎣",boxing_glove:"🥊",martial_arts_uniform:"🥋",ice_skate:"⛸",ski:"🎿",skier:"⛷",snowboarder:"🏂",weight_lifting_man:"🏋",person_fencing:"🤺",basketball_man:"⛹",golfing_man:"🏌",surfing_man:"🏄",surfer:"🏄",swimming_man:"🏊",swimmer:"🏊",rowing_man:"🚣",rowboat:"🚣",horse_racing:"🏇",biking_man:"🚴",bicyclist:"🚴",mountain_biking_man:"🚵",mountain_bicyclist:"🚵",running_shirt_with_sash:"🎽",medal_sports:"🏅",medal_military:"🎖","1st_place_medal":"🥇","2nd_place_medal":"🥈","3rd_place_medal":"🥉",trophy:"🏆",rosette:"🏵",reminder_ribbon:"🎗",ticket:"🎫",tickets:"🎟",circus_tent:"🎪",performing_arts:"🎭",art:"🎨",clapper:"🎬",microphone:"🎤",headphones:"🎧",musical_score:"🎼",musical_keyboard:"🎹",drum:"🥁",saxophone:"🎷",trumpet:"🎺",guitar:"🎸",violin:"🎻",game_die:"🎲",dart:"🎯",bowling:"🎳",video_game:"🎮",slot_machine:"🎰",car:"🚗",red_car:"🚗",taxi:"🚕",blue_car:"🚙",bus:"🚌",trolleybus:"🚎",racing_car:"🏎",police_car:"🚓",ambulance:"🚑",fire_engine:"🚒",minibus:"🚐",truck:"🚚",articulated_lorry:"🚛",tractor:"🚜",kick_scooter:"🛴",bike:"🚲",motor_scooter:"🛵",motorcycle:"🏍",rotating_light:"🚨",oncoming_police_car:"🚔",oncoming_bus:"🚍",oncoming_automobile:"🚘",oncoming_taxi:"🚖",aerial_tramway:"🚡",mountain_cableway:"🚠",suspension_railway:"🚟",railway_car:"🚃",train:"🚋",mountain_railway:"🚞",monorail:"🚝",bullettrain_side:"🚄",bullettrain_front:"🚅",light_rail:"🚈",steam_locomotive:"🚂",train2:"🚆",metro:"🚇",tram:"🚊",station:"🚉",helicopter:"🚁",small_airplane:"🛩",flight_departure:"🛫",flight_arrival:"🛬",rocket:"🚀",artificial_satellite:"🛰",seat:"💺",canoe:"🛶",motor_boat:"🛥",speedboat:"🚤",passenger_ship:"🛳",ferry:"⛴",ship:"🚢",construction:"🚧",busstop:"🚏",vertical_traffic_light:"🚦",traffic_light:"🚥",world_map:"🗺",moyai:"🗿",statue_of_liberty:"🗽",tokyo_tower:"🗼",european_castle:"🏰",japanese_castle:"🏯",stadium:"🏟",ferris_wheel:"🎡",roller_coaster:"🎢",carousel_horse:"🎠",parasol_on_ground:"⛱",beach_umbrella:"🏖",desert_island:"🏝",mountain:"⛰",mountain_snow:"🏔",mount_fuji:"🗻",volcano:"🌋",desert:"🏜",camping:"🏕",railway_track:"🛤",motorway:"🛣",building_construction:"🏗",factory:"🏭",house:"🏠",house_with_garden:"🏡",houses:"🏘",derelict_house:"🏚",office:"🏢",department_store:"🏬",post_office:"🏣",european_post_office:"🏤",hospital:"🏥",bank:"🏦",hotel:"🏨",convenience_store:"🏪",school:"🏫",love_hotel:"🏩",wedding:"💒",classical_building:"🏛",mosque:"🕌",synagogue:"🕍",kaaba:"🕋",shinto_shrine:"⛩",japan:"🗾",rice_scene:"🎑",national_park:"🏞",sunrise:"🌅",sunrise_over_mountains:"🌄",stars:"🌠",sparkler:"🎇",fireworks:"🎆",city_sunrise:"🌇",city_sunset:"🌆",cityscape:"🏙",night_with_stars:"🌃",milky_way:"🌌",bridge_at_night:"🌉",foggy:"🌁",iphone:"📱",calling:"📲",computer:"💻",desktop_computer:"🖥",printer:"🖨",computer_mouse:"🖱",trackball:"🖲",joystick:"🕹",clamp:"🗜",minidisc:"💽",floppy_disk:"💾",cd:"💿",dvd:"📀",vhs:"📼",camera:"📷",camera_flash:"📸",video_camera:"📹",movie_camera:"🎥",film_projector:"📽",film_strip:"🎞",telephone_receiver:"📞",pager:"📟",fax:"📠",tv:"📺",radio:"📻",studio_microphone:"🎙",level_slider:"🎚",control_knobs:"🎛",stopwatch:"⏱",timer_clock:"⏲",alarm_clock:"⏰",mantelpiece_clock:"🕰",hourglass_flowing_sand:"⏳",satellite:"📡",battery:"🔋",electric_plug:"🔌",bulb:"💡",flashlight:"🔦",candle:"🕯",wastebasket:"🗑",oil_drum:"🛢",money_with_wings:"💸",dollar:"💵",yen:"💴",euro:"💶",pound:"💷",moneybag:"💰",credit_card:"💳",gem:"💎",wrench:"🔧",hammer:"🔨",hammer_and_pick:"⚒",hammer_and_wrench:"🛠",pick:"⛏",nut_and_bolt:"🔩",chains:"⛓",gun:"🔫",bomb:"💣",hocho:"🔪",knife:"🔪",dagger:"🗡",shield:"🛡",smoking:"🚬",amphora:"🏺",crystal_ball:"🔮",prayer_beads:"📿",barber:"💈",telescope:"🔭",microscope:"🔬",hole:"🕳",pill:"💊",syringe:"💉",thermometer:"🌡",toilet:"🚽",potable_water:"🚰",shower:"🚿",bathtub:"🛁",bath:"🛀",bellhop_bell:"🛎",key:"🔑",old_key:"🗝",door:"🚪",couch_and_lamp:"🛋",bed:"🛏",sleeping_bed:"🛌",framed_picture:"🖼",shopping:"🛍",shopping_cart:"🛒",gift:"🎁",balloon:"🎈",flags:"🎏",ribbon:"🎀",confetti_ball:"🎊",tada:"🎉",dolls:"🎎",izakaya_lantern:"🏮",lantern:"🏮",wind_chime:"🎐",envelope_with_arrow:"📩",incoming_envelope:"📨","e-mail":"📧",love_letter:"💌",inbox_tray:"📥",outbox_tray:"📤",package:"📦",label:"🏷",mailbox_closed:"📪",mailbox:"📫",mailbox_with_mail:"📬",mailbox_with_no_mail:"📭",postbox:"📮",postal_horn:"📯",scroll:"📜",page_with_curl:"📃",page_facing_up:"📄",bookmark_tabs:"📑",bar_chart:"📊",chart_with_upwards_trend:"📈",chart_with_downwards_trend:"📉",spiral_notepad:"🗒",spiral_calendar:"🗓",calendar:"📆",date:"📅",card_index:"📇",card_file_box:"🗃",ballot_box:"🗳",file_cabinet:"🗄",clipboard:"📋",file_folder:"📁",open_file_folder:"📂",card_index_dividers:"🗂",newspaper_roll:"🗞",newspaper:"📰",notebook:"📓",notebook_with_decorative_cover:"📔",ledger:"📒",closed_book:"📕",green_book:"📗",blue_book:"📘",orange_book:"📙",books:"📚",book:"📖",open_book:"📖",bookmark:"🔖",link:"🔗",paperclip:"📎",paperclips:"🖇",triangular_ruler:"📐",straight_ruler:"📏",pushpin:"📌",round_pushpin:"📍",pen:"🖊",fountain_pen:"🖋",paintbrush:"🖌",crayon:"🖍",memo:"📝",pencil:"📝",mag:"🔍",mag_right:"🔎",lock_with_ink_pen:"🔏",closed_lock_with_key:"🔐",lock:"🔒",unlock:"🔓",yellow_heart:"💛",green_heart:"💚",blue_heart:"💙",purple_heart:"💜",black_heart:"🖤",broken_heart:"💔",two_hearts:"💕",revolving_hearts:"💞",heartbeat:"💓",heartpulse:"💗",sparkling_heart:"💖",cupid:"💘",gift_heart:"💝",heart_decoration:"💟",om:"🕉",six_pointed_star:"🔯",menorah:"🕎",place_of_worship:"🛐",ophiuchus:"⛎",id:"🆔",accept:"🉑",mobile_phone_off:"📴",vibration_mode:"📳",u6709:"🈶",u7533:"🈸",u55b6:"🈺",vs:"🆚",white_flower:"💮",ideograph_advantage:"🉐",u5408:"🈴",u6e80:"🈵",u5272:"🈹",u7981:"🈲",ab:"🆎",cl:"🆑",sos:"🆘",x:"❌",stop_sign:"🛑",name_badge:"📛",no_entry_sign:"🚫","100":"💯",anger:"💢",no_pedestrians:"🚷",do_not_litter:"🚯",no_bicycles:"🚳","non-potable_water":"🚱",underage:"🔞",no_mobile_phones:"📵",no_smoking:"🚭",grey_exclamation:"❕",question:"❓",grey_question:"❔",low_brightness:"🔅",high_brightness:"🔆",children_crossing:"🚸",trident:"🔱",beginner:"🔰",white_check_mark:"✅",chart:"💹",negative_squared_cross_mark:"❎",globe_with_meridians:"🌐",diamond_shape_with_a_dot_inside:"💠",cyclone:"🌀",zzz:"💤",atm:"🏧",wc:"🚾",u7a7a:"🈳",passport_control:"🛂",customs:"🛃",baggage_claim:"🛄",left_luggage:"🛅",mens:"🚹",womens:"🚺",baby_symbol:"🚼",restroom:"🚻",put_litter_in_its_place:"🚮",cinema:"🎦",signal_strength:"📶",koko:"🈁",symbols:"🔣",abc:"🔤",abcd:"🔡",capital_abcd:"🔠",ng:"🆖",ok:"🆗",up:"🆙",cool:"🆒",new:"🆕",free:"🆓",keycap_ten:"🔟","1234":"🔢",pause_button:"⏸",play_or_pause_button:"⏯",stop_button:"⏹",record_button:"⏺",next_track_button:"⏭",previous_track_button:"⏮",fast_forward:"⏩",rewind:"⏪",arrow_double_up:"⏫",arrow_double_down:"⏬",arrow_up_small:"🔼",arrow_down_small:"🔽",twisted_rightwards_arrows:"🔀",repeat:"🔁",repeat_one:"🔂",arrows_counterclockwise:"🔄",arrows_clockwise:"🔃",musical_note:"🎵",notes:"🎶",heavy_plus_sign:"➕",heavy_minus_sign:"➖",heavy_division_sign:"➗",heavy_dollar_sign:"💲",currency_exchange:"💱",curly_loop:"➰",loop:"➿",end:"🔚",back:"🔙",on:"🔛",top:"🔝",soon:"🔜",radio_button:"🔘",red_circle:"🔴",large_blue_circle:"🔵",small_red_triangle:"🔺",small_red_triangle_down:"🔻",small_orange_diamond:"🔸",small_blue_diamond:"🔹",large_orange_diamond:"🔶",large_blue_diamond:"🔷",white_square_button:"🔳",black_square_button:"🔲",speaker:"🔈",mute:"🔇",sound:"🔉",loud_sound:"🔊",bell:"🔔",no_bell:"🔕",mega:"📣",loudspeaker:"📢",speech_balloon:"💬",thought_balloon:"💭",right_anger_bubble:"🗯",black_joker:"🃏",flower_playing_cards:"🎴",clock1:"🕐",clock2:"🕑",clock3:"🕒",clock4:"🕓",clock5:"🕔",clock6:"🕕",clock7:"🕖",clock8:"🕗",clock9:"🕘",clock10:"🕙",clock11:"🕚",clock12:"🕛",clock130:"🕜",clock230:"🕝",clock330:"🕞",clock430:"🕟",clock530:"🕠",clock630:"🕡",clock730:"🕢",clock830:"🕣",clock930:"🕤",clock1030:"🕥",clock1130:"🕦",clock1230:"🕧",black_flag:"🏴",checkered_flag:"🏁",triangular_flag_on_post:"🚩",crossed_flags:"🎌"}


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isWebSocket = function (constructor) {
    return constructor && constructor.CLOSING === 2;
};
var isGlobalWebSocket = function () {
    return typeof WebSocket !== 'undefined' && isWebSocket(WebSocket);
};
var getDefaultOptions = function () { return ({
    constructor: isGlobalWebSocket() ? WebSocket : null,
    maxReconnectionDelay: 10000,
    minReconnectionDelay: 1500,
    reconnectionDelayGrowFactor: 1.3,
    connectionTimeout: 4000,
    maxRetries: Infinity,
    debug: false,
}); };
var bypassProperty = function (src, dst, name) {
    Object.defineProperty(dst, name, {
        get: function () { return src[name]; },
        set: function (value) { src[name] = value; },
        enumerable: true,
        configurable: true,
    });
};
var initReconnectionDelay = function (config) {
    return (config.minReconnectionDelay + Math.random() * config.minReconnectionDelay);
};
var updateReconnectionDelay = function (config, previousDelay) {
    var newDelay = previousDelay * config.reconnectionDelayGrowFactor;
    return (newDelay > config.maxReconnectionDelay)
        ? config.maxReconnectionDelay
        : newDelay;
};
var LEVEL_0_EVENTS = ['onopen', 'onclose', 'onmessage', 'onerror'];
var reassignEventListeners = function (ws, oldWs, listeners) {
    Object.keys(listeners).forEach(function (type) {
        listeners[type].forEach(function (_a) {
            var listener = _a[0], options = _a[1];
            ws.addEventListener(type, listener, options);
        });
    });
    if (oldWs) {
        LEVEL_0_EVENTS.forEach(function (name) { ws[name] = oldWs[name]; });
    }
};
var ReconnectingWebsocket = function (url, protocols, options) {
    var _this = this;
    if (options === void 0) { options = {}; }
    var ws;
    var connectingTimeout;
    var reconnectDelay = 0;
    var retriesCount = 0;
    var shouldRetry = true;
    var savedOnClose = null;
    var listeners = {};
    // require new to construct
    if (!(this instanceof ReconnectingWebsocket)) {
        throw new TypeError("Failed to construct 'ReconnectingWebSocket': Please use the 'new' operator");
    }
    // Set config. Not using `Object.assign` because of IE11
    var config = getDefaultOptions();
    Object.keys(config)
        .filter(function (key) { return options.hasOwnProperty(key); })
        .forEach(function (key) { return config[key] = options[key]; });
    if (!isWebSocket(config.constructor)) {
        throw new TypeError('Invalid WebSocket constructor. Set `options.constructor`');
    }
    var log = config.debug ? function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return console.log.apply(console, ['RWS:'].concat(params));
    } : function () { };
    /**
     * Not using dispatchEvent, otherwise we must use a DOM Event object
     * Deferred because we want to handle the close event before this
     */
    var emitError = function (code, msg) { return setTimeout(function () {
        var err = new Error(msg);
        err.code = code;
        if (Array.isArray(listeners.error)) {
            listeners.error.forEach(function (_a) {
                var fn = _a[0];
                return fn(err);
            });
        }
        if (ws.onerror) {
            ws.onerror(err);
        }
    }, 0); };
    var handleClose = function () {
        log('handleClose', { shouldRetry: shouldRetry });
        retriesCount++;
        log('retries count:', retriesCount);
        if (retriesCount > config.maxRetries) {
            emitError('EHOSTDOWN', 'Too many failed connection attempts');
            return;
        }
        if (!reconnectDelay) {
            reconnectDelay = initReconnectionDelay(config);
        }
        else {
            reconnectDelay = updateReconnectionDelay(config, reconnectDelay);
        }
        log('handleClose - reconnectDelay:', reconnectDelay);
        if (shouldRetry) {
            setTimeout(connect, reconnectDelay);
        }
    };
    var connect = function () {
        if (!shouldRetry) {
            return;
        }
        log('connect');
        var oldWs = ws;
        ws = new config.constructor(url, protocols);
        connectingTimeout = setTimeout(function () {
            log('timeout');
            ws.close();
            emitError('ETIMEDOUT', 'Connection timeout');
        }, config.connectionTimeout);
        log('bypass properties');
        for (var key in ws) {
            // @todo move to constant
            if (['addEventListener', 'removeEventListener', 'close', 'send'].indexOf(key) < 0) {
                bypassProperty(ws, _this, key);
            }
        }
        ws.addEventListener('open', function () {
            clearTimeout(connectingTimeout);
            log('open');
            reconnectDelay = initReconnectionDelay(config);
            log('reconnectDelay:', reconnectDelay);
            retriesCount = 0;
        });
        ws.addEventListener('close', handleClose);
        reassignEventListeners(ws, oldWs, listeners);
        // because when closing with fastClose=true, it is saved and set to null to avoid double calls
        ws.onclose = ws.onclose || savedOnClose;
        savedOnClose = null;
    };
    log('init');
    connect();
    this.close = function (code, reason, _a) {
        if (code === void 0) { code = 1000; }
        if (reason === void 0) { reason = ''; }
        var _b = _a === void 0 ? {} : _a, _c = _b.keepClosed, keepClosed = _c === void 0 ? false : _c, _d = _b.fastClose, fastClose = _d === void 0 ? true : _d, _e = _b.delay, delay = _e === void 0 ? 0 : _e;
        log('close - params:', { reason: reason, keepClosed: keepClosed, fastClose: fastClose, delay: delay });
        shouldRetry = !keepClosed;
        if (delay) {
            reconnectDelay = delay;
        }
        ws.close(code, reason);
        if (fastClose) {
            var fakeCloseEvent_1 = {
                code: code,
                reason: reason,
                wasClean: true,
            };
            // execute close listeners soon with a fake closeEvent
            // and remove them from the WS instance so they
            // don't get fired on the real close.
            handleClose();
            ws.removeEventListener('close', handleClose);
            // run and remove level2
            if (Array.isArray(listeners.close)) {
                listeners.close.forEach(function (_a) {
                    var listener = _a[0], options = _a[1];
                    listener(fakeCloseEvent_1);
                    ws.removeEventListener('close', listener, options);
                });
            }
            // run and remove level0
            if (ws.onclose) {
                savedOnClose = ws.onclose;
                ws.onclose(fakeCloseEvent_1);
                ws.onclose = null;
            }
        }
    };
    this.send = function (data) {
        ws.send(data);
    };
    this.addEventListener = function (type, listener, options) {
        if (Array.isArray(listeners[type])) {
            if (!listeners[type].some(function (_a) {
                var l = _a[0];
                return l === listener;
            })) {
                listeners[type].push([listener, options]);
            }
        }
        else {
            listeners[type] = [[listener, options]];
        }
        ws.addEventListener(type, listener, options);
    };
    this.removeEventListener = function (type, listener, options) {
        if (Array.isArray(listeners[type])) {
            listeners[type] = listeners[type].filter(function (_a) {
                var l = _a[0];
                return l !== listener;
            });
        }
        ws.removeEventListener(type, listener, options);
    };
};
module.exports = ReconnectingWebsocket;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */

;(function(root, factory) {

  if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.NProgress = factory();
  }

})(this, function() {
  var NProgress = {};

  NProgress.version = '0.2.0';

  var Settings = NProgress.settings = {
    minimum: 0.08,
    easing: 'ease',
    positionUsing: '',
    speed: 200,
    trickle: true,
    trickleRate: 0.02,
    trickleSpeed: 800,
    showSpinner: true,
    barSelector: '[role="bar"]',
    spinnerSelector: '[role="spinner"]',
    parent: 'body',
    template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
  };

  /**
   * Updates configuration.
   *
   *     NProgress.configure({
   *       minimum: 0.1
   *     });
   */
  NProgress.configure = function(options) {
    var key, value;
    for (key in options) {
      value = options[key];
      if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;
    }

    return this;
  };

  /**
   * Last number.
   */

  NProgress.status = null;

  /**
   * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
   *
   *     NProgress.set(0.4);
   *     NProgress.set(1.0);
   */

  NProgress.set = function(n) {
    var started = NProgress.isStarted();

    n = clamp(n, Settings.minimum, 1);
    NProgress.status = (n === 1 ? null : n);

    var progress = NProgress.render(!started),
        bar      = progress.querySelector(Settings.barSelector),
        speed    = Settings.speed,
        ease     = Settings.easing;

    progress.offsetWidth; /* Repaint */

    queue(function(next) {
      // Set positionUsing if it hasn't already been set
      if (Settings.positionUsing === '') Settings.positionUsing = NProgress.getPositioningCSS();

      // Add transition
      css(bar, barPositionCSS(n, speed, ease));

      if (n === 1) {
        // Fade out
        css(progress, { 
          transition: 'none', 
          opacity: 1 
        });
        progress.offsetWidth; /* Repaint */

        setTimeout(function() {
          css(progress, { 
            transition: 'all ' + speed + 'ms linear', 
            opacity: 0 
          });
          setTimeout(function() {
            NProgress.remove();
            next();
          }, speed);
        }, speed);
      } else {
        setTimeout(next, speed);
      }
    });

    return this;
  };

  NProgress.isStarted = function() {
    return typeof NProgress.status === 'number';
  };

  /**
   * Shows the progress bar.
   * This is the same as setting the status to 0%, except that it doesn't go backwards.
   *
   *     NProgress.start();
   *
   */
  NProgress.start = function() {
    if (!NProgress.status) NProgress.set(0);

    var work = function() {
      setTimeout(function() {
        if (!NProgress.status) return;
        NProgress.trickle();
        work();
      }, Settings.trickleSpeed);
    };

    if (Settings.trickle) work();

    return this;
  };

  /**
   * Hides the progress bar.
   * This is the *sort of* the same as setting the status to 100%, with the
   * difference being `done()` makes some placebo effect of some realistic motion.
   *
   *     NProgress.done();
   *
   * If `true` is passed, it will show the progress bar even if its hidden.
   *
   *     NProgress.done(true);
   */

  NProgress.done = function(force) {
    if (!force && !NProgress.status) return this;

    return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
  };

  /**
   * Increments by a random amount.
   */

  NProgress.inc = function(amount) {
    var n = NProgress.status;

    if (!n) {
      return NProgress.start();
    } else {
      if (typeof amount !== 'number') {
        amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
      }

      n = clamp(n + amount, 0, 0.994);
      return NProgress.set(n);
    }
  };

  NProgress.trickle = function() {
    return NProgress.inc(Math.random() * Settings.trickleRate);
  };

  /**
   * Waits for all supplied jQuery promises and
   * increases the progress as the promises resolve.
   *
   * @param $promise jQUery Promise
   */
  (function() {
    var initial = 0, current = 0;

    NProgress.promise = function($promise) {
      if (!$promise || $promise.state() === "resolved") {
        return this;
      }

      if (current === 0) {
        NProgress.start();
      }

      initial++;
      current++;

      $promise.always(function() {
        current--;
        if (current === 0) {
            initial = 0;
            NProgress.done();
        } else {
            NProgress.set((initial - current) / initial);
        }
      });

      return this;
    };

  })();

  /**
   * (Internal) renders the progress bar markup based on the `template`
   * setting.
   */

  NProgress.render = function(fromStart) {
    if (NProgress.isRendered()) return document.getElementById('nprogress');

    addClass(document.documentElement, 'nprogress-busy');
    
    var progress = document.createElement('div');
    progress.id = 'nprogress';
    progress.innerHTML = Settings.template;

    var bar      = progress.querySelector(Settings.barSelector),
        perc     = fromStart ? '-100' : toBarPerc(NProgress.status || 0),
        parent   = document.querySelector(Settings.parent),
        spinner;
    
    css(bar, {
      transition: 'all 0 linear',
      transform: 'translate3d(' + perc + '%,0,0)'
    });

    if (!Settings.showSpinner) {
      spinner = progress.querySelector(Settings.spinnerSelector);
      spinner && removeElement(spinner);
    }

    if (parent != document.body) {
      addClass(parent, 'nprogress-custom-parent');
    }

    parent.appendChild(progress);
    return progress;
  };

  /**
   * Removes the element. Opposite of render().
   */

  NProgress.remove = function() {
    removeClass(document.documentElement, 'nprogress-busy');
    removeClass(document.querySelector(Settings.parent), 'nprogress-custom-parent');
    var progress = document.getElementById('nprogress');
    progress && removeElement(progress);
  };

  /**
   * Checks if the progress bar is rendered.
   */

  NProgress.isRendered = function() {
    return !!document.getElementById('nprogress');
  };

  /**
   * Determine which positioning CSS rule to use.
   */

  NProgress.getPositioningCSS = function() {
    // Sniff on document.body.style
    var bodyStyle = document.body.style;

    // Sniff prefixes
    var vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit' :
                       ('MozTransform' in bodyStyle) ? 'Moz' :
                       ('msTransform' in bodyStyle) ? 'ms' :
                       ('OTransform' in bodyStyle) ? 'O' : '';

    if (vendorPrefix + 'Perspective' in bodyStyle) {
      // Modern browsers with 3D support, e.g. Webkit, IE10
      return 'translate3d';
    } else if (vendorPrefix + 'Transform' in bodyStyle) {
      // Browsers without 3D support, e.g. IE9
      return 'translate';
    } else {
      // Browsers without translate() support, e.g. IE7-8
      return 'margin';
    }
  };

  /**
   * Helpers
   */

  function clamp(n, min, max) {
    if (n < min) return min;
    if (n > max) return max;
    return n;
  }

  /**
   * (Internal) converts a percentage (`0..1`) to a bar translateX
   * percentage (`-100%..0%`).
   */

  function toBarPerc(n) {
    return (-1 + n) * 100;
  }


  /**
   * (Internal) returns the correct CSS for changing the bar's
   * position given an n percentage, and speed and ease from Settings
   */

  function barPositionCSS(n, speed, ease) {
    var barCSS;

    if (Settings.positionUsing === 'translate3d') {
      barCSS = { transform: 'translate3d('+toBarPerc(n)+'%,0,0)' };
    } else if (Settings.positionUsing === 'translate') {
      barCSS = { transform: 'translate('+toBarPerc(n)+'%,0)' };
    } else {
      barCSS = { 'margin-left': toBarPerc(n)+'%' };
    }

    barCSS.transition = 'all '+speed+'ms '+ease;

    return barCSS;
  }

  /**
   * (Internal) Queues a function to be executed.
   */

  var queue = (function() {
    var pending = [];
    
    function next() {
      var fn = pending.shift();
      if (fn) {
        fn(next);
      }
    }

    return function(fn) {
      pending.push(fn);
      if (pending.length == 1) next();
    };
  })();

  /**
   * (Internal) Applies css properties to an element, similar to the jQuery 
   * css method.
   *
   * While this helper does assist with vendor prefixed property names, it 
   * does not perform any manipulation of values prior to setting styles.
   */

  var css = (function() {
    var cssPrefixes = [ 'Webkit', 'O', 'Moz', 'ms' ],
        cssProps    = {};

    function camelCase(string) {
      return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function(match, letter) {
        return letter.toUpperCase();
      });
    }

    function getVendorProp(name) {
      var style = document.body.style;
      if (name in style) return name;

      var i = cssPrefixes.length,
          capName = name.charAt(0).toUpperCase() + name.slice(1),
          vendorName;
      while (i--) {
        vendorName = cssPrefixes[i] + capName;
        if (vendorName in style) return vendorName;
      }

      return name;
    }

    function getStyleProp(name) {
      name = camelCase(name);
      return cssProps[name] || (cssProps[name] = getVendorProp(name));
    }

    function applyCss(element, prop, value) {
      prop = getStyleProp(prop);
      element.style[prop] = value;
    }

    return function(element, properties) {
      var args = arguments,
          prop, 
          value;

      if (args.length == 2) {
        for (prop in properties) {
          value = properties[prop];
          if (value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value);
        }
      } else {
        applyCss(element, args[1], args[2]);
      }
    }
  })();

  /**
   * (Internal) Determines if an element or space separated list of class names contains a class name.
   */

  function hasClass(element, name) {
    var list = typeof element == 'string' ? element : classList(element);
    return list.indexOf(' ' + name + ' ') >= 0;
  }

  /**
   * (Internal) Adds a class to an element.
   */

  function addClass(element, name) {
    var oldList = classList(element),
        newList = oldList + name;

    if (hasClass(oldList, name)) return; 

    // Trim the opening space.
    element.className = newList.substring(1);
  }

  /**
   * (Internal) Removes a class from an element.
   */

  function removeClass(element, name) {
    var oldList = classList(element),
        newList;

    if (!hasClass(element, name)) return;

    // Replace the class name.
    newList = oldList.replace(' ' + name + ' ', ' ');

    // Trim the opening and closing spaces.
    element.className = newList.substring(1, newList.length - 1);
  }

  /**
   * (Internal) Gets a space separated list of the class names on the element. 
   * The list is wrapped with a single space on each end to facilitate finding 
   * matches within the list.
   */

  function classList(element) {
    return (' ' + (element.className || '') + ' ').replace(/\s+/gi, ' ');
  }

  /**
   * (Internal) Removes an element from the DOM.
   */

  function removeElement(element) {
    element && element.parentNode && element.parentNode.removeChild(element);
  }

  return NProgress;
});



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./src/web/app/common/scripts/check-for-update.js
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(1);


/* harmony default export */ var check_for_update_defaultExport = (function() {
	fetch(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].apiUrl + '/meta', {
		method: 'POST'
	}).then(res => {
		res.json().then(meta => {
			if (meta.version != "0.0.2147") {
				localStorage.setItem('should-refresh', 'true');
				alert('New version of Misskey is now available({newer}, current is {current}). Reload page to apply update.'.replace('{newer}', meta.version).replace('{current}', "0.0.2147"));
			}
		});
	});
});;

// CONCATENATED MODULE: ./src/web/app/common/scripts/home-stream.js
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stream__ = __webpack_require__(7);




/**
 * Home stream connection
 */
class Connection extends __WEBPACK_IMPORTED_MODULE_0__stream__["a" /* default */] {
	constructor(me) {
		super('', {
			i: me.token
		});

		this.on('i_updated', me.update);
	}
}

/* harmony default export */ var home_stream_defaultExport = (Connection);

// CONCATENATED MODULE: ./src/web/app/common/mixins/i.js
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_riot__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_riot___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_riot__);


/* harmony default export */ var i_defaultExport = (me => {
	__WEBPACK_IMPORTED_MODULE_0_riot__["mixin"]('i', {
		init: function() {
			this.I = me;
			this.SIGNIN = me != null;

			if (this.SIGNIN) {
				this.on('mount', () => {
					me.on('updated', this.update);
				});
				this.on('unmount', () => {
					me.off('updated', this.update);
				});
			}
		},
		me: me
	});
});

// CONCATENATED MODULE: ./src/web/app/common/mixins/api.js
/* harmony import */ var api___WEBPACK_IMPORTED_MODULE_0_riot__ = __webpack_require__(0);
/* harmony import */ var api___WEBPACK_IMPORTED_MODULE_0_riot___default = __webpack_require__.n(api___WEBPACK_IMPORTED_MODULE_0_riot__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scripts_api__ = __webpack_require__(6);



/* harmony default export */ var api_defaultExport = (me => {
	api___WEBPACK_IMPORTED_MODULE_0_riot__["mixin"]('api', {
		api: __WEBPACK_IMPORTED_MODULE_1__scripts_api__["a" /* default */].bind(null, me ? me.token : null)
	});
});

// CONCATENATED MODULE: ./src/web/app/common/mixins/stream.js
/* harmony import */ var stream___WEBPACK_IMPORTED_MODULE_0_riot__ = __webpack_require__(0);
/* harmony import */ var stream___WEBPACK_IMPORTED_MODULE_0_riot___default = __webpack_require__.n(stream___WEBPACK_IMPORTED_MODULE_0_riot__);


/* harmony default export */ var stream_defaultExport = (stream => {
	stream___WEBPACK_IMPORTED_MODULE_0_riot__["mixin"]('stream', { stream });
});

// CONCATENATED MODULE: ./src/web/app/common/mixins/index.js




/* harmony default export */ var mixins_defaultExport = ((me, stream) => {
	i_defaultExport(me);
	api_defaultExport(me);
	stream_defaultExport(stream);
});

// CONCATENATED MODULE: ./src/web/app/common/scripts/generate-default-userdata.js
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__uuid__ = __webpack_require__(11);


const home = {
	left: [
		'profile',
		'calendar',
		'rss-reader',
		'photo-stream',
		'version'
	],
	right: [
		'broadcast',
		'notifications',
		'user-recommendation',
		'donation',
		'nav',
		'tips'
	]
};

/* harmony default export */ var generate_default_userdata_defaultExport = (() => {
	const homeData = [];

	home.left.forEach(widget => {
		homeData.push({
			name: widget,
			id: Object(__WEBPACK_IMPORTED_MODULE_0__uuid__["a" /* default */])(),
			place: 'left'
		});
	});

	home.right.forEach(widget => {
		homeData.push({
			name: widget,
			id: Object(__WEBPACK_IMPORTED_MODULE_0__uuid__["a" /* default */])(),
			place: 'right'
		});
	});

	const data = {
		home: JSON.stringify(homeData)
	};

	return data;
});

// CONCATENATED MODULE: ./src/web/app/init.js
/* harmony import */ var init___WEBPACK_IMPORTED_MODULE_0_riot__ = __webpack_require__(0);
/* harmony import */ var init___WEBPACK_IMPORTED_MODULE_0_riot___default = __webpack_require__.n(init___WEBPACK_IMPORTED_MODULE_0_riot__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_scripts_api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_scripts_signout__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_scripts_loading__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__common_scripts_config__ = __webpack_require__(1);
/**
 * App initializer
 */












__webpack_require__(20);

/**
 * APP ENTRY POINT!
 */

console.info(`Misskey v${"0.0.2147"}`);

document.domain = __WEBPACK_IMPORTED_MODULE_8__common_scripts_config__["a" /* default */].host;

// Set global configuration
init___WEBPACK_IMPORTED_MODULE_0_riot__["mixin"]({ CONFIG: __WEBPACK_IMPORTED_MODULE_8__common_scripts_config__["a" /* default */] });

// ↓ NodeList、HTMLCollection、FileList、DataTransferItemListで forEach を使えるようにする
if (NodeList.prototype.forEach === undefined) {
	NodeList.prototype.forEach = Array.prototype.forEach;
}
if (HTMLCollection.prototype.forEach === undefined) {
	HTMLCollection.prototype.forEach = Array.prototype.forEach;
}
if (FileList.prototype.forEach === undefined) {
	FileList.prototype.forEach = Array.prototype.forEach;
}
if (window.DataTransferItemList && DataTransferItemList.prototype.forEach === undefined) {
	DataTransferItemList.prototype.forEach = Array.prototype.forEach;
}

// iOSでプライベートモードだとlocalStorageが使えないので既存のメソッドを上書きする
try {
	localStorage.setItem('kyoppie', 'yuppie');
} catch (e) {
	Storage.prototype.setItem = () => { }; // noop
}

// クライアントを更新すべきならする
if (localStorage.getItem('should-refresh') == 'true') {
	localStorage.removeItem('should-refresh');
	location.reload(true);
}

// 更新チェック
setTimeout(check_for_update_defaultExport, 3000);

// ユーザーをフェッチしてコールバックする
/* harmony default export */ __webpack_exports__["a"] = (callback => {
	// Get cached account data
	let cachedMe = JSON.parse(localStorage.getItem('me'));

	if (cachedMe) {
		fetched(cachedMe);

		// 後から新鮮なデータをフェッチ
		fetchme(cachedMe.token, freshData => {
			Object.assign(cachedMe, freshData);
			cachedMe.trigger('updated');
		});
	} else {
		// Get token from cookie
		const i = (document.cookie.match(/i=(!\w+)/) || [null, null])[1];

		fetchme(i, fetched);
	}

	// フェッチが完了したとき
	function fetched(me) {
		if (me) {
			init___WEBPACK_IMPORTED_MODULE_0_riot__["observable"](me);

			// この me オブジェクトを更新するメソッド
			me.update = data => {
				if (data) Object.assign(me, data);
				me.trigger('updated');
			};

			// ローカルストレージにキャッシュ
			localStorage.setItem('me', JSON.stringify(me));

			me.on('updated', () => {
				// キャッシュ更新
				localStorage.setItem('me', JSON.stringify(me));
			});
		}

		// Init home stream connection
		const stream = me ? new home_stream_defaultExport(me) : null;

		// ミックスイン初期化
		mixins_defaultExport(me, stream);

		// ローディング画面クリア
		const ini = document.getElementById('ini');
		ini.parentNode.removeChild(ini);

		// アプリ基底要素マウント
		const app = document.createElement('div');
		app.setAttribute('id', 'app');
		document.body.appendChild(app);

		try {
			callback(me, stream);
		} catch (e) {
			panic(e);
		}
	}
});

// ユーザーをフェッチしてコールバックする
function fetchme(token, cb) {
	let me = null;

	// Return when not signed in
	if (token == null) {
		return done();
	}

	// Fetch user
	fetch(`${__WEBPACK_IMPORTED_MODULE_8__common_scripts_config__["a" /* default */].apiUrl}/i`, {
		method: 'POST',
		body: JSON.stringify({
			i: token
		})
	}).then(res => { // When success
		// When failed to authenticate user
		if (res.status !== 200) {
			return Object(__WEBPACK_IMPORTED_MODULE_2__common_scripts_signout__["a" /* default */])();
		}

		res.json().then(i => {
			me = i;
			me.token = token;

			// initialize it if user data is empty
			me.data ? done() : init();
		});
	}, () => { // When failure
		// Render the error screen
		document.body.innerHTML = '<mk-error />';
		init___WEBPACK_IMPORTED_MODULE_0_riot__["mount"]('*');
		__WEBPACK_IMPORTED_MODULE_5__common_scripts_loading__["a" /* default */].done();
	});

	function done() {
		if (cb) cb(me);
	}

	// Initialize user data
	function init() {
		const data = generate_default_userdata_defaultExport();
		Object(__WEBPACK_IMPORTED_MODULE_1__common_scripts_api__["a" /* default */])(token, 'i/appdata/set', {
			data
		}).then(() => {
			me.data = data;
			done();
		});
	}
}

// BSoD
function panic(e) {
	console.error(e);

	// Display blue screen
	document.documentElement.style.background = '#1269e2';
	document.body.innerHTML =
		'<div id="error">'
			+ '<h1>:( 致命的な問題が発生しました。</h1>'
			+ '<p>お使いのブラウザ(またはOS)のバージョンを更新すると解決する可能性があります。</p>'
			+ '<hr>'
			+ `<p>エラーコード: ${e.toString()}</p>`
			+ `<p>ブラウザ バージョン: ${navigator.userAgent}</p>`
			+ `<p>クライアント バージョン: ${"0.0.2147"}</p>`
			+ '<hr>'
			+ '<p>問題が解決しない場合は、上記の情報をお書き添えの上 syuilotan@yahoo.co.jp までご連絡ください。</p>'
			+ '<p>Thank you for using Misskey.</p>'
		+ '</div>';

	// TODO: Report the bug
}


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(21);
__webpack_require__(22);
__webpack_require__(23);
__webpack_require__(24);
__webpack_require__(25);
__webpack_require__(26);
__webpack_require__(27);
__webpack_require__(28);
__webpack_require__(29);
__webpack_require__(30);
__webpack_require__(31);
__webpack_require__(32);
__webpack_require__(34);
__webpack_require__(35);
__webpack_require__(36);
__webpack_require__(37);
__webpack_require__(38);
__webpack_require__(39);
__webpack_require__(40);
__webpack_require__(41);
__webpack_require__(42);
__webpack_require__(43);
__webpack_require__(44);
__webpack_require__(45);
__webpack_require__(46);
__webpack_require__(47);
__webpack_require__(48);
__webpack_require__(49);
__webpack_require__(50);
__webpack_require__(51);


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-error', '<img src="/assets/error.jpg" alt=""><h1>Unable to connect to the server</h1><p class="text">インターネット回線に問題があるか、サーバーがダウンまたはメンテナンスしている可能性があります。しばらくしてから再度お試しください。</p><p class="thanks">Thank you for using Misskey.</p>', 'mk-error,[data-is="mk-error"]{display:block;width:100%;padding:32px 18px;text-align:center;} mk-error > img,[data-is="mk-error"] > img{display:block;height:200px;margin:0 auto;pointer-events:none;user-select:none} mk-error > h1,[data-is="mk-error"] > h1{display:block;margin:1.25em auto .65em auto;font-size:1.5em;color:#555} mk-error > .text,[data-is="mk-error"] > .text{display:block;margin:0 auto;max-width:600px;font-size:1em;color:#666} mk-error > .thanks,[data-is="mk-error"] > .thanks{display:block;margin:2em auto 0 auto;padding:2em 0 0 0;max-width:600px;font-size:.9em;font-style:oblique;color:#aaa;border-top:solid 1px #eee}@media (max-width:500px){ mk-error,[data-is="mk-error"]{padding:24px 18px;font-size:80%} mk-error > img,[data-is="mk-error"] > img{height:150px}}', '', function(opts) {
		this.on('mount', () => {
			document.title = 'Oops!';
			document.documentElement.style.background = '#f8f8f8';
		});
});

    
  

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-url', '<a href="{url}" target="{opts.target}"><span class="schema">{schema}//</span><span class="hostname">{hostname}</span><span class="port" if="{port != \'\'}">:{port}</span><span class="pathname" if="{pathname != \'\'}">{pathname}</span><span class="query">{query}</span><span class="hash">{hash}</span></a>', 'mk-url,[data-is="mk-url"]{word-break:break-all;} mk-url > a:after,[data-is="mk-url"] > a:after{content:"\\f14c";display:inline-block;padding-left:2px;font-family:FontAwesome;font-size:.9em;font-weight:400;font-style:normal} mk-url > a > .schema,[data-is="mk-url"] > a > .schema{opacity:.5} mk-url > a > .hostname,[data-is="mk-url"] > a > .hostname{font-weight:bold} mk-url > a > .pathname,[data-is="mk-url"] > a > .pathname{opacity:.8} mk-url > a > .query,[data-is="mk-url"] > a > .query{opacity:.5} mk-url > a > .hash,[data-is="mk-url"] > a > .hash{font-style:italic}', '', function(opts) {
		this.url = this.opts.href;

		this.on('before-mount', () => {
			const url = new URL(this.url);

			this.schema = url.protocol;
			this.hostname = url.hostname;
			this.port = url.port;
			this.pathname = url.pathname;
			this.query = url.search;
			this.hash = url.hash;

			this.update();
		});
});

    
  

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-url-preview', '<a href="{url}" target="_blank" title="{url}" if="{!loading}"><div class="thumbnail" if="{thumbnail}" riot-style="{\'background-image: url(\' + thumbnail + \')\'}"></div><article><header><h1>{title}</h1></header><p>{description}</p><footer><img class="icon" if="{icon}" riot-src="{icon}"><p>{sitename}</p></footer></article></a>', 'mk-url-preview,[data-is="mk-url-preview"]{display:block;font-size:16px;} mk-url-preview > a,[data-is="mk-url-preview"] > a{display:block;border:solid 1px #eee;border-radius:4px;overflow:hidden;} mk-url-preview > a:hover,[data-is="mk-url-preview"] > a:hover{text-decoration:none;border-color:#ddd;} mk-url-preview > a:hover > article > header > h1,[data-is="mk-url-preview"] > a:hover > article > header > h1{text-decoration:underline} mk-url-preview > a > .thumbnail,[data-is="mk-url-preview"] > a > .thumbnail{position:absolute;width:100px;height:100%;background-position:center;background-size:cover;} mk-url-preview > a > .thumbnail + article,[data-is="mk-url-preview"] > a > .thumbnail + article{left:100px;width:calc(100% - 100px)} mk-url-preview > a > article,[data-is="mk-url-preview"] > a > article{padding:16px;} mk-url-preview > a > article > header,[data-is="mk-url-preview"] > a > article > header{margin-bottom:8px;} mk-url-preview > a > article > header > h1,[data-is="mk-url-preview"] > a > article > header > h1{margin:0;font-size:1em;color:#555} mk-url-preview > a > article > p,[data-is="mk-url-preview"] > a > article > p{margin:0;color:#777;font-size:.8em} mk-url-preview > a > article > footer,[data-is="mk-url-preview"] > a > article > footer{margin-top:8px;height:16px;} mk-url-preview > a > article > footer > img,[data-is="mk-url-preview"] > a > article > footer > img{display:inline-block;width:16px;height:16px;margin-right:4px;vertical-align:top} mk-url-preview > a > article > footer > p,[data-is="mk-url-preview"] > a > article > footer > p{display:inline-block;margin:0;color:#666;font-size:.8em;line-height:16px;vertical-align:top}@media (max-width:500px){ mk-url-preview,[data-is="mk-url-preview"]{font-size:8px} mk-url-preview > a,[data-is="mk-url-preview"] > a{border:none;} mk-url-preview > a > .thumbnail,[data-is="mk-url-preview"] > a > .thumbnail{width:70px;} mk-url-preview > a > .thumbnail + article,[data-is="mk-url-preview"] > a > .thumbnail + article{left:70px;width:calc(100% - 70px)} mk-url-preview > a > article,[data-is="mk-url-preview"] > a > article{padding:8px}}', '', function(opts) {
		this.mixin('api');

		this.url = this.opts.url;
		this.loading = true;

		this.on('mount', () => {
			fetch('/api:url?url=' + this.url).then(res => {
				res.json().then(info => {
					this.title = info.title;
					this.description = info.description;
					this.thumbnail = info.thumbnail;
					this.icon = info.icon;
					this.sitename = info.sitename;

					this.loading = false;
					this.update();
				});
			});
		});
});

    
  

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-time', '<time datetime="{opts.time}"><span if="{mode == \'relative\'}">{relative}</span><span if="{mode == \'absolute\'}">{absolute}</span><span if="{mode == \'detail\'}">{absolute} ({relative})</span></time>', '', '', function(opts) {
		this.time = new Date(this.opts.time);
		this.mode = this.opts.mode || 'relative';
		this.tickid = null;

		this.absolute =
			this.time.getFullYear()    + '年' +
			(this.time.getMonth() + 1) + '月' +
			this.time.getDate()        + '日' +
			' ' +
			this.time.getHours()       + '時' +
			this.time.getMinutes()     + '分';

		this.on('mount', () => {
			if (this.mode == 'relative' || this.mode == 'detail') {
				this.tick();
				this.tickid = setInterval(this.tick, 1000);
			}
		});

		this.on('unmount', () => {
			if (this.mode === 'relative' || this.mode === 'detail') {
				clearInterval(this.tickid);
			}
		});

		this.tick = () => {
			const now = new Date();
			const ago = (now - this.time) / 1000 ;
			this.relative =
				ago >= 31536000 ? '{}year(s) ago'  .replace('{}', ~~(ago / 31536000)) :
				ago >= 2592000  ? '{}month(s) ago' .replace('{}', ~~(ago / 2592000)) :
				ago >= 604800   ? '{}week(s) ago'  .replace('{}', ~~(ago / 604800)) :
				ago >= 86400    ? '{}d ago'   .replace('{}', ~~(ago / 86400)) :
				ago >= 3600     ? '{}h ago'  .replace('{}', ~~(ago / 3600)) :
				ago >= 60       ? '{}m ago'.replace('{}', ~~(ago / 60)) :
				ago >= 10       ? '{}s ago'.replace('{}', ~~(ago % 60)) :
				ago >= 0        ? 'just now' :
				ago <  0        ? 'future' :
				'unknown';
			this.update();
		};
});

    
  

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-file-type-icon', '<i class="fa fa-file-image-o" if="{kind == \'image\'}"></i>', 'mk-file-type-icon,[data-is="mk-file-type-icon"]{display:inline}', '', function(opts) {
		this.kind = this.opts.type.split('/')[0];
});

    
  

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-uploader', '<ol if="{uploads.length > 0}"><li each="{uploads}"><div class="img" riot-style="background-image: url({img})"></div><p class="name"><i class="fa fa-spinner fa-pulse"></i>{name}</p><p class="status"><span class="initing" if="{progress == undefined}">Waiting<mk-ellipsis></mk-ellipsis></span><span class="kb" if="{progress != undefined}">{String(Math.floor(progress.value / 1024)).replace(/(\\d)(?=(\\d\\d\\d)+(?!\\d))/g, \'$1,\')}<i>KB</i> / {String(Math.floor(progress.max / 1024)).replace(/(\\d)(?=(\\d\\d\\d)+(?!\\d))/g, \'$1,\')}<i>KB</i></span><span class="percentage" if="{progress != undefined}">{Math.floor((progress.value / progress.max) * 100)}</span></p><progress if="{progress != undefined && progress.value != progress.max}" riot-value="{progress.value}" max="{progress.max}"></progress><div class="progress initing" if="{progress == undefined}"></div><div class="progress waiting" if="{progress != undefined && progress.value == progress.max}"></div></li></ol>', 'mk-uploader,[data-is="mk-uploader"]{display:block;overflow:auto;} mk-uploader:empty,[data-is="mk-uploader"]:empty{display:none} mk-uploader > ol,[data-is="mk-uploader"] > ol{display:block;margin:0;padding:0;list-style:none;} mk-uploader > ol > li,[data-is="mk-uploader"] > ol > li{display:block;margin:8px 0 0 0;padding:0;height:36px;box-shadow:0 -1px 0 rgba(135,187,53,0.1);border-top:solid 8px transparent;} mk-uploader > ol > li:first-child,[data-is="mk-uploader"] > ol > li:first-child{margin:0;box-shadow:none;border-top:none} mk-uploader > ol > li > .img,[data-is="mk-uploader"] > ol > li > .img{display:block;position:absolute;top:0;left:0;width:36px;height:36px;background-size:cover;background-position:center center} mk-uploader > ol > li > .name,[data-is="mk-uploader"] > ol > li > .name{display:block;position:absolute;top:0;left:44px;margin:0;padding:0;max-width:256px;font-size:.8em;color:rgba(135,187,53,0.7);white-space:nowrap;text-overflow:ellipsis;overflow:hidden;} mk-uploader > ol > li > .name > i,[data-is="mk-uploader"] > ol > li > .name > i{margin-right:4px} mk-uploader > ol > li > .status,[data-is="mk-uploader"] > ol > li > .status{display:block;position:absolute;top:0;right:0;margin:0;padding:0;font-size:.8em;} mk-uploader > ol > li > .status > .initing,[data-is="mk-uploader"] > ol > li > .status > .initing{color:rgba(135,187,53,0.5)} mk-uploader > ol > li > .status > .kb,[data-is="mk-uploader"] > ol > li > .status > .kb{color:rgba(135,187,53,0.5)} mk-uploader > ol > li > .status > .percentage,[data-is="mk-uploader"] > ol > li > .status > .percentage{display:inline-block;width:48px;text-align:right;color:rgba(135,187,53,0.7);} mk-uploader > ol > li > .status > .percentage:after,[data-is="mk-uploader"] > ol > li > .status > .percentage:after{content:\'%\'} mk-uploader > ol > li > progress,[data-is="mk-uploader"] > ol > li > progress{display:block;position:absolute;bottom:0;right:0;margin:0;width:calc(100% - 44px);height:8px;background:transparent;border:none;border-radius:4px;overflow:hidden;} mk-uploader > ol > li > progress::-webkit-progress-value,[data-is="mk-uploader"] > ol > li > progress::-webkit-progress-value{background:#87bb35} mk-uploader > ol > li > progress::-webkit-progress-bar,[data-is="mk-uploader"] > ol > li > progress::-webkit-progress-bar{background:rgba(135,187,53,0.1)} mk-uploader > ol > li > .progress,[data-is="mk-uploader"] > ol > li > .progress{display:block;position:absolute;bottom:0;right:0;margin:0;width:calc(100% - 44px);height:8px;border:none;border-radius:4px;background:linear-gradient(45deg,#acd56c 25%,#87bb35 25%,#87bb35 50%,#acd56c 50%,#acd56c 75%,#87bb35 75%,#87bb35);background-size:32px 32px;animation:bg 1.5s linear infinite;} mk-uploader > ol > li > .progress.initing,[data-is="mk-uploader"] > ol > li > .progress.initing{opacity:.3}@-moz-keyframes bg{ from{background-position:0 0} to{background-position:-64px 32px}}@-webkit-keyframes bg{ from{background-position:0 0} to{background-position:-64px 32px}}@-o-keyframes bg{ from{background-position:0 0} to{background-position:-64px 32px}}@keyframes bg{ from{background-position:0 0} to{background-position:-64px 32px}}', '', function(opts) {
		this.mixin('i');

		this.uploads = [];

		this.upload = (file, folder) => {
			if (folder && typeof folder == 'object') folder = folder.id;

			const id = Math.random();

			const ctx = {
				id: id,
				name: file.name || 'untitled',
				progress: undefined
			};

			this.uploads.push(ctx);
			this.trigger('change-uploads', this.uploads);
			this.update();

			const reader = new FileReader();
			reader.onload = e => {
				ctx.img = e.target.result;
				this.update();
			};
			reader.readAsDataURL(file);

			const data = new FormData();
			data.append('i', this.I.token);
			data.append('file', file);

			if (folder) data.append('folder_id', folder);

			const xhr = new XMLHttpRequest();
			xhr.open('POST', this.CONFIG.apiUrl + '/drive/files/create', true);
			xhr.onload = e => {
				const driveFile = JSON.parse(e.target.response);

				this.trigger('uploaded', driveFile);

				this.uploads = this.uploads.filter(x => x.id != id);
				this.trigger('change-uploads', this.uploads);

				this.update();
			};

			xhr.upload.onprogress = e => {
				if (e.lengthComputable) {
					if (ctx.progress == undefined) ctx.progress = {};
					ctx.progress.max = e.total;
					ctx.progress.value = e.loaded;
					this.update();
				}
			};

			xhr.send(data);
		};
});

    
  

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-ellipsis', '<span>.</span><span>.</span><span>.</span>', 'mk-ellipsis,[data-is="mk-ellipsis"]{display:inline;} mk-ellipsis > span,[data-is="mk-ellipsis"] > span{animation:ellipsis 1.4s infinite ease-in-out both;} mk-ellipsis > span:nth-child(1),[data-is="mk-ellipsis"] > span:nth-child(1){animation-delay:0s} mk-ellipsis > span:nth-child(2),[data-is="mk-ellipsis"] > span:nth-child(2){animation-delay:.16s} mk-ellipsis > span:nth-child(3),[data-is="mk-ellipsis"] > span:nth-child(3){animation-delay:.32s}@-moz-keyframes ellipsis{ 0%,80%,100%{opacity:1} 40%{opacity:0}}@-webkit-keyframes ellipsis{ 0%,80%,100%{opacity:1} 40%{opacity:0}}@-o-keyframes ellipsis{ 0%,80%,100%{opacity:1} 40%{opacity:0}}@keyframes ellipsis{ 0%,80%,100%{opacity:1} 40%{opacity:0}}', '', function(opts) {
});

    
  

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-raw', '', 'mk-raw,[data-is="mk-raw"]{display:inline}', '', function(opts) {
		this.root.innerHTML = this.opts.content;
});

    
  

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-number', '', 'mk-number,[data-is="mk-number"]{display:inline}', '', function(opts) {
		this.on('mount', () => {
			let value = this.opts.value;
			const max = this.opts.max;

			if (max != null && value > max) value = max;

			this.root.innerHTML = value.toLocaleString();
		});
});

    
  

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-special-message', '<p if="{m == 1 && d == 1}">Happy New Year!</p><p if="{m == 12 && d == 25}">Merry Christmas!</p>', 'mk-special-message,[data-is="mk-special-message"]{display:block;} mk-special-message:empty,[data-is="mk-special-message"]:empty{display:none} mk-special-message > p,[data-is="mk-special-message"] > p{margin:0;padding:4px;text-align:center;font-size:14px;font-weight:bold;text-transform:uppercase;color:#fff;background:#ff1036}', '', function(opts) {
		const now = new Date();
		this.d = now.getDate();
		this.m = now.getMonth() + 1;
});

    
  

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-signin', '<form class="{signing: signing}" onsubmit="{onsubmit}"><label class="user-name"><input ref="username" type="text" pattern="^[a-zA-Z0-9-]+$" placeholder="Username" autofocus="autofocus" required="required" oninput="{oninput}"><i class="fa fa-at"></i></label><label class="password"><input ref="password" type="password" placeholder="Password" required="required"><i class="fa fa-lock"></i></label><button type="submit" disabled="{signing}">{signing ? \'Signing in...\' : \'Sign in\'}</button></form>', 'mk-signin,[data-is="mk-signin"]{display:block;} mk-signin > form,[data-is="mk-signin"] > form{display:block;z-index:2;} mk-signin > form.signing,[data-is="mk-signin"] > form.signing,mk-signin > form.signing *,[data-is="mk-signin"] > form.signing *{cursor:wait !important} mk-signin > form label,[data-is="mk-signin"] > form label{display:block;margin:12px 0;} mk-signin > form label i,[data-is="mk-signin"] > form label i{display:block;pointer-events:none;position:absolute;bottom:0;top:0;left:0;z-index:1;margin:auto;padding:0 16px;height:1em;color:#898786} mk-signin > form label input[type=text],[data-is="mk-signin"] > form label input[type=text],mk-signin > form label input[type=password],[data-is="mk-signin"] > form label input[type=password]{user-select:text;display:inline-block;cursor:auto;padding:0 0 0 38px;margin:0;width:100%;line-height:44px;font-size:1em;color:rgba(0,0,0,0.7);background:#fff;outline:none;border:solid 1px #eee;border-radius:4px;} mk-signin > form label input[type=text]:hover,[data-is="mk-signin"] > form label input[type=text]:hover,mk-signin > form label input[type=password]:hover,[data-is="mk-signin"] > form label input[type=password]:hover{background:rgba(255,255,255,0.7);border-color:#ddd;} mk-signin > form label input[type=text]:hover + i,[data-is="mk-signin"] > form label input[type=text]:hover + i,mk-signin > form label input[type=password]:hover + i,[data-is="mk-signin"] > form label input[type=password]:hover + i{color:#797776} mk-signin > form label input[type=text]:focus,[data-is="mk-signin"] > form label input[type=text]:focus,mk-signin > form label input[type=password]:focus,[data-is="mk-signin"] > form label input[type=password]:focus{background:#fff;border-color:#ccc;} mk-signin > form label input[type=text]:focus + i,[data-is="mk-signin"] > form label input[type=text]:focus + i,mk-signin > form label input[type=password]:focus + i,[data-is="mk-signin"] > form label input[type=password]:focus + i{color:#797776} mk-signin > form [type=submit],[data-is="mk-signin"] > form [type=submit]{cursor:pointer;padding:16px;margin:-6px 0 0 0;width:100%;font-size:1.2em;color:rgba(0,0,0,0.5);outline:none;border:none;border-radius:0;background:transparent;transition:all .5s ease;} mk-signin > form [type=submit]:hover,[data-is="mk-signin"] > form [type=submit]:hover{color:#87bb35;transition:all .2s ease} mk-signin > form [type=submit]:focus,[data-is="mk-signin"] > form [type=submit]:focus{color:#87bb35;transition:all .2s ease} mk-signin > form [type=submit]:active,[data-is="mk-signin"] > form [type=submit]:active{color:#5f8325;transition:all .2s ease} mk-signin > form [type=submit]:disabled,[data-is="mk-signin"] > form [type=submit]:disabled{opacity:.7}', '', function(opts) {
		this.mixin('api');

		this.user = null;
		this.signing = false;

		this.oninput = () => {
			this.api('users/show', {
				username: this.refs.username.value
			}).then(user => {
				this.user = user;
				this.trigger('user', user);
				this.update();
			});
		};

		this.onsubmit = e => {
			e.preventDefault();

			if (this.refs.username.value == '') {
				this.refs.username.focus();
				return false;
			}
			if (this.refs.password.value == '') {
				this.refs.password.focus();
				return false;
			}

			this.update({
				signing: true
			});

			this.api('signin', {
				username: this.refs.username.value,
				password: this.refs.password.value
			}).then(() => {
				location.reload();
			}).catch(() => {
				alert('something happened');
				this.update({
					signing: false
				});
			});

			return false;
		};
});

    
  

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-signup', '<form onsubmit="{onsubmit}" autocomplete="off"><label class="username"><p class="caption"><i class="fa fa-at"></i>Username</p><input ref="username" type="text" pattern="^[a-zA-Z0-9-]{3,20}$" placeholder="a~z、A~Z、0~9、-" autocomplete="off" required="required" onkeyup="{onChangeUsername}"><p class="profile-page-url-preview" if="{refs.username.value != \'\' && username-state != \'invalidFormat\' && username-state != \'minRange\' && username-state != \'maxRange\'}">{\'/\' + refs.username.value}</p><p class="info" if="{usernameState == \'wait\'}" style="color:#999"><i class="fa fa-fw fa-spinner fa-pulse"></i>Checking...</p><p class="info" if="{usernameState == \'ok\'}" style="color:#3CB7B5"><i class="fa fa-fw fa-check"></i>Available</p><p class="info" if="{usernameState == \'unavailable\'}" style="color:#FF1161"><i class="fa fa-fw fa-exclamation-triangle"></i>Unavailable</p><p class="info" if="{usernameState == \'error\'}" style="color:#FF1161"><i class="fa fa-fw fa-exclamation-triangle"></i>Network error</p><p class="info" if="{usernameState == \'invalid-format\'}" style="color:#FF1161"><i class="fa fa-fw fa-exclamation-triangle"></i>Only use letters, numbers and -.</p><p class="info" if="{usernameState == \'min-range\'}" style="color:#FF1161"><i class="fa fa-fw fa-exclamation-triangle"></i>3Please enter at least 3 letters！</p><p class="info" if="{usernameState == \'max-range\'}" style="color:#FF1161"><i class="fa fa-fw fa-exclamation-triangle"></i>Please enter within 20 letters.</p></label><label class="password"><p class="caption"><i class="fa fa-lock"></i>Password</p><input ref="password" type="password" placeholder="We recommend more than 8 letters." autocomplete="off" required="required" onkeyup="{onChangePassword}"><div class="meter" if="{passwordStrength != \'\'}" data-strength="{passwordStrength}"><div class="value" ref="passwordMetar"></div></div><p class="info" if="{passwordStrength == \'low\'}" style="color:#FF1161"><i class="fa fa-fw fa-exclamation-triangle"></i>Weak</p><p class="info" if="{passwordStrength == \'medium\'}" style="color:#3CB7B5"><i class="fa fa-fw fa-check"></i>So so</p><p class="info" if="{passwordStrength == \'high\'}" style="color:#3CB7B5"><i class="fa fa-fw fa-check"></i>Strong</p></label><label class="retype-password"><p class="caption"><i class="fa fa-lock"></i>Password(Type again)</p><input ref="passwordRetype" type="password" placeholder="Confirm your password" autocomplete="off" required="required" onkeyup="{onChangePasswordRetype}"><p class="info" if="{passwordRetypeState == \'match\'}" style="color:#3CB7B5"><i class="fa fa-fw fa-check"></i>OK</p><p class="info" if="{passwordRetypeState == \'not-match\'}" style="color:#FF1161"><i class="fa fa-fw fa-exclamation-triangle"></i>Not matched</p></label><label class="recaptcha"><p class="caption"><i class="fa fa-toggle-on" if="{recaptchaed}"></i><i class="fa fa-toggle-off" if="{!recaptchaed}"></i>Verify</p><div if="{recaptcha}" class="g-recaptcha" data-callback="onRecaptchaed" data-expired-callback="onRecaptchaExpired" data-sitekey="{recaptcha.siteKey}"></div></label><label class="agree-tou"><input name="agree-tou" type="checkbox" autocomplete="off" required="required"><p><a href="https://github.com/syuilo/misskey/blob/master/src/docs/tou.md" target="_blank">利用規約</a>に同意する</p></label><button onclick="{onsubmit}">Create an Account</button></form>', 'mk-signup,[data-is="mk-signup"]{display:block;min-width:302px;overflow:hidden;} mk-signup > form label,[data-is="mk-signup"] > form label{display:block;margin:16px 0;} mk-signup > form label > .caption,[data-is="mk-signup"] > form label > .caption{margin:0 0 4px 0;color:#828888;font-size:.95em;} mk-signup > form label > .caption > i,[data-is="mk-signup"] > form label > .caption > i{margin-right:.25em;color:#96adac} mk-signup > form label > .info,[data-is="mk-signup"] > form label > .info{display:block;margin:4px 0;font-size:.8em;} mk-signup > form label > .info > i,[data-is="mk-signup"] > form label > .info > i{margin-right:.3em} mk-signup > form label.username .profile-page-url-preview,[data-is="mk-signup"] > form label.username .profile-page-url-preview{display:block;margin:4px 8px 0 4px;font-size:.8em;color:#888;} mk-signup > form label.username .profile-page-url-preview:empty,[data-is="mk-signup"] > form label.username .profile-page-url-preview:empty{display:none} mk-signup > form label.username .profile-page-url-preview:not(:empty) + .info,[data-is="mk-signup"] > form label.username .profile-page-url-preview:not(:empty) + .info{margin-top:0} mk-signup > form label.password .meter,[data-is="mk-signup"] > form label.password .meter{display:block;margin-top:8px;width:100%;height:8px;} mk-signup > form label.password .meter[data-strength=\'\'],[data-is="mk-signup"] > form label.password .meter[data-strength=\'\']{display:none} mk-signup > form label.password .meter[data-strength=\'low\'] > .value,[data-is="mk-signup"] > form label.password .meter[data-strength=\'low\'] > .value{background:#d73612} mk-signup > form label.password .meter[data-strength=\'medium\'] > .value,[data-is="mk-signup"] > form label.password .meter[data-strength=\'medium\'] > .value{background:#d7ca12} mk-signup > form label.password .meter[data-strength=\'high\'] > .value,[data-is="mk-signup"] > form label.password .meter[data-strength=\'high\'] > .value{background:#61bb22} mk-signup > form label.password .meter > .value,[data-is="mk-signup"] > form label.password .meter > .value{display:block;width:0%;height:100%;background:transparent;border-radius:4px;transition:all .1s ease} mk-signup > form [type=text],[data-is="mk-signup"] > form [type=text],mk-signup > form [type=password],[data-is="mk-signup"] > form [type=password]{user-select:text;display:inline-block;cursor:auto;padding:0 12px;margin:0;width:100%;line-height:44px;font-size:1em;color:#333 !important;background:#fff !important;outline:none;border:solid 1px rgba(0,0,0,0.1);border-radius:4px;box-shadow:0 0 0 114514px #fff inset;transition:all .3s ease;} mk-signup > form [type=text]:hover,[data-is="mk-signup"] > form [type=text]:hover,mk-signup > form [type=password]:hover,[data-is="mk-signup"] > form [type=password]:hover{border-color:rgba(0,0,0,0.2);transition:all .1s ease} mk-signup > form [type=text]:focus,[data-is="mk-signup"] > form [type=text]:focus,mk-signup > form [type=password]:focus,[data-is="mk-signup"] > form [type=password]:focus{color:#87bb35 !important;border-color:#87bb35;box-shadow:0 0 0 1024px #fff inset,0 0 0 4px rgba(135,187,53,0.1);transition:all 0s ease} mk-signup > form [type=text]:disabled,[data-is="mk-signup"] > form [type=text]:disabled,mk-signup > form [type=password]:disabled,[data-is="mk-signup"] > form [type=password]:disabled{opacity:.5} mk-signup > form .agree-tou,[data-is="mk-signup"] > form .agree-tou{padding:4px;border-radius:4px;} mk-signup > form .agree-tou:hover,[data-is="mk-signup"] > form .agree-tou:hover{background:#f4f4f4} mk-signup > form .agree-tou:active,[data-is="mk-signup"] > form .agree-tou:active{background:#eee} mk-signup > form .agree-tou,[data-is="mk-signup"] > form .agree-tou,mk-signup > form .agree-tou *,[data-is="mk-signup"] > form .agree-tou *{cursor:pointer} mk-signup > form .agree-tou p,[data-is="mk-signup"] > form .agree-tou p{display:inline;color:#555} mk-signup > form button,[data-is="mk-signup"] > form button{margin:0 0 32px 0;padding:16px;width:100%;font-size:1em;color:#fff;background:#87bb35;border-radius:3px;} mk-signup > form button:hover,[data-is="mk-signup"] > form button:hover{background:#8fc638} mk-signup > form button:active,[data-is="mk-signup"] > form button:active{background:#80b232}', '', function(opts) {
		this.mixin('api');
		const getPasswordStrength = __webpack_require__(33);

		this.usernameState = null;
		this.passwordStrength = '';
		this.passwordRetypeState = null;
		this.recaptchaed = false;

		window.onEecaptchaed = () => {
			this.recaptchaed = true;
			this.update();
		};

		window.onRecaptchaExpired = () => {
			this.recaptchaed = false;
			this.update();
		};

		this.on('mount', () => {
			fetch('/config.json').then(res => {
				res.json().then(conf => {
					this.update({
						recaptcha: {
							siteKey: conf.recaptcha.siteKey
						}
					});

					const head = document.getElementsByTagName('head')[0];
					const script = document.createElement('script');
					script.setAttribute('src', 'https://www.google.com/recaptcha/api.js');
					head.appendChild(script);
				});
			});
		});

		this.onChangeUsername = () => {
			const username = this.refs.username.value;

			if (username == '') {
				this.update({
					usernameState: null
				});
				return;
			}

			const err =
				!username.match(/^[a-zA-Z0-9\-]+$/) ? 'invalid-format' :
				username.length < 3 ? 'min-range' :
				username.length > 20 ? 'max-range' :
				null;

			if (err) {
				this.update({
					usernameState: err
				});
				return;
			}

			this.update({
				usernameState: 'wait'
			});

			this.api('username/available', {
				username: username
			}).then(result => {
				this.update({
					usernameState: result.available ? 'ok' : 'unavailable'
				});
			}).catch(err => {
				this.update({
					usernameState: 'error'
				});
			});
		};

		this.onChangePassword = () => {
			const password = this.refs.password.value;

			if (password == '') {
				this.passwordStrength = '';
				return;
			}

			const strength = getPasswordStrength(password);
			this.passwordStrength = strength > 0.7 ? 'high' : strength > 0.3 ? 'medium' : 'low';
			this.update();
			this.refs.passwordMetar.style.width = `${strength * 100}%`;
		};

		this.onChangePasswordRetype = () => {
			const password = this.refs.password.value;
			const retypedPassword = this.refs.passwordRetype.value;

			if (retypedPassword == '') {
				this.passwordRetypeState = null;
				return;
			}

			this.passwordRetypeState = password == retypedPassword ? 'match' : 'not-match';
		};

		this.onsubmit = e => {
			e.preventDefault();

			const username = this.refs.username.value;
			const password = this.refs.password.value;

			const locker = document.body.appendChild(document.createElement('mk-locker'));

			this.api('signup', {
				username: username,
				password: password,
				'g-recaptcha-response': grecaptcha.getResponse()
			}).then(() => {
				this.api('signin', {
					username: username,
					password: password
				}).then(() => {
					location.href = '/';
				});
			}).catch(() => {
				alert('Account creation failed for some reason. Please try again.');

				grecaptcha.reset();
				this.recaptchaed = false;

				locker.parentNode.removeChild(locker);
			});

			return false;
		};
});

    
  

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * strength.js
 *
 * @version  0.0.1
 * @url https://github.com/syuilo/strength.js
 *
 * Copyright 2016 syuilo.
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

(function(definition) {
	'use strict';

	// CommonJS
	if (true) {
		module.exports = definition();

	// RequireJS
	} else if (typeof define === 'function' && define.amd) {
		define(definition);

	// <script>
	} else {
		window.WavesEffect = definition();
	}
})(function() {
	'use strict';

	return function(source) {
		var strength = 0;
		var power = 0.018;

		// 英数字
		if (/[a-zA-Z]/.test(source) && /[0-9]/.test(source)) {
			power += 0.020;
		}

		// 大文字と小文字が混ざってたら
		if (/[a-z]/.test(source) && /[A-Z]/.test(source)) {
			power += 0.015;
		}

		// 記号が混ざってたら
		if (/[!\x22\#$%&@'()*+,-./_]/.test(source)) {
			power += 0.02;
		}

		strength = power * source.length;

		if (strength < 0) {
			strength = 0;
		}

		if (strength > 1) {
			strength = 1;
		}

		return strength;
	};
});

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-forkit', '<a href="https://github.com/syuilo/misskey" target="_blank" title="View source on Github" aria-label="View source on Github"><svg width="80" height="80" viewbox="0 0 250 250" aria-hidden="aria-hidden"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path class="octo-arm" d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor"></path></svg></a>', 'mk-forkit,[data-is="mk-forkit"]{display:block;position:absolute;top:0;right:0;} mk-forkit > a,[data-is="mk-forkit"] > a{display:block;} mk-forkit > a > svg,[data-is="mk-forkit"] > a > svg{display:block;fill:#87bb35;color:#fff} mk-forkit .octo-arm,[data-is="mk-forkit"] .octo-arm{transform-origin:130px 106px} mk-forkit:hover .octo-arm,[data-is="mk-forkit"]:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@-moz-keyframes octocat-wave{ 0%,100%{transform:rotate(0)} 20%,60%{transform:rotate(-25deg)} 40%,80%{transform:rotate(10deg)}}@-webkit-keyframes octocat-wave{ 0%,100%{transform:rotate(0)} 20%,60%{transform:rotate(-25deg)} 40%,80%{transform:rotate(10deg)}}@-o-keyframes octocat-wave{ 0%,100%{transform:rotate(0)} 20%,60%{transform:rotate(-25deg)} 40%,80%{transform:rotate(10deg)}}@keyframes octocat-wave{ 0%,100%{transform:rotate(0)} 20%,60%{transform:rotate(-25deg)} 40%,80%{transform:rotate(10deg)}}', '', function(opts) {
});

    
  

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-introduction', '<article><h1>Misskeyとは？</h1><p><ruby>Misskey<rt>みすきー</rt></ruby>は、<a href="http://syuilo.com" target="_blank">syuilo</a>が2014年くらいから<a href="https://github.com/syuilo/misskey" target="_blank">オープンソースで</a>開発・運営を行っている、ミニブログベースのSNSです。</p><p>無料で誰でも利用でき、広告も掲載していません。</p><p><a href="{CONFIG.aboutUrl}" target="_blank">もっと知りたい方はこちら</a></p></article>', 'mk-introduction,[data-is="mk-introduction"]{display:block;} mk-introduction h1,[data-is="mk-introduction"] h1{margin:0;text-align:center;font-size:1.2em} mk-introduction p,[data-is="mk-introduction"] p{margin:16px 0;} mk-introduction p:last-child,[data-is="mk-introduction"] p:last-child{margin:0;text-align:center}', '', function(opts) {
});

    
  

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-copyright', '<span>(c) syuilo 2014-2017</span>', 'mk-copyright,[data-is="mk-copyright"]{display:block}', '', function(opts) {
});

    
  

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-signin-history', '<div class="records" if="{history.length != 0}"><div each="{history}"><mk-time time="{created_at}"></mk-time><header><i class="fa fa-check" if="{success}"></i><i class="fa fa-times" if="{!success}"></i><span class="ip">{ip}</span></header><pre><code>{JSON.stringify(headers, null, \'    \')}</code></pre></div></div>', 'mk-signin-history,[data-is="mk-signin-history"]{display:block;} mk-signin-history > .records > div,[data-is="mk-signin-history"] > .records > div{padding:16px 0 0 0;border-bottom:solid 1px #eee;} mk-signin-history > .records > div > header > i,[data-is="mk-signin-history"] > .records > div > header > i{margin-right:8px;} mk-signin-history > .records > div > header > i.fa-check,[data-is="mk-signin-history"] > .records > div > header > i.fa-check{color:#0fda82} mk-signin-history > .records > div > header > i.fa-times,[data-is="mk-signin-history"] > .records > div > header > i.fa-times{color:#ff3100} mk-signin-history > .records > div > header > .ip,[data-is="mk-signin-history"] > .records > div > header > .ip{display:inline-block;color:#444;background:#f8f8f8} mk-signin-history > .records > div > mk-time,[data-is="mk-signin-history"] > .records > div > mk-time{position:absolute;top:16px;right:0;color:#777} mk-signin-history > .records > div > pre,[data-is="mk-signin-history"] > .records > div > pre{overflow:auto;max-height:100px;} mk-signin-history > .records > div > pre > code,[data-is="mk-signin-history"] > .records > div > pre > code{white-space:pre-wrap;word-break:break-all;color:#4a535a}', '', function(opts) {
		this.mixin('i');
		this.mixin('api');
		this.mixin('stream');

		this.history = [];
		this.fetching = true;

		this.on('mount', () => {
			this.api('i/signin_history').then(history => {
				this.update({
					fetching: false,
					history: history
				});
			});

			this.stream.on('signin', this.onSignin);
		});

		this.on('unmount', () => {
			this.stream.off('signin', this.onSignin);
		});

		this.onSignin = signin => {
			this.history.unshift(signin);
			this.update();
		};
});

    
  

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-api-info', '<p>Token:<code>{I.token}</code></p><p>APIを利用するには、上記のトークンを「i」というキーでパラメータに付加してリクエストします。</p><p>アカウントを乗っ取られてしまう可能性があるため、このトークンは第三者に教えないでください(アプリなどにも入力しないでください)。</p><p>万が一このトークンが漏れたりその可能性がある場合は <button class="regenerate" onclick="{regenerateToken}">トークンを再生成</button>できます。(副作用として、ログインしているすべてのデバイスでログアウトが発生します) </p>', 'mk-api-info,[data-is="mk-api-info"]{display:block;color:#4a535a;} mk-api-info code,[data-is="mk-api-info"] code{padding:4px;background:#eee} mk-api-info .regenerate,[data-is="mk-api-info"] .regenerate{display:inline;color:#87bb35;} mk-api-info .regenerate:hover,[data-is="mk-api-info"] .regenerate:hover{text-decoration:underline}', '', function(opts) {
		this.mixin('i');
});

    
  

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_config__ = __webpack_require__(1);

    var riot = __webpack_require__(0)
    
riot.tag2('mk-twitter-setting', '<p>お使いのTwitterアカウントをお使いのMisskeyアカウントに接続しておくと、プロフィールでTwitterアカウント情報が表示されるようになったり、Twitterを用いた便利なサインインを利用できるようになります。<a href="{CONFIG.aboutUrl + \'/link-to-twitter\'}" target="_blank">Detail...</a></p><p class="account" if="{I.twitter}" title="{\'Twitter ID: \' + I.twitter.user_id}">You to connected this Twitter account: <a href="{\'https://twitter.com/\' + I.twitter.screen_name}" target="_blank">@{I.twitter.screen_name}</a></p><p><a href="{CONFIG.apiUrl + \'/connect/twitter\'}" target="_blank" onclick="{connect}">{I.twitter ? \'Reconnect\' : \'Connect to Twitter\'}</a><span if="{I.twitter}"> or </span><a href="{CONFIG.apiUrl + \'/disconnect/twitter\'}" target="_blank" if="{I.twitter}" onclick="{disconnect}">Disconnect</a></p><p class="id" if="{I.twitter}">Twitter ID: {I.twitter.user_id}</p>', 'mk-twitter-setting,[data-is="mk-twitter-setting"]{display:block;color:#4a535a;} mk-twitter-setting .account,[data-is="mk-twitter-setting"] .account{border:solid 1px #e1e8ed;border-radius:4px;padding:16px;} mk-twitter-setting .account a,[data-is="mk-twitter-setting"] .account a{font-weight:bold;color:inherit} mk-twitter-setting .id,[data-is="mk-twitter-setting"] .id{color:#8899a6}', '', function(opts) {

		this.mixin('i');

		this.form = null;

		this.on('mount', () => {
			this.I.on('updated', this.onMeUpdated);
		});

		this.on('unmount', () => {
			this.I.off('updated', this.onMeUpdated);
		});

		this.onMeUpdated = () => {
			if (this.I.twitter) {
				if (this.form) this.form.close();
			}
		};

		this.connect = e => {
			e.preventDefault();
			this.form = window.open(__WEBPACK_IMPORTED_MODULE_0__scripts_config__["a" /* default */].apiUrl + '/connect/twitter',
				'twitter_connect_window',
				'height=570,width=520');
			return false;
		};

		this.disconnect = e => {
			e.preventDefault();
			window.open(__WEBPACK_IMPORTED_MODULE_0__scripts_config__["a" /* default */].apiUrl + '/disconnect/twitter',
				'twitter_disconnect_window',
				'height=570,width=520');
			return false;
		};
});

    
  

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-authorized-apps', '<p class="none" if="{!fetching && apps.length == 0}">No apps</p><div class="apps" if="{apps.length != 0}"><div each="{app in apps}"><p><b>{app.name}</b></p><p>{app.description}</p></div></div>', 'mk-authorized-apps,[data-is="mk-authorized-apps"]{display:block;} mk-authorized-apps > .apps > div,[data-is="mk-authorized-apps"] > .apps > div{padding:16px 0 0 0;border-bottom:solid 1px #eee}', '', function(opts) {
		this.mixin('api');

		this.apps = [];
		this.fetching = true;

		this.on('mount', () => {
			this.api('i/authorized_apps').then(apps => {
				this.apps = apps;
				this.fetching = false;
				this.update();
			});
		});
});

    
  

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-poll', '<ul><li each="{poll.choices}" onclick="{vote.bind(null, id)}" class="{voted: voted}" title="{!parent.isVoted ? \'Vote to 「{}」\'.replace(\'{}\', text) : \'\'}"><div class="backdrop" riot-style="{\'width:\' + (parent.result ? (votes / parent.total * 100) : 0) + \'%\'}"></div><span><i class="fa fa-check" if="{is_voted}"></i> {text} <span class="votes" if="{parent.result}">({\'{} votes\'.replace(\'{}\', votes)})</span></span></li></ul><p if="{total > 0}"><span>{\'{} users voted\'.replace(\'{}\', total)}</span> ・ <a if="{!isVoted}" onclick="{toggleResult}">{result ? \'Vote\' : \'Show result\'}</a><span if="{isVoted}">Voted</span></p>', 'mk-poll,[data-is="mk-poll"]{display:block;} mk-poll > ul,[data-is="mk-poll"] > ul{display:block;margin:0;padding:0;list-style:none;} mk-poll > ul > li,[data-is="mk-poll"] > ul > li{display:block;margin:4px 0;padding:4px 8px;width:100%;border:solid 1px #eee;border-radius:4px;overflow:hidden;cursor:pointer;} mk-poll > ul > li:hover,[data-is="mk-poll"] > ul > li:hover{background:rgba(0,0,0,0.05)} mk-poll > ul > li:active,[data-is="mk-poll"] > ul > li:active{background:rgba(0,0,0,0.1)} mk-poll > ul > li > .backdrop,[data-is="mk-poll"] > ul > li > .backdrop{position:absolute;top:0;left:0;height:100%;background:#87bb35;transition:width 1s ease} mk-poll > ul > li > .votes,[data-is="mk-poll"] > ul > li > .votes{margin-left:4px} mk-poll > p a,[data-is="mk-poll"] > p a{color:inherit} mk-poll[data-is-voted] > ul > li,[data-is="mk-poll"][data-is-voted] > ul > li{cursor:default;} mk-poll[data-is-voted] > ul > li:hover,[data-is="mk-poll"][data-is-voted] > ul > li:hover{background:transparent} mk-poll[data-is-voted] > ul > li:active,[data-is="mk-poll"][data-is-voted] > ul > li:active{background:transparent}', 'data-is-voted="{isVoted}"', function(opts) {
		this.mixin('api');

		this.init = post => {
			this.post = post;
			this.poll = this.post.poll;
			this.total = this.poll.choices.reduce((a, b) => a + b.votes, 0);
			this.isVoted = this.poll.choices.some(c => c.is_voted);
			this.result = this.isVoted;
			this.update();
		};

		this.init(this.opts.post);

		this.toggleResult = () => {
			this.result = !this.result;
		};

		this.vote = id => {
			if (this.poll.choices.some(c => c.is_voted)) return;
			this.api('posts/polls/vote', {
				post_id: this.post.id,
				choice: id
			}).then(() => {
				this.poll.choices.forEach(c => {
					if (c.id == id) {
						c.votes++;
						c.is_voted = true;
					}
				});
				this.update({
					poll: this.poll,
					isVoted: true,
					result: true,
					total: this.total + 1
				});
			});
		};
});

    
  

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-poll-editor', '<p class="caution" if="{choices.length < 2}"><i class="fa fa-exclamation-triangle"></i>You need to enter two or more choice. </p><ul ref="choices"><li each="{choice, i in choices}"><input riot-value="{choice}" oninput="{oninput.bind(null, i)}" placeholder="{\'Choice {}\'.replace(\'{}\', i + 1)}"><button onclick="{remove.bind(null, i)}" title="Remove this choice"><i class="fa fa-times"></i></button></li></ul><button class="add" if="{choices.length < 10}" onclick="{add}">+ Add a choice</button><button class="destroy" onclick="{destroy}" title="Destroy this poll"><i class="fa fa-times"></i></button>', 'mk-poll-editor,[data-is="mk-poll-editor"]{display:block;padding:8px;} mk-poll-editor > .caution,[data-is="mk-poll-editor"] > .caution{margin:0 0 8px 0;font-size:.8em;color:#f00;} mk-poll-editor > .caution > i,[data-is="mk-poll-editor"] > .caution > i{margin-right:4px} mk-poll-editor > ul,[data-is="mk-poll-editor"] > ul{display:block;margin:0;padding:0;list-style:none;} mk-poll-editor > ul > li,[data-is="mk-poll-editor"] > ul > li{display:block;margin:8px 0;padding:0;width:100%;} mk-poll-editor > ul > li:first-child,[data-is="mk-poll-editor"] > ul > li:first-child{margin-top:0} mk-poll-editor > ul > li:last-child,[data-is="mk-poll-editor"] > ul > li:last-child{margin-bottom:0} mk-poll-editor > ul > li > input,[data-is="mk-poll-editor"] > ul > li > input{padding:6px;border:solid 1px rgba(135,187,53,0.1);border-radius:4px;} mk-poll-editor > ul > li > input:hover,[data-is="mk-poll-editor"] > ul > li > input:hover{border-color:rgba(135,187,53,0.2)} mk-poll-editor > ul > li > input:focus,[data-is="mk-poll-editor"] > ul > li > input:focus{border-color:rgba(135,187,53,0.5)} mk-poll-editor > ul > li > button,[data-is="mk-poll-editor"] > ul > li > button{padding:4px 8px;color:rgba(135,187,53,0.4);} mk-poll-editor > ul > li > button:hover,[data-is="mk-poll-editor"] > ul > li > button:hover{color:rgba(135,187,53,0.6)} mk-poll-editor > ul > li > button:active,[data-is="mk-poll-editor"] > ul > li > button:active{color:#5f8325} mk-poll-editor > .add,[data-is="mk-poll-editor"] > .add{margin:8px 0 0 0;vertical-align:top;color:#87bb35} mk-poll-editor > .destroy,[data-is="mk-poll-editor"] > .destroy{position:absolute;top:0;right:0;padding:4px 8px;color:rgba(135,187,53,0.4);} mk-poll-editor > .destroy:hover,[data-is="mk-poll-editor"] > .destroy:hover{color:rgba(135,187,53,0.6)} mk-poll-editor > .destroy:active,[data-is="mk-poll-editor"] > .destroy:active{color:#5f8325}', '', function(opts) {
		this.choices = ['', ''];

		this.oninput = (i, e) => {
			this.choices[i] = e.target.value;
		};

		this.add = () => {
			this.choices.push('');
			this.update();
			this.refs.choices.childNodes[this.choices.length - 1].childNodes[0].focus();
		};

		this.remove = (i) => {
			this.choices = this.choices.filter((_, _i) => _i != i);
			this.update();
		};

		this.destroy = () => {
			this.opts.ondestroy();
		};

		this.get = () => {
			return {
				choices: this.choices.filter(choice => choice != '')
			}
		};

		this.set = data => {
			if (data.choices.length == 0) return;
			this.choices = data.choices;
		};
});

    
  

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./src/web/app/common/scripts/messaging-stream.js
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stream__ = __webpack_require__(7);




/**
 * Messaging stream connection
 */
class Connection extends __WEBPACK_IMPORTED_MODULE_0__stream__["a" /* default */] {
	constructor(me, otherparty) {
		super('messaging', {
			i: me.token,
			otherparty
		});

		this.on('_connected_', () => {
			this.send({
				i: me.token
			});
		});
	}
}

/* harmony default export */ var messaging_stream_defaultExport = (Connection);

// CONCATENATED MODULE: ./src/web/app/common/tags/messaging/room.tag

    var riot = __webpack_require__(0)
    
riot.tag2('mk-messaging-room', '<div class="stream"><p class="init" if="{init}"><i class="fa fa-spinner fa-spin"></i>Loading</p><p class="empty" if="{!init && messages.length == 0}"><i class="fa fa-info-circle"></i>No conversations</p><p class="no-history" if="{!init && messages.length > 0 && !moreMessagesIsInStock}"><i class="fa fa-flag"></i>There is no more history</p><button class="more {fetching: fetchingMoreMessages}" if="{moreMessagesIsInStock}" onclick="{fetchMoreMessages}" disabled="{fetchingMoreMessages}"><i class="fa fa-spinner fa-pulse fa-fw" if="{fetchingMoreMessages}"></i>{fetchingMoreMessages ? \'Loading\' : \'More\'} </button><virtual each="{message, i in messages}"><mk-messaging-message message="{message}"></mk-messaging-message><p class="date" if="{i != messages.length - 1 && message._date != messages[i + 1]._date}"><span>{messages[i + 1]._datetext}</span></p></virtual></div><footer><div ref="notifications"></div><div class="grippie" title="Drag to resize"></div><mk-messaging-form user="{user}"></mk-messaging-form></footer>', 'mk-messaging-room,[data-is="mk-messaging-room"]{display:block;} mk-messaging-room > .stream,[data-is="mk-messaging-room"] > .stream{max-width:600px;margin:0 auto;} mk-messaging-room > .stream > .init,[data-is="mk-messaging-room"] > .stream > .init{width:100%;margin:0;padding:16px 8px 8px 8px;text-align:center;font-size:.8em;color:rgba(0,0,0,0.4);} mk-messaging-room > .stream > .init i,[data-is="mk-messaging-room"] > .stream > .init i{margin-right:4px} mk-messaging-room > .stream > .empty,[data-is="mk-messaging-room"] > .stream > .empty{width:100%;margin:0;padding:16px 8px 8px 8px;text-align:center;font-size:.8em;color:rgba(0,0,0,0.4);} mk-messaging-room > .stream > .empty i,[data-is="mk-messaging-room"] > .stream > .empty i{margin-right:4px} mk-messaging-room > .stream > .no-history,[data-is="mk-messaging-room"] > .stream > .no-history{display:block;margin:0;padding:16px;text-align:center;font-size:.8em;color:rgba(0,0,0,0.4);} mk-messaging-room > .stream > .no-history i,[data-is="mk-messaging-room"] > .stream > .no-history i{margin-right:4px} mk-messaging-room > .stream > .more,[data-is="mk-messaging-room"] > .stream > .more{display:block;margin:16px auto;padding:0 12px;line-height:24px;color:#fff;background:rgba(0,0,0,0.3);border-radius:12px;} mk-messaging-room > .stream > .more:hover,[data-is="mk-messaging-room"] > .stream > .more:hover{background:rgba(0,0,0,0.4)} mk-messaging-room > .stream > .more:active,[data-is="mk-messaging-room"] > .stream > .more:active{background:rgba(0,0,0,0.5)} mk-messaging-room > .stream > .more.fetching,[data-is="mk-messaging-room"] > .stream > .more.fetching{cursor:wait} mk-messaging-room > .stream > .more > i,[data-is="mk-messaging-room"] > .stream > .more > i{margin-right:4px} mk-messaging-room > .stream > .date,[data-is="mk-messaging-room"] > .stream > .date{display:block;margin:8px 0;text-align:center;} mk-messaging-room > .stream > .date:before,[data-is="mk-messaging-room"] > .stream > .date:before{content:\'\';display:block;position:absolute;height:1px;width:90%;top:16px;left:0;right:0;margin:0 auto;background:rgba(0,0,0,0.1)} mk-messaging-room > .stream > .date > span,[data-is="mk-messaging-room"] > .stream > .date > span{display:inline-block;margin:0;padding:0 16px;line-height:32px;color:rgba(0,0,0,0.3);background:#fff} mk-messaging-room > footer,[data-is="mk-messaging-room"] > footer{position:-webkit-sticky;position:sticky;z-index:2;bottom:0;width:100%;max-width:600px;margin:0 auto;padding:0;background:rgba(255,255,255,0.95);background-clip:content-box;} mk-messaging-room > footer > [ref=\'notifications\'],[data-is="mk-messaging-room"] > footer > [ref=\'notifications\']{position:absolute;top:-48px;width:100%;padding:8px 0;text-align:center;} mk-messaging-room > footer > [ref=\'notifications\']:empty,[data-is="mk-messaging-room"] > footer > [ref=\'notifications\']:empty{display:none} mk-messaging-room > footer > [ref=\'notifications\'] > p,[data-is="mk-messaging-room"] > footer > [ref=\'notifications\'] > p{display:inline-block;margin:0;padding:0 12px 0 28px;cursor:pointer;line-height:32px;font-size:12px;color:#fff;background:#87bb35;border-radius:16px;transition:opacity 1s ease;} mk-messaging-room > footer > [ref=\'notifications\'] > p > i,[data-is="mk-messaging-room"] > footer > [ref=\'notifications\'] > p > i{position:absolute;top:0;left:10px;line-height:32px;font-size:16px} mk-messaging-room > footer > .grippie,[data-is="mk-messaging-room"] > footer > .grippie{height:10px;margin-top:-10px;background:transparent;cursor:ns-resize;}', '', function(opts) {

		this.mixin('i');
		this.mixin('api');

		this.user = this.opts.user;
		this.init = true;
		this.sending = false;
		this.messages = [];
		this.isNaked = this.opts.isNaked;

		this.connection = new messaging_stream_defaultExport(this.I, this.user.id);

		this.on('mount', () => {
			this.connection.on('message', this.onMessage);
			this.connection.on('read', this.onRead);

			document.addEventListener('visibilitychange', this.onVisibilitychange);

			this.fetchMessages().then(() => {
				this.init = false;
				this.update();
				this.scrollToBottom();
			});
		});

		this.on('unmount', () => {
			this.connection.off('message', this.onMessage);
			this.connection.off('read', this.onRead);
			this.connection.close();

			document.removeEventListener('visibilitychange', this.onVisibilitychange);
		});

		this.on('update', () => {
			this.messages.forEach(message => {
				const date = (new Date(message.created_at)).getDate();
				const month = (new Date(message.created_at)).getMonth() + 1;
				message._date = date;
				message._datetext = month + '月 ' + date + '日';
			});
		});

		this.onMessage = (message) => {
			const isBottom = this.isBottom();

			this.messages.push(message);
			if (message.user_id != this.I.id && !document.hidden) {
				this.connection.send({
					type: 'read',
					id: message.id
				});
			}
			this.update();

			if (isBottom) {

				this.scrollToBottom();
			} else if (message.user_id != this.I.id) {

				this.notify('New message');
			}
		};

		this.onRead = ids => {
			if (!Array.isArray(ids)) ids = [ids];
			ids.forEach(id => {
				if (this.messages.some(x => x.id == id)) {
					const exist = this.messages.map(x => x.id).indexOf(id);
					this.messages[exist].is_read = true;
					this.update();
				}
			});
		};

		this.fetchMoreMessages = () => {
			this.update({
				fetchingMoreMessages: true
			});
			this.fetchMessages().then(() => {
				this.update({
					fetchingMoreMessages: false
				});
			});
		};

		this.fetchMessages = () => new Promise((resolve, reject) => {
			const max = this.moreMessagesIsInStock ? 20 : 10;

			this.api('messaging/messages', {
				user_id: this.user.id,
				limit: max + 1,
				max_id: this.moreMessagesIsInStock ? this.messages[0].id : undefined
			}).then(messages => {
				if (messages.length == max + 1) {
					this.moreMessagesIsInStock = true;
					messages.pop();
				} else {
					this.moreMessagesIsInStock = false;
				}

				this.messages.unshift.apply(this.messages, messages.reverse());
				this.update();

				resolve();
			});
		});

		this.isBottom = () => {
			const asobi = 32;
			const current = this.isNaked
				? window.scrollY + window.innerHeight
				: this.root.scrollTop + this.root.offsetHeight;
			const max = this.isNaked
				? document.body.offsetHeight
				: this.root.scrollHeight;
			return current > (max - asobi);
		};

		this.scrollToBottom = () => {
			if (this.isNaked) {
				window.scroll(0, document.body.offsetHeight);
			} else {
				this.root.scrollTop = this.root.scrollHeight;
			}
		};

		this.notify = message => {
			const n = document.createElement('p');
			n.innerHTML = '<i class="fa fa-arrow-circle-down"></i>' + message;
			n.onclick = () => {
				this.scrollToBottom();
				n.parentNode.removeChild(n);
			};
			this.refs.notifications.appendChild(n);

			setTimeout(() => {
				n.style.opacity = 0;
				setTimeout(() => n.parentNode.removeChild(n), 1000);
			}, 4000);
		};

		this.onVisibilitychange = () => {
			if (document.hidden) return;
			this.messages.forEach(message => {
				if (message.user_id !== this.I.id && !message.is_read) {
					this.connection.send({
						type: 'read',
						id: message.id
					});
				}
			});
		};
});

    
  

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_scripts_text_compiler__ = __webpack_require__(5);

    var riot = __webpack_require__(0)
    
riot.tag2('mk-messaging-message', '<a class="avatar-anchor" href="{\'/\' + message.user.username}" title="{message.user.username}" target="_blank"><img class="avatar" riot-src="{message.user.avatar_url + \'?thumbnail&size=80\'}" alt=""></a><div class="content-container"><div class="balloon"><p class="read" if="{message.is_me && message.is_read}">Read</p><button class="delete-button" if="{message.is_me}" title="Delete"><img src="/assets/desktop/messaging/delete.png" alt="Delete"></button><div class="content" if="{!message.is_deleted}"><div ref="text"></div><div class="image" if="{message.file}"><img riot-src="{message.file.url}" alt="image" title="{message.file.name}"></div></div><div class="content" if="{message.is_deleted}"><p class="is-deleted">This message has been deleted</p></div></div><footer><mk-time time="{message.created_at}"></mk-time><i class="fa fa-pencil is-edited" if="{message.is_edited}"></i></footer></div>', 'mk-messaging-message,[data-is="mk-messaging-message"]{display:block;padding:10px 12px 10px 12px;background-color:transparent;} mk-messaging-message:after,[data-is="mk-messaging-message"]:after{content:"";display:block;clear:both} mk-messaging-message > .avatar-anchor,[data-is="mk-messaging-message"] > .avatar-anchor{display:block;} mk-messaging-message > .avatar-anchor > .avatar,[data-is="mk-messaging-message"] > .avatar-anchor > .avatar{display:block;min-width:54px;min-height:54px;max-width:54px;max-height:54px;margin:0;border-radius:8px;transition:all .1s ease} mk-messaging-message > .content-container,[data-is="mk-messaging-message"] > .content-container{display:block;margin:0 12px;padding:0;max-width:calc(100% - 78px);} mk-messaging-message > .content-container > .balloon,[data-is="mk-messaging-message"] > .content-container > .balloon{display:block;float:inherit;margin:0;padding:0;max-width:100%;min-height:38px;border-radius:16px;} mk-messaging-message > .content-container > .balloon:before,[data-is="mk-messaging-message"] > .content-container > .balloon:before{content:"";pointer-events:none;display:block;position:absolute;top:12px} mk-messaging-message > .content-container > .balloon:hover > .delete-button,[data-is="mk-messaging-message"] > .content-container > .balloon:hover > .delete-button{display:block} mk-messaging-message > .content-container > .balloon > .delete-button,[data-is="mk-messaging-message"] > .content-container > .balloon > .delete-button{display:none;position:absolute;z-index:1;top:-4px;right:-4px;margin:0;padding:0;cursor:pointer;outline:none;border:none;border-radius:0;box-shadow:none;background:transparent;} mk-messaging-message > .content-container > .balloon > .delete-button > img,[data-is="mk-messaging-message"] > .content-container > .balloon > .delete-button > img{vertical-align:bottom;width:16px;height:16px;cursor:pointer} mk-messaging-message > .content-container > .balloon > .read,[data-is="mk-messaging-message"] > .content-container > .balloon > .read{user-select:none;display:block;position:absolute;z-index:1;bottom:-4px;left:-12px;margin:0;color:rgba(0,0,0,0.5);font-size:11px} mk-messaging-message > .content-container > .balloon > .content > .is-deleted,[data-is="mk-messaging-message"] > .content-container > .balloon > .content > .is-deleted{display:block;margin:0;padding:0;overflow:hidden;overflow-wrap:break-word;font-size:1em;color:rgba(0,0,0,0.5)} mk-messaging-message > .content-container > .balloon > .content > [ref=\'text\'],[data-is="mk-messaging-message"] > .content-container > .balloon > .content > [ref=\'text\']{display:block;margin:0;padding:8px 16px;overflow:hidden;overflow-wrap:break-word;font-size:1em;color:rgba(0,0,0,0.8);} mk-messaging-message > .content-container > .balloon > .content > [ref=\'text\'],[data-is="mk-messaging-message"] > .content-container > .balloon > .content > [ref=\'text\'],mk-messaging-message > .content-container > .balloon > .content > [ref=\'text\'] *,[data-is="mk-messaging-message"] > .content-container > .balloon > .content > [ref=\'text\'] *{user-select:text;cursor:auto} mk-messaging-message > .content-container > .balloon > .content > [ref=\'text\'] + .file.image > img,[data-is="mk-messaging-message"] > .content-container > .balloon > .content > [ref=\'text\'] + .file.image > img{border-radius:0 0 16px 16px} mk-messaging-message > .content-container > .balloon > .content > .file.image > img,[data-is="mk-messaging-message"] > .content-container > .balloon > .content > .file.image > img{display:block;max-width:100%;max-height:512px;border-radius:16px} mk-messaging-message > .content-container > footer,[data-is="mk-messaging-message"] > .content-container > footer{display:block;clear:both;margin:0;padding:2px;font-size:10px;color:rgba(0,0,0,0.4);} mk-messaging-message > .content-container > footer > .is-edited,[data-is="mk-messaging-message"] > .content-container > footer > .is-edited{margin-left:4px} mk-messaging-message:not([data-is-me=\'true\']) > .avatar-anchor,[data-is="mk-messaging-message"]:not([data-is-me=\'true\']) > .avatar-anchor{float:left} mk-messaging-message:not([data-is-me=\'true\']) > .content-container,[data-is="mk-messaging-message"]:not([data-is-me=\'true\']) > .content-container{float:left;} mk-messaging-message:not([data-is-me=\'true\']) > .content-container > .balloon,[data-is="mk-messaging-message"]:not([data-is-me=\'true\']) > .content-container > .balloon{background:#eee;} mk-messaging-message:not([data-is-me=\'true\']) > .content-container > .balloon:before,[data-is="mk-messaging-message"]:not([data-is-me=\'true\']) > .content-container > .balloon:before{left:-14px;border-top:solid 8px transparent;border-right:solid 8px #eee;border-bottom:solid 8px transparent;border-left:solid 8px transparent} mk-messaging-message:not([data-is-me=\'true\']) > .content-container > footer,[data-is="mk-messaging-message"]:not([data-is-me=\'true\']) > .content-container > footer{text-align:left} mk-messaging-message[data-is-me=\'true\'] > .avatar-anchor,[data-is="mk-messaging-message"][data-is-me=\'true\'] > .avatar-anchor{float:right} mk-messaging-message[data-is-me=\'true\'] > .content-container,[data-is="mk-messaging-message"][data-is-me=\'true\'] > .content-container{float:right;} mk-messaging-message[data-is-me=\'true\'] > .content-container > .balloon,[data-is="mk-messaging-message"][data-is-me=\'true\'] > .content-container > .balloon{background:#23a7b6;} mk-messaging-message[data-is-me=\'true\'] > .content-container > .balloon:before,[data-is="mk-messaging-message"][data-is-me=\'true\'] > .content-container > .balloon:before{right:-14px;left:auto;border-top:solid 8px transparent;border-right:solid 8px transparent;border-bottom:solid 8px transparent;border-left:solid 8px #23a7b6} mk-messaging-message[data-is-me=\'true\'] > .content-container > .balloon > .content > p.is-deleted,[data-is="mk-messaging-message"][data-is-me=\'true\'] > .content-container > .balloon > .content > p.is-deleted{color:rgba(255,255,255,0.5)} mk-messaging-message[data-is-me=\'true\'] > .content-container > .balloon > .content > [ref=\'text\'],[data-is="mk-messaging-message"][data-is-me=\'true\'] > .content-container > .balloon > .content > [ref=\'text\'],mk-messaging-message[data-is-me=\'true\'] > .content-container > .balloon > .content > [ref=\'text\'] *,[data-is="mk-messaging-message"][data-is-me=\'true\'] > .content-container > .balloon > .content > [ref=\'text\'] *{color:#fff !important} mk-messaging-message[data-is-me=\'true\'] > .content-container > footer,[data-is="mk-messaging-message"][data-is-me=\'true\'] > .content-container > footer{text-align:right} mk-messaging-message[data-is-deleted=\'true\'] > .content-container,[data-is="mk-messaging-message"][data-is-deleted=\'true\'] > .content-container{opacity:.5}', 'data-is-me="{message.is_me}"', function(opts) {

		this.mixin('i');

		this.message = this.opts.message;
		this.message.is_me = this.message.user.id == this.I.id;

		this.on('mount', () => {
			if (this.message.text) {
				const tokens = this.message.ast;

				this.refs.text.innerHTML = Object(__WEBPACK_IMPORTED_MODULE_0__common_scripts_text_compiler__["a" /* default */])(tokens);

				this.refs.text.children.forEach(e => {
					if (e.tagName == 'MK-URL') riot.mount(e);
				});

				tokens
					.filter(t => t.type == 'link')
					.map(t => {
						const el = this.refs.text.appendChild(document.createElement('mk-url-preview'));
						riot.mount(el, {
							url: t.content
						});
					});
			}
		});
});

    
  

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-messaging', '<div class="search"><div class="form"><label for="search-input"><i class="fa fa-search"></i></label><input ref="search" type="search" oninput="{search}" onkeydown="{onSearchKeydown}" placeholder="Find a user"></div><div class="result"><ol class="users" if="{searchResult.length > 0}" ref="searchResult"><li each="{user, i in searchResult}" onkeydown="{parent.onSearchResultKeydown.bind(null, i)}" onclick="{user._click}" tabindex="-1"><img class="avatar" riot-src="{user.avatar_url + \'?thumbnail&size=32\'}" alt=""><span class="name">{user.name}</span><span class="username">@{user.username}</span></li></ol></div></div><div class="history" if="{history.length > 0}"><virtual each="{history}"><a class="user" data-is-me="{is_me}" data-is-read="{is_read}" onclick="{_click}"><div><img class="avatar" riot-src="{(is_me ? recipient.avatar_url : user.avatar_url) + \'?thumbnail&size=64\'}" alt=""><header><span class="name">{is_me ? recipient.name : user.name}</span><span class="username">{\'@\' + (is_me ? recipient.username : user.username )}</span><mk-time time="{created_at}"></mk-time></header><div class="body"><p class="text"><span class="me" if="{is_me}">You:</span>{text}</p></div></div></a></virtual></div><p class="no-history" if="{history.length == 0}">No history</p>', 'mk-messaging,[data-is="mk-messaging"]{display:block;} mk-messaging > .search,[data-is="mk-messaging"] > .search{display:block;position:-webkit-sticky;position:sticky;top:0;left:0;z-index:1;width:100%;background:#fff;box-shadow:0 0 2px rgba(0,0,0,0.2);} mk-messaging > .search > .form,[data-is="mk-messaging"] > .search > .form{padding:8px;background:#f7f7f7;} mk-messaging > .search > .form > label,[data-is="mk-messaging"] > .search > .form > label{display:block;position:absolute;top:0;left:8px;z-index:1;height:100%;width:38px;pointer-events:none;} mk-messaging > .search > .form > label > i,[data-is="mk-messaging"] > .search > .form > label > i{display:block;position:absolute;top:0;right:0;bottom:0;left:0;width:1em;height:1em;margin:auto;color:#555} mk-messaging > .search > .form > input,[data-is="mk-messaging"] > .search > .form > input{margin:0;padding:0 12px 0 38px;width:100%;font-size:1em;line-height:38px;color:#000;outline:none;border:solid 1px #eee;border-radius:5px;box-shadow:none;transition:color .5s ease,border .5s ease;} mk-messaging > .search > .form > input:hover,[data-is="mk-messaging"] > .search > .form > input:hover{border:solid 1px #ddd;transition:border .2s ease} mk-messaging > .search > .form > input:focus,[data-is="mk-messaging"] > .search > .form > input:focus{color:#6c962a;border:solid 1px #87bb35;transition:color 0,border 0} mk-messaging > .search > .result,[data-is="mk-messaging"] > .search > .result{display:block;top:0;left:0;z-index:2;width:100%;margin:0;padding:0;background:#fff;} mk-messaging > .search > .result > .users,[data-is="mk-messaging"] > .search > .result > .users{margin:0;padding:0;list-style:none;} mk-messaging > .search > .result > .users > li,[data-is="mk-messaging"] > .search > .result > .users > li{display:inline-block;z-index:1;width:100%;padding:8px 32px;vertical-align:top;white-space:nowrap;overflow:hidden;color:rgba(0,0,0,0.8);text-decoration:none;transition:none;cursor:pointer;} mk-messaging > .search > .result > .users > li:hover,[data-is="mk-messaging"] > .search > .result > .users > li:hover,mk-messaging > .search > .result > .users > li:focus,[data-is="mk-messaging"] > .search > .result > .users > li:focus{color:#fff;background:#87bb35;} mk-messaging > .search > .result > .users > li:hover .name,[data-is="mk-messaging"] > .search > .result > .users > li:hover .name,mk-messaging > .search > .result > .users > li:focus .name,[data-is="mk-messaging"] > .search > .result > .users > li:focus .name{color:#fff} mk-messaging > .search > .result > .users > li:hover .username,[data-is="mk-messaging"] > .search > .result > .users > li:hover .username,mk-messaging > .search > .result > .users > li:focus .username,[data-is="mk-messaging"] > .search > .result > .users > li:focus .username{color:#fff} mk-messaging > .search > .result > .users > li:active,[data-is="mk-messaging"] > .search > .result > .users > li:active{color:#fff;background:#7aa830;} mk-messaging > .search > .result > .users > li:active .name,[data-is="mk-messaging"] > .search > .result > .users > li:active .name{color:#fff} mk-messaging > .search > .result > .users > li:active .username,[data-is="mk-messaging"] > .search > .result > .users > li:active .username{color:#fff} mk-messaging > .search > .result > .users > li .avatar,[data-is="mk-messaging"] > .search > .result > .users > li .avatar{vertical-align:middle;min-width:32px;min-height:32px;max-width:32px;max-height:32px;margin:0 8px 0 0;border-radius:6px} mk-messaging > .search > .result > .users > li .name,[data-is="mk-messaging"] > .search > .result > .users > li .name{margin:0 8px 0 0;font-weight:normal;color:rgba(0,0,0,0.8)} mk-messaging > .search > .result > .users > li .username,[data-is="mk-messaging"] > .search > .result > .users > li .username{font-weight:normal;color:rgba(0,0,0,0.3)} mk-messaging > .history > a,[data-is="mk-messaging"] > .history > a{display:block;text-decoration:none;background:#fff;border-bottom:solid 1px #eee;} mk-messaging > .history > a *,[data-is="mk-messaging"] > .history > a *{pointer-events:none;user-select:none} mk-messaging > .history > a:hover,[data-is="mk-messaging"] > .history > a:hover{background:#fafafa;} mk-messaging > .history > a:hover > .avatar,[data-is="mk-messaging"] > .history > a:hover > .avatar{filter:saturate(200%)} mk-messaging > .history > a:active,[data-is="mk-messaging"] > .history > a:active{background:#eee} mk-messaging > .history > a[data-is-read],[data-is="mk-messaging"] > .history > a[data-is-read],mk-messaging > .history > a[data-is-me],[data-is="mk-messaging"] > .history > a[data-is-me]{opacity:.8} mk-messaging > .history > a:not([data-is-me]):not([data-is-read]) > div,[data-is="mk-messaging"] > .history > a:not([data-is-me]):not([data-is-read]) > div{background-image:url("/assets/unread.svg");background-repeat:no-repeat;background-position:0 center} mk-messaging > .history > a:after,[data-is="mk-messaging"] > .history > a:after{content:"";display:block;clear:both} mk-messaging > .history > a > div,[data-is="mk-messaging"] > .history > a > div{max-width:500px;margin:0 auto;padding:20px 30px;} mk-messaging > .history > a > div:after,[data-is="mk-messaging"] > .history > a > div:after{content:"";display:block;clear:both} mk-messaging > .history > a > div > header,[data-is="mk-messaging"] > .history > a > div > header{margin-bottom:2px;white-space:nowrap;overflow:hidden;} mk-messaging > .history > a > div > header > .name,[data-is="mk-messaging"] > .history > a > div > header > .name{text-align:left;display:inline;margin:0;padding:0;font-size:1em;color:rgba(0,0,0,0.9);font-weight:bold;transition:all .1s ease} mk-messaging > .history > a > div > header > .username,[data-is="mk-messaging"] > .history > a > div > header > .username{text-align:left;margin:0 0 0 8px;color:rgba(0,0,0,0.5)} mk-messaging > .history > a > div > header > mk-time,[data-is="mk-messaging"] > .history > a > div > header > mk-time{position:absolute;top:0;right:0;display:inline;color:rgba(0,0,0,0.5);font-size:80%} mk-messaging > .history > a > div > .avatar,[data-is="mk-messaging"] > .history > a > div > .avatar{float:left;width:54px;height:54px;margin:0 16px 0 0;border-radius:8px;transition:all .1s ease} mk-messaging > .history > a > div > .body > .text,[data-is="mk-messaging"] > .history > a > div > .body > .text{display:block;margin:0 0 0 0;padding:0;overflow:hidden;overflow-wrap:break-word;font-size:1.1em;color:rgba(0,0,0,0.8);} mk-messaging > .history > a > div > .body > .text .me,[data-is="mk-messaging"] > .history > a > div > .body > .text .me{color:rgba(0,0,0,0.4)} mk-messaging > .history > a > div > .body > .image,[data-is="mk-messaging"] > .history > a > div > .body > .image{display:block;max-width:100%;max-height:512px} mk-messaging > .no-history,[data-is="mk-messaging"] > .no-history{margin:0;padding:2em 1em;text-align:center;color:#999;font-weight:500}@media (max-width:400px){ mk-messaging > .search > .result > .users > li,[data-is="mk-messaging"] > .search > .result > .users > li{padding:8px 16px} mk-messaging > .history > a:not([data-is-me]):not([data-is-read]) > div,[data-is="mk-messaging"] > .history > a:not([data-is-me]):not([data-is-read]) > div{background-image:none;border-left:solid 4px #3aa2dc} mk-messaging > .history > a > div,[data-is="mk-messaging"] > .history > a > div{padding:16px;font-size:14px;} mk-messaging > .history > a > div > .avatar,[data-is="mk-messaging"] > .history > a > div > .avatar{margin:0 12px 0 0}}', '', function(opts) {
		this.mixin('i');
		this.mixin('api');

		this.searchResult = [];

		this.on('mount', () => {
			this.api('messaging/history').then(history => {
				this.isLoading = false;
				history.forEach(message => {
					message.is_me = message.user_id == this.I.id
					message._click = () => {
						this.trigger('navigate-user', message.is_me ? message.recipient : message.user);
					};
				});
				this.history = history;
				this.update();
			});
		});

		this.search = () => {
			const q = this.refs.search.value;
			if (q == '') {
				this.searchResult = [];
				return;
			}
			this.api('users/search', {
				query: q,
				max: 5
			}).then(users => {
				users.forEach(user => {
					user._click = () => {
						this.trigger('navigate-user', user);
						this.searchResult = [];
					};
				});
				this.update({
					searchResult: users
				});
			});
		};

		this.onSearchKeydown = e => {
			switch (e.which) {
				case 9:
				case 40:
					e.preventDefault();
					e.stopPropagation();
					this.refs.searchResult.childNodes[0].focus();
					break;
			}
		};

		this.onSearchResultKeydown = (i, e) => {
			const cancel = () => {
				e.preventDefault();
				e.stopPropagation();
			};
			switch (true) {
				case e.which == 10:
				case e.which == 13:
					cancel();
					this.searchResult[i]._click();
					break;

				case e.which == 27:
					cancel();
					this.refs.search.focus();
					break;

				case e.which == 9 && e.shiftKey:
				case e.which == 38:
					cancel();
					(this.refs.searchResult.childNodes[i].previousElementSibling || this.refs.searchResult.childNodes[this.searchResult.length - 1]).focus();
					break;

				case e.which == 9:
				case e.which == 40:
					cancel();
					(this.refs.searchResult.childNodes[i].nextElementSibling || this.refs.searchResult.childNodes[0]).focus();
					break;
			}
		};

});

    
  

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-messaging-form', '<textarea ref="text" onkeypress="{onkeypress}" onpaste="{onpaste}" placeholder="Enter message here"></textarea><div class="files"></div><mk-uploader ref="uploader"></mk-uploader><button class="send" onclick="{send}" disabled="{sending}" title="Send"><i class="fa fa-paper-plane" if="{!sending}"></i><i class="fa fa-spinner fa-spin" if="{sending}"></i></button><button class="attach-from-local" type="button" title="Attach file from your pc"><i class="fa fa-upload"></i></button><button class="attach-from-drive" type="button" title="Attach file from the drive"><i class="fa fa-folder-open"></i></button><input name="file" type="file" accept="image/*">', 'mk-messaging-form,[data-is="mk-messaging-form"]{display:block;} mk-messaging-form > textarea,[data-is="mk-messaging-form"] > textarea{cursor:auto;display:block;width:100%;min-width:100%;max-width:100%;height:64px;margin:0;padding:8px;font-size:1em;color:#000;outline:none;border:none;border-top:solid 1px #eee;border-radius:0;box-shadow:none;background:transparent} mk-messaging-form > .send,[data-is="mk-messaging-form"] > .send{position:absolute;bottom:0;right:0;margin:0;padding:10px 14px;line-height:1em;font-size:1em;color:#aaa;transition:color .1s ease;} mk-messaging-form > .send:hover,[data-is="mk-messaging-form"] > .send:hover{color:#87bb35} mk-messaging-form > .send:active,[data-is="mk-messaging-form"] > .send:active{color:#7aa830;transition:color 0s ease} mk-messaging-form .files,[data-is="mk-messaging-form"] .files{display:block;margin:0;padding:0 8px;list-style:none;} mk-messaging-form .files:after,[data-is="mk-messaging-form"] .files:after{content:\'\';display:block;clear:both} mk-messaging-form .files > li,[data-is="mk-messaging-form"] .files > li{display:block;float:left;margin:4px;padding:0;width:64px;height:64px;background-color:#eee;background-repeat:no-repeat;background-position:center center;background-size:cover;cursor:move;} mk-messaging-form .files > li:hover > .remove,[data-is="mk-messaging-form"] .files > li:hover > .remove{display:block} mk-messaging-form .files > li > .remove,[data-is="mk-messaging-form"] .files > li > .remove{display:none;position:absolute;right:-6px;top:-6px;margin:0;padding:0;background:transparent;outline:none;border:none;border-radius:0;box-shadow:none;cursor:pointer} mk-messaging-form .attach-from-local,[data-is="mk-messaging-form"] .attach-from-local,mk-messaging-form .attach-from-drive,[data-is="mk-messaging-form"] .attach-from-drive{margin:0;padding:10px 14px;line-height:1em;font-size:1em;font-weight:normal;text-decoration:none;color:#aaa;transition:color .1s ease;} mk-messaging-form .attach-from-local:hover,[data-is="mk-messaging-form"] .attach-from-local:hover,mk-messaging-form .attach-from-drive:hover,[data-is="mk-messaging-form"] .attach-from-drive:hover{color:#87bb35} mk-messaging-form .attach-from-local:active,[data-is="mk-messaging-form"] .attach-from-local:active,mk-messaging-form .attach-from-drive:active,[data-is="mk-messaging-form"] .attach-from-drive:active{color:#7aa830;transition:color 0s ease} mk-messaging-form input[type=file],[data-is="mk-messaging-form"] input[type=file]{display:none}', '', function(opts) {
		this.mixin('api');

		this.onpaste = e => {
			const data = e.clipboardData;
			const items = data.items;
			for (const item of items) {
				if (item.kind == 'file') {
					this.upload(item.getAsFile());
				}
			}
		};

		this.onkeypress = e => {
			if ((e.which == 10 || e.which == 13) && e.ctrlKey) {
				this.send();
			}
		};

		this.selectFile = () => {
			this.refs.file.click();
		};

		this.selectFileFromDrive = () => {
			const browser = document.body.appendChild(document.createElement('mk-select-file-from-drive-window'));
			const event = riot.observable();
			riot.mount(browser, {
				multiple: true,
				event: event
			});
			event.one('selected', files => {
				files.forEach(this.addFile);
			});
		};

		this.send = () => {
			this.sending = true;
			this.api('messaging/messages/create', {
				user_id: this.opts.user.id,
				text: this.refs.text.value
			}).then(message => {
				this.clear();
			}).catch(err => {
				console.error(err);
			}).then(() => {
				this.sending = false;
				this.update();
			});
		};

		this.clear = () => {
			this.refs.text.value = '';
			this.files = [];
			this.update();
		};
});

    
  

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_animejs__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_animejs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_animejs__);

    var riot = __webpack_require__(0)
    
riot.tag2('mk-stream-indicator', '<p if="{stream.state == \'initializing\'}"><i class="fa fa-spinner fa-spin"></i><span>Connecting<mk-ellipsis></mk-ellipsis></span></p><p if="{stream.state == \'reconnecting\'}"><i class="fa fa-spinner fa-spin"></i><span>Reconnecting<mk-ellipsis></mk-ellipsis></span></p><p if="{stream.state == \'connected\'}"><i class="fa fa-check"></i><span>Connected</span></p>', 'mk-stream-indicator,[data-is="mk-stream-indicator"]{display:block;pointer-events:none;position:fixed;z-index:16384;bottom:8px;right:8px;margin:0;padding:6px 12px;font-size:.9em;color:#fff;background:rgba(0,0,0,0.8);border-radius:4px;} mk-stream-indicator > p,[data-is="mk-stream-indicator"] > p{display:block;margin:0;} mk-stream-indicator > p > i,[data-is="mk-stream-indicator"] > p > i{margin-right:.25em}', '', function(opts) {

		this.mixin('i');
		this.mixin('stream');

		this.on('before-mount', () => {
			if (this.stream.state == 'connected') {
				this.root.style.opacity = 0;
			}
		});

		this.stream.on('_connected_', () => {
			this.update();
			setTimeout(() => {
				__WEBPACK_IMPORTED_MODULE_0_animejs___default()({
					targets: this.root,
					opacity: 0,
					easing: 'linear',
					duration: 200
				});
			}, 1000);
		});

		this.stream.on('_closed_', () => {
			this.update();
			__WEBPACK_IMPORTED_MODULE_0_animejs___default()({
				targets: this.root,
				opacity: 1,
				easing: 'linear',
				duration: 100
			});
		});
});

    
  

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-activity-table', '<svg if="{data}" ref="canvas" viewbox="0 0 53 7" preserveaspectratio="none"><rect each="{data}" width="1" height="1" riot-x="{x}" riot-y="{date.weekday}" rx="1" ry="1" fill="{color}" riot-style="transform: scale({v});"></rect><rect class="today" width="1" height="1" riot-x="{data[data.length - 1].x}" riot-y="{data[data.length - 1].date.weekday}" rx="1" ry="1" fill="none" stroke-width="0.1" stroke="#f73520"></rect></svg>', 'mk-activity-table,[data-is="mk-activity-table"]{display:block;max-width:600px;margin:0 auto;background:#fff;} mk-activity-table > svg,[data-is="mk-activity-table"] > svg{display:block;} mk-activity-table > svg > rect,[data-is="mk-activity-table"] > svg > rect{transform-origin:center}', '', function(opts) {
		this.mixin('api');

		this.user = this.opts.user;

		this.on('mount', () => {
			this.api('aggregation/users/activity', {
				user_id: this.user.id
			}).then(data => {
				data.forEach(d => d.total = d.posts + d.replies + d.reposts);
				this.peak = Math.max.apply(null, data.map(d => d.total)) / 2;
				let x = 0;
				data.reverse().forEach(d => {
					d.x = x;
					d.v = d.total / this.peak;
					if (d.v > 1) d.v = 1;
					d.color = `hsl(170, ${d.v * 100}%, ${15 + ((1 - d.v) * 80)}%)`;
					d.date.weekday = (new Date(d.date.year, d.date.month - 1, d.date.day)).getDay();
					if (d.date.weekday == 6) x++;
				});
				this.update({ data });
			});
		});
});

    
  

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_animejs__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_animejs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_animejs__);

    var riot = __webpack_require__(0)
    
riot.tag2('mk-reaction-picker', '<div class="backdrop" ref="backdrop" onclick="{close}"></div><div class="popover {compact: opts.compact}" ref="popover"><p if="{!opts.compact}">{title}</p><div><button onclick="{react.bind(null, \'like\')}" onmouseover="{onmouseover}" onmouseout="{onmouseout}" tabindex="1" title="Like"><mk-reaction-icon reaction="like"></mk-reaction-icon></button><button onclick="{react.bind(null, \'love\')}" onmouseover="{onmouseover}" onmouseout="{onmouseout}" tabindex="2" title="Love"><mk-reaction-icon reaction="love"></mk-reaction-icon></button><button onclick="{react.bind(null, \'laugh\')}" onmouseover="{onmouseover}" onmouseout="{onmouseout}" tabindex="3" title="Laugh"><mk-reaction-icon reaction="laugh"></mk-reaction-icon></button><button onclick="{react.bind(null, \'hmm\')}" onmouseover="{onmouseover}" onmouseout="{onmouseout}" tabindex="4" title="Hmm...?"><mk-reaction-icon reaction="hmm"></mk-reaction-icon></button><button onclick="{react.bind(null, \'surprise\')}" onmouseover="{onmouseover}" onmouseout="{onmouseout}" tabindex="5" title="Wow"><mk-reaction-icon reaction="surprise"></mk-reaction-icon></button><button onclick="{react.bind(null, \'congrats\')}" onmouseover="{onmouseover}" onmouseout="{onmouseout}" tabindex="6" title="Congrats!"><mk-reaction-icon reaction="congrats"></mk-reaction-icon></button><button onclick="{react.bind(null, \'angry\')}" onmouseover="{onmouseover}" onmouseout="{onmouseout}" tabindex="4" title="Angry"><mk-reaction-icon reaction="angry"></mk-reaction-icon></button><button onclick="{react.bind(null, \'confused\')}" onmouseover="{onmouseover}" onmouseout="{onmouseout}" tabindex="5" title="Confused"><mk-reaction-icon reaction="confused"></mk-reaction-icon></button><button onclick="{react.bind(null, \'pudding\')}" onmouseover="{onmouseover}" onmouseout="{onmouseout}" tabindex="6" title="Pudding"><mk-reaction-icon reaction="pudding"></mk-reaction-icon></button></div></div>', 'mk-reaction-picker,[data-is="mk-reaction-picker"]{display:block;position:initial;} mk-reaction-picker > .backdrop,[data-is="mk-reaction-picker"] > .backdrop{position:fixed;top:0;left:0;z-index:10000;width:100%;height:100%;background:rgba(0,0,0,0.1);opacity:0} mk-reaction-picker > .popover,[data-is="mk-reaction-picker"] > .popover{position:absolute;z-index:10001;background:#fff;border:1px solid rgba(27,31,35,0.15);border-radius:4px;box-shadow:0 3px 12px rgba(27,31,35,0.15);transform:scale(.5);opacity:0;} mk-reaction-picker > .popover:not(.compact),[data-is="mk-reaction-picker"] > .popover:not(.compact){margin-top:16px;transform-origin:center -16px;} mk-reaction-picker > .popover:not(.compact):before,[data-is="mk-reaction-picker"] > .popover:not(.compact):before{content:"";display:block;position:absolute;top:-32px;left:calc(50% - 16px);border-top:solid 16px transparent;border-left:solid 16px transparent;border-right:solid 16px transparent;border-bottom:solid 16px rgba(27,31,35,0.15)} mk-reaction-picker > .popover:not(.compact):after,[data-is="mk-reaction-picker"] > .popover:not(.compact):after{content:"";display:block;position:absolute;top:-30.5px;left:calc(50% - 16px);border-top:solid 16px transparent;border-left:solid 16px transparent;border-right:solid 16px transparent;border-bottom:solid 16px #fff} mk-reaction-picker > .popover > p,[data-is="mk-reaction-picker"] > .popover > p{display:block;margin:0;padding:8px 10px;font-size:14px;color:#586069;border-bottom:solid 1px #e1e4e8} mk-reaction-picker > .popover > div,[data-is="mk-reaction-picker"] > .popover > div{padding:4px;width:240px;text-align:center;} mk-reaction-picker > .popover > div > button,[data-is="mk-reaction-picker"] > .popover > div > button{width:40px;height:40px;font-size:24px;border-radius:2px;} mk-reaction-picker > .popover > div > button:hover,[data-is="mk-reaction-picker"] > .popover > div > button:hover{background:#eee} mk-reaction-picker > .popover > div > button:active,[data-is="mk-reaction-picker"] > .popover > div > button:active{background:#87bb35;box-shadow:inset 0 .15em .3em rgba(27,31,35,0.15)}', '', function(opts) {

		this.mixin('api');

		this.post = this.opts.post;
		this.source = this.opts.source;

		const placeholder = 'Pick your reaction';

		this.title = placeholder;

		this.onmouseover = e => {
			this.update({
				title: e.target.title
			});
		};

		this.onmouseout = () => {
			this.update({
				title: placeholder
			});
		};

		this.on('mount', () => {
			const rect = this.source.getBoundingClientRect();
			const width = this.refs.popover.offsetWidth;
			const height = this.refs.popover.offsetHeight;
			if (this.opts.compact) {
				const x = rect.left + window.pageXOffset + (this.source.offsetWidth / 2);
				const y = rect.top + window.pageYOffset + (this.source.offsetHeight / 2);
				this.refs.popover.style.left = (x - (width / 2)) + 'px';
				this.refs.popover.style.top = (y - (height / 2)) + 'px';
			} else {
				const x = rect.left + window.pageXOffset + (this.source.offsetWidth / 2);
				const y = rect.top + window.pageYOffset + this.source.offsetHeight;
				this.refs.popover.style.left = (x - (width / 2)) + 'px';
				this.refs.popover.style.top = y + 'px';
			}

			__WEBPACK_IMPORTED_MODULE_0_animejs___default()({
				targets: this.refs.backdrop,
				opacity: 1,
				duration: 100,
				easing: 'linear'
			});

			__WEBPACK_IMPORTED_MODULE_0_animejs___default()({
				targets: this.refs.popover,
				opacity: 1,
				scale: [0.5, 1],
				duration: 500
			});
		});

		this.react = reaction => {
			this.api('posts/reactions/create', {
				post_id: this.post.id,
				reaction: reaction
			}).then(() => {
				if (this.opts.cb) this.opts.cb();
				this.unmount();
			});
		};

		this.close = () => {
			this.refs.backdrop.style.pointerEvents = 'none';
			__WEBPACK_IMPORTED_MODULE_0_animejs___default()({
				targets: this.refs.backdrop,
				opacity: 0,
				duration: 200,
				easing: 'linear'
			});

			this.refs.popover.style.pointerEvents = 'none';
			__WEBPACK_IMPORTED_MODULE_0_animejs___default()({
				targets: this.refs.popover,
				opacity: 0,
				scale: 0.5,
				duration: 200,
				easing: 'easeInBack',
				complete: () => this.unmount()
			});
		};
});

    
  

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-reactions-viewer', '<virtual if="{reactions}"><span if="{reactions.like}"><mk-reaction-icon reaction="like"></mk-reaction-icon><span>{reactions.like}</span></span><span if="{reactions.love}"><mk-reaction-icon reaction="love"></mk-reaction-icon><span>{reactions.love}</span></span><span if="{reactions.laugh}"><mk-reaction-icon reaction="laugh"></mk-reaction-icon><span>{reactions.laugh}</span></span><span if="{reactions.hmm}"><mk-reaction-icon reaction="hmm"></mk-reaction-icon><span>{reactions.hmm}</span></span><span if="{reactions.surprise}"><mk-reaction-icon reaction="surprise"></mk-reaction-icon><span>{reactions.surprise}</span></span><span if="{reactions.congrats}"><mk-reaction-icon reaction="congrats"></mk-reaction-icon><span>{reactions.congrats}</span></span><span if="{reactions.angry}"><mk-reaction-icon reaction="angry"></mk-reaction-icon><span>{reactions.angry}</span></span><span if="{reactions.confused}"><mk-reaction-icon reaction="confused"></mk-reaction-icon><span>{reactions.confused}</span></span><span if="{reactions.pudding}"><mk-reaction-icon reaction="pudding"></mk-reaction-icon><span>{reactions.pudding}</span></span></virtual>', 'mk-reactions-viewer,[data-is="mk-reactions-viewer"]{display:block;border-top:dashed 1px #eee;border-bottom:dashed 1px #eee;margin:4px 0;} mk-reactions-viewer:empty,[data-is="mk-reactions-viewer"]:empty{display:none} mk-reactions-viewer > span,[data-is="mk-reactions-viewer"] > span{margin-right:8px;} mk-reactions-viewer > span > mk-reaction-icon,[data-is="mk-reactions-viewer"] > span > mk-reaction-icon{font-size:1.4em} mk-reactions-viewer > span > span,[data-is="mk-reactions-viewer"] > span > span{margin-left:4px;font-size:1.2em;color:#444}', '', function(opts) {
		this.post = this.opts.post;

		this.on('mount', () => {
			this.update();
		});

		this.on('update', () => {
			this.reactions = this.post.reaction_counts;
		});
});

    
  

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-reaction-icon', '<virtual if="{opts.reaction == \'like\'}"><img src="/assets/reactions/like.png" alt="Like"></virtual><virtual if="{opts.reaction == \'love\'}"><img src="/assets/reactions/love.png" alt="Love"></virtual><virtual if="{opts.reaction == \'laugh\'}"><img src="/assets/reactions/laugh.png" alt="Laugh"></virtual><virtual if="{opts.reaction == \'hmm\'}"><img src="/assets/reactions/hmm.png" alt="Hmm...?"></virtual><virtual if="{opts.reaction == \'surprise\'}"><img src="/assets/reactions/surprise.png" alt="Wow"></virtual><virtual if="{opts.reaction == \'congrats\'}"><img src="/assets/reactions/congrats.png" alt="Congrats!"></virtual><virtual if="{opts.reaction == \'angry\'}"><img src="/assets/reactions/angry.png" alt="Angry"></virtual><virtual if="{opts.reaction == \'confused\'}"><img src="/assets/reactions/confused.png" alt="Confused"></virtual><virtual if="{opts.reaction == \'pudding\'}"><img src="/assets/reactions/pudding.png" alt="Pudding"></virtual>', 'mk-reaction-icon,[data-is="mk-reaction-icon"]{display:inline;} mk-reaction-icon img,[data-is="mk-reaction-icon"] img{vertical-align:middle;width:1em;height:1em}', '', function(opts) {
});

    
  

/***/ }),
/* 52 */,
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (x => typeof x.then == 'function');


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ((bytes, digits = 0) => {
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes == 0) return '0Byte';
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	return (bytes / Math.pow(1024, i)).toFixed(digits).replace(/\.0+$/, '') + sizes[i];
});


/***/ }),
/* 55 */,
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {  /* globals require, module */

  

  /**
   * Module dependencies.
   */

  var pathtoRegexp = __webpack_require__(58);

  /**
   * Module exports.
   */

  module.exports = page;

  /**
   * Detect click event
   */
  var clickEvent = ('undefined' !== typeof document) && document.ontouchstart ? 'touchstart' : 'click';

  /**
   * To work properly with the URL
   * history.location generated polyfill in https://github.com/devote/HTML5-History-API
   */

  var location = ('undefined' !== typeof window) && (window.history.location || window.location);

  /**
   * Perform initial dispatch.
   */

  var dispatch = true;


  /**
   * Decode URL components (query string, pathname, hash).
   * Accommodates both regular percent encoding and x-www-form-urlencoded format.
   */
  var decodeURLComponents = true;

  /**
   * Base path.
   */

  var base = '';

  /**
   * Running flag.
   */

  var running;

  /**
   * HashBang option
   */

  var hashbang = false;

  /**
   * Previous context, for capturing
   * page exit events.
   */

  var prevContext;

  /**
   * Register `path` with callback `fn()`,
   * or route `path`, or redirection,
   * or `page.start()`.
   *
   *   page(fn);
   *   page('*', fn);
   *   page('/user/:id', load, user);
   *   page('/user/' + user.id, { some: 'thing' });
   *   page('/user/' + user.id);
   *   page('/from', '/to')
   *   page();
   *
   * @param {string|!Function|!Object} path
   * @param {Function=} fn
   * @api public
   */

  function page(path, fn) {
    // <callback>
    if ('function' === typeof path) {
      return page('*', path);
    }

    // route <path> to <callback ...>
    if ('function' === typeof fn) {
      var route = new Route(/** @type {string} */ (path));
      for (var i = 1; i < arguments.length; ++i) {
        page.callbacks.push(route.middleware(arguments[i]));
      }
      // show <path> with [state]
    } else if ('string' === typeof path) {
      page['string' === typeof fn ? 'redirect' : 'show'](path, fn);
      // start [options]
    } else {
      page.start(path);
    }
  }

  /**
   * Callback functions.
   */

  page.callbacks = [];
  page.exits = [];

  /**
   * Current path being processed
   * @type {string}
   */
  page.current = '';

  /**
   * Number of pages navigated to.
   * @type {number}
   *
   *     page.len == 0;
   *     page('/login');
   *     page.len == 1;
   */

  page.len = 0;

  /**
   * Get or set basepath to `path`.
   *
   * @param {string} path
   * @api public
   */

  page.base = function(path) {
    if (0 === arguments.length) return base;
    base = path;
  };

  /**
   * Bind with the given `options`.
   *
   * Options:
   *
   *    - `click` bind to click events [true]
   *    - `popstate` bind to popstate [true]
   *    - `dispatch` perform initial dispatch [true]
   *
   * @param {Object} options
   * @api public
   */

  page.start = function(options) {
    options = options || {};
    if (running) return;
    running = true;
    if (false === options.dispatch) dispatch = false;
    if (false === options.decodeURLComponents) decodeURLComponents = false;
    if (false !== options.popstate) window.addEventListener('popstate', onpopstate, false);
    if (false !== options.click) {
      document.addEventListener(clickEvent, onclick, false);
    }
    if (true === options.hashbang) hashbang = true;
    if (!dispatch) return;
    var url = (hashbang && ~location.hash.indexOf('#!')) ? location.hash.substr(2) + location.search : location.pathname + location.search + location.hash;
    page.replace(url, null, true, dispatch);
  };

  /**
   * Unbind click and popstate event handlers.
   *
   * @api public
   */

  page.stop = function() {
    if (!running) return;
    page.current = '';
    page.len = 0;
    running = false;
    document.removeEventListener(clickEvent, onclick, false);
    window.removeEventListener('popstate', onpopstate, false);
  };

  /**
   * Show `path` with optional `state` object.
   *
   * @param {string} path
   * @param {Object=} state
   * @param {boolean=} dispatch
   * @param {boolean=} push
   * @return {!Context}
   * @api public
   */

  page.show = function(path, state, dispatch, push) {
    var ctx = new Context(path, state);
    page.current = ctx.path;
    if (false !== dispatch) page.dispatch(ctx);
    if (false !== ctx.handled && false !== push) ctx.pushState();
    return ctx;
  };

  /**
   * Goes back in the history
   * Back should always let the current route push state and then go back.
   *
   * @param {string} path - fallback path to go back if no more history exists, if undefined defaults to page.base
   * @param {Object=} state
   * @api public
   */

  page.back = function(path, state) {
    if (page.len > 0) {
      // this may need more testing to see if all browsers
      // wait for the next tick to go back in history
      history.back();
      page.len--;
    } else if (path) {
      setTimeout(function() {
        page.show(path, state);
      });
    }else{
      setTimeout(function() {
        page.show(base, state);
      });
    }
  };


  /**
   * Register route to redirect from one path to other
   * or just redirect to another route
   *
   * @param {string} from - if param 'to' is undefined redirects to 'from'
   * @param {string=} to
   * @api public
   */
  page.redirect = function(from, to) {
    // Define route from a path to another
    if ('string' === typeof from && 'string' === typeof to) {
      page(from, function(e) {
        setTimeout(function() {
          page.replace(/** @type {!string} */ (to));
        }, 0);
      });
    }

    // Wait for the push state and replace it with another
    if ('string' === typeof from && 'undefined' === typeof to) {
      setTimeout(function() {
        page.replace(from);
      }, 0);
    }
  };

  /**
   * Replace `path` with optional `state` object.
   *
   * @param {string} path
   * @param {Object=} state
   * @param {boolean=} init
   * @param {boolean=} dispatch
   * @return {!Context}
   * @api public
   */


  page.replace = function(path, state, init, dispatch) {
    var ctx = new Context(path, state);
    page.current = ctx.path;
    ctx.init = init;
    ctx.save(); // save before dispatching, which may redirect
    if (false !== dispatch) page.dispatch(ctx);
    return ctx;
  };

  /**
   * Dispatch the given `ctx`.
   *
   * @param {Context} ctx
   * @api private
   */
  page.dispatch = function(ctx) {
    var prev = prevContext,
      i = 0,
      j = 0;

    prevContext = ctx;

    function nextExit() {
      var fn = page.exits[j++];
      if (!fn) return nextEnter();
      fn(prev, nextExit);
    }

    function nextEnter() {
      var fn = page.callbacks[i++];

      if (ctx.path !== page.current) {
        ctx.handled = false;
        return;
      }
      if (!fn) return unhandled(ctx);
      fn(ctx, nextEnter);
    }

    if (prev) {
      nextExit();
    } else {
      nextEnter();
    }
  };

  /**
   * Unhandled `ctx`. When it's not the initial
   * popstate then redirect. If you wish to handle
   * 404s on your own use `page('*', callback)`.
   *
   * @param {Context} ctx
   * @api private
   */
  function unhandled(ctx) {
    if (ctx.handled) return;
    var current;

    if (hashbang) {
      current = base + location.hash.replace('#!', '');
    } else {
      current = location.pathname + location.search;
    }

    if (current === ctx.canonicalPath) return;
    page.stop();
    ctx.handled = false;
    location.href = ctx.canonicalPath;
  }

  /**
   * Register an exit route on `path` with
   * callback `fn()`, which will be called
   * on the previous context when a new
   * page is visited.
   */
  page.exit = function(path, fn) {
    if (typeof path === 'function') {
      return page.exit('*', path);
    }

    var route = new Route(path);
    for (var i = 1; i < arguments.length; ++i) {
      page.exits.push(route.middleware(arguments[i]));
    }
  };

  /**
   * Remove URL encoding from the given `str`.
   * Accommodates whitespace in both x-www-form-urlencoded
   * and regular percent-encoded form.
   *
   * @param {string} val - URL component to decode
   */
  function decodeURLEncodedURIComponent(val) {
    if (typeof val !== 'string') { return val; }
    return decodeURLComponents ? decodeURIComponent(val.replace(/\+/g, ' ')) : val;
  }

  /**
   * Initialize a new "request" `Context`
   * with the given `path` and optional initial `state`.
   *
   * @constructor
   * @param {string} path
   * @param {Object=} state
   * @api public
   */

  function Context(path, state) {
    if ('/' === path[0] && 0 !== path.indexOf(base)) path = base + (hashbang ? '#!' : '') + path;
    var i = path.indexOf('?');

    this.canonicalPath = path;
    this.path = path.replace(base, '') || '/';
    if (hashbang) this.path = this.path.replace('#!', '') || '/';

    this.title = document.title;
    this.state = state || {};
    this.state.path = path;
    this.querystring = ~i ? decodeURLEncodedURIComponent(path.slice(i + 1)) : '';
    this.pathname = decodeURLEncodedURIComponent(~i ? path.slice(0, i) : path);
    this.params = {};

    // fragment
    this.hash = '';
    if (!hashbang) {
      if (!~this.path.indexOf('#')) return;
      var parts = this.path.split('#');
      this.path = parts[0];
      this.hash = decodeURLEncodedURIComponent(parts[1]) || '';
      this.querystring = this.querystring.split('#')[0];
    }
  }

  /**
   * Expose `Context`.
   */

  page.Context = Context;

  /**
   * Push state.
   *
   * @api private
   */

  Context.prototype.pushState = function() {
    page.len++;
    history.pushState(this.state, this.title, hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
  };

  /**
   * Save the context state.
   *
   * @api public
   */

  Context.prototype.save = function() {
    history.replaceState(this.state, this.title, hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
  };

  /**
   * Initialize `Route` with the given HTTP `path`,
   * and an array of `callbacks` and `options`.
   *
   * Options:
   *
   *   - `sensitive`    enable case-sensitive routes
   *   - `strict`       enable strict matching for trailing slashes
   *
   * @constructor
   * @param {string} path
   * @param {Object=} options
   * @api private
   */

  function Route(path, options) {
    options = options || {};
    this.path = (path === '*') ? '(.*)' : path;
    this.method = 'GET';
    this.regexp = pathtoRegexp(this.path,
      this.keys = [],
      options);
  }

  /**
   * Expose `Route`.
   */

  page.Route = Route;

  /**
   * Return route middleware with
   * the given callback `fn()`.
   *
   * @param {Function} fn
   * @return {Function}
   * @api public
   */

  Route.prototype.middleware = function(fn) {
    var self = this;
    return function(ctx, next) {
      if (self.match(ctx.path, ctx.params)) return fn(ctx, next);
      next();
    };
  };

  /**
   * Check if this route matches `path`, if so
   * populate `params`.
   *
   * @param {string} path
   * @param {Object} params
   * @return {boolean}
   * @api private
   */

  Route.prototype.match = function(path, params) {
    var keys = this.keys,
      qsIndex = path.indexOf('?'),
      pathname = ~qsIndex ? path.slice(0, qsIndex) : path,
      m = this.regexp.exec(decodeURIComponent(pathname));

    if (!m) return false;

    for (var i = 1, len = m.length; i < len; ++i) {
      var key = keys[i - 1];
      var val = decodeURLEncodedURIComponent(m[i]);
      if (val !== undefined || !(hasOwnProperty.call(params, key.name))) {
        params[key.name] = val;
      }
    }

    return true;
  };


  /**
   * Handle "populate" events.
   */

  var onpopstate = (function () {
    var loaded = false;
    if ('undefined' === typeof window) {
      return;
    }
    if (document.readyState === 'complete') {
      loaded = true;
    } else {
      window.addEventListener('load', function() {
        setTimeout(function() {
          loaded = true;
        }, 0);
      });
    }
    return function onpopstate(e) {
      if (!loaded) return;
      if (e.state) {
        var path = e.state.path;
        page.replace(path, e.state);
      } else {
        page.show(location.pathname + location.hash, undefined, undefined, false);
      }
    };
  })();
  /**
   * Handle "click" events.
   */

  function onclick(e) {

    if (1 !== which(e)) return;

    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    if (e.defaultPrevented) return;



    // ensure link
    // use shadow dom when available
    var el = e.path ? e.path[0] : e.target;
    while (el && 'A' !== el.nodeName) el = el.parentNode;
    if (!el || 'A' !== el.nodeName) return;



    // Ignore if tag has
    // 1. "download" attribute
    // 2. rel="external" attribute
    if (el.hasAttribute('download') || el.getAttribute('rel') === 'external') return;

    // ensure non-hash for the same path
    var link = el.getAttribute('href');
    if (!hashbang && el.pathname === location.pathname && (el.hash || '#' === link)) return;



    // Check for mailto: in the href
    if (link && link.indexOf('mailto:') > -1) return;

    // check target
    if (el.target) return;

    // x-origin
    if (!sameOrigin(el.href)) return;



    // rebuild path
    var path = el.pathname + el.search + (el.hash || '');

    // strip leading "/[drive letter]:" on NW.js on Windows
    if (typeof process !== 'undefined' && path.match(/^\/[a-zA-Z]:\//)) {
      path = path.replace(/^\/[a-zA-Z]:\//, '/');
    }

    // same page
    var orig = path;

    if (path.indexOf(base) === 0) {
      path = path.substr(base.length);
    }

    if (hashbang) path = path.replace('#!', '');

    if (base && orig === path) return;

    e.preventDefault();
    page.show(orig);
  }

  /**
   * Event button.
   */

  function which(e) {
    e = e || window.event;
    return null === e.which ? e.button : e.which;
  }

  /**
   * Check if `href` is the same origin.
   */

  function sameOrigin(href) {
    var origin = location.protocol + '//' + location.hostname;
    if (location.port) origin += ':' + location.port;
    return (href && (0 === href.indexOf(origin)));
  }

  page.sameOrigin = sameOrigin;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(57)))

/***/ }),
/* 57 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var isarray = __webpack_require__(59)

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {String} str
 * @return {Array}
 */
function parse (str) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var res

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      continue
    }

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
    }

    var prefix = res[2]
    var name = res[3]
    var capture = res[4]
    var group = res[5]
    var suffix = res[6]
    var asterisk = res[7]

    var repeat = suffix === '+' || suffix === '*'
    var optional = suffix === '?' || suffix === '*'
    var delimiter = prefix || '/'
    var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      pattern: escapeGroup(pattern)
    })
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index)
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path)
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {String}   str
 * @return {Function}
 */
function compile (str) {
  return tokensToFunction(parse(str))
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^' + tokens[i].pattern + '$')
    }
  }

  return function (obj) {
    var path = ''
    var data = obj || {}

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token

        continue
      }

      var value = data[token.name]
      var segment

      if (value == null) {
        if (token.optional) {
          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received "' + value + '"')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encodeURIComponent(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      segment = encodeURIComponent(value)

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {String} str
 * @return {String}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {String} group
 * @return {String}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {RegExp} re
 * @param  {Array}  keys
 * @return {RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {String}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {RegExp} path
 * @param  {Array}  keys
 * @return {RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        pattern: null
      })
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {Array}  path
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {String} path
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function stringToRegexp (path, keys, options) {
  var tokens = parse(path)
  var re = tokensToRegExp(tokens, options)

  // Attach keys back to the regexp.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] !== 'string') {
      keys.push(tokens[i])
    }
  }

  return attachKeys(re, keys)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {Array}  tokens
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function tokensToRegExp (tokens, options) {
  options = options || {}

  var strict = options.strict
  var end = options.end !== false
  var route = ''
  var lastToken = tokens[tokens.length - 1]
  var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken)

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
    } else {
      var prefix = escapeString(token.prefix)
      var capture = token.pattern

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*'
      }

      if (token.optional) {
        if (prefix) {
          capture = '(?:' + prefix + '(' + capture + '))?'
        } else {
          capture = '(' + capture + ')?'
        }
      } else {
        capture = prefix + '(' + capture + ')'
      }

      route += capture
    }
  }

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?'
  }

  if (end) {
    route += '$'
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithSlash ? '' : '(?=\\/|$)'
  }

  return new RegExp('^' + route, flags(options))
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(String|RegExp|Array)} path
 * @param  {Array}                 [keys]
 * @param  {Object}                [options]
 * @return {RegExp}
 */
function pathToRegexp (path, keys, options) {
  keys = keys || []

  if (!isarray(keys)) {
    options = keys
    keys = []
  } else if (!options) {
    options = {}
  }

  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys, options)
  }

  if (isarray(path)) {
    return arrayToRegexp(path, keys, options)
  }

  return stringToRegexp(path, keys, options)
}


/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};


/***/ }),
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (() => [
	'(=^・・^=)',
	'v(‘ω’)v',
	'🐡( '-' 🐡 )ﾌｸﾞﾊﾟﾝﾁ!!!!'
][Math.floor(Math.random() * 3)]);


/***/ }),
/* 64 */,
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// ----- Calculate age given date
//		-- @see http://stackoverflow.com/a/7091965/4459340
//		-- @param date {String|Number|Date}
//		-- @return {Number} years since date
// ---------------------------------------
module.exports = function(date) {

	const type = Object.prototype.toString.call(date);
	const now = new Date();

	// convert dateStrings and timestamps to a Date
	if (type === '[object String]' || type === '[object Number]') {
		date = new Date(date);
	}

	let yearDiff = now.getFullYear() - date.getFullYear();
	const monthDiff = now.getMonth() - date.getMonth();
	const pastDate = now.getDate() < date.getDate();
	
	// compare months. if same month, compare days
	if (monthDiff < 0 || (monthDiff === 0 && pastDate)) {
		yearDiff--;
	}

	return yearDiff;

};

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_riot__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_riot___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_riot__);


/* harmony default export */ __webpack_exports__["a"] = (opts => {
	const app = document.getElementById('app');
	app.style.display = 'none';

	function recover() {
		app.style.display = 'block';
	}

	const form = __WEBPACK_IMPORTED_MODULE_0_riot__["mount"](document.body.appendChild(document.createElement('mk-post-form')), opts)[0];
	form
		.on('cancel', recover)
		.on('post', recover);
});


/***/ }),
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/web/app/mobile/router.js
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_riot__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_riot___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_riot__);
/**
 * Mobile App Router
 */


const route = __webpack_require__(56);
let page = null;

/* harmony default export */ var router_defaultExport = (me => {
	route('/',                           index);
	route('/i/notifications',            notifications);
	route('/i/messaging',                messaging);
	route('/i/messaging/:username',      messaging);
	route('/i/drive',                    drive);
	route('/i/drive/folder/:folder',     drive);
	route('/i/drive/file/:file',         drive);
	route('/i/settings',                 settings);
	route('/i/settings/signin-history',  settingsSignin);
	route('/i/settings/api',             settingsApi);
	route('/i/settings/twitter',         settingsTwitter);
	route('/i/settings/authorized-apps', settingsAuthorizedApps);
	route('/post/new',                   newPost);
	route('/post::post',                 post);
	route('/search::query',              search);
	route('/:user',                      user.bind(null, 'posts'));
	route('/:user/graphs',               user.bind(null, 'graphs'));
	route('/:user/followers',            userFollowers);
	route('/:user/following',            userFollowing);
	route('/:user/:post',                post);
	route('*',                           notFound);

	function index() {
		me ? home() : entrance();
	}

	function home() {
		mount(document.createElement('mk-home-page'));
	}

	function entrance() {
		mount(document.createElement('mk-entrance'));
	}

	function notifications() {
		mount(document.createElement('mk-notifications-page'));
	}

	function messaging(ctx) {
		if (ctx.params.username) {
			const el = document.createElement('mk-messaging-room-page');
			el.setAttribute('username', ctx.params.username);
			mount(el);
		} else {
			mount(document.createElement('mk-messaging-page'));
		}
	}

	function newPost() {
		mount(document.createElement('mk-new-post-page'));
	}

	function settings() {
		mount(document.createElement('mk-settings-page'));
	}

	function settingsSignin() {
		mount(document.createElement('mk-signin-history-page'));
	}

	function settingsApi() {
		mount(document.createElement('mk-api-info-page'));
	}

	function settingsTwitter() {
		mount(document.createElement('mk-twitter-setting-page'));
	}

	function settingsAuthorizedApps() {
		mount(document.createElement('mk-authorized-apps-page'));
	}

	function search(ctx) {
		const el = document.createElement('mk-search-page');
		el.setAttribute('query', ctx.params.query);
		mount(el);
	}

	function user(page, ctx) {
		const el = document.createElement('mk-user-page');
		el.setAttribute('user', ctx.params.user);
		el.setAttribute('page', page);
		mount(el);
	}

	function userFollowing(ctx) {
		const el = document.createElement('mk-user-following-page');
		el.setAttribute('user', ctx.params.user);
		mount(el);
	}

	function userFollowers(ctx) {
		const el = document.createElement('mk-user-followers-page');
		el.setAttribute('user', ctx.params.user);
		mount(el);
	}

	function post(ctx) {
		const el = document.createElement('mk-post-page');
		el.setAttribute('post', ctx.params.post);
		mount(el);
	}

	function drive(ctx) {
		const el = document.createElement('mk-drive-page');
		if (ctx.params.folder) el.setAttribute('folder', ctx.params.folder);
		if (ctx.params.file) el.setAttribute('file', ctx.params.file);
		mount(el);
	}

	function notFound() {
		mount(document.createElement('mk-not-found'));
	}

	__WEBPACK_IMPORTED_MODULE_0_riot__["mixin"]('page', {
		page: route
	});

	// EXEC
	route();
});

function mount(content) {
	if (page) page.unmount();
	const body = document.getElementById('app');
	page = __WEBPACK_IMPORTED_MODULE_0_riot__["mount"](body.appendChild(content))[0];
}

// CONCATENATED MODULE: ./src/web/app/mobile/script.js
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_styl__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__init__ = __webpack_require__(19);
/**
 * Mobile Client
 */

// Style


__webpack_require__(173);



/**
 * init
 */
Object(__WEBPACK_IMPORTED_MODULE_1__init__["a" /* default */])(me => {
	// http://qiita.com/junya/items/3ff380878f26ca447f85
	document.body.setAttribute('ontouchstart', '');

	// Start routing
	router_defaultExport(me);
});


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(172);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(12)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/stylus-loader/index.js!./style.styl", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/stylus-loader/index.js!./style.styl");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(undefined);
// imports


// module
exports.push([module.i, "@charset 'utf-8';\n* {\n  position: relative;\n  box-sizing: border-box;\n  background-clip: padding-box !important;\n}\nhtml,\nbody {\n  margin: 0;\n  padding: 0;\n}\nbody {\n  overflow-wrap: break-word;\n}\ninput:not([type]),\ninput[type='text'],\ninput[type='password'],\ninput[type='email'],\ntextarea,\nbutton,\nprogress {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  box-shadow: none;\n}\nbutton {\n  margin: 0;\n  padding: 0;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  color: inherit;\n}\nbutton * {\n  pointer-events: none;\n}\nbutton[disabled] {\n  cursor: default;\n}\npre {\n  overflow: auto;\n  white-space: pre;\n}\n* {\n  tap-highlight-color: rgba(135,187,53,0.7);\n  -webkit-tap-highlight-color: rgba(135,187,53,0.7);\n}\nhtml,\nbody {\n  margin: 0;\n  padding: 0;\n  scroll-behavior: smooth;\n  text-size-adjust: 100%;\n  font-family: sans-serif;\n}\nhtml.progress,\nhtml.progress * {\n  cursor: progress !important;\n}\n#error {\n  padding: 32px;\n  color: #fff;\n}\n#error hr {\n  border: solid 1px #fff;\n}\n#nprogress {\n  pointer-events: none;\n  position: absolute;\n  z-index: 65536;\n/* Fancy blur effect */\n}\n#nprogress .bar {\n  background: #87bb35;\n  position: fixed;\n  z-index: 65537;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 2px;\n}\n#nprogress .peg {\n  display: block;\n  position: absolute;\n  right: 0px;\n  width: 100px;\n  height: 100%;\n  box-shadow: 0 0 10px #87bb35, 0 0 5px #87bb35;\n  opacity: 1;\n  transform: rotate(3deg) translate(0px, -4px);\n}\n#wait {\n  display: block;\n  position: fixed;\n  z-index: 65537;\n  top: 15px;\n  right: 15px;\n}\n#wait:before {\n  content: \"\";\n  display: block;\n  width: 18px;\n  height: 18px;\n  box-sizing: border-box;\n  border: solid 2px transparent;\n  border-top-color: #87bb35;\n  border-left-color: #87bb35;\n  border-radius: 50%;\n  animation: progress-spinner 400ms linear infinite;\n}\n@-moz-keyframes progress-spinner {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@-webkit-keyframes progress-spinner {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@-o-keyframes progress-spinner {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@keyframes progress-spinner {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\na {\n  text-decoration: none;\n  color: #87bb35;\n  cursor: pointer;\n}\na:hover {\n  text-decoration: underline;\n}\na * {\n  cursor: pointer;\n}\ncode {\n  font-family: Consolas, 'Courier New', Courier, Monaco, monospace;\n}\ncode .comment {\n  opacity: 0.5;\n}\ncode .string {\n  color: #e96900;\n}\ncode .regexp {\n  color: #e9003f;\n}\ncode .keyword {\n  color: #2973b7;\n}\ncode .keyword.true,\ncode .keyword.false,\ncode .keyword.null,\ncode .keyword.nil,\ncode .keyword.undefined {\n  color: #ae81ff;\n}\ncode .symbol {\n  color: #42b983;\n}\ncode .number,\ncode .nan {\n  color: #ae81ff;\n}\ncode .var:not(.keyword) {\n  font-weight: bold;\n  font-style: italic;\n}\ncode .method {\n  font-style: italic;\n  color: #8964c1;\n}\ncode .property {\n  color: #a71d5d;\n}\ncode .label {\n  color: #e9003f;\n}\npre {\n  display: block;\n}\npre > code {\n  display: block;\n  overflow: auto;\n  tab-size: 2;\n}\nmk-locker {\n  display: block;\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 65536;\n  width: 100%;\n  height: 100%;\n  cursor: wait;\n}\n#wait {\n  top: auto;\n  bottom: 15px;\n  left: 15px;\n}\n", ""]);

// exports


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(174);
__webpack_require__(175);
__webpack_require__(176);
__webpack_require__(177);
__webpack_require__(178);
__webpack_require__(179);
__webpack_require__(180);
__webpack_require__(181);
__webpack_require__(182);
__webpack_require__(183);
__webpack_require__(184);
__webpack_require__(185);
__webpack_require__(186);
__webpack_require__(187);
__webpack_require__(188);
__webpack_require__(189);
__webpack_require__(190);
__webpack_require__(191);
__webpack_require__(192);
__webpack_require__(193);
__webpack_require__(194);
__webpack_require__(195);
__webpack_require__(196);
__webpack_require__(197);
__webpack_require__(198);
__webpack_require__(199);
__webpack_require__(200);
__webpack_require__(201);
__webpack_require__(202);
__webpack_require__(203);
__webpack_require__(204);
__webpack_require__(205);
__webpack_require__(206);
__webpack_require__(207);
__webpack_require__(208);
__webpack_require__(209);
__webpack_require__(210);
__webpack_require__(211);
__webpack_require__(212);
__webpack_require__(213);
__webpack_require__(214);
__webpack_require__(215);
__webpack_require__(216);
__webpack_require__(217);
__webpack_require__(218);
__webpack_require__(219);
__webpack_require__(220);
__webpack_require__(221);
__webpack_require__(222);
__webpack_require__(223);
__webpack_require__(224);
__webpack_require__(225);


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-ui', '<mk-ui-header></mk-ui-header><mk-ui-nav ref="nav"></mk-ui-nav><div class="content"><yield></yield></div><mk-stream-indicator></mk-stream-indicator>', 'mk-ui,[data-is="mk-ui"]{display:block;padding-top:48px}', '', function(opts) {
		this.mixin('i');
		this.mixin('stream');

		this.isDrawerOpening = false;

		this.on('mount', () => {
			this.stream.on('notification', this.onStreamNotification);
		});

		this.on('unmount', () => {
			this.stream.off('notification', this.onStreamNotification);
		});

		this.toggleDrawer = () => {
			this.isDrawerOpening = !this.isDrawerOpening;
			this.refs.nav.root.style.display = this.isDrawerOpening ? 'block' : 'none';
		};

		this.onStreamNotification = notification => {
			riot.mount(document.body.appendChild(document.createElement('mk-notify')), {
				notification: notification
			});
		};
});

    
  

/***/ }),
/* 175 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_ui_event__ = __webpack_require__(4);

    var riot = __webpack_require__(0)
    
riot.tag2('mk-ui-header', '<mk-special-message></mk-special-message><div class="main"><div class="backdrop"></div><div class="content"><button class="nav" onclick="{parent.toggleDrawer}"><i class="fa fa-bars"></i></button><i class="fa fa-circle" if="{hasUnreadMessagingMessages}"></i><h1 ref="title">Misskey</h1><button if="{func}" onclick="{func}"><i class="fa fa-{funcIcon}"></i></button></div></div>', 'mk-ui-header,[data-is="mk-ui-header"]{display:block;position:fixed;top:0;z-index:1024;width:100%;box-shadow:0 1px 0 rgba(0,0,0,0.075);} mk-ui-header > .main,[data-is="mk-ui-header"] > .main{color:rgba(255,255,255,0.9);} mk-ui-header > .main > .backdrop,[data-is="mk-ui-header"] > .main > .backdrop{position:absolute;top:0;z-index:1023;width:100%;height:48px;-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);background-color:rgba(27,32,35,0.75)} mk-ui-header > .main > .content,[data-is="mk-ui-header"] > .main > .content{z-index:1024;} mk-ui-header > .main > .content > h1,[data-is="mk-ui-header"] > .main > .content > h1{display:block;margin:0 auto;padding:0;width:100%;max-width:calc(100% - 112px);text-align:center;font-size:1.1em;font-weight:normal;line-height:48px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;} mk-ui-header > .main > .content > h1 > i,[data-is="mk-ui-header"] > .main > .content > h1 > i,mk-ui-header > .main > .content > h1 > .icon,[data-is="mk-ui-header"] > .main > .content > h1 > .icon{margin-right:8px} mk-ui-header > .main > .content > h1 > img,[data-is="mk-ui-header"] > .main > .content > h1 > img{display:inline-block;vertical-align:bottom;width:32px;height:32px;margin:8px;border-radius:6px} mk-ui-header > .main > .content > .nav,[data-is="mk-ui-header"] > .main > .content > .nav{display:block;position:absolute;top:0;left:0;width:48px;font-size:1.4em;line-height:48px;border-right:solid 1px rgba(0,0,0,0.1);} mk-ui-header > .main > .content > .nav > i,[data-is="mk-ui-header"] > .main > .content > .nav > i{transition:all .2s ease} mk-ui-header > .main > .content > i,[data-is="mk-ui-header"] > .main > .content > i{position:absolute;top:8px;left:8px;pointer-events:none;font-size:10px;color:#87bb35} mk-ui-header > .main > .content > button:last-child,[data-is="mk-ui-header"] > .main > .content > button:last-child{display:block;position:absolute;top:0;right:0;width:48px;text-align:center;font-size:1.4em;color:inherit;line-height:48px;border-left:solid 1px rgba(0,0,0,0.1)}', '', function(opts) {

		this.mixin('api');
		this.mixin('stream');

		this.func = null;
		this.funcIcon = null;

		this.on('mount', () => {
			this.stream.on('read_all_messaging_messages', this.onReadAllMessagingMessages);
			this.stream.on('unread_messaging_message', this.onUnreadMessagingMessage);

			this.api('messaging/unread').then(res => {
				if (res.count > 0) {
					this.update({
						hasUnreadMessagingMessages: true
					});
				}
			});
		});

		this.on('unmount', () => {
			this.stream.off('read_all_messaging_messages', this.onReadAllMessagingMessages);
			this.stream.off('unread_messaging_message', this.onUnreadMessagingMessage);

			__WEBPACK_IMPORTED_MODULE_0__scripts_ui_event__["default"].off('title', this.setTitle);
			__WEBPACK_IMPORTED_MODULE_0__scripts_ui_event__["default"].off('func', this.setFunc);
		});

		this.onReadAllMessagingMessages = () => {
			this.update({
				hasUnreadMessagingMessages: false
			});
		};

		this.onUnreadMessagingMessage = () => {
			this.update({
				hasUnreadMessagingMessages: true
			});
		};

		this.setTitle = title => {
			this.refs.title.innerHTML = title;
		};

		this.setFunc = (fn, icon) => {
			this.update({
				func: fn,
				funcIcon: icon
			});
		};

		__WEBPACK_IMPORTED_MODULE_0__scripts_ui_event__["default"].on('title', this.setTitle);
		__WEBPACK_IMPORTED_MODULE_0__scripts_ui_event__["default"].on('func', this.setFunc);
});

    
  

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-ui-nav', '<div class="backdrop" onclick="{parent.toggleDrawer}"></div><div class="body"><a class="me" if="{SIGNIN}" href="{\'/\' + I.username}"><img class="avatar" riot-src="{I.avatar_url + \'?thumbnail&size=128\'}" alt="avatar"><p class="name">{I.name}</p></a><div class="links"><ul><li><a href="/"><i class="fa fa-home"></i>Home<i class="fa fa-angle-right"></i></a></li><li><a href="/i/notifications"><i class="fa fa-bell-o"></i>Notifications<i class="fa fa-angle-right"></i></a></li><li><a href="/i/messaging"><i class="fa fa-comments-o"></i>Messages<i class="i fa fa-circle" if="{hasUnreadMessagingMessages}"></i><i class="fa fa-angle-right"></i></a></li></ul><ul><li><a onclick="{search}"><i class="fa fa-search"></i>Search<i class="fa fa-angle-right"></i></a></li></ul><ul><li><a href="/i/drive"><i class="fa fa-cloud"></i>Drive<i class="fa fa-angle-right"></i></a></li></ul><ul><li><a href="/i/settings"><i class="fa fa-cog"></i>Settings<i class="fa fa-angle-right"></i></a></li></ul></div><a href="{CONFIG.aboutUrl}"><p class="about">About Misskey</p></a></div>', 'mk-ui-nav,[data-is="mk-ui-nav"]{display:none;} mk-ui-nav .backdrop,[data-is="mk-ui-nav"] .backdrop{position:fixed;top:0;left:0;z-index:1025;width:100%;height:100%;background:rgba(0,0,0,0.2)} mk-ui-nav .body,[data-is="mk-ui-nav"] .body{position:fixed;top:0;left:0;z-index:1026;width:240px;height:100%;overflow:auto;color:#777;background:#fff} mk-ui-nav .me,[data-is="mk-ui-nav"] .me{display:block;margin:0;padding:16px;} mk-ui-nav .me .avatar,[data-is="mk-ui-nav"] .me .avatar{display:inline;max-width:64px;border-radius:32px;vertical-align:middle} mk-ui-nav .me .name,[data-is="mk-ui-nav"] .me .name{display:block;margin:0 16px;position:absolute;top:0;left:80px;padding:0;width:calc(100% - 112px);color:#777;line-height:96px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap} mk-ui-nav ul,[data-is="mk-ui-nav"] ul{display:block;margin:16px 0;padding:0;list-style:none;} mk-ui-nav ul:first-child,[data-is="mk-ui-nav"] ul:first-child{margin-top:0} mk-ui-nav ul li,[data-is="mk-ui-nav"] ul li{display:block;font-size:1em;line-height:1em;} mk-ui-nav ul li a,[data-is="mk-ui-nav"] ul li a{display:block;padding:0 20px;line-height:3rem;line-height:calc(1rem + 30px);color:#777;text-decoration:none;} mk-ui-nav ul li a > i:first-child,[data-is="mk-ui-nav"] ul li a > i:first-child{margin-right:.5em} mk-ui-nav ul li a > .i,[data-is="mk-ui-nav"] ul li a > .i{margin-left:6px;vertical-align:super;font-size:10px;color:#87bb35} mk-ui-nav ul li a > i:last-child,[data-is="mk-ui-nav"] ul li a > i:last-child{position:absolute;top:0;right:0;padding:0 20px;font-size:1.2em;line-height:calc(1rem + 30px);color:#ccc} mk-ui-nav .about,[data-is="mk-ui-nav"] .about{margin:0;padding:1em 0;text-align:center;font-size:.8em;opacity:.5;} mk-ui-nav .about a,[data-is="mk-ui-nav"] .about a{color:#777}', '', function(opts) {
		this.mixin('i');
		this.mixin('page');
		this.mixin('api');
		this.mixin('stream');

		this.on('mount', () => {
			this.stream.on('read_all_messaging_messages', this.onReadAllMessagingMessages);
			this.stream.on('unread_messaging_message', this.onUnreadMessagingMessage);

			this.api('messaging/unread').then(res => {
				if (res.count > 0) {
					this.update({
						hasUnreadMessagingMessages: true
					});
				}
			});
		});

		this.on('unmount', () => {
			this.stream.off('read_all_messaging_messages', this.onReadAllMessagingMessages);
			this.stream.off('unread_messaging_message', this.onUnreadMessagingMessage);
		});

		this.onReadAllMessagingMessages = () => {
			this.update({
				hasUnreadMessagingMessages: false
			});
		};

		this.onUnreadMessagingMessage = () => {
			this.update({
				hasUnreadMessagingMessages: true
			});
		};

		this.search = () => {
			const query = window.prompt('Search');
			if (query == null || query == '') return;
			this.page('/search:' + query);
		};
});

    
  

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-entrance', '<main><img src="/assets/title.svg" alt="Misskey"><mk-entrance-signin if="{mode == \'signin\'}"></mk-entrance-signin><mk-entrance-signup if="{mode == \'signup\'}"></mk-entrance-signup><div class="introduction" if="{mode == \'introduction\'}"><mk-introduction></mk-introduction><button onclick="{signin}">OK</button></div></main><footer><mk-copyright></mk-copyright></footer>', 'mk-entrance,[data-is="mk-entrance"]{display:block;height:100%;} mk-entrance > main,[data-is="mk-entrance"] > main{display:block;} mk-entrance > main > img,[data-is="mk-entrance"] > main > img{display:block;width:130px;height:120px;margin:0 auto} mk-entrance > main > .introduction,[data-is="mk-entrance"] > main > .introduction{max-width:300px;margin:0 auto;color:#666;} mk-entrance > main > .introduction > button,[data-is="mk-entrance"] > main > .introduction > button{display:block;margin:16px auto 0 auto} mk-entrance > footer > mk-copyright,[data-is="mk-entrance"] > footer > mk-copyright{margin:0;text-align:center;line-height:64px;font-size:10px;color:rgba(0,0,0,0.5)}', '', function(opts) {
		this.mode = 'signin';

		this.signup = () => {
			this.update({
				mode: 'signup'
			});
		};

		this.signin = () => {
			this.update({
				mode: 'signin'
			});
		};

		this.introduction = () => {
			this.update({
				mode: 'introduction'
			});
		};
});

    
  

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-entrance-signin', '<mk-signin></mk-signin><div class="divider"><span>or</span></div><button class="signup" onclick="{parent.signup}">Sign up</button><a class="introduction" onclick="{parent.introduction}">About Misskey</a>', 'mk-entrance-signin,[data-is="mk-entrance-signin"]{display:block;margin:0 auto;padding:0 8px;max-width:350px;text-align:center;} mk-entrance-signin > .signup,[data-is="mk-entrance-signin"] > .signup{padding:16px;width:100%;font-size:1em;color:#fff;background:#87bb35;border-radius:3px} mk-entrance-signin > .divider,[data-is="mk-entrance-signin"] > .divider{padding:16px 0;text-align:center;} mk-entrance-signin > .divider:after,[data-is="mk-entrance-signin"] > .divider:after{content:"";display:block;position:absolute;top:50%;width:100%;height:1px;border-top:solid 1px rgba(0,0,0,0.1)} mk-entrance-signin > .divider > *,[data-is="mk-entrance-signin"] > .divider > *{z-index:1;padding:0 8px;color:rgba(0,0,0,0.5);background:#fdfdfd} mk-entrance-signin > .introduction,[data-is="mk-entrance-signin"] > .introduction{display:inline-block;margin-top:16px;font-size:12px;color:#666}', '', function(opts) {
});

    
  

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-entrance-signup', '<mk-signup></mk-signup><button class="cancel" type="button" onclick="{parent.signin}" title="Cancel"><i class="fa fa-times"></i></button>', 'mk-entrance-signup,[data-is="mk-entrance-signup"]{display:block;margin:0 auto;padding:0 8px;max-width:350px;} mk-entrance-signup > .cancel,[data-is="mk-entrance-signup"] > .cancel{cursor:pointer;display:block;position:absolute;top:0;right:0;z-index:1;margin:0;padding:0;font-size:1.2em;color:#999;border:none;outline:none;box-shadow:none;background:transparent;transition:opacity .1s ease;} mk-entrance-signup > .cancel:hover,[data-is="mk-entrance-signup"] > .cancel:hover{color:#555} mk-entrance-signup > .cancel:active,[data-is="mk-entrance-signup"] > .cancel:active{color:#222} mk-entrance-signup > .cancel > i,[data-is="mk-entrance-signup"] > .cancel > i{padding:14px}', '', function(opts) {
});

    
  

/***/ }),
/* 180 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_ui_event__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_scripts_loading__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_scripts_get_post_summary__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__scripts_open_post_form__ = __webpack_require__(66);

    var riot = __webpack_require__(0)
    



riot.tag2('mk-home-page', '<mk-ui ref="ui"><mk-home ref="home"></mk-home></mk-ui>', 'mk-home-page,[data-is="mk-home-page"]{display:block}', '', function(opts) {

		this.mixin('i');
		this.mixin('stream');

		this.unreadCount = 0;

		this.on('mount', () => {
			document.title = 'Misskey'
			__WEBPACK_IMPORTED_MODULE_0__scripts_ui_event__["default"].trigger('title', '<i class="fa fa-home"></i>Home');

			__WEBPACK_IMPORTED_MODULE_0__scripts_ui_event__["default"].trigger('func', () => {
				Object(__WEBPACK_IMPORTED_MODULE_3__scripts_open_post_form__["a" /* default */])();
			}, 'pencil');

			__WEBPACK_IMPORTED_MODULE_1__common_scripts_loading__["a" /* default */].start();

			this.stream.on('post', this.onStreamPost);
			document.addEventListener('visibilitychange', this.onVisibilitychange, false);

			this.refs.ui.refs.home.on('loaded', () => {
				__WEBPACK_IMPORTED_MODULE_1__common_scripts_loading__["a" /* default */].done();
			});
		});

		this.on('unmount', () => {
			this.stream.off('post', this.onStreamPost);
			document.removeEventListener('visibilitychange', this.onVisibilitychange);
		});

		this.onStreamPost = post => {
			if (document.hidden && post.user_id !== this.I.id) {
				this.unreadCount++;
				document.title = `(${this.unreadCount}) ${Object(__WEBPACK_IMPORTED_MODULE_2__common_scripts_get_post_summary__["a" /* default */])(post)}`;
			}
		};

		this.onVisibilitychange = () => {
			if (!document.hidden) {
				this.unreadCount = 0;
				document.title = 'Misskey';
			}
		};
});

    
  

/***/ }),
/* 181 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_ui_event__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_scripts_loading__ = __webpack_require__(3);

    var riot = __webpack_require__(0)
    

riot.tag2('mk-drive-page', '<mk-ui ref="ui"><mk-drive ref="browser" folder="{parent.opts.folder}" file="{parent.opts.file}" data-is-naked="true"></mk-drive></mk-ui>', 'mk-drive-page,[data-is="mk-drive-page"]{display:block}', '', function(opts) {

		this.on('mount', () => {
			document.title = 'Misskey Drive';
			__WEBPACK_IMPORTED_MODULE_0__scripts_ui_event__["default"].trigger('title', '<i class="fa fa-cloud"></i>Drive');

			__WEBPACK_IMPORTED_MODULE_0__scripts_ui_event__["default"].trigger('func', () => {
				this.refs.ui.refs.browser.openContextMenu();
			}, 'ellipsis-h');

			this.refs.ui.refs.browser.on('begin-fetch', () => {
				__WEBPACK_IMPORTED_MODULE_1__common_scripts_loading__["a" /* default */].start();
			});

			this.refs.ui.refs.browser.on('fetched-mid', () => {
				__WEBPACK_IMPORTED_MODULE_1__common_scripts_loading__["a" /* default */].set(0.5);
			});

			this.refs.ui.refs.browser.on('fetched', () => {
				__WEBPACK_IMPORTED_MODULE_1__common_scripts_loading__["a" /* default */].done();
			});

			this.refs.ui.refs.browser.on('move-root', () => {
				const title = 'Misskey Drive';

				history.pushState(null, title, '/i/drive');

				document.title = title;
				__WEBPACK_IMPORTED_MODULE_0__scripts_ui_event__["default"].trigger('title', '<i class="fa fa-cloud"></i>Drive');
			});

			this.refs.ui.refs.browser.on('open-folder', (folder, silent) => {
				const title = folder.name + ' | Misskey Drive';

				if (!silent) {

					history.pushState(null, title, '/i/drive/folder/' + folder.id);
				}

				document.title = title;

				__WEBPACK_IMPORTED_MODULE_0__scripts_ui_event__["default"].trigger('title', '<i class="fa fa-folder-open"></i>' + folder.name);
			});

			this.refs.ui.refs.browser.on('open-file', (file, silent) => {
				const title = file.name + ' | Misskey Drive';

				if (!silent) {

					history.pushState(null, title, '/i/drive/file/' + file.id);
				}

				document.title = title;

				__WEBPACK_IMPORTED_MODULE_0__scripts_ui_event__["default"].trigger('title', '<mk-file-type-icon class="icon"></mk-file-type-icon>' + file.name);
				riot.mount('mk-file-type-icon', {
					type: file.type
				});
			});
		});
});

    
  

/***/ }),
/* 182 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_ui_event__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_scripts_loading__ = __webpack_require__(3);

    var riot = __webpack_require__(0)
    

riot.tag2('mk-notifications-page', '<mk-ui ref="ui"><mk-notifications ref="notifications"></mk-notifications></mk-ui>', 'mk-notifications-page,[data-is="mk-notifications-page"]{display:block}', '', function(opts) {

		this.on('mount', () => {
			document.title = 'Misskey | Notifications';
			__WEBPACK_IMPORTED_MODULE_0__scripts_ui_event__["default"].trigger('title', '<i class="fa fa-bell-o"></i>Notifications');

			__WEBPACK_IMPORTED_MODULE_1__common_scripts_loading__["a" /* default */].start();

			this.refs.ui.refs.notifications.on('fetched', () => {
				__WEBPACK_IMPORTED_MODULE_1__common_scripts_loading__["a" /* default */].done();
			});
		});
});

    
  

/***/ }),
/* 183 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_ui_event__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_scripts_loading__ = __webpack_require__(3);

    var riot = __webpack_require__(0)
    

riot.tag2('mk-user-page', '<mk-ui ref="ui"><mk-user ref="user" user="{parent.user}" page="{parent.opts.page}"></mk-user></mk-ui>', 'mk-user-page,[data-is="mk-user-page"]{display:block}', '', function(opts) {

		this.user = this.opts.user;

		this.on('mount', () => {
			__WEBPACK_IMPORTED_MODULE_1__common_scripts_loading__["a" /* default */].start();

			this.refs.ui.refs.user.on('loaded', user => {
				__WEBPACK_IMPORTED_MODULE_1__common_scripts_loading__["a" /* default */].done();
				document.title = user.name + ' | Misskey';

				__WEBPACK_IMPORTED_MODULE_0__scripts_ui_event__["default"].trigger('title', '<i class="fa fa-user"></i>' + user.name);
			});
		});
});

    
  

/***/ }),
/* 184 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_ui_event__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_scripts_loading__ = __webpack_require__(3);

    var riot = __webpack_require__(0)
    

riot.tag2('mk-user-followers-page', '<mk-ui ref="ui"><mk-user-followers ref="list" if="{!parent.fetching}" user="{parent.user}"></mk-user-followers></mk-ui>', 'mk-user-followers-page,[data-is="mk-user-followers-page"]{display:block}', '', function(opts) {

		this.mixin('api');

		this.fetching = true;
		this.user = null;

		this.on('mount', () => {
			__WEBPACK_IMPORTED_MODULE_1__common_scripts_loading__["a" /* default */].start();

			this.api('users/show', {
				username: this.opts.user
			}).then(user => {
				this.update({
					fetching: false,
					user: user
				});

				document.title = 'Followers of {}'.replace('{}', user.name) + ' | Misskey';

				__WEBPACK_IMPORTED_MODULE_0__scripts_ui_event__["default"].trigger('title', '<img src="' + user.avatar_url + '?thumbnail&size=64">' +  'Followers of {}'.replace('{}', user.name));

				this.refs.ui.refs.list.on('loaded', () => {
					__WEBPACK_IMPORTED_MODULE_1__common_scripts_loading__["a" /* default */].done();
				});
			});
		});
});

    
  

/***/ }),
/* 185 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_ui_event__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_scripts_loading__ = __webpack_require__(3);

    var riot = __webpack_require__(0)
    

riot.tag2('mk-user-following-page', '<mk-ui ref="ui"><mk-user-following ref="list" if="{!parent.fetching}" user="{parent.user}"></mk-user-following></mk-ui>', 'mk-user-following-page,[data-is="mk-user-following-page"]{display:block}', '', function(opts) {

		this.mixin('api');

		this.fetching = true;
		this.user = null;

		this.on('mount', () => {
			__WEBPACK_IMPORTED_MODULE_1__common_scripts_loading__["a" /* default */].start();

			this.api('users/show', {
				username: this.opts.user
			}).then(user => {
				this.update({
					fetching: false,
					user: user
				});

				document.title = 'Following of {}'.replace('{}', user.name) + ' | Misskey';

				__WEBPACK_IMPORTED_MODULE_0__scripts_ui_event__["default"].trigger('title', '<img src="' + user.avatar_url + '?thumbnail&size=64">' + 'Following of {}'.replace('{}', user.name));

				this.refs.ui.refs.list.on('loaded', () => {
					__WEBPACK_IMPORTED_MODULE_1__common_scripts_loading__["a" /* default */].done();
				});
			});
		});
});

    
  

/***/ }),
/* 186 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_ui_event__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_scripts_loading__ = __webpack_require__(3);

    var riot = __webpack_require__(0)
    

riot.tag2('mk-post-page', '<mk-ui ref="ui"><main><mk-post-detail ref="post" post="{parent.post}"></mk-post-detail></main></mk-ui>', 'mk-post-page,[data-is="mk-post-page"]{display:block;} mk-post-page main,[data-is="mk-post-page"] main{background:#fff;} mk-post-page main > mk-post-detail,[data-is="mk-post-page"] main > mk-post-detail{width:100%;max-width:500px;margin:0 auto}', '', function(opts) {

		this.post = this.opts.post;

		this.on('mount', () => {
			document.title = 'Misskey';
			__WEBPACK_IMPORTED_MODULE_0__scripts_ui_event__["default"].trigger('title', '<i class="fa fa-sticky-note-o"></i>Post');

			__WEBPACK_IMPORTED_MODULE_1__common_scripts_loading__["a" /* default */].start();

			this.refs.ui.refs.post.on('post-fetched', () => {
				__WEBPACK_IMPORTED_MODULE_1__common_scripts_loading__["a" /* default */].set(0.5);
			});

			this.refs.ui.refs.post.on('loaded', () => {
				__WEBPACK_IMPORTED_MODULE_1__common_scripts_loading__["a" /* default */].done();
			});
		});
});

    
  

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-new-post-page', '<mk-post-form ref="form"></mk-post-form>', 'mk-new-post-page,[data-is="mk-new-post-page"]{display:block}', '', function(opts) {
});

    
  

/***/ }),
/* 188 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_ui_event__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_scripts_loading__ = __webpack_require__(3);

    var riot = __webpack_require__(0)
    

riot.tag2('mk-search-page', '<mk-ui ref="ui"><mk-search ref="search" query="{parent.opts.query}"></mk-search></mk-ui>', 'mk-search-page,[data-is="mk-search-page"]{display:block}', '', function(opts) {

		this.on('mount', () => {
			document.title = `Search: ${this.opts.query} | Misskey`

			__WEBPACK_IMPORTED_MODULE_0__scripts_ui_event__["default"].trigger('title', '<i class="fa fa-search"></i>' + this.opts.query);

			__WEBPACK_IMPORTED_MODULE_1__common_scripts_loading__["a" /* default */].start();

			this.refs.ui.refs.search.on('loaded', () => {
				__WEBPACK_IMPORTED_MODULE_1__common_scripts_loading__["a" /* default */].done();
			});
		});
});

    
  

/***/ }),
/* 189 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_ui_event__ = __webpack_require__(4);

    var riot = __webpack_require__(0)
    
riot.tag2('mk-settings-page', '<mk-ui ref="ui"><ul><li><a><i class="fa fa-user"></i>Profile</a></li><li><a href="./settings/authorized-apps"><i class="fa fa-puzzle-piece"></i>Applications</a></li><li><a href="./settings/twitter"><i class="fa fa-twitter"></i>Twitter integration</a></li><li><a href="./settings/signin-history"><i class="fa fa-sign-in"></i>Sign in history</a></li><li><a href="./settings/api"><i class="fa fa-key"></i>API</a></li></ul></mk-ui>', 'mk-settings-page,[data-is="mk-settings-page"]{display:block}', '', function(opts) {

		this.on('mount', () => {
			document.title = 'Misskey | Settings';
			__WEBPACK_IMPORTED_MODULE_0__scripts_ui_event__["default"].trigger('title', '<i class="fa fa-cog"></i>Settings');
		});
});

    
  

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-signin-history-page', '<mk-ui ref="ui"><mk-signin-history></mk-signin-history></mk-ui>', 'mk-signin-history-page,[data-is="mk-signin-history-page"]{display:block}', '', function(opts) {
		const ui = __webpack_require__(4);

		this.on('mount', () => {
			document.title = 'Misskey | Sign in history';
			ui.trigger('title', '<i class="fa fa-sign-in"></i>Sign in history');
		});
});

    
  

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-api-info-page', '<mk-ui ref="ui"><mk-api-info></mk-api-info></mk-ui>', 'mk-api-info-page,[data-is="mk-api-info-page"]{display:block}', '', function(opts) {
		const ui = __webpack_require__(4);

		this.on('mount', () => {
			document.title = 'Misskey | API';
			ui.trigger('title', '<i class="fa fa-key"></i>API');
		});
});

    
  

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-authorized-apps-page', '<mk-ui ref="ui"><mk-authorized-apps></mk-authorized-apps></mk-ui>', 'mk-authorized-apps-page,[data-is="mk-authorized-apps-page"]{display:block}', '', function(opts) {
		const ui = __webpack_require__(4);

		this.on('mount', () => {
			document.title = 'Misskey | Applications';
			ui.trigger('title', '<i class="fa fa-puzzle-piece"></i>Applications');
		});
});

    
  

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-twitter-setting-page', '<mk-ui ref="ui"><mk-twitter-setting></mk-twitter-setting></mk-ui>', 'mk-twitter-setting-page,[data-is="mk-twitter-setting-page"]{display:block}', '', function(opts) {
		const ui = __webpack_require__(4);

		this.on('mount', () => {
			document.title = 'Misskey | Twitter integration';
			ui.trigger('title', '<i class="fa fa-twitter"></i>Twitter integration');
		});
});

    
  

/***/ }),
/* 194 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_ui_event__ = __webpack_require__(4);

    var riot = __webpack_require__(0)
    
riot.tag2('mk-messaging-page', '<mk-ui ref="ui"><mk-messaging ref="index"></mk-messaging></mk-ui>', 'mk-messaging-page,[data-is="mk-messaging-page"]{display:block}', '', function(opts) {

		this.mixin('page');

		this.on('mount', () => {
			document.title = 'Misskey | Messaging';
			__WEBPACK_IMPORTED_MODULE_0__scripts_ui_event__["default"].trigger('title', '<i class="fa fa-comments-o"></i>Messaging');

			this.refs.ui.refs.index.on('navigate-user', user => {
				this.page('/i/messaging/' + user.username);
			});
		});
});

    
  

/***/ }),
/* 195 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_ui_event__ = __webpack_require__(4);

    var riot = __webpack_require__(0)
    
riot.tag2('mk-messaging-room-page', '<mk-ui ref="ui"><mk-messaging-room if="{!parent.fetching}" user="{parent.user}" is-naked="{true}"></mk-messaging-room></mk-ui>', 'mk-messaging-room-page,[data-is="mk-messaging-room-page"]{display:block}', '', function(opts) {

		this.mixin('api');

		this.fetching = true;

		this.on('mount', () => {
			this.api('users/show', {
				username: this.opts.username
			}).then(user => {
				this.update({
					fetching: false,
					user: user
				});

				document.title = `Messaging: ${user.name} | Misskey`;

				__WEBPACK_IMPORTED_MODULE_0__scripts_ui_event__["default"].trigger('title', '<i class="fa fa-comments-o"></i>' + user.name);
			});
		});
});

    
  

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-home', '<mk-home-timeline ref="tl"></mk-home-timeline>', 'mk-home,[data-is="mk-home"]{display:block;} mk-home > mk-home-timeline,[data-is="mk-home"] > mk-home-timeline{max-width:600px;margin:0 auto}@media (min-width:500px){ mk-home,[data-is="mk-home"]{padding:16px}}', '', function(opts) {
		this.on('mount', () => {
			this.refs.tl.on('loaded', () => {
				this.trigger('loaded');
			});
		});
});

    
  

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-home-timeline', '<mk-init-following if="{noFollowing}"></mk-init-following><mk-timeline ref="timeline" init="{init}" more="{more}" empty="{\'There is no posts\'}"></mk-timeline>', 'mk-home-timeline,[data-is="mk-home-timeline"]{display:block;} mk-home-timeline > mk-init-following,[data-is="mk-home-timeline"] > mk-init-following{border-bottom:solid 1px #eee}', '', function(opts) {
		this.mixin('i');
		this.mixin('api');
		this.mixin('stream');

		this.noFollowing = this.I.following_count == 0;

		this.init = new Promise((res, rej) => {
			this.api('posts/timeline').then(posts => {
				res(posts);
				this.trigger('loaded');
			});
		});

		this.on('mount', () => {
			this.stream.on('post', this.onStreamPost);
			this.stream.on('follow', this.onStreamFollow);
			this.stream.on('unfollow', this.onStreamUnfollow);
		});

		this.on('unmount', () => {
			this.stream.off('post', this.onStreamPost);
			this.stream.off('follow', this.onStreamFollow);
			this.stream.off('unfollow', this.onStreamUnfollow);
		});

		this.more = () => {
			return this.api('posts/timeline', {
				max_id: this.refs.timeline.tail().id
			});
		};

		this.onStreamPost = post => {
			this.update({
				isEmpty: false
			});
			this.refs.timeline.addPost(post);
		};

		this.onStreamFollow = () => {
			this.fetch();
		};

		this.onStreamUnfollow = () => {
			this.fetch();
		};
});

    
  

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-timeline', '<div class="init" if="{init}"><i class="fa fa-spinner fa-pulse"></i>Loading </div><div class="empty" if="{!init && posts.length == 0}"><i class="fa fa-comments-o"></i>{opts.empty || \'No posts\'} </div><virtual each="{post, i in posts}"><mk-timeline-post post="{post}"></mk-timeline-post><p class="date" if="{i != posts.length - 1 && post._date != posts[i + 1]._date}"><span><i class="fa fa-angle-up"></i>{post._datetext}</span><span><i class="fa fa-angle-down"></i>{posts[i + 1]._datetext}</span></p></virtual><footer if="{!init}"><button if="{canFetchMore}" onclick="{more}" disabled="{fetching}"><span if="{!fetching}">More</span><span if="{fetching}">Loading<mk-ellipsis></mk-ellipsis></span></button></footer>', 'mk-timeline,[data-is="mk-timeline"]{display:block;background:#fff;} mk-timeline > .init,[data-is="mk-timeline"] > .init{padding:64px 0;text-align:center;color:#999;} mk-timeline > .init > i,[data-is="mk-timeline"] > .init > i{margin-right:4px} mk-timeline > .empty,[data-is="mk-timeline"] > .empty{margin:0 auto;padding:32px;max-width:400px;text-align:center;color:#999;} mk-timeline > .empty > i,[data-is="mk-timeline"] > .empty > i{display:block;margin-bottom:16px;font-size:3em;color:#ccc} mk-timeline > mk-timeline-post,[data-is="mk-timeline"] > mk-timeline-post{border-bottom:solid 1px #eaeaea;} mk-timeline > mk-timeline-post:last-of-type,[data-is="mk-timeline"] > mk-timeline-post:last-of-type{border-bottom:none} mk-timeline > .date,[data-is="mk-timeline"] > .date{display:block;margin:0;line-height:32px;text-align:center;font-size:.9em;color:#aaa;background:#fdfdfd;border-bottom:solid 1px #eaeaea;} mk-timeline > .date span,[data-is="mk-timeline"] > .date span{margin:0 16px} mk-timeline > .date i,[data-is="mk-timeline"] > .date i{margin-right:8px} mk-timeline > footer,[data-is="mk-timeline"] > footer{text-align:center;border-top:solid 1px #eaeaea;border-bottom-left-radius:4px;border-bottom-right-radius:4px;} mk-timeline > footer > button,[data-is="mk-timeline"] > footer > button{margin:0;padding:16px;width:100%;color:#87bb35;} mk-timeline > footer > button:disabled,[data-is="mk-timeline"] > footer > button:disabled{opacity:.7}', '', function(opts) {
		this.posts = [];
		this.init = true;
		this.fetching = false;
		this.canFetchMore = true;

		this.on('mount', () => {
			this.opts.init.then(posts => {
				this.init = false;
				this.setPosts(posts);
			});
		});

		this.on('update', () => {
			this.posts.forEach(post => {
				const date = new Date(post.created_at).getDate();
				const month = new Date(post.created_at).getMonth() + 1;
				post._date = date;
				post._datetext = `${month}月 ${date}日`;
			});
		});

		this.more = () => {
			if (this.init || this.fetching || this.posts.length == 0) return;
			this.update({
				fetching: true
			});
			this.opts.more().then(posts => {
				this.fetching = false;
				this.prependPosts(posts);
			});
		};

		this.setPosts = posts => {
			this.update({
				posts: posts
			});
		};

		this.prependPosts = posts => {
			posts.forEach(post => {
				this.posts.push(post);
				this.update();
			});
		}

		this.addPost = post => {
			this.posts.unshift(post);
			this.update();
		};

		this.tail = () => {
			return this.posts[this.posts.length - 1];
		};
});

    
  

/***/ }),
/* 199 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_scripts_text_compiler__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_scripts_get_post_summary__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scripts_open_post_form__ = __webpack_require__(66);

    var riot = __webpack_require__(0)
    


riot.tag2('mk-timeline-post', '<div class="reply-to" if="{p.reply_to}"><mk-timeline-post-sub post="{p.reply_to}"></mk-timeline-post-sub></div><div class="repost" if="{isRepost}"><p><a class="avatar-anchor" href="{\'/\' + post.user.username}"><img class="avatar" riot-src="{post.user.avatar_url + \'?thumbnail&size=64\'}" alt="avatar"></a><i class="fa fa-retweet"></i>{\'Reposted by {}\'.substr(0, \'Reposted by {}\'.indexOf(\'{\'))}<a class="name" href="{\'/\' + post.user.username}">{post.user.name}</a>{\'Reposted by {}\'.substr(\'Reposted by {}\'.indexOf(\'}\') + 1)} </p><mk-time time="{post.created_at}"></mk-time></div><article><a class="avatar-anchor" href="{\'/\' + p.user.username}"><img class="avatar" riot-src="{p.user.avatar_url + \'?thumbnail&size=96\'}" alt="avatar"></a><div class="main"><header><a class="name" href="{\'/\' + p.user.username}">{p.user.name}</a><span class="is-bot" if="{p.user.is_bot}">bot</span><span class="username">@{p.user.username}</span><a class="created-at" href="{url}"><mk-time time="{p.created_at}"></mk-time></a></header><div class="body"><div class="text" ref="text"><a class="reply" if="{p.reply_to}"><i class="fa fa-reply"></i></a><p class="dummy"></p><a class="quote" if="{p.repost != null}">RP:</a></div><div class="media" if="{p.media}"><mk-images-viewer images="{p.media}"></mk-images-viewer></div><mk-poll if="{p.poll}" post="{p}" ref="pollViewer"></mk-poll><span class="app" if="{p.app}">via <b>{p.app.name}</b></span><div class="repost" if="{p.repost}"><i class="fa fa-quote-right fa-flip-horizontal"></i><mk-post-preview class="repost" post="{p.repost}"></mk-post-preview></div></div><footer><mk-reactions-viewer post="{p}" ref="reactionsViewer"></mk-reactions-viewer><button onclick="{reply}"><i class="fa fa-reply"></i><p class="count" if="{p.replies_count > 0}">{p.replies_count}</p></button><button onclick="{repost}" title="Repost"><i class="fa fa-retweet"></i><p class="count" if="{p.repost_count > 0}">{p.repost_count}</p></button><button class="{reacted: p.my_reaction != null}" onclick="{react}" ref="reactButton"><i class="fa fa-plus"></i><p class="count" if="{p.reactions_count > 0}">{p.reactions_count}</p></button></footer></div></article>', 'mk-timeline-post,[data-is="mk-timeline-post"]{display:block;margin:0;padding:0;font-size:12px;}@media (min-width:350px){ mk-timeline-post,[data-is="mk-timeline-post"]{font-size:14px}}@media (min-width:500px){ mk-timeline-post,[data-is="mk-timeline-post"]{font-size:16px}} mk-timeline-post > .repost,[data-is="mk-timeline-post"] > .repost{color:#9dbb00;background:linear-gradient(to bottom,#edfde2 0%,#fff 100%);} mk-timeline-post > .repost > p,[data-is="mk-timeline-post"] > .repost > p{margin:0;padding:8px 16px;line-height:28px;}@media (min-width:500px){ mk-timeline-post > .repost > p,[data-is="mk-timeline-post"] > .repost > p{padding:16px}} mk-timeline-post > .repost > p .avatar-anchor,[data-is="mk-timeline-post"] > .repost > p .avatar-anchor{display:inline-block;} mk-timeline-post > .repost > p .avatar-anchor .avatar,[data-is="mk-timeline-post"] > .repost > p .avatar-anchor .avatar{vertical-align:bottom;width:28px;height:28px;margin:0 8px 0 0;border-radius:6px} mk-timeline-post > .repost > p i,[data-is="mk-timeline-post"] > .repost > p i{margin-right:4px} mk-timeline-post > .repost > p .name,[data-is="mk-timeline-post"] > .repost > p .name{font-weight:bold} mk-timeline-post > .repost > mk-time,[data-is="mk-timeline-post"] > .repost > mk-time{position:absolute;top:8px;right:16px;font-size:.9em;line-height:28px;}@media (min-width:500px){ mk-timeline-post > .repost > mk-time,[data-is="mk-timeline-post"] > .repost > mk-time{top:16px}} mk-timeline-post > .repost + article,[data-is="mk-timeline-post"] > .repost + article{padding-top:8px} mk-timeline-post > .reply-to,[data-is="mk-timeline-post"] > .reply-to{background:rgba(0,0,0,0.013);} mk-timeline-post > .reply-to > mk-post-preview,[data-is="mk-timeline-post"] > .reply-to > mk-post-preview{background:transparent} mk-timeline-post > article,[data-is="mk-timeline-post"] > article{padding:14px 16px 9px 16px;} mk-timeline-post > article:after,[data-is="mk-timeline-post"] > article:after{content:"";display:block;clear:both} mk-timeline-post > article > .avatar-anchor,[data-is="mk-timeline-post"] > article > .avatar-anchor{display:block;float:left;margin:0 10px 8px 0;position:-webkit-sticky;position:sticky;top:62px;}@media (min-width:500px){ mk-timeline-post > article > .avatar-anchor,[data-is="mk-timeline-post"] > article > .avatar-anchor{margin-right:16px}} mk-timeline-post > article > .avatar-anchor > .avatar,[data-is="mk-timeline-post"] > article > .avatar-anchor > .avatar{display:block;width:48px;height:48px;margin:0;border-radius:6px;vertical-align:bottom;}@media (min-width:500px){ mk-timeline-post > article > .avatar-anchor > .avatar,[data-is="mk-timeline-post"] > article > .avatar-anchor > .avatar{width:58px;height:58px;border-radius:8px}} mk-timeline-post > article > .main,[data-is="mk-timeline-post"] > article > .main{float:left;width:calc(100% - 58px);}@media (min-width:500px){ mk-timeline-post > article > .main,[data-is="mk-timeline-post"] > article > .main{width:calc(100% - 74px)}} mk-timeline-post > article > .main > header,[data-is="mk-timeline-post"] > article > .main > header{display:flex;white-space:nowrap;}@media (min-width:500px){ mk-timeline-post > article > .main > header,[data-is="mk-timeline-post"] > article > .main > header{margin-bottom:2px}} mk-timeline-post > article > .main > header > .name,[data-is="mk-timeline-post"] > article > .main > header > .name{display:block;margin:0 .5em 0 0;padding:0;overflow:hidden;color:#777;font-size:1em;font-weight:700;text-align:left;text-decoration:none;text-overflow:ellipsis;} mk-timeline-post > article > .main > header > .name:hover,[data-is="mk-timeline-post"] > article > .main > header > .name:hover{text-decoration:underline} mk-timeline-post > article > .main > header > .is-bot,[data-is="mk-timeline-post"] > article > .main > header > .is-bot{text-align:left;margin:0 .5em 0 0;padding:1px 6px;font-size:12px;color:#aaa;border:solid 1px #ddd;border-radius:3px} mk-timeline-post > article > .main > header > .username,[data-is="mk-timeline-post"] > article > .main > header > .username{text-align:left;margin:0 .5em 0 0;color:#ccc} mk-timeline-post > article > .main > header > .created-at,[data-is="mk-timeline-post"] > article > .main > header > .created-at{margin-left:auto;font-size:.9em;color:#c0c0c0} mk-timeline-post > article > .main > .body > .text,[data-is="mk-timeline-post"] > article > .main > .body > .text{cursor:default;display:block;margin:0;padding:0;overflow-wrap:break-word;font-size:1.1em;color:#717171;} mk-timeline-post > article > .main > .body > .text > .dummy,[data-is="mk-timeline-post"] > article > .main > .body > .text > .dummy{display:none} mk-timeline-post > article > .main > .body > .text .link:after,[data-is="mk-timeline-post"] > article > .main > .body > .text .link:after{content:"\\f14c";display:inline-block;padding-left:2px;font-family:FontAwesome;font-size:.9em;font-weight:400;font-style:normal} mk-timeline-post > article > .main > .body > .text mk-url-preview,[data-is="mk-timeline-post"] > article > .main > .body > .text mk-url-preview{margin-top:8px} mk-timeline-post > article > .main > .body > .text > .reply,[data-is="mk-timeline-post"] > article > .main > .body > .text > .reply{margin-right:8px;color:#717171} mk-timeline-post > article > .main > .body > .text > .quote,[data-is="mk-timeline-post"] > article > .main > .body > .text > .quote{margin-left:4px;font-style:oblique;color:#a0bf46} mk-timeline-post > article > .main > .body > .text code,[data-is="mk-timeline-post"] > article > .main > .body > .text code{padding:4px 8px;margin:0 .5em;font-size:80%;color:#525252;background:#f8f8f8;border-radius:2px} mk-timeline-post > article > .main > .body > .text pre > code,[data-is="mk-timeline-post"] > article > .main > .body > .text pre > code{padding:16px;margin:0} mk-timeline-post > article > .main > .body > .text [data-is-me]:after,[data-is="mk-timeline-post"] > article > .main > .body > .text [data-is-me]:after{content:"you";padding:0 4px;margin-left:4px;font-size:80%;color:#fff;background:#87bb35;border-radius:4px} mk-timeline-post > article > .main > .body > .media > img,[data-is="mk-timeline-post"] > article > .main > .body > .media > img{display:block;max-width:100%} mk-timeline-post > article > .main > .body > .app,[data-is="mk-timeline-post"] > article > .main > .body > .app{font-size:12px;color:#ccc} mk-timeline-post > article > .main > .body > mk-poll,[data-is="mk-timeline-post"] > article > .main > .body > mk-poll{font-size:80%} mk-timeline-post > article > .main > .body > .repost,[data-is="mk-timeline-post"] > article > .main > .body > .repost{margin:8px 0;} mk-timeline-post > article > .main > .body > .repost > i:first-child,[data-is="mk-timeline-post"] > article > .main > .body > .repost > i:first-child{position:absolute;top:-8px;left:-8px;z-index:1;color:#c0dac6;font-size:28px;background:#fff} mk-timeline-post > article > .main > .body > .repost > mk-post-preview,[data-is="mk-timeline-post"] > article > .main > .body > .repost > mk-post-preview{padding:16px;border:dashed 1px #c0dac6;border-radius:8px} mk-timeline-post > article > .main > footer > button,[data-is="mk-timeline-post"] > article > .main > footer > button{margin:0 28px 0 0;padding:8px;background:transparent;border:none;box-shadow:none;font-size:1em;color:#ddd;cursor:pointer;} mk-timeline-post > article > .main > footer > button:hover,[data-is="mk-timeline-post"] > article > .main > footer > button:hover{color:#666} mk-timeline-post > article > .main > footer > button > .count,[data-is="mk-timeline-post"] > article > .main > footer > button > .count{display:inline;margin:0 0 0 8px;color:#999} mk-timeline-post > article > .main > footer > button.reacted,[data-is="mk-timeline-post"] > article > .main > footer > button.reacted{color:#87bb35}', 'class="{repost: isRepost}"', function(opts) {

		this.mixin('api');
		this.mixin('stream');

		this.set = post => {
			this.post = post;
			this.isRepost = this.post.repost != null && this.post.text == null;
			this.p = this.isRepost ? this.post.repost : this.post;
			this.p.reactions_count = this.p.reaction_counts ? Object.keys(this.p.reaction_counts).map(key => this.p.reaction_counts[key]).reduce((a, b) => a + b) : 0;
			this.summary = Object(__WEBPACK_IMPORTED_MODULE_1__common_scripts_get_post_summary__["a" /* default */])(this.p);
			this.url = `/${this.p.user.username}/${this.p.id}`;
		};

		this.set(this.opts.post);

		this.refresh = post => {
			this.set(post);
			this.update();
			if (this.refs.reactionsViewer) this.refs.reactionsViewer.update({
				post
			});
			if (this.refs.pollViewer) this.refs.pollViewer.init(post);
		};

		this.onStreamPostUpdated = data => {
			const post = data.post;
			if (post.id == this.post.id) {
				this.refresh(post);
			}
		};

		this.onStreamConnected = () => {
			this.capture();
		};

		this.capture = withHandler => {
			this.stream.send({
				type: 'capture',
				id: this.post.id
			});
			if (withHandler) this.stream.on('post-updated', this.onStreamPostUpdated);
		};

		this.decapture = withHandler => {
			this.stream.send({
				type: 'decapture',
				id: this.post.id
			});
			if (withHandler) this.stream.off('post-updated', this.onStreamPostUpdated);
		};

		this.on('mount', () => {
			this.capture(true);
			this.stream.on('_connected_', this.onStreamConnected);

			if (this.p.text) {
				const tokens = this.p.ast;

				this.refs.text.innerHTML = this.refs.text.innerHTML.replace('<p class="dummy"></p>', Object(__WEBPACK_IMPORTED_MODULE_0__common_scripts_text_compiler__["a" /* default */])(tokens));

				this.refs.text.children.forEach(e => {
					if (e.tagName == 'MK-URL') riot.mount(e);
				});

				tokens
				.filter(t => (t.type == 'url' || t.type == 'link') && !t.silent)
				.map(t => {
					riot.mount(this.refs.text.appendChild(document.createElement('mk-url-preview')), {
						url: t.url
					});
				});
			}
		});

		this.on('unmount', () => {
			this.decapture(true);
			this.stream.off('_connected_', this.onStreamConnected);
		});

		this.reply = () => {
			Object(__WEBPACK_IMPORTED_MODULE_2__scripts_open_post_form__["a" /* default */])({
				reply: this.p
			});
		};

		this.repost = () => {
			const text = window.prompt(`「${this.summary}」をRepost`);
			if (text == null) return;
			this.api('posts/create', {
				repost_id: this.p.id,
				text: text == '' ? undefined : text
			});
		};

		this.react = () => {
			riot.mount(document.body.appendChild(document.createElement('mk-reaction-picker')), {
				source: this.refs.reactButton,
				post: this.p,
				compact: true
			});
		};
});

    
  

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-timeline-post-sub', '<article><a class="avatar-anchor" href="{\'/\' + post.user.username}"><img class="avatar" riot-src="{post.user.avatar_url + \'?thumbnail&size=96\'}" alt="avatar"></a><div class="main"><header><a class="name" href="{\'/\' + post.user.username}">{post.user.name}</a><span class="username">@{post.user.username}</span><a class="created-at" href="{\'/\' + post.user.username + \'/\' + post.id}"><mk-time time="{post.created_at}"></mk-time></a></header><div class="body"><mk-sub-post-content class="text" post="{post}"></mk-sub-post-content></div></div></article>', 'mk-timeline-post-sub,[data-is="mk-timeline-post-sub"]{display:block;margin:0;padding:0;font-size:.9em;} mk-timeline-post-sub > article,[data-is="mk-timeline-post-sub"] > article{padding:16px;} mk-timeline-post-sub > article:after,[data-is="mk-timeline-post-sub"] > article:after{content:"";display:block;clear:both} mk-timeline-post-sub > article:hover > .main > footer > button,[data-is="mk-timeline-post-sub"] > article:hover > .main > footer > button{color:#888} mk-timeline-post-sub > article > .avatar-anchor,[data-is="mk-timeline-post-sub"] > article > .avatar-anchor{display:block;float:left;margin:0 10px 0 0;}@media (min-width:500px){ mk-timeline-post-sub > article > .avatar-anchor,[data-is="mk-timeline-post-sub"] > article > .avatar-anchor{margin-right:16px}} mk-timeline-post-sub > article > .avatar-anchor > .avatar,[data-is="mk-timeline-post-sub"] > article > .avatar-anchor > .avatar{display:block;width:44px;height:44px;margin:0;border-radius:8px;vertical-align:bottom;}@media (min-width:500px){ mk-timeline-post-sub > article > .avatar-anchor > .avatar,[data-is="mk-timeline-post-sub"] > article > .avatar-anchor > .avatar{width:52px;height:52px}} mk-timeline-post-sub > article > .main,[data-is="mk-timeline-post-sub"] > article > .main{float:left;width:calc(100% - 54px);}@media (min-width:500px){ mk-timeline-post-sub > article > .main,[data-is="mk-timeline-post-sub"] > article > .main{width:calc(100% - 68px)}} mk-timeline-post-sub > article > .main > header,[data-is="mk-timeline-post-sub"] > article > .main > header{display:flex;margin-bottom:2px;white-space:nowrap;} mk-timeline-post-sub > article > .main > header > .name,[data-is="mk-timeline-post-sub"] > article > .main > header > .name{display:block;margin:0 .5em 0 0;padding:0;overflow:hidden;color:#607073;font-size:1em;font-weight:700;text-align:left;text-decoration:none;text-overflow:ellipsis;} mk-timeline-post-sub > article > .main > header > .name:hover,[data-is="mk-timeline-post-sub"] > article > .main > header > .name:hover{text-decoration:underline} mk-timeline-post-sub > article > .main > header > .username,[data-is="mk-timeline-post-sub"] > article > .main > header > .username{text-align:left;margin:0;color:#d1d8da} mk-timeline-post-sub > article > .main > header > .created-at,[data-is="mk-timeline-post-sub"] > article > .main > header > .created-at{margin-left:auto;color:#b2b8bb} mk-timeline-post-sub > article > .main > .body > .text,[data-is="mk-timeline-post-sub"] > article > .main > .body > .text{cursor:default;margin:0;padding:0;font-size:1.1em;color:#717171;} mk-timeline-post-sub > article > .main > .body > .text pre,[data-is="mk-timeline-post-sub"] > article > .main > .body > .text pre{max-height:120px;font-size:80%}', '', function(opts) {
this.post = this.opts.post
});

    
  

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-post-preview', '<article><a class="avatar-anchor" href="{\'/\' + post.user.username}"><img class="avatar" riot-src="{post.user.avatar_url + \'?thumbnail&size=64\'}" alt="avatar"></a><div class="main"><header><a class="name" href="{\'/\' + post.user.username}">{post.user.name}</a><span class="username">@{post.user.username}</span><a class="time" href="{\'/\' + post.user.username + \'/\' + post.id}"><mk-time time="{post.created_at}"></mk-time></a></header><div class="body"><mk-sub-post-content class="text" post="{post}"></mk-sub-post-content></div></div></article>', 'mk-post-preview,[data-is="mk-post-preview"]{display:block;margin:0;padding:0;font-size:.9em;background:#fff;} mk-post-preview > article:after,[data-is="mk-post-preview"] > article:after{content:"";display:block;clear:both} mk-post-preview > article:hover > .main > footer > button,[data-is="mk-post-preview"] > article:hover > .main > footer > button{color:#888} mk-post-preview > article > .avatar-anchor,[data-is="mk-post-preview"] > article > .avatar-anchor{display:block;float:left;margin:0 12px 0 0;} mk-post-preview > article > .avatar-anchor > .avatar,[data-is="mk-post-preview"] > article > .avatar-anchor > .avatar{display:block;width:48px;height:48px;margin:0;border-radius:8px;vertical-align:bottom} mk-post-preview > article > .main,[data-is="mk-post-preview"] > article > .main{float:left;width:calc(100% - 60px);} mk-post-preview > article > .main > header,[data-is="mk-post-preview"] > article > .main > header{display:flex;margin-bottom:4px;white-space:nowrap;} mk-post-preview > article > .main > header > .name,[data-is="mk-post-preview"] > article > .main > header > .name{display:block;margin:0 .5em 0 0;padding:0;overflow:hidden;color:#607073;font-size:1em;font-weight:700;text-align:left;text-decoration:none;text-overflow:ellipsis;} mk-post-preview > article > .main > header > .name:hover,[data-is="mk-post-preview"] > article > .main > header > .name:hover{text-decoration:underline} mk-post-preview > article > .main > header > .username,[data-is="mk-post-preview"] > article > .main > header > .username{text-align:left;margin:0 .5em 0 0;color:#d1d8da} mk-post-preview > article > .main > header > .time,[data-is="mk-post-preview"] > article > .main > header > .time{margin-left:auto;color:#b2b8bb} mk-post-preview > article > .main > .body > .text,[data-is="mk-post-preview"] > article > .main > .body > .text{cursor:default;margin:0;padding:0;font-size:1.1em;color:#717171}', '', function(opts) {
this.post = this.opts.post
});

    
  

/***/ }),
/* 202 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_scripts_text_compiler__ = __webpack_require__(5);

    var riot = __webpack_require__(0)
    
riot.tag2('mk-sub-post-content', '<div class="body"><a class="reply" if="{post.reply_to_id}"><i class="fa fa-reply"></i></a><span ref="text"></span><a class="quote" if="{post.repost_id}" href="{\'/post:\' + post.repost_id}">RP: ...</a></div><details if="{post.media}"><summary>({post.media.length}個のメディア)</summary><mk-images-viewer images="{post.media}"></mk-images-viewer></details><details if="{post.poll}"><summary>Poll</summary><mk-poll post="{post}"></mk-poll></details>', 'mk-sub-post-content,[data-is="mk-sub-post-content"]{display:block;overflow-wrap:break-word;} mk-sub-post-content > .body > .reply,[data-is="mk-sub-post-content"] > .body > .reply{margin-right:6px;color:#717171} mk-sub-post-content > .body > .quote,[data-is="mk-sub-post-content"] > .body > .quote{margin-left:4px;font-style:oblique;color:#a0bf46} mk-sub-post-content mk-poll,[data-is="mk-sub-post-content"] mk-poll{font-size:80%}', '', function(opts) {

		this.post = this.opts.post;

		this.on('mount', () => {
			if (this.post.text) {
				const tokens = this.post.ast;
				this.refs.text.innerHTML = Object(__WEBPACK_IMPORTED_MODULE_0__common_scripts_text_compiler__["a" /* default */])(tokens, false);

				this.refs.text.children.forEach(e => {
					if (e.tagName == 'MK-URL') riot.mount(e);
				});
			}
		});
});

    
  

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-images-viewer', '<div class="image" ref="view" onclick="{click}"><img ref="img" riot-src="{image.url + \'?thumbnail&size=512\'}" alt="{image.name}" title="{image.name}"></div>', 'mk-images-viewer,[data-is="mk-images-viewer"]{display:block;padding:8px;overflow:hidden;box-shadow:0 0 4px rgba(0,0,0,0.2);border-radius:4px;} mk-images-viewer > .image > img,[data-is="mk-images-viewer"] > .image > img{display:block;max-height:256px;max-width:100%;margin:0 auto}', '', function(opts) {
		this.images = this.opts.images;
		this.image = this.images[0];

		this.click = () => {
			window.open(this.image.url);
		};
});

    
  

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-drive', '<nav><p onclick="{goRoot}"><i class="fa fa-cloud"></i>Drive</p><virtual each="{folder in hierarchyFolders}"><span><i class="fa fa-angle-right"></i></span><p onclick="{move}">{folder.name}</p></virtual><virtual if="{folder != null}"><span><i class="fa fa-angle-right"></i></span><p>{folder.name}</p></virtual><virtual if="{file != null}"><span><i class="fa fa-angle-right"></i></span><p>{file.name}</p></virtual></nav><mk-uploader ref="uploader"></mk-uploader><div class="browser {fetching: fetching}" if="{file == null}"><div class="info" if="{info}"><p if="{folder == null}">{(info.usage / info.capacity * 100).toFixed(1)}% used</p><p if="{folder != null && (folder.folders_count > 0 || folder.files_count > 0)}"><virtual if="{folder.folders_count > 0}">{folder.folders_count} Folder(s)</virtual><virtual if="{folder.folders_count > 0 && folder.files_count > 0}">, </virtual><virtual if="{folder.files_count > 0}">{folder.files_count} File(s)</virtual></p></div><div class="folders" if="{folders.length > 0}"><virtual each="{folder in folders}"><mk-drive-folder folder="{folder}"></mk-drive-folder></virtual><p if="{moreFolders}">Load more</p></div><div class="files" if="{files.length > 0}"><virtual each="{file in files}"><mk-drive-file file="{file}"></mk-drive-file></virtual><button class="more" if="{moreFiles}" onclick="{fetchMoreFiles}"> {fetchingMoreFiles ? \'Loading\' : \'Load more\'} </button></div><div class="empty" if="{files.length == 0 && folders.length == 0 && !fetching}"><p if="{folder == null}">Nothing</p><p if="{folder != null}">This folder is empty</p></div></div><div class="fetching" if="{fetching && file == null && files.length == 0 && folders.length == 0}"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div><input ref="file" type="file" multiple="multiple" onchange="{changeLocalFile}"><mk-drive-file-viewer if="{file != null}" file="{file}"></mk-drive-file-viewer>', 'mk-drive,[data-is="mk-drive"]{display:block;background:#fff;} mk-drive[data-is-naked] > nav,[data-is="mk-drive"][data-is-naked] > nav{top:48px} mk-drive > nav,[data-is="mk-drive"] > nav{display:block;position:sticky;position:-webkit-sticky;top:0;z-index:1;width:100%;padding:10px 12px;overflow:auto;white-space:nowrap;font-size:.9em;color:rgba(0,0,0,0.67);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);background-color:rgba(255,255,255,0.75);border-bottom:solid 1px rgba(0,0,0,0.13);} mk-drive > nav > p,[data-is="mk-drive"] > nav > p{display:inline;margin:0;padding:0;} mk-drive > nav > p:last-child,[data-is="mk-drive"] > nav > p:last-child{font-weight:bold} mk-drive > nav > p > i,[data-is="mk-drive"] > nav > p > i{margin-right:4px} mk-drive > nav > span,[data-is="mk-drive"] > nav > span{margin:0 8px;opacity:.5} mk-drive > .browser.fetching,[data-is="mk-drive"] > .browser.fetching{opacity:.5} mk-drive > .browser > .info,[data-is="mk-drive"] > .browser > .info{border-bottom:solid 1px #eee;} mk-drive > .browser > .info:empty,[data-is="mk-drive"] > .browser > .info:empty{display:none} mk-drive > .browser > .info > p,[data-is="mk-drive"] > .browser > .info > p{display:block;max-width:500px;margin:0 auto;padding:4px 16px;font-size:10px;color:#777} mk-drive > .browser > .folders > mk-drive-folder,[data-is="mk-drive"] > .browser > .folders > mk-drive-folder{border-bottom:solid 1px #eee} mk-drive > .browser > .files > mk-drive-file,[data-is="mk-drive"] > .browser > .files > mk-drive-file{border-bottom:solid 1px #eee} mk-drive > .browser > .files > .more,[data-is="mk-drive"] > .browser > .files > .more{display:block;width:100%;padding:16px;font-size:16px;color:#555} mk-drive > .browser > .empty,[data-is="mk-drive"] > .browser > .empty{padding:16px;text-align:center;color:#999;pointer-events:none;} mk-drive > .browser > .empty > p,[data-is="mk-drive"] > .browser > .empty > p{margin:0} mk-drive > .fetching .spinner,[data-is="mk-drive"] > .fetching .spinner{margin:100px auto;width:40px;height:40px;text-align:center;animation:sk-rotate 2s infinite linear} mk-drive > .fetching .dot1,[data-is="mk-drive"] > .fetching .dot1,mk-drive > .fetching .dot2,[data-is="mk-drive"] > .fetching .dot2{width:60%;height:60%;display:inline-block;position:absolute;top:0;background:rgba(0,0,0,0.2);border-radius:100%;animation:sk-bounce 2s infinite ease-in-out} mk-drive > .fetching .dot2,[data-is="mk-drive"] > .fetching .dot2{top:auto;bottom:0;animation-delay:-1s}@-moz-keyframes sk-rotate{ 100%{transform:rotate(360deg)}}@-webkit-keyframes sk-rotate{ 100%{transform:rotate(360deg)}}@-o-keyframes sk-rotate{ 100%{transform:rotate(360deg)}}@keyframes sk-rotate{ 100%{transform:rotate(360deg)}}@-moz-keyframes sk-bounce{ 0%,100%{transform:scale(0)} 50%{transform:scale(1)}}@-webkit-keyframes sk-bounce{ 0%,100%{transform:scale(0)} 50%{transform:scale(1)}}@-o-keyframes sk-bounce{ 0%,100%{transform:scale(0)} 50%{transform:scale(1)}}@keyframes sk-bounce{ 0%,100%{transform:scale(0)} 50%{transform:scale(1)}} mk-drive > [ref=\'file\'],[data-is="mk-drive"] > [ref=\'file\']{display:none}', '', function(opts) {
		this.mixin('i');
		this.mixin('api');
		this.mixin('stream');

		this.files = [];
		this.folders = [];
		this.hierarchyFolders = [];
		this.selectedFiles = [];

		this.folder = null;

		this.file = null;

		this.isFileSelectMode = this.opts.selectFile;
		this.multiple =this.opts.multiple;

		this.on('mount', () => {
			this.stream.on('drive_file_created', this.onStreamDriveFileCreated);
			this.stream.on('drive_file_updated', this.onStreamDriveFileUpdated);
			this.stream.on('drive_folder_created', this.onStreamDriveFolderCreated);
			this.stream.on('drive_folder_updated', this.onStreamDriveFolderUpdated);

			if (this.opts.folder) {
				this.cd(this.opts.folder, true);
			} else if (this.opts.file) {
				this.cf(this.opts.file, true);
			} else {
				this.fetch();
			}
		});

		this.on('unmount', () => {
			this.stream.off('drive_file_created', this.onStreamDriveFileCreated);
			this.stream.off('drive_file_updated', this.onStreamDriveFileUpdated);
			this.stream.off('drive_folder_created', this.onStreamDriveFolderCreated);
			this.stream.off('drive_folder_updated', this.onStreamDriveFolderUpdated);
		});

		this.onStreamDriveFileCreated = file => {
			this.addFile(file, true);
		};

		this.onStreamDriveFileUpdated = file => {
			const current = this.folder ? this.folder.id : null;
			if (current != file.folder_id) {
				this.removeFile(file);
			} else {
				this.addFile(file, true);
			}
		};

		this.onStreamDriveFolderCreated = folder => {
			this.addFolder(folder, true);
		};

		this.onStreamDriveFolderUpdated = folder => {
			const current = this.folder ? this.folder.id : null;
			if (current != folder.parent_id) {
				this.removeFolder(folder);
			} else {
				this.addFolder(folder, true);
			}
		};

		this.move = ev => {
			this.cd(ev.item.folder);
		};

		this.cd = (target, silent = false) => {
			this.file = null;

			if (target == null) {
				this.goRoot();
				return;
			} else if (typeof target == 'object') target = target.id;

			this.update({
				fetching: true
			});

			this.api('drive/folders/show', {
				folder_id: target
			}).then(folder => {
				this.folder = folder;
				this.hierarchyFolders = [];

				if (folder.parent) dive(folder.parent);

				this.update();
				this.trigger('open-folder', this.folder, silent);
				this.fetch();
			});
		};

		this.addFolder = (folder, unshift = false) => {
			const current = this.folder ? this.folder.id : null;

			if (current != folder.parent_id) return;

			if (this.folders.some(f => f.id == folder.id)) return;

			if (unshift) {
				this.folders.unshift(folder);
			} else {
				this.folders.push(folder);
			}

			this.update();
		};

		this.addFile = (file, unshift = false) => {
			const current = this.folder ? this.folder.id : null;

			if (current != file.folder_id) return;

			if (this.files.some(f => f.id == file.id)) {
				const exist = this.files.map(f => f.id).indexOf(file.id);
				this.files[exist] = file;
				this.update();
				return;
			}

			if (unshift) {
				this.files.unshift(file);
			} else {
				this.files.push(file);
			}

			this.update();
		};

		this.removeFolder = folder => {
			if (typeof folder == 'object') folder = folder.id;
			this.folders = this.folders.filter(f => f.id != folder);
			this.update();
		};

		this.removeFile = file => {
			if (typeof file == 'object') file = file.id;
			this.files = this.files.filter(f => f.id != file);
			this.update();
		};

		this.appendFile = file => this.addFile(file);
		this.appendFolder = file => this.addFolder(file);
		this.prependFile = file => this.addFile(file, true);
		this.prependFolder = file => this.addFolder(file, true);

		this.goRoot = () => {
			if (this.folder || this.file) {
				this.update({
					file: null,
					folder: null,
					hierarchyFolders: []
				});
				this.trigger('move-root');
				this.fetch();
			}
		};

		this.fetch = () => {
			this.update({
				folders: [],
				files: [],
				moreFolders: false,
				moreFiles: false,
				fetching: true
			});

			this.trigger('begin-fetch');

			let fetchedFolders = null;
			let fetchedFiles = null;

			const foldersMax = 20;
			const filesMax = 20;

			this.api('drive/folders', {
				folder_id: this.folder ? this.folder.id : null,
				limit: foldersMax + 1
			}).then(folders => {
				if (folders.length == foldersMax + 1) {
					this.moreFolders = true;
					folders.pop();
				}
				fetchedFolders = folders;
				complete();
			});

			this.api('drive/files', {
				folder_id: this.folder ? this.folder.id : null,
				limit: filesMax + 1
			}).then(files => {
				if (files.length == filesMax + 1) {
					this.moreFiles = true;
					files.pop();
				}
				fetchedFiles = files;
				complete();
			});

			let flag = false;
			const complete = () => {
				if (flag) {
					fetchedFolders.forEach(this.appendFolder);
					fetchedFiles.forEach(this.appendFile);
					this.update({
						fetching: false
					});

					this.trigger('fetched');
				} else {
					flag = true;

					this.trigger('fetch-mid');
				}
			};

			if (this.folder == null) {

				this.api('drive').then(info => {
					this.update({ info });
				});
			}
		};

		this.fetchMoreFiles = () => {
			this.update({
				fetching: true,
				fetchingMoreFiles: true
			});

			const max = 30;

			this.api('drive/files', {
				folder_id: this.folder ? this.folder.id : null,
				limit: max + 1,
				max_id: this.files[this.files.length - 1].id
			}).then(files => {
				if (files.length == max + 1) {
					this.moreFiles = true;
					files.pop();
				} else {
					this.moreFiles = false;
				}
				files.forEach(this.appendFile);
				this.update({
					fetching: false,
					fetchingMoreFiles: false
				});
			});
		};

		this.chooseFile = file => {
			if (this.isFileSelectMode) {
				if (this.selectedFiles.some(f => f.id == file.id)) {
					this.selectedFiles = this.selectedFiles.filter(f => f.id != file.id);
				} else {
					this.selectedFiles.push(file);
				}
				this.update();
				this.trigger('change-selection', this.selectedFiles);
			} else {
				this.cf(file);
			}
		};

		this.cf = (file, silent = false) => {
			if (typeof file == 'object') file = file.id;

			this.update({
				fetching: true
			});

			this.api('drive/files/show', {
				file_id: file
			}).then(file => {
				this.fetching = false;
				this.file = file;
				this.folder = null;
				this.hierarchyFolders = [];

				if (file.folder) dive(file.folder);

				this.update();
				this.trigger('open-file', this.file, silent);
			});
		};

		const dive = folder => {
			this.hierarchyFolders.unshift(folder);
			if (folder.parent) dive(folder.parent);
		};

		this.openContextMenu = () => {
			const fn = window.prompt('何をしますか？(数字を入力してください): <1 → ファイルをアップロード | 2 → ファイルをURLでアップロード | 3 → フォルダ作成 | 4 → このフォルダ名を変更 | 5 → このフォルダを移動 | 6 → このフォルダを削除>');
			if (fn == null || fn == '') return;
			switch (fn) {
				case '1':
					this.refs.file.click();
					break;
				case '2':
					this.urlUpload();
					break;
				case '3':
					this.createFolder();
					break;
				case '4':
					this.renameFolder();
					break;
				case '5':
					this.moveFolder();
					break;
				case '6':
					alert('ごめんなさい！フォルダの削除は未実装です...。');
					break;
			}
		};

		this.createFolder = () => {
			const name = window.prompt('フォルダー名');
			if (name == null || name == '') return;
			this.api('drive/folders/create', {
				name: name,
				parent_id: this.folder ? this.folder.id : undefined
			}).then(folder => {
				this.addFolder(folder, true);
				this.update();
			});
		};

		this.renameFolder = () => {
			if (this.folder == null) {
				alert('現在いる場所はルートで、フォルダではないため名前の変更はできません。名前を変更したいフォルダに移動してからやってください。');
				return;
			}
			const name = window.prompt('フォルダー名', this.folder.name);
			if (name == null || name == '') return;
			this.api('drive/folders/update', {
				name: name,
				folder_id: this.folder.id
			}).then(folder => {
				this.cd(folder);
			});
		};

		this.moveFolder = () => {
			if (this.folder == null) {
				alert('現在いる場所はルートで、フォルダではないため移動はできません。移動したいフォルダに移動してからやってください。');
				return;
			}
			const dialog = riot.mount(document.body.appendChild(document.createElement('mk-drive-folder-selector')))[0];
			dialog.one('selected', folder => {
				this.api('drive/folders/update', {
					parent_id: folder ? folder.id : null,
					folder_id: this.folder.id
				}).then(folder => {
					this.cd(folder);
				});
			});
		};

		this.urlUpload = () => {
			const url = window.prompt('アップロードしたいファイルのURL');
			if (url == null || url == '') return;
			this.api('drive/files/upload_from_url', {
				url: url,
				folder_id: this.folder ? this.folder.id : undefined
			});
			alert('アップロードをリクエストしました。アップロードが完了するまで時間がかかる場合があります。');
		};

		this.changeLocalFile = () => {
			this.refs.file.files.forEach(f => this.refs.uploader.upload(f, this.folder));
		};
});

    
  

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-drive-selector', '<div class="body"><header><h1>Choose a file<span class="count" if="{files.length > 0}">({files.length})</span></h1><button class="close" onclick="{cancel}"><i class="fa fa-times"></i></button><button class="ok" onclick="{ok}"><i class="fa fa-check"></i></button></header><mk-drive ref="browser" select-file="{true}" multiple="{opts.multiple}"></mk-drive></div>', 'mk-drive-selector,[data-is="mk-drive-selector"]{display:block;position:fixed;z-index:2048;top:0;left:0;width:100%;height:100%;padding:8px;background:rgba(0,0,0,0.2);} mk-drive-selector > .body,[data-is="mk-drive-selector"] > .body{width:100%;height:100%;background:#fff;} mk-drive-selector > .body > header,[data-is="mk-drive-selector"] > .body > header{border-bottom:solid 1px #eee;} mk-drive-selector > .body > header > h1,[data-is="mk-drive-selector"] > .body > header > h1{margin:0;padding:0;text-align:center;line-height:42px;font-size:1em;font-weight:normal;} mk-drive-selector > .body > header > h1 > .count,[data-is="mk-drive-selector"] > .body > header > h1 > .count{margin-left:4px;opacity:.5} mk-drive-selector > .body > header > .close,[data-is="mk-drive-selector"] > .body > header > .close{position:absolute;top:0;left:0;line-height:42px;width:42px} mk-drive-selector > .body > header > .ok,[data-is="mk-drive-selector"] > .body > header > .ok{position:absolute;top:0;right:0;line-height:42px;width:42px} mk-drive-selector > .body > mk-drive,[data-is="mk-drive-selector"] > .body > mk-drive{height:calc(100% - 42px);overflow:scroll;-webkit-overflow-scrolling:touch}', '', function(opts) {
		this.files = [];

		this.on('mount', () => {
			this.refs.browser.on('change-selection', files => {
				this.update({
					files: files
				});
			});
		});

		this.cancel = () => {
			this.trigger('canceled');
			this.unmount();
		};

		this.ok = () => {
			this.trigger('selected', this.files);
			this.unmount();
		};
});

    
  

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-drive-folder-selector', '<div class="body"><header><h1>Choose a folder</h1><button class="close" onclick="{cancel}"><i class="fa fa-times"></i></button><button class="ok" onclick="{ok}"><i class="fa fa-check"></i></button></header><mk-drive ref="browser" select-folder="{true}"></mk-drive></div>', 'mk-drive-folder-selector,[data-is="mk-drive-folder-selector"]{display:block;position:fixed;z-index:2048;top:0;left:0;width:100%;height:100%;padding:8px;background:rgba(0,0,0,0.2);} mk-drive-folder-selector > .body,[data-is="mk-drive-folder-selector"] > .body{width:100%;height:100%;background:#fff;} mk-drive-folder-selector > .body > header,[data-is="mk-drive-folder-selector"] > .body > header{border-bottom:solid 1px #eee;} mk-drive-folder-selector > .body > header > h1,[data-is="mk-drive-folder-selector"] > .body > header > h1{margin:0;padding:0;text-align:center;line-height:42px;font-size:1em;font-weight:normal} mk-drive-folder-selector > .body > header > .close,[data-is="mk-drive-folder-selector"] > .body > header > .close{position:absolute;top:0;left:0;line-height:42px;width:42px} mk-drive-folder-selector > .body > header > .ok,[data-is="mk-drive-folder-selector"] > .body > header > .ok{position:absolute;top:0;right:0;line-height:42px;width:42px} mk-drive-folder-selector > .body > mk-drive,[data-is="mk-drive-folder-selector"] > .body > mk-drive{height:calc(100% - 42px);overflow:scroll;-webkit-overflow-scrolling:touch}', '', function(opts) {
		this.cancel = () => {
			this.trigger('canceled');
			this.unmount();
		};

		this.ok = () => {
			this.trigger('selected', this.refs.browser.folder);
			this.unmount();
		};
});

    
  

/***/ }),
/* 207 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_scripts_bytes_to_size__ = __webpack_require__(54);

    var riot = __webpack_require__(0)
    
riot.tag2('mk-drive-file', '<div class="container"><div class="thumbnail" riot-style="{\'background-image: url(\' + file.url + \'?thumbnail&size=128)\'}"></div><div class="body"><p class="name">{file.name}</p><footer><p class="type"><mk-file-type-icon type="{file.type}"></mk-file-type-icon>{file.type}</p><p class="separator"></p><p class="data-size">{bytesToSize(file.datasize)}</p><p class="separator"></p><p class="created-at"><i class="fa fa-clock-o"></i><mk-time time="{file.created_at}"></mk-time></p></footer></div></div>', 'mk-drive-file,[data-is="mk-drive-file"]{display:block;} mk-drive-file,[data-is="mk-drive-file"],mk-drive-file *,[data-is="mk-drive-file"] *{user-select:none} mk-drive-file *,[data-is="mk-drive-file"] *{pointer-events:none} mk-drive-file > .container,[data-is="mk-drive-file"] > .container{max-width:500px;margin:0 auto;padding:16px;} mk-drive-file > .container:after,[data-is="mk-drive-file"] > .container:after{content:"";display:block;clear:both} mk-drive-file > .container > .thumbnail,[data-is="mk-drive-file"] > .container > .thumbnail{display:block;float:left;width:64px;height:64px;background-size:cover;background-position:center center} mk-drive-file > .container > .body,[data-is="mk-drive-file"] > .container > .body{display:block;float:left;width:calc(100% - 74px);margin-left:10px;} mk-drive-file > .container > .body > .name,[data-is="mk-drive-file"] > .container > .body > .name{display:block;margin:0;padding:0;font-size:.9em;font-weight:bold;color:#555;text-overflow:ellipsis;overflow-wrap:break-word} mk-drive-file > .container > .body > .tags,[data-is="mk-drive-file"] > .container > .body > .tags{display:block;margin:4px 0 0 0;padding:0;list-style:none;font-size:.5em;} mk-drive-file > .container > .body > .tags > .tag,[data-is="mk-drive-file"] > .container > .body > .tags > .tag{display:inline-block;margin:0 5px 0 0;padding:1px 5px;border-radius:2px} mk-drive-file > .container > .body > footer,[data-is="mk-drive-file"] > .container > .body > footer{display:block;margin:4px 0 0 0;font-size:.7em;} mk-drive-file > .container > .body > footer > .separator,[data-is="mk-drive-file"] > .container > .body > footer > .separator{display:inline;margin:0;padding:0 4px;color:#cdcdcd} mk-drive-file > .container > .body > footer > .type,[data-is="mk-drive-file"] > .container > .body > footer > .type{display:inline;margin:0;padding:0;color:#9d9d9d;} mk-drive-file > .container > .body > footer > .type > mk-file-type-icon,[data-is="mk-drive-file"] > .container > .body > footer > .type > mk-file-type-icon{margin-right:4px} mk-drive-file > .container > .body > footer > .data-size,[data-is="mk-drive-file"] > .container > .body > footer > .data-size{display:inline;margin:0;padding:0;color:#9d9d9d} mk-drive-file > .container > .body > footer > .created-at,[data-is="mk-drive-file"] > .container > .body > footer > .created-at{display:inline;margin:0;padding:0;color:#bdbdbd;} mk-drive-file > .container > .body > footer > .created-at > i,[data-is="mk-drive-file"] > .container > .body > footer > .created-at > i{margin-right:2px} mk-drive-file[data-is-selected],[data-is="mk-drive-file"][data-is-selected]{background:#87bb35;} mk-drive-file[data-is-selected],[data-is="mk-drive-file"][data-is-selected],mk-drive-file[data-is-selected] *,[data-is="mk-drive-file"][data-is-selected] *{color:#fff !important}', 'onclick="{onclick}" data-is-selected="{isSelected}"', function(opts) {
		this.bytesToSize = __WEBPACK_IMPORTED_MODULE_0__common_scripts_bytes_to_size__["a" /* default */];

		this.browser = this.parent;
		this.file = this.opts.file;
		this.isSelected = this.browser.selectedFiles.some(f => f.id == this.file.id);

		this.browser.on('change-selection', selections => {
			this.isSelected = selections.some(f => f.id == this.file.id);
		});

		this.onclick = () => {
			this.browser.chooseFile(this.file);
		};
});

    
  

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-drive-folder', '<div class="container"><p class="name"><i class="fa fa-folder"></i>{folder.name}</p><i class="fa fa-angle-right"></i></div>', 'mk-drive-folder,[data-is="mk-drive-folder"]{display:block;color:#777;} mk-drive-folder,[data-is="mk-drive-folder"],mk-drive-folder *,[data-is="mk-drive-folder"] *{user-select:none} mk-drive-folder *,[data-is="mk-drive-folder"] *{pointer-events:none} mk-drive-folder > .container,[data-is="mk-drive-folder"] > .container{max-width:500px;margin:0 auto;padding:16px;} mk-drive-folder > .container > .name,[data-is="mk-drive-folder"] > .container > .name{display:block;margin:0;padding:0;} mk-drive-folder > .container > .name > i,[data-is="mk-drive-folder"] > .container > .name > i{margin-right:6px} mk-drive-folder > .container > i,[data-is="mk-drive-folder"] > .container > i{position:absolute;top:0;bottom:0;right:8px;margin:auto 0 auto 0;width:1em;height:1em}', 'onclick="{onclick}"', function(opts) {
		this.browser = this.parent;
		this.folder = this.opts.folder;

		this.onclick = () => {
			this.browser.cd(this.folder);
		};
});

    
  

/***/ }),
/* 209 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/web/app/common/scripts/gcd.js
const gcd = (a, b) => !b ? a : gcd(b, a % b);
/* harmony default export */ var gcd_defaultExport = (gcd);

// CONCATENATED MODULE: ./src/web/app/mobile/tags/drive/file-viewer.tag
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_scripts_bytes_to_size__ = __webpack_require__(54);

    var riot = __webpack_require__(0)
    

riot.tag2('mk-drive-file-viewer', '<div class="preview"><img if="{kind == \'image\'}" riot-src="{file.url}" alt="{file.name}" title="{file.name}"><i if="{kind != \'image\'}" class="fa fa-file"></i><footer if="{kind == \'image\'}"><span class="size"><span class="width">{file.properties.width}</span><span class="time">×</span><span class="height">{file.properties.height}</span><span class="px">px</span></span><span class="separator"></span><span class="aspect-ratio"><span class="width">{file.properties.width / gcd(file.properties.width, file.properties.height)}</span><span class="colon">:</span><span class="height">{file.properties.height / gcd(file.properties.width, file.properties.height)}</span></span></footer></div><div class="info"><div><span class="type"><mk-file-type-icon type="{file.type}"></mk-file-type-icon>{file.type}</span><span class="separator"></span><span class="data-size">{bytesToSize(file.datasize)}</span><span class="separator"></span><span class="created-at" onclick="{showCreatedAt}"><i class="fa fa-clock-o"></i><mk-time time="{file.created_at}"></mk-time></span></div></div><div class="menu"><div><a href="{file.url + \'?download\'}" download="{file.name}"><i class="fa fa-download"></i>Download </a><button onclick="{rename}"><i class="fa fa-pencil"></i>Rename </button><button onclick="{move}"><i class="fa fa-folder-open"></i>Move </button></div></div><div class="hash"><div><p><i class="fa fa-hashtag"></i>Hash </p><code>{file.hash}</code></div></div>', 'mk-drive-file-viewer,[data-is="mk-drive-file-viewer"]{display:block;} mk-drive-file-viewer > .preview,[data-is="mk-drive-file-viewer"] > .preview{padding:8px;background:#f0f0f0;} mk-drive-file-viewer > .preview > img,[data-is="mk-drive-file-viewer"] > .preview > img{display:block;max-width:100%;max-height:300px;margin:0 auto;box-shadow:1px 1px 4px rgba(0,0,0,0.2)} mk-drive-file-viewer > .preview > footer,[data-is="mk-drive-file-viewer"] > .preview > footer{padding:8px 8px 0 8px;font-size:.8em;color:#888;text-align:center;} mk-drive-file-viewer > .preview > footer > .separator,[data-is="mk-drive-file-viewer"] > .preview > footer > .separator{display:inline;padding:0 4px} mk-drive-file-viewer > .preview > footer > .size,[data-is="mk-drive-file-viewer"] > .preview > footer > .size{display:inline;} mk-drive-file-viewer > .preview > footer > .size .time,[data-is="mk-drive-file-viewer"] > .preview > footer > .size .time{margin:0 2px} mk-drive-file-viewer > .preview > footer > .size .px,[data-is="mk-drive-file-viewer"] > .preview > footer > .size .px{margin-left:4px} mk-drive-file-viewer > .preview > footer > .aspect-ratio,[data-is="mk-drive-file-viewer"] > .preview > footer > .aspect-ratio{display:inline;opacity:.7;} mk-drive-file-viewer > .preview > footer > .aspect-ratio:before,[data-is="mk-drive-file-viewer"] > .preview > footer > .aspect-ratio:before{content:"("} mk-drive-file-viewer > .preview > footer > .aspect-ratio:after,[data-is="mk-drive-file-viewer"] > .preview > footer > .aspect-ratio:after{content:")"} mk-drive-file-viewer > .info,[data-is="mk-drive-file-viewer"] > .info{padding:14px;font-size:.8em;border-top:solid 1px #dfdfdf;} mk-drive-file-viewer > .info > div,[data-is="mk-drive-file-viewer"] > .info > div{max-width:500px;margin:0 auto;} mk-drive-file-viewer > .info > div > .separator,[data-is="mk-drive-file-viewer"] > .info > div > .separator{padding:0 4px;color:#cdcdcd} mk-drive-file-viewer > .info > div > .type,[data-is="mk-drive-file-viewer"] > .info > div > .type,mk-drive-file-viewer > .info > div > .data-size,[data-is="mk-drive-file-viewer"] > .info > div > .data-size{color:#9d9d9d;} mk-drive-file-viewer > .info > div > .type > mk-file-type-icon,[data-is="mk-drive-file-viewer"] > .info > div > .type > mk-file-type-icon,mk-drive-file-viewer > .info > div > .data-size > mk-file-type-icon,[data-is="mk-drive-file-viewer"] > .info > div > .data-size > mk-file-type-icon{margin-right:4px} mk-drive-file-viewer > .info > div > .created-at,[data-is="mk-drive-file-viewer"] > .info > div > .created-at{color:#bdbdbd;} mk-drive-file-viewer > .info > div > .created-at > i,[data-is="mk-drive-file-viewer"] > .info > div > .created-at > i{margin-right:2px} mk-drive-file-viewer > .menu,[data-is="mk-drive-file-viewer"] > .menu{padding:14px;border-top:solid 1px #dfdfdf;} mk-drive-file-viewer > .menu > div,[data-is="mk-drive-file-viewer"] > .menu > div{max-width:500px;margin:0 auto;} mk-drive-file-viewer > .menu > div > *,[data-is="mk-drive-file-viewer"] > .menu > div > *{display:block;width:100%;padding:10px 16px;margin:0 0 12px 0;color:#333;font-size:.9em;text-align:center;text-decoration:none;text-shadow:0 1px 0 rgba(255,255,255,0.9);background-image:linear-gradient(#fafafa,#eaeaea);border:1px solid #ddd;border-bottom-color:#cecece;border-radius:3px;} mk-drive-file-viewer > .menu > div > *:last-child,[data-is="mk-drive-file-viewer"] > .menu > div > *:last-child{margin-bottom:0} mk-drive-file-viewer > .menu > div > *:active,[data-is="mk-drive-file-viewer"] > .menu > div > *:active{background-color:#767676;background-image:none;border-color:#444;box-shadow:0 1px 3px rgba(0,0,0,0.075),inset 0 0 5px rgba(0,0,0,0.2)} mk-drive-file-viewer > .menu > div > * > i,[data-is="mk-drive-file-viewer"] > .menu > div > * > i{margin-right:4px} mk-drive-file-viewer > .hash,[data-is="mk-drive-file-viewer"] > .hash{padding:14px;border-top:solid 1px #dfdfdf;} mk-drive-file-viewer > .hash > div,[data-is="mk-drive-file-viewer"] > .hash > div{max-width:500px;margin:0 auto;} mk-drive-file-viewer > .hash > div > p,[data-is="mk-drive-file-viewer"] > .hash > div > p{display:block;margin:0;padding:0;color:#555;font-size:.9em;} mk-drive-file-viewer > .hash > div > p > i,[data-is="mk-drive-file-viewer"] > .hash > div > p > i{margin-right:4px} mk-drive-file-viewer > .hash > div > code,[data-is="mk-drive-file-viewer"] > .hash > div > code{display:block;width:100%;margin:6px 0 0 0;padding:8px;white-space:nowrap;overflow:auto;font-size:.8em;border:solid 1px #dfdfdf;border-radius:2px;background:#f5f5f5}', '', function(opts) {

		this.bytesToSize = __WEBPACK_IMPORTED_MODULE_0__common_scripts_bytes_to_size__["a" /* default */];
		this.gcd = gcd_defaultExport;

		this.mixin('api');

		this.file = this.opts.file;
		this.kind = this.file.type.split('/')[0];

		this.rename = () => {
			const name = window.prompt('名前を変更', this.file.name);
			if (name == null || name == '' || name == this.file.name) return;
			this.api('drive/files/update', {
				file_id: this.file.id,
				name: name
			}).then(() => {
				this.parent.cf(this.file, true);
			});
		};

		this.move = () => {
			const dialog = riot.mount(document.body.appendChild(document.createElement('mk-drive-folder-selector')))[0];
			dialog.one('selected', folder => {
				this.api('drive/files/update', {
					file_id: this.file.id,
					folder_id: folder == null ? null : folder.id
				}).then(() => {
					this.parent.cf(this.file, true);
				});
			});
		};

		this.showCreatedAt = () => {
			alert(new Date(this.file.created_at).toLocaleString());
		};
});

    
  

/***/ }),
/* 210 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_scripts_get_kao__ = __webpack_require__(63);

    var riot = __webpack_require__(0)
    
riot.tag2('mk-post-form', '<header><div><button class="cancel" onclick="{cancel}"><i class="fa fa-times"></i></button><div><span if="{refs.text}" class="text-count {over: refs.text.value.length > 1000}">{1000 - refs.text.value.length}</span><button class="submit" onclick="{post}">Post</button></div></div></header><div class="form"><mk-post-preview if="{opts.reply}" post="{opts.reply}"></mk-post-preview><textarea ref="text" disabled="{wait}" oninput="{update}" onkeydown="{onkeydown}" onpaste="{onpaste}" placeholder="{opts.reply ? \'Reply to this post...\' : \'What\\\'s happening?\'}"></textarea><div class="attaches" if="{files.length != 0}"><ul class="files" ref="attaches"><li class="file" each="{files}"><div class="img" riot-style="background-image: url({url + \'?thumbnail&size=64\'})" title="{name}"></div></li><li class="add" if="{files.length < 4}" title="Attach media from your device" onclick="{selectFile}"><i class="fa fa-plus"></i></li></ul></div><mk-poll-editor if="{poll}" ref="poll" ondestroy="{onPollDestroyed}"></mk-poll-editor><mk-uploader ref="uploader"></mk-uploader><button ref="upload" onclick="{selectFile}"><i class="fa fa-upload"></i></button><button ref="drive" onclick="{selectFileFromDrive}"><i class="fa fa-cloud"></i></button><button class="kao" onclick="{kao}"><i class="fa fa-smile-o"></i></button><button class="poll" onclick="{addPoll}"><i class="fa fa-pie-chart"></i></button><input ref="file" type="file" accept="image/*" multiple="multiple" onchange="{changeFile}"></div>', 'mk-post-form,[data-is="mk-post-form"]{display:block;padding-top:50px;} mk-post-form > header,[data-is="mk-post-form"] > header{position:fixed;z-index:1000;top:0;left:0;width:100%;height:50px;background:#fff;} mk-post-form > header > div,[data-is="mk-post-form"] > header > div{max-width:500px;margin:0 auto;} mk-post-form > header > div > .cancel,[data-is="mk-post-form"] > header > div > .cancel{width:50px;line-height:50px;font-size:24px;color:#555} mk-post-form > header > div > div,[data-is="mk-post-form"] > header > div > div{position:absolute;top:0;right:0;} mk-post-form > header > div > div > .text-count,[data-is="mk-post-form"] > header > div > div > .text-count{line-height:50px;color:#657786} mk-post-form > header > div > div > .submit,[data-is="mk-post-form"] > header > div > div > .submit{margin:8px;padding:0 16px;line-height:34px;color:#fff;background:#87bb35;border-radius:4px;} mk-post-form > header > div > div > .submit:disabled,[data-is="mk-post-form"] > header > div > div > .submit:disabled{opacity:.7} mk-post-form > .form,[data-is="mk-post-form"] > .form{max-width:500px;margin:0 auto;} mk-post-form > .form > mk-post-preview,[data-is="mk-post-form"] > .form > mk-post-preview{padding:16px} mk-post-form > .form > .attaches > .files,[data-is="mk-post-form"] > .form > .attaches > .files{display:block;margin:0;padding:4px;list-style:none;} mk-post-form > .form > .attaches > .files:after,[data-is="mk-post-form"] > .form > .attaches > .files:after{content:"";display:block;clear:both} mk-post-form > .form > .attaches > .files > .file,[data-is="mk-post-form"] > .form > .attaches > .files > .file{display:block;float:left;margin:4px;padding:0;cursor:move;} mk-post-form > .form > .attaches > .files > .file:hover > .remove,[data-is="mk-post-form"] > .form > .attaches > .files > .file:hover > .remove{display:block} mk-post-form > .form > .attaches > .files > .file > .img,[data-is="mk-post-form"] > .form > .attaches > .files > .file > .img{width:64px;height:64px;background-size:cover;background-position:center center} mk-post-form > .form > .attaches > .files > .file > .remove,[data-is="mk-post-form"] > .form > .attaches > .files > .file > .remove{display:none;position:absolute;top:-6px;right:-6px;width:16px;height:16px;cursor:pointer} mk-post-form > .form > .attaches > .files > .add,[data-is="mk-post-form"] > .form > .attaches > .files > .add{display:block;float:left;margin:4px;padding:0;border:dashed 2px rgba(135,187,53,0.2);cursor:pointer;} mk-post-form > .form > .attaches > .files > .add:hover,[data-is="mk-post-form"] > .form > .attaches > .files > .add:hover{border-color:rgba(135,187,53,0.3);} mk-post-form > .form > .attaches > .files > .add:hover > i,[data-is="mk-post-form"] > .form > .attaches > .files > .add:hover > i{color:rgba(135,187,53,0.4)} mk-post-form > .form > .attaches > .files > .add > i,[data-is="mk-post-form"] > .form > .attaches > .files > .add > i{display:block;width:60px;height:60px;line-height:60px;text-align:center;font-size:1.2em;color:rgba(135,187,53,0.2)} mk-post-form > .form > mk-uploader,[data-is="mk-post-form"] > .form > mk-uploader{margin:8px 0 0 0;padding:8px} mk-post-form > .form > [ref=\'file\'],[data-is="mk-post-form"] > .form > [ref=\'file\']{display:none} mk-post-form > .form > [ref=\'text\'],[data-is="mk-post-form"] > .form > [ref=\'text\']{display:block;padding:12px;margin:0;width:100%;max-width:100%;min-width:100%;min-height:80px;font-size:16px;color:#333;border:none;border-bottom:solid 1px #ddd;border-radius:0;} mk-post-form > .form > [ref=\'text\']:disabled,[data-is="mk-post-form"] > .form > [ref=\'text\']:disabled{opacity:.5} mk-post-form > .form > [ref=\'upload\'],[data-is="mk-post-form"] > .form > [ref=\'upload\'],mk-post-form > .form > [ref=\'drive\'],[data-is="mk-post-form"] > .form > [ref=\'drive\'],mk-post-form > .form .kao,[data-is="mk-post-form"] > .form .kao,mk-post-form > .form .poll,[data-is="mk-post-form"] > .form .poll{display:inline-block;padding:0;margin:0;width:48px;height:48px;font-size:20px;color:#657786;background:transparent;outline:none;border:none;border-radius:0;box-shadow:none}', '', function(opts) {

		this.mixin('api');

		this.wait = false;
		this.uploadings = [];
		this.files = [];
		this.poll = false;

		this.on('mount', () => {
			this.refs.uploader.on('uploaded', file => {
				this.addFile(file);
			});

			this.refs.uploader.on('change-uploads', uploads => {
				this.trigger('change-uploading-files', uploads);
			});

			this.refs.text.focus();
		});

		this.onkeydown = e => {
			if ((e.which == 10 || e.which == 13) && (e.ctrlKey || e.metaKey)) this.post();
		};

		this.onpaste = e => {
			e.clipboardData.items.forEach(item => {
				if (item.kind == 'file') {
					this.upload(item.getAsFile());
				}
			});
		};

		this.selectFile = () => {
			this.refs.file.click();
		};

		this.selectFileFromDrive = () => {
			const i = riot.mount(document.body.appendChild(document.createElement('mk-drive-selector')), {
				multiple: true
			})[0];
			i.one('selected', files => {
				files.forEach(this.addFile);
			});
		};

		this.changeFile = () => {
			this.refs.file.files.forEach(this.upload);
		};

		this.upload = file => {
			this.refs.uploader.upload(file);
		};

		this.addFile = file => {
			file._remove = () => {
				this.files = this.files.filter(x => x.id != file.id);
				this.trigger('change-files', this.files);
				this.update();
			};

			this.files.push(file);
			this.trigger('change-files', this.files);
			this.update();
		};

		this.addPoll = () => {
			this.poll = true;
		};

		this.onPollDestroyed = () => {
			this.update({
				poll: false
			});
		};

		this.post = () => {
			this.wait = true;

			const files = this.files && this.files.length > 0
				? this.files.map(f => f.id)
				: undefined;

			this.api('posts/create', {
				text: this.refs.text.value == '' ? undefined : this.refs.text.value,
				media_ids: files,
				reply_to_id: opts.reply ? opts.reply.id : undefined,
				poll: this.poll ? this.refs.poll.get() : undefined
			}).then(data => {
				this.trigger('post');
				this.unmount();
			}).catch(err => {
				this.update({
					wait: false
				});
			});
		};

		this.cancel = () => {
			this.trigger('cancel');
			this.unmount();
		};

		this.kao = () => {
			this.refs.text.value += Object(__WEBPACK_IMPORTED_MODULE_0__common_scripts_get_kao__["a" /* default */])();
		};
});

    
  

/***/ }),
/* 211 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_scripts_get_post_summary__ = __webpack_require__(8);

    var riot = __webpack_require__(0)
    
riot.tag2('mk-notification', '<mk-time time="{notification.created_at}"></mk-time><virtual if="{notification.type == \'reaction\'}"><a class="avatar-anchor" href="{\'/\' + notification.user.username}"><img class="avatar" riot-src="{notification.user.avatar_url + \'?thumbnail&size=64\'}" alt="avatar"></a><div class="text"><p><mk-reaction-icon reaction="{notification.reaction}"></mk-reaction-icon><a href="{\'/\' + notification.user.username}">{notification.user.name}</a></p><a class="post-ref" href="{\'/\' + notification.post.user.username + \'/\' + notification.post.id}">{getPostSummary(notification.post)}</a></div></virtual><virtual if="{notification.type == \'repost\'}"><a class="avatar-anchor" href="{\'/\' + notification.post.user.username}"><img class="avatar" riot-src="{notification.post.user.avatar_url + \'?thumbnail&size=64\'}" alt="avatar"></a><div class="text"><p><i class="fa fa-retweet"></i><a href="{\'/\' + notification.post.user.username}">{notification.post.user.name}</a></p><a class="post-ref" href="{\'/\' + notification.post.user.username + \'/\' + notification.post.id}">{getPostSummary(notification.post.repost)}</a></div></virtual><virtual if="{notification.type == \'quote\'}"><a class="avatar-anchor" href="{\'/\' + notification.post.user.username}"><img class="avatar" riot-src="{notification.post.user.avatar_url + \'?thumbnail&size=64\'}" alt="avatar"></a><div class="text"><p><i class="fa fa-quote-left"></i><a href="{\'/\' + notification.post.user.username}">{notification.post.user.name}</a></p><a class="post-preview" href="{\'/\' + notification.post.user.username + \'/\' + notification.post.id}">{getPostSummary(notification.post)}</a></div></virtual><virtual if="{notification.type == \'follow\'}"><a class="avatar-anchor" href="{\'/\' + notification.user.username}"><img class="avatar" riot-src="{notification.user.avatar_url + \'?thumbnail&size=64\'}" alt="avatar"></a><div class="text"><p><i class="fa fa-user-plus"></i><a href="{\'/\' + notification.user.username}">{notification.user.name}</a></p></div></virtual><virtual if="{notification.type == \'reply\'}"><a class="avatar-anchor" href="{\'/\' + notification.post.user.username}"><img class="avatar" riot-src="{notification.post.user.avatar_url + \'?thumbnail&size=64\'}" alt="avatar"></a><div class="text"><p><i class="fa fa-reply"></i><a href="{\'/\' + notification.post.user.username}">{notification.post.user.name}</a></p><a class="post-preview" href="{\'/\' + notification.post.user.username + \'/\' + notification.post.id}">{getPostSummary(notification.post)}</a></div></virtual><virtual if="{notification.type == \'mention\'}"><a class="avatar-anchor" href="{\'/\' + notification.post.user.username}"><img class="avatar" riot-src="{notification.post.user.avatar_url + \'?thumbnail&size=64\'}" alt="avatar"></a><div class="text"><p><i class="fa fa-at"></i><a href="{\'/\' + notification.post.user.username}">{notification.post.user.name}</a></p><a class="post-preview" href="{\'/\' + notification.post.user.username + \'/\' + notification.post.id}">{getPostSummary(notification.post)}</a></div></virtual><virtual if="{notification.type == \'poll_vote\'}"><a class="avatar-anchor" href="{\'/\' + notification.user.username}"><img class="avatar" riot-src="{notification.user.avatar_url + \'?thumbnail&size=64\'}" alt="avatar"></a><div class="text"><p><i class="fa fa-pie-chart"></i><a href="{\'/\' + notification.user.username}">{notification.user.name}</a></p><a class="post-ref" href="{\'/\' + notification.post.user.username + \'/\' + notification.post.id}">{getPostSummary(notification.post)}</a></div></virtual>', 'mk-notification,[data-is="mk-notification"]{display:block;margin:0;padding:16px;overflow-wrap:break-word;} mk-notification > mk-time,[data-is="mk-notification"] > mk-time{display:inline;position:absolute;top:16px;right:12px;vertical-align:top;color:rgba(0,0,0,0.6);font-size:12px} mk-notification:after,[data-is="mk-notification"]:after{content:"";display:block;clear:both} mk-notification .avatar-anchor,[data-is="mk-notification"] .avatar-anchor{display:block;float:left;} mk-notification .avatar-anchor img,[data-is="mk-notification"] .avatar-anchor img{min-width:36px;min-height:36px;max-width:36px;max-height:36px;border-radius:6px} mk-notification .text,[data-is="mk-notification"] .text{float:right;width:calc(100% - 36px);padding-left:8px;} mk-notification .text p,[data-is="mk-notification"] .text p{margin:0;} mk-notification .text p i,[data-is="mk-notification"] .text p i,mk-notification .text p mk-reaction-icon,[data-is="mk-notification"] .text p mk-reaction-icon{margin-right:4px} mk-notification .post-preview,[data-is="mk-notification"] .post-preview{color:rgba(0,0,0,0.7)} mk-notification .post-ref,[data-is="mk-notification"] .post-ref{color:rgba(0,0,0,0.7);} mk-notification .post-ref:before,[data-is="mk-notification"] .post-ref:before,mk-notification .post-ref:after,[data-is="mk-notification"] .post-ref:after{font-family:FontAwesome;font-size:1em;font-weight:normal;font-style:normal;display:inline-block;margin-right:3px} mk-notification .post-ref:before,[data-is="mk-notification"] .post-ref:before{content:"\\f10d"} mk-notification .post-ref:after,[data-is="mk-notification"] .post-ref:after{content:"\\f10e"} mk-notification.repost .text p i,[data-is="mk-notification"].repost .text p i,mk-notification.quote .text p i,[data-is="mk-notification"].quote .text p i{color:#77b255} mk-notification.follow .text p i,[data-is="mk-notification"].follow .text p i{color:#53c7ce} mk-notification.reply .text p i,[data-is="mk-notification"].reply .text p i,mk-notification.mention .text p i,[data-is="mk-notification"].mention .text p i{color:#555} mk-notification.reply .post-preview,[data-is="mk-notification"].reply .post-preview,mk-notification.mention .post-preview,[data-is="mk-notification"].mention .post-preview{color:rgba(0,0,0,0.7)}', 'class="{notification.type}"', function(opts) {
		this.getPostSummary = __WEBPACK_IMPORTED_MODULE_0__common_scripts_get_post_summary__["a" /* default */];
		this.notification = this.opts.notification;
});

    
  

/***/ }),
/* 212 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_scripts_get_post_summary__ = __webpack_require__(8);

    var riot = __webpack_require__(0)
    
riot.tag2('mk-notifications', '<div class="notifications" if="{notifications.length != 0}"><virtual each="{notification, i in notifications}"><div><mk-notification notification="{notification}"></mk-notification></div><p class="date" if="{i != notifications.length - 1 && notification._date != notifications[i + 1]._date}"><span><i class="fa fa-angle-up"></i>{notification._datetext}</span><span><i class="fa fa-angle-down"></i>{notifications[i + 1]._datetext}</span></p></virtual></div><button class="more" if="{moreNotifications}" onclick="{fetchMoreNotifications}" disabled="{fetchingMoreNotifications}"><i class="fa fa-spinner fa-pulse fa-fw" if="{fetchingMoreNotifications}"></i>{fetchingMoreNotifications ? \'Loading\' : \'More\'} </button><p class="empty" if="{notifications.length == 0 && !loading}">No notifications</p><p class="loading" if="{loading}"><i class="fa fa-spinner fa-pulse fa-fw"></i>Loading<mk-ellipsis></mk-ellipsis></p>', 'mk-notifications,[data-is="mk-notifications"]{display:block;background:#fff;} mk-notifications > .notifications > div,[data-is="mk-notifications"] > .notifications > div{border-bottom:solid 1px rgba(0,0,0,0.05);} mk-notifications > .notifications > div:last-child,[data-is="mk-notifications"] > .notifications > div:last-child{border-bottom:none} mk-notifications > .notifications > div > mk-notification,[data-is="mk-notifications"] > .notifications > div > mk-notification{margin:0 auto;max-width:500px} mk-notifications > .notifications > .date,[data-is="mk-notifications"] > .notifications > .date{display:block;margin:0;line-height:32px;text-align:center;font-size:.8em;color:#aaa;background:#fdfdfd;border-bottom:solid 1px rgba(0,0,0,0.05);} mk-notifications > .notifications > .date span,[data-is="mk-notifications"] > .notifications > .date span{margin:0 16px} mk-notifications > .notifications > .date i,[data-is="mk-notifications"] > .notifications > .date i{margin-right:8px} mk-notifications > .more,[data-is="mk-notifications"] > .more{display:block;width:100%;padding:16px;color:#555;border-top:solid 1px rgba(0,0,0,0.05);} mk-notifications > .more > i,[data-is="mk-notifications"] > .more > i{margin-right:4px} mk-notifications > .empty,[data-is="mk-notifications"] > .empty{margin:0;padding:16px;text-align:center;color:#aaa} mk-notifications > .loading,[data-is="mk-notifications"] > .loading{margin:0;padding:16px;text-align:center;color:#aaa;} mk-notifications > .loading > i,[data-is="mk-notifications"] > .loading > i{margin-right:4px}', '', function(opts) {
		this.getPostSummary = __WEBPACK_IMPORTED_MODULE_0__common_scripts_get_post_summary__["a" /* default */];

		this.mixin('api');
		this.mixin('stream');

		this.notifications = [];
		this.loading = true;

		this.on('mount', () => {
			const max = 10;

			this.api('i/notifications', {
				limit: max + 1
			}).then(notifications => {
				if (notifications.length == max + 1) {
					this.moreNotifications = true;
					notifications.pop();
				}

				this.update({
					loading: false,
					notifications: notifications
				});

				this.trigger('fetched');
			});

			this.stream.on('notification', this.onNotification);
		});

		this.on('unmount', () => {
			this.stream.off('notification', this.onNotification);
		});

		this.on('update', () => {
			this.notifications.forEach(notification => {
				const date = new Date(notification.created_at).getDate();
				const month = new Date(notification.created_at).getMonth() + 1;
				notification._date = date;
				notification._datetext = `${month}月 ${date}日`;
			});
		});

		this.onNotification = notification => {
			this.notifications.unshift(notification);
			this.update();
		};

		this.fetchMoreNotifications = () => {
			this.update({
				fetchingMoreNotifications: true
			});

			const max = 30;

			this.api('i/notifications', {
				limit: max + 1,
				max_id: this.notifications[this.notifications.length - 1].id
			}).then(notifications => {
				if (notifications.length == max + 1) {
					this.moreNotifications = true;
					notifications.pop();
				} else {
					this.moreNotifications = false;
				}
				this.update({
					notifications: this.notifications.concat(notifications),
					fetchingMoreNotifications: false
				});
			});
		};
});

    
  

/***/ }),
/* 213 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_animejs__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_animejs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_animejs__);

    var riot = __webpack_require__(0)
    
riot.tag2('mk-notify', '<mk-notification-preview notification="{opts.notification}"></mk-notification-preview>', 'mk-notify,[data-is="mk-notify"]{display:block;position:fixed;z-index:1024;bottom:-64px;left:0;width:100%;height:64px;pointer-events:none;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);background-color:rgba(0,0,0,0.5)}', '', function(opts) {

		this.on('mount', () => {
			__WEBPACK_IMPORTED_MODULE_0_animejs___default()({
				targets: this.root,
				bottom: '0px',
				duration: 500,
				easing: 'easeOutQuad'
			});

			setTimeout(() => {
				__WEBPACK_IMPORTED_MODULE_0_animejs___default()({
					targets: this.root,
					bottom: '-64px',
					duration: 500,
					easing: 'easeOutQuad',
					complete: () => this.unmount()
				});
			}, 6000);
		});
});

    
  

/***/ }),
/* 214 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_scripts_get_post_summary__ = __webpack_require__(8);

    var riot = __webpack_require__(0)
    
riot.tag2('mk-notification-preview', '<virtual if="{notification.type == \'reaction\'}"><img class="avatar" riot-src="{notification.user.avatar_url + \'?thumbnail&size=64\'}" alt="avatar"><div class="text"><p><mk-reaction-icon reaction="{notification.reaction}"></mk-reaction-icon>{notification.user.name}</p><p class="post-ref">{getPostSummary(notification.post)}</p></div></virtual><virtual if="{notification.type == \'repost\'}"><img class="avatar" riot-src="{notification.post.user.avatar_url + \'?thumbnail&size=64\'}" alt="avatar"><div class="text"><p><i class="fa fa-retweet"></i>{notification.post.user.name}</p><p class="post-ref">{getPostSummary(notification.post.repost)}</p></div></virtual><virtual if="{notification.type == \'quote\'}"><img class="avatar" riot-src="{notification.post.user.avatar_url + \'?thumbnail&size=64\'}" alt="avatar"><div class="text"><p><i class="fa fa-quote-left"></i>{notification.post.user.name}</p><p class="post-preview">{getPostSummary(notification.post)}</p></div></virtual><virtual if="{notification.type == \'follow\'}"><img class="avatar" riot-src="{notification.user.avatar_url + \'?thumbnail&size=64\'}" alt="avatar"><div class="text"><p><i class="fa fa-user-plus"></i>{notification.user.name}</p></div></virtual><virtual if="{notification.type == \'reply\'}"><img class="avatar" riot-src="{notification.post.user.avatar_url + \'?thumbnail&size=64\'}" alt="avatar"><div class="text"><p><i class="fa fa-reply"></i>{notification.post.user.name}</p><p class="post-preview">{getPostSummary(notification.post)}</p></div></virtual><virtual if="{notification.type == \'mention\'}"><img class="avatar" riot-src="{notification.post.user.avatar_url + \'?thumbnail&size=64\'}" alt="avatar"><div class="text"><p><i class="fa fa-at"></i>{notification.post.user.name}</p><p class="post-preview">{getPostSummary(notification.post)}</p></div></virtual><virtual if="{notification.type == \'poll_vote\'}"><img class="avatar" riot-src="{notification.user.avatar_url + \'?thumbnail&size=64\'}" alt="avatar"><div class="text"><p><i class="fa fa-pie-chart"></i>{notification.user.name}</p><p class="post-ref">{getPostSummary(notification.post)}</p></div></virtual>', 'mk-notification-preview,[data-is="mk-notification-preview"]{display:block;margin:0;padding:8px;color:#fff;overflow-wrap:break-word;} mk-notification-preview:after,[data-is="mk-notification-preview"]:after{content:"";display:block;clear:both} mk-notification-preview img,[data-is="mk-notification-preview"] img{display:block;float:left;min-width:36px;min-height:36px;max-width:36px;max-height:36px;border-radius:6px} mk-notification-preview .text,[data-is="mk-notification-preview"] .text{float:right;width:calc(100% - 36px);padding-left:8px;} mk-notification-preview .text p,[data-is="mk-notification-preview"] .text p{margin:0;} mk-notification-preview .text p i,[data-is="mk-notification-preview"] .text p i,mk-notification-preview .text p mk-reaction-icon,[data-is="mk-notification-preview"] .text p mk-reaction-icon{margin-right:4px} mk-notification-preview .post-ref:before,[data-is="mk-notification-preview"] .post-ref:before,mk-notification-preview .post-ref:after,[data-is="mk-notification-preview"] .post-ref:after{font-family:FontAwesome;font-size:1em;font-weight:normal;font-style:normal;display:inline-block;margin-right:3px} mk-notification-preview .post-ref:before,[data-is="mk-notification-preview"] .post-ref:before{content:"\\f10d"} mk-notification-preview .post-ref:after,[data-is="mk-notification-preview"] .post-ref:after{content:"\\f10e"} mk-notification-preview.repost .text p i,[data-is="mk-notification-preview"].repost .text p i,mk-notification-preview.quote .text p i,[data-is="mk-notification-preview"].quote .text p i{color:#77b255} mk-notification-preview.follow .text p i,[data-is="mk-notification-preview"].follow .text p i{color:#53c7ce} mk-notification-preview.reply .text p i,[data-is="mk-notification-preview"].reply .text p i,mk-notification-preview.mention .text p i,[data-is="mk-notification-preview"].mention .text p i{color:#fff}', 'class="{notification.type}"', function(opts) {
		this.getPostSummary = __WEBPACK_IMPORTED_MODULE_0__common_scripts_get_post_summary__["a" /* default */];
		this.notification = this.opts.notification;
});

    
  

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-search', '<mk-search-posts ref="posts" query="{query}"></mk-search-posts>', 'mk-search,[data-is="mk-search"]{display:block}', '', function(opts) {
		this.query = this.opts.query;

		this.on('mount', () => {
			this.refs.posts.on('loaded', () => {
				this.trigger('loaded');
			});
		});
});

    
  

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-search-posts', '<mk-timeline init="{init}" more="{more}" empty="{\'There is no post related to the 「{}」\'.replace(\'{}\', query)}"></mk-timeline>', 'mk-search-posts,[data-is="mk-search-posts"]{display:block;background:#fff}', '', function(opts) {
		this.mixin('api');

		this.max = 30;
		this.offset = 0;

		this.query = this.opts.query;
		this.withMedia = this.opts.withMedia;

		this.init = new Promise((res, rej) => {
			this.api('posts/search', {
				query: this.query
			}).then(posts => {
				res(posts);
				this.trigger('loaded');
			});
		});

		this.more = () => {
			this.offset += this.max;
			return this.api('posts/search', {
				query: this.query,
				max: this.max,
				offset: this.offset
			});
		};
});

    
  

/***/ }),
/* 217 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_scripts_text_compiler__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_scripts_get_post_summary__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scripts_open_post_form__ = __webpack_require__(66);

    var riot = __webpack_require__(0)
    


riot.tag2('mk-post-detail', '<div class="fetching" if="{fetching}"><mk-ellipsis-icon></mk-ellipsis-icon></div><div class="main" if="{!fetching}"><button class="read-more" if="{p.reply_to && p.reply_to.reply_to_id && context == null}" onclick="{loadContext}" disabled="{loadingContext}"><i class="fa fa-ellipsis-v" if="{!contextFetching}"></i><i class="fa fa-spinner fa-pulse" if="{contextFetching}"></i></button><div class="context"><virtual each="{post in context}"><mk-post-preview post="{post}"></mk-post-preview></virtual></div><div class="reply-to" if="{p.reply_to}"><mk-post-preview post="{p.reply_to}"></mk-post-preview></div><div class="repost" if="{isRepost}"><p><a class="avatar-anchor" href="{\'/\' + post.user.username}"><img class="avatar" riot-src="{post.user.avatar_url + \'?thumbnail&size=32\'}" alt="avatar"></a><i class="fa fa-retweet"></i><a class="name" href="{\'/\' + post.user.username}"> {post.user.name} </a> がRepost </p></div><article><header><a class="avatar-anchor" href="{\'/\' + p.user.username}"><img class="avatar" riot-src="{p.user.avatar_url + \'?thumbnail&size=64\'}" alt="avatar"></a><div><a class="name" href="{\'/\' + p.user.username}">{p.user.name}</a><span class="username">@{p.user.username}</span></div></header><div class="body"><div class="text" ref="text"></div><div class="media" if="{p.media}"><virtual each="{file in p.media}"><img riot-src="{file.url + \'?thumbnail&size=512\'}" alt="{file.name}" title="{file.name}"></virtual></div><mk-poll if="{p.poll}" post="{p}"></mk-poll></div><a class="time" href="{url}"><mk-time time="{p.created_at}" mode="detail"></mk-time></a><footer><mk-reactions-viewer post="{p}"></mk-reactions-viewer><button onclick="{reply}" title="Reply"><i class="fa fa-reply"></i><p class="count" if="{p.replies_count > 0}">{p.replies_count}</p></button><button onclick="{repost}" title="Repost"><i class="fa fa-retweet"></i><p class="count" if="{p.repost_count > 0}">{p.repost_count}</p></button><button class="{reacted: p.my_reaction != null}" onclick="{react}" ref="reactButton" title="Reaction"><i class="fa fa-plus"></i><p class="count" if="{p.reactions_count > 0}">{p.reactions_count}</p></button><button><i class="fa fa-ellipsis-h"></i></button></footer></article><div class="replies"><virtual each="{post in replies}"><mk-post-preview post="{post}"></mk-post-preview></virtual></div></div>', 'mk-post-detail,[data-is="mk-post-detail"]{display:block;margin:0;padding:0;} mk-post-detail > .fetching,[data-is="mk-post-detail"] > .fetching{padding:64px 0} mk-post-detail > .main > .read-more,[data-is="mk-post-detail"] > .main > .read-more{display:block;margin:0;padding:10px 0;width:100%;font-size:1em;text-align:center;color:#999;cursor:pointer;background:#fafafa;outline:none;border:none;border-bottom:solid 1px #eef0f2;border-radius:6px 6px 0 0;box-shadow:none;} mk-post-detail > .main > .read-more:hover,[data-is="mk-post-detail"] > .main > .read-more:hover{background:#f6f6f6} mk-post-detail > .main > .read-more:active,[data-is="mk-post-detail"] > .main > .read-more:active{background:#f0f0f0} mk-post-detail > .main > .read-more:disabled,[data-is="mk-post-detail"] > .main > .read-more:disabled{color:#ccc} mk-post-detail > .main > .context > *,[data-is="mk-post-detail"] > .main > .context > *{border-bottom:1px solid #eef0f2} mk-post-detail > .main > .repost,[data-is="mk-post-detail"] > .main > .repost{color:#9dbb00;background:linear-gradient(to bottom,#edfde2 0%,#fff 100%);} mk-post-detail > .main > .repost > p,[data-is="mk-post-detail"] > .main > .repost > p{margin:0;padding:16px 32px;} mk-post-detail > .main > .repost > p .avatar-anchor,[data-is="mk-post-detail"] > .main > .repost > p .avatar-anchor{display:inline-block;} mk-post-detail > .main > .repost > p .avatar-anchor .avatar,[data-is="mk-post-detail"] > .main > .repost > p .avatar-anchor .avatar{vertical-align:bottom;min-width:28px;min-height:28px;max-width:28px;max-height:28px;margin:0 8px 0 0;border-radius:6px} mk-post-detail > .main > .repost > p i,[data-is="mk-post-detail"] > .main > .repost > p i{margin-right:4px} mk-post-detail > .main > .repost > p .name,[data-is="mk-post-detail"] > .main > .repost > p .name{font-weight:bold} mk-post-detail > .main > .repost + article,[data-is="mk-post-detail"] > .main > .repost + article{padding-top:8px} mk-post-detail > .main > .reply-to,[data-is="mk-post-detail"] > .main > .reply-to{border-bottom:1px solid #eef0f2} mk-post-detail > .main > article,[data-is="mk-post-detail"] > .main > article{padding:14px 16px 9px 16px;}@media (min-width:500px){ mk-post-detail > .main > article,[data-is="mk-post-detail"] > .main > article{padding:28px 32px 18px 32px}} mk-post-detail > .main > article:after,[data-is="mk-post-detail"] > .main > article:after{content:"";display:block;clear:both} mk-post-detail > .main > article:hover > .main > footer > button,[data-is="mk-post-detail"] > .main > article:hover > .main > footer > button{color:#888} mk-post-detail > .main > article > header,[data-is="mk-post-detail"] > .main > article > header{display:flex;line-height:1.1;} mk-post-detail > .main > article > header > .avatar-anchor,[data-is="mk-post-detail"] > .main > article > header > .avatar-anchor{display:block;padding:0 .5em 0 0;} mk-post-detail > .main > article > header > .avatar-anchor > .avatar,[data-is="mk-post-detail"] > .main > article > header > .avatar-anchor > .avatar{display:block;width:54px;height:54px;margin:0;border-radius:8px;vertical-align:bottom;}@media (min-width:500px){ mk-post-detail > .main > article > header > .avatar-anchor > .avatar,[data-is="mk-post-detail"] > .main > article > header > .avatar-anchor > .avatar{width:60px;height:60px}} mk-post-detail > .main > article > header > div > .name,[data-is="mk-post-detail"] > .main > article > header > div > .name{display:inline-block;margin:.4em 0;color:#777;font-size:16px;font-weight:bold;text-align:left;text-decoration:none;} mk-post-detail > .main > article > header > div > .name:hover,[data-is="mk-post-detail"] > .main > article > header > div > .name:hover{text-decoration:underline} mk-post-detail > .main > article > header > div > .username,[data-is="mk-post-detail"] > .main > article > header > div > .username{display:block;text-align:left;margin:0;color:#ccc} mk-post-detail > .main > article > .body,[data-is="mk-post-detail"] > .main > article > .body{padding:8px 0;} mk-post-detail > .main > article > .body > .text,[data-is="mk-post-detail"] > .main > article > .body > .text{cursor:default;display:block;margin:0;padding:0;overflow-wrap:break-word;font-size:16px;color:#717171;}@media (min-width:500px){ mk-post-detail > .main > article > .body > .text,[data-is="mk-post-detail"] > .main > article > .body > .text{font-size:24px}} mk-post-detail > .main > article > .body > .text .link:after,[data-is="mk-post-detail"] > .main > article > .body > .text .link:after{content:"\\f14c";display:inline-block;padding-left:2px;font-family:FontAwesome;font-size:.9em;font-weight:400;font-style:normal} mk-post-detail > .main > article > .body > .text > mk-url-preview,[data-is="mk-post-detail"] > .main > article > .body > .text > mk-url-preview{margin-top:8px} mk-post-detail > .main > article > .body > .media > img,[data-is="mk-post-detail"] > .main > article > .body > .media > img{display:block;max-width:100%} mk-post-detail > .main > article > .time,[data-is="mk-post-detail"] > .main > article > .time{font-size:16px;color:#c0c0c0} mk-post-detail > .main > article > footer,[data-is="mk-post-detail"] > .main > article > footer{font-size:1.2em;} mk-post-detail > .main > article > footer > button,[data-is="mk-post-detail"] > .main > article > footer > button{margin:0 28px 0 0;padding:8px;background:transparent;border:none;box-shadow:none;font-size:1em;color:#ddd;cursor:pointer;} mk-post-detail > .main > article > footer > button:hover,[data-is="mk-post-detail"] > .main > article > footer > button:hover{color:#666} mk-post-detail > .main > article > footer > button > .count,[data-is="mk-post-detail"] > .main > article > footer > button > .count{display:inline;margin:0 0 0 8px;color:#999} mk-post-detail > .main > article > footer > button.reacted,[data-is="mk-post-detail"] > .main > article > footer > button.reacted{color:#87bb35} mk-post-detail > .main > .replies > *,[data-is="mk-post-detail"] > .main > .replies > *{border-top:1px solid #eef0f2}', '', function(opts) {

		this.mixin('api');

		this.fetching = true;
		this.loadingContext = false;
		this.context = null;
		this.post = null;

		this.on('mount', () => {
			this.api('posts/show', {
				post_id: this.opts.post
			}).then(post => {
				const isRepost = post.repost != null;
				const p = isRepost ? post.repost : post;
				p.reactions_count = p.reaction_counts ? Object.keys(p.reaction_counts).map(key => p.reaction_counts[key]).reduce((a, b) => a + b) : 0;

				this.update({
					fetching: false,
					post: post,
					isRepost: isRepost,
					p: p,
					summary: Object(__WEBPACK_IMPORTED_MODULE_1__common_scripts_get_post_summary__["a" /* default */])(p)
				});

				this.trigger('loaded');

				if (this.p.text) {
					const tokens = this.p.ast;

					this.refs.text.innerHTML = Object(__WEBPACK_IMPORTED_MODULE_0__common_scripts_text_compiler__["a" /* default */])(tokens);

					this.refs.text.children.forEach(e => {
						if (e.tagName == 'MK-URL') riot.mount(e);
					});

					tokens
					.filter(t => (t.type == 'url' || t.type == 'link') && !t.silent)
					.map(t => {
						riot.mount(this.refs.text.appendChild(document.createElement('mk-url-preview')), {
							url: t.url
						});
					});
				}

				this.api('posts/replies', {
					post_id: this.p.id,
					limit: 8
				}).then(replies => {
					this.update({
						replies: replies
					});
				});
			});
		});

		this.reply = () => {
			Object(__WEBPACK_IMPORTED_MODULE_2__scripts_open_post_form__["a" /* default */])({
				reply: this.p
			});
		};

		this.repost = () => {
			const text = window.prompt(`「${this.summary}」をRepost`);
			if (text == null) return;
			this.api('posts/create', {
				repost_id: this.p.id,
				text: text == '' ? undefined : text
			});
		};

		this.react = () => {
			riot.mount(document.body.appendChild(document.createElement('mk-reaction-picker')), {
				source: this.refs.reactButton,
				post: this.p,
				compact: true
			});
		};

		this.loadContext = () => {
			this.contextFetching = true;

			this.api('posts/context', {
				post_id: this.p.reply_to_id
			}).then(context => {
				this.update({
					contextFetching: false,
					context: context.reverse()
				});
			});
		};
});

    
  

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-user', '<div class="user" if="{!fetching}"><header><div class="banner" riot-style="{user.banner_url ? \'background-image: url(\' + user.banner_url + \'?thumbnail&size=1024)\' : \'\'}"></div><div class="body"><div class="top"><a class="avatar"><img riot-src="{user.avatar_url + \'?thumbnail&size=200\'}" alt="avatar"></a><mk-follow-button if="{SIGNIN && I.id != user.id}" user="{user}"></mk-follow-button></div><div class="title"><h1>{user.name}</h1><span class="username">@{user.username}</span><span class="followed" if="{user.is_followed}">Followed you</span></div><div class="description">{user.description}</div><div class="info"><p class="location" if="{user.profile.location}"><i class="fa fa-map-marker"></i>{user.profile.location} </p><p class="birthday" if="{user.profile.birthday}"><i class="fa fa-birthday-cake"></i>{user.profile.birthday.replace(\'-\', \'年\').replace(\'-\', \'月\') + \'日\'} ({age(user.profile.birthday)}歳) </p></div><div class="status"><a><b>{user.posts_count}</b><i>mobile.tags.mk-user.posts-count</i></a><a href="{user.username}/following"><b>{user.following_count}</b><i>Following</i></a><a href="{user.username}/followers"><b>{user.followers_count}</b><i>Followers</i></a></div><mk-activity-table user="{user}"></mk-activity-table></div><nav><a data-is-active="{page == \'posts\'}" onclick="{go.bind(null, \'posts\')}">Timeline</a><a data-is-active="{page == \'media\'}" onclick="{go.bind(null, \'media\')}">Media</a></nav></header><div class="body"><mk-user-timeline if="{page == \'posts\'}" user="{user}"></mk-user-timeline><mk-user-timeline if="{page == \'media\'}" user="{user}" with-media="{true}"></mk-user-timeline></div></div>', 'mk-user,[data-is="mk-user"]{display:block;} mk-user > .user > header > .banner,[data-is="mk-user"] > .user > header > .banner{padding-bottom:33.3%;background-color:#f5f5f5;background-size:cover;background-position:center} mk-user > .user > header > .body,[data-is="mk-user"] > .user > header > .body{padding:12px;margin:0 auto;max-width:600px;} mk-user > .user > header > .body > .top:after,[data-is="mk-user"] > .user > header > .body > .top:after{content:\'\';display:block;clear:both} mk-user > .user > header > .body > .top > .avatar,[data-is="mk-user"] > .user > header > .body > .top > .avatar{display:block;float:left;width:25%;height:40px;} mk-user > .user > header > .body > .top > .avatar > img,[data-is="mk-user"] > .user > header > .body > .top > .avatar > img{display:block;position:absolute;left:-2px;bottom:-2px;width:100%;border:2px solid #fff;border-radius:6px;}@media (min-width:500px){ mk-user > .user > header > .body > .top > .avatar > img,[data-is="mk-user"] > .user > header > .body > .top > .avatar > img{left:-4px;bottom:-4px;border:4px solid #fff;border-radius:12px}} mk-user > .user > header > .body > .top > mk-follow-button,[data-is="mk-user"] > .user > header > .body > .top > mk-follow-button{float:right;height:40px} mk-user > .user > header > .body > .title,[data-is="mk-user"] > .user > header > .body > .title{margin:8px 0;} mk-user > .user > header > .body > .title > h1,[data-is="mk-user"] > .user > header > .body > .title > h1{margin:0;line-height:22px;font-size:20px;color:#222} mk-user > .user > header > .body > .title > .username,[data-is="mk-user"] > .user > header > .body > .title > .username{display:inline-block;line-height:20px;font-size:16px;font-weight:bold;color:#657786} mk-user > .user > header > .body > .title > .followed,[data-is="mk-user"] > .user > header > .body > .title > .followed{margin-left:8px;padding:2px 4px;font-size:12px;color:#657786;background:#f8f8f8;border-radius:4px} mk-user > .user > header > .body > .description,[data-is="mk-user"] > .user > header > .body > .description{margin:8px 0;color:#333} mk-user > .user > header > .body > .info,[data-is="mk-user"] > .user > header > .body > .info{margin:8px 0;} mk-user > .user > header > .body > .info > p,[data-is="mk-user"] > .user > header > .body > .info > p{display:inline;margin:0 16px 0 0;color:#555;} mk-user > .user > header > .body > .info > p > i,[data-is="mk-user"] > .user > header > .body > .info > p > i{margin-right:4px} mk-user > .user > header > .body > .status > a,[data-is="mk-user"] > .user > header > .body > .status > a{color:#657786;} mk-user > .user > header > .body > .status > a:first-child,[data-is="mk-user"] > .user > header > .body > .status > a:first-child{margin-right:16px} mk-user > .user > header > .body > .status > a > b,[data-is="mk-user"] > .user > header > .body > .status > a > b{margin-right:4px;font-size:16px;color:#14171a} mk-user > .user > header > .body > .status > a > i,[data-is="mk-user"] > .user > header > .body > .status > a > i{font-size:14px} mk-user > .user > header > .body > mk-activity-table,[data-is="mk-user"] > .user > header > .body > mk-activity-table{margin:12px 0 0 0} mk-user > .user > header > nav,[data-is="mk-user"] > .user > header > nav{display:flex;justify-content:center;margin:0 auto;max-width:600px;border-bottom:solid 1px #ddd;} mk-user > .user > header > nav > a,[data-is="mk-user"] > .user > header > nav > a{display:block;flex:1 1;text-align:center;line-height:52px;font-size:14px;text-decoration:none;color:#657786;border-bottom:solid 2px transparent;} mk-user > .user > header > nav > a[data-is-active],[data-is="mk-user"] > .user > header > nav > a[data-is-active]{font-weight:bold;color:#87bb35;border-color:#87bb35}@media (min-width:500px){ mk-user > .user > .body,[data-is="mk-user"] > .user > .body{padding:16px 0 0 0}}', '', function(opts) {
		this.age = __webpack_require__(65);

		this.mixin('i');
		this.mixin('api');

		this.username = this.opts.user;
		this.page = this.opts.page ? this.opts.page : 'posts';
		this.fetching = true;

		this.on('mount', () => {
			this.api('users/show', {
				username: this.username
			}).then(user => {
				this.fetching = false;
				this.user = user;
				this.trigger('loaded', user);
				this.update();
			});
		});

		this.go = page => {
			this.update({
				page: page
			});
		};
});

    
  

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-user-timeline', '<mk-timeline ref="timeline" init="{init}" more="{more}" empty="{withMedia ? \'There is no posts with media\' : \'This user seems never post\'}"></mk-timeline>', 'mk-user-timeline,[data-is="mk-user-timeline"]{display:block;max-width:600px;margin:0 auto;background:#fff}', '', function(opts) {
		this.mixin('api');

		this.user = this.opts.user;
		this.withMedia = this.opts.withMedia;

		this.init = new Promise((res, rej) => {
			this.api('users/posts', {
				user_id: this.user.id,
				with_media: this.withMedia
			}).then(posts => {
				res(posts);
				this.trigger('loaded');
			});
		});

		this.more = () => {
			return this.api('users/posts', {
				user_id: this.user.id,
				with_media: this.withMedia,
				max_id: this.refs.timeline.tail().id
			});
		};
});

    
  

/***/ }),
/* 220 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_scripts_is_promise__ = __webpack_require__(53);

    var riot = __webpack_require__(0)
    
riot.tag2('mk-follow-button', '<button class="{wait: wait, follow: !user.is_following, unfollow: user.is_following}" if="{!init}" onclick="{onclick}" disabled="{wait}"><i class="fa fa-minus" if="{!wait && user.is_following}"></i><i class="fa fa-plus" if="{!wait && !user.is_following}"></i><i class="fa fa-spinner fa-pulse fa-fw" if="{wait}"></i>{user.is_following ? \'Unfollow\' : \'Follow\'}</button><div class="init" if="{init}"><i class="fa fa-spinner fa-pulse fa-fw"></i></div>', 'mk-follow-button,[data-is="mk-follow-button"]{display:block;} mk-follow-button > button,[data-is="mk-follow-button"] > button,mk-follow-button > .init,[data-is="mk-follow-button"] > .init{display:block;user-select:none;cursor:pointer;padding:0 16px;margin:0;height:inherit;font-size:16px;outline:none;border:solid 1px #87bb35;border-radius:4px;} mk-follow-button > button *,[data-is="mk-follow-button"] > button *,mk-follow-button > .init *,[data-is="mk-follow-button"] > .init *{pointer-events:none} mk-follow-button > button.follow,[data-is="mk-follow-button"] > button.follow,mk-follow-button > .init.follow,[data-is="mk-follow-button"] > .init.follow{color:#87bb35;background:transparent;} mk-follow-button > button.follow:hover,[data-is="mk-follow-button"] > button.follow:hover,mk-follow-button > .init.follow:hover,[data-is="mk-follow-button"] > .init.follow:hover{background:rgba(135,187,53,0.1)} mk-follow-button > button.follow:active,[data-is="mk-follow-button"] > button.follow:active,mk-follow-button > .init.follow:active,[data-is="mk-follow-button"] > .init.follow:active{background:rgba(135,187,53,0.2)} mk-follow-button > button.unfollow,[data-is="mk-follow-button"] > button.unfollow,mk-follow-button > .init.unfollow,[data-is="mk-follow-button"] > .init.unfollow{color:#fff;background:#87bb35} mk-follow-button > button.wait,[data-is="mk-follow-button"] > button.wait,mk-follow-button > .init.wait,[data-is="mk-follow-button"] > .init.wait{cursor:wait !important;opacity:.7} mk-follow-button > button.init,[data-is="mk-follow-button"] > button.init,mk-follow-button > .init.init,[data-is="mk-follow-button"] > .init.init{cursor:wait !important;opacity:.7} mk-follow-button > button > i,[data-is="mk-follow-button"] > button > i,mk-follow-button > .init > i,[data-is="mk-follow-button"] > .init > i{margin-right:4px}', '', function(opts) {

		this.mixin('i');
		this.mixin('api');
		this.mixin('stream');

		this.user = null;
		this.userPromise = Object(__WEBPACK_IMPORTED_MODULE_0__common_scripts_is_promise__["a" /* default */])(this.opts.user)
			? this.opts.user
			: Promise.resolve(this.opts.user);
		this.init = true;
		this.wait = false;

		this.on('mount', () => {
			this.userPromise.then(user => {
				this.update({
					init: false,
					user: user
				});
				this.stream.on('follow', this.onStreamFollow);
				this.stream.on('unfollow', this.onStreamUnfollow);
			});
		});

		this.on('unmount', () => {
			this.stream.off('follow', this.onStreamFollow);
			this.stream.off('unfollow', this.onStreamUnfollow);
		});

		this.onStreamFollow = user => {
			if (user.id == this.user.id) {
				this.update({
					user: user
				});
			}
		};

		this.onStreamUnfollow = user => {
			if (user.id == this.user.id) {
				this.update({
					user: user
				});
			}
		};

		this.onclick = () => {
			this.wait = true;
			if (this.user.is_following) {
				this.api('following/delete', {
					user_id: this.user.id
				}).then(() => {
					this.user.is_following = false;
				}).catch(err => {
					console.error(err);
				}).then(() => {
					this.wait = false;
					this.update();
				});
			} else {
				this.api('following/create', {
					user_id: this.user.id
				}).then(() => {
					this.user.is_following = true;
				}).catch(err => {
					console.error(err);
				}).then(() => {
					this.wait = false;
					this.update();
				});
			}
		};
});

    
  

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-user-preview', '<a class="avatar-anchor" href="{\'/\' + user.username}"><img class="avatar" riot-src="{user.avatar_url + \'?thumbnail&size=64\'}" alt="avatar"></a><div class="main"><header><a class="name" href="{\'/\' + user.username}">{user.name}</a><span class="username">@{user.username}</span></header><div class="body"><div class="description">{user.description}</div></div></div>', 'mk-user-preview,[data-is="mk-user-preview"]{display:block;margin:0;padding:16px;font-size:12px;}@media (min-width:350px){ mk-user-preview,[data-is="mk-user-preview"]{font-size:14px}}@media (min-width:500px){ mk-user-preview,[data-is="mk-user-preview"]{font-size:16px}} mk-user-preview:after,[data-is="mk-user-preview"]:after{content:"";display:block;clear:both} mk-user-preview > .avatar-anchor,[data-is="mk-user-preview"] > .avatar-anchor{display:block;float:left;margin:0 10px 0 0;}@media (min-width:500px){ mk-user-preview > .avatar-anchor,[data-is="mk-user-preview"] > .avatar-anchor{margin-right:16px}} mk-user-preview > .avatar-anchor > .avatar,[data-is="mk-user-preview"] > .avatar-anchor > .avatar{display:block;width:48px;height:48px;margin:0;border-radius:6px;vertical-align:bottom;}@media (min-width:500px){ mk-user-preview > .avatar-anchor > .avatar,[data-is="mk-user-preview"] > .avatar-anchor > .avatar{width:58px;height:58px;border-radius:8px}} mk-user-preview > .main,[data-is="mk-user-preview"] > .main{float:left;width:calc(100% - 58px);}@media (min-width:500px){ mk-user-preview > .main,[data-is="mk-user-preview"] > .main{width:calc(100% - 74px)}}@media (min-width:500px){ mk-user-preview > .main > header,[data-is="mk-user-preview"] > .main > header{margin-bottom:2px}} mk-user-preview > .main > header > .name,[data-is="mk-user-preview"] > .main > header > .name{display:inline;margin:0;padding:0;color:#777;font-size:1em;font-weight:700;text-align:left;text-decoration:none;} mk-user-preview > .main > header > .name:hover,[data-is="mk-user-preview"] > .main > header > .name:hover{text-decoration:underline} mk-user-preview > .main > header > .username,[data-is="mk-user-preview"] > .main > header > .username{text-align:left;margin:0 0 0 8px;color:#ccc} mk-user-preview > .main > .body > .description,[data-is="mk-user-preview"] > .main > .body > .description{cursor:default;display:block;margin:0;padding:0;overflow-wrap:break-word;font-size:1.1em;color:#717171}', '', function(opts) {
this.user = this.opts.user
});

    
  

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-users-list', '<nav><span data-is-active="{mode == \'all\'}" onclick="{setMode.bind(this, \'all\')}">All<span>{opts.count}</span></span><span if="{SIGNIN && opts.youKnowCount}" data-is-active="{mode == \'iknow\'}" onclick="{setMode.bind(this, \'iknow\')}">You know<span>{opts.youKnowCount}</span></span></nav><div class="users" if="{!fetching && users.length != 0}"><mk-user-preview each="{users}" user="{this}"></mk-user-preview></div><button class="more" if="{!fetching && next != null}" onclick="{more}" disabled="{moreFetching}"><span if="{!moreFetching}">More</span><span if="{moreFetching}">Loading<mk-ellipsis></mk-ellipsis></span></button><p class="no" if="{!fetching && users.length == 0}">{opts.noUsers}</p><p class="fetching" if="{fetching}"><i class="fa fa-spinner fa-pulse fa-fw"></i>Loading<mk-ellipsis></mk-ellipsis></p>', 'mk-users-list,[data-is="mk-users-list"]{display:block;background:#fff;} mk-users-list > nav,[data-is="mk-users-list"] > nav{display:flex;justify-content:center;margin:0 auto;max-width:600px;border-bottom:solid 1px #ddd;} mk-users-list > nav > span,[data-is="mk-users-list"] > nav > span{display:block;flex:1 1;text-align:center;line-height:52px;font-size:14px;color:#657786;border-bottom:solid 2px transparent;} mk-users-list > nav > span[data-is-active],[data-is="mk-users-list"] > nav > span[data-is-active]{font-weight:bold;color:#87bb35;border-color:#87bb35} mk-users-list > nav > span > span,[data-is="mk-users-list"] > nav > span > span{display:inline-block;margin-left:4px;padding:2px 5px;font-size:12px;line-height:1;color:#888;background:#eee;border-radius:20px} mk-users-list > .users > *,[data-is="mk-users-list"] > .users > *{max-width:600px;margin:0 auto;border-bottom:solid 1px rgba(0,0,0,0.05)} mk-users-list > .no,[data-is="mk-users-list"] > .no{margin:0;padding:16px;text-align:center;color:#aaa} mk-users-list > .fetching,[data-is="mk-users-list"] > .fetching{margin:0;padding:16px;text-align:center;color:#aaa;} mk-users-list > .fetching > i,[data-is="mk-users-list"] > .fetching > i{margin-right:4px}', '', function(opts) {
		this.mixin('i');

		this.limit = 30;
		this.mode = 'all';

		this.fetching = true;
		this.moreFetching = false;

		this.on('mount', () => {
			this.fetch(() => this.trigger('loaded'));
		});

		this.fetch = cb => {
			this.update({
				fetching: true
			});
			this.opts.fetch(this.mode == 'iknow', this.limit, null, obj => {
				this.update({
					fetching: false,
					users: obj.users,
					next: obj.next
				});
				if (cb) cb();
			});
		};

		this.more = () => {
			this.update({
				moreFetching: true
			});
			this.opts.fetch(this.mode == 'iknow', this.limit, this.next, obj => {
				this.update({
					moreFetching: false,
					users: this.users.concat(obj.users),
					next: obj.next
				});
			});
		};

		this.setMode = mode => {
			this.update({
				mode: mode
			});
			this.fetch();
		};
});

    
  

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-user-following', '<mk-users-list ref="list" fetch="{fetch}" count="{user.following_count}" you-know-count="{user.following_you_know_count}" no-users="{\'No following.\'}"></mk-users-list>', 'mk-user-following,[data-is="mk-user-following"]{display:block}', '', function(opts) {
		this.mixin('api');

		this.user = this.opts.user;

		this.fetch = (iknow, limit, cursor, cb) => {
			this.api('users/following', {
				user_id: this.user.id,
				iknow: iknow,
				limit: limit,
				cursor: cursor ? cursor : undefined
			}).then(cb);
		};

		this.on('mount', () => {
			this.refs.list.on('loaded', () => {
				this.trigger('loaded');
			});
		});
});

    
  

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-user-followers', '<mk-users-list ref="list" fetch="{fetch}" count="{user.followers_count}" you-know-count="{user.followers_you_know_count}" no-users="{\'No followers.\'}"></mk-users-list>', 'mk-user-followers,[data-is="mk-user-followers"]{display:block}', '', function(opts) {
		this.mixin('api');

		this.user = this.opts.user;

		this.fetch = (iknow, limit, cursor, cb) => {
			this.api('users/followers', {
				user_id: this.user.id,
				iknow: iknow,
				limit: limit,
				cursor: cursor ? cursor : undefined
			}).then(cb);
		};

		this.on('mount', () => {
			this.refs.list.on('loaded', () => {
				this.trigger('loaded');
			});
		});
});

    
  

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    riot.tag2('mk-init-following', '<p class="title">気になるユーザーをフォロー:</p><div class="users" if="{!fetching && users.length > 0}"><div class="user" each="{users}"><a class="avatar-anchor" href="{\'/\' + username}"><img class="avatar" riot-src="{avatar_url + \'?thumbnail&size=42\'}" alt=""></a><div class="body"><a class="name" href="{\'/\' + username}" target="_blank">{name}</a><p class="username">@{username}</p></div><mk-follow-button user="{this}"></mk-follow-button></div></div><p class="empty" if="{!fetching && users.length == 0}">おすすめのユーザーは見つかりませんでした。</p><p class="fetching" if="{fetching}"><i class="fa fa-spinner fa-pulse fa-fw"></i>読み込んでいます<mk-ellipsis></mk-ellipsis></p><a class="refresh" onclick="{refresh}">もっと見る</a><button class="close" onclick="{close}" title="閉じる"><i class="fa fa-times"></i></button>', 'mk-init-following,[data-is="mk-init-following"]{display:block;padding:16px;} mk-init-following > .title,[data-is="mk-init-following"] > .title{margin:0 0 12px 0;font-size:1em;font-weight:bold;color:#888} mk-init-following > .users:after,[data-is="mk-init-following"] > .users:after{content:"";display:block;clear:both} mk-init-following > .users > .user,[data-is="mk-init-following"] > .users > .user{padding:16px;width:238px;float:left;} mk-init-following > .users > .user:after,[data-is="mk-init-following"] > .users > .user:after{content:"";display:block;clear:both} mk-init-following > .users > .user > .avatar-anchor,[data-is="mk-init-following"] > .users > .user > .avatar-anchor{display:block;float:left;margin:0 12px 0 0;} mk-init-following > .users > .user > .avatar-anchor > .avatar,[data-is="mk-init-following"] > .users > .user > .avatar-anchor > .avatar{display:block;width:42px;height:42px;margin:0;border-radius:8px;vertical-align:bottom} mk-init-following > .users > .user > .body,[data-is="mk-init-following"] > .users > .user > .body{float:left;width:calc(100% - 54px);} mk-init-following > .users > .user > .body > .name,[data-is="mk-init-following"] > .users > .user > .body > .name{margin:0;font-size:16px;line-height:24px;color:#555} mk-init-following > .users > .user > .body > .username,[data-is="mk-init-following"] > .users > .user > .body > .username{margin:0;font-size:15px;line-height:16px;color:#ccc} mk-init-following > .users > .user > mk-follow-button,[data-is="mk-init-following"] > .users > .user > mk-follow-button{position:absolute;top:16px;right:16px} mk-init-following > .empty,[data-is="mk-init-following"] > .empty{margin:0;padding:16px;text-align:center;color:#aaa} mk-init-following > .fetching,[data-is="mk-init-following"] > .fetching{margin:0;padding:16px;text-align:center;color:#aaa;} mk-init-following > .fetching > i,[data-is="mk-init-following"] > .fetching > i{margin-right:4px} mk-init-following > .refresh,[data-is="mk-init-following"] > .refresh{display:block;margin:0 8px 0 0;text-align:right;font-size:.9em;color:#999} mk-init-following > .close,[data-is="mk-init-following"] > .close{cursor:pointer;display:block;position:absolute;top:0;right:0;z-index:1;margin:0;padding:0;font-size:1.2em;color:#999;border:none;outline:none;background:transparent;} mk-init-following > .close:hover,[data-is="mk-init-following"] > .close:hover{color:#555} mk-init-following > .close:active,[data-is="mk-init-following"] > .close:active{color:#222} mk-init-following > .close > i,[data-is="mk-init-following"] > .close > i{padding:14px}', '', function(opts) {
		this.mixin('api');

		this.users = null;
		this.fetching = true;

		this.limit = 6;
		this.page = 0;

		this.on('mount', () => {
			this.fetch();
		});

		this.fetch = () => {
			this.update({
				fetching: true,
				users: null
			});

			this.api('users/recommendation', {
				limit: this.limit,
				offset: this.limit * this.page
			}).then(users => {
				this.fetching = false
				this.users = users
				this.update({
					fetching: false,
					users: users
				});
			});
		};

		this.refresh = () => {
			if (this.users.length < this.limit) {
				this.page = 0;
			} else {
				this.page++;
			}
			this.fetch();
		};

		this.close = () => {
			this.unmount();
		};
});

    
  

/***/ })
/******/ ]);