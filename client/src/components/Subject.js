import React, { Component } from 'react';
import axios from 'axios';
import FlashcardToggle from './FlashcardToggle.js';
import { Link } from 'react-router-dom';

class Subject extends Component {
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
        let path = `/flashcard/user/${this.props.match.params.user_id}/subject/${this.props.match.params.id}`;
        axios.get(path)
          .then(res => {
            if (res.data.data) {
              this.setState({
                subjectLoaded: true,
                subject: subjectData,
                flashcardLoaded: true,
                flashcards: res.data.data,
              })
            }
          }).catch(err => console.log('in error',err));
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
    if (this.state.subjectLoaded){
      const subjectName = this.state.subject.data.name;
      const subjectDate = this.state.subject.data.date_modified.toLocaleString().substr(0,10);
      let pathSubjects = '/subjects/user/' + this.props.match.params.user_id;
      let pathFlashcards = '/flashcards/add/user/' + this.props.match.params.user_id + '/subjects/' + this.state.subject.data.id;
      let pathHardOnes = '/subjects/' + this.state.subject.data.id + '/user/' + this.props.match.params.user_id + '/hardones';
      return (
        <div className='mf-application-page'>
          <button className='flashcard-button'><Link to={pathFlashcards}>+ ADD CARDS</Link></button>
          <button className='flashcard-button'><Link to={pathHardOnes}>HARD ONES</Link></button>
          <Link className="back-to-subjects " to={pathSubjects}> ← back to all subjects</Link>
          <h2 className='page-header'>{subjectName}</h2>
          <p className="subject-date">{subjectDate}</p>
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


export default Subject;
