import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Image from '../images/pencil.svg'

class FlashcardToggle extends Component {

    //code reference https://codepen.io/anon/pen/XeKKoe

    constructor(props) {
        super(props);
        this.state = {
            show: true,
            flashcard: this.props.flashcard_object,
            keep_studying: this.props.flashcard_object.keep_studying
        };
    }

    IGotIt = () => {
        axios
            .put(`/flashcard/${this.state.flashcard.id}/updateKeepStudying`, {
                id: this.state.flashcard.id
            })
            .then(res => {
                this.setState({
                    keep_studying: !this.state.keep_studying
                });
            })
            .catch(err => console.log(err));
    }

    toggle = () => {
        this.setState({
            show: !this.state.show
        });
    }

    render() {
        let hide = {
            display: this.state.show ? "block" : "none"
        }

        let show = {
            display: this.state.show ? "none" : "block"
        }

        let pathFlashcards = `/flashcards/${this.state.flashcard.id}/edit/user/${this.props.user_id}/subjects/${this.props.subject_id}`;

        return(
            <div className="flashcard clearfix">
                <button className='flashcard-button-card' onClick={this.toggle}>
                  {this.state.show ? 'DEFINITION' : 'TERM'}
                </button>
                <button className='flashcard-button-card got-it' onClick={this.IGotIt}>
                  {this.state.keep_studying ? 'I GOT IT!' : 'KEEP STUDYING'}
                </button>
                <Link className="edit-flashcard " to={pathFlashcards}><img src={Image} /></Link>
                <h3  className='flashcard-term' style={hide}>{this.state.flashcard.term}</h3>
                <h3  className='flashcard-term' style={hide}>{this.state.flashcard.date_modified.substr(0,10)}</h3>
                <p className='flashcard-definition' style={show}>{this.state.flashcard.definition}</p>
            </div>
        )
    }

}

export default FlashcardToggle;
