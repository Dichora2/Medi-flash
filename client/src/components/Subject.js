import React, { Component } from 'react';
//import Subject data


//here were present one subject, with all the flashcards associated with that Subject for user

class Subject extends Component {

  flashcardMap(array){
    return array.map((flashcard, index) => {
      return (
        <li key={index}>
          {flashcard.term}
        </li>
      )
    })
  }

  specificSubject(){
    const subjectId = Number(this.props.match.params.id);
    const thisSubject = subjectData.find(subject => subject.id == subjectId);
    return (
      <div className='individual-subject-card'>
        <h1>{thisSubject.name} </h1>
        <ul>
          {this.flashcardMap(this.flashcards)}
        </ul>
      </div>
    )
  }

  render(){
    return(
      <div className='subject-page'>
        {this.specificSubject()}
      </div>
    )
  }

}
export default Bird;
