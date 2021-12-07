import {Link} from 'react-router-dom'
import '../componentStyles/NavBarStyles.css'

export default function NavBar({loggedIn, setLoggedIn, logOut, user}) {

  const linkStyle = {textDecoration: 'none'}

  return (
      <div className="nav-container">
        <h1 className="game-on">Game On</h1>
        <ul>

          {!user ? 
          <>
            <Link to="/" style={linkStyle}><li>Home</li></Link>
            <Link to="/login" style={linkStyle}><li>Log In</li></Link> 
          </>
          : 
          <>
            <Link to="/home" style={linkStyle}><li>Home</li></Link>
            <Link to="/profile" style={linkStyle}><li>Profile</li></Link>
            <Link to="/" style={linkStyle}><li onClick={logOut}>Log Out</li></Link>
          </>}
        </ul>
    </div>
  )
}