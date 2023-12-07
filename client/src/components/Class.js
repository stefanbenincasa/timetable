import React, { useState, useEffect } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom";

function Class({classId, teacher, dateTime, durationMinutes, subjectId, maxStudents = null, location = null, isFirstClass = false}) {
    const [height, setHeight] = useState("")
    const classes = "Class col-12" + (isFirstClass ? " mt-3 " : "") + "mb-3 flex-column justify-content-center align-items-center"

    return (
        <div className={classes} style={{height:height + "rem"}}>
            <div className="card w-100" style={{width: "18rem", height: "100%"}}>
                <div className="card-body fs-6">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
        </div>
    )
}

export default Class
