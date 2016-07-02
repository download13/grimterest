/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

module.exports =
/******/function (modules) {
	// webpackBootstrap
	/******/ // The module cache
	/******/var installedModules = {};

	/******/ // The require function
	/******/function __webpack_require__(moduleId) {

		/******/ // Check if module is in cache
		/******/if (installedModules[moduleId])
			/******/return installedModules[moduleId].exports;

		/******/ // Create a new module (and put it into the cache)
		/******/var module = installedModules[moduleId] = {
			/******/i: moduleId,
			/******/l: false,
			/******/exports: {}
			/******/ };

		/******/ // Execute the module function
		/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

		/******/ // Flag the module as loaded
		/******/module.l = true;

		/******/ // Return the exports of the module
		/******/return module.exports;
		/******/
	}

	/******/ // expose the modules object (__webpack_modules__)
	/******/__webpack_require__.m = modules;

	/******/ // expose the module cache
	/******/__webpack_require__.c = installedModules;

	/******/ // identity function for calling harmory imports with the correct context
	/******/__webpack_require__.i = function (value) {
		return value;
	};

	/******/ // define getter function for harmory exports
	/******/__webpack_require__.d = function (exports, name, getter) {
		/******/Object.defineProperty(exports, name, {
			/******/configurable: false,
			/******/enumerable: true,
			/******/get: getter
			/******/ });
		/******/
	};

	/******/ // Object.prototype.hasOwnProperty.call
	/******/__webpack_require__.o = function (object, property) {
		return Object.prototype.hasOwnProperty.call(object, property);
	};

	/******/ // __webpack_public_path__
	/******/__webpack_require__.p = "";

	/******/ // Load entry module and return exports
	/******/return __webpack_require__(__webpack_require__.s = 7);
	/******/
}(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function (setImmediate, clearImmediate) {
		var nextTick = __webpack_require__(10).nextTick;
		var apply = Function.prototype.apply;
		var slice = Array.prototype.slice;
		var immediateIds = {};
		var nextImmediateId = 0;

		// DOM APIs, for completeness

		exports.setTimeout = function () {
			return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
		};
		exports.setInterval = function () {
			return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
		};
		exports.clearTimeout = exports.clearInterval = function (timeout) {
			timeout.close();
		};

		function Timeout(id, clearFn) {
			this._id = id;
			this._clearFn = clearFn;
		}
		Timeout.prototype.unref = Timeout.prototype.ref = function () {};
		Timeout.prototype.close = function () {
			this._clearFn.call(window, this._id);
		};

		// Does not start the time, just sets up the members needed.
		exports.enroll = function (item, msecs) {
			clearTimeout(item._idleTimeoutId);
			item._idleTimeout = msecs;
		};

		exports.unenroll = function (item) {
			clearTimeout(item._idleTimeoutId);
			item._idleTimeout = -1;
		};

		exports._unrefActive = exports.active = function (item) {
			clearTimeout(item._idleTimeoutId);

			var msecs = item._idleTimeout;
			if (msecs >= 0) {
				item._idleTimeoutId = setTimeout(function onTimeout() {
					if (item._onTimeout) item._onTimeout();
				}, msecs);
			}
		};

		// That's not how node.js implements it but the exposed api is the same.
		exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function (fn) {
			var id = nextImmediateId++;
			var args = arguments.length < 2 ? false : slice.call(arguments, 1);

			immediateIds[id] = true;

			nextTick(function onNextTick() {
				if (immediateIds[id]) {
					// fn.call() is faster so we optimize for the common use-case
					// @see http://jsperf.com/call-apply-segu
					if (args) {
						fn.apply(null, args);
					} else {
						fn.call(null);
					}
					// Prevent ids from leaking
					exports.clearImmediate(id);
				}
			});

			return id;
		};

		exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function (id) {
			delete immediateIds[id];
		};
		/* WEBPACK VAR INJECTION */
	}).call(exports, __webpack_require__(0).setImmediate, __webpack_require__(0).clearImmediate);

	/***/
},
/* 1 */
/***/function (module, exports, __webpack_require__) {

	"use strict";
	"use strict";

	var types_1 = __webpack_require__(2);
	function h(name, props) {
		var children = [];
		for (var _i = 2; _i < arguments.length; _i++) {
			children[_i - 2] = arguments[_i];
		}
		return {
			type: 'element',
			name: name,
			props: normalizeProps(props),
			children: normalizeChildren(children)
		};
	}
	exports.h = h;
	function normalizeProps(props) {
		if (props === void 0) {
			props = {};
		}
		var r = {};
		for (var k in props) {
			r[normalizePropName(k)] = props[k];
		}
		return r;
	}
	var onRegex = /^on[A-Z]+/;
	function normalizePropName(name) {
		if (name === 'className') {
			return 'class';
		}
		if (onRegex.test(name)) {
			return name.toLowerCase();
		}
		return name;
	}
	function normalizeChildren(children) {
		return children.filter(nonNull).reduce(expandItem, []).map(normalizeChild).map(addIndex);
	}
	exports.normalizeChildren = normalizeChildren;
	function normalizeChild(child) {
		if (typeof child === 'string') {
			return {
				type: 'text',
				text: child
			};
		}
		if (types_1.isVNode(child)) {
			return child;
		}
		return normalizeChild(child.toString());
	}
	function expandItem(acc, item) {
		return acc.concat(item);
	}
	function addIndex(item, i) {
		item.index = i;
		return item;
	}
	function nonNull(a) {
		return a != null;
	}

	/***/
},
/* 2 */
/***/function (module, exports) {

	"use strict";
	"use strict";

	function isVTextNode(a) {
		return a.type === 'text';
	}
	exports.isVTextNode = isVTextNode;
	function isVElement(a) {
		return a.type === 'element';
	}
	exports.isVElement = isVElement;
	function isVNode(a) {
		return a && a.type && (isVElement(a) || isVTextNode(a));
	}
	exports.isVNode = isVNode;

	/***/
},
/* 3 */
/***/function (module, exports) {

	"use strict";
	'use strict';

	function nop() {}

	module.exports = nop;

	/***/
},
/* 4 */
/***/function (module, exports) {

	module.exports = function (object, cb, context) {
		var newObject = {};
		for (var key in object) {
			if (!object.hasOwnProperty(key)) {
				continue;
			}
			newObject[key] = cb.call(context, object[key], key, object);
		}
		return newObject;
	};

	/***/
},
/* 5 */
/***/function (module, exports) {

	var global = function () {
		return this;
	}();
	module.exports = function () {
		global.setImmediate = global.setImmediate || function () {
			var args = [].slice.apply(arguments);
			args.splice(1, 0, 0);
			setTimeout.apply(null, args);
		};
	};

	/***/
},
/* 6 */
/***/function (module, exports, __webpack_require__) {

	"use strict";
	"use strict";

	var update_dom_1 = __webpack_require__(11);
	exports.updateChildren = update_dom_1.updateChildren;
	var h_1 = __webpack_require__(1);
	exports.h = h_1.h;

	/***/
},
/* 7 */
/***/function (module, exports, __webpack_require__) {

	"use strict";
	/* WEBPACK VAR INJECTION */
	(function (setImmediate) {
		/* harmony import */var __WEBPACK_IMPORTED_MODULE_0_setimmediate_min__ = __webpack_require__(5);
		/* harmony import */var __WEBPACK_IMPORTED_MODULE_0_setimmediate_min___default = __WEBPACK_IMPORTED_MODULE_0_setimmediate_min__ && __WEBPACK_IMPORTED_MODULE_0_setimmediate_min__.__esModule ? function () {
			return __WEBPACK_IMPORTED_MODULE_0_setimmediate_min__['default'];
		} : function () {
			return __WEBPACK_IMPORTED_MODULE_0_setimmediate_min__;
		};
		/* harmony import */__webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0_setimmediate_min___default, 'a', __WEBPACK_IMPORTED_MODULE_0_setimmediate_min___default);
		/* harmony import */var __WEBPACK_IMPORTED_MODULE_1_nop__ = __webpack_require__(3);
		/* harmony import */var __WEBPACK_IMPORTED_MODULE_1_nop___default = __WEBPACK_IMPORTED_MODULE_1_nop__ && __WEBPACK_IMPORTED_MODULE_1_nop__.__esModule ? function () {
			return __WEBPACK_IMPORTED_MODULE_1_nop__['default'];
		} : function () {
			return __WEBPACK_IMPORTED_MODULE_1_nop__;
		};
		/* harmony import */__webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1_nop___default, 'a', __WEBPACK_IMPORTED_MODULE_1_nop___default);
		/* harmony import */var __WEBPACK_IMPORTED_MODULE_2_update_element_children__ = __webpack_require__(6);
		/* harmony import */var __WEBPACK_IMPORTED_MODULE_2_update_element_children___default = __WEBPACK_IMPORTED_MODULE_2_update_element_children__ && __WEBPACK_IMPORTED_MODULE_2_update_element_children__.__esModule ? function () {
			return __WEBPACK_IMPORTED_MODULE_2_update_element_children__['default'];
		} : function () {
			return __WEBPACK_IMPORTED_MODULE_2_update_element_children__;
		};
		/* harmony import */__webpack_require__.d(__WEBPACK_IMPORTED_MODULE_2_update_element_children___default, 'a', __WEBPACK_IMPORTED_MODULE_2_update_element_children___default);
		/* harmony import */var __WEBPACK_IMPORTED_MODULE_3_object_map__ = __webpack_require__(4);
		/* harmony import */var __WEBPACK_IMPORTED_MODULE_3_object_map___default = __WEBPACK_IMPORTED_MODULE_3_object_map__ && __WEBPACK_IMPORTED_MODULE_3_object_map__.__esModule ? function () {
			return __WEBPACK_IMPORTED_MODULE_3_object_map__['default'];
		} : function () {
			return __WEBPACK_IMPORTED_MODULE_3_object_map__;
		};
		/* harmony import */__webpack_require__.d(__WEBPACK_IMPORTED_MODULE_3_object_map___default, 'a', __WEBPACK_IMPORTED_MODULE_3_object_map___default);
		/* harmony export */exports["registerComponent"] = registerComponent;var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
			return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
		} : function (obj) {
			return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
		};

		var _extends = Object.assign || function (target) {
			for (var i = 1; i < arguments.length; i++) {
				var source = arguments[i];for (var key in source) {
					if (Object.prototype.hasOwnProperty.call(source, key)) {
						target[key] = source[key];
					}
				}
			}return target;
		};

		function _defineProperty(obj, key, value) {
			if (key in obj) {
				Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
			} else {
				obj[key] = value;
			}return obj;
		}

		/* harmony reexport */if (__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_2_update_element_children__, "h")) __webpack_require__.d(exports, "h", function () {
			return __WEBPACK_IMPORTED_MODULE_2_update_element_children__["h"];
		});

		function registerComponent(name) {
			var spec = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
			var doc = arguments.length <= 2 || arguments[2] === undefined ? document : arguments[2];

			if (typeof spec === 'function') {
				spec = { render: spec };
			}

			var componentProto = createComponentPrototype({
				props: spec.props || {},
				render: spec.render || __WEBPACK_IMPORTED_MODULE_1_nop___default.a,
				reduce: spec.reduce || __WEBPACK_IMPORTED_MODULE_1_nop___default.a,
				onMount: spec.onMount,
				onUnmount: spec.onUnmount,
				onPropChange: spec.onPropChange
			});
			var elementProto = Object.assign(Object.create(window.HTMLElement.prototype), componentProto);

			return doc.registerElement(name, { prototype: elementProto });
		}

		// TODO: Use Shadow DOM if available
		// Children don't make sense until the shadow dom is in place
		function createComponentPrototype(spec) {
			var render = spec.render;
			var reduce = spec.reduce;
			var onPropChange = spec.onPropChange;

			function queueRender(element) {
				var c = element._component;

				if (!c.renderPending) {
					c.renderPending = true;
					setImmediate(function () {
						return doRender(element);
					});
				}
			}

			function doRender(element) {
				var c = element._component;
				if (!c.renderPending) return;

				var vdom = render(createModel(element));
				// console.log('updateChildren', c.previousRender, vdom);
				c.previousRender = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_update_element_children__["updateChildren"])(element, c.previousRender, vdom);
				c.renderPending = false;
			}

			function createModel(componentElement) {
				var c = componentElement._component;

				return {
					root: componentElement,
					props: c.props,
					state: c.state,
					update: function update(type, payload) {
						c.state = reduce(c.state, { type: type, payload: payload });
						queueRender(componentElement);
						return c.state;
					},
					h: __WEBPACK_IMPORTED_MODULE_2_update_element_children__["h"]
				};
			}

			// TODO: take spec.props and create a setter for each one that changes our props
			// A setter only sets if the type is the same as the existing property
			var proto = {
				createdCallback: function createdCallback() {
					var _this = this;

					var initialProps = spec.props;

					var c = this._component = {
						renderPending: false,
						previousRender: null,
						initialProps: initialProps,
						props: _extends({}, initialProps),
						state: reduce(undefined, { type: '_#@init_action' })
					};

					// TODO: Add tests to ensure that these prop setters work
					// set when correct type
					// don't set when not
					// take initial values
					Object.defineProperties(this, __WEBPACK_IMPORTED_MODULE_3_object_map___default()(spec.props, function (_, name) {
						return {
							get: function get() {
								return this._component.props[name];
							},
							set: function set(newValue) {
								var c = this._component;
								var oldValue = c.props[name];
								if ((typeof oldValue === 'undefined' ? 'undefined' : _typeof(oldValue)) === (typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) && newValue !== oldValue) {
									c.props[name] = newValue;
									if (onPropChange) {
										onPropChange(createModel(this), name, previousValue, newValue);
									}
									queueRender(this);
								}
							}
						};
					}));

					eachAttributes(this.attributes, function (newValue, name) {
						var previousValue = c.props[name];
						_this.attributeChangedCallback(name, previousValue, newValue);
					});

					queueRender(this);
				},
				attributeChangedCallback: function attributeChangedCallback(name, previousValue, newValue) {
					//console.log('attributeChangedCallback', name, previousValue, newValue)
					// TODO: Test for this new behavior
					var c = this._component;
					var typeOfPreviousProp = _typeof(c.props[name]);
					if (typeOfPreviousProp === 'string') {
						c.props = _extends({}, c.props, _defineProperty({}, name, newValue));
					} else if (typeOfPreviousProp === 'number') {
						var numericalValue = parseFloat(newValue);
						if (!isNaN(numericalValue)) {
							c.props = _extends({}, c.props, _defineProperty({}, name, numericalValue));
						}
					}

					if (onPropChange) {
						onPropChange(createModel(this), name, previousValue, newValue);
					}

					queueRender(this);
				}
			};

			if (spec.onMount) {
				proto.attachedCallback = function () {
					spec.onMount(createModel(this));
				};
			}

			if (spec.onUnmount) {
				proto.detachedCallback = function () {
					spec.onUnmount(createModel(this));
				};
			}

			return proto;
		}

		function attributesToProps(attributes) {
			var props = {};
			eachAttributes(attributes, function (value, name) {
				props[name] = value;
			});
			return props;
		}

		function eachAttributes(attributes, fn) {
			var r = [];
			//console.log('attributes', attributes.length)
			for (var i = 0; i < attributes.length; i++) {
				var attr = attributes.item(i);
				//console.log('attr', attr)
				r.push(fn(attr.value, attr.name, attributes));
			}
			return r;
		}
		/* WEBPACK VAR INJECTION */
	}).call(exports, __webpack_require__(0).setImmediate);

	/***/
},
/* 8 */
/***/function (module, exports) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
  * Use typed arrays if we can
  */

	var FastArray = typeof Uint32Array === 'undefined' ? Array : Uint32Array;

	/**
  * Bit vector
  */

	function createBv(sizeInBits) {
		return new FastArray(Math.ceil(sizeInBits / 32));
	}

	function setBit(v, idx) {
		var r = idx % 32;
		var pos = (idx - r) / 32;

		v[pos] |= 1 << r;
	}

	function clearBit(v, idx) {
		var r = idx % 32;
		var pos = (idx - r) / 32;

		v[pos] &= ~(1 << r);
	}

	function getBit(v, idx) {
		var r = idx % 32;
		var pos = (idx - r) / 32;

		return !!(v[pos] & 1 << r);
	}

	/**
  * Exports
  */

	exports.createBv = createBv;
	exports.setBit = setBit;
	exports.clearBit = clearBit;
	exports.getBit = getBit;

	/***/
},
/* 9 */
/***/function (module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.REMOVE = exports.MOVE = exports.UPDATE = exports.CREATE = undefined;

	var _bitVector = __webpack_require__(8);

	/**
  * Actions
  */

	var CREATE = 0; /**
                  * Imports
                  */

	var UPDATE = 1;
	var MOVE = 2;
	var REMOVE = 3;

	/**
  * dift
  */

	function dift(prev, next, effect, key) {
		var pStartIdx = 0;
		var nStartIdx = 0;
		var pEndIdx = prev.length - 1;
		var nEndIdx = next.length - 1;
		var pStartItem = prev[pStartIdx];
		var nStartItem = next[nStartIdx];

		// List head is the same
		while (pStartIdx <= pEndIdx && nStartIdx <= nEndIdx && equal(pStartItem, nStartItem)) {
			effect(UPDATE, pStartItem, nStartItem, nStartIdx);
			pStartItem = prev[++pStartIdx];
			nStartItem = next[++nStartIdx];
		}

		// The above case is orders of magnitude more common than the others, so fast-path it
		if (nStartIdx > nEndIdx && pStartIdx > pEndIdx) {
			return;
		}

		var pEndItem = prev[pEndIdx];
		var nEndItem = next[nEndIdx];
		var movedFromFront = 0;

		// Reversed
		while (pStartIdx <= pEndIdx && nStartIdx <= nEndIdx && equal(pStartItem, nEndItem)) {
			effect(MOVE, pStartItem, nEndItem, pEndIdx - movedFromFront + 1);
			pStartItem = prev[++pStartIdx];
			nEndItem = next[--nEndIdx];
			++movedFromFront;
		}

		// Reversed the other way (in case of e.g. reverse and append)
		while (pEndIdx >= pStartIdx && nStartIdx <= nEndIdx && equal(nStartItem, pEndItem)) {
			effect(MOVE, pEndItem, nStartItem, nStartIdx);
			pEndItem = prev[--pEndIdx];
			nStartItem = next[++nStartIdx];
			--movedFromFront;
		}

		// List tail is the same
		while (pEndIdx >= pStartIdx && nEndIdx >= nStartIdx && equal(pEndItem, nEndItem)) {
			effect(UPDATE, pEndItem, nEndItem, nEndIdx);
			pEndItem = prev[--pEndIdx];
			nEndItem = next[--nEndIdx];
		}

		if (pStartIdx > pEndIdx) {
			while (nStartIdx <= nEndIdx) {
				effect(CREATE, null, nStartItem, nStartIdx);
				nStartItem = next[++nStartIdx];
			}

			return;
		}

		if (nStartIdx > nEndIdx) {
			while (pStartIdx <= pEndIdx) {
				effect(REMOVE, pStartItem);
				pStartItem = prev[++pStartIdx];
			}

			return;
		}

		var created = 0;
		var pivotDest = null;
		var pivotIdx = pStartIdx - movedFromFront;
		var keepBase = pStartIdx;
		var keep = (0, _bitVector.createBv)(pEndIdx - pStartIdx);

		var prevMap = keyMap(prev, pStartIdx, pEndIdx + 1, key);

		for (; nStartIdx <= nEndIdx; nStartItem = next[++nStartIdx]) {
			var oldIdx = prevMap[key(nStartItem)];

			if (isUndefined(oldIdx)) {
				effect(CREATE, null, nStartItem, pivotIdx++);
				++created;
			} else if (pStartIdx !== oldIdx) {
				(0, _bitVector.setBit)(keep, oldIdx - keepBase);
				effect(MOVE, prev[oldIdx], nStartItem, pivotIdx++);
			} else {
				pivotDest = nStartIdx;
			}
		}

		if (pivotDest !== null) {
			(0, _bitVector.setBit)(keep, 0);
			effect(MOVE, prev[pStartIdx], next[pivotDest], pivotDest);
		}

		// If there are no creations, then you have to
		// remove exactly max(prevLen - nextLen, 0) elements in this
		// diff. You have to remove one more for each element
		// that was created. This means once we have
		// removed that many, we can stop.
		var necessaryRemovals = prev.length - next.length + created;
		for (var removals = 0; removals < necessaryRemovals; pStartItem = prev[++pStartIdx]) {
			if (!(0, _bitVector.getBit)(keep, pStartIdx - keepBase)) {
				effect(REMOVE, pStartItem);
				++removals;
			}
		}

		function equal(a, b) {
			return key(a) === key(b);
		}
	}

	function isUndefined(val) {
		return typeof val === 'undefined';
	}

	function keyMap(items, start, end, key) {
		var map = {};

		for (var i = start; i < end; ++i) {
			map[key(items[i])] = i;
		}

		return map;
	}

	/**
  * Exports
  */

	exports.default = dift;
	exports.CREATE = CREATE;
	exports.UPDATE = UPDATE;
	exports.MOVE = MOVE;
	exports.REMOVE = REMOVE;

	/***/
},
/* 10 */
/***/function (module, exports) {

	// shim for using process in browser

	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	(function () {
		try {
			cachedSetTimeout = setTimeout;
		} catch (e) {
			cachedSetTimeout = function cachedSetTimeout() {
				throw new Error('setTimeout is not defined');
			};
		}
		try {
			cachedClearTimeout = clearTimeout;
		} catch (e) {
			cachedClearTimeout = function cachedClearTimeout() {
				throw new Error('clearTimeout is not defined');
			};
		}
	})();
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
		var timeout = cachedSetTimeout(cleanUpNextTick);
		draining = true;

		var len = queue.length;
		while (len) {
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
		cachedClearTimeout(timeout);
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
			cachedSetTimeout(drainQueue, 0);
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

	process.binding = function (name) {
		throw new Error('process.binding is not supported');
	};

	process.cwd = function () {
		return '/';
	};
	process.chdir = function (dir) {
		throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
		return 0;
	};

	/***/
},
/* 11 */
/***/function (module, exports, __webpack_require__) {

	"use strict";
	"use strict";

	var dift_1 = __webpack_require__(9);
	var util_1 = __webpack_require__(12);
	var h_1 = __webpack_require__(1);
	var types_1 = __webpack_require__(2);
	function updateChildren(parentNode, oldChildren, newChildren) {
		var oldVNodes = h_1.normalizeChildren(util_1.ensureArray(oldChildren));
		var newVNodes = h_1.normalizeChildren(util_1.ensureArray(newChildren));
		updateChildrenInternal(parentNode, oldVNodes, newVNodes);
		return newVNodes;
	}
	exports.updateChildren = updateChildren;
	function updateChildrenInternal(parentNode, oldChildren, newChildren) {
		dift_1.default(oldChildren, newChildren, function (editType, old, next, index) {
			repositionNode(parentNode, editType, old, next, index);
		}, getKey);
	}
	function getKey(item) {
		if (types_1.isVElement(item)) {
			var key = item.props['key'];
			if (typeof key === 'string') return key;
			return item.name + '_' + item.index.toString();
		}
		return '#text_' + item.index.toString();
	}
	function repositionNode(parentNode, editType, oldVNode, newVNode, index) {
		var indexNode = parentNode.childNodes[index] || null;
		switch (editType) {
			case dift_1.CREATE:
				parentNode.insertBefore(createDomNode(newVNode), indexNode);
				break;
			case dift_1.UPDATE:
				updateNode(indexNode, oldVNode, newVNode);
				break;
			case dift_1.MOVE:
				parentNode.insertBefore(updateNode(oldVNode.nodeRef, oldVNode, newVNode), indexNode);
				break;
			case dift_1.REMOVE:
				parentNode.removeChild(oldVNode.nodeRef);
				break;
		}
	}
	function updateNode(oldNode, oldVNode, newVNode) {
		if (oldNode instanceof Text && types_1.isVTextNode(newVNode)) {
			return updateText(oldNode, newVNode);
		}
		if (oldNode instanceof HTMLElement && types_1.isVElement(oldVNode) && types_1.isVElement(newVNode)) {
			return updateElement(oldNode, oldVNode, newVNode);
		}
		console.error('updateNode error', oldNode, oldVNode, newVNode);
		throw new Error('This should never happen');
	}
	function updateText(oldNode, newVNode) {
		oldNode.textContent = newVNode.text;
		newVNode.nodeRef = oldNode;
		return oldNode;
	}
	function updateElement(oldNode, oldVNode, newVNode) {
		updateProps(oldNode, oldVNode.props, newVNode.props);
		updateChildrenInternal(oldNode, oldVNode.children, newVNode.children);
		newVNode.nodeRef = oldNode;
		return oldNode;
	}
	function updateProps(element, oldPropsArg, newPropsArg) {
		var oldProps = util_1.clone(oldPropsArg);
		var newProps = util_1.clone(newPropsArg);
		for (var name_1 in newProps) {
			if (newProps[name_1] !== oldProps[name_1]) {
				addProp(element, name_1, newProps[name_1]);
			}
			delete oldProps[name_1];
		}
		for (var name_2 in oldProps) {
			removeProp(element, name_2);
		}
	}
	exports.updateProps = updateProps;
	function addProp(element, name, value) {
		if (name in element) {
			element[name] = value;
		} else {
			element.setAttribute(name, value);
		}
	}
	function removeProp(element, name) {
		if (name in element) {
			if (typeof element[name] === 'string') {
				element[name] = '';
			} else {
				element[name] = undefined;
			}
		} else {
			element.removeAttribute(name);
		}
	}
	function createDomNode(vnode, doc) {
		if (doc === void 0) {
			doc = document;
		}
		if (types_1.isVTextNode(vnode)) {
			var textNode = doc.createTextNode(vnode.text);
			vnode.nodeRef = textNode;
			return textNode;
		}
		var element = doc.createElement(vnode.name);
		vnode.nodeRef = element;
		updateProps(element, {}, vnode.props);
		vnode.children.map(function (vnode) {
			return createDomNode(vnode);
		}).forEach(function (node) {
			return element.appendChild(node);
		});
		return element;
	}

	/***/
},
/* 12 */
/***/function (module, exports) {

	"use strict";
	"use strict";

	function ensureArray(a) {
		if (Array.isArray(a)) return a;
		if (a) return [a];
		return [];
	}
	exports.ensureArray = ensureArray;
	function clone(a) {
		var r = {};
		for (var key in a) {
			r[key] = a[key];
		}
		return r;
	}
	exports.clone = clone;

	/***/
}
/******/]);

