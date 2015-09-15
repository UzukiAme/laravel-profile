<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Node;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class WebController extends Controller
{
    public function index() {
      $nodes = Node::all();
      return view('layouts.center', ["nodes" => $nodes]);
    }
}
