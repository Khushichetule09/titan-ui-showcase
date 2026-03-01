'use client';

import { CheckCircle, Watch, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Confirmation() {
    const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();

    return (
        <div className="w-full overflow-x-hidden bg-black min-h-screen flex flex-col items-center justify-center text-center" style={{ color: '#ffdbfd' }}>

            {/* Static Navbar */}
            <nav className="absolute top-0 left-0 right-0 border-b bg-black/95 backdrop-blur-lg z-50" style={{ borderColor: '#333333' }}>
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
                            Back to Shop
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl mx-auto px-4 py-32"
            >
                <div className="flex justify-center mb-8">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center bg-[#1a1a1a] border border-[#333333]">
                        <CheckCircle size={48} style={{ color: '#6367ff' }} />
                    </div>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-6">
                    Order Confirmed
                </h1>

                <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-lg mx-auto">
                    Thank you for choosing Titan. Your order has been placed successfully and is being processed for white-glove delivery.
                </p>

                <div className="bg-[#1a1a1a] border border-[#333333] rounded-2xl p-8 mb-12">
                    <p className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-widest">Order Number</p>
                    <p className="text-2xl font-bold font-serif" style={{ color: '#6367ff' }}>#{orderNumber}</p>

                    <div className="border-t border-[#333333] my-6"></div>

                    <p className="text-sm text-gray-400">
                        A confirmation email with shipping details has been sent to your inbox.
                    </p>
                </div>

                <Link href="/">
                    <Button
                        className="px-12 py-4 h-auto border-0 rounded-full font-medium tracking-widest uppercase text-xs transition-all duration-300"
                        style={{
                            backgroundColor: '#6367ff',
                            color: '#000000',
                            boxShadow: '0 4px 15px rgba(99, 103, 255, 0.25)'
                        }}
                    >
                        Continue Shopping <ArrowLeft className="ml-2 inline" size={16} />
                    </Button>
                </Link>
            </motion.div>
        </div>
    );
}
