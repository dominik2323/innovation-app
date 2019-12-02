webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _components_Intro__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Intro */ "./components/Intro.js");
/* harmony import */ var _components_About__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/About */ "./components/About.js");
/* harmony import */ var _components_Innovation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/Innovation */ "./components/Innovation.js");
/* harmony import */ var _components_View__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/View */ "./components/View.js");
/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/Header */ "./components/Header.js");
/* harmony import */ var _components_Login__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/Login */ "./components/Login.js");
/* harmony import */ var _helpers_fetchData__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../helpers/fetchData */ "./helpers/fetchData.js");
/* harmony import */ var _helpers_consts__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../helpers/consts */ "./helpers/consts.js");
/* harmony import */ var _store_actions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../store/actions */ "./store/actions.js");
/* harmony import */ var _helpers_dataContext__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../helpers/dataContext */ "./helpers/dataContext.js");
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../scss/index.scss */ "./scss/index.scss");
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_scss_index_scss__WEBPACK_IMPORTED_MODULE_14__);


var _jsxFileName = "C:\\Users\\Dominik\\Documents\\__DEV__\\SKODA\\pages\\index.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;






 // import { withRedux } from "../helpers/withRedux";







var Index = function Index() {
  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useDispatch"])();
  var isUserLogged = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useSelector"])(function (state) {
    return state.isUserLogged;
  });

  var _React$useContext = react__WEBPACK_IMPORTED_MODULE_2___default.a.useContext(_helpers_dataContext__WEBPACK_IMPORTED_MODULE_13__["DataContext"]),
      innovations = _React$useContext.innovations;

  return isUserLogged ? __jsx(_components_View__WEBPACK_IMPORTED_MODULE_7__["default"], {
    variants: _helpers_consts__WEBPACK_IMPORTED_MODULE_11__["VARIANTS"].PAGES.INTRO // onAnimationComplete={() => dispatch(resetApp())}
    ,
    style: {
      width: "calc(100vw + ((100vh - 60px) / 10))"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: this
  }, __jsx(_components_Header__WEBPACK_IMPORTED_MODULE_8__["default"], {
    descriptor: "",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  }), __jsx(_components_Intro__WEBPACK_IMPORTED_MODULE_4__["default"], {
    key: "Intro",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: this
  })) : __jsx(_components_Login__WEBPACK_IMPORTED_MODULE_9__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    },
    __self: this
  });
};

Index.getInitialProps =
/*#__PURE__*/
function () {
  var _ref2 = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(
  /*#__PURE__*/
  _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(_ref) {
    var req, data;
    return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            req = _ref.req;
            _context.next = 3;
            return Object(_helpers_fetchData__WEBPACK_IMPORTED_MODULE_10__["fetchData"])(req);

          case 3:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();

/* harmony default export */ __webpack_exports__["default"] = (Index);

/***/ })

})
//# sourceMappingURL=index.js.206c3cadbc8941bdb682.hot-update.js.map