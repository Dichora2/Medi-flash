import React, { Component } from 'react';
//import Subject data

//here were present one subject, 
//with all the flashcards associated with that Subject for user

import axios from 'axios';

class Subject extends Component {
    constructor() {
      super();
      this.state = {
        SubjectLoaded: false,
        subject: [], 
      }
    }

//axios
componentDidMount() {
  axios.get(`/subjects/${this.props.match.params.id}`)
    .then(res => {
      this.setState({
        subjectLoaded: true,
        subject: res.data.subject,
        //check if this works
      })
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
        </div>
    }else{
      <button className='add-flashcard'><Link to='/add'>Add New Flashcard</Link></button>
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
