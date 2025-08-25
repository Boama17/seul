// components/WaitlistOverlay.tsx
'use client';

import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Image from 'next/image';
import logo from "@/assets/img/white.png";

interface WaitlistOverlayProps {
  onComplete: () => void;
}

const WaitlistOverlay: React.FC<WaitlistOverlayProps> = ({ onComplete }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [error, setError] = useState('');

  // 🔹 Countdown target = September 21st of the current year
  const currentYear = new Date().getFullYear();
  const targetDate = new Date(`${currentYear}-09-21T00:00:00`).toISOString();

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
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6">
      {/* Animated backdrop with subtle pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:30px_30px] animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black to-black opacity-70"></div>
      </div>
      
      {/* Main content container - landscape layout */}
      <div className="relative w-full max-w-5xl h-auto min-h-[450px] bg-black border border-gray-800 rounded-2xl p-10 shadow-2xl backdrop-blur-md bg-opacity-90 flex flex-col lg:flex-row items-center justify-between gap-10">
        {!isSubmitted ? (
          <>
            {/* Left side - Branding and countdown */}
            <div className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-900 to-black rounded-full mb-8 flex items-center justify-center p-1 shadow-lg">
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center border border-gray-800">
                  <Image src={logo} alt="Logo" className="w-48 h-48 object-contain" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Coming Soon</h1>
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-5"></div>
              <p className="text-gray-400 text-lg mb-8">Something extraordinary is brewing</p>

              {/* Countdown Timer */}
              <div className="w-full mb-8">
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { value: timeLeft.days, label: 'Days' },
                    { value: timeLeft.hours, label: 'Hours' },
                    { value: timeLeft.minutes, label: 'Min' },
                    { value: timeLeft.seconds, label: 'Sec' }
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 text-white rounded-xl p-3 mb-2 shadow-lg">
                        <div className="text-xl font-bold font-mono tracking-wide">{formatTime(item.value)}</div>
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-widest font-medium">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="flex-1 w-full max-w-md">
              <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-2xl p-8 shadow-lg">
                <div className="text-center mb-7">
                  <h2 className="text-2xl font-semibold text-white mb-3">Join the Waitlist</h2>
                  <p className="text-gray-400">Be the first to know when we launch</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-5 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all duration-300"
                      disabled={isSubmitting}
                    />
                    {error && <p className="text-red-400 text-sm mt-2 px-1">{error}</p>}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-black font-semibold py-4 px-6 rounded-xl hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Securing your spot...
                      </span>
                    ) : (
                      'Join Now'
                    )}
                  </button>
                </form>

                <p className="text-gray-600 text-xs text-center mt-6">
                  We respect your privacy. No spam, unsubscribe anytime.
                </p>
              </div>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="w-full text-center py-10">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-900 to-black rounded-full mx-auto mb-8 flex items-center justify-center p-1 shadow-lg">
              <div className="w-full h-full bg-black rounded-full flex items-center justify-center border border-gray-800">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">You&apos;re on the list!</h2>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto mb-5"></div>
            <p className="text-gray-400 mb-8 leading-relaxed max-w-md mx-auto">Thank you for joining our waitlist. We&apos;ll notify you as soon as we launch!</p>
            <div className="inline-flex items-center justify-center mt-6 px-5 py-3 bg-gray-900 rounded-xl border border-gray-800">
              <div className="h-2 w-2 bg-white rounded-full animate-ping mr-3"></div>
              <p className="text-gray-400 text-sm">Redirecting you now...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaitlistOverlay;