import { useNavigate } from "react-router";
const ApplicationDetail = () => {
    const navigate = useNavigate();

    return (
          
            <div className="application-details-container">
                <h1>Application Details</h1>
                 <button onClick={() => navigate(-1)}>
                  Go Back
                  </button>
                <div className="application-details">
                    <h2>Company: Example Company</h2>
                    <p>Role: Example Role</p>
                    <p>Location: Example Location</p>
                    <p>Status: Example Status</p>
                </div>
            </div>
    )
}
export default ApplicationDetail