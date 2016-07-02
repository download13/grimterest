/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models__ = __webpack_require__(7);


/* harmony default export */ exports["a"] = function (app) {
	app.get('/api/pins', function (req, res) {
		var page = parseInt(req.query.page);
		var validatedPage = isNaN(page) ? 0 : page;

		__WEBPACK_IMPORTED_MODULE_0__models__["a" /* Pin */].query().page(validatedPage, 20).eager('poster').then(function (_ref) {
			var pins = _ref.results;

			var publicPins = pins.map(toPublicPin);
			console.log('api pins', publicPins);
			res.send(publicPins);
		});
	});
};

function toPublicPin(pin) {
	return {
		id: pin.id,
		posterName: pin.poster.name,
		posterAvatar: pin.poster.avatarUrl,
		imageUrl: pin.imageUrl,
		text: pin.text,
		postTime: pin.postTime
	};
}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_flutter__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_flutter___default = __WEBPACK_IMPORTED_MODULE_0_flutter__ && __WEBPACK_IMPORTED_MODULE_0_flutter__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_flutter__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_flutter__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0_flutter___default, 'a', __WEBPACK_IMPORTED_MODULE_0_flutter___default);


/* harmony default export */ exports["a"] = function (app) {
	var flutter = new __WEBPACK_IMPORTED_MODULE_0_flutter___default.a({
		consumerKey: '4zzYqkTfnkRUU0a0LcKww59lB',
		consumerSecret: 'udTG4ExrnUidi6vZjs3FlQbliozp94y6SejHY3n33qm2deKVhS',
		loginCallback: 'http://127.0.0.1/auth/twitter/callback',
		authCallback: function authCallback(req, res, next) {
			if (req.error) {
				console.error(req.error);
				res.status(500).send(req.error);
				return;
			}

			var accessToken = req.session.oauthAccessToken;
			var secret = req.session.oauthAccessTokenSecret;
			console.log(req.session);

			// TODO: Store token and secret
			res.redirect('/');
		},

		cache: false
	});

	app.get('/auth/twitter', flutter.connect);
	app.get('/auth/twitter/callback', flutter.auth);
};

/***/ },
/* 2 */
/***/ function(module, exports) {

module.exports = require("body-parser");

/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = require("express");

/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = require("path");

/***/ },
/* 5 */
/***/ function(module, exports) {

var seeds = {
	directory: './storage/seeds'
};
var migrations = {
	directory: './storage/migrations'
};

module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: './storage/data/db-dev.sqlite3'
		},
		seeds: seeds,
		migrations: migrations
	},
	production: {
		client: 'sqlite3',
		connection: {
			filename: './storage/data/db.sqlite3'
		},
		seeds: seeds,
		migrations: migrations
	}
};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path___default = __WEBPACK_IMPORTED_MODULE_0_path__ && __WEBPACK_IMPORTED_MODULE_0_path__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_path__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_path__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0_path___default, 'a', __WEBPACK_IMPORTED_MODULE_0_path___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __WEBPACK_IMPORTED_MODULE_1_express__ && __WEBPACK_IMPORTED_MODULE_1_express__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_express__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_express__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1_express___default, 'a', __WEBPACK_IMPORTED_MODULE_1_express___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_body_parser__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_body_parser___default = __WEBPACK_IMPORTED_MODULE_2_body_parser__ && __WEBPACK_IMPORTED_MODULE_2_body_parser__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2_body_parser__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2_body_parser__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_2_body_parser___default, 'a', __WEBPACK_IMPORTED_MODULE_2_body_parser___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_twitter__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api__ = __webpack_require__(0);






var DEV = process.env.NODE_ENV !== 'production';
var PUBLIC_PATH = __WEBPACK_IMPORTED_MODULE_0_path___default.a.resolve(process.cwd(), 'dist/client');

var app = __WEBPACK_IMPORTED_MODULE_1_express___default()().use(__WEBPACK_IMPORTED_MODULE_1_express___default.a.static(PUBLIC_PATH)).use(__WEBPACK_IMPORTED_MODULE_2_body_parser___default.a.json()).set('x-powered-by', false);

