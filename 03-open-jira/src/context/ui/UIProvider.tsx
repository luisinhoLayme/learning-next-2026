'use client'

import { type FC, type ReactNode, useReducer } from 'react'
import { UIContext, uiReducer } from './'

interface Props {
  children: ReactNode
}

export interface UIState {
  sidemenuOpen: boolean
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false
}

export const UIProvider:FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

  const openSideMenu = () => {
    dispatch({ type: '[UI] - OpenSidebar' })
  }
  const closeSideMenu = () => {
    dispatch({ type: '[UI] - CloseSidebar' })
  }

  return (
    <UIContext value={{
      ...state,
      //Methods
      openSideMenu,
      closeSideMenu
    }}>
      {children}
    </UIContext>
  )
}
