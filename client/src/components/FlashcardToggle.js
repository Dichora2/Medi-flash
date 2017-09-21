import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



class FlashcardToggle extends Component {

//this class will render the toggle between the term and definition of a flashcard

//code reference https://codepen.io/anon/pen/XeKKoe

constructor() {
    super();
    this.state = {
        show: true,
        flashcard: '',
        //need to get the data here first
    };
}


componentDidMount() {
    axios.get(`/flashcard/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
            flashcard: res.data.flashcard, 
            //console.log data make sure I am targetting the correct thing 
        })
      })
      
      console.log('------->this is the state from flashcard',this.state)
  }





addToHardOnes() {
    console.log('--------->this must put word in hard ones list<---------')
}

toggle(){
    this.setState({
        show: !this.state.shown
    })
}


render() {
    let show = { 
        display: this.state.shown ? "block" : "none"
    }

    let hide = {
        display: this.shown ? "none" : "block"
    }


    return(
        <div>
            <h2 style={show}>flashcard term goes here</h2>
            <div className="flashcardDefinitionShow">
                <h2 style={hide}>flashcard definition goes here</h2>
                <button onClick={this.toggle.bind(this)}>Back</button>
                <button onClick={this.addToHardOnes.bind(this)}>Need more practice</button>
            </div>
        </div>
    )
}

}

export default FlashcardToggle;