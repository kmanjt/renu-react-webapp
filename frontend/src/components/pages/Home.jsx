import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/system/Box';
import Grid from '@mui/system/Unstable_Grid';
import styled from '@mui/system/styled';
import { Link } from 'react-router-dom';
import '../baseStyle.css';
import { UserAuth } from '../../hocs/Auth';

const Item = styled('div')(({ theme }) => ({
    
    height: "160px",
    textAlign: 'center',
    margin: "auto",
  }));

function Home() {
  const {user} = UserAuth();
    return (
      <div className='main-theme'>
  <div className="container">
    <header className="pb-3 mb-4 border-bottom">
      <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
        {user &&
        <>
        <span className="fs-4">Welcome {user.displayName}!</span>
  </>}
        {!user &&
        <>
        <span className="fs-4">Welcome! <Link to="/Login" className='text-dark text-decoration-none'> Click to sign in to Renu </Link></span>
        </>}
      </a>
    </header>

    <div className="p-5 mb-4 section rounded-3">
      <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold">Renu Ireland</h1>
        <div className='row'>
        <p className="col-md-8 fs-4">Welcome to Renu Ireland! <br></br>
         Catering for all your sustainable and environmental needs.</p>
          <div className='col-md-4'>
            <Link className="text-white fs-5 headers dark-green btn-lg text-decoration-none" to="/blog">Check out our blogs</Link>
          </div>
        </div>
      </div>
    </div>

    <div className="row align-items-md-stretch">
      <div className="col-md-6">
        <div className="h-100 p-5 dark-section rounded-3">
          <h2>App coming soon</h2>
          <p>Enjoy our content on the go!</p>
          <button className="btn btn-outline-light m-2" type="button">Google Store</button>
          <button className="btn btn-outline-light m-2" type="button">Apple Store</button>
        </div>
      </div>
      <div className="col-md-6">
        <div className="h-100 p-5 light-section border rounded-3 row">
          
          <h2>Fact of the day</h2>
          <div className='col-md-8'>
          <p>A fully grown tree can absorb around 21 kilograms of carbon dioxide per year.</p>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>

    );
};

export default Home;