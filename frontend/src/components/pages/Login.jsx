import React, { useState, useEffect, useContext } from 'react';
import './Login.css';
import logo from '../../assets/renu_logo.jpg'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { firebase } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../hocs/Auth';
import "../baseStyle.css";
import { Link } from 'react-router-dom';

function Login() {
    const[signedIn, setSignedIn] = useState(false);
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const {signIn, googleSignIn, user} = UserAuth();

    const handleGoogleSignIn = async (e) => {
      e.preventDefault();
      try {
        await googleSignIn();
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      if(user != null) {
        navigate('/profile')
      }
    }, [user])
    

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage('');
      try {
        await signIn(email, password)
      } catch (error) {
        setErrorMessage(error.message)
        alert(errorMessage)
      }
    }

 
    return (
      <div className="form-signin w-100 m-auto pt-5">
        <div className='p-5 rounded-3'>
            <form onSubmit={handleSubmit}>
              <h1 className="h4 mb-3 display-7 fw-normal pt-5">Please sign in</h1>

              <div className="form-floating">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" autoFocus value={email} onChange={e => setEmail(e.target.value)}></input>
                <label for="floatingInput">Email address</label>
              </div>
              <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" autoFocus value={password} onChange={e => setPassword(e.target.value)}></input>
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <button className="w-100 btn-lg headers border-0 " type="submit">Sign in</button>
            </form>
              <div className="pt-1">
                <form onSubmit={handleGoogleSignIn}>
                  <button className="w-100 btn-lg headers border-0" type="submit">Sign in with Google</button>


                </form>
              </div>
              <p className=" mb-3 fw-normal pt-5">Don't have an account?</p>
              <button className="w-100 btn-lg headers border-0 " type="submit"><Link className='text-dark text-decoration-none' to="/register">Register</Link></button>
        </div>
      <br>
      </br>
      </div>

    )
}

export default Login;