<?php

namespace App\Contracts\Services\Api;

interface VideoServiceInterface
{
    public function index();
    public function following();
    public function getMyVideo();
    public function uploadVideo($data);
    public function likeVideo($data);
    public function findTopVideo($key_word);
}