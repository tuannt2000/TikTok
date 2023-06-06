<?php

namespace App\Contracts\Services\Api;

interface VideoServiceInterface
{
    public function index();
    public function getVideoById($id);
    public function getVideoNotLogin();
    public function following();
    public function getMyVideo($user_id);
    public function getMyVideoLike();
    public function delete($id);
    public function edit($data);
    public function uploadVideo($data);
    public function likeVideo($data);
    public function findTopVideo($key_word);
    public function report($request);
    public function share($data);
}