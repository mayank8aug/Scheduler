import React, { PureComponent } from 'react';
import './ShiftSlots.css';

class ShiftSlots extends PureComponent {
    render() {
        const { shift, slots, slotMouseEnter, slotMouseLeave } = this.props;
        return (
            <div className="shift-slot display-flex">
                <div className="shift-name">{shift}</div>
                {slots &&
                    <div className="shift-slots">
                        {slots.map((slot, index) => {
                                return <div onMouseEnter={(ev) => !slot.disabled && !slot.full && slotMouseEnter(ev)} onMouseLeave={(ev) => !slot.disabled && !slot.full && slotMouseLeave(ev)} key={index} className={`slot cursor-pointer${index%3 === 2 ? ' slot-border-right' : ''}${slot.full ? ' pointer-none faded' : ''}${slot.disabled ? ' pointer-none' : ''}`}>{slot.disabled ? '-' : slot.time}</div>
                            })
                        }
                    </div>
                }
            </div>
        );
    }
}

export default ShiftSlots;
