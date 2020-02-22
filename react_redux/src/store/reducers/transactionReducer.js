import * as Types from '../actions/types'

const transactionReducer =(state=[],action) =>{
    switch (action.type) {
        case Types.LOAD_TRANSACTIONS: {
            return action.payload.transactions.data
        }
        case Types.CREATE_TRANSACTION: {
            let transactions =[...state]
            transactions.unshift(action.payload.transaction.data)
            return transactions
        }
        case Types.REMOVE_TRANSACTION: {
            let transactions =[...state]
            return transactions.filter(tran => {
                return tran.id != action.payload.id
            })
        }
        case Types.UPDATE_TRANSACTION: {
            let transactions =[...state];
            return transactions.map(tran => {
                if(tran.id === action.payload.transaction.id){
                    return action.payload.transaction
                }
                return tran;
            })
        }

        default:return state
    }
}
export default transactionReducer;