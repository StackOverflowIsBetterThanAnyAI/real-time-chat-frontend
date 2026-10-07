import Image from 'next/image'
import { FallbackProfilePicture } from '@/app/components/settings'
import { SettingsFriendInfoProps } from '@/types'

const FriendInfo = ({
    id,
    profilePicture,
    userName,
}: SettingsFriendInfoProps) => {
    return (
        <span className="flex min-w-0 items-center gap-2">
            {profilePicture ? (
                <Image
                    src={`http://localhost:8000${profilePicture}`}
                    alt="profile picture"
                    height={24}
                    width={24}
                    unoptimized={true}
                    className="h-6 w-6 shrink-0 rounded-full object-cover bg-linear-180 from-blue-500 to-blue-700"
                />
            ) : (
                <FallbackProfilePicture id={id} userName={userName} />
            )}
            <div className="truncate">{userName}</div>
        </span>
    )
}

export default FriendInfo
