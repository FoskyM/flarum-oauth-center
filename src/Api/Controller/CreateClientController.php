<?php

namespace FoskyM\OAuthCenter\Api\Controller;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use FoskyM\OAuthCenter\Models\Client;
use FoskyM\OAuthCenter\Api\Serializer\ClientSerializer;

class CreateClientController extends AbstractCreateController
{
    public $serializer = ClientSerializer::class;
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertAdmin();

        $attributes = Arr::get($request->getParsedBody(), 'data.attributes');

        return Client::create([
            'client_id' => Arr::get($attributes, 'client_id'),
            'client_secret' => Arr::get($attributes, 'client_secret'),
            'user_id'   => $actor->id,
        ]);
    }
}
