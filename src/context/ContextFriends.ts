'use client'

import { createContext } from 'react'
import { FriendType } from '@/types'

export const ContextFriends = createContext<
    | [
          FriendType[] | undefined,
          React.Dispatch<React.SetStateAction<FriendType[] | undefined>>,
      ]
    | undefined
>(undefined)
