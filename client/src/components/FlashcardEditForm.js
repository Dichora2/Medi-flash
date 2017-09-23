import React, { Component } from 'react';

import axios from 'axios';

import { Redirect } from 'react-router-dom';


class FlashcardEditForm extends Component {
  constructor() {
    super();
    this.state = {
        newId: 0,
        term: '',
        definition: '',
        date_modified: new Date(),
        fireRedirect: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.deleteFlashcard = this.deleteFlashcard.bind(this);
  }

  componentDidMount() {
    axios.get(`/flashcard/${this.props.match.params.id}`)
      .then((res) => {
        const flashcard = res.data;
        this.setState({
          newId: flashcard.data.id,
          term: flashcard.data.term,
          definition: flashcard.data.definition
        })
      }).catch(err => console.log(err));
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
      .put(`/flashcard/${this.props.match.params.id}`, {
        term: this.state.term,
        definition: this.state.definition,
        date_modified: this.state.date_modified
      })
      .then(res => {
        this.setState({
          newId: res.data.id,
          fireRedirect: true,
        });
      })
      .catch(err => console.log(err));
    e.target.reset();
  }

  deleteFlashcard() {
    console.log(this.state);
    axios
      .delete(`/flashcard/${this.state.newId}`)
      .then(res => {
        this.setState({
          term: '',
          definition: ''
        });
      })
      .catch(err => console.log(err));

  }

  render() {
    return (
      <div className="edit">
        <form onSubmit={this.handleFormSubmit}>
          <label>
            Term
            <input
              type="text"
              placeholder="term"
              name="term"
              value={this.state.term}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Definition
            <textarea id="comment" name="comment" cols="40" rows="20"
              placeholder="Definition"
              value={this.state.definition}
              onChange={this.handleInputChange}>
            </textarea>
          </label>
          <input type="submit" value="edit!" />
        </form>
        <button onClick={this.deleteFlashcard}>Delete flashcard</button>
        {this.state.fireRedirect
          ? <Redirect push to={`/flashcards/${this.state.newId}`} />
          : ''}
      </div>
    );
  }
}

export default FlashcardEditForm;
