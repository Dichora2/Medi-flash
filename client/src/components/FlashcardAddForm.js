import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

class FlashcardAddForm extends Component {
  constructor() {
    super();
    this.state = {
      term: '',
      definition: '',
      fireRedirect: false,
    };
  }

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  pauseSetState = () => {
    this.setState({
      fireRedirect: true
    })
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/flashcard', {
        subject_id: this.props.match.params.subject_id,
        user_id: this.props.match.params.user_id,
        term: this.state.term,
        definition: this.state.definition,
      })
      .then(res => {
        // Wait 1 second before redirecting to the subject page so the back end can up date the database
        let timeoutID = setTimeout(this.pauseSetState, 1000);
        // this.pauseSetState(res.data.data.id);
      })
      .catch(err => console.log(err));
    e.target.reset();
  }

  getAPIData = (e) => {
    e.preventDefault();
    axios
      .get(`/flashcard/term/${this.state.term}`)
      .then(res => {
        this.setState({
          definition: res.data.definition,
        });
      })
      .catch(err => console.log(err));
  }

  cancelFlashcard = () => {
    this.setState({
      fireRedirect: true
   });
  }

  render() {
    let path = '/subjects/user/' + this.props.match.params.user_id;
    let pathSubject = `/subjects/${this.props.match.params.subject_id}/user/${this.props.match.params.user_id}`;
    return (
      <div className="mf-application-page">
        <form onSubmit={this.handleFormSubmit}>
            <Link className="back-to-subjects " to={pathSubject}> ← back to subject page</Link>
            <input
              className="flashcard-term term-placeholder"
              type="text"
              placeholder="Term"
              name="term"
              value={this.state.term}
              onChange={this.handleInputChange}
              autoFocus
            />
            <p className='dictionary'>Merriam-Webster Medical Dictionary API</p>
            <button onClick={this.getAPIData}>LOAD</button>
            <textarea id="comment" cols="40" rows="15"
              className="flashcard-definition"
              placeholder="Definition"
              name="definition"
              value={this.state.definition}
              onChange={this.handleInputChange}>
            </textarea>
            <input className='submit' type="submit" value="SUBMIT" />
        </form>
        <button onClick={this.cancelFlashcard}>Cancel</button>
        {this.state.fireRedirect
          ? <Redirect push to={pathSubject} />
          : ''}
      </div>
    );
  }
}

export default FlashcardAddForm;
