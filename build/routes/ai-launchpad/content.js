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

// package-external:@wordpress/components
var require_components = __commonJS({
  "package-external:@wordpress/components"(exports, module) {
    module.exports = window.wp.components;
  }
});

// package-external:@wordpress/i18n
var require_i18n = __commonJS({
  "package-external:@wordpress/i18n"(exports, module) {
    module.exports = window.wp.i18n;
  }
});

// package-external:@wordpress/primitives
var require_primitives = __commonJS({
  "package-external:@wordpress/primitives"(exports, module) {
    module.exports = window.wp.primitives;
  }
});

// vendor-external:react/jsx-runtime
var require_jsx_runtime = __commonJS({
  "vendor-external:react/jsx-runtime"(exports, module) {
    module.exports = window.ReactJSXRuntime;
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
var import_element5 = __toESM(require_element());

// src/features/ai-launchpad/js/lib/orchestration.ts
function decideInitialView(data) {
  return data.ai_output ? "list" : "wizard";
}

// src/features/ai-launchpad/js/tailored-list/tailored-list.tsx
var import_api_fetch3 = __toESM(require_api_fetch());
var import_element = __toESM(require_element());

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
      status: "draft"
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
      status: "draft"
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

// src/features/ai-launchpad/js/tailored-list/model.ts
var FIRST_POST_TASK_IDS = ["first_post_published", "first_post_published_newsletter"];
var PATTERN_PAGE_TASK_IDS = ["add_about_page"];
function ctaKind(taskId) {
  if (FIRST_POST_TASK_IDS.includes(taskId)) {
    return "first_post";
  }
  if (PATTERN_PAGE_TASK_IDS.includes(taskId)) {
    return "pattern_page";
  }
  return "deeplink";
}
async function resolveCtaUrl(task, output, handlers) {
  handlers.trackTaskClicked({ task_id: task.id });
  const kind = ctaKind(task.id);
  if (kind === "first_post" && output) {
    const { edit_url } = await handlers.createFirstPostDraft(output.first_post_draft);
    return edit_url;
  }
  if (kind === "pattern_page" && output) {
    const { edit_url } = await handlers.createPatternPage(output.inferred);
    return edit_url;
  }
  return task.calypso_path;
}
function isTaskActionable(task, output) {
  const kind = ctaKind(task.id);
  if ((kind === "first_post" || kind === "pattern_page") && output) {
    return true;
  }
  return task.calypso_path !== null;
}
function firstIncompleteIndex(tasks) {
  return tasks.findIndex((task) => !task.completed);
}
function tasksFromFixture(output) {
  return output.tasks.map((task) => ({
    id: task.id,
    subtitle: task.subtitle,
    title: humanizeTaskId(task.id),
    completed: false,
    calypso_path: null
  }));
}
function humanizeTaskId(id) {
  return id.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

// src/features/ai-launchpad/js/tailored-list/skeleton.tsx
var import_components = __toESM(require_components());
var PLACEHOLDER_COUNT = 6;
function TailoredListSkeleton() {
  return /* @__PURE__ */ React.createElement("div", { className: "ai-launchpad-tailored-list" }, Array.from({ length: PLACEHOLDER_COUNT }).map((_, index) => /* @__PURE__ */ React.createElement(import_components.Card, { key: index, className: "ai-launchpad-tailored-list__card is-skeleton" }, /* @__PURE__ */ React.createElement(import_components.CardBody, null, /* @__PURE__ */ React.createElement("span", { className: "ai-launchpad-tailored-list__skeleton-line is-title" })))));
}

// src/features/ai-launchpad/js/tailored-list/task-card.tsx
var import_components2 = __toESM(require_components());
var import_i18n = __toESM(require_i18n());

// ../../../node_modules/.pnpm/@wordpress+icons@13.1.0_react@18.3.1/node_modules/@wordpress/icons/build-module/library/check.mjs
var import_primitives = __toESM(require_primitives(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var check_default = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_primitives.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_primitives.Path, { d: "M16.5 7.5 10 13.9l-2.5-2.4-1 1 3.5 3.6 7.5-7.6z" }) });

// ../../../node_modules/.pnpm/@wordpress+icons@13.1.0_react@18.3.1/node_modules/@wordpress/icons/build-module/library/chevron-down.mjs
var import_primitives2 = __toESM(require_primitives(), 1);
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var chevron_down_default = /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_primitives2.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_primitives2.Path, { d: "M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z" }) });

