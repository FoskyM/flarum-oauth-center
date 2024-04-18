(()=>{var t={n:e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},d:(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};(()=>{"use strict";t.r(e),t.d(e,{extend:()=>h});const n=flarum.core.compat["common/extenders"];var o=t.n(n);function s(t,e){return s=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},s(t,e)}function i(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,s(t,e)}const a=flarum.core.compat["common/Model"];var r=t.n(a),c=function(t){function e(){for(var e,n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))||this).client_id=r().attribute("client_id"),e.client_secret=r().attribute("client_secret"),e.redirect_uri=r().attribute("redirect_uri"),e.grant_types=r().attribute("grant_types"),e.scope=r().attribute("scope"),e.user_id=r().attribute("user_id"),e.client_name=r().attribute("client_name"),e.client_icon=r().attribute("client_icon"),e.client_desc=r().attribute("client_desc"),e.client_home=r().attribute("client_home"),e}return i(e,t),e}(r()),u=function(t){function e(){for(var e,n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))||this).scope=r().attribute("scope"),e.resource_path=r().attribute("resource_path"),e.method=r().attribute("method"),e.visible_fields=r().attribute("visible_fields"),e.is_default=r().attribute("is_default"),e.scope_name=r().attribute("scope_name"),e.scope_icon=r().attribute("scope_icon"),e.scope_desc=r().attribute("scope_desc"),e}return i(e,t),e}(r()),l=function(t){function e(){for(var e,n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))||this).client=r().hasOne("client"),e.user_id=r().attribute("user_id"),e.authorized_at=r().attribute("authorized_at",r().transformDate),e}return i(e,t),e}(r()),d=function(t){function e(){for(var e,n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))||this).access_token=r().attribute("access_token"),e.client_id=r().attribute("client_id"),e.user_id=r().attribute("user_id"),e.expires=r().attribute("expires",r().transformDate),e.scope=r().attribute("scope"),e}return i(e,t),e}(r());const h=[(new(o().Store)).add("oauth-clients",c).add("oauth-scopes",u).add("oauth-records",l).add("oauth-tokens",d)],f=flarum.core.compat["admin/app"];var p=t.n(f);const v=flarum.core.compat["admin/components/ExtensionPage"];var y=t.n(v);const _=flarum.core.compat["common/components/Button"];var b=t.n(_);const g=flarum.core.compat["common/components/Page"];var k=t.n(g);const N=flarum.core.compat["common/components/FieldSet"];var w=t.n(N);const C=flarum.core.compat["admin/utils/saveSettings"];var x=t.n(C);const P=flarum.core.compat["common/utils/Stream"];var B=t.n(P);const A=flarum.core.compat["common/components/Select"];var E=t.n(A);const O=flarum.core.compat["common/components/Switch"];var M=t.n(O),F=function(t){function e(){return t.apply(this,arguments)||this}i(e,t);var n=e.prototype;return n.oninit=function(e){t.prototype.oninit.call(this,e),this.saving=!1,this.fields=["display_mode","access_lifetime","allow_implicit","enforce_state","require_exact_redirect_uri","authorization_method_fetch"];var n=p().data.settings;this.values=this.fields.reduce((function(t,e){return t[e="foskym-oauth-center."+e]=B()(n[e]||""),t}),{}),this.values["foskym-oauth-center.display_mode"]=this.values["foskym-oauth-center.display_mode"]()||"box";for(var o=2;o<this.fields.length;o++)this.values["foskym-oauth-center."+this.fields[o]]="1"===n["foskym-oauth-center."+this.fields[o]]},n.view=function(){var t=this;return m("div",null,m("form",{onsubmit:this.onsubmit.bind(this),className:"BasicsPage"},this.fields.slice(2).map((function(e){return w().component({},[m("div",{style:"height: 5px;"}),M().component({state:t.values["foskym-oauth-center."+e],onchange:function(n){return t.saveSingleSetting(e,n)},loading:t.saving},p().translator.trans("foskym-oauth-center.admin.settings."+e))])})),m("hr",null),w().component({},[E().component({options:{box:"Box",card:"Card",column:"Column"},value:this.values["foskym-oauth-center."+this.fields[0]],onchange:function(e){return t.saveSingleSetting(t.fields[0],e)},loading:this.saving}),m("div",{className:"helpText"},p().translator.trans("foskym-oauth-center.admin.settings."+this.fields[0]))]),m("hr",null),w().component({},[m("input",{className:"FormControl",bidi:this.values["foskym-oauth-center."+this.fields[1]],placeholder:p().translator.trans("foskym-oauth-center.admin.settings."+this.fields[1]),required:!0}),m("div",{className:"helpText"},p().translator.trans("foskym-oauth-center.admin.settings."+this.fields[1])),b().component({type:"submit",className:"Button Button--primary",loading:this.saving},p().translator.trans("core.admin.settings.submit_button"))])))},n.saveSingleSetting=function(t,e){var n,o=this;this.saving||(this.saving=!0,this.values["foskym-oauth-center."+t]=e,x()((n={},n["foskym-oauth-center."+t]=e,n)).then((function(){return p().alerts.show({type:"success"},p().translator.trans("core.admin.settings.saved_message"))})).catch((function(){})).finally((function(){o.saving=!1,m.redraw()})))},n.onsubmit=function(t){var e=this;if(t.preventDefault(),!this.saving){this.saving=!0;var n={};n["foskym-oauth-center.access_lifetime"]=this.values["foskym-oauth-center.access_lifetime"](),""===n["foskym-oauth-center.access_lifetime"]&&(n["foskym-oauth-center.access_lifetime"]=3600),x()(n).then((function(){return p().alerts.show({type:"success"},p().translator.trans("core.admin.settings.saved_message"))})).catch((function(){})).finally((function(){e.saving=!1,m.redraw()}))}},e}(k());const S=flarum.core.compat["common/components/Modal"];var T=t.n(S),D=function(t){function e(){return t.apply(this,arguments)||this}i(e,t);var n=e.prototype;return n.oninit=function(e){var n=this;t.prototype.oninit.call(this,e),this.client=this.attrs.client,this.fields=["client_id","client_secret","redirect_uri","grant_types","scope","client_name","client_desc","client_icon","client_home"],this.values=this.fields.reduce((function(t,e){return t[e]=B()(n.client[e]()||""),t}),{})},n.className=function(){return"EditClientModal Modal--large"},n.title=function(){return p().translator.trans("foskym-oauth-center.admin.clients.edit_client")},n.content=function(){var t=this;return m("div",{className:"Modal-body"},m("form",{onsubmit:this.onsubmit.bind(this)},m("div",{className:"OAuthCenter-Columns"},m("div",{className:"OAuthCenter-Column"},this.fields.slice(0,5).map((function(e){return m("div",{className:"Form-group"},m("label",null,p().translator.trans("foskym-oauth-center.admin.clients."+e)),m("input",{className:"FormControl",bidi:t.values[e]}))}))),m("div",{className:"OAuthCenter-Column"},this.fields.slice(5,9).map((function(e){return m("div",{className:"Form-group"},m("label",null,p().translator.trans("foskym-oauth-center.admin.clients."+e)),m("input",{className:"FormControl",bidi:t.values[e]}))})))),m("div",{className:"Form-group"},b().component({type:"submit",className:"Button Button--primary Button--block EditClientModal-save",loading:this.loading},p().translator.trans("core.admin.settings.submit_button")))))},n.onsubmit=function(t){var e=this;t.preventDefault(),this.loading=!0;var n=this.fields.reduce((function(t,n){return t[n]=e.values[n](),t}),{});this.client.save(n).then((function(){e.loading=!1,m.redraw(),e.hide()}))},e}(T());function j(t){t=t||8;for(var e="",n=0;n<t;n++)e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(63*Math.random()));return e}var G=function(t){function e(){for(var e,n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))||this).translationPrefix="foskym-oauth-center.admin.clients.",e.clients=[],e}i(e,t);var n=e.prototype;return n.oninit=function(e){var n=this;t.prototype.oninit.call(this,e),p().store.find("oauth-clients").then((function(t){n.clients=t,m.redraw()}))},n.view=function(){var t=this;return m("div",{class:"OAuthCenter-clientsPage"},m(".Form-group",[m("table",[m("thead",m("tr",[["client_id","client_name"].map((function(e){return m("th",p().translator.trans(t.translationPrefix+e))})),m("th")])),m("tbody",[this.clients.map((function(e,n){return m("tr",[["client_id","client_name"].map((function(t){return m("td",e[t]())})),m("td",[b().component({className:"Button Button--icon",icon:"fas fa-edit",onclick:function(){return t.showEditModal(e)}}),b().component({className:"Button Button--icon",icon:"fas fa-times",onclick:function(){e.delete(),t.clients.splice(n,1)}})])])})),m("tr",m("td",{colspan:2},b().component({className:"Button Button--block",onclick:function(){var e=p().store.createRecord("oauth-clients"),n=j(32),o=j(32);e.save({client_id:n,client_secret:o}).then((function(){t.clients.push(e),t.showEditModal(e)}))}},p().translator.trans(this.translationPrefix+"add_button"))))])])]))},n.showEditModal=function(t){p().modal.show(D,{client:t})},e}(k());const q=flarum.core.compat["common/components/Checkbox"];var z=t.n(q),L=function(t){function e(){return t.apply(this,arguments)||this}i(e,t);var n=e.prototype;return n.oninit=function(e){var n=this;t.prototype.oninit.call(this,e),this.scope=this.attrs.scope,this.fields=["scope","resource_path","method","is_default","scope_name","scope_icon","scope_desc","visible_fields"],this.values=this.fields.reduce((function(t,e){return t[e]=B()(n.scope[e]()||""),t}),{})},n.className=function(){return"EditScopeModal Modal--large"},n.title=function(){return p().translator.trans("foskym-oauth-center.admin.scopes.edit_scope")},n.content=function(){return m("div",{className:"Modal-body"},m("form",{onsubmit:this.onsubmit.bind(this)},m("div",{className:"OAuthCenter-Columns"},m("div",{className:"OAuthCenter-Column"},this.renderFormGroups(this.fields.slice(0,4))),m("div",{className:"OAuthCenter-Column"},this.renderFormGroups(this.fields.slice(4,7)))),m("div",{className:"Form-group"},m("label",null,p().translator.trans("foskym-oauth-center.admin.scopes.visible_fields")),m("textarea",{className:"FormControl",bidi:this.values.visible_fields,rows:3,placeholder:"id,username,email,data.attributes"},this.values.visible_fields())),m("div",{className:"Form-group"},b().component({type:"submit",className:"Button Button--primary Button--block EditScopeModal-save",loading:this.loading},p().translator.trans("core.admin.settings.submit_button")))))},n.onsubmit=function(t){var e=this;t.preventDefault(),this.loading=!0;var n=this.fields.reduce((function(t,n){return t[n]=e.values[n](),t}),{});this.scope.save(n).then((function(){e.loading=!1,m.redraw(),e.hide()}))},n.renderFormGroups=function(t){var e=this;return t.map((function(t){return m("div",{className:"Form-group"+("method"===t||"is_default"===t?" OAuthCenter-FormGroup-Column":"")},m("label",null,p().translator.trans("foskym-oauth-center.admin.scopes."+t)),"method"===t?E().component({options:{GET:"GET",POST:"POST",PUT:"PUT",DELETE:"DELETE",PATCH:"PATCH"},value:e.values[t](),onchange:e.values[t]}):"is_default"===t?z().component({className:"OAuthCenter-Checkbox",state:1===e.values[t]()||!1,onchange:function(n){return e.values[t](n?1:0)}}):m("input",{className:"FormControl",bidi:e.values[t]}))}))},e}(T()),R=function(t){function e(){for(var e,n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))||this).translationPrefix="foskym-oauth-center.admin.scopes.",e.scopes=[],e}i(e,t);var n=e.prototype;return n.oninit=function(e){var n=this;t.prototype.oninit.call(this,e),this.fields=["scope","resource_path","method","is_default","scope_name","scope_icon","scope_desc"],p().store.find("oauth-scopes").then((function(t){n.scopes=t,m.redraw()}))},n.view=function(){var t=this;return m("div",{class:"OAuthCenter-scopesPage"},m(".Form-group",[m("table",[m("thead",m("tr",[["scope","scope_name"].map((function(e){return m("th",p().translator.trans(t.translationPrefix+e))})),m("th")])),m("tbody",[this.scopes.map((function(e,n){return m("tr",[["scope","scope_name"].map((function(t){return m("td",e[t]())})),m("td",[b().component({className:"Button Button--icon",icon:"fas fa-edit",onclick:function(){return t.showEditModal(e)}}),b().component({className:"Button Button--icon",icon:"fas fa-times",onclick:function(){e.delete(),t.scopes.splice(n,1)}})])])})),m("tr",m("td",{colspan:2},b().component({className:"Button Button--block",onclick:function(){var e=p().store.createRecord("oauth-scopes");e.save({scope:"Scope."+j(8),resource_path:"/api/"+j(4),method:"GET"}).then((function(){t.scopes.push(e),t.showEditModal(e)}))}},p().translator.trans(this.translationPrefix+"add_button"))))])])]))},n.showEditModal=function(t){p().modal.show(L,{scope:t})},e}(k());const H=flarum.core.compat["common/components/Alert"];var U=t.n(H),I=function(t){function e(){return t.apply(this,arguments)||this}i(e,t);var n=e.prototype;return n.oninit=function(e){t.prototype.oninit.call(this,e),this.fields=["access_token","client_id","user_id","expires","scope"],this.values=this.fields.reduce((function(t,e){return t[e]=B()(""),t}),{})},n.className=function(){return"AddTokenModal"},n.title=function(){return p().translator.trans("foskym-oauth-center.admin.tokens.add_token")},n.content=function(){var t=this;return m("div",{className:"Modal-body"},m("form",{onsubmit:this.onsubmit.bind(this)},this.fields.map((function(e){return m("div",{className:"Form-group"},m("label",null,e),m("input",{className:"FormControl",bidi:t.values[e],required:"required"}))})),m("div",{className:"Form-group"},b().component({type:"submit",className:"Button Button--primary Button--block EditClientModal-save",loading:this.loading},p().translator.trans("core.admin.settings.submit_button")))))},n.onsubmit=function(t){var e=this;t.preventDefault(),this.loading=!0;var n=p().store.createRecord("oauth-tokens"),o=this.fields.reduce((function(t,n){return t[n]=e.values[n](),t}),{});n.save(o).then((function(){e.loading=!1,m.redraw(),e.hide()}))},e}(T()),J=function(t){function e(){for(var e,n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))||this).translationPrefix="foskym-oauth-center.admin.tokens.",e.scopes=[],e}i(e,t);var n=e.prototype;return n.oninit=function(e){t.prototype.oninit.call(this,e),this.fields=[]},n.view=function(){var t=this;return m("div",{class:"OAuthCenter-scopesPage"},[b().component({type:"button",className:"Button",onclick:function(){t.showAddModal()}},p().translator.trans("foskym-oauth-center.admin.tokens.add_token")),b().component({type:"button",className:"Button",onclick:function(){t.deleteExpiredTokens()}},p().translator.trans("foskym-oauth-center.admin.tokens.delete_token"))])},n.deleteExpiredTokens=function(){p().request({method:"DELETE",url:"/api/oauth-tokens/expired"}).then((function(){p().alerts.show(U(),{type:"success"},"success!")}))},n.showAddModal=function(){p().modal.show(I,{})},e}(k()),K=function(t){function e(){for(var e,n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))||this).translationPrefix="foskym-oauth-center.admin.page.",e.pages={index:F,clients:G,scopes:R,tokens:J},e}i(e,t);var n=e.prototype;return n.content=function(){var t=m.route.param().page||"index";return m("div",{className:"ExtensionPage-settings OAuthCenter"},m("div",{className:"oauth-menu"},m("div",{className:"container"},this.menuButtons(t))),m("div",{className:"container OAuthCenterPage-container"},this.pageContent(t)))},n.menuButtons=function(t){var e=this;return Object.keys(this.pages).map((function(n){return b().component({className:"Button "+(t===n?"item-selected":""),onclick:function(){return m.route.set(p().route("extension",{id:"foskym-oauth-center",page:n}))},icon:e.iconForPage(n)},p().translator.trans(e.translationPrefix+n))}))},n.iconForPage=function(t){switch(t){case"index":return"fas fa-home";case"clients":return"fas fa-network-wired";case"scopes":return"fas fa-user-lock";case"tokens":return"fas fa-key";default:return""}},n.pageContent=function(t){var e=this.pages[t];return e?m(e,null):null},e}(y());p().initializers.add("foskym/flarum-oauth-center",(function(){p().extensionData.for("foskym-oauth-center").registerPage(K).registerPermission({icon:"fas fa-user-friends",label:p().translator.trans("foskym-oauth-center.admin.permission.use_oauth"),permission:"foskym-oauth-center.use-oauth"},"view",95)}))})(),module.exports=e})();
//# sourceMappingURL=admin.js.map