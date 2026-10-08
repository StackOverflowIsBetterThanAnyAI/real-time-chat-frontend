import {
    FriendsDetails,
    FriendsFallback,
    FriendsLoading,
    PendingFriendsItemReceived,
    PendingFriendsItemSent,
} from '@/app/components/settings'
import { FriendType, SettingsPendingFriendsProps } from '@/types'

const PendingFriends = ({
    isLoading,
    pendingFriends,
}: SettingsPendingFriendsProps) => {
    const { pendingFriendsSent, pendingFriendsReceived } =
        pendingFriends.reduce<{
            pendingFriendsSent: FriendType[]
            pendingFriendsReceived: FriendType[]
        }>(
            (acc, item) => {
                if (item.direction === 'sent') {
                    acc.pendingFriendsSent.push(item)
                } else {
                    acc.pendingFriendsReceived.push(item)
                }
                return acc
            },
            {
                pendingFriendsSent: [],
                pendingFriendsReceived: [],
            }
        )

    const pendingFriendsContent = () => {
        return isLoading && !pendingFriends.length ? (
            <FriendsLoading />
        ) : pendingFriends.length ? (
            <div className="px-4 py-2 text-small flex flex-col gap-4">
                {pendingFriendsSent.length ? (
                    <>
                        <div className="flex flex-col gap-3">
                            <h3 className="text-normal">
                                Sent Friend Requests
                            </h3>
                            {pendingFriendsSent.map((item) => {
                                return (
                                    <PendingFriendsItemSent
                                        key={item.id}
                                        id={item.id}
                                        profilePicture={
                                            item.friend.profilePicture
                                        }
                                        userName={item.friend.userName}
                                    />
                                )
                            })}
                        </div>
                    </>
                ) : null}
                {pendingFriendsReceived.length ? (
                    <>
                        <div className="flex flex-col gap-3">
                            <h3 className="text-normal">
                                Received Friend Requests
                            </h3>
                            {pendingFriendsReceived.map((item) => {
                                return (
                                    <PendingFriendsItemReceived
                                        key={item.id}
                                        id={item.id}
                                        profilePicture={
                                            item.friend.profilePicture
                                        }
                                        userName={item.friend.userName}
                                    />
                                )
                            })}
                        </div>
                    </>
                ) : null}
            </div>
        ) : (
            <FriendsFallback fallback="Currently, you don&#39;t have any pending friend requests." />
        )
    }

    return (
        <FriendsDetails
            content={pendingFriendsContent()}
            summary="Pending Friend Requests"
        />
    )
}

export default PendingFriends
