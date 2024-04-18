<?php

namespace FoskyM\OAuthCenter\Api\Controller;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use FoskyM\OAuthCenter\Models\AccessToken;
use FoskyM\OAuthCenter\Api\Serializer\AccessTokenSerializer;

class CreateTokenController extends AbstractCreateController
{
    public $serializer = AccessTokenSerializer::class;
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertAdmin();

        $attributes = Arr::get($request->getParsedBody(), 'data.attributes');

        $access_token = Arr::get($attributes, 'access_token');
        $client_id = Arr::get($attributes, 'client_id');
        $user_id = Arr::get($attributes, 'user_id');
        $scope = Arr::get($attributes, 'scope');
        $expires = date('Y-m-d H:i:s', strtotime(Arr::get($attributes, 'expires')) ?: time() + 3600 * 24);

        if (!$access_token || !$client_id || !$user_id || !$scope) {
            throw new \Exception('Invalid token attributes');
        }

        if (AccessToken::where('access_token', Arr::get($attributes, 'access_token'))->first()) {
            return AccessToken::where('access_token', Arr::get($attributes, 'access_token'))->first();
        }

        return AccessToken::create([
            'access_token' => Arr::get($attributes, 'access_token'),
            'client_id' => Arr::get($attributes, 'client_id'),
            'user_id' => Arr::get($attributes, 'user_id'),
            'expires' => $expires,
            'scope' => Arr::get($attributes, 'scope'),
        ]);
    }
}
