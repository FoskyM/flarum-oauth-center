<?php

namespace FoskyM\OAuthCenter\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use FoskyM\OAuthCenter\Models\Scope;
use FoskyM\OAuthCenter\Api\Serializer\ScopeSerializer;

class UpdateScopeController extends AbstractListController
{
    public $serializer = ScopeSerializer::class;
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertAdmin();

        $id = Arr::get($request->getQueryParams(), 'id');
        $client = Scope::find($id);

        $attributes = Arr::get($request->getParsedBody(), 'data.attributes', []);

        collect(['scope', 'resource_path', 'method', 'is_default', 'scope_name', 'scope_icon', 'scope_desc'])
            ->each(function (string $attribute) use ($client, $attributes) {
                if (($val = Arr::get($attributes, $attribute)) !== null) {
                    $client->$attribute = $val;
                }
            });

        $client->save();

        return $client;
    }
}
