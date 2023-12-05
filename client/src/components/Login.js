import React, { useState, useEffect } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom";

import Loader from "./Loader";

function Login() {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ additionalClasses, setAdditionalClasses ] = useState({email: "", password: ""})
    const [ info, setInfo ] = useState(<p>Authenticating...</p>)

    const [ isSuccessfulLogin, setIsSuccessfulLogin ] = useState(null)

    const navigate = useNavigate()
 
    const handleLogin = async function(e, email = "", password = "") {
        e.preventDefault()
        const inputValidity = getInputValidity(email, password)
        if(inputValidity.email && inputValidity.password) {
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
                    setInfo(<p>Login successful!<br></br>Loading Timetable...</p>)
                    setIsSuccessfulLogin(true)
                    setTimeout(() => { navigate("/") }, 3000)
                    return
                }

                setInfo(<p>Unauthorised credentials!<br></br>Reloading...</p>)
                setIsSuccessfulLogin(false)
                setTimeout(() => { setIsSuccessfulLogin(null) }, 3000)
            } 
            catch(err) {
                console.log(err)
                setInfo(<p>Application error!<br></br>Reloading...</p>)
                setIsSuccessfulLogin(false)
                setTimeout(() => { setIsSuccessfulLogin(null) }, 3000)
            }
        }
        else {
            if(!inputValidity.email) setAdditionalClasses(currentClasses => ({...currentClasses, email: currentClasses.email + " error"}))
            if(!inputValidity.password) setAdditionalClasses(currentClasses => ({...currentClasses, password: currentClasses.password + " error"}))
        }
    }
    
    const handleEmailChange = function(e, newValue = "", additionalClasses = "") {
        e.preventDefault()
        const replacement = additionalClasses.email.replace(/error[-\w]*[ ]*/g, "").trim()
        setAdditionalClasses(currentClasses => ({...currentClasses, email: replacement}))
        setEmail(newValue)
    }
    
    const handlePasswordChange = function(e, newValue = "", additionalClasses = "") {
        e.preventDefault()
        const replacement = additionalClasses.password.replace(/error[-\w]*[ ]*/g, "").trim()
        setAdditionalClasses(currentClasses => ({...currentClasses, password: replacement}))
        setPassword(newValue)
    }
    
    const getInputValidity = function(email = "", password = "") {
        const emailRegex = /^(?=.{1,75}$)[^\s@]+@[^\s@]+\.[^\s@]+$/
        const passwordRegex = /^[a-zA-Z0-9]{1,25}$/
        let inputValidity = { email: true, password: true }  

        if(!emailRegex.test(email)) {
            inputValidity.email = false
        }
        if(!passwordRegex.test(password)) {
            inputValidity.password = false
        }
        
        return inputValidity
    }

    const getLoginForm = function(email = "", password = "", additionalClasses = {}) {
        return (
            <form onSubmit={e => handleLogin(e, email, password)} noValidate>
                <fieldset className="form-group d-flex flex-column">
                    <h1 className="w-100 mb-5 text-center text-primary">Login</h1>

                    <label htmlFor="username">Email address</label>
                    <input type="email" className={additionalClasses?.email + " form-control mb-3"} id="username" maxLength="75" placeholder="name@example.com" onChange={e => handleEmailChange(e, e.target.value, additionalClasses)} value={email} />
                    { 
                        additionalClasses?.email.includes("error") && 
                        <div className="mb-3 p-3 error-suggestion rounded" id="emailError">
                            Please enter a valid email address meeting the following criteria: 
                            <ul>
                                <li>Between 1 and 75 characters in length; inclusive</li>
                                <li>Resembling: sample@email.com</li>
                            </ul>
                        </div> 
                    }
                    
                    <label htmlFor="password">Password</label>
                    <input type="password" className={additionalClasses?.password + " form-control mb-3"} id="password" maxLength="25" placeholder="********" onChange={e => handlePasswordChange(e, e.target.value, additionalClasses)} value={password} />
                    { 
                        additionalClasses?.password.includes("error") && 
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
        )
    }

    return (
        <div id="Login" className="w-100 h-100 p-3 d-flex flex-column justify-content-center align-items-center rounded border">
            { 
                ( isSuccessfulLogin === true && <Loader info={info} variant="success" /> ) || 
                ( isSuccessfulLogin === false && <Loader info={info} variant="danger" /> ) ||
                ( isSuccessfulLogin === null && getLoginForm(email, password, additionalClasses) )
            }
        </div>
    )
}

export default Login