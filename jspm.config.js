System.config({
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system",
      "es7.classProperties",
      "es7.decorators"
    ],
    "blacklist": []
  },
  paths: {
    "*": "src/*",
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  bundles: {
    "dist/dependencies.js": [
      "npm:react@0.14.5",
      "npm:react-dom@0.14.5",
      "npm:babel-runtime@5.8.34/helpers/class-call-check",
      "npm:babel-runtime@5.8.34/helpers/get",
      "npm:react@0.14.5/react",
      "npm:babel-runtime@5.8.34/helpers/create-class",
      "npm:babel-runtime@5.8.34/helpers/inherits",
      "npm:redux@3.0.5",
      "npm:redux-thunk@1.0.3",
      "npm:react-router-redux@2.1.0",
      "npm:react-redux@4.0.6",
      "npm:react-router@2.0.0-rc5",
      "npm:react-dom@0.14.5/index",
      "npm:redux-thunk@1.0.3/lib/index",
      "npm:react-router-redux@2.1.0/lib/index",
      "npm:babel-runtime@5.8.34/core-js/object/get-own-property-descriptor",
      "npm:babel-runtime@5.8.34/core-js/object/define-property",
      "npm:babel-runtime@5.8.34/core-js/object/create",
      "npm:react@0.14.5/lib/React",
      "npm:babel-runtime@5.8.34/core-js/object/set-prototype-of",
      "npm:redux@3.0.5/lib/index",
      "npm:react-redux@4.0.6/lib/index",
      "npm:firebase@2.4.0",
      "npm:babel-runtime@5.8.34/core-js/object/assign",
      "npm:react-router@2.0.0-rc5/lib/index",
      "npm:react@0.14.5/lib/ReactDOM",
      "npm:react@0.14.5/lib/Object.assign",
      "npm:redux@3.0.5/lib/utils/compose",
      "npm:react@0.14.5/lib/ReactCurrentOwner",
      "npm:react@0.14.5/lib/ReactVersion",
      "npm:react-router@2.0.0-rc5/lib/PropTypes",
      "npm:core-js@1.2.6/library/fn/object/define-property",
      "npm:core-js@1.2.6/library/fn/object/get-own-property-descriptor",
      "npm:core-js@1.2.6/library/fn/object/create",
      "npm:react@0.14.5/lib/ReactDOMServer",
      "npm:redux@3.0.5/lib/createStore",
      "npm:redux@3.0.5/lib/utils/applyMiddleware",
      "npm:core-js@1.2.6/library/fn/object/set-prototype-of",
      "npm:redux@3.0.5/lib/utils/bindActionCreators",
      "npm:core-js@1.2.6/library/fn/object/assign",
      "npm:react-router@2.0.0-rc5/lib/IndexLink",
      "npm:react@0.14.5/lib/ReactReconciler",
      "npm:react@0.14.5/lib/ReactIsomorphic",
      "npm:redux@3.0.5/lib/utils/combineReducers",
      "npm:react-redux@4.0.6/lib/components/Provider",
      "npm:react-redux@4.0.6/lib/components/connect",
      "npm:react-router@2.0.0-rc5/lib/Link",
      "npm:react-router@2.0.0-rc5/lib/IndexRedirect",
      "npm:firebase@2.4.0/lib/firebase-web",
      "npm:react-router@2.0.0-rc5/lib/IndexRoute",
      "npm:react-router@2.0.0-rc5/lib/Route",
      "npm:react-router@2.0.0-rc5/lib/Redirect",
      "npm:react-router@2.0.0-rc5/lib/History",
      "npm:react-router@2.0.0-rc5/lib/Lifecycle",
      "npm:react-router@2.0.0-rc5/lib/RouteContext",
      "npm:react-router@2.0.0-rc5/lib/RouteUtils",
      "npm:react-router@2.0.0-rc5/lib/RoutingContext",
      "npm:react-router@2.0.0-rc5/lib/RouterContext",
      "npm:react-router@2.0.0-rc5/lib/match",
      "npm:react-router@2.0.0-rc5/lib/PatternUtils",
      "npm:react@0.14.5/lib/ReactDOMTextComponent",
      "npm:react@0.14.5/lib/ReactPerf",
      "npm:react@0.14.5/lib/deprecated",
      "npm:react-router@2.0.0-rc5/lib/Router",
      "npm:react-router@2.0.0-rc5/lib/useRoutes",
      "npm:react-router@2.0.0-rc5/lib/useRouterHistory",
      "npm:react-router@2.0.0-rc5/lib/browserHistory",
      "npm:react-router@2.0.0-rc5/lib/hashHistory",
      "npm:react-router@2.0.0-rc5/lib/createMemoryHistory",
      "npm:react@0.14.5/lib/ReactInstanceHandles",
      "npm:react@0.14.5/lib/ReactDefaultInjection",
      "npm:react@0.14.5/lib/ReactMount",
      "npm:react@0.14.5/lib/ReactUpdates",
      "npm:fbjs@0.6.0/lib/ExecutionEnvironment",
      "npm:react@0.14.5/lib/renderSubtreeIntoContainer",
      "github:jspm/nodelibs-process@0.1.2",
      "npm:fbjs@0.6.0/lib/warning",
      "npm:react@0.14.5/lib/findDOMNode",
      "npm:core-js@1.2.6/library/modules/$",
      "npm:redux@3.0.5/lib/utils/isPlainObject",
      "npm:core-js@1.2.6/library/modules/$.core",
      "npm:redux@3.0.5/lib/utils/mapValues",
      "npm:redux@3.0.5/lib/utils/pick",
      "npm:react-redux@4.0.6/lib/utils/shallowEqual",
      "npm:react-redux@4.0.6/lib/utils/isPlainObject",
      "npm:react@0.14.5/lib/escapeTextContentForBrowser",
      "npm:react@0.14.5/lib/ReactRootIndex",
      "npm:react@0.14.5/lib/ClientReactRootIndex",
      "npm:react@0.14.5/lib/ServerReactRootIndex",
      "npm:react@0.14.5/lib/ReactDOMFeatureFlags",
      "npm:react@0.14.5/lib/ReactEmptyComponentRegistry",
      "npm:react@0.14.5/lib/ReactInstanceMap",
      "npm:hoist-non-react-statics@1.0.3",
      "npm:core-js@1.2.6/library/modules/es6.object.get-own-property-descriptor",
      "npm:core-js@1.2.6/library/modules/es6.object.set-prototype-of",
      "npm:core-js@1.2.6/library/modules/es6.object.assign",
      "npm:invariant@2.2.0",
      "github:jspm/nodelibs-buffer@0.1.0",
      "npm:react-router@2.0.0-rc5/lib/getRouteParams",
      "npm:history@2.0.0-rc2/lib/useBasename",
      "npm:react-router@2.0.0-rc5/lib/createRouterHistory",
      "npm:react@0.14.5/lib/ReactReconcileTransaction",
      "npm:react@0.14.5/lib/ReactInjection",
      "npm:react@0.14.5/lib/SVGDOMPropertyConfig",
      "npm:react@0.14.5/lib/ReactMarkupChecksum",
      "npm:fbjs@0.6.0/lib/containsNode",
      "npm:react@0.14.5/lib/ReactRef",
      "npm:react@0.14.5/lib/ReactElement",
      "npm:react-redux@4.0.6/lib/utils/storeShape",
      "npm:react-redux@4.0.6/lib/utils/wrapActionCreators",
      "npm:react-router@2.0.0-rc5/lib/warning",
      "npm:react-router@2.0.0-rc5/lib/deprecateObjectProperties",
      "npm:react-router@2.0.0-rc5/lib/RouterUtils",
      "npm:react@0.14.5/lib/ReactComponentBrowserEnvironment",
      "npm:history@2.0.0-rc2/lib/createHashHistory",
      "npm:history@2.0.0-rc2/lib/useQueries",
      "npm:history@2.0.0-rc2/lib/createBrowserHistory",
      "npm:history@2.0.0-rc2/lib/createMemoryHistory",
      "npm:fbjs@0.6.0/lib/invariant",
      "npm:react@0.14.5/lib/ReactBrowserEventEmitter",
      "npm:fbjs@0.6.0/lib/emptyObject",
      "npm:react@0.14.5/lib/ReactServerRendering",
      "npm:react@0.14.5/lib/ReactComponent",
      "npm:react@0.14.5/lib/ReactChildren",
      "npm:react@0.14.5/lib/ReactClass",
      "npm:react@0.14.5/lib/ReactDOMFactories",
      "npm:react@0.14.5/lib/ReactElementValidator",
      "npm:react@0.14.5/lib/ReactPropTypes",
      "npm:react@0.14.5/lib/onlyChild",
      "npm:react-router@2.0.0-rc5/lib/createTransitionManager",
      "npm:react@0.14.5/lib/DOMChildrenOperations",
      "npm:react@0.14.5/lib/DOMPropertyOperations",
      "npm:react@0.14.5/lib/setTextContent",
      "npm:react@0.14.5/lib/validateDOMNesting",
      "npm:react@0.14.5/lib/BeforeInputEventPlugin",
      "npm:react@0.14.5/lib/ChangeEventPlugin",
      "npm:react@0.14.5/lib/DefaultEventPluginOrder",
      "npm:react@0.14.5/lib/EnterLeaveEventPlugin",
      "npm:react@0.14.5/lib/HTMLDOMPropertyConfig",
      "npm:react@0.14.5/lib/ReactBrowserComponentMixin",
      "npm:react@0.14.5/lib/ReactDefaultBatchingStrategy",
      "npm:react@0.14.5/lib/ReactDOMComponent",
      "npm:react@0.14.5/lib/ReactEventListener",
      "npm:react@0.14.5/lib/SelectEventPlugin",
      "npm:react@0.14.5/lib/ReactDefaultPerf",
      "npm:react@0.14.5/lib/SimpleEventPlugin",
      "npm:react@0.14.5/lib/DOMProperty",
      "npm:react@0.14.5/lib/ReactUpdateQueue",
      "npm:react@0.14.5/lib/instantiateReactComponent",
      "npm:react@0.14.5/lib/setInnerHTML",
      "npm:react@0.14.5/lib/shouldUpdateReactComponent",
      "npm:fbjs@0.6.0/lib/emptyFunction",
      "github:jspm/nodelibs-process@0.1.2/index",
      "npm:react@0.14.5/lib/CallbackQueue",
      "npm:react@0.14.5/lib/PooledClass",
      "npm:react@0.14.5/lib/Transaction",
      "npm:hoist-non-react-statics@1.0.3/index",
      "npm:history@2.0.0-rc2/lib/ExecutionEnvironment",
      "npm:history@2.0.0-rc2/lib/extractPath",
      "npm:react@0.14.5/lib/adler32",
      "npm:history@2.0.0-rc2/lib/Actions",
      "npm:history@2.0.0-rc2/lib/DOMUtils",
      "npm:react@0.14.5/lib/ViewportMetrics",
      "npm:react@0.14.5/lib/ReactServerBatchingStrategy",
      "npm:fbjs@0.6.0/lib/keyOf",
      "npm:fbjs@0.6.0/lib/mapObject",
      "npm:react@0.14.5/lib/getIteratorFn",
      "npm:react@0.14.5/lib/getEventTarget",
      "npm:react@0.14.5/lib/isTextInputElement",
      "npm:react@0.14.5/lib/ReactDOMButton",
      "npm:fbjs@0.6.0/lib/shallowEqual",
      "npm:fbjs@0.6.0/lib/getUnboundedScrollPosition",
      "npm:fbjs@0.6.0/lib/getActiveElement",
      "npm:core-js@1.2.6/library/modules/$.to-iobject",
      "npm:core-js@1.2.6/library/modules/$.export",
      "npm:core-js@1.2.6/library/modules/$.object-sap",
      "npm:core-js@1.2.6/library/modules/$.set-proto",
      "npm:core-js@1.2.6/library/modules/$.object-assign",
      "npm:react@0.14.5/lib/ReactEmptyComponent",
      "npm:fbjs@0.6.0/lib/isTextNode",
      "npm:warning@2.1.0",
      "npm:query-string@3.0.0",
      "npm:react@0.14.5/lib/ReactEventEmitterMixin",
      "npm:react-router@2.0.0-rc5/lib/computeChangedRoutes",
      "npm:react-router@2.0.0-rc5/lib/isActive",
      "npm:react-router@2.0.0-rc5/lib/getComponents",
      "npm:react@0.14.5/lib/quoteAttributeValueForBrowser",
      "npm:react@0.14.5/lib/FallbackCompositionState",
      "npm:react@0.14.5/lib/SyntheticCompositionEvent",
      "npm:react@0.14.5/lib/SyntheticInputEvent",
      "npm:react@0.14.5/lib/SyntheticMouseEvent",
      "npm:react@0.14.5/lib/ReactDefaultPerfAnalysis",
      "npm:fbjs@0.6.0/lib/performanceNow",
      "npm:react@0.14.5/lib/SyntheticFocusEvent",
      "npm:react@0.14.5/lib/SyntheticClipboardEvent",
      "npm:react@0.14.5/lib/SyntheticKeyboardEvent",
      "npm:react@0.14.5/lib/SyntheticTouchEvent",
      "npm:invariant@2.2.0/browser",
      "github:jspm/nodelibs-buffer@0.1.0/index",
      "npm:history@2.0.0-rc2/lib/runTransitionHook",
      "npm:history@2.0.0-rc2/lib/parsePath",
      "npm:history@2.0.0-rc2/lib/deprecate",
      "npm:react@0.14.5/lib/canDefineProperty",
      "npm:history@2.0.0-rc2/lib/DOMStateStorage",
      "npm:history@2.0.0-rc2/lib/createDOMHistory",
      "npm:history@2.0.0-rc2/lib/createHistory",
      "npm:react@0.14.5/lib/ReactPropTypeLocationNames",
      "npm:fbjs@0.6.0/lib/keyMirror",
      "npm:react-router@2.0.0-rc5/lib/TransitionUtils",
      "npm:react-router@2.0.0-rc5/lib/matchRoutes",
      "npm:react@0.14.5/lib/ReactMultiChild",
      "npm:fbjs@0.6.0/lib/EventListener",
      "npm:react@0.14.5/lib/ReactInputSelection",
      "npm:react@0.14.5/lib/EventPluginHub",
      "npm:react@0.14.5/lib/ReactComponentEnvironment",
      "npm:react@0.14.5/lib/ReactNativeComponent",
      "npm:react@0.14.5/lib/ReactOwner",
      "npm:react@0.14.5/lib/ReactDOMIDOperations",
      "npm:react@0.14.5/lib/EventPluginRegistry",
      "npm:react@0.14.5/lib/EventConstants",
      "npm:react@0.14.5/lib/ReactServerRenderingTransaction",
      "npm:react@0.14.5/lib/isEventSupported",
      "npm:react@0.14.5/lib/traverseAllChildren",
      "npm:react@0.14.5/lib/ReactNoopUpdateQueue",
      "npm:react@0.14.5/lib/ReactPropTypeLocations",
      "npm:react@0.14.5/lib/ReactMultiChildUpdateTypes",
      "npm:react@0.14.5/lib/Danger",
      "npm:react@0.14.5/lib/EventPropagators",
      "npm:react@0.14.5/lib/SyntheticEvent",
      "npm:react@0.14.5/lib/AutoFocusUtils",
      "npm:react@0.14.5/lib/CSSPropertyOperations",
      "npm:react@0.14.5/lib/ReactDOMInput",
      "npm:react@0.14.5/lib/ReactDOMOption",
      "npm:react@0.14.5/lib/ReactDOMSelect",
      "npm:react@0.14.5/lib/ReactDOMTextarea",
      "npm:react@0.14.5/lib/getEventCharCode",
      "npm:react@0.14.5/lib/SyntheticDragEvent",
      "npm:react@0.14.5/lib/SyntheticUIEvent",
      "npm:react@0.14.5/lib/SyntheticWheelEvent",
      "npm:process@0.11.2",
      "npm:react@0.14.5/lib/ReactCompositeComponent",
      "npm:core-js@1.2.6/library/modules/$.global",
      "npm:core-js@1.2.6/library/modules/$.defined",
      "npm:core-js@1.2.6/library/modules/$.fails",
      "npm:core-js@1.2.6/library/modules/$.is-object",
      "npm:fbjs@0.6.0/lib/isNode",
      "npm:react-router@2.0.0-rc5/lib/AsyncUtils",
      "npm:react@0.14.5/lib/getEventModifierState",
      "npm:history@2.0.0-rc2/lib/AsyncUtils",
      "npm:fbjs@0.6.0/lib/focusNode",
      "npm:react@0.14.5/lib/forEachAccumulated",
      "npm:deep-equal@1.0.1",
      "npm:core-js@1.2.6/library/modules/$.iobject",
      "npm:core-js@1.2.6/library/modules/$.ctx",
      "npm:core-js@1.2.6/library/modules/$.an-object",
      "npm:core-js@1.2.6/library/modules/$.to-object",
      "npm:fbjs@0.6.0/lib/performance",
      "npm:buffer@3.6.0",
      "npm:react@0.14.5/lib/getEventKey",
      "npm:query-string@3.0.0/index",
      "npm:warning@2.1.0/browser",
      "npm:history@2.0.0-rc2/lib/createLocation",
      "npm:react@0.14.5/lib/ReactErrorUtils",
      "npm:fbjs@0.6.0/lib/getMarkupWrap",
      "npm:fbjs@0.6.0/lib/createNodesFromMarkup",
      "npm:react@0.14.5/lib/getTextContentAccessor",
      "npm:react@0.14.5/lib/ReactChildReconciler",
      "npm:react@0.14.5/lib/flattenChildren",
      "npm:react@0.14.5/lib/EventPluginUtils",
      "npm:react@0.14.5/lib/ReactDOMSelection",
      "npm:react@0.14.5/lib/accumulateInto",
      "npm:react@0.14.5/lib/CSSProperty",
      "npm:fbjs@0.6.0/lib/memoizeStringOnly",
      "npm:process@0.11.2/browser",
      "npm:fbjs@0.6.0/lib/camelizeStyleName",
      "npm:fbjs@0.6.0/lib/hyphenateStyleName",
      "npm:react@0.14.5/lib/dangerousStyleValue",
      "npm:react@0.14.5/lib/LinkedValueUtils",
      "npm:core-js@1.2.6/library/modules/$.cof",
      "npm:core-js@1.2.6/library/modules/$.a-function",
      "npm:fbjs@0.6.0/lib/camelize",
      "npm:fbjs@0.6.0/lib/hyphenate",
      "npm:react@0.14.5/lib/getNodeForCharacterOffset",
      "npm:deep-equal@1.0.1/index",
      "npm:strict-uri-encode@1.1.0",
      "npm:fbjs@0.6.0/lib/createArrayFromMixed",
      "npm:buffer@3.6.0/index",
      "npm:deep-equal@1.0.1/lib/keys",
      "npm:strict-uri-encode@1.1.0/index",
      "npm:fbjs@0.6.0/lib/toArray",
      "npm:deep-equal@1.0.1/lib/is_arguments",
      "npm:ieee754@1.1.6",
      "npm:base64-js@0.0.8",
      "npm:isarray@1.0.0",
      "npm:ieee754@1.1.6/index",
      "npm:base64-js@0.0.8/lib/b64",
      "npm:isarray@1.0.0/index"
    ]
  },

  map: {
    "babel": "npm:babel-core@5.8.34",
    "babel-runtime": "npm:babel-runtime@5.8.34",
    "core-js": "npm:core-js@1.2.6",
    "firebase": "npm:firebase@2.4.0",
    "react": "npm:react@0.14.5",
    "react-dom": "npm:react-dom@0.14.5",
    "react-redux": "npm:react-redux@4.0.6",
    "react-router": "npm:react-router@2.0.0-rc5",
    "react-router-redux": "npm:react-router-redux@2.1.0",
    "redux": "npm:redux@3.0.5",
    "redux-devtools": "npm:redux-devtools@3.0.1",
    "redux-thunk": "npm:redux-thunk@1.0.3",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-constants@0.1.0": {
      "constants-browserify": "npm:constants-browserify@0.0.1"
    },
    "github:jspm/nodelibs-crypto@0.1.0": {
      "crypto-browserify": "npm:crypto-browserify@3.11.0"
    },
    "github:jspm/nodelibs-domain@0.1.0": {
      "domain-browser": "npm:domain-browser@1.1.7"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-http@1.7.1": {
      "Base64": "npm:Base64@0.2.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "github:jspm/nodelibs-https@0.1.0": {
      "https-browserify": "npm:https-browserify@0.0.0"
    },
    "github:jspm/nodelibs-net@0.1.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "net": "github:jspm/nodelibs-net@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "timers": "github:jspm/nodelibs-timers@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-string_decoder@0.1.0": {
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "github:jspm/nodelibs-timers@0.1.0": {
      "timers-browserify": "npm:timers-browserify@1.4.2"
    },
    "github:jspm/nodelibs-url@0.1.0": {
      "url": "npm:url@0.10.3"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "npm:amdefine@1.0.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "module": "github:jspm/nodelibs-module@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:asap@2.0.3": {
      "domain": "github:jspm/nodelibs-domain@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:asn1.js@4.3.0": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "bn.js": "npm:bn.js@4.9.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.34": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:browserify-aes@1.0.6": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "buffer-xor": "npm:buffer-xor@1.0.3",
      "cipher-base": "npm:cipher-base@1.0.2",
      "create-hash": "npm:create-hash@1.1.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inherits": "npm:inherits@2.0.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:browserify-cipher@1.0.0": {
      "browserify-aes": "npm:browserify-aes@1.0.6",
      "browserify-des": "npm:browserify-des@1.0.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "evp_bytestokey": "npm:evp_bytestokey@1.0.0"
    },
    "npm:browserify-des@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "cipher-base": "npm:cipher-base@1.0.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "des.js": "npm:des.js@1.0.0",
      "inherits": "npm:inherits@2.0.1"
    },
    "npm:browserify-rsa@4.0.0": {
      "bn.js": "npm:bn.js@4.9.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "constants": "github:jspm/nodelibs-constants@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "randombytes": "npm:randombytes@2.0.2"
    },
    "npm:browserify-sign@4.0.0": {
      "bn.js": "npm:bn.js@4.9.0",
      "browserify-rsa": "npm:browserify-rsa@4.0.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "create-hmac": "npm:create-hmac@1.1.4",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "elliptic": "npm:elliptic@6.2.2",
      "inherits": "npm:inherits@2.0.1",
      "parse-asn1": "npm:parse-asn1@5.0.0",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:buffer-xor@1.0.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:cipher-base@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "string_decoder": "github:jspm/nodelibs-string_decoder@0.1.0"
    },
    "npm:constants-browserify@0.0.1": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:core-js@1.2.6": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:core-util-is@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:create-ecdh@4.0.0": {
      "bn.js": "npm:bn.js@4.9.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "elliptic": "npm:elliptic@6.2.2"
    },
    "npm:create-hash@1.1.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "cipher-base": "npm:cipher-base@1.0.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inherits": "npm:inherits@2.0.1",
      "ripemd160": "npm:ripemd160@1.0.1",
      "sha.js": "npm:sha.js@2.4.4"
    },
    "npm:create-hmac@1.1.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:crypto-browserify@3.11.0": {
      "browserify-cipher": "npm:browserify-cipher@1.0.0",
      "browserify-sign": "npm:browserify-sign@4.0.0",
      "create-ecdh": "npm:create-ecdh@4.0.0",
      "create-hash": "npm:create-hash@1.1.2",
      "create-hmac": "npm:create-hmac@1.1.4",
      "diffie-hellman": "npm:diffie-hellman@5.0.2",
      "inherits": "npm:inherits@2.0.1",
      "pbkdf2": "npm:pbkdf2@3.0.4",
      "public-encrypt": "npm:public-encrypt@4.0.0",
      "randombytes": "npm:randombytes@2.0.2"
    },
    "npm:des.js@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
    },
    "npm:diffie-hellman@5.0.2": {
      "bn.js": "npm:bn.js@4.9.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "miller-rabin": "npm:miller-rabin@4.0.0",
      "randombytes": "npm:randombytes@2.0.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:domain-browser@1.1.7": {
      "events": "github:jspm/nodelibs-events@0.1.1"
    },
    "npm:elliptic@6.2.2": {
      "bn.js": "npm:bn.js@4.9.0",
      "brorand": "npm:brorand@1.0.5",
      "hash.js": "npm:hash.js@1.0.3",
      "inherits": "npm:inherits@2.0.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:envify@3.4.0": {
      "jstransform": "npm:jstransform@10.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "through": "npm:through@2.3.8"
    },
    "npm:esprima-fb@13001.1001.0-dev-harmony-fb": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:evp_bytestokey@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0"
    },
    "npm:faye-websocket@0.10.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "https": "github:jspm/nodelibs-https@0.1.0",
      "net": "github:jspm/nodelibs-net@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "tls": "github:jspm/nodelibs-tls@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0",
      "websocket-driver": "npm:websocket-driver@0.6.4"
    },
    "npm:fbjs@0.6.0": {
      "core-js": "npm:core-js@1.2.6",
      "loose-envify": "npm:loose-envify@1.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "promise": "npm:promise@7.1.1",
      "ua-parser-js": "npm:ua-parser-js@0.7.10",
      "whatwg-fetch": "npm:whatwg-fetch@0.9.0"
    },
    "npm:firebase@2.4.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "faye-websocket": "npm:faye-websocket@0.10.0",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "https": "github:jspm/nodelibs-https@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:hash.js@1.0.3": {
      "inherits": "npm:inherits@2.0.1"
    },
    "npm:history@2.0.0-rc2": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "deep-equal": "npm:deep-equal@1.0.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "invariant": "npm:invariant@2.2.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "query-string": "npm:query-string@3.0.0",
      "warning": "npm:warning@2.1.0"
    },
    "npm:https-browserify@0.0.0": {
      "http": "github:jspm/nodelibs-http@1.7.1"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:invariant@2.2.0": {
      "loose-envify": "npm:loose-envify@1.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:jstransform@10.1.0": {
      "base62": "npm:base62@0.1.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "esprima-fb": "npm:esprima-fb@13001.1001.0-dev-harmony-fb",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "source-map": "npm:source-map@0.1.31"
    },
    "npm:lodash@3.10.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:loose-envify@1.1.0": {
      "js-tokens": "npm:js-tokens@1.0.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:miller-rabin@4.0.0": {
      "bn.js": "npm:bn.js@4.9.0",
      "brorand": "npm:brorand@1.0.5"
    },
    "npm:parse-asn1@5.0.0": {
      "asn1.js": "npm:asn1.js@4.3.0",
      "browserify-aes": "npm:browserify-aes@1.0.6",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
      "pbkdf2": "npm:pbkdf2@3.0.4",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:pbkdf2@3.0.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "create-hmac": "npm:create-hmac@1.1.4",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:promise@7.1.1": {
      "asap": "npm:asap@2.0.3",
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:public-encrypt@4.0.0": {
      "bn.js": "npm:bn.js@4.9.0",
      "browserify-rsa": "npm:browserify-rsa@4.0.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.2",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "parse-asn1": "npm:parse-asn1@5.0.0",
      "randombytes": "npm:randombytes@2.0.2"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:query-string@3.0.0": {
      "strict-uri-encode": "npm:strict-uri-encode@1.1.0"
    },
    "npm:randombytes@2.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:react-dom@0.14.5": {
      "react": "npm:react@0.14.5"
    },
    "npm:react-redux@4.0.6": {
      "hoist-non-react-statics": "npm:hoist-non-react-statics@1.0.3",
      "invariant": "npm:invariant@2.2.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "react": "npm:react@0.14.5",
      "redux": "npm:redux@3.0.5"
    },
    "npm:react-router@2.0.0-rc5": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "history": "npm:history@2.0.0-rc2",
      "invariant": "npm:invariant@2.2.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "warning": "npm:warning@2.1.0"
    },
    "npm:react@0.14.5": {
      "envify": "npm:envify@3.4.0",
      "fbjs": "npm:fbjs@0.6.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:readable-stream@1.1.13": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "npm:redux-devtools@3.0.1": {
      "lodash": "npm:lodash@3.10.1",
      "react": "npm:react@0.14.5",
      "react-redux": "npm:react-redux@4.0.6",
      "redux": "npm:redux@3.0.5"
    },
    "npm:redux@3.0.5": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:ripemd160@1.0.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:sha.js@2.4.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:source-map@0.1.31": {
      "amdefine": "npm:amdefine@1.0.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.1.13"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:through@2.3.8": {
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:timers-browserify@1.4.2": {
      "process": "npm:process@0.11.2"
    },
    "npm:ua-parser-js@0.7.10": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:url@0.10.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "punycode": "npm:punycode@1.3.2",
      "querystring": "npm:querystring@0.2.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    },
    "npm:warning@2.1.0": {
      "loose-envify": "npm:loose-envify@1.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:websocket-driver@0.6.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "net": "github:jspm/nodelibs-net@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0",
      "websocket-extensions": "npm:websocket-extensions@0.1.1"
    },
    "npm:websocket-extensions@0.1.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
