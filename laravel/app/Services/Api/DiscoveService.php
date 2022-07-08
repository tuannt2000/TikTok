<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 7/8/2022
 * Time: 3:34 PM
 */

namespace App\Services\Api;

use App\Contracts\Services\Api\DiscoveServiceInterface;
use App\Contracts\Repositories\DiscoveRepositoryInterface;
use App\Services\AbstractService;

class DiscoveService extends AbstractService implements DiscoveServiceInterface
{
    /**
     * @var DiscoveRepositoryInterface
     */
    protected $discoveRepository;

    /**
     * CategoryService constructor.
     * @param DiscoveRepositoryInterface $discoveRepository
     */
    public function __construct(DiscoveRepositoryInterface $discoveRepository)
    {
        $this->discoveRepository = $discoveRepository;
    }

    /**
     * @return array
     */
    public function index()
    {
        try {
            return [
                'code' => 200,
                'data' => $this->discoveRepository->getAll()
            ];
        } catch (\Throwable $th) {
            return [
                'code' => 400,
                'message' => trans('messages.discove.listError'),
            ];
        }
    }
}