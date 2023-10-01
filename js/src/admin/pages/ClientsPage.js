import app from 'flarum/admin/app';
import Page from 'flarum/common/components/Page';
import AdminPage from 'flarum/admin/components/AdminPage';
import Button from 'flarum/common/components/Button';
import Client from "../../common/models/Client";
export default class ClientsPage extends Page {
  settingName = 'collapsible-posts.reasons';
  translationPrefix = 'foskym-oauth-center.admin.clients.';
  clients = [];
  oninit(vnode) {
    super.oninit(vnode);

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

    app.store.find('oauth-clients').then(r => {
      this.clients = r;
      this.fields.map(key => console.log(this.clients[0][key]))
      m.redraw();
    });
  }

  view() {
    return (
      <div class={"OAuthCenter-clientsPage"}>
        {
          m('.Form-group', [
            m('table', [
              m('thead', m('tr', [
                this.fields.map(key => m('th', app.translator.trans(this.translationPrefix + key))),
                m('th'),
              ])),
              m('tbody', [
                this.clients.map((client, index) => m('tr', [
                  this.fields.map(key =>
                    m('td', m('input.FormControl', {
                      type: 'text',
                      value: client[key]() || '',
                      onchange: (event) => {
                        this.saveClientInfo(index, key, event.target.value);
                      },
                    }))
                  ),
                  m('td', Button.component({
                    className: 'Button Button--icon',
                    icon: 'fas fa-times',
                    onclick: () => {
                      this.clients[index].delete();
                      this.clients.splice(index, 1);

                    },
                  })),
                ])),
                m('tr', m('td', {
                  colspan: 9,
                }, Button.component({
                  className: 'Button Button--block',
                  onclick: () => {
                    const client = app.store.createRecord('oauth-clients');
                    const client_id = this.randomString(32);
                    const client_secret = this.randomString(32);
                    client.save({
                      client_id: client_id,
                      client_secret: client_secret,
                    }).then(this.clients.push(client));
                  },
                }, app.translator.trans(this.translationPrefix + 'add_button')))),
              ]),
            ]),
          ])
        }
      </div>
    );
  }

  randomString(len) {
    len = len || 32;
    let $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
      //0~32的整数
      pwd += $chars.charAt(Math.floor(Math.random() * (maxPos + 1)));
    }
    return pwd;
  }

  saveClientInfo(index, key, value) {
    console.log(index, key, value);
    this.clients[index].save({
      [key]: value,
    });
  }
}
