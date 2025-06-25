<?php

namespace App\Services;

use App\Repositories\UserRepository;

class UserService
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function getAll($search = null)
    {
        return $this->userRepository->all($search);
    }

    public function delete($id)
    {
        return $this->userRepository->delete($id);
    }
}