/***/ },
/* 1 */
/***/ function(module, exports) {

"use strict";
'use strict';

function nop(){}

module.exports = nop;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prux__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prux___default = __WEBPACK_IMPORTED_MODULE_0_prux__ && __WEBPACK_IMPORTED_MODULE_0_prux__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_prux__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_prux__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0_prux___default, 'a', __WEBPACK_IMPORTED_MODULE_0_prux___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__server__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__header__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__header___default = __WEBPACK_IMPORTED_MODULE_3__header__ && __WEBPACK_IMPORTED_MODULE_3__header__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_3__header__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_3__header__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_3__header___default, 'a', __WEBPACK_IMPORTED_MODULE_3__header___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__popular_pins__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__popular_pins___default = __WEBPACK_IMPORTED_MODULE_4__popular_pins__ && __WEBPACK_IMPORTED_MODULE_4__popular_pins__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_4__popular_pins__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_4__popular_pins__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_4__popular_pins___default, 'a', __WEBPACK_IMPORTED_MODULE_4__popular_pins___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__create_pin__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__create_pin___default = __WEBPACK_IMPORTED_MODULE_5__create_pin__ && __WEBPACK_IMPORTED_MODULE_5__create_pin__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_5__create_pin__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_5__create_pin__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_5__create_pin___default, 'a', __WEBPACK_IMPORTED_MODULE_5__create_pin___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login___default = __WEBPACK_IMPORTED_MODULE_6__login__ && __WEBPACK_IMPORTED_MODULE_6__login__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_6__login__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_6__login__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_6__login___default, 'a', __WEBPACK_IMPORTED_MODULE_6__login___default);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };









