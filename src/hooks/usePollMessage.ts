import { useEffect } from 'react'
import { handlePollMessageApi } from '@/api'
import { usePollMessageProps } from '@/types'

export const usePollMessage = ({
    chatFriendData,
    conversationId,
    setChatFriendData,
    setFriendsData,
    setIsLoggedIn,
    setIsSettingsExpanded,
    setUserData,
    showToast,
}: usePollMessageProps) => {
    useEffect(() => {
        if (!conversationId || conversationId < 0) {
            return
        }

        const intervalId = setInterval(async () => {
            handlePollMessageApi({
                chatFriendData,
                conversationId,
                setChatFriendData,
                setFriendsData,
                setIsLoggedIn,
                setIsSettingsExpanded,
                setUserData,
                showToast,
            })
        }, 2000)

        return () => clearInterval(intervalId)
    }, [
        chatFriendData,
        conversationId,
        chatFriendData?.messages,
        setChatFriendData,
        setFriendsData,
        setIsLoggedIn,
        setIsSettingsExpanded,
        setUserData,
        showToast,
    ])
}
