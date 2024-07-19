import app from 'flarum/admin/app';
import Page from 'flarum/common/components/Page';
import Button from 'flarum/common/components/Button';
import {randomString} from "../../common/utils/randomString";
import EditScopeModal from "../components/EditScopeModal";

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
                ['scope', 'scope_name'].map(key => m('th', app.translator.trans(this.translationPrefix + key))),
                m('th'),
              ])),
              m('tbody', [
                this.scopes.map((scope, index) => m('tr', [
                  ['scope', 'scope_name'].map(key =>
                    m('td', scope[key]())
                  ),
                  m('td', [
                    Button.component({
                      className: 'Button Button--icon',
                      icon: 'fas fa-edit',
                      onclick: () => this.showEditModal(scope),
                    }),
                    Button.component({
                      className: 'Button Button--icon',
                      icon: 'fas fa-times',
                      onclick: () => {
                        scope.delete();
                        this.scopes.splice(index, 1);
                      },
                    }),
                  ]),
                ])),
                m('tr', m('td', {
                  colspan: 2,
                }, Button.component({
                  className: 'Button Button--block',
                  onclick: () => {
                    app.store.createRecord('oauth-scopes')
                      .save({
                        'scope': 'Scope.' + randomString(8),
                        'resource_path': '/api/' + randomString(4),
                        'method': 'GET',
                      })
                      .then(scope => {
                        this.scopes.push(scope);
                        this.showEditModal(scope);
                      });
                  },
                }, app.translator.trans(this.translationPrefix + 'add_button')))),
              ]),
            ]),
          ])
        }
      </div>
    );
  }

  showEditModal(scope) {
    app.modal.show(EditScopeModal, {scope: scope});
  }
}
