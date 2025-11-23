import React, { useEffect, useState } from 'react'
import api from '../../api/axios'
import UsersList from './UsersList'
import AlertsPanel from './AlertsPanel'

export default function AdminDashboard(){
  const [stats, setStats] = useState(null)

  useEffect(()=>{
    api.get('/content/admin/stats')
      .then(res=> setStats(res.data))
      .catch(err=> console.log(err))
  },[])

  return (
    <div className='page'>
      <h2>Admin Dashboard</h2>
      <pre>{JSON.stringify(stats, null, 2)}</pre>
      <UsersList />
      <AlertsPanel />
    </div>
  )
}
