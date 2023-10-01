<?php

/*
 * This file is part of foskym/flarum-oauth-center.
 *
 * Copyright (c) 2023 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace FoskyM\OAuthCenter;

use Flarum\Extend;
use FoskyM\OAuthCenter\Middlewares\ResourceScopeMiddleware;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less')
        ->route('/oauth/authorize', 'oauth.authorize'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/less/admin.less'),
    new Extend\Locales(__DIR__.'/locale'),

    (new Extend\Routes('forum'))
        ->post('/oauth/authorize', 'oauth.authorize.post', Controllers\AuthorizeController::class),

    (new Extend\Routes('api'))
        ->get('/oauth-clients', 'oauth.clients.list', Api\Controller\ListClientController::class)
        ->post('/oauth-clients', 'oauth.clients.create', Api\Controller\CreateClientController::class)
        ->get('/oauth-clients/{client_id}', 'oauth.clients.show', Api\Controller\ShowClientController::class)
        ->patch('/oauth-clients/{id}', 'oauth.clients.update', Api\Controller\UpdateClientController::class)
        ->delete('/oauth-clients/{id}', 'oauth.clients.delete', Api\Controller\DeleteClientController::class)

        ->get('/oauth-scopes', 'oauth.clients.list', Api\Controller\ListClientController::class)
        ->post('/oauth-scopes', 'oauth.clients.create', Api\Controller\CreateClientController::class)
        ->patch('/oauth-scopes/{id}', 'oauth.clients.update', Api\Controller\UpdateClientController::class)
        ->delete('/oauth-scopes/{id}', 'oauth.clients.delete', Api\Controller\DeleteClientController::class),

    (new Extend\Settings)
        ->serializeToForum('foskym-oauth-center.allow_implicit', 'foskym-oauth-center.allow_implicit', 'boolval')
        ->serializeToForum('foskym-oauth-center.enforce_state', 'foskym-oauth-center.enforce_state', 'boolval')
        ->serializeToForum('foskym-oauth-center.require_exact_redirect_uri', 'foskym-oauth-center.require_exact_redirect_uri', 'boolval'),

    (new Extend\Middleware('api'))->add(ResourceScopeMiddleware::class),
];
