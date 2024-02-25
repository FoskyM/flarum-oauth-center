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
        if ($schema->hasTable('oauth_records')) {
            return;
        }
        $schema->create('oauth_records', function (Blueprint $table) {
            $table->increments('id');
            $table->string('client_id', 80);
            $table->string('user_id', 80)->nullable();
            $table->timestamp('authorized_at');
        });
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('oauth_records');
    },
];
