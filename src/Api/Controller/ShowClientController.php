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
        $client_id = Arr::get($request->getQueryParams(), 'client_id');
        RequestUtil::getActor($request)->assertRegistered();

        $client = Client::whereOrFail('client_id', $client_id);

        if (isset($client->client_secret)) {
            $client->client_secret = '<PROTECT>';
        }

        return $client;

    }
}
