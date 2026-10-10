import { useEffect } from 'react'
import { useIsDeleteCountdownProps } from '@/types'

export const useIsDeleteCountdown = ({
    isDeleteAccount,
    setDeleteCountdown,
    setIsDeleteAccount,
}: useIsDeleteCountdownProps) => {
    useEffect(() => {
        if (!isDeleteAccount) {
            setDeleteCountdown(5)
            return
        }

        const startedAt = Date.now()
        const updateCountdown = () => {
            const elapsed = (Date.now() - startedAt) / 1000
            const remaining = Math.max(0, 5 - elapsed)

            setDeleteCountdown(Math.ceil(remaining))

            if (remaining <= 0) {
                setIsDeleteAccount(false)
            }
        }
        updateCountdown()
        const interval = setInterval(updateCountdown, 50)

        return () => clearInterval(interval)
    }, [isDeleteAccount, setDeleteCountdown, setIsDeleteAccount])
}
