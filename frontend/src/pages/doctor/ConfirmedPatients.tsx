import { useState } from 'react'
import { Button } from '@/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card'

interface ConfirmedAppointment {
  id: string
  patientName: string
  email: string
  phone: string
  appointmentDate: string
  appointmentTime: string
  reason: string
  status: 'confirmed' | 'completed' | 'cancelled'
  notes: string
}

export default function ConfirmedPatients() {
  const [appointments, setAppointments] = useState<ConfirmedAppointment[]>([
    {
      id: '1',
      patientName: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      appointmentDate: '2024-01-20',
      appointmentTime: '10:00',
      reason: 'Routine Checkup',
      status: 'confirmed',
      notes: 'Annual physical examination'
    },
    {
      id: '2',
      patientName: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+1 (555) 234-5678',
      appointmentDate: '2024-01-20',
      appointmentTime: '11:30',
      reason: 'Follow-up Visit',
      status: 'confirmed',
      notes: 'Follow-up for blood pressure medication'
    },
    {
      id: '3',
      patientName: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      phone: '+1 (555) 345-6789',
      appointmentDate: '2024-01-20',
      appointmentTime: '14:00',
      reason: 'Consultation',
      status: 'completed',
      notes: 'New patient consultation for chest pain'
    },
    {
      id: '4',
      patientName: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      phone: '+1 (555) 456-7890',
      appointmentDate: '2024-01-21',
      appointmentTime: '09:00',
      reason: 'Routine Checkup',
      status: 'confirmed',
      notes: 'Regular checkup and blood work'
    }
  ])

  const [selectedDate, setSelectedDate] = useState('2024-01-20')

  const handleComplete = (id: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: 'completed' as const } : apt
    ))
  }

  const handleCancel = (id: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: 'cancelled' as const } : apt
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredAppointments = appointments.filter(apt => 
    apt.appointmentDate === selectedDate
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Confirmed Patients</h2>
          <p className="mt-2 text-gray-600">Manage your scheduled appointments</p>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="date" className="text-sm font-medium text-gray-700">
            Select Date:
          </label>
          <input
            id="date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {appointments.filter(apt => apt.status === 'confirmed').length}
              </div>
              <p className="text-sm text-gray-600">Confirmed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {appointments.filter(apt => apt.status === 'completed').length}
              </div>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {appointments.filter(apt => apt.status === 'cancelled').length}
              </div>
              <p className="text-sm text-gray-600">Cancelled</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredAppointments.map((appointment) => (
          <Card key={appointment.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{appointment.patientName}</CardTitle>
                  <CardDescription>
                    {appointment.email} • {appointment.phone}
                  </CardDescription>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-gray-900 mb-2">Appointment Details</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><span className="font-medium">Date:</span> {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                    <p><span className="font-medium">Time:</span> {appointment.appointmentTime}</p>
                    <p><span className="font-medium">Reason:</span> {appointment.reason}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-gray-900 mb-2">Notes</h4>
                  <p className="text-sm text-gray-600">{appointment.notes}</p>
                </div>
              </div>
              
              {appointment.status === 'confirmed' && (
                <div className="flex space-x-3 mt-4">
                  <Button 
                    onClick={() => handleComplete(appointment.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Mark Complete
                  </Button>
                  <Button 
                    onClick={() => handleCancel(appointment.id)}
                    variant="outline"
                    className="border-red-300 text-red-700 hover:bg-red-50"
                  >
                    Cancel
                  </Button>
                  <Button variant="outline">
                    View Patient History
                  </Button>
                  <Button variant="outline">
                    Add Notes
                  </Button>
                </div>
              )}
              
              {appointment.status === 'completed' && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm text-green-800">
                    ✓ Appointment completed successfully.
                  </p>
                </div>
              )}
              
              {appointment.status === 'cancelled' && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-800">
                    ✗ Appointment has been cancelled.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No appointments scheduled for the selected date.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