__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__router__["a" /* registerRouter */])('grimterist-app', {
	onPathSet: function onPathSet(_ref) {
		var path = _ref.path;
		var state = _ref.state;
		var update = _ref.update;

		if (path === '/') {
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__server__["a" /* getJson */])('/api/pins').then(function (pins) {
				return update('SET_PINS', pins);
			});
		} else if (path === '/create' && !state.user) {
			window.history.replaceState(null, '', '/login');
		}
	},
	render: function render(_ref2) {
		var h = _ref2.h;
		var path = _ref2.path;
		var state = _ref2.state;

		console.log('app path', path);
		var pages = [{ name: 'Latest', path: '/' }, { name: 'Create', path: '/create', left: true }, { name: 'Login', path: '/login' }];
		var body = void 0;
		if (path === '/') {
			//console.log('app state', state)
			body = h('popular-pins', { pins: state.pins });
			pages[0].active = true;
		} else if (path === '/create') {
			body = h('create-pin', null);
			pages[1].active = true;
		} else if (path === '/login') {
			body = h('login-form', { user: state.user });
			pages[2].active = true;
		} else {
			body = 'Page not found';
		}
		console.log('body', body);

		return [h('grimterist-header', {
			loggedIn: false,
			displayName: null,
			onLogin: function onLogin() {
				horizon.authEndpoint('twitter').subscribe(function (path) {
					return location.assign(path);
				});
			},
			onLogout: function onLogout() {
				Horizon.clearAuthTokens();
			},
			pages: pages
		}), body];
	},
	reduce: function reduce() {
		var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
		var _ref3 = arguments[1];
		var type = _ref3.type;
		var payload = _ref3.payload;

		switch (type) {
			case 'SET_PINS':
				return _extends({}, state, { pins: payload });
			case 'SET_USER':
				return _extends({}, state, { user: payload });
			default:
				return state;
		}
	}
});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prux__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prux___default = __WEBPACK_IMPORTED_MODULE_0_prux__ && __WEBPACK_IMPORTED_MODULE_0_prux__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_prux__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_prux__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0_prux___default, 'a', __WEBPACK_IMPORTED_MODULE_0_prux___default);


