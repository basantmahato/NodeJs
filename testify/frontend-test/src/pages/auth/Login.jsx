import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try{
      await login({ email, password })
      navigate('/dashboard')
    } catch(err){
      alert(err.response?.data?.message || err.message)
    }
  }

  return (
    <div className='page'>
      <h2>Login</h2>
      <form onSubmit={submit} className='form'>
        <input placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} />
        <input type='password' placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)} />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}
