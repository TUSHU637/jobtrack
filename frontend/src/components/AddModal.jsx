import { useActionState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import '../styles/ComponentStyle/addModal.css';

const workModes = ['Remote', 'Hybrid', 'On-site'];
const employmentTypes = ['Full-time', 'Internship', 'Contract', 'Part-time'];
const statuses = ['Wishlist', 'Applied', 'Screening', 'Interview', 'Offer', 'Rejected'];

const AddModal = ({ onAddApplication, onClose }) => {
    const submitForm = (previousState, formData) => {
        const company = String(formData.get('company') || '').trim();
        const role = String(formData.get('role') || '').trim();
        const location = String(formData.get('location') || '').trim();
        const appliedDate = String(formData.get('appliedDate') || '');
        const workMode = String(formData.get('workMode') || '');
        const employmentType = String(formData.get('employmentType') || '');
        const status = String(formData.get('status') || '');
        const parsedDate = new Date(`${appliedDate}T00:00:00Z`);

        if (!company || !role || !location) {
            return { error: 'Company, job title, and location cannot be empty.' };
        }
        if (!/^\d{4}-\d{2}-\d{2}$/.test(appliedDate) || Number.isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== appliedDate) {
            return { error: 'Enter a valid applied date.' };
        }
        if (!workModes.includes(workMode) || !employmentTypes.includes(employmentType) || !statuses.includes(status)) {
            return { error: 'Select a valid work mode, employment type, and status.' };
        }

        onAddApplication({
            id: Date.now(),
            company,
            role,
            location,
            appliedDate,
            workMode,
            employmentType,
            status,
            salaryRange: String(formData.get('salaryRange') || '').trim(),
            recruiter: String(formData.get('recruiter') || '').trim(),
            notes: String(formData.get('notes') || '').trim(),
        });
        return { error: '' };
    }
    const [formState, formAction, isPending] = useActionState(submitForm, { error: '' });

    return (
        <section className="add-modal" role="dialog" aria-modal="true" aria-labelledby="add-application-title">
            <header className="add-modal-header">
                <h2 id="add-application-title">Add New Application</h2>
                <button className="modal-close" type="button" onClick={onClose} aria-label="Close form">
                    <FaXmark aria-hidden="true" />
                </button>
            </header>
            <form className="application-form" action={formAction}>
                {formState.error && <p className="form-error form-field-wide" role="alert">{formState.error}</p>}
                <label className="form-field">
                    <span>Company name <span className="required-marker">*</span></span>
                    <input type="text" name="company" autoComplete="organization" maxLength={100} pattern=".*\S.*" title="Enter at least one non-space character." required />
                </label>
                <label className="form-field">
                    <span>Job title <span className="required-marker">*</span></span>
                    <input type="text" name="role" maxLength={100} pattern=".*\S.*" title="Enter at least one non-space character." required />
                </label>
                <label className="form-field">
                    <span>Location <span className="required-marker">*</span></span>
                    <input type="text" name="location" placeholder="e.g. Bangalore" maxLength={100} pattern=".*\S.*" title="Enter at least one non-space character." required />
                </label>
                <label className="form-field">
                    <span>Applied date <span className="required-marker">*</span></span>
                    <input type="date" name="appliedDate" required />
                </label>
                <label className="form-field">
                    <span>Work mode <span className="required-marker">*</span></span>
                    <select name="workMode" defaultValue="" required>
                        <option value="" disabled>Select work mode</option>
                        {workModes.map((mode) => <option key={mode} value={mode}>{mode}</option>)}
                    </select>
                </label>
                <label className="form-field">
                    <span>Employment type <span className="required-marker">*</span></span>
                    <select name="employmentType" defaultValue="" required>
                        <option value="" disabled>Select employment type</option>
                        {employmentTypes.map((type) => <option key={type}>{type}</option>)}
                    </select>
                </label>
                <label className="form-field">
                    <span>Status <span className="required-marker">*</span></span>
                    <select name="status" defaultValue="" required>
                        <option value="" disabled>Select status</option>
                        {statuses.map((applicationStatus) => <option key={applicationStatus}>{applicationStatus}</option>)}
                    </select>
                </label>
                <label className="form-field">
                    <span>Salary range</span>
                    <input type="text" name="salaryRange" placeholder="e.g. ₹10–14 LPA" />
                </label>
                <label className="form-field">
                    <span>Recruiter name</span>
                    <input type="text" name="recruiter" placeholder="e.g. Rohit Verma" />
                </label>
                <label className="form-field form-field-wide">
                    <span>Notes</span>
                    <textarea name="notes" rows="4" />
                </label>
                <div className="form-actions form-field-wide">
                    <button className="cancel-button" type="button" onClick={onClose}>Cancel</button>
                    <button className="submit-application-button" type="submit" disabled={isPending}>
                        {isPending ? 'Adding application...' : 'Add application'}
                    </button>
                </div>
            </form>
        </section>
    )
}
export default AddModal