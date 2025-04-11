import React, { useState } from 'react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { LogIn } from 'lucide-react';

// LoginPage Component
export default function LoginPage({ navigateTo }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // For displaying mock errors

    const handleLogin = (e) => {
        e.preventDefault(); // Prevent default form submission
        setError(''); // Clear previous errors

        // --- MOCK AUTHENTICATION (ALWAYS SUCCEEDS) ---
        console.log("Mock Login Attempt with:", email);
        // In a real app, you would perform actual authentication here.
        // If successful:
        navigateTo('home');
        // If failed:
        // setError("Invalid email or password.");
        // --- END MOCK ---
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardContent>
                    <div className="text-center mb-6">
                        <LogIn className="mx-auto h-10 w-10 text-red-500 mb-2" />
                        <h2 className="text-2xl font-bold">Welcome Back!</h2>
                        <p className="text-sm text-gray-500">Log in to continue ordering.</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <Label htmlFor="login-email">Email</Label>
                            <Input
                                id="login-email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            // Removed 'required' for prototype ease
                            // In a real app, consider adding back: required
                            />
                        </div>
                        <div>
                            <Label htmlFor="login-password">Password</Label>
                            <Input
                                id="login-password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            // Removed 'required' for prototype ease
                            // In a real app, consider adding back: required
                            />
                        </div>
                        {error && (
                            <p className="text-xs text-red-600 text-center">{error}</p>
                        )}
                        <Button type="submit" className="w-full">
                            Log In
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don't have an account?{' '}
                        <Button variant="link" size="sm" onClick={() => navigateTo('signup')}>
                            Sign Up
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 