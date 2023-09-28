<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        if ($schema->hasTable('oauth_scopes')) {
            return;
        }
        $schema->create('oauth_scopes', function (Blueprint $table) {
            $table->increments('id');
            $table->string('scope', 80);
            $table->boolean('is_default')->nullable();
        });
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('oauth_scopes');
    },
];
