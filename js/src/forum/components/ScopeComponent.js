import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';
import Tooltip from 'flarum/common/components/Tooltip';

export default class ScopeComponent extends Component {
  view() {
    const { scope, client } = this.attrs;
    return (
      <div class="oauth-scope">
        <div class="oauth-scope-left">
          {
            (scope.scope_icon().indexOf('fa-') > -1) ?
              <i class={"oauth-scope-object fa-2x " + scope.scope_icon()}
                 style="margin-left:2px;"></i> :
              <img class="oauth-scope-object" src={scope.scope_icon()} style="width:32px"/>
          }
        </div>
        <div class="oauth-scope-body">
          <h6 class="oauth-scope-heading">
            {scope.scope_name()}
          </h6>
          <small>
            {
              scope.scope_desc()
                .replace('{client_name}', client.client_name())
                .replace('{user}', app.session.user.attribute('displayName'))
            }
          </small>
        </div>
      </div>
    );
  }
}
