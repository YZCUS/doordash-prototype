import React, { useState, useEffect } from "react";
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

// --- Placeholder UI Components ---
// Basic placeholders for components potentially from "@/components/ui/..."

const Card = ({ children, className = "", ...props }) => (
    <div className={`border rounded-lg shadow-sm bg-white ${className}`} {...props}>
        {children}
    </div>
);

const CardContent = ({ children, className = "", ...props }) => (
    <div className={`p-6 ${className}`} {...props}> {/* Increased padding for forms */}
        {children}
    </div>
);

const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
    const baseStyle = "inline-flex items-center justify-center rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:pointer-events-none";
    let variantStyle = "";
    let sizeStyle = "";

    switch (variant) {
        case "outline":
            variantStyle = "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-indigo-500";
            break;
        case "ghost":
            variantStyle = "text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:ring-indigo-500";
            break;
        case "destructive":
            variantStyle = "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500";
            break;
        case "link":
            variantStyle = "text-red-600 underline-offset-4 hover:underline focus:ring-red-500 p-0"; // Adjusted padding for link
            break;
        case "success": // Added success variant
            variantStyle = "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500";
            break;
        default: // default
            variantStyle = "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500";
    }

    switch (size) {
        case "sm":
            sizeStyle = "h-9 px-3";
            break;
        case "xs":
            sizeStyle = "h-8 px-2 text-xs";
            break;
        case "lg":
            sizeStyle = "h-11 px-8";
            break;
        case "icon":
            sizeStyle = "h-10 w-10";
            break;
        default: // default
            sizeStyle = "h-10 px-4 py-2";
    }


    return (
        <button className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className}`} {...props}>
            {children}
        </button>
    );
};

const Switch = ({ checked, onCheckedChange, ...props }) => (
    <button
        role="switch"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${checked ? 'bg-red-500' : 'bg-gray-300'
            }`}
        {...props}
    >
        <span
            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'
                }`}
        />
    </button>
);

// Input component placeholder
const Input = ({ className = "", type = "text", ...props }) => (
    <input
        type={type}
        className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
    />
);

// Label component placeholder
const Label = ({ children, className = "", htmlFor, ...props }) => (
    // Added mb-1 for margin below label
    <label htmlFor={htmlFor} className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-1 ${className}`} {...props}>
        {children}
    </label>
);

