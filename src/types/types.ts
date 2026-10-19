import {
    ChangeEvent,
    Dispatch,
    InputEvent,
    KeyboardEvent,
    MouseEvent,
    ReactNode,
    RefObject,
    SetStateAction,
} from 'react'

export type ChatButtonProps = {
    friend: FriendType
    isExpanded: boolean
}

export type ChatEmptyWindowProps = {
    isLoading: boolean
}

export type ChatFriendType = {
    direction: 'sent' | 'received'
    friend: {
        userName: string
        profilePicture: string
        status: string
        isPartnerOnline: boolean
    }
    id: number
    status: 'pending' | 'accepted'
    draftedMessage: string
    conversationId: number
    messages: {
        id: number
        content: string
        createdAt: string
        direction: 'sent' | 'received'
    }[]
}

export type ChatMessageProps = {
    content: string
    isSent?: boolean
}

export type ChatSidebarButtonsProps = {
    filteredFriends: FriendType[]
    isSidebarExpanded: boolean
    screenWidth: ScreenWidthType
}

export type ChatSidebarProps = {
    isSidebarExpanded: boolean
    setIsSidebarExpanded: Dispatch<SetStateAction<boolean>>
}

export type ChatSidebarSearchProps = {
    filter: string
    setFilter: Dispatch<SetStateAction<string>>
}

export type ConversationProps = {
    conversationId: number
    messages: {
        id: number
        content: string
        createdAt: string
        direction: 'received' | 'sent'
    }[]
}

export type ContextToastType = {
    showToast: (props: ToastProps) => void
    hideToast: () => void
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
    onInput: (e: InputEvent<HTMLInputElement>) => void
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
    title: string
    value: string
}

export type LoginFormPasswordProps = {
    error: string | boolean
    id: string
    isDisabled: boolean
    isPasswordHidden: boolean
    label: string
    onInput: (e: InputEvent<HTMLInputElement>) => void
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
    setIsPasswordHidden: Dispatch<SetStateAction<boolean>>
    title: string
    value: string
}

export type LoginFormSubmitProps = {
    handleClick: (e: MouseEvent<HTMLInputElement>) => void
    isDisabled: boolean
    isLoading: boolean
    value: string
}

export type LoginFormSwitchProps = {
    isLoading: boolean
    isSigningUp: boolean
    handleClick: () => void
}

export type PollingProps = {
    isPartnerOnline: boolean
    messages: ConversationProps['messages']
}

export type ScreenWidthType = 'MOBILE' | 'NOT_MOBILE'

export type SettingsAddFriendProps = {
    isExpanded: boolean
    setIsExpanded: (val: boolean | ((prev: boolean) => boolean)) => void
}

export type SettingsButtonProps = {
    icon: ReactNode
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
    isOnline?: boolean
    showIsOnline?: boolean
    size: 'small' | 'large'
    userName: string
}

export type SettingsFallbackTextProps = {
    fallback: string
}

export type SettingsFriendInfoProps = {
    id: number
    profilePicture: string
    userName: string
}

export type SettingsFriendsDetailsProps = {
    content: ReactNode
    isExpanded: boolean
    setIsExpanded: (val: boolean | ((prev: boolean) => boolean)) => void
    summary: string
}

export type SettingsFriendsOverviewItemProps = {
    id: number
    profilePicture: string
    userName: string
}

export type SettingsFriendsOverviewProps = {
    friends: FriendType[]
    isExpanded: boolean
    isLoading: boolean
    setIsExpanded: (val: boolean | ((prev: boolean) => boolean)) => void
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
    isExpanded: boolean
    isLoading: boolean
    pendingFriends: FriendType[]
    setIsExpanded: (val: boolean | ((prev: boolean) => boolean)) => void
}

export type SettingsProfilePictureProps = {
    profilePicture: string | null | undefined
    size: 'small' | 'large'
}

export type SettingsProfileProps = {
    isLoading: boolean
    profilePicture: string | null | undefined
    profilePictureDetailsRef: RefObject<HTMLDetailsElement | null>
    setIsEditingStatus: Dispatch<SetStateAction<boolean | undefined>>
    setIsLoading: Dispatch<SetStateAction<boolean>>
    userName: string | undefined
}

export type SettingsProps = {
    profileButtonRef: RefObject<HTMLButtonElement | null>
}

export type SettingsStatusProps = {
    currentStatus: string
    handleIsEditingStatus: () => void
    internalStatus: string
    isEditingStatus: boolean | undefined
    setInternalStatus: Dispatch<SetStateAction<string>>
    setIsEditingStatus: Dispatch<SetStateAction<boolean | undefined>>
    setUserData: Dispatch<SetStateAction<UserDataProps | undefined>>
}

export type StatisticsType = {
    favoriteFriend: {
        userName: string
        messageCount: number
        status: string
        profilePicture: string
    } | null
    streak: number
    timeline: { dateOfMessage: string; messageCount: number }[]
    totalReceived: number
    totalSent: number
}