// ../../../node_modules/.pnpm/@wordpress+icons@13.1.0_react@18.3.1/node_modules/@wordpress/icons/build-module/library/chevron-up.mjs
var import_primitives3 = __toESM(require_primitives(), 1);
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
var chevron_up_default = /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_primitives3.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_primitives3.Path, { d: "M6.5 12.4L12 8l5.5 4.4-.9 1.2L12 10l-4.5 3.6-1-1.2z" }) });

// ../../../node_modules/.pnpm/@wordpress+icons@13.1.0_react@18.3.1/node_modules/@wordpress/icons/build-module/library/envelope.mjs
var import_primitives4 = __toESM(require_primitives(), 1);
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
var envelope_default = /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_primitives4.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_primitives4.Path, { fillRule: "evenodd", clipRule: "evenodd", d: "M3 7c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm2-.5h14c.3 0 .5.2.5.5v1L12 13.5 4.5 7.9V7c0-.3.2-.5.5-.5Zm-.5 3.3V17c0 .3.2.5.5.5h14c.3 0 .5-.2.5-.5V9.8L12 15.4 4.5 9.8Z" }) });

// ../../../node_modules/.pnpm/@wordpress+icons@13.1.0_react@18.3.1/node_modules/@wordpress/icons/build-module/library/gallery.mjs
var import_primitives5 = __toESM(require_primitives(), 1);
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
var gallery_default = /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_primitives5.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_primitives5.Path, { fillRule: "evenodd", clipRule: "evenodd", d: "M16.375 4.5H4.625a.125.125 0 0 0-.125.125v8.254l2.859-1.54a.75.75 0 0 1 .68-.016l2.384 1.142 2.89-2.074a.75.75 0 0 1 .874 0l2.313 1.66V4.625a.125.125 0 0 0-.125-.125Zm.125 9.398-2.75-1.975-2.813 2.02a.75.75 0 0 1-.76.067l-2.444-1.17L4.5 14.583v1.792c0 .069.056.125.125.125h11.75a.125.125 0 0 0 .125-.125v-2.477ZM4.625 3C3.728 3 3 3.728 3 4.625v11.75C3 17.273 3.728 18 4.625 18h11.75c.898 0 1.625-.727 1.625-1.625V4.625C18 3.728 17.273 3 16.375 3H4.625ZM20 8v11c0 .69-.31 1-.999 1H6v1.5h13.001c1.52 0 2.499-.982 2.499-2.5V8H20Z" }) });

// ../../../node_modules/.pnpm/@wordpress+icons@13.1.0_react@18.3.1/node_modules/@wordpress/icons/build-module/library/pencil.mjs
var import_primitives6 = __toESM(require_primitives(), 1);
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
var pencil_default = /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_primitives6.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_primitives6.Path, { d: "m19 7-3-3-8.5 8.5-1 4 4-1L19 7Zm-7 11.5H5V20h7v-1.5Z" }) });

// ../../../node_modules/.pnpm/@wordpress+icons@13.1.0_react@18.3.1/node_modules/@wordpress/icons/build-module/library/people.mjs
var import_primitives7 = __toESM(require_primitives(), 1);
var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
var people_default = /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_primitives7.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_primitives7.Path, { fillRule: "evenodd", d: "M15.5 9.5a1 1 0 100-2 1 1 0 000 2zm0 1.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm-2.25 6v-2a2.75 2.75 0 00-2.75-2.75h-4A2.75 2.75 0 003.75 15v2h1.5v-2c0-.69.56-1.25 1.25-1.25h4c.69 0 1.25.56 1.25 1.25v2h1.5zm7-2v2h-1.5v-2c0-.69-.56-1.25-1.25-1.25H15v-1.5h2.5A2.75 2.75 0 0120.25 15zM9.5 8.5a1 1 0 11-2 0 1 1 0 012 0zm1.5 0a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" }) });

