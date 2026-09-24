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

export type NavigationSettingsProps = {
    setIsLoggedIn: (value: React.SetStateAction<boolean | undefined>) => void
}

export type useErrorConfirmPasswordProps = {
    confirmPassword: string
    password: string
    setErrorConfirmPassword: React.Dispatch<React.SetStateAction<string>>
}

export type useErrorPasswordProps = {
    password: string
    setConfirmPasswordDisabled: (value: React.SetStateAction<boolean>) => void
    setErrorPassword: (value: React.SetStateAction<string>) => void
}

export type useErrorUserNameProps = {
    setErrorUserName: (value: React.SetStateAction<string>) => void
    userName: string
}

export type useLoadLoggedInStorageValueProps = {
    setIsLoggedIn: (value: React.SetStateAction<boolean | undefined>) => void
}

export type useLoadLoginStorageValuesProps = {
    setIsSigningUp: (value: React.SetStateAction<boolean>) => void
    setUserName: (value: React.SetStateAction<string>) => void
}

export type useLoginSubmitDisabledProps = {
    confirmPassword: string
    isSigningUp: boolean
    password: string
    setIsSubmitDisabled: (value: React.SetStateAction<boolean>) => void
    userName: string
}
