import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

class SubjectAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      fireRedirect: false,
    };
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
    axios('/subject', {
      method: 'POST',
      data: {
        user_id: this.props.match.params.user_id,
        name: this.state.name,
      }
      })
      .then(res => {
        this.setState({
          fireRedirect: true,
        });
      })
      .catch(err => {
        console.log('in err ', err);
        this.setState({
          fireRedirect: true,
        });
      });
  }

  render() {
    let path = '/subjects/user/' + this.props.match.params.user_id;
    return (
      <div className="mf-application-page">
        <Link className="back-to-subjects " to={path}> ← back to all subjects</Link>
        <br />
        <br />
        <form onSubmit={this.handleFormSubmit}>
          <label className="subject-label">
            Add Subject
            <input
              className="subject-input"
              type="text"
              placeholder="subject name"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
              autoFocus
            />
          </label>
          <input className="submit" type="submit" value="SUBMIT" />
        </form>
        {this.state.fireRedirect
            ? <Redirect push to={path} />
            : ''}
      </div>
    );
  }
}

export default SubjectAddForm;
