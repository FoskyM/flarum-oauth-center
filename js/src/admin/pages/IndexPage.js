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
      'foskym-oauth-center.access_lifetime',
      'foskym-oauth-center.allow_implicit',
      'foskym-oauth-center.enforce_state',
      'foskym-oauth-center.require_exact_redirect_uri'
    ];
    this.values = {};

    const settings = app.data.settings;
    this.fields.forEach(key => this.values[key] = Stream(settings[key] || ""));

    for (let i = 1; i < this.fields.length; i++) {
      this.values[this.fields[i]] = settings[this.fields[i]] === '1';
    }
  }

  view() {
    return (
      <div>
        <form onsubmit={this.onsubmit.bind(this)} className="BasicsPage">
          {FieldSet.component({}, [
            <div style="height: 5px;"></div>,
            Switch.component({
              state: this.values['foskym-oauth-center.allow_implicit'],
              onchange: (value) => this.saveSingleSetting('foskym-oauth-center.allow_implicit', value),
              loading: this.saving,
            }, app.translator.trans('foskym-oauth-center.admin.settings.allow_implicit')),
          ])}

          {FieldSet.component({}, [
            <div style="height: 5px;"></div>,
            Switch.component({
              state: this.values['foskym-oauth-center.enforce_state'],
              onchange: (value) => this.saveSingleSetting('foskym-oauth-center.enforce_state', value),
              loading: this.saving,
            }, app.translator.trans('foskym-oauth-center.admin.settings.enforce_state')),
          ])}

          {FieldSet.component({}, [
            <div style="height: 5px;"></div>,
            Switch.component({
              state: this.values['foskym-oauth-center.require_exact_redirect_uri'],
              onchange: (value) => this.saveSingleSetting('foskym-oauth-center.require_exact_redirect_uri', value),
              loading: this.saving,
            }, app.translator.trans('foskym-oauth-center.admin.settings.require_exact_redirect_uri')),
          ])}
          <hr/>
          {FieldSet.component({}, [
            <input className="FormControl" bidi={this.values['foskym-oauth-center.access_lifetime']}
                   placeholder={app.translator.trans('foskym-oauth-center.admin.settings.access_lifetime')} required/>,
            <div className="helpText">
              {app.translator.trans('foskym-oauth-center.admin.settings.access_lifetime')}
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

    this.values[setting] = value;

    let data = {};
    data[setting] = value;

    saveSettings(data)
      .then(() => app.alerts.show({type: 'success'}, app.translator.trans('core.admin.settings.saved_message')))
      .catch(() => {
      })
      .then(() => {
        this.saving = false;
        m.redraw();
      });
  }

  onsubmit(e) {
    e.preventDefault();

    if (this.saving) return;

    this.saving = true;
    app.alerts.dismiss(this.successAlert);

    const settings = {};

    settings['foskym-oauth-center.access_lifetime'] = this.values['foskym-oauth-center.access_lifetime']();

    // this.fields.forEach(key => {
    //   settings[key] = this.values[key]()
    //
    // });

    if (settings['foskym-oauth-center.access_lifetime'] === "") {
      settings['foskym-oauth-center.access_lifetime'] = 3600;
    }

    saveSettings(settings)
      .then(() => app.alerts.show({type: 'success'}, app.translator.trans('core.admin.settings.saved_message')))
      .catch(() => {
      })
      .then(() => {
        this.saving = false;
        m.redraw();
      });
  }
}
