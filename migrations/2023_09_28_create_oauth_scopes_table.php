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
            $table->string('resource_path', 500);
            $table->string('method', 20);
            $table->boolean('is_default')->nullable();
        });
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('oauth_scopes');
    },
];
