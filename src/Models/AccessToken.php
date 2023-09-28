<?php

namespace FoskyM\OAuthCenter\Models;

use Flarum\Database\AbstractModel;

class AccessToken extends AbstractModel
{
    protected $table = 'oauth_access_tokens';
}
