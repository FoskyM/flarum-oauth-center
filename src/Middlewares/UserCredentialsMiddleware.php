<?php

namespace FoskyM\OAuthCenter\Middlewares;

use Flarum\User\User;
use FoskyM\OAuthCenter\OAuth;
use FoskyM\OAuthCenter\Storage;
use Illuminate\Support\Arr;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Laminas\Diactoros\Response\JsonResponse;
use FoskyM\OAuthCenter\Models\Scope;
class UserCredentialsMiddleware implements MiddlewareInterface
{
    public function process(Request $request, RequestHandlerInterface $handler): Response
    {
        $uri = [
            '/oauth/token',
        ];
        $path = $request->getUri()->getPath();
        if (in_array($path, $uri) && Arr::get($request->getParsedBody(), 'grant_type', '') === 'password') {
            if ($user = User::where('username', Arr::get($request->getParsedBody(), 'username', ''))->first()) {
                if (!$user->hasPermission('foskym-oauth-center.use-oauth')) {
                    return new JsonResponse([ 'error' => 'no_permission', 'error_description' => 'Don\'t have the permissions of oauth' ]);
                }
            }
        }

        return $handler->handle($request);
    }
}
