import { takeEvery, all } from 'redux-saga/effects'
import { getToken, getUser, getCommits } from './Api'

export function* helloSagas (): IterableIterator<any> {
  console.log('Hello Sagas!')
}

export function* watchGetToken() {
  yield takeEvery('GET_TOKEN', () => getToken())
}

export function* watchGetUser() {
  yield takeEvery('GET_USER', () => getUser())
}

export function* watchSetCommits() {
  yield takeEvery('SET_COMMITS', () => getCommits())
}

export default function* rootSaga() {
  yield all([
    helloSagas(),
    watchGetToken(),
    watchGetUser(),
    watchSetCommits()
  ])
}