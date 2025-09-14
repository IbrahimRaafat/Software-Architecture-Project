import { useState } from 'react'
import { Button } from '@/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card'
import { Input } from '@/components/input'
import { Label } from '@/components/label'

interface LogEntry {
  id: string
  timestamp: string
  level: 'info' | 'warning' | 'error' | 'success'
  category: 'authentication' | 'user_management' | 'system' | 'appointment' | 'security'
  message: string
  user: string
  ipAddress: string
}

export default function SystemLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: '1',
      timestamp: '2024-01-20 14:30:25',
      level: 'success',
      category: 'authentication',
      message: 'User login successful',
      user: 'john.smith@medicare.com',
      ipAddress: '192.168.1.100'
    },
    {
      id: '2',
      timestamp: '2024-01-20 14:28:15',
      level: 'info',
      category: 'appointment',
      message: 'New appointment scheduled',
      user: 'jane.doe@email.com',
      ipAddress: '192.168.1.101'
    },
    {
      id: '3',
      timestamp: '2024-01-20 14:25:42',
      level: 'warning',
      category: 'security',
      message: 'Multiple failed login attempts detected',
      user: 'unknown@email.com',
      ipAddress: '192.168.1.200'
    },
    {
      id: '4',
      timestamp: '2024-01-20 14:20:18',
      level: 'info',
      category: 'user_management',
      message: 'New user account created',
      user: 'admin@medicare.com',
      ipAddress: '192.168.1.50'
    },
    {
      id: '5',
      timestamp: '2024-01-20 14:15:33',
      level: 'error',
      category: 'system',
      message: 'Database connection timeout',
      user: 'system',
      ipAddress: '127.0.0.1'
    },
    {
      id: '6',
      timestamp: '2024-01-20 14:10:07',
      level: 'success',
      category: 'authentication',
      message: 'User logout successful',
      user: 'mike.wilson@email.com',
      ipAddress: '192.168.1.102'
    },
    {
      id: '7',
      timestamp: '2024-01-20 14:05:55',
      level: 'info',
      category: 'appointment',
      message: 'Appointment cancelled',
      user: 'sarah.johnson@medicare.com',
      ipAddress: '192.168.1.103'
    },
    {
      id: '8',
      timestamp: '2024-01-20 14:00:12',
      level: 'info',
      category: 'user_management',
      message: 'User profile updated',
      user: 'admin@medicare.com',
      ipAddress: '192.168.1.50'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('')

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.ipAddress.includes(searchTerm)
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter
    const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter
    const matchesDate = !dateFilter || log.timestamp.startsWith(dateFilter)
    
    return matchesSearch && matchesLevel && matchesCategory && matchesDate
  })

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'success': return 'bg-green-100 text-green-800 border-green-200'
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'error': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'authentication': return 'bg-purple-100 text-purple-800'
      case 'user_management': return 'bg-indigo-100 text-indigo-800'
      case 'system': return 'bg-gray-100 text-gray-800'
      case 'appointment': return 'bg-green-100 text-green-800'
      case 'security': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const exportLogs = () => {
    const csvContent = [
      ['Timestamp', 'Level', 'Category', 'Message', 'User', 'IP Address'],
      ...filteredLogs.map(log => [
        log.timestamp,
        log.level,
        log.category,
        log.message,
        log.user,
        log.ipAddress
      ])
    ].map(row => row.join(',')).join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `system-logs-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">System Logs</h2>
          <p className="mt-2 text-gray-600">Monitor system activity and security events</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={exportLogs}>
            Export Logs
          </Button>
          <Button onClick={() => window.location.reload()}>
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="search">Search Logs</Label>
              <Input
                id="search"
                placeholder="Search messages, users, IP..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="levelFilter">Filter by Level</Label>
              <select
                id="levelFilter"
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Levels</option>
                <option value="success">Success</option>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>
            <div>
              <Label htmlFor="categoryFilter">Filter by Category</Label>
              <select
                id="categoryFilter"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="authentication">Authentication</option>
                <option value="user_management">User Management</option>
                <option value="system">System</option>
                <option value="appointment">Appointment</option>
                <option value="security">Security</option>
              </select>
            </div>
            <div>
              <Label htmlFor="dateFilter">Filter by Date</Label>
              <Input
                id="dateFilter"
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('')
                  setLevelFilter('all')
                  setCategoryFilter('all')
                  setDateFilter('')
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Log Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {logs.filter(log => log.level === 'success').length}
              </div>
              <p className="text-sm text-gray-600">Success</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {logs.filter(log => log.level === 'info').length}
              </div>
              <p className="text-sm text-gray-600">Info</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {logs.filter(log => log.level === 'warning').length}
              </div>
              <p className="text-sm text-gray-600">Warnings</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {logs.filter(log => log.level === 'error').length}
              </div>
              <p className="text-sm text-gray-600">Errors</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Logs ({filteredLogs.length})</CardTitle>
          <CardDescription>Real-time system activity and events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Timestamp</th>
                  <th className="text-left py-3 px-4">Level</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-left py-3 px-4">Message</th>
                  <th className="text-left py-3 px-4">User</th>
                  <th className="text-left py-3 px-4">IP Address</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-600">{log.timestamp}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getLevelColor(log.level)}`}>
                        {log.level.charAt(0).toUpperCase() + log.level.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(log.category)}`}>
                        {log.category.replace('_', ' ').charAt(0).toUpperCase() + log.category.replace('_', ' ').slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">{log.message}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{log.user}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 font-mono">{log.ipAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {filteredLogs.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No logs found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
