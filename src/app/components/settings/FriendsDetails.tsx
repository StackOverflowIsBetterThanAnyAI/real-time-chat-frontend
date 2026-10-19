'use client'

import { IoTriangle } from 'react-icons/io5'
import { SettingsFriendsDetailsProps } from '@/types'

const FriendsDetails = ({
    content,
    isExpanded,
    setIsExpanded,
    summary,
}: SettingsFriendsDetailsProps) => {
    return (
        <details
            open={isExpanded}
            onToggle={(e) => setIsExpanded(e.currentTarget.open)}
            className="group open:outline-2 outline-zinc-500 rounded-xl text-normal"
        >
            <summary className="settings-menu-button regular-button text-normal hover:bg-zinc-800/50 active:bg-zinc-800/50">
                <span className="group-open:rotate-180 rotate-90 transition-transform duration-75">
                    <IoTriangle className="w-3" color="#f4f4f5" />
                </span>
                {summary}
            </summary>
            {content}
        </details>
    )
}

export default FriendsDetails
