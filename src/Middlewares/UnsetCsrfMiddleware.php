<?php

namespace FoskyM\OAuthCenter\Middlewares;

use Flarum\Foundation\ErrorHandling\ExceptionHandler\IlluminateValidationExceptionHandler;
use Flarum\Foundation\ErrorHandling\JsonApiFormatter;
use FoskyM\OAuthCenter\OAuth;
use FoskyM\OAuthCenter\Storage;
use Illuminate\Support\Arr;
use Illuminate\Validation\ValidationException;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Flarum\Http\RequestUtil;
use Flarum\Api\JsonApiResponse;
use Tobscure\JsonApi\Document;
use Tobscure\JsonApi\Exception\Handler\ResponseBag;

use FoskyM\OAuthCenter\Models\Scope;
class UnsetCsrfMiddleware implements MiddlewareInterface
{
    public function process(Request $request, RequestHandlerInterface $handler): Response
    {
        $uri = [
            '/oauth/token',
			'/oauth/authorize',
        ];
        $path = $request->getUri()->getPath();
        if (in_array($path, $uri)) {
            $request = $request->withAttribute('bypassCsrfToken', true);
        }

        return $handler->handle($request);
    }
}
