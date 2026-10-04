import applications from '../data/application.js'

const APPLICATIONS_STORAGE_KEY = 'jobtrack-added-applications-v2';
export const loadApplications = () => {

    try{
        const currentSaved = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
        const addedApplications = currentSaved
      ? JSON.parse(currentSaved)
      : [];

    return Array.isArray(addedApplications)
      ? [...addedApplications, ...applications]
      : applications;

    }catch{
        return applications;
    }
}