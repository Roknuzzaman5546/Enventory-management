import React from 'react'

const SlateButton = ({ children, className = '' }) => {
  return (
    <button className={`bg-slate-800 px-4 py-2 rounded text-white` + className}>{children}</button>
  )
}

export default SlateButton