import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Button from 'flarum/common/components/Button';
import IndexPage from "../pages/IndexPage";
import ClientsPage from "../pages/ClientsPage";
import ScopesPage from "../pages/ScopesPage";
import TokensPage from "../pages/TokensPage";

export default class SettingsPage extends ExtensionPage {
  translationPrefix = 'foskym-oauth-center.admin.page.';
  pages = {
    index: IndexPage,
    clients: ClientsPage,
    scopes: ScopesPage,
    tokens: TokensPage
  };

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
    return Object.keys(this.pages).map(key =>
      Button.component({
        className: `Button ${page === key ? 'item-selected' : ''}`,
        onclick: () => m.route.set(
          app.route('extension', {
            id: 'foskym-oauth-center',
            page: key
          })
        ),
        icon: this.iconForPage(key),
      }, app.translator.trans(this.translationPrefix + key))
    );
  }

  iconForPage(page) {
    switch (page) {
      case 'index':
        return 'fas fa-home';
      case 'clients':
        return 'fas fa-network-wired';
      case 'scopes':
        return 'fas fa-user-lock';
      case 'tokens':
        return 'fas fa-key';
      default:
        return '';
    }
  }

  pageContent(page) {
    const PageComponent = this.pages[page];
    return PageComponent ? <PageComponent/> : null;
  }
}
