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
  axios.get(`/subject/${this.props.match.params.id}`)
    .then(res => {
      console.log(res.data);
      this.setState({
        subjectLoaded: true,
        subject: res.data,
        //check if this works
      })
      console.log('-------------->',res.data)
    }).catch(err => console.log(err));
  axios.get(`/flashcard/user/20/subject/${this.props.match.params.id}/`)
    .then(res => {
      console.log('res.data = ',res.data);
      if (res.data.data) {
        this.setState({
          flashcardLoaded: true,
          flashcards: res.data.data,
          //check if this works
        })
        console.log('-------------->',res.data.data)
      }
    }).catch(err => console.log('in error',err));
}

  flashcardMap(array){
    console.log('array = ', array);
    return array.map((flashcard, index) => {
      console.log('flashcard = ',flashcard);
      return (
        <div className='flash-card-term'>
          <FlashcardToggle flashcard_object={flashcard} />
        </div>
        //on click it needs the card needs to flip
      )
    })
  }


  renderSubjectWithFlashcards(){
    const subjectId = Number(this.props.match.params.id);
    let content;
    if (this.state.subjectLoaded){
      return (
          <div className='individual-subject-card'>
            <h1>{this.state.subject.name} </h1>
            <div>
              {this.flashcardMap(this.state.flashcards)}
            </div>
            <button className='add-flashcard'><Link to='/add'>Add New Flashcard</Link></button>
        </div>
      )
    }else{
      return (
        <button className='add-flashcard'><Link to='/add'>Add New Flashcard</Link></button>
      )
    }
  }

  render(){
    return(
      <div>
          <button className='add-flashcard'><Link to='/add'>Add New Flashcard</Link></button>
          <div className='subject-page'>
            {this.renderSubjectWithFlashcards()}
            <button className='edit-flashcard'><Link to='/edit'>Edit Flashcard</Link></button>
          </div>
      </div>
    )
  }
}


export default Subject;
