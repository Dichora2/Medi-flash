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
    console.log('------------->', this.state);
    e.preventDefault();
    axios
      .post('http://localhost:3000/subject', {
        name: this.state.name,
        date_modified: this.state.date_modified,
      })
      .then(res => {
        console.log(res);
        this.setState({
          newId: res.data.data.id,

          //confirm if this is targeting the right thing
          fireRedirect: true,
        });
      })
      .catch(err => console.log(err));
      console.log('------------->err');
      
    e.target.reset();
  }

  render() {
    return (
      <div className="add">
        <form onSubmit={this.handleFormSubmit}>
          <label>
            Subject Name
            <input
              type="text"
              placeholder="subject name"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </label>
          <input type="submit" value="Submit!" />
        </form>
        {this.state.fireRedirect
          ? <Redirect push to={`/subjects`} />
          : ''}
      </div>
    );
  }
}

export default SubjectAddForm;

