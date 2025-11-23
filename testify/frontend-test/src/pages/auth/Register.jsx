import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { register } = useContext(AuthContext)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try{
      await register({ name, email, password })
      navigate('/dashboard')
    } catch(err){
      alert(err.response?.data?.message || err.message)
    }
  }

  return (
    <div className='page'>
      <h2>Register</h2>
      <form onSubmit={submit} className='form'>
        <input placeholder='Name' value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} />
        <input type='password' placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)} />
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}
