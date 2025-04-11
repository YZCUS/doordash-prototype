import React, { useState } from 'react';
import { Card, CardContent } from '../ui/Card.jsx';
import { Button } from '../ui/Button.jsx';
import { Input } from '../ui/Input.jsx';
import { Label } from '../ui/Label.jsx';
import { Switch } from '../ui/Switch.jsx';
import { User, MapPin, CreditCard, Bell, LogOut } from 'lucide-react';

// Settings Page Component
export default function SettingsPage({ navigateTo }) {
    const [notifications, setNotifications] = useState({
        promos: true,
        orderUpdates: true,
        news: false,
    });

    const handleNotificationChange = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold">Settings</h2>

            {/* Account Section */}
            <Card className="p-0 rounded-xl overflow-hidden shadow-sm">
                <CardContent className="p-4 space-y-3">
                    <h3 className="text-base font-semibold flex items-center gap-2"><User className="w-5 h-5 text-red-600" /> Account</h3>
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>
                    <Button variant="outline" size="sm" className="w-full">Update Profile</Button>
                </CardContent>
            </Card>

            {/* Addresses Section */}
            <Card className="p-0 rounded-xl overflow-hidden shadow-sm">
                <CardContent className="p-4 space-y-3">
                    <h3 className="text-base font-semibold flex items-center gap-2"><MapPin className="w-5 h-5 text-red-600" /> Addresses</h3>
                    <div className="text-sm text-gray-700 p-2 border rounded-md bg-gray-50">Home - 123 Main St...</div>
                    <div className="text-sm text-gray-700 p-2 border rounded-md bg-gray-50">Work - 456 Office Ave...</div>
                    <Button variant="outline" size="sm" className="w-full">Manage Addresses</Button>
                </CardContent>
            </Card>

            {/* Payment Methods Section */}
            <Card className="p-0 rounded-xl overflow-hidden shadow-sm">
                <CardContent className="p-4 space-y-3">
                    <h3 className="text-base font-semibold flex items-center gap-2"><CreditCard className="w-5 h-5 text-red-600" /> Payment Methods</h3>
                    <div className="text-sm text-gray-700 p-2 border rounded-md bg-gray-50">Visa ending in 1234</div>
                    <div className="text-sm text-gray-700 p-2 border rounded-md bg-gray-50">PayPal</div>
                    <Button variant="outline" size="sm" className="w-full">Manage Payment Methods</Button>
                </CardContent>
            </Card>

            {/* Notifications Section */}
            <Card className="p-0 rounded-xl overflow-hidden shadow-sm">
                <CardContent className="p-4 space-y-3">
                    <h3 className="text-base font-semibold flex items-center gap-2"><Bell className="w-5 h-5 text-red-600" /> Notifications</h3>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="promos" className="flex-grow mr-2">Promotions & Offers</Label>
                        <Switch id="promos" checked={notifications.promos} onCheckedChange={() => handleNotificationChange('promos')} />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="orderUpdates" className="flex-grow mr-2">Order Updates</Label>
                        <Switch id="orderUpdates" checked={notifications.orderUpdates} onCheckedChange={() => handleNotificationChange('orderUpdates')} />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="news" className="flex-grow mr-2">News & Announcements</Label>
                        <Switch id="news" checked={notifications.news} onCheckedChange={() => handleNotificationChange('news')} />
                    </div>
                </CardContent>
            </Card>

            {/* Logout Button - Navigates back to login */}
            <Button variant="destructive" size="sm" className="w-full flex items-center gap-2" onClick={() => navigateTo('login')}>
                <LogOut className="w-4 h-4" /> Log Out
            </Button>
        </div>
    );
} 