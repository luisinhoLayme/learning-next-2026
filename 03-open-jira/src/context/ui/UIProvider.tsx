'use client'

import { type FC, type ReactNode, useReducer } from 'react'
import { UIContext, uiReducer } from './'

interface Props {
  children: ReactNode
}

export interface UIState {
  isAddingEntry: boolean
  isDragging: boolean
  theme: string
}

const UI_INITIAL_STATE: UIState = {
  isAddingEntry: false,
  isDragging: false,
  theme: 'light'
}

export const UIProvider:FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

  const setIsAddingEntry = (value: boolean) => {
    dispatch({ type: '[UI]-ToggleForm', payload: value })
  }

  const startDragging = () => {
    dispatch({ type: '[UI]-StartDragging' })
  }

  const endDragging = () => {
    dispatch({ type: '[UI]-EndDragging' })
  }

  const toggleTheme = (theme: string) => {
    dispatch({ type: '[UI]-ToggleTheme', payload: theme })
  }

  return (
    <UIContext value={{
      ...state,
      //Methods
      setIsAddingEntry,

      startDragging,
      endDragging,
      toggleTheme
    }}>
      {children}
    </UIContext>
  )
}
