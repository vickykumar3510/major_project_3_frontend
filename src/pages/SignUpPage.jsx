import '../App.css'
import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify";

const SignUpPage = () => {
    const [name, setname] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const accountHandler = async() => {
        const signUpAuth = await fetch('https://major-project-3-backend.vercel.app/auth/signup',{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({name, email, password})
        })

        const signUpData = await signUpAuth.json()
        toast.success("New Account created.");
       
    }
    return(
        <>
        <main className='signUp-bg'>
        <div className='conatiner loginPgCenter'>
            <h1 className='company-name'>Welcome to workasana</h1>
            <p style={{"color" : "red"}}>Please fill the below details to create your account</p><br/>
            <section>
                <div className='form-row'>
            <label htmlFor="fullName" >Full Name:</label>
            <input className='box-format' type="text" id="fullName" placeholder='enter full name' value={name} onChange={(e) => setname(e.target.value)}/><br/><br/><br/>
            </div>
            <div className='form-row'>
            <label htmlFor="">Email:</label>
            <input className='box-format' type="email" placeholder='enter email' id="email" value={email} onChange={(e) => setEmail(e.target.value)}/><br/><br/><br/>
            </div>
            <div className='form-row'>
            <label htmlFor="password">Password:</label>
            <input className='box-format' type="text" id="password" placeholder='create password' value={password} onChange={(e) => setPassword(e.target.value)}/><br/><br/><br/>
            </div>
            <button className='btn' onClick={accountHandler} disabled={!name || !password || !email}>Create account</button>{" "}<br/><br/>
            
            <Link className='removeLine forALine' to="/">Back to Sign In</Link>
            </section>
        </div>
        </main>
        </>
    )
}

export default SignUpPage