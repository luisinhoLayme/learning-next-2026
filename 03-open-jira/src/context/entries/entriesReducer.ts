import { Entry } from '@/interfaces/entry'
import { EntriesState } from './'

type EntriesActionType =
| { type: '[Entries]-AddEntry', payload: Entry }

export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {
  switch (action.type) {
    case '[Entries]-AddEntry':
      return {
        ...state,
        entries: [ ...state.entries, action.payload ]
      }

    default:
      return state
  }
}
