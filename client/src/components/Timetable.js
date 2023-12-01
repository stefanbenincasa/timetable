import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { isAuthenticated } from '../services/secure';

const initialState = { 
  studentId: 1, 
  classes: [
      {
          classId: 1,
          teacher: "Dr Henry Morgan",
          dateTime: "2023-06-15T03:30:00.000Z",
          durationMinutes: 60
      },
      {
          classId: 2,
          teacher: "Dr Simon Watson",
          dateTime: "2023-06-15T03:30:00.000Z",
          durationMinutes: 120
      }
  ]
}

function Timetable() {
  const [ timetable, setTimetable ] = useState(initialState)
  const [ isLoggedIn, setIsLoggedIn ] = useState(null)
  const [ info, setInfo ] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    async function authenticate() {
      const authenticated = await isAuthenticated()

      if(authenticated.response.status !== 200) {
        const infoJsx = <p className="text-center">{authenticated.response.statusText}.<br></br>Redirecting to Login...</p>
        setInfo(infoJsx)
        setTimeout(() => { setIsLoggedIn(authenticated.result) }, 3000)
      }
      else {
        setIsLoggedIn(true)
      }
    }

    authenticate()
  }, [setIsLoggedIn])

  return (
    <>
      {
        isLoggedIn === false ? 
        <Navigate to="/login" />
        :
        (
          isLoggedIn === true ?
          <div id="Timetable" className="w-100 h-100 p-3 row rounded border border-primary">
              <header className="h-25 col-12 d-flex justify-content-center align-items-center bg-primary text-white"><h2>Timetable</h2></header>
              <div className="h-75 p-0 col-12"> 
                { timetable.classes.map((currClass, index) => { return <p key={index}>{currClass.teacher}</p> }) }
              </div>
          </div> 
          :
          <div className="w-50 d-flex flex-column justify-content-center align-items-center">
            <strong className="mb-3 text-primary" role="status">{info}</strong>
            <div className="spinner-grow m-auto text-primary" aria-hidden="true" style={{ width: "5rem", height: "5rem" }}></div>
          </div>
        )
      }
    </>
  )
}

export default Timetable