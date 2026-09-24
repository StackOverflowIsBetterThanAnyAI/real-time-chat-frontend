import { LoginFormPasswordProps } from '@/types/types'

const LoginFormPassword = ({
    autoComplete,
    error,
    id,
    isDisabled = false,
    isPasswordHidden,
    label,
    onInput,
    onKeyDown,
    setIsPasswordHidden,
    title,
    value,
}: LoginFormPasswordProps) => {
    const marginBottom = error ? 'mb-1' : 'mb-5 sm:mb-6'

    return (
        <>
            <label htmlFor={id} className="text-large py-1">
                {label} <span className="text-red-800">*</span>
            </label>
            <div
                className={`flex gap-2 items-center bg-zinc-100 has-[input:disabled]:bg-zinc-200
                outline outline-zinc-500 has-[input:disabled]:outline-0 rounded-md p-1 pr-2 ${marginBottom}`}
            >
                <input
                    id={id}
                    className={`bg-zinc-100 disabled:bg-zinc-200 text-normal w-full px-1 rounded
                    enabled:hover:bg-zinc-200`}
                    autoComplete={autoComplete}
                    disabled={isDisabled}
                    maxLength={25}
                    minLength={8}
                    name={label.replace(/\s/g, '').toLowerCase()}
                    onInput={onInput}
                    onKeyDown={onKeyDown}
                    placeholder="password"
                    required
                    title={title}
                    type={isPasswordHidden ? 'password' : 'text'}
                    value={value}
                />
                <input
                    id={`show-${id}`}
                    className="outline outline-zinc-500 disabled:outline-0"
                    aria-checked={!isPasswordHidden}
                    aria-label={`${isDisabled ? 'Currently disabled. ' : ''}${
                        isPasswordHidden ? 'Show' : 'Hide'
                    } password.`}
                    checked={!isPasswordHidden}
                    disabled={isDisabled}
                    onChange={() => {
                        setIsPasswordHidden((prev) => !prev)
                    }}
                    title={`${isDisabled ? 'Currently disabled. ' : ''}${
                        isPasswordHidden ? 'Show' : 'Hide'
                    } password.`}
                    type="checkbox"
                />
            </div>
        </>
    )
}

export default LoginFormPassword
