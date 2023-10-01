# OAuth Center

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/foskym/flarum-oauth-center.svg)](https://packagist.org/packages/foskym/flarum-oauth-center) [![Total Downloads](https://img.shields.io/packagist/dt/foskym/flarum-oauth-center.svg)](https://packagist.org/packages/foskym/flarum-oauth-center)

A [Flarum](http://flarum.org) extension. Allow user to authorize the third clients

## Installation

Install with composer:

```sh
composer require foskym/flarum-oauth-center:"*"
```

## Updating

```sh
composer update foskym/flarum-oauth-center:"*"
php flarum migrate
php flarum cache:clear
```

## Usage

### setting
![Snipaste_2023-10-02_06-15-33](https://github.com/FoskyM/flarum-oauth-center/assets/39661663/0e8352bf-0aeb-4605-bd84-aaedf8cae0e8)

### create a client
![Snipaste_2023-10-02_06-15-52](https://github.com/FoskyM/flarum-oauth-center/assets/39661663/e9879852-f4ec-4a04-9f81-58004692493c)

### set scope for your resources (user.read is default scope)
![Snipaste_2023-10-02_06-16-06](https://github.com/FoskyM/flarum-oauth-center/assets/39661663/31648ad2-4326-47e0-9d26-c0e3b2f30f8d)

### uri
authorize: `/oauth/authorize`

token: `/oauth/token`

resource(user): `/api/user`

### do it as normal OAuth client
![Snipaste_2023-10-02_06-16-31](https://github.com/FoskyM/flarum-oauth-center/assets/39661663/1632672e-e631-41bc-b794-40428157b41c)

### get access token after authorized
![Snipaste_2023-10-02_06-17-00](https://github.com/FoskyM/flarum-oauth-center/assets/39661663/52f1b984-345b-4e09-8b8c-dcdf39712fb3)

### using token to access resources (get or header)
![Snipaste_2023-10-02_06-17-29](https://github.com/FoskyM/flarum-oauth-center/assets/39661663/aa79ad3b-a480-4d09-9159-359be4518f4b)
![Snipaste_2023-10-02_06-17-42](https://github.com/FoskyM/flarum-oauth-center/assets/39661663/5054ac5b-da79-4db3-9703-94e10a1cde5f)

## Links

- [Packagist](https://packagist.org/packages/foskym/flarum-oauth-center)
- [GitHub](https://github.com/foskym/flarum-oauth-center)
- [Discuss](https://discuss.flarum.org/d/PUT_DISCUSS_SLUG_HERE)
