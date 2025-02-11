import clsx from 'clsx'
import './LoadingSpinner.styles.scss'
import { LoadingSpinnerProps } from './LoadingSpinner.types'
import { useEffect, useState } from 'react'

function LoadingSpinner({
  className,
  text,
  show = false,
}: LoadingSpinnerProps) {
  const [internalShow, setInternalShow] = useState(show)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setInternalShow(show)
    }, 200)

    return () => {
      clearTimeout(timeout)
    }
  }, [show])

  return (
    <div
      className={clsx('LoadingSpinner', className, {
        'LoadingSpinner--show': internalShow,
      })}
    >
      <svg
        width="45"
        height="45"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
          opacity=".25"
        />
        <path
          d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
          className="LoadingSpinner_spinner"
        />
      </svg>
      {text && <span className="LoadingSpinner_text">{text}</span>}
    </div>
  )
}

export default LoadingSpinner
