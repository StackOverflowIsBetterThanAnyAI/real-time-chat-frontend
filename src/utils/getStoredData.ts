export const getStoredData = () => {
    if (typeof window !== 'undefined') {
        const storedData = localStorage.getItem('dieter-chat')
        return storedData ? JSON.parse(storedData) : {}
    }
}
