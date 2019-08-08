import * as React from 'react'
import { connect } from 'react-redux'
import * as Types from '../types'

export interface AppComponentProps {
  value?: number;
}

const CommitsTable = (props: AppComponentProps) => { 
  const { commits } = props.values
  const nodeCommits = commits.map(result =>  [
    <div><a href = {result.ownerURL}>{result.owner}</a></div>,
    <div><a href = {result.repoURL}>{result.repo}</a></div>,
    <div>{result.dateTime}</div>,
    <div className = 'commit-message'>{result.commitMessage}</div>,
    <div>{result.hash}</div>
  ])
  return (
    <div className="commit-table">
        <div className= "commit-table__head"><div>Owner</div></div>
        <div className= "commit-table__head"><div>Repo</div></div>
        <div className= "commit-table__head"><div>Date/Time</div></div>
        <div className= "commit-table__head"><div>Commit message</div></div>
        <div className= "commit-table__head"><div>Hash</div></div>
      {nodeCommits.flat()}
    </div>
  )
}

function mapStateToProps (state: Types.AppState) {
  return {
    values: state
  }
}

export default connect(mapStateToProps)(CommitsTable)