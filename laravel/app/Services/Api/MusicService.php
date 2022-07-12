<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 7/8/2022
 * Time: 3:34 PM
 */

namespace App\Services\Api;

use App\Contracts\Services\Api\MusicServiceInterface;
use App\Contracts\Repositories\MusicRepositoryInterface;
use App\Services\AbstractService;

class MusicService extends AbstractService implements MusicServiceInterface
{
    /**
     * @var MusicRepositoryInterface
     */
    protected $musicRepository;

    /**
     * CategoryService constructor.
     * @param MusicRepositoryInterface $musicRepository
     */
    public function __construct(MusicRepositoryInterface $musicRepository)
    {
        $this->musicRepository = $musicRepository;
    }

    /**
     * @return array
     */
    public function index()
    {
        try {
            return [
                'code' => 200,
                'data' => $this->musicRepository->getAll()
            ];
        } catch (\Throwable $th) {
            return [
                'code' => 400,
                'message' => trans('messages.music.listError'),
            ];
        }
    }
}