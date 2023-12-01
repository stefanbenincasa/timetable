import React, { useState, useEffect } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { isAuthenticated } from '../services/secure';

import Loader from "./Loader";

function Login() {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ classes, setClasses] = useState({email: "", password: ""})
    const [ errorText, setErrorText ] = useState("")

    // const [ status, setStatus ] 

    const [ isSuccessfulLogin, setIsSuccessfulLogin ] = useState(null)
    const [ isLoggedIn, setIsLoggedIn ] = useState(null)

    const navigate = useNavigate()
 
    useEffect(() => {
        async function authenticate() {
            const authenticated = await isAuthenticated()
            setIsLoggedIn(authenticated.result) 
        }

        setIsSuccessfulLogin(null)
        authenticate()
    }, [setIsLoggedIn])

    const handleLogin = async function(e) {
        e.preventDefault()
        const inputValidity = getInputValidity()
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
                    setIsSuccessfulLogin(true)
                    return
                }

                if(response.status === 500) throw new Error("Application Error")
                setIsSuccessfulLogin(false)
            } 
            catch(err) {
                console.log(err)
                setIsSuccessfulLogin(false)
            }
        }
        else {
            if(!inputValidity.email) console.log()
            if(!inputValidity.password) console.log()
        }
    }
    
    const handleEmailChange = function(e, newValue) {
        e.preventDefault()
        const classesReplacement = classes.email.replace(/error[-\w]*[ ]*/g, " ").trim()
        setClasses(currentClasses => ({...currentClasses, email: classesReplacement}))
        setEmail(newValue)
    }
    
    const handlePasswordChange = function(e, newValue) {
        e.preventDefault()
        const classesReplacement = classes.email.replace(/error[-\w]*[ ]*/g, " ").trim()
        setClasses(currentClasses => ({...currentClasses, password: classesReplacement}))
        setPassword(newValue)
    }
    
    const getInputValidity = function() {
        const emailRegex = /^(?=.{1,75}$)[^\s@]+@[^\s@]+\.[^\s@]+$/
        const passwordRegex = /^[a-zA-Z0-9]{1,25}$/;
        let inputValidity = { email: true, password: true }  

        if(!emailRegex.test(email)) {
            inputValidity.email = false
        }
        if(!passwordRegex.test(password)) {
            inputValidity.password = false
        }
        
        return inputValidity
    }

    return (
        <div id="Login" className="w-100 h-75 p-3 d-flex flex-column justify-content-center align-items-center rounded border">
            { true && <Loader info={errorText} variant={"danger"} /> }

            <form onSubmit={handleLogin} noValidate>
                <fieldset className="form-group d-flex flex-column">
                    <h1 className="w-100 mb-5 text-center text-primary">Login</h1>

                    <label htmlFor="username">Email address</label>
                    <input type="email" className={classes.email + " form-control mb-3"} id="username" maxLength="75" placeholder="name@example.com" onChange={(e) => handleEmailChange(e, e.target.value)} value={email} />
                    { 
                        classes.email.includes("error") && 
                        <div className="mb-3 p-3 error-suggestion rounded" id="emailError">
                            Please enter a valid email address meeting the following criteria: 
                            <ul>
                                <li>Between 1 and 75 characters in length; inclusive</li>
                                <li>Resembling: sample@email.com</li>
                            </ul>
                        </div> 
                    }
                    
                    <label htmlFor="password">Password</label>
                    <input type="password" className={classes.password + " form-control mb-3"} id="password" maxLength="25" placeholder="********" onChange={(e) => handlePasswordChange(e, e.target.value)} value={password} />
                    { 
                        classes.password.includes("error") && 
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
        </div>
    )
}

export default Login