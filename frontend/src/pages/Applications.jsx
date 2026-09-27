import { useState } from 'react';
import applications from '../data/application.js'
import ApplicationCard from '../components/ApplicationCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import Filterbar from '../components/Filterbar.jsx';
import '../styles/PagesStyles/ApplicationsPage.css'

const getSalaryBounds = (records) => {
    const salaries = records.flatMap((application) => {
        const amounts = application.salaryRange.match(/[\d,]+(?:\.\d+)?/g) || [];
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
    const salaryBounds = getSalaryBounds(applications);
    const options = {
        status: getOptions(applications, 'status'),
        workMode: getOptions(applications, 'workMode'),
        location: getOptions(applications, 'location'),
        employmentType: getOptions(applications, 'employmentType'),
    };
    const filteredApplications = applications.filter((application) => {
        const searchText = search.trim().toLowerCase();
        const matchesSearch = !searchText || [application.company, application.role]
            .some((value) => value.toLowerCase().includes(searchText));
        const matchesOptions = ['status', 'workMode', 'location', 'employmentType']
            .every((field) => !filters[field] || application[field] === filters[field]);
        const salaryAmounts = application.salaryRange.match(/[\d,]+(?:\.\d+)?/g) || [];
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
        <h1 className="applications-header">Applications</h1>
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