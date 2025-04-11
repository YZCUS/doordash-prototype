import React, { useState } from 'react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { MapPin, Search, ChevronRight, Store } from 'lucide-react';

// HomePage Component
export default function HomePage({ orderCategories, cuisineCategories, promotionalAds, popularStores, recentOrders, guessYouLike, navigateTo }) {
    const [searchTerm, setSearchTerm] = useState('');

    // Helper component for displaying store/order cards
    const ItemCard = ({ item, color, navigateTo }) => (
        <Card
            key={item.name || item.store} // Use a unique key
            className={`p-2 shadow-sm rounded-xl bg-${color}-50 hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col`}
            onClick={() => item.name && navigateTo('store', { shopName: encodeURIComponent(item.name) })} // Navigate only if it's a store
        >
            <CardContent className="flex flex-col items-center justify-center gap-1 text-center flex-grow p-2">
                <Store className={`w-5 h-5 text-${color}-600 mb-1`} />
                <span className="text-xs font-medium leading-tight">{item.name || item.store}</span>
                {item.type && <span className="text-[10px] text-gray-600">{item.type}</span>}
                {item.price && <span className="text-[10px]">{item.price}</span>}
                {item.distance && <span className="text-[10px] text-gray-500">{item.distance}</span>}
                {item.date && <span className="text-[10px] text-gray-500">{item.date}</span>}
            </CardContent>
        </Card>
    );

    return (
        <>
            {/* Search and Filter Bar */}
            <div className="flex items-center gap-2 relative">
                <Input
                    type="text"
                    placeholder="Search restaurants or items"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="rounded-full shadow pl-10 pr-4 py-2 border w-full"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <Button variant="outline" size="icon" className="rounded-full p-2" aria-label="Filter by location">
                    <MapPin className="w-5 h-5" />
                </Button>
            </div>

            {/* Order Categories */}
            <h2 className="font-semibold text-sm mt-4 mb-1">Get Essentials</h2>
            <div className="overflow-x-auto pb-2 -mx-4 px-4">
                <div className="flex gap-3 w-max">
                    {orderCategories.map((cat) => (
                        <Card key={cat} className="min-w-[100px] rounded-2xl shadow-sm bg-red-50 hover:shadow-md transition-shadow cursor-pointer">
                            <CardContent className="p-3 text-center">
                                <span className="text-xs font-semibold text-red-800">{cat}</span>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Cuisine Categories */}
            <h2 className="font-semibold text-sm mt-3 mb-1">Explore Cuisines</h2>
            <div className="overflow-x-auto pb-2 -mx-4 px-4">
                <div className="flex gap-3 w-max">
                    {cuisineCategories.map((cuisine) => (
                        <Card key={cuisine} className="min-w-[100px] rounded-2xl shadow-sm bg-yellow-50 hover:shadow-md transition-shadow cursor-pointer">
                            <CardContent className="p-3 text-center">
                                <span className="text-xs font-semibold text-yellow-900">{cuisine}</span>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Promotional Ads */}
            <div className="overflow-x-auto pb-2 -mx-4 px-4">
                <div className="flex gap-4 w-max">
                    {promotionalAds.map((ad, index) => (
                        <div key={index} className="h-36 min-w-[280px] rounded-2xl bg-gradient-to-r from-red-200 to-yellow-200 shadow-lg p-5 flex flex-col justify-center text-left text-base font-bold text-red-900">
                            {ad}
                        </div>
                    ))}
                </div>
            </div>

            {/* Store/Order Sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                {[
                    { title: "Popular Nearby", data: popularStores, color: 'orange', link: 'popular' },
                    { title: "Recent Orders", data: recentOrders, color: 'green', link: 'history' },
                    { title: "Guess You Like", data: guessYouLike, color: 'purple', link: 'recommend' },
                ].map(({ title, data, color, link }, index) => (
                    <div className="space-y-2 h-full flex flex-col" key={index}>
                        <div className="flex justify-between items-center">
                            <h2 className="font-bold text-sm">{title}</h2>
                            <Button variant="link" size="sm" onClick={() => navigateTo(link)} className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1 p-0 h-auto">
                                View more <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-3 flex-grow">
                            {data.slice(0, 4).map((item) => (
                                <ItemCard key={item.name || item.store} item={item} color={color} navigateTo={navigateTo} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
} 