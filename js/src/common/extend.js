import Extend from 'flarum/common/extenders';
import Client from "./models/Client";
import Scope from "./models/Scope";
import Record from "./models/Record";

export default [
  new Extend.Store()
    .add('oauth-clients', Client)
    .add('oauth-scopes', Scope)
    .add('oauth-records', Record),
];
