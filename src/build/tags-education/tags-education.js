(()=>{var e={78254:(e,t,n)=>{"use strict";n.d(t,{Ym:()=>u,t:()=>c});var r=n(10790),o=n(29491),s=n(27723),a=n(51609);const i=(0,a.createContext)(null);function c(){return function(e=""){if(!e)return"";const t=e.toLowerCase();return(["pt_br","pt-br","zh_tw","zh-tw","zh_cn","zh-cn","zh_sg","zh-sg"].includes(t)?t.replace("_","-"):t.replace(/([-_].*)$/i,""))||"en"}(function(){const e=s.getLocaleData()||{};return e[""]?.lang||e[""]?.language||""}())}function u(){const e=(0,a.useContext)(i),t=!!e,[n,r]=(0,a.useState)(c());return(0,a.useEffect)((()=>{if(!t)return r(c()),s.subscribe((()=>{r(c())}))}),[t]),e||n||"undefined"!=typeof window&&window._currentUserLocale||"en"}(0,o.createHigherOrderComponent)((e=>t=>{const n={...t,locale:u()};return(0,r.jsx)(e,{...n})}),"withLocale")},57711:(e,t,n)=>{"use strict";n.d(t,{BS:()=>p,Cx:()=>o,K8:()=>a,S9:()=>s,Sc:()=>r,Sj:()=>u,Ws:()=>c,_J:()=>d,lW:()=>l,mt:()=>i,rh:()=>m});const r=["en","ja","es","pt","fr","pt-br"],o=["en","pt-br","de","es","fr","it"],s=["en","fr","de","es"],a=["en","fr","de","es"],i=["en","es"],c=["ar","de","el","es","fr","he","id","it","ja","ko","nl","pt-br","ro","ru","sv","tr","zh-cn","zh-tw"],u={"pt-br":"br",br:"bre",zh:"zh-cn","zh-hk":"zh-tw","zh-sg":"zh-cn",kr:"ko"},d=["ar","de","en","es","fr","he","id","it","ja","ko","nl","pt-br","ru","sv","tr","zh-cn","zh-tw"],p=["ar","de","el","en","es","fa","fi","fr","id","it","ja","nl","pt","pt-br","ru","sv","th","tl","tr"],l=["es","pt-br","de","fr","he","ja","it","nl","ru","tr","id","zh-cn","zh-tw","ko","ar","sv"],m=["en","ar","de","es","fr","he","id","it","ja","ko","nl","pt-br","ro","ru","sv","tr","zh-cn","zh-tw"]},14437:(e,t,n)=>{"use strict";n.d(t,{rm:()=>g});var r=n(10790),o=n(29491),s=n(51609),a=n(78254),i=n(57711);const c="http://__domain__.invalid";const u=(e,t=[])=>(n,r)=>(t.includes(r)&&"en"!==r&&n.pathname.substr(0,r.length+2)!=="/"+r+"/"&&(n.host=`${i.Sj[r]||r}.${e}`),n),d=(e,t=[],n=null)=>(r,o)=>(r.host="wordpress.com","object"==typeof n&&n instanceof RegExp&&!n.test(r.pathname)&&(t=[]),r.pathname=e+r.pathname,t.includes(o)&&"en"!==o&&(r.pathname=o+r.pathname),r),p=(e=[],t=null,n)=>(r,o)=>"object"==typeof t&&t instanceof RegExp&&!t.test(r.pathname)?r:e.includes(o)&&"en"!==o?("prefix"===n?r.pathname=o+r.pathname:"suffix"===n&&(r.pathname.endsWith("/")?r.pathname+=o+"/":r.pathname+="/"+o),r):r,l=(e=[],t=null)=>(n,r)=>p(e,t,"prefix")(n,r),m=(e=[],t=null)=>(n,r)=>p(e,t,"suffix")(n,r),w={"wordpress.com/support/":l(i._J),"wordpress.com/forums/":l(i.BS),"wordpress.com/blog/":l(i.Sc,/^\/blog\/?$/),"wordpress.com/go/":(e,t)=>["/go/","/go"].includes(e.pathname)||"es"===t?l(i.Cx)(e,t):e,"wordpress.com/pricing/":l(i.Ws),"wordpress.com/tos/":l(i.lW),"wordpress.com/wp-admin/":u("wordpress.com",i.lW),"wordpress.com/wp-login.php":u("wordpress.com",i.lW),"jetpack.com":l(i.rh),"cloud.jetpack.com":l(i.rh),"en.support.wordpress.com":d("/support",i._J),"en.blog.wordpress.com":d("/blog",i.Sc,/^\/$/),"apps.wordpress.com":l(i.lW),"en.forums.wordpress.com":d("/forums",i.BS),"automattic.com/privacy/":l(i.S9),"automattic.com/cookies/":l(i.K8),"wordpress.com/help/contact/":(e,t,n)=>n?e:(e.pathname=e.pathname.replace(/\/help\//,"/support/"),l(i._J)(e,t)),"wordpress.com":(e,t)=>/^\/(checkout|me)(\/|$)/.test(e.pathname)||/\/([a-z0-9-]+\.)+[a-z]{2,}\/?$/.test(e.pathname)?e:l(i.lW)(e,t),"wordpress.com/theme/":(e,t,n)=>n?e:l(i.lW)(e,t),"wordpress.com/themes/":(e,t,n)=>n?e:l(i.lW)(e,t),"wordpress.com/plugins/":(e,t,n)=>n?e:l(i.lW)(e,t),"wordpress.com/log-in/":(e,t,n)=>n?e:m(i.lW)(e,t),"wordpress.com/start/":(e,t,n)=>n?e:m(i.lW)(e,t),"wordpress.com/learn/":(e,t)=>e.pathname.includes("/learn/webinars/")&&"es"===t?(e.pathname=e.pathname.replace("/learn/webinars/","/learn/es/webinars/"),e):m(i.mt)(e,t),"wordpress.com/plans/":(e,t,n)=>n||"/plans/"!==e.pathname?e:l(i.Ws)(e,t),"wordpress.com/setup/":(e,t,n)=>n?e:m(i.lW)(e,t)};function f(e){try{return new URL(String(e),c).pathname.endsWith("/")}catch(e){return!1}}function g(e,t=function(){return(0,a.t)()??"en"}(),n=!0,r=!1){let o;try{o=new URL(String(e),c)}catch(t){return e}if(o.origin===c)return e;o.protocol="https:",o.pathname.endsWith(".php")||(o.pathname=(o.pathname+"/").replace(/\/+$/,"/"));const s=o.pathname.substr(0,1+o.pathname.indexOf("/",1));if("en.wordpress.com"===o.host&&(o.host="wordpress.com"),"/"+t+"/"===s)return e;const i=[o.host,o.host+s,o.host+o.pathname];for(let s=i.length-1;s>=0;s--)if(i[s]in w){const a=w[i[s]](o,t,n).href;if(!r)return a;try{const t=new URL(a);return f(e)||(t.pathname=t.pathname.replace(/\/+$/,"")),t.href}catch{return a}}return e}function h(){const e=(0,a.Ym)();return(0,s.useCallback)(((t,n,r,o)=>g(t,n||e,r,o)),[e])}(0,o.createHigherOrderComponent)((e=>t=>{const n={...t,localizeUrl:h()};return(0,r.jsx)(e,{...n})}),"withLocalizeUrl")},46941:(e,t,n)=>{t.formatArgs=function(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+e.exports.humanize(this.diff),!this.useColors)return;const n="color: "+this.color;t.splice(1,0,n,"color: inherit");let r=0,o=0;t[0].replace(/%[a-zA-Z%]/g,(e=>{"%%"!==e&&(r++,"%c"===e&&(o=r))})),t.splice(o,0,n)},t.save=function(e){try{e?t.storage.setItem("debug",e):t.storage.removeItem("debug")}catch(e){}},t.load=function(){let e;try{e=t.storage.getItem("debug")}catch(e){}!e&&"undefined"!=typeof process&&"env"in process&&(e=process.env.DEBUG);return e},t.useColors=function(){if("undefined"!=typeof window&&window.process&&("renderer"===window.process.type||window.process.__nwjs))return!0;if("undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;return"undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)},t.storage=function(){try{return localStorage}catch(e){}}(),t.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})(),t.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],t.log=console.debug||console.log||(()=>{}),e.exports=n(53212)(t);const{formatters:r}=e.exports;r.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}},53212:(e,t,n)=>{e.exports=function(e){function t(e){let n,o,s,a=null;function i(...e){if(!i.enabled)return;const r=i,o=Number(new Date),s=o-(n||o);r.diff=s,r.prev=n,r.curr=o,n=o,e[0]=t.coerce(e[0]),"string"!=typeof e[0]&&e.unshift("%O");let a=0;e[0]=e[0].replace(/%([a-zA-Z%])/g,((n,o)=>{if("%%"===n)return"%";a++;const s=t.formatters[o];if("function"==typeof s){const t=e[a];n=s.call(r,t),e.splice(a,1),a--}return n})),t.formatArgs.call(r,e);(r.log||t.log).apply(r,e)}return i.namespace=e,i.useColors=t.useColors(),i.color=t.selectColor(e),i.extend=r,i.destroy=t.destroy,Object.defineProperty(i,"enabled",{enumerable:!0,configurable:!1,get:()=>null!==a?a:(o!==t.namespaces&&(o=t.namespaces,s=t.enabled(e)),s),set:e=>{a=e}}),"function"==typeof t.init&&t.init(i),i}function r(e,n){const r=t(this.namespace+(void 0===n?":":n)+e);return r.log=this.log,r}function o(e){return e.toString().substring(2,e.toString().length-2).replace(/\.\*\?$/,"*")}return t.debug=t,t.default=t,t.coerce=function(e){if(e instanceof Error)return e.stack||e.message;return e},t.disable=function(){const e=[...t.names.map(o),...t.skips.map(o).map((e=>"-"+e))].join(",");return t.enable(""),e},t.enable=function(e){let n;t.save(e),t.namespaces=e,t.names=[],t.skips=[];const r=("string"==typeof e?e:"").split(/[\s,]+/),o=r.length;for(n=0;n<o;n++)r[n]&&("-"===(e=r[n].replace(/\*/g,".*?"))[0]?t.skips.push(new RegExp("^"+e.slice(1)+"$")):t.names.push(new RegExp("^"+e+"$")))},t.enabled=function(e){if("*"===e[e.length-1])return!0;let n,r;for(n=0,r=t.skips.length;n<r;n++)if(t.skips[n].test(e))return!1;for(n=0,r=t.names.length;n<r;n++)if(t.names[n].test(e))return!0;return!1},t.humanize=n(44997),t.destroy=function(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")},Object.keys(e).forEach((n=>{t[n]=e[n]})),t.names=[],t.skips=[],t.formatters={},t.selectColor=function(e){let n=0;for(let t=0;t<e.length;t++)n=(n<<5)-n+e.charCodeAt(t),n|=0;return t.colors[Math.abs(n)%t.colors.length]},t.enable(t.load()),t}},44997:e=>{var t=1e3,n=60*t,r=60*n,o=24*r,s=7*o,a=365.25*o;function i(e,t,n,r){var o=t>=1.5*n;return Math.round(e/n)+" "+r+(o?"s":"")}e.exports=function(e,c){c=c||{};var u=typeof e;if("string"===u&&e.length>0)return function(e){if((e=String(e)).length>100)return;var i=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(!i)return;var c=parseFloat(i[1]);switch((i[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return c*a;case"weeks":case"week":case"w":return c*s;case"days":case"day":case"d":return c*o;case"hours":case"hour":case"hrs":case"hr":case"h":return c*r;case"minutes":case"minute":case"mins":case"min":case"m":return c*n;case"seconds":case"second":case"secs":case"sec":case"s":return c*t;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return c;default:return}}(e);if("number"===u&&isFinite(e))return c.long?function(e){var s=Math.abs(e);if(s>=o)return i(e,s,o,"day");if(s>=r)return i(e,s,r,"hour");if(s>=n)return i(e,s,n,"minute");if(s>=t)return i(e,s,t,"second");return e+" ms"}(e):function(e){var s=Math.abs(e);if(s>=o)return Math.round(e/o)+"d";if(s>=r)return Math.round(e/r)+"h";if(s>=n)return Math.round(e/n)+"m";if(s>=t)return Math.round(e/t)+"s";return e+"ms"}(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}},90372:(e,t,n)=>{"use strict";n.d(t,{A:()=>c});var r=n(46941);const o=n.n(r)()("dops:analytics");let s,a;window._tkq=window._tkq||[],window.ga=window.ga||function(){(window.ga.q=window.ga.q||[]).push(arguments)},window.ga.l=+new Date;const i={initialize:function(e,t,n){i.setUser(e,t),i.setSuperProps(n),i.identifyUser()},setGoogleAnalyticsEnabled:function(e,t=null){this.googleAnalyticsEnabled=e,this.googleAnalyticsKey=t},setMcAnalyticsEnabled:function(e){this.mcAnalyticsEnabled=e},setUser:function(e,t){a={ID:e,username:t}},setSuperProps:function(e){s=e},assignSuperProps:function(e){s=Object.assign(s||{},e)},mc:{bumpStat:function(e,t){const n=function(e,t){let n="";if("object"==typeof e){for(const t in e)n+="&x_"+encodeURIComponent(t)+"="+encodeURIComponent(e[t]);o("Bumping stats %o",e)}else n="&x_"+encodeURIComponent(e)+"="+encodeURIComponent(t),o('Bumping stat "%s" in group "%s"',t,e);return n}(e,t);i.mcAnalyticsEnabled&&((new Image).src=document.location.protocol+"//pixel.wp.com/g.gif?v=wpcom-no-pv"+n+"&t="+Math.random())},bumpStatWithPageView:function(e,t){const n=function(e,t){let n="";if("object"==typeof e){for(const t in e)n+="&"+encodeURIComponent(t)+"="+encodeURIComponent(e[t]);o("Built stats %o",e)}else n="&"+encodeURIComponent(e)+"="+encodeURIComponent(t),o('Built stat "%s" in group "%s"',t,e);return n}(e,t);i.mcAnalyticsEnabled&&((new Image).src=document.location.protocol+"//pixel.wp.com/g.gif?v=wpcom"+n+"&t="+Math.random())}},pageView:{record:function(e,t){i.tracks.recordPageView(e),i.ga.recordPageView(e,t)}},purchase:{record:function(e,t,n,r,o,s,a){i.ga.recordPurchase(e,t,n,r,o,s,a)}},tracks:{recordEvent:function(e,t){t=t||{},0===e.indexOf("akismet_")||0===e.indexOf("jetpack_")?(s&&(o("- Super Props: %o",s),t=Object.assign(t,s)),o('Record event "%s" called with props %s',e,JSON.stringify(t)),window._tkq.push(["recordEvent",e,t])):o('- Event name must be prefixed by "akismet_" or "jetpack_"')},recordJetpackClick:function(e){const t="object"==typeof e?e:{target:e};i.tracks.recordEvent("jetpack_wpa_click",t)},recordPageView:function(e){i.tracks.recordEvent("akismet_page_view",{path:e})},setOptOut:function(e){o("Pushing setOptOut: %o",e),window._tkq.push(["setOptOut",e])}},ga:{initialized:!1,initialize:function(){let e={};i.ga.initialized||(a&&(e={userId:"u-"+a.ID}),window.ga("create",this.googleAnalyticsKey,"auto",e),i.ga.initialized=!0)},recordPageView:function(e,t){i.ga.initialize(),o("Recording Page View ~ [URL: "+e+"] [Title: "+t+"]"),this.googleAnalyticsEnabled&&(window.ga("set","page",e),window.ga("send",{hitType:"pageview",page:e,title:t}))},recordEvent:function(e,t,n,r){i.ga.initialize();let s="Recording Event ~ [Category: "+e+"] [Action: "+t+"]";void 0!==n&&(s+=" [Option Label: "+n+"]"),void 0!==r&&(s+=" [Option Value: "+r+"]"),o(s),this.googleAnalyticsEnabled&&window.ga("send","event",e,t,n,r)},recordPurchase:function(e,t,n,r,o,s,a){window.ga("require","ecommerce"),window.ga("ecommerce:addTransaction",{id:e,revenue:r,currency:a}),window.ga("ecommerce:addItem",{id:e,name:t,sku:n,price:o,quantity:s}),window.ga("ecommerce:send")}},identifyUser:function(){a&&window._tkq.push(["identifyUser",a.ID,a.username])},setProperties:function(e){window._tkq.push(["setProperties",e])},clearedIdentity:function(){window._tkq.push(["clearIdentity"])}},c=i},85985:(e,t,n)=>{"use strict";n.d(t,{st:()=>r.A});n(82034),n(65595),n(53265);var r=n(73489);n(76923),n(15877),n(30335),n(88290)},15877:(e,t,n)=>{"use strict";n(51609)},30335:(e,t,n)=>{"use strict";n(86087)},73489:(e,t,n)=>{"use strict";n.d(t,{A:()=>c});var r=n(90372),o=n(39384),s=n(86087);const{tracks:a}=r.A,{recordEvent:i}=a,c=({pageViewEventName:e=null,pageViewNamespace:t="jetpack",pageViewSuffix:n="page_view",pageViewEventProperties:c={}}={})=>{const[u,d]=(0,s.useState)(!1),{isUserConnected:p,isRegistered:l,userConnectionData:m={}}=(0,o.useConnection)(),{wpcomUser:{login:w,ID:f}={},blogId:g}=m.currentUser||{},h=(0,s.useCallback)((async(e,t={})=>{p&&f&&w&&i(e,t)}),[p,f,w]);return(0,s.useEffect)((()=>{p&&f&&w&&g&&r.A.initialize(f,w,{blog_id:g})}),[g,f,w,p]),(0,s.useEffect)((()=>{const r=e?`${t}_${e}_${n}`:null;l&&r&&(u||(h(r,c),d(!0)))}),[u,t,e,n,l,c,h]),{recordEvent:h,tracks:a}}},76923:(e,t,n)=>{"use strict";n(47143),n(86087),n(88290)},27105:(e,t,n)=>{"use strict";n.d(t,{Ay:()=>p,E9:()=>d});var r=n(47143),o=n(62634),s=n(94478),a=n(88290);const i="SET_JETPACK_MODULES";function c(e){return d({isLoading:e})}function u(e,t){return{type:"SET_MODULE_UPDATING",name:e,isUpdating:t}}function d(e){return{type:i,options:e}}const p={updateJetpackModuleStatus:function*(e){try{yield u(e.name,!0),yield(0,s.sB)(e);const t=yield(0,s.wz)();return yield d({data:t}),!0}catch(e){const t=(0,r.select)(a.F).getJetpackModules();return yield d(t),!1}finally{yield u(e.name,!1)}},setJetpackModules:d,fetchModules:function*(){if((0,o.Sy)())return!0;try{yield c(!0);const e=yield(0,s.wz)();return yield d({data:e}),!0}catch(e){const t=(0,r.select)(a.F).getJetpackModules();return yield d(t),!1}finally{yield c(!1)}}}},94478:(e,t,n)=>{"use strict";n.d(t,{Ay:()=>u,sB:()=>c,wz:()=>i});var r=n(1455),o=n.n(r);const s="FETCH_JETPACK_MODULES",a="UPDATE_JETPACK_MODULE_STATUS",i=()=>({type:s}),c=e=>({type:a,settings:e}),u={[s]:function(){return o()({path:"/jetpack/v4/module/all",method:"GET"})},[a]:function({settings:e}){return o()({path:`/jetpack/v4/module/${e.name}/active`,method:"POST",data:{active:e.active}})}}},88290:(e,t,n)=>{"use strict";n.d(t,{F:()=>u});var r=n(47143),o=n(27105),s=n(94478),a=n(38862),i=n(62701),c=n(31640);const u="jetpack-modules",d=(0,r.createReduxStore)(u,{reducer:a.A,actions:o.Ay,controls:s.Ay,resolvers:i.A,selectors:c.A});(0,r.register)(d);const p=window?.Initial_State?.getModules||window?.Jetpack_Editor_Initial_State?.modules||null;null!==p&&(0,r.dispatch)(u).setJetpackModules({data:{...p}})},38862:(e,t,n)=>{"use strict";n.d(t,{A:()=>o});const r={isLoading:!1,isUpdating:{},data:{}},o=(e=r,t)=>{switch(t.type){case"SET_JETPACK_MODULES":return{...e,...t.options};case"SET_MODULE_UPDATING":return{...e,isUpdating:{...e.isUpdating,[t.name]:t.isUpdating}}}return e}},62701:(e,t,n)=>{"use strict";n.d(t,{A:()=>s});var r=n(27105),o=n(94478);const s={getJetpackModules:function*(){try{const e=yield(0,o.wz)();if(e)return(0,r.E9)({data:e})}catch(e){console.error(e)}}}},31640:(e,t,n)=>{"use strict";n.d(t,{A:()=>o});var r=n(62634);const o={getJetpackModules:e=>e.data,isModuleActive:(e,t)=>(0,r.Sy)()||(e?.data?.[t]?.activated??!1),areModulesLoading:e=>e.isLoading??!1,isModuleUpdating:(e,t)=>e?.isUpdating?.[t]??!1}},53265:(e,t,n)=>{"use strict";var r=n(27723);n(93832),n(66087);const __=r.__;__("Upgrade your plan to use video covers","jetpack-mu-wpcom"),__("Upgrade your plan to upload audio","jetpack-mu-wpcom")},82034:(e,t,n)=>{"use strict";n(92279)},62634:(e,t,n)=>{"use strict";function r(){return"object"==typeof window&&"string"==typeof window._currentSiteType?window._currentSiteType:null}function o(){return"simple"===r()}n.d(t,{Sy:()=>o})},65595:(e,t,n)=>{"use strict";n(96072),n(29491)},39384:e=>{"use strict";e.exports=window.JetpackConnection},51609:e=>{"use strict";e.exports=window.React},10790:e=>{"use strict";e.exports=window.ReactJSXRuntime},66087:e=>{"use strict";e.exports=window.lodash},1455:e=>{"use strict";e.exports=window.wp.apiFetch},56427:e=>{"use strict";e.exports=window.wp.components},29491:e=>{"use strict";e.exports=window.wp.compose},47143:e=>{"use strict";e.exports=window.wp.data},86087:e=>{"use strict";e.exports=window.wp.element},52619:e=>{"use strict";e.exports=window.wp.hooks},27723:e=>{"use strict";e.exports=window.wp.i18n},92279:e=>{"use strict";e.exports=window.wp.plugins},93832:e=>{"use strict";e.exports=window.wp.url},96072:e=>{function t(){return e.exports=t=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},e.exports.__esModule=!0,e.exports.default=e.exports,t.apply(null,arguments)}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var s=t[r]={exports:{}};return e[r](s,s.exports,n),s.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e=n(14437),t=n(85985),r=n(56427),o=n(29491),s=n(52619);const a=(0,o.createHigherOrderComponent)((n=>o=>{const{tracks:s}=(0,t.st)();return"post_tag"===o.slug&&window.wpcomTagsEducation?React.createElement(React.Fragment,null,React.createElement(n,o),React.createElement(r.ExternalLink,{href:(0,e.rm)("https://wordpress.com/support/posts/tags/"),onClick:()=>{s.recordEvent("jetpack_mu_wpcom_tags_education_link_click")}},window.wpcomTagsEducation.actionText)):React.createElement(n,o)}),"addTagsEducationLink");(0,s.addFilter)("editor.PostTaxonomyType","jetpack-mu-wpcom/add-tags-education-link",a)})()})();