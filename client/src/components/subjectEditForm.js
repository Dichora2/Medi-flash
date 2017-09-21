import React, { Component } from 'react';

import axios from 'axios';

import { Redirect } from 'react-router-dom';

class subjectEditForm extends Component {
  constructor() {
    super();
    this.state = {
        subject: '',
        definition: '',
        date_modified: '',
        fireRedirect: false,  
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  
  componentDidMount() {
    axios.get(`/subject/${this.props.match.params.id}`)
      .then((res) => {
        const subject = res.data;
        this.setState({
          term: subject.term,
          definition: subject.definition.term,
          date_created: subject.date_created,
        })
      }).catch(err => console.log(err));
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    axios
      .put(`/subject/${this.props.match.params.id}`, {
        term: this.state.term,
        definition: this.state.definition,
        date_created: this.state.date_created
      })
      .then(res => {
        this.setState({
          newId: res.data.id,
          fireRedirect: true,
        });
      })
      .catch(err => console.log(err));
    e.target.reset();
  }

  render() {
    return (
      <div className="edit">
        <form onSubmit={this.handleFormSubmit}>
          <label>
            Term
            <input
              type="text"
              placeholder="term"
              name="term"
              value={this.state.term}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Definition
            <input
              type="text"
              placeholder="definition"
              name="definition"
              value={this.state.definition}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Date
            <input
              type="text"
              placeholder="date"
              name="date_created"
              value={this.state.date_created}
              onChange={this.handleInputChange}
            />
          </label>
          <input type="submit" value="edit!" />
        </form>
        {this.state.fireRedirect
          ? <Redirect push to={`/subject/${this.state.newId}`} />
          : ''}
      </div>
    );
  }
}

export default subjectEditForm;