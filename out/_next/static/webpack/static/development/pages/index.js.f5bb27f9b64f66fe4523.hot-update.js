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
/* harmony import */ var es6_promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! es6-promise */ "./node_modules/es6-promise/dist/es6-promise.js");
/* harmony import */ var es6_promise__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(es6_promise__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! isomorphic-fetch */ "./node_modules/isomorphic-fetch/fetch-npm-browserify.js");
/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(isomorphic_fetch__WEBPACK_IMPORTED_MODULE_3__);


// import absoluteUrl from "next-absolute-url";
// const fetch = require("node-fetch");


function fetchData(_x) {
  return _fetchData.apply(this, arguments);
}

function _fetchData() {
  _fetchData = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(
  /*#__PURE__*/
  _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(req) {
    var dev, baseUrl, apiURL, fetchInnovations, innovationsData, fetchHumans, humansData, fetchAbout, aboutData;
    return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dev = "development" !== "production"; // const { protocol, host } = absoluteUrl(req);

            baseUrl = dev ? "http://localhost:3000" : "https://inolog.cz";

            apiURL = function apiURL(api) {
              return "".concat(baseUrl, "/api/").concat(api);
            };

            _context.next = 5;
            return isomorphic_fetch__WEBPACK_IMPORTED_MODULE_3___default()(apiURL("innovations"));

          case 5:
            fetchInnovations = _context.sent;
            _context.next = 8;
            return fetchInnovations.json();

          case 8:
            innovationsData = _context.sent;
            _context.next = 11;
            return isomorphic_fetch__WEBPACK_IMPORTED_MODULE_3___default()(apiURL("humans"));

          case 11:
            fetchHumans = _context.sent;
            _context.next = 14;
            return fetchHumans.json();

          case 14:
            humansData = _context.sent;
            _context.next = 17;
            return isomorphic_fetch__WEBPACK_IMPORTED_MODULE_3___default()(apiURL("about"));

          case 17:
            fetchAbout = _context.sent;
            _context.next = 20;
            return fetchAbout.json();

          case 20:
            aboutData = _context.sent;
            return _context.abrupt("return", {
              innovations: innovationsData,
              humans: humansData,
              about: aboutData
            });

          case 22:
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
//# sourceMappingURL=index.js.f5bb27f9b64f66fe4523.hot-update.js.map