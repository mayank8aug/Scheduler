import React, { PureComponent } from 'react';
import ShiftSlots from './ShiftSlots';
import './Appointment.css';

class Appointment extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showLoader: false,
            appointment: null,
            error: '',
            selectedPurpose: '',
            day: 0
        };
        this.fetchData = this.fetchData.bind(this);
        this.getDay = this.getDay.bind(this);
        this.showOtherDaySlots = this.showOtherDaySlots.bind(this);
        this.slotMouseEnter = this.slotMouseEnter.bind(this);
        this.slotMouseLeave = this.slotMouseLeave.bind(this);
        this.changePurpose = this.changePurpose.bind(this);
    }

    componentDidMount() {
        this.fetchData();
        this.toolTip = document.getElementById('tooltip');
    }

    slotMouseEnter(ev) {
        const x = ev.clientX;
        const y = ev.clientY;
        this.toolTip.style.top = (y - 40) + 'px';
        this.toolTip.style.left = (x - 40) + 'px';
        this.toolTip.style.display = 'block';
    }

    slotMouseLeave() {
        this.toolTip.style.display = 'none';    
    }

    changePurpose(ev) {
        this.setState({ selectedPurpose: ev.target.value });
    }

    fetchData() {
        this.setState({ showLoader: true });
        fetch('http://localhost:3000/static/slots.json')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        appointment: result.appointment,
                        selectedPurpose: result.appointment && Object.keys(result.appointment.purpose)[0],
                        error: '',
                        showLoader: false
                    });
                },
                () => {
                    this.setState({
                        appointment: null,
                        selectedPurpose: '',
                        error: 'System Error',
                        showLoader: false
                    });
                }
            )
    }

    getDay() {
        const { day } = this.state;
        return `${new Date(new Date().getTime() +  day * 24 * 60 * 60 * 1000).toDateString()}${day === 0 ? '(Today)' : ''}`;
    }

    showOtherDaySlots(move) {
        const { day } = this.state;
        this.setState({ day: day + move });
    }

    render() {
        const { showLoader, error, appointment, selectedPurpose, day } = this.state;
        let purpose;
        let purposeDataForDay;
        if (appointment) {
            purpose = appointment.purpose && Object.keys(appointment.purpose);
            purposeDataForDay = appointment.purpose && appointment.purpose[selectedPurpose][day];
        }
        return (
            <React.Fragment>
                {showLoader && <div>Loading ...</div>}
                {!showLoader && error && <div>{error}</div>}
                {!showLoader && !error && appointment && purpose && purpose.length > 0 ?
                    <div>
                        <div className="dd-label">Purpose</div>
                        <select name="purpose" className="purpose" onChange={this.changePurpose} value={selectedPurpose}>
                            {purpose.map(purposeItem => {
                                return <option key={purposeItem} value={purposeItem}>{purposeItem}</option>
                            })}
                        </select>
                        <div className="display-flex day-nav">
                            <div className={`arrow arrow-left cursor-pointer${day === 0 ? ' pointer-none' : ''}`} onClick={() => this.showOtherDaySlots(-1)} />
                            <div>{this.getDay()}</div>
                            <div className={`arrow arrow-right cursor-pointer${day === 2 ? ' pointer-none' : ''}`} onClick={() => this.showOtherDaySlots(1)} />
                        </div>
                        {purposeDataForDay &&
                            <div className="slots">
                            {
                                Object.keys(purposeDataForDay).map(shift => {
                                    return <ShiftSlots slotMouseEnter={this.slotMouseEnter} slotMouseLeave={this.slotMouseLeave} key={shift} shift={shift} slots={purposeDataForDay[shift]} />
                                })
                            }
                            </div>
                        }
                    </div> :
                    <div> No Appointment Service</div>
                }
                <div id="tooltip">Slot is available</div>
            </React.Fragment>
        );
    }
}

export default Appointment;