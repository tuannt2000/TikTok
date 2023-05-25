<?php

namespace App\Http\Controllers\Admin;

use App\Contracts\Services\Admin\VideoServiceInterface;
use App\Http\Controllers\Controller;
use App\Repositories\VideoRepository;
use Illuminate\Http\Request;

class VideosController extends Controller
{
    private $videoRepository;
    private $videoService;

    public function __construct(
        VideoRepository $videoRepository, 
        VideoServiceInterface $videoService
    )
    {
        $this->videoRepository = $videoRepository;
        $this->videoService    = $videoService;
    }

    public function index () {
        $videos = $this->videoService->index();

        return view('content.videos.index', compact('videos'));
    }
}
