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
          <FlashcardToggle flashcard_object={flashcard} />
        //on click it needs the card needs to flip
      )
    })
  }


  renderSubjectWithFlashcards(){
    const subjectId = Number(this.props.match.params.id);
    let content;
    if (this.state.subjectLoaded){

      const subjectName = this.state.subject.data.name
      console.log('SUBJECT ---------->', this.state.subject.data);
      
      return (


        <div className='page-header'>
          <button className='add-flashcard flashcard-button'><Link to='/add'>+ ADD CARDS</Link></button>
          <button className='hard-flashcard flashcard-button'><Link to='/hmmm'>HARD ONES</Link></button>

          <h1 className='subject-page-header'>{subjectName}</h1>
            <div className="cardArea">
              {this.flashcardMap(this.state.flashcards)}
        </div>

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
          <div className='subject-page'>
            {this.renderSubjectWithFlashcards()}
            {/* <button className='edit-flashcard'><Link to='/edit'>Edit Flashcard</Link></button> */}
          </div>
      </div>
    )
  }
}


export default Subject;
