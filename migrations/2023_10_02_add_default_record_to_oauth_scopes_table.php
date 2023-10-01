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
        if (!$schema->hasTable('oauth_scopes')) {
            return;
        }
        $schema->getConnection()->table('oauth_scopes')->insert([
            'scope' => 'user.read',
            'resource_path' => '/api/user',
            'method' => 'GET',
            'is_default' => 1,
            'scope_name'    =>  '获取用户信息',
            'scope_icon'    =>  'fas fa-user',
            'scope_desc'    =>  '访问该用户({user})的个人信息等',
        ]);
    },
    'down' => function (Builder $schema) {

    },
];
