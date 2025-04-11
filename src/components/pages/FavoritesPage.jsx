import React, { useState } from 'react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Trash2 } from 'lucide-react';

// Favorites Page Component
export default function FavoritesPage({ navigateTo }) {
    // Mock favorite stores data (replace with actual data fetching)
    const [favoriteStores, setFavoriteStores] = useState([
        { id: "fav1", name: "Pasta Prime", type: "Italian • $$$", distance: "2.0 mi", imgSeed: 40 },
        { id: "fav2", name: "Café Bloom", type: "Coffee • $$", distance: "1.3 mi", imgSeed: 50 },
        { id: "fav3", name: "Fiesta Grill", type: "Mexican • $$", distance: "1.5 mi", imgSeed: 70 },
    ]);

    const removeFavorite = (storeId) => {
        setFavoriteStores(prev => prev.filter(store => store.id !== storeId));
        console.log(`Removed favorite: ${storeId}`); // Replace with actual API call if needed
    };

    return (
        <div className="space-y-3">
            <h2 className="text-xl font-bold mb-2">Your Favorites</h2>
            {favoriteStores.length > 0 ? (
                favoriteStores.map((shop) => (
                    <Card key={shop.id} className="p-0 shadow-sm rounded-xl overflow-hidden">
                        <CardContent className="flex items-center gap-4 p-4">
                            <img
                                src={`https://placehold.co/80x80/FFF0F0/CC0000?text=${shop.name.substring(0, 1)}`}
                                alt={shop.name}
                                className="rounded-lg w-16 h-16 object-cover flex-shrink-0"
                                onError={(e) => e.target.src = `https://placehold.co/80x80/FFF0F0/CC0000?text=${shop.name.substring(0, 1)}`} // Fallback placeholder
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
                                <Button
                                    variant="ghost"
                                    size="xs"
                                    className="text-gray-400 hover:text-red-600 p-0"
                                    onClick={() => removeFavorite(shop.id)}
                                    aria-label="Remove from Favorites"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <p className="text-center text-gray-500 py-6">You haven't added any favorites yet.</p>
            )}
        </div>
    );
} 