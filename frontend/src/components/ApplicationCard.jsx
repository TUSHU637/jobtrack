import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/ComponentStyle/applicationCard.css'
const ApplicationCard = ({ application }) => {
  return (
    <div className="application-card">
      <div className="application-card-details">
        <h3>{application.company}</h3>
        <p>{application.role}</p>
        <p>{application.location}</p>
        <div className="application-card-actions">
             <Link to ={`details/${application.id}`} className="view-details-link">
              <button className="view-details-button">View Details</button>
            </Link>
          <button className="delete-button">Delete</button>
        </div>
      </div>
      <div className="application-status">
        <h4 className={`status-${application.status}`}>Status: {application.status}</h4>
      </div>
    </div>
  )
}

export default ApplicationCard