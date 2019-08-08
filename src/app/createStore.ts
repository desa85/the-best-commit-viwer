import * as Redux from 'redux'
import reducer from './reducers/reducer';

const store = Redux.createStore(reducer);

export default store