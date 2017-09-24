import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



class FlashcardToggle extends Component {

//this class will render the toggle between the term and definition of a flashcard

//code reference https://codepen.io/anon/pen/XeKKoe

constructor(props) {
    super(props);
    console.log('in constructor ', this.props.flashcard_object);
    this.state = {
        show: true,
        flashcard: this.props.flashcard_object,
        //need to get the data here first
    };
}


// componentDidMount() {
//     axios.get(`/flashcard/${this.props.match.params.id}`)
//       .then(res => {
//         this.setState({
//             flashcard: res.data.flashcard,
//             //console.log data make sure I am targetting the correct thing
//         })
//       })

//       console.log('------->this is the state from flashcard',this.state)
//   }





IGotIt() {
    console.log('--------->this must change the keep_studying flag to false for this flashcard<---------')
}

toggle(){
    this.setState({
        show: !this.state.show
    })
}


render() {
    let hide = {
        display: this.state.show ? "block" : "none"
    }

    let show = {
        display: this.state.show ? "none" : "block"
    }

    console.log('flashcard in toggle = ',this.state.flashcard);
    return(
        <div>
            <h2 style={hide}>{this.state.flashcard.term}</h2>
            <div className="flashcardDefinitionShow">
                <h2 style={show}>{this.state.flashcard.definition}</h2>
                <button onClick={this.toggle.bind(this)}>Back</button>
                <button onClick={this.IGotIt.bind(this)}>I got it!</button>
            </div>
        </div>
    )
}

}

export default FlashcardToggle;
