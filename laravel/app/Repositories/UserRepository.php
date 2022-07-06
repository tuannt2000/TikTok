<?php
namespace App\Repositories;

use App\Contracts\Repositories\UserRepositoryInterface;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{
    /**
     * UserRepository constructor.
     * @param User $user
     */
    public function __construct(User $user)
    {
        parent::__construct($user);
    }

    public function findUserByKey($q, $type)
    {
        if ($type == 'less') {
            return $this->model->select('users.*', DB::raw("CONCAT(first_name, ' ', last_name) AS full_name"))->where('nickname', 'like', '%'.$q.'%')->take(5)->get();
        }

        return $this->model->where('nickname LIKE', '%'.$q.'%')->get();
    }
}