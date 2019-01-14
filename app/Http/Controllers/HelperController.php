<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use StdClass;

class HelperController extends Controller
{
    // protected $routes;
    protected $WP;

    public function __construct()
    {
        // $this->routes = require(base_path().'/routes/paths.php');
        $this->WP = new WpController();
    }

    public function hackMailto($string)
    {
        $content = str_replace('href="mailto:','class="jsTrigger-mailto" data-noinner="true" data-mailto="mailto:',$string);
        $content = str_replace('@','[at]',$content);
        return $content;
    }

    public function getUrlRoute($post)
    {
        $lang = config('app.locale');
        $url = url($lang.'/'.$post->post_name);
        return $url;
    }

    public function makeUrl(String $type = 'post',String $slug)
    {
        switch ($type):
            default:
                $url = url("news/$slug");
                break;
        endswitch;
        return $url;
    }

    public function updatePostWithLang($post)
    {
        $lang = config('app.locale');
        // $lang = 'en';
        $ID = $post['id'];
        $content = new StdClass;
        $fieldExcerpt = $this->WP->get("jcs/v1/acf_field/$ID/post_excerpt_$lang");
        $fieldContent = $this->WP->get("jcs/v1/acf_field/$ID/post_content_$lang");
        if(!is_null($fieldExcerpt)):
            $content->subtitle = $fieldExcerpt;
        endif;
        if(!is_null($fieldContent)):
            $content->description = $fieldContent;
        endif;
        $content->title = $post['title']['rendered'];
        if($lang !== 'fr'):
            $fieldTitle = $this->WP->get("jcs/v1/acf_field/$ID/post_title_$lang");
            if(!is_null($fieldTitle) && !empty($fieldTitle)):
                $content->title = $fieldTitle;
            endif;
        endif;
        return $content;
    }

    public function mergePostWithLang($post,$data)
    {
        $lang = config('app.locale');
        // $lang = 'en';
        $content = new StdClass;
        $fieldExcerpt = $data["post_excerpt_$lang"];
        $fieldContent = $data["post_content_$lang"];
        if(!is_null($fieldExcerpt)):
            $content->subtitle = $fieldExcerpt;
        endif;
        if(!is_null($fieldContent)):
            $content->description = $fieldContent;
        endif;
        $content->title = $post['title']['rendered'];
        if($lang !== 'fr'):
            $fieldTitle = $data["post_title_$lang"];
            if(!is_null($fieldTitle) && !empty($fieldTitle)):
                $content->title = $fieldTitle;
            endif;
        endif;
        return $content;
    }

    public function paginationCheckAfter($request)
    {
        try
        {
            $client = new Client();
            $response = $client->get($request);
            $ctaMore = true;
        } catch(ClientException $e) {
            $code = $e->getCode();
            $ctaMore = false;
        }
        return $ctaMore;
    }

    public function seo($datas,$global)
    {
        $seo = array();
        if(isset($datas['seo_acf']['seo_title']) && !empty($datas['seo_acf']['seo_title'])):
            $seo['title'] = $datas['seo_acf']['seo_title'];
        else:
            $seo['title'] = $datas['title']['rendered'].' - '.$global['sitename'];
        endif;
        if(isset($datas['seo_acf']['seo_description']) && !empty($datas['seo_acf']['seo_description'])):
            $seo['description'] = $datas['seo_acf']['seo_description'];
        else:
            $seo['description'] = strip_tags($datas['excerpt']['rendered']);
        endif;

        return $seo;
    }
}
