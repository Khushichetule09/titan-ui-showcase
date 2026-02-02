'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
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

  return (
    <div className="w-full overflow-x-hidden bg-black" style={{ color: '#f5f1ed' }}>
      {/* Sticky Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black backdrop-blur-md border-b' : 'bg-transparent'
        }`}
        style={{ borderColor: scrolled ? '#333333' : 'transparent' }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <motion.div className="text-2xl font-serif font-bold tracking-tight">
            Luxé
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {[
              { label: 'Services', id: 'services' },
              { label: 'About', id: 'about' },
              { label: 'Portfolio', id: 'portfolio' },
              { label: 'Contact', id: 'contact' },
            ].map((link) => (
              <motion.button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm tracking-widest uppercase transition-colors relative group"
                style={{ color: '#f5f1ed' }}
                whileHover={{ y: -2 }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#d4af37' }} />
              </motion.button>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div className="hidden sm:block" whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            <Button className="font-medium tracking-widest uppercase text-xs px-8 py-3 h-auto border-0 rounded-full" 
              style={{ backgroundColor: '#d4af37', color: '#000000' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5c158'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#d4af37'}
            >
              Get Started
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden"
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
              className="md:hidden bg-black p-6 space-y-4"
              style={{ backgroundColor: '#1a1a1a', borderTop: '1px solid #333333' }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {[
                { label: 'Services', id: 'services' },
                { label: 'About', id: 'about' },
                { label: 'Portfolio', id: 'portfolio' },
                { label: 'Contact', id: 'contact' },
              ].map((link) => (
                <motion.button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left text-sm tracking-widest uppercase transition-colors py-2"
                  style={{ color: '#f5f1ed' }}
                  whileHover={{ x: 8 }}
                >
                  {link.label}
                </motion.button>
              ))}
            <Button className="w-full font-medium tracking-widest uppercase text-xs py-3 h-auto border-0 mt-4 rounded-full"
              style={{ backgroundColor: '#d4af37', color: '#000000' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5c158'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#d4af37'}
            >
              Get Started
            </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-black flex items-center justify-center pt-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Golden Spotlight Light */}
        <div className="hero-spotlight" />

        <div className="max-w-5xl mx-auto text-center z-10 relative">
          <motion.p
            className="text-xs sm:text-sm tracking-widest uppercase mb-6"
            style={{ color: '#d4af37' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Premium Design & Consulting
          </motion.p>

          {/* Enhanced Heading with Glow and Underline */}
          <motion.div
            className="underline-light mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h1 className="section-heading" style={{ color: '#f5f1ed' }}>
              Elevate Your{' '}
              <span className="gold-highlight gold-glow-text">
                Vision
              </span>
            </h1>
          </motion.div>

          <motion.p
            className="text-lg sm:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#999999' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Discover premium design solutions crafted for discerning businesses. Transform your brand with timeless elegance and strategic vision.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="px-8 sm:px-12 py-4 font-medium tracking-widest uppercase text-sm h-auto border-0 flex items-center gap-2 rounded-full"
              style={{ backgroundColor: '#d4af37', color: '#000000' }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Our Work
              <ArrowRight size={18} />
            </motion.button>
            <motion.button 
              className="px-8 sm:px-12 py-4 border-2 font-medium tracking-widest uppercase text-sm h-auto rounded-full"
              style={{ backgroundColor: 'transparent', color: '#d4af37', borderColor: '#d4af37' }}
              whileHover={{ scale: 1.08, backgroundColor: '#d4af37', color: '#000000' }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown style={{ color: '#d4af37' }} size={32} />
        </motion.div>
      </section>

      {/* Wave Divider */}
      <svg
        className="w-full h-24 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="xMidYMid slice"
        style={{ color: '#1a1a1a' }}
      >
        <path d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z" />
      </svg>

      {/* Services Section - Cream Background */}
      <section id="services" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#f5f1ed', color: '#000000' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true, margin: '-100px' }}
          >
            <p className="text-xs sm:text-sm tracking-widest uppercase mb-4" style={{ color: '#d4af37' }}>Our Expertise</p>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-6">Premium Services</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive solutions designed to elevate your brand presence and create lasting impact.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              {
                title: 'Strategic Design',
                description: 'Thoughtfully crafted visual identity that captures your brand essence and resonates with your audience.',
              },
              {
                title: 'Brand Consulting',
                description: 'Expert guidance to establish and refine your brand positioning in the competitive market landscape.',
              },
              {
                title: 'Digital Solutions',
                description: 'Cutting-edge web and digital experiences that blend aesthetics with functionality seamlessly.',
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                variants={fadeInUp}
                whileHover={{ y: -8 }}
              >
                <div className="h-1 w-12 mb-6 group-hover:w-20 transition-all duration-300" style={{ backgroundColor: '#d4af37' }} />
                <h3 className="text-2xl font-serif font-bold mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Wave Divider */}
      <svg
        className="w-full h-24 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="xMidYMid slice"
        style={{ color: '#f5f1ed' }}
      >
        <path d="M0,50 Q300,100 600,50 T1200,50 L1200,0 L0,0 Z" />
      </svg>

  {/* About Section */}
  <section id="about" className="bg-black py-20 sm:py-32 px-4 sm:px-6 lg:px-8" style={{ color: '#f5f1ed' }}>
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.p 
            className="text-xs sm:text-sm tracking-widest uppercase mb-4" 
            style={{ color: '#d4af37' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            About Us
          </motion.p>
          <motion.h2 
            className="text-4xl sm:text-5xl font-serif font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Crafted for Excellence
          </motion.h2>
          <motion.p 
            className="text-lg mb-6 leading-relaxed"
            style={{ color: '#999999' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            With over a decade of experience, we've helped leading brands establish their presence through innovative design and strategic thinking.
          </motion.p>
          <motion.p 
            className="text-base leading-relaxed mb-8"
            style={{ color: '#888888' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our approach combines timeless design principles with modern insights, creating solutions that stand the test of time and resonate with audiences.
          </motion.p>
          <motion.button
            className="flex items-center gap-2 group font-medium tracking-widest uppercase text-sm rounded-full px-8 py-3 border-2 transition-all"
            style={{ color: '#d4af37', borderColor: '#d4af37', backgroundColor: 'transparent' }}
            whileHover={{ scale: 1.08, backgroundColor: '#d4af37', color: '#000000' }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Read Our Story
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </motion.button>
        </motion.div>

        <motion.div
          className="about-image-container relative h-96 sm:h-[500px] shadow-2xl"
          style={{ boxShadow: '0 20px 60px rgba(212, 175, 55, 0.1), 0 40px 80px rgba(0, 0, 0, 0.5)' }}
          initial={{ opacity: 0, x: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <img
            src="/about-image.jpg"
            alt="Luxury Design Studio - Our Team and Workspace"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </div>
  </section>

      {/* Wave Divider */}
      <svg
        className="w-full h-24 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="xMidYMid slice"
        style={{ color: '#1a1a1a' }}
      >
        <path d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z" />
      </svg>

  {/* Portfolio Section - Premium Cards with Real Images */}
  <section id="portfolio" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ backgroundColor: '#000000', color: '#f5f1ed' }}>
    <div className="max-w-7xl mx-auto">
      <motion.div
        className="text-center mb-16 sm:mb-24"
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={{ once: true, margin: '-100px' }}
      >
        <p className="text-xs sm:text-sm tracking-widest uppercase mb-4" style={{ color: '#d4af37' }}>Featured Work</p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold">Our Portfolio</h2>
      </motion.div>

      {/* Portfolio Grid - Responsive Layout */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {[
          { image: '/portfolio-1.jpg', title: 'Luxury Brand Identity', category: 'Branding', span: 'lg:col-span-2' },
          { image: '/portfolio-2.jpg', title: 'Digital Experience Design', category: 'Web Design' },
          { image: '/portfolio-3.jpg', title: 'Mobile App Interface', category: 'Product Design' },
          { image: '/portfolio-4.jpg', title: 'Editorial Campaign', category: 'Marketing' },
          { image: '/portfolio-5.jpg', title: 'Premium Packaging', category: 'Branding', span: 'md:col-span-2' },
          { image: '/portfolio-6.jpg', title: 'Corporate Identity', category: 'Consulting' },
        ].map((project, idx) => (
          <motion.div
            key={idx}
            className={`group cursor-pointer relative overflow-hidden rounded-3xl h-80 sm:h-96 lg:h-80 ${project.span || ''}`}
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            {/* Image Background */}
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Dark Overlay - visible on hover */}
            <div
              className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-100 opacity-60"
              style={{
                background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%)'
              }}
            />

            {/* Text Content - always visible */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2 group-hover:text-white transition-colors duration-300">
                {project.title}
              </h3>
              <p
                className="font-medium tracking-widest uppercase text-xs transition-opacity duration-300"
                style={{ color: '#d4af37' }}
              >
                {project.category}
              </p>
            </div>

            {/* Gold Accent Line on Hover */}
            <div
              className="absolute top-0 left-0 right-0 h-1 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
              style={{ backgroundColor: '#d4af37' }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* View All Projects Button */}
      <motion.div
        className="flex justify-center mt-16 sm:mt-20"
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.button
          className="px-10 sm:px-12 py-4 sm:py-5 font-medium tracking-widest uppercase text-sm rounded-full border-2 transition-all duration-300"
          style={{
            color: '#d4af37',
            borderColor: '#d4af37',
            backgroundColor: 'transparent'
          }}
          whileHover={{
            scale: 1.08,
            backgroundColor: '#d4af37',
            color: '#000000'
          }}
          whileTap={{ scale: 0.95 }}
        >
          View All Projects
        </motion.button>
      </motion.div>
    </div>
  </section>

      {/* Wave Divider */}
      <svg
        className="w-full h-24 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="xMidYMid slice"
        style={{ color: '#f5f1ed' }}
      >
        <path d="M0,50 Q300,100 600,50 T1200,50 L1200,0 L0,0 Z" />
      </svg>

      {/* Contact Section */}
      <section id="contact" className="bg-black py-20 sm:py-32 px-4 sm:px-6 lg:px-8" style={{ color: '#f5f1ed' }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true, margin: '-100px' }}
          >
            <p className="text-xs sm:text-sm tracking-widest uppercase mb-6" style={{ color: '#d4af37' }}>Let's Connect</p>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-8">Ready to Create Something Extraordinary?</h2>
            <p className="text-gray-400 text-lg mb-12 leading-relaxed">
              Reach out to discuss your project, vision, and how we can elevate your brand to new heights.
            </p>

            <motion.form
              className="space-y-4 max-w-md mx-auto"
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              viewport={{ once: true }}
            >
              <motion.input
                type="email"
                placeholder="your@email.com"
                className="w-full px-6 py-4 focus:outline-none transition-colors"
                style={{ backgroundColor: '#2a2a2a', borderColor: '#333333', border: '1px solid #333333', color: '#f5f1ed' }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#d4af37'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#333333'}
                variants={fadeInUp}
              />
              <motion.button
                type="submit"
                className="w-full px-8 py-4 font-medium tracking-widest uppercase text-sm transition-all flex items-center justify-center gap-2 rounded-full"
                style={{ backgroundColor: '#d4af37', color: '#000000' }}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
                <ArrowRight size={18} />
              </motion.button>
            </motion.form>

            <p className="text-gray-500 text-sm mt-8">
              Or call us directly at <span className="font-medium" style={{ color: '#d4af37' }}>+1 (555) 123-4567</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 px-4 sm:px-6 lg:px-8" style={{ borderTop: '1px solid #333333', color: '#f5f1ed' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-serif text-2xl font-bold mb-4">Luxé</h3>
              <p className="text-gray-500 text-sm">Premium design & consulting for discerning brands.</p>
            </div>
            {[
              { title: 'Services', links: ['Design', 'Consulting', 'Strategy'] },
              { title: 'Company', links: ['About', 'Team', 'Careers'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Contact'] },
            ].map((column, index) => (
              <div key={index}>
                <h4 className="font-medium mb-4 tracking-widest uppercase text-xs">{column.title}</h4>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-500 transition-colors text-sm" style={{ color: '#999999' }} onMouseEnter={(e) => e.currentTarget.style.color = '#d4af37'} onMouseLeave={(e) => e.currentTarget.style.color = '#999999'}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid #333333' }}>
            <p className="text-gray-500 text-sm">© 2024 Luxé Studio. All rights reserved.</p>
            <div className="flex gap-6">
              {['Instagram', 'LinkedIn', 'Twitter'].map((social) => (
                <a key={social} href="#" className="text-gray-500 transition-colors text-sm" style={{ color: '#999999' }} onMouseEnter={(e) => e.currentTarget.style.color = '#d4af37'} onMouseLeave={(e) => e.currentTarget.style.color = '#999999'}>
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
