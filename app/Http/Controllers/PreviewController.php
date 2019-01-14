<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Jenssegers\Date\Date;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Psr7;
use GuzzleHttp\Client;

class PreviewController extends MotherbaseController
{
    //
    public function show(Request $request)
    {
        $post_type = $request->input('post_type',false);
        $id = $request->input('p',false);
        $previewMode = $request->input('preview',false);
        if($previewMode === "true"  && $post_type !== false && $id !== false):
            $login = config('jcs.login_preview');
            $password = config('jcs.pass_preview');
            $rootUrl = config('jcs.wpapi');
            $baseUri = $this->WP->getRootUrl().'/wp-json/';
            $base64 = base64_encode("$login:$password");
            $client  = new Client([
                'base_uri' => $baseUri,
                'timeout' => 0,
                'headers' => [
                    'Content-Type' => 'application/json',
                    "Accept" => "application/json",
                    'Authorization' => "Basic " . $base64
                ],
                'verify' => config('jcs.ssl_mode')
            ]);
            if($post_type == 'post'):
                $post_type = 'posts';
            endif;
            try {
                $helper = new HelperController();
                $res = $client->get("wp/v2/$post_type/$id");
                $post = json_decode($res->getBody(),TRUE);
                $postID = $post['id'];
                $fields = $this->WP->get("jcs/v1/acf/$postID");
            } catch(ClientException $e) {
                $code = $e->getCode();
                $error = $e->getMessage();
                dump($error);
                switch($code):
                    case 404:
                        dump('no preview available');
                    break;
                    case 500:
                        dump('error 500');
                    break;
                    default:
                        dump('error 500');
                    break;
                endswitch;
            }
        else:
            dump('no preview available');
        endif;
    }
}
