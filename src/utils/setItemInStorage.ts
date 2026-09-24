export const setItemInStorage = (key: string, value: unknown) => {
    if (typeof window !== 'undefined') {
        const storage = localStorage.getItem('dieter-chat')
        const parsedTracker = storage ? JSON.parse(storage) : {}

        parsedTracker[key] = value
        localStorage.setItem('dieter-chat', JSON.stringify(parsedTracker))
    }
}
