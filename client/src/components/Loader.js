import React, { useState, useEffect } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { isAuthenticated } from '../services/secure';

function Loader({info, variant}) {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <p className="text-center text-primary">{info}</p>
            <div className={"spinner-grow text-" + (variant ? variant : "primary")} role="status" style={{ fontSize: "48px"}}></div>
        </div>
    )
}

export default Loader