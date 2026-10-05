import { FetchLoading } from 'fetch-loading'
import { ProfilePicture } from '@/app/components/settings'
import { SettingsProfileProps } from '@/types'

const Profile = ({
    handleFileChange,
    isLoading,
    profilePicture,
    userName,
}: SettingsProfileProps) => {
    return (
        <>
            <label
                htmlFor="uploadProfilePicture"
                title="Upload a new profile picture"
                className="w-32 h-32 rounded-full outline-2 outline-zinc-100 bg-linear-180 from-blue-500 to-blue-700
                        relative overflow-hidden focus-within:outline-4 hover:cursor-pointer"
            >
                <input
                    type="file"
                    id="uploadProfilePicture"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleFileChange}
                    className="settings-menu-button w-full h-full sr-only"
                />
                {isLoading ? (
                    <span className="flex justify-center items-center h-full">
                        <FetchLoading theme="#f4f4f5" />
                    </span>
                ) : (
                    <ProfilePicture
                        profilePicture={profilePicture}
                        size="large"
                    />
                )}
            </label>
            <h2 className="text-center text-large">@{userName}</h2>
        </>
    )
}

export default Profile
