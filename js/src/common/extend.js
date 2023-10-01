import Extend from 'flarum/common/extenders';
import Client from "./models/Client";
import Scope from "./models/Scope";

export default [
  new Extend.Store()
    .add('oauth-clients', Client)
    .add('oauth-scopes', Scope),
];
