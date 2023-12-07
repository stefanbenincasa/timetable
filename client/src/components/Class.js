import React, { useState, useEffect } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom";

function Class({classId, teacher, dateTime, durationMinutes, subject, maxStudents = null, location = null, isFirstClass = false, isEvenClass = null}) {
    const getColorByDuration = function(durationMinutes) {
        if(durationMinutes > 0 && durationMinutes <= 30) {
            return "blue"
        } 
        else if(durationMinutes > 30 && durationMinutes <= 60) {
            return "green"
        }
        else  {
            return "red"
        }
    }
    
    const getHeightByDuration = function() {
        if(durationMinutes > 0 && durationMinutes <= 30) {
            return "h-25"
        } 
        else if(durationMinutes > 30 && durationMinutes <= 60) {
            return "h-50"
        }
        else  {
            return "h-100"
        }
    }

    const getDisplayTime = function(rawDateTime) {
        let result, tempDate = new Date(rawDateTime)
        result = tempDate.toString().replace(/GMT\+\d\d\d\d/, "")
        return result
    }

    const getDisplayClassLength = function(rawTimeMins) {
        let result = "", totalHours = 0, remainderMinutes = 0

        totalHours = Math.floor(rawTimeMins / 60)
        remainderMinutes = rawTimeMins % 60
        result = `${totalHours} Hours & ${remainderMinutes} Minutes`
        return result
    }

    try {
        const classes = "Class col-12" + " " + getHeightByDuration() + (isFirstClass ? " mt-3" : "") + " mb-3 flex-column justify-content-center align-items-center"

        return (
            <div className={classes}> 
                <div className="card w-100" style={{width: "18rem", height: "100%"}}>
                    <div className="card-header bg-secondary text-white">
                        <h5 className="card-title m-0">{subject}</h5>
                    </div>
                    <div className={"card-body fs-6" + (isEvenClass ? " bg-secondary-subtle" : " bg-white")}>
                        <p className="card-text mb-0">{teacher}</p>
                        <p className="card-text mb-0">{location}</p>
                        <p className="card-text mb-0">{getDisplayTime(dateTime)}</p>
                        <p className="card-text mb-0">{getDisplayClassLength(durationMinutes)}</p>
                    </div>
                </div>
            </div>
        )
    }
    catch(err) {
        console.log(err)
        return <></>
    }
}

export default Class
