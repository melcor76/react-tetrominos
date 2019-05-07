import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './app.css';
import Game from '../components/Game';

const initialState = {
    playing: false
}

function reducer(state = initialState, action: any) {
    return state;
}

const store = createStore(reducer);

const App = () => (
    <Provider store={store}>
        <Game />    
    </Provider>      
);

export default App;
