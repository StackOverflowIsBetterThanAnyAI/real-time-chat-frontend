'use client'

import { useContext } from 'react'
import Chat from '@/app/components/chat/Chat'
import Login from '@/app/components/login/Login'
import { ContextIsLoggedIn } from '@/context/ContexIsLoggedIn'

export default function Home() {
    const contextIsLoggedIn = useContext(ContextIsLoggedIn)
    if (!contextIsLoggedIn) {
        throw new Error('Home must be used within a ContextIsLoggedIn.Provider')
    }
    const [isLoggedIn] = contextIsLoggedIn

    return (
        <>
            <Login /> <Chat />
        </>
    )
}
