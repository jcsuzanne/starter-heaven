<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WpController extends Controller
{
    protected $rootUrl;

    public function __construct()
    {
        $this->rootUrl = config('jcs.wpapi');
    }

    public function get($path)
    {
        $url = $this->rootUrl.'/wp-json/'.$path;
        return json_decode(file_get_contents($url),TRUE);
    }

}
