var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// package-external:@wordpress/api-fetch
var require_api_fetch = __commonJS({
  "package-external:@wordpress/api-fetch"(exports, module) {
    module.exports = window.wp.apiFetch;
  }
});

// package-external:@wordpress/element
var require_element = __commonJS({
  "package-external:@wordpress/element"(exports, module) {
    module.exports = window.wp.element;
  }
});

// package-external:@wordpress/i18n
var require_i18n = __commonJS({
  "package-external:@wordpress/i18n"(exports, module) {
    module.exports = window.wp.i18n;
  }
});

// package-external:@wordpress/components
var require_components = __commonJS({
  "package-external:@wordpress/components"(exports, module) {
    module.exports = window.wp.components;
  }
});

// vendor-external:react
var require_react = __commonJS({
  "vendor-external:react"(exports, module) {
    module.exports = window.React;
  }
});

// vendor-external:react/jsx-runtime
var require_jsx_runtime = __commonJS({
  "vendor-external:react/jsx-runtime"(exports, module) {
    module.exports = window.ReactJSXRuntime;
  }
});

// vendor-external:react-dom
var require_react_dom = __commonJS({
  "vendor-external:react-dom"(exports, module) {
    module.exports = window.ReactDOM;
  }
});

// package-external:@wordpress/primitives
var require_primitives = __commonJS({
  "package-external:@wordpress/primitives"(exports, module) {
    module.exports = window.wp.primitives;
  }
});

// package-external:@wordpress/url
var require_url = __commonJS({
  "package-external:@wordpress/url"(exports, module) {
    module.exports = window.wp.url;
  }
});

// src/features/ai-launchpad/js/app.tsx
var import_api_fetch7 = __toESM(require_api_fetch());
var import_element22 = __toESM(require_element());

// src/features/ai-launchpad/js/lib/orchestration.ts
function decideInitialView(data) {
  return data.ai_output ? "list" : "wizard";
}
function isAllTasksMode(search) {
  return new URLSearchParams(search).get("all_tasks") === "1";
}

// src/features/ai-launchpad/js/tailored-list/tailored-list.tsx
var import_api_fetch3 = __toESM(require_api_fetch());
var import_element18 = __toESM(require_element());
var import_i18n5 = __toESM(require_i18n());

// src/features/ai-launchpad/js/lib/first-post.ts
var import_api_fetch = __toESM(require_api_fetch());
function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function toBlocks(paragraphs) {
  return paragraphs.map((text) => "<!-- wp:paragraph --><p>" + escapeHtml(text) + "</p><!-- /wp:paragraph -->").join("\n\n");
}
async function createFirstPostDraft(draft) {
  const post = await (0, import_api_fetch.default)({
    path: "/wp/v2/posts",
    method: "POST",
    data: {
      title: draft.title,
      content: toBlocks(draft.paragraphs),
      status: "draft",
      // Tag as the AI Launchpad first post so the server can recognise this exact draft and show the
      // in-progress "Continue" treatment, reopening it instead of drafting a second one.
      meta: { _wpcom_ai_launchpad_first_post: true }
    }
  });
  return {
    post_id: post.id,
    edit_url: "/wp-admin/post.php?post=" + post.id + "&action=edit"
  };
}

// src/features/ai-launchpad/js/lib/pattern-page.ts
var import_api_fetch2 = __toESM(require_api_fetch());
var PTK_ENDPOINT = "https://public-api.wordpress.com/rest/v1/ptk/patterns/en";
function nicheWords(inferred) {
  return [inferred.niche, inferred.vibe, inferred.audience].filter((value) => typeof value === "string" && value.length > 0).join(" ").toLowerCase().split(/[^a-z0-9]+/).filter((word) => word.length > 2);
}
function termTitles(taxonomy) {
  const terms = Array.isArray(taxonomy) ? taxonomy : Object.values(taxonomy ?? {});
  return terms.map((term) => term.title).filter((title) => typeof title === "string" && title.length > 0);
}
function score(pattern, words) {
  const haystack = [
    pattern.title ?? "",
    ...termTitles(pattern.categories),
    ...termTitles(pattern.tags)
  ].join(" ").toLowerCase();
  return words.reduce((total, word) => haystack.includes(word) ? total + 1 : total, 0);
}
function pickPattern(patterns, inferred) {
  const usable = patterns.filter((pattern) => typeof pattern.html === "string" && pattern.html);
  if (usable.length === 0) {
    return null;
  }
  const words = nicheWords(inferred);
  let best = usable[0];
  let bestScore = score(best, words);
  for (const pattern of usable.slice(1)) {
    const current = score(pattern, words);
    if (current > bestScore) {
      best = pattern;
      bestScore = current;
    }
  }
  return best;
}
var cachedPatterns = null;
async function createPatternPage(inferred) {
  if (cachedPatterns === null) {
    try {
      const response = await fetch(PTK_ENDPOINT);
      if (response.ok) {
        const body = await response.json();
        if (Array.isArray(body)) {
          cachedPatterns = body;
        }
      }
    } catch {
    }
  }
  const pattern = pickPattern(cachedPatterns ?? [], inferred);
  const page = await (0, import_api_fetch2.default)({
    path: "/wp/v2/pages",
    method: "POST",
    data: {
      title: pattern?.title ?? inferred.brand_name ?? "New page",
      content: pattern?.html ?? "",
      status: "draft",
      // Tag as the AI Launchpad About page so the server-side listener can complete add_about_page/update_about_page on publish or edit.
      meta: { _wpcom_ai_launchpad_about_page: true }
    }
  });
  return {
    page_id: page.id,
    edit_url: "/wp-admin/post.php?post=" + page.id + "&action=edit"
  };
}

// src/features/ai-launchpad/js/lib/tracks.ts
function record(eventName, props = {}) {
  window._tkq = window._tkq || [];
  window._tkq.push(["recordEvent", eventName, { ...props, launchpad_variant: "ai" }]);
}
function trackViewed() {
  record("jetpack_ai_launchpad_viewed");
}
function trackWizardCompleted() {
  record("jetpack_ai_launchpad_wizard_completed");
}
function trackAiResponseReceived(props) {
  record("jetpack_ai_launchpad_ai_response_received", props);
}
function trackTaskClicked(props) {
  record("jetpack_ai_launchpad_task_clicked", props);
}

// src/features/ai-launchpad/js/tailored-list/layout.tsx
var import_i18n3 = __toESM(require_i18n());

// ../../../node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
var clsx_default = clsx;

// src/features/ai-launchpad/js/tailored-list/site-preview.tsx
var import_components = __toESM(require_components());
var import_i18n2 = __toESM(require_i18n());

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/useControlled.js
var React2 = __toESM(require_react(), 1);

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/error.js
var set;
if (true) {
  set = /* @__PURE__ */ new Set();
}
function error(...messages) {
  if (true) {
    const messageKey = messages.join(" ");
    if (!set.has(messageKey)) {
      set.add(messageKey);
      console.error(`Base UI: ${messageKey}`);
    }
  }
}

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/useControlled.js
function useControlled({
  controlled,
  default: defaultProp,
  name,
  state = "value"
}) {
  const {
    current: isControlled
  } = React2.useRef(controlled !== void 0);
  const [valueState, setValue] = React2.useState(defaultProp);
  const value = isControlled ? controlled : valueState;
  if (true) {
    React2.useEffect(() => {
      if (isControlled !== (controlled !== void 0)) {
        error([`A component is changing the ${isControlled ? "" : "un"}controlled ${state} state of ${name} to be ${isControlled ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${name} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join("\n"));
      }
    }, [state, name, controlled]);
    const {
      current: defaultValue
    } = React2.useRef(defaultProp);
    React2.useEffect(() => {
      if (!isControlled && serializeToDevModeString(defaultValue) !== serializeToDevModeString(defaultProp)) {
        error([`A component is changing the default ${state} state of an uncontrolled ${name} after being initialized. To suppress this warning opt to use a controlled ${name}.`].join("\n"));
      }
    }, [defaultProp]);
  }
  const setValueIfUncontrolled = React2.useCallback((newValue) => {
    if (!isControlled) {
      setValue(newValue);
    }
  }, []);
  return [value, setValueIfUncontrolled];
}
function serializeToDevModeString(input) {
  let nextId = 0;
  const seen = /* @__PURE__ */ new WeakMap();
  try {
    const result = JSON.stringify(input, function replacer(key, value) {
      if (key === "_owner" && this != null && typeof this === "object" && "$$typeof" in this) {
        return void 0;
      }
      if (typeof value === "bigint") {
        return `__bigint__:${value}`;
      }
      if (value !== null && typeof value === "object") {
        const id = seen.get(value);
        if (id !== void 0) {
          return `__object__:${id}`;
        }
        seen.set(value, nextId);
        nextId += 1;
      }
      return value;
    });
    return result ?? `__top__:${typeof input}`;
  } catch {
    return "__unserializable__";
  }
}

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/safeReact.js
var React3 = __toESM(require_react(), 1);
var SafeReact = {
  ...React3
};

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/useRefWithInit.js
var React4 = __toESM(require_react(), 1);
var UNINITIALIZED = {};
function useRefWithInit(init, initArg) {
  const ref = React4.useRef(UNINITIALIZED);
  if (ref.current === UNINITIALIZED) {
    ref.current = init(initArg);
  }
  return ref;
}

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/useStableCallback.js
var useInsertionEffect = SafeReact.useInsertionEffect;
var useSafeInsertionEffect = (
  // React 17 doesn't have useInsertionEffect.
  useInsertionEffect && // Preact replaces useInsertionEffect with useLayoutEffect and fires too late.
  useInsertionEffect !== SafeReact.useLayoutEffect ? useInsertionEffect : (fn) => fn()
);
function useStableCallback(callback) {
  const stable = useRefWithInit(createStableCallback).current;
  stable.next = callback;
  useSafeInsertionEffect(stable.effect);
  return stable.trampoline;
}
function createStableCallback() {
  const stable = {
    next: void 0,
    callback: assertNotCalled,
    trampoline: (...args) => stable.callback?.(...args),
    effect: () => {
      stable.callback = stable.next;
    }
  };
  return stable;
}
function assertNotCalled() {
  if (true) {
    throw (
      /* minify-error-disabled */
      new Error("Base UI: Cannot call an event handler while rendering.")
    );
  }
}

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js
var React5 = __toESM(require_react(), 1);
var noop = () => {
};
var useIsoLayoutEffect = typeof document !== "undefined" ? React5.useLayoutEffect : noop;

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/warn.js
var set2;
if (true) {
  set2 = /* @__PURE__ */ new Set();
}
function warn(...messages) {
  if (true) {
    const messageKey = messages.join(" ");
    if (!set2.has(messageKey)) {
      set2.add(messageKey);
      console.warn(`Base UI: ${messageKey}`);
    }
  }
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/useRenderElement.js
var React8 = __toESM(require_react(), 1);

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/useMergedRefs.js
function useMergedRefs(a, b, c, d) {
  const forkRef = useRefWithInit(createForkRef).current;
  if (didChange(forkRef, a, b, c, d)) {
    update(forkRef, [a, b, c, d]);
  }
  return forkRef.callback;
}
function useMergedRefsN(refs) {
  const forkRef = useRefWithInit(createForkRef).current;
  if (didChangeN(forkRef, refs)) {
    update(forkRef, refs);
  }
  return forkRef.callback;
}
function createForkRef() {
  return {
    callback: null,
    cleanup: null,
    refs: []
  };
}
function didChange(forkRef, a, b, c, d) {
  return forkRef.refs[0] !== a || forkRef.refs[1] !== b || forkRef.refs[2] !== c || forkRef.refs[3] !== d;
}
function didChangeN(forkRef, newRefs) {
  return forkRef.refs.length !== newRefs.length || forkRef.refs.some((ref, index) => ref !== newRefs[index]);
}
function update(forkRef, refs) {
  forkRef.refs = refs;
  if (refs.every((ref) => ref == null)) {
    forkRef.callback = null;
    return;
  }
  forkRef.callback = (instance) => {
    if (forkRef.cleanup) {
      forkRef.cleanup();
      forkRef.cleanup = null;
    }
    if (instance != null) {
      const cleanupCallbacks = Array(refs.length).fill(null);
      for (let i = 0; i < refs.length; i += 1) {
        const ref = refs[i];
        if (ref == null) {
          continue;
        }
        switch (typeof ref) {
          case "function": {
            const refCleanup = ref(instance);
            if (typeof refCleanup === "function") {
              cleanupCallbacks[i] = refCleanup;
            }
            break;
          }
          case "object": {
            ref.current = instance;
            break;
          }
          default:
        }
      }
      forkRef.cleanup = () => {
        for (let i = 0; i < refs.length; i += 1) {
          const ref = refs[i];
          if (ref == null) {
            continue;
          }
          switch (typeof ref) {
            case "function": {
              const cleanupCallback = cleanupCallbacks[i];
              if (typeof cleanupCallback === "function") {
                cleanupCallback();
              } else {
                ref(null);
              }
              break;
            }
            case "object": {
              ref.current = null;
              break;
            }
            default:
          }
        }
      };
    }
  };
}

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/getReactElementRef.js
var React7 = __toESM(require_react(), 1);

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/reactVersion.js
var React6 = __toESM(require_react(), 1);
var majorVersion = parseInt(React6.version, 10);
function isReactVersionAtLeast(reactVersionToCheck) {
  return majorVersion >= reactVersionToCheck;
}

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/getReactElementRef.js
function getReactElementRef(element) {
  if (!/* @__PURE__ */ React7.isValidElement(element)) {
    return null;
  }
  const reactElement = element;
  const propsWithRef = reactElement.props;
  return (isReactVersionAtLeast(19) ? propsWithRef?.ref : reactElement.ref) ?? null;
}

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/mergeObjects.js
function mergeObjects(a, b) {
  if (a && !b) {
    return a;
  }
  if (!a && b) {
    return b;
  }
  if (a || b) {
    return {
      ...a,
      ...b
    };
  }
  return void 0;
}

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/empty.js
var EMPTY_ARRAY = Object.freeze([]);
var EMPTY_OBJECT = Object.freeze({});

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/getStateAttributesProps.js
function getStateAttributesProps(state, customMapping) {
  const props = {};
  for (const key in state) {
    const value = state[key];
    if (customMapping?.hasOwnProperty(key)) {
      const customProps = customMapping[key](value);
      if (customProps != null) {
        Object.assign(props, customProps);
      }
      continue;
    }
    if (value === true) {
      props[`data-${key.toLowerCase()}`] = "";
    } else if (value) {
      props[`data-${key.toLowerCase()}`] = value.toString();
    }
  }
  return props;
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/utils/resolveClassName.js
function resolveClassName(className, state) {
  return typeof className === "function" ? className(state) : className;
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/utils/resolveStyle.js
function resolveStyle(style, state) {
  return typeof style === "function" ? style(state) : style;
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/merge-props/mergeProps.js
var EMPTY_PROPS = {};
function mergeProps(a, b, c, d, e) {
  if (!c && !d && !e && !a) {
    return createInitialMergedProps(b);
  }
  let merged = createInitialMergedProps(a);
  if (b) {
    merged = mergeInto(merged, b);
  }
  if (c) {
    merged = mergeInto(merged, c);
  }
  if (d) {
    merged = mergeInto(merged, d);
  }
  if (e) {
    merged = mergeInto(merged, e);
  }
  return merged;
}
function mergePropsN(props) {
  if (props.length === 0) {
    return EMPTY_PROPS;
  }
  if (props.length === 1) {
    return createInitialMergedProps(props[0]);
  }
  let merged = createInitialMergedProps(props[0]);
  for (let i = 1; i < props.length; i += 1) {
    merged = mergeInto(merged, props[i]);
  }
  return merged;
}
function createInitialMergedProps(inputProps) {
  if (isPropsGetter(inputProps)) {
    return {
      ...resolvePropsGetter(inputProps, EMPTY_PROPS)
    };
  }
  return copyInitialProps(inputProps);
}
function mergeInto(merged, inputProps) {
  if (isPropsGetter(inputProps)) {
    return resolvePropsGetter(inputProps, merged);
  }
  return mutablyMergeInto(merged, inputProps);
}
function copyInitialProps(inputProps) {
  const copiedProps = {
    ...inputProps
  };
  for (const propName in copiedProps) {
    const propValue = copiedProps[propName];
    if (isEventHandler(propName, propValue)) {
      copiedProps[propName] = wrapEventHandler(propValue);
    }
  }
  return copiedProps;
}
function mutablyMergeInto(mergedProps, externalProps) {
  if (!externalProps) {
    return mergedProps;
  }
  for (const propName in externalProps) {
    const externalPropValue = externalProps[propName];
    switch (propName) {
      case "style": {
        mergedProps[propName] = mergeObjects(mergedProps.style, externalPropValue);
        break;
      }
      case "className": {
        mergedProps[propName] = mergeClassNames(mergedProps.className, externalPropValue);
        break;
      }
      default: {
        if (isEventHandler(propName, externalPropValue)) {
          mergedProps[propName] = mergeEventHandlers(mergedProps[propName], externalPropValue);
        } else {
          mergedProps[propName] = externalPropValue;
        }
      }
    }
  }
  return mergedProps;
}
function isEventHandler(key, value) {
  const code0 = key.charCodeAt(0);
  const code1 = key.charCodeAt(1);
  const code2 = key.charCodeAt(2);
  return code0 === 111 && code1 === 110 && code2 >= 65 && code2 <= 90 && (typeof value === "function" || typeof value === "undefined");
}
function isPropsGetter(inputProps) {
  return typeof inputProps === "function";
}
function resolvePropsGetter(inputProps, previousProps) {
  if (isPropsGetter(inputProps)) {
    return inputProps(previousProps);
  }
  return inputProps ?? EMPTY_PROPS;
}
function mergeEventHandlers(ourHandler, theirHandler) {
  if (!theirHandler) {
    return ourHandler;
  }
  if (!ourHandler) {
    return wrapEventHandler(theirHandler);
  }
  return (...args) => {
    const event = args[0];
    if (isSyntheticEvent(event)) {
      const baseUIEvent = event;
      makeEventPreventable(baseUIEvent);
      const result2 = theirHandler(...args);
      if (!baseUIEvent.baseUIHandlerPrevented) {
        ourHandler?.(...args);
      }
      return result2;
    }
    const result = theirHandler(...args);
    ourHandler?.(...args);
    return result;
  };
}
function wrapEventHandler(handler) {
  if (!handler) {
    return handler;
  }
  return (...args) => {
    const event = args[0];
    if (isSyntheticEvent(event)) {
      makeEventPreventable(event);
    }
    return handler(...args);
  };
}
function makeEventPreventable(event) {
  event.preventBaseUIHandler = () => {
    event.baseUIHandlerPrevented = true;
  };
  return event;
}
function mergeClassNames(ourClassName, theirClassName) {
  if (theirClassName) {
    if (ourClassName) {
      return theirClassName + " " + ourClassName;
    }
    return theirClassName;
  }
  return ourClassName;
}
function isSyntheticEvent(event) {
  return event != null && typeof event === "object" && "nativeEvent" in event;
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/useRenderElement.js
var import_react = __toESM(require_react(), 1);
function useRenderElement(element, componentProps, params = {}) {
  const renderProp = componentProps.render;
  const outProps = useRenderElementProps(componentProps, params);
  if (params.enabled === false) {
    return null;
  }
  const state = params.state ?? EMPTY_OBJECT;
  return evaluateRenderProp(element, renderProp, outProps, state);
}
function useRenderElementProps(componentProps, params = {}) {
  const {
    className: classNameProp,
    style: styleProp,
    render: renderProp
  } = componentProps;
  const {
    state = EMPTY_OBJECT,
    ref,
    props,
    stateAttributesMapping: stateAttributesMapping2,
    enabled = true
  } = params;
  const className = enabled ? resolveClassName(classNameProp, state) : void 0;
  const style = enabled ? resolveStyle(styleProp, state) : void 0;
  const stateProps = enabled ? getStateAttributesProps(state, stateAttributesMapping2) : EMPTY_OBJECT;
  const resolvedProps = enabled && props ? resolveRenderFunctionProps(props) : void 0;
  const outProps = enabled ? mergeObjects(stateProps, resolvedProps) ?? {} : EMPTY_OBJECT;
  if (typeof document !== "undefined") {
    if (!enabled) {
      useMergedRefs(null, null);
    } else if (Array.isArray(ref)) {
      outProps.ref = useMergedRefsN([outProps.ref, getReactElementRef(renderProp), ...ref]);
    } else {
      outProps.ref = useMergedRefs(outProps.ref, getReactElementRef(renderProp), ref);
    }
  }
  if (!enabled) {
    return EMPTY_OBJECT;
  }
  if (className !== void 0) {
    outProps.className = mergeClassNames(outProps.className, className);
  }
  if (style !== void 0) {
    outProps.style = mergeObjects(outProps.style, style);
  }
  return outProps;
}
function resolveRenderFunctionProps(props) {
  if (Array.isArray(props)) {
    return mergePropsN(props);
  }
  return mergeProps(void 0, props);
}
var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
var COMPONENT_IDENTIFIER_PATTERN = /^[A-Z][A-Za-z0-9$]*$/;
var LOWERCASE_CHARACTER_PATTERN = /[a-z]/;
function evaluateRenderProp(element, render, props, state) {
  if (render) {
    if (typeof render === "function") {
      if (true) {
        warnIfRenderPropLooksLikeComponent(render);
      }
      return render(props, state);
    }
    const mergedProps = mergeProps(props, render.props);
    mergedProps.ref = props.ref;
    let newElement = render;
    if (newElement?.$$typeof === REACT_LAZY_TYPE) {
      const children = React8.Children.toArray(render);
      newElement = children[0];
    }
    if (true) {
      if (!/* @__PURE__ */ React8.isValidElement(newElement)) {
        throw new Error(["Base UI: The `render` prop was provided an invalid React element as `React.isValidElement(render)` is `false`.", "A valid React element must be provided to the `render` prop because it is cloned with props to replace the default element.", "https://base-ui.com/r/invalid-render-prop"].join("\n"));
      }
    }
    return /* @__PURE__ */ React8.cloneElement(newElement, mergedProps);
  }
  if (element) {
    if (typeof element === "string") {
      return renderTag(element, props);
    }
  }
  throw new Error(true ? "Base UI: Render element or function are not defined." : formatErrorMessage_default(8));
}
function warnIfRenderPropLooksLikeComponent(renderFn) {
  const functionName = renderFn.name;
  if (functionName.length === 0) {
    return;
  }
  if (!COMPONENT_IDENTIFIER_PATTERN.test(functionName)) {
    return;
  }
  if (!LOWERCASE_CHARACTER_PATTERN.test(functionName)) {
    return;
  }
  warn(`The \`render\` prop received a function named \`${functionName}\` that starts with an uppercase letter.`, "This usually means a React component was passed directly as `render={Component}`.", "Base UI calls `render` as a plain function, which can break the Rules of Hooks during reconciliation.", "If this is an intentional render callback, rename it to start with a lowercase letter.", "Use `render={<Component />}` or `render={(props) => <Component {...props} />}` instead.", "https://base-ui.com/r/invalid-render-prop");
}
function renderTag(Tag, props) {
  if (Tag === "button") {
    return /* @__PURE__ */ (0, import_react.createElement)("button", {
      type: "button",
      ...props,
      key: props.key
    });
  }
  if (Tag === "img") {
    return /* @__PURE__ */ (0, import_react.createElement)("img", {
      alt: "",
      ...props,
      key: props.key
    });
  }
  return /* @__PURE__ */ React8.createElement(Tag, props);
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/reason-parts.js
var reason_parts_exports = {};
__export(reason_parts_exports, {
  cancelOpen: () => cancelOpen,
  chipRemovePress: () => chipRemovePress,
  clearPress: () => clearPress,
  closePress: () => closePress,
  closeWatcher: () => closeWatcher,
  decrementPress: () => decrementPress,
  disabled: () => disabled,
  drag: () => drag,
  escapeKey: () => escapeKey,
  focusOut: () => focusOut,
  imperativeAction: () => imperativeAction,
  incrementPress: () => incrementPress,
  initial: () => initial,
  inputBlur: () => inputBlur,
  inputChange: () => inputChange,
  inputClear: () => inputClear,
  inputPaste: () => inputPaste,
  inputPress: () => inputPress,
  itemPress: () => itemPress,
  keyboard: () => keyboard,
  linkPress: () => linkPress,
  listNavigation: () => listNavigation,
  missing: () => missing,
  none: () => none,
  outsidePress: () => outsidePress,
  pointer: () => pointer,
  scrub: () => scrub,
  siblingOpen: () => siblingOpen,
  swipe: () => swipe,
  trackPress: () => trackPress,
  triggerFocus: () => triggerFocus,
  triggerHover: () => triggerHover,
  triggerPress: () => triggerPress,
  wheel: () => wheel,
  windowResize: () => windowResize
});
var none = "none";
var triggerPress = "trigger-press";
var triggerHover = "trigger-hover";
var triggerFocus = "trigger-focus";
var outsidePress = "outside-press";
var itemPress = "item-press";
var closePress = "close-press";
var linkPress = "link-press";
var clearPress = "clear-press";
var chipRemovePress = "chip-remove-press";
var trackPress = "track-press";
var incrementPress = "increment-press";
var decrementPress = "decrement-press";
var inputChange = "input-change";
var inputClear = "input-clear";
var inputBlur = "input-blur";
var inputPaste = "input-paste";
var inputPress = "input-press";
var focusOut = "focus-out";
var escapeKey = "escape-key";
var closeWatcher = "close-watcher";
var listNavigation = "list-navigation";
var keyboard = "keyboard";
var pointer = "pointer";
var drag = "drag";
var wheel = "wheel";
var scrub = "scrub";
var cancelOpen = "cancel-open";
var siblingOpen = "sibling-open";
var disabled = "disabled";
var missing = "missing";
var initial = "initial";
var imperativeAction = "imperative-action";
var swipe = "swipe";
var windowResize = "window-resize";

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/createBaseUIEventDetails.js
function createChangeEventDetails(reason, event, trigger, customProperties) {
  let canceled = false;
  let allowPropagation = false;
  const custom = customProperties ?? EMPTY_OBJECT;
  const details = {
    reason,
    event: event ?? new Event("base-ui"),
    cancel() {
      canceled = true;
    },
    allowPropagation() {
      allowPropagation = true;
    },
    get isCanceled() {
      return canceled;
    },
    get isPropagationAllowed() {
      return allowPropagation;
    },
    trigger,
    ...custom
  };
  return details;
}

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/useId.js
var React9 = __toESM(require_react(), 1);
var globalId = 0;
function useGlobalId(idOverride, prefix = "mui") {
  const [defaultId, setDefaultId] = React9.useState(idOverride);
  const id = idOverride || defaultId;
  React9.useEffect(() => {
    if (defaultId == null) {
      globalId += 1;
      setDefaultId(`${prefix}-${globalId}`);
    }
  }, [defaultId, prefix]);
  return id;
}
var maybeReactUseId = SafeReact.useId;
function useId(idOverride, prefix) {
  if (maybeReactUseId !== void 0) {
    const reactId = maybeReactUseId();
    return idOverride ?? (prefix ? `${prefix}-${reactId}` : reactId);
  }
  return useGlobalId(idOverride, prefix);
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/useBaseUiId.js
function useBaseUiId(idOverride) {
  return useId(idOverride, "base-ui");
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/collapsible/root/useCollapsibleRoot.js
var React12 = __toESM(require_react(), 1);

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/useTransitionStatus.js
var React11 = __toESM(require_react(), 1);

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/useOnMount.js
var React10 = __toESM(require_react(), 1);
var EMPTY = [];
function useOnMount(fn) {
  React10.useEffect(fn, EMPTY);
}

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/useAnimationFrame.js
var EMPTY2 = null;
var LAST_RAF = globalThis.requestAnimationFrame;
var Scheduler = class {
  /* This implementation uses an array as a backing data-structure for frame callbacks.
   * It allows `O(1)` callback cancelling by inserting a `null` in the array, though it
   * never calls the native `cancelAnimationFrame` if there are no frames left. This can
   * be much more efficient if there is a call pattern that alterns as
   * "request-cancel-request-cancel-…".
   * But in the case of "request-request-…-cancel-cancel-…", it leaves the final animation
   * frame to run anyway. We turn that frame into a `O(1)` no-op via `callbacksCount`. */
  callbacks = [];
  callbacksCount = 0;
  nextId = 1;
  startId = 1;
  isScheduled = false;
  tick = (timestamp) => {
    this.isScheduled = false;
    const currentCallbacks = this.callbacks;
    const currentCallbacksCount = this.callbacksCount;
    this.callbacks = [];
    this.callbacksCount = 0;
    this.startId = this.nextId;
    if (currentCallbacksCount > 0) {
      for (let i = 0; i < currentCallbacks.length; i += 1) {
        currentCallbacks[i]?.(timestamp);
      }
    }
  };
  request(fn) {
    const id = this.nextId;
    this.nextId += 1;
    this.callbacks.push(fn);
    this.callbacksCount += 1;
    const didRAFChange = LAST_RAF !== requestAnimationFrame && (LAST_RAF = requestAnimationFrame, true);
    if (!this.isScheduled || didRAFChange) {
      requestAnimationFrame(this.tick);
      this.isScheduled = true;
    }
    return id;
  }
  cancel(id) {
    const index = id - this.startId;
    if (index < 0 || index >= this.callbacks.length) {
      return;
    }
    this.callbacks[index] = null;
    this.callbacksCount -= 1;
  }
};
var scheduler = new Scheduler();
var AnimationFrame = class _AnimationFrame {
  static create() {
    return new _AnimationFrame();
  }
  static request(fn) {
    return scheduler.request(fn);
  }
  static cancel(id) {
    return scheduler.cancel(id);
  }
  currentId = EMPTY2;
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  request(fn) {
    this.cancel();
    this.currentId = scheduler.request(() => {
      this.currentId = EMPTY2;
      fn();
    });
  }
  cancel = () => {
    if (this.currentId !== EMPTY2) {
      scheduler.cancel(this.currentId);
      this.currentId = EMPTY2;
    }
  };
  disposeEffect = () => {
    return this.cancel;
  };
};
function useAnimationFrame() {
  const timeout = useRefWithInit(AnimationFrame.create).current;
  useOnMount(timeout.disposeEffect);
  return timeout;
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/useTransitionStatus.js
function useTransitionStatus(open, enableIdleState = false, deferEndingState = false) {
  const [transitionStatus, setTransitionStatus] = React11.useState(open && enableIdleState ? "idle" : void 0);
  const [mounted, setMounted] = React11.useState(open);
  if (open && !mounted) {
    setMounted(true);
    setTransitionStatus("starting");
  }
  if (!open && mounted && transitionStatus !== "ending" && !deferEndingState) {
    setTransitionStatus("ending");
  }
  if (!open && !mounted && transitionStatus === "ending") {
    setTransitionStatus(void 0);
  }
  useIsoLayoutEffect(() => {
    if (!open && mounted && transitionStatus !== "ending" && deferEndingState) {
      const frame = AnimationFrame.request(() => {
        setTransitionStatus("ending");
      });
      return () => {
        AnimationFrame.cancel(frame);
      };
    }
    return void 0;
  }, [open, mounted, transitionStatus, deferEndingState]);
  useIsoLayoutEffect(() => {
    if (!open || enableIdleState) {
      return void 0;
    }
    const frame = AnimationFrame.request(() => {
      setTransitionStatus(void 0);
    });
    return () => {
      AnimationFrame.cancel(frame);
    };
  }, [enableIdleState, open]);
  useIsoLayoutEffect(() => {
    if (!open || !enableIdleState) {
      return void 0;
    }
    if (open && mounted && transitionStatus !== "idle") {
      setTransitionStatus("starting");
    }
    const frame = AnimationFrame.request(() => {
      setTransitionStatus("idle");
    });
    return () => {
      AnimationFrame.cancel(frame);
    };
  }, [enableIdleState, open, mounted, transitionStatus]);
  return {
    mounted,
    setMounted,
    transitionStatus
  };
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/collapsible/root/useCollapsibleRoot.js
function useCollapsibleRoot(parameters) {
  const {
    open: openParam,
    defaultOpen,
    onOpenChange,
    disabled: disabled2
  } = parameters;
  const [open, setOpen] = useControlled({
    controlled: openParam,
    default: defaultOpen,
    name: "Collapsible",
    state: "open"
  });
  const {
    mounted,
    setMounted,
    transitionStatus
  } = useTransitionStatus(open, true, true);
  const defaultPanelId = useBaseUiId();
  const [panelIdState, setPanelIdState] = React12.useState();
  const panelId = panelIdState ?? defaultPanelId;
  const handleTrigger = useStableCallback((event) => {
    const nextOpen = !open;
    const eventDetails = createChangeEventDetails(reason_parts_exports.triggerPress, event.nativeEvent);
    onOpenChange(nextOpen, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setOpen(nextOpen);
  });
  return React12.useMemo(() => ({
    disabled: disabled2,
    handleTrigger,
    mounted,
    open,
    panelId,
    setMounted,
    setOpen,
    setPanelIdState,
    transitionStatus
  }), [disabled2, handleTrigger, mounted, open, panelId, setMounted, setOpen, setPanelIdState, transitionStatus]);
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/collapsible/root/CollapsibleRootContext.js
var React13 = __toESM(require_react(), 1);
var CollapsibleRootContext = /* @__PURE__ */ React13.createContext(void 0);
if (true) CollapsibleRootContext.displayName = "CollapsibleRootContext";
function useCollapsibleRootContext() {
  const context = React13.useContext(CollapsibleRootContext);
  if (context === void 0) {
    throw new Error(true ? "Base UI: CollapsibleRootContext is missing. Collapsible parts must be placed within <Collapsible.Root>." : formatErrorMessage_default(15));
  }
  return context;
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/stateAttributesMapping.js
var TransitionStatusDataAttributes = /* @__PURE__ */ (function(TransitionStatusDataAttributes2) {
  TransitionStatusDataAttributes2["startingStyle"] = "data-starting-style";
  TransitionStatusDataAttributes2["endingStyle"] = "data-ending-style";
  return TransitionStatusDataAttributes2;
})({});
var STARTING_HOOK = {
  [TransitionStatusDataAttributes.startingStyle]: ""
};
var ENDING_HOOK = {
  [TransitionStatusDataAttributes.endingStyle]: ""
};
var transitionStatusMapping = {
  transitionStatus(value) {
    if (value === "starting") {
      return STARTING_HOOK;
    }
    if (value === "ending") {
      return ENDING_HOOK;
    }
    return null;
  }
};

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/collapsible/panel/CollapsiblePanelDataAttributes.js
var CollapsiblePanelDataAttributes = (function(CollapsiblePanelDataAttributes2) {
  CollapsiblePanelDataAttributes2["open"] = "data-open";
  CollapsiblePanelDataAttributes2["closed"] = "data-closed";
  CollapsiblePanelDataAttributes2[CollapsiblePanelDataAttributes2["startingStyle"] = TransitionStatusDataAttributes.startingStyle] = "startingStyle";
  CollapsiblePanelDataAttributes2[CollapsiblePanelDataAttributes2["endingStyle"] = TransitionStatusDataAttributes.endingStyle] = "endingStyle";
  return CollapsiblePanelDataAttributes2;
})({});

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/collapsible/trigger/CollapsibleTriggerDataAttributes.js
var CollapsibleTriggerDataAttributes = /* @__PURE__ */ (function(CollapsibleTriggerDataAttributes2) {
  CollapsibleTriggerDataAttributes2["panelOpen"] = "data-panel-open";
  return CollapsibleTriggerDataAttributes2;
})({});

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/utils/collapsibleOpenStateMapping.js
var PANEL_OPEN_HOOK = {
  [CollapsiblePanelDataAttributes.open]: ""
};
var PANEL_CLOSED_HOOK = {
  [CollapsiblePanelDataAttributes.closed]: ""
};
var triggerOpenStateMapping = {
  open(value) {
    if (value) {
      return {
        [CollapsibleTriggerDataAttributes.panelOpen]: ""
      };
    }
    return null;
  }
};
var collapsibleOpenStateMapping = {
  open(value) {
    if (value) {
      return PANEL_OPEN_HOOK;
    }
    return PANEL_CLOSED_HOOK;
  }
};

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/use-button/useButton.js
var React16 = __toESM(require_react(), 1);

// ../../../node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
  return typeof window !== "undefined";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/composite/root/CompositeRootContext.js
var React14 = __toESM(require_react(), 1);
var CompositeRootContext = /* @__PURE__ */ React14.createContext(void 0);
if (true) CompositeRootContext.displayName = "CompositeRootContext";
function useCompositeRootContext(optional = false) {
  const context = React14.useContext(CompositeRootContext);
  if (context === void 0 && !optional) {
    throw new Error(true ? "Base UI: CompositeRootContext is missing. Composite parts must be placed within <Composite.Root>." : formatErrorMessage_default(16));
  }
  return context;
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/utils/useFocusableWhenDisabled.js
var React15 = __toESM(require_react(), 1);
function useFocusableWhenDisabled(parameters) {
  const {
    focusableWhenDisabled,
    disabled: disabled2,
    composite = false,
    tabIndex: tabIndexProp = 0,
    isNativeButton
  } = parameters;
  const isFocusableComposite = composite && focusableWhenDisabled !== false;
  const isNonFocusableComposite = composite && focusableWhenDisabled === false;
  const props = React15.useMemo(() => {
    const additionalProps = {
      // allow Tabbing away from focusableWhenDisabled elements
      onKeyDown(event) {
        if (disabled2 && focusableWhenDisabled && event.key !== "Tab") {
          event.preventDefault();
        }
      }
    };
    if (!composite) {
      additionalProps.tabIndex = tabIndexProp;
      if (!isNativeButton && disabled2) {
        additionalProps.tabIndex = focusableWhenDisabled ? tabIndexProp : -1;
      }
    }
    if (isNativeButton && (focusableWhenDisabled || isFocusableComposite) || !isNativeButton && disabled2) {
      additionalProps["aria-disabled"] = disabled2;
    }
    if (isNativeButton && (!focusableWhenDisabled || isNonFocusableComposite)) {
      additionalProps.disabled = disabled2;
    }
    return additionalProps;
  }, [composite, disabled2, focusableWhenDisabled, isFocusableComposite, isNonFocusableComposite, isNativeButton, tabIndexProp]);
  return {
    props
  };
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/use-button/useButton.js
function useButton(parameters = {}) {
  const {
    disabled: disabled2 = false,
    focusableWhenDisabled,
    tabIndex = 0,
    native: isNativeButton = true,
    composite: compositeProp
  } = parameters;
  const elementRef = React16.useRef(null);
  const compositeRootContext = useCompositeRootContext(true);
  const isCompositeItem = compositeProp ?? compositeRootContext !== void 0;
  const {
    props: focusableWhenDisabledProps
  } = useFocusableWhenDisabled({
    focusableWhenDisabled,
    disabled: disabled2,
    composite: isCompositeItem,
    tabIndex,
    isNativeButton
  });
  if (true) {
    React16.useEffect(() => {
      if (!elementRef.current) {
        return;
      }
      const isButtonTag = isButtonElement(elementRef.current);
      if (isNativeButton) {
        if (!isButtonTag) {
          const ownerStackMessage = SafeReact.captureOwnerStack?.() || "";
          const message = "A component that acts as a button expected a native <button> because the `nativeButton` prop is true. Rendering a non-<button> removes native button semantics, which can impact forms and accessibility. Use a real <button> in the `render` prop, or set `nativeButton` to `false`.";
          error(`${message}${ownerStackMessage}`);
        }
      } else if (isButtonTag) {
        const ownerStackMessage = SafeReact.captureOwnerStack?.() || "";
        const message = "A component that acts as a button expected a non-<button> because the `nativeButton` prop is false. Rendering a <button> keeps native behavior while Base UI applies non-native attributes and handlers, which can add unintended extra attributes (such as `role` or `aria-disabled`). Use a non-<button> in the `render` prop, or set `nativeButton` to `true`.";
        error(`${message}${ownerStackMessage}`);
      }
    }, [isNativeButton]);
  }
  const updateDisabled = React16.useCallback(() => {
    const element = elementRef.current;
    if (!isButtonElement(element)) {
      return;
    }
    if (isCompositeItem && disabled2 && focusableWhenDisabledProps.disabled === void 0 && element.disabled) {
      element.disabled = false;
    }
  }, [disabled2, focusableWhenDisabledProps.disabled, isCompositeItem]);
  useIsoLayoutEffect(updateDisabled, [updateDisabled]);
  const getButtonProps = React16.useCallback((externalProps = {}) => {
    const {
      onClick: externalOnClick,
      onMouseDown: externalOnMouseDown,
      onKeyUp: externalOnKeyUp,
      onKeyDown: externalOnKeyDown,
      onPointerDown: externalOnPointerDown,
      ...otherExternalProps
    } = externalProps;
    return mergeProps({
      onClick(event) {
        if (disabled2) {
          event.preventDefault();
          return;
        }
        externalOnClick?.(event);
      },
      onMouseDown(event) {
        if (!disabled2) {
          externalOnMouseDown?.(event);
        }
      },
      onKeyDown(event) {
        if (disabled2) {
          return;
        }
        makeEventPreventable(event);
        externalOnKeyDown?.(event);
        if (event.baseUIHandlerPrevented) {
          return;
        }
        const isCurrentTarget = event.target === event.currentTarget;
        const currentTarget = event.currentTarget;
        const isButton = isButtonElement(currentTarget);
        const isLink = !isNativeButton && isValidLinkElement(currentTarget);
        const shouldClick = isCurrentTarget && (isNativeButton ? isButton : !isLink);
        const isEnterKey = event.key === "Enter";
        const isSpaceKey = event.key === " ";
        const role = currentTarget.getAttribute("role");
        const isTextNavigationRole = role?.startsWith("menuitem") || role === "option" || role === "gridcell";
        if (isCurrentTarget && isCompositeItem && isSpaceKey) {
          if (event.defaultPrevented && isTextNavigationRole) {
            return;
          }
          event.preventDefault();
          if (isLink || isNativeButton && isButton) {
            currentTarget.click();
            event.preventBaseUIHandler();
          } else if (shouldClick) {
            externalOnClick?.(event);
            event.preventBaseUIHandler();
          }
          return;
        }
        if (shouldClick) {
          if (!isNativeButton && (isSpaceKey || isEnterKey)) {
            event.preventDefault();
          }
          if (!isNativeButton && isEnterKey) {
            externalOnClick?.(event);
          }
        }
      },
      onKeyUp(event) {
        if (disabled2) {
          return;
        }
        makeEventPreventable(event);
        externalOnKeyUp?.(event);
        if (event.target === event.currentTarget && isNativeButton && isCompositeItem && isButtonElement(event.currentTarget) && event.key === " ") {
          event.preventDefault();
          return;
        }
        if (event.baseUIHandlerPrevented) {
          return;
        }
        if (event.target === event.currentTarget && !isNativeButton && !isCompositeItem && event.key === " ") {
          externalOnClick?.(event);
        }
      },
      onPointerDown(event) {
        if (disabled2) {
          event.preventDefault();
          return;
        }
        externalOnPointerDown?.(event);
      }
    }, isNativeButton ? {
      type: "button"
    } : {
      role: "button"
    }, focusableWhenDisabledProps, otherExternalProps);
  }, [disabled2, focusableWhenDisabledProps, isCompositeItem, isNativeButton]);
  const buttonRef = useStableCallback((element) => {
    elementRef.current = element;
    updateDisabled();
  });
  return {
    getButtonProps,
    buttonRef
  };
}
function isButtonElement(elem) {
  return isHTMLElement(elem) && elem.tagName === "BUTTON";
}
function isValidLinkElement(elem) {
  return Boolean(elem?.tagName === "A" && elem?.href);
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/collapsible/panel/useCollapsiblePanel.js
var React18 = __toESM(require_react(), 1);

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/addEventListener.js
function addEventListener(target, type, listener, options) {
  target.addEventListener(type, listener, options);
  return () => {
    target.removeEventListener(type, listener, options);
  };
}

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/useValueAsRef.js
function useValueAsRef(value) {
  const latest = useRefWithInit(createLatestRef, value).current;
  latest.next = value;
  useIsoLayoutEffect(latest.effect);
  return latest;
}
function createLatestRef(value) {
  const latest = {
    current: value,
    next: value,
    effect: () => {
      latest.current = latest.next;
    }
  };
  return latest;
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/useOpenChangeComplete.js
var React17 = __toESM(require_react(), 1);

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/useAnimationsFinished.js
var ReactDOM = __toESM(require_react_dom(), 1);

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/utils/resolveRef.js
function resolveRef(maybeRef) {
  if (maybeRef == null) {
    return maybeRef;
  }
  return "current" in maybeRef ? maybeRef.current : maybeRef;
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/useAnimationsFinished.js
function useAnimationsFinished(elementOrRef, waitForStartingStyleRemoved = false, treatAbortedAsFinished = true) {
  const frame = useAnimationFrame();
  return useStableCallback((fnToExecute, signal = null) => {
    frame.cancel();
    const element = resolveRef(elementOrRef);
    if (element == null) {
      return;
    }
    const resolvedElement = element;
    const done = () => {
      ReactDOM.flushSync(fnToExecute);
    };
    if (typeof resolvedElement.getAnimations !== "function" || globalThis.BASE_UI_ANIMATIONS_DISABLED) {
      fnToExecute();
      return;
    }
    function exec() {
      Promise.all(resolvedElement.getAnimations().map((animation) => animation.finished)).then(() => {
        if (!signal?.aborted) {
          done();
        }
      }).catch(() => {
        if (treatAbortedAsFinished) {
          if (!signal?.aborted) {
            done();
          }
          return;
        }
        const currentAnimations = resolvedElement.getAnimations();
        if (!signal?.aborted && currentAnimations.length > 0 && currentAnimations.some((animation) => animation.pending || animation.playState !== "finished")) {
          exec();
        }
      });
    }
    if (waitForStartingStyleRemoved) {
      const startingStyleAttribute = TransitionStatusDataAttributes.startingStyle;
      if (!resolvedElement.hasAttribute(startingStyleAttribute)) {
        frame.request(exec);
        return;
      }
      const attributeObserver = new MutationObserver(() => {
        if (!resolvedElement.hasAttribute(startingStyleAttribute)) {
          attributeObserver.disconnect();
          exec();
        }
      });
      attributeObserver.observe(resolvedElement, {
        attributes: true,
        attributeFilter: [startingStyleAttribute]
      });
      signal?.addEventListener("abort", () => attributeObserver.disconnect(), {
        once: true
      });
      return;
    }
    frame.request(exec);
  });
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/useOpenChangeComplete.js
function useOpenChangeComplete(parameters) {
  const {
    enabled = true,
    open,
    ref,
    onComplete: onCompleteParam
  } = parameters;
  const onComplete = useStableCallback(onCompleteParam);
  const runOnceAnimationsFinish = useAnimationsFinished(ref, open, false);
  React17.useEffect(() => {
    if (!enabled) {
      return void 0;
    }
    const abortController = new AbortController();
    runOnceAnimationsFinish(onComplete, abortController.signal);
    return () => {
      abortController.abort();
    };
  }, [enabled, open, onComplete, runOnceAnimationsFinish]);
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/collapsible/panel/useCollapsiblePanel.js
var EMPTY_DIMENSIONS = {
  height: void 0,
  width: void 0
};
function useCollapsiblePanel(parameters) {
  const {
    externalRef,
    hiddenUntilFound,
    id: idParam,
    keepMounted,
    mounted,
    onOpenChange,
    open,
    setMounted,
    setOpen,
    transitionStatus
  } = parameters;
  const panelRef = React18.useRef(null);
  const animationTypeRef = React18.useRef(null);
  const [dimensions, setDimensionsUnwrapped] = React18.useState(EMPTY_DIMENSIONS);
  const lastMeasuredDimensionsRef = React18.useRef(EMPTY_DIMENSIONS);
  const shouldSkipNextOpenRef = React18.useRef(false);
  const shouldPreventMountAnimationRef = React18.useRef(open);
  const shouldPreventActivityResumeAnimationRef = React18.useRef(false);
  const [forcePanelIdle, setForcePanelIdle] = React18.useState(false);
  const pendingTemporaryStyleRestoreRef = React18.useRef(null);
  const mergedPanelRef = useMergedRefs(externalRef, panelRef);
  const latestStateRef = useValueAsRef({
    mounted,
    open
  });
  const runOnceCloseAnimationsFinish = useAnimationsFinished(panelRef, false, false);
  const hidden = !open && !mounted;
  const panelTransitionStatus = forcePanelIdle ? "idle" : transitionStatus;
  const shouldPreventOpenAnimation = open && // These 2 refs are safe to read in render, they are only written from committed
  // layout/effect paths and gate one-shot motion suppression for the next open
  // lifecycle. They intentionally expose the last committed motion snapshot.
  (shouldPreventMountAnimationRef.current || shouldPreventActivityResumeAnimationRef.current);
  const renderedDimensions = !open && mounted && // These 2 refs are also safe to read in render, both hold the last committed
  // animation mode and measurement. This fallback only restores a previously
  // measured pixel size after the live dimensions state has been reset back to `auto`.
  animationTypeRef.current === "css-animation" && dimensions.height === void 0 && dimensions.width === void 0 ? lastMeasuredDimensionsRef.current : dimensions;
  const shouldPersistHiddenTransitionStyles = hiddenUntilFound && hidden && animationTypeRef.current !== "css-animation";
  const setDimensions = useStableCallback((nextDimensions, shouldCacheMeasurement = true) => {
    if (shouldCacheMeasurement) {
      lastMeasuredDimensionsRef.current = nextDimensions;
    }
    setDimensionsUnwrapped(nextDimensions);
  });
  const restorePendingTemporaryStyle = useStableCallback(() => {
    pendingTemporaryStyleRestoreRef.current?.();
    pendingTemporaryStyleRestoreRef.current = null;
  });
  const setPendingTemporaryStyleRestore = useStableCallback((restore) => {
    restorePendingTemporaryStyle();
    pendingTemporaryStyleRestoreRef.current = () => {
      pendingTemporaryStyleRestoreRef.current = null;
      restore();
    };
  });
  const markActivityResumeAnimationSuppressed = useStableCallback(() => {
    if (open && mounted && animationTypeRef.current === "css-animation") {
      shouldPreventActivityResumeAnimationRef.current = true;
    }
  });
  useIsoLayoutEffect(() => {
    if (!forcePanelIdle || transitionStatus === "starting") {
      return;
    }
    setForcePanelIdle(false);
  }, [forcePanelIdle, transitionStatus]);
  React18.useEffect(() => {
    return () => {
      markActivityResumeAnimationSuppressed();
      restorePendingTemporaryStyle();
    };
  }, [markActivityResumeAnimationSuppressed, restorePendingTemporaryStyle]);
  useIsoLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) {
      return void 0;
    }
    if (!open && pendingTemporaryStyleRestoreRef.current) {
      restorePendingTemporaryStyle();
    }
    const animationType = getAnimationType(panel, shouldPreventOpenAnimation);
    animationTypeRef.current = animationType;
    if (open && transitionStatus === "idle" && shouldPreventMountAnimationRef.current && animationType === "css-animation") {
      lastMeasuredDimensionsRef.current = getDimensions(panel);
      return void 0;
    }
    if (open && transitionStatus === "starting") {
      const skipNextOpen = shouldSkipNextOpenRef.current;
      shouldSkipNextOpenRef.current = false;
      if (animationType === "none") {
        setDimensions(getDimensions(panel));
        setForcePanelIdle(true);
        return void 0;
      }
      if (animationType === "css-transition") {
        const restoreLayoutStyles = resetLayoutStyles(panel);
        setDimensions(getDimensions(panel));
        if (!skipNextOpen) {
          return restoreLayoutStyles;
        }
        const restoreTransitionDuration = setTemporaryStyle(panel, "transition-duration", "0s");
        setPendingTemporaryStyleRestore(restoreTransitionDuration);
        setForcePanelIdle(true);
        return restoreLayoutStyles;
      }
      if (animationType === "css-animation") {
        setDimensions(getDimensions(panel));
        if (!skipNextOpen) {
          const restoreAnimationName2 = setTemporaryStyle(panel, "animation-name", "none");
          restoreAnimationName2();
          return void 0;
        }
        const restoreAnimationName = setTemporaryStyle(panel, "animation-name", "none");
        const restoreAnimationDuration = setTemporaryStyle(panel, "animation-duration", "0s");
        restoreAnimationName();
        setPendingTemporaryStyleRestore(restoreAnimationDuration);
        setForcePanelIdle(true);
        return void 0;
      }
    }
    if (!open && mounted && (transitionStatus === "idle" || transitionStatus === "starting")) {
      if (animationType === "none") {
        setDimensions(EMPTY_DIMENSIONS, false);
        setMounted(false);
        return void 0;
      }
      if (animationType === "css-animation") {
        shouldPreventMountAnimationRef.current = false;
        shouldPreventActivityResumeAnimationRef.current = false;
      }
      setDimensions(getDimensions(panel));
      return void 0;
    }
    if (transitionStatus !== "ending") {
      return void 0;
    }
    if (animationType === "none") {
      setMounted(false);
      return void 0;
    }
    const nextDimensions = getDimensions(panel);
    const hasMeasuredSize = (nextDimensions.height ?? 0) > 0 || (nextDimensions.width ?? 0) > 0;
    if (!hasMeasuredSize) {
      setMounted(false);
      return void 0;
    }
    setDimensions(nextDimensions);
    if (animationType === "css-animation") {
      const restoreAnimationName = setTemporaryStyle(panel, "animation-name", "none");
      restoreAnimationName();
    }
    return void 0;
  }, [mounted, open, restorePendingTemporaryStyle, setDimensions, setMounted, setPendingTemporaryStyleRestore, shouldPreventOpenAnimation, transitionStatus]);
  useOpenChangeComplete({
    enabled: open && mounted && panelTransitionStatus === "idle",
    open: true,
    ref: panelRef,
    onComplete() {
      if (!open) {
        return;
      }
      setDimensions(EMPTY_DIMENSIONS, false);
    }
  });
  React18.useEffect(() => {
    if (open || !mounted || panelTransitionStatus !== "ending") {
      return void 0;
    }
    const panel = panelRef.current;
    if (!panel) {
      return void 0;
    }
    const abortController = new AbortController();
    let endingStyleFrame = -1;
    function handleComplete() {
      if (latestStateRef.current.open) {
        return;
      }
      setMounted(false);
      setDimensions(EMPTY_DIMENSIONS, false);
    }
    endingStyleFrame = AnimationFrame.request(() => {
      if (!abortController.signal.aborted) {
        runOnceCloseAnimationsFinish(handleComplete, abortController.signal);
      }
    });
    return () => {
      AnimationFrame.cancel(endingStyleFrame);
      abortController.abort();
    };
  }, [latestStateRef, mounted, open, panelTransitionStatus, runOnceCloseAnimationsFinish, setDimensions, setMounted]);
  useIsoLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel || !hiddenUntilFound || !hidden) {
      return;
    }
    panel.setAttribute("hidden", "until-found");
  }, [hidden, hiddenUntilFound]);
  React18.useEffect(function registerBeforeMatchListener() {
    const panel = panelRef.current;
    if (!panel) {
      return void 0;
    }
    function handleBeforeMatch(event) {
      shouldSkipNextOpenRef.current = true;
      setOpen(true);
      onOpenChange(true, createChangeEventDetails(reason_parts_exports.none, event));
    }
    return addEventListener(panel, "beforematch", handleBeforeMatch);
  }, [onOpenChange, setOpen]);
  const shouldRender = keepMounted || hiddenUntilFound || mounted || open;
  return {
    height: renderedDimensions.height,
    props: {
      ...shouldPersistHiddenTransitionStyles ? {
        [CollapsiblePanelDataAttributes.startingStyle]: ""
      } : void 0,
      hidden,
      id: idParam
    },
    ref: mergedPanelRef,
    shouldPreventOpenAnimation,
    shouldRender,
    transitionStatus: panelTransitionStatus,
    width: renderedDimensions.width
  };
}
function getDimensions(element) {
  return {
    height: element.scrollHeight,
    width: element.scrollWidth
  };
}
function getAnimationType(element, hasSuppressedMountAnimation = false) {
  const panelStyles = getWindow(element).getComputedStyle(element);
  const hasAnimation = (panelStyles.animationName.split(",").map((name) => name.trim()).some((name) => name !== "" && name !== "none") || hasSuppressedMountAnimation) && hasNonZeroDuration(panelStyles.animationDuration);
  const hasTransition = hasNonZeroDuration(panelStyles.transitionDuration);
  if (hasAnimation && hasTransition) {
    if (true) {
      warn("CSS transitions and CSS animations both detected on Collapsible or Accordion panel.", "Only one of either animation type should be used.");
    }
    return "css-transition";
  }
  if (hasTransition) {
    return "css-transition";
  }
  if (hasAnimation) {
    return "css-animation";
  }
  return "none";
}
function hasNonZeroDuration(value) {
  return value.split(",").map((part) => part.trim()).some((part) => part !== "" && Number.parseFloat(part) > 0);
}
function setTemporaryStyle(element, property, value) {
  const previousValue = element.style.getPropertyValue(property);
  const previousPriority = element.style.getPropertyPriority(property);
  element.style.setProperty(property, value);
  return () => {
    if (previousValue === "") {
      element.style.removeProperty(property);
      return;
    }
    element.style.setProperty(property, previousValue, previousPriority);
  };
}
function resetLayoutStyles(element) {
  const originalLayoutStyles = {
    "justify-content": element.style.justifyContent,
    "align-items": element.style.alignItems,
    "align-content": element.style.alignContent,
    "justify-items": element.style.justifyItems
  };
  Object.keys(originalLayoutStyles).forEach((key) => {
    element.style.setProperty(key, "initial", "important");
  });
  function restoreLayoutStyles() {
    Object.entries(originalLayoutStyles).forEach(([key, value]) => {
      if (value === "") {
        element.style.removeProperty(key);
        return;
      }
      element.style.setProperty(key, value);
    });
  }
  const frame = AnimationFrame.request(restoreLayoutStyles);
  return () => {
    AnimationFrame.cancel(frame);
    restoreLayoutStyles();
  };
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/button/Button.js
var React19 = __toESM(require_react(), 1);
var Button = /* @__PURE__ */ React19.forwardRef(function Button2(componentProps, forwardedRef) {
  const {
    render,
    className,
    disabled: disabled2 = false,
    focusableWhenDisabled = false,
    nativeButton = true,
    style,
    ...elementProps
  } = componentProps;
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled: disabled2,
    focusableWhenDisabled,
    native: nativeButton
  });
  const state = {
    disabled: disabled2
  };
  return useRenderElement("button", componentProps, {
    state,
    ref: [forwardedRef, buttonRef],
    props: [elementProps, getButtonProps]
  });
});
if (true) Button.displayName = "Button";

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/collapsible/index.parts.js
var index_parts_exports = {};
__export(index_parts_exports, {
  Panel: () => CollapsiblePanel,
  Root: () => CollapsibleRoot,
  Trigger: () => CollapsibleTrigger
});

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/collapsible/root/CollapsibleRoot.js
var React20 = __toESM(require_react(), 1);

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/collapsible/root/stateAttributesMapping.js
var collapsibleStateAttributesMapping = {
  ...collapsibleOpenStateMapping,
  ...transitionStatusMapping
};

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/collapsible/root/CollapsibleRoot.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var CollapsibleRoot = /* @__PURE__ */ React20.forwardRef(function CollapsibleRoot2(componentProps, forwardedRef) {
  const {
    render,
    className,
    defaultOpen = false,
    disabled: disabled2 = false,
    onOpenChange: onOpenChangeProp,
    open,
    style,
    ...elementProps
  } = componentProps;
  const onOpenChange = useStableCallback(onOpenChangeProp);
  const collapsible = useCollapsibleRoot({
    open,
    defaultOpen,
    onOpenChange,
    disabled: disabled2
  });
  const state = React20.useMemo(() => ({
    open: collapsible.open,
    disabled: collapsible.disabled,
    transitionStatus: collapsible.transitionStatus
  }), [collapsible.open, collapsible.disabled, collapsible.transitionStatus]);
  const contextValue = React20.useMemo(() => ({
    ...collapsible,
    onOpenChange,
    state
  }), [collapsible, onOpenChange, state]);
  const element = useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: elementProps,
    stateAttributesMapping: collapsibleStateAttributesMapping
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleRootContext.Provider, {
    value: contextValue,
    children: element
  });
});
if (true) CollapsibleRoot.displayName = "CollapsibleRoot";

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/collapsible/trigger/CollapsibleTrigger.js
var React21 = __toESM(require_react(), 1);
var stateAttributesMapping = {
  ...triggerOpenStateMapping,
  ...transitionStatusMapping
};
var CollapsibleTrigger = /* @__PURE__ */ React21.forwardRef(function CollapsibleTrigger2(componentProps, forwardedRef) {
  const {
    panelId,
    open,
    handleTrigger,
    state,
    disabled: contextDisabled
  } = useCollapsibleRootContext();
  const {
    className,
    disabled: disabled2 = contextDisabled,
    id,
    render,
    nativeButton = true,
    style,
    ...elementProps
  } = componentProps;
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled: disabled2,
    focusableWhenDisabled: true,
    native: nativeButton
  });
  const element = useRenderElement("button", componentProps, {
    state,
    ref: [forwardedRef, buttonRef],
    props: [{
      "aria-controls": open ? panelId : void 0,
      "aria-expanded": open,
      onClick: handleTrigger
    }, elementProps, getButtonProps],
    stateAttributesMapping
  });
  return element;
});
if (true) CollapsibleTrigger.displayName = "CollapsibleTrigger";

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/collapsible/panel/CollapsiblePanel.js
var React22 = __toESM(require_react(), 1);

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/collapsible/panel/CollapsiblePanelCssVars.js
var CollapsiblePanelCssVars = /* @__PURE__ */ (function(CollapsiblePanelCssVars2) {
  CollapsiblePanelCssVars2["collapsiblePanelHeight"] = "--collapsible-panel-height";
  CollapsiblePanelCssVars2["collapsiblePanelWidth"] = "--collapsible-panel-width";
  return CollapsiblePanelCssVars2;
})({});

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/collapsible/panel/CollapsiblePanel.js
var CollapsiblePanel = /* @__PURE__ */ React22.forwardRef(function CollapsiblePanel2(componentProps, forwardedRef) {
  const {
    className,
    hiddenUntilFound: hiddenUntilFoundProp,
    keepMounted: keepMountedProp,
    render,
    id: idProp,
    style,
    ...elementProps
  } = componentProps;
  if (true) {
    useIsoLayoutEffect(() => {
      if (hiddenUntilFoundProp && keepMountedProp === false) {
        warn("The `keepMounted={false}` prop on `Collapsible.Panel` is ignored when `hiddenUntilFound` is enabled, since the panel must remain mounted while closed.");
      }
    }, [hiddenUntilFoundProp, keepMountedProp]);
  }
  const {
    mounted,
    onOpenChange,
    open,
    panelId,
    setMounted,
    setPanelIdState,
    setOpen,
    state,
    transitionStatus
  } = useCollapsibleRootContext();
  const hiddenUntilFound = hiddenUntilFoundProp ?? false;
  const keepMounted = keepMountedProp ?? false;
  useIsoLayoutEffect(() => {
    if (idProp) {
      setPanelIdState(idProp);
      return () => {
        setPanelIdState(void 0);
      };
    }
    return void 0;
  }, [idProp, setPanelIdState]);
  const {
    height,
    props,
    ref,
    shouldPreventOpenAnimation,
    shouldRender,
    transitionStatus: panelTransitionStatus,
    width
  } = useCollapsiblePanel({
    externalRef: forwardedRef,
    hiddenUntilFound,
    id: panelId,
    keepMounted,
    mounted,
    onOpenChange,
    open,
    setMounted,
    setOpen,
    transitionStatus
  });
  const panelState = {
    ...state,
    transitionStatus: panelTransitionStatus
  };
  const resolvedStyle = resolveStyle(style, panelState);
  const element = useRenderElement("div", {
    ...componentProps,
    style: void 0
  }, {
    state: panelState,
    ref,
    props: [
      props,
      {
        style: {
          [CollapsiblePanelCssVars.collapsiblePanelHeight]: height === void 0 ? "auto" : `${height}px`,
          [CollapsiblePanelCssVars.collapsiblePanelWidth]: width === void 0 ? "auto" : `${width}px`
        }
      },
      elementProps,
      resolvedStyle ? {
        style: resolvedStyle
      } : void 0,
      // Resolve the public `style` prop so temporary `animationName: 'none'`
      // can still win after user's inline styles have been merged.
      shouldPreventOpenAnimation ? {
        style: {
          animationName: "none"
        }
      } : void 0
    ],
    stateAttributesMapping: collapsibleStateAttributesMapping
  });
  if (!shouldRender) {
    return null;
  }
  return element;
});
if (true) CollapsiblePanel.displayName = "CollapsiblePanel";

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/use-render/useRender.js
function useRender(params) {
  return useRenderElement(params.defaultTagName ?? "div", params, params);
}

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/text/text.mjs
var import_element = __toESM(require_element(), 1);
var STYLE_HASH_ATTRIBUTE = "data-wp-hash";
function getRuntime() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument(targetDocument) {
  const runtime = getRuntime();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle(hash, css) {
  const runtime = getRuntime();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle("0c8601dd83", '@layer wp-ui-utilities, wp-ui-components, wp-ui-compositions, wp-ui-overrides;@layer wp-ui-components{._83ed8a8da5dd50ea__text{margin:0}._14437cfb77831647__heading-2xl{--_gcd-heading-font-size:var(--wpds-typography-font-size-2xl,32px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-medium,499);--_gcd-p-font-size:var(--wpds-typography-font-size-2xl,32px);--_gcd-p-line-height:var(--wpds-typography-line-height-2xl,40px);font-size:var(--wpds-typography-font-size-2xl,32px);line-height:var(--wpds-typography-line-height-2xl,40px)}._14437cfb77831647__heading-2xl,._3c78b7fa9b4072dd__heading-xl{font-family:var(--wpds-typography-font-family-heading,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-weight:var(--wpds-typography-font-weight-medium,499)}._3c78b7fa9b4072dd__heading-xl{--_gcd-heading-font-size:var(--wpds-typography-font-size-xl,20px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-medium,499);--_gcd-p-font-size:var(--wpds-typography-font-size-xl,20px);--_gcd-p-line-height:var(--wpds-typography-line-height-md,24px);font-size:var(--wpds-typography-font-size-xl,20px);line-height:var(--wpds-typography-line-height-md,24px)}.aa58f227716bcde2__heading-lg{--_gcd-heading-font-size:var(--wpds-typography-font-size-lg,15px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-medium,499);--_gcd-p-font-size:var(--wpds-typography-font-size-lg,15px);--_gcd-p-line-height:var(--wpds-typography-line-height-sm,20px);font-size:var(--wpds-typography-font-size-lg,15px)}.aa58f227716bcde2__heading-lg,.fc4da56d8dfe52c4__heading-md{font-family:var(--wpds-typography-font-family-heading,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-weight:var(--wpds-typography-font-weight-medium,499);line-height:var(--wpds-typography-line-height-sm,20px)}.fc4da56d8dfe52c4__heading-md{--_gcd-heading-font-size:var(--wpds-typography-font-size-md,13px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-medium,499);--_gcd-p-font-size:var(--wpds-typography-font-size-md,13px);--_gcd-p-line-height:var(--wpds-typography-line-height-sm,20px);font-size:var(--wpds-typography-font-size-md,13px)}.a9b78c7c82e8dff7__heading-sm{--_gcd-heading-font-size:var(--wpds-typography-font-size-xs,11px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-medium,499);--_gcd-p-font-size:var(--wpds-typography-font-size-xs,11px);--_gcd-p-line-height:var(--wpds-typography-line-height-xs,16px);font-family:var(--wpds-typography-font-family-heading,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-size:var(--wpds-typography-font-size-xs,11px);font-weight:var(--wpds-typography-font-weight-medium,499);line-height:var(--wpds-typography-line-height-xs,16px);text-transform:uppercase}._305ff559e52180d5__body-xl{--_gcd-heading-font-size:var(--wpds-typography-font-size-xl,20px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-regular,400);--_gcd-p-font-size:var(--wpds-typography-font-size-xl,20px);--_gcd-p-line-height:var(--wpds-typography-line-height-xl,32px);font-size:var(--wpds-typography-font-size-xl,20px);line-height:var(--wpds-typography-line-height-xl,32px)}._305ff559e52180d5__body-xl,.ca1aa3fc2029e958__body-lg{font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-weight:var(--wpds-typography-font-weight-regular,400)}.ca1aa3fc2029e958__body-lg{--_gcd-heading-font-size:var(--wpds-typography-font-size-lg,15px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-regular,400);--_gcd-p-font-size:var(--wpds-typography-font-size-lg,15px);--_gcd-p-line-height:var(--wpds-typography-line-height-md,24px);font-size:var(--wpds-typography-font-size-lg,15px);line-height:var(--wpds-typography-line-height-md,24px)}._131101940be12424__body-md{--_gcd-heading-font-size:var(--wpds-typography-font-size-md,13px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-regular,400);--_gcd-p-font-size:var(--wpds-typography-font-size-md,13px);--_gcd-p-line-height:var(--wpds-typography-line-height-sm,20px);font-size:var(--wpds-typography-font-size-md,13px);line-height:var(--wpds-typography-line-height-sm,20px)}._0e8d87a42c1f75fa__body-sm,._131101940be12424__body-md{font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-weight:var(--wpds-typography-font-weight-regular,400)}._0e8d87a42c1f75fa__body-sm{--_gcd-heading-font-size:var(--wpds-typography-font-size-sm,12px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-regular,400);--_gcd-p-font-size:var(--wpds-typography-font-size-sm,12px);--_gcd-p-line-height:var(--wpds-typography-line-height-xs,16px);font-size:var(--wpds-typography-font-size-sm,12px);line-height:var(--wpds-typography-line-height-xs,16px)}}');
}
var style_default = { "text": "_83ed8a8da5dd50ea__text", "heading-2xl": "_14437cfb77831647__heading-2xl", "heading-xl": "_3c78b7fa9b4072dd__heading-xl", "heading-lg": "aa58f227716bcde2__heading-lg", "heading-md": "fc4da56d8dfe52c4__heading-md", "heading-sm": "a9b78c7c82e8dff7__heading-sm", "body-xl": "_305ff559e52180d5__body-xl", "body-lg": "ca1aa3fc2029e958__body-lg", "body-md": "_131101940be12424__body-md", "body-sm": "_0e8d87a42c1f75fa__body-sm" };
if (typeof process === "undefined" || true) {
  registerStyle("1fb29d3a3c", "._6defc79820e382c6__button{box-sizing:var(--_gcd-button-box-sizing,border-box);font-family:var(--_gcd-button-font-family,inherit);font-size:var(--_gcd-button-font-size,inherit);font-weight:var(--_gcd-button-font-weight,inherit)}.d2cff2e5dea83bd1__input{box-sizing:var(--_gcd-input-box-sizing,border-box);font-family:var(--_gcd-input-font-family,inherit);font-size:var(--_gcd-input-font-size,inherit);font-weight:var(--_gcd-input-font-weight,inherit);margin:var(--_gcd-input-margin,0);&:is(textarea,[type=text],[type=password],[type=color],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){background-color:var(--_gcd-input-background-color,#0000);border:var(--_gcd-input-border,none);border-radius:var(--_gcd-input-border-radius,0);box-shadow:var(--_gcd-input-box-shadow,0 0 0 #0000);color:var(--_gcd-input-color,var(--wpds-color-fg-interactive-neutral,#1e1e1e));&:focus{border-color:var(--_gcd-input-border-color-focus,var(--wp-admin-theme-color));box-shadow:var(--_gcd-input-box-shadow-focus,none);outline:var(--_gcd-input-outline-focus,none)}&:disabled{background:var(--_gcd-input-background-disabled,#0000);border-color:var(--_gcd-input-border-color-disabled,#0000);box-shadow:var(--_gcd-input-box-shadow-disabled,none);color:var(--_gcd-input-color-disabled,var(--wpds-color-fg-interactive-neutral-disabled,#8d8d8d))}&::placeholder{color:var(--_gcd-input-placeholder-color,var(--wpds-color-fg-interactive-neutral-disabled,#8d8d8d))}}&:is(textarea,[type=text],[type=password],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){line-height:var(--_gcd-input-line-height,inherit);min-height:var(--_gcd-input-min-height,auto);padding:var(--_gcd-input-padding,0)}}._547d86373d02e108__textarea{box-sizing:var(--_gcd-textarea-box-sizing,border-box);overflow:var(--_gcd-textarea-overflow,auto);resize:var(--_gcd-textarea-resize,block)}._8c15fd0ed9f28ba4__div{outline:var(--_gcd-div-outline,0 solid #0000)}p._43cec3e1eec1066d__p{font-size:var(--_gcd-p-font-size,13px);line-height:var(--_gcd-p-line-height,1.5);margin:var(--_gcd-p-margin,0)}:is(h1,h2,h3,h4,h5,h6).e97669c6d9a38497__heading{color:var(--_gcd-heading-color,var(--wpds-color-fg-content-neutral,#1e1e1e));font-size:var(--_gcd-heading-font-size,inherit);font-weight:var(--_gcd-heading-font-weight,var(--wpds-typography-font-weight-medium,499));margin:var(--_gcd-heading-margin,0)}._2c0831b0499dbd6e__a,._2c0831b0499dbd6e__a:is(:hover,:focus,:active){border-radius:var(--_gcd-a-border-radius,0);box-shadow:var(--_gcd-a-box-shadow,none);color:var(--_gcd-a-color,inherit);outline:var(--_gcd-a-outline,0 solid #0000);transition:var(--_gcd-a-transition,none)}");
}
var global_css_defense_default = { "button": "_6defc79820e382c6__button", "input": "d2cff2e5dea83bd1__input", "textarea": "_547d86373d02e108__textarea", "div": "_8c15fd0ed9f28ba4__div", "p": "_43cec3e1eec1066d__p", "heading": "e97669c6d9a38497__heading", "a": "_2c0831b0499dbd6e__a" };
var Text = (0, import_element.forwardRef)(function Text2({ variant = "body-md", render, className, ...props }, ref) {
  const element = useRender({
    render,
    defaultTagName: "span",
    ref,
    props: mergeProps(props, {
      className: clsx_default(
        style_default.text,
        global_css_defense_default.heading,
        global_css_defense_default.p,
        style_default[variant],
        className
      )
    })
  });
  return element;
});

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/button/button.mjs
var import_element2 = __toESM(require_element(), 1);
var import_i18n = __toESM(require_i18n(), 1);
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
import { speak } from "@wordpress/a11y";
var STYLE_HASH_ATTRIBUTE2 = "data-wp-hash";
function getRuntime2() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument2(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash2(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE2}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE2) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle2(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime2();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash2(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE2, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument2(targetDocument) {
  const runtime = getRuntime2();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle2(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle2(hash, css) {
  const runtime = getRuntime2();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle2(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle2("26d90ece4e", '@layer wp-ui-utilities, wp-ui-components, wp-ui-compositions, wp-ui-overrides;@layer wp-ui-components{._97b0fc33c028be1a__button,.abbb272e2ce49bd6__is-unstyled{appearance:none;padding:0}._97b0fc33c028be1a__button{--wp-ui-button-font-weight:499;--wp-ui-button-background-color:var(--wpds-color-bg-interactive-brand-strong,var(--wp-admin-theme-color,#3858e9));--wp-ui-button-background-color-active:var(--wpds-color-bg-interactive-brand-strong-active,color-mix(in oklch,var(--wp-admin-theme-color,#3858e9) 93%,#000));--wp-ui-button-background-color-disabled:var(--wpds-color-bg-interactive-neutral-strong-disabled,#e6e6e6);--wp-ui-button-foreground-color:var(--wpds-color-fg-interactive-brand-strong,#fff);--wp-ui-button-foreground-color-active:var(--wpds-color-fg-interactive-brand-strong-active,#fff);--wp-ui-button-foreground-color-disabled:var(--wpds-color-fg-interactive-neutral-strong-disabled,#8d8d8d);--wp-ui-button-padding-inline:var(--wpds-dimension-padding-md,12px);--wp-ui-button-height:40px;--wp-ui-button-aspect-ratio:auto;--wp-ui-button-font-size:var(--wpds-typography-font-size-md,13px);--wp-ui-button-min-width:calc(4ch + var(--wp-ui-button-padding-inline)*2);--wp-ui-button-border-color:var(--wp-ui-button-background-color);--wp-ui-button-border-color-active:var(--wp-ui-button-background-color-active);--wp-ui-button-border-color-disabled:var(--wp-ui-button-background-color-disabled);--_gcd-button-font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);--_gcd-button-font-size:var(--wp-ui-button-font-size);--_gcd-button-font-weight:var(--wp-ui-button-font-weight);align-items:center;aspect-ratio:var(--wp-ui-button-aspect-ratio);background-clip:padding-box;background-color:var(--wp-ui-button-background-color);border-color:var(--wp-ui-button-border-color);border-radius:var(--wpds-border-radius-sm,2px);border-style:solid;border-width:1px;color:var(--wp-ui-button-foreground-color);cursor:var(--wpds-cursor-control,pointer);display:inline-flex;font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-size:var(--wp-ui-button-font-size);font-weight:var(--wp-ui-button-font-weight);gap:var(--wpds-dimension-gap-sm,8px);height:var(--wp-ui-button-height);justify-content:center;line-height:var(--wpds-typography-line-height-sm,20px);min-width:var(--wp-ui-button-min-width);padding-inline:var(--wp-ui-button-padding-inline);position:relative;text-decoration:none;@media not (prefers-reduced-motion){transition:color .1s ease-out;*{transition:opacity .1s ease-out}}&[href]{cursor:pointer}[href]{color:inherit;text-decoration:inherit}&:not([data-disabled]):is(:hover,:active,:focus){background-color:var(--wp-ui-button-background-color-active);border-color:var(--wp-ui-button-border-color-active);color:var(--wp-ui-button-foreground-color-active)}&[data-disabled]:not(._914b42f315c0e580__is-loading){background-color:var(--wp-ui-button-background-color-disabled);border-color:var(--wp-ui-button-border-color-disabled);color:var(--wp-ui-button-foreground-color-disabled);@media (forced-colors:active){border-bottom-color:GrayText;border-left-color:GrayText;border-right-color:GrayText;border-top-color:GrayText;color:GrayText}}&:before{aspect-ratio:1;border:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid;border-block-end-color:#0000;border-block-start-color:var(--wp-ui-button-foreground-color);border-inline-end-color:var(--wp-ui-button-foreground-color);border-inline-start-color:#0000;border-radius:50%;box-sizing:border-box;content:"";display:block;height:var(--wp-ui-button-font-size);inset-inline-start:50%;opacity:0;pointer-events:none;position:absolute;top:50%;transform:translate(-50%,-50%);@media not (prefers-reduced-motion){transition:opacity .1s ease-out}}}._908205475f9f2a92__is-small{--wp-ui-button-padding-inline:var(--wpds-dimension-padding-sm,8px);--wp-ui-button-height:24px}.dd460c965226cc77__is-brand{&._62d5a778b7b258ee__is-outline,&.ad0619a3217c6a5b__is-minimal{--wp-ui-button-foreground-color:var(--wpds-color-fg-interactive-brand,var(--wp-admin-theme-color,#3858e9));--wp-ui-button-foreground-color-active:var(--wpds-color-fg-interactive-brand-active,var(--wp-admin-theme-color,#3858e9));--wp-ui-button-foreground-color-disabled:var(--wpds-color-fg-interactive-neutral-disabled,#8d8d8d)}&._62d5a778b7b258ee__is-outline{--wp-ui-button-background-color:var(--wpds-color-bg-interactive-brand-weak,#0000);--wp-ui-button-background-color-active:var(--wpds-color-bg-interactive-brand-weak-active,color-mix(in oklch,var(--wp-admin-theme-color,#3858e9) 12%,#fff));--wp-ui-button-background-color-disabled:var(--wpds-color-bg-interactive-neutral-weak-disabled,#0000);--wp-ui-button-border-color:var(--wpds-color-stroke-interactive-brand,var(--wp-admin-theme-color,#3858e9));--wp-ui-button-border-color-active:var(--wpds-color-stroke-interactive-brand-active,color-mix(in oklch,var(--wp-admin-theme-color,#3858e9) 85%,#000));--wp-ui-button-border-color-disabled:var(--wpds-color-stroke-interactive-neutral-disabled,#dbdbdb)}&.ad0619a3217c6a5b__is-minimal{--wp-ui-button-background-color:var(--wpds-color-bg-interactive-brand-weak,#0000);--wp-ui-button-background-color-active:var(--wpds-color-bg-interactive-brand-weak-active,color-mix(in oklch,var(--wp-admin-theme-color,#3858e9) 12%,#fff));--wp-ui-button-background-color-disabled:var(--wpds-color-bg-interactive-neutral-weak-disabled,#0000)}}.e722a8f96726aa99__is-neutral{&.b50b3358c5fb4d0b__is-solid{--wp-ui-button-background-color:var(--wpds-color-bg-interactive-neutral-strong,#2d2d2d);--wp-ui-button-background-color-active:var(--wpds-color-bg-interactive-neutral-strong-active,#1e1e1e);--wp-ui-button-background-color-disabled:var(--wpds-color-bg-interactive-neutral-strong-disabled,#e6e6e6);--wp-ui-button-foreground-color:var(--wpds-color-fg-interactive-neutral-strong,#f0f0f0);--wp-ui-button-foreground-color-active:var(--wpds-color-fg-interactive-neutral-strong-active,#f0f0f0);--wp-ui-button-foreground-color-disabled:var(--wpds-color-fg-interactive-neutral-strong-disabled,#8d8d8d)}&._62d5a778b7b258ee__is-outline,&.ad0619a3217c6a5b__is-minimal{--wp-ui-button-foreground-color:var(--wpds-color-fg-interactive-neutral,#1e1e1e);--wp-ui-button-foreground-color-active:var(--wpds-color-fg-interactive-neutral-active,#1e1e1e);--wp-ui-button-foreground-color-disabled:var(--wpds-color-fg-interactive-neutral-disabled,#8d8d8d)}&._62d5a778b7b258ee__is-outline{--wp-ui-button-background-color:var(--wpds-color-bg-interactive-neutral-weak,#0000);--wp-ui-button-background-color-active:var(--wpds-color-bg-interactive-neutral-weak-active,#ededed);--wp-ui-button-background-color-disabled:var(--wpds-color-bg-interactive-neutral-weak-disabled,#0000);--wp-ui-button-border-color:var(--wpds-color-stroke-interactive-neutral,#8d8d8d);--wp-ui-button-border-color-active:var(--wpds-color-stroke-interactive-neutral-active,#6e6e6e);--wp-ui-button-border-color-disabled:var(--wpds-color-stroke-interactive-neutral-disabled,#dbdbdb)}&.ad0619a3217c6a5b__is-minimal{--wp-ui-button-background-color:var(--wpds-color-bg-interactive-neutral-weak,#0000);--wp-ui-button-background-color-active:var(--wpds-color-bg-interactive-neutral-weak-active,#ededed);--wp-ui-button-background-color-disabled:var(--wpds-color-bg-interactive-neutral-weak-disabled,#0000)}}.abbb272e2ce49bd6__is-unstyled{background:none;border:none;min-width:unset}.cf59cf1b69629838__is-compact{--wp-ui-button-height:32px}._914b42f315c0e580__is-loading{color:#0000;&:not([data-disabled]):is(:hover,:active,:focus){color:#0000}*{opacity:0}&:before{opacity:1;transition-delay:.05s;@media not (prefers-reduced-motion){animation:_5a1d53da6f830c8d__loading-animation 1s linear infinite}}}[aria-pressed=true].ad0619a3217c6a5b__is-minimal.e722a8f96726aa99__is-neutral{--wp-ui-button-background-color:var(--wpds-color-bg-interactive-neutral-strong,#2d2d2d);--wp-ui-button-background-color-active:var(--wpds-color-bg-interactive-neutral-strong,#2d2d2d);--wp-ui-button-foreground-color:var(--wpds-color-fg-interactive-neutral-strong,#f0f0f0);--wp-ui-button-foreground-color-active:var(--wpds-color-fg-interactive-neutral-strong,#f0f0f0)}}@keyframes _5a1d53da6f830c8d__loading-animation{0%{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(1turn)}}');
}
var style_default2 = { "button": "_97b0fc33c028be1a__button", "is-unstyled": "abbb272e2ce49bd6__is-unstyled", "is-loading": "_914b42f315c0e580__is-loading", "is-small": "_908205475f9f2a92__is-small", "is-brand": "dd460c965226cc77__is-brand", "is-outline": "_62d5a778b7b258ee__is-outline", "is-minimal": "ad0619a3217c6a5b__is-minimal", "is-neutral": "e722a8f96726aa99__is-neutral", "is-solid": "b50b3358c5fb4d0b__is-solid", "is-compact": "cf59cf1b69629838__is-compact", "loading-animation": "_5a1d53da6f830c8d__loading-animation" };
if (typeof process === "undefined" || true) {
  registerStyle2("e3ae230cea", "@layer wp-ui-utilities, wp-ui-components, wp-ui-compositions, wp-ui-overrides;@layer wp-ui-utilities{._336cd3e4e743482f__box-sizing{box-sizing:border-box;*,:after,:before{box-sizing:inherit}}}");
}
var resets_default = { "box-sizing": "_336cd3e4e743482f__box-sizing" };
if (typeof process === "undefined" || true) {
  registerStyle2("2a5ab8f3a7", "@layer wp-ui-utilities, wp-ui-components, wp-ui-compositions, wp-ui-overrides;@layer wp-ui-utilities{._08e8a2e44959f892__outset-ring--focus,._970d04df7376df67__outset-ring--focus-within-except-active,.c5cb3ee4bddaa8e4__outset-ring--focus-within-visible,.cd83dfc2126a0846__outset-ring--focus-within,.d0541bc9dd9dc7b6__outset-ring--focus-visible,.e25b2bdd7aa21721__outset-ring--focus-except-active,.ecadb9e080e2dfa5__outset-ring--focus-parent-visible{@media not (prefers-reduced-motion){--_gcd-a-transition:outline 0.1s ease-out;transition:outline .1s ease-out}outline:0 solid #0000;outline-offset:1px}._08e8a2e44959f892__outset-ring--focus:focus,._970d04df7376df67__outset-ring--focus-within-except-active:focus-within:not(:has(:active)),.c5cb3ee4bddaa8e4__outset-ring--focus-within-visible:focus-within:has(:focus-visible),.cd83dfc2126a0846__outset-ring--focus-within:focus-within,.d0541bc9dd9dc7b6__outset-ring--focus-visible:focus-visible,.e25b2bdd7aa21721__outset-ring--focus-except-active:focus:not(:active),:focus-visible .ecadb9e080e2dfa5__outset-ring--focus-parent-visible{--_gcd-a-outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--wpds-color-stroke-focus-brand,var(--wp-admin-theme-color,#3858e9));--_gcd-div-outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--wpds-color-stroke-focus-brand,var(--wp-admin-theme-color,#3858e9));outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--wpds-color-stroke-focus-brand,var(--wp-admin-theme-color,#3858e9))}}");
}
var focus_default = { "outset-ring--focus": "_08e8a2e44959f892__outset-ring--focus", "outset-ring--focus-except-active": "e25b2bdd7aa21721__outset-ring--focus-except-active", "outset-ring--focus-visible": "d0541bc9dd9dc7b6__outset-ring--focus-visible", "outset-ring--focus-within": "cd83dfc2126a0846__outset-ring--focus-within", "outset-ring--focus-within-except-active": "_970d04df7376df67__outset-ring--focus-within-except-active", "outset-ring--focus-within-visible": "c5cb3ee4bddaa8e4__outset-ring--focus-within-visible", "outset-ring--focus-parent-visible": "ecadb9e080e2dfa5__outset-ring--focus-parent-visible" };
if (typeof process === "undefined" || true) {
  registerStyle2("1fb29d3a3c", "._6defc79820e382c6__button{box-sizing:var(--_gcd-button-box-sizing,border-box);font-family:var(--_gcd-button-font-family,inherit);font-size:var(--_gcd-button-font-size,inherit);font-weight:var(--_gcd-button-font-weight,inherit)}.d2cff2e5dea83bd1__input{box-sizing:var(--_gcd-input-box-sizing,border-box);font-family:var(--_gcd-input-font-family,inherit);font-size:var(--_gcd-input-font-size,inherit);font-weight:var(--_gcd-input-font-weight,inherit);margin:var(--_gcd-input-margin,0);&:is(textarea,[type=text],[type=password],[type=color],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){background-color:var(--_gcd-input-background-color,#0000);border:var(--_gcd-input-border,none);border-radius:var(--_gcd-input-border-radius,0);box-shadow:var(--_gcd-input-box-shadow,0 0 0 #0000);color:var(--_gcd-input-color,var(--wpds-color-fg-interactive-neutral,#1e1e1e));&:focus{border-color:var(--_gcd-input-border-color-focus,var(--wp-admin-theme-color));box-shadow:var(--_gcd-input-box-shadow-focus,none);outline:var(--_gcd-input-outline-focus,none)}&:disabled{background:var(--_gcd-input-background-disabled,#0000);border-color:var(--_gcd-input-border-color-disabled,#0000);box-shadow:var(--_gcd-input-box-shadow-disabled,none);color:var(--_gcd-input-color-disabled,var(--wpds-color-fg-interactive-neutral-disabled,#8d8d8d))}&::placeholder{color:var(--_gcd-input-placeholder-color,var(--wpds-color-fg-interactive-neutral-disabled,#8d8d8d))}}&:is(textarea,[type=text],[type=password],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){line-height:var(--_gcd-input-line-height,inherit);min-height:var(--_gcd-input-min-height,auto);padding:var(--_gcd-input-padding,0)}}._547d86373d02e108__textarea{box-sizing:var(--_gcd-textarea-box-sizing,border-box);overflow:var(--_gcd-textarea-overflow,auto);resize:var(--_gcd-textarea-resize,block)}._8c15fd0ed9f28ba4__div{outline:var(--_gcd-div-outline,0 solid #0000)}p._43cec3e1eec1066d__p{font-size:var(--_gcd-p-font-size,13px);line-height:var(--_gcd-p-line-height,1.5);margin:var(--_gcd-p-margin,0)}:is(h1,h2,h3,h4,h5,h6).e97669c6d9a38497__heading{color:var(--_gcd-heading-color,var(--wpds-color-fg-content-neutral,#1e1e1e));font-size:var(--_gcd-heading-font-size,inherit);font-weight:var(--_gcd-heading-font-weight,var(--wpds-typography-font-weight-medium,499));margin:var(--_gcd-heading-margin,0)}._2c0831b0499dbd6e__a,._2c0831b0499dbd6e__a:is(:hover,:focus,:active){border-radius:var(--_gcd-a-border-radius,0);box-shadow:var(--_gcd-a-box-shadow,none);color:var(--_gcd-a-color,inherit);outline:var(--_gcd-a-outline,0 solid #0000);transition:var(--_gcd-a-transition,none)}");
}
var global_css_defense_default2 = { "button": "_6defc79820e382c6__button", "input": "d2cff2e5dea83bd1__input", "textarea": "_547d86373d02e108__textarea", "div": "_8c15fd0ed9f28ba4__div", "p": "_43cec3e1eec1066d__p", "heading": "e97669c6d9a38497__heading", "a": "_2c0831b0499dbd6e__a" };
var Button3 = (0, import_element2.forwardRef)(
  function Button22({
    tone = "brand",
    variant = "solid",
    size = "default",
    className,
    focusableWhenDisabled = true,
    disabled: disabled2,
    loading,
    loadingAnnouncement = (0, import_i18n.__)("Loading"),
    children,
    ...props
  }, ref) {
    const mergedClassName = clsx_default(
      global_css_defense_default2.button,
      resets_default["box-sizing"],
      focus_default["outset-ring--focus-except-active"],
      variant !== "unstyled" && style_default2.button,
      style_default2[`is-${tone}`],
      style_default2[`is-${variant}`],
      style_default2[`is-${size}`],
      loading && style_default2["is-loading"],
      className
    );
    (0, import_element2.useEffect)(() => {
      if (loading && loadingAnnouncement) {
        speak(loadingAnnouncement);
      }
    }, [loading, loadingAnnouncement]);
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      Button,
      {
        ref,
        className: mergedClassName,
        focusableWhenDisabled,
        disabled: disabled2 ?? loading,
        ...props,
        children
      }
    );
  }
);

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/button/icon.mjs
var import_element4 = __toESM(require_element(), 1);

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/icon/icon.mjs
var import_element3 = __toESM(require_element(), 1);
var import_primitives = __toESM(require_primitives(), 1);
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
var Icon = (0, import_element3.forwardRef)(function Icon2({ icon, size = 24, ...restProps }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    import_primitives.SVG,
    {
      ref,
      fill: "currentColor",
      ...icon.props,
      ...restProps,
      width: size,
      height: size
    }
  );
});

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/button/icon.mjs
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
var ButtonIcon = (0, import_element4.forwardRef)(
  function ButtonIcon2({ icon, ...props }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      Icon,
      {
        ref,
        icon,
        viewBox: "4 4 16 16",
        size: 16,
        ...props
      }
    );
  }
);

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/button/index.mjs
ButtonIcon.displayName = "Button.Icon";
var Button4 = Object.assign(Button3, {
  /**
   * An icon component specifically designed to work well when rendered inside
   * a `Button` component.
   */
  Icon: ButtonIcon
});

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/card/index.mjs
var card_exports = {};
__export(card_exports, {
  Content: () => Content,
  FullBleed: () => FullBleed,
  Header: () => Header,
  Root: () => Root,
  Title: () => Title
});

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/card/root.mjs
var import_element5 = __toESM(require_element(), 1);
var STYLE_HASH_ATTRIBUTE3 = "data-wp-hash";
function getRuntime3() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument3(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash3(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE3}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE3) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle3(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime3();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash3(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE3, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument3(targetDocument) {
  const runtime = getRuntime3();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle3(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle3(hash, css) {
  const runtime = getRuntime3();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle3(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle3("e3ae230cea", "@layer wp-ui-utilities, wp-ui-components, wp-ui-compositions, wp-ui-overrides;@layer wp-ui-utilities{._336cd3e4e743482f__box-sizing{box-sizing:border-box;*,:after,:before{box-sizing:inherit}}}");
}
var resets_default2 = { "box-sizing": "_336cd3e4e743482f__box-sizing" };
if (typeof process === "undefined" || true) {
  registerStyle3("14f5e9ddeb", "@layer wp-ui-utilities, wp-ui-components, wp-ui-compositions, wp-ui-overrides;@layer wp-ui-components{._02872bf298eadc43__root{--wp-ui-card-padding:var(--wpds-dimension-padding-2xl,24px);--wp-ui-card-header-content-gap:var(--wpds-dimension-gap-xl,24px);--wp-ui-card-header-content-margin:calc(var(--wp-ui-card-header-content-gap) - var(--wp-ui-card-padding));background-color:var(--wpds-color-bg-surface-neutral-strong,#fff);border:1px solid var(--wpds-color-stroke-surface-neutral-weak,#e4e4e4);border-radius:var(--wpds-border-radius-lg,8px);color:var(--wpds-color-fg-content-neutral,#1e1e1e);display:flex;flex-direction:column;overflow:clip}._5dffdaf2a6e669ac__content,.bbccc92e6ba5662d__header{padding:var(--wp-ui-card-padding);&:not(:first-child):not(:last-child){padding-block-end:0}}.bbccc92e6ba5662d__header+._5dffdaf2a6e669ac__content{margin-block-start:var(--wp-ui-card-header-content-margin);padding-block-start:0}.c1fa192587e1b4a6__fullbleed{margin-inline:calc(var(--wp-ui-card-padding)*-1);width:calc(100% + var(--wp-ui-card-padding)*2)}}");
}
var style_default3 = { "root": "_02872bf298eadc43__root", "header": "bbccc92e6ba5662d__header", "content": "_5dffdaf2a6e669ac__content", "fullbleed": "c1fa192587e1b4a6__fullbleed" };
var Root = (0, import_element5.forwardRef)(function Card({ render, ...restProps }, ref) {
  const mergedClassName = clsx_default(style_default3.root, resets_default2["box-sizing"]);
  const element = useRender({
    defaultTagName: "div",
    render,
    ref,
    props: mergeProps({ className: mergedClassName }, restProps)
  });
  return element;
});

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/card/header.mjs
var import_element6 = __toESM(require_element(), 1);
var STYLE_HASH_ATTRIBUTE4 = "data-wp-hash";
function getRuntime4() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument4(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash4(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE4}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE4) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle4(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime4();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash4(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE4, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument4(targetDocument) {
  const runtime = getRuntime4();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle4(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle4(hash, css) {
  const runtime = getRuntime4();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle4(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle4("14f5e9ddeb", "@layer wp-ui-utilities, wp-ui-components, wp-ui-compositions, wp-ui-overrides;@layer wp-ui-components{._02872bf298eadc43__root{--wp-ui-card-padding:var(--wpds-dimension-padding-2xl,24px);--wp-ui-card-header-content-gap:var(--wpds-dimension-gap-xl,24px);--wp-ui-card-header-content-margin:calc(var(--wp-ui-card-header-content-gap) - var(--wp-ui-card-padding));background-color:var(--wpds-color-bg-surface-neutral-strong,#fff);border:1px solid var(--wpds-color-stroke-surface-neutral-weak,#e4e4e4);border-radius:var(--wpds-border-radius-lg,8px);color:var(--wpds-color-fg-content-neutral,#1e1e1e);display:flex;flex-direction:column;overflow:clip}._5dffdaf2a6e669ac__content,.bbccc92e6ba5662d__header{padding:var(--wp-ui-card-padding);&:not(:first-child):not(:last-child){padding-block-end:0}}.bbccc92e6ba5662d__header+._5dffdaf2a6e669ac__content{margin-block-start:var(--wp-ui-card-header-content-margin);padding-block-start:0}.c1fa192587e1b4a6__fullbleed{margin-inline:calc(var(--wp-ui-card-padding)*-1);width:calc(100% + var(--wp-ui-card-padding)*2)}}");
}
var style_default4 = { "root": "_02872bf298eadc43__root", "header": "bbccc92e6ba5662d__header", "content": "_5dffdaf2a6e669ac__content", "fullbleed": "c1fa192587e1b4a6__fullbleed" };
var Header = (0, import_element6.forwardRef)(
  function CardHeader({ render, ...props }, ref) {
    const element = useRender({
      defaultTagName: "div",
      render,
      ref,
      props: mergeProps({ className: style_default4.header }, props)
    });
    return element;
  }
);

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/card/content.mjs
var import_element7 = __toESM(require_element(), 1);
var STYLE_HASH_ATTRIBUTE5 = "data-wp-hash";
function getRuntime5() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument5(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash5(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE5}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE5) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle5(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime5();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash5(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE5, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument5(targetDocument) {
  const runtime = getRuntime5();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle5(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle5(hash, css) {
  const runtime = getRuntime5();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle5(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle5("14f5e9ddeb", "@layer wp-ui-utilities, wp-ui-components, wp-ui-compositions, wp-ui-overrides;@layer wp-ui-components{._02872bf298eadc43__root{--wp-ui-card-padding:var(--wpds-dimension-padding-2xl,24px);--wp-ui-card-header-content-gap:var(--wpds-dimension-gap-xl,24px);--wp-ui-card-header-content-margin:calc(var(--wp-ui-card-header-content-gap) - var(--wp-ui-card-padding));background-color:var(--wpds-color-bg-surface-neutral-strong,#fff);border:1px solid var(--wpds-color-stroke-surface-neutral-weak,#e4e4e4);border-radius:var(--wpds-border-radius-lg,8px);color:var(--wpds-color-fg-content-neutral,#1e1e1e);display:flex;flex-direction:column;overflow:clip}._5dffdaf2a6e669ac__content,.bbccc92e6ba5662d__header{padding:var(--wp-ui-card-padding);&:not(:first-child):not(:last-child){padding-block-end:0}}.bbccc92e6ba5662d__header+._5dffdaf2a6e669ac__content{margin-block-start:var(--wp-ui-card-header-content-margin);padding-block-start:0}.c1fa192587e1b4a6__fullbleed{margin-inline:calc(var(--wp-ui-card-padding)*-1);width:calc(100% + var(--wp-ui-card-padding)*2)}}");
}
var style_default5 = { "root": "_02872bf298eadc43__root", "header": "bbccc92e6ba5662d__header", "content": "_5dffdaf2a6e669ac__content", "fullbleed": "c1fa192587e1b4a6__fullbleed" };
var Content = (0, import_element7.forwardRef)(
  function CardContent({ render, ...props }, ref) {
    const element = useRender({
      defaultTagName: "div",
      render,
      ref,
      props: mergeProps({ className: style_default5.content }, props)
    });
    return element;
  }
);

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/card/full-bleed.mjs
var import_element8 = __toESM(require_element(), 1);
var STYLE_HASH_ATTRIBUTE6 = "data-wp-hash";
function getRuntime6() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument6(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash6(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE6}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE6) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle6(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime6();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash6(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE6, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument6(targetDocument) {
  const runtime = getRuntime6();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle6(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle6(hash, css) {
  const runtime = getRuntime6();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle6(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle6("14f5e9ddeb", "@layer wp-ui-utilities, wp-ui-components, wp-ui-compositions, wp-ui-overrides;@layer wp-ui-components{._02872bf298eadc43__root{--wp-ui-card-padding:var(--wpds-dimension-padding-2xl,24px);--wp-ui-card-header-content-gap:var(--wpds-dimension-gap-xl,24px);--wp-ui-card-header-content-margin:calc(var(--wp-ui-card-header-content-gap) - var(--wp-ui-card-padding));background-color:var(--wpds-color-bg-surface-neutral-strong,#fff);border:1px solid var(--wpds-color-stroke-surface-neutral-weak,#e4e4e4);border-radius:var(--wpds-border-radius-lg,8px);color:var(--wpds-color-fg-content-neutral,#1e1e1e);display:flex;flex-direction:column;overflow:clip}._5dffdaf2a6e669ac__content,.bbccc92e6ba5662d__header{padding:var(--wp-ui-card-padding);&:not(:first-child):not(:last-child){padding-block-end:0}}.bbccc92e6ba5662d__header+._5dffdaf2a6e669ac__content{margin-block-start:var(--wp-ui-card-header-content-margin);padding-block-start:0}.c1fa192587e1b4a6__fullbleed{margin-inline:calc(var(--wp-ui-card-padding)*-1);width:calc(100% + var(--wp-ui-card-padding)*2)}}");
}
var style_default6 = { "root": "_02872bf298eadc43__root", "header": "bbccc92e6ba5662d__header", "content": "_5dffdaf2a6e669ac__content", "fullbleed": "c1fa192587e1b4a6__fullbleed" };
var FullBleed = (0, import_element8.forwardRef)(
  function CardFullBleed({ render, ...props }, ref) {
    const element = useRender({
      defaultTagName: "div",
      render,
      ref,
      props: mergeProps(
        { className: style_default6.fullbleed },
        props
      )
    });
    return element;
  }
);

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/card/title.mjs
var import_element9 = __toESM(require_element(), 1);
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
var DEFAULT_TAG = /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", {});
var Title = (0, import_element9.forwardRef)(
  function CardTitle({ render = DEFAULT_TAG, children, ...props }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      Text,
      {
        ref,
        variant: "heading-lg",
        render,
        ...props,
        children
      }
    );
  }
);

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/collapsible/panel.mjs
var import_element10 = __toESM(require_element(), 1);
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
var Panel = (0, import_element10.forwardRef)(
  function CollapsiblePanel3(props, forwardedRef) {
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(index_parts_exports.Panel, { ref: forwardedRef, ...props });
  }
);

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/collapsible/root.mjs
var import_element11 = __toESM(require_element(), 1);
var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
var Root2 = (0, import_element11.forwardRef)(
  function CollapsibleRoot3(props, forwardedRef) {
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(index_parts_exports.Root, { ref: forwardedRef, ...props });
  }
);

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/collapsible/trigger.mjs
var import_element12 = __toESM(require_element(), 1);
var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
var Trigger = (0, import_element12.forwardRef)(
  function CollapsibleTrigger3(props, forwardedRef) {
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(index_parts_exports.Trigger, { ref: forwardedRef, ...props });
  }
);

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/collapsible-card/index.mjs
var collapsible_card_exports = {};
__export(collapsible_card_exports, {
  Content: () => Content2,
  Header: () => Header2,
  HeaderDescription: () => HeaderDescription,
  Root: () => Root3
});

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/collapsible-card/root.mjs
var import_element13 = __toESM(require_element(), 1);
var import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);
var Root3 = (0, import_element13.forwardRef)(
  function CollapsibleCardRoot({ render, ...restProps }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      Root2,
      {
        ref,
        render: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Root, { render }),
        ...restProps
      }
    );
  }
);

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/collapsible-card/header.mjs
var import_element15 = __toESM(require_element(), 1);

// ../../../node_modules/.pnpm/@wordpress+icons@13.1.0_@types+react@18.3.28_react@18.3.1/node_modules/@wordpress/icons/build-module/library/border.mjs
var import_primitives2 = __toESM(require_primitives(), 1);
var import_jsx_runtime10 = __toESM(require_jsx_runtime(), 1);
var border_default = /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_primitives2.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_primitives2.Path, { d: "m6.6 15.6-1.2.8c.6.9 1.3 1.6 2.2 2.2l.8-1.2c-.7-.5-1.3-1.1-1.8-1.8zM5.5 12c0-.4 0-.9.1-1.3l-1.5-.3c0 .5-.1 1.1-.1 1.6s.1 1.1.2 1.6l1.5-.3c-.2-.4-.2-.9-.2-1.3zm11.9-3.6 1.2-.8c-.6-.9-1.3-1.6-2.2-2.2l-.8 1.2c.7.5 1.3 1.1 1.8 1.8zM5.3 7.6l1.2.8c.5-.7 1.1-1.3 1.8-1.8l-.7-1.3c-.9.6-1.7 1.4-2.3 2.3zm14.5 2.8-1.5.3c.1.4.1.8.1 1.3s0 .9-.1 1.3l1.5.3c.1-.5.2-1 .2-1.6s-.1-1.1-.2-1.6zM12 18.5c-.4 0-.9 0-1.3-.1l-.3 1.5c.5.1 1 .2 1.6.2s1.1-.1 1.6-.2l-.3-1.5c-.4.1-.9.1-1.3.1zm3.6-1.1.8 1.2c.9-.6 1.6-1.3 2.2-2.2l-1.2-.8c-.5.7-1.1 1.3-1.8 1.8zM10.4 4.2l.3 1.5c.4-.1.8-.1 1.3-.1s.9 0 1.3.1l.3-1.5c-.5-.1-1.1-.2-1.6-.2s-1.1.1-1.6.2z" }) });

// ../../../node_modules/.pnpm/@wordpress+icons@13.1.0_@types+react@18.3.28_react@18.3.1/node_modules/@wordpress/icons/build-module/library/chevron-down.mjs
var import_primitives3 = __toESM(require_primitives(), 1);
var import_jsx_runtime11 = __toESM(require_jsx_runtime(), 1);
var chevron_down_default = /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_primitives3.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_primitives3.Path, { d: "M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z" }) });

// ../../../node_modules/.pnpm/@wordpress+icons@13.1.0_@types+react@18.3.28_react@18.3.1/node_modules/@wordpress/icons/build-module/library/drafts.mjs
var import_primitives4 = __toESM(require_primitives(), 1);
var import_jsx_runtime12 = __toESM(require_jsx_runtime(), 1);
var drafts_default = /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_primitives4.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_primitives4.Path, { fillRule: "evenodd", clipRule: "evenodd", d: "M12 18.5a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13ZM4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm8 4a4 4 0 0 0 4-4H8a4 4 0 0 0 4 4Z" }) });

// ../../../node_modules/.pnpm/@wordpress+icons@13.1.0_@types+react@18.3.28_react@18.3.1/node_modules/@wordpress/icons/build-module/library/envelope.mjs
var import_primitives5 = __toESM(require_primitives(), 1);
var import_jsx_runtime13 = __toESM(require_jsx_runtime(), 1);
var envelope_default = /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_primitives5.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_primitives5.Path, { fillRule: "evenodd", clipRule: "evenodd", d: "M3 7c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm2-.5h14c.3 0 .5.2.5.5v1L12 13.5 4.5 7.9V7c0-.3.2-.5.5-.5Zm-.5 3.3V17c0 .3.2.5.5.5h14c.3 0 .5-.2.5-.5V9.8L12 15.4 4.5 9.8Z" }) });

// ../../../node_modules/.pnpm/@wordpress+icons@13.1.0_@types+react@18.3.28_react@18.3.1/node_modules/@wordpress/icons/build-module/library/gallery.mjs
var import_primitives6 = __toESM(require_primitives(), 1);
var import_jsx_runtime14 = __toESM(require_jsx_runtime(), 1);
var gallery_default = /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_primitives6.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_primitives6.Path, { fillRule: "evenodd", clipRule: "evenodd", d: "M16.375 4.5H4.625a.125.125 0 0 0-.125.125v8.254l2.859-1.54a.75.75 0 0 1 .68-.016l2.384 1.142 2.89-2.074a.75.75 0 0 1 .874 0l2.313 1.66V4.625a.125.125 0 0 0-.125-.125Zm.125 9.398-2.75-1.975-2.813 2.02a.75.75 0 0 1-.76.067l-2.444-1.17L4.5 14.583v1.792c0 .069.056.125.125.125h11.75a.125.125 0 0 0 .125-.125v-2.477ZM4.625 3C3.728 3 3 3.728 3 4.625v11.75C3 17.273 3.728 18 4.625 18h11.75c.898 0 1.625-.727 1.625-1.625V4.625C18 3.728 17.273 3 16.375 3H4.625ZM20 8v11c0 .69-.31 1-.999 1H6v1.5h13.001c1.52 0 2.499-.982 2.499-2.5V8H20Z" }) });

// ../../../node_modules/.pnpm/@wordpress+icons@13.1.0_@types+react@18.3.28_react@18.3.1/node_modules/@wordpress/icons/build-module/library/pencil.mjs
var import_primitives7 = __toESM(require_primitives(), 1);
var import_jsx_runtime15 = __toESM(require_jsx_runtime(), 1);
var pencil_default = /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_primitives7.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_primitives7.Path, { d: "m19 7-3-3-8.5 8.5-1 4 4-1L19 7Zm-7 11.5H5V20h7v-1.5Z" }) });

// ../../../node_modules/.pnpm/@wordpress+icons@13.1.0_@types+react@18.3.28_react@18.3.1/node_modules/@wordpress/icons/build-module/library/people.mjs
var import_primitives8 = __toESM(require_primitives(), 1);
var import_jsx_runtime16 = __toESM(require_jsx_runtime(), 1);
var people_default = /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_primitives8.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_primitives8.Path, { fillRule: "evenodd", d: "M15.5 9.5a1 1 0 100-2 1 1 0 000 2zm0 1.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm-2.25 6v-2a2.75 2.75 0 00-2.75-2.75h-4A2.75 2.75 0 003.75 15v2h1.5v-2c0-.69.56-1.25 1.25-1.25h4c.69 0 1.25.56 1.25 1.25v2h1.5zm7-2v2h-1.5v-2c0-.69-.56-1.25-1.25-1.25H15v-1.5h2.5A2.75 2.75 0 0120.25 15zM9.5 8.5a1 1 0 11-2 0 1 1 0 012 0zm1.5 0a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" }) });

// ../../../node_modules/.pnpm/@wordpress+icons@13.1.0_@types+react@18.3.28_react@18.3.1/node_modules/@wordpress/icons/build-module/library/published.mjs
var import_primitives9 = __toESM(require_primitives(), 1);
var import_jsx_runtime17 = __toESM(require_jsx_runtime(), 1);
var published_default = /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_primitives9.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_primitives9.Path, { fillRule: "evenodd", clipRule: "evenodd", d: "M12 18.5a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13ZM4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm11.53-1.47-1.06-1.06L11 12.94l-1.47-1.47-1.06 1.06L11 15.06l4.53-4.53Z" }) });

// ../../../node_modules/.pnpm/@wordpress+icons@13.1.0_@types+react@18.3.28_react@18.3.1/node_modules/@wordpress/icons/build-module/library/store.mjs
var import_primitives10 = __toESM(require_primitives(), 1);
var import_jsx_runtime18 = __toESM(require_jsx_runtime(), 1);
var store_default = /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_primitives10.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_primitives10.Path, { fillRule: "evenodd", clipRule: "evenodd", d: "M19.75 11H21V8.667L19.875 4H4.125L3 8.667V11h1.25v8.75h15.5V11zm-1.5 0H5.75v7.25H10V13h4v5.25h4.25V11zm-5.5-5.5h2.067l.486 3.24.028.76H12.75v-4zm-3.567 0h2.067v4H8.669l.028-.76.486-3.24zm7.615 3.1l-.464-3.1h2.36l.806 3.345V9.5h-2.668l-.034-.9zM7.666 5.5h-2.36L4.5 8.845V9.5h2.668l.034-.9.464-3.1z" }) });

// ../../../node_modules/.pnpm/@wordpress+icons@13.1.0_@types+react@18.3.28_react@18.3.1/node_modules/@wordpress/icons/build-module/library/tool.mjs
var import_primitives11 = __toESM(require_primitives(), 1);
var import_jsx_runtime19 = __toESM(require_jsx_runtime(), 1);
var tool_default = /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_primitives11.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_primitives11.Path, { d: "M14.103 7.128l2.26-2.26a4 4 0 00-5.207 4.804L5.828 15a2 2 0 102.828 2.828l5.329-5.328a4 4 0 004.804-5.208l-2.261 2.26-1.912-.512-.513-1.912zm-7.214 9.64a.5.5 0 11.707-.707.5.5 0 01-.707.707z" }) });

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/collapsible-card/context.mjs
var import_element14 = __toESM(require_element(), 1);
var HeaderDescriptionIdContext = (0, import_element14.createContext)({
  setDescriptionId: () => {
  }
});

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/collapsible-card/header.mjs
var import_jsx_runtime20 = __toESM(require_jsx_runtime(), 1);
var STYLE_HASH_ATTRIBUTE7 = "data-wp-hash";
function getRuntime7() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument7(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash7(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE7}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE7) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle7(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime7();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash7(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE7, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument7(targetDocument) {
  const runtime = getRuntime7();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle7(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle7(hash, css) {
  const runtime = getRuntime7();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle7(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle7("f1b9bb6252", "@layer wp-ui-utilities, wp-ui-components, wp-ui-compositions, wp-ui-overrides;@layer wp-ui-components{._626190151275d6d3__heading-wrapper{--_gcd-heading-color:inherit;--_gcd-heading-font-size:inherit;--_gcd-heading-font-weight:inherit;--_gcd-heading-margin:0;font-family:inherit;line-height:inherit}.cab17c7a373cb60d__header-content{flex:1;min-width:0}.dd89d27c4f15912d__header-trigger-positioner{align-self:center;flex-shrink:0;max-height:0;overflow:visible}.bcfab5f2448bafef__header-trigger-wrapper{border-radius:var(--wpds-border-radius-sm,2px);display:flex;translate:0 -50%}._3106f8d2b0330faa__header-trigger{@media not (prefers-reduced-motion){transition:rotate .15s ease-out}}._5d2dfcb4085c6d0f__header[data-panel-open] ._3106f8d2b0330faa__header-trigger{rotate:180deg}._5d2dfcb4085c6d0f__header[data-disabled] ._3106f8d2b0330faa__header-trigger{color:var(--wpds-color-fg-interactive-neutral-disabled,#8d8d8d)}.e34cf37ccd0d81e0__content{height:var(--collapsible-panel-height);margin-block-start:var(--wp-ui-card-header-content-margin);overflow:hidden;&._165c4572592944b2__overflowVisible{overflow:visible}&[hidden]:not([hidden=until-found]){display:none}&[data-ending-style],&[data-starting-style]{height:0}@media not (prefers-reduced-motion){transition:all .15s ease-out}}}@layer wp-ui-compositions{._41bfdbf7b6c087c2__content-inner{padding-block-start:0}._5d2dfcb4085c6d0f__header{align-items:stretch;display:flex;flex-direction:row;gap:var(--wpds-dimension-gap-sm,8px);outline:none;&:not([data-disabled]){cursor:var(--wpds-cursor-control,pointer)}}}");
}
var style_default7 = { "heading-wrapper": "_626190151275d6d3__heading-wrapper", "header-content": "cab17c7a373cb60d__header-content", "header-trigger-positioner": "dd89d27c4f15912d__header-trigger-positioner", "header-trigger-wrapper": "bcfab5f2448bafef__header-trigger-wrapper", "header-trigger": "_3106f8d2b0330faa__header-trigger", "header": "_5d2dfcb4085c6d0f__header", "content": "e34cf37ccd0d81e0__content", "overflowVisible": "_165c4572592944b2__overflowVisible", "content-inner": "_41bfdbf7b6c087c2__content-inner" };
if (typeof process === "undefined" || true) {
  registerStyle7("1fb29d3a3c", "._6defc79820e382c6__button{box-sizing:var(--_gcd-button-box-sizing,border-box);font-family:var(--_gcd-button-font-family,inherit);font-size:var(--_gcd-button-font-size,inherit);font-weight:var(--_gcd-button-font-weight,inherit)}.d2cff2e5dea83bd1__input{box-sizing:var(--_gcd-input-box-sizing,border-box);font-family:var(--_gcd-input-font-family,inherit);font-size:var(--_gcd-input-font-size,inherit);font-weight:var(--_gcd-input-font-weight,inherit);margin:var(--_gcd-input-margin,0);&:is(textarea,[type=text],[type=password],[type=color],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){background-color:var(--_gcd-input-background-color,#0000);border:var(--_gcd-input-border,none);border-radius:var(--_gcd-input-border-radius,0);box-shadow:var(--_gcd-input-box-shadow,0 0 0 #0000);color:var(--_gcd-input-color,var(--wpds-color-fg-interactive-neutral,#1e1e1e));&:focus{border-color:var(--_gcd-input-border-color-focus,var(--wp-admin-theme-color));box-shadow:var(--_gcd-input-box-shadow-focus,none);outline:var(--_gcd-input-outline-focus,none)}&:disabled{background:var(--_gcd-input-background-disabled,#0000);border-color:var(--_gcd-input-border-color-disabled,#0000);box-shadow:var(--_gcd-input-box-shadow-disabled,none);color:var(--_gcd-input-color-disabled,var(--wpds-color-fg-interactive-neutral-disabled,#8d8d8d))}&::placeholder{color:var(--_gcd-input-placeholder-color,var(--wpds-color-fg-interactive-neutral-disabled,#8d8d8d))}}&:is(textarea,[type=text],[type=password],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){line-height:var(--_gcd-input-line-height,inherit);min-height:var(--_gcd-input-min-height,auto);padding:var(--_gcd-input-padding,0)}}._547d86373d02e108__textarea{box-sizing:var(--_gcd-textarea-box-sizing,border-box);overflow:var(--_gcd-textarea-overflow,auto);resize:var(--_gcd-textarea-resize,block)}._8c15fd0ed9f28ba4__div{outline:var(--_gcd-div-outline,0 solid #0000)}p._43cec3e1eec1066d__p{font-size:var(--_gcd-p-font-size,13px);line-height:var(--_gcd-p-line-height,1.5);margin:var(--_gcd-p-margin,0)}:is(h1,h2,h3,h4,h5,h6).e97669c6d9a38497__heading{color:var(--_gcd-heading-color,var(--wpds-color-fg-content-neutral,#1e1e1e));font-size:var(--_gcd-heading-font-size,inherit);font-weight:var(--_gcd-heading-font-weight,var(--wpds-typography-font-weight-medium,499));margin:var(--_gcd-heading-margin,0)}._2c0831b0499dbd6e__a,._2c0831b0499dbd6e__a:is(:hover,:focus,:active){border-radius:var(--_gcd-a-border-radius,0);box-shadow:var(--_gcd-a-box-shadow,none);color:var(--_gcd-a-color,inherit);outline:var(--_gcd-a-outline,0 solid #0000);transition:var(--_gcd-a-transition,none)}");
}
var global_css_defense_default3 = { "button": "_6defc79820e382c6__button", "input": "d2cff2e5dea83bd1__input", "textarea": "_547d86373d02e108__textarea", "div": "_8c15fd0ed9f28ba4__div", "p": "_43cec3e1eec1066d__p", "heading": "e97669c6d9a38497__heading", "a": "_2c0831b0499dbd6e__a" };
if (typeof process === "undefined" || true) {
  registerStyle7("2a5ab8f3a7", "@layer wp-ui-utilities, wp-ui-components, wp-ui-compositions, wp-ui-overrides;@layer wp-ui-utilities{._08e8a2e44959f892__outset-ring--focus,._970d04df7376df67__outset-ring--focus-within-except-active,.c5cb3ee4bddaa8e4__outset-ring--focus-within-visible,.cd83dfc2126a0846__outset-ring--focus-within,.d0541bc9dd9dc7b6__outset-ring--focus-visible,.e25b2bdd7aa21721__outset-ring--focus-except-active,.ecadb9e080e2dfa5__outset-ring--focus-parent-visible{@media not (prefers-reduced-motion){--_gcd-a-transition:outline 0.1s ease-out;transition:outline .1s ease-out}outline:0 solid #0000;outline-offset:1px}._08e8a2e44959f892__outset-ring--focus:focus,._970d04df7376df67__outset-ring--focus-within-except-active:focus-within:not(:has(:active)),.c5cb3ee4bddaa8e4__outset-ring--focus-within-visible:focus-within:has(:focus-visible),.cd83dfc2126a0846__outset-ring--focus-within:focus-within,.d0541bc9dd9dc7b6__outset-ring--focus-visible:focus-visible,.e25b2bdd7aa21721__outset-ring--focus-except-active:focus:not(:active),:focus-visible .ecadb9e080e2dfa5__outset-ring--focus-parent-visible{--_gcd-a-outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--wpds-color-stroke-focus-brand,var(--wp-admin-theme-color,#3858e9));--_gcd-div-outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--wpds-color-stroke-focus-brand,var(--wp-admin-theme-color,#3858e9));outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--wpds-color-stroke-focus-brand,var(--wp-admin-theme-color,#3858e9))}}");
}
var focus_default2 = { "outset-ring--focus": "_08e8a2e44959f892__outset-ring--focus", "outset-ring--focus-except-active": "e25b2bdd7aa21721__outset-ring--focus-except-active", "outset-ring--focus-visible": "d0541bc9dd9dc7b6__outset-ring--focus-visible", "outset-ring--focus-within": "cd83dfc2126a0846__outset-ring--focus-within", "outset-ring--focus-within-except-active": "_970d04df7376df67__outset-ring--focus-within-except-active", "outset-ring--focus-within-visible": "c5cb3ee4bddaa8e4__outset-ring--focus-within-visible", "outset-ring--focus-parent-visible": "ecadb9e080e2dfa5__outset-ring--focus-parent-visible" };
var Header2 = (0, import_element15.forwardRef)(
  function CollapsibleCardHeader({ children, className, render, ...restProps }, ref) {
    const [descriptionId, setDescriptionId] = (0, import_element15.useState)();
    const contextValue = (0, import_element15.useMemo)(
      () => ({ setDescriptionId }),
      [setDescriptionId]
    );
    return useRender({
      defaultTagName: "div",
      render,
      ref,
      props: mergeProps(restProps, {
        className: clsx_default(
          global_css_defense_default3.heading,
          style_default7["heading-wrapper"],
          className
        ),
        children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(HeaderDescriptionIdContext.Provider, { value: contextValue, children: /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
          Trigger,
          {
            className: style_default7.header,
            render: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(Header, {}),
            nativeButton: false,
            "aria-describedby": descriptionId,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: style_default7["header-content"], children }),
              /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
                "div",
                {
                  className: clsx_default(
                    style_default7["header-trigger-positioner"]
                  ),
                  children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
                    "div",
                    {
                      className: clsx_default(
                        style_default7["header-trigger-wrapper"],
                        global_css_defense_default3.div,
                        // While the interactive trigger element is the whole header,
                        // the focus ring will be displayed only on the icon to visually
                        // emulate it being the button.
                        focus_default2["outset-ring--focus-parent-visible"]
                      ),
                      children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
                        Icon,
                        {
                          icon: chevron_down_default,
                          className: style_default7["header-trigger"]
                        }
                      )
                    }
                  )
                }
              )
            ]
          }
        ) })
      })
    });
  }
);

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/collapsible-card/header-description.mjs
var import_element16 = __toESM(require_element(), 1);
var import_jsx_runtime21 = __toESM(require_jsx_runtime(), 1);
var HeaderDescription = (0, import_element16.forwardRef)(function CollapsibleCardHeaderDescription({ children, className, ...restProps }, ref) {
  const descriptionId = (0, import_element16.useId)();
  const { setDescriptionId } = (0, import_element16.useContext)(HeaderDescriptionIdContext);
  (0, import_element16.useEffect)(() => {
    setDescriptionId(descriptionId);
    return () => setDescriptionId(void 0);
  }, [descriptionId, setDescriptionId]);
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
    "div",
    {
      ref,
      id: descriptionId,
      "aria-hidden": "true",
      className,
      ...restProps,
      children
    }
  );
});

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/collapsible-card/content.mjs
var import_element17 = __toESM(require_element(), 1);
var import_jsx_runtime22 = __toESM(require_jsx_runtime(), 1);
var STYLE_HASH_ATTRIBUTE8 = "data-wp-hash";
function getRuntime8() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument8(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash8(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE8}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE8) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle8(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime8();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash8(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE8, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument8(targetDocument) {
  const runtime = getRuntime8();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle8(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle8(hash, css) {
  const runtime = getRuntime8();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle8(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle8("f1b9bb6252", "@layer wp-ui-utilities, wp-ui-components, wp-ui-compositions, wp-ui-overrides;@layer wp-ui-components{._626190151275d6d3__heading-wrapper{--_gcd-heading-color:inherit;--_gcd-heading-font-size:inherit;--_gcd-heading-font-weight:inherit;--_gcd-heading-margin:0;font-family:inherit;line-height:inherit}.cab17c7a373cb60d__header-content{flex:1;min-width:0}.dd89d27c4f15912d__header-trigger-positioner{align-self:center;flex-shrink:0;max-height:0;overflow:visible}.bcfab5f2448bafef__header-trigger-wrapper{border-radius:var(--wpds-border-radius-sm,2px);display:flex;translate:0 -50%}._3106f8d2b0330faa__header-trigger{@media not (prefers-reduced-motion){transition:rotate .15s ease-out}}._5d2dfcb4085c6d0f__header[data-panel-open] ._3106f8d2b0330faa__header-trigger{rotate:180deg}._5d2dfcb4085c6d0f__header[data-disabled] ._3106f8d2b0330faa__header-trigger{color:var(--wpds-color-fg-interactive-neutral-disabled,#8d8d8d)}.e34cf37ccd0d81e0__content{height:var(--collapsible-panel-height);margin-block-start:var(--wp-ui-card-header-content-margin);overflow:hidden;&._165c4572592944b2__overflowVisible{overflow:visible}&[hidden]:not([hidden=until-found]){display:none}&[data-ending-style],&[data-starting-style]{height:0}@media not (prefers-reduced-motion){transition:all .15s ease-out}}}@layer wp-ui-compositions{._41bfdbf7b6c087c2__content-inner{padding-block-start:0}._5d2dfcb4085c6d0f__header{align-items:stretch;display:flex;flex-direction:row;gap:var(--wpds-dimension-gap-sm,8px);outline:none;&:not([data-disabled]){cursor:var(--wpds-cursor-control,pointer)}}}");
}
var style_default8 = { "heading-wrapper": "_626190151275d6d3__heading-wrapper", "header-content": "cab17c7a373cb60d__header-content", "header-trigger-positioner": "dd89d27c4f15912d__header-trigger-positioner", "header-trigger-wrapper": "bcfab5f2448bafef__header-trigger-wrapper", "header-trigger": "_3106f8d2b0330faa__header-trigger", "header": "_5d2dfcb4085c6d0f__header", "content": "e34cf37ccd0d81e0__content", "overflowVisible": "_165c4572592944b2__overflowVisible", "content-inner": "_41bfdbf7b6c087c2__content-inner" };
var Content2 = (0, import_element17.forwardRef)(
  function CollapsibleCardContent({ className, render, children, hiddenUntilFound = true, ...restProps }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
      Panel,
      {
        ref,
        className: (state) => clsx_default(
          style_default8.content,
          state.open && state.transitionStatus === "idle" && style_default8.overflowVisible,
          className
        ),
        hiddenUntilFound,
        ...restProps,
        children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
          Content,
          {
            className: style_default8["content-inner"],
            render,
            children
          }
        )
      }
    );
  }
);

// src/features/ai-launchpad/js/tailored-list/site-preview.tsx
function SitePreview({ siteUrl, siteTitle, siteEditUrl }) {
  if (!siteUrl) {
    return null;
  }
  let domain = siteUrl;
  try {
    domain = new URL(siteUrl).host;
  } catch {
  }
  const thumbnail = /* @__PURE__ */ React.createElement(
    "iframe",
    {
      className: "ai-launchpad-tailored-list__preview-iframe",
      title: siteTitle || domain,
      src: `${siteUrl}/?hide_banners=true&preview_overlay=true&preview=true`,
      inert: "true",
      tabIndex: -1
    }
  );
  let frame;
  if (siteEditUrl) {
    frame = /* @__PURE__ */ React.createElement("div", { className: "ai-launchpad-tailored-list__preview-frame is-editable" }, thumbnail, /* @__PURE__ */ React.createElement("span", { className: "ai-launchpad-tailored-list__preview-edit" }, /* @__PURE__ */ React.createElement(Button4, { variant: "solid", size: "compact", render: /* @__PURE__ */ React.createElement("a", { href: siteEditUrl }) }, (0, import_i18n2.__)("Edit site", "jetpack-mu-wpcom"))));
  } else {
    frame = /* @__PURE__ */ React.createElement("div", { className: "ai-launchpad-tailored-list__preview-frame" }, thumbnail);
  }
  return /* @__PURE__ */ React.createElement("aside", { className: "ai-launchpad-tailored-list__preview" }, frame, /* @__PURE__ */ React.createElement("p", { className: "ai-launchpad-tailored-list__preview-title" }, siteTitle || domain), /* @__PURE__ */ React.createElement(import_components.ExternalLink, { className: "ai-launchpad-tailored-list__preview-link", href: siteUrl }, domain));
}

// src/features/ai-launchpad/js/tailored-list/layout.tsx
function Layout({ progressLabel, siteUrl, siteTitle, siteEditUrl, children }) {
  const hasPreview = !!siteUrl;
  return /* @__PURE__ */ React.createElement("div", { className: "ai-launchpad-tailored-list__layout" }, /* @__PURE__ */ React.createElement("header", { className: "ai-launchpad-tailored-list__heading" }, /* @__PURE__ */ React.createElement("h1", { className: "ai-launchpad-tailored-list__title-heading" }, (0, import_i18n3.__)("Get the most out of WordPress", "jetpack-mu-wpcom")), /* @__PURE__ */ React.createElement("p", { className: "ai-launchpad-tailored-list__progress" }, progressLabel)), /* @__PURE__ */ React.createElement(
    "div",
    {
      className: clsx_default("ai-launchpad-tailored-list__columns", {
        "has-preview": hasPreview
      })
    },
    children,
    /* @__PURE__ */ React.createElement(SitePreview, { siteUrl, siteTitle, siteEditUrl })
  ));
}

// src/features/ai-launchpad/js/tailored-list/model.ts
var FIRST_POST_TASK_IDS = ["first_post_published", "first_post_published_newsletter"];
var PATTERN_PAGE_TASK_IDS = ["add_about_page"];
var LAUNCH_TASK_IDS = [
  "site_launched",
  "blog_launched",
  "link_in_bio_launched",
  "videopress_launched"
];
function ctaKind(taskId) {
  if (FIRST_POST_TASK_IDS.includes(taskId)) {
    return "first_post";
  }
  if (PATTERN_PAGE_TASK_IDS.includes(taskId)) {
    return "pattern_page";
  }
  if (LAUNCH_TASK_IDS.includes(taskId)) {
    return "launch";
  }
  return "deeplink";
}
var COMPLETE_ON_CLICK_TASK_IDS = [
  "complete_profile",
  "manage_subscribers",
  "manage_paid_newsletter_plan",
  "earn_money",
  "start_building_your_audience",
  "site_monitoring_page",
  "setup_ssh",
  "share_site"
];
function isCompleteOnClickTask(taskId) {
  return COMPLETE_ON_CLICK_TASK_IDS.includes(taskId);
}
function launchSiteUrl(siteUrl) {
  let slug;
  try {
    slug = new URL(siteUrl).host;
  } catch {
    return null;
  }
  return `https://wordpress.com/start/launch-site?siteSlug=${encodeURIComponent(
    slug
  )}&ref=wp-admin`;
}
function toNavigableUrl(url) {
  if (/^\/wp-admin(\/|\?|#|$)/.test(url)) {
    return url;
  }
  if (url.startsWith("/")) {
    return new URL(url, "https://wordpress.com").href;
  }
  return url;
}
async function resolveCtaUrl(task, output, handlers, siteUrl = null) {
  handlers.trackTaskClicked({ task_id: task.id });
  const kind = ctaKind(task.id);
  let url;
  if (task.in_progress && task.calypso_path) {
    url = task.calypso_path;
  } else if (kind === "first_post" && output) {
    url = (await handlers.createFirstPostDraft(output.first_post_draft)).edit_url;
  } else if (kind === "pattern_page" && output) {
    url = (await handlers.createPatternPage(output.inferred)).edit_url;
  } else if (kind === "launch") {
    url = siteUrl ? launchSiteUrl(siteUrl) : null;
  } else {
    url = task.calypso_path;
  }
  return url === null ? null : toNavigableUrl(url);
}
function isTaskActionable(task, output, siteUrl = null) {
  if (task.in_progress && task.calypso_path) {
    return true;
  }
  const kind = ctaKind(task.id);
  if ((kind === "first_post" || kind === "pattern_page") && output) {
    return true;
  }
  if (kind === "launch") {
    return !!siteUrl && launchSiteUrl(siteUrl) !== null;
  }
  return task.calypso_path !== null;
}
function nextIncompleteId(tasks, afterId) {
  const incomplete = tasks.filter((task) => !task.completed);
  if (incomplete.length === 0) {
    return null;
  }
  if (afterId === void 0) {
    return incomplete[0].id;
  }
  const fromIndex = tasks.findIndex((task) => task.id === afterId);
  const next = incomplete.find((task) => tasks.indexOf(task) > fromIndex);
  return (next ?? incomplete[0]).id;
}
function tasksFromFixture(output) {
  return output.tasks.map((task) => ({
    id: task.id,
    subtitle: task.subtitle,
    title: humanizeTaskId(task.id),
    completed: false,
    in_progress: false,
    calypso_path: null
  }));
}
function humanizeTaskId(id) {
  return id.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

// src/features/ai-launchpad/js/tailored-list/skeleton.tsx
var PLACEHOLDER_COUNT = 5;
function TailoredListSkeleton() {
  return /* @__PURE__ */ React.createElement("div", { className: "ai-launchpad-tailored-list" }, Array.from({ length: PLACEHOLDER_COUNT }).map((_, index) => /* @__PURE__ */ React.createElement(
    "span",
    {
      key: index,
      className: "ai-launchpad-tailored-list__skeleton-bar",
      "aria-hidden": "true"
    }
  )));
}

// src/features/ai-launchpad/js/tailored-list/task-card.tsx
var import_components2 = __toESM(require_components());
var import_i18n4 = __toESM(require_i18n());
function getCtaLabel(taskId, inProgress) {
  if (inProgress) {
    return (0, import_i18n4.__)("Continue", "jetpack-mu-wpcom");
  }
  switch (taskId) {
    case "site_theme_selected":
      return (0, import_i18n4.__)("Browse themes", "jetpack-mu-wpcom");
    case "woo_products":
      return (0, import_i18n4.__)("Add products", "jetpack-mu-wpcom");
    case "woo_customize_store":
      return (0, import_i18n4.__)("Customize store", "jetpack-mu-wpcom");
    case "set_up_payments":
      return (0, import_i18n4.__)("Set up payments", "jetpack-mu-wpcom");
    case "connect_social_media":
      return (0, import_i18n4.__)("Connect socials", "jetpack-mu-wpcom");
    // Both the AI-selectable id and the deterministic fallback id, so the label
    // holds on the fallback path too.
    case "subscribers_added":
    case "add_10_email_subscribers":
      return (0, import_i18n4.__)("Add subscribers", "jetpack-mu-wpcom");
  }
  switch (ctaKind(taskId)) {
    case "first_post":
      return (0, import_i18n4.__)("Write post", "jetpack-mu-wpcom");
    case "pattern_page":
      return (0, import_i18n4.__)("Add page", "jetpack-mu-wpcom");
    case "launch":
      return (0, import_i18n4.__)("Launch site", "jetpack-mu-wpcom");
    default:
      return (0, import_i18n4.__)("Get started", "jetpack-mu-wpcom");
  }
}
function TaskCard({
  task,
  isBusy,
  canStart,
  canMarkComplete,
  isOpen,
  onOpenChange,
  onGetStarted,
  onMarkComplete,
  onSkip
}) {
  if (task.completed) {
    return /* @__PURE__ */ React.createElement(card_exports.Root, { className: "ai-launchpad-tailored-list__card is-completed" }, /* @__PURE__ */ React.createElement(card_exports.Header, null, /* @__PURE__ */ React.createElement("span", { className: "ai-launchpad-tailored-list__header-inner" }, /* @__PURE__ */ React.createElement("span", { className: "ai-launchpad-tailored-list__icon is-done" }, /* @__PURE__ */ React.createElement(import_components2.Icon, { icon: published_default, size: 24 })), /* @__PURE__ */ React.createElement("span", { className: "ai-launchpad-tailored-list__title is-done" }, task.title))));
  }
  return /* @__PURE__ */ React.createElement(
    collapsible_card_exports.Root,
    {
      className: "ai-launchpad-tailored-list__card",
      open: isOpen,
      onOpenChange
    },
    /* @__PURE__ */ React.createElement(collapsible_card_exports.Header, null, /* @__PURE__ */ React.createElement("span", { className: "ai-launchpad-tailored-list__header-inner" }, /* @__PURE__ */ React.createElement("span", { className: "ai-launchpad-tailored-list__icon" }, /* @__PURE__ */ React.createElement(import_components2.Icon, { icon: task.in_progress ? drafts_default : border_default, size: 24 })), /* @__PURE__ */ React.createElement("span", { className: "ai-launchpad-tailored-list__title" }, task.title))),
    /* @__PURE__ */ React.createElement(collapsible_card_exports.Content, null, /* @__PURE__ */ React.createElement("p", { className: "ai-launchpad-tailored-list__subtitle" }, task.subtitle), /* @__PURE__ */ React.createElement("div", { className: "ai-launchpad-tailored-list__actions" }, canStart && /* @__PURE__ */ React.createElement(Button4, { variant: "solid", onClick: onGetStarted, loading: isBusy, disabled: isBusy }, getCtaLabel(task.id, task.in_progress)), !canStart && canMarkComplete && /* @__PURE__ */ React.createElement(
      Button4,
      {
        variant: "solid",
        onClick: onMarkComplete,
        loading: isBusy,
        disabled: isBusy
      },
      (0, import_i18n4.__)("Mark as complete", "jetpack-mu-wpcom")
    ), /* @__PURE__ */ React.createElement(Button4, { variant: "minimal", tone: "neutral", onClick: onSkip }, (0, import_i18n4.__)("Skip", "jetpack-mu-wpcom"))))
  );
}

// src/features/ai-launchpad/js/tailored-list/style.scss
if (typeof document !== "undefined" && true && !document.head.querySelector("style[data-wp-hash='1f0e9299c4']")) {
  const style = document.createElement("style");
  style.setAttribute("data-wp-hash", "1f0e9299c4");
  style.appendChild(document.createTextNode(".ai-launchpad-tailored-list__layout{margin:0 auto;max-width:960px;padding:clamp(24px,8vh,96px) 24px 48px}@media (max-width:782px){.ai-launchpad-tailored-list__layout{padding:24px 16px 32px}}.ai-launchpad-tailored-list__heading{margin-bottom:24px}.ai-launchpad-tailored-list__title-heading{font-size:32px;font-weight:500;line-height:1.2;margin:0}.ai-launchpad-tailored-list__progress{color:#757575;font-size:14px;margin:8px 0 0}.ai-launchpad-tailored-list__columns{align-items:start;display:grid;gap:32px;grid-template-columns:minmax(0,1fr)}.ai-launchpad-tailored-list__columns.has-preview{grid-template-columns:minmax(0,1fr) 300px}@media (max-width:782px){.ai-launchpad-tailored-list__columns.has-preview{grid-template-columns:1fr}}.ai-launchpad-tailored-list{background:#f6f7f7;border-radius:8px;display:flex;flex-direction:column;gap:8px;padding:8px}.ai-launchpad-tailored-list__card{--wp-ui-card-padding:16px;--wp-ui-card-header-content-margin:0}.ai-launchpad-tailored-list__header-inner{align-items:center;display:flex;gap:8px;min-width:0}.ai-launchpad-tailored-list__title{color:var(--wpds-color-fg-interactive-neutral,#1e1e1e);font-size:14px;font-weight:500}.ai-launchpad-tailored-list__title.is-done{color:var(--wpds-color-fg-interactive-neutral-disabled,#8d8d8d);text-decoration:line-through}.ai-launchpad-tailored-list__icon{color:var(--wpds-color-fg-interactive-neutral,#1e1e1e);display:inline-flex;flex-shrink:0}.ai-launchpad-tailored-list__icon svg{fill:currentColor}.ai-launchpad-tailored-list__icon.is-done{color:var(--wpds-color-fg-interactive-neutral-disabled,#8d8d8d)}.ai-launchpad-tailored-list__subtitle{color:#757575;margin:8px 0 16px}.ai-launchpad-tailored-list__actions{align-items:center;display:flex;gap:8px}.ai-launchpad-tailored-list__preview{display:flex;flex-direction:column}.ai-launchpad-tailored-list__preview-frame{aspect-ratio:4/3;background:#f6f7f7;border:1px solid #e0e0e0;border-radius:8px;display:block;max-width:300px;overflow:hidden;position:relative;width:100%}.ai-launchpad-tailored-list__preview-frame.is-editable:focus-within,.ai-launchpad-tailored-list__preview-frame.is-editable:hover{border-color:var(--wp-admin-theme-color,#3858e9)}.ai-launchpad-tailored-list__preview-frame.is-editable:focus-within .ai-launchpad-tailored-list__preview-edit,.ai-launchpad-tailored-list__preview-frame.is-editable:hover .ai-launchpad-tailored-list__preview-edit{opacity:1}.ai-launchpad-tailored-list__preview-edit{align-items:center;background:rgba(0,0,0,.55);display:flex;inset:0;justify-content:center;opacity:0;position:absolute;transition:opacity .12s ease}.ai-launchpad-tailored-list__preview-edit a,.ai-launchpad-tailored-list__preview-edit a:active,.ai-launchpad-tailored-list__preview-edit a:focus,.ai-launchpad-tailored-list__preview-edit a:hover{color:var(--wp-ui-button-foreground-color,#fff)}.ai-launchpad-tailored-list__preview-iframe{border:0;left:0;min-height:440%;pointer-events:none;position:absolute;top:0;transform:scale(.25);transform-origin:top left;translate:0 -8px;width:400%}.ai-launchpad-tailored-list__preview-title{font-size:15px;font-weight:600;margin:12px 0 2px}.ai-launchpad-tailored-list__preview-link{font-size:13px}@media (max-width:782px){.ai-launchpad-tailored-list__preview-frame{max-width:none}}.ai-launchpad-tailored-list__skeleton-bar{animation:ai-launchpad-shimmer 1.4s ease infinite;background:linear-gradient(90deg,#f0f0f0 25%,#e6e6e6 37%,#f0f0f0 63%);background-size:400% 100%;border-radius:4px;display:block;height:56px}@keyframes ai-launchpad-shimmer{0%{background-position:100% 0}to{background-position:0 0}}"));
  document.head.appendChild(style);
}

// src/features/ai-launchpad/js/tailored-list/tailored-list.tsx
function navigate(url) {
  window.location.href = url;
}
function TailoredList({ pendingTailor, initialData, site } = {}) {
  const [tasks, setTasks] = (0, import_element18.useState)(() => initialData?.tasks ?? null);
  const [output, setOutput] = (0, import_element18.useState)(
    () => initialData?.ai_output?.payload ?? null
  );
  const [skippedIds, setSkippedIds] = (0, import_element18.useState)(() => /* @__PURE__ */ new Set());
  const [busyId, setBusyId] = (0, import_element18.useState)(null);
  const [openId, setOpenId] = (0, import_element18.useState)(
    () => initialData?.tasks ? nextIncompleteId(initialData.tasks) : null
  );
  const didAutoOpen = (0, import_element18.useRef)(!!initialData?.tasks);
  const [siteUrl, setSiteUrl] = (0, import_element18.useState)(
    () => initialData?.site?.url ?? site?.url ?? null
  );
  const [siteTitle, setSiteTitle] = (0, import_element18.useState)(
    () => initialData?.site?.title ?? site?.title ?? null
  );
  const [siteEditUrl, setSiteEditUrl] = (0, import_element18.useState)(
    () => initialData?.site?.edit_url ?? site?.edit_url ?? null
  );
  (0, import_element18.useEffect)(() => {
    if (initialData) {
      setTasks(initialData.tasks);
      setOutput(initialData.ai_output?.payload ?? null);
      if (initialData.site) {
        setSiteUrl(initialData.site.url ?? null);
        setSiteTitle(initialData.site.title ?? null);
        setSiteEditUrl(initialData.site.edit_url ?? null);
      }
      return;
    }
    let cancelled = false;
    (async () => {
      const result = await Promise.resolve(pendingTailor).catch(() => void 0);
      let data = null;
      try {
        data = await (0, import_api_fetch3.default)({ path: "/wpcom/v2/ai-launchpad" });
      } catch {
      }
      if (cancelled) {
        return;
      }
      if (data?.site) {
        setSiteUrl(data.site.url ?? null);
        setSiteTitle(data.site.title ?? null);
        setSiteEditUrl(data.site.edit_url ?? null);
      }
      if (data && data.tasks.length > 0) {
        setTasks(data.tasks);
        setOutput(data.ai_output?.payload ?? null);
      } else if (result?.output) {
        setOutput(result.output);
        setTasks(tasksFromFixture(result.output));
      } else {
        setTasks([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [pendingTailor, initialData]);
  (0, import_element18.useEffect)(() => {
    if (!didAutoOpen.current && tasks && tasks.length > 0) {
      setOpenId(nextIncompleteId(tasks));
      didAutoOpen.current = true;
    }
  }, [tasks]);
  const visibleTasks = (0, import_element18.useMemo)(
    () => (tasks ?? []).map(
      (task) => skippedIds.has(task.id) ? { ...task, completed: true } : task
    ),
    [tasks, skippedIds]
  );
  if (!tasks) {
    return /* @__PURE__ */ React.createElement(
      Layout,
      {
        progressLabel: (0, import_i18n5.__)("Tailoring your checklist\u2026", "jetpack-mu-wpcom"),
        siteUrl,
        siteTitle,
        siteEditUrl
      },
      /* @__PURE__ */ React.createElement(TailoredListSkeleton, null)
    );
  }
  const completedCount = visibleTasks.filter((task) => task.completed).length;
  const progressLabel = (0, import_i18n5.sprintf)(
    /* translators: 1: number of completed tasks, 2: total number of tasks. */
    (0, import_i18n5.__)("%1$d of %2$d completed", "jetpack-mu-wpcom"),
    completedCount,
    visibleTasks.length
  );
  const handleGetStarted = async (task) => {
    setBusyId(task.id);
    try {
      const url = await resolveCtaUrl(
        task,
        output,
        {
          trackTaskClicked,
          createFirstPostDraft,
          createPatternPage
        },
        siteUrl
      );
      if (isCompleteOnClickTask(task.id)) {
        await (0, import_api_fetch3.default)({
          path: "/wpcom/v2/ai-launchpad/complete-task",
          method: "POST",
          data: { task_id: task.id }
        }).catch(() => {
        });
      }
      if (url) {
        navigate(url);
      }
    } catch {
    } finally {
      setBusyId(null);
    }
  };
  const handleMarkComplete = async (task) => {
    setBusyId(task.id);
    try {
      trackTaskClicked({ task_id: task.id });
      await (0, import_api_fetch3.default)({
        path: "/wpcom/v2/ai-launchpad/complete-task",
        method: "POST",
        data: { task_id: task.id }
      });
      setTasks(
        (prev) => prev ? prev.map((t) => t.id === task.id ? { ...t, completed: true } : t) : prev
      );
      const afterComplete = (tasks ?? []).map(
        (t) => t.id === task.id || skippedIds.has(t.id) ? { ...t, completed: true } : t
      );
      setOpenId(nextIncompleteId(afterComplete, task.id));
    } catch {
    } finally {
      setBusyId(null);
    }
  };
  const handleSkip = (task) => {
    const nextSkipped = new Set(skippedIds).add(task.id);
    setSkippedIds(nextSkipped);
    const afterSkip = (tasks ?? []).map(
      (t) => nextSkipped.has(t.id) ? { ...t, completed: true } : t
    );
    setOpenId(nextIncompleteId(afterSkip, task.id));
  };
  return /* @__PURE__ */ React.createElement(
    Layout,
    {
      progressLabel,
      siteUrl,
      siteTitle,
      siteEditUrl
    },
    /* @__PURE__ */ React.createElement("div", { className: "ai-launchpad-tailored-list" }, visibleTasks.map((task) => /* @__PURE__ */ React.createElement(
      TaskCard,
      {
        key: task.id,
        task,
        isBusy: busyId === task.id,
        canStart: isTaskActionable(task, output, siteUrl),
        canMarkComplete: isCompleteOnClickTask(task.id) && !isTaskActionable(task, output, siteUrl),
        isOpen: openId === task.id,
        onOpenChange: (open) => setOpenId(open ? task.id : null),
        onGetStarted: () => handleGetStarted(task),
        onMarkComplete: () => handleMarkComplete(task),
        onSkip: () => handleSkip(task)
      }
    )))
  );
}

// src/features/ai-launchpad/js/wizard/wizard.tsx
var import_api_fetch6 = __toESM(require_api_fetch());
var import_components5 = __toESM(require_components());
var import_element21 = __toESM(require_element());
var import_i18n8 = __toESM(require_i18n());

// src/features/ai-launchpad/js/lib/prewarm.ts
var import_element19 = __toESM(require_element());

// src/features/ai-launchpad/js/lib/tailor.ts
var import_api_fetch5 = __toESM(require_api_fetch());
var import_url = __toESM(require_url());

// src/features/ai-launchpad/js/lib/fallback.ts
var TASK_SUBTITLES = {
  first_post_published: "Write and publish your first post.",
  first_post_published_newsletter: "Send your first newsletter to subscribers.",
  woo_products: "Add your first product to the store.",
  woo_customize_store: "Customize how your store looks.",
  set_up_payments: "Set up a way to get paid.",
  add_10_email_subscribers: "Grow your list to your first subscribers.",
  site_theme_selected: "Pick a theme that fits your site.",
  add_about_page: "Tell visitors who you are.",
  design_edited: "Make the design your own.",
  complete_profile: "Complete your public profile.",
  verify_email: "Confirm your email address.",
  connect_social_media: "Connect your social accounts.",
  drive_traffic: "Help people find your site.",
  site_launched: "Launch your site for the world to see.",
  blog_launched: "Launch your blog for the world to see.",
  woo_launch_site: "Launch your store and start selling.",
  link_in_bio_launched: "Launch your link-in-bio page."
};
var GENERIC_SUBTITLE = "Get this set up.";
var GOAL_TASK_IDS = {
  write: [
    "first_post_published",
    "site_theme_selected",
    "add_about_page",
    "complete_profile",
    "drive_traffic",
    "site_launched"
  ],
  build: [
    "add_about_page",
    "site_theme_selected",
    "design_edited",
    "complete_profile",
    "drive_traffic",
    "site_launched"
  ],
  sell: [
    "woo_products",
    "woo_customize_store",
    "set_up_payments",
    "site_theme_selected",
    "complete_profile",
    "woo_launch_site"
  ],
  newsletter: [
    "first_post_published_newsletter",
    "add_10_email_subscribers",
    "add_about_page",
    "site_theme_selected",
    "complete_profile",
    "site_launched"
  ],
  educate: [
    "first_post_published",
    "add_about_page",
    "site_theme_selected",
    "complete_profile",
    "drive_traffic",
    "site_launched"
  ],
  portfolio: [
    "first_post_published",
    "add_about_page",
    "site_theme_selected",
    "design_edited",
    "complete_profile",
    "site_launched"
  ]
};
function buildTasks(goal) {
  return GOAL_TASK_IDS[goal].map((id) => ({
    id,
    subtitle: TASK_SUBTITLES[id] ?? GENERIC_SUBTITLE
  }));
}
function clamp(value, max) {
  return value.length > max ? value.slice(0, max) : value;
}
function selectFallback(input) {
  const siteName = input.site_name.trim() || "your new site";
  return {
    tasks: buildTasks(input.goal),
    inferred: {
      goal: input.goal,
      brand_name: clamp(input.site_name, 80)
    },
    first_post_draft: {
      title: clamp("Getting started with " + siteName, 80),
      subtitle: clamp("Introduce " + siteName + " to your readers.", 120),
      paragraphs: [
        "This is the first post on " + siteName + ". It marks the starting point of something new, and there is plenty more to come.",
        "Thanks for being here at the very beginning. Stay tuned for what comes next."
      ]
    }
  };
}

// ../../js-packages/script-data/src/utils.ts
function getScriptData() {
  return window.JetpackScriptData;
}
function isSimpleSite() {
  return getScriptData()?.site?.host === "wpcom";
}

// src/features/ai-launchpad/js/lib/jwt.ts
var import_api_fetch4 = __toESM(require_api_fetch());
var JWT_TOKEN_ID = "jetpack-ai-jwt";
var JWT_TOKEN_EXPIRATION_TIME = 2 * 60 * 1e3;
async function requestJwt() {
  const initialState = window.JP_CONNECTION_INITIAL_STATE;
  const apiNonce = initialState?.apiNonce;
  const siteId = initialState?.siteSuffix;
  const cached = localStorage.getItem(JWT_TOKEN_ID);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (parsed?.expire > Date.now()) {
        return parsed;
      }
    } catch {
    }
  }
  const isSimple = isSimpleSite();
  if (isSimple && !siteId) {
    throw new Error(
      "[AI Launchpad] cannot mint a JWT: missing site id (JP_CONNECTION_INITIAL_STATE.siteSuffix)."
    );
  }
  if (!isSimple && !apiNonce) {
    throw new Error(
      "[AI Launchpad] cannot mint a JWT: missing API nonce (JP_CONNECTION_INITIAL_STATE.apiNonce)."
    );
  }
  const data = await (0, import_api_fetch4.default)({
    path: isSimple ? "/wpcom/v2/sites/" + siteId + "/jetpack-openai-query/jwt" : "/jetpack/v4/jetpack-ai-jwt?_cacheBuster=" + Date.now(),
    method: "POST",
    credentials: "same-origin",
    headers: isSimple ? void 0 : { "X-WP-Nonce": apiNonce }
  });
  const tokenData = {
    token: data.token,
    blogId: isSimple ? String(siteId) : data.blog_id,
    expire: Date.now() + JWT_TOKEN_EXPIRATION_TIME
  };
  localStorage.setItem(JWT_TOKEN_ID, JSON.stringify(tokenData));
  return tokenData;
}

// src/features/ai-launchpad/js/lib/prompts.ts
var TASK_MENU = [
  "first_post_published",
  "first_post_published_newsletter",
  "site_theme_selected",
  "add_about_page",
  "add_new_page",
  "update_about_page",
  "edit_page",
  "design_edited",
  "design_completed",
  "design_selected",
  "domain_claim",
  "domain_upsell",
  "domain_customize",
  "verify_email",
  "complete_profile",
  "site_title",
  "setup_general",
  "site_launched",
  "blog_launched",
  "woo_launch_site",
  "link_in_bio_launched",
  "set_up_payments",
  "stripe_connected",
  "paid_offer_created",
  "woo_products",
  "woo_customize_store",
  "woo_woocommerce_payments",
  "woo_tax",
  "woo_marketing",
  "woo_add_domain",
  "add_10_email_subscribers",
  "subscribers_added",
  "import_subscribers",
  "newsletter_plan_created",
  "setup_newsletter",
  "customize_welcome_message",
  "enable_subscribers_modal",
  "manage_subscribers",
  "manage_paid_newsletter_plan",
  "add_subscribe_block",
  "earn_money",
  "connect_social_media",
  "sensei_setup",
  "install_custom_plugin",
  "setup_ssh",
  "site_monitoring_page",
  "mobile_app_installed",
  "post_sharing_enabled",
  "share_site",
  "front_page_updated",
  "drive_traffic",
  "start_building_your_audience"
];
function buildTailorPrompt(input) {
  const { goal, site_name, description } = input;
  return `You are helping a new WordPress.com user onboard. They have described their site in their own words. Your job is to make their onboarding checklist feel hand-picked for THIS site, not generic.

Produce a single JSON object with THREE parts, in this order: an inferred-context blob, a tailored task list, and a starter blog post draft.

Site name: ${site_name}
Goal: ${goal}
User description: ${description}

============ STEP 1 - inferred ============
First, read the description closely and infer the site's context. You will use this to choose and describe the tasks, so do it before anything else.
- "goal": echo the goal value above verbatim. One of: write, build, sell, newsletter, educate, portfolio. Required.
- "brand_name": the site name. Per the name-resolution rule below.
- "niche": the specific subject area in a few words (e.g. "long-distance hiking", "handmade ceramics", "indie game reviews").
- "vibe": aesthetic hint if implied (e.g. "minimal and editorial", "warm and personal"). Omit if neutral.
- "audience": who the site is for, if implied (e.g. "home cooks", "small-business owners").
- "tagline": a polished site tagline drafted from the description. Max 200 characters. Noun phrase or third person, not first-person.

============ STEP 2 - tasks ============
Now choose the 6 tasks from the menu below that are MOST RELEVANT to this site, judged against the site name, goal, description, and the niche/audience you just inferred. Rank the whole menu by how useful each task is for this specific user and keep the top 6. Do not follow a fixed template - two different sites should get noticeably different lists.

For each chosen task write a "subtitle" (max 200 characters) that is specific and engaging: reference the user's niche, audience, or what they will actually publish or sell, so the checklist reads as written for them. Avoid generic, interchangeable phrasing.

GOOD vs BAD subtitles (illustrations - adapt to the user's own niche, do not copy):
- For a handmade-ceramics studio, "add_about_page" -> GOOD: "Share the story behind your studio and what makes each handmade piece one of a kind." BAD: "Tell visitors who you are."
- For a handmade-ceramics studio, "site_theme_selected" -> GOOD: "Pick a clean, gallery-style theme that lets your ceramics photos take center stage." BAD: "Choose a theme."
- For a weekly cycling newsletter, "first_post_published_newsletter" -> GOOD: "Send your first issue with this week's route, ride notes, and gear picks." BAD: "Send your first newsletter."

HARD RULES (do not break - the server rejects output that violates these):
- Every "id" MUST come from the menu below, verbatim. Never invent IDs. Drop any task you cannot map to a menu ID.
- Return exactly 6 tasks.
- At least one task must create content (e.g. "first_post_published", "first_post_published_newsletter", "woo_products", or "add_about_page").
- The 6th and final task MUST be a launch task: one of "site_launched" (canonical), "blog_launched", "woo_launch_site", or "link_in_bio_launched".
- Only include "woo_products", "woo_customize_store", "set_up_payments", "stripe_connected", or "woo_woocommerce_payments" if the goal is sell OR the user explicitly mentions selling, products, store, shop, or commerce.
- Only include "add_10_email_subscribers", "subscribers_added", "newsletter_plan_created", or "import_subscribers" if the goal is newsletter OR the user explicitly mentions email subscribers or a newsletter.
- For the social tasks "connect_social_media", "drive_traffic", and "post_sharing_enabled", keep the subtitle general - about growing the site's audience and engaging visitors (e.g. "Build the audience of your blog and engage with your visitors."). Do NOT name specific social networks (Instagram, Pinterest, X, Facebook, TikTok, etc.); the user has not said which platforms they use.
- Subtitles must be plain text: no URLs, no HTML, and no template syntax such as {{ }} or [[ ]].

============ STEP 3 - first_post_draft ============
Write a friendly starter blog post the user can edit and publish.
- "title": clear and evocative, max 8 words.
- "subtitle": ONE line, verb-led, max 10 words, describing what publishing this post does for them. Optional.
- "paragraphs": exactly 2 short paragraphs of opening body text. First introduces the topic in a warm, personal voice grounded in the user's niche; second invites the reader in. Plain English, no jargon. Avoid "Welcome to my blog" and "Hello world" cliches.

============ name resolution ============
Treat the "Site name:" value above as THE ONLY brand/name to use anywhere - in the title, subtitle, paragraphs, and inferred.brand_name. It overrides any name mentioned inside the user description. If the description names a different brand, ignore it and use the "Site name:" value.

============ available task menu ============
${TASK_MENU.map((id) => "- " + id).join("\n")}

============ format ============
Return only a JSON object matching this schema. Do not include prose, code fences, or commentary. The first character MUST be "{".

{
  "inferred": { "goal": "...", "brand_name": "...", "niche": "...", "vibe": "...", "audience": "...", "tagline": "..." },
  "tasks": [ { "id": "...", "subtitle": "..." }, ... 6 total ],
  "first_post_draft": { "title": "...", "subtitle": "...", "paragraphs": [ "...", "..." ] }
}`;
}

// src/features/ai-launchpad/js/lib/schema-validator.ts
var AGENT_OUTPUT_SCHEMA = {
  type: "object",
  required: ["tasks", "inferred", "first_post_draft"],
  additionalProperties: false,
  properties: {
    tasks: {
      type: "array",
      minItems: 6,
      maxItems: 6,
      items: {
        type: "object",
        required: ["id", "subtitle"],
        additionalProperties: false,
        properties: {
          id: { type: "string", minLength: 1 },
          subtitle: { type: "string", minLength: 1, maxLength: 200 }
        }
      }
    },
    inferred: {
      type: "object",
      required: ["goal"],
      additionalProperties: false,
      properties: {
        goal: {
          type: "string",
          enum: ["write", "build", "sell", "newsletter", "educate", "portfolio"]
        },
        brand_name: { type: "string", maxLength: 80 },
        niche: { type: "string", maxLength: 120 },
        vibe: { type: "string", maxLength: 120 },
        audience: { type: "string", maxLength: 200 },
        tagline: { type: "string", maxLength: 200 }
      }
    },
    first_post_draft: {
      type: "object",
      required: ["title", "paragraphs"],
      additionalProperties: false,
      properties: {
        title: { type: "string", minLength: 1, maxLength: 80 },
        subtitle: { type: "string", maxLength: 120 },
        paragraphs: {
          type: "array",
          minItems: 2,
          maxItems: 2,
          items: { type: "string", minLength: 1, maxLength: 1200 }
        }
      }
    }
  }
};
function validateAgainstSchema(value, schema, path = "$") {
  const errors = [];
  if (schema.type === "object") {
    if (value === null || typeof value !== "object" || Array.isArray(value)) {
      errors.push(`${path}: expected object`);
      return errors;
    }
    const obj = value;
    const props = schema.properties ?? {};
    for (const key of schema.required ?? []) {
      if (!(key in obj)) {
        errors.push(`${path}.${key}: required, missing`);
      }
    }
    if (schema.additionalProperties === false) {
      for (const key of Object.keys(obj)) {
        if (!(key in props)) {
          errors.push(`${path}.${key}: additionalProperties:false but key present`);
        }
      }
    }
    for (const [key, subSchema] of Object.entries(props)) {
      if (key in obj) {
        errors.push(...validateAgainstSchema(obj[key], subSchema, `${path}.${key}`));
      }
    }
  } else if (schema.type === "array") {
    if (!Array.isArray(value)) {
      errors.push(`${path}: expected array`);
      return errors;
    }
    if (schema.minItems !== void 0 && value.length < schema.minItems) {
      errors.push(`${path}: length ${value.length} < minItems ${schema.minItems}`);
    }
    if (schema.maxItems !== void 0 && value.length > schema.maxItems) {
      errors.push(`${path}: length ${value.length} > maxItems ${schema.maxItems}`);
    }
    if (schema.items) {
      value.forEach(
        (item, i) => errors.push(
          ...validateAgainstSchema(item, schema.items, `${path}[${i}]`)
        )
      );
    }
  } else if (schema.type === "string") {
    if (typeof value !== "string") {
      errors.push(`${path}: expected string`);
      return errors;
    }
    if (schema.minLength !== void 0 && value.length < schema.minLength) {
      errors.push(`${path}: length ${value.length} < minLength ${schema.minLength}`);
    }
    if (schema.maxLength !== void 0 && value.length > schema.maxLength) {
      errors.push(`${path}: length ${value.length} > maxLength ${schema.maxLength}`);
    }
    if (schema.enum && !schema.enum.includes(value)) {
      errors.push(`${path}: "${value}" not in enum [${schema.enum.join(", ")}]`);
    }
  }
  return errors;
}
function parseAgentResponse(content) {
  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch {
    return null;
  }
  if (validateAgainstSchema(parsed, AGENT_OUTPUT_SCHEMA).length > 0) {
    return null;
  }
  return parsed;
}

// src/features/ai-launchpad/js/lib/tailor.ts
var AI_QUERY_ENDPOINT = "https://public-api.wordpress.com/wpcom/v2/jetpack-ai-query";
var AI_QUERY_TIMEOUT_MS = 4e4;
async function fetchAiOutput(input) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), AI_QUERY_TIMEOUT_MS);
  try {
    const { token } = await requestJwt();
    const response = await fetch(AI_QUERY_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: buildTailorPrompt(input) }],
        feature: "ai-launchpad",
        model: "gpt-4o",
        max_tokens: 1800,
        response_format: "json_object",
        stream: false
      }),
      signal: controller.signal
    });
    if (!response.ok) {
      return { ok: false, retryable: response.status === 429 || response.status >= 500 };
    }
    const body = await response.json();
    const content = body.choices?.[0]?.message?.content;
    if (!content) {
      return { ok: false, retryable: true };
    }
    const output = parseAgentResponse(content);
    if (!output) {
      return { ok: false, retryable: true };
    }
    return { ok: true, output };
  } catch {
    return { ok: false, retryable: false };
  } finally {
    clearTimeout(timeout);
  }
}
async function fetchAiOutputWithRetry(input) {
  let outcome = await fetchAiOutput(input);
  if (!outcome.ok && outcome.retryable) {
    outcome = await fetchAiOutput(input);
  }
  return outcome.ok ? outcome.output : null;
}
async function persist(output, source) {
  await (0, import_api_fetch5.default)({
    path: (0, import_url.addQueryArgs)("/wpcom/v2/ai-launchpad/tailored", { source }),
    method: "PUT",
    data: output
  });
}
async function tailor(input) {
  const start = performance.now();
  const aiOutput = await fetchAiOutputWithRetry(input);
  if (aiOutput) {
    try {
      await persist(aiOutput, "ai");
      trackAiResponseReceived({
        duration_ms: Math.round(performance.now() - start),
        source: "ai"
      });
      return { source: "ai", output: aiOutput };
    } catch {
    }
  }
  const fallbackOutput = selectFallback(input);
  try {
    await persist(fallbackOutput, "fallback");
  } catch {
  }
  trackAiResponseReceived({
    duration_ms: Math.round(performance.now() - start),
    source: "fallback"
  });
  return { source: "fallback", output: fallbackOutput };
}

// src/features/ai-launchpad/js/lib/prewarm.ts
var PREWARM_DELAY_MS = 1500;
var cache = null;
function isComplete(state) {
  return !!state.goal && typeof state.site_name === "string" && !!state.description && !!state.locale;
}
function cacheKey(input) {
  return JSON.stringify([input.goal, input.site_name, input.description, input.locale]);
}
function startPrewarm(input) {
  const key = cacheKey(input);
  if (cache && cache.key === key) {
    return;
  }
  cache = {
    key,
    // Swallow rejections so the background fire never surfaces an unhandled rejection; the Finish handler handles errors on its own await.
    promise: tailor(input).catch(() => null)
  };
}
function usePrewarm(state) {
  const timer = (0, import_element19.useRef)();
  const input = isComplete(state) ? state : null;
  const key = input ? cacheKey(input) : "";
  (0, import_element19.useEffect)(() => {
    if (!input) {
      return;
    }
    timer.current = setTimeout(() => startPrewarm(input), PREWARM_DELAY_MS);
    return () => clearTimeout(timer.current);
  }, [key]);
}
function getPrewarmedTailor(input) {
  const key = cacheKey(input);
  if (cache && cache.key === key) {
    return cache.promise.then((result) => result ?? tailor(input));
  }
  return tailor(input);
}

// src/features/ai-launchpad/js/wizard/details-step.tsx
var import_components3 = __toESM(require_components());
var import_element20 = __toESM(require_element());
var import_i18n6 = __toESM(require_i18n());

// src/features/ai-launchpad/js/wizard/lib.ts
var TOTAL_STEPS = 2;
function canContinue(step, state) {
  return step === 0 ? state.goal !== null : true;
}
function isLastStep(step) {
  return step === TOTAL_STEPS - 1;
}
function toPrewarmInput(state) {
  return {
    goal: state.goal ?? void 0,
    site_name: state.siteName,
    description: state.intent,
    locale: state.locale
  };
}
function buildWizardPayload(goal, state) {
  return {
    goal,
    site_name: state.siteName,
    description: state.intent,
    locale: state.locale
  };
}
function pickPlaceholder(variants, pick = Math.random) {
  return variants[Math.floor(pick() * variants.length)];
}

// src/features/ai-launchpad/js/wizard/details-step.tsx
function intentVariants(goal) {
  return {
    write: [
      (0, import_i18n6.__)("e.g. A blog about home cooking and weeknight recipes.", "jetpack-mu-wpcom"),
      (0, import_i18n6.__)("e.g. A travel diary of weekend trips around the Mediterranean.", "jetpack-mu-wpcom"),
      (0, import_i18n6.__)("e.g. A personal blog about parenting a toddler.", "jetpack-mu-wpcom"),
      (0, import_i18n6.__)("e.g. A blog reviewing the books I read this year.", "jetpack-mu-wpcom"),
      (0, import_i18n6.__)("e.g. A blog about training for my first marathon.", "jetpack-mu-wpcom")
    ],
    build: [
      (0, import_i18n6.__)("e.g. A site for a neighborhood yoga studio.", "jetpack-mu-wpcom"),
      (0, import_i18n6.__)("e.g. A site for my freelance design studio.", "jetpack-mu-wpcom"),
      (0, import_i18n6.__)("e.g. A site for a family-run Italian restaurant.", "jetpack-mu-wpcom"),
      (0, import_i18n6.__)("e.g. A site for a real estate agent in Brooklyn.", "jetpack-mu-wpcom"),
      (0, import_i18n6.__)("e.g. A site for a small dental practice.", "jetpack-mu-wpcom")
    ],
    sell: [
      (0, import_i18n6.__)("e.g. A shop selling handmade ceramics.", "jetpack-mu-wpcom"),
      (0, import_i18n6.__)("e.g. A shop selling vintage clothing.", "jetpack-mu-wpcom"),
      (0, import_i18n6.__)("e.g. A shop selling digital art prints.", "jetpack-mu-wpcom"),
      (0, import_i18n6.__)("e.g. A shop selling homemade candles and soap.", "jetpack-mu-wpcom"),
      (0, import_i18n6.__)("e.g. A shop selling specialty coffee beans.", "jetpack-mu-wpcom")
    ],
    newsletter: [
      (0, import_i18n6.__)("e.g. A weekly newsletter about indie games.", "jetpack-mu-wpcom"),
      (0, import_i18n6.__)("e.g. A newsletter about local food and restaurants.", "jetpack-mu-wpcom"),
      (0, import_i18n6.__)("e.g. A newsletter for parents of toddlers.", "jetpack-mu-wpcom"),
      (0, import_i18n6.__)("e.g. A newsletter about indie tech and startups.", "jetpack-mu-wpcom"),
      (0, import_i18n6.__)("e.g. A monthly newsletter on personal finance for freelancers.", "jetpack-mu-wpcom")
    ],
    educate: [
      (0, import_i18n6.__)("e.g. A small homeschool community for new families.", "jetpack-mu-wpcom"),
      (0, import_i18n6.__)("e.g. A nonprofit raising awareness for ocean cleanup.", "jetpack-mu-wpcom"),
      (0, import_i18n6.__)("e.g. An online course about modern poetry.", "jetpack-mu-wpcom"),
      (0, import_i18n6.__)("e.g. A site for our local church's bulletin and events.", "jetpack-mu-wpcom"),
      (0, import_i18n6.__)("e.g. A community of urban beekeepers in Lisbon.", "jetpack-mu-wpcom")
    ],
    portfolio: [
      (0, import_i18n6.__)("e.g. A portfolio of my illustration work.", "jetpack-mu-wpcom"),
      (0, import_i18n6.__)("e.g. A portfolio of my photography projects.", "jetpack-mu-wpcom"),
      (0, import_i18n6.__)("e.g. A portfolio of my UX design case studies.", "jetpack-mu-wpcom"),
      (0, import_i18n6.__)("e.g. A portfolio of architecture projects.", "jetpack-mu-wpcom"),
      (0, import_i18n6.__)("e.g. A portfolio of my writing samples and clips.", "jetpack-mu-wpcom")
    ]
  }[goal ?? "write"];
}
function useIntentPlaceholder(goal) {
  const variants = intentVariants(goal);
  return (0, import_element20.useMemo)(
    () => pickPlaceholder(variants),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [goal]
  );
}
function DetailsStep({
  goal,
  siteName,
  intent,
  onSiteNameChange,
  onIntentChange
}) {
  const intentPlaceholder = useIntentPlaceholder(goal);
  return /* @__PURE__ */ React.createElement("div", { className: "ai-launchpad-wizard__step" }, /* @__PURE__ */ React.createElement("h2", { className: "ai-launchpad-wizard__step-title" }, (0, import_i18n6.__)("Tell us about your site", "jetpack-mu-wpcom")), /* @__PURE__ */ React.createElement(
    import_components3.TextControl,
    {
      __nextHasNoMarginBottom: true,
      __next40pxDefaultSize: true,
      label: (0, import_i18n6.__)("Name", "jetpack-mu-wpcom"),
      value: siteName,
      onChange: onSiteNameChange
    }
  ), /* @__PURE__ */ React.createElement(
    import_components3.TextareaControl,
    {
      __nextHasNoMarginBottom: true,
      label: (0, import_i18n6.__)("Brief description", "jetpack-mu-wpcom"),
      placeholder: intentPlaceholder,
      value: intent,
      onChange: onIntentChange,
      rows: 4
    }
  ));
}

// src/features/ai-launchpad/js/wizard/goals-step.tsx
var import_components4 = __toESM(require_components());
var import_i18n7 = __toESM(require_i18n());
function goalOptions() {
  return [
    {
      key: "write",
      title: (0, import_i18n7.__)("Write", "jetpack-mu-wpcom"),
      description: (0, import_i18n7.__)("Share your ideas, stories, or expertise.", "jetpack-mu-wpcom"),
      icon: pencil_default
    },
    {
      key: "build",
      title: (0, import_i18n7.__)("Build a website", "jetpack-mu-wpcom"),
      description: (0, import_i18n7.__)(
        "Create a presence for a project, business, or yourself.",
        "jetpack-mu-wpcom"
      ),
      icon: tool_default
    },
    {
      key: "sell",
      title: (0, import_i18n7.__)("Sell online", "jetpack-mu-wpcom"),
      description: (0, import_i18n7.__)("Set up a store for digital or physical goods.", "jetpack-mu-wpcom"),
      icon: store_default
    },
    {
      key: "newsletter",
      title: (0, import_i18n7.__)("Newsletter", "jetpack-mu-wpcom"),
      description: (0, import_i18n7.__)("Reach subscribers directly in their inbox.", "jetpack-mu-wpcom"),
      icon: envelope_default
    },
    {
      key: "educate",
      title: (0, import_i18n7.__)("Educate", "jetpack-mu-wpcom"),
      description: (0, import_i18n7.__)("For schools, nonprofits, courses, or communities.", "jetpack-mu-wpcom"),
      icon: people_default
    },
    {
      key: "portfolio",
      title: (0, import_i18n7.__)("Portfolio", "jetpack-mu-wpcom"),
      description: (0, import_i18n7.__)("Showcase your work, projects, or creative side.", "jetpack-mu-wpcom"),
      icon: gallery_default
    }
  ];
}
function GoalsStep({ value, onChange }) {
  return /* @__PURE__ */ React.createElement("div", { className: "ai-launchpad-wizard__step" }, /* @__PURE__ */ React.createElement("div", { className: "ai-launchpad-wizard__step-header" }, /* @__PURE__ */ React.createElement("h2", { className: "ai-launchpad-wizard__step-title" }, (0, import_i18n7.__)("What's your main goal?", "jetpack-mu-wpcom")), /* @__PURE__ */ React.createElement("p", { className: "ai-launchpad-wizard__step-subtitle" }, (0, import_i18n7.__)("This helps us tailor your setup checklist.", "jetpack-mu-wpcom"))), /* @__PURE__ */ React.createElement("div", { className: "ai-launchpad-wizard__cards", role: "radiogroup" }, goalOptions().map((option) => {
    const selected = value === option.key;
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: option.key,
        type: "button",
        role: "radio",
        "aria-checked": selected,
        className: "ai-launchpad-wizard__card" + (selected ? " is-selected" : ""),
        onClick: () => onChange(option.key)
      },
      /* @__PURE__ */ React.createElement(import_components4.Icon, { icon: option.icon, size: 20 }),
      /* @__PURE__ */ React.createElement("span", { className: "ai-launchpad-wizard__card-text" }, /* @__PURE__ */ React.createElement("span", { className: "ai-launchpad-wizard__card-title" }, option.title), /* @__PURE__ */ React.createElement("span", { className: "ai-launchpad-wizard__card-description" }, option.description))
    );
  })));
}

