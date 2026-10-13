import { useContext } from 'react'
import { ContextToast } from '@/context'

export const useToast = () => {
    const context = useContext(ContextToast)
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context
}
