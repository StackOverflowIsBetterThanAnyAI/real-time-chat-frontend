import { createContext } from 'react'
import { ChatFriendType } from '@/types'

export const ContextChatFriendData = createContext<
    | [
          ChatFriendType | undefined,
          React.Dispatch<React.SetStateAction<ChatFriendType | undefined>>,
      ]
    | undefined
>(undefined)
