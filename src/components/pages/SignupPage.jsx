import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { Input } from '@/components/ui/Input.jsx';
import { Label } from '@/components/ui/Label.jsx';
import { UserPlus } from 'lucide-react';

// SignupPage Component
export default function SignupPage({ navigateTo }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // For displaying mock errors

    const handleSignup = (e) => {
        e.preventDefault(); // Prevent default form submission
        setError(''); // Clear previous errors

        // --- MOCK SIGNUP (ALWAYS SUCCEEDS) ---
        console.log("Mock Signup Attempt for:", name, email);
        // In a real app, you would perform actual signup logic here.
        // If successful:
        navigateTo('home');
        // If failed (e.g., email already exists):
        // setError("An account with this email already exists.");
        // --- END MOCK ---
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardContent>
                    <div className="text-center mb-6">
                        <UserPlus className="mx-auto h-10 w-10 text-red-500 mb-2" />
                        <h2 className="text-2xl font-bold">Create Account</h2>
                        <p className="text-sm text-gray-500">Get started with delicious food!</p>
                    </div>
                    <form onSubmit={handleSignup} className="space-y-4">
                        <div>
                            <Label htmlFor="signup-name">Full Name</Label>
                            <Input
                                id="signup-name"
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            // Removed 'required' for prototype ease
                            />
                        </div>
                        <div>
                            <Label htmlFor="signup-email">Email</Label>
                            <Input
                                id="signup-email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            // Removed 'required' for prototype ease
                            />
                        </div>
                        <div>
                            <Label htmlFor="signup-phone">Phone Number</Label>
                            <Input
                                id="signup-phone"
                                type="tel"
                                placeholder="123-456-7890"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            // Removed 'required' for prototype ease
                            />
                        </div>
                        <div>
                            <Label htmlFor="signup-password">Password</Label>
                            <Input
                                id="signup-password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            // Removed 'required' for prototype ease
                            />
                        </div>
                        {error && (
                            <p className="text-xs text-red-600 text-center">{error}</p>
                        )}
                        <Button type="submit" className="w-full">
                            Sign Up
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{' '}
                        <Button variant="link" size="sm" onClick={() => navigateTo('login')}>
                            Log In
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 