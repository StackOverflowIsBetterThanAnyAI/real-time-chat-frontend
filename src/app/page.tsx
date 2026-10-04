'use client'

import { useContext } from 'react'
import { Chat } from '@/app/components/chat'
import { Login } from '@/app/components/login'
import { ContextIsLoggedIn } from '@/context'

export default function Home() {
    const contextIsLoggedIn = useContext(ContextIsLoggedIn)
    if (!contextIsLoggedIn) {
        throw new Error('Home must be used within a ContextIsLoggedIn.Provider')
    }
    const [isLoggedIn] = contextIsLoggedIn

    return <>{isLoggedIn ? <Chat /> : <Login />}</>
}
