import React from 'react'
import '../styles/ComponentStyle/applicationCard.css'
const ApplicationCard = ({ application }) => {
  return (
    <div className="application-card">
      <div className="application-card-details">
        <h3>{application.company}</h3>
        <p>{application.role}</p>
        <p>{application.location}</p>
        <div className="application-card-actions">
          <button className="view-details-button">View Details</button>
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