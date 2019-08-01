import * as React from 'react'
import { connect } from 'react-redux'
import * as Types from '../types'

export interface AppComponentProps {
  value?: number;
}

const App = (props: AppComponentProps) => { 
  setTimeout(() => props.dispatch({type: 'SET_VALUE'}), 1000)
  const { value } = props.values
  return (
    <div className="container">
      <h1 className="some-user-class">The Best Commit Viwer</h1>
      <div>
        <button>{value || 0}</button>
      </div>
    </div>
  )
}

function mapStateToProps (state: Types.AppState) {
  return {
    values: state
  }
}

export default connect(mapStateToProps)(App)