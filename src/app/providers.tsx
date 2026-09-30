'use client'

import { useState } from 'react'
import { ContextIsLoggedIn } from '@/context/ContexIsLoggedIn'
import { ContextUserData } from '@/context/ContextUserData'
import { useLoadLoggedInStorageValue } from '@/hooks/useLoadLoggedInStorageValue'
import { UserDataProps } from '@/types/types'

export function Providers({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(false)
    const userState = useState<UserDataProps | undefined>(undefined)

    useLoadLoggedInStorageValue({ setIsLoggedIn })

    return (
        <ContextIsLoggedIn.Provider value={[isLoggedIn, setIsLoggedIn]}>
            <ContextUserData.Provider value={userState}>
                {children}
            </ContextUserData.Provider>
        </ContextIsLoggedIn.Provider>
    )
}
