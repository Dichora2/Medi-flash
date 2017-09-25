import FontAwesome from 'react-fontawesome';

import React, { Component } from 'react';
//import Subject data

//here were present one subject,
//with all the flashcards associated with that Subject for user

import axios from 'axios';
import FlashcardToggle from './FlashcardToggle.js';
import { Link } from 'react-router-dom';



class Subject extends Component {
    constructor() {
      super();
      this.state = {
        SubjectLoaded: false,
        subject: [],
        FlashcardLoaded: false,
        flashcards: [],
      }
    }

//axios
componentDidMount() {
  let subjectData = {};
  axios.get(`/subject/${this.props.match.params.id}`)
    .then(res => {
      console.log('res.data = ',res.data.data);
      subjectData = res.data;
    }).catch(err => console.log(err));
  let path = `/flashcard/user/${this.props.match.params.user_id}/subject/${this.props.match.params.id}`;
  console.log('path = ',path);
  axios.get(path)
    .then(res => {
      console.log('subjectData = ',subjectData);
      if (res.data.data) {
        this.setState({
          subject: subjectData,
          subjectLoaded: true,
          flashcardLoaded: true,
          flashcards: res.data.data,
          //check if this works
        })
      }
    }).catch(err => console.log('in error',err));
}

  flashcardMap(array){
    return array.map((flashcard, index) => {
      return (
            <FlashcardToggle flashcard_object={flashcard} />

        //on click it needs the card needs to flip
      )
    })
  }


  renderSubjectWithFlashcards(){
    const subjectId = Number(this.props.match.params.id);

    if (this.state.subjectLoaded){
      console.log('user_id = ',this.props.match.params.user_id);
      console.log('subjectName = ',this.state.subject);
      const subjectName = this.state.subject.data.name;
      const subjectDate = this.state.subject.data.date_modified;

      let pathSubjects = '/subjects/user/' + this.props.match.params.user_id;
      let pathFlashcards = '/add/user/' + this.props.match.params.user_id + '/subjects/' + this.state.subject.data.id;

      return (
        <div className='page-header'>
          <button className='add-flashcard flashcard-button'><Link to={pathFlashcards}>+ ADD CARDS</Link></button>
          <button className='hard-flashcard flashcard-button'><Link to='/hmmm'>HARD ONES</Link></button>
          <Link className="back-to-subjects " to={pathSubjects}> ← back to all subjects</Link>

          <h1 className='subject-page-header'>{subjectName}</h1>
          <p className="subject-date">{subjectDate}</p>
          <p className='subject-flashcard-count'>{}</p>
            <div className="cardArea">

              {this.flashcardMap(this.state.flashcards)}
        </div>

        </div>
      )
    }
  }

  render(){
    return(
      <div>
          <div className='subject-page'>
            {this.renderSubjectWithFlashcards()}
            {/* <button className='edit-flashcard'><Link to='/edit'>Edit Flashcard</Link></button> */}
          </div>
      </div>
    )
  }
}


export default Subject;
