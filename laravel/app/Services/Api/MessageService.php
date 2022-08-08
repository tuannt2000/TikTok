<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 7/8/2022
 * Time: 3:34 PM
 */

namespace App\Services\Api;

use App\Contracts\Services\Api\MessageServiceInterface;
use App\Contracts\Repositories\MessageRepositoryInterface;
use App\Services\AbstractService;

class MessageService extends AbstractService implements MessageServiceInterface
{
    /**
     * @var MessageRepositoryInterface
     */
    protected $messageRepository;

    /**
     * MessageService constructor.
     * @param MessageRepositoryInterface $messageRepository
     */
    public function __construct(MessageRepositoryInterface $messageRepository)
    {
        $this->messageRepository = $messageRepository;
    }

    /**
     * @param $room_id
     * @return array
     */
    public function index($room_id)
    {
        try {
            return [
                'code' => 200,
                'data' => $this->messageRepository->getListMessages($room_id)
            ];
        } catch (\Throwable $err) {
            return [
                'code' => 400,
                'message' => $err,
            ];
        }
    }
}