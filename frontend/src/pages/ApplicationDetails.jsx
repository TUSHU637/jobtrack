import { useNavigate, useParams } from 'react-router-dom';
import { loadApplications } from '../utils/applicationStorage.js';
import StatusBadge from "../components/StatusBadge.jsx";
import '../styles/PagesStyles/ApplicationDetailsPage.css';

const ApplicationDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const applicationData = loadApplications();
    const application = applicationData.find(
        (application) => String(application.id) === id
    );

    if (!application) {
        return (
            <main className="application-details-page">
                <section className="application-not-found">
                    <span className="application-not-found-icon" aria-hidden="true">?</span>
                    <h1>Application not found</h1>
                    <p>This application may have been removed or the link may be incorrect.</p>
                    <button className="application-back-button" type="button" onClick={() => navigate('/applications')}>
                        Back to applications
                    </button>
                </section>
            </main>
        );
    }

    const appliedDate = application.appliedDate
        ? new Date(`${application.appliedDate}T00:00:00`).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : 'Not provided';

    return (
        <main className="application-details-page">
            <button className="application-details-back" type="button" onClick={() => navigate(-1)}>
                <span aria-hidden="true">←</span>
                Back
            </button>

            <header className="application-details-hero">
                <div className="application-company-avatar" aria-hidden="true">
                    {application.company?.trim().charAt(0).toUpperCase() || '?'}
                </div>
                <div className="application-details-title">
                    <p className="application-details-eyebrow">Application overview</p>
                    <h1>{application.company}</h1>
                    <p className="application-details-role">
                        {application.role}
                        {application.location && <><span aria-hidden="true"> · </span>{application.location}</>}
                    </p>
                </div>
                <div className="application-details-status">
                    <span className="application-details-label">Current status</span>
                    <div className="application-detail-status-badge">
                        <StatusBadge status={application.status} />
                    </div>
                </div>
            </header>

            <div className="application-details-content">
                <section className="application-details-section" aria-labelledby="application-info-title">
                    <div className="application-section-heading">
                        <div>
                            <p className="application-details-eyebrow">The opportunity</p>
                            <h2 id="application-info-title">Application details</h2>
                        </div>
                    </div>
                    <dl className="application-info-grid">
                        <div className="application-info-item">
                            <dt>Applied on</dt>
                            <dd>{appliedDate}</dd>
                        </div>
                        <div className="application-info-item">
                            <dt>Work arrangement</dt>
                            <dd>{application.workMode || 'Not provided'}</dd>
                        </div>
                        <div className="application-info-item">
                            <dt>Employment type</dt>
                            <dd>{application.employmentType || 'Not provided'}</dd>
                        </div>
                        <div className="application-info-item">
                            <dt>Salary range</dt>
                            <dd>{application.salaryRange || 'Not disclosed'}</dd>
                        </div>
                    </dl>
                </section>

                <section className="application-details-section" aria-labelledby="recruiter-info-title">
                    <div className="application-section-heading">
                        <div>
                            <p className="application-details-eyebrow">Your point of contact</p>
                            <h2 id="recruiter-info-title">Recruiter</h2>
                        </div>
                    </div>
                    <dl className="application-info-grid application-recruiter-grid">
                        <div className="application-info-item">
                            <dt>Name</dt>
                            <dd>{application.recruiter || 'Not provided'}</dd>
                        </div>
                        <div className="application-info-item">
                            <dt>Email</dt>
                            <dd>{application.recruiterEmail || 'Not provided'}</dd>
                        </div>
                    </dl>
                </section>

                <section className="application-details-section application-notes-section" aria-labelledby="application-notes-title">
                    <div className="application-section-heading">
                        <div>
                            <p className="application-details-eyebrow">Keep track of the important bits</p>
                            <h2 id="application-notes-title">Notes</h2>
                        </div>
                    </div>
                    <p className={`application-notes-content${application.notes ? '' : ' is-empty'}`}>
                        {application.notes || 'No notes added for this application yet.'}
                    </p>
                </section>
            </div>
        </main>
    );
}

export default ApplicationDetail