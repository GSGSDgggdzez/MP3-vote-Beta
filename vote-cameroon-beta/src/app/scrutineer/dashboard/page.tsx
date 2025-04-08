'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ClipboardCheck, 
  LogOut, 
  MapPin, 
  Clock, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  BarChart4,
  FileText
} from "lucide-react";

// Mock data types
interface MockScrutineer {
  id: string;
  name: string;
  email: string;
  polling_station: string;
}

export default function ScrutineerDashboard() {
  const [scrutineer, setScrutineer] = useState<MockScrutineer | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated using localStorage
    const authData = localStorage.getItem('scrutineerAuth');
    
    if (!authData) {
      router.push('/scrutineer/auth');
      return;
    }

    try {
      const parsedData = JSON.parse(authData);
      if (!parsedData.isAuthenticated) {
        router.push('/scrutineer/auth');
        return;
      }
      
      // Set the scrutineer data
      setScrutineer(parsedData.user);
    } catch (error) {
      console.error('Error parsing auth data:', error);
      router.push('/scrutineer/auth');
      return;
    }
    
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    // Clear the mock auth data
    localStorage.removeItem('scrutineerAuth');
    router.push('/scrutineer/auth');
  };

  // Mock data for the dashboard
  const mockPollingStationData = {
    name: 'Yaoundé Central Station 42',
    address: '123 Independence Avenue, Yaoundé',
    region: 'Central',
    voterCount: 1245,
    status: 'Open',
    openTime: '7:00 AM',
    closeTime: '6:00 PM'
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Scrutineer Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {scrutineer?.name || 'Scrutineer'}
            </p>
          </div>
          
          <Button 
            variant="outline" 
            className="mt-4 md:mt-0 border-green-800 text-green-800 hover:bg-green-50"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-green-700" />
                Assigned Station
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium text-lg">{scrutineer?.polling_station || 'Not assigned'}</p>
              <p className="text-sm text-muted-foreground">{mockPollingStationData.address}</p>
              <p className="text-sm text-muted-foreground">{mockPollingStationData.region} Region</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Clock className="mr-2 h-5 w-5 text-green-700" />
                Station Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="font-medium">{mockPollingStationData.status}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Hours: {mockPollingStationData.openTime} - {mockPollingStationData.closeTime}
              </p>
              <p className="text-sm text-muted-foreground">
                Registered Voters: {mockPollingStationData.voterCount}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5 text-green-700" />
                Voter Turnout
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-green-800">
                      42% Turnout
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-green-800">
                      523/{mockPollingStationData.voterCount}
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                  <div style={{ width: "42%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-700"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="actions" className="mb-8">
          <TabsList className="bg-green-50 border border-green-100">
            <TabsTrigger value="actions" className="data-[state=active]:bg-green-800 data-[state=active]:text-white">
              Actions
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-green-800 data-[state=active]:text-white">
              Recent Activity
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="actions" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart4 className="mr-2 h-5 w-5 text-green-700" />
                    Report Results
                  </CardTitle>
                  <CardDescription>
                    Submit vote counts and election results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Submit official vote tallies and results from your assigned polling station.
                  </p>
                  <Button className="w-full bg-green-800 hover:bg-green-700">
                    Submit Results
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
                    Report Issue
                  </CardTitle>
                  <CardDescription>
                    Report problems or irregularities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Report any issues, irregularities, or concerns at your polling station.
                  </p>
                  <Button variant="outline" className="w-full border-amber-500 text-amber-700 hover:bg-amber-50">
                    Report Issue
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="activity" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest events at your polling station
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: '09:15 AM', action: 'Station opened', user: 'Station Manager', icon: <CheckCircle2 className="h-4 w-4 text-green-600" /> },
                    { time: '09:30 AM', action: 'First voter checked in', user: 'You', icon: <Users className="h-4 w-4 text-blue-600" /> },
                    { time: '10:45 AM', action: 'Minor issue reported', user: 'You', icon: <AlertTriangle className="h-4 w-4 text-amber-500" /> },
                    { time: '11:30 AM', action: 'Issue resolved', user: 'Station Manager', icon: <CheckCircle2 className="h-4 w-4 text-green-600" /> },
                    { time: '12:15 PM', action: 'Midday voter count submitted', user: 'You', icon: <FileText className="h-4 w-4 text-blue-600" /> },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start p-3 border-b border-border">
                      <div className="w-20 text-xs text-muted-foreground">{activity.time}</div>
                      <div className="mr-2 mt-0.5">
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">By: {activity.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="bg-green-50">
                <p className="text-xs text-green-800 w-full text-center">
                  All activities are logged and timestamped for transparency
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>Election Information</CardTitle>
            <CardDescription>
              Key details about the current election
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium text-green-800">Election Details</h3>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Election Type:</span> Presidential
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Election Date:</span> October 7, 2023
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Voting Hours:</span> 7:00 AM - 6:00 PM
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-green-800">Important Contacts</h3>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Election Commission:</span> +237 222 233 233
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Technical Support:</span> +237 222 233 234
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Emergency:</span> +237 222 233 235
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
