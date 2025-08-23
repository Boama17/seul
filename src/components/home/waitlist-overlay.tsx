// components/WaitlistOverlay.tsx
'use client';

import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Image from 'next/image';
import logo from "@/assets/img/white.png";

interface WaitlistOverlayProps {
  onComplete: () => void;
  targetDate: string; // Format: "2025-12-31T23:59:59"
}

const WaitlistOverlay: React.FC<WaitlistOverlayProps> = ({ onComplete, targetDate }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [error, setError] = useState('');

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YaKqT3F4mm8mkagRw');
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // EmailJS template parameters
      const templateParams = {
        user_email: email,
        to_name: 'New Subscriber',
        from_name: 'Your Brand Name',
        message: `New waitlist signup: ${email}`,
        reply_to: email,
        timestamp: new Date().toLocaleString(),
      };

      const result = await emailjs.send(
        'service_nimssm9', // Your service ID
        'template_b939pw7', // Replace with your template ID
        templateParams
      );

      console.log('Email sent successfully:', result);
      setIsSubmitted(true);
      
      // Wait 2 seconds then allow access to main site
      setTimeout(() => {
        onComplete();
      }, 2000);
      
    } catch (error) {
      console.error('Email sending failed:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (time: number) => {
    return time.toString().padStart(2, '0');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>
      
      <div className="relative max-w-lg w-full bg-white border border-gray-200 rounded-lg p-8 shadow-2xl">
        {!isSubmitted ? (
          <>
            {/* Logo/Brand Area */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-black rounded-full mx-auto mb-6 flex items-center justify-center">
                <Image src={logo} alt="Logo" className="w-16 h-16 object-cover" />
              </div>
              <h1 className="text-3xl font-bold text-black mb-2">Coming Soon</h1>
              <p className="text-gray-600 text-lg">Something great is in the works</p>
            </div>

            {/* Countdown Timer */}
            <div className="mb-8">
              <div className="grid grid-cols-4 gap-3">
                <div className="text-center">
                  <div className="bg-black text-white rounded-lg p-4 mb-2">
                    <div className="text-2xl font-bold font-mono">{formatTime(timeLeft.days)}</div>
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">Days</div>
                </div>
                <div className="text-center">
                  <div className="bg-black text-white rounded-lg p-4 mb-2">
                    <div className="text-2xl font-bold font-mono">{formatTime(timeLeft.hours)}</div>
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">Hours</div>
                </div>
                <div className="text-center">
                  <div className="bg-black text-white rounded-lg p-4 mb-2">
                    <div className="text-2xl font-bold font-mono">{formatTime(timeLeft.minutes)}</div>
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">Min</div>
                </div>
                <div className="text-center">
                  <div className="bg-black text-white rounded-lg p-4 mb-2">
                    <div className="text-2xl font-bold font-mono">{formatTime(timeLeft.seconds)}</div>
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">Sec</div>
                </div>
              </div>
            </div>

            {/* Subscription Message */}
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-black mb-2">Be the first to know</h2>
              <p className="text-gray-600 leading-relaxed">Join our waitlist and get exclusive early access when we launch.</p>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  disabled={isSubmitting}
                />
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Joining waitlist...
                  </span>
                ) : (
                  'Join the Waitlist'
                )}
              </button>
            </form>

            <p className="text-gray-500 text-xs text-center mt-6">
              No spam, unsubscribe at any time.
            </p>
          </>
        ) : (
          /* Success State */
          <div className="text-center">
            <div className="w-16 h-16 bg-black rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-black mb-2">You&apos;re all set!</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">Thanks for joining our waitlist. We&apos;ll notify you when we launch!</p>
            <p className="text-gray-500 text-sm">Redirecting to the main site...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaitlistOverlay;