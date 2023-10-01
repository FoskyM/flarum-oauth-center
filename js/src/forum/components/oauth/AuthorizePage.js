import app from 'flarum/forum/app';
import {extend} from 'flarum/common/extend';
import Page from 'flarum/common/components/Page';
import IndexPage from 'flarum/forum/components/IndexPage';
import LogInModal from 'flarum/forum/components/LogInModal';
import extractText from 'flarum/common/utils/extractText';
import Tooltip from 'flarum/common/components/Tooltip';
import Button from 'flarum/common/components/Button';

export default class AuthorizePage extends IndexPage {
  params = [];
  client = null;
  scopes = null;
  client_scope = [];
  loading = true;
  is_authorized = false;
  submit_loading = false;

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
          let uris = null;
          if (this.client.redirect_uri().indexOf(' ') > -1) {
            uris = this.client.redirect_uri().split(' ');
          } else {
            uris = [this.client.redirect_uri()];
          }

          if (app.forum.attribute('foskym-oauth-center.require_exact_redirect_uri') && uris.indexOf(params.redirect_uri) == -1) {
            m.route.set('/');
          }
          if (app.forum.attribute('foskym-oauth-center.allow_implicit') && params.response_type == 'token') {
            m.route.set('/');
          }
          if (app.forum.attribute('foskym-oauth-center.enforce_state') && params.enforce_state == null) {
            m.route.set('/');
          }

          app.store.find('oauth-scopes').then((scopes) => {
            this.scopes = scopes
            let scope = params.scope;

            if (params.scope == null) {
              scope = this.client.scope();
            }

            let scopes_temp = [];
            if (scope == null) {
              scopes_temp = [];
            } else if (scope.indexOf(' ') > -1) {
              scopes_temp = scope.split(' ');
            } else {
              scopes_temp = [scope];
            }

            let default_scopes = [];
            this.scopes.map(scope => {
              if (scope.is_default() === 1) {
                default_scopes.push(scope);
              }
            });

            scopes_temp = scopes_temp.concat(default_scopes);

            this.client_scope = scopes_temp.filter((scope, index) => scopes_temp.indexOf(scope) === index);
            console.log(this.client_scope);
            this.loading = false;
            m.redraw();
          });


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
    return (
      !this.loading && <div className="AuthorizePage">
        <div className="container">
          <div class="oauth-area">
            <div class="oauth-main">
              <div class="oauth-box oauth-header">
                <h2>{app.forum.attribute('title')}</h2>
                <p>
                  {app.translator.trans('foskym-oauth-center.forum.authorize.access')} <a
                  href={this.client.client_home()} target="_blank">{this.client.client_name()}</a>
                </p>

              </div>
              <div class="oauth-box oauth-body">

                <div class="oauth-top">
                  <img src={app.forum.attribute('faviconUrl')}/>
                  <i class="fas fa-exchange-alt fa-2x"></i>
                  <Tooltip text={this.client.client_desc()}>
                    <img src={this.client.client_icon()}/>
                  </Tooltip>
                </div>
                <div class="oauth-scope-area">
                  {
                    this.client_scope.length > 0 && this.client_scope.map(scope => {
                      let scope_info = null;
                      this.scopes.map(s => {
                        if (s.scope() === scope.scope()) {
                          scope_info = s;
                        }
                      });
                      if (scope_info == null) {
                        return '';
                      }
                      return (
                        <div class="oauth-scope">
                          <div class="oauth-scope-left">
                            {
                              (scope_info.scope_icon().indexOf('fa-') > -1) ?
                                <i class={"oauth-scope-object fa-2x " + scope_info.scope_icon()}
                                   style="margin-left:2px;color:#000"></i> :
                                <img class="oauth-scope-object" src={scope_info.scope_icon()} style="width:32px"/>
                            }
                          </div>
                          <div class="oauth-scope-body">
                            <h6 class="oauth-scope-heading">
                              {scope_info.scope_name()}
                            </h6>
                            <small>
                              {
                                scope_info.scope_desc()
                                  .replace('{client_name}', this.client.client_name())
                                  .replace('{user}', app.session.user.attribute('displayName'))
                              }
                            </small>
                          </div>
                        </div>
                      );
                    })
                  }
                </div>
                <form class="oauth-form" method="post" id="form" onsubmit={this.onsubmit.bind(this)}>
                  {/*                  <input type="hidden" name="response_type" value={this.params.response_type}/>
                  <input type="hidden" name="client_id" value={this.params.client_id}/>
                  <input type="hidden" name="redirect_uri"
                         value={this.params.redirect_uri}/>
                  <input type="hidden" name="state" value={this.params.state}/>
                  <input type="hidden" name="scope" value={this.params.scope}/>*/}
                  <input type="hidden" name="is_authorized" value={this.is_authorized}/>
                  <div style="display: flex; margin-top: 15px" class="oauth-form-item">
                    <Button className="Button" type="submit" style="width: 50%;" onclick={this.deny.bind(this)}
                            loading={this.submit_loading}>
                      {app.translator.trans('foskym-oauth-center.forum.authorize.deny')}
                    </Button>
                    <Button className="Button Button--primary" type="submit" style="width: 50%;"
                            onclick={this.agree.bind(this)} loading={this.submit_loading}>
                      {app.translator.trans('foskym-oauth-center.forum.authorize.agree')}
                    </Button>
                  </div>
                </form>


              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  deny(e) {
    this.is_authorized = false;
  }
  agree(e) {
    this.is_authorized = true;
  }

  onsubmit(e) {
    e.preventDefault();
    this.submit_loading = true;
    app.request({
      method: 'POST',
      url: '/oauth/authorize',
      body: {
        response_type: this.params.response_type,
        client_id: this.params.client_id,
        redirect_uri: this.params.redirect_uri,
        state: this.params.state,
        scope: this.params.scope,
        is_authorized: this.is_authorized,
      }
    }).then((params) => {
      let arr = []
      for (let k in params) {
        arr.push(`${k}=${params[k]}`)
      }
      let url = `${this.params.redirect_uri }?${arr.join('&')}`;
      window.location.href = url;
    });

    // Some form handling logic here
  }
}
