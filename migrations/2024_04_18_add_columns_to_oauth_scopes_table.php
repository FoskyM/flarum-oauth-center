<?php

/*
 * This file is part of foskym/flarum-oauth-center.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        if (!$schema->hasTable('oauth_scopes')) {
            return;
        }

        if (!$schema->hasColumn('oauth_scopes', 'visible_fields')) {
            $schema->table('oauth_scopes', function (Blueprint $table) {
                $table->string('visible_fields', 4000)->nullable()->after('method');
            });
        }
    },
    'down' => function (Builder $schema) {

    },
];
