import { handleFetchUserApiProps, UserDataProps } from '@/types'
import { handleLogout, setItemInStorage } from '@/utils'

export const handleFetchUserApi = async ({
    setFriendsData,
    setIsLoading,
    setIsLoggedIn,
    setIsSettingsExpanded,
    setUserData,
    showToast,
}: handleFetchUserApiProps) => {
    setIsLoading(true)
    try {
        const response = await fetch(`http://localhost:8000/api/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })

        if (!response.ok) {
            console.log(
                'An unexpected error occurred while trying to fetch user data',
                response.status,
                response.statusText
            )
            const error = await response.json()
            if (response.status === 401) {
                handleLogout({
                    setFriendsData,
                    setIsLoggedIn,
                    setIsSettingsExpanded,
                    setUserData,
                })
                showToast({ label: 'Session expired. Logging user out.' })
            } else if (response.status >= 400) {
                showToast({
                    label: `Could not fetch user data. ${error.error}`,
                })
            }
            return
        }

        const data: UserDataProps = await response.json()
        setUserData({
            profilePicture: data.profilePicture,
            status: data.status,
            userName: data.userName,
        })
        setItemInStorage('profilepicture', data.profilePicture)
        setItemInStorage('status', data.status)
        setItemInStorage('username', data.userName)
    } catch (error) {
        console.error(
            'An unexpected error occurred while trying to fetch user data',
            error
        )
    } finally {
        setIsLoading(false)
    }
}
