import * as React from 'react'
import { connect } from 'react-redux'
import * as Types from '../types'
import { apiConst } from '../Api'

export interface AppComponentProps {
  value?: number;
}

const Authorization = (props: AppComponentProps) => { 
  setTimeout(() => props.dispatch({type: 'SET_VALUE'}), 1000)
  const { value, isAuthorization } = props.values
  return (
    <div className="container">
      <h1  className="some-user-class">The Best Commit Viwer</h1>
      <div className = 'welcom-github-logo'>
        <button onClick = {() => document.location.href = apiConst.AuthPath} className = 'load-button'>Войти чере Github</button>
      </div>
    </div>
  )
}

function mapStateToProps (state: Types.AppState) {
  return {
    values: state
  }
}

export default connect(mapStateToProps)(Authorization)