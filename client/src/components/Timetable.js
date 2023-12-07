import React, { useState, useEffect } from 'react';
import { Link, Navigate, json, useNavigate } from "react-router-dom";

import Class from "./Class"
import Loader from "./Loader"

/* const initialState = [
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
 */

function Timetable({handleLogout}) {
  const [ classes, setClasses ] = useState(null)

  useEffect(() => {
    async function getTimetable() {
      const response = await fetch(`http://localhost:5000/timetable`, { credentials: "include" })
      if(response.status == 401) {
        handleLogout()
        return
      }

      let { studentId, classes } = await response.json()
      setClasses(classes ? classes : null)
    }

    setTimeout(() => getTimetable(), 1500)
  }, [setClasses])
  
 /*Remember to handle the NULL case; consider filler element to notify User*/
  return (
    <div id="Timetable" className="w-100 p-4 row rounded border">
        <header className="h-25 col-12 d-flex justify-content-center align-items-center rounded bg-primary text-white"><h2>Timetable</h2></header>
        <div className={"h-75 w-100 p-0 col-6 d-flex flex-column" + (!classes ? " justify-content-center align-items-center" : "")}> 
          { 
            classes === null && <Loader /> ||
            classes.map((cls, index) => { 
              return <Class key={index} classId={cls.classId} 
              teacher={cls.teacher} dateTime={cls.dateTime} 
              durationMinutes={cls.durationMinutes} subject={cls.subject} 
              maxStudents={cls.maxStudents} location={cls.location} isFirstClass={index === 0} /> 
            })
          }
        </div>
    </div> 
  )
}

export default Timetable
