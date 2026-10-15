import { loadApplications } from '../utils/applicationStorage.js';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge.jsx';
import '../styles/ComponentStyle/RecentApplications.css';
import EmptyState from './EmptyState.jsx';

const RecentApplications = () =>{
    const recentApplications = loadApplications()
        .map((application, index) => ({ application, index }))
        .sort((first, second) => {
            const firstDate = Date.parse(first.application.appliedDate || '');
            const secondDate = Date.parse(second.application.appliedDate || '');
            const validFirstDate = Number.isNaN(firstDate) ? -Infinity : firstDate;
            const validSecondDate = Number.isNaN(secondDate) ? -Infinity : secondDate;

            return validSecondDate - validFirstDate || first.index - second.index;
        })
        .slice(0, 4)
        .map(({ application }) => application);

    return (
        <section className="dashboard-recent-section" aria-labelledby="recent-applications-title">
            <div className="dashboard-section-heading dashboard-recent-heading">
                <div>
                    <p className="dashboard-eyebrow">Latest activity</p>
                    <h2 id="recent-applications-title">Recent applications</h2>
                </div>
                <Link className="dashboard-view-all" to="/applications">View all <span aria-hidden="true">→</span></Link>
            </div>

            {recentApplications.length === 0 ? (
                <div className="dashboard-recent-empty">
                   <EmptyState message = "No applications yet" />
                </div>
            ) : (
                <div className="dashboard-recent-list">
                    {recentApplications.map((application) => {
                        const appliedDate = application.appliedDate
                            ? new Date(`${application.appliedDate}T00:00:00`).toLocaleDateString(undefined, {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                            })
                            : 'Date not provided';

                        return (
                            <article className="dashboard-recent-item" key={application.id}>
                                <div className="dashboard-recent-avatar" aria-hidden="true">
                                    {application.company?.trim().charAt(0).toUpperCase() || '?'}
                                </div>
                                <div className="dashboard-recent-main">
                                    <h3>{application.company || 'Company not provided'}</h3>
                                    <p>{application.role || 'Role not provided'}</p>
                                </div>
                                <span className="dashboard-recent-date">{appliedDate}</span>
                                <div className="dashboard-recent-status">
                                    <StatusBadge status={application.status || 'Unspecified'} />
                                </div>
                                <Link
                                    className="dashboard-recent-link"
                                    to={`/applications/details/${application.id}`}
                                    aria-label={`View ${application.company || 'application'} details`}
                                >
                                    <span aria-hidden="true">→</span>
                                </Link>
                            </article>
                        );
                    })}
                </div>
            )}
        </section>
    );
}

export default RecentApplications;