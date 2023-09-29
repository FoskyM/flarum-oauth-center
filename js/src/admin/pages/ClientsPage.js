import app from 'flarum/admin/app';
import Page from 'flarum/common/components/Page';

export default class ClientsPage extends Page {
  settingName = 'collapsible-posts.reasons';
  translationPrefix = 'foskym-oauth-center.admin.clients.';
  oninit(vnode) {
    super.oninit(vnode);

    app.store.find('clients').then(() => {
      m.redraw();
    });
  }

  view() {
    return (
      <div>
        <h2>Clients Page</h2>
      </div>
    );
  }
}
