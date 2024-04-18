<?php

namespace FoskyM\OAuthCenter\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use FoskyM\OAuthCenter\Models\AccessToken;
use FoskyM\OAuthCenter\Models\Record;
use InvalidArgumentException;

class AccessTokenSerializer extends AbstractSerializer
{
    protected $type = 'oauth-tokens';

    protected function getDefaultAttributes($model)
    {
        if (!($model instanceof AccessToken)) {
            throw new InvalidArgumentException(
                get_class($this) . ' can only serialize instances of ' . AccessToken::class
            );
        }

        // See https://docs.flarum.org/extend/api.html#serializers for more information.

        return [
            "id" => $model->id,
            "access_token" => $model->access_token,
            "client_id" => $model->client_id,
            "user_id" => $model->user_id,
            "expires" => $model->expires,
            "scope" => $model->scope
        ];
    }
}
