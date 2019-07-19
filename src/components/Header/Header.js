import React, { PureComponent } from 'react';
import './Header.css';

class Header extends PureComponent {
    constructor(props) {
        super(props);
        this.menu = [
            { label: "Home" },
            { label: "About" },
            { label: "Services" },
            { label: "Updates" },
            { label: "More Info" },
            { label: "Contact" }
        ];
        this.state = {
            showVerticalMenu: false
        };
        this.showVerticalMenu = this.showVerticalMenu.bind(this);
    }

    showVerticalMenu() {
        this.setState({ showVerticalMenu: !this.state.showVerticalMenu });
        document.body.style.overflow = !this.state.showVerticalMenu ? 'hidden' : 'auto';
        document.querySelector('.dd-label').style.position = !this.state.showVerticalMenu ? 'static' : 'relative';
    }

    render() {
        const { showVerticalMenu } = this.state;
        return (
            <header className="header display-flex">
                <div className="display-flex flex-80">
                    {<div className="menu-items">
                        {this.menu.map(menuItem => {
                            return <div key={menuItem.label} className="menu-item cursor-pointer">{menuItem.label}</div>
                        })}
                    </div>}
                    <div className="hamburger-menu-bar cursor-pointer" onClick={this.showVerticalMenu}>
                        <div /><div /><div />
                    </div>
                    <div className="call-us"><span>+919898989898</span></div>
                </div>
                <div className="search cursor-pointer"><span>&#128269;</span></div>
                {showVerticalMenu && <div className="hamburger-menu">
                    {this.menu.map(menuItem => {
                        return <div key={menuItem.label} className="vertical-menu-item cursor-pointer">{menuItem.label}</div>
                    })}
                </div>}
            </header>
        );
    }
}

export default Header;