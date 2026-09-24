'use client'

import { useState, useEffect, ReactNode } from 'react'
import { ContextIsLoggedIn } from '@/context/ContexIsLoggedIn'
import { getStoredData } from '@/utils/getStoredData'
import { setItemInStorage } from '@/utils/setItemInStorage'

export function Providers({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(false)

    useEffect(() => {
        const parsedLocalData = getStoredData()
        const data = parsedLocalData?.isloggedin

        if (typeof data === 'boolean') {
            setIsLoggedIn(data)
        } else {
            setItemInStorage('isloggedin', false)
            setIsLoggedIn(false)
        }
    }, [])

    return (
        <ContextIsLoggedIn.Provider value={[isLoggedIn, setIsLoggedIn]}>
            {children}
        </ContextIsLoggedIn.Provider>
    )
}