// src/features/ai-launchpad/js/wizard/style.scss
if (typeof document !== "undefined" && true && !document.head.querySelector("style[data-wp-hash='fa23305878']")) {
  const style = document.createElement("style");
  style.setAttribute("data-wp-hash", "fa23305878");
  style.appendChild(document.createTextNode(".ai-launchpad-wizard.components-modal__frame{max-width:640px;width:100%}.ai-launchpad-wizard .components-modal__content{padding:32px 32px 24px}.ai-launchpad-wizard__step{display:flex;flex-direction:column;gap:16px}.ai-launchpad-wizard__step-header{display:flex;flex-direction:column;gap:4px}.ai-launchpad-wizard__step-title{font-size:20px;font-weight:500;line-height:1.3;margin:0}.ai-launchpad-wizard__step-subtitle{color:#757575;font-size:13px;margin:0}.ai-launchpad-wizard__progress{background:#f0f0f0;border-radius:2px;height:4px;margin-bottom:24px;overflow:hidden;width:80px}.ai-launchpad-wizard__progress-bar{background:var(--wp-admin-theme-color,#3858e9);height:100%;transition:width .2s ease}.ai-launchpad-wizard__cards{display:grid;gap:12px;grid-template-columns:repeat(2,minmax(0,1fr))}@media (max-width:600px){.ai-launchpad-wizard__cards{grid-template-columns:minmax(0,1fr)}}.ai-launchpad-wizard__card{align-items:flex-start;background:#fff;border:1px solid #ddd;border-radius:8px;cursor:pointer;display:flex;gap:12px;padding:16px;text-align:start;transition:border-color .12s ease,box-shadow .12s ease}.ai-launchpad-wizard__card:hover{border-color:var(--wp-admin-theme-color,#3858e9)}.ai-launchpad-wizard__card:focus-visible{outline:2px solid var(--wp-admin-theme-color,#3858e9);outline-offset:2px}.ai-launchpad-wizard__card.is-selected{border-color:var(--wp-admin-theme-color,#3858e9);box-shadow:0 0 0 1px var(--wp-admin-theme-color,#3858e9)}.ai-launchpad-wizard__card svg{fill:currentColor;flex-shrink:0;margin-top:2px}.ai-launchpad-wizard__card-text{display:flex;flex-direction:column;gap:2px;min-width:0}.ai-launchpad-wizard__card-title{font-size:14px;font-weight:500;line-height:1.3}.ai-launchpad-wizard__card-description{color:#50575e;font-size:12px;line-height:1.4;text-wrap:balance}@media (max-width:600px){.ai-launchpad-wizard__card-description{text-wrap:pretty}}.ai-launchpad-wizard__footer{align-items:center;display:flex;gap:12px;justify-content:flex-end;margin-top:24px}.ai-launchpad-wizard__footer-right{display:flex;gap:8px}"));
  document.head.appendChild(style);
}

