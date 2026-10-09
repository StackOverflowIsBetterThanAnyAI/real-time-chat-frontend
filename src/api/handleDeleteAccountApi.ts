import { handleLogoutApi } from '@/api'
import { handleDeleteAccountApiProps } from '@/types'
import { setItemInStorage } from '@/utils'

export const handleDeleteAccountApi = async ({
    setFriendsData,
    setIsLoading,
    setIsLoggedIn,
    setIsSettingsExpanded,
    setUserData,
    showToast,
}: handleDeleteAccountApiProps) => {
    setIsLoading(true)
    try {
        const response = await fetch(`http://localhost:8000/api/account`, {
            method: 'DELETE',
            credentials: 'include',
        })

        if (!response.ok) {
            console.log(
                'An unexpected error occurred while trying to delete the account',
                response.status,
                response.statusText
            )
            const error = await response.json()
            if (response.status === 401) {
                handleLogoutApi({
                    setFriendsData,
                    setIsLoggedIn,
                    setIsSettingsExpanded,
                    setUserData,
                    showToast,
                })
                showToast({ label: 'Session expired. Logging user out.' })
            } else if (response.status >= 400 && response.status < 500) {
                showToast({
                    label: `Could not delete account. ${error.error}`,
                })
            } else if (response.status >= 500) {
                showToast({
                    label: 'Could not delete account. Please try again.',
                })
            }
            return
        }

        handleLogoutApi({
            setFriendsData,
            setIsLoggedIn,
            setIsSettingsExpanded,
            setUserData,
            showToast,
        })
        setItemInStorage('username', null)
        showToast({
            label: 'Account has been deleted successfully.',
        })
    } catch (error) {
        console.error(
            'An unexpected error occurred while trying to delete the account',
            error
        )
        showToast({
            label: 'Could not delete account. Please try again.',
        })
    } finally {
        setIsLoading(false)
    }
}
