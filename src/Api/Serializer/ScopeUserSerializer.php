<?php

namespace FoskyM\OAuthCenter\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use FoskyM\OAuthCenter\Models\Scope;
use InvalidArgumentException;

class ScopeUserSerializer extends AbstractSerializer
{
    protected $type = 'oauth-scopes';

    protected function getDefaultAttributes($model)
    {
        if (!($model instanceof Scope)) {
            throw new InvalidArgumentException(
                get_class($this) . ' can only serialize instances of ' . Scope::class
            );
        }

        // See https://docs.flarum.org/extend/api.html#serializers for more information.

        return [
            "scope" => $model->scope,
            "is_default" => $model->is_default,
            "scope_name" => $model->scope_name,
            "scope_icon" => $model->scope_icon,
            "scope_desc" => $model->scope_desc,
        ];
    }
}
