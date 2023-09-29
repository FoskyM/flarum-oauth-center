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
class OAuth
{
    public function response(): Response
    {
        return new Response;
    }
    public function request(): Request
    {
        return new Request;
    }
    public function server(): Server
    {
        $storage = new Storage;
        $server = new Server($storage, array(
            'allow_implicit' => true,
            'enforce_state' => false
        ));
        $server->addGrantType(new AuthorizationCode($storage));
        $server->addGrantType(new ClientCredentials($storage));
        $server->addGrantType(new UserCredentials($storage));
        $server->addGrantType(new RefreshToken($storage));
        return $server;
    }
}
