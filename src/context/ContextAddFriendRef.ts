import { createContext } from 'react'

export const ContextAddFriendRef =
    createContext<React.RefObject<HTMLButtonElement | null> | null>(null)
