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
  Printer, // Added for Receipt
  FileText // Added for Receipt icon button
} from "lucide-react";


// --- Placeholder UI Components ---
// Basic placeholders for components potentially from "@/components/ui/..."

const Card = ({ children, className = "", ...props }) => (
  <div className={`border rounded-lg shadow-sm bg-white ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-4 ${className}`} {...props}>
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
      variantStyle = "text-red-600 underline-offset-4 hover:underline focus:ring-red-500";
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
const Label = ({ children, className = "", ...props }) => (
  <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props}>
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
    {children && <Label htmlFor={id}>{children}</Label>}
  </div>
);


// --- Helper Functions ---
// Function to parse price string like "$9.99" to a number
const parsePrice = (priceString) => {
  if (!priceString) return 0;
  return parseFloat(priceString.replace(/[^0-9.]/g, ''));
};


// --- Top Bar Component ---
function TopBar({ mode, toggleMode, balance, selectedAddress, setSelectedAddress, addresses, navigateTo, cartItemCount }) {
  return (
    <div className="flex justify-between items-center gap-2"> {/* Added flex-wrap for smaller screens */}
      {/* Address Selector */}
      <div className="relative w-30 sm:w-27"> {/* Adjusted width */}
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
        {/* Use navigateTo function for cart navigation */}
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

// --- Store Page Item Component --- (Helper for StorePage)
function StoreMenuItem({ item, addToCart }) {
  const [quantity, setQuantity] = useState(1); // Default quantity to add

  const handleAddToCart = () => {
    // Ensure item has priceValue before adding
    const itemToAdd = { ...item, priceValue: parsePrice(item.price) };
    addToCart(itemToAdd, quantity);
  };

  return (
    <Card key={item.id} className="p-0 shadow-sm rounded-xl overflow-hidden">
      <CardContent className="flex justify-between items-center p-4">
        {/* Item Details */}
        <div className="flex-grow mr-4">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.description}</p>
          <span className="text-sm font-semibold">{item.price}</span>
        </div>
        {/* Add to Cart Controls */}
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-6 w-6 rounded-full p-0" onClick={() => setQuantity(q => Math.max(1, q - 1))} aria-label="Decrease quantity">
              <MinusCircle className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium w-6 text-center">{quantity}</span>
            <Button variant="outline" size="icon" className="h-6 w-6 rounded-full p-0" onClick={() => setQuantity(q => q + 1)} aria-label="Increase quantity">
              <PlusCircle className="w-4 h-4" />
            </Button>
          </div>
          <Button size="xs" className="rounded-full px-3" onClick={handleAddToCart}>
            Add {quantity} to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}


// --- Store Page Component ---
function StorePage({ shopName, navigateTo, addToCart }) {
  // Decode shop name safely ONCE
  const decodedShopName = shopName ? decodeURIComponent(shopName) : "Store";

  // Mock data for the store page - Ensure storeName uses decodedShopName
  const menuItems = [
    { id: "m1", name: "Classic Burger", description: "Beef patty, lettuce, tomato, cheese", price: "$9.99", storeName: decodedShopName },
    { id: "m2", name: "Crispy Fries", description: "Golden fried potato sticks", price: "$3.49", storeName: decodedShopName },
    { id: "m3", name: "House Salad", description: "Mixed greens, vinaigrette", price: "$5.95", storeName: decodedShopName },
    { id: "m4", name: "Iced Lemon Tea", description: "Chilled black tea with lemon", price: "$2.99", storeName: decodedShopName },
    { id: "m5", name: "Chocolate Cake", description: "Rich moist chocolate dessert", price: "$4.50", storeName: decodedShopName }
  ];
  const categories = ["Popular", "Appetizers", "Main Course", "Drinks", "Desserts"];
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  // Filter menu items based on search term (case-insensitive)
  const filteredMenuItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Store Header */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigateTo('home')} aria-label="Back to Home">
          <ChevronLeft className="w-5 h-5" />
        </Button>
        {/* Display the decoded shop name */}
        <h2 className="text-xl font-bold">{decodedShopName}</h2>
      </div>

      {/* Search Input - Use decoded name in placeholder */}
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

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat, idx) => (
          <Button key={idx} variant="outline" size="xs" className="whitespace-nowrap rounded-full">{cat}</Button>
        ))}
      </div>

      {/* Menu Items List */}
      <div className="space-y-3">
        {filteredMenuItems.length > 0 ? (
          filteredMenuItems.map((item) => (
            // Pass the item with the correctly assigned storeName
            <StoreMenuItem key={item.id} item={item} addToCart={addToCart} />
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">No menu items match your search.</p>
        )}
      </div>
    </div>
  );
}

