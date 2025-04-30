import React from 'react';
import { Card, CardContent } from '../ui/Card.jsx';
import { Button } from '../ui/Button.jsx';
import { Store, MapPin } from 'lucide-react'; // Import Store icon

// Popular Nearby Page Component
export default function PopularNearbyPage({ popularStores, navigateTo }) {
    // Use default empty array if popularStores is not provided
    const stores = popularStores || [];

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold mb-3">Popular Nearby</h2>
            {stores.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {stores.map((store) => (
                        <Card
                            key={store.name} // Assuming name is unique for mock data
                            className="p-0 shadow-sm rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => navigateTo('store', { shopName: encodeURIComponent(store.name) })}
                        >
                            <CardContent className="flex items-center gap-4 p-4">
                                {/* Placeholder Image/Icon */}
                                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Store className="w-8 h-8 text-orange-600" />
                                </div>
                                <div className="flex-grow min-w-0">
                                    <h3 className="text-base font-semibold truncate">{store.name}</h3>
                                    <p className="text-sm text-gray-600">{store.type} • {store.price}</p>
                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                        <MapPin className="w-3 h-3 inline-block" /> {store.distance}
                                    </p>
                                </div>
                                {/* Optional: Add favorite button or other actions later */}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 py-6">No popular stores found nearby.</p>
            )}
        </div>
    );
} 