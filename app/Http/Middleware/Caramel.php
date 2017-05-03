<?php

namespace App\Http\Middleware;

use Closure;

class Caramel
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        $datas = (array) json_decode($response->content());
        return response()->view( $datas['template'], $datas );
    }
}
