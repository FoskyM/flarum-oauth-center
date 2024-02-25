<?php

/*
 * This file is part of foskym/flarum-oauth-center.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
namespace FoskyM\OAuthCenter\Controllers;
use Flarum\User\User;
use Flarum\Http\RequestUtil;
use FoskyM\OAuthCenter\Models\Record;
use FoskyM\OAuthCenter\OAuth;
use Illuminate\Support\Arr;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Laminas\Diactoros\Response\JsonResponse;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Group\Group;

class AuthorizeFetchController implements RequestHandlerInterface
{
    protected $settings;
    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertRegistered();

        if (!$actor->hasPermission('foskym-oauth-center.use-oauth')) {
            return new JsonResponse([ 'error' => 'no_permission', 'error_description' => 'Don\'t have the permissions of oauth' ]);
        }

        $params = $request->getParsedBody();

        $oauth = new OAuth($this->settings);
        $server = $oauth->server();
        $request = $oauth->request()::createFromGlobals();
        $response = $oauth->response();

        if (!$server->validateAuthorizeRequest($request, $response)) {
            return new JsonResponse(json_decode($response->getResponseBody(), true));
        }

        $is_authorized = Arr::get($params, 'is_authorized', 0);
        $server->handleAuthorizeRequest($request, $response, $is_authorized, $actor->id);
        if ($is_authorized) {
			Record::create([
				'client_id' => Arr::get($params, 'client_id'),
				'user_id' => $actor->id,
				'authorized_at' => date('Y-m-d H:i:s')
			]);
//            $code = substr($response->getHttpHeader('Location'), strpos($response->getHttpHeader('Location'), 'code=') + 5, 40);
            return new JsonResponse([
                'location'  =>  $response->getHttpHeader('Location')
            ]);
        }

        return new JsonResponse(json_decode($response->getResponseBody(), true));
    }
}
