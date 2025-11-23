import React, { useEffect, useState, useContext } from 'react'
import api from '../../api/axios'
import socket from '../../socket/socket'
import { AuthContext } from '../../context/AuthContext'
import AlertPopup from '../../components/AlertPopup'

export default function Dashboard(){
  const { user } = useContext(AuthContext)
  const [alerts, setAlerts] = useState([])
  const [lastAlert, setLastAlert] = useState(null)

  useEffect(()=>{
    api.get('/content/alerts').then(res => setAlerts(res.data)).catch(()=>{})
  },[])

  useEffect(()=>{
    socket.on('new-alert', (data) => {
      setLastAlert(data)
      setAlerts(prev => [data, ...prev])
    })
    return ()=> socket.off('new-alert')
  },[])

  return (
    <div className='page'>
      <h2>Welcome {user?.name || user?.username}</h2>
      <AlertPopup alert={lastAlert} />
      <h3>Past Alerts</h3>
      <ul>
        {alerts.map(a=> <li key={a._id}>{a.type}: {a.message}</li>)}
      </ul>
    </div>
  )
}
