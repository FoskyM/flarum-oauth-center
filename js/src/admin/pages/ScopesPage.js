import app from 'flarum/admin/app';
import Page from 'flarum/common/components/Page';
import Button from 'flarum/common/components/Button';
import Select from 'flarum/common/components/Select';
import Checkbox from 'flarum/common/components/Checkbox';

export default class ScopesPage extends Page {
  translationPrefix = 'foskym-oauth-center.admin.scopes.';
  scopes = [];

  oninit(vnode) {
    super.oninit(vnode);

    this.fields = [
      'scope',
      'resource_path',
      'method',
      'is_default',
      'scope_name',
      'scope_icon',
      'scope_desc'
    ];

    app.store.find('oauth-scopes').then(r => {
      this.scopes = r;
      this.fields.map(key => console.log(this.scopes[0][key]))
      m.redraw();
    });
  }

  view() {
    return (
      <div class={"OAuthCenter-scopesPage"}>
        {
          m('.Form-group', [
            m('table', [
              m('thead', m('tr', [
                this.fields.map(key => m('th', app.translator.trans(this.translationPrefix + key))),
                m('th'),
              ])),
              m('tbody', [
                this.scopes.map((scope, index) => m('tr', [
                  this.fields.map(key =>
                    m('td', key === 'method' ? Select.component({
                      options: {
                        'GET': 'GET',
                        'POST': 'POST',
                        'PUT': 'PUT',
                        'DELETE': 'DELETE',
                        'PATCH': 'PATCH',
                      },
                      value: scope[key]() || 'GET',
                      disabled: scope.resource_path() === '/api/user' && key === 'method',
                      onchange: (value) => {
                        this.saveScopeInfo(index, key, value);
                      },
                    }) : key === 'is_default' ? Checkbox.component({
                      state: scope[key]() === 1 || false,
                      disabled: scope.resource_path() === '/api/user' && key === 'is_default',
                      onchange: (checked) => {
                        this.scopes[index].is_default((this.scopes[index].is_default() + 1) % 2)
                        this.saveScopeInfo(index, key, checked ? 1 : 0);
                      },
                    }) : m('input.FormControl', {
                      type: 'text',
                      value: scope[key]() || '',
                      disabled: scope.resource_path() === '/api/user' && key === 'resource_path',
                      onchange: (event) => {
                        this.saveScopeInfo(index, key, event.target.value);
                      },
                    }))
                  ),
                  (scope.resource_path() !== '/api/user' && m('td', Button.component({
                    className: 'Button Button--icon',
                    icon: 'fas fa-times',
                    onclick: () => {
                      this.scopes[index].delete();
                      this.scopes.splice(index, 1);
                    },
                  }))),
                ])),
                m('tr', m('td', {
                  colspan: 7,
                }, Button.component({
                  className: 'Button Button--block',
                  onclick: () => {
                    const scope = app.store.createRecord('oauth-scopes');
                    scope.save({
                      'scope': 'Scope.' + this.randomString(8),
                      'resource_path': '/api/' + this.randomString(4),
                      'method': 'GET',
                    }).then(this.scopes.push(scope));
                  },
                }, app.translator.trans(this.translationPrefix + 'add_button')))),
              ]),
            ]),
          ])
        }
      </div>
    );
  }
  saveScopeInfo(index, key, value) {
    this.scopes[index].save({
      [key]: value,
    });
  }
}
