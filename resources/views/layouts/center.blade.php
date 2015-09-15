@extends('layouts.master')
@include('expansions.test')
@section('titles')
<div class="container">
  @foreach($nodes as $node)
    @if($node->nodes == "Center")
    <div id="{{strtolower($node->nodes)}}-node" class="node">
      <h1 class="{{strtolower($node->nodes)}}-title title">April Carter</h1>
    </div>
    @else
    <div id="{{strtolower($node->nodes)}}-node" class="node">
      <h1 class="{{strtolower($node->nodes)}}-title title">{{$node->nodes}}</h1>
    </div>
    @endif
  @endforeach
  <!--<div id="skills-node" class="node">
    <h1 class="skills-title title">Skills</h1>
  </div>
  <div id="projects-node" class="node">
    <h1 class="projects-title title">Projects</h1>
  </div>
  <div id="center-node" class="node">
    <h1 class="center-title">April Carter</h1>
    <p>
      Tweaking, tuning and building the web.
    </p>
  </div>
  <div id="contact-node" class="node">
    <h1 class="contact-title title">Contact</h1>
  </div>
  <div id="references-node" class="node">
    <h1 class="references-title title">References</h1>
  </div>
  <div id="interests-node" class="node">
    <h1 class="interests-title title">Interests</h1>
  </div>
</div>-->
@endsection
