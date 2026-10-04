import { handleLoginApiProps } from '@/types/types'
import { handleLogout, setItemInStorage } from '@/utils'

export const handleLoginApi = async ({
    password,
    setApiError,
    setIsLoading,
    setIsLoggedIn,
    setIsSettingsExpanded,
    userName,
}: handleLoginApiProps) => {
    setIsLoading(true)
    setApiError('')
    try {
        const response = await fetch(`http://localhost:8000/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName, password }),
            credentials: 'include',
        })

        if (!response.ok) {
            setIsLoggedIn(false)
            setItemInStorage('isloggedin', false)
            console.log(
                'An unexpected error occurred while trying to login',
                response.status,
                response.statusText
            )
            const error = await response.json()
            if (response.status === 401) {
                handleLogout({ setIsLoggedIn, setIsSettingsExpanded })
            } else if (response.status >= 400 && response.status < 500) {
                setApiError(`Could not login user. ${error.error}`)
            } else if (response.status >= 500) {
                setApiError('Could not login user. Please try again.')
            }
            return
        }

        setIsLoggedIn(true)
        setItemInStorage('isloggedin', true)
        setApiError('')
    } catch (error) {
        setIsLoggedIn(false)
        setItemInStorage('isloggedin', false)
        console.error(
            'An unexpected error occurred while trying to login',
            error
        )
        setApiError('Could not login user. Please try again.')
    } finally {
        setIsLoading(false)
    }
}
