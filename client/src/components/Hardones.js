import React, { Component } from 'react';
import axios from 'axios';
import FlashcardToggle from './FlashcardToggle.js';
import { Link } from 'react-router-dom';

class HardOnes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: {},
      flashcards: []
    }
    this.retryCount = 0;
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutID);
  }

  componentDidMount() {
    let subjectData = {};
    axios.get(`/subject/${this.props.match.params.id}`)
      .then(res => {
        subjectData = res.data;

      let path = `/flashcard/subject/${this.props.match.params.id}/hardones`;

      axios.get(path)
      .then(res => {
        if (res.data.data) {
          this.setState({
            subject: subjectData,
            flashcards: res.data.data
          })
        }
        this.retryCount = 0;
      }).catch(err => {
        console.log('in error',err);
        console.log('err type of = ',typeof err);
        let errString = '';
        errString = err;
        if (errString.substr(0,51) === "TypeError: Cannot read property 'name' of undefined" && this.retryCount < 4) {
          this.retryCount++;
          this.timeoutID = setTimeout(this.componentDidMount, 1000);
        }
      });
    }).catch(err => console.log(err));
  }

  flashcardMap(array){
    return array.map((flashcard, index) => {
      return (
        <FlashcardToggle flashcard_object={flashcard} user_id={this.props.match.params.user_id}
          key={flashcard.id} subject_id={this.props.match.params.id}/>
      )
    })
  }

  renderSubjectWithFlashcards(){
    if (this.state.subject.hasOwnProperty('data')){
      const subjectName = this.state.subject.data.name;
      let pathFlashcards = '/flashcards/add/user/' + this.props.match.params.user_id + '/subjects/' + this.state.subject.data.id;
      let pathSubject = `/subjects/${this.state.subject.data.id}/user/` + this.props.match.params.user_id;

      return (
        <div className='mf-application-page'>
          <button className='flashcard-button'><Link to={pathFlashcards}>+ ADD CARDS</Link></button>
          <Link className="back-to-subjects " to={pathSubject}> ← back to all flashcards</Link>
          <h2 className='page-header'>{subjectName} - Hard Ones</h2>
          <p className='subject-flashcard-count'>{}</p>
          <div className="card-area">
            {this.flashcardMap(this.state.flashcards)}
          </div>
        </div>
      )
    }
  }

  render(){
    return(
      <div>
        {this.renderSubjectWithFlashcards()}
      </div>
    )
  }
}


export default HardOnes;
