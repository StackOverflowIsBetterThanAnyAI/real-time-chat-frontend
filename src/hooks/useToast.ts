import { useContext } from 'react'
import { ContextToast } from '@/context'

export const useToast = () => {
    const contextToast = useContext(ContextToast)
    if (!contextToast) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return contextToast
}
