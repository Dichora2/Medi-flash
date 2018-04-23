import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

class FlashcardEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newId: 0,
      term: '',
      definition: '',
      fireRedirect: false,
    };
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

  handleInputChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/flashcard/${this.props.match.params.id}`, {
        term: this.state.term,
        definition: this.state.definition,
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

  deleteFlashcard = () => {
    axios
      .delete(`/flashcard/${this.state.newId}`)
      .then(res => {
        this.setState({
          term: '',
          definition: '',
          fireRedirect: true,
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
    let pathSubject = `/subjects/${this.props.match.params.subject_id}/user/${this.props.match.params.user_id}`;
    return (
      <div className="mf-application-page">
        <form onSubmit={this.handleFormSubmit}>
          <Link className="back-to-subjects " to={pathSubject}> ← back to subject page</Link>
          <input className='flashcard-term term-placeholder'
            type="text"
            placeholder="term"
            name="term"
            value={this.state.term}
            onChange={this.handleInputChange}
          />
          <label>
            Definition
            <textarea id="comment" name="definition" cols="40" rows="15"
              autoFocus
              className="flashcard-definition"
              placeholder="Definition"
              value={this.state.definition}
              onChange={this.handleInputChange}>
            </textarea>
          </label>
          <input className='submit' type="submit" value="SUBMIT" />
        </form>
        <button className="delete-button" onClick={this.deleteFlashcard}>DELETE</button>
        <button onClick={this.cancelFlashcard}>CANCEL</button>
        {this.state.fireRedirect
          ? <Redirect push to={pathSubject} />
          : ''}
      </div>
    );
  }
}

export default FlashcardEditForm;
