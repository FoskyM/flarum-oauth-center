import Model from 'flarum/common/Model';

export default class Scope extends Model {
  scope = Model.attribute('scope');
  resource_path = Model.attribute('resource_path');
  method = Model.attribute('method');
  is_default = Model.attribute('is_default');
  scope_name = Model.attribute('scope_name');
  scope_icon = Model.attribute('scope_icon');
  scope_desc = Model.attribute('scope_desc');
}
