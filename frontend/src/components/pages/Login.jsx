import React, { useState, useEffect, useContext } from 'react';
import './Login.css';
import logo from '../../assets/renu_logo.jpg'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { firebase } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../hocs/Auth';

function Login() {
    const[signedIn, setSignedIn] = useState(false);
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const {signIn, googleSignIn} = UserAuth();

    const handleGoogleSignIn = async () => {
      try {
        await googleSignIn();
      } catch (error) {
        console.log(error)
      }
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage('');
      try {
        await signIn(email, password)
        navigate('/profile')
      } catch (error) {
        setErrorMessage(error.message)
      }
    }

    function handleClick() {

    }

    function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(firebase, provider)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
      };


    return (
        <div className="form-signin w-100 m-auto pt-5">
  <form onSubmit={handleSubmit}>
    <h1 className="h3 mb-3 fw-normal pt-5">Please sign in</h1>

    <div className="form-floating">
      <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" autoFocus value={email} onChange={e => setEmail(e.target.value)}></input>
      <label for="floatingInput">Email address</label>
    </div>
    <div className="form-floating">
      <input type="password" className="form-control" id="floatingPassword" placeholder="Password" autoFocus value={password} onChange={e => setPassword(e.target.value)}></input>
      <label for="floatingPassword">Password</label>
    </div>

    <div className="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"></input>
      </label>
    </div>
    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    <div className="pt-1">
    <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  </form>
</div>

    )
}

export default Login;