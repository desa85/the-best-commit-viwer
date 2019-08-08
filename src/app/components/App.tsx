import * as React from 'react'
import { connect } from 'react-redux'
import * as Types from '../types'
import { setCommitsInfo, authorization, updateCommitInfoDebounce } from '../Api'
import Authorization from './Authorization'
import CommitsTable from './CommitsTable'
import Loader from './Loader'
import store from '../createStore'
import Search from './Search'

export interface AppComponentProps {
  value?: number;
}

authorization()

const loadNextCommits = () => {
  store.dispatch({
    type: 'START_LOADER'
  })
  setCommitsInfo(100, store.getState().filter)
}

const updateCommitInfo = updateCommitInfoDebounce()


const App = (props: AppComponentProps) => { 
  const { isAuthorization, user, avatarURL} = props.values
  
  return (
    !isAuthorization ?
    <Authorization /> :
    <div className = 'container'>
      <div className = 'header'>
        <div className = 'user-action'>
          <h1>{user}</h1>
          <button 
            className = 'load-button'
            onClick = {() => {
              props.dispatch({type: 'LOG_OUT'});
              localStorage.removeItem('token')
            }}
          >Выйти</button>
        </div>
      </div>
      <div className = 'content'>
        <div>
          <Search action = {updateCommitInfo} />
          <CommitsTable />
        </div>
        <Loader action = {loadNextCommits} />
      </div>
      <div className = 'footer'></div>
    </div>
  )
}

function mapStateToProps (state: Types.AppState) {
  return {
    values: state
  }
}

export default connect(mapStateToProps)(App)