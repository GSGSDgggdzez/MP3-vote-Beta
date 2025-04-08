'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock, Mail, AlertCircle } from "lucide-react";

// Mock credentials for testing
const MOCK_CREDENTIALS = {
  email: 'scrutineer@example.com',
  password: 'password123'
};

export default function ScrutineerAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check against mock credentials
    if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
      // Store mock auth data in localStorage to simulate session
      localStorage.setItem('scrutineerAuth', JSON.stringify({
        isAuthenticated: true,
        user: {
          id: 'mock-id-123',
          name: 'John Doe',
          email: MOCK_CREDENTIALS.email,
          polling_station: 'Yaoundé Central Station 42'
        }
      }));
      
      // Redirect to dashboard
      router.push('/scrutineer/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-green-800 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Scrutineer Portal</h1>
            <p className="text-muted-foreground">
              Secure access for election officials
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
              <CardDescription>
                Enter your credentials to access the scrutineer portal
                <span className="block text-xs text-green-700 mt-1">
                  (Use email: scrutineer@example.com and password: password123)
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link 
                      href="/scrutineer/forgot-password"
                      className="text-xs text-green-700 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-green-800 hover:bg-green-700" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-6">
              <p className="text-sm text-muted-foreground">
                Need help? Contact{' '}
                <a href="mailto:support@mp3vote.cm" className="text-green-700 hover:underline">
                  support@mp3vote.cm
                </a>
              </p>
            </CardFooter>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
