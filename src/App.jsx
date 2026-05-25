// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public Pages
import Portal from './pages/Portal';
import StudentDashboard from './pages/StudentDashboard';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';

// Admin Layout & Pages
import AdminLayout from './layouts/AdminLayout';
import DashboardOverview from './pages/DashboardOverview';
import RegisterDistance from './pages/RegisterDistance';
import StudentList from './components/StudentList'; // The table component you made earlier

import CourseCreation from './pages/CourseCreation';       // <-- New Import
import CourseFeeCreation from './pages/CourseFeeCreation'; // <-- New Import

import Masters from './pages/Masters'; // <-- New Import

import CourseWiseReport from './pages/reports/CourseWiseReport';
import TransactionalReport from './pages/reports/TransactionalReport';
import FeeHeadWiseReport from './pages/reports/FeeHeadWiseReport';
import GovtReport from './pages/reports/GovtReport';
import PvtReport from './pages/reports/PvtReport';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<Portal />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-distance" element={<RegisterDistance />} />
        <Route path="/admin" element={<AdminLogin />} />
        
        {/* --- Admin Protected Routes (Wrapped in Layout) --- */}
        <Route element={<AdminLayout />}>
          {/* Because these are nested inside AdminLayout, they will all 
            automatically have the Navigation Bar at the top.
          */}
          <Route path="/admin-dashboard" element={<DashboardOverview />} />
          <Route path="/admin-dashboard/students" element={<StudentList />} />

          <Route path="/admin-dashboard/masters" element={<Masters />} />

          <Route path="/admin-dashboard/fees/course-creation" element={<CourseCreation />} />
          <Route path="/admin-dashboard/fees/course-fee-creation" element={<CourseFeeCreation />} />
          
          {/* Future routes you can build later */}
          {/* <Route path="/admin-dashboard/fees" element={<FeeStructure />} /> */}
          {/* <Route path="/admin-dashboard/reports" element={<Reports />} /> */}
          <Route path="/admin-dashboard/reports/course-wise" element={<CourseWiseReport />} />
          <Route path="/admin-dashboard/reports/transactional" element={<TransactionalReport />} />
          <Route path="/admin-dashboard/reports/fee-head-wise" element={<FeeHeadWiseReport />} />
          <Route path="/admin-dashboard/reports/govt" element={<GovtReport />} />
          <Route path="/admin-dashboard/reports/pvt" element={<PvtReport />} />
        </Route>

      </Routes>
    </Router>
  );
}