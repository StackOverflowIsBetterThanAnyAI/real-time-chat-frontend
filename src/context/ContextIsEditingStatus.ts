'use client'

import { createContext } from 'react'

export const ContextIsEditingStatus = createContext<
    | [
          boolean | undefined,
          React.Dispatch<React.SetStateAction<boolean | undefined>>,
      ]
    | undefined
>(undefined)
