import { handleLogoutApi } from '@/api'
import { handleOpenChatApiProps } from '@/types'

export const handleOpenChatApi = async ({
    friend,
    setFriendsData,
    setIsLoading,
    setIsLoggedIn,
    setIsSettingsExpanded,
    setUserData,
    showToast,
}: handleOpenChatApiProps) => {
    try {
        setIsLoading(true)
        const response = await fetch(
            `http://localhost:8000/api/conversation/${friend}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }
        )

        if (!response.ok) {
            console.log(
                'An unexpected error occurred while trying to open the chat',
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
                    label: `Could not open chat. ${error.error}`,
                })
            } else if (response.status >= 500) {
                showToast({
                    label: 'Could not open chat. Please try again.',
                })
            }
            return
        }

        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.error(
            'An unexpected error occurred while trying to open the chat',
            error
        )
        showToast({ label: 'Could not open chat.' })
    } finally {
        setIsLoading(false)
    }
}