export type ToastProps = { label: string }

export type UserDataProps = {
    profilePicture: string | null
    status: string
    userName: string
}

export type handleAddFriendApiProps = {
    logout: () => Promise<void>
    setError: Dispatch<SetStateAction<string>>
    setFriendsData: Dispatch<SetStateAction<FriendType[] | undefined>>
    setIsLoading: Dispatch<SetStateAction<boolean>>
    setUserToBeAdded: Dispatch<SetStateAction<string>>
    showToast: (props: ToastProps) => void
    userToBeAdded: string
}

export type handleDeleteAccountApiProps = {
    logout: () => Promise<void>
    setChatFriendData: Dispatch<SetStateAction<ChatFriendType | undefined>>
    setFriendsData: Dispatch<SetStateAction<FriendType[] | undefined>>
    setIsLoading: Dispatch<SetStateAction<boolean>>
    setIsLoggedIn: Dispatch<SetStateAction<boolean | undefined>>
    setIsSettingsExpanded: Dispatch<SetStateAction<boolean | undefined>>
    setUserData: Dispatch<SetStateAction<UserDataProps | undefined>>
    showToast: (props: ToastProps) => void
}

export type handleFetchFriendsApiProps = {
    logout: () => Promise<void>
    setFriendsData: Dispatch<SetStateAction<FriendType[] | undefined>>
    setIsLoading: Dispatch<SetStateAction<boolean>>
    showToast: (props: ToastProps) => void
}

export type handleFetchInitialDataApiProps = {
    logout: () => Promise<void>
    setFriendsData: Dispatch<SetStateAction<FriendType[] | undefined>>
    setIsLoading: Dispatch<SetStateAction<boolean>>
    setUserData: Dispatch<SetStateAction<UserDataProps | undefined>>
    showToast: (props: ToastProps) => void
}

export type handleFetchStatisticsApiProps = {
    logout: () => Promise<void>
    setIsLoading: Dispatch<SetStateAction<boolean>>
    setUserStatistics: Dispatch<SetStateAction<StatisticsType | undefined>>
    showToast: (props: ToastProps) => void
}

export type handleLoginApiProps = {
    password: string
    setApiError: Dispatch<SetStateAction<string>>
    setIsLoading: Dispatch<SetStateAction<boolean>>
    setIsLoggedIn: Dispatch<SetStateAction<boolean | undefined>>
    userName: string
}

export type handleOpenChatApiProps = {
    friend: string
    logout: () => Promise<void>
    setChatFriendData: Dispatch<SetStateAction<ChatFriendType | undefined>>
    showToast: (props: ToastProps) => void
}

export type handlePollMessageApiProps = {
    chatFriendData: ChatFriendType | undefined
    conversationId: number
    logout: () => Promise<void>
    setChatFriendData: Dispatch<SetStateAction<ChatFriendType | undefined>>
    showToast: (props: ToastProps) => void
}

export type handleRemoveProfilePictureApiProps = {
    logout: () => Promise<void>
    setIsLoading: Dispatch<SetStateAction<boolean>>
    setUserData: Dispatch<SetStateAction<UserDataProps | undefined>>
    showToast: (props: ToastProps) => void
}

export type handleRequestApiProps = {
    id: number
    logout: () => Promise<void>
    setFriendsData: Dispatch<SetStateAction<FriendType[] | undefined>>
    setIsLoading: Dispatch<SetStateAction<boolean>>
    showToast: (props: ToastProps) => void
}

export type handleSendHeartbeatApiProps = {
    logout: () => Promise<void>
    showToast: (props: ToastProps) => void
}

export type handleSendMessageApiProps = {
    id: number
    logout: () => Promise<void>
    message: string
    setChatFriendData: Dispatch<SetStateAction<ChatFriendType | undefined>>
    showToast: (props: ToastProps) => void
}

export type handleUpdateStatusApiProps = {
    currentStatus: string
    internalStatus: string
    logout: () => Promise<void>
    setApiError: Dispatch<SetStateAction<string>>
    setIsEditingStatus: Dispatch<SetStateAction<boolean | undefined>>
    setInternalStatus: Dispatch<SetStateAction<string>>
    setIsLoading: Dispatch<SetStateAction<boolean>>
    setUserData: Dispatch<SetStateAction<UserDataProps | undefined>>
    showToast: (props: ToastProps) => void
}

export type handleUploadProfilePictureApiProps = {
    e: ChangeEvent<HTMLInputElement>
    logout: () => Promise<void>
    setIsLoading: Dispatch<SetStateAction<boolean>>
    setUserData: Dispatch<SetStateAction<UserDataProps | undefined>>
    showToast: (props: ToastProps) => void
}

