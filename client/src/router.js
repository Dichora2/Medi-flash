import React from 'react';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
import Subjects from './components/Subjects';
import Subject from './components/Subject'

import Login from './components/Login.js'
import Register from './components/Register.js'

import FlashcardAddForm from './components/FlashcardAddForm.js'

import Header from './components/Header.js'


export default (
    <BrowserRouter>
        <div className='router'>
            <Header />
            <Route exact path='/home' component={App} />
            <Route exact path='/subjects' component={Subjects} />
            <Route exact path='/add' component={FlashcardAddForm} />


            <Route exact path='/Subject:id' component={Subject} />
            <Route exact path='/' component={Login} />
            <Route exact path='/register' component={Register} />
        </div>
    </BrowserRouter>
)


