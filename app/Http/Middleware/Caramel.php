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

        $isAjax = $request->ajax();
        $response = $next($request);
        $datas = (array) json_decode($response->content());

        if( !$isAjax ):
            return response()->view( $datas['template'], $datas );
        endif;


        $response->header('Content-Type', 'json');

        return $response->setContent( $datas );
    }
}
