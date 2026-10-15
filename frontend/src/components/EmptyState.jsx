import '../styles/ComponentStyle/EmptyState.css';

const EmptyState = ({ message }) => {
    return (
        <div className="empty-state" role="status">
            <span className="empty-state-icon" aria-hidden="true">▤</span>
            <h2>{message}</h2>
            <p>Your applications and activity will appear here once you add one.</p>
            <Link to="/applications">Go to applications <span aria-hidden="true">→</span></Link>
        </div>
    );
}
export default EmptyState;