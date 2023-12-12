import React, { useState, useEffect } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom";

function NoResults({resultsKind = "Results"}) {
    return (
        <div className={"NoResults d-flex flex-column justify-content-center align-items-center rounded"}>
            No {resultsKind} found!
        </div>
    )
}

export default NoResults 
