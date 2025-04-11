import React, { useState } from 'react';
import { Card, CardContent } from '../ui/Card.jsx';
import { Button } from '../ui/Button.jsx';
import { FileText, RefreshCw } from 'lucide-react';

// History Page Component
export default function HistoryPage({ navigateTo }) {
    // Mock past orders data (replace with actual data fetching)
    const pastOrders = [
        {
            id: "ord1",
            store: "Taco Town",
            date: "Apr 3, 2025",
            total: 14.99,
            items: [
                { id: 'taco', name: 'Taco', quantity: 2, price: 3.50 },
                { id: 'burrito', name: 'Burrito', quantity: 1, price: 6.99 },
                { id: 'soda', name: 'Soda', quantity: 1, price: 1.00 },
            ],
            subtotal: 13.99, // Note: Example values might not perfectly sum up
            taxes: 1.00,
            deliveryFee: 2.50
        },
        {
            id: "ord2",
            store: "Pizza Palace",
            date: "Mar 30, 2025",
            total: 22.50,
            items: [
                { id: 'pizza', name: 'Large Pepperoni Pizza', quantity: 1, price: 18.00 },
                { id: 'knots', name: 'Garlic Knots', quantity: 1, price: 4.50 },
            ],
            subtotal: 22.50,
            taxes: 1.80,
            deliveryFee: 2.50
        },
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
                            <p className="text-sm text-gray-600 italic">
                                {/* Displaying item names and quantities */}
                                {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                            </p>
                            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
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