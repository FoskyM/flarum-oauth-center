import app from 'flarum/forum/app';
import UserPage from 'flarum/forum/components/UserPage';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Placeholder from 'flarum/common/components/Placeholder';
import Button from 'flarum/common/components/Button';

export default class AuthorizedPage extends UserPage {
  records = [];
  loading = true;
  nomore = false;
  page = 0;
  oninit(vnode) {
    super.oninit(vnode);
    this.loadUser(m.route.param('username'));
    this.loadRecords();
  }
  loadRecords() {
    app.store.find('oauth-records', { page: this.page }).then((records) => {
      this.records = this.records.concat(records);
      this.loading = false;
      if (records.length < 10) {
        this.nomore = true;
      }
      m.redraw();
    });
  }
  loadMore() {
    this.loadRecords((this.page += 1));
  }
  content() {
    if (this.records.length === 0) {
      return <Placeholder text={app.translator.trans('foskym-oauth-center.forum.authorized.no_records')} />;
    }

    let allow_delete = app.forum.attribute('foskym-oauth-center.allow_delete_records');
    console.log(allow_delete);

    return (
      <div className="AuthorizedPage">
        {allow_delete && (
          <Button
            className={'Button Button--danger'}
            onclick={() => {
              window.confirm(app.translator.trans('foskym-oauth-center.forum.authorized.delete_all_confirm')) &&
                app
                  .request({
                    url: app.forum.attribute('apiUrl') + '/oauth-records/user',
                    method: 'DELETE',
                  })
                  .then(() => {
                    this.records = [];
                    this.nomore = false;
                    this.loadMore();
                  });
            }}
          >
            {app.translator.trans('foskym-oauth-center.forum.authorized.delete_all_button')}
          </Button>
        )}

        <ul className="AuthorizedRecords">
          {this.records.map((record) => (
            <li className="AuthorizedRecord">
              <div className="AuthorizedRecord-content">
                <div className="AuthorizedRecord-left">
                  <img className="AuthorizedRecord-icon" src={record.attribute('client').client_icon} alt="client_icon" />
                  <div className="AuthorizedRecord-info">
                    <h3>
                      <a href={record.attribute('client').client_home} target="_blank">
                        {record.attribute('client').client_name}
                      </a>
                    </h3>
                    <p>{record.attribute('client').client_desc}</p>
                  </div>
                </div>
                <div className="AuthorizedRecord-right">
                  <time>{record.authorized_at().toLocaleString()}</time>

                  {allow_delete && (
                    <Button
                      className={'Button Button--danger Button--small'}
                      onclick={() => {
                        record.delete().then(() => {
                          this.records = this.records.filter((r) => r !== record);
                          m.redraw();
                        });
                      }}
                    >
                      {app.translator.trans('foskym-oauth-center.forum.authorized.delete_button')}
                    </Button>
                  )}
                </div>
              </div>
              <hr />
            </li>
          ))}
        </ul>

        {this.loading && <LoadingIndicator display="block" />}

        {!this.loading && !this.nomore && (
          <div style="text-align:center;padding:20px">
            <Button className={'Button Button--primary'} disabled={this.loading} loading={this.loading} onclick={() => this.loadMore()}>
              {app.translator.trans('foskym-oauth-center.forum.authorized.load_more')}
            </Button>
          </div>
        )}

        {this.nomore && <Placeholder text={app.translator.trans('foskym-oauth-center.forum.authorized.no_more_records')} />}
      </div>
    );
  }
}
