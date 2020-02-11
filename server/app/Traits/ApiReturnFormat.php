<?php 
 namespace App\Traits;
 use Illuminate\Support\Facades\Validator;
 trait ApiReturnFormat
 {
        protected function setMessage($message, $type ='success'){
            session()->flush('message',$message);
            session()->flush('type',$type);
        }

        protected function validateWithJson($data=[], $rules =[]){
            $validator=Validator::make($data,$rules);

            if($validator->passes()){
                return true;
            }
            return response()->json($validator->errors(), 400);
            // return $validator->getMessageBag()->all();
        }

        protected function responseWithSuccess($message='', $data=[], $code =200){
            return response()->json([
                'success' => true,
                'message' => $message,
                'data' => $data,
            ],$code);
        }

        protected function responseWithError($message='', $data=[], $code =400){
            return response()->json([
                'error' => true,
                'message' => $message,
                'data' => $data,
            ],$code);
        }
 }   