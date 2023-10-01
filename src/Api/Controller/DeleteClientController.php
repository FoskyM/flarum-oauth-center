<?php

namespace FoskyM\OAuthCenter\Api\Controller;

use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use FoskyM\OAuthCenter\Models\Client;
use FoskyM\OAuthCenter\Api\Serializer\ClientSerializer;

class DeleteClientController extends AbstractDeleteController
{
    public $serializer = ClientSerializer::class;
    protected function delete(ServerRequestInterface $request)
    {
        $id = Arr::get($request->getQueryParams(), 'id');
        RequestUtil::getActor($request)
            ->assertAdmin();

        $client = Client::find($id);

        $client->delete();
    }
}
