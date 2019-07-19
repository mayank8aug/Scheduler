import React, { PureComponent } from 'react';
import './ServiceRequest.css';
import Appointment from '../Appointment/Appointment';
import Enquiry from '../Enquiry/Enquiry';

class ServiceRequest extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'appointment'
        };
        this.selectTab = this.selectTab.bind(this);
    }

    selectTab(tab) {
        this.setState({ selectedTab: tab });
    }

    render() {
        const { selectedTab } = this.state;
        return (
            <div className="service-request">
                <div className="tabs display-flex">
                    <div className={`tab-item book-appointment border-right cursor-pointer${selectedTab === 'appointment' ? ' active' : ''}`} onClick={() => this.selectTab('appointment')}>Book Appointment</div>
                    <div className={`tab-item book-appointment cursor-pointer${selectedTab === 'enquiry' ? ' active' : ''}`} onClick={() => this.selectTab('enquiry')}>Have an enquiry?</div>
                </div>
                {selectedTab === 'enquiry' ? <Enquiry /> : <Appointment />}
            </div>
        );
    }
}

export default ServiceRequest;