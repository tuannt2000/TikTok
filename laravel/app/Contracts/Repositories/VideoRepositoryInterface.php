<?php
namespace App\Contracts\Repositories;

interface VideoRepositoryInterface extends BaseRepositoryInterface
{
    public function index($users_friend);
    public function videoFollowing($users_friend);
    public function getMyVideo($id, $is_friend);
    public function getMyVideoLike($users_friend);
    public function uploadVideo($data);
    public function getTopVideo($key_word);
}