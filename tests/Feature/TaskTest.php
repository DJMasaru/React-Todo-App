<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Task;
use App\Http\Requests\TaskRequest;

class TaskTest extends TestCase
{
    use RefreshDatabase;
//    ここのテストはアノテーションといい、以下のメソッドに
//    わざわざtest〜と記述しなくてよくなる
    /**
     * @test
     */
    public function 一覧を取得できる(): void
    {
        $tasks = Task::factory()->count(10)->create();

        $response = $this->getJson('api/tasks');

        $response
            ->assertOk()
            ->assertJsonCount($tasks->count());
    }

    /**
     * @test
     */
    public function 登録することができる(): void
    {
        $data = [
            'title' => 'テスト投稿'
        ];

        $response = $this->postJson('api/tasks', $data);

        $response
            ->assertCreated()
            ->assertJsonFragment($data);
    }

    /**
     * @test
     */
    public function タイトルが空の場合は登録することができない(): void
    {
        $data = [
            'title' => ''
        ];

        $response = $this->postJson('api/tasks', $data);
        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'title' => "The title field is required."
            ]);
    }

    /**
     * @test
     */
    public function タイトルが255文字の場合は登録することができない(): void
    {
        $data = [
            'title' => str_repeat('あ',256)];

        $response = $this->postJson('api/tasks', $data);
        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'title' => "The title field must not be greater than 225 characters."
            ]);
    }

    /**
     * @test
     */
    public function 更新することができる(): void
    {
        $task = Task::factory()->create();

        $task->title = '書き換え';

        $response = $this->patchJson("api/tasks/{$task->id}", $task->toArray());

        $response
            ->assertOk()
            ->assertJsonFragment($task->toArray());
    }


    /**
     * @test
     */
    public function 削除することができる(): void
    {
        $tasks = Task::factory()->count(10)->create();

        $response = $this->deleteJson("api/tasks/1");
        $response->assertOk();

        $response = $this->getJson("api/tasks");
        $response ->assertJsonCount($tasks->count() -1);
    }
}
