<?php

namespace FoskyM\OAuthCenter\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use FoskyM\OAuthCenter\Models\Client;
use FoskyM\OAuthCenter\Api\Serializer\ClientSerializer;

class CreateClientController extends AbstractListController
{
    public $serializer = ClientSerializer::class;
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertAdmin();

        $data = Arr::get($request->getParsedBody(), 'data', []);

        $client = Client::build(
            Arr::get($data, 'attributes.name'),
            $actor->id,
            Arr::get($data, 'attributes.icon'),
            Arr::get($data, 'attributes.description'),
            Arr::get($data, 'attributes.actions'),
            Arr::get($data, 'attributes.metrics'),
            Arr::get($data, 'attributes.requirements'),

        );


        $client->save();

        return $client;
    }
}
