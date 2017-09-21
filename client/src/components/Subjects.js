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
    }
  

    componentDidMount() {
        axios.get('http://localhost:3000/subject')
          .then(res => {
            console.log('in login', this.state)
            this.setState({

                subjects: res.data, 
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
          <SubjectAddForm />
        
          <ul className='list-of-subjects'>
            {this.renderSubjects(this.state.subjects)}
          </ul>
        </div>
      )
    }
  }
  
  export default Subjects;
  