<?php

/*
 * This file is part of foskym/flarum-oauth-center.
 *
 * Copyright (c) 2023 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        if ($schema->hasTable('oauth_clients')) {
            return;
        }
        $schema->create('oauth_clients', function (Blueprint $table) {
            $table->increments('id');
            $table->string('client_id', 80);
            $table->string('client_secret', 80)->nullable();
            $table->string('redirect_uri', 2000)->nullable();
            $table->string('grant_types', 80)->nullable();
            $table->string('scope', 4000)->nullable();
            $table->string('user_id', 80)->nullable();
        });
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('oauth_clients');
    },
];
