import * as Types from '../types'

// export interface Action {
//   type: string;
//   pyload: any;
// }

export function setValue(value: number): Types.Action {
  return {
    type: 'SET_VALUE',
    pyload: value
  }
}