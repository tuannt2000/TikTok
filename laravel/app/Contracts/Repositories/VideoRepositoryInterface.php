<?php
namespace App\Contracts\Repositories;

interface VideoRepositoryInterface extends BaseRepositoryInterface
{
    public function index($users_following);
    public function videoFollowing($users_following);
    public function getMyVideo($id);
    public function getMyVideoLike($id);
    public function uploadVideo($data);
    public function getTopVideo($key_word);
}