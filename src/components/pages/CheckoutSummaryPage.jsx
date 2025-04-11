import React, { useEffect } from 'react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { CheckCircle, MapPin } from 'lucide-react';

// Checkout Summary Page Component
export default function CheckoutSummaryPage({ navigateTo, orderDetails }) {
    // Redirect to home if order details are missing
    useEffect(() => {
        if (!orderDetails) {
            console.warn("CheckoutSummaryPage: Order details not found, redirecting to home.");
            navigateTo('home');
        }
    }, [orderDetails, navigateTo]);

    if (!orderDetails) {
        return <div className="text-center py-10 text-gray-500">Loading summary...</div>;
    }

    const { items, subtotal, deliveryFee, taxes, balanceApplied, finalTotal, storeName, orderId, orderDate } = orderDetails;
    const estimatedDeliveryTime = "30-45 minutes"; // Mock data

    return (
        <div className="space-y-6">
            {/* Order Confirmation Header */}
            <div className="text-center space-y-2">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                <h2 className="text-2xl font-bold">Order Placed!</h2>
                <p className="text-gray-600">Thank you for your order from <span className="font-medium">{storeName}</span>.</p>
                <p className="text-sm text-gray-500">Order ID: {orderId}</p>
                <p className="text-sm text-gray-500">Estimated Delivery: {estimatedDeliveryTime}</p>
            </div>

            {/* Order Summary Card */}
            <Card className="p-0 rounded-xl overflow-hidden shadow-sm">
                <CardContent className="p-4 space-y-2">
                    <h3 className="text-base font-semibold mb-2">Order Summary ({orderDate})</h3>
                    {items.map(item => (
                        <div key={item.id} className="flex justify-between items-center text-sm border-b border-gray-100 pb-1">
                            <span>{item.quantity} x {item.name}</span>
                            {/* Ensure priceValue exists and is a number before calling toFixed */}
                            <span>${(typeof item.priceValue === 'number' ? item.priceValue * item.quantity : 0).toFixed(2)}</span>
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

            {/* Delivery Address Card (Mock Data) */}
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