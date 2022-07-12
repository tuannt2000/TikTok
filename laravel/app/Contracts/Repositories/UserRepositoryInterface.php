<?php
namespace App\Contracts\Repositories;

interface UserRepositoryInterface extends BaseRepositoryInterface
{
    public function findUserByKey($q, $type);
    public function getListAccountOffer($id);
}