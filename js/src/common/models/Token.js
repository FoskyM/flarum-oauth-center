import Model from 'flarum/common/Model';

export default class Token extends Model {
  access_token = Model.attribute('access_token');
  client_id = Model.attribute('client_id');
  user_id = Model.attribute('user_id');
  expires = Model.attribute('expires', Model.transformDate);
  scope = Model.attribute('scope');
}
