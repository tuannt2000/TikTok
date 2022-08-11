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
use App\Models\Follow;
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
     * @return array
     */
    public function index()
    {
        try {
            $data = $this->userRepository->getAll();

            return [
                'code' => 200,
                'data' => $data
            ];
            
        } catch (\Throwable $err) {
            return [
                'code' => 400,
                'message' => $err,
            ];
        }
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
        } catch (\Throwable $err) {
            return [
                'code' => 400,
                'message' => $err,
            ];
        }
    }

    public function listAccountOffer ($id)
    {
        try {
            $data = $this->userRepository->getListAccountOffer($id);

            return [
                'code' => 200,
                'data' => $data
            ];
        } catch (\Throwable $err) {
            return [
                'code' => 400,
                'message' => $err,
            ];
        }
    }

    public function listFollowing ($id)
    {
        try {
            $datas = $this->userRepository->find($id)->follows;
            $result = [];

            foreach ($datas as $data) {
                $result[] = $data->userFollowing;
            }

            return [
                'code' => 200,
                'data' => $result
            ];
        } catch (\Throwable $err) {
            return [
                'code' => 400,
                'message' => $err,
            ];
        }
    }

    public function getUserByNickname ($nickname)
    {
        try {
            $data = $this->userRepository->getUserByNickname($nickname);
            $data['followings_count'] = Follow::ofFollowingCount($data->id);
            $data['followers_count'] = Follow::ofFollowerCount($data->id);

            return [
                'code' => 200,
                'data' => $data
            ];
        } catch (\Throwable $err) {
            return [
                'code' => 400,
                'message' => $err,
            ];
        }
    }
}