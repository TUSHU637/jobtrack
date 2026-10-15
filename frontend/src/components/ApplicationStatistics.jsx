import { loadApplications } from '../utils/applicationStorage.js';
import StatisticsCard from './StatisticsCard.jsx';
import '../styles/ComponentStyle/ApplicationStatistics.css';

const applicationStatuses = ['Wishlist', 'Applied', 'Screening', 'Interview', 'Offer', 'Rejected'];

const ApplicationStatistics = () => {
    const applications = loadApplications();
    const totalApplications = applications.length;
    const statusCounts = applications.reduce((counts, application) => {
        const status = application.status || 'Unspecified';
        counts[status] = (counts[status] || 0) + 1;
        return counts;
    }, {});
    const statuses = [...new Set([...applicationStatuses, ...Object.keys(statusCounts)])];
    const activeApplications = applications.filter(
        (application) => !['Offer', 'Rejected'].includes(application.status)
    ).length;
    const interviewCount = statusCounts.Interview || 0;
    const offerCount = statusCounts.Offer || 0;

    return (
        <section className="dashboard-stats-section" aria-labelledby="dashboard-stats-title">
            <div className="dashboard-section-heading">
                <div>
                    <p className="dashboard-eyebrow">Your progress</p>
                    <h2 id="dashboard-stats-title">Application statistics</h2>
                </div>
            </div>

            <div className="dashboard-stat-cards">
                <StatisticsCard
                    variant="total"
                    icon="↗"
                    title="Total applications"
                    value={totalApplications}
                    caption="all tracked opportunities"
                />
                <StatisticsCard
                    variant="active"
                    icon="◎"
                    title="In progress"
                    value={activeApplications}
                    caption="still in your pipeline"
                />
                <StatisticsCard
                    variant="interview"
                    icon="▣"
                    title="Interviews"
                    value={interviewCount}
                    caption="opportunities at interview"
                />
                <StatisticsCard
                    variant="offer"
                    icon="✦"
                    title="Offers"
                    value={offerCount}
                    caption="offers received"
                />
            </div>

            <div className="dashboard-status-card">
                <div className="dashboard-status-heading">
                    <div>
                        <h3>Pipeline by status</h3>
                        <p>See where your applications stand.</p>
                    </div>
                    <span>{totalApplications} total</span>
                </div>
                {totalApplications === 0 ? (
                    <p className="dashboard-stats-empty">Add an application to see your progress here.</p>
                ) : (
                    <div className="dashboard-status-list">
                        {statuses.filter((status) => statusCounts[status]).map((status) => {
                            const count = statusCounts[status];
                            const percentage = Math.round((count / totalApplications) * 100);
                            const statusClass = status.toLowerCase().replace(/[^a-z0-9]+/g, '-');

                            return (
                                <div className="dashboard-status-row" key={status}>
                                    <div className="dashboard-status-label">
                                        <span className={`dashboard-status-dot status-dot-${statusClass}`} aria-hidden="true" />
                                        <span>{status}</span>
                                    </div>
                                    <div
                                        className="dashboard-status-track"
                                        role="progressbar"
                                        aria-label={`${status} applications`}
                                        aria-valuemin="0"
                                        aria-valuemax={totalApplications}
                                        aria-valuenow={count}
                                    >
                                        <span
                                            className={`dashboard-status-fill status-fill-${statusClass}`}
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                    <span className="dashboard-status-count">{count}</span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}

export default ApplicationStatistics;