<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [];
    protected $table = 'transections';

    public function user(){ 
        return $this->belongsTo('App\User');
    }
}
