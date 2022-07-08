<?php

namespace App\Contracts\Services\Api;

interface DiscoveServiceInterface
{
    public function index();
    public function augmentAccessCount($id = null);
}