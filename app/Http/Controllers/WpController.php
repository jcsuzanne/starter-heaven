<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Psr7;
use GuzzleHttp\Client;

class WpController extends Controller
{
    protected $rootUrl;
    protected $guzzleMode = true;
    protected $client;

    public function __construct()
    {
        $this->rootUrl = config('jcs.wpapi');
        if($this->guzzleMode):
            $this->client = new Client();
        endif;
    }

    public function get($path)
    {
        $url = $this->rootUrl.'/wp-json/'.$path;
        if($this->guzzleMode):
            $res = $this->client->get($url);
            $body = json_decode($res->getBody(),TRUE);
            return $body;
        else:
            return json_decode(file_get_contents($url),TRUE);
        endif;


    }

    public function getRootUrl()
    {
        return $this->rootUrl;
    }

}