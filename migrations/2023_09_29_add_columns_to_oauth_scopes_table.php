<?php

/*
 * This file is part of foskym/flarum-oauth-center.
 *
 * Copyright (c) 2023 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

use Flarum\Database\Migration;

return Migration::addColumns('oauth_scopes', [
    'scope_name' => ['string', 'default' => null, 'nullable' => true],
    'scope_icon' => ['string', 'default' => null, 'nullable' => true],
    'scope_desc' => ['string', 'default' => null, 'nullable' => true],
]);
