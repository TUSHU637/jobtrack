import { MdDashboard } from "react-icons/md";
import { MdOutlineSettingsApplications } from "react-icons/md";
import '../styles/ComponentStyle/sidebar.css'
function Sidebar() {
    return (
        <div className="sidebarContainer">
        <div className="sidebar-item">
        <MdDashboard />
        <span>Dashboard</span>
      </div>

      <div className="sidebar-item">
        <MdOutlineSettingsApplications />
        <span>Applications</span>
      </div>
        </div>
    )
}
export default Sidebar