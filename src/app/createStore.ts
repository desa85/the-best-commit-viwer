import * as Redux from 'redux'
import reducer from './reducers/reducer';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = Redux.createStore(reducer, Redux.applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

export default store