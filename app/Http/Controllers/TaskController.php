<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use App\Http\Requests\TaskRequest;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Support\Collection
    {
//      order~の引数は、何を基準に並び替えるかを指定
        return Task::orderByDesc('id')->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //新規作成の表示部分のため使わない。
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request): \Illuminate\Http\JsonResponse
    {
        $task = Task::create($request->all());

//        createメソッドは成功するとデータを返すため、三項演算子で場合分けを行う
//        createメソッドを使う場合はmodelにprotected fillableの記述が必要
        return $task
            ? response()->json($task, 201)
            : response()->json([], 500);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task): \Illuminate\Http\JsonResponse
    {
        $task->title = $request->title;

        return $task->update()
            ? response()->json($task)
            : response()->json([], 500);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task): \Illuminate\Http\JsonResponse
    {
        return $task->delete()
            ? response()->json($task)
            : response()->json([], 500);
    }
}
