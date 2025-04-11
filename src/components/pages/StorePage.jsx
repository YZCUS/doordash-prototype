import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { Input } from '@/components/ui/Input.jsx';
import { Search, ChevronLeft, MinusCircle, PlusCircle } from 'lucide-react';
import { parsePrice } from '../../utils/helpers'; // Corrected path to helpers

// --- Store Page Item Component (Internal to StorePage) ---
function StoreMenuItem({ item, addToCart }) {
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        const itemToAdd = { ...item, priceValue: parsePrice(item.price) };
        addToCart(itemToAdd, quantity);
        // Optional: Add feedback like a toast notification
    };

    return (
        <Card key={item.id} className="p-0 shadow-sm rounded-xl overflow-hidden">
            <CardContent className="flex justify-between items-center p-4">
                <div className="flex-grow mr-4">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <span className="text-sm font-semibold">{item.price}</span>
                </div>
                <div className="flex flex-col items-end gap-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 rounded-full p-0"
                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                            aria-label="Decrease quantity"
                        >
                            <MinusCircle className="w-4 h-4" />
                        </Button>
                        <span className="text-sm font-medium w-6 text-center">{quantity}</span>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 rounded-full p-0"
                            onClick={() => setQuantity(q => q + 1)}
                            aria-label="Increase quantity"
                        >
                            <PlusCircle className="w-4 h-4" />
                        </Button>
                    </div>
                    {/* Add to Cart Button */}
                    <Button size="xs" className="rounded-full px-3" onClick={handleAddToCart}>
                        Add {quantity} to Cart
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

// --- Store Page Component ---
export default function StorePage({ shopName, navigateTo, addToCart }) {
    const decodedShopName = shopName ? decodeURIComponent(shopName) : "Store";

    // Mock menu items (replace with actual data fetching based on shopName)
    const menuItems = [
        { id: "m1", name: "Classic Burger", description: "Beef patty, lettuce, tomato, cheese", price: "$9.99", storeName: decodedShopName },
        { id: "m2", name: "Crispy Fries", description: "Golden fried potato sticks", price: "$3.49", storeName: decodedShopName },
        { id: "m3", name: "House Salad", description: "Mixed greens, vinaigrette", price: "$5.95", storeName: decodedShopName },
        { id: "m4", name: "Iced Lemon Tea", description: "Chilled black tea with lemon", price: "$2.99", storeName: decodedShopName },
        { id: "m5", name: "Chocolate Cake", description: "Rich moist chocolate dessert", price: "$4.50", storeName: decodedShopName },
    ];

    // Mock categories (replace with actual data or derive from menu items)
    const categories = ["Popular", "Appetizers", "Main Course", "Drinks", "Desserts"];

    const [searchTerm, setSearchTerm] = useState('');

    // Filter menu items based on search term
    const filteredMenuItems = menuItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-4">
            {/* Header with Back Button and Store Name */}
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => navigateTo('home')} aria-label="Back to Home">
                    <ChevronLeft className="w-5 h-5" />
                </Button>
                <h2 className="text-xl font-bold">{decodedShopName}</h2>
            </div>

            {/* Search Input */}
            <div className="relative">
                <Input
                    type="text"
                    placeholder={`Search ${decodedShopName}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-full px-10 py-2 text-sm"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* Category Filter Buttons */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((cat, idx) => (
                    <Button key={idx} variant="outline" size="xs" className="whitespace-nowrap rounded-full">
                        {cat}
                    </Button>
                ))}
            </div>

            {/* Menu Items List */}
            <div className="space-y-3">
                {filteredMenuItems.length > 0 ? (
                    filteredMenuItems.map((item) => (
                        <StoreMenuItem key={item.id} item={item} addToCart={addToCart} />
                    ))
                ) : (
                    <p className="text-center text-gray-500 py-4">No menu items match your search.</p>
                )}
            </div>
        </div>
    );
} 