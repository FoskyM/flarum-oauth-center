<?php

/*
 * This file is part of foskym/flarum-oauth-center.
 *
 * Copyright (c) 2023 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
namespace FoskyM\OAuthCenter;

use OAuth2\Server;
use OAuth2\Response;
use OAuth2\Request;

use OAuth2\GrantType\ClientCredentials;
use OAuth2\GrantType\AuthorizationCode;
use OAuth2\GrantType\UserCredentials;
use OAuth2\GrantType\RefreshToken;

use Flarum\Settings\SettingsRepositoryInterface;
class OAuth
{
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }
    public function response(): Response
    {
        return new Response;
    }
    public function request(): Request
    {
        return new Request;
    }

    public function storage(): Storage
    {
        return new Storage;
    }
    public function server(): Server
    {
        $storage = new Storage;
        $server = new Server($storage, array(
            'allow_implicit' => $this->settings->get('foskym-oauth-center.allow_implicit') == "1",
            'enforce_state' => $this->settings->get('foskym-oauth-center.enforce_state') == "1",
            'require_exact_redirect_uri' => $this->settings->get('foskym-oauth-center.require_exact_redirect_uri') == "1",
            'access_lifetime'   =>  $this->settings->get('foskym-oauth-center.access_lifetime') == "" ? 3600 : $this->settings->get('foskym-oauth-center.access_lifetime'),
        ));
        $server->addGrantType(new AuthorizationCode($storage));
        $server->addGrantType(new ClientCredentials($storage));
        $server->addGrantType(new UserCredentials($storage));
        $server->addGrantType(new RefreshToken($storage));
        return $server;
    }
}
