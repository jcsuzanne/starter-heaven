<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SitemapController extends MotherbaseController
{
    //
    public function get(Request $request)
    {
        $sitemap = \App::make('sitemap');

        // Temp
        $sitemap->add($this->shared['navigation']['mainnav']['home']['url'], null, '1.0', 'weekly');
        // Mainnav
        // if(isset($this->shared['navigation']['mainnav']) && !empty($this->shared['navigation']['mainnav'])):
        //     $mainnav = $this->shared['navigation']['mainnav'];
        //     foreach($mainnav as $item):
        //         $sitemap->add($item['url'], null, '1.0', 'weekly');
        //     endforeach;
        // endif;


        // // Works
        // $posts = $this->WP->get("wp/v2/works?per_page=100&orberby=date");
        // if(!empty($posts)):
        //     foreach($posts as $ref):
        //         $ref['post_name'] = $ref['slug'];
        //         $url = $this->helper->makeUrlWork($ref);;
        //         $sitemap->add($url, $ref['modified_gmt'], '1.0', 'monthly');
        //     endforeach;
        // endif;

        return $sitemap->render('xml');
    }
}
