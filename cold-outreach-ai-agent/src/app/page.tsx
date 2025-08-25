'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Home() {
  const [outreachData, setOutreachData] = useState({
    name: '',
    email: '',
    message: '',
    type: 'email' as 'email' | 'call' | 'message' | 'linkedin'
  })

  const [campaigns] = useState([
    { id: 1, name: 'Tech Startup Outreach', status: 'active', sent: 150, responses: 23 },
    { id: 2, name: 'SaaS Decision Makers', status: 'paused', sent: 89, responses: 12 },
    { id: 3, name: 'E-commerce Leads', status: 'completed', sent: 200, responses: 45 }
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Outreach data:', outreachData)
  }

  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AI-Powered Cold Outreach Dashboard
        </h1>
        <p className="text-gray-600">
          Automate your cold calls, emails, messages, and prospecting with AI
        </p>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="outreach">New Outreach</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Outreach</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18.2%</div>
                <p className="text-xs text-muted-foreground">+2.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">3 scheduled for today</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest outreach activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email sent to John Doe</p>
                    <p className="text-sm text-gray-500">Tech Startup Outreach campaign</p>
                  </div>
                  <Badge variant="outline">2 min ago</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">LinkedIn message to Sarah Smith</p>
                    <p className="text-sm text-gray-500">SaaS Decision Makers campaign</p>
                  </div>
                  <Badge variant="outline">5 min ago</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Cold call scheduled with Mike Johnson</p>
                    <p className="text-sm text-gray-500">E-commerce Leads campaign</p>
                  </div>
                  <Badge variant="outline">10 min ago</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outreach" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Outreach</CardTitle>
              <CardDescription>
                Set up a new cold outreach campaign with AI-powered personalization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Contact Name</label>
                    <Input
                      placeholder="Enter contact name"
                      value={outreachData.name}
                      onChange={(e) => setOutreachData({...outreachData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email Address</label>
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      value={outreachData.email}
                      onChange={(e) => setOutreachData({...outreachData, email: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Outreach Type</label>
                  <Select value={outreachData.type} onValueChange={(value: any) => setOutreachData({...outreachData, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select outreach type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="call">Cold Call</SelectItem>
                      <SelectItem value="message">Direct Message</SelectItem>
                      <SelectItem value="linkedin">LinkedIn Message</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Message Template</label>
                  <Textarea
                    placeholder="Enter your message template (AI will personalize this)"
                    rows={6}
                    value={outreachData.message}
                    onChange={(e) => setOutreachData({...outreachData, message: e.target.value})}
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1">
                    Send Now
                  </Button>
                  <Button type="button" variant="outline" className="flex-1">
                    Schedule for Later
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Campaigns</CardTitle>
              <CardDescription>Manage your outreach campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{campaign.name}</h3>
                      <p className="text-sm text-gray-500">
                        {campaign.sent} sent • {campaign.responses} responses
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={campaign.status === 'active' ? 'default' : campaign.status === 'paused' ? 'secondary' : 'outline'}>
                        {campaign.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Open Rate</span>
                    <span className="font-medium">24.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Response Rate</span>
                    <span className="font-medium">18.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Conversion Rate</span>
                    <span className="font-medium">8.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bounce Rate</span>
                    <span className="font-medium">3.1%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Channel Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Email</span>
                    <span className="font-medium">45% response rate</span>
                  </div>
                  <div className="flex justify-between">
                    <span>LinkedIn</span>
                    <span className="font-medium">32% response rate</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cold Calls</span>
                    <span className="font-medium">28% response rate</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Direct Messages</span>
                    <span className="font-medium">15% response rate</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
