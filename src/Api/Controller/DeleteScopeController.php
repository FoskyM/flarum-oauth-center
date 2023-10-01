<?php

namespace FoskyM\OAuthCenter\Api\Controller;

use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use FoskyM\OAuthCenter\Models\Scope;
use FoskyM\OAuthCenter\Api\Serializer\ScopeSerializer;

class DeleteScopeController extends AbstractDeleteController
{
    protected function delete(ServerRequestInterface $request)
    {
        $id = Arr::get($request->getQueryParams(), 'id');
        RequestUtil::getActor($request)
            ->assertAdmin();

        $scope = Scope::find($id);

        $scope->delete();
    }
}
