import Axios from "axios";
import * as Type from './types'

export const loadTransactions = () => dispatch=> {
    Axios.get('api/transactions')
        .then(response=>{
            dispatch({
                type:Type.LOAD_TRANSACTIONS,
                payload:{
                    transactions:response.data
                }
            })

        })
        .catch(error =>{

        })
}
export const addNewTransaction = transaction => dispatch=> {
    Axios.post('api/transaction',transaction)
        .then(response=>{
            dispatch({
                type:Type.CREATE_TRANSACTION,
                payload:{
                    transaction:response.data
                }
            })
        })
        .catch(error =>{
                console.log(error);
        })
}
export const removeTransaction = id => dispatch=> {
    Axios.delete(`api/transaction/${id}`)
        .then(response=>{
            dispatch({
                type:Type.REMOVE_TRANSACTION,
                payload:{
                    id:id
                }
            })
        })
        .catch(error =>{
                console.log(error);
        })
}
export const updateTransaction = (id, transaction) => dispatch=> {
    Axios.put(`api/transaction/${id}`,transaction)
        .then(response=>{
            // console.log(response.data.data.id);
            dispatch({
                type:Type.UPDATE_TRANSACTION,
                payload:{
                    transaction:response.data.data
                }
            })
        })
        .catch(error =>{
                console.log(error);
        })
}