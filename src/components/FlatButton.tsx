import React from 'react'

type FlatButtonProps = {
  label: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const FlatButton: React.FC<FlatButtonProps> = ({
  label,
  className,
  ...props
}) => {
  const combinedClassName = `${className || ''} p-3 hover:bg-slate-100`

  return (
    <button className={combinedClassName} {...props}>
      <p className="font-bold">{label}</p>
    </button>
  )
}
