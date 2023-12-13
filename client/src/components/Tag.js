import React, { useState, useEffect } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom";

function Tag({ durationMinutes = 0}) {
    let backgroundColor = "var(", height = "", width = ""

    if(durationMinutes > 0 && durationMinutes <= 30) {
        backgroundColor += "--secondary-color)"
        width = "w-25"
    } 
    else if(durationMinutes > 30 && durationMinutes <= 60) {
        backgroundColor += "--tertiary-color)"
        width = "w-50"
    }
    else  {
        backgroundColor += "--accent-color)"
        width = "w-100"
    }

    return (
        <div className={"Tag " + width + " mt-2 d-flex flex-column justify-content-center align-items-center rounded"} style={{ minHeight: "1rem", minWidth: "50%", backgroundColor: backgroundColor}}>
        </div>
    )
}

export default Tag 
