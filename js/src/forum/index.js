import app from 'flarum/forum/app';
import {extend} from 'flarum/common/extend';
import UserPage from 'flarum/forum/components/UserPage';
import LinkButton from 'flarum/common/components/LinkButton';
import AuthorizePage from "./components/oauth/AuthorizePage";
import AuthorizedPage from "./components/user/AuthorizedPage";
app.initializers.add('foskym/flarum-oauth-center', () => {
  app.routes['oauth.authorize'] = {
    path: '/oauth/authorize',
    component: AuthorizePage
  };

  app.routes['user.authorized'] = {
    path: '/u/:username/authorized',
    component: AuthorizedPage
  };
  extend(UserPage.prototype, 'navItems', function (items) {
    if (app.session.user && app.session.user.id() === this.user.id()) {
      items.add(
        'authorized',
        LinkButton.component(
          {
            href: app.route('user.authorized', { username: this.user.username() }),
            icon: 'fas fa-user-friends',
          },
          [
            app.translator.trans('foskym-oauth-center.forum.page.label.authorized'),
            // this.user.moderatorNoteCount() > 0 ? <span className="Button-badge">{this.user.moderatorNoteCount()}</span> : '',
          ]
        ),
        -110
      );
    }
  });
});
