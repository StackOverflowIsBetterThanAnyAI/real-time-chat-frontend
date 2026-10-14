'use client'

import { createContext } from 'react'

export const ContextLogout = createContext<{
    logout: () => Promise<void>
} | null>(null)
