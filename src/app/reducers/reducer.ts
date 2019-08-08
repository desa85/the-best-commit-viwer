import * as Types from '../types'
import authorization from '../Api'

const initialState = {
  value: 6,
  isAuthorization: !!localStorage.getItem('token'),
  user: '',
  commits: [{}],
  isLoad: true,
  page: 1,
  totalCount: 0,
  filter: '',
  dateSort: true,
  sortBy: 'repo',
  avatarURL: ''
}

export default function reducer(state = initialState, action: Types.Action) {
  switch(action.type) {
    case 'SET_VALUE': return {...state, value: state.value + 1}
    case 'LOG_IN': return {...state, isAuthorization: true}
    case 'LOG_OUT': return {...state, isAuthorization: false}
    case 'ADD_REPOS': return {...state, repos: action.payload}
    case 'ADD_USER': return {...state, user: action.payload}
    case 'ADD_TOTAL_COUNT': return {...state, totalCount: action.payload}
    case 'ADD_COMMITS_INFO': return {...state, commits: state.commits.concat(action.payload), page: state.page + 1}
    case 'DROP_COMMITS': return {...state, totalCount: 0, commits: [{}], page: 1, isLoad: true}
    case 'UPDATE_FILTER': return {...state, filter: action.payload}
    case 'STOP_LOADER': return {...state, isLoad: false}
    case 'START_LOADER': return {...state, isLoad: true}
    case 'CHANGE_DATE_SORT': return {...state, dateSort: !state.dateSort}
    case 'SORT_BY' : return {...state, sortBy: action.payload}
    case 'ADD_AVATAR_URL' : return {...state, sortBy: action.payload}
    default: return state
  }
}