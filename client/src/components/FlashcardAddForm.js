import React, { Component } from 'react';

import axios from 'axios';

import { Redirect } from 'react-router-dom';



class FlashcardAddForm extends Component {
  constructor() {
    super();
    this.state = {
      term: '',
      definition: '',
      date_created: '',
      fireRedirect: false,      
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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
        term: this.state.term,
        definition: this.state.definition,
        date_created: this.state.date_created,
      })
      .then(res => {
        console.log(res);
        this.setState({
          newId: res.data.flashcard.id,

          //confirm if this is targeting the right thing
          fireRedirect: true,
        });
      })
      .catch(err => console.log(err));
    e.target.reset();
  }

  render() {
    return (
      <div className="add">
        <form onSubmit={this.handleFormSubmit}>
          <label>
            Term
            <input
              type="text"
              placeholder="Term"
              name="term"
              value={this.state.term}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Definition
            <input
              type="text"
              placeholder="Definition"
              name="definition"
              value={this.state.definition}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Date
            <input
              type="date_created"
              placeholder="date"
              name="rating"
              value={this.state.date_created}
              onChange={this.handleInputChange}
            />
          </label>
          <input type="submit" value="Submit!" />
        </form>
        {this.state.fireRedirect
          ? <Redirect push to={`/flashcard/${this.state.newId}`} />
          : ''}
      </div>
    );
  }
}

export default FlashcardAddForm;

