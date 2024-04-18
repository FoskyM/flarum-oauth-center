<?php

namespace FoskyM\OAuthCenter\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use FoskyM\OAuthCenter\Models\Record;
use InvalidArgumentException;

class RecordSerializer extends AbstractSerializer
{
    protected $type = 'oauth-records';

    protected function getDefaultAttributes($model)
    {
        if (!($model instanceof Record)) {
            throw new InvalidArgumentException(
                get_class($this) . ' can only serialize instances of ' . Record::class
            );
        }

        // See https://docs.flarum.org/extend/api.html#serializers for more information.
        $model->client->makeHidden(['client_id', 'client_secret', 'redirect_uri', 'grant_types', 'scope', 'user_id']);
        return [
            "id" => $model->id,
            "client" => $model->client,
            "user_id" => $model->user_id,
            "authorized_at" => $model->authorized_at
        ];
    }
}
