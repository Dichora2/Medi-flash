import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



class FlashcardToggle extends Component {

//this class will render the toggle between the term and definition of a flashcard

//code reference https://codepen.io/anon/pen/XeKKoe

constructor(props) {
    super(props);
    // console.log('FLASHCARD ----------> ', this.props.flashcard_object);
    // console.log('KEEEP STUDYING ---------->', this.props.flashcard_object.keep_studying)
    this.state = {
        show: true,
        flashcard: this.props.flashcard_object,
        keep_studying: this.props.flashcard_object.keep_studying
    };
    console.log('this is your state ---------->', this.state)
}


IGotIt() {

    axios 
        .put(`/flashcard/${this.state.flashcard.id}/updateKeepStudying`, {
            id: this.state.flashcard.id
        })
        .then(res => {
            this.setState({
                keep_studying: !this.state.keep_studying
            });
            this.forceUpdate();            
        })
        .catch(err => console.log(err));        
}




toggle(){
    this.setState({
        show: !this.state.show
    });
}

render() {
    console.log(this.state)
    let hide = {
        display: this.state.show ? "block" : "none"
    }

    let show = {
        display: this.state.show ? "none" : "block"
    }
    
    return(
            <div className="flashcard clearfix">

                <button className='flashcard-button-card' onClick={this.toggle.bind(this)}>DEFINITION</button>
                <button className='flashcard-button-card got-it' onClick={this.IGotIt.bind(this)}>I GOT IT!</button>
                <Link className="edit-flashcard " to={pathFlashcards}> edit flashcard</Link>
                <h3  className='flashcard-term' style={hide}>{this.state.flashcard.term}</h3>
                <p className='flashcard-definition' style={show}>{this.state.flashcard.definition}</p>
            </div>
    )
}

}

export default FlashcardToggle;
