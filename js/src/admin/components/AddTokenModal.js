import app from 'flarum/admin/app';
import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Stream from 'flarum/common/utils/Stream';
export default class AddTokenModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);

    this.fields = [
      'access_token',
      'client_id',
      'user_id',
      'expires',
      'scope'
    ];

    this.values = this.fields.reduce((values, key) => {
      values[key] = Stream('');
      return values;
    }, {});
  }

  className() {
    return 'AddTokenModal';
  }

  title() {
    return app.translator.trans('foskym-oauth-center.admin.tokens.add_token');
  }

  content() {
    return (
      <div className="Modal-body">
        <form onsubmit={this.onsubmit.bind(this)}>
          {this.fields.map(key =>
            <div className="Form-group">
              <label>{key}</label>
              <input className="FormControl" bidi={this.values[key]} required="required"/>
            </div>
          )}
          <div className="Form-group">
            {Button.component({
              type: 'submit',
              className: 'Button Button--primary Button--block EditClientModal-save',
              loading: this.loading,
            }, app.translator.trans('core.admin.settings.submit_button'))}
          </div>
        </form>
      </div>
    );
  }

  onsubmit(e) {
    e.preventDefault();
    this.loading = true;

    const token = app.store.createRecord('oauth-tokens');

    const tokenData = this.fields.reduce((data, key) => {
      data[key] = this.values[key]();
      return data;
    }, {});

    token.save(tokenData).then(() => {
      this.loading = false;
      m.redraw();
      this.hide();
    });
  }
}
