import { useContext } from 'react'
import { ContextLogout } from '@/context'

export const useLogout = () => {
    const contextLogout = useContext(ContextLogout)
    if (!contextLogout)
        throw new Error('useLogout must be used within a ContextLogoutProvider')
    return contextLogout
}
