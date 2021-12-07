import {Link} from 'react-router-dom'
import '../componentStyles/NavBarStyles.css'

export default function NavBar({loggedIn, setLoggedIn, logOut}) {

  const linkStyle = {textDecoration: 'none'}

  return (
      <div className="nav-container">
        <h1>Game On</h1>
        <ul>
          <Link to="/" style={linkStyle}><li>Home</li></Link>

          {!loggedIn ? <Link to="/login" style={linkStyle}><li>Log In</li></Link> 
          : <Link to="/" style={linkStyle}><li onClick={logOut}>Log Out</li></Link>}
        </ul>
    </div>
  )
}