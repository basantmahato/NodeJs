import React, { createContext, useState, useEffect } from 'react'
import api from '../api/axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const login = async (formData) => {
    const res = await api.post('/auth/login', formData)
    localStorage.setItem('token', res.data.token)
    setUser(res.data.user)
    return res
  }

  const register = async (formData) => {
    const res = await api.post('/auth/register', formData)
    localStorage.setItem('token', res.data.token)
    setUser(res.data.data || res.data.user)
    return res
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token){ setLoading(false); return }
    api.get('/user/dashboard')
      .then(res => setUser(res.data.user || res.data))
      .catch(() => logout())
      .finally(()=>setLoading(false))
  }, [])

  return (
    <AuthContext.Provider value={{user, loading, login, register, logout}}>
      {children}
    </AuthContext.Provider>
  )
}
