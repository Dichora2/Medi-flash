import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Subjects extends Component {
    constructor(){
      super();
      this.state = {
        subjects: [],
        subjectsLoaded: false
      };
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
    }


    renderSubjects(array){
       if(this.state.subjectsLoaded) {
            return array.map(subject => {
                let pathSubject = `/subjects/${subject.id}/user/` + this.props.match.params.user_id;
                return (
                <li key={subject.id} className='individual-subject'>
                    <Link className="individual-subject-link" to={pathSubject}>{subject.name}</Link>
                </li>
                )
            })
       } else {
           return <p>no subjects yet!</p>
       }
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

