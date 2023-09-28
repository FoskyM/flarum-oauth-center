<?php

namespace FoskyM\OAuthCenter;
use OAuth2\Storage\AccessTokenInterface;
use OAuth2\Storage\ClientCredentialsInterface;
use OAuth2\Storage\AuthorizationCodeInterface;
abstract class Storage implements AccessTokenInterface,
    ClientCredentialsInterface, AuthorizationCodeInterface
{
    public function getAccessToken($access_token)
    {
        if ($token = Models\AccessToken::where('access_token', $access_token)->first()) {
            $token['expires'] = strtotime($token['expires']);
            return $token;
        }
        return false;
    }

    public function setAccessToken($access_token, $client_id, $user_id, $expires, $scope = null)
    {
        $expires = date('Y-m-d H:i:s', $expires);

        if ($this->getAccessToken($access_token)) {
            return Models\AccessToken::where('access_token', $access_token)->update([
                'client_id' => $client_id,
                'user_id' => $user_id,
                'expires' => $expires,
                'scope' => $scope,
            ]);
        } else {
            return Models\AccessToken::create([
                'access_token' => $access_token,
                'client_id' => $client_id,
                'user_id' => $user_id,
                'expires' => $expires,
                'scope' => $scope,
            ]);
        }
    }

    public function unsetAccessToken($access_token)
    {
        return Models\AccessToken::where('access_token', $access_token)->delete();
    }
}
