import React, { useState, useContext, useEffect } from 'react';
import './Login.css';
import logo from '../../assets/renu_logo.jpg'
import app, { firebase } from '../../firebase-config';
import { Navigate, useNavigate } from 'react-router-dom';
import { updateProfile, getAuth, createUserWithEmailAndPassword, updateCurrentUser } from "firebase/auth";
import { UserAuth } from '../../hocs/Auth';


function Register() {
    const [name, setName]= useState('');
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [errorMessage, setErrorMessage]=useState('');
    const navigate = useNavigate();
    const {createUser, updateDisplayName, user} = UserAuth();

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage('');
      try {
        await createUser(email, password, name);
      } catch (error) {
        setErrorMessage(error.message)
        console.log(errorMessage)
      }
    };

    useEffect(() => {
      if(user != null) {
        navigate('/profile')
      }
    }, [user])

    const onSubmit = e => {
        e.preventDefault()
        createUserWithEmailAndPassword(firebase, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            user.updateProfile(name)
            console.log(userCredential.displayName)
          })
          .catch((error) => {
            console.log(error.message);
          });
        }


    return (
        <div className="form-signin w-100 m-auto pt-5">
  <form onSubmit={handleSubmit}>
    <h1 className="h3 mb-3 fw-normal pt-5">Please register</h1>
    <div className="form-floating">
      <input type="name" className="form-control" id="floatingInput" placeholder="Username" autoFocus value={name} onChange={e => setName(e.target.value)}></input>
      <label for="floatingInput">Username</label>
    </div>
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
  </form>
</div>

    )
}

export default Register;