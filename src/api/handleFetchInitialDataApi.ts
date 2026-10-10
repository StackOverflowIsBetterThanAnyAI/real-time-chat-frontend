import { handleLogoutApi } from '@/api'
import {
    FriendType,
    handleFetchInitialDataApiProps,
    UserDataProps,
} from '@/types'
import { setItemInSessionStorage, setItemInStorage } from '@/utils'

export const handleFetchInitialDataApi = async ({
    setFriendsData,
    setIsLoading,
    setIsLoggedIn,
    setIsSettingsExpanded,
    setUserData,
    showToast,
}: handleFetchInitialDataApiProps) => {
    setIsLoading(true)
    try {
        const [userResponse, friendsResponse] = await Promise.all([
            fetch(`http://localhost:8000/api/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }),
            fetch(`http://localhost:8000/api/friends`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }),
        ])

        if (!userResponse.ok) {
            console.log(
                'An unexpected error occurred while trying to fetch user data',
                userResponse.status,
                userResponse.statusText
            )
            const error = await userResponse.json()
            if (userResponse.status === 401) {
                handleLogoutApi({
                    setFriendsData,
                    setIsLoggedIn,
                    setIsSettingsExpanded,
                    setUserData,
                    showToast,
                })
                showToast({ label: 'Session expired. Logging user out.' })
            } else if (userResponse.status >= 400) {
                showToast({
                    label: `Could not fetch user data. ${error.error}`,
                })
            }
            return
        }

        if (!friendsResponse.ok) {
            console.log(
                'An unexpected error occurred while trying to fetch your friends',
                friendsResponse.status,
                friendsResponse.statusText
            )
            const error = await friendsResponse.json()
            if (friendsResponse.status === 401) {
                handleLogoutApi({
                    setFriendsData,
                    setIsLoggedIn,
                    setIsSettingsExpanded,
                    setUserData,
                    showToast,
                })
                showToast({ label: 'Session expired. Logging user out.' })
            } else if (
                friendsResponse.status >= 400 &&
                friendsResponse.status < 500
            ) {
                showToast({ label: `Could not fetch friends. ${error.error}` })
            } else if (friendsResponse.status >= 500) {
                showToast({
                    label: 'Could not fetch friends. Please try again.',
                })
            }
            return
        }

        const userData: UserDataProps = await userResponse.json()
        setUserData({
            profilePicture: userData.profilePicture,
            status: userData.status,
            userName: userData.userName,
        })
        setItemInStorage('profilepicture', userData.profilePicture)
        setItemInStorage('status', userData.status)
        setItemInStorage('username', userData.userName)

        const friendsData: FriendType[] = await friendsResponse.json()
        setFriendsData(friendsData)
        setItemInSessionStorage('friendsdata', friendsData)
    } catch (error) {
        console.error(
            'An unexpected error occurred while trying to fetch user data',
            error
        )
    } finally {
        setIsLoading(false)
    }
}
