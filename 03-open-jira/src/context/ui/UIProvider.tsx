'use client'

import { type FC, type ReactNode, useReducer } from 'react'
import { UIContext, uiReducer } from './'

interface Props {
  children: ReactNode
}

export interface UIState {
  isAddingTask: boolean
}

const UI_INITIAL_STATE: UIState = {
  isAddingTask: false
}

export const UIProvider:FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

  const openAddForm = () => {
    dispatch({ type: '[UI]-OpenAddForm' })
  }
  const closeAddForm = () => {
    dispatch({ type: '[UI]-CloseAddForm' })
  }

  return (
    <UIContext value={{
      ...state,
      //Methods
      openAddForm,
      closeAddForm
    }}>
      {children}
    </UIContext>
  )
}
