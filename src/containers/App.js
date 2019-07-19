import React, { Component } from 'react';
import Header from '../components/Header/Header';
import './App.css';
import Booking from '../components/Booking/Booking';

class App extends Component {
    render() {
        return (
          <div className="app">
              <Header key="header" />
              <Booking key="booking" />
          </div>
        );
    }
}

export default App;
