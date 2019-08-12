import * as React from 'react'
import { connect } from 'react-redux'
import * as Types from '../types'

export interface AppComponentProps {
  value?: number;
}

const HiddenFields = (props: AppComponentProps) => { 
  const { isLoad, totalCount, commits, columnsVisible } = props.values
  const hiddenFields = (fields: string) => {
    let counter = 0
    for (let key in columnsVisible) columnsVisible[key] && counter++
    const isLast: boolean = (counter > 1)
    const obj: object = {}
    obj[fields] = isLast ? !columnsVisible[fields] : true
    props.dispatch({
      type: 'CHANGE_COLUMNS_VISIBLE', 
      payload: obj
    })
  }
  return (
    <div className = 'search-block__hidden'>
      <div>Скрытые поля</div>
      <ul>
        <li>Owner<input onClick = {() => hiddenFields('owner')} type = 'checkbox' checked = {columnsVisible.owner ? 'checked' : ''} /></li>
        <li>Repo <input onClick = {() => hiddenFields('repo')} type = 'checkbox' checked = {columnsVisible.repo ? 'checked' : ''} /></li>
        <li>Date/Time <input onClick = {() => hiddenFields('dateTime')} type = 'checkbox' checked = {columnsVisible.dateTime ? 'checked' : ''} /></li>
        <li>Commit message <input onClick = {() => hiddenFields('commitMessage')} type = 'checkbox' checked = {columnsVisible.commitMessage ? 'checked' : ''} /></li>
        <li>Hash <input onClick = {() => hiddenFields('hash')} type = 'checkbox' checked = {columnsVisible.hash ? 'checked' : ''} /></li>
      </ul>
    </div>
  )
}

function mapStateToProps (state: Types.AppState) {
  return {
    values: state
  }
}

export default connect(mapStateToProps)(HiddenFields)