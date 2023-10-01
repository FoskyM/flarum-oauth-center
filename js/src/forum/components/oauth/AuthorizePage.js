import app from 'flarum/forum/app';
import {extend} from 'flarum/common/extend';
import Page from 'flarum/common/components/Page';
import IndexPage from 'flarum/forum/components/IndexPage';
import LogInModal from 'flarum/forum/components/LogInModal';
import extractText from 'flarum/common/utils/extractText';
import Tooltip from 'flarum/common/components/Tooltip';

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
            <div className="AuthorizePage">
                <div className="container">
                    <div class="oauth-area">
                        <div class="oauth-main">
                            <div class="oauth-box oauth-header">
                                <h2>{app.forum.attribute('title')}</h2>
                                <p>
                                    {app.translator.trans('foskym-oauth-center.forum.authorize.access')} <a href={this.client.client_home()} target="_blank">{this.client.client_name()}</a>
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
                                    <div class="oauth-scope">
                                        <div class="oauth-scope-left">
                                            <img class="oauth-scope-object" src="/static/icon.jpg" style="width:32px"/>
                                        </div>
                                        <div class="oauth-scope-body">
                                            <h6 class="oauth-scope-heading">
                                                保持对已向 计量便民平台 授予访问权限的数据的访问权限 </h6>
                                            <small>
                                                即使当前没有使用该应用，也允许 计量便民平台 查看和更新你授予其访问权限的数据。这不会向
                                                计量便民平台 授予任何其他权限。 </small>
                                        </div>
                                    </div>
                                    <div class="oauth-scope">
                                        <div class="oauth-scope-left">
                                            <i class="oauth-scope-object fa-2x fa fa-user"
                                               style="margin-left:2px;color:#000"></i>
                                        </div>
                                        <div class="oauth-scope-body">
                                            <h6 class="oauth-scope-heading">
                                                读取用户个人资料 </h6>
                                            <small>
                                                访问该用户(mouse123)的个人信息、最新动态等 </small>
                                        </div>
                                    </div>
                                </div>
                                <form class="oauth-form" method="post" id="form">
                                    <input type="hidden" name="response_type" value="code"/>
                                    <input type="hidden" name="client_id" value="0eaCTcndUqIGo9LymQ3YVZGYVpEXcHer"/>
                                    <input type="hidden" name="redirect_uri"
                                           value="http://cjludev.top/user/auth/callback"/>
                                    <input type="hidden" name="state" value="123"/>
                                    <input type="hidden" name="scope" value="basic get_user_info"/>
                                    <div style="display: flex;">
                                        <button class="btn btn-success btn-block" type="submit"
                                                id="authorize" style="width: 50%;">授权
                                        </button>
                                        <button class="btn btn-danger btn-block" id="refuse"
                                                style="width: 50%;">拒绝
                                        </button>
                                    </div>
                                </form>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
