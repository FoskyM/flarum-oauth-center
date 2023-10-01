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

class TokenController implements RequestHandlerInterface
{
    protected $settings;
    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $oauth = new OAuth($this->settings);
        $server = $oauth->server();

        $body = $server->handleTokenRequest($oauth->request()::createFromGlobals())
            ->getResponseBody();
        return new JsonResponse(json_decode($body, true));
    }
}
