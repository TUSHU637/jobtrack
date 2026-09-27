import '../styles/ComponentStyle/filterbar.css';
import { FaFilter } from "react-icons/fa6";
import { useState } from 'react';

const Filterbar = ({ filters, options, salaryBounds, onChange, onReset }) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeCount = ['status', 'workMode', 'location', 'employmentType']
    .filter((field) => filters[field]).length + (filters.salaryMin || filters.salaryMax ? 1 : 0);

  return (
    <div className="filterbar">
      <button
        className="filter-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="application-filter-panel"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaFilter aria-hidden="true" />
        <span>Filters{activeCount > 0 ? ` (${activeCount})` : ''}</span>
      </button>
      {isOpen && (
        <div className="filter-panel" id="application-filter-panel">
          {[
            ['status', 'Status'],
            ['workMode', 'Work mode'],
            ['location', 'Location'],
            ['employmentType', 'Employment type'],
          ].map(([field, label]) => (
            <label className="filter-field" key={field}>
              <span>{label}</span>
              <select value={filters[field]} onChange={(event) => onChange(field, event.target.value)}>
                <option value="">Any {label.toLowerCase()}</option>
                {options[field].map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>
          ))}
          <fieldset className="salary-filter">
            <legend>Salary range (LPA)</legend>
            <label className="filter-field">
              <span>Minimum</span>
              <input
                type="number"
                min={salaryBounds.min}
                max={salaryBounds.max}
                step="0.01"
                placeholder={salaryBounds.min.toString()}
                value={filters.salaryMin}
                onChange={(event) => onChange('salaryMin', event.target.value)}
                aria-label="Minimum salary in LPA"
              />
            </label>
            <label className="filter-field">
              <span>Maximum</span>
              <input
                type="number"
                min={salaryBounds.min}
                max={salaryBounds.max}
                step="0.01"
                placeholder={salaryBounds.max.toString()}
                value={filters.salaryMax}
                onChange={(event) => onChange('salaryMax', event.target.value)}
                aria-label="Maximum salary in LPA"
              />
            </label>
            <small>Available range: {salaryBounds.min}–{salaryBounds.max} LPA</small>
          </fieldset>
          <button className="filter-reset" type="button" onClick={onReset} disabled={activeCount === 0}>
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}

export default Filterbar