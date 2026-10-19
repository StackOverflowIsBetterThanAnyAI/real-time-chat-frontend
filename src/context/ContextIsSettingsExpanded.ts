import { createContext } from 'react'

export const ContextIsSettingsExpanded = createContext<
    | [
          boolean | undefined,
          React.Dispatch<React.SetStateAction<boolean | undefined>>,
      ]
    | undefined
>(undefined)
