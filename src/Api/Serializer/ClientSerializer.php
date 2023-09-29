<?php

namespace FoskyM\OAuthCenter\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use FoskyM\OAuthCenter\Models\Client;
use InvalidArgumentException;

class ClientSerializer extends AbstractSerializer
{
    protected $type = 'oauth-clients';

    protected function getDefaultAttributes($model)
    {
        if (!($model instanceof Client)) {
            throw new InvalidArgumentException(
                get_class($this) . ' can only serialize instances of ' . Client::class
            );
        }

        // See https://docs.flarum.org/extend/api.html#serializers for more information.

        return [
            "id" => $model->id,
            "client_id" => $model->client_id,
            "client_secret" => $model->client_secret,
            "redirect_uri" => $model->redirect_uri,
            "grant_types" => $model->grant_types,
            "scope" => $model->scope,
            "user_id" => $model->user_id,
            "client_name" => $model->client_name,
            "client_icon" => $model->client_icon,
            "client_desc" => $model->client_desc,
            "client_home" => $model->client_home
        ];
    }
}
