import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Button } from '@/components/button'

export default function DoctorDashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-semibold text-gray-900">Doctor Portal</h1>
              <nav className="hidden md:flex space-x-8">
                <Link to="/doctor/dashboard" className="text-gray-500 hover:text-gray-900">
                  Dashboard
                </Link>
                <Link to="/doctor/patientRequests" className="text-gray-500 hover:text-gray-900">
                  Patient Requests
                </Link>
                <Link to="/doctor/confirmedPatients" className="text-gray-500 hover:text-gray-900">
                  Confirmed Patients
                </Link>
              </nav>
            </div>
            <div className="flex items-center">
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
