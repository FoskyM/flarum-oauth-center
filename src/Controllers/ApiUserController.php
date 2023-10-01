<?php

/*
 * This file is part of foskym/flarum-oauth-center.
 *
 * Copyright (c) 2023 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
namespace FoskyM\OAuthCenter\Controllers;
use Flarum\User\User;
use Flarum\Http\RequestUtil;
use FoskyM\OAuthCenter\OAuth;
use Illuminate\Support\Arr;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Laminas\Diactoros\Response\JsonResponse;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Group\Group;

class ApiUserController implements RequestHandlerInterface
{
    protected $settings;
    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);
        $actor = $actor->toArray();
        $data = [
            'id' => $actor['id'],
            'username' => $actor['username'],
            'nickname'  => $actor['nickname'],
            'avatar_url' => $actor['avatar_url'],
            'email' => $actor['email'],
            'is_email_confirmed' => $actor['is_email_confirmed'],
            'joined_at' => $actor['joined_at'],
            'last_seen_at' => $actor['last_seen_at'],
            'discussion_count' => $actor['discussion_count'],
            'comment_count' => $actor['comment_count'],
        ];
        return new JsonResponse($data);
    }
}
