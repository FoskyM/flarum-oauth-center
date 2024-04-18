<?php

namespace FoskyM\OAuthCenter\Api\Controller;

use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use FoskyM\OAuthCenter\Models\AccessToken;
use FoskyM\OAuthCenter\Models\RefreshToken;
use FoskyM\OAuthCenter\Models\AuthorizationCode;
use FoskyM\OAuthCenter\Api\Serializer\AccessTokenSerializer;

class DeleteExpiredTokenController extends AbstractDeleteController
{
    public $serializer = AccessTokenSerializer::class;
    protected function delete(ServerRequestInterface $request)
    {
        RequestUtil::getActor($request)->assertAdmin();

        AccessToken::where('expires', '<', date('Y-m-d H:i:s'))->delete();

        RefreshToken::where('expires', '<', date('Y-m-d H:i:s'))->delete();

        AuthorizationCode::where('expires', '<', date('Y-m-d H:i:s'))->delete();
    }
}
