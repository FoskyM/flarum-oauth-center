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
use Flarum\Extend\Model;
use Flarum\User\User;
use OAuth2\OpenID\Storage\AuthorizationCodeInterface as OpenIDAuthorizationCodeInterface;
use OAuth2\OpenID\Storage\UserClaimsInterface;
use OAuth2\Storage\AccessTokenInterface;
use OAuth2\Storage\ClientCredentialsInterface;
use OAuth2\Storage\AuthorizationCodeInterface;
use OAuth2\Storage\JwtBearerInterface;
use OAuth2\Storage\PublicKeyInterface;
use OAuth2\Storage\RefreshTokenInterface;
use OAuth2\Storage\ScopeInterface;
use OAuth2\Storage\UserCredentialsInterface;

class Storage implements
    AuthorizationCodeInterface,
    AccessTokenInterface,
    ClientCredentialsInterface,
    UserCredentialsInterface,
    RefreshTokenInterface,
    JwtBearerInterface,
    ScopeInterface,
    PublicKeyInterface,
    UserClaimsInterface,
    OpenIDAuthorizationCodeInterface
{
    /* OAuth2\Storage\ClientCredentialsInterface */
    /**
     * @param string $client_id
     * @param null|string $client_secret
     * @return bool
     */
    public function checkClientCredentials($client_id, $client_secret = null)
    {
        $client = Models\Client::where('client_id', $client_id)->first();

        return $client && $client['client_secret'] == $client_secret;
    }

    /**
     * @param string $client_id
     * @return bool
     */
    public function isPublicClient($client_id)
    {
        $client = Models\Client::where('client_id', $client_id)->first();

        if (!$client) {
            return false;
        }

        return empty($client['client_secret']);
    }

    /**
     * @param string $client_id
     * @return array|mixed
     */
    public function getClientDetails($client_id)
    {
        $client = Models\Client::where('client_id', $client_id)->first();

        return $client;
    }

    /**
     * @param string $client_id
     * @param null|string $client_secret
     * @param null|string $redirect_uri
     * @param null|array  $grant_types
     * @param null|string $scope
     * @param null|string $user_id
     * @return bool
     */
    public function setClientDetails($client_id, $client_secret = null, $redirect_uri = null, $grant_types = null, $scope = null, $user_id = null)
    {
        // if it exists, update it.
        if ($this->getClientDetails($client_id)) {
            return Models\Client::where('client_id', $client_id)->update([
                'client_secret' => $client_secret,
                'redirect_uri' => $redirect_uri,
                'grant_types' => $grant_types,
                'scope' => $scope,
                'user_id' => $user_id,
            ]);
        } else {
            return Models\Client::create([
                'client_id' => $client_id,
                'client_secret' => $client_secret,
                'redirect_uri' => $redirect_uri,
                'grant_types' => $grant_types,
                'scope' => $scope,
                'user_id' => $user_id,
            ]);
        }
    }

    /**
     * @param $client_id
     * @param $grant_type
     * @return bool
     */
    public function checkRestrictedGrantType($client_id, $grant_type)
    {
        $details = $this->getClientDetails($client_id);
        if (isset($details['grant_types'])) {
            $grant_types = explode(' ', $details['grant_types']);

            return in_array($grant_type, (array) $grant_types);
        }

        // if grant_types are not defined, then none are restricted
        return true;
    }

    /* OAuth2\Storage\AccessTokenInterface */

    /**
     * @param string $access_token
     * @return array|bool|mixed|null
     */
    public function getAccessToken($access_token)
    {
        if ($token = Models\AccessToken::where('access_token', $access_token)->first()) {
            $token['expires'] = strtotime($token['expires']);
            return $token;
        }
        return false;
    }

    /**
     * @param string $access_token
     * @param mixed  $client_id
     * @param mixed  $user_id
     * @param int    $expires
     * @param string $scope
     * @return bool
     */
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

    /**
     * @param $access_token
     * @return bool
     */
    public function unsetAccessToken($access_token)
    {
        return Models\AccessToken::where('access_token', $access_token)->delete();
    }

    /* OAuth2\Storage\AuthorizationCodeInterface */
    /**
     * @param string $code
     * @return mixed
     */
    public function getAuthorizationCode($code)
    {
        if ($code = Models\AuthorizationCode::where('authorization_code', $code)->first()) {
            // convert date string back to timestamp
            $code['expires'] = strtotime($code['expires']);
        }

        return $code;
    }

    /**
     * @param string $code
     * @param mixed  $client_id
     * @param mixed  $user_id
     * @param string $redirect_uri
     * @param int    $expires
     * @param string $scope
     * @param string $id_token
     * @return bool|mixed
     */
    public function setAuthorizationCode($code, $client_id, $user_id, $redirect_uri, $expires, $scope = null, $id_token = null, $code_challenge = null, $code_challenge_method = null)
    {
        /*if (func_num_args() > 6) {
            // we are calling with an id token
            return call_user_func_array(array($this, 'setAuthorizationCodeWithIdToken'), func_get_args());
        }*/

        // convert expires to datestring
        $expires = date('Y-m-d H:i:s', $expires);

        // if it exists, update it.
        if ($this->getAuthorizationCode($code)) {
            return Models\AuthorizationCode::where('authorization_code', $code)->update([
                'client_id' => $client_id,
                'user_id' => $user_id,
                'redirect_uri' => $redirect_uri,
                'expires' => $expires,
                'scope' => $scope
            ]);

        } else {
            return Models\AuthorizationCode::create([
                'authorization_code' => $code,
                'client_id' => $client_id,
                'user_id' => $user_id,
                'redirect_uri' => $redirect_uri,
                'expires' => $expires,
                'scope' => $scope
            ]);
        }

    }

    /**
     * @param string $code
     * @param mixed  $client_id
     * @param mixed  $user_id
     * @param string $redirect_uri
     * @param string $expires
     * @param string $scope
     * @param string $id_token
     * @return bool
     */
    private function setAuthorizationCodeWithIdToken($code, $client_id, $user_id, $redirect_uri, $expires, $scope = null, $id_token = null, $code_challenge = null, $code_challenge_method = null)
    {
        // convert expires to datestring
        $expires = date('Y-m-d H:i:s', $expires);

        // if it exists, update it.
        if ($this->getAuthorizationCode($code)) {
            return Models\AuthorizationCode::where('authorization_code', $code)->update([
                'client_id' => $client_id,
                'user_id' => $user_id,
                'redirect_uri' => $redirect_uri,
                'expires' => $expires,
                'scope' => $scope,
                'id_token' => $id_token,
                'code_challenge' => $code_challenge,
                'code_challenge_method' => $code_challenge_method
            ]);
        } else {
            return Models\AuthorizationCode::create([
                'authorization_code' => $code,
                'client_id' => $client_id,
                'user_id' => $user_id,
                'redirect_uri' => $redirect_uri,
                'expires' => $expires,
                'scope' => $scope,
                'id_token' => $id_token,
                'code_challenge' => $code_challenge,
                'code_challenge_method' => $code_challenge_method
            ]);
        }
    }

    /**
     * @param string $code
     * @return bool
     */
    public function expireAuthorizationCode($code)
    {
        return Models\AuthorizationCode::where('authorization_code', $code)->delete();
    }

    /* OAuth2\Storage\RefreshTokenInterface */

    /**
     * @param string $refresh_token
     * @return bool|mixed
     */
    public function getRefreshToken($refresh_token)
    {
        $token = Models\RefreshToken::where('refresh_token', $refresh_token)->first();

        if ($token) {
            // convert expires to epoch time
            $token['expires'] = strtotime($token['expires']);
        }

        return $token;
    }

    /**
     * @param string $refresh_token
     * @param mixed  $client_id
     * @param mixed  $user_id
     * @param string $expires
     * @param string $scope
     * @return bool
     */
    public function setRefreshToken($refresh_token, $client_id, $user_id, $expires, $scope = null)
    {
        // convert expires to datestring
        $expires = date('Y-m-d H:i:s', $expires);

        return Models\RefreshToken::create([
            'refresh_token' => $refresh_token,
            'client_id' => $client_id,
            'user_id' => $user_id,
            'expires' => $expires,
            'scope' => $scope
        ]);
    }

    /**
     * @param string $refresh_token
     * @return bool
     */
    public function unsetRefreshToken($refresh_token)
    {
        return Models\RefreshToken::where('refresh_token', $refresh_token)->delete();
    }

    /* OAuth2\Storage\UserCredentialsInterface */
    /**
     * @param string $username
     * @param string $password
     * @return bool
     */
    public function checkUserCredentials($username, $password)
    {
        if ($user = User::where('username', $username)->first()) {
            return $user->checkPassword($password);
        }

        return false;
    }

    /**
     * @param string $username
     * @return array|bool
     */
    public function getUserDetails($username)
    {
        $user = User::where('username', $username)->first();
        $user->user_id = $user->id;

        return $user;
    }

    /**
     * @param mixed  $user_id
     * @param string $claims
     * @return array|bool
     */
    public function getUserClaims($user_id, $claims)
    {
        if (!$userDetails = $this->getUserDetails($user_id)) {
            return false;
        }

        $claims = explode(' ', trim($claims));
        $userClaims = array();

        // for each requested claim, if the user has the claim, set it in the response
        $validClaims = explode(' ', self::VALID_CLAIMS);
        foreach ($validClaims as $validClaim) {
            if (in_array($validClaim, $claims)) {
                if ($validClaim == 'address') {
                    // address is an object with subfields
                    $userClaims['address'] = $this->getUserClaim($validClaim, $userDetails['address'] ?: $userDetails);
                } else {
                    $userClaims = array_merge($userClaims, $this->getUserClaim($validClaim, $userDetails));
                }
            }
        }

        return $userClaims;
    }

    /**
     * @param string $claim
     * @param array  $userDetails
     * @return array
     */
    protected function getUserClaim($claim, $userDetails)
    {
        $userClaims = array();
        $claimValuesString = constant(sprintf('self::%s_CLAIM_VALUES', strtoupper($claim)));
        $claimValues = explode(' ', $claimValuesString);

        foreach ($claimValues as $value) {
            $userClaims[$value] = isset($userDetails[$value]) ? $userDetails[$value] : null;
        }

        return $userClaims;
    }

    /* OAuth2\Storage\ScopeInterface */

    /**
     * @param string $scope
     * @return bool
     */
    public function scopeExists($scope)
    {
        $scope = explode(' ', $scope);

        if ($count = Models\Scope::whereIn('scope', $scope)->count()) {
            return $count == count($scope);
        }

        return false;
    }

    /**
     * @param mixed $client_id
     * @return null|string
     */
    public function getDefaultScope($client_id = null)
    {
        if ($result = Models\Scope::where('is_default', true)->get()) {
            $defaultScope = array_map(function ($row) {
                return $row['scope'];
            }, $result->toArray());

            return implode(' ', $defaultScope);
        }

        return null;
    }

    /* OAuth2\Storage\JwtBearerInterface */

    /**
     * @param mixed $client_id
     * @param $subject
     * @return string
     */
    public function getClientKey($client_id, $subject)
    {
        $jwt = Models\Jwt::where('client_id', $client_id)->where('subject', $subject)->first();

        return $jwt->public_key;
    }

    /**
     * @param mixed $client_id
     * @return bool|null
     */
    public function getClientScope($client_id)
    {
        if (!$clientDetails = $this->getClientDetails($client_id)) {
            return false;
        }

        if (isset($clientDetails['scope'])) {
            return $clientDetails['scope'];
        }

        return null;
    }

    /**
     * @param mixed $client_id
     * @param $subject
     * @param $audience
     * @param $expires
     * @param $jti
     * @return array|null
     */
    public function getJti($client_id, $subject, $audience, $expires, $jti)
    {
        /*$jti = Models\Jti::where('issuer', $client_id)
            ->where('subject', $subject)
            ->where('audience', $audience)
            ->where('expires', $expires)
            ->where('jti', $jti)
            ->first();

        if ($jti) {
            return array(
                'issuer' => $jti['issuer'],
                'subject' => $jti['subject'],
                'audience' => $jti['audience'],
                'expires' => $jti['expires'],
                'jti' => $jti['jti'],
            );
        }*/

        return null;
    }

    /**
     * @param mixed $client_id
     * @param $subject
     * @param $audience
     * @param $expires
     * @param $jti
     * @return bool
     */
    public function setJti($client_id, $subject, $audience, $expires, $jti)
    {
        /*return Models\Jti::create([
            'issuer' => $client_id,
            'subject' => $subject,
            'audience' => $audience,
            'expires' => $expires,
            'jti' => $jti,
        ]);*/
    }

    /* OAuth2\Storage\PublicKeyInterface */

    /**
     * @param mixed $client_id
     * @return mixed
     */
    public function getPublicKey($client_id = null)
    {
        /*$result = Models\PublicKey::where('client_id', $client_id)->first();

        if ($result) {
            return $result['public_key'];
        }*/
    }

    /**
     * @param mixed $client_id
     * @return mixed
     */
    public function getPrivateKey($client_id = null)
    {
        /*$result = Models\PublicKey::where('client_id', $client_id)->first();

        if ($result) {
            return $result['private_key'];
        }*/
    }

    /**
     * @param mixed $client_id
     * @return string
     */
    public function getEncryptionAlgorithm($client_id = null)
    {
        /*$result = Models\PublicKey::where('client_id', $client_id)->first();

        if ($result) {
            return $result['encryption_algorithm'];
        }*/

        return 'RS256';
    }

}
