(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[203],{5538:function(l,i,u){var d={"./en.json":[3545,545],"./ru.json":[3917,917]};function webpackAsyncContext(l){if(!u.o(d,l))return Promise.resolve().then(function(){var i=Error("Cannot find module '"+l+"'");throw i.code="MODULE_NOT_FOUND",i});var i=d[l],h=i[0];return u.e(i[1]).then(function(){return u.t(h,19)})}webpackAsyncContext.keys=function(){return Object.keys(d)},webpackAsyncContext.id=5538,l.exports=webpackAsyncContext},7906:function(l,i,u){"use strict";var d=u(8551),h=u(2935);i.iV=d.default,h.default},6747:function(l,i,u){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var d=u(6916),h=u(2265),m=u(8804),v=u(8073),y=h&&h.__esModule?h:{default:h};let g=h.forwardRef(function(l,i){let{locale:u,...h}=l,g=m.default();return y.default.createElement(v.default,d.extends({ref:i,locale:u||g},h))});g.displayName="ClientLink",i.default=g},7652:function(l,i,u){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var d=u(8804),h=u(9375);i.default=function(l){let i;try{i=d.default()}catch(l){throw Error(void 0)}for(var u=arguments.length,m=Array(u>1?u-1:0),v=1;v<u;v++)m[v-1]=arguments[v];return h.default({...l,locale:i},...m)}},4528:function(l,i,u){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var d=u(8804),h=u(1052);i.default=function(l){let i;try{i=d.default()}catch(l){throw Error(void 0)}for(var u=arguments.length,m=Array(u>1?u-1:0),v=1;v<u;v++)m[v-1]=arguments[v];return h.default({...l,locale:i},...m)}},2935:function(l,i,u){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var d=u(6916),h=u(2265),m=u(8804),v=u(8595),y=u(6747),g=u(7652),x=u(4528),P=u(6727),_=u(6605),b=h&&h.__esModule?h:{default:h};i.default=function(l){function f(){let i=m.default();if(!l.locales.includes(i))throw Error(void 0);return i}let i=h.forwardRef(function(i,u){let{href:h,locale:m,...g}=i,x=f();return b.default.createElement(y.default,d.extends({ref:u,href:v.compileLocalizedPathname({locale:m||x,pathname:h,params:"object"==typeof h?h.params:void 0,pathnames:l.pathnames}),locale:m,localePrefix:l.localePrefix},g))});function p(i){let{href:u,locale:d}=i;return v.compileLocalizedPathname({...v.normalizeNameOrNameWithParams(u),locale:d,pathnames:l.pathnames})}return i.displayName="Link",{Link:i,redirect:function(i){let u=p({href:i,locale:f()});for(var d=arguments.length,h=Array(d>1?d-1:0),m=1;m<d;m++)h[m-1]=arguments[m];return x.default({...l,pathname:u},...h)},permanentRedirect:function(i){let u=p({href:i,locale:f()});for(var d=arguments.length,h=Array(d>1?d-1:0),m=1;m<d;m++)h[m-1]=arguments[m];return g.default({...l,pathname:u},...h)},usePathname:function(){let i=P.default(),u=f();return i?v.getRoute({pathname:i,locale:u,pathnames:l.pathnames}):i},useRouter:function(){let l=_.default(),i=f();return{...l,push(u){for(var d,h=arguments.length,m=Array(h>1?h-1:0),v=1;v<h;v++)m[v-1]=arguments[v];let y=p({href:u,locale:(null===(d=m[0])||void 0===d?void 0:d.locale)||i});return l.push(y,...m)},replace(u){for(var d,h=arguments.length,m=Array(h>1?h-1:0),v=1;v<h;v++)m[v-1]=arguments[v];let y=p({href:u,locale:(null===(d=m[0])||void 0===d?void 0:d.locale)||i});return l.replace(y,...m)},prefetch(u){for(var d,h=arguments.length,m=Array(h>1?h-1:0),v=1;v<h;v++)m[v-1]=arguments[v];let y=p({href:u,locale:(null===(d=m[0])||void 0===d?void 0:d.locale)||i});return l.prefetch(y,...m)}}},getPathname:p}}},8551:function(l,i,u){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var d=u(6916),h=u(2265),m=u(6747),v=u(7652),y=u(4528),g=u(6727),x=u(6605),P=h&&h.__esModule?h:{default:h};i.default=function(l){let i=h.forwardRef(function(i,u){return P.default.createElement(m.default,d.extends({ref:u,localePrefix:null==l?void 0:l.localePrefix},i))});return i.displayName="Link",{Link:i,redirect:function(i){for(var u=arguments.length,d=Array(u>1?u-1:0),h=1;h<u;h++)d[h-1]=arguments[h];return y.default({...l,pathname:i},...d)},permanentRedirect:function(i){for(var u=arguments.length,d=Array(u>1?u-1:0),h=1;h<u;h++)d[h-1]=arguments[h];return v.default({...l,pathname:i},...d)},usePathname:function(){return g.default()},useRouter:x.default}}},6727:function(l,i,u){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var d=u(4033),h=u(2265),m=u(8804),v=u(1864);i.default=function(){let l=d.usePathname(),i=m.default();return h.useMemo(()=>l&&v.hasPathnamePrefixed(i,l)?v.unlocalizePathname(l,i):l,[i,l])}},6605:function(l,i,u){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var d=u(4033),h=u(2265),m=u(8804),v=u(1864),y=u(136),g=u(8595);i.default=function(){let l=d.useRouter(),i=m.default(),u=d.usePathname();return h.useMemo(()=>{function r(l){return function(d,h){let{locale:m,...x}=h||{};y.default(u,i,m);let P=[function(l,d){let h=window.location.pathname,m=g.getBasePath(u);return m&&(h=h.replace(m,"")),v.localizeHref(l,d||i,i,h)}(d,m)];return Object.keys(x).length>0&&P.push(x),l(...P)}}return{...l,push:r(l.push),replace:r(l.replace),prefetch:r(l.prefetch)}},[i,u,l])}},8073:function(l,i,u){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var d=u(6916),h=u(1396),m=u(4033),v=u(2265),y=u(8804),g=u(1864),x=u(136);function n(l){return l&&l.__esModule?l:{default:l}}var P=n(h),_=n(v);let b=v.forwardRef(function(l,i){let{href:u,locale:h,localePrefix:b,onClick:j,prefetch:k,...N}=l,O=m.usePathname(),w=y.default(),S=h!==w,[E,A]=v.useState(()=>g.isLocalHref(u)&&("never"!==b||S)?g.prefixHref(u,h):u);return v.useEffect(()=>{O&&A(g.localizeHref(u,h,w,O))},[w,u,h,O]),S&&(k=!1),_.default.createElement(P.default,d.extends({ref:i,href:E,hrefLang:S?h:void 0,onClick:function(l){x.default(O,w,h),j&&j(l)},prefetch:k},N))});b.displayName="ClientLink",i.default=b},9375:function(l,i,u){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var d=u(4033),h=u(1864);i.default=function(l){let i="never"===l.localePrefix?l.pathname:h.prefixPathname(l.locale,l.pathname);for(var u=arguments.length,m=Array(u>1?u-1:0),v=1;v<u;v++)m[v-1]=arguments[v];return d.permanentRedirect(i,...m)}},1052:function(l,i,u){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var d=u(4033),h=u(1864);i.default=function(l){let i="never"===l.localePrefix?l.pathname:h.prefixPathname(l.locale,l.pathname);for(var u=arguments.length,m=Array(u>1?u-1:0),v=1;v<u;v++)m[v-1]=arguments[v];return d.redirect(i,...m)}},136:function(l,i,u){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var d=u(2606),h=u(8595);i.default=function(l,i,u){if(!(u!==i&&null!=u)||!l)return;let m=h.getBasePath(l),v=""!==m?m:"/";document.cookie="".concat(d.COOKIE_LOCALE_NAME,"=").concat(u,"; path=").concat(v,"; max-age=").concat(d.COOKIE_MAX_AGE,"; sameSite=").concat(d.COOKIE_SAME_SITE)}},8595:function(l,i,u){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var d=u(1864);function t(l){let i=new URLSearchParams;for(let[u,d]of Object.entries(l))Array.isArray(d)?d.forEach(l=>{i.append(u,String(l))}):i.set(u,String(d));return"?"+i.toString()}i.compileLocalizedPathname=function(l){let{pathname:i,locale:u,params:d,pathnames:h,query:m}=l;function c(l){let i=h[l];return i||(i=l),i}function s(l){let i="string"==typeof l?l:l[u];return d&&Object.entries(d).forEach(l=>{let[u,d]=l;i=Array.isArray(d)?i.replace(RegExp("(\\[)?\\[...".concat(u,"\\](\\])?"),"g"),d.map(l=>String(l)).join("/")):i.replace("[".concat(u,"]"),String(d))}),m&&(i+=t(m)),i}if("string"==typeof i)return s(c(i));{let{pathname:l,...u}=i;return{...u,pathname:s(c(l))}}},i.getBasePath=function(l){return window.location.pathname.replace(l,"")},i.getRoute=function(l){var i;let{locale:u,pathname:h,pathnames:m}=l,v=d.unlocalizePathname(decodeURI(h),u),y=null===(i=Object.entries(m).find(l=>{let[,i]=l,h="string"!=typeof i?i[u]:i;return d.matchesPathname(h,v)}))||void 0===i?void 0:i[0];return y||(y=h),y},i.normalizeNameOrNameWithParams=function(l){return"string"==typeof l?{pathname:l}:l},i.serializeSearchParams=t},1864:function(l,i){"use strict";function e(l){let i="object"==typeof l?l.pathname:l;return null!=i&&!i.startsWith("/")}function t(l){return"object"==typeof l?null==l.host&&null==l.hostname:!/^[a-z]+:/i.test(l)}function n(l,i){let u;return"string"==typeof l?u=r(i,l):(u={...l},l.pathname&&(u.pathname=r(i,l.pathname))),u}function r(l,i){let u="/"+l;return/^\/(\?.*)?$/.test(i)&&(i=i.slice(1)),u+=i}function o(l,i){let u="/".concat(l);return i===u||i.startsWith("".concat(u,"/"))}function a(l){let i=l.replace(/\[\[(\.\.\.[^\]]+)\]\]/g,"?(.*)").replace(/\[(\.\.\.[^\]]+)\]/g,"(.+)").replace(/\[([^\]]+)\]/g,"([^/]+)");return new RegExp("^".concat(i,"$"))}Object.defineProperty(i,"__esModule",{value:!0}),i.hasPathnamePrefixed=o,i.isLocalHref=t,i.isRelativeHref=e,i.localizeHref=function(l,i){let u=arguments.length>2&&void 0!==arguments[2]?arguments[2]:i,d=arguments.length>3?arguments[3]:void 0;if(!t(l)||e(l))return l;let h=i!==u,m=null==i||o(i,d);return(h||m)&&null!=i?n(l,i):l},i.matchesPathname=function(l,i){return a(l).test(i)},i.prefixHref=n,i.prefixPathname=r,i.templateToRegex=a,i.unlocalizePathname=function(l,i){return l.replace(new RegExp("^/".concat(i)),"")||"/"}},2103:function(l,i,u){Promise.resolve().then(u.t.bind(u,9681,23)),Promise.resolve().then(u.bind(u,9560)),Promise.resolve().then(u.bind(u,2811)),Promise.resolve().then(u.bind(u,5621)),Promise.resolve().then(u.t.bind(u,4284,23)),Promise.resolve().then(u.t.bind(u,336,23))},9560:function(l,i,u){"use strict";u.r(i);var d=u(116),h=u(7437);i.default=function(l){var i=l.children,u=l.locale,m=l.messages,v=Intl.DateTimeFormat().resolvedOptions().timeZone;return(0,h.jsx)(d.NextIntlClientProvider,{locale:u,messages:m,timeZone:v,children:i})}},2811:function(l,i,u){"use strict";u.r(i),u.d(i,{Link:function(){return b},default:function(){return Navbar_Navbar},localePrefix:function(){return P},redirect:function(){return j},usePathname:function(){return k},useRouter:function(){return N}});var d=u(116);u(3860);var h=u(5621);u(6952),u(9681),u(4284);var m=u(4033);u(9560);var v=u(7437),y=["en","ru"],dist_clsx=function(){for(var l,i,u=0,d="",h=arguments.length;u<h;u++)(l=arguments[u])&&(i=function r(l){var i,u,d="";if("string"==typeof l||"number"==typeof l)d+=l;else if("object"==typeof l){if(Array.isArray(l)){var h=l.length;for(i=0;i<h;i++)l[i]&&(u=r(l[i]))&&(d&&(d+=" "),d+=u)}else for(u in l)l[u]&&(d&&(d+=" "),d+=u)}return d}(l))&&(d&&(d+=" "),d+=i);return d},g=u(2265);function LocaleSwitcherSelect(l){var i=l.children,u=l.defaultValue;l.label;var d=N(),h=(0,g.useTransition)(),y=h[0],x=h[1],P=k();return(0,m.useParams)(),(0,v.jsxs)("label",{className:dist_clsx("relative text-gray-400",y&&"transition-opacity [&:disabled]:opacity-30"),children:[(0,v.jsx)("select",{className:"inline-flex appearance-none bg-transparent py-3 pl-2 pr-6",defaultValue:u,disabled:y,onChange:function(l){var i=l.target.value;x(function(){d.replace(P,{locale:i})})},style:{color:"var(--contrast-color)"},children:i}),(0,v.jsx)("span",{className:"pointer-events-none absolute right-2 top-[8px]"})]})}function LocaleSwitcher(){var l=(0,d.useTranslations)("LocaleSwitcher"),i=(0,d.useLocale)();return(0,v.jsx)(LocaleSwitcherSelect,{defaultValue:i,label:l("label"),children:y.map(function(i){return(0,v.jsx)("option",{value:i,style:{color:"black !important"},children:l("locale",{locale:i})},i)})})}var x=u(7906),P="always",_=(0,x.iV)({locales:y,localePrefix:P}),b=_.Link,j=_.redirect,k=_.usePathname,N=_.useRouter;function Navbar_Navbar(){var l=(0,d.useTranslations)("Navbar"),i=k();return N(),(0,v.jsxs)("nav",{children:[(0,v.jsx)(h.default,{}),(0,v.jsx)("div",{style:{color:"var(--contrast-color) !important",float:"right",padding:"0.25rlh"},children:(0,v.jsx)(LocaleSwitcher,{})}),(0,v.jsxs)("div",{className:"navbar",children:[(0,v.jsx)(b,{href:"/",className:"/"==i?"active":"nav-link",children:l("WebAmp")}),(0,v.jsx)(b,{href:"/synth",className:"/synth"==i?"active":"nav-link",children:l("Synth")}),(0,v.jsx)(b,{href:"/settings",className:"/settings"==i?"active":"nav-link",children:l("Settings")}),(0,v.jsx)(b,{href:"/history",className:"/history"==i?"active":"nav-link",children:l("History")})]}),(0,v.jsx)("hr",{})]})}},5621:function(l,i,u){"use strict";u.r(i),u.d(i,{default:function(){return ThemeButton}});var d=u(2265);u(5955);var h=u(7437);function ThemeButton(){var l="theme-preference",onClick=function(){i.value="light"===i.value?"dark":"light",setPreference()},setPreference=function(){if("undefined"!=typeof localStorage){var u;null===(u=localStorage)||void 0===u||u.setItem(l,i.value),reflectPreference()}},reflectPreference=function(){var l;document.firstElementChild.setAttribute("data-theme",i.value),null===(l=document.querySelector("#theme-toggle"))||void 0===l||l.setAttribute("aria-label",i.value)},i={value:function(){if("undefined"!=typeof localStorage){var i,u,d;return null!==(i=localStorage)&&void 0!==i&&i.getItem(l)?null===(u=localStorage)||void 0===u?void 0:u.getItem(l):null!==(d=window)&&void 0!==d&&d.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}}()};return reflectPreference(),window.onload=function(){reflectPreference(),document.querySelector("#theme-toggle").onclick=onClick},(0,d.useEffect)(function(){var l;reflectPreference(),null===(l=window)||void 0===l||l.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",function(l){var u=l.matches;i.value=u?"dark":"light",setPreference()}),document.querySelector("#theme-toggle").onclick=onClick},[]),(0,h.jsx)("div",{style:{transition:"0.4s ease",float:"left",padding:"0.5rlh"},children:(0,h.jsx)("button",{className:"theme-toggle",id:"theme-toggle",title:"Toggles light & dark","aria-label":"light","aria-live":"polite",children:(0,h.jsxs)("svg",{className:"sun-and-moon","aria-hidden":"true",width:"24",height:"24",viewBox:"0 0 24 24",children:[(0,h.jsxs)("mask",{className:"moon",id:"moon-mask",children:[(0,h.jsx)("rect",{x:"0",y:"0",width:"100%",height:"100%",fill:"white"}),(0,h.jsx)("circle",{cx:"24",cy:"10",r:"6",fill:"black"})]}),(0,h.jsx)("circle",{className:"sun",cx:"12",cy:"12",r:"6",mask:"url(#moon-mask)",fill:"currentColor"}),(0,h.jsxs)("g",{className:"sun-beams",stroke:"currentColor",children:[(0,h.jsx)("line",{x1:"12",y1:"1",x2:"12",y2:"3"}),(0,h.jsx)("line",{x1:"12",y1:"21",x2:"12",y2:"23"}),(0,h.jsx)("line",{x1:"4.22",y1:"4.22",x2:"5.64",y2:"5.64"}),(0,h.jsx)("line",{x1:"18.36",y1:"18.36",x2:"19.78",y2:"19.78"}),(0,h.jsx)("line",{x1:"1",y1:"12",x2:"3",y2:"12"}),(0,h.jsx)("line",{x1:"21",y1:"12",x2:"23",y2:"12"}),(0,h.jsx)("line",{x1:"4.22",y1:"19.78",x2:"5.64",y2:"18.36"}),(0,h.jsx)("line",{x1:"18.36",y1:"5.64",x2:"19.78",y2:"4.22"})]})]})})})}},336:function(l,i,u){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),function(l,i){for(var u in i)Object.defineProperty(l,u,{enumerable:!0,get:i[u]})}(i,{suspense:function(){return _suspense},NoSSR:function(){return _NoSSR}}),u(1024),u(2265);var d=u(1776);function _suspense(){var l=Error(d.NEXT_DYNAMIC_NO_SSR_CODE);throw l.digest=d.NEXT_DYNAMIC_NO_SSR_CODE,l}function _NoSSR(l){return l.children}},9681:function(){},3860:function(){},5955:function(){},4284:function(){}},function(l){l.O(0,[267,735,396,971,650,744],function(){return l(l.s=2103)}),_N_E=l.O()}]);