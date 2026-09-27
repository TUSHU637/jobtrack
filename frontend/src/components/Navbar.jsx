import React from "react";
import '../styles/ComponentStyle/navbar.css'
import { CgProfile } from "react-icons/cg";
function Navbar() {
    return (
        <div className="navbar-content">
             <h1>JobTrack</h1>
             <div className="profile-section">
                <button className="profile-icon"><CgProfile /></button>
                <span className="profile-button">Profile</span>
                {/* <div className="logout-section">
                <button className="logout-button">Logout</button>
             </div> */}
             </div>
        </div>
    )
}
export default Navbar