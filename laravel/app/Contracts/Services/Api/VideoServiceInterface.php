<?php

namespace App\Contracts\Services\Api;

interface VideoServiceInterface
{
    public function index();
    public function uploadVideo($url);
}