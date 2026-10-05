import { FriendsDetails } from '@/app/components/settings'

const Friends = () => {
    return (
        <>
            <FriendsDetails
                fallback="Currently, you don&#39;t have any friends."
                summary="Friends"
            />
            <FriendsDetails
                fallback="Currently, there aren&#39;t any other users to add as friends."
                summary="Add Friend"
            />
            <FriendsDetails
                fallback="Currently, there aren&#39;t any pending friend requests."
                summary="Pending Friend Requests"
            />
        </>
    )
}

export default Friends
