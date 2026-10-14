'use client'

import { useContext } from 'react'
import { IoMdSend } from 'react-icons/io'
import { handleSendMessageApi } from '@/api'
import { ContextChatFriendData, ContextUserData } from '@/context'
import { useLogout, useToast } from '@/hooks'

const SendText = () => {
    const contextChatFriendData = useContext(ContextChatFriendData)
    if (!contextChatFriendData) {
        throw new Error(
            'SendText must be used within a ContextChatFriendData.Provider'
        )
    }
    const [chatFriendData, setChatFriendData] = contextChatFriendData

    const contextUserData = useContext(ContextUserData)
    if (!contextUserData) {
        throw new Error(
            'SendText must be used within a ContextUserData.Provider'
        )
    }
    const [userData] = contextUserData

    const { logout } = useLogout()
    const { showToast } = useToast()

    const currentMessage = chatFriendData?.draftedMessage || ''

    const handleChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.currentTarget.value
        setChatFriendData((prev) =>
            prev ? { ...prev, draftedMessage: value } : prev
        )
    }
    const handleKeyDownMessage = (
        e: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (isAnyChatFriendDataMissing) {
            return
        }
        if (e.key === 'Enter' && !e.shiftKey && currentMessage.trim().length) {
            handleSendMessage(chatFriendData.conversationId, currentMessage)
            e.preventDefault()
        }
    }
    const handleSendMessage = async (id: number, message: string) => {
        handleSendMessageApi({
            id,
            message,
            setChatFriendData,
            logout,
            showToast,
            userData,
        })
    }

    const isAnyChatFriendDataMissing =
        !chatFriendData ||
        !chatFriendData?.conversationId ||
        !chatFriendData?.direction ||
        !chatFriendData?.friend ||
        !chatFriendData?.id ||
        !chatFriendData?.messages ||
        !chatFriendData?.status

    return (
        <div className="flex w-full gap-1.5 justify-between bg-zinc-800 p-1.5">
            <textarea
                value={currentMessage}
                onChange={handleChangeMessage}
                placeholder="Your message ..."
                rows={3}
                minLength={1}
                maxLength={1023}
                className="resize-none w-full bg-zinc-700 px-4 py-2 text-base disabled:bg-zinc-500"
                disabled={
                    isAnyChatFriendDataMissing ||
                    chatFriendData.conversationId < 0
                }
                onKeyDown={handleKeyDownMessage}
            />
            <button
                className="regular-button bg-blue-600 enabled:hover:bg-blue-600/85
                enabled:active:bg-blue-600/75 h-fit self-end disabled:bg-blue-400"
                onClick={() =>
                    handleSendMessage(
                        chatFriendData?.conversationId || -1,
                        currentMessage
                    )
                }
                disabled={
                    isAnyChatFriendDataMissing ||
                    chatFriendData.conversationId < 0 ||
                    !currentMessage.trim().length
                }
            >
                <IoMdSend color="#f4f4f5" />
            </button>
        </div>
    )
}

export default SendText
