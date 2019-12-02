webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./helpers/fetchData.js":
/*!******************************!*\
  !*** ./helpers/fetchData.js ***!
  \******************************/
/*! exports provided: fetchData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchData", function() { return fetchData; });
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js");
/* harmony import */ var next_absolute_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-absolute-url */ "./node_modules/next-absolute-url/index.js");
/* harmony import */ var next_absolute_url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_absolute_url__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var es6_promise__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! es6-promise */ "./node_modules/es6-promise/dist/es6-promise.js");
/* harmony import */ var es6_promise__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(es6_promise__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! isomorphic-fetch */ "./node_modules/isomorphic-fetch/fetch-npm-browserify.js");
/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(isomorphic_fetch__WEBPACK_IMPORTED_MODULE_4__);


 // const fetch = require("node-fetch");



function fetchData(_x) {
  return _fetchData.apply(this, arguments);
}

function _fetchData() {
  _fetchData = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(
  /*#__PURE__*/
  _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(req) {
    var _absoluteUrl, protocol, host, apiURL, fetchInnovations, innovationsData, fetchHumans, humansData, fetchAbout, aboutData;

    return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _absoluteUrl = next_absolute_url__WEBPACK_IMPORTED_MODULE_2___default()(req), protocol = _absoluteUrl.protocol, host = _absoluteUrl.host;

            apiURL = function apiURL(api) {
              return "".concat(protocol, "//").concat(host, "/api/").concat(api);
            };

            _context.next = 4;
            return isomorphic_fetch__WEBPACK_IMPORTED_MODULE_4___default()(apiURL("innovations"));

          case 4:
            fetchInnovations = _context.sent;
            _context.next = 7;
            return fetchInnovations.json();

          case 7:
            innovationsData = _context.sent;
            _context.next = 10;
            return isomorphic_fetch__WEBPACK_IMPORTED_MODULE_4___default()(apiURL("humans"));

          case 10:
            fetchHumans = _context.sent;
            _context.next = 13;
            return fetchHumans.json();

          case 13:
            humansData = _context.sent;
            _context.next = 16;
            return isomorphic_fetch__WEBPACK_IMPORTED_MODULE_4___default()(apiURL("about"));

          case 16:
            fetchAbout = _context.sent;
            _context.next = 19;
            return fetchAbout.json();

          case 19:
            aboutData = _context.sent;
            return _context.abrupt("return", {
              innovations: innovationsData,
              humans: humansData,
              about: aboutData
            });

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetchData.apply(this, arguments);
}

/***/ })

})
//# sourceMappingURL=index.js.c596c8aae5527a29391c.hot-update.js.map