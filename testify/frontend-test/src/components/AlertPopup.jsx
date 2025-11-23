import React from 'react'

export default function AlertPopup({alert}){
  if(!alert) return null
  return (
    <div className='alert'>
      <strong>{alert.type}</strong>: {alert.message}
    </div>
  )
}