// ../../../node_modules/.pnpm/@wordpress+icons@13.1.0_react@18.3.1/node_modules/@wordpress/icons/build-module/library/store.mjs
var import_primitives8 = __toESM(require_primitives(), 1);
var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
var store_default = /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_primitives8.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_primitives8.Path, { fillRule: "evenodd", clipRule: "evenodd", d: "M19.75 11H21V8.667L19.875 4H4.125L3 8.667V11h1.25v8.75h15.5V11zm-1.5 0H5.75v7.25H10V13h4v5.25h4.25V11zm-5.5-5.5h2.067l.486 3.24.028.76H12.75v-4zm-3.567 0h2.067v4H8.669l.028-.76.486-3.24zm7.615 3.1l-.464-3.1h2.36l.806 3.345V9.5h-2.668l-.034-.9zM7.666 5.5h-2.36L4.5 8.845V9.5h2.668l.034-.9.464-3.1z" }) });

// ../../../node_modules/.pnpm/@wordpress+icons@13.1.0_react@18.3.1/node_modules/@wordpress/icons/build-module/library/tool.mjs
var import_primitives9 = __toESM(require_primitives(), 1);
var import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);
var tool_default = /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_primitives9.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_primitives9.Path, { d: "M14.103 7.128l2.26-2.26a4 4 0 00-5.207 4.804L5.828 15a2 2 0 102.828 2.828l5.329-5.328a4 4 0 004.804-5.208l-2.261 2.26-1.912-.512-.513-1.912zm-7.214 9.64a.5.5 0 11.707-.707.5.5 0 01-.707.707z" }) });

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

// src/features/ai-launchpad/js/tailored-list/task-card.tsx
function TaskCard({
  task,
  isExpanded,
  isBusy,
  canStart,
  onToggle,
  onGetStarted,
  onSkip
}) {
  if (task.completed) {
    return /* @__PURE__ */ React.createElement(import_components2.Card, { className: "ai-launchpad-tailored-list__card is-completed" }, /* @__PURE__ */ React.createElement(import_components2.CardBody, null, /* @__PURE__ */ React.createElement("div", { className: "ai-launchpad-tailored-list__header" }, /* @__PURE__ */ React.createElement(import_components2.Icon, { icon: check_default, className: "ai-launchpad-tailored-list__icon is-done" }), /* @__PURE__ */ React.createElement("span", { className: "ai-launchpad-tailored-list__title is-done" }, task.title))));
  }
  return /* @__PURE__ */ React.createElement(import_components2.Card, { className: clsx_default("ai-launchpad-tailored-list__card", { "is-expanded": isExpanded }) }, /* @__PURE__ */ React.createElement(import_components2.CardBody, null, /* @__PURE__ */ React.createElement(
    import_components2.Button,
    {
      className: "ai-launchpad-tailored-list__header",
      onClick: onToggle,
      "aria-expanded": isExpanded
    },
    /* @__PURE__ */ React.createElement("span", { className: "ai-launchpad-tailored-list__title" }, task.title),
    /* @__PURE__ */ React.createElement(import_components2.Icon, { icon: isExpanded ? chevron_up_default : chevron_down_default })
  ), isExpanded && /* @__PURE__ */ React.createElement("div", { className: "ai-launchpad-tailored-list__body" }, /* @__PURE__ */ React.createElement("p", { className: "ai-launchpad-tailored-list__subtitle" }, task.subtitle), /* @__PURE__ */ React.createElement("div", { className: "ai-launchpad-tailored-list__actions" }, canStart && /* @__PURE__ */ React.createElement(
    import_components2.Button,
    {
      variant: "primary",
      onClick: onGetStarted,
      isBusy,
      disabled: isBusy
    },
    (0, import_i18n.__)("Get started", "jetpack-mu-wpcom")
  ), /* @__PURE__ */ React.createElement(import_components2.Button, { variant: "tertiary", onClick: onSkip }, (0, import_i18n.__)("Skip", "jetpack-mu-wpcom"))))));
}

