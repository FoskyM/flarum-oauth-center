<?php

namespace FoskyM\OAuthCenter\Models;

use Flarum\Database\AbstractModel;

class AuthorizationCode extends AbstractModel
{
    protected $table = 'oauth_authorization_codes';
}