// --- Cart Page Component ---
function CartPage({ navigateTo, cart, updateCartQuantity, removeFromCart, clearCart, balance }) {
  const [useBalance, setUseBalance] = useState(false); // State to track if balance should be applied

  // Calculate totals based on the cart state
  const subtotal = cart.reduce((sum, item) => sum + item.priceValue * item.quantity, 0);
  const deliveryFee = cart.length > 0 ? 2.50 : 0; // Example fee, only if cart not empty
  const taxes = subtotal * 0.08; // Example tax rate
  const orderTotal = subtotal + deliveryFee + taxes;

  // Calculate balance to apply
  const balanceToApply = useBalance ? Math.min(balance, orderTotal) : 0;
  const finalTotal = orderTotal - balanceToApply;

  // Get store name from the first item (assuming single store cart)
  // Ensure storeName exists before accessing it
  const storeName = cart.length > 0 && cart[0].storeName ? cart[0].storeName : "Your";

  const handlePlaceOrder = () => {
    if (cart.length === 0) return; // Don't proceed if cart is empty

    // Prepare order details for summary page
    const orderDetails = {
      items: [...cart], // Pass a copy of the cart items
      subtotal,
      deliveryFee,
      taxes,
      balanceApplied: balanceToApply,
      finalTotal,
      storeName, // Use the determined store name
      orderId: `DD${Date.now()}`, // Generate a simple mock order ID
      orderDate: new Date().toLocaleDateString(),
      // Could add address, payment method here later
    };
    // Navigate to summary page and clear the cart
    navigateTo('summary', orderDetails);
    clearCart(); // Clear cart after navigating
  };


  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Your Cart</h2>
      {/* Display store name safely */}
      {cart.length > 0 && <p className="text-sm text-gray-600">From: <span className="font-medium">{storeName}</span></p>}

      {/* Cart Items */}
      <div className="space-y-2">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center p-3 border rounded-lg bg-white shadow-sm">
            {/* Item Info & Quantity Controls */}
            <div className="flex-grow mr-3">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">${item.priceValue.toFixed(2)} each</p>
              <div className="flex items-center gap-2 mt-1">
                <Button variant="outline" size="icon" className="h-6 w-6 rounded-full p-0" onClick={() => updateCartQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">
                  <MinusCircle className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                <Button variant="outline" size="icon" className="h-6 w-6 rounded-full p-0" onClick={() => updateCartQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">
                  <PlusCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {/* Item Total & Remove Button */}
            <div className="flex flex-col items-end">
              <span className="text-sm font-semibold mb-2">${(item.priceValue * item.quantity).toFixed(2)}</span>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-red-600 p-0" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
        {cart.length === 0 && <p className="text-center text-gray-500 py-4">Your cart is empty.</p>}
      </div>

      {/* Promo Code (Optional - Kept from previous version) */}
      {cart.length > 0 && (
        <>
          <div className="space-y-2">
            <Label htmlFor="promo" className="text-sm font-medium text-gray-700">Promo Code</Label>
            <div className="flex items-center gap-2">
              <Input id="promo" type="text" placeholder="Enter promo code" className="w-full sm:w-1/2" />
              <Button variant="outline" size="sm" className="whitespace-nowrap">Apply</Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-1 pt-4 border-t">
            <div className="flex justify-between text-sm"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-sm"><span>Delivery Fee</span><span>${deliveryFee.toFixed(2)}</span></div>
            <div className="flex justify-between text-sm text-gray-600"><span>Taxes</span><span>${taxes.toFixed(2)}</span></div>
            <div className="flex justify-between text-sm font-medium mt-1 border-t pt-1"><span>Order Total</span><span>${orderTotal.toFixed(2)}</span></div>
          </div>

          {/* Apply Balance */}
          {balance > 0 && (
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between p-3 border rounded-lg bg-green-50">
                <Label htmlFor="useBalance" className="text-sm font-medium text-green-800 flex-grow mr-2">
                  Use available balance (${balance.toFixed(2)})?
                </Label>
                <Switch id="useBalance" checked={useBalance} onCheckedChange={setUseBalance} />
              </div>
              {useBalance && (
                <p className="text-xs text-green-600 mt-1 text-right">
                  -${balanceToApply.toFixed(2)} applied
                </p>
              )}
            </div>
          )}


          {/* Payment Section */}
          <div className="space-y-4 pt-4 border-t">
            <div>
              <h3 className="text-sm font-semibold mb-2">Payment Method</h3>
              <div className="flex gap-2 flex-wrap"> {/* Added flex-wrap */}
                <Button variant="default" size="xs">Credit Card</Button>
                <Button variant="outline" size="xs">PayPal</Button>
                <Button variant="outline" size="xs">Apple Pay</Button>
              </div>
              <select className="mt-2 w-full sm:w-1/2 border text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-400 bg-white">
                <option>Visa ending in 1234</option>
                <option>Mastercard ending in 5678</option>
                <option>Add new card...</option>
              </select>
            </div>

            {/* Checkout Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t w-full gap-2"> {/* Responsive layout */}
              <span className="text-lg font-semibold">Pay: ${finalTotal.toFixed(2)}</span>
              <Button size="sm" className="w-full sm:w-auto" disabled={cart.length === 0} onClick={handlePlaceOrder}>
                Place Order
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// --- Checkout Summary Page Component ---
function CheckoutSummaryPage({ navigateTo, orderDetails }) {
  if (!orderDetails) {
    // Handle case where orderDetails are missing (e.g., direct navigation)
    useEffect(() => {
      navigateTo('home'); // Redirect home if no order details
    }, [navigateTo]);
    return <div className="text-center py-10 text-gray-500">Loading summary...</div>;
  }

  const { items, subtotal, deliveryFee, taxes, balanceApplied, finalTotal, storeName, orderId, orderDate } = orderDetails;
  const estimatedDeliveryTime = "30-45 minutes"; // Mock data

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        <h2 className="text-2xl font-bold">Order Placed!</h2>
        <p className="text-gray-600">Thank you for your order from <span className="font-medium">{storeName}</span>.</p>
        <p className="text-sm text-gray-500">Order ID: {orderId}</p>
        <p className="text-sm text-gray-500">Estimated Delivery: {estimatedDeliveryTime}</p>
      </div>

      {/* Order Items Summary */}
      <Card className="p-0 rounded-xl overflow-hidden shadow-sm">
        <CardContent className="p-4 space-y-2">
          <h3 className="text-base font-semibold mb-2">Order Summary ({orderDate})</h3>
          {items.map(item => (
            <div key={item.id} className="flex justify-between items-center text-sm border-b border-gray-100 pb-1">
              <span>{item.quantity} x {item.name}</span>
              <span>${(item.priceValue * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between text-sm pt-2"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between text-sm"><span>Delivery Fee</span><span>${deliveryFee.toFixed(2)}</span></div>
          <div className="flex justify-between text-sm text-gray-600"><span>Taxes</span><span>${taxes.toFixed(2)}</span></div>
          {balanceApplied > 0 && (
            <div className="flex justify-between text-sm text-green-600"><span>Balance Applied</span><span>-${balanceApplied.toFixed(2)}</span></div>
          )}
          <div className="flex justify-between text-base font-semibold mt-1 border-t pt-2"><span>Total Paid</span><span>${finalTotal.toFixed(2)}</span></div>
        </CardContent>
      </Card>

      {/* Delivery Address (Mock) */}
      <Card className="p-0 rounded-xl overflow-hidden shadow-sm">
        <CardContent className="p-4 space-y-1">
          <h3 className="text-base font-semibold flex items-center gap-2"><MapPin className="w-5 h-5 text-red-600" /> Delivery Address</h3>
          <p className="text-sm text-gray-700">John Doe</p>
          <p className="text-sm text-gray-700">123 Main St, Anytown, USA 12345</p>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="w-full" onClick={() => navigateTo('history')}>
          View Order History
        </Button>
        <Button variant="default" size="sm" className="w-full" onClick={() => navigateTo('home')}>
          Back to Home
        </Button>
      </div>
    </div>
  );
}


// --- Recommendations Page Component ---
function RecommendationsPage({ navigateTo }) {
  const [favorites, setFavorites] = useState({}); // State to track favorites (local to this page for now)

  // Mock data for recommended shops
  const recommendedShops = [
    { id: "rec1", name: "Avocado Toasties", type: "Brunch • $$", distance: "1.1 mi", imgSeed: 10 },
    { id: "rec2", name: "Daily Smoothies", type: "Juice • $", distance: "0.6 mi", imgSeed: 20 },
    { id: "rec3", name: "Green Garden", type: "Salads • $", distance: "0.8 mi", imgSeed: 30 },
    { id: "rec4", name: "Pasta Prime", type: "Italian • $$$", distance: "2.0 mi", imgSeed: 40 },
    { id: "rec5", name: "Café Bloom", type: "Coffee • $$", distance: "1.3 mi", imgSeed: 50 },
    { id: "rec6", name: "Hot Buns Bakery", type: "Bakery • $$", distance: "1.4 mi", imgSeed: 60 },
    { id: "rec7", name: "Fiesta Grill", type: "Mexican • $$", distance: "1.5 mi", imgSeed: 70 },
    { id: "rec8", name: "Tokyo Express", type: "Sushi • $$$", distance: "2.1 mi", imgSeed: 80 }
  ];

  // Toggle favorite status for a shop
  const toggleFavorite = (shopId) => {
    setFavorites(prev => ({ ...prev, [shopId]: !prev[shopId] }));
    // In a real app, this would likely update global state or make an API call
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold mb-2">Recommendations For You</h2>
      {recommendedShops.map((shop) => (
        <Card key={shop.id} className="p-0 shadow-sm rounded-xl overflow-hidden">
          <CardContent className="flex items-center gap-4 p-4">
            <img
              src={`https://placehold.co/80x80/EBF4FF/7F9CF5?text=${shop.name.substring(0, 1)}`} // Placeholder image
              alt={shop.name}
              className="rounded-lg w-16 h-16 object-cover flex-shrink-0" // Ensure image doesn't shrink
              onError={(e) => e.target.src = `https://placehold.co/80x80/EBF4FF/7F9CF5?text=${shop.name.substring(0, 1)}`} // Fallback placeholder
            />
            <div className="flex-grow min-w-0"> {/* Allow text to wrap */}
              <h3 className="text-base font-semibold truncate">{shop.name}</h3> {/* Truncate long names */}
              <p className="text-sm text-gray-600">{shop.type}</p>
              <p className="text-xs text-gray-500">{shop.distance}</p>
            </div>
            <div className="ml-auto flex flex-col gap-2 items-center flex-shrink-0"> {/* Prevent shrinking */}
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
      ))}
      {recommendedShops.length === 0 && <p className="text-center text-gray-500 py-4">No recommendations available right now.</p>}
    </div>
  );
}

// --- History Page Component ---
function HistoryPage({ navigateTo }) {
  // Mock data for past orders - Added item details for receipt
  const pastOrders = [
    {
      id: "ord1", store: "Taco Town", date: "Apr 3, 2025", total: 14.99,
      items: [
        { id: 'taco', name: 'Taco', quantity: 2, price: 3.50 },
        { id: 'burrito', name: 'Burrito', quantity: 1, price: 6.99 },
        { id: 'soda', name: 'Soda', quantity: 1, price: 1.00 } // Adjusted price for total
      ],
      subtotal: 14.99, taxes: 1.20, deliveryFee: 2.50 // Mocked breakdown for receipt
    },
    {
      id: "ord2", store: "Pizza Palace", date: "Mar 30, 2025", total: 22.50,
      items: [
        { id: 'pizza', name: 'Large Pepperoni Pizza', quantity: 1, price: 18.00 },
        { id: 'knots', name: 'Garlic Knots', quantity: 1, price: 4.50 }
      ],
      subtotal: 22.50, taxes: 1.80, deliveryFee: 2.50
    },
    // Add more detailed mock orders if needed...
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Order History</h2>
      {pastOrders.length > 0 ? (
        pastOrders.map(order => (
          <Card key={order.id} className="p-0 rounded-xl overflow-hidden shadow-sm">
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{order.store}</h3>
                  <p className="text-xs text-gray-500">{order.date}</p>
                </div>
                <span className="text-sm font-semibold">${order.total.toFixed(2)}</span>
              </div>
              {/* Display simplified item list */}
              <p className="text-sm text-gray-600 italic">
                {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
              </p>
              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                {/* View Receipt Button */}
                <Button variant="outline" size="xs" onClick={() => navigateTo('receipt', { order: order })}>
                  <FileText className="w-3 h-3 mr-1" /> View Receipt
                </Button>
                <Button variant="outline" size="xs" onClick={() => navigateTo('store', { shopName: encodeURIComponent(order.store) })}>
                  View Store
                </Button>
                <Button variant="default" size="xs">
                  <RefreshCw className="w-3 h-3 mr-1" /> Reorder
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-center text-gray-500 py-6">You haven't placed any orders yet.</p>
      )}
    </div>
  );
}

// --- Receipt Page Component ---
function ReceiptPage({ navigateTo, orderDetails }) {
  // Use orderDetails directly as it now holds the specific order for the receipt
  const order = orderDetails?.order;

  if (!order) {
    // Handle missing order data
    useEffect(() => {
      navigateTo('history'); // Redirect back to history if no order data
    }, [navigateTo]);
    return <div className="text-center py-10 text-gray-500">Loading receipt...</div>;
  }

  // Calculate totals from items if not provided directly in mock data
  const subtotal = order.subtotal || order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = order.deliveryFee ?? 2.50; // Default if not provided
  const taxes = order.taxes ?? subtotal * 0.08; // Default if not provided
  const total = order.total || (subtotal + deliveryFee + taxes); // Use provided total or calculate

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" onClick={() => navigateTo('history')} aria-label="Back to History">
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-bold">Receipt</h2>
      </div>

      <Card className="p-0 rounded-xl overflow-hidden shadow-sm">
        <CardContent className="p-4 space-y-3">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <div>
              <h3 className="font-semibold">{order.store}</h3>
              <p className="text-xs text-gray-500">Order ID: {order.id}</p>
              <p className="text-xs text-gray-500">Date: {order.date}</p>
            </div>
            <Button variant="outline" size="xs">
              <Printer className="w-3 h-3 mr-1" /> Print
            </Button>
          </div>

          {/* Itemized List */}
          <div className="space-y-1">
            <h4 className="text-sm font-medium mb-1">Items:</h4>
            {order.items.map(item => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <span>{item.quantity} x {item.name}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="space-y-1 pt-2 border-t">
            <div className="flex justify-between text-sm"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-sm"><span>Delivery Fee</span><span>${deliveryFee.toFixed(2)}</span></div>
            <div className="flex justify-between text-sm text-gray-600"><span>Taxes</span><span>${taxes.toFixed(2)}</span></div>
            <div className="flex justify-between text-base font-semibold mt-1 border-t pt-2"><span>Total Paid</span><span>${total.toFixed(2)}</span></div>
          </div>

          {/* Payment & Address (Mock) */}
          <div className="pt-2 border-t text-xs text-gray-500 space-y-1">
            <p>Paid with: Visa ending in 1234</p>
            <p>Delivered to: 123 Main St, Anytown, USA 12345</p>
          </div>
        </CardContent>
      </Card>

      <Button variant="default" size="sm" className="w-full" onClick={() => navigateTo('history')}>
        Back to Order History
      </Button>
    </div>
  );
}


// --- Favorites Page Component ---
function FavoritesPage({ navigateTo }) {
  // Mock data for favorite stores - could be fetched or managed in global state
  const [favoriteStores, setFavoriteStores] = useState([
    { id: "fav1", name: "Pasta Prime", type: "Italian • $$$", distance: "2.0 mi", imgSeed: 40 },
    { id: "fav2", name: "Café Bloom", type: "Coffee • $$", distance: "1.3 mi", imgSeed: 50 },
    { id: "fav3", name: "Fiesta Grill", type: "Mexican • $$", distance: "1.5 mi", imgSeed: 70 },
  ]);

  // Function to remove a favorite
  const removeFavorite = (storeId) => {
    setFavoriteStores(prev => prev.filter(store => store.id !== storeId));
    // In a real app, update global state or make API call
    console.log(`Removed favorite: ${storeId}`);
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold mb-2">Your Favorites</h2>
      {favoriteStores.length > 0 ? (
        favoriteStores.map((shop) => (
          <Card key={shop.id} className="p-0 shadow-sm rounded-xl overflow-hidden">
            <CardContent className="flex items-center gap-4 p-4">
              <img
                src={`https://placehold.co/80x80/FFF0F0/CC0000?text=${shop.name.substring(0, 1)}`} // Placeholder image (different color)
                alt={shop.name}
                className="rounded-lg w-16 h-16 object-cover flex-shrink-0"
                onError={(e) => e.target.src = `https://placehold.co/80x80/FFF0F0/CC0000?text=${shop.name.substring(0, 1)}`}
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
                  className="text-gray-400 hover:text-red-600 p-0" // Adjusted padding
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

// --- Settings Page Component ---
function SettingsPage({ navigateTo }) {
  // Mock state for notification toggles
  const [notifications, setNotifications] = useState({
    promos: true,
    orderUpdates: true,
    news: false,
  });

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    // In real app, save settings
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
          {/* List existing addresses - simplified */}
          <div className="text-sm text-gray-700 p-2 border rounded-md bg-gray-50">Home - 123 Main St...</div>
          <div className="text-sm text-gray-700 p-2 border rounded-md bg-gray-50">Work - 456 Office Ave...</div>
          <Button variant="outline" size="sm" className="w-full">Manage Addresses</Button>
        </CardContent>
      </Card>

      {/* Payment Methods Section */}
      <Card className="p-0 rounded-xl overflow-hidden shadow-sm">
        <CardContent className="p-4 space-y-3">
          <h3 className="text-base font-semibold flex items-center gap-2"><CreditCard className="w-5 h-5 text-red-600" /> Payment Methods</h3>
          {/* List existing payment methods - simplified */}
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

      {/* Logout Button */}
      <Button variant="destructive" size="sm" className="w-full flex items-center gap-2">
        <LogOut className="w-4 h-4" /> Log Out
      </Button>
    </div>
  );
}


// --- Simple Page Component (Placeholder for less complex pages like 'Popular') ---
function SimplePage({ title, navigateTo }) {
  // Placeholder for pages not yet fully implemented
  return <div className="text-center py-10 text-gray-500">{title} Page (Content Coming Soon)</div>;
}


// --- Home Page Component ---
function HomePage({ orderCategories, cuisineCategories, promotionalAds, popularStores, recentOrders, guessYouLike, navigateTo }) {
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  return (
    <>
      {/* Search Bar - Fixed Icon Overlap */}
      <div className="flex items-center gap-2 relative">
        <Input
          type="text"
          placeholder="Search restaurants or items"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          // Increased left padding to avoid icon overlap
          className="rounded-full shadow pl-10 pr-4 py-2 border w-full"
        />
        {/* Positioned icon absolutely */}
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        {/* Map button */}
        <Button variant="outline" size="icon" className="rounded-full p-2" aria-label="Filter by location">
          <MapPin className="w-5 h-5" />
        </Button>
      </div>

      {/* Order Categories Scroll */}
      <h2 className="font-semibold text-sm mt-4 mb-1">Order Again or Get Essentials</h2>
      <div className="overflow-x-auto pb-2 -mx-4 px-4"> {/* Negative margin trick for edge-to-edge scroll */}
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

      {/* Cuisine Categories Scroll */}
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

      {/* Promotional Ads Scroll */}
      <div className="overflow-x-auto pb-2 -mx-4 px-4">
        <div className="flex gap-4 w-max">
          {promotionalAds.map((ad, index) => (
            <div key={index} className="h-36 min-w-[280px] rounded-2xl bg-gradient-to-r from-red-200 to-yellow-200 shadow-lg p-5 flex flex-col justify-center text-left text-base font-bold text-red-900">
              {ad}
            </div>
          ))}
        </div>
      </div>

      {/* Store Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"> {/* Use start alignment */}
        {[
          { title: "Popular Nearby", data: popularStores, color: 'orange', link: 'popular' }, // Link target for popular page
          { title: "Recent Orders", data: recentOrders, color: 'green', link: 'history' },
          { title: "Guess You Like", data: guessYouLike, color: 'purple', link: 'recommend' }
        ].map(({ title, data, color, link }, index) => (
          <div className="space-y-2 h-full flex flex-col" key={index}>
            {/* Section Header */}
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-sm">{title}</h2>
              {/* Ensure link target exists in navigateTo logic */}
              <Button variant="link" size="sm" onClick={() => navigateTo(link)} className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1 p-0 h-auto">
                View more <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            {/* Section Content Grid */}
            <div className="grid grid-cols-2 gap-3 flex-grow">
              {data.slice(0, 4).map((item, idx) => ( // Show max 4 items initially
                <Card
                  key={idx}
                  className={`p-2 shadow-sm rounded-xl bg-${color}-50 hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col`} // Ensure cards fill height
                  onClick={() => item.name && navigateTo('store', { shopName: encodeURIComponent(item.name) })} // Navigate on click if it's a store
                >
                  <CardContent className="flex flex-col items-center justify-center gap-1 text-center flex-grow p-2"> {/* Adjust padding */}
                    <Store className={`w-5 h-5 text-${color}-600 mb-1`} />
                    <span className="text-xs font-medium leading-tight">{item.name || item.store}</span>
                    {item.type && <span className="text-[10px] text-gray-600">{item.type}</span>}
                    {item.price && <span className="text-[10px]">{item.price}</span>}
                    {item.distance && <span className="text-[10px] text-gray-500">{item.distance}</span>}
                    {item.date && <span className="text-[10px] text-gray-500">{item.date}</span>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// --- Main App Component ---
export default function DoorDashPrototype() {
  // State for navigation and app data
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'recommend', 'history', 'favorites', 'settings', 'cart', 'store', 'popular', 'summary', 'receipt'
  const [currentStore, setCurrentStore] = useState(null); // To hold data for the store page, e.g., { shopName: '...' }
  const [currentOrderDetails, setCurrentOrderDetails] = useState(null); // To hold data for summary OR receipt page
  const [mode, setMode] = useState("delivery"); // 'delivery' or 'pickup'
  const [balance] = useState(24.50); // User balance
  const [selectedAddress, setSelectedAddress] = useState("Home"); // Currently selected address
  const addresses = ["Home", "Work", "123 Main St", "Office"]; // Available addresses
  const [cart, setCart] = useState([]); // Global cart state

  // --- Cart Management Functions ---
  const addToCart = (item, quantity) => {
    setCart(prevCart => {
      // Ensure item has a valid storeName
      if (!item.storeName) {
        console.error("Attempted to add item without storeName:", item);
        return prevCart; // Or handle error appropriately
      }
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);

      if (existingItemIndex > -1) {
        // Update quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        // Add new item
        // Check if cart is empty or if adding from the same store
        if (prevCart.length > 0 && prevCart[0].storeName !== item.storeName) {
          console.warn("Added item from different store. Replacing cart.");
          // Optionally, show a confirmation dialog to the user here
          return [{ ...item, quantity }]; // Replace cart
        }
        return [...prevCart, { ...item, quantity }]; // Add to existing cart
      }
    });
  };

  const updateCartQuantity = (itemId, newQuantity) => {
    setCart(prevCart => {
      if (newQuantity <= 0) {
        return prevCart.filter(item => item.id !== itemId);
      } else {
        return prevCart.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };
  // --- End Cart Management ---


  // Mock data
  const orderCategories = ["Alcohol", "Convenience", "Grocery", "Flower", "Bakery", "Pharmacy", "Pet Supplies", "Snacks", "Ice Cream", "Water"];
  const cuisineCategories = ["Sushi", "Pizza", "Thai", "Ramen", "Chinese", "Bubble Tea", "Mexican", "Indian", "Korean", "Burgers", "BBQ", "Salads"];
  const promotionalAds = [
    "Enjoy 20% Off Your First Three Orders! 🍔🍕🥤",
    "Free Delivery for Orders Over $25 This Week! 🚚💨",
    "Get $10 Credit for Referring a Friend! 👯‍♀️💵",
    "Limited Time: BOGO on Select Restaurants! 🥡🍱",
    "Order Now and Win a $100 Gift Card! 🎁🎉"
  ];
  const popularStores = [
    { name: "Panda Express", type: "Chinese", price: "$$", distance: "1.2 mi" },
    { name: "Starbucks", type: "Coffee", price: "$", distance: "0.5 mi" },
    { name: "Domino's Pizza", type: "Pizza", price: "$$", distance: "1.8 mi" },
    { name: "Subway", type: "Sandwiches", price: "$", distance: "1.0 mi" }
  ];
  const recentOrders = [
    { store: "Taco Town", price: "$14.99", date: "Apr 3" }, // Simplified for HomePage display
    { store: "Pizza Palace", price: "$22.50", date: "Mar 30" },
    { store: "Sushi Go", price: "$18.75", date: "Mar 28" },
    { store: "Burger Barn", price: "$12.40", date: "Mar 25" }
  ];
  const guessYouLike = [
    { name: "Grill House", type: "BBQ", price: "$$$", distance: "2.3 mi" },
    { name: "Curry Express", type: "Indian", price: "$$", distance: "1.6 mi" },
    { name: "Smoothie Stop", type: "Juice Bar", price: "$", distance: "0.9 mi" },
    { name: "Noodle Bowl", type: "Asian Fusion", price: "$$", distance: "1.4 mi" }
  ];

  // Function to toggle delivery/pickup mode
  const toggleMode = () => setMode(mode === "pickup" ? "delivery" : "pickup");

  // Navigation function to change pages and pass data
  const navigateTo = (page, data = null) => {
    // Define valid page identifiers
    const validPages = ['home', 'recommend', 'history', 'favorites', 'settings', 'cart', 'store', 'popular', 'summary', 'receipt']; // Added 'receipt'
    if (!validPages.includes(page)) {
      console.warn(`Navigation attempt to invalid page: ${page}. Defaulting to home.`);
      page = 'home'; // Default to home if page is invalid
    }

    // Handle data passing for specific pages
    if (page === 'store') {
      setCurrentStore(data);
      setCurrentOrderDetails(null); // Clear order/receipt details
    } else if (page === 'summary' || page === 'receipt') {
      // Use currentOrderDetails to hold data for both summary and receipt
      setCurrentOrderDetails(data);
      setCurrentStore(null); // Clear store details
    } else {
      // Clear specific page data when navigating to general pages
      setCurrentStore(null);
      setCurrentOrderDetails(null);
    }

    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  // Calculate total number of items in cart for the badge
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Function to render the current page based on state
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage
          orderCategories={orderCategories}
          cuisineCategories={cuisineCategories}
          promotionalAds={promotionalAds}
          popularStores={popularStores}
          recentOrders={recentOrders}
          guessYouLike={guessYouLike}
          navigateTo={navigateTo}
        />;
      case 'recommend':
        return <RecommendationsPage navigateTo={navigateTo} />;
      case 'history':
        return <HistoryPage navigateTo={navigateTo} />;
      case 'favorites':
        return <FavoritesPage navigateTo={navigateTo} />;
      case 'settings':
        return <SettingsPage navigateTo={navigateTo} />;
      case 'cart':
        return <CartPage
          navigateTo={navigateTo}
          cart={cart}
          updateCartQuantity={updateCartQuantity}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          balance={balance}
        />;
      case 'store':
        // Ensure currentStore has data before rendering
        return currentStore ? <StorePage
          shopName={currentStore.shopName} // Pass the encoded name
          navigateTo={navigateTo}
          addToCart={addToCart}
        /> : <HomePage navigateTo={navigateTo} />; // Fallback if no store data
      case 'summary':
        // Pass the order details stored in currentOrderDetails
        return <CheckoutSummaryPage navigateTo={navigateTo} orderDetails={currentOrderDetails} />;
      case 'receipt':
        // Pass the order details (stored in currentOrderDetails) to ReceiptPage
        return <ReceiptPage navigateTo={navigateTo} orderDetails={currentOrderDetails} />;
      case 'popular': // Use SimplePage as a placeholder for now
        return <SimplePage title="Popular Nearby" navigateTo={navigateTo} />;
      default:
        // Fallback to home page
        return <HomePage /* pass props */ navigateTo={navigateTo} />;
    }
  };

  // Data for bottom navigation bar
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'recommend', label: 'Recommend', icon: ThumbsUp },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="p-4 pb-24 space-y-4 bg-gray-50 min-h-screen font-sans"> {/* Added background color and font */}
      {/* Top Bar */}
      <TopBar
        mode={mode}
        toggleMode={toggleMode}
        balance={balance}
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
        addresses={addresses}
        navigateTo={navigateTo}
        cartItemCount={cartItemCount} // Pass cart item count
      />

      {/* Dynamically Rendered Page Content */}
      <main className="mt-4">
        {renderPage()}
      </main>


      {/* Bottom Navigation Bar */}
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
    </div>
  );
}
