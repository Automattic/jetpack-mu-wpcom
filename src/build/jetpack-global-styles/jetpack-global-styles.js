(()=>{"use strict";var e={4426:(e,t,n)=>{n.d(t,{A:()=>s});var a=n(5573),o=n(790);const s=(0,o.jsx)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,o.jsx)(a.Path,{d:"M6.9 7L3 17.8h1.7l1-2.8h4.1l1 2.8h1.7L8.6 7H6.9zm-.7 6.6l1.5-4.3 1.5 4.3h-3zM21.6 17c-.1.1-.2.2-.3.2-.1.1-.2.1-.4.1s-.3-.1-.4-.2c-.1-.1-.1-.3-.1-.6V12c0-.5 0-1-.1-1.4-.1-.4-.3-.7-.5-1-.2-.2-.5-.4-.9-.5-.4 0-.8-.1-1.3-.1s-1 .1-1.4.2c-.4.1-.7.3-1 .4-.2.2-.4.3-.6.5-.1.2-.2.4-.2.7 0 .3.1.5.2.8.2.2.4.3.8.3.3 0 .6-.1.8-.3.2-.2.3-.4.3-.7 0-.3-.1-.5-.2-.7-.2-.2-.4-.3-.6-.4.2-.2.4-.3.7-.4.3-.1.6-.1.8-.1.3 0 .6 0 .8.1.2.1.4.3.5.5.1.2.2.5.2.9v1.1c0 .3-.1.5-.3.6-.2.2-.5.3-.9.4-.3.1-.7.3-1.1.4-.4.1-.8.3-1.1.5-.3.2-.6.4-.8.7-.2.3-.3.7-.3 1.2 0 .6.2 1.1.5 1.4.3.4.9.5 1.6.5.5 0 1-.1 1.4-.3.4-.2.8-.6 1.1-1.1 0 .4.1.7.3 1 .2.3.6.4 1.2.4.4 0 .7-.1.9-.2.2-.1.5-.3.7-.4h-.3zm-3-.9c-.2.4-.5.7-.8.8-.3.2-.6.2-.8.2-.4 0-.6-.1-.9-.3-.2-.2-.3-.6-.3-1.1 0-.5.1-.9.3-1.2s.5-.5.8-.7c.3-.2.7-.3 1-.5.3-.1.6-.3.7-.6v3.4z"})})},3981:(e,t,n)=>{n.d(t,{M0:()=>s,VK:()=>r,qE:()=>c,uI:()=>a,un:()=>o,yi:()=>l,yy:()=>i});const a="font_base",o="font_base_default",s="font_headings",l="font_headings_default",c="font_pairings",r="font_options",i="blogname"},1216:(e,t,n)=>{n.d(t,{A:()=>c});var a=n(7143),o=n(8490),s=n.n(o),l=n(8468);const c=(e,t)=>{s()((()=>{const n={};let o={};const s={};e.forEach((e=>{s[e]=`--${e.replace("_","-")}`}));let c=null;(0,a.subscribe)((()=>{const r=(0,a.select)("core/editor").__unstableIsEditorReady;if(r&&!1===r())return;if(c||(c=document.createElement("style"),document.body.appendChild(c)),e.forEach((e=>{n[e]=t(e)})),(0,l.isEmpty)(n)||(0,l.isEqual)(n,o))return;o={...n};let i="";Object.keys(n).forEach((e=>{i+=`${s[e]}:${n[e]};`})),c.textContent=`.edit-post-visual-editor .editor-styles-wrapper{${i}}`}))}))}},1666:(e,t,n)=>{n.d(t,{A:()=>r});var a=n(6427),o=n(7723),s=n(8558),l=n(3022),c=n(495);const __=o.__,r=({fontPairings:e,fontBase:t,fontHeadings:n,update:o})=>React.createElement(React.Fragment,null,React.createElement("h3",null,__("Font Pairings","jetpack-mu-wpcom")),e&&n&&t?React.createElement("div",{className:"style-preview__font-options"},React.createElement("div",{className:"style-preview__font-options-desktop"},e.map((({label:e,headings:c,base:r})=>{const i=c===n&&r===t;return React.createElement(a.Button,{className:(0,l.A)("style-preview__font-option",{"is-selected":i}),onClick:()=>o({headings:c,base:r}),onKeyDown:e=>e.keyCode===s.ENTER?o({headings:c,base:r}):null,key:e},React.createElement("span",{className:"style-preview__font-option-contents"},React.createElement("span",{style:{fontFamily:c,fontWeight:700}},c)," / ",React.createElement("span",{style:{fontFamily:r}},r)))})))):React.createElement(c.A,{unsupportedFeature:__("font pairings","jetpack-mu-wpcom")}))},1703:(e,t,n)=>{n.d(t,{A:()=>l});var a=n(6427),o=n(7723),s=n(495);const __=o.__,l=({fontBase:e,fontBaseDefault:t,fontHeadings:n,fontHeadingsDefault:o,fontBaseOptions:l,fontHeadingsOptions:c,updateBaseFont:r,updateHeadingsFont:i})=>l&&c?React.createElement(React.Fragment,null,React.createElement(a.SelectControl,{label:__("Heading Font","jetpack-mu-wpcom"),value:n,options:c,onChange:e=>i(e),style:{fontFamily:"unset"!==n?n:o}}),React.createElement(a.SelectControl,{label:__("Base Font","jetpack-mu-wpcom"),value:e,options:l,onChange:e=>r(e),style:{fontFamily:"unset"!==e?e:t}}),React.createElement("hr",null)):React.createElement(s.A,{unsupportedFeature:__("custom font selection","jetpack-mu-wpcom")})},9505:(e,t,n)=>{n.d(t,{A:()=>y});var a=n(6427),o=n(7143),s=n(4309),l=n(6087),c=n(7723),r=n(4426),i=n(3832),p=n(3981),u=n(1666),d=n(1703);const __=c.__,m="ANY_PROPERTY",f=e=>{if("object"==typeof e){const{label:t,value:n,prop:a=m}=e;return{label:t,value:n,prop:a}}return{label:e,value:e,prop:m}},g=e=>null!==e.value&&null!==e.label,h=(e,t)=>e?e.map(f).filter(g).filter((e=>t=>t.prop===m||t.prop===e)(t)):[],w=({hasLocalChanges:e,resetAction:t,publishAction:n,className:o=null})=>React.createElement("div",{className:o},React.createElement(a.Button,{disabled:!e,isDefault:!0,onClick:t},__("Reset","jetpack-mu-wpcom")),React.createElement(a.Button,{className:"global-styles-sidebar__publish-button",disabled:!e,isPrimary:!0,onClick:n},__("Publish","jetpack-mu-wpcom")));const y=({fontHeadings:e,fontHeadingsDefault:t,fontBase:n,fontBaseDefault:m,fontPairings:f,fontOptions:g,siteName:y,publishOptions:E,updateOptions:O,hasLocalChanges:_,resetLocalChanges:b})=>{(0,l.useEffect)((()=>{"global-styles"===(0,i.getQueryArg)(window.location.href,"openSidebar")&&(0,o.dispatch)("core/edit-post").openGeneralSidebar("jetpack-global-styles/global-styles")}),[]);const R=()=>E({[p.uI]:n,[p.M0]:e});return React.createElement(React.Fragment,null,React.createElement(s.PluginSidebarMoreMenuItem,{icon:r.A,target:"global-styles"},__("Global Styles","jetpack-mu-wpcom")),React.createElement(s.PluginSidebar,{icon:r.A,name:"global-styles",title:__("Global Styles","jetpack-mu-wpcom"),className:"global-styles-sidebar"},React.createElement(a.PanelBody,null,React.createElement("p",null,/* translators: %s: Name of site. */ /* translators: %s: Name of site. */
(0,c.sprintf)(__("You are customizing %s.","jetpack-mu-wpcom"),y)),React.createElement("p",null,__("Any change you make here will apply to the entire website.","jetpack-mu-wpcom")),_?React.createElement("div",null,React.createElement("p",null,React.createElement("em",null,__("You have unsaved changes.","jetpack-mu-wpcom"))),React.createElement(w,{hasLocalChanges:_,publishAction:R,resetAction:b})):null),React.createElement(a.PanelBody,{title:__("Font Selection","jetpack-mu-wpcom")},React.createElement(d.A,{fontBase:n,fontBaseDefault:m,fontHeadings:e,fontHeadingsDefault:t,fontBaseOptions:h(g,p.uI),fontHeadingsOptions:h(g,p.M0),updateBaseFont:e=>O({[p.uI]:e}),updateHeadingsFont:e=>O({[p.M0]:e})}),React.createElement(u.A,{fontHeadings:e,fontBase:n,fontPairings:f,update:({headings:e,base:t})=>O({[p.M0]:e,[p.uI]:t})})),React.createElement(a.PanelBody,null,_?React.createElement("p",null,React.createElement("em",null,__("You have unsaved changes.","jetpack-mu-wpcom"))):null,React.createElement(w,{hasLocalChanges:_,publishAction:R,resetAction:b,className:"global-styles-sidebar__panel-action-buttons"}))))}},495:(e,t,n)=>{n.d(t,{A:()=>o});var a=n(7723);const __=a.__,o=({unsupportedFeature:e})=>React.createElement("p",null,(0,a.sprintf)(/* translators: %s: feature name (i.e. font pairings, etc) */
__("Your active theme doesn't support %s.","jetpack-mu-wpcom"),e))},1873:(e,t,n)=>{n.d(t,{M:()=>u});var a=n(1455),o=n.n(a),s=n(7143);const{STORE_NAME:l,REST_PATH:c}=JETPACK_GLOBAL_STYLES_EDITOR_CONSTANTS;let r={},i=!1;const p={*publishOptions(e){return yield{type:"IO_PUBLISH_OPTIONS",options:e},{type:"PUBLISH_OPTIONS",options:e}},updateOptions:e=>({type:"UPDATE_OPTIONS",options:e}),fetchOptions:()=>({type:"IO_FETCH_OPTIONS"}),resetLocalChanges:()=>({type:"RESET_OPTIONS",options:r})},u=(0,s.createReduxStore)(l,{reducer(e,t){switch(t.type){case"UPDATE_OPTIONS":case"RESET_OPTIONS":case"PUBLISH_OPTIONS":return{...e,...t.options}}return e},actions:p,selectors:{getOption:(e,t)=>e?e[t]:void 0,hasLocalChanges:e=>!!e&&Object.keys(r).some((t=>r[t]!==e[t]))},resolvers:{*getOption(e){if(i)return;let t;try{i=!0,t=yield p.fetchOptions()}catch(e){t={}}return r=t,{type:"UPDATE_OPTIONS",options:t}}},controls:{IO_FETCH_OPTIONS:()=>o()({path:c}),IO_PUBLISH_OPTIONS:({options:e})=>(r=e,o()({path:c,method:"POST",data:{...e}}))}});(0,s.register)(u)},790:e=>{e.exports=window.ReactJSXRuntime},8468:e=>{e.exports=window.lodash},1455:e=>{e.exports=window.wp.apiFetch},6427:e=>{e.exports=window.wp.components},9491:e=>{e.exports=window.wp.compose},7143:e=>{e.exports=window.wp.data},8490:e=>{e.exports=window.wp.domReady},4309:e=>{e.exports=window.wp.editPost},6087:e=>{e.exports=window.wp.element},7723:e=>{e.exports=window.wp.i18n},8558:e=>{e.exports=window.wp.keycodes},2279:e=>{e.exports=window.wp.plugins},5573:e=>{e.exports=window.wp.primitives},3832:e=>{e.exports=window.wp.url},3022:(e,t,n)=>{function a(e){var t,n,o="";if("string"==typeof e||"number"==typeof e)o+=e;else if("object"==typeof e)if(Array.isArray(e)){var s=e.length;for(t=0;t<s;t++)e[t]&&(n=a(e[t]))&&(o&&(o+=" "),o+=n)}else for(n in e)e[n]&&(o&&(o+=" "),o+=n);return o}n.d(t,{A:()=>o});const o=function(){for(var e,t,n=0,o="",s=arguments.length;n<s;n++)(e=arguments[n])&&(t=a(e))&&(o&&(o+=" "),o+=t);return o}}},t={};function n(a){var o=t[a];if(void 0!==o)return o.exports;var s=t[a]={exports:{}};return e[a](s,s.exports,n),s.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var a=n(9491),o=n(7143),s=n(2279),l=n(3981),c=n(1216),r=n(9505),i=n(1873);const{PLUGIN_NAME:p}=JETPACK_GLOBAL_STYLES_EDITOR_CONSTANTS;(0,c.A)([l.uI,l.M0],(0,o.select)(i.M).getOption),(0,s.registerPlugin)(p,{render:(0,a.compose)((0,o.withSelect)((e=>{const{getOption:t,hasLocalChanges:n}=e(i.M);return{siteName:t(l.yy),fontHeadings:t(l.M0),fontHeadingsDefault:t(l.yi),fontBase:t(l.uI),fontBaseDefault:t(l.un),fontPairings:t(l.qE),fontOptions:t(l.VK),hasLocalChanges:n()}})),(0,o.withDispatch)((e=>({updateOptions:e(i.M).updateOptions,publishOptions:e(i.M).publishOptions,resetLocalChanges:e(i.M).resetLocalChanges}))))(r.A)})})();