import { Routes, Route } from "react-router";
import Dashboard from '@pages/Dashboard';
import DemographicsChart from '@components/charts/DemographicsChart';
import TrialsPerCityChart from '@components/charts/TrialsPerCityChart';
import LocationChart from '@components/charts/LocationChart';

const DashboardRoute = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="demographics" element={<DemographicsChart />} />
        <Route path="trials-per-city" element={<TrialsPerCityChart />} />
        <Route path="trial-facilities-per-country" element={<LocationChart />} />
        <Route path="*" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default DashboardRoute;
