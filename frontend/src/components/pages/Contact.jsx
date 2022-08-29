import "../baseStyle.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ReCAPTCHA from "react-google-recaptcha";
import React, { useState, useContext, useEffect, useRef  } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { Link, useParams } from 'react-router-dom';
import emailjs from '@emailjs/browser';

function Contact() {
    const [captchaResult, setCaptchaResult] = useState()
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_k197jgn', 'contact_form', form.current, 'TU95-rFwW7g9PJueF')
          .then((result) => {
              console.log(result.text);
              alert("Your response has been submitted thank you.")
          }, (error) => {
              console.log(error.text);
          });
        };

    const handleRecaptcha = (value) => {
        fetch('/api/recaptcha/', {
          method: 'POST',
          body: JSON.stringify({ 'captcha_value': value }),
          headers: { 'Content-Type': 'application/json' }
        })
         .then(res => res.json())
         .then(data => {
          console.log(data)
           console.log(data.captcha.success)
           setCaptchaResult(data.captcha.success)
         }) 
      }

    return (
        <div className='main-theme'>
            <div className='mb-4 container'>
                <h1>Contact Us</h1>
                <p class="mb-5">Do you have any questions? Please do not hesitate to contact us. Our team will come back to you within
            a matter of hours.</p>

            <div class="row">
            <div class="col-md-9 mb-md-0 mb-5 mt-2">
                <Form ref={form}  onSubmit={sendEmail}>
                    <div className="row">
                        <div className='col-md-6 md-form mb-0'>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="user_email" placeholder="Your Email" />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        </div>

                        <div className='col-md-6'>
                        <Form.Group className="mb-3" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name"  name="user_name" placeholder="Your Name" />
                        </Form.Group>
                         </div>
                    </div>

                
                <div className="row">
                    <div className='col-md-12'>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                             <Form.Label>Subject</Form.Label>
                             <Form.Control type="subject" name="subject" placeholder="Subject" />
                        </Form.Group>
                    </div>     
                </div>

                <div className="row">
                    <div className='col-md-12'>
                        <Form.Label>Message</Form.Label>
                        <InputGroup>
                    <Form.Control as="textarea" aria-label="With textarea" name="message" placeholder="Please write your message here" style={{ height: "100%"}} />
                </InputGroup>
                    </div>
                </div>
                
            
            <br></br>
            
                

            <div className="row text-center">
            <div className='col-md-4'>
            
                </div>
                
            <div className='col-md-4'>
            <input  className="fs-5 p-4 headers text-white rounded" style={{ borderStyle: "none"}} type="submit" value="send"></input>
           </div>
           </div>
            
            </Form>
            </div>
            

            <div class="col-md-3 text-center">
                <div className="row mb-5 mt-4">
                <MDBIcon icon="home" className="me-2" /><br></br>
                    <a className='link-dark text-decoration-none' href="https://goo.gl/maps/cPZyZUFKcSUai77LA" target="_blank">Dublin City University, Collins Ave Ext, Whitehall, Dublin 9</a>
                </div>

                <div className="row">
                <MDBIcon icon="envelope" className="me-3" />
                    <a className='link-dark text-decoration-none' href="mailto:support@renu-ireland.com" target="_blank">support@renu-ireland.com</a>
                </div>
             </div>
        </div>
        

            </div>
        </div>
    )
};

export default Contact;