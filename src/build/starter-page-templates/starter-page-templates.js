(()=>{var e={3377:(e,t,r)=>{"use strict";r.d(t,{A:()=>k});var s=r(790),n=r(4997),a=r(6427),o=r(9491),i=r(6087),l=r(7723),c=r(3022),p=r(8468),d=r(356),u=r(9917),m=r(4797),g=r(5897),h=r(3613),_=r(8193);const f=a.MenuItem;class w extends i.Component{constructor(e){super(e),this.state={selectedCategory:this.getDefaultSelectedCategory()}}getFormattedPatternsByPatternSlugs=(0,p.memoize)((e=>{const t=e.reduce(((e,{name:t,title:r="",description:s="",html:a,pattern_meta:o})=>{const i=o?.viewport_width?Number(o.viewport_width):1280;return e[t]={name:t,title:s||r,blocks:a?(0,n.parse)((0,g.A)(a,this.props.siteInformation)):[],viewportWidth:Math.max(i,320)},e}),{});return this.filterPatternsWithMissingBlocks(t)}));filterPatternsWithMissingBlocks(e){return Object.entries(e).reduce(((e,[t,r])=>{if(!(0,d.A)(r.blocks)||!r.blocks.length)e[t]=r;return e}),{})}getBlocksForSelection=e=>{const t=this.getBlocksByPatternSlug(e);return(0,m.A)(t,(function(e){if("core/button"===e.name&&void 0!==e.attributes.url)e.attributes.url="#";return e}))};componentDidMount(){if(this.props.isOpen)this.trackCurrentView()}componentDidUpdate(e){if(!e.isOpen&&this.props.isOpen)this.trackCurrentView();if(this.props.isWelcomeGuideActive||this.props.areTipsEnabled)this.props.hideWelcomeGuide()}trackCurrentView(){(0,h.$3)("add-page")}getDefaultSelectedCategory(){const e=this.getPatternCategories();if(!e?.length)return null;else return e[0].slug}setPattern=e=>{(0,h.m3)(e);const{selectedCategory:t}=this.state;if(this.props.savePatternChoice(e,t),"blank"===e)return this.props.insertPattern("",[]),void this.props.onClose();const r=this.props.patterns.find((t=>t.name===e)),s=(r?.categories||{}).hasOwnProperty("home"),n=this.getBlocksForSelection(e),a=s?null:r?.title||"";if(n&&n.length)this.props.insertPattern(a,n),this.props.onClose();else this.props.onClose()};handleCategorySelection=e=>{this.setState({selectedCategory:e})};closeModal=e=>{if("blur"!==e?.type)(0,h.mk)(),this.props.onClose();else e.stopPropagation()};getBlocksByPatternSlug(e){return this.getFormattedPatternsByPatternSlugs(this.props.patterns)?.[e]?.blocks??[]}getPatternGroups=()=>{if(!this.props.patterns.length)return null;const e={};for(const t of this.props.patterns)for(const r in t.categories)if(!(r in e))e[r]=t.categories[r];return(0,u.W)(["featured","about","blog","home","gallery","services","contact"],e)};getPatternsForGroup=e=>{if(!this.props.patterns.length)return null;if("blank"===e)return[{name:"blank",title:"Blank",html:"",ID:null}];const t=[];for(const r of this.props.patterns)for(const s in r.categories)if(s===e)t.push(r);return t};getPatternCategories=()=>{const e=this.getPatternGroups();if(!e)return null;const t=[];for(const r in e)t.push({slug:r,name:e[r].title});return t};renderPatternGroup=()=>{const{selectedCategory:e}=this.state;if(!e)return null;const t=this.getPatternsForGroup(e);if(!t?.length)return null;else return this.renderPatternsList(t)};renderPatternsList=e=>{if(!e.length)return null;const t=this.getFormattedPatternsByPatternSlugs(this.props.patterns),r=Object.keys(t),n=(a=r,e.filter((e=>a.includes(e.name))));var a;if(!n.length)return null;else return(0,s.jsx)(_.A,{label:(0,l.__)("Layout","jetpack-mu-wpcom"),patterns:n.map((e=>t[e.name])),onPatternSelect:this.setPattern})};render(){const{selectedCategory:e}=this.state,{isOpen:t,instanceId:r}=this.props;if(!t)return null;else return(0,s.jsx)(a.Modal,{title:"",className:"page-pattern-modal",onRequestClose:this.closeModal,aria:{labelledby:`page-pattern-modal__heading-${r}`,describedby:`page-pattern-modal__description-${r}`},children:(0,s.jsxs)("div",{className:"page-pattern-modal__inner",children:[(0,s.jsxs)("div",{className:"page-pattern-modal__sidebar",children:[(0,s.jsx)("h1",{id:`page-pattern-modal__heading-${r}`,className:(0,c.A)("page-pattern-modal__heading",{"page-pattern-modal__heading--default":!this.props.title}),children:this.props.title||(0,l.__)("Add a page","jetpack-mu-wpcom")}),(0,s.jsx)("p",{id:`page-pattern-modal__description-${r}`,className:"page-pattern-modal__description",children:this.props.description||(0,l.__)("Pick a pre-defined layout or start with a blank page.","jetpack-mu-wpcom")}),(0,s.jsxs)("div",{className:"page-pattern-modal__button-container",children:[(0,s.jsx)(a.Button,{variant:"secondary",onClick:()=>this.setPattern("blank"),className:"page-pattern-modal__blank-button",children:(0,l.__)("Blank page","jetpack-mu-wpcom")}),(0,s.jsx)("select",{className:"page-pattern-modal__mobile-category-dropdown",value:e??void 0,onChange:e=>this.handleCategorySelection(e.currentTarget.value),children:this.getPatternCategories()?.map((({slug:e,name:t})=>(0,s.jsx)("option",{value:e,children:t},e)))})]}),(0,s.jsx)(a.VisuallyHidden,{as:"h2",id:`page-pattern-modal__list-heading-${r}`,children:(0,l.__)("Page categories","jetpack-mu-wpcom")}),(0,s.jsx)(a.NavigableMenu,{className:"page-pattern-modal__category-list",orientation:"vertical","aria-labelledby":`page-pattern-modal__list-heading-${r}`,onNavigate:(e,t)=>this.handleCategorySelection(t.dataset.slug??null),children:this.getPatternCategories()?.map((({slug:t,name:r})=>(0,s.jsx)(f,{variant:"tertiary","aria-selected":t===e,"data-slug":t,onClick:()=>this.handleCategorySelection(t),className:"page-pattern-modal__category-button",tabIndex:t===e?void 0:-1,children:(0,s.jsx)("span",{className:"page-pattern-modal__category-item-selection-wrapper",children:r})},t)))})]}),(0,s.jsx)("div",{className:"page-pattern-modal__pattern-list-container",children:this.renderPatternGroup()})]})})}}const k=(0,o.withInstanceId)(w)},8193:(e,t,r)=>{"use strict";r.d(t,{A:()=>c});var s=r(790),n=r(4715),a=r(6427),o=r(9491),i=r(6087);const l=()=>{},c=(0,i.memo)((0,o.withInstanceId)((({instanceId:e,label:t,patterns:r=[],onPatternSelect:i=l})=>{const c=(0,o.useAsyncList)(r);if(!Array.isArray(r)||!r.length)return null;else return(0,s.jsx)(a.BaseControl,{id:`pattern-selector-control__${e}`,label:t,className:"pattern-selector-control",children:(0,s.jsx)(n.__experimentalBlockPatternsList,{blockPatterns:r,shownPatterns:c,onClickPattern:e=>i(e.name)})})})))},356:(e,t,r)=>{"use strict";r.d(t,{A:()=>s});const s=function e(t){return!!t.find((t=>{if("core/missing"===t.name)return!0;if(t.innerBlocks&&t.innerBlocks.length)return e(t.innerBlocks);else return!1}))}},9917:(e,t,r)=>{"use strict";function s(e,t){const r=Object.keys(t),s=e.filter((e=>r.includes(e))),n=r.filter((t=>!e.includes(t)));return s.concat(n.sort()).reduce(((e,r)=>(e[r]=t[r],e)),{})}r.d(t,{W:()=>s})},4797:(e,t,r)=>{"use strict";r.d(t,{A:()=>n});var s=r(4997);const n=function e(t,r){return t.map((t=>{if((t=r((0,s.cloneBlock)(t))).innerBlocks&&t.innerBlocks.length)t.innerBlocks=e(t.innerBlocks,r);return t}))}},5897:(e,t,r)=>{"use strict";r.d(t,{A:()=>i});var s=r(7723);const n={Address:(0,s._x)("123 Main St","default address","jetpack-mu-wpcom"),Phone:(0,s._x)("555-555-5555","default phone number","jetpack-mu-wpcom"),CompanyName:(0,s._x)("Your Company Name","default company name","jetpack-mu-wpcom"),Vertical:(0,s._x)("Business","default vertical name","jetpack-mu-wpcom")},a={CompanyName:"title",Address:"address",Phone:"phone",Vertical:"vertical"};function o(e,t){return e in t}const i=(e,t={})=>{if(!e)return"";else return e.replace(/{{(\w+)}}/g,((e,r)=>{const s=o(r,n)?n[r]:"",i=o(r,a)?a[r]:"";return t[i]||s||r}))}},3613:(e,t,r)=>{"use strict";r.d(t,{$3:()=>a,br:()=>n,m3:()=>i,mk:()=>o}),window._tkq=window._tkq||[];let s=null;const n=e=>{s=e,window._tkq.push(["identifyUser",e.userid,e.username])},a=e=>{if(s)window._tkq.push(["recordEvent","a8c_full_site_editing_template_selector_view",{blog_id:s.blogid,source:e}])},o=()=>{if(s)window._tkq.push(["recordEvent","a8c_full_site_editing_template_selector_dismiss",{blog_id:s.blogid}])},i=e=>{if(s)window._tkq.push(["recordEvent","a8c_full_site_editing_template_selector_template_selected",{blog_id:s.blogid,pattern:e}])}},5048:(e,t,r)=>{"use strict";r.d(t,{i:()=>m});var s=r(6072),n=r.n(s),a=r(3377),o=r(7143),i=r(6087),l=r(2619),c=r(7723),p=r(7514);r(5518);const __=c.__,d="isInsertingPagePattern",u="automattic/full-site-editing/inserting-pattern";function m(e){const{setOpenState:t}=(0,o.useDispatch)(p.L),{setUsedPageOrPatternsModal:r}=(0,o.useDispatch)("automattic/wpcom-welcome-guide"),{replaceInnerBlocks:s}=(0,o.useDispatch)("core/block-editor"),{editPost:c}=(0,o.useDispatch)("core/editor"),{toggleFeature:m}=(0,o.useDispatch)("core/edit-post"),{disableTips:g}=(0,o.useDispatch)("core/nux"),h=(0,o.useSelect)((e=>{const{isOpen:t,isPatternPicker:r}=e(p.L);return{isOpen:t(),isWelcomeGuideActive:e("core/edit-post").isFeatureActive("welcomeGuide"),areTipsEnabled:e("core/nux")?e("core/nux").areTipsEnabled():!1,...r()&&{title:__("Choose a Pattern","jetpack-mu-wpcom"),description:__("Pick a pre-defined layout or continue with a blank page","jetpack-mu-wpcom")}}}),[]),{getMeta:_,postContentBlock:f}=(0,o.useSelect)((e=>({getMeta:()=>e("core/editor").getEditedPostAttribute("meta"),postContentBlock:e("core/editor").getBlocks().find((e=>"a8c/post-content"===e.name))})),[]),w=(0,i.useCallback)(((e,t)=>{const r=_(),s=Array.isArray(r._wpcom_template_layout_category)&&r._wpcom_template_layout_category||[];c({meta:{...r,_starter_page_template:e,_wpcom_template_layout_category:[...s,t]}})}),[c,_]),k=(0,i.useCallback)(((e,t)=>{if((0,l.addFilter)(d,u,(()=>!0)),e)c({title:e});s(f?f.clientId:"",t,!1),(0,l.removeFilter)(d,u)}),[c,f,s]),{isWelcomeGuideActive:b,areTipsEnabled:P}=h,y=(0,i.useCallback)((()=>{if(b)m("welcomeGuide");else if(P)g()}),[P,g,b,m]),v=(0,i.useCallback)((()=>{t("CLOSED"),r?.()}),[t,r]);return React.createElement(a.A,n()({},h,{onClose:v,savePatternChoice:w,insertPattern:k,hideWelcomeGuide:y},e))}},7514:(e,t,r)=>{"use strict";r.d(t,{L:()=>n});var s=r(7143);const n=(0,s.createReduxStore)("automattic/starter-page-layouts",{reducer:(e="CLOSED",{type:t,...r})=>"SET_IS_OPEN"===t?r.openState:e,actions:{setOpenState:e=>({type:"SET_IS_OPEN",openState:e||"CLOSED"})},selectors:{isOpen:e=>"CLOSED"!==e,isPatternPicker:e=>"OPEN_FOR_BLANK_CANVAS"===e}});(0,s.register)(n)},790:e=>{"use strict";e.exports=window.ReactJSXRuntime},8468:e=>{"use strict";e.exports=window.lodash},4715:e=>{"use strict";e.exports=window.wp.blockEditor},4997:e=>{"use strict";e.exports=window.wp.blocks},6427:e=>{"use strict";e.exports=window.wp.components},9491:e=>{"use strict";e.exports=window.wp.compose},7143:e=>{"use strict";e.exports=window.wp.data},6087:e=>{"use strict";e.exports=window.wp.element},2619:e=>{"use strict";e.exports=window.wp.hooks},7723:e=>{"use strict";e.exports=window.wp.i18n},5518:e=>{"use strict";e.exports=window.wp.nux},2279:e=>{"use strict";e.exports=window.wp.plugins},6072:e=>{function t(){return e.exports=t=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var s in r)({}).hasOwnProperty.call(r,s)&&(e[s]=r[s])}return e},e.exports.__esModule=!0,e.exports.default=e.exports,t.apply(null,arguments)}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports},3022:(e,t,r)=>{"use strict";function s(e){var t,r,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var a=e.length;for(t=0;t<a;t++)e[t]&&(r=s(e[t]))&&(n&&(n+=" "),n+=r)}else for(r in e)e[r]&&(n&&(n+=" "),n+=r);return n}r.d(t,{A:()=>n});const n=function(){for(var e,t,r=0,n="",a=arguments.length;r<a;r++)(e=arguments[r])&&(t=s(e))&&(n&&(n+=" "),n+=t);return n}}},t={};function r(s){var n=t[s];if(void 0!==n)return n.exports;var a=t[s]={exports:{}};return e[s](a,a.exports,r),a.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var s in t)if(r.o(t,s)&&!r.o(e,s))Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e=r(3613),t=r(7143),s=r(2279),n=r(5048),a=r(7514);const{templates:o=[],tracksUserData:i,screenAction:l}=window.starterPageTemplatesConfig??{};if(i)(0,e.br)(i);if("add"===l)(0,t.dispatch)(a.L).setOpenState("OPEN_FROM_ADD_PAGE");(0,s.registerPlugin)("page-patterns",{render:()=>React.createElement(n.i,{patterns:o}),icon:void 0})})()})();