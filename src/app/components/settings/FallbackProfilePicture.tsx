import { SettingsFallbackProfilePictureProps } from '@/types'

const FallbackProfilePicture = ({
    id,
    userName,
}: SettingsFallbackProfilePictureProps) => {
    const fallbackClassName = [
        'from-red-500 to-red-700',
        'from-amber-500 to-amber-700',
        'from-blue-500 to-blue-700',
        'from-teal-500 to-teal-700',
        'from-green-500 to-green-700',
        'from-fuchsia-500 to-fuchsia-700',
    ]

    return (
        <span
            className={`w-6 h-6 shrink-0 flex justify-center items-center rounded-full bg-linear-180 select-none
                ${fallbackClassName[id % fallbackClassName.length]}`}
        >
            {userName.charAt(0).toUpperCase()}
        </span>
    )
}

export default FallbackProfilePicture
