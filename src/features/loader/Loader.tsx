import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getIsLoading } from './slice'

export const Loader: React.FC = () => {
  const isLoading = useSelector(getIsLoading)
  const [styles, setStyles] = useState({})
  useEffect(() => {
    if (isLoading) {
      setStyles({ opacity: 1 })
    } else {
      setStyles({})
    }
  }, [isLoading])
  return (
    <div className="global-loader" style={{ ...styles }}>
      <span>loading ...</span>
    </div>
  )
}
