@extends('layouts.master')
@include('expansions.test')
@section('titles')
<div class="container">
    @foreach($nodes as $node)
      @if($node->nodes == "Center")
      <div id="{{strtolower($node->nodes)}}-node" class="node">
        <h1 class="{{strtolower($node->nodes)}}-title title"><a href="#">April Carter</a></h1>
      </div>
      @else
      <div id="{{strtolower($node->nodes)}}-node" class="node">
        <h1 class="{{strtolower($node->nodes)}}-title title"><a href="#">{{$node->nodes}}</a></h1>
      </div>
      @endif
    @endforeach
    <div id="svg-container"></div>
</div>
@endsection
