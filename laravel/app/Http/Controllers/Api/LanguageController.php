<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Contracts\Services\Api\LanguageServiceInterface;
use App\Http\Requests\Api\Languages\LanguageRequest;

class LanguageController extends Controller
{
    protected $languageService;

    public function __construct(LanguageServiceInterface $languageService)
    {
        $this->languageService = $languageService;
    }

    public function index () {
        $result = $this->languageService->index();

        return response()->json($result, 200);
    }
}
