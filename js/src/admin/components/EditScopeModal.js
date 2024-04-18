import app from 'flarum/admin/app';
import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Stream from 'flarum/common/utils/Stream';
import Select from 'flarum/common/components/Select';
import Checkbox from 'flarum/common/components/Checkbox';

export default class EditScopeModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);

    this.scope = this.attrs.scope;
    this.fields = [
      'scope',
      'resource_path',
      'method',
      'is_default',
      'scope_name',
      'scope_icon',
      'scope_desc',

      'visible_fields',
    ];

    this.values = this.fields.reduce((values, key) => {
      values[key] = Stream(this.scope[key]() || '');
      return values;
    }, {});
  }

  className() {
    return 'EditScopeModal Modal--large';
  }

  title() {
    return app.translator.trans('foskym-oauth-center.admin.scopes.edit_scope');
  }

  content() {
    return (
      <div className="Modal-body">
        <form onsubmit={this.onsubmit.bind(this)}>
          <div className="OAuthCenter-Columns">
            <div className="OAuthCenter-Column">
              {this.renderFormGroups(this.fields.slice(0, 4))}
            </div>
            <div className="OAuthCenter-Column">
              {this.renderFormGroups(this.fields.slice(4, 7))}
            </div>
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('foskym-oauth-center.admin.scopes.visible_fields')}</label>
            <textarea className="FormControl" bidi={this.values['visible_fields']} rows={3} placeholder={"id,username,email,data.attributes"}>
              {this.values.visible_fields()}
            </textarea>
          </div>

          <div className="Form-group">
            {Button.component({
              type: 'submit',
              className: 'Button Button--primary Button--block EditScopeModal-save',
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

    const scopeData = this.fields.reduce((data, key) => {
      data[key] = this.values[key]();
      return data;
    }, {});

    this.scope.save(scopeData).then(() => {
      this.loading = false;
      m.redraw();
      this.hide();
    });
  }

  renderFormGroups(fields) {
    return fields.map(key =>
      <div className={`Form-group${(key === 'method' || key === 'is_default') ? ' OAuthCenter-FormGroup-Column' : ''}`}>
        <label>{app.translator.trans('foskym-oauth-center.admin.scopes.' + key)}</label>
        {key === 'method' ? Select.component({
          options: {
            'GET': 'GET',
            'POST': 'POST',
            'PUT': 'PUT',
            'DELETE': 'DELETE',
            'PATCH': 'PATCH',
          },
          value: this.values[key](),
          disabled: this.scope.resource_path() === '/api/user' && key === 'method',
          onchange: this.values[key],
        }) : key === 'is_default' ? Checkbox.component({
          className: 'OAuthCenter-Checkbox',
          state: this.values[key]() === 1 || false,
          disabled: this.scope.resource_path() === '/api/user' && key === 'is_default',
          onchange: (checked) => this.values[key](checked ? 1 : 0),
        }) : <input className="FormControl" bidi={this.values[key]} disabled={this.scope.resource_path() === '/api/user' && key === 'resource_path'}/>}
      </div>
    )
  }
}
