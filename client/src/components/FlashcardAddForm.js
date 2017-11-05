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
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.getAPIData = this.getAPIData.bind(this);
    this.cancelFlashcard = this.cancelFlashcard.bind(this);
    this.pauseSetState = this.pauseSetState.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  pauseSetState() {
    this.setState({
          fireRedirect: true
        })
  }

  handleFormSubmit(e) {
    e.preventDefault();
    axios
      .post('/flashcard', {
        subject_id: this.props.match.params.subject_id,
        user_id: this.props.match.params.user_id,
        term: this.state.term,
        definition: this.state.definition,
      })
      .then(res => {
        console.log('--------------->', this.state)
        console.log(res);
        console.log('before setTimeout');
        // Wait 1 second before redirecting to the subject page so the back end can up date the database
        let timeoutID = setTimeout(this.pauseSetState, 1000);
        // this.pauseSetState(res.data.data.id);
      })
      .catch(err => console.log(err));
    e.target.reset();
  }

  getAPIData(e) {
    e.preventDefault();
    axios
      .get(`/flashcard/term/${this.state.term}`)
      .then(res => {
        console.log('--------------->', this.state)
        console.log('res = ',res.data);
        this.setState({
          definition: res.data.definition,
        });
      })
      .catch(err => console.log(err));
  }

  cancelFlashcard() {
    this.setState({
      fireRedirect: true
   });
  }

  render() {
    console.log('user_id in add flashcard = ',this.props.match.params.user_id);
    let path = '/subjects/user/' + this.props.match.params.user_id;
    let pathSubject = `/subjects/${this.props.match.params.subject_id}/user/${this.props.match.params.user_id}`;
    return (
      <div className="add-flashcard">
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