__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_prux__["registerComponent"])('create-pin', {
	props: {},
	render: function render(_ref) {
		var h = _ref.h;
		var props = _ref.props;

		return h(
			'div',
			null,
			h(
				'div',
				{ 'class': 'control' },
				h('input', { 'class': 'input', placeholder: 'Image URL', type: 'url' })
			),
			h(
				'div',
				{ 'class': 'control' },
				h('textarea', { 'class': 'textarea', placeholder: 'Description' })
			),
			h(
				'div',
				{ 'class': 'control' },
				h(
					'button',
					{ 'class': 'button is-primary' },
					'Create'
				)
			)
		);
	}
});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prux__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prux___default = __WEBPACK_IMPORTED_MODULE_0_prux__ && __WEBPACK_IMPORTED_MODULE_0_prux__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_prux__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_prux__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0_prux___default, 'a', __WEBPACK_IMPORTED_MODULE_0_prux___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nop__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nop___default = __WEBPACK_IMPORTED_MODULE_1_nop__ && __WEBPACK_IMPORTED_MODULE_1_nop__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_nop__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_nop__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1_nop___default, 'a', __WEBPACK_IMPORTED_MODULE_1_nop___default);



var noUnderline = {
	textDecoration: 'none',
	color: '#fff'
};

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_prux__["registerComponent"])('grimterist-header', {
	props: {
		loggedIn: false,
		displayName: '',
		onLogin: __WEBPACK_IMPORTED_MODULE_1_nop___default.a,
		onLogout: __WEBPACK_IMPORTED_MODULE_1_nop___default.a,
		pages: []
	},
	render: function render(_ref) {
		var h = _ref.h;
		var pages = _ref.props.pages;

		return h(
			'nav',
			{ 'class': 'nav has-shadow' },
			h(
				'a',
				{ 'class': 'nav-item title', href: '/', style: 'margin:0;' },
				'Grimterist'
			),
			pages.map(function (page) {
				return h(
					'a',
					{
						key: page.path,
						href: page.path,
						'class': 'nav-item is-tab ' + (page.active ? 'is-active' : ''),
						style: page.left ? 'margin-left:auto;' : ''
					},
					page.name
				);
			})
		);
	}
});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prux__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prux___default = __WEBPACK_IMPORTED_MODULE_0_prux__ && __WEBPACK_IMPORTED_MODULE_0_prux__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_prux__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_prux__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0_prux___default, 'a', __WEBPACK_IMPORTED_MODULE_0_prux___default);


