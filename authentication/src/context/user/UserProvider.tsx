"use client"

import { type FC, type ReactNode } from 'react'
import { UserContext } from './'
import { User } from '@/interfaces/auth.interface'

interface Props {
  children: ReactNode
  user: User
}

export interface UserState {
  user: User | null
}

export const UserProvider:FC<Props> = ({ children, user }) => {

  return (
    <UserContext value={{ user }}>
      {children}
    </UserContext>
  )
}
