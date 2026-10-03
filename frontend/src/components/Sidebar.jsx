import { MdDashboard } from "react-icons/md";
import { MdOutlineSettingsApplications } from "react-icons/md";
import '../styles/ComponentStyle/sidebar.css'
import { Link } from "react-router-dom";
function Sidebar() {
    return (
        <div className="sidebarContainer">
        <div className="sidebar-item">
        <MdDashboard />
        <Link to="/" className="sidebar-item-link">
          <span>Dashboard</span>
        </Link>
      </div>

      <div className="sidebar-item">
        <MdOutlineSettingsApplications />
       <Link to="/applications" className="sidebar-item-link">
         <span>Applications</span>
       </Link>
      </div>
        </div>
    )
}
export default Sidebar