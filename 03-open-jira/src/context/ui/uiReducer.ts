import { UIState } from './'

type UIActionType =
| { type: '[UI]-ToggleForm', payload: boolean }
| { type: '[UI]-StartDragging' }
| { type: '[UI]-EndDragging' }

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case '[UI]-ToggleForm':
      return {
        ...state,
        isAddingEntry: action.payload
      }

    case '[UI]-StartDragging':
      return {
        ...state,
        isDragging: true
      }

    case '[UI]-EndDragging':
      return {
        ...state,
        isDragging: false
      }

    default:
      return state
  }
}

