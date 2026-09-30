import { handleFetchUserApiProps, UserDataProps } from '@/types/types'
import { setItemInSessionStorage } from '@/utils/setItemInSessionStorage'
import { setItemInStorage } from '@/utils/setItemInStorage'

export const handleFetchUserApi = async ({
    setIsLoading,
    setUserData,
}: handleFetchUserApiProps) => {
    try {
        setIsLoading(true)
        const response = await fetch(`http://localhost:8000/api/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })

        if (!response.ok) {
            console.log(
                'An unexpected error occurred while trying to fetch personal user data',
                response.status,
                response.statusText
            )
            return
        }

        const data: UserDataProps = await response.json()
        setUserData({
            profilePicture: data.profilePicture,
            status: data.status,
            userName: data.userName,
        })
        setItemInSessionStorage('profilepicture', data.profilePicture)
        setItemInSessionStorage('status', data.status)
        setItemInStorage('username', data.userName)
    } catch (error) {
        console.error(
            'An unexpected error occurred while trying to fetch personal user data',
            error
        )
    } finally {
        setIsLoading(false)
    }
}
