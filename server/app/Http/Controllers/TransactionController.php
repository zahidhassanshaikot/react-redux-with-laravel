<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Transaction;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Contracts\JWTSubject;

use App\Traits\ApiReturnFormat;

class TransactionController extends Controller
{
    use ApiReturnFormat;

    public function transactions(){
        $token = JWTAuth::getToken();
        // $user = JWTAuth::toUser($token);

         try {
            if($token != null){
                if (! $user = JWTAuth::parseToken()->authenticate()) {
                    return response()->json(['user_not_found'], 404);
                }
            }else{
                return response()->json(['token_absent'], 404);
            }
                } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
                    return response()->json(['token_expired'], $e->getStatusCode());
                } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
                    return response()->json(['token_invalid'], $e->getStatusCode());
                } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
                    return response()->json(['token_absent'], $e->getStatusCode());
                }

            $transactions=Transaction::where('user_id',$user->id)->get();
        
        // return $transactions;
        return $this->responseWithSuccess('Data Found',$transactions);
    }

}
