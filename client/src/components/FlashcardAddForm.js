import React, { Component } from 'react';

import axios from 'axios';

import { Redirect } from 'react-router-dom';



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
        <button onClick={this.getAPIData}>Load definition from dictionary</button>
        {this.state.fireRedirect
          ? <Redirect push to={`/subject/${this.state.newId}`} />
          : ''}
      </div>
    );
  }
}

export default FlashcardAddForm;

