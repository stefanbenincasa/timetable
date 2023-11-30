import React, { useState, useEffect } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isFailedLogin, setIsFailedLogin] = useState(null)
    const [error, setError] = useState({ email: { classes: "", message: ""}, password: { classes: "", message: ""}, login: { classes: "", message: ""}})
    
    const handleLogin = async function(e) {
        e.preventDefault()
        if(validateInputs()) {
            try {
                const postData = { email: email, password: password }
                
                const requestOptions = {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(postData)
                }
                
                const response = await fetch(`http://localhost:5000/login`, requestOptions)
                if(response.status === 200) {
                    setIsFailedLogin(false)
                    return
                }

                if(response.status === 500) throw new Error("Application Error")
                setError(currentError => ({...currentError, login: { message: "Invalid login credentials."}}))
                setIsFailedLogin(true)
            } 
            catch(err) {
                console.log(err)
                setIsFailedLogin(true)
                setError(currentError => ({...currentError, login: { message: err.message}}))
            }
        }
    }
    
    const handleEmailChange = function(e, newValue) {
        e.preventDefault()
        setError(currentError => ({...currentError, email: { classes: ""}})) // Clear any class errors from prior submissions
        setEmail(newValue)
    }
    
    const handlePasswordChange = function(e, newValue) {
        e.preventDefault()
        setError(currentError => ({...currentError, password: { classes: ""}})) // Clear any class errors from prior submissions
        setPassword(newValue)
    }
    
    const validateInputs = function() {
        const emailRegex = /^(?=.{1,75}$)[^\s@]+@[^\s@]+\.[^\s@]+$/
        const passwordRegex = /^[a-zA-Z0-9]{1,25}$/;
        let isValid = true 

        if(!emailRegex.test(email)) {
            setError(currentError => ({...currentError, email: { classes: "error"}}))
            isValid = false
        }
        if(!passwordRegex.test(password)) {
            setError(currentError => ({...currentError, password: { classes: "error"}}))
            isValid = false
        }
        
        return isValid 
    }

    return (
        <div id="Login" className="w-100 h-75 p-3 d-flex flex-column justify-content-center align-items-center rounded border">
            {
                isFailedLogin &&
                setTimeout(() => window.location.reload(), 3000) &&
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <p className="text-center">{error.login.message}</p>
                    <p className="text-center">Reloading...</p>
                    <div className="spinner-grow text-danger" role="status" style={{ fontSize: "48px"}}></div>
                </div>
            }
            {
                !isFailedLogin &&
                <form onSubmit={handleLogin} noValidate>
                    <fieldset className="form-group d-flex flex-column">
                        <h1 className="w-100 mb-5 text-center text-primary">Login</h1>

                        <label htmlFor="username">Email address</label>
                        <input type="email" className={error.email.classes + " form-control mb-3"} id="username" maxLength="75" placeholder="name@example.com" onChange={(e) => handleEmailChange(e, e.target.value)} value={email} />
                        { 
                            error.email.classes.length > 0 && 
                            <div className="mb-3 p-3 error-suggestion rounded" id="emailError">
                                Please enter a valid email address meeting the following criteria: 
                                <ul>
                                    <li>Between 1 and 75 characters in length; inclusive</li>
                                    <li>Resembling: sample@email.com</li>
                                </ul>
                            </div> 
                        }
                        
                        <label htmlFor="password">Password</label>
                        <input type="password" className={error.password.classes + " form-control mb-3"} id="password" maxLength="25" placeholder="********" onChange={(e) => handlePasswordChange(e, e.target.value)} value={password} />
                        { 
                            error.password.classes.length > 0 && 
                            <div className="mb-3 p-3 error-suggestion rounded" id="passwordError">
                                Please enter a valid password meeting the following criteria: 
                                <ul>
                                    <li>Between 1 and 25 characters in length inclusive</li>
                                    <li>Consistent of only alphanumeric characters</li>
                                </ul>
                            </div> 
                        }
                        
                        <button className="btn btn-primary align-self-end" type="submit">Submit</button>
                    </fieldset>
                </form>
            }
            {
                isFailedLogin === false && <Navigate to="/" />
            }
        </div>
    )
}

export default Login