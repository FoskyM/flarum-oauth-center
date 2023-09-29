<?php

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
        ));
        $server->addGrantType(new AuthorizationCode($storage));
        $server->addGrantType(new ClientCredentials($storage));
        $server->addGrantType(new UserCredentials($storage));
        $server->addGrantType(new RefreshToken($storage));
        return $server;
    }
}