// Checkbox component placeholder (basic implementation)
const Checkbox = ({ id, checked, onCheckedChange, children, className = "", ...props }) => (
    <div className={`flex items-center space-x-2 ${className}`}>
        <button
            id={id}
            role="checkbox"
            aria-checked={checked}
            onClick={() => onCheckedChange(!checked)}
            className={`peer h-4 w-4 shrink-0 rounded-sm border border-red-500 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${checked ? 'bg-red-500 text-white flex items-center justify-center' : 'bg-white'}`}
            {...props}
        >
            {/* Basic checkmark appearance */}
            {checked && <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
        </button>
        {children && <Label htmlFor={id} className="mb-0">{children}</Label>} {/* Removed bottom margin for checkbox label */}
    </div>
);


// --- Helper Functions ---
const parsePrice = (priceString) => {
    if (!priceString) return 0;
    return parseFloat(priceString.replace(/[^0-9.]/g, ''));
};

// --- Login Page Component ---
function LoginPage({ navigateTo }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // For displaying mock errors

    const handleLogin = (e) => {
        e.preventDefault(); // Prevent default form submission
        setError(''); // Clear previous errors

        // --- MOCK AUTHENTICATION (ALWAYS SUCCEEDS) ---
        console.log("Mock Login Attempt with:", email);
        // Navigate to the main app page (home) regardless of input
        navigateTo('home');
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
                            {/* Added margin to Label */}
                            <Label htmlFor="login-email">Email</Label>
                            <Input
                                id="login-email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            // Removed 'required' for prototype ease
                            />
                        </div>
                        <div>
                            {/* Added margin to Label */}
                            <Label htmlFor="login-password">Password</Label>
                            <Input
                                id="login-password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            // Removed 'required' for prototype ease
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

// --- Signup Page Component ---
function SignupPage({ navigateTo }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // For displaying mock errors

    const handleSignup = (e) => {
        e.preventDefault(); // Prevent default form submission
        setError(''); // Clear previous errors

        // --- MOCK SIGNUP (ALWAYS SUCCEEDS) ---
        console.log("Mock Signup Attempt for:", name, email);
        // Navigate to the main app page (home) regardless of input
        navigateTo('home');
        // --- END MOCK ---
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardContent>
                    <div className="text-center mb-6">
                        <UserPlus className="mx-auto h-10 w-10 text-red-500 mb-2" />
                        <h2 className="text-2xl font-bold">Create Account</h2>
                        <p className="text-sm text-gray-500">Get started with delicious food!</p>
                    </div>
                    <form onSubmit={handleSignup} className="space-y-4">
                        <div>
                            {/* Added margin to Label */}
                            <Label htmlFor="signup-name">Full Name</Label>
                            <Input
                                id="signup-name"
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            // Removed 'required' for prototype ease
                            />
                        </div>
                        <div>
                            {/* Added margin to Label */}
                            <Label htmlFor="signup-email">Email</Label>
                            <Input
                                id="signup-email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            // Removed 'required' for prototype ease
                            />
                        </div>
                        <div>
                            {/* Added margin to Label */}
                            <Label htmlFor="signup-phone">Phone Number</Label>
                            <Input
                                id="signup-phone"
                                type="tel"
                                placeholder="123-456-7890"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            // Removed 'required' for prototype ease
                            />
                        </div>
                        <div>
                            {/* Added margin to Label */}
                            <Label htmlFor="signup-password">Password</Label>
                            <Input
                                id="signup-password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            // Removed 'required' for prototype ease
                            />
                        </div>
                        {error && (
                            <p className="text-xs text-red-600 text-center">{error}</p>
                        )}
                        <Button type="submit" className="w-full">
                            Sign Up
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{' '}
                        <Button variant="link" size="sm" onClick={() => navigateTo('login')}>
                            Log In
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}


// --- Top Bar Component --- (Only shown when logged in)
function TopBar({ mode, toggleMode, balance, selectedAddress, setSelectedAddress, addresses, navigateTo, cartItemCount }) {
    return (
        <div className="flex justify-between items-center gap-2 p-4 bg-white shadow-sm sticky top-0 z-20"> {/* Added padding, bg, shadow, sticky */}
            {/* Address Selector */}
            <div className="relative w-30 sm:w-30">
                <select
                    className="w-full appearance-none rounded-full border border-gray-300 bg-white pl-10 pr-8 py-2 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                    value={selectedAddress}
                    onChange={(e) => setSelectedAddress(e.target.value)}
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
                {/* Cart Button */}
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

// --- Bottom Nav Bar Component --- (Only shown when logged in)
function BottomNavBar({ currentPage, navigateTo }) {
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


// --- Store Page Item Component ---
function StoreMenuItem({ item, addToCart }) {
    const [quantity, setQuantity] = useState(1);
    const handleAddToCart = () => {
        const itemToAdd = { ...item, priceValue: parsePrice(item.price) };
        addToCart(itemToAdd, quantity);
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
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-6 w-6 rounded-full p-0" onClick={() => setQuantity(q => Math.max(1, q - 1))} aria-label="Decrease quantity"><MinusCircle className="w-4 h-4" /></Button>
                        <span className="text-sm font-medium w-6 text-center">{quantity}</span>
                        <Button variant="outline" size="icon" className="h-6 w-6 rounded-full p-0" onClick={() => setQuantity(q => q + 1)} aria-label="Increase quantity"><PlusCircle className="w-4 h-4" /></Button>
                    </div>
                    <Button size="xs" className="rounded-full px-3" onClick={handleAddToCart}>Add {quantity} to Cart</Button>
                </div>
            </CardContent>
        </Card>
    );
}

// --- Store Page Component ---
function StorePage({ shopName, navigateTo, addToCart }) {
    const decodedShopName = shopName ? decodeURIComponent(shopName) : "Store";
    const menuItems = [{ id: "m1", name: "Classic Burger", description: "Beef patty, lettuce, tomato, cheese", price: "$9.99", storeName: decodedShopName }, { id: "m2", name: "Crispy Fries", description: "Golden fried potato sticks", price: "$3.49", storeName: decodedShopName }, { id: "m3", name: "House Salad", description: "Mixed greens, vinaigrette", price: "$5.95", storeName: decodedShopName }, { id: "m4", name: "Iced Lemon Tea", description: "Chilled black tea with lemon", price: "$2.99", storeName: decodedShopName }, { id: "m5", name: "Chocolate Cake", description: "Rich moist chocolate dessert", price: "$4.50", storeName: decodedShopName }];
    const categories = ["Popular", "Appetizers", "Main Course", "Drinks", "Desserts"];
    const [searchTerm, setSearchTerm] = useState('');
    const filteredMenuItems = menuItems.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return (<div className="space-y-4"> <div className="flex items-center gap-2"> <Button variant="ghost" size="icon" onClick={() => navigateTo('home')} aria-label="Back to Home"><ChevronLeft className="w-5 h-5" /></Button> <h2 className="text-xl font-bold">{decodedShopName}</h2> </div> <div className="relative"> <Input type="text" placeholder={`Search ${decodedShopName}...`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full rounded-full px-10 py-2 text-sm" /> <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /> </div> <div className="flex gap-2 overflow-x-auto pb-2"> {categories.map((cat, idx) => (<Button key={idx} variant="outline" size="xs" className="whitespace-nowrap rounded-full">{cat}</Button>))} </div> <div className="space-y-3"> {filteredMenuItems.length > 0 ? (filteredMenuItems.map((item) => (<StoreMenuItem key={item.id} item={item} addToCart={addToCart} />))) : (<p className="text-center text-gray-500 py-4">No menu items match your search.</p>)} </div> </div>);
}

// --- Cart Page Component ---
function CartPage({ navigateTo, cart, updateCartQuantity, removeFromCart, clearCart, balance }) {
    const [useBalance, setUseBalance] = useState(false);
    const subtotal = cart.reduce((sum, item) => sum + item.priceValue * item.quantity, 0);
    const deliveryFee = cart.length > 0 ? 2.50 : 0;
    const taxes = subtotal * 0.08;
    const orderTotal = subtotal + deliveryFee + taxes;
    const balanceToApply = useBalance ? Math.min(balance, orderTotal) : 0;
    const finalTotal = orderTotal - balanceToApply;
    const storeName = cart.length > 0 && cart[0].storeName ? cart[0].storeName : "Your";
    const handlePlaceOrder = () => { if (cart.length === 0) return; const orderDetails = { items: [...cart], subtotal, deliveryFee, taxes, balanceApplied: balanceToApply, finalTotal, storeName, orderId: `DD${Date.now()}`, orderDate: new Date().toLocaleDateString(), }; navigateTo('summary', orderDetails); clearCart(); };
    return (<div className="space-y-4"> <h2 className="text-xl font-bold">Your Cart</h2> {cart.length > 0 && <p className="text-sm text-gray-600">From: <span className="font-medium">{storeName}</span></p>} <div className="space-y-2"> {cart.map((item) => (<div key={item.id} className="flex justify-between items-center p-3 border rounded-lg bg-white shadow-sm"> <div className="flex-grow mr-3"> <h3 className="font-medium">{item.name}</h3> <p className="text-sm text-gray-500">${item.priceValue.toFixed(2)} each</p> <div className="flex items-center gap-2 mt-1"> <Button variant="outline" size="icon" className="h-6 w-6 rounded-full p-0" onClick={() => updateCartQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity"><MinusCircle className="w-4 h-4" /></Button> <span className="text-sm font-medium w-6 text-center">{item.quantity}</span> <Button variant="outline" size="icon" className="h-6 w-6 rounded-full p-0" onClick={() => updateCartQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity"><PlusCircle className="w-4 h-4" /></Button> </div> </div> <div className="flex flex-col items-end"> <span className="text-sm font-semibold mb-2">${(item.priceValue * item.quantity).toFixed(2)}</span> <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-red-600 p-0" onClick={() => removeFromCart(item.id)} aria-label="Remove item"><Trash2 className="w-4 h-4" /></Button> </div> </div>))} {cart.length === 0 && <p className="text-center text-gray-500 py-4">Your cart is empty.</p>} </div> {cart.length > 0 && (<> <div className="space-y-2"> <Label htmlFor="promo" className="text-sm font-medium text-gray-700">Promo Code</Label> <div className="flex items-center gap-2"> <Input id="promo" type="text" placeholder="Enter promo code" className="w-full sm:w-1/2" /> <Button variant="outline" size="sm" className="whitespace-nowrap">Apply</Button> </div> </div> <div className="space-y-1 pt-4 border-t"> <div className="flex justify-between text-sm"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div> <div className="flex justify-between text-sm"><span>Delivery Fee</span><span>${deliveryFee.toFixed(2)}</span></div> <div className="flex justify-between text-sm text-gray-600"><span>Taxes</span><span>${taxes.toFixed(2)}</span></div> <div className="flex justify-between text-sm font-medium mt-1 border-t pt-1"><span>Order Total</span><span>${orderTotal.toFixed(2)}</span></div> </div> {balance > 0 && (<div className="pt-4 border-t"> <div className="flex items-center justify-between p-3 border rounded-lg bg-green-50"> <Label htmlFor="useBalance" className="text-sm font-medium text-green-800 flex-grow mr-2"> Use available balance (${balance.toFixed(2)})? </Label> <Switch id="useBalance" checked={useBalance} onCheckedChange={setUseBalance} /> </div> {useBalance && (<p className="text-xs text-green-600 mt-1 text-right"> -${balanceToApply.toFixed(2)} applied </p>)} </div>)} <div className="space-y-4 pt-4 border-t"> <div> <h3 className="text-sm font-semibold mb-2">Payment Method</h3> <div className="flex gap-2 flex-wrap"> <Button variant="default" size="xs">Credit Card</Button> <Button variant="outline" size="xs">PayPal</Button> <Button variant="outline" size="xs">Apple Pay</Button> </div> <select className="mt-2 w-full sm:w-1/2 border text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-400 bg-white"> <option>Visa ending in 1234</option> <option>Mastercard ending in 5678</option> <option>Add new card...</option> </select> </div> <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t w-full gap-2"> <span className="text-lg font-semibold">Pay: ${finalTotal.toFixed(2)}</span> <Button size="sm" className="w-full sm:w-auto" disabled={cart.length === 0} onClick={handlePlaceOrder}> Place Order </Button> </div> </div> </>)} </div>);
}

// --- Checkout Summary Page Component ---
function CheckoutSummaryPage({ navigateTo, orderDetails }) { if (!orderDetails) { useEffect(() => { navigateTo('home'); }, [navigateTo]); return <div className="text-center py-10 text-gray-500">Loading summary...</div>; } const { items, subtotal, deliveryFee, taxes, balanceApplied, finalTotal, storeName, orderId, orderDate } = orderDetails; const estimatedDeliveryTime = "30-45 minutes"; return (<div className="space-y-6"> <div className="text-center space-y-2"> <CheckCircle className="w-16 h-16 text-green-500 mx-auto" /> <h2 className="text-2xl font-bold">Order Placed!</h2> <p className="text-gray-600">Thank you for your order from <span className="font-medium">{storeName}</span>.</p> <p className="text-sm text-gray-500">Order ID: {orderId}</p> <p className="text-sm text-gray-500">Estimated Delivery: {estimatedDeliveryTime}</p> </div> <Card className="p-0 rounded-xl overflow-hidden shadow-sm"> <CardContent className="p-4 space-y-2"> <h3 className="text-base font-semibold mb-2">Order Summary ({orderDate})</h3> {items.map(item => (<div key={item.id} className="flex justify-between items-center text-sm border-b border-gray-100 pb-1"> <span>{item.quantity} x {item.name}</span> <span>${(item.priceValue * item.quantity).toFixed(2)}</span> </div>))} <div className="flex justify-between text-sm pt-2"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div> <div className="flex justify-between text-sm"><span>Delivery Fee</span><span>${deliveryFee.toFixed(2)}</span></div> <div className="flex justify-between text-sm text-gray-600"><span>Taxes</span><span>${taxes.toFixed(2)}</span></div> {balanceApplied > 0 && (<div className="flex justify-between text-sm text-green-600"><span>Balance Applied</span><span>-${balanceApplied.toFixed(2)}</span></div>)} <div className="flex justify-between text-base font-semibold mt-1 border-t pt-2"><span>Total Paid</span><span>${finalTotal.toFixed(2)}</span></div> </CardContent> </Card> <Card className="p-0 rounded-xl overflow-hidden shadow-sm"> <CardContent className="p-4 space-y-1"> <h3 className="text-base font-semibold flex items-center gap-2"><MapPin className="w-5 h-5 text-red-600" /> Delivery Address</h3> <p className="text-sm text-gray-700">John Doe</p> <p className="text-sm text-gray-700">123 Main St, Anytown, USA 12345</p> </CardContent> </Card> <div className="flex gap-2"> <Button variant="outline" size="sm" className="w-full" onClick={() => navigateTo('history')}> View Order History </Button> <Button variant="default" size="sm" className="w-full" onClick={() => navigateTo('home')}> Back to Home </Button> </div> </div>); }

// --- Recommendations Page Component ---
function RecommendationsPage({ navigateTo }) { const [favorites, setFavorites] = useState({}); const recommendedShops = [{ id: "rec1", name: "Avocado Toasties", type: "Brunch • $$", distance: "1.1 mi", imgSeed: 10 }, { id: "rec2", name: "Daily Smoothies", type: "Juice • $", distance: "0.6 mi", imgSeed: 20 }, { id: "rec3", name: "Green Garden", type: "Salads • $", distance: "0.8 mi", imgSeed: 30 }, { id: "rec4", name: "Pasta Prime", type: "Italian • $$$", distance: "2.0 mi", imgSeed: 40 }, { id: "rec5", name: "Café Bloom", type: "Coffee • $$", distance: "1.3 mi", imgSeed: 50 }, { id: "rec6", name: "Hot Buns Bakery", type: "Bakery • $$", distance: "1.4 mi", imgSeed: 60 }, { id: "rec7", name: "Fiesta Grill", type: "Mexican • $$", distance: "1.5 mi", imgSeed: 70 }, { id: "rec8", name: "Tokyo Express", type: "Sushi • $$$", distance: "2.1 mi", imgSeed: 80 }]; const toggleFavorite = (shopId) => { setFavorites(prev => ({ ...prev, [shopId]: !prev[shopId] })); }; return (<div className="space-y-3"> <h2 className="text-xl font-bold mb-2">Recommendations For You</h2> {recommendedShops.map((shop) => (<Card key={shop.id} className="p-0 shadow-sm rounded-xl overflow-hidden"> <CardContent className="flex items-center gap-4 p-4"> <img src={`https://placehold.co/80x80/EBF4FF/7F9CF5?text=${shop.name.substring(0, 1)}`} alt={shop.name} className="rounded-lg w-16 h-16 object-cover flex-shrink-0" onError={(e) => e.target.src = `https://placehold.co/80x80/EBF4FF/7F9CF5?text=${shop.name.substring(0, 1)}`} /> <div className="flex-grow min-w-0"> <h3 className="text-base font-semibold truncate">{shop.name}</h3> <p className="text-sm text-gray-600">{shop.type}</p> <p className="text-xs text-gray-500">{shop.distance}</p> </div> <div className="ml-auto flex flex-col gap-2 items-center flex-shrink-0"> <Button onClick={() => navigateTo('store', { shopName: encodeURIComponent(shop.name) })} size="xs" className="bg-red-500 text-white rounded-full hover:bg-red-600 text-center w-full whitespace-nowrap"> Order Now </Button> <Heart className={`w-5 h-5 cursor-pointer ${favorites[shop.id] ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-red-400'}`} onClick={() => toggleFavorite(shop.id)} aria-label={favorites[shop.id] ? "Remove from Favorites" : "Add to Favorites"} /> </div> </CardContent> </Card>))} {recommendedShops.length === 0 && <p className="text-center text-gray-500 py-4">No recommendations available right now.</p>} </div>); }

// --- History Page Component ---
function HistoryPage({ navigateTo }) { const pastOrders = [{ id: "ord1", store: "Taco Town", date: "Apr 3, 2025", total: 14.99, items: [{ id: 'taco', name: 'Taco', quantity: 2, price: 3.50 }, { id: 'burrito', name: 'Burrito', quantity: 1, price: 6.99 }, { id: 'soda', name: 'Soda', quantity: 1, price: 1.00 }], subtotal: 14.99, taxes: 1.20, deliveryFee: 2.50 }, { id: "ord2", store: "Pizza Palace", date: "Mar 30, 2025", total: 22.50, items: [{ id: 'pizza', name: 'Large Pepperoni Pizza', quantity: 1, price: 18.00 }, { id: 'knots', name: 'Garlic Knots', quantity: 1, price: 4.50 }], subtotal: 22.50, taxes: 1.80, deliveryFee: 2.50 }]; return (<div className="space-y-4"> <h2 className="text-xl font-bold">Order History</h2> {pastOrders.length > 0 ? (pastOrders.map(order => (<Card key={order.id} className="p-0 rounded-xl overflow-hidden shadow-sm"> <CardContent className="p-4 space-y-2"> <div className="flex justify-between items-start"> <div> <h3 className="font-semibold">{order.store}</h3> <p className="text-xs text-gray-500">{order.date}</p> </div> <span className="text-sm font-semibold">${order.total.toFixed(2)}</span> </div> <p className="text-sm text-gray-600 italic"> {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')} </p> <div className="flex justify-end gap-2 pt-2 border-t border-gray-100"> <Button variant="outline" size="xs" onClick={() => navigateTo('receipt', { order: order })}> <FileText className="w-3 h-3 mr-1" /> View Receipt </Button> <Button variant="outline" size="xs" onClick={() => navigateTo('store', { shopName: encodeURIComponent(order.store) })}> View Store </Button> <Button variant="default" size="xs"> <RefreshCw className="w-3 h-3 mr-1" /> Reorder </Button> </div> </CardContent> </Card>))) : (<p className="text-center text-gray-500 py-6">You haven't placed any orders yet.</p>)} </div>); }

// --- Receipt Page Component ---
function ReceiptPage({ navigateTo, orderDetails }) { const order = orderDetails?.order; if (!order) { useEffect(() => { navigateTo('history'); }, [navigateTo]); return <div className="text-center py-10 text-gray-500">Loading receipt...</div>; } const subtotal = order.subtotal || order.items.reduce((sum, item) => sum + item.price * item.quantity, 0); const deliveryFee = order.deliveryFee ?? 2.50; const taxes = order.taxes ?? subtotal * 0.08; const total = order.total || (subtotal + deliveryFee + taxes); return (<div className="space-y-4"> <div className="flex items-center gap-2 mb-4"> <Button variant="ghost" size="icon" onClick={() => navigateTo('history')} aria-label="Back to History"><ChevronLeft className="w-5 h-5" /></Button> <h2 className="text-xl font-bold">Receipt</h2> </div> <Card className="p-0 rounded-xl overflow-hidden shadow-sm"> <CardContent className="p-4 space-y-3"> <div className="flex justify-between items-center border-b pb-2 mb-2"> <div> <h3 className="font-semibold">{order.store}</h3> <p className="text-xs text-gray-500">Order ID: {order.id}</p> <p className="text-xs text-gray-500">Date: {order.date}</p> </div> <Button variant="outline" size="xs"> <Printer className="w-3 h-3 mr-1" /> Print </Button> </div> <div className="space-y-1"> <h4 className="text-sm font-medium mb-1">Items:</h4> {order.items.map(item => (<div key={item.id} className="flex justify-between items-center text-sm"> <span>{item.quantity} x {item.name}</span> <span>${(item.price * item.quantity).toFixed(2)}</span> </div>))} </div> <div className="space-y-1 pt-2 border-t"> <div className="flex justify-between text-sm"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div> <div className="flex justify-between text-sm"><span>Delivery Fee</span><span>${deliveryFee.toFixed(2)}</span></div> <div className="flex justify-between text-sm text-gray-600"><span>Taxes</span><span>${taxes.toFixed(2)}</span></div> <div className="flex justify-between text-base font-semibold mt-1 border-t pt-2"><span>Total Paid</span><span>${total.toFixed(2)}</span></div> </div> <div className="pt-2 border-t text-xs text-gray-500 space-y-1"> <p>Paid with: Visa ending in 1234</p> <p>Delivered to: 123 Main St, Anytown, USA 12345</p> </div> </CardContent> </Card> <Button variant="default" size="sm" className="w-full" onClick={() => navigateTo('history')}> Back to Order History </Button> </div>); }

// --- Favorites Page Component ---
function FavoritesPage({ navigateTo }) { const [favoriteStores, setFavoriteStores] = useState([{ id: "fav1", name: "Pasta Prime", type: "Italian • $$$", distance: "2.0 mi", imgSeed: 40 }, { id: "fav2", name: "Café Bloom", type: "Coffee • $$", distance: "1.3 mi", imgSeed: 50 }, { id: "fav3", name: "Fiesta Grill", type: "Mexican • $$", distance: "1.5 mi", imgSeed: 70 },]); const removeFavorite = (storeId) => { setFavoriteStores(prev => prev.filter(store => store.id !== storeId)); console.log(`Removed favorite: ${storeId}`); }; return (<div className="space-y-3"> <h2 className="text-xl font-bold mb-2">Your Favorites</h2> {favoriteStores.length > 0 ? (favoriteStores.map((shop) => (<Card key={shop.id} className="p-0 shadow-sm rounded-xl overflow-hidden"> <CardContent className="flex items-center gap-4 p-4"> <img src={`https://placehold.co/80x80/FFF0F0/CC0000?text=${shop.name.substring(0, 1)}`} alt={shop.name} className="rounded-lg w-16 h-16 object-cover flex-shrink-0" onError={(e) => e.target.src = `https://placehold.co/80x80/FFF0F0/CC0000?text=${shop.name.substring(0, 1)}`} /> <div className="flex-grow min-w-0"> <h3 className="text-base font-semibold truncate">{shop.name}</h3> <p className="text-sm text-gray-600">{shop.type}</p> <p className="text-xs text-gray-500">{shop.distance}</p> </div> <div className="ml-auto flex flex-col gap-2 items-center flex-shrink-0"> <Button onClick={() => navigateTo('store', { shopName: encodeURIComponent(shop.name) })} size="xs" className="bg-red-500 text-white rounded-full hover:bg-red-600 text-center w-full whitespace-nowrap"> Order Now </Button> <Button variant="ghost" size="xs" className="text-gray-400 hover:text-red-600 p-0" onClick={() => removeFavorite(shop.id)} aria-label="Remove from Favorites"> <Trash2 className="w-4 h-4" /> </Button> </div> </CardContent> </Card>))) : (<p className="text-center text-gray-500 py-6">You haven't added any favorites yet.</p>)} </div>); }

// --- Settings Page Component ---
function SettingsPage({ navigateTo }) { const [notifications, setNotifications] = useState({ promos: true, orderUpdates: true, news: false, }); const handleNotificationChange = (key) => { setNotifications(prev => ({ ...prev, [key]: !prev[key] })); }; return (<div className="space-y-6"> <h2 className="text-xl font-bold">Settings</h2> <Card className="p-0 rounded-xl overflow-hidden shadow-sm"> <CardContent className="p-4 space-y-3"> <h3 className="text-base font-semibold flex items-center gap-2"><User className="w-5 h-5 text-red-600" /> Account</h3> <div className="space-y-2"> <Label htmlFor="name">Name</Label> <Input id="name" defaultValue="John Doe" /> </div> <div className="space-y-2"> <Label htmlFor="email">Email</Label> <Input id="email" type="email" defaultValue="john.doe@example.com" /> </div> <div className="space-y-2"> <Label htmlFor="phone">Phone</Label> <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" /> </div> <Button variant="outline" size="sm" className="w-full">Update Profile</Button> </CardContent> </Card> <Card className="p-0 rounded-xl overflow-hidden shadow-sm"> <CardContent className="p-4 space-y-3"> <h3 className="text-base font-semibold flex items-center gap-2"><MapPin className="w-5 h-5 text-red-600" /> Addresses</h3> <div className="text-sm text-gray-700 p-2 border rounded-md bg-gray-50">Home - 123 Main St...</div> <div className="text-sm text-gray-700 p-2 border rounded-md bg-gray-50">Work - 456 Office Ave...</div> <Button variant="outline" size="sm" className="w-full">Manage Addresses</Button> </CardContent> </Card> <Card className="p-0 rounded-xl overflow-hidden shadow-sm"> <CardContent className="p-4 space-y-3"> <h3 className="text-base font-semibold flex items-center gap-2"><CreditCard className="w-5 h-5 text-red-600" /> Payment Methods</h3> <div className="text-sm text-gray-700 p-2 border rounded-md bg-gray-50">Visa ending in 1234</div> <div className="text-sm text-gray-700 p-2 border rounded-md bg-gray-50">PayPal</div> <Button variant="outline" size="sm" className="w-full">Manage Payment Methods</Button> </CardContent> </Card> <Card className="p-0 rounded-xl overflow-hidden shadow-sm"> <CardContent className="p-4 space-y-3"> <h3 className="text-base font-semibold flex items-center gap-2"><Bell className="w-5 h-5 text-red-600" /> Notifications</h3> <div className="flex items-center justify-between"> <Label htmlFor="promos" className="flex-grow mr-2">Promotions & Offers</Label> <Switch id="promos" checked={notifications.promos} onCheckedChange={() => handleNotificationChange('promos')} /> </div> <div className="flex items-center justify-between"> <Label htmlFor="orderUpdates" className="flex-grow mr-2">Order Updates</Label> <Switch id="orderUpdates" checked={notifications.orderUpdates} onCheckedChange={() => handleNotificationChange('orderUpdates')} /> </div> <div className="flex items-center justify-between"> <Label htmlFor="news" className="flex-grow mr-2">News & Announcements</Label> <Switch id="news" checked={notifications.news} onCheckedChange={() => handleNotificationChange('news')} /> </div> </CardContent> </Card> {/* Logout Button - Navigates back to login */} <Button variant="destructive" size="sm" className="w-full flex items-center gap-2" onClick={() => navigateTo('login')}> <LogOut className="w-4 h-4" /> Log Out </Button> </div>); }

// --- Simple Page Component (Placeholder) ---
function SimplePage({ title, navigateTo }) { return <div className="text-center py-10 text-gray-500">{title} Page (Content Coming Soon)</div>; }

// --- Home Page Component ---
function HomePage({ orderCategories, cuisineCategories, promotionalAds, popularStores, recentOrders, guessYouLike, navigateTo }) { const [searchTerm, setSearchTerm] = useState(''); return (<> <div className="flex items-center gap-2 relative"> <Input type="text" placeholder="Search restaurants or items" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="rounded-full shadow pl-10 pr-4 py-2 border w-full" /> <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" /> <Button variant="outline" size="icon" className="rounded-full p-2" aria-label="Filter by location"><MapPin className="w-5 h-5" /></Button> </div> <h2 className="font-semibold text-sm mt-4 mb-1">Order Again or Get Essentials</h2> <div className="overflow-x-auto pb-2 -mx-4 px-4"> <div className="flex gap-3 w-max"> {orderCategories.map((cat) => (<Card key={cat} className="min-w-[100px] rounded-2xl shadow-sm bg-red-50 hover:shadow-md transition-shadow cursor-pointer"><CardContent className="p-3 text-center"><span className="text-xs font-semibold text-red-800">{cat}</span></CardContent></Card>))} </div> </div> <h2 className="font-semibold text-sm mt-3 mb-1">Explore Cuisines</h2> <div className="overflow-x-auto pb-2 -mx-4 px-4"> <div className="flex gap-3 w-max"> {cuisineCategories.map((cuisine) => (<Card key={cuisine} className="min-w-[100px] rounded-2xl shadow-sm bg-yellow-50 hover:shadow-md transition-shadow cursor-pointer"><CardContent className="p-3 text-center"><span className="text-xs font-semibold text-yellow-900">{cuisine}</span></CardContent></Card>))} </div> </div> <div className="overflow-x-auto pb-2 -mx-4 px-4"> <div className="flex gap-4 w-max"> {promotionalAds.map((ad, index) => (<div key={index} className="h-36 min-w-[280px] rounded-2xl bg-gradient-to-r from-red-200 to-yellow-200 shadow-lg p-5 flex flex-col justify-center text-left text-base font-bold text-red-900">{ad}</div>))} </div> </div> <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"> {[{ title: "Popular Nearby", data: popularStores, color: 'orange', link: 'popular' }, { title: "Recent Orders", data: recentOrders, color: 'green', link: 'history' }, { title: "Guess You Like", data: guessYouLike, color: 'purple', link: 'recommend' }].map(({ title, data, color, link }, index) => (<div className="space-y-2 h-full flex flex-col" key={index}> <div className="flex justify-between items-center"> <h2 className="font-bold text-sm">{title}</h2> <Button variant="link" size="sm" onClick={() => navigateTo(link)} className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1 p-0 h-auto"> View more <ChevronRight className="w-4 h-4" /> </Button> </div> <div className="grid grid-cols-2 gap-3 flex-grow"> {data.slice(0, 4).map((item, idx) => (<Card key={idx} className={`p-2 shadow-sm rounded-xl bg-${color}-50 hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col`} onClick={() => item.name && navigateTo('store', { shopName: encodeURIComponent(item.name) })}> <CardContent className="flex flex-col items-center justify-center gap-1 text-center flex-grow p-2"> <Store className={`w-5 h-5 text-${color}-600 mb-1`} /> <span className="text-xs font-medium leading-tight">{item.name || item.store}</span> {item.type && <span className="text-[10px] text-gray-600">{item.type}</span>} {item.price && <span className="text-[10px]">{item.price}</span>} {item.distance && <span className="text-[10px] text-gray-500">{item.distance}</span>} {item.date && <span className="text-[10px] text-gray-500">{item.date}</span>} </CardContent> </Card>))} </div> </div>))} </div> </>); }


// --- Main App Component ---
export default function DoorDashPrototype() {
    // State for navigation and app data
    // Start on 'login' page for demonstration
    const [currentPage, setCurrentPage] = useState('login'); // 'login', 'signup', 'home', etc.
    const [currentStore, setCurrentStore] = useState(null);
    const [currentOrderDetails, setCurrentOrderDetails] = useState(null);
    const [mode, setMode] = useState("delivery");
    const [balance] = useState(24.50);
    const [selectedAddress, setSelectedAddress] = useState("Home");
    const addresses = ["Home", "Work", "123 Main St", "Office"];
    const [cart, setCart] = useState([]);

    // --- Cart Management Functions ---
    const addToCart = (item, quantity) => { setCart(prevCart => { if (!item.storeName) { console.error("Attempted to add item without storeName:", item); return prevCart; } const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id); if (existingItemIndex > -1) { const updatedCart = [...prevCart]; updatedCart[existingItemIndex].quantity += quantity; return updatedCart; } else { if (prevCart.length > 0 && prevCart[0].storeName !== item.storeName) { console.warn("Added item from different store. Replacing cart."); return [{ ...item, quantity }]; } return [...prevCart, { ...item, quantity }]; } }); };
    const updateCartQuantity = (itemId, newQuantity) => { setCart(prevCart => { if (newQuantity <= 0) { return prevCart.filter(item => item.id !== itemId); } else { return prevCart.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item); } }); };
    const removeFromCart = (itemId) => { setCart(prevCart => prevCart.filter(item => item.id !== itemId)); };
    const clearCart = () => { setCart([]); };
    // --- End Cart Management ---

    // Mock data
    const orderCategories = ["Alcohol", "Convenience", "Grocery", "Flower", "Bakery", "Pharmacy", "Pet Supplies", "Snacks", "Ice Cream", "Water"];
    const cuisineCategories = ["Sushi", "Pizza", "Thai", "Ramen", "Chinese", "Bubble Tea", "Mexican", "Indian", "Korean", "Burgers", "BBQ", "Salads"];
    const promotionalAds = ["Enjoy 20% Off Your First Three Orders! 🍔🍕🥤", "Free Delivery for Orders Over $25 This Week! 🚚💨", "Get $10 Credit for Referring a Friend! 👯‍♀️💵", "Limited Time: BOGO on Select Restaurants! 🥡🍱", "Order Now and Win a $100 Gift Card! 🎁🎉"];
    const popularStores = [{ name: "Panda Express", type: "Chinese", price: "$$", distance: "1.2 mi" }, { name: "Starbucks", type: "Coffee", price: "$", distance: "0.5 mi" }, { name: "Domino's Pizza", type: "Pizza", price: "$$", distance: "1.8 mi" }, { name: "Subway", type: "Sandwiches", price: "$", distance: "1.0 mi" }];
    const recentOrders = [{ store: "Taco Town", price: "$14.99", date: "Apr 3" }, { store: "Pizza Palace", price: "$22.50", date: "Mar 30" }, { store: "Sushi Go", price: "$18.75", date: "Mar 28" }, { store: "Burger Barn", price: "$12.40", date: "Mar 25" }];
    const guessYouLike = [{ name: "Grill House", type: "BBQ", price: "$$$", distance: "2.3 mi" }, { name: "Curry Express", type: "Indian", price: "$$", distance: "1.6 mi" }, { name: "Smoothie Stop", type: "Juice Bar", price: "$", distance: "0.9 mi" }, { name: "Noodle Bowl", type: "Asian Fusion", price: "$$", distance: "1.4 mi" }];

    const toggleMode = () => setMode(mode === "pickup" ? "delivery" : "pickup");

    // Navigation function
    const navigateTo = (page, data = null) => {
        const validPages = ['login', 'signup', 'home', 'recommend', 'history', 'favorites', 'settings', 'cart', 'store', 'popular', 'summary', 'receipt'];
        if (!validPages.includes(page)) {
            console.warn(`Navigation attempt to invalid page: ${page}. Defaulting to login.`);
            page = 'login'; // Default to login if page is invalid
        }

        if (page === 'store') { setCurrentStore(data); setCurrentOrderDetails(null); }
        else if (page === 'summary' || page === 'receipt') { setCurrentOrderDetails(data); setCurrentStore(null); }
        else { setCurrentStore(null); setCurrentOrderDetails(null); }

        // Special case: Reset cart if logging out (navigating to login from settings)
        if (page === 'login' && currentPage === 'settings') {
            clearCart();
        }

        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    // Determine if the user is considered "logged in" (i.e., not on login/signup page)
    const isLoggedIn = currentPage !== 'login' && currentPage !== 'signup';

    // Function to render the current page based on state
    const renderPage = () => {
        switch (currentPage) {
            case 'login':
                return <LoginPage navigateTo={navigateTo} />;
            case 'signup':
                return <SignupPage navigateTo={navigateTo} />;
            case 'home':
                return <HomePage orderCategories={orderCategories} cuisineCategories={cuisineCategories} promotionalAds={promotionalAds} popularStores={popularStores} recentOrders={recentOrders} guessYouLike={guessYouLike} navigateTo={navigateTo} />;
            case 'recommend': return <RecommendationsPage navigateTo={navigateTo} />;
            case 'history': return <HistoryPage navigateTo={navigateTo} />;
            case 'favorites': return <FavoritesPage navigateTo={navigateTo} />;
            case 'settings': return <SettingsPage navigateTo={navigateTo} />; // Pass navigateTo for logout
            case 'cart': return <CartPage navigateTo={navigateTo} cart={cart} updateCartQuantity={updateCartQuantity} removeFromCart={removeFromCart} clearCart={clearCart} balance={balance} />;
            case 'store': return currentStore ? <StorePage shopName={currentStore.shopName} navigateTo={navigateTo} addToCart={addToCart} /> : <LoginPage navigateTo={navigateTo} />; // Fallback to login if no store
            case 'summary': return <CheckoutSummaryPage navigateTo={navigateTo} orderDetails={currentOrderDetails} />;
            case 'receipt': return <ReceiptPage navigateTo={navigateTo} orderDetails={currentOrderDetails} />;
            case 'popular': return <SimplePage title="Popular Nearby" navigateTo={navigateTo} />;
            default: return <LoginPage navigateTo={navigateTo} />; // Default to login
        }
    };

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

            {/* Main content area adjusts padding based on login status */}
            <main className={isLoggedIn ? "p-4 pb-24 space-y-4" : ""}>
                {renderPage()}
            </main>

            {/* Conditionally render BottomNavBar only when logged in */}
            {isLoggedIn && (
                <BottomNavBar currentPage={currentPage} navigateTo={navigateTo} />
            )}
        </div>
    );
}
