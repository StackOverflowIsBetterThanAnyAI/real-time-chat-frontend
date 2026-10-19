import { isDetailsExpandedType } from '@/types'
import { createContext } from 'react'

export const ContextIsDetailsExpanded = createContext<
    | [
          isDetailsExpandedType,
          React.Dispatch<React.SetStateAction<isDetailsExpandedType>>,
      ]
    | undefined
>(undefined)
