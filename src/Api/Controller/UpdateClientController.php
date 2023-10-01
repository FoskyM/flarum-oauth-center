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

        $data = Arr::get($request->getParsedBody(), 'data', []);

        collect(['client_id', 'client_secret', 'redirect_uri', 'grant_types', 'scope', 'client_name', 'client_desc', 'client_icon', 'client_home'])
            ->each(function (string $attribute) use ($client, $data) {
                if (($val = Arr::get($data, "attributes.$attribute")) !== null) {
                    $client->$attribute = $val;
                }
            });

        $client->save();

        return $client;
    }
}
