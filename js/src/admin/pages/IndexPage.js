import app from 'flarum/admin/app';
import Page from 'flarum/common/components/Page';
import FieldSet from 'flarum/common/components/FieldSet';
import Button from 'flarum/common/components/Button';
import saveSettings from 'flarum/admin/utils/saveSettings';
import Stream from 'flarum/common/utils/Stream';
import Select from 'flarum/common/components/Select';
import Switch from 'flarum/common/components/Switch';

export default class IndexPage extends Page {
  oninit(vnode) {
    super.oninit(vnode);

    this.saving = false;

    this.fields = [
      'access_lifetime',

      'allow_implicit',
      'enforce_state',
      'require_exact_redirect_uri',
      'authorization_method_fetch',
    ];
    const settings = app.data.settings;
    this.values = this.fields.reduce((values, key) => {
      key = 'foskym-oauth-center.' + key;
      values[key] = Stream(settings[key] || "");
      return values;
    }, {});

    for (let i = 1; i < this.fields.length; i++) {
      this.values['foskym-oauth-center.' + this.fields[i]] = settings['foskym-oauth-center.' + this.fields[i]] === '1';
    }
  }

  view() {
    return (
      <div>
        <form onsubmit={this.onsubmit.bind(this)} className="BasicsPage">
          {this.fields.slice(1).map(field =>
            FieldSet.component({}, [
              <div style="height: 5px;"></div>,
              Switch.component({
                state: this.values['foskym-oauth-center.' + field],
                onchange: (value) => this.saveSingleSetting(field, value),
                loading: this.saving,
              }, app.translator.trans(`foskym-oauth-center.admin.settings.${field}`))
            ])
          )}
          <hr/>
          {FieldSet.component({}, [
            <input className="FormControl" bidi={this.values['foskym-oauth-center.' + this.fields[0]]}
                   placeholder={app.translator.trans(`foskym-oauth-center.admin.settings.${this.fields[0]}`)} required/>,
            <div className="helpText">
              {app.translator.trans(`foskym-oauth-center.admin.settings.${this.fields[0]}`)}
            </div>,
            Button.component({
              type: 'submit',
              className: 'Button Button--primary',
              loading: this.saving
            }, app.translator.trans('core.admin.settings.submit_button'))
          ])}
        </form>
      </div>
    );
  }

  saveSingleSetting(setting, value) {
    if (this.saving) return;

    this.saving = true;

    this.values['foskym-oauth-center.' + setting] = value;

    saveSettings({ ['foskym-oauth-center.' + setting]: value })
      .then(() => app.alerts.show({type: 'success'}, app.translator.trans('core.admin.settings.saved_message')))
      .catch(() => {})
      .finally(() => {
        this.saving = false;
        m.redraw();
      });
  }

  onsubmit(e) {
    e.preventDefault();

    if (this.saving) return;

    this.saving = true;

    const settings = {};

    settings['foskym-oauth-center.access_lifetime'] = this.values['foskym-oauth-center.access_lifetime']();

    if (settings['foskym-oauth-center.access_lifetime'] === "") {
      settings['foskym-oauth-center.access_lifetime'] = 3600;
    }

    saveSettings(settings)
      .then(() => app.alerts.show({type: 'success'}, app.translator.trans('core.admin.settings.saved_message')))
      .catch(() => {})
      .finally(() => {
        this.saving = false;
        m.redraw();
      });
  }
}
