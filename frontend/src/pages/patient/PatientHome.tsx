import { Link } from 'react-router-dom'
import { Button } from '@/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card'

export default function PatientHome() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome to your Patient Dashboard</h2>
        <p className="mt-2 text-gray-600">Manage your healthcare appointments and medical records</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>My Appointments</CardTitle>
            <CardDescription>
              View and manage your appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Schedule new appointments and view upcoming visits with your healthcare providers.
            </p>
            <Link to="/patient/bookAppointment">
              <Button className="w-full">Book Appointment</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medical Records</CardTitle>
            <CardDescription>
              Access your medical history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              View your medical records, test results, prescriptions, and treatment history.
            </p>
            <Button variant="outline" className="w-full">View Records</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Doctors</CardTitle>
            <CardDescription>
              View your healthcare providers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              See information about your doctors, specialists, and healthcare team.
            </p>
            <Button variant="outline" className="w-full">View Doctors</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>
              Manage your personal information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Update your personal information, contact details, and preferences.
            </p>
            <Link to="/patient/profile">
              <Button variant="outline" className="w-full">Edit Profile</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>
              Your next scheduled visits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm">
                <p className="font-medium">Dr. Smith - Cardiology</p>
                <p className="text-gray-600">Tomorrow, 2:00 PM</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Dr. Johnson - General Checkup</p>
                <p className="text-gray-600">Next Friday, 10:00 AM</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">Download Records</Button>
              <Button variant="outline" size="sm" className="w-full">Contact Support</Button>
              <Button variant="outline" size="sm" className="w-full">View Insurance</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
