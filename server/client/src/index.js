import React from 'react';
import { render } from 'react-dom';
import 'antd/dist/antd.css';
import './mainStyles.scss';
import App from './components/App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Reducer } from './reducers';
import reduxThunk from 'redux-thunk';

let store = createStore(Reducer, applyMiddleware(reduxThunk));

render(<Provider store={store}><App /></Provider>, document.getElementById('root'));