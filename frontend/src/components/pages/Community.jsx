import React from 'react';
import '../baseStyle.css';
import Events from './Events';
import { Link, useParams } from 'react-router-dom';
import Gardening from '../../assets/gardening.png';

function Community() {
    return (
        <div className='main-theme'>
            <div className="embed-responsive container p-4">
                   <div className="p-5 mb-4 section rounded-3">
                    <div className="py-5 row">
                     <h1 className="display-5 fw-bold">Our mission</h1>
                        <div className='col-md-8'>
                            <p className="fs-4">At ReNu Ireland our goal is to
                                popularise gardening and composting, promoting organic, low waste living.
                            </p>
                        </div>
                        <div className='col-md-3'>
                         <img src={Gardening} alt='A gardening cartoon'  />
                         </div>
                    </div>
                    </div>
                
                <br></br>
                <div>
                    <Events />
                </div>

                <br>
                </br>
                <div className="p-5 mb-4 section rounded-3">
                    <div className="container-fluid py-5">
                        <h1 className="display-5 fw-bold">Get in Touch</h1>
                        <div className='row'>
                            <p className="col-md-8 fs-4">Have an idea for an event, blog post or collaboration?</p>
                            <Link className="col-md-3 fs-5 btn-lg headers text-dark text-decoration-none" to='/contact'>Contact Us</Link>
                        </div>
                    </div>
                    </div>

            </div>
        </div>
    )
}

export default Community;