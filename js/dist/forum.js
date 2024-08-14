(()=>{var t={n:e=>{var o=e&&e.__esModule?()=>e.default:()=>e;return t.d(o,{a:o}),o},d:(e,o)=>{for(var r in o)t.o(o,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:o[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};(()=>{"use strict";t.r(e),t.d(e,{extend:()=>h});const o=flarum.core.compat["common/extenders"];var r=t.n(o);function n(t,e){return n=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},n(t,e)}function a(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,n(t,e)}const i=flarum.core.compat["common/Model"];var s=t.n(i),c=function(t){function e(){for(var e,o=arguments.length,r=new Array(o),n=0;n<o;n++)r[n]=arguments[n];return(e=t.call.apply(t,[this].concat(r))||this).client_id=s().attribute("client_id"),e.client_secret=s().attribute("client_secret"),e.redirect_uri=s().attribute("redirect_uri"),e.grant_types=s().attribute("grant_types"),e.scope=s().attribute("scope"),e.user_id=s().attribute("user_id"),e.client_name=s().attribute("client_name"),e.client_icon=s().attribute("client_icon"),e.client_desc=s().attribute("client_desc"),e.client_home=s().attribute("client_home"),e}return a(e,t),e}(s()),u=function(t){function e(){for(var e,o=arguments.length,r=new Array(o),n=0;n<o;n++)r[n]=arguments[n];return(e=t.call.apply(t,[this].concat(r))||this).scope=s().attribute("scope"),e.resource_path=s().attribute("resource_path"),e.method=s().attribute("method"),e.visible_fields=s().attribute("visible_fields"),e.is_default=s().attribute("is_default"),e.scope_name=s().attribute("scope_name"),e.scope_icon=s().attribute("scope_icon"),e.scope_desc=s().attribute("scope_desc"),e}return a(e,t),e}(s()),l=function(t){function e(){for(var e,o=arguments.length,r=new Array(o),n=0;n<o;n++)r[n]=arguments[n];return(e=t.call.apply(t,[this].concat(r))||this).client=s().hasOne("client"),e.user_id=s().attribute("user_id"),e.authorized_at=s().attribute("authorized_at",s().transformDate),e}return a(e,t),e}(s()),d=function(t){function e(){for(var e,o=arguments.length,r=new Array(o),n=0;n<o;n++)r[n]=arguments[n];return(e=t.call.apply(t,[this].concat(r))||this).access_token=s().attribute("access_token"),e.client_id=s().attribute("client_id"),e.user_id=s().attribute("user_id"),e.expires=s().attribute("expires",s().transformDate),e.scope=s().attribute("scope"),e}return a(e,t),e}(s());const h=[(new(r().Store)).add("oauth-clients",c).add("oauth-scopes",u).add("oauth-records",l).add("oauth-tokens",d)],p=flarum.core.compat["forum/app"];var f=t.n(p);const _=flarum.core.compat["common/extend"],b=flarum.core.compat["forum/components/UserPage"];var y=t.n(b);const v=flarum.core.compat["common/components/LinkButton"];var g=t.n(v);function z(){return z=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(t[r]=o[r])}return t},z.apply(this,arguments)}flarum.core.compat["common/components/Page"];const k=flarum.core.compat["forum/components/IndexPage"];var x=t.n(k);const w=flarum.core.compat["forum/components/LogInModal"];var O=t.n(w);const N=flarum.core.compat["common/utils/extractText"];var A=t.n(N);const P=flarum.core.compat["common/components/Tooltip"];var j=t.n(P);const R=flarum.core.compat["common/components/Button"];var T=t.n(R);const S=flarum.core.compat["common/components/LoadingIndicator"];var B=t.n(S);const M=flarum.core.compat["common/helpers/avatar"];var I=t.n(M);const L=flarum.core.compat["common/Component"];var q=function(t){function e(){return t.apply(this,arguments)||this}return a(e,t),e.prototype.view=function(){var t=this.attrs,e=t.scope,o=t.client;return m("div",{class:"oauth-scope"},m("div",{class:"oauth-scope-left"},e.scope_icon().indexOf("fa-")>-1?m("i",{class:"oauth-scope-object fa-2x "+e.scope_icon(),style:"margin-left:2px;"}):m("img",{class:"oauth-scope-object",src:e.scope_icon(),style:"width:32px"})),m("div",{class:"oauth-scope-body"},m("h6",{class:"oauth-scope-heading"},e.scope_name()),m("small",null,e.scope_desc().replace("{client_name}",o.client_name()).replace("{user}",f().session.user.attribute("displayName")))))},e}(t.n(L)()),D=function(t){function e(){for(var e,o=arguments.length,r=new Array(o),n=0;n<o;n++)r[n]=arguments[n];return(e=t.call.apply(t,[this].concat(r))||this).params=[],e.client=null,e.scopes=null,e.client_scope=[],e.loading=!0,e.is_authorized=!1,e.submit_loading=!1,e.display_mode="box",e}a(e,t);var o=e.prototype;return o.oninit=function(e){var o=this;t.prototype.oninit.call(this,e),f().session.user||setTimeout((function(){return f().modal.show(O())}),500),this.display_mode=f().forum.attribute("foskym-oauth-center.display_mode")||"box";var r=m.route.param();null!=r.client_id&&null!=r.response_type&&null!=r.redirect_uri?(this.params=r,Promise.all([f().store.find("oauth-clients",r.client_id),f().store.find("oauth-scopes")]).then((function(t){var e=t[0],n=t[1];if(e){o.client=e,o.scopes=n;var a=o.client.redirect_uri().split(" ");if(!f().forum.attribute("foskym-oauth-center.require_exact_redirect_uri")||a.includes(r.redirect_uri))if(f().forum.attribute("foskym-oauth-center.allow_implicit")||"token"!==r.response_type)if(f().forum.attribute("foskym-oauth-center.enforce_state")&&null==r.state)m.route.set("/");else{var i=r.scope?r.scope.split(" "):(o.client.scope()||"").split(" "),s=o.scopes.filter((function(t){return 1===t.is_default()})).map((function(t){return t.scope()}));o.client_scope=i.filter((function(t,e){return i.indexOf(t)===e})),o.client_scope=o.client_scope.concat(s).filter((function(t){return""!==t})),o.loading=!1,m.redraw()}else m.route.set("/");else m.route.set("/")}else m.route.set("/")}))):m.route.set("/")},o.setTitle=function(){f().setTitle(A()(f().translator.trans("foskym-oauth-center.forum.page.title.authorize"))),f().setTitleCount(0)},o.view=function(){var t=this;return!this.client||this.loading?m(B(),null):m("div",{className:"AuthorizePage"},m("div",{className:"container"},m("div",{class:"oauth-area"},m("div",{class:"oauth-main oauth-"+this.display_mode},m("div",{class:"oauth-header"},m("h2",null,f().forum.attribute("title")),m("p",null,f().translator.trans("foskym-oauth-center.forum.authorize.access")," ",m(j(),{text:this.client.client_desc(),position:"bottom"},m("a",{href:this.client.client_home(),target:"_blank"},this.client.client_name())))),m("div",{class:"oauth-body"},m("div",{class:"oauth-user"},I()(f().session.user,{className:"oauth-avatar"}),m("div",{class:"oauth-username"},m("b",null,f().session.user.username()),m("span",null,f().session.user.displayName()))),m("div",{class:"oauth-info"},m(j(),{text:f().forum.attribute("title")},m("img",{src:f().forum.attribute("faviconUrl"),alt:"favicon"})),m("i",{class:"fas fa-exchange-alt fa-2x"}),m(j(),{text:this.client.client_desc()},m("img",{src:this.client.client_icon(),alt:"client_icon"})),m("span",null,this.client.client_name())),m("div",{class:"oauth-scope-area"},m("h3",null,f().translator.trans("foskym-oauth-center.forum.authorize.require_these_scopes")),this.client_scope.filter((function(t){return t})).map((function(e){var o=t.scopes.find((function(t){return t.scope()===e}));return o&&m(q,{scope:o,client:t.client})}))),m("form",{class:"oauth-form",method:"post",id:"form",action:"/oauth/authorize",onsubmit:this.onsubmit.bind(this)},Object.keys(this.params).map((function(e){return m("input",{type:"hidden",name:e,value:t.params[e]})})),m("input",{type:"hidden",name:"is_authorized",value:this.is_authorized}),m("div",{class:"oauth-form-item oauth-btn-group"},m(T(),{className:"Button",type:"submit",style:"width: 50%;",onclick:this.deny.bind(this),loading:this.submit_loading},f().translator.trans("foskym-oauth-center.forum.authorize.deny")),m(T(),{className:"Button Button--primary",type:"submit",style:"width: 50%;",onclick:this.agree.bind(this),loading:this.submit_loading},f().translator.trans("foskym-oauth-center.forum.authorize.agree")))))))))},o.deny=function(t){this.is_authorized=!1},o.agree=function(t){this.is_authorized=!0},o.onsubmit=function(t){t.preventDefault(),this.submit_loading=!0,f().forum.attribute("foskym-oauth-center.authorization_method_fetch")?f().request({method:"POST",url:"/oauth/authorize/fetch",body:z({},this.params,{is_authorized:this.is_authorized})}).then((function(t){window.location.href=t.location})):t.target.submit()},e}(x());const U=flarum.core.compat["common/components/Placeholder"];var C=t.n(U),E=function(t){function e(){for(var e,o=arguments.length,r=new Array(o),n=0;n<o;n++)r[n]=arguments[n];return(e=t.call.apply(t,[this].concat(r))||this).records=[],e.loading=!0,e.nomore=!1,e.page=0,e}a(e,t);var o=e.prototype;return o.oninit=function(e){t.prototype.oninit.call(this,e),this.loadUser(m.route.param("username")),this.loadRecords()},o.loadRecords=function(){var t=this;f().store.find("oauth-records",{page:this.page}).then((function(e){t.records=t.records.concat(e),t.loading=!1,e.length<10&&(t.nomore=!0),m.redraw()}))},o.loadMore=function(){this.loadRecords(this.page+=1)},o.content=function(){var t=this;return 0===this.records.length?m(C(),{text:f().translator.trans("foskym-oauth-center.forum.authorized.no_records")}):m("div",{className:"AuthorizedPage"},m("ul",{className:"AuthorizedRecords"},this.records.map((function(t){return m("li",{className:"AuthorizedRecord"},m("div",{className:"AuthorizedRecord-content"},m("div",{className:"AuthorizedRecord-left"},m("img",{className:"AuthorizedRecord-icon",src:t.attribute("client").client_icon,alt:"client_icon"}),m("div",{className:"AuthorizedRecord-info"},m("h3",null,m("a",{href:t.attribute("client").client_home,target:"_blank"},t.attribute("client").client_name)),m("p",null,t.attribute("client").client_desc))),m("div",{className:"AuthorizedRecord-right"},m("time",null,t.authorized_at().toLocaleString()))),m("hr",null))}))),this.loading&&m(B(),{display:"block"}),!this.loading&&!this.nomore&&m("div",{style:"text-align:center;padding:20px"},m(T(),{className:"Button Button--primary",disabled:this.loading,loading:this.loading,onclick:function(){return t.loadMore()}},f().translator.trans("foskym-oauth-center.forum.authorized.load_more"))),this.nomore&&m(C(),{text:f().translator.trans("foskym-oauth-center.forum.authorized.no_more_records")}))},e}(y());f().initializers.add("foskym/flarum-oauth-center",(function(){f().routes["oauth.authorize"]={path:"/oauth/authorize",component:D},f().routes["user.authorized"]={path:"/u/:username/authorized",component:E},(0,_.extend)(y().prototype,"navItems",(function(t){f().session.user&&f().session.user.id()===this.user.id()&&t.add("authorized",g().component({href:f().route("user.authorized",{username:this.user.username()}),icon:"fas fa-user-friends"},[f().translator.trans("foskym-oauth-center.forum.page.label.authorized")]),-110)}))}))})(),module.exports=e})();
//# sourceMappingURL=forum.js.map