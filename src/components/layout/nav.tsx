/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { JSX, useState, useEffect } from "react";
import React from "react";
import { Search, User, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/img/white.png";
import one from "@/assets/img/one.jpg";
import two from "@/assets/img/two.jpg";
import three from "@/assets/img/three.jpg";
import four from "@/assets/img/009.jpeg";
import five from "@/assets/img/002.jpeg";
import six from "@/assets/img/017.jpeg";

type NavOption = {
  id: string;
  title: string;
  hasDropdown: boolean;
  content?: string;
  href?: string;
};

interface NavigationProps {
  textColor?: string;
  hoverBorderColor?: string;
  mobileIconColor?: string;
}

export default function Navigation({ 
  textColor = "text-white", 
  hoverBorderColor = "border-white",
  mobileIconColor = "text-white"
}: NavigationProps) {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if we're on mobile when component mounts and when window is resized
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  const navOptions: NavOption[] = [
    { id: "home", title: "HOME", hasDropdown: false, href: "/" },
    { id: "shop", title: "SHOP", hasDropdown: true, content: "shop-all-content", href: "/shop" },
    { id: "archive", title: "ARCHIVE / SOLD OUT", hasDropdown: false, href: "/archive" },
    { id: "faq", title: "FAQ", hasDropdown: false, href: "/faq" },
    { id: "contact", title: "CONTACT", hasDropdown: false, href: "/contact" },
  ];

  const rightNavOptions: NavOption[] = [
    { id: "currency", title: "🇬🇭 GBP £", hasDropdown: true, content: "currency-content", href: "#" },
    { id: "cart", title: "", hasDropdown: false, href: "/cart" },
  ];
  
  const currencyContent = (
    <div className="grid grid-cols-1 gap-2 text-black min-w-48">
      <div className="col-span-1">
        <ul className="space-y-2 text-sm">
          <li><button className="hover:text-gray-500 cursor-pointer flex items-center w-full text-left py-1">🇬🇭 GBP £</button></li>
          <li><button className="hover:text-gray-500 cursor-pointer flex items-center w-full text-left py-1">🇺🇸 USD $</button></li>
          <li><button className="hover:text-gray-500 cursor-pointer flex items-center w-full text-left py-1">🇪🇺 EUR €</button></li>
          <li><button className="hover:text-gray-500 cursor-pointer flex items-center w-full text-left py-1">🇳🇬 NGN ₦</button></li>
        </ul>
      </div>
    </div>
  );

  const shopAllContent = (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 text-black">
      <div className="col-span-1">
        <h2 className="font-medium mb-4 text-sm uppercase tracking-wide">Categories</h2>
        <ul className="space-y-3 text-xs">
          <li><Link href="/shop/clothing" className="hover:text-gray-500 cursor-pointer">Clothing</Link></li>
          <li><Link href="/shop/accessories" className="hover:text-gray-500 cursor-pointer">Accessories</Link></li>
          <li><Link href="/shop/footwear" className="hover:text-gray-500 cursor-pointer">Footwear</Link></li>
          <li><Link href="/shop/bags" className="hover:text-gray-500 cursor-pointer">Bags</Link></li>
        </ul>
      </div>
      
      <div className="col-span-1">
        <h2 className="font-medium mb-4 text-sm uppercase tracking-wide">Collections</h2>
        <ul className="space-y-3 text-xs">
          <li><Link href="/shop/new-arrivals" className="hover:text-gray-500 cursor-pointer">New Arrivals</Link></li>
          <li><Link href="/shop/bestsellers" className="hover:text-gray-500 cursor-pointer">Bestsellers</Link></li>
          <li><Link href="/shop/limited-edition" className="hover:text-gray-500 cursor-pointer">Limited Edition</Link></li>
        </ul>
      </div>
      
      <div className="col-span-1">
        <h2 className="font-medium mb-4 text-sm uppercase tracking-wide">Special</h2>
        <ul className="space-y-3 text-xs">
          <li><Link href="/shop/sale" className="hover:text-gray-500 cursor-pointer">Sale Items</Link></li>
          <li><Link href="/shop/pre-order" className="hover:text-gray-500 cursor-pointer">Pre-Order</Link></li>
          <li><Link href="/shop/gift-cards" className="hover:text-gray-500 cursor-pointer">Gift Cards</Link></li>
        </ul>
      </div>
    </div>
  );

  const dropdownContent: Record<string, JSX.Element> = {
    "shop-all-content": shopAllContent,
    "currency-content": currencyContent,
  };

  const isExpanded = hoveredOption !== null && !isMobile;

  // Mobile menu component
  const MobileMenu = () => {
    const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
    
    return (
      <div className={`fixed inset-0 bg-white z-50 overflow-y-auto transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <Link href="/" className="h-10 px-2 flex items-center justify-center">
            <Image 
              src={logo.src}
              alt="SEUL LUMION Logo"
              width={52}
              height={52}
              className="mr-1"
            />
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <ul className="space-y-6">
            {navOptions.map((option) => (
              <li key={option.id} className="border-b border-gray-100 pb-4">
                <div className="flex justify-between items-center">
                  {option.hasDropdown ? (
                    <span className="font-medium text-sm">{option.title}</span>
                  ) : (
                    <Link href={option.href || '#'} className="font-medium text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                      {option.title}
                    </Link>
                  )}
                  {option.hasDropdown && (
                    <button 
                      onClick={() => setExpandedMobileItem(expandedMobileItem === option.content ? null : option.content ?? null)}
                       className="p-1"
                    >
                      {expandedMobileItem === option.content ? "-" : "+"}
                    </button>
                  )}
                </div>
                
                {option.hasDropdown && expandedMobileItem === option.content && (
                  <div className="mt-4 pl-2">
                    {option.content && dropdownContent[option.content]}
                  </div>
                )}
              </li>
            ))}
            
            <li className="border-b border-gray-100 pb-4">
              <Link href="/account" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                <User size={16} className="mr-2" />
                <span className="font-medium text-sm">ACCOUNT</span>
              </Link>
            </li>
            
            <li className="pt-4">
              {/* Currency selector */}
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-2">🇬🇭 GBP £</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Menu Drawer */}
      <MobileMenu />
      
      {/* Main Navigation */}
      <div className="relative z-10 w-full" onMouseLeave={() => setHoveredOption(null)}>
        <nav className={`w-full transition-colors duration-300 z-10 ${isExpanded ? "bg-white" : "bg-transparent"}`}>
          <div className="container mx-auto p-4">
            {/* Mobile Navigation */}
            <div className="flex md:hidden items-center justify-between h-12">
              {/* Logo on the extreme left */}
              <Link href="/" className="h-10 px-2 flex items-center justify-center">
                <Image 
                  src={logo.src}
                  alt="SEUL LUMION Logo"
                  width={52}
                  height={52}
                  className="mr-1"
                />
              </Link>
              {/* Cart and Hamburger icons on the extreme right */}
              <div className="flex items-center space-x-4 ml-auto">
                <Link href="/cart">
                  <ShoppingBag size={20} className={mobileIconColor} />
                </Link>
                <button 
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-1"
                >
                  <Menu size={24} className={mobileIconColor} />
                </button>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-between h-16">
              {/* Left Section */}
              <div className="flex items-center">
                <div className="mr-16">
                  <Link href="/" className="h-12 -ml-12 px-3  flex items-center justify-center">
                    <Image 
                      src={logo.src}
                      alt="SEUL LUMION Logo"
                      width={52}
                      height={52}
                      className="mr-2"
                    />
                  </Link>
                </div>

                <div className="hidden md:flex items-center space-x-8">
                  {navOptions.map((option) => (
                    <div
                      key={option.id}
                      className="relative"
                      onMouseEnter={() =>
                        option.hasDropdown ? setHoveredOption(option.content ?? null) : setHoveredOption(null)
                      }
                    >
                      {option.hasDropdown ? (
                        <span
                          className={`cursor-pointer transition-colors duration-300 py-2 text-sm font-medium ${
                            isExpanded ? "border-black text-black" : `${hoverBorderColor} ${textColor}`
                          } hover:border-b `}
                        >
                          {option.title}
                        </span>
                      ) : (
                        <Link
                          href={option.href || '#'}
                          className={`cursor-pointer transition-colors duration-300 py-2 text-sm font-medium ${
                            isExpanded ? "border-black text-black" : `${hoverBorderColor} ${textColor}`
                          } hover:border-b `}
                        >
                          {option.title}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Section */}
              <div className="hidden md:flex items-center space-x-8">
                {rightNavOptions.map((option) => (
                  <div 
                    key={option.id} 
                    className="relative flex items-center"
                    onMouseEnter={() => option.hasDropdown ? setHoveredOption(option.content ?? null) : setHoveredOption(null)}
                    onMouseLeave={() => setHoveredOption(null)}
                  >
                    {option.hasDropdown ? (
                      <span
                        className={`cursor-pointer transition-colors duration-300 py-1 text-sm font-medium flex items-center ${
                          isExpanded ? "text-black" : textColor
                        } hover:border-b ${hoverBorderColor}`}
                      >
                        {option.title}
                        <ChevronDown size={16} className="ml-1" />
                      </span>
                    ) : option.id === 'cart' ? (
                      <Link
                        href={option.href || '#'}
                        className={`cursor-pointer transition-colors duration-300 py-1 flex items-center ${
                          isExpanded ? "text-black" : textColor
                        }`}
                      >
                        <ShoppingBag size={20} />
                      </Link>
                    ) : (
                      <Link
                        href={option.href || '#'}
                        className={`cursor-pointer transition-colors duration-300 py-1 text-sm font-medium ${
                          isExpanded ? "text-black" : textColor
                        } hover:border-b ${hoverBorderColor}`}
                      >
                        {option.title}
                      </Link>
                    )}
                    {/* Dropdown for currency */}
                    {option.hasDropdown && hoveredOption === option.content && (
                      <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded z-20">
                        {dropdownContent[option.content ?? ""]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Dropdown */}
          <div
            className={`w-full bg-white transition-all duration-300 overflow-hidden ${
              isExpanded ? "max-h-96 py-8 opacity-100" : "max-h-0 py-0 opacity-0"
            }`}
          >
            <div className="container mx-auto px-4">
              {hoveredOption && dropdownContent[hoveredOption]}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}