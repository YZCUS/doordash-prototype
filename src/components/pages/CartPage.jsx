import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { Input } from '@/components/ui/Input.jsx';
import { Label } from '@/components/ui/Label.jsx';
import { Switch } from '@/components/ui/Switch.jsx';
import { MinusCircle, PlusCircle, Trash2 } from 'lucide-react';

// Cart Page Component
export default function CartPage({ navigateTo, cart, updateCartQuantity, removeFromCart, clearCart, balance }) {
    const [useBalance, setUseBalance] = useState(false);

    // Calculate cart totals
    const subtotal = cart.reduce((sum, item) => sum + item.priceValue * item.quantity, 0);
    const deliveryFee = cart.length > 0 ? 2.50 : 0; // Example fixed delivery fee
    const taxes = subtotal * 0.08; // Example 8% tax rate
    const orderTotal = subtotal + deliveryFee + taxes;
    const balanceToApply = useBalance ? Math.min(balance, orderTotal) : 0;
    const finalTotal = orderTotal - balanceToApply;

    // Determine the store name (assuming all items are from the same store)
    const storeName = cart.length > 0 && cart[0].storeName ? cart[0].storeName : "Your";

    const handlePlaceOrder = () => {
        if (cart.length === 0) return; // Prevent placing order with empty cart

        // Prepare order details object
        const orderDetails = {
            items: [...cart], // Create a copy of the cart items
            subtotal,
            deliveryFee,
            taxes,
            balanceApplied: balanceToApply,
            finalTotal,
            storeName,
            orderId: `DD${Date.now()}`, // Generate a simple mock order ID
            orderDate: new Date().toLocaleDateString(),
            // Add other necessary details like payment method, address, etc.
        };

        // Navigate to the summary page with order details
        navigateTo('summary', orderDetails);
        clearCart(); // Clear the cart after placing the order
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">Your Cart</h2>
            {cart.length > 0 && <p className="text-sm text-gray-600">From: <span className="font-medium">{storeName}</span></p>}

            {/* Cart Items List */}
            <div className="space-y-2">
                {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 border rounded-lg bg-white shadow-sm">
                        <div className="flex-grow mr-3">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500">${item.priceValue.toFixed(2)} each</p>
                            {/* Quantity Controls */}
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
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-semibold mb-2">${(item.priceValue * item.quantity).toFixed(2)}</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-red-600 p-0" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                ))}
                {/* Empty Cart Message */}
                {cart.length === 0 && <p className="text-center text-gray-500 py-4">Your cart is empty.</p>}
            </div>

            {/* Order Summary and Actions (only if cart is not empty) */}
            {cart.length > 0 && (
                <>
                    {/* Promo Code Section */}
                    <div className="space-y-2">
                        <Label htmlFor="promo" className="text-sm font-medium text-gray-700">Promo Code</Label>
                        <div className="flex items-center gap-2">
                            <Input id="promo" type="text" placeholder="Enter promo code" className="w-full sm:w-1/2" />
                            <Button variant="outline" size="sm" className="whitespace-nowrap">Apply</Button>
                        </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-1 pt-4 border-t">
                        <div className="flex justify-between text-sm"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                        <div className="flex justify-between text-sm"><span>Delivery Fee</span><span>${deliveryFee.toFixed(2)}</span></div>
                        <div className="flex justify-between text-sm text-gray-600"><span>Taxes</span><span>${taxes.toFixed(2)}</span></div>
                        <div className="flex justify-between text-sm font-medium mt-1 border-t pt-1"><span>Order Total</span><span>${orderTotal.toFixed(2)}</span></div>
                    </div>

                    {/* Use Balance Section (only if balance > 0) */}
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

                    {/* Payment Method and Place Order */}
                    <div className="space-y-4 pt-4 border-t">
                        <div>
                            <h3 className="text-sm font-semibold mb-2">Payment Method</h3>
                            <div className="flex gap-2 flex-wrap">
                                {/* Mock Payment Buttons/Selector */}
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
                        <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t w-full gap-2">
                            <span className="text-lg font-semibold">Pay: ${finalTotal.toFixed(2)}</span>
                            <Button
                                size="sm"
                                className="w-full sm:w-auto"
                                disabled={cart.length === 0} // Already checked above, but good practice
                                onClick={handlePlaceOrder}
                            >
                                Place Order
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
} 