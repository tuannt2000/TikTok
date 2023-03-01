<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 7/8/2022
 * Time: 3:34 PM
 */

namespace App\Services\Api;

use App\Contracts\Services\Api\CommentServiceInterface;
use App\Contracts\Repositories\CommentRepositoryInterface;
use App\Services\AbstractService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CommentService extends AbstractService implements CommentServiceInterface
{
    /**
     * @var CommentRepositoryInterface
     */
    protected $commentRepository;

    /**
     * CommentService constructor.
     * @param CommentRepositoryInterface $commentRepository
     */
    public function __construct(CommentRepositoryInterface $commentRepository)
    {
        $this->commentRepository = $commentRepository;
    }

    /**
     * @param array $data
     * @return array
     */
    public function store($data)
    {
        try {
            $data['user_id'] = Auth::user()->id;
            $data['date_comment'] = Carbon::now();
            $this->commentRepository->create($data);

            return [
                'code' => 200,
                'message' => "Đăng comment thành công"
            ];
        } catch (\Throwable $err) {
            Log::error($err);
            
            return [
                'code' => 400,
                'message' => $err->getMessage()
            ];
        }
    }
}