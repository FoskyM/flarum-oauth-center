### 配置项
![Snipaste_2023-10-02_06-15-33](https://github.com/FoskyM/flarum-oauth-center/assets/39661663/0e8352bf-0aeb-4605-bd84-aaedf8cae0e8)
#### 配置项说明
- `允许隐式授权` response_type=token 的方式，令牌直接通过 hash 返回给客户端，详细说明可百度
- `强制状态验证` state 参数必须存在
- `精确的重定向 URI` 传参时的重定向 URI 必须和创建应用时填写的一致
- `令牌有效期` 令牌的有效期，单位为秒

### 创建应用
![Snipaste_2023-10-02_06-15-52](https://github.com/FoskyM/flarum-oauth-center/assets/39661663/e9879852-f4ec-4a04-9f81-58004692493c)
#### 应用创建说明
- `应用名称` 应用的名称
- `应用描述` 应用的描述
- `应用图标` 应用的图标，可选
- `应用主页` 应用的主页，可选
- `应用回调地址` 应用的回调地址，必填，多个地址使用空格分隔（不推荐单个应用使用多个地址）
- `权限` 可选（不清楚的话不要填）
- `授权类型` 可选（不清楚的话不要填）
- `应用 ID` 和 `应用密钥` 用于客户端认证，添加应用时自动生成，不要泄露给其他人

### 设置资源控制器的权限 (user.read 项是默认生成的权限)
![Snipaste_2023-10-02_06-16-06](https://github.com/FoskyM/flarum-oauth-center/assets/39661663/31648ad2-4326-47e0-9d26-c0e3b2f30f8d)
大部分人只需要 `user.read` 权限即可，如果你需要更多的权限，可以在这里添加（或许你需要先了解一下 OAuth 中的 scope）
#### 权限说明
- `权限标识` 权限唯一标识符，用于区分，可参考 `Github` 的权限标识
- `资源路径` 需要鉴权的资源路径
- `请求方法` 资源路径鉴权的请求方法，一般为 `GET`
- `默认` 勾选此项后哪怕传参时 scope 参数中无此权限标识，也会默认添加此权限
- `名称` 权限的名称，用于显示
- `描述` 权限的描述，用于显示，可使用 `{user}` `{client_name}` 变量指代用户和客户端名称
- `图标` 支持 `FontAwesome` 图标和普通图片

### 本插件相关路径
#### 授权
`/oauth/authorize`

| 参数 | 说明 | 必填 | 默认值 | 示例 |
| --- | --- | --- | --- | --- |
| client_id | 应用 ID | 是 | 无 | 123456 |
| response_type | 授权类型 | 是 | 无 | code 或 token |
| redirect_uri | 重定向 URI | 是 | 应用回调地址 | https://example.com/oauth/callback |
| scope | 权限 | 否 | 无 | user.read |
| state | 状态 | 否 | 无 | 123456 |

示例：
```
GET https://example.com/oauth/authorize?client_id=123456&response_type=code&redirect_uri=https://user.example.com/oauth/callback&scope=user.read&state=123456
```

#### 令牌
`/oauth/token`

| 参数 | 说明 | 必填 | 默认值 | 示例 |
| --- | --- | --- | --- | --- |
| client_id | 应用 ID | 是 | 无 | 123456 |
| client_secret | 应用密钥 | 是 | 无 | 123456 |
| grant_type | 授权类型 | 是 | 无 | authorization_code 或 refresh_token |
| code | 授权码 | 授权类型为 authorization_code 时必填 | 无 | 123456 |
| refresh_token | 刷新令牌 | 授权类型为 refresh_token 时必填 | 无 | 123456 |
| redirect_uri | 重定向 URI | 授权类型为 authorization_code 时必填 | 应用回调地址 | https://example.com/oauth/callback |

示例：

```
POST https://example.com/oauth/token

Payload: client_id=123456&client_secret=123456&grant_type=authorization_code&code=123456&redirect_uri=https://example.com/oauth/callback
```

#### 资源(用户)
`/api/user`

| 参数 | 说明 | 必填 | 默认值 | 示例 |
| --- | --- | --- | --- | --- |
| access_token | 访问令牌 | 是 | 无 | 123456 |

示例：

```
GET https://example.com/api/user?access_token=123456
```

### 和常规的 OAuth 应用一样使用
![Snipaste_2023-10-02_06-16-31](https://github.com/FoskyM/flarum-oauth-center/assets/39661663/1632672e-e631-41bc-b794-40428157b41c)

### 授权后获取令牌
![Snipaste_2023-10-02_06-17-00](https://github.com/FoskyM/flarum-oauth-center/assets/39661663/52f1b984-345b-4e09-8b8c-dcdf39712fb3)

### 使用令牌获取资源 (使用 get 或 header 方式)
![Snipaste_2023-10-02_06-17-29](https://github.com/FoskyM/flarum-oauth-center/assets/39661663/aa79ad3b-a480-4d09-9159-359be4518f4b)
![Snipaste_2023-10-02_06-17-42](https://github.com/FoskyM/flarum-oauth-center/assets/39661663/5054ac5b-da79-4db3-9703-94e10a1cde5f)
