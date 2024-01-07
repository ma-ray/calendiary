import React from 'react'

type ProgressBarProps = {
  progress: number
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const roundedProgress = progress < 0 ? 0 : progress > 100 ? 100 : progress
  return (
    <div
      style={{ clipPath: `inset(0% ${100 - roundedProgress}% 0% 0%)` }}
      className="fixed bottom-0 origin-left h-2 w-full bg-gradient-to-r from-progressnight via-progressday to-progressnight"
    />
  )
}
