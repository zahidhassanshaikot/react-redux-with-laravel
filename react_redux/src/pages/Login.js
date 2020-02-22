import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../store/actions/authAction";


class Login extends Component {
    state={
        email:'',
        password:'',
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
        event.preventDefault();
        let {email,password}=this.state;
        this.props.login({email,password},this.props.history)
    }
    render() {
        let {email, password,error}=this.state;
        return (
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1 className="text-center display-4">Login</h1>
                    <form onSubmit={this.submitHandler}>

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
                        <Link to="/register">Don't have account?</Link>
                        <button className="btn btn-primary  my-3 d-block">Login</button>
                    </form>
                </div>
            </div>
        );
    }
}
const mapStateToProps=state=>({
    auth:state.auth
})

export default connect(mapStateToProps,{login})(Login);