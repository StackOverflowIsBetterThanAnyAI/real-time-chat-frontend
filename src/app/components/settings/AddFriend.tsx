'use client'

import { useContext, useState } from 'react'
import { MdOutlineSearch } from 'react-icons/md'
import { FetchLoading } from 'fetch-loading'
import { Message } from '@/app/components/error'
import { FriendsDetails } from '@/app/components/settings'
import { handleAddFriendApi } from '@/api'
import {
    ContextFriends,
    ContextIsLoggedIn,
    ContextIsSettingsExpanded,
    useToast,
} from '@/context'
import { useErrorUserName } from '@/hooks'

const AddFriend = () => {
    const contextFriends = useContext(ContextFriends)
    if (!contextFriends) {
        throw new Error(
            'AddFriend must be used within a ContextFriends.Provider'
        )
    }
    const [, setFriendsData] = contextFriends

    const contextIsLoggedIn = useContext(ContextIsLoggedIn)
    if (!contextIsLoggedIn) {
        throw new Error(
            'AddFriend must be used within a ContextIsLoggedIn.Provider'
        )
    }
    const [, setIsLoggedIn] = contextIsLoggedIn

    const contextIsSettingsExpanded = useContext(ContextIsSettingsExpanded)
    if (!contextIsSettingsExpanded) {
        throw new Error(
            'AddFriend must be used within a ContextIsSettingsExpanded.Provider'
        )
    }
    const [, setIsSettingsExpanded] = contextIsSettingsExpanded

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
        handleAddFriendApi({
            setError,
            setFriendsData,
            setIsLoading,
            setIsLoggedIn,
            setIsSettingsExpanded,
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
                        <span className="sr-only">Search for Users</span>
                        <MdOutlineSearch
                            className="w-6 h-6"
                            aria-hidden="true"
                        />
                    </label>
                    <input
                        className="settings-menu-button bg-zinc-800 max-w-full w-fit px-4 py-1 rounded-xl"
                        value={userToBeAdded}
                        onInput={handleChange}
                        onKeyDown={handleKeyDown}
                        id="addFriend"
                        maxLength={20}
                        minLength={5}
                        title="Search for a user to add as friend."
                        type="text"
                    />
                </div>
                {isLoading ? (
                    <div
                        className={`flex items-center justify-center w-32 sm:w-40 h-6 sm:h-7 mx-auto outline outline-zinc-100 px-2 py-0.5 bg-blue-600 rounded-xl ${error ? '' : 'mb-10 sm:mb-7'}`}
                    >
                        <FetchLoading theme="#f4f4f5" />
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        <input
                            type="button"
                            className={`settings-menu-button w-32 sm:w-40 self-center bg-blue-600 disabled:bg-blue-300 rounded-xl ${error ? '' : 'mb-10 sm:mb-7'}
                            disabled:text-zinc-600 p-1 focus-visible:outline-zinc-100! enabled:hover:bg-blue-500 enabled:active:bg-blue-400`}
                            aria-label="A valid user name consists between 5 and 63 characters"
                            onClick={handleAddFriend}
                            disabled={
                                userToBeAdded.length < 5 ||
                                userToBeAdded.length > 20 ||
                                isLoading
                            }
                            title="A valid user name consists between 5 and 63 characters"
                            value="Add User"
                        />
                        <Message error={error} theme="white" />
                    </div>
                )}
            </div>
        )
    }

    return <FriendsDetails content={addFriendsContent()} summary="Add Friend" />
}

export default AddFriend
