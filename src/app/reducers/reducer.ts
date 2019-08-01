// import * as Types from '../types'

// export interface AppState {
//   value: number;
// }

const initialState = {
  value: 6
}

// export default function reducer(state = initialState, action: Types.Action) {
export default function reducer(state = initialState, action) {
  switch(action.type) {
    case 'SET_VALUE': return {...state, value: state.value + 1}
    default: return state
  }
}