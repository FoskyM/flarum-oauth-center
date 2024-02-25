<?php

namespace FoskyM\OAuthCenter\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use FoskyM\OAuthCenter\Models\Record;
use FoskyM\OAuthCenter\Api\Serializer\RecordSerializer;

class ListRecordController extends AbstractListController
{
    public $serializer = RecordSerializer::class;
    protected function data(ServerRequestInterface $request, Document $document)
    {
		$page = Arr::get($request->getQueryParams(), 'page', 0);

		$actor = RequestUtil::getActor($request);
		$actor->assertRegistered();

		$pageSize = 10;
		$skip = $page * $pageSize;
		$records = Record::where('user_id', $actor->id)
			->orderBy('authorized_at', 'desc')
			->skip($skip)
			->take($pageSize)
			->get();

		return $records;
    }
}
