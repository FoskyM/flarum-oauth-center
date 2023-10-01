(()=>{var t={n:e=>{var o=e&&e.__esModule?()=>e.default:()=>e;return t.d(o,{a:o}),o},d:(e,o)=>{for(var r in o)t.o(o,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:o[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};(()=>{"use strict";t.r(e),t.d(e,{extend:()=>l});const o=flarum.core.compat["common/extenders"];var r=t.n(o);function n(t,e){return n=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},n(t,e)}function a(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,n(t,e)}const i=flarum.core.compat["common/Model"];var s=t.n(i),c=function(t){function e(){for(var e,o=arguments.length,r=new Array(o),n=0;n<o;n++)r[n]=arguments[n];return(e=t.call.apply(t,[this].concat(r))||this).client_id=s().attribute("client_id"),e.client_secret=s().attribute("client_secret"),e.redirect_uri=s().attribute("redirect_uri"),e.grant_types=s().attribute("grant_types"),e.scope=s().attribute("scope"),e.user_id=s().attribute("user_id"),e.client_name=s().attribute("client_name"),e.client_icon=s().attribute("client_icon"),e.client_desc=s().attribute("client_desc"),e.client_home=s().attribute("client_home"),e}return a(e,t),e}(s()),u=function(t){function e(){for(var e,o=arguments.length,r=new Array(o),n=0;n<o;n++)r[n]=arguments[n];return(e=t.call.apply(t,[this].concat(r))||this).scope=s().attribute("scope"),e.resource_path=s().attribute("resource_path"),e.method=s().attribute("method"),e.is_default=s().attribute("is_default"),e.scope_name=s().attribute("scope_name"),e.scope_icon=s().attribute("scope_icon"),e.scope_desc=s().attribute("scope_desc"),e}return a(e,t),e}(s());const l=[(new(r().Store)).add("oauth-clients",c).add("oauth-scopes",u)],p=flarum.core.compat["forum/app"];var h=t.n(p);const d=flarum.core.compat["common/extend"],f=flarum.core.compat["forum/components/UserPage"];var _=t.n(f);const y=flarum.core.compat["common/components/LinkButton"];var b=t.n(y);flarum.core.compat["common/components/Page"];const v=flarum.core.compat["forum/components/IndexPage"];var g=t.n(v);const x=flarum.core.compat["forum/components/LogInModal"];var z=t.n(x);const O=flarum.core.compat["common/utils/extractText"];var k=t.n(O);const w=flarum.core.compat["common/components/Tooltip"];var P=t.n(w);const j=flarum.core.compat["common/components/Button"];var T=t.n(j),S=function(t){function e(){for(var e,o=arguments.length,r=new Array(o),n=0;n<o;n++)r[n]=arguments[n];return(e=t.call.apply(t,[this].concat(r))||this).params=[],e.client=null,e.scopes=null,e.client_scope=[],e.loading=!0,e.is_authorized=!1,e}a(e,t);var o=e.prototype;return o.oninit=function(e){var o=this;t.prototype.oninit.call(this,e),h().session.user||setTimeout((function(){return h().modal.show(z())}),500);var r=m.route.param();null==r.client_id||null==r.response_type||null==r.redirect_uri?m.route.set("/"):(this.params=r,h().store.find("oauth-clients",r.client_id).then((function(t){if(0===t.length)m.route.set("/");else{o.client=t[0];var e=null;e=o.client.redirect_uri().indexOf(" ")>-1?o.client.redirect_uri().split(" "):[o.client.redirect_uri()],h().forum.attribute("foskym-oauth-center.require_exact_redirect_uri")&&-1==e.indexOf(r.redirect_uri)&&m.route.set("/"),h().forum.attribute("foskym-oauth-center.allow_implicit")&&"token"==r.response_type&&m.route.set("/"),h().forum.attribute("foskym-oauth-center.enforce_state")&&null==r.enforce_state&&m.route.set("/"),h().store.find("oauth-scopes").then((function(t){o.scopes=t;var e=r.scope;null==r.scope&&(e=o.client.scope());var n=[];n=null==e?[]:e.indexOf(" ")>-1?e.split(" "):[e];var a=[];o.scopes.map((function(t){1===t.is_default()&&a.push(t)})),n=n.concat(a),o.client_scope=n.filter((function(t,e){return n.indexOf(t)===e})),console.log(o.client_scope),o.loading=!1,m.redraw()}))}})))},o.setTitle=function(){h().setTitle(k()(h().translator.trans("foskym-oauth-center.forum.page.title.authorize"))),h().setTitleCount(0)},o.view=function(){var t=this;return this.client?!this.loading&&m("div",{className:"AuthorizePage"},m("div",{className:"container"},m("div",{class:"oauth-area"},m("div",{class:"oauth-main"},m("div",{class:"oauth-box oauth-header"},m("h2",null,h().forum.attribute("title")),m("p",null,h().translator.trans("foskym-oauth-center.forum.authorize.access")," ",m("a",{href:this.client.client_home(),target:"_blank"},this.client.client_name()))),m("div",{class:"oauth-box oauth-body"},m("div",{class:"oauth-top"},m("img",{src:h().forum.attribute("faviconUrl")}),m("i",{class:"fas fa-exchange-alt fa-2x"}),m(P(),{text:this.client.client_desc()},m("img",{src:this.client.client_icon()}))),m("div",{class:"oauth-scope-area"},this.client_scope.length>0&&this.client_scope.map((function(e){var o=null;return t.scopes.map((function(t){t.scope()===e.scope()&&(o=t)})),null==o?"":m("div",{class:"oauth-scope"},m("div",{class:"oauth-scope-left"},o.scope_icon().indexOf("fa-")>-1?m("i",{class:"oauth-scope-object fa-2x "+o.scope_icon(),style:"margin-left:2px;color:#000"}):m("img",{class:"oauth-scope-object",src:o.scope_icon(),style:"width:32px"})),m("div",{class:"oauth-scope-body"},m("h6",{class:"oauth-scope-heading"},o.scope_name()),m("small",null,o.scope_desc().replace("{client_name}",t.client.client_name()).replace("{user}",h().session.user.attribute("displayName")))))}))),m("form",{class:"oauth-form",method:"post",id:"form",onsubmit:this.onsubmit.bind(this)},m("input",{type:"hidden",name:"is_authorized",value:this.is_authorized}),m("div",{style:"display: flex; margin-top: 15px",class:"oauth-form-item"},m(T(),{className:"Button",type:"submit",style:"width: 50%;",onclick:this.is_authorized=!1},h().translator.trans("foskym-oauth-center.forum.authorize.deny")),m(T(),{className:"Button Button--primary",type:"submit",style:"width: 50%;",onclick:this.is_authorized=!0},h().translator.trans("foskym-oauth-center.forum.authorize.agree"))))))))):""},o.onsubmit=function(t){t.preventDefault(),h().request({method:"POST",url:"/oauth/authorize",body:{response_type:this.params.response_type,client_id:this.params.client_id,redirect_uri:this.params.redirect_uri,state:this.params.state,scope:this.params.scope,is_authorized:this.is_authorized}}).then((function(t){return console.log(t)}))},e}(g()),N=function(t){function e(){return t.apply(this,arguments)||this}a(e,t);var o=e.prototype;return o.oninit=function(e){t.prototype.oninit.call(this,e),this.loadUser(m.route.param("username"))},o.content=function(){return m("div",{className:"AuthorizedPage"})},e}(_());h().initializers.add("foskym/flarum-oauth-center",(function(){h().routes["oauth.authorize"]={path:"/oauth/authorize",component:S},h().routes["user.authorized"]={path:"/u/:username/authorized",component:N},(0,d.extend)(_().prototype,"navItems",(function(t){h().session.user&&h().session.user.id()===this.user.id()&&t.add("authorized",b().component({href:h().route("user.authorized",{username:this.user.username()}),icon:"fas fa-user-friends"},[h().translator.trans("foskym-oauth-center.forum.page.label.authorized")]),-110)}))}))})(),module.exports=e})();
//# sourceMappingURL=forum.js.map