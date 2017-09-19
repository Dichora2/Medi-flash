import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header.js'

class App extends Component {
  render() {
    return (
      <div className="homepage">
        <Header />
          <div className='home'>
            <div className='home-content '>
              <div className="main-home-box ">
                <h1>Quiz yourself on your subjects + fashcards</h1>
              </div>
              <div className="main-home-box ">
                <h1>Search classmates' flashcards</h1>
              </div>
              <div className="main-home-box ">
                <h1>Search a subject</h1>
              </div>
            </div>
          </div>

      </div>
    );
  }
}

export default App;
