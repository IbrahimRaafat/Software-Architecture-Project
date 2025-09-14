import { useState } from 'react'
import { Button } from '@/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card'
import { Input } from '@/components/input'
import { Label } from '@/components/label'

export default function BookAppointment() {
  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    time: '',
    reason: '',
    notes: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle appointment booking logic here
    alert('Appointment request submitted successfully!')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Book an Appointment</h2>
        <p className="mt-2 text-gray-600">Schedule a new appointment with your healthcare provider</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointment Details</CardTitle>
          <CardDescription>
            Fill in the details for your appointment request
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="doctor">Select Doctor</Label>
              <select
                id="doctor"
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Choose a doctor</option>
                <option value="dr-smith">Dr. Smith - Cardiology</option>
                <option value="dr-johnson">Dr. Johnson - General Medicine</option>
                <option value="dr-williams">Dr. Williams - Dermatology</option>
                <option value="dr-brown">Dr. Brown - Orthopedics</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Preferred Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Preferred Time</Label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Visit</Label>
              <select
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select reason</option>
                <option value="checkup">Routine Checkup</option>
                <option value="followup">Follow-up Visit</option>
                <option value="consultation">Consultation</option>
                <option value="emergency">Urgent Care</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Any additional information you'd like to share..."
              />
            </div>

            <div className="flex space-x-4">
              <Button type="submit" className="flex-1">
                Book Appointment
              </Button>
              <Button type="button" variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Available Doctors</CardTitle>
          <CardDescription>
            Our healthcare providers and their specialties
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Dr. Smith</h4>
              <p className="text-sm text-gray-600">Cardiology</p>
              <p className="text-xs text-gray-500">Available: Mon-Fri, 9AM-5PM</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Dr. Johnson</h4>
              <p className="text-sm text-gray-600">General Medicine</p>
              <p className="text-xs text-gray-500">Available: Mon-Fri, 8AM-6PM</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Dr. Williams</h4>
              <p className="text-sm text-gray-600">Dermatology</p>
              <p className="text-xs text-gray-500">Available: Tue-Thu, 10AM-4PM</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Dr. Brown</h4>
              <p className="text-sm text-gray-600">Orthopedics</p>
              <p className="text-xs text-gray-500">Available: Mon-Wed-Fri, 9AM-3PM</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
