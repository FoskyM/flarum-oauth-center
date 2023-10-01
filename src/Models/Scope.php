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

class Scope extends AbstractModel
{
    protected $table = 'oauth_scopes';
    protected $guarded = [];
    static public function get_path_scope($path = '')
    {
        return self::where('resource_path', 'like', $path . '%')->first();
        // return $this->where('resource_path', $path)->first();
    }
}
