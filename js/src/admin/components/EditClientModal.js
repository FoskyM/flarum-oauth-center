import app from 'flarum/admin/app';
import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Stream from 'flarum/common/utils/Stream';
export default class EditClientModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);

    this.client = this.attrs.client;
    this.fields = [
      'client_id',
      'client_secret',
      'redirect_uri',
      'grant_types',
      'scope',
      'client_name',
      'client_desc',
      'client_icon',
      'client_home'
    ];

    this.values = this.fields.reduce((values, key) => {
      values[key] = Stream(this.client[key]() || '');
      return values;
    }, {});
  }

  className() {
    return 'EditClientModal Modal--small';
  }

  title() {
    return app.translator.trans('foskym-oauth-center.admin.clients.edit_client');
  }

  content() {
    return (
      <div className="Modal-body">
        <form onsubmit={this.onsubmit.bind(this)}>
          {this.fields.map(key =>
            <div className="Form-group">
              <label>{app.translator.trans('foskym-oauth-center.admin.clients.' + key)}</label>
              <input className="FormControl" bidi={this.values[key]} />
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

    const clientData = this.fields.reduce((data, key) => {
      data[key] = this.values[key]();
      return data;
    }, {});

    this.client.save(clientData).then(() => {
      this.loading = false;
      m.redraw();
      this.hide();
    });
  }
}
