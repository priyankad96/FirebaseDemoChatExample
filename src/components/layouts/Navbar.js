import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import SignInLink from './SignInLink'
import SignOutLink from './SignOutLink'

const Navbar = (props) => {
    const {auth, profile} = props;
    const links= auth.uid ? <SignInLink profile={profile}/> :  <SignOutLink/>
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/' className="brand-logo">My Plan</Link>
                {links}
            </div>
        </nav>
    )
};

const mapStateToProps= (state) =>{
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
};
export default connect(mapStateToProps,null)(Navbar);