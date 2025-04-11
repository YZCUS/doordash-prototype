import React from 'react';
import { MapPin, ShoppingCart, DollarSign, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch';

// Top Bar Component
export default function TopBar({ mode, toggleMode, balance, selectedAddress, setSelectedAddress, addresses, navigateTo, cartItemCount }) {
    return (
        <div className="flex justify-between items-center gap-2 p-4 bg-white shadow-sm sticky top-0 z-20">
            {/* Address Selector */}
            <div className="relative w-30 sm:w-30">
                <select
                    className="w-full appearance-none rounded-full border border-gray-300 bg-white pl-10 pr-8 py-2 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                    value={selectedAddress}
                    onChange={(e) => setSelectedAddress(e.target.value)} // Update selected address state
                >
                    {addresses.map((addr, idx) => (
                        <option key={idx} value={addr}>{addr}</option>
                    ))}
                </select>
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500 pointer-events-none" />
                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Delivery/Pickup Toggle */}
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Delivery</span>
                <Switch checked={mode === 'pickup'} onCheckedChange={toggleMode} />
                <span className="text-sm font-medium">Pickup</span>
            </div>

            {/* Balance and Cart */}
            <div className="flex gap-4 items-center">
                <div className="flex items-center gap-1">
                    <DollarSign className="text-green-600 w-5 h-5" />
                    <span className="text-sm font-semibold text-green-700">{balance.toFixed(2)}</span>
                </div>
                {/* Cart Button with Badge */}
                <Button variant="ghost" size="icon" onClick={() => navigateTo('cart')} aria-label="View Cart" className="relative">
                    <ShoppingCart className="w-6 h-6" />
                    {cartItemCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                            {cartItemCount}
                        </span>
                    )}
                </Button>
            </div>
        </div>
    );
} 