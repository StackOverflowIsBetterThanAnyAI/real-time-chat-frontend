'use client'

import { useContext } from 'react'
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

    const friends =
        friendsData?.filter((item) => item.status === 'accepted') || []

    return (
        <div className="flex flex-col gap-4 bg-zinc-800/80 p-2">
            <button
                className="regular-button bg-blue-600 hover:bg-blue-600/85 active:bg-blue-600/75"
                onClick={() => {}}
            >
                <RiChatNewFill />
                <span>New Chat</span>
            </button>
            <div className="flex flex-wrap gap-2 items-center">
                <label htmlFor="search">
                    <span className="sr-only">Search</span>
                    <MdOutlineSearch className="w-8 h-8" aria-hidden="true" />
                </label>
                <input
                    className="bg-zinc-100 outline outline-zinc-500 text-zinc-950 text-normal rounded px-2 py-1
                    hover:bg-zinc-200 flex-1 min-w-32"
                    id="search"
                    type="search"
                    placeholder="Münzendieter"
                />
            </div>
            {friends.length
                ? friends.map((item) => {
                      return (
                          <Button
                              key={item.id}
                              friend={item.friend}
                              id={item.id}
                          />
                      )
                  })
                : null}
        </div>
    )
}

export default Sidebar
