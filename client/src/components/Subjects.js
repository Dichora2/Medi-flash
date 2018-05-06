import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Image from '../images/pencil.svg'

class Subjects extends Component {
    constructor(props){
        super(props);
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
                let pathEditSubject = `/subjects/${subject.id}/edit/user/` + this.props.match.params.user_id;
                return (
                    <div className='individual-subject'>
                        <Link className="subject-edit-link" to={pathEditSubject}>
                            <img className="subject-pencil" src={Image} alt="pencil" />
                        </Link>
                        <div className="individual-subject-div">
                            <Link className="individual-subject-link" to={pathSubject}>{subject.name}</Link>
                        </div>
                    </div>
                )
            })
        } else {
            return <p>no subjects yet!</p>
        }
    }

    render(){
        let path = '/subjects/subject/add/user/' + this.props.match.params.user_id;
        return(
            <div className='mf-application-page'>
                <h2 className='page-header'>
                    Subjects
                    <button className="add-subject" >
                        <Link to={path}>ADD SUBJECT</Link>
                    </button>
                </h2>
                {this.renderSubjects(this.state.subjects)}
            </div>
        )
    }
}

export default Subjects;
