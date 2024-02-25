import Model from 'flarum/common/Model';

export default class Record extends Model {
  client = Model.hasOne('client');
  user_id = Model.attribute('user_id');
  authorized_at = Model.attribute('authorized_at', Model.transformDate);
}
