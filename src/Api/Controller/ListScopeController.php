<?php

namespace FoskyM\OAuthCenter\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use FoskyM\OAuthCenter\Models\Scope;
use FoskyM\OAuthCenter\Api\Serializer\ScopeSerializer;
use FoskyM\OAuthCenter\Api\Serializer\ScopeUserSerializer;

class ListScopeController extends AbstractListController
{
    public $serializer = ScopeSerializer::class;
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        try {
            $actor->assertAdmin();
        } catch (\Exception $e) {
            $actor->assertRegistered();
            if (!$actor->hasPermission('foskym-oauth-center.use-oauth')) {
                return [];
            }
            $this->serializer = ScopeUserSerializer::class;
        }

        return Scope::all();
    }
}
