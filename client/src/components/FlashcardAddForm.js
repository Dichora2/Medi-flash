import React, { Component } from 'react';

import axios from 'axios';

import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Subject from './Subject.js'

class FlashcardAddForm extends Component {
  constructor() {
    super();
    this.state = {
      term: '',
      definition: '',
      date_modified: new Date(),
      fireRedirect: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.getAPIData = this.getAPIData.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }



  handleFormSubmit(e) {
    e.preventDefault();
    axios
      .post('/flashcard', {
        user_id: this.state.user_id,
        term: this.state.term,
        definition: this.state.definition,
        date_modified: this.state.date_modified
      })
      .then(res => {
        console.log('--------------->', this.state)

        console.log(res);
        this.setState({
          newId: res.data.data.id,
          //confirm if this is targeting the right thing
          // fireRedirect: true,
        });
      })
      .catch(err => console.log(err));
    e.target.reset();
  }

  getAPIData(e) {
    axios
      .get(`/flashcard/term/${this.state.term}`)
      .then(res => {
        console.log('--------------->', this.state)
        console.log('res = ',res.data);
        this.setState({
          definition: res.data.definition,
          //confirm if this is targeting the right thing
          // fireRedirect: true,
        });
      })
      .catch(err => console.log(err));

  }

  render() {
    let path = '/subjects/user/' + this.props.match.params.id;
    
    return (
      <div className="add-flashcard">

        <form onSubmit={this.handleFormSubmit}>
        <Link className="back-to-subjects " to={path}> ← back to all subjects</Link>

            <input
              type="text"
              placeholder="Term"
              name="term"
              value={this.state.term}
              onChange={this.handleInputChange}
            />
            <p className='dictionary'>Merriam-Webster Medical Dictionary API</p>
            <button onClick={this.getAPIData}>LOAD</button>

            <textarea id="comment" cols="40" rows="20"
              placeholder="Definition"
              name="definition"
              value={this.state.definition}
              onChange={this.handleInputChange}>
            </textarea>
          <input className='submit' type="submit" value="SUBMIT" />
        </form>
        {this.state.fireRedirect
          ? <Redirect push to={`/subject/${this.state.newId}`} />
          : ''}
      </div>
    );
  }
}

export default FlashcardAddForm;

