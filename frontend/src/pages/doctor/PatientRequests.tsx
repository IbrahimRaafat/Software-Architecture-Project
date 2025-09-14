import { useState } from 'react'
import { Button } from '@/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card'

interface PatientRequest {
  id: string
  patientName: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: string
  reason: string
  notes: string
  status: 'pending' | 'approved' | 'rejected'
}

export default function PatientRequests() {
  const [requests, setRequests] = useState<PatientRequest[]>([
    {
      id: '1',
      patientName: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      preferredDate: '2024-01-20',
      preferredTime: '10:00',
      reason: 'Routine Checkup',
      notes: 'Annual physical examination',
      status: 'pending'
    },
    {
      id: '2',
      patientName: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+1 (555) 234-5678',
      preferredDate: '2024-01-21',
      preferredTime: '14:00',
      reason: 'Follow-up Visit',
      notes: 'Follow-up for blood pressure medication',
      status: 'pending'
    },
    {
      id: '3',
      patientName: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      phone: '+1 (555) 345-6789',
      preferredDate: '2024-01-22',
      preferredTime: '09:00',
      reason: 'Consultation',
      notes: 'New patient consultation for chest pain',
      status: 'pending'
    }
  ])

  const handleApprove = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'approved' as const } : req
    ))
  }

  const handleReject = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'rejected' as const } : req
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Patient Requests</h2>
        <p className="mt-2 text-gray-600">Review and manage appointment requests from patients</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {requests.map((request) => (
          <Card key={request.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{request.patientName}</CardTitle>
                  <CardDescription>
                    {request.email} • {request.phone}
                  </CardDescription>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-gray-900 mb-2">Appointment Details</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><span className="font-medium">Date:</span> {new Date(request.preferredDate).toLocaleDateString()}</p>
                    <p><span className="font-medium">Time:</span> {request.preferredTime}</p>
                    <p><span className="font-medium">Reason:</span> {request.reason}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-gray-900 mb-2">Notes</h4>
                  <p className="text-sm text-gray-600">{request.notes}</p>
                </div>
              </div>
              
              {request.status === 'pending' && (
                <div className="flex space-x-3 mt-4">
                  <Button 
                    onClick={() => handleApprove(request.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Approve
                  </Button>
                  <Button 
                    onClick={() => handleReject(request.id)}
                    variant="outline"
                    className="border-red-300 text-red-700 hover:bg-red-50"
                  >
                    Reject
                  </Button>
                  <Button variant="outline">
                    View Patient History
                  </Button>
                </div>
              )}
              
              {request.status === 'approved' && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm text-green-800">
                    ✓ Appointment approved. Patient has been notified.
                  </p>
                </div>
              )}
              
              {request.status === 'rejected' && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-800">
                    ✗ Appointment rejected. Patient has been notified.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {requests.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No pending patient requests at this time.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
