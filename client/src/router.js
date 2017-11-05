import React from 'react';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
import Subjects from './components/Subjects';
import Subject from './components/Subject'

import Login from './components/Login.js'
import Register from './components/Register.js'

import FlashcardAddForm from './components/FlashcardAddForm.js'
import FlashcardEditForm from './components/FlashcardEditForm.js'

import HardOnes from './components/Hardones.js'

import SubjectAddForm from './components/SubjectAddForm.js'
import SubjectEditForm2 from './components/SubjectEditForm2.js'
import Header from './components/Header.js'


export default (
    <BrowserRouter>
        <div className='router'>
            <Header />
            <Route exact path='/home' component={App} />
            <Route exact path='/subjects/user/:user_id' component={Subjects} />
            <Route exact path='/add/user/:user_id/subjects/:subject_id' component={FlashcardAddForm} />
            <Route exact path='/edit/user/:user_id/:id/subjects/:subject_id' component={FlashcardEditForm} />
            <Route exact path='/edit/:id' component={FlashcardEditForm} />

            <Route exact path='/subjects/add/user/:user_id' component={SubjectAddForm} />




            <Route exact path='/subjects/edit/:id/user/:user_id' component={SubjectEditForm2} />
            <Route exact path='/subjects/:id/user/:user_id' component={Subject} />


            <Route exact path='/subjects/:id/user/:user_id/hardones' component={HardOnes} />

            <Route exact path='/' component={Login} />
            <Route exact path='/logout' component={Login} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
        </div>
    </BrowserRouter>
)


