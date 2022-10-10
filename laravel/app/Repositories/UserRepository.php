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

    public function getAll()
    {
        return $this->model
                    ->select('users.*', DB::raw("CONCAT(first_name, ' ', last_name) AS full_name"))
                    ->get();
    }

    public function findUserByKey($q, $type)
    {
        $query = $this->model
                ->select('users.*', DB::raw("CONCAT(first_name, ' ', last_name) AS full_name"))
                ->where('nickname', 'like', '%'.$q.'%');

        if ($type == 'less') {
            $query->take(5);
        }

        return $query->get();
    }

    public function getListAccountOffer ($id)
    {
        return $this->model
            ->select('users.*', DB::raw("CONCAT(first_name, ' ', last_name) AS full_name"))
            ->where('id', '!=', $id)
            ->get();
    }

    public function getUserByNickname ($nickname)
    {
        return $this->model
            ->select('users.*', DB::raw("CONCAT(first_name, ' ', last_name) AS full_name"))
            ->where('nickname', $nickname)
            ->first();
    }
}