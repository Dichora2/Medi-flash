import React, {Component} from 'react';

import { Link } from 'react-router-dom';

import axios from 'axios';

import Subject from './Subject';

import SubjectAddForm from './SubjectAddForm';

//import '../node_modules/font-awesome/css/font-awesome.min.css'; 

class Subjects extends Component {
    constructor(){
      super();
      this.state = {
        subjects: [],
        subjectsLoaded: false
      };
      this.deleteSubject = this.deleteSubject.bind(this);
    }


    componentDidMount() {
        axios(`/subject/user/${this.props.match.params.user_id}`, {
          method: 'GET',
        })
          .then(res => {
            this.setState({

                subjects: res.data.data,
                subjectsLoaded: true
            })
          })
          .catch(err => console.log('in error',err));
          let pathSubjects = '/subjects/user/' + this.props.match.params.user_id;
         }


    renderSubjects(array){
       if(this.state.subjectsLoaded) {
            return array.map(subject => {
                let pathSubject = `/subjects/${subject.id}/user/` + this.props.match.params.user_id;
                let pathSubjectEdit = `/subjects/subject/${subject.id}`
                return (
                <li key={subject.id} className='individual-subject'>

                    <Link className="individual-subject-link" to={pathSubject}>{subject.name}</Link>
                    <div>
                      <Link className="subject-edit" to={pathSubjectEdit}>Edit</Link>
                     <button onClick ={this.deleteSubject} className="subject-delete">-</button>
                    </div>

                </li>
                )
            })
       } else {
           return <p>no subjects yet!</p>
       }
    }
    deleteSubject() {
      
      axios
      .delete(`/subject/${this.state.newId}`)
      .then(res => {
        this.setState({
          subject: '',
          definition: '',
          date_modified: ''
        })
      })
      .catch(err => console.log(err));
    }

    render(){
      console.log('user_id = ',this.props.match.params.user_id);
      let path = '/subjects/add/user/' + this.props.match.params.user_id;
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

