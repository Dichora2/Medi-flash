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
        flashcards: [], 
      }
    }

//axios
componentDidMount() {
  // console.log('---------------->',this.state.user_id);
  axios.get(`/subject/${this.props.match.params.id}`)
    .then(res => {
      console.log('----->', res)
      
      this.setState({
        subjectLoaded: true,
        flashcards: res.data.data
      })
      // console.log('-------------->',res.data.subject)
    }).catch(err => console.log(err));
}

  flashcardMap(array){
    return array.map((flashcard, index) => {
      return (
        <div className='flash-card-term'>
          <div key={index}><FlashcardToggle /></div>
        </div>
        //on click it needs the card needs to flip
      )
    })
  }


  renderSubjectWithFlashcards(){
    const subjectId = Number(this.props.match.params.id);
   
    if (this.state.subjectLoaded){
          <div className='individual-subject-card'>
            <h1>{this.Subject.name} </h1>
            <div>
              {this.flashcardMap(this.flashcards)}
            </div>
            <button className='add-flashcard'><Link to='/add'>Add New Flashcard</Link></button>
        </div>
                      
    }else{
      <div>
        <h1>NO FLASHCARDS</h1>
        <button className='add-flashcard'><Link to='/add'>Add New Flashcard</Link></button>
      </div>

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
