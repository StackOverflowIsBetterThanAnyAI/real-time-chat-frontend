import { IoTriangle } from 'react-icons/io5'
import { SettingsFriendsDetailsProps } from '@/types'

const FriendsDetails = ({ fallback, summary }: SettingsFriendsDetailsProps) => {
    return (
        <details className="group open:outline-2 outline-zinc-100 rounded-xl text-normal">
            <summary className="settings-menu-button regular-button text-normal hover:bg-zinc-800/50 active:bg-zinc-800/50">
                <span className="group-open:rotate-180 rotate-90 transition-transform duration-75">
                    <IoTriangle className="w-3" />
                </span>
                {summary}
            </summary>
            <p className="px-4 py-2 text-small">{fallback}</p>
        </details>
    )
}

export default FriendsDetails