// src/features/ai-launchpad/js/tailored-list/style.scss
if (typeof document !== "undefined" && true && !document.head.querySelector("style[data-wp-hash='35b57976c5']")) {
  const style = document.createElement("style");
  style.setAttribute("data-wp-hash", "35b57976c5");
  style.appendChild(document.createTextNode(".ai-launchpad-tailored-list{display:flex;flex-direction:column;gap:8px}.ai-launchpad-tailored-list__card .components-card__body{padding:16px 20px}.ai-launchpad-tailored-list__card.is-expanded .components-card__body{padding-bottom:20px}.ai-launchpad-tailored-list__header{align-items:center;display:flex;gap:8px;height:auto;justify-content:space-between;text-align:start;width:100%}.ai-launchpad-tailored-list__header.components-button{color:inherit;padding:0}.ai-launchpad-tailored-list__header.components-button:hover:not(:disabled){color:inherit}.ai-launchpad-tailored-list__title{font-size:14px;font-weight:500}.ai-launchpad-tailored-list__title.is-done{color:#757575;text-decoration:line-through}.ai-launchpad-tailored-list__icon{flex-shrink:0;margin-inline-end:8px}.ai-launchpad-tailored-list__icon.is-done{fill:#757575}.ai-launchpad-tailored-list__body{display:flex;flex-direction:column;gap:16px;margin-top:12px}.ai-launchpad-tailored-list__subtitle{color:#757575;margin:0}.ai-launchpad-tailored-list__actions{align-items:center;display:flex;gap:8px}.ai-launchpad-tailored-list__skeleton-line{animation:ai-launchpad-shimmer 1.4s ease infinite;background:linear-gradient(90deg,#f0f0f0 25%,#e6e6e6 37%,#f0f0f0 63%);background-size:400% 100%;border-radius:2px;display:block;height:16px;width:60%}@keyframes ai-launchpad-shimmer{0%{background-position:100% 0}to{background-position:0 0}}"));
  document.head.appendChild(style);
}

