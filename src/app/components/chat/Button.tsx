import {
    FallbackProfilePicture,
    ProfilePicture,
} from '@/app/components/settings'
import { ChatButtonProps } from '@/types'

const Button = ({ friend, id }: ChatButtonProps) => {
    return (
        <button
            className="regular-button hover:bg-zinc-900/60 active:bg-zinc-900/60"
            onClick={() => {}}
        >
            {friend.profilePicture ? (
                <span className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-linear-180 from-blue-500 to-blue-700 relative overflow-hidden">
                    <ProfilePicture
                        profilePicture={friend.profilePicture}
                        size="small"
                    />
                </span>
            ) : (
                <FallbackProfilePicture
                    id={id}
                    userName={friend.userName}
                    size="large"
                />
            )}
            <div className="flex flex-col gap-1 mb-auto items-start min-w-0 flex-1">
                <div className="text-normal truncate w-full text-left">
                    {friend.userName}
                </div>
                <div className="text-small truncate w-full text-left">
                    {friend.status}
                </div>
            </div>
        </button>
    )
}

export default Button
