(()=>{"use strict";var e={66293:(e,t,o)=>{o.d(t,{L:()=>c,i:()=>r});var a=o(4981);const s=["a8c/blog-posts","newspack-blocks/homepage-articles"],l=e=>({postsPerPage:t})=>(0,a.createBlock)(e,{postsToShow:t,showAvatar:!1,displayPostDate:!0,displayPostContent:!0}),r=e=>s.indexOf(e)>-1,c={to:s.map((e=>({type:"block",blocks:[e],transform:l(e)})))}},52175:e=>{e.exports=window.wp.blockEditor},4981:e=>{e.exports=window.wp.blocks},55609:e=>{e.exports=window.wp.components},9818:e=>{e.exports=window.wp.data},69307:e=>{e.exports=window.wp.element},65736:e=>{e.exports=window.wp.i18n}},t={};function o(a){var s=t[a];if(void 0!==s)return s.exports;var l=t[a]={exports:{}};return e[a](l,l.exports,o),l.exports}o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var a in t)o.o(t,a)&&!o.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e=o(52175),t=o(4981),a=o(55609),s=o(9818),l=o(69307),r=o(65736),c=o(66293);const __=r.__,n=React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},React.createElement("path",{opacity:".87",fill:"none",d:"M0 0h24v24H0V0z"}),React.createElement("path",{d:"M3 5v14h17V5H3zm4 2v2H5V7h2zm-2 6v-2h2v2H5zm0 2h2v2H5v-2zm13 2H9v-2h9v2zm0-4H9v-2h9v2zm0-4H9V7h9v2z"}));(0,t.registerBlockType)("a8c/posts-list",{title:__("Blog Posts Listing","jetpack-mu-wpcom"),description:__("Displays your latest Blog Posts.","jetpack-mu-wpcom"),keywords:["posts"],icon:n,category:"layout",supports:{html:!1,multiple:!1,reusable:!1,inserter:!1},attributes:{postsPerPage:{type:"number",default:10}},edit:({attributes:o,setAttributes:r,clientId:p,isSelected:i})=>{const m=(0,s.select)("core/block-editor").getBlock(p),d=(0,t.getPossibleBlockTransformations)([m]).find((e=>e&&(0,c.i)(e.name))),w=!!d;return React.createElement(l.Fragment,null,w&&React.createElement(a.Notice,{actions:[{label:__("Update Block","jetpack-mu-wpcom"),onClick:()=>{(0,s.dispatch)("core/block-editor").replaceBlocks(m.clientId,(0,t.switchToBlockType)(m,d.name))}}],className:"a8c-posts-list__notice",isDismissible:!1},__("An improved version of this block is available. Update for a better, more natural way to manage your blog post listings. There may be small visual changes.","jetpack-mu-wpcom")),React.createElement(a.Placeholder,{className:"a8c-posts-list__placeholder",icon:n,label:__("Your recent blog posts will be displayed here.","jetpack-mu-wpcom")},i?React.createElement(a.RangeControl,{label:__("Number of posts to show","jetpack-mu-wpcom"),value:o.postsPerPage,onChange:e=>r({postsPerPage:e}),min:1,max:50}):null),React.createElement(e.InspectorControls,null,React.createElement(a.PanelBody,null,React.createElement(a.RangeControl,{label:__("Number of posts","jetpack-mu-wpcom"),value:o.postsPerPage,onChange:e=>r({postsPerPage:e}),min:1,max:50}))))},save:()=>null,transforms:c.L})})()})();