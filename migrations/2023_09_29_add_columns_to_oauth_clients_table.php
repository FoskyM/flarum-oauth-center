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

return Migration::addColumns('oauth_clients', [
    'client_name' => ['string', 'default' => null, 'nullable' => true],
    'client_icon' => ['string', 'default' => null, 'nullable' => true],
    'client_desc' => ['string', 'default' => null, 'nullable' => true],
    'client_home' => ['string', 'default' => null, 'nullable' => true],
]);
