<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        if ($schema->hasTable('oauth_jwt')) {
            return;
        }
        $schema->create('oauth_jwt', function (Blueprint $table) {
            $table->increments('id');
            $table->string('client_id', 80);
            $table->string('subject', 80)->nullable();
            $table->string('public_key', 2000);
        });
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('oauth_jwt');
    },
];
