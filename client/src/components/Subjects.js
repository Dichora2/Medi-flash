import React, {Component} from 'react';

import { Link } from 'react-router-dom';

import axios from 'axios';

import Subject from './Subject';


import SubjectAddForm from './SubjectAddForm';

class Subjects extends Component {
    constructor(){
      super();
      this.state = {
        subjects: [],
        subjectsLoaded: false
      };

      // this.Subjects = this.Subject.bind();
    }


    componentDidMount() {
        axios('/subject', {
          method: 'GET',
        })
          .then(res => {
            console.log('in login', this.state)
            console.log('this is the res', res)
            this.setState({

                subjects: res.data.data,
                //console.log data make sure I am targetting the correct thing
                subjectsLoaded: true
            })
          })
          .catch(err => console.log('in error',err));
         }


    renderSubjects(array){
       if(this.state.subjectsLoaded) {
            return array.map(subject => {
                return (
                <li key={subject.id} className='individual-subject'>
                    <Link to={`/subjects/${subject.id}`}>{subject.name}</Link>
                </li>
                )
            })
       } else {
           return <p>no subjects yet!</p>
       }
    }

    render(){
      return(
        <div className='subjects'>
          <h1 className='subject-page-header'>Subjects</h1>
          <Link to={`/subjects/add`}>add subject</Link>
          <ul className='list-of-subjects'>
            {this.renderSubjects(this.state.subjects)}
          </ul>
        </div>
      )
    }
  }

  export default Subjects;

