(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"+SFK":function(t,e,n){n("AUvm"),n("wgeU"),n("adOz"),n("dl0q"),t.exports=n("WEpk").Symbol},"+plK":function(t,e,n){n("ApPD"),t.exports=n("WEpk").Object.getPrototypeOf},"1TCz":function(t,e,n){"use strict";n.r(e);var r=n("ln6h"),o=n.n(r),a=n("O40h"),i=n("kOwS");var c=n("hfKm"),u=n.n(c);function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),u()(t,r.key,r)}}var l=n("XVgq"),f=n.n(l),p=n("Z7t5"),d=n.n(p);function b(t){return(b="function"===typeof d.a&&"symbol"===typeof f.a?function(t){return typeof t}:function(t){return t&&"function"===typeof d.a&&t.constructor===d.a&&t!==d.a.prototype?"symbol":typeof t})(t)}function h(t){return(h="function"===typeof d.a&&"symbol"===b(f.a)?function(t){return b(t)}:function(t){return t&&"function"===typeof d.a&&t.constructor===d.a&&t!==d.a.prototype?"symbol":b(t)})(t)}function v(t,e){return!e||"object"!==h(e)&&"function"!==typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}var y=n("Bhuq"),_=n.n(y),w=n("TRZx"),g=n.n(w);function m(t){return(m=g.a?_.a:function(t){return t.__proto__||_()(t)})(t)}var O=n("SqZg"),j=n.n(O);function S(t,e){return(S=g.a||function(t,e){return t.__proto__=e,t})(t,e)}var x=n("q1tI"),P=n.n(x),E=n("ZMKu"),k=(n("k8BU"),n("doui")),N=n("xF2T"),C=n.n(N),I=n("qzSc"),A=n("/MKj"),T=(n("YNhk"),n("Qn3X")),M=n("loJ+"),X=n("UGkd"),D=P.a.createElement,U={initial:{opacity:0,transition:{duration:.3}},enter:{opacity:1,transition:{duration:.3}},exit:{opacity:0,transition:{duration:.3}}},K=function(){var t=Object(A.b)(),e=P.a.useState(""),n=Object(k.a)(e,2),r=n[0],o=n[1],a=P.a.useState([]),i=Object(k.a)(a,2),c=i[0],u=i[1],s=P.a.useContext(M.a),l=s.innovations,f=s.humans;return P.a.useEffect(function(){if(r.length>2){var t=new RegExp(r,"i"),e=function(e){return t.test(e)},n=f.filter(function(t){var n=t.name;return e(n)}).map(function(t){return t.id}),o=l.filter(function(t){var r=t.innovationname,o=t.about,a=t.authors,i=e(r[0].text),c=o.reduce(function(t,n){return"string"===typeof n.text&&e(n.text)||t},!1),u=a.reduce(function(t,e){return n.includes(e.id)||t},!1);return i||c||u});u(o)}else u([])},[r]),D("section",{className:"search"},D("input",{type:"text",value:r,autoFocus:!0,onChange:function(t){return o(t.target.value)}}),D(E.a,null,r.length>2&&D(E.b.div,{className:"search__list",variants:U,initial:"initial",animate:"enter",exit:"exit"},D("h1",null,"V\xfdsledky hled\xe1n\xed"),D("p",null,"Po\u010det v\xfdsledk\u016f: ".concat(c.length)),D("div",{className:"search__list__close",onClick:function(){return t(Object(I.h)(!1))}}),c.length>0?D(X.a,{vTrackStyle:{right:50,top:0,left:"initial"}},c.map(function(e){var n=e.innovationname,r=e.id,a=e.uid;return D("h3",{onClick:function(){o(""),t(Object(I.j)("half")),t(Object(I.h)(!1)),t(Object(I.g)(!1)),t(Object(I.i)(!1)),C.a.push({pathname:"/innovations",query:{id:a}})},key:r},n[0].text)})):D(T.a,{src:"/static/icons/sadCactus.svg"}))))},q=n("H4F0"),z=P.a.createElement,F=function(t){var e=Object(i.a)({},t);return z(E.b.div,Object(i.a)({initial:{opacity:0},animate:{opacity:1},exit:{opacity:0,transition:{delay:1.5}},className:"popup"},e),"Odkaz zkop\xedrov\xe1n do schr\xe1nky")},H=function(t){return function(){t(Object(I.d)(0)),t(Object(I.j)("hide")),t(Object(I.h)(!1)),t(Object(I.g)(!1)),t(Object(I.f)(!1)),C.a.push({pathname:"/innovations"})}},R=function(t){return function(e){console.log(e),t(Object(I.f)(!1)),t(Object(I.d)(0)),t(Object(I.j)("half")),t(Object(I.h)(!1)),t(Object(I.g)(!1)),C.a.push({pathname:"/innovations",query:{id:e}})}},V=function(t){t.setScreen;var e=P.a.useContext(M.a),n=e.components,r=e.innovations,o=(e.humans,Object(A.c)(function(t){return t})),a=o.activeInnovationId,i=o.showNavbarSearch,c=(o.showNavbarDownload,o.showPhoneMenu),u=P.a.useState(0),s=Object(k.a)(u,2),l=s[0],f=s[1],p=P.a.useState(!1),d=Object(k.a)(p,2),b=d[0],h=d[1],v=Object(A.b)(),y=R(v),_=H(v),w=n.navbar.logo,g=function(t){var e,n=l+t;e=n<0?0:n>=r.length-1?r.length-1:n;var o=r[e].uid;y(o)},m=Object(q.a)("ArrowLeft"),O=Object(q.a)("ArrowRight");P.a.useEffect(function(){m?g(-1):O&&g(1)},[m,O]),P.a.useEffect(function(){var t=r.findIndex(function(t){return t.uid===a});f(t)},[a]);var j,S={show:{opacity:1,display:"flex"},hide:{opacity:0,transitionEnd:{display:"none"}}},x=0!==a.length;return z("nav",{className:"navbar"},z("div",{className:"navbar__brand"},z(T.a,{src:"/static/icons/".concat(w),onClick:function(){C.a.push("/")}})),z(E.b.div,{variants:S,initial:!1,animate:x?"show":"hide",className:"navbar__toggler"},z(T.a,{src:"/static/icons/minus.svg",className:"navbar__toggler__btn",onClick:function(){return g(-1)}}),z("span",{className:"navbar__toggler__pos"},(j=l+1)<=9?"0".concat(j):j),z("span",{className:"navbar__toggler__len"},"\\ ",r.length),z(T.a,{src:"/static/icons/plus.svg",className:"navbar__toggler__btn",onClick:function(){return g(1)}})),z(E.b.div,{variants:S,animate:x?"show":"hide",initial:!1,className:"navbar__controls ".concat(c?"show":"hide")},z("div",{className:"navbar__controls__search",onClick:function(){v(Object(I.j)("hide")),v(Object(I.h)(!i))}},z(T.a,{src:"/static/icons/search.svg"}),z("span",null,"Hledat")),i&&z(K,null),z("div",{className:"navbar__controls__share",onClick:function(){!function(t){var e=document.createElement("textarea");e.value=t,document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e)}(window.location.href),h(!0)}},z(T.a,{src:"/static/icons/share.svg"}),z("span",null,"Sd\xedlet")),z(E.a,{initial:!1},b&&z(F,{onAnimationComplete:function(){return h(!1)}})),z("span",{className:"navbar__controls__contents",onClick:function(){_(),v(Object(I.i)(!1))}},"Obsah")),z(E.b.div,{variants:S,animate:x?"show":"hide",initial:!1,className:"navbar__burger",onClick:function(){return v(Object(I.i)(!c))}},z(T.a,{className:"",src:"/static/icons/burger.svg"})))},L=function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),Z=function(){return(Z=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)},G=function(t,e,n,r){return new(n||(n=Promise))(function(o,a){function i(t){try{u(r.next(t))}catch(e){a(e)}}function c(t){try{u(r.throw(t))}catch(e){a(e)}}function u(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n(function(t){t(e)})).then(i,c)}u((r=r.apply(t,e||[])).next())})},J=function(t,e){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:c(0),throw:c(1),return:c(2)},"function"===typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function c(a){return function(c){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,r=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!(o=(o=i.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=e.call(t,i)}catch(c){a=[6,c],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,c])}}},W=function(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(null!=t&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(t);o<r.length;o++)e.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(t,r[o])&&(n[r[o]]=t[r[o]])}return n},Y={storeKey:"__NEXT_REDUX_STORE__",debug:!1,serializeState:function(t){return t},deserializeState:function(t){return t}},B=n("zrwo"),Q=n("UXZV"),$=n.n(Q),tt=n("ANjH"),et=n("5HXA"),nt=n("DH+K"),rt={activeInnovationId:"",hoverInnovationId:"",currentSlideshowIndex:0,showSidebar:"hide",playInnovationVideo:!1,isUserLogged:!0,showNavbarSearch:!1,showNavbarDownload:!1,areAuthorsVisible:!1,showPhoneMenu:!1},ot=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:rt,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case nt.j:return $()({},Object(B.a)({},t,{showPhoneMenu:e.payload}));case nt.g:return $()({},Object(B.a)({},t,{playInnovationVideo:e.payload}));case nt.d:return $()({},Object(B.a)({},t,{areAuthorsVisible:e.payload}));case nt.k:return $()({},Object(B.a)({},t,{showSidebar:e.payload}));case nt.c:return $()({},Object(B.a)({},t,{activeInnovationId:e.payload}));case nt.e:return $()({},Object(B.a)({},t,{currentSlideshowIndex:e.payload}));case nt.f:return $()({},Object(B.a)({},t,{hoverInnovationId:e.payload}));case nt.b:return $()({},rt,{activeInnovationId:t.activeInnovationId,isUserLogged:t.isUserLogged});case nt.a:return $()({},Object(B.a)({},rt,{isUserLogged:e.payload}));case nt.i:return $()({},Object(B.a)({},t,{showNavbarSearch:e.payload}));case nt.h:return $()({},Object(B.a)({},t,{showNavbarDownload:e.payload}));default:return t}},at=n("pXOK"),it=n.n(at),ct=n("K4v/"),ut=n.n(ct),st=(n("+KVH"),P.a.createElement),lt=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),v(this,m(e).apply(this,arguments))}var n,r,c;return function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=j()(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&S(t,e)}(e,it.a),n=e,r=[{key:"render",value:function(){var t=this.props,e=t.Component,n=t.pageProps,r=t.store,o=t.router;return st(A.a,{store:r},st(ut.a,{style:{position:"absolute",inset:"0 0 0 0",width:"100vw",height:"100rvh",overflow:"hidden"}},st(M.b,{innovations:n.innovations,humans:n.humans,about:n.about},st(V,null),st(E.a,{initial:!1},st(e,Object(i.a)({},n,{key:o.pathname}))))))}}],c=[{key:"getInitalProps",value:function(){var t=Object(a.a)(o.a.mark(function t(e){var n,r;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.Component,r=e.ctx,!n.getInitalProps){t.next=7;break}return t.next=4,n.getInitalProps(r);case 4:t.t0=t.sent,t.next=8;break;case 7:t.t0={};case 8:return t.t1=t.t0,t.abrupt("return",{pageProps:t.t1});case 10:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()}],r&&s(n.prototype,r),c&&s(n,c),e}();e.default=function(t,e){e=Z(Z({},Y),e);var n="undefined"===typeof window,r=function(r){var o=r.initialState,a=r.ctx,i=e.storeKey,c=function(){return t(e.deserializeState(o),Z(Z(Z({},a),e),{isServer:n}))};return n?c():(i in window||(window[i]=c()),window[i])};return function(t){var o;return(o=function(n){function o(t,o){var a=n.call(this,t,o)||this,i=t.initialState;return e.debug&&console.log("4. WrappedApp.render created new store with initialState",i),a.store=r({initialState:i}),a}return L(o,n),o.prototype.render=function(){var e=this.props,n=e.initialProps,r=(e.initialState,W(e,["initialProps","initialState"]));return P.a.createElement(t,Z({},r,n,{store:this.store}))},o}(x.Component)).displayName="withRedux("+(t.displayName||t.name||"App")+")",o.getInitialProps=function(o){return G(void 0,void 0,void 0,function(){var a,i;return J(this,function(c){switch(c.label){case 0:if(!o)throw new Error("No app context");if(!o.ctx)throw new Error("No page context");return a=r({ctx:o.ctx}),e.debug&&console.log("1. WrappedApp.getInitialProps wrapper got the store with state",a.getState()),o.ctx.store=a,o.ctx.isServer=n,i={},"getInitialProps"in t?[4,t.getInitialProps.call(t,o)]:[3,2];case 1:i=c.sent(),c.label=2;case 2:return e.debug&&console.log("3. WrappedApp.getInitialProps has store state",a.getState()),[2,{isServer:n,initialState:n?e.serializeState(a.getState()):a.getState(),initialProps:i}]}})})},o}}(function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:rt;return Object(tt.createStore)(ot,t,Object(et.composeWithDevTools)(Object(tt.applyMiddleware)()))})(lt)},"2Nb0":function(t,e,n){n("FlQf"),n("bBy9"),t.exports=n("zLkG").f("iterator")},"3GJH":function(t,e,n){n("lCc8");var r=n("WEpk").Object;t.exports=function(t,e){return r.create(t,e)}},"5HXA":function(t,e,n){"use strict";var r=n("ANjH").compose;e.__esModule=!0,e.composeWithDevTools="undefined"!==typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(0!==arguments.length)return"object"===typeof arguments[0]?r:r.apply(null,arguments)},e.devToolsEnhancer="undefined"!==typeof window&&window.__REDUX_DEVTOOLS_EXTENSION__?window.__REDUX_DEVTOOLS_EXTENSION__:function(){return function(t){return t}}},"6tYh":function(t,e,n){var r=n("93I4"),o=n("5K7Z"),a=function(t,e){if(o(t),!r(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,r){try{(r=n("2GTP")(Function.call,n("vwuL").f(Object.prototype,"__proto__").set,2))(t,[]),e=!(t instanceof Array)}catch(o){e=!0}return function(t,n){return a(t,n),e?t.__proto__=n:r(t,n),t}}({},!1):void 0),check:a}},AJC2:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o.default}});var r,o=(r=n("FM9S"))&&r.__esModule?r:{default:r}},ApPD:function(t,e,n){var r=n("JB68"),o=n("U+KD");n("zn7N")("getPrototypeOf",function(){return function(t){return o(r(t))}})},Bhuq:function(t,e,n){t.exports=n("+plK")},FM9S:function(t,e,n){"use strict";function r(t){return(r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.containsRvh=function(t){return/(\d+(\.\d*)?)rvh(?!\w)/.test(t)},e.default=void 0;var o=function(t,e){!function(t,e){if("object"!==r(t)&&void 0!==t||Array.isArray(t))throw Error("style (the first argument) must be an object or undefined");if("number"!==typeof e||e<0)throw Error("Second argument (windowHeight) must be a non-negative number")}(t,e);var n=void 0===t?{height:"100rvh"}:t,o={};return Object.keys(n).forEach(function(t){o[t]="string"===typeof n[t]?function(t,e){return t.replace(/(\d+(\.\d*)?)rvh(?!\w)/g,function(t,n){return"".concat(e*parseFloat(n)/100,"px")})}(n[t],e):n[t]}),o};e.default=o},FSEX:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return n("1TCz")}])},Hfiw:function(t,e,n){var r=n("Y7ZC");r(r.S,"Object",{setPrototypeOf:n("6tYh").set})},JbBM:function(t,e,n){n("Hfiw"),t.exports=n("WEpk").Object.setPrototypeOf},"K4v/":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o.default}}),n("sviS");var r,o=(r=n("iYA0"))&&r.__esModule?r:{default:r}},SqZg:function(t,e,n){t.exports=n("3GJH")},TRZx:function(t,e,n){t.exports=n("JbBM")},XVgq:function(t,e,n){t.exports=n("2Nb0")},YfrF:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=function(){return window.innerHeight};e.default=r},Z7t5:function(t,e,n){t.exports=n("+SFK")},adOz:function(t,e,n){n("Zxgi")("asyncIterator")},dl0q:function(t,e,n){n("Zxgi")("observable")},gTcG:function(t,e,n){"use strict";var r=n("PpqE"),o=n("nWb7"),a=n("UGub"),i=n("um98"),c=n("Axgb"),u=n("rcmC"),s=n("Q4UJ");e.__esModule=!0,e.Container=function(t){0;return t.children},e.createUrl=w,e.default=void 0;var l=s(n("PwdY")),f=s(n("GSsN")),p=s(n("SFBB")),d=s(n("Jrij")),b=n("PHhA");e.AppInitialProps=b.AppInitialProps;var h=n("xF2T");function v(t){return y.apply(this,arguments)}function y(){return(y=(0,f.default)(u.mark(function t(e){var n,r,o;return u.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.Component,r=e.ctx,t.next=3,(0,b.loadGetInitialProps)(n,r);case 3:return o=t.sent,t.abrupt("return",{pageProps:o});case 5:case"end":return t.stop()}},t)}))).apply(this,arguments)}var _=function(t){function e(){return r(this,e),a(this,i(e).apply(this,arguments))}return c(e,t),o(e,[{key:"getChildContext",value:function(){return{router:(0,h.makePublicRouterInstance)(this.props.router)}}},{key:"componentDidCatch",value:function(t,e){throw t}},{key:"render",value:function(){var t=this.props,e=t.router,n=t.Component,r=t.pageProps,o=w(e);return p.default.createElement(n,(0,l.default)({},r,{url:o}))}}]),e}(p.default.Component);function w(t){var e=t.pathname,n=t.asPath,r=t.query;return{get query(){return r},get pathname(){return e},get asPath(){return n},back:function(){t.back()},push:function(e,n){return t.push(e,n)},pushTo:function(e,n){var r=n?e:"",o=n||e;return t.push(r,o)},replace:function(e,n){return t.replace(e,n)},replaceTo:function(e,n){var r=n?e:"",o=n||e;return t.replace(r,o)}}}e.default=_,_.childContextTypes={router:d.default.object},_.origGetInitialProps=v,_.getInitialProps=v},iYA0:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=i(n("q1tI")),o=i(n("AJC2")),a=i(n("YfrF"));function i(t){return t&&t.__esModule?t:{default:t}}function c(t){return(c="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function u(){return(u=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function l(t){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function f(t,e){return(f=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function p(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function d(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var b=function(t){function e(){var t,n,r,i;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);for(var u=arguments.length,s=new Array(u),f=0;f<u;f++)s[f]=arguments[f];return r=this,i=(t=l(e)).call.apply(t,[this].concat(s)),n=!i||"object"!==c(i)&&"function"!==typeof i?p(r):i,d(p(p(n)),"state",{style:{}}),d(p(p(n)),"updateStyle",function(){var t=(0,o.default)(n.props.style,(0,a.default)());n.setState({style:t})}),n}var n,i,b;return function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&f(t,e)}(e,r.default.Component),n=e,(i=[{key:"componentDidMount",value:function(){this.updateStyle(),window.addEventListener("resize",this.updateStyle)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.updateStyle)}},{key:"render",value:function(){return r.default.createElement("div",u({},this.props,{style:this.state.style}))}}])&&s(n.prototype,i),b&&s(n,b),e}();e.default=b},lCc8:function(t,e,n){var r=n("Y7ZC");r(r.S,"Object",{create:n("oVml")})},pXOK:function(t,e,n){t.exports=n("gTcG")},sviS:function(t,e,n){"use strict";Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)})}},[["FSEX",1,0]]]);