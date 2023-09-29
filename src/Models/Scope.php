<?php

namespace FoskyM\OAuthCenter\Models;

use Flarum\Database\AbstractModel;

class Scope extends AbstractModel
{
    protected $table = 'oauth_scopes';

    static public function get_path_scope($path = '')
    {
        return self::where('resource_path', 'like', $path . '%')->first();
        // return $this->where('resource_path', $path)->first();
    }
}
