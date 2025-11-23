import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Blogs from './pages/public/Blogs'
import Dashboard from './pages/user/Dashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminLogin from './pages/admin/AdminLogin'
import PrivateRoute from './routes/PrivateRoute'
import AdminRoute from './routes/AdminRoute'
import Navbar from './components/Navbar'

export default function App(){
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Blogs />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
          <Route path='/admin-login' element={<AdminLogin />} />

        <Route path='/dashboard' element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />

        <Route path='/admin' element={
          <AdminRoute><AdminDashboard /></AdminRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}
