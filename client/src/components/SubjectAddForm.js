import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


class SubjectAddForm extends Component {
  constructor() {
    super();
    this.state = {

      name: '',
      date_modified: new Date(),
      fireRedirect: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleFormSubmit(e) {
    console.log('------------->', this.props.match.params.id);
    e.preventDefault();
    axios('/subject', {
      method: 'POST',
      data: {
        user_id: this.props.match.params.id,
        name: this.state.name,
        date_modified: this.state.date_modified,
      }
      })
      .then(res => {
        console.log('successfully posted');
        this.setState({
          //this needs to bind to subjects
          //confirm if this is targeting the right thing
          fireRedirect: true,
        });
      })
      .catch(err => {
        console.log('in err ', err);
        this.setState({
          //this needs to bind to subjects
          //confirm if this is targeting the right thing
          fireRedirect: true,
        });
      });

    // e.target.reset();
  }

  render() {
    let path = '/subjects/user/' + this.props.match.params.id;
    return (
      <div className="add-subject">
        <form onSubmit={this.handleFormSubmit}>
            <input
              type="text"
              placeholder="subject name"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          <input className="submit" type="submit" value="Submit!" />
        </form>
        {this.state.fireRedirect
            ? <Redirect push to={path} />
            : ''}
      </div>
    );
  }
}

export default SubjectAddForm;

