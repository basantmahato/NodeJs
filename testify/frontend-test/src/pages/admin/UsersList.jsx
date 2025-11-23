import React, { useEffect, useState } from 'react'
import api from '../../api/axios'

export default function UsersList(){
  const [users, setUsers] = useState([])

  useEffect(()=>{
    api.get('/admin/all-users').then(res => setUsers(res.data.users)).catch(()=>{})
  },[])

  return (
    <div>
      <h3>Users</h3>
      <ul>
        {users.map(u=> <li key={u._id}>{u.name} ({u.email})</li>)}
      </ul>
    </div>
  )
}
