### setting
![Snipaste_2023-10-02_06-15-33](https://github.com/FoskyM/flarum-oauth-center/assets/39661663/0e8352bf-0aeb-4605-bd84-aaedf8cae0e8)

- `Allow Implicit Grant` a way to return token directly to client, you can google it
- `Enforce State Validation` `state` must be provided
- `Require Exact Redirect URI` url in `redirect_uri` should be exactly the same as the one of client
- `Access Token Lifetime`

### create a client
![Snipaste_2023-10-02_06-15-52](https://github.com/FoskyM/flarum-oauth-center/assets/39661663/e9879852-f4ec-4a04-9f81-58004692493c)
#### instructions
- `Name` name of client
- `Description` description of client
- `Icon` icon of client, optional
- `Homepage` homepage of client, optional
- `Redirect URI` redirect uri of client, required, multiple uri should be separated by space (not recommended)
- `Scopes` optional (don't fill it if you don't know)
- `Grant Types` optional (don't fill it if you don't know)
- `Client ID` and `Client Secret` used for client authentication, generated automatically, don't share it with others

### set scope for your resources (user.read is default scope)
![Snipaste_2023-10-02_06-16-06](https://github.com/FoskyM/flarum-oauth-center/assets/39661663/31648ad2-4326-47e0-9d26-c0e3b2f30f8d)
most people only need `user.read` scope, if you need more, you can add it here (maybe you need to know something about OAuth scope first)
#### instructions
- `Scope ID` unique identifier of scope, used for distinguish, you can refer to `Github` scope
- `Resource Path` resource path of scope
- `Request Method` request method of resource path, usually `GET`
- `Default` if checked, this scope will be added even if it's not in `scope` parameter
- `Name` name of scope, used for display
- `Description` description of scope, used for display, you can use `{user}` `{client_name}` variable to represent user and client name
- `Icon` support `FontAwesome` icon and normal image

### uri
#### authorize
`/oauth/authorize`

| param | description | required | default | example |
| --- | --- | --- | --- | --- |
| client_id | client id | yes | none | 123456 |
| response_type | grant type | yes | none | code or token |
| redirect_uri | redirect uri | yes | client redirect uri | https://example.com/oauth/callback |
| scope | scope | no | none | user.read |
| state | state | no | none | 123456 |

example：
```
GET https://example.com/oauth/authorize?client_id=123456&response_type=code&redirect_uri=https://user.example.com/oauth/callback&scope=user.read&state=123456
```

#### token
`/oauth/token`

| param | description | required | default | example |
| --- | --- | --- | --- | --- |
| client_id | client id | yes | none | 123456 |
| client_secret | client secret | yes | none | 123456 |
| grant_type | grant type | yes | none | authorization_code or refresh_token |
| code | authorization code | required when grant type is authorization_code | none | 123456 |
| refresh_token | refresh token | required when grant type is refresh_token | none | 123456 |
| redirect_uri | redirect uri | required when grant type is authorization_code | client redirect uri | https://example.com/oauth/callback |

example：
```
POST https://example.com/oauth/token

Payload: client_id=123456&client_secret=123456&grant_type=authorization_code&code=123456&redirect_uri=https://example.com/oauth/callback
```

### resource
`/api/user`

| param | description  | required | default | example |
| --- |--------------|-----|---------| --- |
| access_token | access token | yes | none | 123456 |

### example

```
GET https://example.com/api/user?access_token=123456
```

### do it as normal OAuth client
![Snipaste_2023-10-02_06-16-31](https://github.com/FoskyM/flarum-oauth-center/assets/39661663/1632672e-e631-41bc-b794-40428157b41c)

### get access token after authorized
![Snipaste_2023-10-02_06-17-00](https://github.com/FoskyM/flarum-oauth-center/assets/39661663/52f1b984-345b-4e09-8b8c-dcdf39712fb3)

### using token to access resources (get or header)
![Snipaste_2023-10-02_06-17-29](https://github.com/FoskyM/flarum-oauth-center/assets/39661663/aa79ad3b-a480-4d09-9159-359be4518f4b)
![Snipaste_2023-10-02_06-17-42](https://github.com/FoskyM/flarum-oauth-center/assets/39661663/5054ac5b-da79-4db3-9703-94e10a1cde5f)
