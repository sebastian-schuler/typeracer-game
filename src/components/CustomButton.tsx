import React from 'react'

type Props = {
    text: string,
    className?: string,
    disabled?: boolean
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}
const CustomButton = ({ text, className, disabled, onClick }: Props) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`border border-themeAccent text-white font-semibold rounded 
            hover:bg-themeAccent hover:text-themeBackground ${className}
            disabled:opacity-20`}>
            {text}
        </button>
    )
}

export default CustomButton