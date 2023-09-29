import app from 'flarum/admin/app';
import SettingsPage from './components/SettingsPage';
app.initializers.add('foskym/flarum-oauth-center', () => {
  app.extensionData
    .for('foskym-oauth-center')
    .registerPage(SettingsPage);
});
