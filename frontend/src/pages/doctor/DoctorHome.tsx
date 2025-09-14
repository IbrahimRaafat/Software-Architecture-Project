import { Link } from 'react-router-dom'
import { Button } from '@/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card'

export default function DoctorHome() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome to your Doctor Dashboard</h2>
        <p className="mt-2 text-gray-600">Manage your patients, appointments, and medical practice</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Patient Requests</CardTitle>
            <CardDescription>
              New appointment requests from patients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
              <p className="text-sm text-gray-600 mb-4">Pending requests</p>
              <Link to="/doctor/patientRequests">
                <Button className="w-full">View Requests</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Confirmed Patients</CardTitle>
            <CardDescription>
              Your scheduled appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">12</div>
              <p className="text-sm text-gray-600 mb-4">Today's appointments</p>
              <Link to="/doctor/confirmedPatients">
                <Button className="w-full">View Schedule</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Patient Records</CardTitle>
            <CardDescription>
              Access patient medical information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Review and update patient medical records, prescriptions, and treatment plans.
            </p>
            <Button variant="outline" className="w-full">View Records</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>
              Your appointments for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <div>
                  <p className="font-medium text-sm">John Doe</p>
                  <p className="text-xs text-gray-600">9:00 AM - Checkup</p>
                </div>
                <Button size="sm" variant="outline">View</Button>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <div>
                  <p className="font-medium text-sm">Jane Smith</p>
                  <p className="text-xs text-gray-600">10:30 AM - Consultation</p>
                </div>
                <Button size="sm" variant="outline">View</Button>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <div>
                  <p className="font-medium text-sm">Mike Johnson</p>
                  <p className="text-xs text-gray-600">2:00 PM - Follow-up</p>
                </div>
                <Button size="sm" variant="outline">View</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">Add Prescription</Button>
              <Button variant="outline" size="sm" className="w-full">Update Patient Notes</Button>
              <Button variant="outline" size="sm" className="w-full">View Lab Results</Button>
              <Button variant="outline" size="sm" className="w-full">Schedule Follow-up</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
            <CardDescription>
              Your practice overview
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Patients</span>
                <span className="font-medium">156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">This Month</span>
                <span className="font-medium">89</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg. Rating</span>
                <span className="font-medium">4.8/5</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
