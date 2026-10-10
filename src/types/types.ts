export type ContextToastType = {
    showToast: (props: ToastProps) => void
    hideToast: () => void
}

export type ChatButtonProps = {
    friend: FriendFriendType
    id: number
}

export type ErrorMessageProps = {
    error: string
    theme?: 'red' | 'white'
}

export type FriendFriendType = {
    userName: string
    status: string
    profilePicture: string
}

export type FriendType = {
    direction: 'sent' | 'received'
    friend: FriendFriendType
    id: number
    status: 'pending' | 'accepted'
}

export type LoginFormHeaderProps = {
    isSigningUp: boolean
}

export type LoginFormInputProps = {
    error: string | boolean
    id: string
    isLoading: boolean
    label: string
    onInput: (e: React.InputEvent<HTMLInputElement>) => void
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
    title: string
    value: string
}

export type LoginFormPasswordProps = {
    error: string | boolean
    id: string
    isDisabled: boolean
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

export type SettingsButtonProps = {
    icon: React.ReactNode
    handleClick: () => void
    isClicked?: boolean
    isClickedLabel?: string
    isConfirmingDelete?: boolean
    isDelete?: boolean
    isLoading?: boolean
    label: string
}

export type SettingsFallbackProfilePictureProps = {
    id: number
    size: 'small' | 'large'
    userName: string
}

export type SettingsFriendInfoProps = {
    id: number
    profilePicture: string
    userName: string
}

export type SettingsFriendsDetailsProps = {
    content: React.ReactNode
    isExpanded?: boolean
    summary: string
}

export type SettingsFriendsFallbackProps = {
    fallback: string
}

export type SettingsFriendsOverviewItemProps = {
    id: number
    profilePicture: string
    userName: string
}

export type SettingsFriendsOverviewProps = {
    friends: FriendType[]
    isLoading: boolean
}

export type SettingsHeaderProps = {
    header: string
}

export type SettingsPendingFriendsItemProps = {
    id: number
    profilePicture: string
    userName: string
}

export type SettingsPendingFriendsProps = {
    isLoading: boolean
    pendingFriends: FriendType[]
}

export type SettingsProfilePictureProps = {
    profilePicture: string | null | undefined
    size: 'small' | 'large'
}

export type SettingsProfileProps = {
    isLoading: boolean
    profilePicture: string | null | undefined
    profilePictureDetailsRef: React.RefObject<HTMLDetailsElement | null>
    setIsEditingStatus: React.Dispatch<
        React.SetStateAction<boolean | undefined>
    >
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    userName: string | undefined
}

export type SettingsStatusProps = {
    currentStatus: string
    handleIsEditingStatus: () => void
    internalStatus: string
    isEditingStatus: boolean | undefined
    setInternalStatus: React.Dispatch<React.SetStateAction<string>>
    setIsEditingStatus: React.Dispatch<
        React.SetStateAction<boolean | undefined>
    >
    setUserData: React.Dispatch<React.SetStateAction<UserDataProps | undefined>>
}

export type ToastProps = { label: string }

export type UserDataProps = {
    profilePicture: string | null
    status: string
    userName: string
}

export type handleAddFriendApiProps = {
    setError: React.Dispatch<React.SetStateAction<string>>
    setFriendsData: React.Dispatch<
        React.SetStateAction<FriendType[] | undefined>
    >
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | undefined>>
    setIsSettingsExpanded: React.Dispatch<
        React.SetStateAction<boolean | undefined>
    >
    setUserData: React.Dispatch<React.SetStateAction<UserDataProps | undefined>>
    setUserToBeAdded: React.Dispatch<React.SetStateAction<string>>
    showToast: (props: ToastProps) => void
    userToBeAdded: string
}

export type handleDeleteAccountApiProps = {
    setFriendsData: React.Dispatch<
        React.SetStateAction<FriendType[] | undefined>
    >
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | undefined>>
    setIsSettingsExpanded: React.Dispatch<
        React.SetStateAction<boolean | undefined>
    >
    setUserData: React.Dispatch<React.SetStateAction<UserDataProps | undefined>>
    showToast: (props: ToastProps) => void
}

export type handleFetchFriendsApiProps = {
    setFriendsData: React.Dispatch<
        React.SetStateAction<FriendType[] | undefined>
    >
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | undefined>>
    setIsSettingsExpanded: React.Dispatch<
        React.SetStateAction<boolean | undefined>
    >
    setUserData: React.Dispatch<React.SetStateAction<UserDataProps | undefined>>
    showToast: (props: ToastProps) => void
}

export type handleFetchInitialDataApiProps = {
    setFriendsData: React.Dispatch<
        React.SetStateAction<FriendType[] | undefined>
    >
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | undefined>>
    setIsSettingsExpanded: React.Dispatch<
        React.SetStateAction<boolean | undefined>
    >
    setUserData: React.Dispatch<React.SetStateAction<UserDataProps | undefined>>
    showToast: (props: ToastProps) => void
}

export type handleLoginApiProps = {
    password: string
    setApiError: React.Dispatch<React.SetStateAction<string>>
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | undefined>>
    userName: string
}

export type handleLogoutApiProps = {
    setFriendsData: React.Dispatch<
        React.SetStateAction<FriendType[] | undefined>
    >
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | undefined>>
    setIsSettingsExpanded: React.Dispatch<
        React.SetStateAction<boolean | undefined>
    >
    setUserData: React.Dispatch<React.SetStateAction<UserDataProps | undefined>>
    showToast: (props: ToastProps) => void
}

export type handleRemoveProfilePictureApiProps = {
    setFriendsData: React.Dispatch<
        React.SetStateAction<FriendType[] | undefined>
    >
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | undefined>>
    setIsSettingsExpanded: React.Dispatch<
        React.SetStateAction<boolean | undefined>
    >
    setUserData: React.Dispatch<React.SetStateAction<UserDataProps | undefined>>
    showToast: (props: ToastProps) => void
}

export type handleRequestApiProps = {
    id: number
    setFriendsData: React.Dispatch<
        React.SetStateAction<FriendType[] | undefined>
    >
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | undefined>>
    setIsSettingsExpanded: React.Dispatch<
        React.SetStateAction<boolean | undefined>
    >
    setUserData: React.Dispatch<React.SetStateAction<UserDataProps | undefined>>
    showToast: (props: ToastProps) => void
}

export type handleUpdateStatusAPiProps = {
    currentStatus: string
    internalStatus: string
    setApiError: React.Dispatch<React.SetStateAction<string>>
    setFriendsData: React.Dispatch<
        React.SetStateAction<FriendType[] | undefined>
    >
    setIsEditingStatus: React.Dispatch<
        React.SetStateAction<boolean | undefined>
    >
    setInternalStatus: React.Dispatch<React.SetStateAction<string>>
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | undefined>>
    setIsSettingsExpanded: React.Dispatch<
        React.SetStateAction<boolean | undefined>
    >
    setUserData: React.Dispatch<React.SetStateAction<UserDataProps | undefined>>
    showToast: (props: ToastProps) => void
}

export type handleUploadProfilePictureApiProps = {
    e: React.ChangeEvent<HTMLInputElement>
    setFriendsData: React.Dispatch<
        React.SetStateAction<FriendType[] | undefined>
    >
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | undefined>>
    setIsSettingsExpanded: React.Dispatch<
        React.SetStateAction<boolean | undefined>
    >
    setUserData: React.Dispatch<React.SetStateAction<UserDataProps | undefined>>
    showToast: (props: ToastProps) => void
}

export type resetStorageProps = {
    isDeleteAccount?: boolean
    setFriendsData: React.Dispatch<
        React.SetStateAction<FriendType[] | undefined>
    >
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | undefined>>
    setIsSettingsExpanded: React.Dispatch<
        React.SetStateAction<boolean | undefined>
    >
    setUserData: React.Dispatch<React.SetStateAction<UserDataProps | undefined>>
}

export type useClickOutsideProfileDetailsProps = {
    profilePictureDetailsRef: React.RefObject<HTMLDetailsElement | null>
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

export type useEscapeFocusTrapSettingsProps = {
    isEditingStatus: boolean | undefined
    isFriendsExpanded: boolean | undefined
    profilePictureDetailsRef: React.RefObject<HTMLDetailsElement | null>
    setIsFriendsExpanded: React.Dispatch<
        React.SetStateAction<boolean | undefined>
    >
    setIsEditingStatus: React.Dispatch<
        React.SetStateAction<boolean | undefined>
    >
    setIsSettingsExpanded: React.Dispatch<
        React.SetStateAction<boolean | undefined>
    >
}

export type useIsDeleteCountdownProps = {
    isDeleteAccount: boolean
    setDeleteCountdown: React.Dispatch<React.SetStateAction<number>>
    setIsDeleteAccount: React.Dispatch<React.SetStateAction<boolean>>
}

export type useLoadFriendsStorageValuesProps = {
    setFriendsData: React.Dispatch<
        React.SetStateAction<FriendType[] | undefined>
    >
}

export type useLoadLoggedInStorageValueProps = {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | undefined>>
    setIsSettingsExpanded: React.Dispatch<
        React.SetStateAction<boolean | undefined>
    >
}

export type useLoadLoginStorageValuesProps = {
    setIsSigningUp: React.Dispatch<React.SetStateAction<boolean>>
    setUserName: React.Dispatch<React.SetStateAction<string>>
}

export type useLoadSettingsStorageValuesProps = {
    setInternalStatus: React.Dispatch<React.SetStateAction<string>>
    setIsEditingStatus: React.Dispatch<
        React.SetStateAction<boolean | undefined>
    >
    setIsFriendsExpanded: React.Dispatch<
        React.SetStateAction<boolean | undefined>
    >
    setUserData: React.Dispatch<React.SetStateAction<UserDataProps | undefined>>
}

export type useLoginSubmitDisabledProps = {
    confirmPassword: string
    isSigningUp: boolean
    password: string
    setIsSubmitDisabled: React.Dispatch<React.SetStateAction<boolean>>
    userName: string
}