__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_prux__["registerComponent"])('login-form', {
	props: { user: null },
	render: function render(_ref) {
		var h = _ref.h;
		var props = _ref.props;

		if (props.user) {
			return h(
				'div',
				{ style: 'text-align:center;padding-top:100px;' },
				'You are already logged in'
			);
		}

		return h(
			'div',
			{ style: 'text-align:center;padding-top:100px;' },
			h(
				'button',
				{ 'class': 'button is-primary is-large' },
				h(
					'span',
					{ 'class': 'icon ' },
					h('i', { 'class': 'fa fa-twitter' })
				),
				'  Login with Twitter'
			)
		);
	}
});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prux__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prux___default = __WEBPACK_IMPORTED_MODULE_0_prux__ && __WEBPACK_IMPORTED_MODULE_0_prux__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_prux__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_prux__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0_prux___default, 'a', __WEBPACK_IMPORTED_MODULE_0_prux___default);


__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_prux__["registerComponent"])('pin-card', {
	props: { pin: {} },
	render: function render(_ref) {
		var h = _ref.h;
		var pin = _ref.props.pin;
		var id = pin.id;
		var imageUrl = pin.imageUrl;
		var text = pin.text;
		var posterName = pin.posterName;
		var posterAvatar = pin.posterAvatar;

		var postTime = new Date(pin.postTime);

		return h(
			'a',
			{ 'class': 'card', href: '/pins/' + id },
			h(
				'div',
				{ 'class': 'card-image' },
				h(
					'figure',
					{ 'class': 'image' },
					h('img', { src: imageUrl })
				)
			),
			h(
				'div',
				{ 'class': 'card-content' },
				h(
					'div',
					{ 'class': 'media', style: 'align-items:center;' },
					h(
						'div',
						{ 'class': 'media-left' },
						h(
							'figure',
							{ 'class': 'image is-32x32' },
							h('img', { src: posterAvatar })
						)
					),
					h(
						'div',
						{ 'class': 'media-content' },
						h(
							'div',
							{ 'class': 'content' },
							h(
								'p',
								{ 'class': 'title is-5' },
								posterName
							)
						)
					)
				),
				h(
					'div',
					{ 'class': 'content' },
					text,
					h(
						'small',
						null,
						postTime.toLocaleTimeString(),
						' - ',
						postTime.toLocaleDateString()
					)
				)
			)
		);
	}
});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prux__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prux___default = __WEBPACK_IMPORTED_MODULE_0_prux__ && __WEBPACK_IMPORTED_MODULE_0_prux__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_prux__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_prux__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0_prux___default, 'a', __WEBPACK_IMPORTED_MODULE_0_prux___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pin_card__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pin_card___default = __WEBPACK_IMPORTED_MODULE_1__pin_card__ && __WEBPACK_IMPORTED_MODULE_1__pin_card__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__pin_card__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__pin_card__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__pin_card___default, 'a', __WEBPACK_IMPORTED_MODULE_1__pin_card___default);



