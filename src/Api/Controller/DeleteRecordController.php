<?php

namespace FoskyM\OAuthCenter\Api\Controller;

use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Http\RequestUtil;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use FoskyM\OAuthCenter\Models\Record;
use FoskyM\OAuthCenter\Api\Serializer\RecordSerializer;

class DeleteRecordController extends AbstractDeleteController
{
    public $serializer = RecordSerializer::class;
    protected $settings;
    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }
    protected function delete(ServerRequestInterface $request)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertRegistered();
        
        $allow_delete_records = (bool) $this->settings->get('foskym-oauth-center.allow_delete_records');

        if ($allow_delete_records) {
            $id = Arr::get($request->getQueryParams(), 'id');

            $record = Record::find($id);
            $record->delete();
        }

    }
}
