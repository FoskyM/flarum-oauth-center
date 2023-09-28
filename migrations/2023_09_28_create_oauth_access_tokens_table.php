<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        if ($schema->hasTable('oauth_access_tokens')) {
            return;
        }
        $schema->create('oauth_access_tokens', function (Blueprint $table) {
            $table->increments('id');
            $table->string('access_token', 40);
            $table->string('client_id', 80);
            $table->string('user_id', 80)->nullable();
            $table->timestamp('expires');
            $table->string('scope', 4000)->nullable();
        });
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('oauth_access_tokens');
    },
];
