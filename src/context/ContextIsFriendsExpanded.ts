'use client'

import { createContext } from 'react'

export const ContextIsFriendsExpanded = createContext<
    | [
          boolean | undefined,
          React.Dispatch<React.SetStateAction<boolean | undefined>>,
      ]
    | undefined
>(undefined)
