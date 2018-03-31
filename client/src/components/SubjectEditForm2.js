import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class SubjectEditForm2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
        subject: '',
        fireRedirect: false,
    };
  }

  componentDidMount() {
    axios.get(`/subject/${this.props.match.params.id}`)
      .then((res) => {
        const subject = res.data.data;
        console.log('subject = ',subject);
        this.setState({
          subject: subject.name,
        })
      }).catch(err => console.log(err));
  }

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/subject/${this.props.match.params.id}`, {
        name: this.state.subject,
      })
      .then(res => {
        this.setState({
          newId: res.data.data.id,
          fireRedirect: true,
        });
      })
      .catch(err => console.log(err));
    e.target.reset();
  }

  deleteSubject = () => {
    axios
      .delete(`/subject/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          subject: '',
          fireRedirect: true,
        });
      })
      .catch(err => console.log(err));

  }

  cancelSubject = () => {
    this.setState({
      fireRedirect: true
   });
  }

  render() {
    return (
      <div className="edit">
        <form onSubmit={this.handleFormSubmit}>
          <label className="subject-label">
            Edit Subject
            <input
              className="subject-input"
              type="text"
              placeholder="subject"
              name="subject"
              value={this.state.subject}
              onChange={this.handleInputChange}
              autoFocus
            />
          </label>
          <input type="submit" className="submit" value="edit!" />
        </form>
        <button onClick={this.deleteSubject}>DELETE</button>
        <button onClick={this.cancelSubject}>CANCEL</button>
        {this.state.fireRedirect
          ? <Redirect push to={`/subjects/user/${this.props.match.params.user_id}`} />
          : ''}
      </div>
    );
  }
}

export default SubjectEditForm2;
