import * as React from 'react'
import { connect } from 'react-redux'
import * as Types from '../types'

export interface AppComponentProps {
  value?: number;
}

const Loader = (props: AppComponentProps) => { 
  const { isLoad, totalCount, commits } = props.values
  if (!isLoad && (totalCount <= commits.length && totalCount !== 0 || commits.length <= 1)) return <div />
  return (
    isLoad ? <div className = 'loader'><div></div></div> : 
    <div className = 'loader'><button onClick = {() => props.action()} className = 'load-button'>Загрузить еще</button></div>
  )
}

function mapStateToProps (state: Types.AppState) {
  return {
    values: state
  }
}

export default connect(mapStateToProps)(Loader)