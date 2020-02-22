import React, {Component} from 'react';
import {connect} from 'react-redux'
import {loadTransactions, removeTransaction} from './../store/actions/transactionAction'
import CreateTransaction from "../components/transaction/CreateTransaction";
import UpdateTransaction from "../components/transaction/UpdateTransaction";

class Dashboard extends Component {
    state = {
        createModalOpen:false,
        updateModalOpen:false
    }

    openCreateModal=()=>{
        this.setState({
            createModalOpen:true
        })
    }
    closeCreateModal=()=>{
        this.setState({
            createModalOpen:false
        })
    }
    openUpdateModal=(id)=>{
        this.setState({
            updateModalOpen:true,
            id
        })
    }
    closeUpdateModal=()=>{
        this.setState({
            updateModalOpen:false,
            id:''
        })
    }

    componentDidMount() {
        this.props.loadTransactions();
    }

    render() {
        let {auth, transactions}= this.props;

        return (

            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h1>welcome {auth.user.name}</h1>
                    <p>email: {auth.user.email}</p>
                    <button
                        className="btn btn-primary"
                        onClick={this.openCreateModal}
                    >Create New Transaction</button>
                    <CreateTransaction
                        isOpen={this.state.createModalOpen}
                        close={this.closeCreateModal}
                    />
                    <hr/>
                    <h1>Transaction</h1>
                    <ul className="list-group">
                        {
                            transactions.map(transaction=>(
                                <li
                                    key={transaction.id}
                                    className="list-group-item">
                                    <p>Type:{transaction.type} </p>
                                    <p>Amount:{transaction.amount} </p>
                                    {
                                        this.state.id===transaction.id ?
                                            <UpdateTransaction
                                                isOpen={this.state.updateModalOpen}
                                                close={this.closeUpdateModal}
                                                transaction={transaction}
                                            /> :null
                                    }

                                    <button
                                        className="btn btn-danger"
                                        onClick={()=>this.props.removeTransaction(transaction.id)}
                                    >Remove</button>
                                    <button
                                        className="btn btn-warning"
                                        onClick={()=>this.openUpdateModal(transaction.id)}
                                    >Update</button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps=(state)=>({
    auth:state.auth,
    transactions:state.transactions
});

export default connect(mapStateToProps,{loadTransactions,removeTransaction})(Dashboard);