<?php

namespace FoskyM\OAuthCenter\Middlewares;

use Flarum\Foundation\ErrorHandling\ExceptionHandler\IlluminateValidationExceptionHandler;
use Flarum\Foundation\ErrorHandling\JsonApiFormatter;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\User;
use FoskyM\OAuthCenter\OAuth;
use FoskyM\OAuthCenter\Storage;
use Illuminate\Support\Arr;
use Illuminate\Validation\ValidationException;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Flarum\Http\RequestUtil;
use FoskyM\OAuthCenter\Models\Scope;

class ResourceScopeMiddleware implements MiddlewareInterface
{
    protected $settings;
    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }
    public function process(Request $request, RequestHandlerInterface $handler): Response
    {
        if (!$request->getAttribute('originalUri')) {
            return $handler->handle($request);
        }

        $path = $request->getAttribute('originalUri')->getPath();
        $token = Arr::get($request->getQueryParams(), 'access_token', '');
        if ($token !== '' && $scope = Scope::get_path_scope($path)) {
            if (strtolower($request->getMethod()) === strtolower($scope->method)) {
                try {
                    $oauth = new OAuth($this->settings);
                    $server = $oauth->server();
                    $oauth_request = $oauth->request()::createFromGlobals();

                    if (!$server->verifyResourceRequest($oauth_request, null, $scope->scope)) {
                        return new JsonResponse(json_decode($server->getResponse()->getResponseBody(), true));
                    }

                    $token = $server->getAccessTokenData($oauth_request);
                    $actor = User::find($token['user_id']);

                    $request = RequestUtil::withActor($request, $actor);
                    $request = $request->withAttribute('bypassCsrfToken', true);
                    $request = $request->withoutAttribute('session');
                } catch (ValidationException $exception) {

                    $handler = resolve(IlluminateValidationExceptionHandler::class);

                    $error = $handler->handle($exception);

                    return (new JsonApiFormatter())->format($error, $request);
                }
            }
        }

        return $handler->handle($request);
    }
}
