<?php

namespace FoskyM\OAuthCenter\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use FoskyM\OAuthCenter\Models\Client;
use FoskyM\OAuthCenter\Api\Serializer\ClientPublicSerializer;

class ShowClientController extends AbstractListController
{
    public $serializer = ClientPublicSerializer::class;
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $client_id = Arr::get($request->getQueryParams(), 'client_id');

        $actor = RequestUtil::getActor($request);
        $actor->assertRegistered();

        if (!$actor->hasPermission('foskym-oauth-center.use-oauth')) {
            return [];
        }

        $client = Client::where('client_id', $client_id)->get();

        return $client;

    }
}
