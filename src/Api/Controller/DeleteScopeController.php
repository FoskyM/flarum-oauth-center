<?php

namespace FoskyM\OAuthCenter\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use FoskyM\OAuthCenter\Models\Scope;
use FoskyM\OAuthCenter\Api\Serializer\ScopeSerializer;

class DeleteScopeController extends AbstractListController
{
    public $serializer = ScopeSerializer::class;
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $id = Arr::get($request->getQueryParams(), 'id');
        RequestUtil::getActor($request)
            ->assertAdmin();

        $client = Scope::find($id);

        $client->delete();

        return $client;
    }
}
