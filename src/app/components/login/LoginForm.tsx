import { useContext, useState } from 'react'
import LoginFormError from './LoginFormError'
import LoginFormHeader from './LoginFormHeader'
import LoginFormInput from './LoginFormInput'
import LoginFormPassword from './LoginFormPassword'
import LoginFormSubmit from './LoginFormSubmit'
import LoginFormSwitch from './LoginFormSwitch'
import { ContextIsLoggedIn } from '@/context/ContexIsLoggedIn'
import { useErrorConfirmPassword } from '@/hooks/useErrorConfirmPassword'
import { useLoadLoginStorageValues } from '@/hooks/useLoadLoginStorageValues'
import { useLoginSubmitDisabled } from '@/hooks/useLoginSubmitDisabled'
import { useErrorUserName } from '@/hooks/useErrorUserName'
import { useErrorPassword } from '@/hooks/useErrorPassword'
import { setItemInStorage } from '@/utils/setItemInStorage'

const LoginForm = () => {
    const contextIsLoggedIn = useContext(ContextIsLoggedIn)
    if (!contextIsLoggedIn) {
        throw new Error(
            'LoginForm must be used within a ContextIsLoggedIn.Provider'
        )
    }
    const [isLoggedIn, setIsLoggedIn] = contextIsLoggedIn

    const [apiError, setApiError] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [confirmPasswordDisabled, setConfirmPasswordDisabled] =
        useState<boolean>(true)
    const [errorUserName, setErrorUserName] = useState<string>('')
    const [errorPassword, setErrorPassword] = useState<string>('')
    const [errorConfirmPassword, setErrorConfirmPassword] = useState<string>('')
    const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true)
    const [isSigningUp, setIsSigningUp] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('')
    const [userName, setUserName] = useState<string>('')

    const handleInputUserName = (e: React.InputEvent<HTMLInputElement>) => {
        const input = e.currentTarget.value
        setUserName(input)
        setItemInStorage('username', input)
    }
    const handleInputPassword = (e: React.InputEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
        setConfirmPasswordDisabled(true)
        setConfirmPassword('')
    }
    const handleInputConfirmPassword = (
        e: React.InputEvent<HTMLInputElement>
    ) => {
        setConfirmPassword(e.currentTarget.value)
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isSubmitDisabled) {
            setIsLoggedIn(() => {
                const nextVal = !isLoggedIn
                setItemInStorage('isloggedin', nextVal)
                return nextVal
            })
        }
    }
    const handleSwitchLogin = () => {
        setIsSigningUp((prev) => {
            const nextVal = !prev
            setItemInStorage('issigningup', nextVal)
            return nextVal
        })
    }

    useErrorConfirmPassword({
        confirmPassword,
        password,
        setErrorConfirmPassword,
    })
    useErrorPassword({ password, setConfirmPasswordDisabled, setErrorPassword })
    useErrorUserName({ setErrorUserName, userName })
    useLoadLoginStorageValues({ setIsSigningUp, setUserName })
    useLoginSubmitDisabled({
        confirmPassword,
        isSigningUp,
        password,
        setIsSubmitDisabled,
        userName,
    })

    return (
        <>
            <LoginFormHeader isSigningUp={isSigningUp} />
            <LoginFormSwitch
                isSigningUp={isSigningUp}
                handleClick={handleSwitchLogin}
            />
            <form
                className="flex flex-col"
                autoComplete="on"
                aria-label={isSigningUp ? 'Signup' : 'Login'}
                name={isSigningUp ? 'signup' : 'login'}
                method="post"
                target="_self"
            >
                <LoginFormInput
                    error={errorUserName}
                    id={`${isSigningUp ? 'signup' : 'login'}User`}
                    label="User Name"
                    onInput={handleInputUserName}
                    onKeyDown={handleKeyDown}
                    title={
                        isSigningUp
                            ? 'Choose a user name containing between 5 and 20 characters and only Latin letters or numbers.'
                            : 'Enter your user name.'
                    }
                    value={userName}
                />
                <LoginFormError error={errorUserName} />
                <LoginFormPassword
                    autoComplete={`${isSigningUp ? 'new' : 'current'}-password`}
                    error={(!isSigningUp && apiError) || errorPassword}
                    id={`${isSigningUp ? 'signup' : 'login'}Password`}
                    isPasswordHidden={isPasswordHidden}
                    label="Password"
                    onInput={handleInputPassword}
                    onKeyDown={handleKeyDown}
                    setIsPasswordHidden={setIsPasswordHidden}
                    title={
                        isSigningUp
                            ? 'Choose a password containing between 8 and 25 characters.'
                            : 'Enter your password.'
                    }
                    value={password}
                />
                {!isSigningUp && apiError ? (
                    <LoginFormError error={apiError} />
                ) : (
                    <LoginFormError error={errorPassword} />
                )}
                {isSigningUp && (
                    <>
                        <LoginFormPassword
                            autoComplete="new-password"
                            error={apiError || errorConfirmPassword}
                            id="signupConfirmPassword"
                            isDisabled={confirmPasswordDisabled}
                            isPasswordHidden={isPasswordHidden}
                            label="Confirm Password"
                            onInput={handleInputConfirmPassword}
                            onKeyDown={handleKeyDown}
                            setIsPasswordHidden={setIsPasswordHidden}
                            title={
                                confirmPasswordDisabled
                                    ? 'Currently disabled, enter a valid password first.'
                                    : 'Confirm the password by entering it again.'
                            }
                            value={confirmPassword}
                        />
                        {apiError ? (
                            <LoginFormError error={apiError} />
                        ) : (
                            <LoginFormError error={errorConfirmPassword} />
                        )}
                    </>
                )}
                <LoginFormSubmit
                    handleClick={() => {
                        setIsLoggedIn(() => {
                            const nextVal = !isLoggedIn
                            setItemInStorage('isloggedin', nextVal)
                            return nextVal
                        })
                    }}
                    isDisabled={isSubmitDisabled}
                    isLoading={isLoading}
                    value={isSigningUp ? 'Signup' : 'Login'}
                />
            </form>
        </>
    )
}

export default LoginForm
