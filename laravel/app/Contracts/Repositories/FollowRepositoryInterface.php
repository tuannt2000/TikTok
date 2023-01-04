<?php
namespace App\Contracts\Repositories;

interface FollowRepositoryInterface extends BaseRepositoryInterface
{
    public function store($data);
    public function findFollow($data);
}