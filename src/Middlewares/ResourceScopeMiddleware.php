<?php

namespace FoskyM\OAuthCenter\Middlewares;

use Flarum\Foundation\ErrorHandling\ExceptionHandler\IlluminateValidationExceptionHandler;
use Flarum\Foundation\ErrorHandling\JsonApiFormatter;
use Flarum\Settings\SettingsRepositoryInterface;
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
use Flarum\Api\JsonApiResponse;
use Tobscure\JsonApi\Document;
use Tobscure\JsonApi\Exception\Handler\ResponseBag;

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
        $path = $request->getUri()->getPath();
        $token = Arr::get($request->getQueryParams(), 'access_token', '');
        if ($token !== '' && $scope = Scope::get_path_scope($path)) {
            if (strtolower($request->getMethod()) === strtolower($scope->method)) {
                try {
                    $oauth = new OAuth($this->settings);
                    $server = $oauth->server();
                    $request = $oauth->request();
                    if (!$server->verifyResourceRequest($request::createFromGlobals(), null, $scope->scope)) {
                        return new JsonResponse(json_decode($server->getResponse()->getResponseBody(), true));
                    }
                    /*$error = new ResponseBag('422', [
                        [
                            'status' => '422',
                            'code' => 'validation_error',
                            'source' => [
                                'pointer' => $path,
                            ],
                            'detail' => 'Yikes! The access token don\'t has the scope.',
                        ],
                    ]);
                    $document = new Document();
                    $document->setErrors($error->getErrors());

                    return new JsonApiResponse($document, $error->getStatus());*/
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
