import React, { Component } from 'react';

import axios from 'axios';

import { Redirect } from 'react-router-dom';



class FlashcardAddForm extends Component {
  constructor() {
    super();
    this.state = {
      term: '',
      definition: '',
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
            <textarea id="comment" name="comment" cols="40" rows="20"
              placeholder="Definition"
              name="definition"
              value={this.state.definition}
              onChange={this.handleInputChange}>
            </textarea>
          </label>
          <input type="submit" value="Submit!" />
        </form>
        {this.state.fireRedirect
          ? <Redirect push to={`/subject/${this.state.newId}`} />
          : ''}
      </div>
    );
  }
}

export default FlashcardAddForm;

