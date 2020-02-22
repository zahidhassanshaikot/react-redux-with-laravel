import * as Type from './types'
import Axios from "axios";
import jwtDecode from 'jwt-decode';
import setAuthToken from "../../utils/setAuthToken";

export const register = (user,history) => dispatch=> {
    Axios.post('api/register',user)
        .then(res=>{
            dispatch({
                type:Type.USER_ERROR,
                payload:{
                    error:{}
                }
            })
            history.push('/login')
        })
        .catch(error =>{
            dispatch({
                type:Type.USER_ERROR,
                payload:{
                    error:error.response.data
                }
            })
        })
}

export const login =(user,history)=>dispatch=>{

    Axios.post('api/login',user)
        .then(res=>{
            let token = res.data.data;
            // let token = 'Bearer '+ res.data.data;
            localStorage.setItem('auth_token',token);
            setAuthToken(token);
            let decode=jwtDecode(token);
            // console.log(res);
            console.log(decode.name);
            dispatch({
                type: Type.SET_USER,
                payload:{
                    user:decode
                }
            })
            history.push('/dashboard');
        })
        .catch(error=>{
            dispatch({
                type:Type.USER_ERROR,
                payload:{
                    error:error.response.data
                }
            })
        })
}
export const logout =(history)=>{

    localStorage.removeItem('auth_token');
    history.push('/login');
    return {
        type:Type.SET_USER,
        payload:{
            user:{}
        }
    }
}