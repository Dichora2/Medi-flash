import React, { Component } from 'react';

import axios from 'axios';

import { Redirect } from 'react-router-dom';

class subjectEditForm extends Component {
  constructor() {
    super();
    this.state = {
        name: '',
        id:null,
        fireRedirect: false,  
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  

  componentDidMount(){
    
    
    axios.get(`http://localhost:3001/subject/${this.props.match.params.id}`)
      .then((res,req) => {
        
        console.log(res.data,'<----this is the data');
        console.log(this.props.match.params.id,'this is the id')
        const subject = res.data;
        
        this.setState({
          name: res.data.data.name,
          id:this.props.match.params.id
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
    // e.preventDefault();
    // axios
    //   .put(`/subject/${this.props.match.params.id}`, {
    //     term: this.state.term,
    //     definition: this.state.definition,
    //     date_modified: this.state.date_modified
    //   })
    //   .then(res => {
    //     this.setState({
    //       newId: res.data.id,
    //       fireRedirect: true,
    //     });
    //   })
    //   .catch(err => console.log(err));
    // e.target.reset();
  }

  // handleClick(){
  //   console.log('this is working')

  //   axios.put(`http://localhost:3001/subject/${this.props.match.params.id}/edit`)
  //     .then((res,req) => {
  //       console.log(res.data,'<----this is the data')
  //       const subject = res.data;
  //       this.setState({
  //         name: res.data.data.name
  //       })
  //     }).catch(err => console.log(err));
  // }

  handleClick(){
   
    console.log('this is working')
    console.log(this.state,'this is the state')
     
     axios.put(`http://localhost:3001/subject/${this.state.id}`,{
      name:this.state.name
     })
     
    
     //   .catch(err => console.log(err));
  }
  

  render() {
    return (
      <div className="edit">
        <form onSubmit={this.handleFormSubmit}>
      
          <label>
            Name
            <input
              id='input'
              type="text"
              placeholder="name"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}/>
              <button onClick={this.handleClick}>edit</button>
            
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