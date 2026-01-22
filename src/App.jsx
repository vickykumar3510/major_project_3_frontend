import './App.css'
import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";

function App() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const loginHandler = async () => {
    const loginAuth = await fetch('https://major-project-3-backend.vercel.app/auth/login', {
      method: 'POST',
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({email, password})
    })

    const loginData = await loginAuth.json()
    

    if(loginAuth.ok){
      localStorage.setItem('adminToken', loginData.token)
      navigate("/dashboard")
      toast.success("Welcome to Workasana");
    } else{
      toast.error("Invalid user credentials.")
    }
    
  }

  return (
    
    <main className='login-bg'>
      <div className='loginPgCenter'>
        <p className='company-name' style={{fontSize: "30px"}}>workasana</p>
        <h3 style={{"color" : "blue"}}>Log in to your account</h3>
        <p>Please enter your details</p>
        <div className=''>
        <div className='form-row'>
        <label htmlFor="email">Email:</label><br/>
        <input type="email" id="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}/><br/><br/><br/>
        </div>
        <div className='form-row'>
        <label htmlFor="password">Password:</label><br/>
        <input type="text" id="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/><br/><br/><br/>
        </div>
        <div>
        <button className='btn' onClick={loginHandler}>Sign In</button>
        <p><i>Don't have account</i></p>
        <Link className='removeLine forALine' to="/signuppage">Sign Up</Link>
        </div>
        </div>
      </div>
      </main>
    
  )
}

export default App
