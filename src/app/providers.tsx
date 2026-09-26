'use client'

import { useState } from 'react'
import { ContextIsLoggedIn } from '@/context/ContexIsLoggedIn'
import { useLoadLoggedInStorageValue } from '@/hooks/useLoadLoggedInStorageValue'

export function Providers({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(false)

    useLoadLoggedInStorageValue({ setIsLoggedIn })

    return (
        <ContextIsLoggedIn.Provider value={[isLoggedIn, setIsLoggedIn]}>
            {children}
        </ContextIsLoggedIn.Provider>
    )
}
