import React, { useState } from 'react'
import api from '../../api/axios'

export default function AlertsPanel(){
  const [message, setMessage] = useState('')
  const [type, setType] = useState('info')

  const sendAlert = async (e) => {
    e.preventDefault()
    try{
      await api.post('/content/alerts', { message, type })
      setMessage('')
      alert('Alert sent')
    }catch(err){ alert('Failed') }
  }

  return (
    <div>
      <h3>Create Alert</h3>
      <form onSubmit={sendAlert}>
        <input value={message} onChange={e=>setMessage(e.target.value)} placeholder='Message' />
        <select value={type} onChange={e=>setType(e.target.value)}>
          <option value='info'>info</option>
          <option value='warning'>warning</option>
          <option value='urgent'>urgent</option>
        </select>
        <button type='submit'>Send</button>
      </form>
    </div>
  )
}