// src/features/ai-launchpad/js/wizard/wizard.tsx
function Wizard({
  initialSiteName = "",
  initialIntent = "",
  locale = "en",
  onComplete
}) {
  const [step, setStep] = (0, import_element21.useState)(0);
  const [goal, setGoal] = (0, import_element21.useState)(null);
  const [siteName, setSiteName] = (0, import_element21.useState)(initialSiteName);
  const [intent, setIntent] = (0, import_element21.useState)(initialIntent);
  const state = { goal, siteName, intent, locale };
  (0, import_element21.useEffect)(() => {
    trackViewed();
  }, []);
  usePrewarm(step === 1 ? toPrewarmInput(state) : {});
  const handleNext = () => {
    if (!isLastStep(step)) {
      setStep(step + 1);
      return;
    }
    if (!goal) {
      return;
    }
    const payload = buildWizardPayload(goal, state);
    (0, import_api_fetch6.default)({
      path: "/wpcom/v2/ai-launchpad/wizard",
      method: "PUT",
      data: payload
    }).catch(() => {
    });
    const tailoring = getPrewarmedTailor(payload);
    trackWizardCompleted();
    onComplete?.(payload, tailoring);
  };
  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };
  return /* @__PURE__ */ React.createElement(
    import_components5.Modal,
    {
      title: "",
      onRequestClose: () => void 0,
      className: "ai-launchpad-wizard",
      shouldCloseOnClickOutside: false,
      __experimentalHideHeader: true,
      size: "medium"
    },
    /* @__PURE__ */ React.createElement("div", { className: "ai-launchpad-wizard__progress", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "ai-launchpad-wizard__progress-bar",
        style: { width: `${(step + 1) / TOTAL_STEPS * 100}%` }
      }
    )),
    step === 0 && /* @__PURE__ */ React.createElement(GoalsStep, { value: goal, onChange: setGoal }),
    step === 1 && /* @__PURE__ */ React.createElement(
      DetailsStep,
      {
        goal,
        siteName,
        intent,
        onSiteNameChange: setSiteName,
        onIntentChange: setIntent
      }
    ),
    /* @__PURE__ */ React.createElement("footer", { className: "ai-launchpad-wizard__footer" }, /* @__PURE__ */ React.createElement("div", { className: "ai-launchpad-wizard__footer-right" }, step > 0 && /* @__PURE__ */ React.createElement(import_components5.Button, { variant: "secondary", onClick: handleBack }, (0, import_i18n8.__)("Back", "jetpack-mu-wpcom")), /* @__PURE__ */ React.createElement(
      import_components5.Button,
      {
        variant: "primary",
        onClick: handleNext,
        disabled: !canContinue(step, state)
      },
      isLastStep(step) ? (0, import_i18n8.__)("Finish", "jetpack-mu-wpcom") : (0, import_i18n8.__)("Continue", "jetpack-mu-wpcom")
    )))
  );
}

