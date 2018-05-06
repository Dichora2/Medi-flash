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
        let path = `/flashcard/subject/${this.props.match.params.id}`;

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
    if (this.state.subjectLoaded){
      const subjectName = this.state.subject.data.name;
      let pathSubjects = '/subjects/user/' + this.props.match.params.user_id;
      let pathFlashcards = '/flashcards/add/user/' + this.props.match.params.user_id + '/subjects/' + this.state.subject.data.id;
      let pathHardOnes = '/subjects/' + this.state.subject.data.id + '/user/' + this.props.match.params.user_id + '/hardones';
      return (
        <div className='mf-application-page'>
          <button className='flashcard-button'><Link to={pathFlashcards}>+ ADD CARDS</Link></button>
          <button className='flashcard-button'><Link to={pathHardOnes}>HARD ONES</Link></button>
          <Link className="back-to-subjects " to={pathSubjects}> ← back to all subjects</Link>
          <h2 className='page-header'>{subjectName}</h2>
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
