import { SettingsFallbackProfilePictureProps } from '@/types'

const FallbackProfilePicture = ({
    id,
    size,
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
            className={`shrink-0 flex justify-center items-center rounded-full bg-linear-180 select-none
                ${fallbackClassName[id % fallbackClassName.length]} font-bold
                ${size === 'small' ? 'w-6 h-6 text-small' : 'w-10 sm:w-12 h-10 sm:h-12 text-2xl'}`}
        >
            {userName.charAt(0).toUpperCase()}
        </span>
    )
}

export default FallbackProfilePicture
