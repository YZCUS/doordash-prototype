import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent } from '../ui/Card.jsx';
import { Button } from '../ui/Button.jsx';
import { Input } from '../ui/Input.jsx';
import { Label } from '../ui/Label.jsx';
import { Switch } from '../ui/Switch.jsx';
import { MinusCircle, PlusCircle, Trash2 } from 'lucide-react';

// Cart Page Component
export default function CartPage({ navigateTo, cart, updateCartQuantity, removeFromCart, clearCart, balance, mode }) {
    // const [useBalance, setUseBalance] = useState(false);
    const [balanceInput, setBalanceInput] = useState(''); // State to hold the input value as string

    // Calculate cart totals (memoized for performance)
    const { subtotal, deliveryFee, taxes, orderTotal } = useMemo(() => {
        const subtotalCalc = cart.reduce((sum, item) => sum + item.priceValue * item.quantity, 0);
        const deliveryFeeCalc = cart.length > 0 && mode === 'delivery' ? 2.50 : 0;
        const taxesCalc = subtotalCalc * 0.08;
        const orderTotalCalc = subtotalCalc + deliveryFeeCalc + taxesCalc;
        return { subtotal: subtotalCalc, deliveryFee: deliveryFeeCalc, taxes: taxesCalc, orderTotal: orderTotalCalc };
    }, [cart, mode]);

    // Calculate the actual balance to apply based on input and constraints
    const balanceApplied = useMemo(() => {
        const inputAmount = parseFloat(balanceInput) || 0;
        const maxApplicable = Math.min(balance, orderTotal); // Cannot apply more than available balance or order total
        return Math.max(0, Math.min(inputAmount, maxApplicable)); // Ensure applied balance is non-negative and within limits
    }, [balanceInput, balance, orderTotal]);

    const finalTotal = useMemo(() => orderTotal - balanceApplied, [orderTotal, balanceApplied]);

    // Effect to adjust balanceInput if it exceeds the new maximum applicable balance
    useEffect(() => {
        const currentInputAmount = parseFloat(balanceInput);
        // Only proceed if balanceInput is a valid number greater than 0
        if (!isNaN(currentInputAmount) && currentInputAmount > 0) {
            const maxApplicable = Math.min(balance, orderTotal);
            if (currentInputAmount > maxApplicable) {
                console.log(`[CartPage Effect] Adjusting balance input from ${currentInputAmount} down to ${maxApplicable.toFixed(2)} due to orderTotal/balance change.`);
                setBalanceInput(maxApplicable.toFixed(2));
            }
        }
        // Add balanceInput to dependencies to re-run check if user manually changes input
        // Add orderTotal and balance as they determine the maxApplicable limit
    }, [orderTotal, balance, balanceInput]);

    // Determine the store name (assuming all items are from the same store)
    const storeName = cart.length > 0 && cart[0].storeName ? cart[0].storeName : "Your";

    // Handler for balance input change
    const handleBalanceInputChange = (e) => {
        const value = e.target.value;
        // Basic validation: allow empty, or numbers potentially with a decimal point and up to 2 decimal places
        if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
            // Further validation could be added here to prevent exceeding limits *during* input
            // For now, we rely on the balanceApplied calculation
            // setBalanceInput(value); // Moved setBalanceInput call after potential adjustment

            const inputAmount = parseFloat(value);
            const maxApplicable = Math.min(balance, orderTotal);

            // Check if the input amount exceeds the maximum applicable balance
            if (!isNaN(inputAmount) && inputAmount > maxApplicable) {
                // If it exceeds, set the input to the maximum applicable value
                setBalanceInput(maxApplicable.toFixed(2));
            } else {
                // Otherwise, set the input to the user's entered value
                setBalanceInput(value);
            }
        }
    };

    // Handler to apply the maximum possible balance
    const applyMaxBalance = () => {
        const maxApplicable = Math.min(balance, orderTotal);
        setBalanceInput(maxApplicable.toFixed(2)); // Set input to the max possible value, formatted
    };

    const handlePlaceOrder = () => {
        if (cart.length === 0) return;

        // Prepare order details object
        const orderDetails = {
            items: [...cart],
            subtotal,
            deliveryFee,
            taxes,
            balanceApplied,
            finalTotal,
            storeName,
            orderId: `DD${Date.now()}`,
            orderDate: new Date().toLocaleDateString(),
            mode: mode, // Add the current mode to the order details
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
                        {/* Only show delivery fee if it's greater than 0 */}
                        {deliveryFee > 0 && (
                            <div className="flex justify-between text-sm"><span>Delivery Fee</span><span>${deliveryFee.toFixed(2)}</span></div>
                        )}
                        <div className="flex justify-between text-sm text-gray-600"><span>Taxes</span><span>${taxes.toFixed(2)}</span></div>
                        <div className="flex justify-between text-sm font-medium mt-1 border-t pt-1"><span>Order Total</span><span>${orderTotal.toFixed(2)}</span></div>
                    </div>

                    {/* Use Balance Section (only if balance > 0) */}
                    {balance > 0 && (
                        <div className="pt-4 border-t">
                            {/* Replaced Switch with Input field */}
                            <Label htmlFor="balanceInput" className="text-sm font-medium text-gray-700">
                                Apply Balance (Available: ${balance.toFixed(2)})
                            </Label>
                            <div className="flex items-center gap-2 mt-1">
                                <Input
                                    id="balanceInput"
                                    type="number"
                                    placeholder={`Max $${Math.min(balance, orderTotal).toFixed(2)}`}
                                    value={balanceInput}
                                    onChange={handleBalanceInputChange}
                                    className="w-full flex-grow"
                                    max={Math.min(balance, orderTotal).toFixed(2)} // HTML5 validation attribute
                                    min="0"
                                    step="0.01"
                                    aria-label={`Apply balance, available ${balance.toFixed(2)}`}
                                />
                                <Button variant="outline" size="sm" onClick={applyMaxBalance} className="whitespace-nowrap flex-shrink-0">Apply Max</Button>
                            </div>
                            {/* Display the amount actually being applied */}
                            <p className="text-xs text-green-600 mt-1 text-right">
                                Applying: ${balanceApplied.toFixed(2)}
                            </p>
                            {/* Optional: Add validation error messages here */}
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