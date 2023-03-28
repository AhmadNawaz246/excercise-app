import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="container" style={{backgroundColor:"skyblue"}}>
        <Link to="/">
          <h1 style={{fontStyle:"italic",color:"white"}}>FitOn 
          <span style={{fontWeight:"normal",fontSize:"50%",color:"white"}}>&nbsp;Your Health Partner!</span>
          </h1>
           
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick} style={{color:"black", fontWeight:"bold",border:"1px solid black"}}>Log Out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login" style={{fontWeight:"bold"}}>Login</Link>
              <Link to="/signup" style={{fontWeight:"bold"}}>Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar