'use client'

import { useContext, useState } from 'react'
import { MdOutlineSearch } from 'react-icons/md'
import { RiChatNewFill } from 'react-icons/ri'
import { Button } from '@/app/components/chat'
import { ContextFriends } from '@/context'

const Sidebar = () => {
    const contextFriends = useContext(ContextFriends)
    if (!contextFriends) {
        throw new Error('Sidebar must be used within a ContextFriends.Provider')
    }
    const [friendsData] = contextFriends

    const [filter, setFilter] = useState<string>('')
    const friends =
        friendsData?.filter((item) => item.status === 'accepted') || []
    const filteredFriends = friends.filter((item) =>
        item.friend.userName
            .toLowerCase()
            .includes(filter.replace(/\s/g, '').toLowerCase())
    )

    const handleFilterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.currentTarget.value)
    }

    return (
        <div className="flex h-full min-h-0 flex-col gap-4 bg-zinc-800/80 p-2">
            <button
                className="regular-button shrink-0 bg-blue-600 hover:bg-blue-600/85 active:bg-blue-600/75"
                onClick={() => {}}
            >
                <RiChatNewFill color="#f4f4f5" />
                <span>New Chat</span>
            </button>
            <div className="flex shrink-0 flex-wrap items-center gap-2">
                <label htmlFor="search">
                    <span className="sr-only">Search</span>
                    <MdOutlineSearch
                        className="h-8 w-8"
                        aria-hidden="true"
                        color="#f4f4f5"
                    />
                </label>
                <input
                    className="min-w-32 flex-1 rounded bg-zinc-100 px-2 py-1 text-zinc-950 outline outline-zinc-500 hover:bg-zinc-200"
                    id="search"
                    type="search"
                    placeholder="Münzendieter"
                    onChange={handleFilterInput}
                    value={filter}
                    title="Filter Friends"
                />
            </div>
            <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-0.5">
                {filteredFriends.map((item) => (
                    <Button key={item.id} friend={item} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar
