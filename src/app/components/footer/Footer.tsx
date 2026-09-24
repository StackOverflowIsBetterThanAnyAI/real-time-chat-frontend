const Footer = () => {
    const date = new Date()
    const year = date.getFullYear()

    return (
        <footer className="flex flex-wrap items-center justify-center gap-y-2 bg-zinc-600 w-full text-center text-small py-3 px-4 mb-2 mt-auto">
            <span aria-hidden="true">
                Copyright &#169; {year} Michael Münzenhofer. All Rights
                Reserved.
            </span>
            <span className="sr-only">{`Copyright ${year} Michael Münzenhofer. All Rights Reserved.`}</span>
            <a
                href="https://github.com/StackOverflowIsBetterThanAnyAI/real-time-chat"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository (opens in new tab)"
                title="GitHub Repository (opens in new tab)"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    height={12}
                    fill="currentColor"
                    className="text-zinc-100"
                    aria-hidden="true"
                    focusable="false"
                >
                    <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
                </svg>
                <span>GitHub Repository</span>
            </a>
        </footer>
    )
}

export default Footer
