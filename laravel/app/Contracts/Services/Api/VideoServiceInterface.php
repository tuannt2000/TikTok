<?php

namespace App\Contracts\Services\Api;

interface VideoServiceInterface
{
    public function index();
    public function getMyVideo();
    public function uploadVideo($url);
}