import '../styles/ComponentStyle/StatisticsCard.css';

const StatisticsCard = ({ title, value, caption, icon, variant }) => {
  return (
    <article className={`dashboard-stat-card stat-${variant}`}>
      <span className="dashboard-stat-icon" aria-hidden="true">{icon}</span>
      <p>{title}</p>
      <strong>{value}</strong>
      <span className="dashboard-stat-caption">{caption}</span>
    </article>
  );
};

export default StatisticsCard;