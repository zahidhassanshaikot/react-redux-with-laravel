import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {logout} from "../store/actions/authAction";

class Home extends Component {
    render() {
        return (
            <div>
                <hi>I am from home</hi>
                {
                    this.props.auth.isAuthenticated ?
                        <button
                            onClick={()=>this.props.logout(this.props.history)}
                            className="btn btn-danger"
                        >Logout</button> :
                        <Link to="/login"><button className="btn btn-success">Login</button></Link>
                }
            </div>
        );
    }
}
const mapStateToProps = state =>({
    auth:state.auth
})

export default connect(mapStateToProps,{logout})(Home);