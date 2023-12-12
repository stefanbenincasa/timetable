import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";

import Class from "./Class"
import Loader from "./Loader"
import NoResults from "./NoResults"

function Timetable({handleLogout}) {
  const [ classes, setClasses ] = useState(null)
  const [ additionalClasses, setAdditionalClasses ] = useState("")
  const [ isWithinLoadTime, setIsWithinLoadTime ] = useState(true)

  useEffect(() => {
    async function getTimetable() {

      try {
        let timeMsSinceFetch = 0, maxResponseWaitTime = 8500, msIncrement = 2500, intervalId = null

        const startResponseCountdown = function() {
          intervalId = setInterval(() => {
            timeMsSinceFetch += msIncrement
            if(timeMsSinceFetch >= maxResponseWaitTime) {
              setIsWithinLoadTime(false)
              clearInterval(intervalId)
            }
          }, 2500)
        }

        startResponseCountdown()
        const response = await fetch(`http://localhost:5000/timetable`, { credentials: "include" })
        
        if(response.status == 401) {
          handleLogout()
          return
        }

        if(isWithinLoadTime) {
          let { studentId, classes } = await response.json()
          clearInterval(intervalId)
          setClasses(classes ? classes : null)
        }
      }
      catch(err) {
        console.log(err)
      }
    }

    setTimeout(() => getTimetable(), 1500)
  }, [setClasses])

  return (
    <div id="Timetable" className="w-100 my-5 p-4 rounded border border-5 border-white">
        <header className="p-5 d-flex justify-content-center align-items-center rounded bg-primary text-white"><h2>Timetable</h2></header>
        <div className={"w-100 m-auto d-flex flex-column" + " " + additionalClasses + (!classes ? " justify-content-center align-items-center" : "")}> 
          { 
            !isWithinLoadTime && <NoResults /> ||
            classes === null && <Loader /> ||
            classes.length === 0 && <NoResults /> ||
            classes.map((cls, index) => { 
              return <Class key={index} classId={cls.classId} 
              teacher={cls.teacher} dateTime={cls.dateTime} 
              durationMinutes={cls.durationMinutes} subject={cls.subject} 
              maxStudents={cls.maxStudents} location={cls.location} isFirstClass={index === 0} isEvenClass={(index + 1) % 2 === 0} /> 
            })
          }
        </div>
    </div> 
  )
}

export default Timetable
