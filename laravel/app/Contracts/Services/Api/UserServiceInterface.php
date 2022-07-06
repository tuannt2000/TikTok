<?php

namespace App\Contracts\Services\Api;

interface UserServiceInterface
{
    public function findUserByKey($params);
}