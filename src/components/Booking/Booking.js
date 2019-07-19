import React, { PureComponent } from 'react';
import Clinic from '../Clinic/Clinic';
import './Booking.css';
import ServiceRequest from '../ServiceRequest/ServiceRequest';

class Booking extends PureComponent {
    render() {
        return (
            <div className="booking display-flex">
                <Clinic key="clinic" />
                <ServiceRequest key="servicerequest" />
            </div>
        );
    }
}

export default Booking;
