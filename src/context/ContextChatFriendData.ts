'use client'

import { createContext } from 'react'
import { FriendType } from '@/types'

export const ContextChatFriendData = createContext<
    | [
          FriendType | undefined,
          React.Dispatch<React.SetStateAction<FriendType | undefined>>,
      ]
    | undefined
>(undefined)
