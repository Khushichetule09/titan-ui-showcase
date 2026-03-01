'use client';

import { useState } from 'react';
import { Watch, ArrowLeft, CreditCard, Banknote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';

export default function Checkout() {
    const router = useRouter();
    const { items, clearCart } = useCart();
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');

    if (items.length === 0) {
        if (typeof window !== 'undefined') {
            router.push('/');
        }
        return null;
    }

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        clearCart();
        router.push('/confirmation');
    };

    const inputStyle = {
        backgroundColor: '#1a1a1a',
        border: '1px solid #333333',
        color: '#ffdbfd',
        padding: '12px 16px',
        borderRadius: '12px',
        width: '100%',
        outline: 'none',
    };

    return (
        <div className="w-full overflow-x-hidden bg-black min-h-screen" style={{ color: '#ffdbfd' }}>
            {/* Static Navbar */}
            <nav className="border-b bg-black/95 backdrop-blur-lg sticky top-0 z-50" style={{ borderColor: '#333333' }}>
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
                        <Link href="/cart" className="text-sm font-medium tracking-widest uppercase transition-colors flex items-center gap-2" style={{ color: '#6367ff' }}>
                            <ArrowLeft size={16} /> Back to Cart
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-12">
                    Checkout
                </h1>

                <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-16">
                    {/* Billing Details */}
                    <div className="space-y-8">
                        <h3 className="text-2xl font-serif font-bold tracking-wide border-b pb-4" style={{ borderColor: '#333333' }}>
                            Billing Details
                        </h3>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Full Name</label>
                                <input required type="text" style={inputStyle} placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Email Address</label>
                                <input required type="email" style={inputStyle} placeholder="john@example.com" />
                            </div>
                            <div className="space-y-2 sm:col-span-2">
                                <label className="text-sm font-medium text-gray-400">Street Address</label>
                                <input required type="text" style={inputStyle} placeholder="123 Luxury Avenue" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">City</label>
                                <input required type="text" style={inputStyle} placeholder="Metropolis" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">State / Province</label>
                                <input required type="text" style={inputStyle} placeholder="New York" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">ZIP / Postal Code</label>
                                <input required type="text" style={inputStyle} placeholder="10001" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Phone</label>
                                <input required type="tel" style={inputStyle} placeholder="+1 234 567 8900" />
                            </div>
                            <div className="space-y-2 sm:col-span-2">
                                <label className="text-sm font-medium text-gray-400">Country</label>
                                <select required style={{ ...inputStyle, WebkitAppearance: 'none' }} className="bg-[#1a1a1a]">
                                    <option value="usa">United States</option>
                                    <option value="uk">United Kingdom</option>
                                    <option value="can">Canada</option>
                                    <option value="aus">Australia</option>
                                    <option value="ind">India</option>
                                </select>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <h3 className="text-2xl font-serif font-bold tracking-wide border-b pb-4 mt-12" style={{ borderColor: '#333333' }}>
                            Payment Method
                        </h3>
                        <div className="space-y-4">
                            <div
                                onClick={() => setPaymentMethod('card')}
                                className={`p-6 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'ring-2 ring-[#6367ff]' : ''}`}
                                style={{ backgroundColor: '#1a1a1a', border: '1px solid #333333' }}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <CreditCard size={24} style={{ color: paymentMethod === 'card' ? '#6367ff' : '#666' }} />
                                    <span className="text-lg font-medium">Credit / Debit Card</span>
                                </div>
                                {paymentMethod === 'card' && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                                        <input required type="text" style={inputStyle} placeholder="Card Number" />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input required type="text" style={inputStyle} placeholder="MM/YY" />
                                            <input required type="text" style={inputStyle} placeholder="CVC" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div
                                onClick={() => setPaymentMethod('upi')}
                                className={`p-6 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'upi' ? 'ring-2 ring-[#6367ff]' : ''}`}
                                style={{ backgroundColor: '#1a1a1a', border: '1px solid #333333' }}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <Banknote size={24} style={{ color: paymentMethod === 'upi' ? '#6367ff' : '#666' }} />
                                    <span className="text-lg font-medium">UPI ID</span>
                                </div>
                                {paymentMethod === 'upi' && (
                                    <div className="animate-in fade-in slide-in-from-top-2">
                                        <input required type="text" style={inputStyle} placeholder="example@upi" />
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Order Review */}
                    <div className="lg:col-span-1">
                        <div className="p-8 rounded-2xl sticky top-28" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333333' }}>
                            <h3 className="text-2xl font-serif font-bold mb-6 border-b pb-4" style={{ borderColor: '#333333' }}>Order Review</h3>

                            <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4 items-center">
                                        <img src={item.image} alt={item.title} className="w-16 h-16 rounded-lg object-cover border" style={{ borderColor: '#333333' }} />
                                        <div className="flex-1">
                                            <h4 className="font-serif font-bold text-sm tracking-wide">{item.title}</h4>
                                            <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                                        </div>
                                        <span className="font-medium">${(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 text-sm mt-8">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal</span>
                                    <span className="text-white">${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Estimated Tax (10%)</span>
                                    <span className="text-white">${tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Shipping</span>
                                    <span className="text-white">Free Priority</span>
                                </div>
                                <div className="border-t pt-4 mt-4" style={{ borderColor: '#333333' }}>
                                    <div className="flex justify-between font-bold text-2xl">
                                        <span>Total</span>
                                        <span style={{ color: '#6367ff' }}>${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full mt-8 font-medium tracking-widest uppercase text-xs py-4 h-auto border-0 rounded-full transition-all duration-300 flex items-center justify-center"
                                style={{
                                    backgroundColor: '#6367ff',
                                    color: '#000000',
                                    boxShadow: '0 4px 15px rgba(99, 103, 255, 0.25)'
                                }}
                            >
                                Place Order · ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </Button>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}
