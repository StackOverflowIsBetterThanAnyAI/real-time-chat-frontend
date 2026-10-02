import Image from 'next/image'

export type NavigationProfilePictureProps = {
    profilePicture: string | undefined
    size: 'small' | 'large'
}

const NavigationProfilePicture = ({
    profilePicture,
    size,
}: NavigationProfilePictureProps) => {
    return size === 'large' ? (
        profilePicture ? (
            <Image
                alt="profile picture"
                src={profilePicture}
                className="w-32 h-32 rounded-full outline-2 outline-zinc-100 m-2"
            />
        ) : (
            <span className="w-32 h-32 rounded-full outline-2 outline-zinc-100 bg-linear-180 from-blue-500 to-blue-700 m-2 overflow-hidden relative">
                <span
                    className="w-18 h-18 bg-blue-200 rounded-full outline-2 outline-zinc-100
                        absolute left-1/2 -bottom-4.5 -translate-x-1/2"
                ></span>
                <span
                    className="w-13 h-13 bg-blue-200 rounded-full outline-2 outline-zinc-100
                        absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/4"
                ></span>
            </span>
        )
    ) : profilePicture ? (
        <Image
            alt="profile picture"
            src={profilePicture}
            className="w-12 h-12 rounded-full outline-2"
        />
    ) : (
        <>
            <span
                className="w-7 h-7  bg-blue-200 rounded-full outline-2 outline-zinc-100
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
