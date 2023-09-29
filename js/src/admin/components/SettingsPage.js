import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Button from 'flarum/common/components/Button';
import IndexPage from "../pages/IndexPage";
import ClientsPage from "../pages/ClientsPage";
import ScopesPage from "../pages/ScopesPage";
export default class SettingsPage extends ExtensionPage {
    content() {
        const page = m.route.param().page || 'index';

        return (
            <div className="ExtensionPage-settings OAuthCenter">
                <div className={"oauth-menu"}>
                    <div className={"container"}>
                        {this.menuButtons(page)}
                    </div>
                </div>

                <div className="container OAuthCenterPage-container">
                    {this.pageContent(page)}
                </div>
            </div>
        );
    }

    // Return button menus
    menuButtons(page) {
        return [
            Button.component({
                className: `Button ${page === 'index' ? 'item-selected' : ''}`,
                onclick: () => m.route.set(
                    app.route('extension', {
                        id: 'foskym-oauth-center'
                    })
                ),
                icon: 'fas fa-home',
            }, app.translator.trans('foskym-oauth-center.admin.page.index')),
            Button.component({
                className: `Button ${page === 'clients' ? 'item-selected' : ''}`,
                onclick: () => m.route.set(
                    app.route('extension', {
                        id: 'foskym-oauth-center',
                        page: 'clients'
                    })
                ),
                icon: 'fas fa-network-wired',
            }, app.translator.trans('foskym-oauth-center.admin.page.clients')),
            Button.component({
                className: `Button ${page === 'scopes' ? 'item-selected' : ''}`,
                onclick: () => m.route.set(
                    app.route('extension', {
                        id: 'foskym-oauth-center',
                        page: 'scopes'
                    })
                ),
                icon: 'fas fa-user-lock',
            }, app.translator.trans('foskym-oauth-center.admin.page.scopes')),
        ];
    }


    pageContent(page) {
        if (page == 'clients') {
            return <ClientsPage />
        } else if (page == 'scopes') {
            return <ScopesPage />
        }
        return <IndexPage />
    }
}
