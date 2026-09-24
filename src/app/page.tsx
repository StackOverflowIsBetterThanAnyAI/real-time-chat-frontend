'use client'

import { useState } from 'react'
import Login from '@/app/components/login/Login'
import { ContextIsLoggedIn } from '@/context/ContexIsLoggedIn'
import { getStoredData } from '@/utils/getStoredData'
import { setItemInStorage } from '@/utils/setItemInStorage'

export default function Home() {
    const parsedLocalData = getStoredData()

    const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(() => {
        const data = parsedLocalData?.isloggedin
        if (data && typeof data === 'boolean') {
            return data
        }
        setItemInStorage('isloggedin', false)
        return false
    })

    return (
        <ContextIsLoggedIn.Provider value={[isLoggedIn, setIsLoggedIn]}>
            <Login />
        </ContextIsLoggedIn.Provider>
    )
}