__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_prux__["registerComponent"])('popular-pins', {
	props: { pins: [] },
	render: function render(_ref) {
		var h = _ref.h;
		var pins = _ref.props.pins;

		return pins.map(function (pin) {
			return h('pin-card', { pin: pin });
		});
	}
});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_app__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_app___default = __WEBPACK_IMPORTED_MODULE_0__components_app__ && __WEBPACK_IMPORTED_MODULE_0__components_app__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__components_app__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__components_app__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__components_app___default, 'a', __WEBPACK_IMPORTED_MODULE_0__components_app___default);


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prux__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prux___default = __WEBPACK_IMPORTED_MODULE_0_prux__ && __WEBPACK_IMPORTED_MODULE_0_prux__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_prux__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_prux__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0_prux___default, 'a', __WEBPACK_IMPORTED_MODULE_0_prux___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nop__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nop___default = __WEBPACK_IMPORTED_MODULE_1_nop__ && __WEBPACK_IMPORTED_MODULE_1_nop__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_nop__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_nop__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1_nop___default, 'a', __WEBPACK_IMPORTED_MODULE_1_nop___default);
/* harmony export */ exports["a"] = registerRouter;var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




function registerRouter(name, routerSpec) {
	routerSpec = _extends({
		onPathSet: __WEBPACK_IMPORTED_MODULE_1_nop___default.a,
		reduce: __WEBPACK_IMPORTED_MODULE_1_nop___default.a,
		onMount: __WEBPACK_IMPORTED_MODULE_1_nop___default.a,
		onUnmount: __WEBPACK_IMPORTED_MODULE_1_nop___default.a
	}, routerSpec);

	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_prux__["registerComponent"])(name, {
		onMount: function onMount(_ref) {
			var root = _ref.root;
			var state = _ref.state;
			var update = _ref.update;

			var popHandler = function popHandler() {
				var path = location.pathname;
				var state = update();
				console.log('popHandler', path, state);
				routerSpec.onPathSet({ update: update, state: state, path: path });
				update('_@ROUTER_SET_PATH', path);
			};

			var linkHandler = function linkHandler(e) {
				var el = e.target;
				if (el.localName === 'a' && el.origin === location.origin) {
					e.preventDefault();
					var pathname = el.pathname;

					window.history.pushState(null, '', el.href);
					popHandler();
				}
			};

			root.addEventListener('click', linkHandler, true);
			window.addEventListener('popstate', popHandler);
			update('_@ROUTER_SET_HANDLERS', { popHandler: popHandler, linkHandler: linkHandler });
			routerSpec.onMount({
				state: state,
				path: state._router.path,
				update: update
			});
			popHandler();
		},
		render: function render(_ref2) {
			var h = _ref2.h;
			var state = _ref2.state;

			return routerSpec.render({
				h: h,
				path: state._router.path,
				state: state
			});
		},
		reduce: function reduce() {
			var state = arguments.length <= 0 || arguments[0] === undefined ? { _router: { path: '/' } } : arguments[0];
			var _ref3 = arguments[1];
			var type = _ref3.type;
			var payload = _ref3.payload;

			switch (type) {
				case '_@ROUTER_SET_HANDLERS':
					return _extends({}, state, {
						_router: _extends({}, state._router, payload)
					});
				case '_@ROUTER_SET_PATH':
					return _extends({}, state, {
						_router: _extends({}, state._router, {
							path: payload
						})
					});
				default:
					return routerSpec.reduce(state, { type: type, payload: payload });
			}
		},
		onUnmount: function onUnmount(_ref4) {
			var root = _ref4.root;
			var state = _ref4.state;

			window.removeEventListener('popstate', state._router.popHandler);
			root.removeEventListener('click', state._router.linkHandler, true);
			routerSpec.onUnmount({
				state: state,
				path: state._router.path
			});
		}
	});
}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_whatwg_fetch__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_whatwg_fetch___default = __WEBPACK_IMPORTED_MODULE_0_whatwg_fetch__ && __WEBPACK_IMPORTED_MODULE_0_whatwg_fetch__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_whatwg_fetch__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_whatwg_fetch__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0_whatwg_fetch___default, 'a', __WEBPACK_IMPORTED_MODULE_0_whatwg_fetch___default);
/* harmony export */ exports["a"] = getJson;

