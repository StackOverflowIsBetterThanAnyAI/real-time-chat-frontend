import { SendText } from '@/app/components/chat'
import {
    FallbackProfilePicture,
    ProfilePicture,
} from '@/app/components/settings'
import { ChatWindowProps } from '@/types'

const Window = ({ friend }: ChatWindowProps) => {
    return (
        <div className="bg-zinc-700 flex flex-col justify-between items-center">
            <div className="text-sm sm:text-base lg:text-lg flex gap-2 items-center px-4 py-2 bg-zinc-900/60 w-full border-b border-zinc-100">
                {friend.friend.profilePicture ? (
                    <span className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-linear-180 from-blue-500 to-blue-700 relative overflow-hidden">
                        <ProfilePicture
                            profilePicture={friend.friend.profilePicture}
                            size="small"
                        />
                    </span>
                ) : (
                    <FallbackProfilePicture
                        id={friend.id}
                        userName={friend.friend.userName}
                        size="large"
                    />
                )}
                <div className="flex flex-col gap-1 mb-auto items-start min-w-0 flex-1">
                    <div className="text-normal truncate w-full text-left">
                        {friend.friend.userName}
                    </div>
                    <div className="text-small truncate w-full text-left">
                        {friend.friend.status}
                    </div>
                </div>
            </div>
            <SendText />
        </div>
    )
}

export default Window
