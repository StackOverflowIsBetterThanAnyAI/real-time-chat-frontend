import Image from 'next/image'
import { useContext } from 'react'
import { FaUserFriends } from 'react-icons/fa'
import { IoStatsChart } from 'react-icons/io5'
import { IoMdClose } from 'react-icons/io'
import { MdModeEdit } from 'react-icons/md'
import { MdDeleteForever } from 'react-icons/md'
import { MdLogout } from 'react-icons/md'
import NavigationSettingsButton from '@/app/components/navigation/NavigationSettingsButton'
import { ContextIsLoggedIn } from '@/context/ContexIsLoggedIn'
import { ContextIsSettingsExpanded } from '@/context/ContextIsSettingsExpanded'
import profile_picure from '@/assets/profile_picture.jpg'
import { useFocusTrapNavigationSettings } from '@/hooks/useFocusTrapNavigationSettings'
import userMockData from '@/mock/userMockData.json'
import { handleLogout } from '@/utils/handleLogout'
import { setItemInSessionStorage } from '@/utils/setItemInSessionStorage'

const NavigationSettings = () => {
    const contextIsLoggedIn = useContext(ContextIsLoggedIn)
    if (!contextIsLoggedIn) {
        throw new Error(
            'NavigationSettings must be used within a ContextIsLoggedIn.Provider'
        )
    }
    const [isLoggedIn, setIsLoggedIn] = contextIsLoggedIn

    const contextIsSettingsExpanded = useContext(ContextIsSettingsExpanded)
    if (!contextIsSettingsExpanded) {
        throw new Error(
            'NavigationSettings must be used within a ContextIsSettingsExpanded.Provider'
        )
    }
    const [isSettingsExpanded, setIsSettingsExpanded] =
        contextIsSettingsExpanded

    useFocusTrapNavigationSettings()

    const handleToggleIsSettingsExpanded = () => {
        setIsSettingsExpanded(() => {
            const nextVal = !isSettingsExpanded
            setItemInSessionStorage('issettingsexpanded', nextVal)
            return nextVal
        })
    }

    return (
        <aside className="flex flex-col gap-2 absolute max-w-96 w-full top-16 right-0 bottom-4 bg-zinc-700 p-4 border-2 border-zinc-800 rounded-b-xl overflow-y-auto">
            <NavigationSettingsButton
                handleClick={handleToggleIsSettingsExpanded}
                label="Close"
                icon={<IoMdClose />}
            />
            <div className="flex flex-col justify-center items-center mx-auto">
                <Image
                    alt="profile picture"
                    src={profile_picure}
                    className="w-32 h-32 rounded-full outline-2 outline-zinc-100 m-2"
                />
                <h2 className="text-center text-large">
                    @{userMockData[0].username}
                </h2>
                <div className="triangle mx-auto h-0 w-0"></div>
                <h3 className="text-normal bg-zinc-800 w-fit px-4 py-1 rounded-xl mx-auto">
                    {userMockData[0].status}
                </h3>
            </div>
            <hr className="my-2 border-zinc-100" />
            <div className="flex flex-col gap-2 justify-between h-full">
                <div className="flex flex-col gap-2">
                    <NavigationSettingsButton
                        handleClick={() => {}}
                        label="Edit Status"
                        icon={<MdModeEdit />}
                    />
                    <NavigationSettingsButton
                        handleClick={() => {}}
                        label="Friends"
                        icon={<FaUserFriends />}
                    />
                    <NavigationSettingsButton
                        handleClick={() => {}}
                        label="Statistics"
                        icon={<IoStatsChart />}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <NavigationSettingsButton
                        handleClick={() =>
                            handleLogout({
                                setIsLoggedIn,
                                setIsSettingsExpanded,
                            })
                        }
                        label="Logout"
                        icon={<MdLogout />}
                        isDelete
                    />
                    <NavigationSettingsButton
                        handleClick={() => {}}
                        label="Delete Account"
                        icon={<MdDeleteForever />}
                        isDelete
                    />
                </div>
            </div>
        </aside>
    )
}

export default NavigationSettings
