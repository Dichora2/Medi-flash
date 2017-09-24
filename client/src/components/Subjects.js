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
        axios(`/subject/user/${this.props.match.params.id}`, {
          method: 'GET',
        })
          .then(res => {
            this.setState({

                subjects: res.data.data,
                subjectsLoaded: true
            })
          })
          .catch(err => console.log('in error',err));
         }


    renderSubjects(array){
      console.log('user id = ',this.props.match.params.id);
       if(this.state.subjectsLoaded) {
            return array.map(subject => {
                return (
                <li key={subject.id} className='individual-subject'>
                    <Link className="individual-subject-link" to={`/subjects/${subject.id}`}>{subject.name}</Link>
                </li>
                )
            })
       } else {
           return <p>no subjects yet!</p>
       }
    }

    render(){
      let path = '/subjects/add/user/' + this.props.match.params.id;
      return(
        <div className='subjects'>
          <div className='page-header'>
            <h1 className='subject-page-header'>Subjects</h1>
            <Link className="add-subject" to={path}>ADD SUBJECT</Link>


          </div>

          <ul className='list-of-subjects'>
            {this.renderSubjects(this.state.subjects)}
          </ul>
        </div>
      )
    }
  }

  export default Subjects;

