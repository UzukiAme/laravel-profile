<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ref extends Model
{
    protected $fillable = [
      'ref-name',
      'email',
      'phone'
      ]
}
