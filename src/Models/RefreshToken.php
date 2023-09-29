<?php

namespace FoskyM\OAuthCenter\Models;

use Flarum\Database\AbstractModel;

class RefreshToken extends AbstractModel
{
    protected $table = 'oauth_refresh_tokens';
}
