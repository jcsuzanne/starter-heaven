<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Cache;

class PageController extends MotherbaseController
{
    public function home(Request $request)
    {
        return $content = Cache::remember('home', $this->cacheDuration, function() use($request)
        {
            $lang = config('app.locale');
            $post = $this->WP->get('wp/v2/pages?slug=page-d-exemple')[0];
            $seo = $this->WP->get('jcs/v1/seo/'.$post['id']);
            $datas = [
                'jscontroller'=>'home',
                'item'=>$post,
                'metaTitle'=>$seo['metaTitle_'.$lang],
                'metaDescription'=>$seo['metaDescription_'.$lang],
                'metaImg'=>$this->shared['global']['metaImg']
            ];
            return view('content.home')->with($datas)->render();
        });
    }
}
