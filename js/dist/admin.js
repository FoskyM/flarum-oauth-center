(()=>{var t={n:e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},d:(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};(()=>{"use strict";t.r(e),t.d(e,{extend:()=>l});const n=flarum.core.compat["common/extenders"];var o=t.n(n);function s(t,e){return s=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},s(t,e)}function a(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,s(t,e)}const r=flarum.core.compat["common/Model"];var i=t.n(r),c=function(t){function e(){for(var e,n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))||this).client_id=i().attribute("client_id"),e.client_secret=i().attribute("client_secret"),e.redirect_uri=i().attribute("redirect_uri"),e.grant_types=i().attribute("grant_types"),e.scope=i().attribute("scope"),e.user_id=i().attribute("user_id"),e.client_name=i().attribute("client_name"),e.client_icon=i().attribute("client_icon"),e.client_desc=i().attribute("client_desc"),e.client_home=i().attribute("client_home"),e}return a(e,t),e}(i()),u=function(t){function e(){for(var e,n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))||this).scope=i().attribute("scope"),e.resource_path=i().attribute("resource_path"),e.method=i().attribute("method"),e.is_default=i().attribute("is_default"),e.scope_name=i().attribute("scope_name"),e.scope_icon=i().attribute("scope_icon"),e.scope_desc=i().attribute("scope_desc"),e}return a(e,t),e}(i());const l=[(new(o().Store)).add("oauth-clients",c).add("oauth-scopes",u)],f=flarum.core.compat["admin/app"];var p=t.n(f);const h=flarum.core.compat["admin/components/ExtensionPage"];var d=t.n(h);const v=flarum.core.compat["common/components/Button"];var _=t.n(v);const g=flarum.core.compat["common/components/Page"];var y=t.n(g);const b=flarum.core.compat["common/components/FieldSet"];var k=t.n(b);const S=flarum.core.compat["admin/utils/saveSettings"];var x=t.n(S);const P=flarum.core.compat["common/utils/Stream"];var w=t.n(P);const B=flarum.core.compat["common/components/Select"];var O=t.n(B);const N=flarum.core.compat["common/components/Switch"];var T=t.n(N),C=function(t){function e(){return t.apply(this,arguments)||this}a(e,t);var n=e.prototype;return n.oninit=function(e){var n=this;t.prototype.oninit.call(this,e),this.saving=!1,this.fields=["foskym-oauth-center.access_lifetime","foskym-oauth-center.allow_implicit","foskym-oauth-center.enforce_state","foskym-oauth-center.require_exact_redirect_uri"],this.values={};var o=p().data.settings;this.fields.forEach((function(t){return n.values[t]=w()(o[t]||"")}));for(var s=1;s<this.fields.length;s++)this.values[this.fields[s]]="1"===o[this.fields[s]]},n.view=function(){var t=this;return m("div",null,m("form",{onsubmit:this.onsubmit.bind(this),className:"BasicsPage"},k().component({},[m("div",{style:"height: 5px;"}),T().component({state:this.values["foskym-oauth-center.allow_implicit"],onchange:function(e){return t.saveSingleSetting("foskym-oauth-center.allow_implicit",e)},loading:this.saving},p().translator.trans("foskym-oauth-center.admin.settings.allow_implicit"))]),k().component({},[m("div",{style:"height: 5px;"}),T().component({state:this.values["foskym-oauth-center.enforce_state"],onchange:function(e){return t.saveSingleSetting("foskym-oauth-center.enforce_state",e)},loading:this.saving},p().translator.trans("foskym-oauth-center.admin.settings.enforce_state"))]),k().component({},[m("div",{style:"height: 5px;"}),T().component({state:this.values["foskym-oauth-center.require_exact_redirect_uri"],onchange:function(e){return t.saveSingleSetting("foskym-oauth-center.require_exact_redirect_uri",e)},loading:this.saving},p().translator.trans("foskym-oauth-center.admin.settings.require_exact_redirect_uri"))]),m("hr",null),k().component({},[m("input",{className:"FormControl",bidi:this.values["foskym-oauth-center.access_lifetime"],placeholder:p().translator.trans("foskym-oauth-center.admin.settings.access_lifetime"),required:!0}),m("div",{className:"helpText"},p().translator.trans("foskym-oauth-center.admin.settings.access_lifetime")),_().component({type:"submit",className:"Button Button--primary",loading:this.saving},p().translator.trans("core.admin.settings.submit_button"))])))},n.saveSingleSetting=function(t,e){var n=this;if(!this.saving){this.saving=!0,this.values[t]=e;var o={};o[t]=e,x()(o).then((function(){return p().alerts.show({type:"success"},p().translator.trans("core.admin.settings.saved_message"))})).catch((function(){})).then((function(){n.saving=!1,m.redraw()}))}},n.onsubmit=function(t){var e=this;if(t.preventDefault(),!this.saving){this.saving=!0,p().alerts.dismiss(this.successAlert);var n={};n["foskym-oauth-center.access_lifetime"]=this.values["foskym-oauth-center.access_lifetime"](),""===n["foskym-oauth-center.access_lifetime"]&&(n["foskym-oauth-center.access_lifetime"]=3600),x()(n).then((function(){return p().alerts.show({type:"success"},p().translator.trans("core.admin.settings.saved_message"))})).catch((function(){})).then((function(){e.saving=!1,m.redraw()}))}},e}(y()),A=function(t){function e(){for(var e,n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))||this).translationPrefix="foskym-oauth-center.admin.clients.",e.clients=[],e}a(e,t);var n=e.prototype;return n.oninit=function(e){var n=this;t.prototype.oninit.call(this,e),this.fields=["client_id","client_secret","redirect_uri","grant_types","scope","client_name","client_desc","client_icon","client_home"],p().store.find("oauth-clients").then((function(t){n.clients=t,n.fields.map((function(t){return console.log(n.clients[0][t])})),m.redraw()}))},n.view=function(){var t=this;return m("div",{class:"OAuthCenter-clientsPage"},m(".Form-group",[m("table",[m("thead",m("tr",[this.fields.map((function(e){return m("th",p().translator.trans(t.translationPrefix+e))})),m("th")])),m("tbody",[this.clients.map((function(e,n){return m("tr",[t.fields.map((function(o){return m("td",m("input.FormControl",{type:"text",value:e[o]()||"",onchange:function(e){t.saveClientInfo(n,o,e.target.value)}}))})),m("td",_().component({className:"Button Button--icon",icon:"fas fa-times",onclick:function(){t.clients[n].delete(),t.clients.splice(n,1)}}))])})),m("tr",m("td",{colspan:9},_().component({className:"Button Button--block",onclick:function(){var e=p().store.createRecord("oauth-clients"),n=t.randomString(32),o=t.randomString(32);e.save({client_id:n,client_secret:o}).then(t.clients.push(e))}},p().translator.trans(this.translationPrefix+"add_button"))))])])]))},n.randomString=function(t){t=t||32;for(var e="",n=0;n<t;n++)e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(63*Math.random()));return e},n.saveClientInfo=function(t,e,n){var o;console.log(t,e,n),this.clients[t].save(((o={})[e]=n,o))},e}(y());const E=flarum.core.compat["common/components/Checkbox"];var M=t.n(E),j=function(t){function e(){for(var e,n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))||this).translationPrefix="foskym-oauth-center.admin.scopes.",e.scopes=[],e}a(e,t);var n=e.prototype;return n.oninit=function(e){var n=this;t.prototype.oninit.call(this,e),this.fields=["scope","resource_path","method","is_default","scope_name","scope_icon","scope_desc"],p().store.find("oauth-scopes").then((function(t){n.scopes=t,n.fields.map((function(t){return console.log(n.scopes[0][t])})),m.redraw()}))},n.view=function(){var t=this;return m("div",{class:"OAuthCenter-scopesPage"},m(".Form-group",[m("table",[m("thead",m("tr",[this.fields.map((function(e){return m("th",p().translator.trans(t.translationPrefix+e))})),m("th")])),m("tbody",[this.scopes.map((function(e,n){return m("tr",[t.fields.map((function(o){return m("td","method"===o?O().component({options:{GET:"GET",POST:"POST",PUT:"PUT",DELETE:"DELETE",PATCH:"PATCH"},value:e[o]()||"GET",disabled:"/api/user"===e.resource_path()&&"method"===o,onchange:function(e){t.saveScopeInfo(n,o,e)}}):"is_default"===o?M().component({state:1===e[o]()||!1,disabled:"/api/user"===e.resource_path()&&"is_default"===o,onchange:function(e){t.scopes[n].is_default((t.scopes[n].is_default()+1)%2),t.saveScopeInfo(n,o,e?1:0)}}):m("input.FormControl",{type:"text",value:e[o]()||"",disabled:"/api/user"===e.resource_path()&&"resource_path"===o,onchange:function(e){t.saveScopeInfo(n,o,e.target.value)}}))})),"/api/user"!==e.resource_path()&&m("td",_().component({className:"Button Button--icon",icon:"fas fa-times",onclick:function(){t.scopes[n].delete(),t.scopes.splice(n,1)}}))])})),m("tr",m("td",{colspan:7},_().component({className:"Button Button--block",onclick:function(){var e=p().store.createRecord("oauth-scopes");e.save({scope:"Scope."+t.randomString(8),resource_path:"/api/"+t.randomString(4),method:"GET"}).then(t.scopes.push(e))}},p().translator.trans(this.translationPrefix+"add_button"))))])])]))},n.randomString=function(t){t=t||8;for(var e="",n=0;n<t;n++)e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(63*Math.random()));return e},n.saveScopeInfo=function(t,e,n){var o;this.scopes[t].save(((o={})[e]=n,o))},e}(y()),F=function(t){function e(){return t.apply(this,arguments)||this}a(e,t);var n=e.prototype;return n.content=function(){var t=m.route.param().page||"index";return m("div",{className:"ExtensionPage-settings OAuthCenter"},m("div",{className:"oauth-menu"},m("div",{className:"container"},this.menuButtons(t))),m("div",{className:"container OAuthCenterPage-container"},this.pageContent(t)))},n.menuButtons=function(t){return[_().component({className:"Button "+("index"===t?"item-selected":""),onclick:function(){return m.route.set(p().route("extension",{id:"foskym-oauth-center"}))},icon:"fas fa-home"},p().translator.trans("foskym-oauth-center.admin.page.index")),_().component({className:"Button "+("clients"===t?"item-selected":""),onclick:function(){return m.route.set(p().route("extension",{id:"foskym-oauth-center",page:"clients"}))},icon:"fas fa-network-wired"},p().translator.trans("foskym-oauth-center.admin.page.clients")),_().component({className:"Button "+("scopes"===t?"item-selected":""),onclick:function(){return m.route.set(p().route("extension",{id:"foskym-oauth-center",page:"scopes"}))},icon:"fas fa-user-lock"},p().translator.trans("foskym-oauth-center.admin.page.scopes"))]},n.pageContent=function(t){return"clients"==t?m(A,null):"scopes"==t?m(j,null):m(C,null)},e}(d());p().initializers.add("foskym/flarum-oauth-center",(function(){p().extensionData.for("foskym-oauth-center").registerPage(F).registerPermission({icon:"fas fa-user-friends",label:p().translator.trans("foskym-oauth-center.admin.permission.use_oauth"),permission:"foskym-oauth-center.use-oauth"},"use-oauth",95)}))})(),module.exports=e})();
//# sourceMappingURL=admin.js.map