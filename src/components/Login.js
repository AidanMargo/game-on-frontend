import {useState} from 'react'
import '../componentStyles/LoginStyles.css'
import { useNavigate } from 'react-router-dom'

export default function Login({setUser}) {

// Fetches

// States
  const [loginData, setLogInData] = useState({
    email: '',
    password: ''
  })

  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })


  // Handlers
  const handleLogInData = (e) => {
    setLogInData({...loginData, [e.target.name]:e.target.value})
  }

  const handleSignUpData = (e) => {
    setSignUpData({...signUpData, [e.target.name]:e.target.value})
  }

  // Submit Login or Sign up
  const navigate = useNavigate()

  const login = (e, loginData) => {
    const {email, password} = loginData
    e.preventDefault()
    
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(resp => resp.json())
    .then(data => setUser(data))
    .then(navigate('/home'))
  }


  const signUp = (e, signUpData) => {
    const {name, email, password, passwordConfirmation} = signUpData
    e.preventDefault()

    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation
      })
    })
    .then(resp => resp.json())
    .then(data => setUser(data))
    .then(() => navigate('/home'))
    
    
  }


  return (
    <div className="display-grid">
      <img  alt= "volleyball game" src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1307&q=80"/>
      <div className="form-container">
        <div className="credentials">
          <form className="login-form" onSubmit={(e) => login(e, loginData)}>
            <label>Email: </label>
            <input
              type='text'
              className='input-field'
              name= 'email'
              required='required'
              value={loginData.email}
              placeholder='Email'
              onChange={(e) => handleLogInData(e)}></input>
            <label>Password: </label>
            <input
              type='text'
              name='password'
              required='required'
              className='input-field'
              value={loginData.password}
              placeholder='Password'
              onChange={(e) => handleLogInData(e)}></input>
              <button>Log In</button>
          </form>
        </div>
          <div className="credentials">
            <form onSubmit={(e) => signUp(e, signUpData)} className='login-form'>
              <label>Sign Up: </label>
              <input value={signUpData.name}
                name="name"
                required = 'required'
                placeholder="Name"
                className = "input-field"
                onChange={(e) => handleSignUpData(e)}/>
              <input value={signUpData.email}
                name="email"
                required = 'required'
                placeholder="Email"
                className = "input-field"
                onChange={(e) => handleSignUpData(e)}/>
              <input value={signUpData.password}
                name="password"
                required = 'required'
                placeholder="Password"
                className = "input-field"
                onChange={(e) => handleSignUpData(e)}/>
              <input value={signUpData.passwordConfirmation}
                name="passwordConfirmation"
                placeholder="Confirm password"
                className= "input-field"
                onChange={(e) => handleSignUpData(e)}/>
              <button>Sign Up</button>
            </form>
        </div>
      </div>
    </div>
  )
}