<?php
namespace App\Contracts\Repositories;

interface UserRepositoryInterface extends BaseRepositoryInterface
{
    public function getAll();
    public function findUserByKey($q, $type);
    public function getListAccountOffer($id);
    public function getUserByNickname ($nickname);
}