import React from 'react'

type FlatButtonProps = {
  label: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const FlatButton: React.FC<FlatButtonProps> = ({
  label,
  className,
  disabled,
  ...props
}) => {
  const combinedClassName = `${className || ''} p-3 hover:bg-slate-100`

  return (
    <button className={combinedClassName} disabled={disabled} {...props}>
      <p className={`${disabled ? 'text-gray-400' : ''} font-bold`}>{label}</p>
    </button>
  )
}
