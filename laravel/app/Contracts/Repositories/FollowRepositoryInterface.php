<?php
namespace App\Contracts\Repositories;

interface FollowRepositoryInterface extends BaseRepositoryInterface
{
    public function findFollow($data);
}