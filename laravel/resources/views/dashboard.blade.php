@extends('index')
 
@section('title', 'Page Title')
 
@section('sidebar') 
    <p>This is appended to the master sidebar.</p>
@stop

@include('menu')
 
@section('content')
    <p>This is my body content.</p>
@stop