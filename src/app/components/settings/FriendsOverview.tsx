import {
    FriendsDetails,
    FriendsFallback,
    FriendsLoading,
    FriendsOverviewItem,
} from '@/app/components/settings'
import { SettingsFriendsOverviewProps } from '@/types'

const FriendsOverview = ({
    friends,
    isLoading,
}: SettingsFriendsOverviewProps) => {
    const friendsContent = () => {
        return isLoading ? (
            <FriendsLoading />
        ) : friends.length ? (
            <div className="px-4 py-2 text-small flex flex-col gap-4">
                {friends.map((item) => {
                    return (
                        <FriendsOverviewItem
                            key={item.id}
                            id={item.id}
                            profilePicture={item.friend.profilePicture}
                            userName={item.friend.userName}
                        />
                    )
                })}
            </div>
        ) : (
            <FriendsFallback fallback="Currently, you don&#39;t have any friends." />
        )
    }

    return (
        <FriendsDetails
            content={friendsContent()}
            summary="Friends"
            isExpanded
        />
    )
}

export default FriendsOverview
