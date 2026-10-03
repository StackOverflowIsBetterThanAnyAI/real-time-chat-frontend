import { NavigationProfilePictureProps } from '@/types/types'

const NavigationProfilePicture = ({
    profilePicture,
    size,
}: NavigationProfilePictureProps) => {
    return size === 'large' ? (
        profilePicture ? (
            <img
                alt="profile picture"
                src={`http://localhost:8000${profilePicture}`}
                height={128}
                width={128}
                className="w-32 h-32 rounded-full outline-2 outline-zinc-100 object-cover"
            />
        ) : (
            <>
                <span
                    className="w-18 h-18 bg-blue-200 rounded-full outline-2 outline-zinc-100
                        absolute left-1/2 -bottom-4.5 -translate-x-1/2"
                ></span>
                <span
                    className="w-13 h-13 bg-blue-200 rounded-full outline-2 outline-zinc-100
                        absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/4"
                ></span>
            </>
        )
    ) : profilePicture ? (
        <img
            alt="profile picture"
            src={`http://localhost:8000${profilePicture}`}
            height={48}
            width={48}
            className="w-12 h-12 rounded-full outline-2 object-cover"
        />
    ) : (
        <>
            <span
                className="w-7 h-7 bg-blue-200 rounded-full outline-2 outline-zinc-100
                    absolute left-1/2 -bottom-2 -translate-x-1/2"
            ></span>
            <span
                className="w-4.5 h-4.5 bg-blue-200 rounded-full outline-2 outline-zinc-100
                    absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/4"
            ></span>
        </>
    )
}

export default NavigationProfilePicture
