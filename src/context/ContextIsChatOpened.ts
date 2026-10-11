'use client'

import { createContext } from 'react'

export const ContextIsChatOpened = createContext<
    | [
          boolean | undefined,
          React.Dispatch<React.SetStateAction<boolean | undefined>>,
      ]
    | undefined
>(undefined)
