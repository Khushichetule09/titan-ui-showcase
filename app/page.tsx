'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Clock, Watch } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Collections', id: 'collections' },
    { label: 'Showcase', id: 'showcase' },
    { label: 'Craftsmanship', id: 'craftsmanship' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <div className="w-full overflow-x-hidden bg-black" style={{ color: '#f5f1ed' }}>
      {/* Premium Sticky Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-black/95 backdrop-blur-lg border-b' 
            : 'bg-transparent'
        }`}
        style={{ borderColor: scrolled ? '#333333' : 'transparent' }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 lg:py-5">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ 
                  background: 'linear-gradient(135deg, #d4af37 0%, #f5f1ed 100%)',
                  boxShadow: '0 4px 15px rgba(212, 175, 55, 0.2)'
                }}
              >
                <Watch size={20} style={{ color: '#1a1a1a' }} />
              </div>
              <span className="text-xl font-serif font-bold tracking-wide hidden sm:inline">TITAN</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-sm tracking-widest uppercase transition-colors relative group py-2"
                  style={{ color: '#f5f1ed' }}
                  whileHover={{ y: -1 }}
                >
                  {link.label}
                  <span 
                    className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                    style={{ backgroundColor: '#d4af37' }}
                  />
                </motion.button>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div className="hidden sm:block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className="font-medium tracking-widest uppercase text-xs px-6 py-2.5 h-auto border-0 rounded-full transition-all duration-300"
                style={{ 
                  backgroundColor: '#d4af37', 
                  color: '#000000',
                  boxShadow: '0 4px 15px rgba(212, 175, 55, 0.25)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e5c158';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(212, 175, 55, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#d4af37';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.25)';
                }}
              >
                Shop Now
              </Button>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2"
              style={{ color: '#f5f1ed' }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                className="lg:hidden border-t"
                style={{ borderColor: '#333333' }}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-2 py-4 space-y-2">
                  {navLinks.map((link) => (
                    <motion.button
                      key={link.id}
                      onClick={() => scrollToSection(link.id)}
                      className="block w-full text-left px-4 py-3 text-sm tracking-widest uppercase rounded-lg transition-colors"
                      style={{ color: '#f5f1ed' }}
                      whileHover={{ backgroundColor: '#333333' }}
                    >
                      {link.label}
                    </motion.button>
                  ))}
                  <Button 
                    className="w-full mt-4 font-medium tracking-widest uppercase text-xs py-2.5 h-auto border-0 rounded-full"
                    style={{ backgroundColor: '#d4af37', color: '#000000' }}
                  >
                    Shop Now
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Elements */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
          <motion.p
            className="text-xs sm:text-sm tracking-widest uppercase mb-6"
            style={{ color: '#d4af37' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Precision Beyond Time
          </motion.p>

          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold mb-8 leading-tight"
            style={{ color: '#f5f1ed' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Timeless
            <br />
            <span style={{ color: '#d4af37' }}>Elegance</span>
            {' '}Crafted
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#999999' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Premium watches, wall clocks, and smart timepieces. Where precision engineering meets artistic mastery.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button 
              className="px-8 py-3 h-auto border-0 rounded-full font-medium tracking-widest uppercase text-sm transition-all"
              style={{ 
                backgroundColor: '#d4af37', 
                color: '#000000',
                boxShadow: '0 4px 20px rgba(212, 175, 55, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(212, 175, 55, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(212, 175, 55, 0.3)';
              }}
            >
              Explore Collections
            </Button>
            <motion.button
              onClick={() => scrollToSection('showcase')}
              className="flex items-center gap-2 px-8 py-3 border-2 rounded-full font-medium tracking-widest uppercase text-sm transition-all group"
              style={{ borderColor: '#d4af37', color: '#d4af37' }}
              whileHover={{ backgroundColor: '#d4af37', color: '#000000' }}
            >
              View Showcase
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div 
            className="w-6 h-10 border-2 rounded-full flex items-center justify-center"
            style={{ borderColor: '#d4af37' }}
          >
            <div 
              className="w-1 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: '#d4af37' }}
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Collections */}
      <section id="collections" className="relative w-full py-20 lg:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16 lg:mb-24"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true, margin: '-100px' }}
          >
            <p className="text-xs sm:text-sm tracking-widest uppercase mb-4" style={{ color: '#d4af37' }}>
              Our Collections
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-6">
              Curated Excellence
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Each collection represents the pinnacle of craftsmanship and innovation.
            </p>
          </motion.div>

          {/* Collections Grid */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 lg:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              {
                icon: Watch,
                title: 'Analog Watches',
                description: 'Mechanical precision with timeless aesthetics. Crafted for those who appreciate true horology.',
              },
              {
                icon: Home,
                title: 'Wall Clocks',
                description: 'Sophisticated home decor that measures moments. Elevate any space with our elegant designs.',
              },
              {
                icon: Clock,
                title: 'Smart Timepieces',
                description: 'Modern technology meets classic design. Stay connected without compromising elegance.',
              },
            ].map((collection, idx) => {
              const IconComponent = collection.icon;
              return (
                <motion.div
                  key={idx}
                  className="group relative p-8 rounded-2xl transition-all duration-300"
                  style={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #333333',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                  }}
                  variants={fadeInUp}
                  whileHover={{
                    border: '1px solid #d4af37',
                    boxShadow: '0 20px 40px rgba(212, 175, 55, 0.15)',
                    y: -5,
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-all"
                    style={{ 
                      backgroundColor: '#2a2a2a',
                      color: '#d4af37',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#d4af37';
                      e.currentTarget.style.color = '#1a1a1a';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#2a2a2a';
                      e.currentTarget.style.color = '#d4af37';
                    }}
                  >
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-3">{collection.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{collection.description}</p>
                  <motion.button
                    className="flex items-center gap-2 text-sm font-medium tracking-widest uppercase transition-colors"
                    style={{ color: '#d4af37' }}
                    whileHover={{ gap: '8px' }}
                  >
                    Explore <ArrowRight size={14} />
                  </motion.button>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Product Showcase */}
      <section id="showcase" className="relative w-full py-20 lg:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16 lg:mb-24"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true, margin: '-100px' }}
          >
            <p className="text-xs sm:text-sm tracking-widest uppercase mb-4" style={{ color: '#d4af37' }}>
              Featured Pieces
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold">
              Iconic Masterpieces
            </h2>
          </motion.div>

          {/* Product Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              { image: '/portfolio-1.jpg', title: 'Eternal Chronograph', price: '$2,499' },
              { image: '/portfolio-2.jpg', title: 'Meridian Wall Piece', price: '$899' },
              { image: '/portfolio-3.jpg', title: 'Chronicle Smart', price: '$1,299' },
              { image: '/portfolio-4.jpg', title: 'Prestige Edition', price: '$3,499' },
              { image: '/portfolio-5.jpg', title: 'Heritage Set', price: '$4,999' },
              { image: '/portfolio-6.jpg', title: 'Nexus Smart Clock', price: '$699' },
            ].map((product, idx) => (
              <motion.div
                key={idx}
                className="group relative overflow-hidden rounded-xl"
                variants={fadeInUp}
                whileHover={{ y: -8 }}
              >
                {/* Image Container */}
                <div className="relative h-72 lg:h-80 overflow-hidden bg-gray-900">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, transparent 50%)',
                    }}
                  />
                </div>

                {/* Product Info */}
                <motion.div
                  className="p-6 pb-8"
                  style={{ backgroundColor: '#1a1a1a' }}
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                >
                  <h3 className="text-lg font-serif font-bold mb-2">{product.title}</h3>
                  <div className="flex items-center justify-between">
                    <span style={{ color: '#d4af37' }} className="font-medium">
                      {product.price}
                    </span>
                    <motion.button
                      className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase transition-colors"
                      style={{ color: '#d4af37' }}
                      whileHover={{ gap: '6px' }}
                    >
                      View <ArrowRight size={12} />
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section id="craftsmanship" className="relative w-full py-20 lg:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              viewport={{ once: true, margin: '-100px' }}
            >
              <motion.p
                className="text-xs sm:text-sm tracking-widest uppercase mb-4"
                style={{ color: '#d4af37' }}
                variants={fadeInUp}
              >
                Our Heritage
              </motion.p>
              <motion.h2
                className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-8"
                variants={fadeInUp}
              >
                Precision Crafted Since Inception
              </motion.h2>
              <motion.p
                className="text-gray-400 text-lg leading-relaxed mb-8"
                variants={fadeInUp}
              >
                Every Titan timepiece is born from decades of expertise. Our master craftsmen combine traditional techniques with modern innovation to create instruments of uncompromising quality.
              </motion.p>
              <motion.div
                className="space-y-4"
                variants={staggerContainer}
              >
                {[
                  { label: 'Swiss-Inspired Movements', value: '100%' },
                  { label: 'Hand-Assembled Components', value: '100%' },
                  { label: 'Quality Control Checks', value: '50+' },
                ].map((stat, idx) => (
                  <motion.div key={idx} className="flex items-center gap-4" variants={fadeInUp}>
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: '#d4af37' }}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-300">{stat.label}</p>
                      <p style={{ color: '#d4af37' }} className="text-xl font-bold">
                        {stat.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div
              className="relative h-80 lg:h-96 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src="/about-image.jpg"
                alt="Titan Craftsmanship"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust & Warranty Section */}
      <section className="relative w-full py-20 lg:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid md:grid-cols-3 gap-8 lg:gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              {
                title: 'Lifetime Warranty',
                description: 'Every Titan timepiece comes with comprehensive lifetime protection against defects.',
              },
              {
                title: 'Free Maintenance',
                description: 'Annual service appointments to keep your timepiece in pristine condition.',
              },
              {
                title: 'Authenticity Guaranteed',
                description: 'Certificate of authenticity with every purchase. Complete chain of custody.',
              },
            ].map((guarantee, idx) => (
              <motion.div
                key={idx}
                className="text-center"
                variants={fadeInUp}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ 
                    backgroundColor: '#d4af37',
                    color: '#1a1a1a',
                  }}
                >
                  <Check size={20} />
                </div>
                <h3 className="text-lg font-serif font-bold mb-3">{guarantee.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{guarantee.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-20 lg:py-32 bg-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.p
              className="text-xs sm:text-sm tracking-widest uppercase mb-6"
              style={{ color: '#d4af37' }}
              variants={fadeInUp}
            >
              Ready to Own Elegance
            </motion.p>
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-8"
              variants={fadeInUp}
            >
              Discover Your Perfect Timepiece
            </motion.h2>
            <motion.p
              className="text-lg text-gray-400 mb-12 max-w-xl mx-auto"
              variants={fadeInUp}
            >
              Explore our complete collection or speak with a specialist to find the timepiece that matches your style.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={fadeInUp}
            >
              <Button 
                className="px-8 py-3 h-auto border-0 rounded-full font-medium tracking-widest uppercase text-sm transition-all"
                style={{ 
                  backgroundColor: '#d4af37', 
                  color: '#000000',
                }}
              >
                Shop Collection
              </Button>
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="flex items-center gap-2 px-8 py-3 border-2 rounded-full font-medium tracking-widest uppercase text-sm group"
                style={{ borderColor: '#d4af37', color: '#d4af37' }}
                whileHover={{ backgroundColor: '#d4af37', color: '#000000' }}
              >
                Contact Us
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black border-t" style={{ borderColor: '#333333' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid md:grid-cols-4 gap-8 lg:gap-12 mb-12 lg:mb-16">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
                <Watch size={20} style={{ color: '#d4af37' }} />
                TITAN
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Precision timepieces for those who demand excellence.
              </p>
            </motion.div>

            {/* Collections */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-medium text-sm tracking-widest uppercase mb-4">Collections</h4>
              <ul className="space-y-2">
                {['Watches', 'Wall Clocks', 'Smart Timepieces', 'Limited Editions'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 text-sm hover:text-gray-200 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-medium text-sm tracking-widest uppercase mb-4">Support</h4>
              <ul className="space-y-2">
                {['Warranty', 'Service Centers', 'FAQs', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 text-sm hover:text-gray-200 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="font-medium text-sm tracking-widest uppercase mb-4">Legal</h4>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms & Conditions', 'Shipping Info', 'Returns'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 text-sm hover:text-gray-200 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t" style={{ borderColor: '#333333' }}>
            <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 text-xs tracking-widest uppercase">
                © 2024 Titan Timepieces. Precision Since Inception.
              </p>
              <div className="flex items-center gap-6">
                {['Instagram', 'Facebook', 'LinkedIn'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-gray-500 text-xs hover:text-gray-200 transition-colors"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Check icon component
function Check({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
