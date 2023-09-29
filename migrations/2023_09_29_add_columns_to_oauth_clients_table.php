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
    'client_name' => ['string', 'length' => 500, 'default' => null, 'nullable' => true],
    'client_icon' => ['string', 'length' => 500, 'default' => null, 'nullable' => true],
    'client_desc' => ['string', 'length' => 1000, 'default' => null, 'nullable' => true],
    'client_home' => ['string', 'length' => 200, 'default' => null, 'nullable' => true],
]);
