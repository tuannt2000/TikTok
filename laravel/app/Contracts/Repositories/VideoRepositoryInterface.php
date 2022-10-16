<?php
namespace App\Contracts\Repositories;

interface VideoRepositoryInterface extends BaseRepositoryInterface
{
    public function index($users_following);
    public function uploadVideo($url);
}