import React, { useState, useEffect } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom";

function Loader({info = "", variant = "primary", additionalClasses = ""}) {
    return (
        <div className="Loader d-flex flex-column justify-content-center align-items-center">
            <strong className={"text-center text-" + variant}>{info}</strong>
            <div className={"spinner-grow text-" + variant} role="status" style={{ width: "5rem", height: "5rem" }}></div>
        </div>
    )
}

export default Loader