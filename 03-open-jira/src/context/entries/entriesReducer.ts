import { Entry } from '@/interfaces/entry'
import { EntriesState } from './'

type EntriesActionType =
| { type: '[Entries]-AddEntry', payload: Entry }
| { type: '[Entries]-EntryUpdated', payload: Entry }
| { type: '[Entries]-RefreshData', payload: Entry[] }

export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {
  switch (action.type) {
    case '[Entries]-AddEntry':
      return {
        ...state,
        entries: [ action.payload, ...state.entries ]
      }

    case '[Entries]-EntryUpdated':
      return {
        ...state,
        entries: state.entries.map(entry => {
          if (entry.id === action.payload.id) {
            entry.status = action.payload.status
            entry.description = action.payload.description
          }

          return entry
        })
      }

    case '[Entries]-RefreshData':
      return {
        ...state,
        entries: [ ...action.payload ]
      }

    default:
      return state
  }
}