app.get('/', serveApp);
app.get('/login', serveApp);
app.get('/user', serveApp);
app.get('/user/:id', serveApp);
app.get('/create', serveApp);
app.get('/grim/:id', serveApp);

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__auth_twitter__["a" /* default */])(app);
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__api__["a" /* default */])(app);

app.listen(80, function () {
	return console.log('Listening' + (DEV ? ' dev' : ''));
});

function serveApp(req, res) {
	res.sendFile('index.html', { root: PUBLIC_PATH });
}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__knexfile__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__knexfile___default = __WEBPACK_IMPORTED_MODULE_0__knexfile__ && __WEBPACK_IMPORTED_MODULE_0__knexfile__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__knexfile__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__knexfile__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__knexfile___default, 'a', __WEBPACK_IMPORTED_MODULE_0__knexfile___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_knex__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_knex___default = __WEBPACK_IMPORTED_MODULE_1_knex__ && __WEBPACK_IMPORTED_MODULE_1_knex__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_knex__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_knex__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1_knex___default, 'a', __WEBPACK_IMPORTED_MODULE_1_knex___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_objection__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_objection___default = __WEBPACK_IMPORTED_MODULE_2_objection__ && __WEBPACK_IMPORTED_MODULE_2_objection__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2_objection__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2_objection__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_2_objection___default, 'a', __WEBPACK_IMPORTED_MODULE_2_objection___default);
/* unused harmony export User */
/* harmony export */ __webpack_require__.d(exports, "a", function() { return Pin; });var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var DEV = process.env.NODE_ENV !== 'production';

__WEBPACK_IMPORTED_MODULE_2_objection__["Model"].knex(__WEBPACK_IMPORTED_MODULE_1_knex___default()(DEV ? __WEBPACK_IMPORTED_MODULE_0__knexfile__.development : __WEBPACK_IMPORTED_MODULE_0__knexfile__.production));

var User = function (_Model) {
	_inherits(User, _Model);

	function User() {
		_classCallCheck(this, User);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(User).apply(this, arguments));
	}

	return User;
}(__WEBPACK_IMPORTED_MODULE_2_objection__["Model"]);

User.tableName = 'users';
User.jsonSchema = {
	type: 'object',
	required: ['id', 'email'],
	properties: {
		id: { type: 'string' },
		name: { type: 'string' },
		email: { type: 'email' },
		avatarUrl: { type: 'uri' }
	}
};
User.relationMappings = {
	posts: {
		relation: __WEBPACK_IMPORTED_MODULE_2_objection__["Model"].HasManyRelation,
		modelClass: Pin,
		join: {
			from: 'users.id',
			to: 'pins.poster'
		}
	}
};
var Pin = function (_Model2) {
	_inherits(Pin, _Model2);

	function Pin() {
		_classCallCheck(this, Pin);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Pin).apply(this, arguments));
	}

	_createClass(Pin, [{
		key: 'poster',
		value: function poster() {
			return this.belongsTo(User, 'poster');
		}
	}]);

	return Pin;
}(__WEBPACK_IMPORTED_MODULE_2_objection__["Model"]);

Pin.tableName = 'pins';
Pin.jsonSchema = {
	type: 'object',
	required: ['id', 'postTime'],
	properties: {
		id: { type: 'string' },
		imageUrl: { type: 'uri' },
		text: { type: 'string' },
		postTime: { type: 'integer' },
		posterId: { type: 'string' }
	}
};
Pin.relationMappings = {
	poster: {
		relation: __WEBPACK_IMPORTED_MODULE_2_objection__["Model"].BelongsToOneRelation,
		modelClass: User,
		join: {
			from: 'pins.posterId',
			to: 'users.id'
		}
	}
};
User.relationMappings.posts.modelClass = Pin;

/***/ },
/* 8 */
/***/ function(module, exports) {

module.exports = require("flutter");

/***/ },
/* 9 */
/***/ function(module, exports) {

module.exports = require("knex");

/***/ },
/* 10 */
/***/ function(module, exports) {

module.exports = require("objection");

/***/ }
/******/ ]);