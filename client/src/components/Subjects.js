import React, {Component} from 'react';

import { Link } from 'react-router-dom';

import axios from 'axios';

import Subject from './Subject';


import SubjectAddForm from './SubjectAddForm';

class Subjects extends Component {
    constructor(){
      super();
      this.state = {
<<<<<<< HEAD
        subjects: [], 
        subjectsLoaded: false
      };
=======
        subjects: [],
        subjectsLoaded: false
      };

      // this.Subjects = this.Subject.bind();
>>>>>>> 59b270f6d3f810be7663d933d4d97892107ff3f4
    }


    componentDidMount() {
<<<<<<< HEAD
        axios.get('http://localhost:3000/subject')
          .then(res => {
            console.log('in login', this.state)
            this.setState({

                subjects: res.data, 
                //console.log data make sure I am targetting the correct thing 
                subjectsLoaded: true                
=======
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
>>>>>>> 59b270f6d3f810be7663d933d4d97892107ff3f4
            })
          })
          .catch(err => console.log('in error',err));
         }
<<<<<<< HEAD
          
=======

>>>>>>> 59b270f6d3f810be7663d933d4d97892107ff3f4

    renderSubjects(array){
       if(this.state.subjectsLoaded) {
            return array.map(subject => {
                return (
                <li key={subject.id} className='individual-subject'>
                    <Link to={`/subject/${subject.id}`}>{subject.name}</Link>
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

