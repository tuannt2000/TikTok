<?php

namespace App\Repositories;

use App\Contracts\Repositories\LanguageRepositoryInterface;
use App\Models\Language;
use Illuminate\Support\Facades\DB;

class LanguageRepository extends BaseRepository implements LanguageRepositoryInterface
{
    /**
     * CategoryRepository constructor.
     * @param Category $category
     */
    public function __construct(Language $language)
    {
        parent::__construct($language);
    }

    public function getLanguages()
    {
        return $this->model->select('title')->take(5)->get();
    }
}