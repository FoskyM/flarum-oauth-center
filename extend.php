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

    (new Extend\Middleware('api'))->add(ResourceScopeMiddleware::class),
];
