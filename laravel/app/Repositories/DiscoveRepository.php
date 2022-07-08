<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 7/8/2022
 * Time: 3:37 PM
 */

namespace App\Repositories;

use App\Contracts\Repositories\DiscoveRepositoryInterface;
use App\Models\Discove;

class DiscoveRepository extends BaseRepository implements DiscoveRepositoryInterface
{
    /**
     * DiscoveRepository constructor.
     * @param Discove $discove
     */
    public function __construct(Discove $discove)
    {
        parent::__construct($discove);
    }

    public function getAll()
    {
        return $this->model->orderBy('accesses_count', 'DESC')->take(15)->get();
    }
}