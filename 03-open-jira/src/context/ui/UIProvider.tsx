'use client'

import { type FC, type ReactNode, useReducer } from 'react'
import { UIContext, uiReducer } from './'

interface Props {
  children: ReactNode
}

export interface UIState {
  isAddingEntry: boolean
  isDragging: boolean
}

const UI_INITIAL_STATE: UIState = {
  isAddingEntry: false,
  isDragging: false
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

  return (
    <UIContext value={{
      ...state,
      //Methods
      setIsAddingEntry,

      startDragging,
      endDragging
    }}>
      {children}
    </UIContext>
  )
}
