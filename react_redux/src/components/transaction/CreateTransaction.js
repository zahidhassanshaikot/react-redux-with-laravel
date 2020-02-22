import React, {Component} from 'react';
import Modal from 'react-modal'
import  { connect } from 'react-redux'
import {addNewTransaction} from "../../store/actions/transactionAction";

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        width                 : '500px'
    }
};



class CreateTransaction extends Component {
    state={
        amount:0,
        type: '',
        note: '',

    }
    changeHandler= event => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
submitHandler = event =>{
        event.preventDefault();
        this.props.addNewTransaction(this.state);
        this.setState({
            amount:0,
            type: '',
            note: ''
        })
}

    render() {
        let {amount, note}=this.state;
        return (
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.props.close}
                style={customStyles}
                contentLabel="Create Transaction"
            >
                <h3>Create New Transaction</h3>
                <form onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <label htmlFor='amount'>Amount</label>
                        <input
                            className='form-control'
                            placeholder="Enter Your Amount"
                            type="number"
                            name="amount"
                            id="amount"
                            value={amount}
                            onChange={this.changeHandler}
                        />
                    </div>
                    <div>
                        <label htmlFor='amount'>Type</label>
                        <select
                            className='form-control'
                            name="type"
                            id="type"
                            onChange={this.changeHandler}
                        >
                            <option className="">Select a type</option>
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor='note'>Note</label>
                        <textarea
                            className='form-control'
                            placeholder="Text Note"
                            name="note"
                            id="note"
                            value={note}
                            onChange={this.changeHandler}
                        />
                    </div>
                    <button className="btn btn-primary  my-3 d-block">Save</button>
                </form>
            </Modal>
        );
    }
}

export default connect(null,{addNewTransaction})(CreateTransaction);