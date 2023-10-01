import app from 'flarum/forum/app';
import {extend} from 'flarum/common/extend';
import Page from 'flarum/common/components/Page';
import IndexPage from 'flarum/forum/components/IndexPage';
import LogInModal from 'flarum/forum/components/LogInModal';
import extractText from 'flarum/common/utils/extractText';

export default class AuthorizePage extends IndexPage {
  params = [];
  client = null;
  oninit(vnode) {
    super.oninit(vnode);
    if (!app.session.user) {
      setTimeout(() => app.modal.show(LogInModal), 500);
    }

    const params = m.route.param();

    if (params.client_id == null || params.response_type == null || params.redirect_uri == null) {
      m.route.set('/');
    } else {
      this.params = params;
      app.store.find('oauth-clients', params.client_id).then(client => {
        if (client.length === 0) {
          m.route.set('/');
        } else {
          this.client = client[0];
          const uris = client.redirect_uri.split(' ');
          console.log(uris);
          if (app.forum.attribute('foskym-oauth-center.require_exact_redirect_uri') && uris.indexOf(params.redirect_uri) == -1) {
              m.route.set('/');
          }
          if (app.forum.attribute('foskym-oauth-center.allow_implicit') && params.response_type == 'token') {
              m.route.set('/');
          }
          if (app.forum.attribute('foskym-oauth-center.enforce_state') && params.enforce_state == null) {
              m.route.set('/');
          }
        }
      });
    }
  }

  setTitle() {
    app.setTitle(extractText(app.translator.trans('foskym-oauth-center.forum.page.title.authorize')));
    app.setTitleCount(0);
  }
  view() {
    if (!this.client) {
      return '';
    }
    app.setTitle(extractText(app.translator.trans('foskym-oauth-center.forum.page.title.authorize') + ' ' + this.client.client_name));
    app.setTitleCount(0);
    return (
      <div className="AuthorizePage">
        <div className="container">
        </div>
      </div>
    );
  }
}
