import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {register} from "../store/actions/authAction";

class Register extends Component {
    state={
        name:'',
        email:'',
        password:'',
        password_confirmation:'',
        error:{},
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if(JSON.stringify(nextProps.auth.error) != JSON.stringify(prevState.error)){
            return {
                error:nextProps.auth.error
            }
        }
        return  null;
    }
    changeHandler=event=>{
        this.setState({
            [event.target.name]:event.target.value

        })
    }
    submitHandler=event=>{
        let {name,email,password,password_confirmation}=this.state;
        event.preventDefault()
        this.props.register({name,email,password,password_confirmation},this.props.history)
    }
    render() {
        let {name, email, password, password_confirmation,error}=this.state;
        return (
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1 className="text-center display-4">Register</h1>
                        <form onSubmit={this.submitHandler}>
                            <div className="form-group">
                                <label htmlFor='name'>Name</label>
                                <input
                                    className={error.name ? 'form-control is-invalid' : 'form-control'}
                                    placeholder="Enter Your Name"
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={name}
                                    onChange={this.changeHandler}
                                />
                                { error.name && <div className="invalid-feedback">
                                    {error.name}
                                </div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor='email'>Email</label>
                                <input
                                    className={error.email ? 'form-control is-invalid' : 'form-control'}
                                    placeholder="Enter Your Email"
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={this.changeHandler}
                                />
                                {error.email && <div className="invalid-feedback">
                                    {error.email}
                                </div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor='password'>Password</label>
                                <input
                                    className={error.password ? 'form-control is-invalid' : 'form-control'}
                                    placeholder="Enter Your Password"
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={password}
                                    onChange={this.changeHandler}
                                />
                                {error.password && <div className="invalid-feedback">
                                    {error.password}
                                </div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor='password_confirmation'>Confirm Password</label>
                                <input
                                    className={error.password_confirmation ? 'form-control is-invalid' : 'form-control'}
                                    placeholder="Confirm Your Password"
                                    type="password"
                                    name="password_confirmation"
                                    id="password_confirmation"
                                    value={password_confirmation}
                                    onChange={this.changeHandler}
                                />
                                {error.password_confirmation && <div className="invalid-feedback">
                                    {error.password_confirmation}
                                </div>}
                            </div>
                            <Link to="/login">Already have account? Login here</Link>
                            <button className="btn btn-primary my-3 d-block">Register</button>
                        </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps=(state)=>({
    auth: state.auth
})

export default connect(mapStateToProps,{register})(Register);