import React, { useState } from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import './baseStyle.css'
import {Link} from "react-router-dom";
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';

export default function Footer() {
  const [open, setOpen] = useState(false);

  return (
    <MDBFooter className='text-center text-lg-start headers text-dark'  style={{
      position: "fixed",
      left: 0,
      bottom: 0,
      width: "100%",
      //padding: 0
      right: 0,
      marginTop: "auto"
    }}>
     

      

      <div className='text-center p-1' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>

      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        variant="outline-dark"
        className="m-1 headers outline-success border-0"
      >
        {open &&
        <div>
          <i className="fas fa-arrow-circle-down fa-2x"></i>
  </div>}
        {!open &&
        <>
        <i className="fas fa-arrow-circle-up fa-2x"></i>
        </>}
       
      </Button>
      <Collapse in={open}>
      <section className=''>
        <MDBContainer className='text-center text-md-start '>
          <MDBRow className=' pt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="tree" className="me-3" />
                 ReNu Ireland
              </h6>
              <p>
                Sustainable community platform.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Features</h6>
              <p>
                <Link to="/blog" className='text-reset'>
                  Blogs
                </Link>
              </p>
              <p>
                <Link to="/Events" className='text-reset'>
                  Events
                </Link>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                DCU, Collins Ave Ext, Whitehall, Dublin 9
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                support@renu-ireland.com
              </p>
              <p>
                <MDBIcon icon="pager" className="me-3" /> <Link className="text-dark" to="/contact">
Contact Form</Link>
              </p> 

            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      </Collapse>

      <br></br>

        <div id="bottom">
        <a className='text-reset fw-bold text-decoration-none' href='#'>
          ReNu Ireland 
        </a>
        </div>
      </div>
    </MDBFooter>
  );
}
