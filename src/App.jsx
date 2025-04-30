import React, { useState } from "react";
import {
    MapPin,
    ShoppingCart,
    DollarSign,
    Home,
    Heart,
    Clock,
    Settings,
    ThumbsUp,
    Store,
    ChevronRight,
    Search,
    User,
    CreditCard,
    Bell,
    LogOut,
    Trash2,
    RefreshCw,
    ChevronLeft,
    PlusCircle,
    MinusCircle,
    CheckCircle,
    XCircle,
    Printer,
    FileText,
    LogIn, // Added for Login
    UserPlus // Added for Signup
} from "lucide-react";
import { parsePrice } from './utils/helpers';

// Layout Imports
import TopBar from './components/layout/TopBar';
import BottomNavBar from './components/layout/BottomNavBar';

// Navigation Import
import AppNavigator from './navigation/AppNavigator';

// --- Main App Component ---
export default function DoorDashPrototype() {
    // State for navigation and app data
    const [currentPage, setCurrentPage] = useState('login'); // 'login', 'signup', 'home', etc.
    const [currentStore, setCurrentStore] = useState(null); // Holds data for the store page, e.g., { shopName: 'Encoded Name' }
    const [currentOrderDetails, setCurrentOrderDetails] = useState(null); // Holds data for summary/receipt pages
    const [mode, setMode] = useState("delivery"); // 'delivery' or 'pickup'
    const [balance] = useState(24.50); // User's mock balance
    const [selectedAddress, setSelectedAddress] = useState("Home"); // Currently selected delivery address
    const addresses = ["Home", "Work", "123 Main St", "Office"]; // Mock addresses list
    const [cart, setCart] = useState([]); // Shopping cart state

    // --- Cart Management Functions ---
    // Adds an item to the cart, handling existing items and different stores
    const addToCart = (item, quantity) => {
        console.log(`[addToCart] Called with item ID: ${item.id}, quantity: ${quantity}`);
        setCart(prevCart => {
            console.log(`  [addToCart] Inside updater. Prev cart:`, JSON.stringify(prevCart));
            if (!item.storeName) {
                console.error("  [addToCart] Attempted to add item without storeName:", item);
                return prevCart; // Don't add item if storeName is missing
            }
            const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);

            if (existingItemIndex > -1) {
                console.log(`  [addToCart] Item found at index ${existingItemIndex}. Current quantity: ${prevCart[existingItemIndex].quantity}. Adding: ${quantity}`);
                // Item already exists, update quantity (Revert to additive logic)
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex].quantity += quantity;
                console.log(`  [addToCart] New quantity: ${updatedCart[existingItemIndex].quantity}. Updated cart:`, JSON.stringify(updatedCart));
                return updatedCart;
            } else {
                console.log(`  [addToCart] Item not found. Adding new item.`);
                // New item, check if it's from the same store
                if (prevCart.length > 0 && prevCart[0].storeName !== item.storeName) {
                    // Item from a different store, replace the current cart
                    console.warn("  [addToCart] Added item from different store. Replacing cart.");
                    // Ensure priceValue is parsed before adding
                    const itemToAdd = { ...item, priceValue: parsePrice(item.price), quantity };
                    console.log(`  [addToCart] New cart (replaced):`, JSON.stringify([itemToAdd]));
                    return [itemToAdd];
                }
                // Cart is empty or item is from the same store, add the new item
                const itemToAdd = { ...item, priceValue: parsePrice(item.price), quantity };
                const newCart = [...prevCart, itemToAdd];
                console.log(`  [addToCart] New cart (appended):`, JSON.stringify(newCart));
                return newCart;
            }
        });
    };

    // Updates the quantity of an item in the cart, removes if quantity <= 0
    const updateCartQuantity = (itemId, newQuantity) => {
        setCart(prevCart => {
            if (newQuantity <= 0) {
                // Remove item if quantity is zero or less
                return prevCart.filter(item => item.id !== itemId);
            } else {
                // Update quantity for the specific item
                return prevCart.map(item =>
                    item.id === itemId ? { ...item, quantity: newQuantity } : item
                );
            }
        });
    };

    // Removes an item from the cart entirely
    const removeFromCart = (itemId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    };

    // Clears all items from the cart
    const clearCart = () => {
        setCart([]);
    };
    // --- End Cart Management ---

    // Mock data (Consider moving this to a separate file or context/state management library later)
    const orderCategories = ["Alcohol", "Convenience", "Grocery", "Flower", "Bakery", "Pharmacy", "Pet Supplies", "Snacks", "Ice Cream", "Water"];
    const cuisineCategories = ["Sushi", "Pizza", "Thai", "Ramen", "Chinese", "Bubble Tea", "Mexican", "Indian", "Korean", "Burgers", "BBQ", "Salads"];
    const promotionalAds = ["Enjoy 20% Off Your First Three Orders! 🍔🍕🥤", "Free Delivery for Orders Over $25 This Week! 🚚💨", "Get $10 Credit for Referring a Friend! 👯‍♀️💵", "Limited Time: BOGO on Select Restaurants! 🥡🍱", "Order Now and Win a $100 Gift Card! 🎁🎉"];
    const popularStores = [{ name: "Panda Express", type: "Chinese", price: "$$", distance: "1.2 mi" }, { name: "Starbucks", type: "Coffee", price: "$", distance: "0.5 mi" }, { name: "Domino's Pizza", type: "Pizza", price: "$$", distance: "1.8 mi" }, { name: "Subway", type: "Sandwiches", price: "$", distance: "1.0 mi" }];
    const recentOrders = [{ store: "Taco Town", price: "$14.99", date: "Apr 3" }, { store: "Pizza Palace", price: "$22.50", date: "Mar 30" }, { store: "Sushi Go", price: "$18.75", date: "Mar 28" }, { store: "Burger Barn", price: "$12.40", date: "Mar 25" }];
    const guessYouLike = [{ name: "Grill House", type: "BBQ", price: "$$$", distance: "2.3 mi" }, { name: "Curry Express", type: "Indian", price: "$$", distance: "1.6 mi" }, { name: "Smoothie Stop", type: "Juice Bar", price: "$", distance: "0.9 mi" }, { name: "Noodle Bowl", type: "Asian Fusion", price: "$$", distance: "1.4 mi" }];

    // Toggles between delivery and pickup mode
    const toggleMode = () => setMode(mode === "pickup" ? "delivery" : "pickup");

    // Navigation function passed to child components
    const navigateTo = (page, data = null) => {
        const validPages = ['login', 'signup', 'home', 'recommend', 'history', 'favorites', 'settings', 'cart', 'store', 'popular', 'summary', 'receipt'];
        if (!validPages.includes(page)) {
            console.warn(`Navigation attempt to invalid page: ${page}. Defaulting to login.`);
            page = 'login'; // Default to login if page is invalid
        }

        console.log(`Navigating to: ${page}`, data ? `with data: ${JSON.stringify(data)}` : '');

        // Update state based on the target page
        if (page === 'store') {
            setCurrentStore(data);
            setCurrentOrderDetails(null);
        }
        else if (page === 'summary' || page === 'receipt') {
            setCurrentOrderDetails(data);
            setCurrentStore(null);
        }
        else {
            // Reset store/order details for other pages
            setCurrentStore(null);
            setCurrentOrderDetails(null);
        }

        // Special case: Reset cart if logging out (navigating to login from settings page)
        if (page === 'login' && currentPage === 'settings') {
            console.log("Logging out, clearing cart.");
            clearCart();
        }

        setCurrentPage(page); // Update the current page state
        window.scrollTo(0, 0); // Scroll to top on navigation
    };

    // Calculate total number of items in the cart for the badge
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    // Determine if the user is considered "logged in" (i.e., not on login/signup page)
    const isLoggedIn = currentPage !== 'login' && currentPage !== 'signup';

    return (
        // Apply different layout based on login status
        <div className={`min-h-screen font-sans ${isLoggedIn ? 'bg-gray-50' : ''}`}>
            {/* Conditionally render TopBar only when logged in */}
            {isLoggedIn && (
                <TopBar
                    mode={mode}
                    toggleMode={toggleMode}
                    balance={balance}
                    selectedAddress={selectedAddress}
                    setSelectedAddress={setSelectedAddress}
                    addresses={addresses}
                    navigateTo={navigateTo}
                    cartItemCount={cartItemCount}
                />
            )}

            {/* Main content area - Rendered by AppNavigator */}
            <main className={isLoggedIn ? "p-4 pb-24 space-y-4" : ""}>
                <AppNavigator
                    currentPage={currentPage}
                    navigateTo={navigateTo}
                    // Pass all necessary props down to the navigator
                    mode={mode}
                    orderCategories={orderCategories}
                    cuisineCategories={cuisineCategories}
                    promotionalAds={promotionalAds}
                    popularStores={popularStores}
                    recentOrders={recentOrders}
                    guessYouLike={guessYouLike}
                    cart={cart}
                    updateCartQuantity={updateCartQuantity}
                    removeFromCart={removeFromCart}
                    clearCart={clearCart}
                    balance={balance}
                    currentStore={currentStore}
                    addToCart={addToCart}
                    currentOrderDetails={currentOrderDetails}
                />
            </main>

            {/* Conditionally render BottomNavBar only when logged in */}
            {isLoggedIn && (
                <BottomNavBar currentPage={currentPage} navigateTo={navigateTo} />
            )}
        </div>
    );
}
