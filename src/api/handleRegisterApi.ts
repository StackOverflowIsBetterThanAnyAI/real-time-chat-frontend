import { handleLoginApi } from '@/api'
import { AUTH_REQUEST_TIMEOUT_MS, SERVER_ADDRESS } from '@/constants'
import { handleLoginApiProps } from '@/types'
import { setItemInStorage } from '@/utils'

export const handleRegisterApi = async ({
    password,
    setApiError,
    setIsLoading,
    setIsLoggedIn,
    userName,
}: handleLoginApiProps) => {
    setIsLoading(true)
    setIsLoggedIn(false)
    setApiError('')
    try {
        const response = await fetch(`${SERVER_ADDRESS}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName, password }),
            credentials: 'include',
            signal: AbortSignal.timeout(AUTH_REQUEST_TIMEOUT_MS),
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

        await handleLoginApi({
            password,
            setApiError,
            setIsLoading,
            setIsLoggedIn,
            userName,
        })
    } catch (error) {
        setIsLoggedIn(false)
        setItemInStorage('isloggedin', false)
        if (error instanceof DOMException && error.name === 'TimeoutError') {
            console.error('Sign up request timed out')
            setApiError(
                'The server is currently experiencing problems. Please try again later.'
            )
            return
        }
        console.error(
            'An unexpected error occurred while trying to sign up',
            error
        )
        setApiError('Could not create user. Please try again.')
    } finally {
        setIsLoading(false)
    }
}
