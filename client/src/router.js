import React from 'react';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';

export default (
    <BrowserRouter>
        <div className='router'>
            <Route exact path='/' component={App} />
        </div>
    </BrowserRouter>
)