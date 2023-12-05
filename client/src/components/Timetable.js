import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";

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

  const navigate = useNavigate()

  return (
    <div id="Timetable" className="w-100 h-100 p-3 row rounded border">
        <header className="h-25 col-12 d-flex justify-content-center align-items-center bg-primary text-white"><h2>Timetable</h2></header>
        <div className="h-75 p-0 col-12"> 
          { timetable.classes.map((currClass, index) => { return <p key={index}>{currClass.teacher}</p> }) }
        </div>
    </div> 
  )
}

export default Timetable