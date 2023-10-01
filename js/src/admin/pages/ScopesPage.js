import app from 'flarum/admin/app';
import Page from 'flarum/common/components/Page';
import Button from 'flarum/common/components/Button';
import Select from 'flarum/common/components/Select';
import CheckBox from 'flarum/common/components/Checkbox';

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
                      onchange: (event) => {
                        this.saveScopeInfo(index, key, event.target.value);
                      },
                    }) : key === 'is_default' ? CheckBox.component({
                      state: scope[key]() || false,
                      onchange: (event) => {
                        this.saveScopeInfo(index, key, event.target.checked ? 1 : 0);
                      },
                    }) : m('input.FormControl', {
                      type: 'text',
                      value: scope[key]() || '',
                      onchange: (event) => {
                        this.saveScopeInfo(index, key, event.target.value);
                      },
                    }))
                  ),
                  m('td', Button.component({
                    className: 'Button Button--icon',
                    icon: 'fas fa-times',
                    onclick: () => {
                      this.scopes[index].delete();
                      this.scopes.splice(index, 1);

                    },
                  })),
                ])),
                m('tr', m('td', {
                  colspan: 7,
                }, Button.component({
                  className: 'Button Button--block',
                  onclick: () => {
                    const scope = app.store.createRecord('oauth-scopes');
                    scope.save({}).then(this.scopes.push(scope));
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
    console.log(index, key, value);
    this.scopes[index].save({
      [key]: value,
    });
  }
}
