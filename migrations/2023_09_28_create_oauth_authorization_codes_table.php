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
        if ($schema->hasTable('oauth_authorization_codes')) {
            return;
        }
        $schema->create('oauth_authorization_codes', function (Blueprint $table) {
            $table->increments('id');
            $table->string('authorization_code', 40);
            $table->string('client_id', 80);
            $table->string('user_id', 80)->nullable();
            $table->string('redirect_uri', 2000)->nullable();
            $table->timestamp('expires');
            $table->string('scope', 4000)->nullable();
            $table->string('id_token', 1000)->nullable();
        });
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('oauth_authorization_codes');
    },
];
