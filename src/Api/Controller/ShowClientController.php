<?php

namespace FoskyM\OAuthCenter\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use FoskyM\OAuthCenter\Models\Client;
use FoskyM\OAuthCenter\Api\Serializer\ClientSerializer;

class ShowClientController extends AbstractListController
{
    public $serializer = ClientSerializer::class;
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $id = Arr::get($request->getQueryParams(), 'id');
        RequestUtil::getActor($request)->assertUser();

        $client = Client::findOrFail($id);
        $client->client_secret = '<PROTECT>';

        return $client;

    }
}
