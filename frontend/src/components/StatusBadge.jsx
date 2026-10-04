import '../styles/ComponentStyle/statusBadge.css';
const StatusBadge = ({ status }) => {
  return  <h4 className={`status-${status}`}>Status: {status}</h4>;
}
export default StatusBadge