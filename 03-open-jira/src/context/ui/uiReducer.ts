import { UIState } from './'

type UIActionType =
| { type: '[UI]-ToggleForm', payload: boolean }
| { type: '[UI]-StartDragging' }
| { type: '[UI]-EndDragging' }
| { type: '[UI]-ToggleTheme', payload: string }

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

    case '[UI]-ToggleTheme':
      return {
        ...state,
        theme: action.payload
      }

    default:
      return state
  }
}

