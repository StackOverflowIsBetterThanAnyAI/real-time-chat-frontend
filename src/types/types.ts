export type LoginFormErrorProps = {
    error: string
}

export type LoginFormHeaderProps = {
    isSigningUp: boolean
}

export type LoginFormInputProps = {
    error: string | boolean
    id: string
    label: string
    onInput: (e: React.InputEvent<HTMLInputElement>) => void
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
    title: string
    value: string
}

export type LoginFormPasswordProps = {
    autoComplete: React.HTMLInputAutoCompleteAttribute
    error: string | boolean
    id: string
    isDisabled?: boolean
    isPasswordHidden: boolean
    label: string
    onInput: (e: React.InputEvent<HTMLInputElement>) => void
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
    setIsPasswordHidden: React.Dispatch<React.SetStateAction<boolean>>
    title: string
    value: string
}

export type LoginFormSubmitProps = {
    handleClick: (e: React.MouseEvent<HTMLInputElement>) => void
    isDisabled: boolean
    isLoading: boolean
    value: string
}

export type LoginFormSwitchProps = {
    isSigningUp: boolean
    handleClick: () => void
}

export type NavigationSettingsButtonProps = {
    icon: React.ReactNode
    handleClick: () => void
    isDelete?: boolean
    label: string
}

export type handleLogoutProps = {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | undefined>>
    setIsSettingsExpanded: React.Dispatch<
        React.SetStateAction<boolean | undefined>
    >
}


export type useErrorConfirmPasswordProps = {
    confirmPassword: string
    password: string
    setErrorConfirmPassword: React.Dispatch<React.SetStateAction<string>>
}

export type useErrorPasswordProps = {
    password: string
    setConfirmPasswordDisabled: React.Dispatch<React.SetStateAction<boolean>>
    setErrorPassword: React.Dispatch<React.SetStateAction<string>>
}

export type useErrorUserNameProps = {
    setErrorUserName: React.Dispatch<React.SetStateAction<string>>
    userName: string
}

export type useLoadLoggedInStorageValueProps = {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | undefined>>
}

export type useLoadLoginStorageValuesProps = {
    setIsSigningUp: React.Dispatch<React.SetStateAction<boolean>>
    setUserName: React.Dispatch<React.SetStateAction<string>>
}

export type useLoginSubmitDisabledProps = {
    confirmPassword: string
    isSigningUp: boolean
    password: string
    setIsSubmitDisabled: React.Dispatch<React.SetStateAction<boolean>>
    userName: string
}
