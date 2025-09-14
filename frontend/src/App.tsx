import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Public Pages
import HomePage from './pages/public/HomePage'
import LoginPage from './pages/public/LoginPage'
import RegisterPage from './pages/public/RegisterPage'

// Patient Pages
import PatientDashboard from './pages/patient/PatientDashboard'
import PatientHome from './pages/patient/PatientHome'
import BookAppointment from './pages/patient/BookAppointment'
import PatientProfile from './pages/patient/PatientProfile'

// Doctor Pages
import DoctorDashboard from './pages/doctor/DoctorDashboard'
import DoctorHome from './pages/doctor/DoctorHome'
import PatientRequests from './pages/doctor/PatientRequests'
import ConfirmedPatients from './pages/doctor/ConfirmedPatients'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminHome from './pages/admin/AdminHome'
import UsersManagement from './pages/admin/UsersManagement'
import SystemLogs from './pages/admin/SystemLogs'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Patient Routes */}
        <Route path="/patient" element={<PatientDashboard />}>
          <Route path="dashboard" element={<PatientHome />} />
          <Route path="bookAppointment" element={<BookAppointment />} />
          <Route path="profile" element={<PatientProfile />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Doctor Routes */}
        <Route path="/doctor" element={<DoctorDashboard />}>
          <Route path="dashboard" element={<DoctorHome />} />
          <Route path="patientRequests" element={<PatientRequests />} />
          <Route path="confirmedPatients" element={<ConfirmedPatients />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="dashboard" element={<AdminHome />} />
          <Route path="usersManagement" element={<UsersManagement />} />
          <Route path="systemlogs" element={<SystemLogs />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
