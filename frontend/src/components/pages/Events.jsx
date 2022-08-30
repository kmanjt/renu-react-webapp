import React from 'react';
import '../baseStyle.css';

function Events() {
    return (
        <div className='main-theme'>
            <div className="embed-responsive text-center section rounded-3 p-4">
                <h1 className='display-5 fw-bold'>Our Upcoming Events</h1>
                <p className='fs-4'>Add events directly to your google calendar</p>
                <br></br>
                <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Europe%2FDublin&src=ZW5hY3R1c2RjdUBnbWFpbC5jb20&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4uaXJpc2gjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%237986CB&color=%239E69AF&color=%23009688" width="800" height="600" frameBorder="0" scrolling="no"></iframe>
            </div>
        </div>
    )
}

export default Events;