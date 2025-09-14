import { useState } from 'react'
import { Button } from '@/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card'
import { Input } from '@/components/input'
import { Label } from '@/components/label'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'doctor' | 'patient'
  status: 'active' | 'inactive' | 'pending'
  lastLogin: string
  createdAt: string
}

export default function UsersManagement() {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Dr. John Smith',
      email: 'john.smith@medicare.com',
      role: 'doctor',
      status: 'active',
      lastLogin: '2024-01-20 10:30',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Jane Doe',
      email: 'jane.doe@email.com',
      role: 'patient',
      status: 'active',
      lastLogin: '2024-01-20 09:15',
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      name: 'Admin User',
      email: 'admin@medicare.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-01-20 08:45',
      createdAt: '2024-01-01'
    },
    {
      id: '4',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@medicare.com',
      role: 'doctor',
      status: 'pending',
      lastLogin: 'Never',
      createdAt: '2024-01-20'
    },
    {
      id: '5',
      name: 'Mike Wilson',
      email: 'mike.wilson@email.com',
      role: 'patient',
      status: 'inactive',
      lastLogin: '2024-01-18 14:20',
      createdAt: '2024-01-05'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showAddUser, setShowAddUser] = useState(false)

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'patient' as 'admin' | 'doctor' | 'patient',
    password: ''
  })

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()
    const user: User = {
      id: (users.length + 1).toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'pending',
      lastLogin: 'Never',
      createdAt: new Date().toISOString().split('T')[0]
    }
    setUsers([...users, user])
    setNewUser({ name: '', email: '', role: 'patient', password: '' })
    setShowAddUser(false)
  }

  const handleStatusChange = (id: string, status: 'active' | 'inactive' | 'pending') => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status } : user
    ))
  }

  const handleDeleteUser = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800'
      case 'doctor': return 'bg-blue-100 text-blue-800'
      case 'patient': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="mt-2 text-gray-600">Manage system users, roles, and permissions</p>
        </div>
        <Button onClick={() => setShowAddUser(true)}>
          Add New User
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search Users</Label>
              <Input
                id="search"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="roleFilter">Filter by Role</Label>
              <select
                id="roleFilter"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
              </select>
            </div>
            <div>
              <Label htmlFor="statusFilter">Filter by Status</Label>
              <select
                id="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('')
                  setRoleFilter('all')
                  setStatusFilter('all')
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add User Modal */}
      {showAddUser && (
        <Card>
          <CardHeader>
            <CardTitle>Add New User</CardTitle>
            <CardDescription>Create a new user account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <select
                    id="role"
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value as 'admin' | 'doctor' | 'patient'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-3">
                <Button type="submit">Add User</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddUser(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
          <CardDescription>Manage user accounts and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Role</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Last Login</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{user.name}</td>
                    <td className="py-3 px-4 text-gray-600">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{user.lastLogin}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <select
                          value={user.status}
                          onChange={(e) => handleStatusChange(user.id, e.target.value as 'active' | 'inactive' | 'pending')}
                          className="text-xs px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="pending">Pending</option>
                        </select>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
