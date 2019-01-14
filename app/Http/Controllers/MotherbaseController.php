<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\HelperController;
use Cache;
use StdClass;

class MotherbaseController extends Controller
{
    public $shared;
    private $cacheEnabled;
    protected $cacheDuration = 1440;
    protected $WP;
    protected $helper;
    protected $routes;

    public function __construct(Request $request, HelperController $helper)
    {
        // $this->routes = require(base_path().'/routes/paths.php');
        $this->WP = new WpController();
        $this->helper = $helper;
        $this->cacheEnabled = config('jcs.cache_enabled');
        if($this->cacheEnabled == false):
            Cache::flush();
        endif;
        $dataShared = [
            'global'=>$this->globalInfo(),
            'navigation'=>$this->mainNavigation(),
        ];
        $this->shared = $dataShared;
        view()->share('shared',$this->shared);
    }

    public function globalInfo()
    {
        $global = Cache::remember('global', $this->cacheDuration, function()
        {
            return $data = $this->WP->get('jcs/v1/global');
        });
        return $global;
    }

    //
    public function mainNavigation()
    {
        $menu = Cache::remember('mainnav', $this->cacheDuration, function()
        {
            return $data = $this->WP->get('wp-api-menus/v2/menus/2');
        });
        return $menu;
    }
}
