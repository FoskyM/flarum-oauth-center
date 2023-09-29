import Model from 'flarum/common/Model';

export default class Client extends Model {
  client_id = Model.attribute('client_id');
  client_secret = Model.attribute('client_secret');
  redirect_uri = Model.attribute('redirect_uri');
  grant_types = Model.attribute('grant_types');
  scope = Model.attribute('scope');
  user_id = Model.attribute('user_id');
  client_name = Model.attribute('client_name');
  client_icon = Model.attribute('client_icon');
  client_desc = Model.attribute('client_desc');
  client_home = Model.attribute('client_home');
}
