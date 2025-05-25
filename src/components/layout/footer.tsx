"use client";
import { useState } from 'react';
import Link from 'next/link';
import { InstagramLogo, TiktokLogo, WhatsappLogo } from '@phosphor-icons/react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const handleSubmit = () => {
    console.log('Newsletter signup:', { email, birthdate });
    setEmail('');
    setBirthdate('');
  };

  return (
    <footer className="bg-white text-black py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Social Media Icons - Top */}
        <div className="flex justify-center gap-8 mb-12">
          <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition duration-200">
            <InstagramLogo size={32} color="black" />
          </Link>
          <Link href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition duration-200">
            <TiktokLogo size={32} color="black" />
          </Link>
          <Link href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition duration-200">
            <WhatsappLogo size={32} color="black" />
          </Link>
        </div>

        {/* Newsletter Signup */}
        <div className="text-center mb-16">
          <h3 className="text-lg font-bold mb-8 tracking-wide">
            SIGN UP TO OUR NEWSLETTER & GET A GIFT ON YOUR BIRTHDAY
          </h3>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-transparent border-b border-black placeholder-gray-600 text-black px-0 py-2 w-full sm:w-80 focus:outline-none focus:border-gray-700"
            />
            <input
              type="text"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              placeholder="DD/MM/YYYY"
              className="bg-transparent border-b border-black placeholder-gray-600 text-black px-0 py-2 w-full sm:w-40 focus:outline-none focus:border-gray-700"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="border border-black text-black px-12 py-3 font-bold tracking-wider hover:bg-black hover:text-white transition duration-300"
          >
            SUBSCRIBE
          </button>
        </div>

        {/* Footer Links */}
        <div className="space-y-8">
          <div className="text-left">
            <Link href="/about" className="text-lg font-bold mb-4 hover:opacity-70 transition duration-200">
              ABOUT
            </Link>
          </div>
          
          <div className="text-left">
            <Link href="/support" className="text-lg font-bold mb-4 hover:opacity-70 transition duration-200">
              SUPPORT
            </Link>
          </div>
          
          <div className="text-left">
            <Link href="/careers" className="text-lg font-bold mb-4 hover:opacity-70 transition duration-200">
              CAREERS
            </Link>
          </div>
          
          <div className="text-left">
            <Link href="/privacy-policy" className="text-lg font-bold mb-4 hover:opacity-70 transition duration-200">
              PRIVACY POLICY
            </Link>
          </div>
          
          <div className="text-left">
            <Link href="/terms-conditions" className="text-lg font-bold mb-8 hover:opacity-70 transition duration-200">
              TERMS & CONDITIONS
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-gray-200">
          <p className="text-gray-600">© Seul Lumion 2025</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;