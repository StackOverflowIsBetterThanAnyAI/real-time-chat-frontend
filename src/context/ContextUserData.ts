import { createContext } from 'react'
import { UserDataProps } from '@/types/types'

export const ContextUserData = createContext<
    | [
          UserDataProps | undefined,
          React.Dispatch<React.SetStateAction<UserDataProps | undefined>>,
      ]
    | undefined
>(undefined)
