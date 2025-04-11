import React, { useEffect } from 'react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Printer, FileText, ChevronLeft } from 'lucide-react';

// Receipt Page Component
export default function ReceiptPage({ navigateTo, orderDetails }) {
    const order = orderDetails?.order; // Get the order details

    // Redirect to history if order details are missing
    useEffect(() => {
        if (!order) {
            console.warn("ReceiptPage: Order details not found, redirecting to history.");
            navigateTo('history');
        }
    }, [order, navigateTo]);

    if (!order) {
        return <div className="text-center py-10 text-gray-500">Loading receipt...</div>;
    }

    // Calculate totals (use provided values or calculate if missing, assuming mock structure)
    const subtotal = order.subtotal ?? order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = order.deliveryFee ?? 2.50; // Default fee if not provided
    const taxes = order.taxes ?? subtotal * 0.08; // Default tax rate if not provided
    const total = order.total ?? (subtotal + deliveryFee + taxes);

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
                    {/* Store and Order Info */}
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

                    {/* Items List */}
                    <div className="space-y-1">
                        <h4 className="text-sm font-medium mb-1">Items:</h4>
                        {order.items.map(item => (
                            <div key={item.id} className="flex justify-between items-center text-sm">
                                <span>{item.quantity} x {item.name}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-1 pt-2 border-t">
                        <div className="flex justify-between text-sm"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                        <div className="flex justify-between text-sm"><span>Delivery Fee</span><span>${deliveryFee.toFixed(2)}</span></div>
                        <div className="flex justify-between text-sm text-gray-600"><span>Taxes</span><span>${taxes.toFixed(2)}</span></div>
                        <div className="flex justify-between text-base font-semibold mt-1 border-t pt-2"><span>Total Paid</span><span>${total.toFixed(2)}</span></div>
                    </div>

                    {/* Payment and Delivery Info */}
                    <div className="pt-2 border-t text-xs text-gray-500 space-y-1">
                        <p>Paid with: Visa ending in 1234</p> {/* Mock data */}
                        <p>Delivered to: 123 Main St, Anytown, USA 12345</p> {/* Mock data */}
                    </div>
                </CardContent>
            </Card>

            <Button variant="default" size="sm" className="w-full" onClick={() => navigateTo('history')}>
                Back to Order History
            </Button>
        </div>
    );
} 