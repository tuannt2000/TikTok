<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Language;

class LanguageController extends Controller
{
    public function listLanguage () {
        $response = [
            'data' => Language::all(),
        ];

        return response()->json($response, 200);
    }
}
