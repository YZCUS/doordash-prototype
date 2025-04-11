import React, { useState } from 'react';
import { Card, CardContent } from '../ui/Card.jsx';
import { Button } from '../ui/Button.jsx';
import { Heart } from 'lucide-react';

// Recommendations Page Component
export default function RecommendationsPage({ navigateTo }) {
    // Mock state for favorited items (replace with actual state management if needed)
    const [favorites, setFavorites] = useState({});

    // Mock recommended shops data (replace with actual data fetching)
    const recommendedShops = [
        { id: "rec1", name: "Avocado Toasties", type: "Brunch • $$", distance: "1.1 mi", imgSeed: 10 },
        { id: "rec2", name: "Daily Smoothies", type: "Juice • $", distance: "0.6 mi", imgSeed: 20 },
        { id: "rec3", name: "Green Garden", type: "Salads • $", distance: "0.8 mi", imgSeed: 30 },
        { id: "rec4", name: "Pasta Prime", type: "Italian • $$$", distance: "2.0 mi", imgSeed: 40 },
        { id: "rec5", name: "Café Bloom", type: "Coffee • $$", distance: "1.3 mi", imgSeed: 50 },
        { id: "rec6", name: "Hot Buns Bakery", type: "Bakery • $$", distance: "1.4 mi", imgSeed: 60 },
        { id: "rec7", name: "Fiesta Grill", type: "Mexican • $$", distance: "1.5 mi", imgSeed: 70 },
        { id: "rec8", name: "Tokyo Express", type: "Sushi • $$$", distance: "2.1 mi", imgSeed: 80 },
    ];

    const toggleFavorite = (shopId) => {
        setFavorites(prev => ({ ...prev, [shopId]: !prev[shopId] }));
        // Optionally, add API call here to update persistent favorite status
    };

    return (
        <div className="space-y-3">
            <h2 className="text-xl font-bold mb-2">Recommendations For You</h2>
            {recommendedShops.length > 0 ? (
                recommendedShops.map((shop) => (
                    <Card key={shop.id} className="p-0 shadow-sm rounded-xl overflow-hidden">
                        <CardContent className="flex items-center gap-4 p-4">
                            <img
                                src={`https://placehold.co/80x80/EBF4FF/7F9CF5?text=${shop.name.substring(0, 1)}`}
                                alt={shop.name}
                                className="rounded-lg w-16 h-16 object-cover flex-shrink-0"
                                onError={(e) => e.target.src = `https://placehold.co/80x80/EBF4FF/7F9CF5?text=${shop.name.substring(0, 1)}`} // Fallback placeholder
                            />
                            <div className="flex-grow min-w-0">
                                <h3 className="text-base font-semibold truncate">{shop.name}</h3>
                                <p className="text-sm text-gray-600">{shop.type}</p>
                                <p className="text-xs text-gray-500">{shop.distance}</p>
                            </div>
                            <div className="ml-auto flex flex-col gap-2 items-center flex-shrink-0">
                                <Button
                                    onClick={() => navigateTo('store', { shopName: encodeURIComponent(shop.name) })}
                                    size="xs"
                                    className="bg-red-500 text-white rounded-full hover:bg-red-600 text-center w-full whitespace-nowrap"
                                >
                                    Order Now
                                </Button>
                                <Heart
                                    className={`w-5 h-5 cursor-pointer ${favorites[shop.id] ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-red-400'}`}
                                    onClick={() => toggleFavorite(shop.id)}
                                    aria-label={favorites[shop.id] ? "Remove from Favorites" : "Add to Favorites"}
                                />
                            </div>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <p className="text-center text-gray-500 py-4">No recommendations available right now.</p>
            )}
        </div>
    );
} 