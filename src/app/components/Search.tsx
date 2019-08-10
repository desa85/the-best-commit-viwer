import * as React from 'react'
import { connect } from 'react-redux'
import * as Types from '../types'
import HiddenFields from './HiddenFields'

export interface AppComponentProps {
  value?: number;
}

const Search = (props: AppComponentProps) => { 
  const { filter, dateSort, sortBy, totalCount } = props.values
  return (
    <div className="search-block">
      <input
        value = {filter} 
        placeholder = 'Search' 
        onChange = {e => {
          props.dispatch({
            type: 'UPDATE_FILTER',
            payload: e.target.value
          })
          props.action(100, e.target.value)
        }}
      />
      <HiddenFields />
      <div className = 'search-block__sort'>
        <span>Сортировать:</span>
        <input onClick = {() => {
          props.dispatch({type: 'SORT_BY', payload: 'repo'});
          props.action(100, filter)
        }} checked = {sortBy === 'repo' ? 'checked' : ''} name = 'radio-sort' className = 'radio-sort' type= 'radio' id = 'radio-sort-repo' />
        <label htmlFor = 'radio-sort-repo'>Repo</label>
        <input onClick = {() => {
          props.dispatch({type: 'SORT_BY', payload: 'author-date'});
          props.action(100, filter)
        }} checked = {sortBy === 'author-date' ? 'checked' : ''} name = 'radio-sort' className = 'radio-sort' type= 'radio' id = 'radio-sort-date/time' />
        <label htmlFor = 'radio-sort-date/time'>Date/Time<input onChange = {() => {props.dispatch({type: 'CHANGE_DATE_SORT'}); props.action(100, filter)}} checked = {dateSort ? 'checked' : ''} type = 'checkbox' className = 'checkbox-sort' id = 'checkbox-sort-date/time' /><label htmlFor = 'checkbox-sort-date/time' /></label>
      </div>
      <div className = 'total-count'>
        Найдено {totalCount} коммитов
      </div>
    </div>
  )
}

function mapStateToProps (state: Types.AppState) {
  return {
    values: state
  }
}

export default connect(mapStateToProps)(Search)