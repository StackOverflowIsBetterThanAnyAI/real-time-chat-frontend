'use client'

import LoginForm from '@/app/components/login/LoginForm'

const Login = () => {
    return (
        <main className="flex justify-center w-full bg-zinc-300 text-zinc-950 lg:rounded-b-lg p-3 sm:p-4 lg:p-6">
            <div className="w-96 flex flex-col justify-center">
                <LoginForm />
            </div>
        </main>
    )
}

export default Login
