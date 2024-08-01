(()=>{var e={951:(e,t,n)=>{t.formatArgs=function(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+e.exports.humanize(this.diff),!this.useColors)return;const n="color: "+this.color;t.splice(1,0,n,"color: inherit");let o=0,r=0;t[0].replace(/%[a-zA-Z%]/g,(e=>{"%%"!==e&&(o++,"%c"===e&&(r=o))})),t.splice(r,0,n)},t.save=function(e){try{e?t.storage.setItem("debug",e):t.storage.removeItem("debug")}catch(e){}},t.load=function(){let e;try{e=t.storage.getItem("debug")}catch(e){}!e&&"undefined"!=typeof process&&"env"in process&&(e=process.env.DEBUG);return e},t.useColors=function(){if("undefined"!=typeof window&&window.process&&("renderer"===window.process.type||window.process.__nwjs))return!0;if("undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;return"undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)},t.storage=function(){try{return localStorage}catch(e){}}(),t.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})(),t.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],t.log=console.debug||console.log||(()=>{}),e.exports=n(51741)(t);const{formatters:o}=e.exports;o.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}},51741:(e,t,n)=>{e.exports=function(e){function t(e){let n,r,s,a=null;function i(...e){if(!i.enabled)return;const o=i,r=Number(new Date),s=r-(n||r);o.diff=s,o.prev=n,o.curr=r,n=r,e[0]=t.coerce(e[0]),"string"!=typeof e[0]&&e.unshift("%O");let a=0;e[0]=e[0].replace(/%([a-zA-Z%])/g,((n,r)=>{if("%%"===n)return"%";a++;const s=t.formatters[r];if("function"==typeof s){const t=e[a];n=s.call(o,t),e.splice(a,1),a--}return n})),t.formatArgs.call(o,e);(o.log||t.log).apply(o,e)}return i.namespace=e,i.useColors=t.useColors(),i.color=t.selectColor(e),i.extend=o,i.destroy=t.destroy,Object.defineProperty(i,"enabled",{enumerable:!0,configurable:!1,get:()=>null!==a?a:(r!==t.namespaces&&(r=t.namespaces,s=t.enabled(e)),s),set:e=>{a=e}}),"function"==typeof t.init&&t.init(i),i}function o(e,n){const o=t(this.namespace+(void 0===n?":":n)+e);return o.log=this.log,o}function r(e){return e.toString().substring(2,e.toString().length-2).replace(/\.\*\?$/,"*")}return t.debug=t,t.default=t,t.coerce=function(e){if(e instanceof Error)return e.stack||e.message;return e},t.disable=function(){const e=[...t.names.map(r),...t.skips.map(r).map((e=>"-"+e))].join(",");return t.enable(""),e},t.enable=function(e){let n;t.save(e),t.namespaces=e,t.names=[],t.skips=[];const o=("string"==typeof e?e:"").split(/[\s,]+/),r=o.length;for(n=0;n<r;n++)o[n]&&("-"===(e=o[n].replace(/\*/g,".*?"))[0]?t.skips.push(new RegExp("^"+e.slice(1)+"$")):t.names.push(new RegExp("^"+e+"$")))},t.enabled=function(e){if("*"===e[e.length-1])return!0;let n,o;for(n=0,o=t.skips.length;n<o;n++)if(t.skips[n].test(e))return!1;for(n=0,o=t.names.length;n<o;n++)if(t.names[n].test(e))return!0;return!1},t.humanize=n(73171),t.destroy=function(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")},Object.keys(e).forEach((n=>{t[n]=e[n]})),t.names=[],t.skips=[],t.formatters={},t.selectColor=function(e){let n=0;for(let t=0;t<e.length;t++)n=(n<<5)-n+e.charCodeAt(t),n|=0;return t.colors[Math.abs(n)%t.colors.length]},t.enable(t.load()),t}},73171:e=>{var t=1e3,n=60*t,o=60*n,r=24*o,s=7*r,a=365.25*r;function i(e,t,n,o){var r=t>=1.5*n;return Math.round(e/n)+" "+o+(r?"s":"")}e.exports=function(e,c){c=c||{};var u=typeof e;if("string"===u&&e.length>0)return function(e){if((e=String(e)).length>100)return;var i=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(!i)return;var c=parseFloat(i[1]);switch((i[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return c*a;case"weeks":case"week":case"w":return c*s;case"days":case"day":case"d":return c*r;case"hours":case"hour":case"hrs":case"hr":case"h":return c*o;case"minutes":case"minute":case"mins":case"min":case"m":return c*n;case"seconds":case"second":case"secs":case"sec":case"s":return c*t;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return c;default:return}}(e);if("number"===u&&isFinite(e))return c.long?function(e){var s=Math.abs(e);if(s>=r)return i(e,s,r,"day");if(s>=o)return i(e,s,o,"hour");if(s>=n)return i(e,s,n,"minute");if(s>=t)return i(e,s,t,"second");return e+" ms"}(e):function(e){var s=Math.abs(e);if(s>=r)return Math.round(e/r)+"d";if(s>=o)return Math.round(e/o)+"h";if(s>=n)return Math.round(e/n)+"m";if(s>=t)return Math.round(e/t)+"s";return e+"ms"}(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}},6975:(e,t,n)=>{"use strict";n.d(t,{Z:()=>c});var o=n(951);const r=n.n(o)()("dops:analytics");let s,a;window._tkq=window._tkq||[],window.ga=window.ga||function(){(window.ga.q=window.ga.q||[]).push(arguments)},window.ga.l=+new Date;const i={initialize:function(e,t,n){i.setUser(e,t),i.setSuperProps(n),i.identifyUser()},setGoogleAnalyticsEnabled:function(e,t=null){this.googleAnalyticsEnabled=e,this.googleAnalyticsKey=t},setMcAnalyticsEnabled:function(e){this.mcAnalyticsEnabled=e},setUser:function(e,t){a={ID:e,username:t}},setSuperProps:function(e){s=e},assignSuperProps:function(e){s=Object.assign(s||{},e)},mc:{bumpStat:function(e,t){const n=function(e,t){let n="";if("object"==typeof e){for(const t in e)n+="&x_"+encodeURIComponent(t)+"="+encodeURIComponent(e[t]);r("Bumping stats %o",e)}else n="&x_"+encodeURIComponent(e)+"="+encodeURIComponent(t),r('Bumping stat "%s" in group "%s"',t,e);return n}(e,t);i.mcAnalyticsEnabled&&((new Image).src=document.location.protocol+"//pixel.wp.com/g.gif?v=wpcom-no-pv"+n+"&t="+Math.random())},bumpStatWithPageView:function(e,t){const n=function(e,t){let n="";if("object"==typeof e){for(const t in e)n+="&"+encodeURIComponent(t)+"="+encodeURIComponent(e[t]);r("Built stats %o",e)}else n="&"+encodeURIComponent(e)+"="+encodeURIComponent(t),r('Built stat "%s" in group "%s"',t,e);return n}(e,t);i.mcAnalyticsEnabled&&((new Image).src=document.location.protocol+"//pixel.wp.com/g.gif?v=wpcom"+n+"&t="+Math.random())}},pageView:{record:function(e,t){i.tracks.recordPageView(e),i.ga.recordPageView(e,t)}},purchase:{record:function(e,t,n,o,r,s,a){i.ga.recordPurchase(e,t,n,o,r,s,a)}},tracks:{recordEvent:function(e,t){t=t||{},0===e.indexOf("akismet_")||0===e.indexOf("jetpack_")?(s&&(r("- Super Props: %o",s),t=Object.assign(t,s)),r('Record event "%s" called with props %s',e,JSON.stringify(t)),window._tkq.push(["recordEvent",e,t])):r('- Event name must be prefixed by "akismet_" or "jetpack_"')},recordJetpackClick:function(e){const t="object"==typeof e?e:{target:e};i.tracks.recordEvent("jetpack_wpa_click",t)},recordPageView:function(e){i.tracks.recordEvent("akismet_page_view",{path:e})},setOptOut:function(e){r("Pushing setOptOut: %o",e),window._tkq.push(["setOptOut",e])}},ga:{initialized:!1,initialize:function(){let e={};i.ga.initialized||(a&&(e={userId:"u-"+a.ID}),window.ga("create",this.googleAnalyticsKey,"auto",e),i.ga.initialized=!0)},recordPageView:function(e,t){i.ga.initialize(),r("Recording Page View ~ [URL: "+e+"] [Title: "+t+"]"),this.googleAnalyticsEnabled&&(window.ga("set","page",e),window.ga("send",{hitType:"pageview",page:e,title:t}))},recordEvent:function(e,t,n,o){i.ga.initialize();let s="Recording Event ~ [Category: "+e+"] [Action: "+t+"]";void 0!==n&&(s+=" [Option Label: "+n+"]"),void 0!==o&&(s+=" [Option Value: "+o+"]"),r(s),this.googleAnalyticsEnabled&&window.ga("send","event",e,t,n,o)},recordPurchase:function(e,t,n,o,r,s,a){window.ga("require","ecommerce"),window.ga("ecommerce:addTransaction",{id:e,revenue:o,currency:a}),window.ga("ecommerce:addItem",{id:e,name:t,sku:n,price:r,quantity:s}),window.ga("ecommerce:send")}},identifyUser:function(){a&&window._tkq.push(["identifyUser",a.ID,a.username])},setProperties:function(e){window._tkq.push(["setProperties",e])},clearedIdentity:function(){window._tkq.push(["clearIdentity"])}},c=i},13419:(e,t,n)=>{"use strict";n.d(t,{lt:()=>o.l});n(76714),n(80354),n(75404),n(61053),n(11380),n(6342);var o=n(96959);n(39058)},6342:(e,t,n)=>{"use strict";n(99196)},96959:(e,t,n)=>{"use strict";n.d(t,{l:()=>a});var o=n(69307),r=n(12953);function s(e){const t={};let n="span",r=e.icon;const s=document.createElement("div");s.innerHTML=e.icon;const a=s.querySelector("svg");return a&&(n="svg",r=a.innerHTML,Array.from(a.attributes).forEach((({nodeName:e,nodeValue:n})=>t[e]=n))),(0,o.createElement)(n,{...t,dangerouslySetInnerHTML:{__html:r||""}})}function a(e){return{src:s(e),foreground:(0,r.Z)()}}},12953:(e,t,n)=>{"use strict";n.d(t,{Z:()=>s});var o=n(99505);const r="#069e08";function s(){return(0,o.Ug)()||(0,o.Wp)()?null:r}},61053:(e,t,n)=>{"use strict";var o=n(6975);n(69307);const{tracks:r}=o.Z,{recordEvent:s}=r},11380:(e,t,n)=>{"use strict";n(9818),n(69307),n(39058)},44166:(e,t,n)=>{"use strict";n.d(t,{ZP:()=>p,rW:()=>d});var o=n(9818),r=n(99505),s=n(82162),a=n(39058);const i="SET_JETPACK_MODULES",c="SET_MODULE_UPDATING";function u(e){return d({isLoading:e})}function l(e,t){return{type:c,name:e,isUpdating:t}}function d(e){return{type:i,options:e}}const p={updateJetpackModuleStatus:function*(e){try{yield l(e.name,!0),yield(0,s.zL)(e);const t=yield(0,s.Bs)();return yield d({data:t}),!0}catch(e){const t=(0,o.select)(a.p).getJetpackModules();return yield d(t),!1}finally{yield l(e.name,!1)}},setJetpackModules:d,fetchModules:function*(){if((0,r.Wp)())return!0;try{yield u(!0);const e=yield(0,s.Bs)();return yield d({data:e}),!0}catch(e){const t=(0,o.select)(a.p).getJetpackModules();return yield d(t),!1}finally{yield u(!1)}}}},82162:(e,t,n)=>{"use strict";n.d(t,{Bs:()=>i,ZP:()=>u,zL:()=>c});var o=n(86989),r=n.n(o);const s="FETCH_JETPACK_MODULES",a="UPDATE_JETPACK_MODULE_STATUS",i=()=>({type:s}),c=e=>({type:a,settings:e}),u={[s]:function(){return r()({path:"/jetpack/v4/module/all",method:"GET"})},[a]:function({settings:e}){return r()({path:`/jetpack/v4/module/${e.name}/active`,method:"POST",data:{active:e.active}})}}},39058:(e,t,n)=>{"use strict";n.d(t,{p:()=>u});var o=n(9818),r=n(44166),s=n(82162),a=n(42469),i=n(55133),c=n(43524);const u="jetpack-modules",l=(0,o.createReduxStore)(u,{reducer:a.Z,actions:r.ZP,controls:s.ZP,resolvers:i.Z,selectors:c.Z});(0,o.register)(l);const d=window?.Initial_State?.getModules||window?.Jetpack_Editor_Initial_State?.modules||null;null!==d&&(0,o.dispatch)(u).setJetpackModules({data:{...d}})},42469:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const o={isLoading:!1,isUpdating:{},data:{}},r=(e=o,t)=>{switch(t.type){case"SET_JETPACK_MODULES":return{...e,...t.options};case"SET_MODULE_UPDATING":return{...e,isUpdating:{...e.isUpdating,[t.name]:t.isUpdating}}}return e}},55133:(e,t,n)=>{"use strict";n.d(t,{Z:()=>s});var o=n(44166),r=n(82162);const s={getJetpackModules:function*(){try{const e=yield(0,r.Bs)();if(e)return(0,o.rW)({data:e})}catch(e){console.error(e)}}}},43524:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});var o=n(99505);const r={getJetpackModules:e=>e.data,isModuleActive:(e,t)=>(0,o.Wp)()||(e?.data?.[t]?.activated??!1),areModulesLoading:e=>e.isLoading??!1,isModuleUpdating:(e,t)=>e?.isUpdating?.[t]??!1}},75404:(e,t,n)=>{"use strict";var o=n(65736);n(96483),n(92819);const __=o.__;__("Upgrade your plan to use video covers","jetpack-mu-wpcom"),__("Upgrade your plan to upload audio","jetpack-mu-wpcom")},76714:(e,t,n)=>{"use strict";n(98817)},99505:(e,t,n)=>{"use strict";function o(){return"object"==typeof window&&"string"==typeof window._currentSiteType?window._currentSiteType:null}function r(){return"simple"===o()}function s(){return"atomic"===o()}n.d(t,{Ug:()=>s,Wp:()=>r})},80354:(e,t,n)=>{"use strict";n(82674),n(94333)},9641:(e,t,n)=>{"use strict";n.d(t,{Z:()=>f});var o=n(52175),r=n(55609),s=n(94333),a=n(69771),i=n(65736),c=n(3228),u=n(76292),l=n.n(u),d=n(9344),p=n(84138);const __=i.__,m="YYYY-MM-DDTHH:mm:ss";function w(e,t,n=m){return l()(e,n).utcOffset(60*t,!0)}const g=({attributes:e,setAttributes:t,isSelected:n})=>{const i=(0,o.useBlockProps)({className:"wp-block-jetpack-event-countdown"}),u=(0,s.useInstanceId)(g),f=(0,a.__experimentalGetSettings)();let v,C=__("Choose Date","jetpack-mu-wpcom");if(e.eventTimestamp)C=(0,a.dateI18n)(f.formats.datetimeAbbreviated,new Date(1e3*e.eventTimestamp)),v=l()(1e3*e.eventTimestamp).utcOffset(60*f.timezone.offset).format(m);else if(e.eventDate){const t=w(e.eventDate,Number.parseFloat(f.timezone.offset));C=(0,a.dateI18n)(f.formats.datetimeAbbreviated,t),v=e.eventDate}return React.createElement("div",i,n&&React.createElement(r.Placeholder,{label:__("Event Countdown","jetpack-mu-wpcom"),instructions:__("Count down to an event. Set a title and pick a time and date.","jetpack-mu-wpcom"),icon:React.createElement(p.p,null)},React.createElement("div",null,React.createElement("label",{htmlFor:`event-countdown-title-${u}`},React.createElement("strong",null,__("Title:","jetpack-mu-wpcom"))),React.createElement("input",{type:"text",id:`event-countdown-title-${u}`,value:e.eventTitle||"",className:(0,c.Z)("components-placeholder__input","event-countdown__event-title"),"aria-label":__("Event Title","jetpack-mu-wpcom"),placeholder:__("Event Title","jetpack-mu-wpcom"),onChange:e=>t({eventTitle:e.target.value})})),React.createElement("div",null,React.createElement("label",{htmlFor:`event-countdown-date-${u}`},React.createElement("strong",null,__("Date:","jetpack-mu-wpcom"))),React.createElement(r.Dropdown,{position:"bottom left",renderToggle:({onToggle:e,isOpen:t})=>React.createElement(r.Button,{onClick:e,"aria-expanded":t,"aria-live":"polite",isSecondary:!0,id:`event-countdown-date-${u}`},C),renderContent:()=>React.createElement(r.DateTimePicker,{key:"event-countdown-picker",onChange:e=>t({eventTimestamp:w(e,f.timezone.offset).unix()}),currentDate:v})}))),!n&&React.createElement(d.Z,{eventTitle:e.eventTitle,eventTimestamp:e.eventTimestamp,eventDate:e.eventDate,isPreviewing:!0}))},f=g},9344:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});var o=n(65736);const __=o.__,_x=o._x,r=({eventTitle:e,eventTimestamp:t,eventDate:n,isPreviewing:o})=>{let r="&nbsp;",s="&nbsp;",a="&nbsp;",i="&nbsp;";if(o){let e;r=s=a=i=0,e=t?1e3*t:new Date(n).getTime();const o=e-Date.now();if(o>0){let e=Math.round(o/1e3);r=Math.floor(e/86400),e-=24*r*60*60,s=Math.floor(e/3600),e-=60*s*60,a=Math.floor(e/60),e-=60*a,i=e}}return React.createElement("div",null,React.createElement("div",{className:"event-countdown__date"},t||n),React.createElement("div",{className:"event-countdown__counter"},React.createElement("p",null,React.createElement("strong",{className:"event-countdown__day"},r)," ",_x("days","Countdown days remaining","jetpack-mu-wpcom")),React.createElement("p",null,React.createElement("span",null,React.createElement("strong",{className:"event-countdown__hour"},s)," ",_x("hours","Countdown hours remaining","jetpack-mu-wpcom")),React.createElement("span",null,React.createElement("strong",{className:"event-countdown__minute"},a)," ",_x("minutes","Countdown minutes remaining","jetpack-mu-wpcom")),React.createElement("span",null,React.createElement("strong",{className:"event-countdown__second"},i)," ",_x("seconds","Countdown seconds remaining","jetpack-mu-wpcom"))),React.createElement("p",null,__("until","jetpack-mu-wpcom"))),React.createElement("div",{className:"event-countdown__event-title"},React.createElement("p",null,e)))}},84138:(e,t,n)=>{"use strict";n.d(t,{p:()=>r});var o=n(55609);const r=()=>React.createElement(o.SVG,{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},React.createElement(o.Path,{d:"M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"}))},33031:(e,t,n)=>{"use strict";n.d(t,{Z:()=>s});var o=n(52175),r=n(9344);const s=({attributes:e})=>{const t=o.useBlockProps.save({className:"wp-block-jetpack-event-countdown"});return React.createElement("div",t,React.createElement(r.Z,{eventTitle:e.eventTitle,eventTimestamp:e.eventTimestamp,eventDate:e.eventDate}))}},99196:e=>{"use strict";e.exports=window.React},92819:e=>{"use strict";e.exports=window.lodash},76292:e=>{"use strict";e.exports=window.moment},86989:e=>{"use strict";e.exports=window.wp.apiFetch},52175:e=>{"use strict";e.exports=window.wp.blockEditor},4981:e=>{"use strict";e.exports=window.wp.blocks},55609:e=>{"use strict";e.exports=window.wp.components},94333:e=>{"use strict";e.exports=window.wp.compose},9818:e=>{"use strict";e.exports=window.wp.data},69771:e=>{"use strict";e.exports=window.wp.date},69307:e=>{"use strict";e.exports=window.wp.element},65736:e=>{"use strict";e.exports=window.wp.i18n},98817:e=>{"use strict";e.exports=window.wp.plugins},96483:e=>{"use strict";e.exports=window.wp.url},82674:e=>{function t(){return e.exports=t=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)({}).hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},e.exports.__esModule=!0,e.exports.default=e.exports,t.apply(null,arguments)}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports},3228:(e,t,n)=>{"use strict";function o(e){var t,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e)){var s=e.length;for(t=0;t<s;t++)e[t]&&(n=o(e[t]))&&(r&&(r+=" "),r+=n)}else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}n.d(t,{Z:()=>r});const r=function(){for(var e,t,n=0,r="",s=arguments.length;n<s;n++)(e=arguments[n])&&(t=o(e))&&(r&&(r+=" "),r+=t);return r}},36812:e=>{"use strict";e.exports=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"jetpack/event-countdown","title":"Event Countdown","description":"Count down to your favorite next thing, and celebrate with fireworks when the time is right!","keywords":["events","countdown"],"textdomain":"jetpack-mu-wpcom","category":"widgets","icon":"<svg viewBox=\'0 0 24 24\'  width=\'24\' height=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z\' /></svg>","supports":{"align":["wide","full"]},"attributes":{"eventTitle":{"type":"string","source":"text","selector":".event-countdown__event-title"},"eventTimestamp":{"type":"number"}},"example":{"attributes":{"eventTitle":"Total Solar Eclipse","eventTimestamp":1318874398}}}')}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,n),s.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e=n(13419),t=n(4981),o=n(36812),r=n(9641),s=n(33031);(0,t.registerBlockType)(o.name,{...o,edit:r.Z,save:s.Z,icon:(0,e.lt)(o),attributes:o.attributes||{}})})()})();