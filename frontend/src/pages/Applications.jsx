import { useEffect, useState } from 'react';
import applications from '../data/application.js'
import ApplicationCard from '../components/ApplicationCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import Filterbar from '../components/Filterbar.jsx';
import '../styles/PagesStyles/ApplicationsPage.css'
import AddModal from '../components/AddModal.jsx';

const APPLICATIONS_STORAGE_KEY = 'jobtrack-added-applications-v2';
const SEED_APPLICATION_IDS = new Set(applications.map((application) => application.id));

const loadApplications = () => {
    try {
        const currentSaved = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
        const isLegacyData = currentSaved === null;
        const savedApplications = JSON.parse(currentSaved || '[]');
        const addedApplications = Array.isArray(savedApplications)
            ? (isLegacyData ? [...savedApplications].reverse() : savedApplications)
            : [];
        return [...addedApplications, ...applications];
    } catch {
        return applications;
    }
};

const getSalaryBounds = (records) => {
    const salaries = records.flatMap((application) => {
        const amounts = (application.salaryRange || '').match(/[\d,]+(?:\.\d+)?/g) || [];
        const values = amounts.map((amount) => Number(amount.replaceAll(',', '')));
        return /month/i.test(application.salaryRange)
            ? values.map((amount) => amount * 12 / 100000)
            : values;
    });

    if (salaries.length === 0) return { min: 0, max: 0 };

    return {
        min: Math.floor(Math.min(...salaries) * 100) / 100,
        max: Math.ceil(Math.max(...salaries) * 100) / 100,
    };
};

const getOptions = (records, field) => [...new Set(records.map((record) => record[field]).filter(Boolean))]
    .sort((first, second) => first.localeCompare(second));

function Applications() {
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({
        status: '',
        workMode: '',
        location: '',
        employmentType: '',
        salaryMin: '',
        salaryMax: '',
    });
    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [applicationData, setApplicationData] = useState(loadApplications);

    useEffect(() => {
        if (!successMessage) return undefined;

        const timeoutId = window.setTimeout(() => setSuccessMessage(''), 5000);
        return () => window.clearTimeout(timeoutId);
    }, [successMessage]);

    useEffect(() => {
        const addedApplications = applicationData.filter((application) => !SEED_APPLICATION_IDS.has(application.id));
        localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(addedApplications));
    }, [applicationData]);

    const salaryBounds = getSalaryBounds(applicationData);

    const updateApplicationData = (newApplication) => {
        setApplicationData((currentApplications) => [newApplication, ...currentApplications]);
        setShowModal(false);
        setSuccessMessage(`${newApplication.company} application added successfully.`);
    };
    const options = {
        status: getOptions(applicationData, 'status'),
        workMode: getOptions(applicationData, 'workMode'),
        location: getOptions(applicationData, 'location'),
        employmentType: getOptions(applicationData, 'employmentType'),
    };
    const filteredApplications = applicationData.filter((application) => {
        
        const searchText = search.trim().toLowerCase();
        const matchesSearch = !searchText || [application.company, application.role]
            .some((value) => value.toLowerCase().includes(searchText));

        const matchesOptions =
            (filters.status === "" || application.status === filters.status) &&
            (filters.workMode === "" || application.workMode === filters.workMode) &&
            (filters.location === "" || application.location === filters.location) &&
            (filters.employmentType === "" || application.employmentType === filters.employmentType);
    
        const salaryAmounts = (application.salaryRange || '').match(/[\d,]+(?:\.\d+)?/g) || [];
        const salaryValues = salaryAmounts.map((amount) => Number(amount.replaceAll(',', '')));
        const salaryInLpa = /month/i.test(application.salaryRange)
            ? salaryValues.map((amount) => amount * 12 / 100000)
            : salaryValues;
        const applicationMin = Math.min(...salaryInLpa);
        const applicationMax = Math.max(...salaryInLpa);
        const selectedMin = filters.salaryMin === '' ? -Infinity : Number(filters.salaryMin);
        const selectedMax = filters.salaryMax === '' ? Infinity : Number(filters.salaryMax);
        const matchesSalary = salaryInLpa.length === 0 || (applicationMax >= selectedMin && applicationMin <= selectedMax);

        return matchesSearch && matchesOptions && matchesSalary;
    });

    const updateFilter = (field, value) => {
        setFilters({
         ...filters,
         [field]: value
       });
    };

    const resetFilters = () => setFilters({
        status: '',
        workMode: '',
        location: '',
        employmentType: '',
        salaryMin: '',
        salaryMax: '',
    });

    return(
        <div >
            {successMessage && <div className="success-toast" role="status" aria-live="polite">{successMessage}</div>}
            <div className="applications-header-container">
        <h1 className="applications-header">Applications</h1>
        <button className="add-application-btn" onClick={() => setShowModal(true)}>
            Add Application
            </button>
        </div>
        {showModal && (
            <div className="modal-overlay" onClick={() => setShowModal(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <AddModal onAddApplication={updateApplicationData} onClose={() => setShowModal(false)} />
                </div>
            </div>
        )}
        <div className="applications-functionality">
           <div className="application-search">
            <SearchBar value={search} onChange={setSearch} />
           </div>
           <div className="application-filter">
                     <Filterbar
                         filters={filters}
                         options={options}
                         salaryBounds={salaryBounds}
                         onChange={updateFilter}
                         onReset={resetFilters}
                     />
          </div>
        </div>
        <div className="applications-container">
         {filteredApplications.map((app) => (
          <ApplicationCard key={app.id} application={app} />
         ))}
         {filteredApplications.length === 0 && <p className="no-applications">No applications match these filters.</p>}
        </div>


        </div>
    )
}
export default Applications