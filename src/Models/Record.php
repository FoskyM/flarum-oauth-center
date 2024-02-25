<?php

/*
 * This file is part of foskym/flarum-oauth-center.
 *
 * Copyright (c) 2023 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
namespace FoskyM\OAuthCenter\Models;

use Flarum\Database\AbstractModel;
use Flarum\User\User;

class Record extends AbstractModel
{
    protected $table = 'oauth_records';
    protected $guarded = [];

	public function client()
	{
		return $this->belongsTo(Client::class, 'client_id', 'client_id');
	}
}
