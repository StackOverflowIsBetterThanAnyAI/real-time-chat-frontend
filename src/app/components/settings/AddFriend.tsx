'use client'

import { useContext, useState } from 'react'
import { MdOutlineSearch } from 'react-icons/md'
import { FetchLoading } from 'fetch-loading'
import { handleAddFriendApi } from '@/api'
import { Message } from '@/app/components/error'
import { FriendsDetails } from '@/app/components/settings'
import { ContextFriends } from '@/context'
import { useErrorUserName, useLogout, useToast } from '@/hooks'
import { SettingsAddFriendProps } from '@/types'

const AddFriend = ({ isExpanded, setIsExpanded }: SettingsAddFriendProps) => {
    const contextFriends = useContext(ContextFriends)
    if (!contextFriends) {
        throw new Error(
            'AddFriend must be used within a ContextFriends.Provider'
        )
    }
    const [, setFriendsData] = contextFriends

    const { logout } = useLogout()
    const { showToast } = useToast()

    const [error, setError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [userToBeAdded, setUserToBeAdded] = useState<string>('')

    useErrorUserName({ setErrorUserName: setError, userName: userToBeAdded })

    const handleChange = (e: React.InputEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value
        setUserToBeAdded(newValue)
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddFriend()
        }
    }
    const handleAddFriend = async () => {
        await handleAddFriendApi({
            setError,
            setFriendsData,
            setIsLoading,
            logout,
            setUserToBeAdded,
            showToast,
            userToBeAdded,
        })
    }

    const addFriendsContent = () => {
        return (
            <div className="px-4 py-2 text-small flex flex-col gap-4">
                <div className="flex gap-1 items-center">
                    <label htmlFor="addFriend">
                        <span className="sr-only">User name to add</span>
                        <MdOutlineSearch
                            className="w-6 h-6"
                            aria-hidden="true"
                            color="#f4f4f5"
                        />
                    </label>
                    <input
                        className="settings-menu-button bg-zinc-800 max-w-full w-fit px-4 py-1 rounded-xl"
                        value={userToBeAdded}
                        onInput={handleChange}
                        onKeyDown={handleKeyDown}
                        id="addFriend"
                        aria-describedby="addFriendHint addFriendError"
                        aria-invalid={!!error}
                        maxLength={20}
                        minLength={5}
                        title="Search for a user to add as friend."
                        type="text"
                        disabled={isLoading}
                    />
                </div>
                <span id="addFriendHint" className="sr-only">
                    A valid user name contains between 5 and 20 Latin letters or
                    numbers.
                </span>
                {isLoading ? (
                    <div
                        className={`flex items-center justify-center w-32 sm:w-40 h-6 sm:h-7 mx-auto outline outline-zinc-100
                        px-2 py-0.5 bg-blue-600 rounded-xl cursor-not-allowed ${error ? '' : 'mb-6 sm:mb-7'}`}
                    >
                        <span className="sr-only">Adding user</span>
                        <FetchLoading theme="#f4f4f5" />
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        <input
                            type="button"
                            className={`settings-menu-button w-32 sm:w-40 self-center bg-blue-600 disabled:bg-blue-300 rounded-xl ${error ? '' : 'mb-10 sm:mb-7'}
                            disabled:text-zinc-600 p-1 focus-visible:outline-zinc-100! enabled:hover:bg-blue-500 enabled:active:bg-blue-400`}
                            onClick={handleAddFriend}
                            disabled={
                                userToBeAdded.length < 5 ||
                                userToBeAdded.length > 20 ||
                                isLoading
                            }
                            title="A valid user name contains between 5 and 20 characters"
                            value="Add User"
                        />
                        <Message
                            error={error}
                            id="addFriendError"
                            theme="white"
                        />
                    </div>
                )}
            </div>
        )
    }

    return (
        <FriendsDetails
            content={addFriendsContent()}
            summary="Add Friend"
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
        />
    )
}

export default AddFriend
