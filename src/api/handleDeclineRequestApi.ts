import { handleRequestApiProps } from '@/types'
import { handleLogout } from '@/utils'

export const handleDeclineRequestApi = async ({
    id,
    setFriendsData,
    setIsLoading,
    setIsLoggedIn,
    setIsSettingsExpanded,
    showToast,
}: handleRequestApiProps) => {
    setIsLoading(true)
    try {
        const response = await fetch(
            `http://localhost:8000/api/friends/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }
        )

        if (!response.ok) {
            console.log(
                'An unexpected error occurred while trying to update the friend status',
                response.status,
                response.statusText
            )
            const error = await response.json()
            if (response.status === 401) {
                handleLogout({ setIsLoggedIn, setIsSettingsExpanded })
                showToast({ label: 'Session expired. Logging user out.' })
            } else if (response.status >= 400 && response.status < 500) {
                showToast({
                    label: `Could not update friend status. ${error.error}`,
                })
            } else if (response.status >= 500) {
                showToast({
                    label: 'Could not update friend status. Please try again.',
                })
            }
            return
        }

        showToast({
            label: 'Friend has been removed!',
        })
        setFriendsData((prev) => prev?.filter((item) => item.id !== id))
    } catch (error) {
        console.error(
            'An unexpected error occurred while trying to update the friend status',
            error
        )
        showToast({
            label: 'Could not update friend status. Please try again.',
        })
    } finally {
        setIsLoading(false)
    }
}
