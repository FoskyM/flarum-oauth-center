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

class Client extends AbstractModel
{
    protected $table = 'oauth_clients';

    protected $guarded = [];

    public static function build(string $client_id, string $client_secret, int $user_id)
    {
        $client = new static();

        $client->client_id = $client_id;
        $client->client_secret = $client_secret;
        $client->user_id = $user_id;

        return $client;
    }
}
