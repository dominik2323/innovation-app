webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./helpers/dataContext.js":
/*!********************************!*\
  !*** ./helpers/dataContext.js ***!
  \********************************/
/*! exports provided: DataContext, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataContext", function() { return DataContext; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../data */ "./data/index.js");

var _jsxFileName = "C:\\Users\\Dominik\\Documents\\__DEV__\\SKODA\\helpers\\dataContext.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;

var DataContext = react__WEBPACK_IMPORTED_MODULE_1___default.a.createContext();

var DataContextProvider = function DataContextProvider(_ref) {
  var children = _ref.children,
      innovations = _ref.innovations,
      humans = _ref.humans,
      about = _ref.about;
  console.log("DataContextProvider", innovations, humans, about);
  var humanData = humans.results.map(function (human) {
    return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, human.data, {
      id: human.id,
      uid: human.uid
    });
  });
  var innovationsData = innovations.results.map(function (innovation) {
    return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, innovation.data, {
      id: innovation.id,
      uid: innovation.uid
    });
  });
  var aboutData = about;
  return __jsx(DataContext.Provider, {
    value: {
      components: _data__WEBPACK_IMPORTED_MODULE_2__["default"].components,
      humans: humanData,
      innovations: innovationsData,
      about: aboutData
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  }, children);
};

/* harmony default export */ __webpack_exports__["default"] = (DataContextProvider);

/***/ })

})
//# sourceMappingURL=index.js.011c1bda4b1d20804d15.hot-update.js.map