'use client'

import { useContext } from 'react'
import { Chat, EmptyWindow } from '@/app/components/chat'
import { Login } from '@/app/components/login'
import { ContextIsLoggedIn } from '@/context'

const Home = () => {
    const contextIsLoggedIn = useContext(ContextIsLoggedIn)
    if (!contextIsLoggedIn) {
        throw new Error('Home must be used within a ContextIsLoggedIn.Provider')
    }
    const [isLoggedIn] = contextIsLoggedIn

    return isLoggedIn === undefined ? (
        <EmptyWindow isLoading={false} />
    ) : isLoggedIn ? (
        <Chat />
    ) : (
        <Login />
    )
}

export default Home
