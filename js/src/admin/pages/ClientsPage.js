import app from 'flarum/admin/app';
import Page from 'flarum/common/components/Page';
import Button from 'flarum/common/components/Button';
import EditClientModal from '../components/EditClientModal';
import {randomString} from "../../common/utils/randomString";

export default class ClientsPage extends Page {
  translationPrefix = 'foskym-oauth-center.admin.clients.';
  clients = [];

  oninit(vnode) {
    super.oninit(vnode);

    app.store.find('oauth-clients').then(r => {
      this.clients = r;
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
                ['client_id', 'client_name'].map(key => m('th', app.translator.trans(this.translationPrefix + key))),
                m('th'),
              ])),
              m('tbody', [
                this.clients.map((client, index) => m('tr', [
                  ['client_id', 'client_name'].map(key =>
                    m('td', client[key]())
                  ),
                  m('td', [
                    Button.component({
                      className: 'Button Button--icon',
                      icon: 'fas fa-edit',
                      onclick: () => this.showEditModal(client),
                    }),
                    Button.component({
                      className: 'Button Button--icon',
                      icon: 'fas fa-times',
                      onclick: () => {
                        client.delete();
                        this.clients.splice(index, 1);
                      },
                    }),
                  ]),
                ])),
                m('tr', m('td', {
                  colspan: 2,
                }, Button.component({
                  className: 'Button Button--block',
                  onclick: () => {
                    const client = app.store.createRecord('oauth-clients');
                    const client_id = randomString(32);
                    const client_secret = randomString(32);
                    client.save({
                      client_id: client_id,
                      client_secret: client_secret,
                    }).then(() => {
                      this.clients.push(client);
                      this.showEditModal(client);
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

  showEditModal(client) {
    app.modal.show(EditClientModal, { client: client });
  }
}
