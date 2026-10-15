import { Button } from '@/app/components/chat'
import { ChatSidebarButtonsProps } from '@/types'

const SidebarButtons = ({
    filteredFriends,
    isSidebarExpanded,
    screenWidth,
}: ChatSidebarButtonsProps) => {
    return (
        <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-0.5">
            {filteredFriends.map((item) => (
                <Button
                    key={item.id}
                    friend={item}
                    isExpanded={
                        isSidebarExpanded || screenWidth === 'NOT_MOBILE'
                    }
                />
            ))}
        </div>
    )
}

export default SidebarButtons
