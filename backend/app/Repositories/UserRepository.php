<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    public function all($search = null)
    {
        $query = User::query();
        if ($search) {
            $query->where('name', 'like', "%$search%");
        }
        return $query->get();
    }

    public function find($id)
    {
        return User::find($id);
    }

    public function delete($id)
    {
        return User::destroy($id);
    }
}
