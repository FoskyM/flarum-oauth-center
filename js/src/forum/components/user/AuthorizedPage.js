import UserPage from 'flarum/forum/components/UserPage';
export default class AuthorizedPage extends UserPage {
  oninit(vnode) {
    super.oninit(vnode);
    this.loadUser(m.route.param('username'));
  }
  content() {
    return (
      <div className="AuthorizedPage">
      </div>
    );
  }
}
