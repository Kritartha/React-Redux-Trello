import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import List from './components/List'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="Board">
            <nav className="navbar navbar-inverse bg-inverse">
                <p className="heading">Krith's Sortable</p>
            </nav>
            <List />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
