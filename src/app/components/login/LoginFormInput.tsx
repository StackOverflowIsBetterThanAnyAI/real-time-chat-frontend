import { LoginFormInputProps } from '@/types/types'

const LoginFormInput = ({
    error,
    id,
    label,
    onInput,
    onKeyDown,
    title,
    value,
}: LoginFormInputProps) => {
    const marginBottom = error ? 'mb-1' : 'mb-5 sm:mb-6'

    return (
        <>
            <label htmlFor={id} className="text-large py-2 sm:py-1">
                {label} {<span className="text-red-800">*</span>}
            </label>
            <input
                id={id}
                className={`bg-zinc-100 outline outline-zinc-500 text-normal w-full
                ${marginBottom} rounded px-2 py-1 enabled:hover:bg-zinc-200`}
                autoComplete="username"
                maxLength={20}
                minLength={5}
                name={label.replace(/\s/g, '').toLowerCase()}
                onInput={onInput}
                onKeyDown={onKeyDown}
                placeholder="JohnDoe1337"
                required={true}
                title={title}
                type="text"
                value={value}
            />
        </>
    )
}

export default LoginFormInput
