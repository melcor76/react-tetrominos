import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './app.css';
import Game from '../components/Game';
import reducer from '../redux/reducers';

const store = createStore(reducer);

const App = () => (
    <Provider store={store}>
        <Game />    
    </Provider>      
);

export default App;
