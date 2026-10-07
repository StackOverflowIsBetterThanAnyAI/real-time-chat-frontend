'use client'

import { useState } from 'react'
import { IoTriangle } from 'react-icons/io5'
import { SettingsFriendsDetailsProps } from '@/types'

const FriendsDetails = ({
    content,
    isExpanded = false,
    summary,
}: SettingsFriendsDetailsProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(isExpanded)

    return (
        <details
            open={isOpen}
            onToggle={(e) => setIsOpen(e.currentTarget.open)}
            className="group open:outline-2 outline-zinc-500 rounded-xl text-normal"
        >
            <summary className="settings-menu-button regular-button text-normal hover:bg-zinc-800/50 active:bg-zinc-800/50">
                <span className="group-open:rotate-180 rotate-90 transition-transform duration-75">
                    <IoTriangle className="w-3" />
                </span>
                {summary}
            </summary>
            {content}
        </details>
    )
}

export default FriendsDetails