// src/features/ai-launchpad/js/app.tsx
function App() {
  const [view, setView] = (0, import_element22.useState)(null);
  const [pendingTailor, setPendingTailor] = (0, import_element22.useState)();
  const [initialData, setInitialData] = (0, import_element22.useState)();
  (0, import_element22.useEffect)(() => {
    let cancelled = false;
    const allTasks = isAllTasksMode(window.location.search);
    const path = allTasks ? "/wpcom/v2/ai-launchpad?all_tasks=1" : "/wpcom/v2/ai-launchpad";
    (0, import_api_fetch7.default)({ path }).then((data) => {
      if (cancelled) {
        return;
      }
      setInitialData(data);
      setView(allTasks ? "list" : decideInitialView(data));
    });
    return () => {
      cancelled = true;
    };
  }, []);
  if (view === null) {
    return null;
  }
  if (view === "wizard") {
    return /* @__PURE__ */ React.createElement(
      Wizard,
      {
        initialSiteName: initialData?.site?.title,
        initialIntent: initialData?.site?.description,
        onComplete: (_input, tailoring) => {
          setPendingTailor(() => tailoring);
          setView("list");
        }
      }
    );
  }
  return /* @__PURE__ */ React.createElement(
    TailoredList,
    {
      pendingTailor,
      initialData: pendingTailor ? void 0 : initialData,
      site: initialData?.site
    }
  );
}

// routes/ai-launchpad/stage.tsx
var Stage = () => {
  return /* @__PURE__ */ React.createElement(App, null);
};
export {
  Stage as stage
};
