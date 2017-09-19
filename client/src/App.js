import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header.js'

class App extends Component {
  render() {
    return (
      <div className="Homepage">
        <Header />

          <div className='Home-content row '>
            <div className="main-home-box box">
              <h1>Quiz yourself on your subjects + fashcards</h1>
            </div>
            <div className="main-home-box box">
              <h1>Search classmates' flashcards</h1>
            </div>
            <div className="main-home-box box">
              <h1>Search a subject</h1>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
