import { useState } from 'react'
import { Button } from '@/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card'
import { Input } from '@/components/input'
import { Label } from '@/components/label'

export default function PatientProfile() {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-01-15',
    address: '123 Main St, City, State 12345',
    emergencyContact: 'Jane Doe - +1 (555) 987-6543',
    insuranceProvider: 'HealthPlus Insurance',
    insuranceNumber: 'HP123456789',
    medicalHistory: 'No known allergies. Previous surgery: Appendectomy (2015)',
    currentMedications: 'None'
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    // Handle profile update logic here
    setIsEditing(false)
    alert('Profile updated successfully!')
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form data to original values
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
        <p className="mt-2 text-gray-600">Manage your personal information and medical details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Your basic personal details
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                {isEditing && (
                  <div className="flex space-x-4">
                    <Button onClick={handleSave}>Save Changes</Button>
                    <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Medical Information */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Medical Information</CardTitle>
              <CardDescription>
                Your medical details and history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Insurance Provider</Label>
                  <p className="text-sm text-gray-600 mt-1">{formData.insuranceProvider}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Insurance Number</Label>
                  <p className="text-sm text-gray-600 mt-1">{formData.insuranceNumber}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Medical History</Label>
                  <p className="text-sm text-gray-600 mt-1">{formData.medicalHistory}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Current Medications</Label>
                  <p className="text-sm text-gray-600 mt-1">{formData.currentMedications}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  Update Insurance
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Download Medical Records
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
