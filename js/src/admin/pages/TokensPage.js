import app from 'flarum/admin/app';
import Page from 'flarum/common/components/Page';
import Button from 'flarum/common/components/Button';
import Alert from 'flarum/common/components/Alert';
import AddTokenModal from '../components/AddTokenModal';

export default class TokensPage extends Page {
  translationPrefix = 'foskym-oauth-center.admin.tokens.';
  scopes = [];

  oninit(vnode) {
    super.oninit(vnode);

    this.fields = [];

    // app.store.find('oauth-tokens').then(r => {
    //   this.scopes = r;
    //   m.redraw();
    // });
  }

  view() {
    return (
      <div class={"OAuthCenter-scopesPage"}>
        {[
          Button.component({
            type: 'button',
            className: 'Button',
            onclick: () => {
              this.showAddModal();
            }
          }, app.translator.trans('foskym-oauth-center.admin.tokens.add_token')),
          Button.component({
            type: 'button',
            className: 'Button',
            onclick: () => {
              this.deleteExpiredTokens();
            }
          }, app.translator.trans('foskym-oauth-center.admin.tokens.delete_token'))
        ]}
      </div>
    );
  }

  deleteExpiredTokens() {
    app.request({
      method: 'DELETE',
      url: '/api/oauth-tokens/expired'
    }).then(() => {
      app.alerts.show(
        Alert,
        {type: 'success'},
        'success!'
      )
    });
  }

  showAddModal() {
    app.modal.show(AddTokenModal, {});
  }
}
