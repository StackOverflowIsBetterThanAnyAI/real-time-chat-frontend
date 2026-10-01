import Image from 'next/image'
import { useContext, useState } from 'react'
import { FaUserFriends } from 'react-icons/fa'
import { IoStatsChart } from 'react-icons/io5'
import { IoMdClose } from 'react-icons/io'
import { MdModeEdit } from 'react-icons/md'
import { MdDeleteForever } from 'react-icons/md'
import { MdLogout } from 'react-icons/md'
import NavigationSettingsButton from '@/app/components/navigation/NavigationSettingsButton'
import NavigationSettingsStatus from '@/app/components/navigation/NavigationSettingsStatus'
import { ContextIsLoggedIn } from '@/context/ContexIsLoggedIn'
import { ContextIsSettingsExpanded } from '@/context/ContextIsSettingsExpanded'
import { ContextUserData } from '@/context/ContextUserData'
import { useEscapeFocusTrapNavigationSettings } from '@/hooks/useEscapeFocusTrapNavigationSettings'
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

    const contextUserData = useContext(ContextUserData)
    if (!contextUserData) {
        throw new Error(
            'NavigationSettings must be used within a ContextUserData.Provider'
        )
    }
    const [userData, setUserData] = contextUserData

    const [status, setStatus] = useState<string>('')
    const [isEditingStatus, setIsEditingStatus] = useState<boolean>(false)

    const currentStatus = userData?.status || userMockData.status

    useEscapeFocusTrapNavigationSettings({
        isEditingStatus,
        setIsSettingsExpanded,
    })
    useFocusTrapNavigationSettings()

    const handleIsEditingStatus = () => {
        setIsEditingStatus(true)
        setStatus(currentStatus)
    }
    const handleToggleIsSettingsExpanded = () => {
        setIsSettingsExpanded(() => {
            const nextVal = !isSettingsExpanded
            setItemInSessionStorage('issettingsexpanded', nextVal)
            return nextVal
        })
    }

    return (
        <aside className="flex flex-col gap-2 absolute max-w-96 w-full top-18 right-0 bottom-4 bg-zinc-700 p-4 border-2 border-zinc-800 rounded-b-xl overflow-y-auto">
            <NavigationSettingsButton
                handleClick={handleToggleIsSettingsExpanded}
                label="Close"
                icon={<IoMdClose />}
            />
            <div className="flex flex-col justify-center items-center mx-auto">
                {userData?.profilePicture ? (
                    <Image
                        alt="profile picture"
                        src={userData.profilePicture}
                        className="w-32 h-32 rounded-full outline-2 outline-zinc-100 m-2"
                    />
                ) : (
                    <span className="w-32 h-32 rounded-full outline-2 outline-zinc-100 bg-linear-180 from-blue-500 to-blue-700 m-2 overflow-hidden relative">
                        <span
                            className="w-18 h-18 bg-blue-200 rounded-full outline-2 outline-zinc-100
                            absolute left-1/2 -bottom-4.5 -translate-x-1/2"
                        ></span>
                        <span
                            className="w-13 h-13 bg-blue-200 rounded-full outline-2 outline-zinc-100
                            absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/4"
                        ></span>
                    </span>
                )}
                <h2 className="text-center text-large">
                    @{userData?.userName || userMockData.userName}
                </h2>
                <div className="triangle mx-auto h-0 w-0"></div>
                <NavigationSettingsStatus
                    currentStatus={currentStatus}
                    handleIsEditingStatus={handleIsEditingStatus}
                    isEditingStatus={isEditingStatus}
                    setIsEditingStatus={setIsEditingStatus}
                    setStatus={setStatus}
                    setUserData={setUserData}
                    status={status}
                    userData={userData}
                />
            </div>
            <hr className="my-2 border-zinc-100" />
            <div className="flex flex-col gap-2 justify-between h-full">
                <div className="flex flex-col gap-2">
                    <NavigationSettingsButton
                        handleClick={handleIsEditingStatus}
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
