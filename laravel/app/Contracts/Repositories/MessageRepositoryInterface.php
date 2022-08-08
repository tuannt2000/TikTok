<?php
namespace App\Contracts\Repositories;

interface MessageRepositoryInterface extends BaseRepositoryInterface
{
    public function getListMessages($room_id);
    public function store($params);
}