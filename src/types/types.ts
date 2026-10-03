export type ChatsButtonProps = {
    friend: string
    text: string
}

export type ErrorFieldProps = {
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

export type NavigationProfilePictureProps = {
    profilePicture: string | undefined
    size: 'small' | 'large'
}

export type NavigationSettingsButtonProps = {
    icon: React.ReactNode
    handleClick: () => void
    isClicked?: boolean
    isClickedLabel?: string
    isDelete?: boolean
    label: string
}

export type NavigationSettingsStatusProps = {
    currentStatus: string
    handleIsEditingStatus: () => void
    internalStatus: string
    isEditingStatus: boolean
    setInternalStatus: React.Dispatch<React.SetStateAction<string>>
    setIsEditingStatus: React.Dispatch<React.SetStateAction<boolean>>
    setUserData: React.Dispatch<React.SetStateAction<UserDataProps | undefined>>
}

export type UserDataProps = {
    profilePicture: string
    status: string
    userName: string
}

export type handleFetchUserApiProps = {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    setUserData: React.Dispatch<React.SetStateAction<UserDataProps | undefined>>
}

export type handleLoginApiProps = {
    password: string
    setApiError: React.Dispatch<React.SetStateAction<string>>
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | undefined>>
    userName: string
}

export type handleLogoutProps = {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | undefined>>
    setIsSettingsExpanded: React.Dispatch<
        React.SetStateAction<boolean | undefined>
    >
}

export type handleUpdateStatusAPiProps = {
    currentStatus: string
    internalStatus: string
    setApiError: React.Dispatch<React.SetStateAction<string>>
    setIsEditingStatus: React.Dispatch<React.SetStateAction<boolean>>
    setInternalStatus: React.Dispatch<React.SetStateAction<string>>
    setIsLoadingStatus: React.Dispatch<React.SetStateAction<boolean>>
    setUserData: React.Dispatch<React.SetStateAction<UserDataProps | undefined>>
}

export type handleUploadProfilePictureApiProps = {
    e: React.ChangeEvent<HTMLInputElement>
    setApiError: React.Dispatch<React.SetStateAction<string>>
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    setUserData: React.Dispatch<React.SetStateAction<UserDataProps | undefined>>
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

export type useEscapeFocusTrapNavigationSettingsProps = {
    isEditingStatus: boolean
    setIsSettingsExpanded: React.Dispatch<
        React.SetStateAction<boolean | undefined>
    >
}

export type useEscapeFocusTrapEditingStatusProps = {
    setIsEditingStatus: React.Dispatch<React.SetStateAction<boolean>>
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