// src/features/ai-launchpad/js/tailored-list/tailored-list.tsx
function navigate(url) {
  window.location.href = url;
}
function TailoredList({ pendingTailor, initialData } = {}) {
  const [tasks, setTasks] = (0, import_element.useState)(null);
  const [output, setOutput] = (0, import_element.useState)(null);
  const [expandedId, setExpandedId] = (0, import_element.useState)(null);
  const [skippedIds, setSkippedIds] = (0, import_element.useState)(() => /* @__PURE__ */ new Set());
  const [busyId, setBusyId] = (0, import_element.useState)(null);
  (0, import_element.useEffect)(() => {
    if (initialData) {
      setTasks(initialData.tasks);
      setOutput(initialData.ai_output?.payload ?? null);
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
  const visibleTasks = (0, import_element.useMemo)(
    () => (tasks ?? []).map(
      (task) => skippedIds.has(task.id) ? { ...task, completed: true } : task
    ),
    [tasks, skippedIds]
  );
  (0, import_element.useEffect)(() => {
    if (!tasks || expandedId !== null) {
      return;
    }
    const index = firstIncompleteIndex(visibleTasks);
    const first = index === -1 ? void 0 : visibleTasks[index];
    if (first) {
      setExpandedId(first.id);
    }
  }, [tasks, visibleTasks, expandedId]);
  if (!tasks) {
    return /* @__PURE__ */ React.createElement(TailoredListSkeleton, null);
  }
  const handleGetStarted = async (task) => {
    setBusyId(task.id);
    try {
      const url = await resolveCtaUrl(task, output, {
        trackTaskClicked,
        createFirstPostDraft,
        createPatternPage
      });
      if (url) {
        navigate(url);
      }
    } catch {
    } finally {
      setBusyId(null);
    }
  };
  const handleSkip = (task) => {
    setSkippedIds((prev) => new Set(prev).add(task.id));
    if (expandedId === task.id) {
      const next = visibleTasks.find(
        (candidate) => candidate.id !== task.id && !candidate.completed
      );
      setExpandedId(next ? next.id : null);
    }
  };
  return /* @__PURE__ */ React.createElement("div", { className: "ai-launchpad-tailored-list" }, visibleTasks.map((task) => /* @__PURE__ */ React.createElement(
    TaskCard,
    {
      key: task.id,
      task,
      isExpanded: expandedId === task.id,
      isBusy: busyId === task.id,
      canStart: isTaskActionable(task, output),
      onToggle: () => setExpandedId(expandedId === task.id ? null : task.id),
      onGetStarted: () => handleGetStarted(task),
      onSkip: () => handleSkip(task)
    }
  )));
}

// src/features/ai-launchpad/js/wizard/wizard.tsx
var import_api_fetch6 = __toESM(require_api_fetch());
var import_components5 = __toESM(require_components());
var import_element4 = __toESM(require_element());
var import_i18n4 = __toESM(require_i18n());

// src/features/ai-launchpad/js/lib/prewarm.ts
var import_element2 = __toESM(require_element());

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
  "write_3_posts",
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
  return `You are helping a new WordPress.com user onboard. They have described their site in their own words. Produce THREE things in a single JSON response: a tailored task list, an inferred-context blob, and a starter blog post draft.

Site name: ${site_name}
Goal: ${goal}
User description: ${description}

============ tasks ============
- Pick exactly 6 tasks from the menu below. The "id" of every task MUST come from the menu verbatim (never invent IDs). Write a short English "subtitle" (max 200 characters) for each task explaining what it does for this specific site.
- Build the list in this order:
  STEP 1 - Pick exactly ONE first-creation task that matches the goal:
    - write / blog / articles -> "first_post_published"
    - newsletter / email digest -> "first_post_published_newsletter" or "first_post_published"
    - sell / store / products -> "woo_products"
    - build / portfolio / showcase -> "first_post_published" or "add_about_page"
  STEP 2 - Pick 2-3 niche-specific tasks that match the user's description and goal (e.g. "add_about_page", "woo_customize_store", "set_up_payments", "add_10_email_subscribers", "connect_social_media", "site_theme_selected").
  STEP 3 - Fill the remaining slots with foundation tasks: "site_theme_selected", "complete_profile", "verify_email", "design_edited", "drive_traffic".
  STEP 4 - The 6th and final task MUST be a launch task. Use "site_launched" (canonical) unless a flow-specific launch task fits better: "blog_launched", "woo_launch_site", or "link_in_bio_launched".

  HARD RULES (do not break):
    - Never include "woo_products", "set_up_payments", "stripe_connected", or "woo_woocommerce_payments" UNLESS the goal is sell or the user explicitly mentions selling, products, store, shop, or commerce.
    - Never include "add_10_email_subscribers", "subscribers_added", or "newsletter_plan_created" UNLESS the goal is newsletter or the user explicitly mentions email subscribers or a newsletter.
    - Every "id" must appear in the menu. Drop any task you cannot map to a menu ID.

============ inferred ============
Extract these fields from the user's description. Reused downstream by the theme picker and post draft.
- "goal": echo the goal value above verbatim. One of: write, build, sell, newsletter, educate, portfolio. Required.
- "brand_name": the site name. Per the name-resolution rule below.
- "niche": subject area in a few words (e.g. "long-distance hiking", "handmade ceramics").
- "vibe": aesthetic hint if implied (e.g. "minimal and editorial", "warm and personal"). Omit if neutral.
- "audience": who the site is for, if implied.
- "tagline": a polished site tagline drafted from the description. Max 200 characters. Noun phrase or third person, not first-person.

============ first_post_draft ============
Write a friendly starter blog post the user can edit and publish.
- "title": clear and evocative, max 8 words.
- "subtitle": ONE line, verb-led, max 10 words, describing what publishing this post does for them. Optional.
- "paragraphs": exactly 2 short paragraphs of opening body text. First introduces the topic in a warm, personal voice; second invites the reader in. Plain English, no jargon. Avoid "Welcome to my blog" and "Hello world" cliches.

============ name resolution ============
Treat the "Site name:" value above as THE ONLY brand/name to use anywhere - in the title, subtitle, paragraphs, and inferred.brand_name. It overrides any name mentioned inside the user description. If the description names a different brand, ignore it and use the "Site name:" value.

============ available task menu ============
${TASK_MENU.map((id) => "- " + id).join("\n")}

============ format ============
Return only a JSON object matching this schema. Do not include prose, code fences, or commentary. The first character MUST be "{".

{
  "tasks": [ { "id": "...", "subtitle": "..." }, ... 6 total ],
  "inferred": { "goal": "...", "brand_name": "...", "niche": "...", "vibe": "...", "audience": "...", "tagline": "..." },
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
        max_tokens: 1500,
        response_format: "json_object",
        stream: false
      }),
      signal: controller.signal
    });
    if (!response.ok) {
      return null;
    }
    const body = await response.json();
    const content = body.choices?.[0]?.message?.content;
    if (!content) {
      return null;
    }
    return parseAgentResponse(content);
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
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
  const aiOutput = await fetchAiOutput(input);
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
    // The prewarmed call persists on its own; a settled-but-unread promise
    // is harmless. Swallow rejections here so the background fire never
    // surfaces an unhandled rejection; the Finish handler awaits its own
    // result and handles errors there.
    promise: tailor(input).catch(() => null)
  };
}
function usePrewarm(state) {
  const timer = (0, import_element2.useRef)();
  const input = isComplete(state) ? state : null;
  const key = input ? cacheKey(input) : "";
  (0, import_element2.useEffect)(() => {
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
var import_element3 = __toESM(require_element());
var import_i18n2 = __toESM(require_i18n());

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
      (0, import_i18n2.__)("e.g. A blog about home cooking and weeknight recipes.", "jetpack-mu-wpcom"),
      (0, import_i18n2.__)("e.g. A travel diary of weekend trips around the Mediterranean.", "jetpack-mu-wpcom"),
      (0, import_i18n2.__)("e.g. A personal blog about parenting a toddler.", "jetpack-mu-wpcom"),
      (0, import_i18n2.__)("e.g. A blog reviewing the books I read this year.", "jetpack-mu-wpcom"),
      (0, import_i18n2.__)("e.g. A blog about training for my first marathon.", "jetpack-mu-wpcom")
    ],
    build: [
      (0, import_i18n2.__)("e.g. A site for a neighborhood yoga studio.", "jetpack-mu-wpcom"),
      (0, import_i18n2.__)("e.g. A site for my freelance design studio.", "jetpack-mu-wpcom"),
      (0, import_i18n2.__)("e.g. A site for a family-run Italian restaurant.", "jetpack-mu-wpcom"),
      (0, import_i18n2.__)("e.g. A site for a real estate agent in Brooklyn.", "jetpack-mu-wpcom"),
      (0, import_i18n2.__)("e.g. A site for a small dental practice.", "jetpack-mu-wpcom")
    ],
    sell: [
      (0, import_i18n2.__)("e.g. A shop selling handmade ceramics.", "jetpack-mu-wpcom"),
      (0, import_i18n2.__)("e.g. A shop selling vintage clothing.", "jetpack-mu-wpcom"),
      (0, import_i18n2.__)("e.g. A shop selling digital art prints.", "jetpack-mu-wpcom"),
      (0, import_i18n2.__)("e.g. A shop selling homemade candles and soap.", "jetpack-mu-wpcom"),
      (0, import_i18n2.__)("e.g. A shop selling specialty coffee beans.", "jetpack-mu-wpcom")
    ],
    newsletter: [
      (0, import_i18n2.__)("e.g. A weekly newsletter about indie games.", "jetpack-mu-wpcom"),
      (0, import_i18n2.__)("e.g. A newsletter about local food and restaurants.", "jetpack-mu-wpcom"),
      (0, import_i18n2.__)("e.g. A newsletter for parents of toddlers.", "jetpack-mu-wpcom"),
      (0, import_i18n2.__)("e.g. A newsletter about indie tech and startups.", "jetpack-mu-wpcom"),
      (0, import_i18n2.__)("e.g. A monthly newsletter on personal finance for freelancers.", "jetpack-mu-wpcom")
    ],
    educate: [
      (0, import_i18n2.__)("e.g. A small homeschool community for new families.", "jetpack-mu-wpcom"),
      (0, import_i18n2.__)("e.g. A nonprofit raising awareness for ocean cleanup.", "jetpack-mu-wpcom"),
      (0, import_i18n2.__)("e.g. An online course about modern poetry.", "jetpack-mu-wpcom"),
      (0, import_i18n2.__)("e.g. A site for our local church's bulletin and events.", "jetpack-mu-wpcom"),
      (0, import_i18n2.__)("e.g. A community of urban beekeepers in Lisbon.", "jetpack-mu-wpcom")
    ],
    portfolio: [
      (0, import_i18n2.__)("e.g. A portfolio of my illustration work.", "jetpack-mu-wpcom"),
      (0, import_i18n2.__)("e.g. A portfolio of my photography projects.", "jetpack-mu-wpcom"),
      (0, import_i18n2.__)("e.g. A portfolio of my UX design case studies.", "jetpack-mu-wpcom"),
      (0, import_i18n2.__)("e.g. A portfolio of architecture projects.", "jetpack-mu-wpcom"),
      (0, import_i18n2.__)("e.g. A portfolio of my writing samples and clips.", "jetpack-mu-wpcom")
    ]
  }[goal ?? "write"];
}
function useIntentPlaceholder(goal) {
  const variants = intentVariants(goal);
  return (0, import_element3.useMemo)(
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
  return /* @__PURE__ */ React.createElement("div", { className: "ai-launchpad-wizard__step" }, /* @__PURE__ */ React.createElement("h2", { className: "ai-launchpad-wizard__step-title" }, (0, import_i18n2.__)("Tell us about your site", "jetpack-mu-wpcom")), /* @__PURE__ */ React.createElement(
    import_components3.TextControl,
    {
      __nextHasNoMarginBottom: true,
      __next40pxDefaultSize: true,
      label: (0, import_i18n2.__)("Name", "jetpack-mu-wpcom"),
      value: siteName,
      onChange: onSiteNameChange
    }
  ), /* @__PURE__ */ React.createElement(
    import_components3.TextareaControl,
    {
      __nextHasNoMarginBottom: true,
      label: (0, import_i18n2.__)("Brief description", "jetpack-mu-wpcom"),
      placeholder: intentPlaceholder,
      value: intent,
      onChange: onIntentChange,
      rows: 4
    }
  ));
}

// src/features/ai-launchpad/js/wizard/goals-step.tsx
var import_components4 = __toESM(require_components());
var import_i18n3 = __toESM(require_i18n());
function goalOptions() {
  return [
    {
      key: "write",
      title: (0, import_i18n3.__)("Write", "jetpack-mu-wpcom"),
      description: (0, import_i18n3.__)("Share your ideas, stories, or expertise.", "jetpack-mu-wpcom"),
      icon: pencil_default
    },
    {
      key: "build",
      title: (0, import_i18n3.__)("Build a website", "jetpack-mu-wpcom"),
      description: (0, import_i18n3.__)(
        "Create a presence for a project, business, or yourself.",
        "jetpack-mu-wpcom"
      ),
      icon: tool_default
    },
    {
      key: "sell",
      title: (0, import_i18n3.__)("Sell online", "jetpack-mu-wpcom"),
      description: (0, import_i18n3.__)("Set up a store for digital or physical goods.", "jetpack-mu-wpcom"),
      icon: store_default
    },
    {
      key: "newsletter",
      title: (0, import_i18n3.__)("Newsletter", "jetpack-mu-wpcom"),
      description: (0, import_i18n3.__)("Reach subscribers directly in their inbox.", "jetpack-mu-wpcom"),
      icon: envelope_default
    },
    {
      key: "educate",
      title: (0, import_i18n3.__)("Educate", "jetpack-mu-wpcom"),
      description: (0, import_i18n3.__)("For schools, nonprofits, courses, or communities.", "jetpack-mu-wpcom"),
      icon: people_default
    },
    {
      key: "portfolio",
      title: (0, import_i18n3.__)("Portfolio", "jetpack-mu-wpcom"),
      description: (0, import_i18n3.__)("Showcase your work, projects, or creative side.", "jetpack-mu-wpcom"),
      icon: gallery_default
    }
  ];
}
function GoalsStep({ value, onChange }) {
  return /* @__PURE__ */ React.createElement("div", { className: "ai-launchpad-wizard__step" }, /* @__PURE__ */ React.createElement("div", { className: "ai-launchpad-wizard__step-header" }, /* @__PURE__ */ React.createElement("h2", { className: "ai-launchpad-wizard__step-title" }, (0, import_i18n3.__)("What's your main goal?", "jetpack-mu-wpcom")), /* @__PURE__ */ React.createElement("p", { className: "ai-launchpad-wizard__step-subtitle" }, (0, import_i18n3.__)("This helps us tailor your setup checklist.", "jetpack-mu-wpcom"))), /* @__PURE__ */ React.createElement("div", { className: "ai-launchpad-wizard__cards", role: "radiogroup" }, goalOptions().map((option) => {
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
if (typeof document !== "undefined" && true && !document.head.querySelector("style[data-wp-hash='f052383144']")) {
  const style = document.createElement("style");
  style.setAttribute("data-wp-hash", "f052383144");
  style.appendChild(document.createTextNode(".ai-launchpad-wizard.components-modal__frame{max-width:640px;width:100%}.ai-launchpad-wizard .components-modal__content{padding:32px 32px 24px}.ai-launchpad-wizard__step{display:flex;flex-direction:column;gap:16px}.ai-launchpad-wizard__step-header{display:flex;flex-direction:column;gap:4px}.ai-launchpad-wizard__step-title{font-size:20px;font-weight:500;line-height:1.3;margin:0}.ai-launchpad-wizard__step-subtitle{color:#757575;font-size:13px;margin:0}.ai-launchpad-wizard__progress{background:#f0f0f0;border-radius:2px;height:4px;margin-bottom:24px;overflow:hidden;width:80px}.ai-launchpad-wizard__progress-bar{background:var(--wp-admin-theme-color,#3858e9);height:100%;transition:width .2s ease}.ai-launchpad-wizard__cards{display:grid;gap:12px;grid-template-columns:repeat(2,minmax(0,1fr))}@media (max-width:600px){.ai-launchpad-wizard__cards{grid-template-columns:minmax(0,1fr)}}.ai-launchpad-wizard__card{align-items:flex-start;background:#fff;border:1px solid #ddd;border-radius:8px;cursor:pointer;display:flex;gap:12px;padding:16px;text-align:start;transition:border-color .12s ease,box-shadow .12s ease}.ai-launchpad-wizard__card:hover{border-color:var(--wp-admin-theme-color,#3858e9)}.ai-launchpad-wizard__card:focus-visible{outline:2px solid var(--wp-admin-theme-color,#3858e9);outline-offset:2px}.ai-launchpad-wizard__card.is-selected{border-color:var(--wp-admin-theme-color,#3858e9);box-shadow:0 0 0 1px var(--wp-admin-theme-color,#3858e9)}.ai-launchpad-wizard__card svg{fill:currentColor;flex-shrink:0;margin-top:2px}.ai-launchpad-wizard__card-text{display:flex;flex-direction:column;gap:2px;min-width:0}.ai-launchpad-wizard__card-title{font-size:14px;font-weight:500;line-height:1.3}.ai-launchpad-wizard__card-description{color:#50575e;font-size:12px;line-height:1.4;text-wrap:balance}.ai-launchpad-wizard__footer{align-items:center;display:flex;gap:12px;justify-content:flex-end;margin-top:24px}.ai-launchpad-wizard__footer-right{display:flex;gap:8px}"));
  document.head.appendChild(style);
}

// src/features/ai-launchpad/js/wizard/wizard.tsx
function Wizard({ initialSiteName = "", locale = "en", onComplete }) {
  const [step, setStep] = (0, import_element4.useState)(0);
  const [goal, setGoal] = (0, import_element4.useState)(null);
  const [siteName, setSiteName] = (0, import_element4.useState)(initialSiteName);
  const [intent, setIntent] = (0, import_element4.useState)("");
  const state = { goal, siteName, intent, locale };
  (0, import_element4.useEffect)(() => {
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
    /* @__PURE__ */ React.createElement("footer", { className: "ai-launchpad-wizard__footer" }, /* @__PURE__ */ React.createElement("div", { className: "ai-launchpad-wizard__footer-right" }, step > 0 && /* @__PURE__ */ React.createElement(import_components5.Button, { variant: "secondary", onClick: handleBack }, (0, import_i18n4.__)("Back", "jetpack-mu-wpcom")), /* @__PURE__ */ React.createElement(
      import_components5.Button,
      {
        variant: "primary",
        onClick: handleNext,
        disabled: !canContinue(step, state)
      },
      isLastStep(step) ? (0, import_i18n4.__)("Finish", "jetpack-mu-wpcom") : (0, import_i18n4.__)("Continue", "jetpack-mu-wpcom")
    )))
  );
}

// src/features/ai-launchpad/js/app.tsx
function App() {
  const [view, setView] = (0, import_element5.useState)(null);
  const [pendingTailor, setPendingTailor] = (0, import_element5.useState)();
  const [initialData, setInitialData] = (0, import_element5.useState)();
  (0, import_element5.useEffect)(() => {
    let cancelled = false;
    (0, import_api_fetch7.default)({ path: "/wpcom/v2/ai-launchpad" }).then((data) => {
      if (cancelled) {
        return;
      }
      setInitialData(data);
      setView(decideInitialView(data));
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
      initialData: pendingTailor ? void 0 : initialData
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
