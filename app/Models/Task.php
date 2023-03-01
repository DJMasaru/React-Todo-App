<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use phpDocumentor\Reflection\Types\Boolean;


class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'is_done'
    ];

//    カラムの型を指定するときは$castsを用いる
    protected  $casts = [
        'is_done' => 'bool'
    ];

}
