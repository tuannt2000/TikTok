<?php

namespace App\Services\Api;

use App\Contracts\Repositories\LanguageRepositoryInterface;
use App\Contracts\Services\Api\LanguageServiceInterface;
use App\Services\AbstractService;

class LanguageService extends AbstractService implements LanguageServiceInterface
{
    /**
     * @var LanguageRepositoryInterface
     */
    protected $languageRepository;

    /**
     * CategoryService constructor.
     * @param LanguageRepositoryInterface $languageRepository
     */
    public function __construct(LanguageRepositoryInterface $languageRepository)
    {
        $this->languageRepository = $languageRepository;
    }

    /**
     * @param $params
     * @return array
     */
    public function index()
    {
        try {
            return [
                'code' => 200,
                'data' => $this->languageRepository->getAll()
            ];
        } catch (\Throwable $th) {
            return [
                'code' => 400,
                'message' => trans('messages.language.listError'),
            ];
        }
    }
}
