import React, { Component } from 'react';
import axios from 'axios';
import FlashcardToggle from './FlashcardToggle.js';
import { Link } from 'react-router-dom';

class HardOnes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectLoaded: false,
      subject: [],
      flashcardLoaded: false,
      flashcards: [],
    }
  }

  componentDidMount() {
    let subjectData = {};
    axios.get(`/subject/${this.props.match.params.id}`)
      .then(res => {
        subjectData = res.data;
      }).catch(err => console.log(err));

    let path = `/flashcard/user/${this.props.match.params.user_id}/subject/${this.props.match.params.id}/hardones`;

    axios.get(path)
    .then(res => {
      if (res.data.data) {
        this.setState({
          subject: subjectData,
          subjectLoaded: true,
          flashcardLoaded: true,
          flashcards: res.data.data,
        })
      }
    }).catch(err => console.log('in error',err));
  }

  flashcardMap(array){
    return array.map((flashcard, index) => {
      console.log('user_id = ',this.props.match.params.user_id);
      return (
        <FlashcardToggle flashcard_object={flashcard} user_id={this.props.match.params.user_id}
          key={flashcard.id} subject_id={this.props.match.params.id}/>
      )
    })
  }

  renderSubjectWithFlashcards(){
    if (this.state.subjectLoaded){
      const subjectName = this.state.subject.data.name;
      const subjectDate = this.state.subject.data.date_modified.toLocaleString().substr(0,10);
      let pathSubject = `/subjects/${this.state.subject.data.id}/user/` + this.props.match.params.user_id;

      return (
        <div className='page-header'>
          <Link className="back-to-subjects " to={pathSubject}> ← back to all flashcards</Link>
          <h1 className='subject-page-header'>{subjectName} - Hard Ones</h1>
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
        </div>
      </div>
    )
  }
}


export default HardOnes;
