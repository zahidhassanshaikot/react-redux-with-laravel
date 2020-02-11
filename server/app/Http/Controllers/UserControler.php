<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Traits\ApiReturnFormat;
use App\User;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Contracts\JWTSubject;

class UserControler extends Controller
{
    use ApiReturnFormat;

    public function hi(){
        return 'hi';
    }
    public function authenticate(Request $request)
    {
            $validator = Validator::make($request->all(), [
                'email' => 'required|max:255',
                'password' => 'required|min:5|max:30'
            ]);

            if($validator->fails()){
                // return $validator->getMessageBag()->all();
                return response()->json($validator->errors(), 422);
            }

            $credentials = $request->only('email', 'password');
            
            try {
                if (! $token = JWTAuth::attempt($credentials)) {
                    return response()->json(['error' => 'invalid_credentials'], 400);
                }
            } catch (JWTException $e) {
                return response()->json(['error' => 'could_not_create_token'], 500);
            }

            return $this->responseWithSuccess('Successfully Login',$token);
    }

    public function register(Request $request)
    {
            $validator = Validator::make($request->all(), [
                'name' => 'required|min:2|max:30',
                'email' => 'required|unique:users|max:255',
                'password' => 'confirmed|required|min:5|max:30',
                'password_confirmation' => 'required|min:5|max:30'
            ]);

            if($validator->fails()){
                // return $validator->getMessageBag()->all();
                return response()->json($validator->errors(), 422);
            }

            $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            ]);

            return $this->responseWithSuccess( __('check_user_mail_for_active_this_account'),$user);

    }
}
