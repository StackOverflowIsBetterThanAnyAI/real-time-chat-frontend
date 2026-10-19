import { MdOutlineSearch } from 'react-icons/md'
import { ChatSidebarSearchProps } from '@/types'
import { setItemInSessionStorage } from '@/utils'

const SidebarSearch = ({ filter, setFilter }: ChatSidebarSearchProps) => {
    const handleFilterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const filteredText = e.currentTarget.value
        setFilter(filteredText)
        setItemInSessionStorage('filteredtext', filteredText)
    }

    return (
        <div className="flex shrink-0 flex-wrap items-center gap-2 px-2 sm:px-4">
            <label htmlFor="search">
                <span className="sr-only">Search</span>
                <MdOutlineSearch
                    className="h-8 w-8"
                    aria-hidden="true"
                    color="#f4f4f5"
                />
            </label>
            <input
                className="sidebar-button min-w-32 flex-1 rounded bg-zinc-100 px-2 py-1 text-zinc-950 outline outline-zinc-500 hover:bg-zinc-200"
                id="search"
                type="search"
                placeholder="Münzendieter"
                onChange={handleFilterInput}
                value={filter}
                title="Filter Friends"
                minLength={1}
                maxLength={63}
            />
        </div>
    )
}

export default SidebarSearch
