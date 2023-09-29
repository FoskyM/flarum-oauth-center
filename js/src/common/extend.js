import Extend from 'flarum/common/extenders';
import Client from "./models/Client";

export default [
  new Extend.Store()
    .add('oauth-clients', Client),
];
