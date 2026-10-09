import { handleLogoutApiProps } from '@/types'
import { resetStorage } from '@/utils'

export const handleLogoutApi = async ({
    setFriendsData,
    setIsLoggedIn,
    setIsSettingsExpanded,
    setUserData,
    showToast,
}: handleLogoutApiProps) => {
    try {
        const response = await fetch(`http://localhost:8000/api/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })

        if (!response.ok) {
            console.log(
                'An unexpected error occurred while trying to logout',
                response.status,
                response.statusText
            )
            const error = await response.json()
            if (response.status >= 400 && response.status < 500) {
                showToast({ label: `Could not logout user. ${error.error}` })
            } else if (response.status >= 500) {
                showToast({ label: 'Could not logout user. Please try again.' })
            }
            return
        }

        resetStorage({
            setFriendsData,
            setIsLoggedIn,
            setIsSettingsExpanded,
            setUserData,
        })
    } catch (error) {
        console.error(
            'An unexpected error occurred while trying to logout',
            error
        )
        showToast({ label: 'Could not logout user. Please try again.' })
    }
}
