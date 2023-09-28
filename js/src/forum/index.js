import app from 'flarum/forum/app';
import {extend} from 'flarum/common/extend';
import UserPage from 'flarum/forum/components/UserPage';
import LinkButton from 'flarum/common/components/LinkButton';
import AuthorizePage from "./components/user/AuthorizePage";
app.initializers.add('foskym/flarum-oauth-center', () => {
  app.routes['user.authorize'] = {
    path: '/u/:username/authorize',
    component: AuthorizePage
  };
  extend(UserPage.prototype, 'navItems', function (items) {
    if (app.session.user && app.session.user.id() === this.user.id()) {
      items.add(
        'authorize',
        LinkButton.component(
          {
            href: app.route('user.authorize', { username: this.user.username() }),
            icon: 'fas fa-user-friends',
          },
          [
            app.translator.trans('foskym-oauth-center.forum.page.label.authorize'),
            // this.user.moderatorNoteCount() > 0 ? <span className="Button-badge">{this.user.moderatorNoteCount()}</span> : '',
          ]
        ),
        -110
      );
    }
  });
});
