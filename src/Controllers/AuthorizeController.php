<?php

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

class AuthorizeController implements RequestHandlerInterface
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

        $params = $request->getParsedBody();

        $oauth = new OAuth();
        $server = $oauth->server();
        $request = $oauth->request()::createFromGlobals();
        $response = $oauth->response();

        if (!$server->validateAuthorizeRequest($request, $response)) {
            $response->send();
            die;
        }

        $is_authorized = (Arr::get($params, 'authorized', 'no') === 'yes');
        $server->handleAuthorizeRequest($request, $response, $is_authorized, $actor->id);
        if ($is_authorized) {
            // this is only here so that you get to see your code in the cURL request. Otherwise, we'd redirect back to the client
           /* $code = substr($response->getHttpHeader('Location'), strpos($response->getHttpHeader('Location'), 'code=')+5, 40);
            exit("SUCCESS! Authorization Code: $code");*/
        }
        $response->send();
    }
}