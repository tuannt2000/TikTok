<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 7/6/2022
 * Time: 3:20 PM
 */

namespace App\Services\Api;

use App\Contracts\Repositories\UserRepositoryInterface;
use App\Contracts\Services\Api\UserServiceInterface;
use App\Services\AbstractService;

class UserService extends AbstractService implements UserServiceInterface
{
    /**
     * @var UserRepositoryInterface
     */
    protected $userRepository;

    /**
     * CategoryService constructor.
     * @param UserRepositoryInterface $userRepository
     */
    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * @param $params
     * @return array
     */
    public function findUserByKey($params)
    {
        try {
            $data = $this->userRepository->findUserByKey($params['q'], $params['type']);

            if ($data->count() > 0) {
                return [
                    'code' => 200,
                    'data' => $data
                ];
            }

            return [
                'code' => 404,
                'data' => [
                    ['message' => 'Không có kết quả nào được tìm thấy']
                ],                
            ];
        } catch (\Throwable $th) {
            return [
                'code' => 400,
                'message' => trans('messages.user.searchError'),
            ];
        }
    }
}