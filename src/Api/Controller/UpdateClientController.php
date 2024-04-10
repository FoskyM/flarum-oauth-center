<?php

namespace FoskyM\OAuthCenter\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use FoskyM\OAuthCenter\Models\Client;
use FoskyM\OAuthCenter\Api\Serializer\ClientSerializer;

class UpdateClientController extends AbstractListController
{
    public $serializer = ClientSerializer::class;
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertAdmin();

        $id = Arr::get($request->getQueryParams(), 'id');
        $client = Client::find($id);

        $attributes = Arr::get($request->getParsedBody(), 'data.attributes', []);

        collect(['client_id', 'client_secret', 'redirect_uri', 'grant_types', 'scope', 'client_name', 'client_desc', 'client_icon', 'client_home'])
            ->each(function (string $attribute) use ($client, $attributes) {
                if (($val = Arr::get($attributes, $attribute)) !== null) {
                    if (($attribute == 'grant_types' || $attribute == 'scope') && $val === '')
                        $client->$attribute = null;
                    else
                        $client->$attribute = $val;
                }
            });

        $client->save();

        return $client;
    }
}
