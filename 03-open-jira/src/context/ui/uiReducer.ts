import { UIState } from './'

type UIActionType =
| { type: '[UI]-OpenAddForm' }
| { type: '[UI]-CloseAddForm' }

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case '[UI]-OpenAddForm':
      return {
        ...state,
        isAddingTask: true
      }

    case '[UI]-CloseAddForm':
      return {
        ...state,
        isAddingTask: false
      }

    default:
      return state
  }
}

