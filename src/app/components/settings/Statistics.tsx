'use client'

import { useCallback, useEffect, useState } from 'react'
import { TbFlame } from 'react-icons/tb'
import { handleFetchStatisticsApi } from '@/api'
import {
    FallbackProfilePicture,
    FallbackText,
    ProfilePicture,
} from '@/app/components/settings'
import { useLogout, useToast } from '@/hooks'
import { StatisticsType } from '@/types'
import { FetchLoading } from 'fetch-loading'

const Statistics = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [userStatistics, setUserStatistics] = useState<
        StatisticsType | undefined
    >(undefined)

    const { logout } = useLogout()
    const { showToast } = useToast()

    const handleFetchStatistics = useCallback(async () => {
        await handleFetchStatisticsApi({
            logout,
            setIsLoading,
            setUserStatistics,
            showToast,
        })
    }, [logout, showToast])

    useEffect(() => {
        handleFetchStatistics()
    }, [handleFetchStatistics])

    const ratioSentReceived = () => {
        if (userStatistics) {
            const total =
                userStatistics.totalReceived + userStatistics.totalSent
            const ratioSent = parseInt(
                ((userStatistics.totalSent / total) * 100).toString()
            )
            const ratioReceived = 100 - ratioSent
            return `${ratioSent}% / ${ratioReceived}%`
        }
    }

    return userStatistics ? (
        <div className="flex flex-col gap-4 overflow-y-auto p-1">
            <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex flex-col gap-1 text-normal rounded-xl text-center outline-2 outline-zinc-500 p-1 bg-zinc-800/25">
                    <div>Messages Sent:</div>
                    <div className="mx-auto text-3xl">
                        {userStatistics.totalSent}
                    </div>
                </div>
                <div className="flex flex-col gap-1 text-normal rounded-xl text-center outline-2 outline-zinc-500 p-1 bg-zinc-800/25">
                    <div>Messages Received:</div>
                    <div className="mx-auto text-3xl">
                        {userStatistics.totalReceived}
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-1 text-normal rounded-xl text-center outline-2 outline-zinc-500 p-1 bg-zinc-800/25">
                <div>Current Chatting Streak:</div>
                <div className="text-3xl flex gap-1 justify-center items-center">
                    {userStatistics.streak}{' '}
                    {`Day${userStatistics.streak !== 1 ? 's' : ''}`}
                    <TbFlame
                        color="#f4f4f5"
                        className="h-6 sm:h-7 w-6 sm:w-7"
                    />
                </div>
            </div>
            {userStatistics?.favoriteFriend ? (
                <div className="flex flex-col gap-1 text-normal rounded-xl text-center">
                    <div className="text-large">Favorite Chat Partner:</div>
                    <div className="regular-button flex-col outline-2 outline-zinc-500 bg-zinc-800/25">
                        <div className="flex w-full gap-2">
                            {userStatistics.favoriteFriend.profilePicture ? (
                                <span className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-linear-180 from-blue-500 to-blue-700 relative overflow-hidden">
                                    <ProfilePicture
                                        profilePicture={
                                            userStatistics.favoriteFriend
                                                .profilePicture
                                        }
                                        size="small"
                                    />
                                </span>
                            ) : (
                                <FallbackProfilePicture
                                    id={0}
                                    userName={
                                        userStatistics.favoriteFriend.userName
                                    }
                                    size="large"
                                />
                            )}
                            <div className="flex flex-col gap-1 mb-auto items-start min-w-0 flex-1">
                                <div className="text-normal truncate w-full text-left">
                                    {userStatistics.favoriteFriend.userName}
                                </div>
                                <div className="text-small truncate w-full text-left">
                                    {userStatistics.favoriteFriend.status}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div>Messages exchanged</div>
                            <div className="text-3xl">
                                {userStatistics.favoriteFriend.messageCount}
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    ) : isLoading ? (
        <div className="flex justify-center items-center flex-1">
            <FetchLoading theme="#f4f4f5" />
        </div>
    ) : (
        <FallbackText fallback="Currently, there aren&#39;t any statistics available." />
    )
}

export default Statistics
