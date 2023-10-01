import Model from 'flarum/common/Model';

export default class Client extends Model {
  scope = Model.attribute('scope');
  is_default = Model.attribute('is_default', value => value === 1);
  scope_name = Model.attribute('scope_name');
  scope_icon = Model.attribute('scope_icon');
  scope_desc = Model.attribute('scope_desc');
}