function getJson(path) {
	return fetch(path).then(function (res) {
		return res.json();
	});
}

/***/ },
/* 11 */
/***/ function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var list = this.map[name]
    if (!list) {
      list = []
      this.map[name] = list
    }
    list.push(value)
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    var values = this.map[normalizeName(name)]
    return values ? values[0] : null
  }

  Headers.prototype.getAll = function(name) {
    return this.map[normalizeName(name)] || []
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)]
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function(name) {
      this.map[name].forEach(function(value) {
        callback.call(thisArg, value, name, this)
      }, this)
    }, this)
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    reader.readAsArrayBuffer(blob)
    return fileReaderReady(reader)
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    reader.readAsText(blob)
    return fileReaderReady(reader)
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (!body) {
        this._bodyText = ''
      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
        // Only support ArrayBuffers for POST method.
        // Receiving ArrayBuffers happens via Blobs, instead.
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        return this.blob().then(readBlobAsArrayBuffer)
      }

      this.text = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text')
        } else {
          return Promise.resolve(this._bodyText)
        }
      }
    } else {
      this.text = function() {
        var rejected = consumed(this)
        return rejected ? rejected : Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body
    if (Request.prototype.isPrototypeOf(input)) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = input
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this)
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function headers(xhr) {
    var head = new Headers()
    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
    pairs.forEach(function(header) {
      var split = header.trim().split(':')
      var key = split.shift().trim()
      var value = split.join(':').trim()
      head.append(key, value)
    })
    return head
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = options.statusText
    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request
      if (Request.prototype.isPrototypeOf(input) && !init) {
        request = input
      } else {
        request = new Request(input, init)
      }

      var xhr = new XMLHttpRequest()

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL
        }

        // Avoid security warnings on getResponseHeader when not allowed by CORS
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL')
        }

        return
      }

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: headers(xhr),
          url: responseURL()
        }
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map