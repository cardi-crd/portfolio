'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ImageStack from '@/components/ImageStack';
import { useScrollLock } from '@/lib/useScrollLock';

export default function Home() {
  const [isPhoneMenuOpen, setIsPhoneMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu and clear locks whenever route changes (including back to "/")
  useEffect(() => {
    setIsPhoneMenuOpen(false);
    document.body.classList.remove('no-scroll');
    document.body.style.overflow = '';
  }, [pathname]);

  // Use robust scroll lock for phone menu
  useScrollLock(isPhoneMenuOpen);
  
  const phoneNumber = '+1 (520) 609-6912'
  
  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`
    setIsPhoneMenuOpen(false)
  }
  
  const handleText = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber)
      alert('Number has been copied to your clipboard')
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = phoneNumber
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      alert('Number has been copied to your clipboard')
    }
    setIsPhoneMenuOpen(false)
  }

  return (
    <main className="min-h-screen bg-black">
      {/* Header with Hamburger Menu */}
      <header className="p-6 relative z-50">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-xl font-medium text-white">
            Portfolio
          </div>
          
          {/* Phone Menu Button */}
          <button
            onClick={() => setIsPhoneMenuOpen(!isPhoneMenuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Contact options"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-8">
            {['Work', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white/70 hover:text-white transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        {/* Phone Menu Dropdown */}
        <AnimatePresence mode="wait" onExitComplete={() => {
          document.body.style.overflow = '';
        }}>
          {isPhoneMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                key="phone-backdrop"
                id="phone-backdrop"
                className="fixed inset-0 z-[1200]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.18 } }}
                onAnimationStart={(def) => {
                  if (def === 'exit' && matchMedia('(pointer: coarse)').matches) {
                    const n = document.getElementById('phone-backdrop');
                    if (n) n.style.pointerEvents = 'none';
                  }
                }}
                onClick={() => setIsPhoneMenuOpen(false)}
              />
              
              {/* Phone Options Panel */}
              <motion.div
                className="absolute top-20 right-6 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              >
                <div className="p-2">
                  <button
                    onClick={handleCall}
                    className="flex items-center space-x-3 w-full px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>Call</span>
                  </button>
                  <button
                    onClick={handleText}
                    className="flex items-center space-x-3 w-full px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Text</span>
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <ImageStack />
      </div>
    </main>
  )
}
