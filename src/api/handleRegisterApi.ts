import { handleRegisterApiProps } from '@/types'
import { setItemInStorage } from '@/utils'

export const handleRegisterApi = async ({
    password,
    setApiError,
    setIsLoading,
    setIsLoggedIn,
    userName,
}: handleRegisterApiProps) => {
    setIsLoading(true)
    setApiError('')
    try {
        const response = await fetch(`http://localhost:8000/api/register`, {
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
                'An unexpected error occurred while trying to sign up',
                response.status,
                response.statusText
            )
            const error = await response.json()
            if (response.status >= 400 && response.status < 500) {
                setApiError(`Could not create user. ${error.error}`)
            } else if (response.status >= 500) {
                setApiError('Could not create user. Please try again.')
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
            'An unexpected error occurred while trying to sign up',
            error
        )
        setApiError('Could not create user. Please try again.')
    } finally {
        setIsLoading(false)
    }
}
