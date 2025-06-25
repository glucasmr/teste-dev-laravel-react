<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_users()
    {
        User::factory()->count(3)->create();
        $response = $this->getJson('/api/users');
        $response->assertStatus(200)
            ->assertJsonCount(3);
    }

    public function test_can_search_users()
    {
        User::factory()->create(['name' => 'Alice']);
        User::factory()->create(['name' => 'Bob']);
        $response = $this->getJson('/api/users?search=Alice');
        $response->assertStatus(200)
            ->assertJsonFragment(['name' => 'Alice'])
            ->assertJsonMissing(['name' => 'Bob']);
    }

    public function test_can_delete_user()
    {
        $user = User::factory()->create();
        $response = $this->deleteJson('/api/users/' . $user->id);
        $response->assertStatus(200)
            ->assertJson(['message' => 'User deleted']);
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }
}
