import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header.js'
import Login from './components/Login.js'
import Register from './components/Register.js'
import Subjects from './components/Subjects';
import SubjectAddForm from './components/SubjectAddForm.js'
import SubjectEditForm2 from './components/SubjectEditForm2.js'
import Subject from './components/Subject'
import HardOnes from './components/Hardones.js'
import FlashcardAddForm from './components/FlashcardAddForm.js'
import FlashcardEditForm from './components/FlashcardEditForm.js'

export default (
    <BrowserRouter>
        <div className="app-page">
            <Header />
            <Route exact path='/' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/logout' component={Login} />
            <Route exact path='/subjects/user/:user_id' component={Subjects} />
            <Route exact path='/flashcards/add/user/:user_id/subjects/:subject_id' component={FlashcardAddForm} />
            <Route exact path='/flashcards/:id/edit/user/:user_id/subjects/:subject_id' component={FlashcardEditForm} />
            <Route exact path='/subjects/add/user/:user_id' component={SubjectAddForm} />
            <Route exact path='/subjects/:id/edit/user/:user_id' component={SubjectEditForm2} />
            <Route exact path='/subjects/:id/user/:user_id' component={Subject} />
            <Route exact path='/subjects/:id/user/:user_id/hardones' component={HardOnes} />
        </div>
    </BrowserRouter>
)


