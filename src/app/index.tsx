import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Redux from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers/reducer';
import App from './components/App';

const store = Redux.createStore(reducer);

ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);