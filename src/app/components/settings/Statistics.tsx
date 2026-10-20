'use client'

import { useCallback, useEffect, useState } from 'react'
import { TbFlame } from 'react-icons/tb'
import { handleFetchStatisticsApi } from '@/api'
import {
    FallbackProfilePicture,
    FallbackText,
    ProfilePicture,
    StatisticsChart,
} from '@/app/components/settings'
import { useLoadStatisticsStorageValues, useLogout, useToast } from '@/hooks'
import { StatisticsType } from '@/types'
import { FetchLoading } from 'fetch-loading'

const Statistics = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [userStatistics, setUserStatistics] = useState<
        StatisticsType | undefined
    >(undefined)

    const { logout } = useLogout()
    const { showToast } = useToast()

    useLoadStatisticsStorageValues({ setUserStatistics })

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

    return userStatistics ? (
        <div className="flex flex-col gap-4 overflow-y-auto p-1">
            <div className="grid grid-cols-2 gap-4 w-full">
                <div
                    className="flex flex-col justify-center gap-1 text-normal rounded-xl text-center
                    outline-2 outline-zinc-500 p-1 bg-zinc-800/25"
                >
                    <div>Messages Sent:</div>
                    <div className="mx-auto text-extralarge">
                        {userStatistics.totalSent}
                    </div>
                </div>
                <div
                    className="flex flex-col justify-center gap-1 text-normal rounded-xl text-center
                    outline-2 outline-zinc-500 p-1 bg-zinc-800/25"
                >
                    <div>Messages Received:</div>
                    <div className="mx-auto text-extralarge">
                        {userStatistics.totalReceived}
                    </div>
                </div>
            </div>
            <div
                className="flex flex-col justify-center gap-1 text-normal rounded-xl text-center
                outline-2 outline-zinc-500 p-1 bg-zinc-800/25"
            >
                <div>Current Chatting Streak:</div>
                <div className="text-extralarge flex gap-1 justify-center items-center">
                    {userStatistics.streak}{' '}
                    {`Day${userStatistics.streak !== 1 ? 's' : ''}`}
                    {userStatistics.streak ? (
                        <TbFlame
                            color="#f4f4f5"
                            className="h-6 sm:h-7 w-6 sm:w-7"
                        />
                    ) : null}
                </div>
            </div>
            {userStatistics?.favoriteFriend ? (
                <div className="flex flex-col gap-1 text-normal rounded-xl text-center">
                    <h3 className="text-large">Favorite Chat Partner:</h3>
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
                        <hr className="my-1 w-full border-zinc-500" />
                        <div className="flex flex-col">
                            <div>Messages exchanged</div>
                            <div className="text-extralarge">
                                {userStatistics.favoriteFriend.messageCount}
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
            {userStatistics.timeline.length > 1 ? (
                <StatisticsChart timeline={userStatistics.timeline} />
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
