import React, { useState, useEffect } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { isAuthenticated } from '../services/secure';

function Loader({info, variant}) {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <strong className={"text-center text-" + (variant ? variant : "primary")}>{info}</strong>
            <div className={"spinner-grow text-" + (variant ? variant : "primary")} role="status" style={{ width: "5rem", height: "5rem" }}></div>
        </div>
    )
}

export default Loader