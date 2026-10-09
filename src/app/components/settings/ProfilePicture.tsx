import Image from 'next/image'
import { SettingsProfilePictureProps } from '@/types'

const ProfilePicture = ({
    profilePicture,
    size,
}: SettingsProfilePictureProps) => {
    return size === 'large' ? (
        profilePicture ? (
            <Image
                alt="profile picture"
                src={`http://localhost:8000${profilePicture}`}
                height={128}
                width={128}
                unoptimized={true}
                className="w-28 sm:w-32 h-28 sm:h-32 rounded-full outline-2 outline-zinc-100 object-cover"
                loading="lazy"
            />
        ) : (
            <>
                <span
                    className="w-16 sm:w-18 h-16 sm:h-18 bg-blue-200 rounded-full outline-2 outline-zinc-100
                        absolute left-1/2 -bottom-4.5 -translate-x-1/2"
                ></span>
                <span
                    className="w-11 sm:w-13 h-11 sm:h-13 bg-blue-200 rounded-full outline-2 outline-zinc-100
                        absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/4"
                ></span>
            </>
        )
    ) : profilePicture ? (
        <Image
            alt="profile picture"
            src={`http://localhost:8000${profilePicture}`}
            height={48}
            width={48}
            unoptimized={true}
            className="w-10 sm:w-12 h-10 sm:h-12 rounded-full outline-2 object-cover"
            loading="lazy"
        />
    ) : (
        <>
            <span
                className="w-6 sm:w-7 h-6 sm:h-7 bg-blue-200 rounded-full outline-2 outline-zinc-100
                    absolute left-1/2 -bottom-2 -translate-x-1/2"
            ></span>
            <span
                className="w-3.5 sm:w-4.5 h-3.5 sm:h-4.5 bg-blue-200 rounded-full outline-2 outline-zinc-100
                    absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/4"
            ></span>
        </>
    )
}

export default ProfilePicture
