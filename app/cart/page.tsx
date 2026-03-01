'use client';

import { useState } from 'react';
import { Watch, ArrowRight, ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';

export default function Cart() {
    const { items, updateQuantity, removeFromCart, clearCart } = useCart();
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    return (
        <div className="w-full overflow-x-hidden bg-black min-h-screen" style={{ color: '#ffdbfd' }}>
            {/* Static Navbar */}
            <nav className="border-b bg-black/95 backdrop-blur-lg" style={{ borderColor: '#333333' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-4 lg:py-5">
                        <Link href="/" className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center"
                                style={{
                                    background: 'linear-gradient(135deg, #6367ff 0%, #ffdbfd 100%)',
                                    boxShadow: '0 4px 15px rgba(99, 103, 255, 0.2)'
                                }}
                            >
                                <Watch size={20} style={{ color: '#1a1a1a' }} />
                            </div>
                            <span className="text-xl font-serif font-bold tracking-wide hidden sm:inline">TITAN</span>
                        </Link>
                        <Link href="/" className="text-sm font-medium tracking-widest uppercase transition-colors flex items-center gap-2" style={{ color: '#6367ff' }}>
                            <ArrowLeft size={16} /> Continue Shopping
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Cart Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-12">
                    Your Cart
                </h1>

                {items.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-lg text-gray-400 mb-8">Your cart is empty.</p>
                        <Link href="/">
                            <Button
                                className="px-8 py-3 h-auto border-0 rounded-full font-medium tracking-widest uppercase text-sm"
                                style={{
                                    backgroundColor: '#6367ff',
                                    color: '#000000',
                                    boxShadow: '0 4px 15px rgba(99, 103, 255, 0.25)'
                                }}
                            >
                                Return to Shop
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-6">
                            {/* Product Summary */}
                            {items.map((item) => (
                                <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333333' }}>
                                    <div className="w-full sm:w-32 h-32 overflow-hidden rounded-xl bg-gray-900 shrink-0">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 w-full text-center sm:text-left">
                                        <h3 className="text-xl font-serif font-bold mb-2">{item.title}</h3>
                                        <p style={{ color: '#6367ff' }} className="font-medium text-lg mb-4">
                                            ${item.price.toLocaleString()}
                                        </p>
                                        <div className="flex items-center justify-center sm:justify-start gap-4">
                                            <div className="flex items-center gap-4 bg-black px-4 py-2 rounded-full border" style={{ borderColor: '#333333' }}>
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="hover:text-white transition-colors">
                                                    <Minus size={14} />
                                                </button>
                                                <span className="font-medium text-sm w-4 text-center">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="hover:text-white transition-colors">
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-300 transition-colors p-2">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="hidden sm:block text-right">
                                        <p className="text-lg font-bold">
                                            ${(item.price * item.quantity).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="p-8 rounded-2xl sticky top-24" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333333' }}>
                                <h3 className="text-2xl font-serif font-bold mb-6">Order Summary</h3>
                                <div className="space-y-4 mb-8 text-sm">
                                    <div className="flex justify-between text-gray-400">
                                        <span>Subtotal</span>
                                        <span className="text-white">${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span>Estimated Tax (10%)</span>
                                        <span className="text-white">${tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="border-t pt-4 mt-4" style={{ borderColor: '#333333' }}>
                                        <div className="flex justify-between font-bold text-lg">
                                            <span>Total</span>
                                            <span style={{ color: '#6367ff' }}>${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                        </div>
                                    </div>
                                </div>
                                <Link href="/checkout" className="w-full flex">
                                    <Button
                                        className="w-full font-medium tracking-widest uppercase text-xs py-4 h-auto border-0 rounded-full transition-all duration-300"
                                        style={{
                                            backgroundColor: '#6367ff',
                                            color: '#000000',
                                            boxShadow: '0 4px 15px rgba(99, 103, 255, 0.25)'
                                        }}
                                    >
                                        Proceed to Checkout
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
