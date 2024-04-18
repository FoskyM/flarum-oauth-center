<?php

namespace FoskyM\OAuthCenter\Middlewares;

use Flarum\Foundation\ErrorHandling\ExceptionHandler\IlluminateValidationExceptionHandler;
use Flarum\Foundation\ErrorHandling\JsonApiFormatter;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\User;
use FoskyM\OAuthCenter\OAuth;
use FoskyM\OAuthCenter\Storage;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Flarum\Http\RequestUtil;
use FoskyM\OAuthCenter\Models\Scope;

class ResourceScopeFieldsMiddleware implements MiddlewareInterface
{
    protected $settings;
    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }
    public function process(Request $request, RequestHandlerInterface $handler): Response
    {
        $actor = RequestUtil::getActor($request);
        $response = $handler->handle($request);
        if ($scopes = $request->getAttribute('oauth.scopes')) {
            return $this->filterResponse($response, $scopes);
        }
        return $response;
    }

    private function filterResponse(Response $response, $scopes)
    {
        $data = [];
        $origin = json_decode($response->getBody(), true);

        $visible_fields = [];

        foreach ($scopes as $scope) {
            $visible_fields = array_merge($visible_fields, explode(',', $scope['visible_fields']));
        }

        $visible_fields = array_unique(array_values(array_filter($visible_fields)));

        if (empty($visible_fields)) {
            return $response;
        }

        foreach ($visible_fields as $visible_field) {
            if (Arr::has($origin, $visible_field)) {
                Arr::set($data, $visible_field, Arr::get($origin, $visible_field));
            }
        }

        return new JsonResponse($data, $response->getStatusCode());
    }
}
