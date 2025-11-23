import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Navbar(){
  const { user, logout } = useContext(AuthContext)
  return (
    <nav className='nav'>
      <div className='nav-left'>
        <Link to='/'>Testify</Link>
      </div>
      <div className='nav-right'>
        {user ? (
          <>
            <Link to='/dashboard'>Dashboard</Link>
            {user.role === 'admin' && <Link to='/admin'>Admin</Link>}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}
