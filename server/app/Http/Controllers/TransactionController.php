<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Transaction;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Support\Facades\Validator;

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
    public function createTransaction(Request $request){

        $validator = Validator::make($request->all(), [
                'amount' => 'required|max:255',
                'type' => 'required'
            ]);

            if($validator->fails()){
                // return $validator->getMessageBag()->all();
                return response()->json($validator->errors(), 422);
            }


        $user = JWTAuth::parseToken()->authenticate();
        $transaction=new Transaction();
        $transaction->amount=$request->amount;
        $transaction->note=$request->note;
        $transaction->type=$request->type;
        $transaction->user_id=$user->id;
        $transaction->save();

        return $this->responseWithSuccess('Successfully save',$transaction);

    }
    public function deleteTransaction($id){
        $transaction=Transaction::findOrFail($id)->delete();

        return $this->responseWithSuccess('Successfully deleted',$transaction);

    }
    public function updateTransaction(Request $request, $id){

            $validator = Validator::make($request->all(), [
                'amount' => 'required|max:255',
                'type' => 'required'
            ]);

            if($validator->fails()){
                // return $validator->getMessageBag()->all();
                return response()->json($validator->errors(), 422);
            }

        $transaction=Transaction::findOrFail($id);
        $transaction->amount=$request->amount;
        $transaction->note=$request->note;
        $transaction->save();

        return $this->responseWithSuccess('Successfully save',$transaction);
    }

}
