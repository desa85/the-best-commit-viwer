import * as React from 'react'
import { connect } from 'react-redux'
import * as Types from '../types'

export interface AppComponentProps {
  value?: number;
}

const CommitsTable = (props: AppComponentProps) => { 
  const { commits, columnsVisible } = props.values
  const tableStyle = () => {
    let count = 0
    let grid = ''
    for (let key in columnsVisible) {
      if (columnsVisible[key]) {
        count++;
        grid += ' 1fr'
      } else grid += ' 0fr'
    }
    return {gridTemplateColumns: grid, width: (count * 20) + '%'}
  }
  const nodeCommits = commits.map(result =>  [
    <div style = {columnsVisible.owner ? {} : {overflow: 'hidden'}}><a href = {result.ownerURL}>{result.owner}</a></div>,
    <div style = {columnsVisible.repo ? {} : {overflow: 'hidden'}}><a href = {result.repoURL}>{result.repo}</a></div>,
    <div style = {columnsVisible.dateTime ? {} : {overflow: 'hidden'}}>{result.dateTime}</div>,
    <div style = {columnsVisible.commitMessage ? {} : {overflow: 'hidden', height: '40px'}} className = 'commit-message'>{result.commitMessage}</div>,
    <div style = {columnsVisible.hash ? {} : {overflow: 'hidden'}}>{result.hash}</div>
  ])
  return (
    <div className="commit-table" style = {tableStyle()}>
        <div style = {columnsVisible.owner ? {} : {overflow: 'hidden'}} className= "commit-table__head"><div>Owner</div></div>
        <div style = {columnsVisible.repo ? {} : {overflow: 'hidden'}} className= "commit-table__head"><div>Repo</div></div>
        <div style = {columnsVisible.dateTime ? {} : {overflow: 'hidden'}} className= "commit-table__head"><div>Date/Time</div></div>
        <div style = {columnsVisible.commitMessage ? {} : {overflow: 'hidden'}} className= "commit-table__head"><div>Commit message</div></div>
        <div style = {columnsVisible.hash ? {} : {overflow: 'hidden'}} className= "commit-table__head"><div>Hash</div></div>
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