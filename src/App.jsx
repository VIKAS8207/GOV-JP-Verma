// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProtectedAdminRoute from './components/ProtectedAdminRoute'

// Public Pages
import Portal from './pages/Portal';
import StudentDashboard from './pages/StudentDashboard';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';



// Admin Layout & Pages
import AdminLayout from './layouts/AdminLayout';
import DashboardOverview from './pages/DashboardOverview';
import RegisterDistance from './pages/RegisterDistance';
import StudentList from './components/StudentList'; 
import StudentDatabase from './pages/StudentDatabase'; // <-- NEW IMPORT

import CourseCreation from './pages/CourseCreation';       
import CourseFeeCreation from './pages/CourseFeeCreation'; 

// --- MASTERS IMPORTS ---
import MasterDomain from './pages/MasterDomain';
import Masters from './pages/Masters'; 

// --- REPORTS IMPORTS ---
import CourseWiseReport from './pages/reports/CourseWiseReport';
import TransactionalReport from './pages/reports/TransactionalReport';
import FeeHeadWiseReport from './pages/reports/FeeHeadWiseReport';
import GovtReport from './pages/reports/GovtReport';
import PvtReport from './pages/reports/PvtReport';
import SubFeeHeadReport from './pages/reports/SubFeeHeadReport';

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

        {/* --- Protected Admin Routes (MIDDLEWARE WRAPPER) --- */}
        <Route element={<ProtectedAdminRoute />}></Route>
        
        {/* --- Admin Protected Routes (Wrapped in Layout) --- */}
        <Route element={<AdminLayout />}>
          <Route path="/admin-dashboard" element={<DashboardOverview />} />
          
          {/* Students */}
          <Route path="/admin-dashboard/students" element={<StudentList />} />
          <Route path="/admin-dashboard/students/all" element={<StudentDatabase />} /> {/* <-- NEW ROUTE */}

          <Route path="/admin-dashboard/fees/course-creation" element={<CourseCreation />} />
          <Route path="/admin-dashboard/fees/course-fee-creation" element={<CourseFeeCreation />} />
          
          {/* Reports */}
          <Route path="/admin-dashboard/reports/course-wise" element={<CourseWiseReport />} />
          <Route path="/admin-dashboard/reports/transactional" element={<TransactionalReport />} />
          <Route path="/admin-dashboard/reports/fee-head-wise" element={<FeeHeadWiseReport />} />
          <Route path="/admin-dashboard/reports/govt" element={<GovtReport />} />
          <Route path="/admin-dashboard/reports/pvt" element={<PvtReport />} />
          <Route path="/admin-dashboard/reports/sub-fee-head" element={<SubFeeHeadReport />} />

          {/* Masters */}
          <Route path="/admin-dashboard/masters/domain" element={<MasterDomain />} /> 
          <Route path="/admin-dashboard/masters/registration-buffer" element={<Masters />} />
        </Route>

      </Routes>
    </Router>
  );
}