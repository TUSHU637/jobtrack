import { Link } from 'react-router-dom';
import ApplicationStatistics from '../components/ApplicationStatistics.jsx';
import RecentApplications from '../components/RecentApplications.jsx';
import '../styles/PagesStyles/DashboardPage.css';
import { loadApplications } from '../utils/applicationStorage.js';
import EmptyState from '../components/EmptyState.jsx';

const Dashboard = () => {
    const applications = loadApplications();

    return (
        <main className="dashboard-page">
            <header className="dashboard-header">
                <div>
                    <p className="dashboard-eyebrow">Your job search at a glance</p>
                    <h1>Dashboard</h1>
                    <p className="dashboard-intro">Keep your applications organized and stay on top of every opportunity.</p>
                </div>
                <Link className="dashboard-add-button" to="/applications">
                    View applications
                    <span aria-hidden="true">→</span>
                </Link>
            </header>
            {applications.length === 0 ? (
                <EmptyState message="You haven't applied to any jobs yet." />
            ) : (
                <>
                <ApplicationStatistics />
                <RecentApplications />
                </>
            )}
        </main>
    );
};

export default Dashboard;
