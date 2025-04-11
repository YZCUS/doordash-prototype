import React from 'react';
import {
    Home,
    ThumbsUp,
    Clock,
    Heart,
    Settings
} from 'lucide-react';

// Bottom Nav Bar Component
export default function BottomNavBar({ currentPage, navigateTo }) {
    const navItems = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'recommend', label: 'Recommend', icon: ThumbsUp },
        { id: 'history', label: 'History', icon: Clock },
        { id: 'favorites', label: 'Favorites', icon: Heart },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around py-2 z-10">
            {navItems.map(item => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => navigateTo(item.id)}
                        className={`flex flex-col items-center text-xs focus:outline-none ${isActive ? 'text-red-600' : 'text-gray-500 hover:text-red-500'}`}
                        aria-current={isActive ? 'page' : undefined}
                    >
                        <Icon className="w-6 h-6 mb-0.5" />
                        <span>{item.label}</span>
                    </button>
                );
            })}
        </div>
    );
} 