export type resetStorageProps = {
    isDeleteAccount?: boolean
    setChatFriendData: Dispatch<SetStateAction<ChatFriendType | undefined>>
    setFriendsData: Dispatch<SetStateAction<FriendType[] | undefined>>
    setIsLoggedIn: Dispatch<SetStateAction<boolean | undefined>>
    setIsSettingsExpanded: Dispatch<SetStateAction<boolean | undefined>>
    setUserData: Dispatch<SetStateAction<UserDataProps | undefined>>
}

export type useChatScrollToBottomProps = {
    chatFriendData: ChatFriendType | undefined
    chatRef: RefObject<HTMLDivElement | null>
}

export type useClickOutsideProfileDetailsProps = {
    profilePictureDetailsRef: RefObject<HTMLDetailsElement | null>
}

export type useErrorConfirmPasswordProps = {
    confirmPassword: string
    password: string
    setErrorConfirmPassword: Dispatch<SetStateAction<string>>
}

export type useErrorPasswordProps = {
    password: string
    setConfirmPasswordDisabled: Dispatch<SetStateAction<boolean>>
    setErrorPassword: Dispatch<SetStateAction<string>>
}

export type useErrorUserNameProps = {
    setErrorUserName: Dispatch<SetStateAction<string>>
    userName: string
}

export type useEscapeFocusTrapSettingsProps = {
    addFriendRef: RefObject<HTMLButtonElement | null>
    isEditingStatus: boolean | undefined
    isFriendsExpanded: boolean | undefined
    profileButtonRef: RefObject<HTMLButtonElement | null>
    profilePictureDetailsRef: RefObject<HTMLDetailsElement | null>
    setIsDetailsExpanded: Dispatch<SetStateAction<isDetailsExpandedType>>
    setIsEditingStatus: Dispatch<SetStateAction<boolean | undefined>>
    setIsFriendsExpanded: Dispatch<SetStateAction<boolean | undefined>>
    setIsSettingsExpanded: Dispatch<SetStateAction<boolean | undefined>>
    settingsRef: RefObject<HTMLElement | null>
}

export type useEscapeFocusTrapSidebarProps = {
    isSidebarExpanded: boolean
    setFilter: Dispatch<SetStateAction<string>>
    setIsSidebarExpanded: Dispatch<SetStateAction<boolean>>
    sidebarRef: RefObject<HTMLDivElement | null>
}

export type useFocusTrapSidebarProps = {
    isActive: boolean
}

export type useIsDeleteCountdownProps = {
    isDeleteAccount: boolean
    setDeleteCountdown: Dispatch<SetStateAction<number>>
    setIsDeleteAccount: Dispatch<SetStateAction<boolean>>
}

export type useLoadChatStorageValuesProps = {
    setChatFriendData: Dispatch<SetStateAction<ChatFriendType | undefined>>
    setIsSidebarExpanded: Dispatch<SetStateAction<boolean>>
}

export type isDetailsExpandedType = {
    friendsOverview: boolean
    addFriend: boolean
    pendingFriends: boolean
}

export type useLoadFriendsStorageValuesProps = {
    setFriendsData: Dispatch<SetStateAction<FriendType[] | undefined>>
    setIsDetailsExpanded: Dispatch<SetStateAction<isDetailsExpandedType>>
}

export type useLoadLoggedInStorageValuesProps = {
    setIsLoggedIn: Dispatch<SetStateAction<boolean | undefined>>
    setIsSettingsExpanded: Dispatch<SetStateAction<boolean | undefined>>
}

export type useLoadLoginStorageValuesProps = {
    setIsSigningUp: Dispatch<SetStateAction<boolean>>
    setUserName: Dispatch<SetStateAction<string>>
}

export type useLoadScreenWidthStorageValueProps = {
    setScreenWidth: Dispatch<SetStateAction<ScreenWidthType>>
}

export type useLoadSettingsStorageValuesProps = {
    setInternalStatus: Dispatch<SetStateAction<string>>
    setIsEditingStatus: Dispatch<SetStateAction<boolean | undefined>>
    setIsFriendsExpanded: Dispatch<SetStateAction<boolean | undefined>>
    setUserData: Dispatch<SetStateAction<UserDataProps | undefined>>
}

export type useLoadSidebarStorageValuesProps = {
    setFilter: Dispatch<SetStateAction<string>>
}

export type useLoadStatisticsStorageValuesProps = {
    setUserStatistics: Dispatch<SetStateAction<StatisticsType | undefined>>
}

export type useLoginSubmitDisabledProps = {
    confirmPassword: string
    isSigningUp: boolean
    password: string
    setIsSubmitDisabled: Dispatch<SetStateAction<boolean>>
    userName: string
}

export type usePollMessageProps = {
    chatFriendData: ChatFriendType | undefined
    conversationId: number | undefined
    logout: () => Promise<void>
    setChatFriendData: Dispatch<SetStateAction<ChatFriendType | undefined>>
    showToast: (props: ToastProps) => void
}

export type useScreenWidthProps = {
    setIsSidebarExpanded: Dispatch<SetStateAction<boolean>>
}
