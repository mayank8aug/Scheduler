import React, { PureComponent } from 'react';
import './Clinic.css';

class Clinic extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showMore: false
        };
        this.showMoreText = this.showMoreText.bind(this);
    }

    showMoreText(show) {
        this.setState({ showMore: show });
    }

    render() {
        const { showMore } = this.state;
        return (
            <div className="clinic">
                <div className="welcome">WELCOME TO</div>
                <div className="clinic-name">Dixit Healing Chamber</div>
                <div className="clinic-desc">Homeopathic clinic of Dr. Shravan Dixit is located at Jubilee Hills, Hyderabad.
                    The clinic was established in
                    {!showMore && 
                        <React.Fragment>...<span className="cursor-pointer link-text" onClick={() => this.showMoreText(true)}> See More</span></React.Fragment>
                    }
                    {showMore && 
                        <span> 2006 and is one of the most reputed clinic in the vicinity.
                    Guided by a clear vision.<span className="cursor-pointer link-text" onClick={() => this.showMoreText(false)}> See Less</span></span>
                    }
                </div>
            </div>
        );
    }

}

export default Clinic;