'use client'

import { useContext, useRef, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { MdOutlineSearch } from 'react-icons/md'
import { RxHamburgerMenu } from 'react-icons/rx'
import { SidebarButtons, SidebarSearch } from '@/app/components/chat'
import { ContextFriends } from '@/context'
import {
    useEscapeFocusTrapSidebar,
    useFocusTrapSidebar,
    useScreenWidth,
} from '@/hooks'
import { ChatSidebarProps } from '@/types'
import { setItemInSessionStorage } from '@/utils'

const Sidebar = ({
    isSidebarExpanded,
    setIsSidebarExpanded,
}: ChatSidebarProps) => {
    const contextFriends = useContext(ContextFriends)
    if (!contextFriends) {
        throw new Error('Sidebar must be used within a ContextFriends.Provider')
    }
    const [friendsData] = contextFriends

    const screenWidth = useScreenWidth({ setIsSidebarExpanded })

    const [filter, setFilter] = useState<string>('')
    const sidebarRef = useRef<HTMLDivElement>(null)

    const friends =
        friendsData?.filter((item) => item.status === 'accepted') || []
    const filteredFriends = friends.filter((item) =>
        item.friend.userName
            .toLowerCase()
            .includes(filter.replace(/\s/g, '').toLowerCase())
    )

    const handleClickBurgerMenu = () => {
        setIsSidebarExpanded((prev) => {
            const newValue = !prev
            setItemInSessionStorage('issidebarexpanded', newValue)
            return newValue
        })
    }

    useEscapeFocusTrapSidebar({
        isSidebarExpanded,
        setIsSidebarExpanded,
        sidebarRef,
    })
    useFocusTrapSidebar({
        isActive: isSidebarExpanded && screenWidth === 'MOBILE',
    })

    return (
        <div
            className={`${isSidebarExpanded ? 'w-72 sm:w-64 md:w-80 lg:w-96' : ''} h-full bg-zinc-600 z-10`}
            ref={sidebarRef}
        >
            {screenWidth === 'MOBILE' ? (
                <div
                    className={`flex h-full min-h-0 flex-col gap-4 ${isSidebarExpanded ? 'w-72' : ''} bg-zinc-800/80 p-2 z-10`}
                >
                    <div className="flex gap-0.5 items-center">
                        <button
                            className="sidebar-button regular-button hover:bg-zinc-900/60 active:bg-zinc-900/60 ml-1.5"
                            onClick={handleClickBurgerMenu}
                            title={`${isSidebarExpanded ? 'Close' : 'Open'} Chats`}
                            aria-label={`${isSidebarExpanded ? 'Close' : 'Open'} Chats`}
                        >
                            {isSidebarExpanded ? (
                                <IoMdClose
                                    color="#f4f4f5"
                                    className="w-8 h-8"
                                />
                            ) : (
                                <RxHamburgerMenu
                                    color="#f4f4f5"
                                    className="w-8 h-8"
                                />
                            )}
                        </button>
                        {isSidebarExpanded ? (
                            <h2 className="text-xl">Chats</h2>
                        ) : null}
                    </div>
                    <div className="flex shrink-0 flex-wrap items-center gap-2 p-2">
                        {isSidebarExpanded ? (
                            <SidebarSearch
                                filter={filter}
                                setFilter={setFilter}
                            />
                        ) : (
                            <button
                                className="sidebar-button regular-button hover:bg-zinc-900/60 active:bg-zinc-900/60"
                                title="Search"
                                aria-label="Search"
                                onClick={handleClickBurgerMenu}
                            >
                                <MdOutlineSearch
                                    className="h-8 w-8"
                                    aria-hidden="true"
                                    color="#f4f4f5"
                                />
                            </button>
                        )}
                    </div>
                    <SidebarButtons
                        filteredFriends={filteredFriends}
                        isSidebarExpanded={isSidebarExpanded}
                        screenWidth={screenWidth}
                    />
                </div>
            ) : (
                <div className="flex h-full min-h-0 flex-col gap-4 bg-zinc-800/80 p-2 sm:w-64 md:w-80 lg:w-96">
                    <SidebarSearch filter={filter} setFilter={setFilter} />
                    <SidebarButtons
                        filteredFriends={filteredFriends}
                        isSidebarExpanded={isSidebarExpanded}
                        screenWidth={screenWidth}
                    />
                </div>
            )}
        </div>
    )
}

export default Sidebar
