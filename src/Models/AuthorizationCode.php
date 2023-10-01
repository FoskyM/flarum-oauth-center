<?php

/*
 * This file is part of foskym/flarum-oauth-center.
 *
 * Copyright (c) 2023 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
namespace FoskyM\OAuthCenter\Models;

use Flarum\Database\AbstractModel;

class AuthorizationCode extends AbstractModel
{
    protected $table = 'oauth_authorization_codes';
    protected $guarded = [];
}
