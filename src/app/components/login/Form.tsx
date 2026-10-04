import { useContext, useState } from 'react'
import { Message } from '@/app/components/error'
import {
    FormHeader,
    FormInput,
    FormPassword,
    FormSubmit,
    FormSwitch,
} from '@/app/components/login'
import { handleLoginApi } from '@/api/handleLoginApi'
import { handleRegisterApi } from '@/api/handleRegisterApi'
import { ContextIsLoggedIn } from '@/context/ContexIsLoggedIn'
import { ContextIsSettingsExpanded } from '@/context/ContextIsSettingsExpanded'
import { useErrorConfirmPassword } from '@/hooks/useErrorConfirmPassword'
import { useLoadLoginStorageValues } from '@/hooks/useLoadLoginStorageValues'
import { useLoginSubmitDisabled } from '@/hooks/useLoginSubmitDisabled'
import { useErrorUserName } from '@/hooks/useErrorUserName'
import { useErrorPassword } from '@/hooks/useErrorPassword'
import { setItemInStorage } from '@/utils/setItemInStorage'

const Form = () => {
    const contextIsLoggedIn = useContext(ContextIsLoggedIn)
    if (!contextIsLoggedIn) {
        throw new Error('Form must be used within a ContextIsLoggedIn.Provider')
    }
    const [isLoggedIn, setIsLoggedIn] = contextIsLoggedIn

    const contextIsSettingsExpanded = useContext(ContextIsSettingsExpanded)
    if (!contextIsSettingsExpanded) {
        throw new Error(
            'Form must be used within a ContextIsSettingsExpanded.Provider'
        )
    }
    const [_isSettingsExpanded, setIsSettingsExpanded] =
        contextIsSettingsExpanded

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
        if (apiError) {
            setApiError('')
        }
    }
    const handleInputPassword = (e: React.InputEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
        setConfirmPasswordDisabled(true)
        setConfirmPassword('')
        if (apiError) {
            setApiError('')
        }
    }
    const handleInputConfirmPassword = (
        e: React.InputEvent<HTMLInputElement>
    ) => {
        setConfirmPassword(e.currentTarget.value)
        if (apiError) {
            setApiError('')
        }
    }
    const handleLogin = async () => {
        handleLoginApi({
            password,
            setApiError,
            setIsLoading,
            setIsLoggedIn,
            setIsSettingsExpanded,
            userName,
        })
    }
    const handleRegister = async () => {
        handleRegisterApi({
            password,
            setApiError,
            setIsLoading,
            setIsLoggedIn,
            userName,
        })
    }
    const handleLoginOrRegister = () => {
        if (isSigningUp) {
            handleRegister()
        } else {
            handleLogin()
        }
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isSubmitDisabled) {
            handleLoginOrRegister()
        }
    }
    const handleSwitchLogin = () => {
        if (apiError) {
            setApiError('')
        }
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
            <FormHeader isSigningUp={isSigningUp} />
            <FormSwitch
                isSigningUp={isSigningUp}
                handleClick={handleSwitchLogin}
            />
            <form
                className="flex flex-col"
                autoComplete="off"
                aria-label={isSigningUp ? 'Signup' : 'Login'}
                method="post"
                target="_self"
            >
                <FormInput
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
                <Message error={errorUserName} />
                <FormPassword
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
                    <Message error={apiError} />
                ) : (
                    <Message error={errorPassword} />
                )}
                {isSigningUp && (
                    <>
                        <FormPassword
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
                            <Message error={apiError} />
                        ) : (
                            <Message error={errorConfirmPassword} />
                        )}
                    </>
                )}
                <FormSubmit
                    handleClick={handleLoginOrRegister}
                    isDisabled={isSubmitDisabled}
                    isLoading={isLoading}
                    value={isSigningUp ? 'Signup' : 'Login'}
                />
            </form>
        </>
    )
}

export default Form
