"use client";

import { JSX, useState, useEffect } from "react";
import React from "react";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/img/logo.jpg";
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
    { id: "new-in", title: "NEW IN", hasDropdown: false, href: "/new-in" },
    { id: "shop-all", title: "SHOP ALL", hasDropdown: true, content: "shop-all-content", href: "/shop-all" },
    { id: "collections", title: "COLLECTIONS", hasDropdown: true, content: "collections-content", href: "/collections" },
    { id: "brand", title: "BRAND", hasDropdown: true, content: "brand-content", href: "/brand" },
    { id: "basics", title: "BASICS", hasDropdown: false, href: "/basics" },
    { id: "loyalty", title: "LOYALTY", hasDropdown: false, href: "/loyalty" },
  ];

  const rightNavOptions: NavOption[] = [
    { id: "search", title: "SEARCH", hasDropdown: false, href: "/search" },
    { id: "account", title: "ACCOUNT", hasDropdown: false, href: "/account" },
    { id: "loyalty", title: "LOYALTY", hasDropdown: false, href: "/loyalty" },
    { id: "cart", title: "CART (0)", hasDropdown: false, href: "/cart" },
  ];
  
  const shopAllContent = (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 text-black">
      <div className="col-span-1">
        <h2 className="font-medium mb-4 text-sm uppercase tracking-wide">Clothing</h2>
        <ul className="space-y-3 text-xs">
          <li><Link href="/clothing/tees" className="hover:text-gray-500 cursor-pointer">Tees</Link></li>
          <li><Link href="/clothing/shirts" className="hover:text-gray-500 cursor-pointer">Shirts</Link></li>
          <li><Link href="/clothing/pants" className="hover:text-gray-500 cursor-pointer">Pants</Link></li>
          <li><Link href="/clothing/jackets" className="hover:text-gray-500 cursor-pointer">Jackets</Link></li>
        </ul>
      </div>
      
      <div className="col-span-1">
        <h2 className="font-medium mb-4 text-sm uppercase tracking-wide">Accessories</h2>
        <ul className="space-y-3 text-xs">
          <li><Link href="/accessories/ties" className="hover:text-gray-500 cursor-pointer">Ties</Link></li>
          <li><Link href="/accessories/belts" className="hover:text-gray-500 cursor-pointer">Belts</Link></li>
          <li><Link href="/accessories/bags" className="hover:text-gray-500 cursor-pointer">Bags</Link></li>
        </ul>
      </div>
      
      <div className="col-span-1">
        <h2 className="font-medium mb-4 text-sm uppercase tracking-wide">Sale</h2>
        <ul className="space-y-3 text-xs">
          <li><Link href="/sale" className="hover:text-gray-500 cursor-pointer">All Sale Items</Link></li>
          <li><Link href="/sale/last-chance" className="hover:text-gray-500 cursor-pointer">Last Chance</Link></li>
        </ul>
      </div>
    </div>
  );

  const collectionsContent = (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4 md:gap-8 text-black">
      <div className="col-span-1 md:col-span-2">
        <h2 className="font-medium mb-4 text-sm uppercase tracking-wide">By Style</h2>
        <ul className="space-y-3 text-xs">
          <li><Link href="/collections/classic" className="hover:text-gray-500 cursor-pointer">Classic</Link></li>
          <li><Link href="/collections/modern" className="hover:text-gray-500 cursor-pointer">Modern</Link></li>
          <li><Link href="/collections/business" className="hover:text-gray-500 cursor-pointer">Business</Link></li>
          <li><Link href="/collections/casual" className="hover:text-gray-500 cursor-pointer">Casual</Link></li>
        </ul>
      </div>
      
      <div className="col-span-1">
        <h2 className="font-medium mb-4 text-sm uppercase tracking-wide">By Material</h2>
        <ul className="space-y-3 text-xs">
          <li><Link href="/collections/cotton" className="hover:text-gray-500 cursor-pointer">Cotton</Link></li>
          <li><Link href="/collections/linen" className="hover:text-gray-500 cursor-pointer">Linen</Link></li>
          <li><Link href="/collections/silk" className="hover:text-gray-500 cursor-pointer">Silk</Link></li>
          <li><Link href="/collections/wool" className="hover:text-gray-500 cursor-pointer">Wool</Link></li>
        </ul>
      </div>
      
      <div className="hidden md:block md:col-span-4">
        <div className="grid grid-cols-3 gap-3 h-full">
          <Link href="/collections/summer" className="relative h-64 w-66 bg-gray-100 group cursor-pointer">
            <Image className="absolute inset-0 group-hover:bg-opacity-10 transition-all duration-300"
              src={one.src}
              alt="Summer Collection"
              fill
            />
          </Link>
          <Link href="/collections/business" className="relative h-64 w-66 bg-gray-100 group cursor-pointer">
            <Image className="absolute inset-0 group-hover:bg-opacity-10 transition-all duration-300"
              src={three.src}
              alt="Business Collection"
              fill
            />
          </Link>
          <Link href="/collections/casual" className="relative h-64 w-66 bg-gray-100 group cursor-pointer">
            <Image className="absolute inset-0 group-hover:bg-opacity-10 transition-all duration-300"
              src={two.src}
              alt="Casual Collection"
              fill
            />
          </Link>
        </div>
      </div>
    </div>
  );

  const brandContent = (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4 md:gap-8 text-black">
      <div className="col-span-1 md:col-span-2">
        <h2 className="font-medium mb-4 text-sm uppercase tracking-wide">About</h2>
        <ul className="space-y-3 text-xs">
          <li><Link href="/about" className="hover:text-gray-500 cursor-pointer">Our Story</Link></li>
          <li><Link href="/contact" className="hover:text-gray-500 cursor-pointer">Contact</Link></li>
        </ul>
      </div>
  
      <div className="col-span-1">
        <h2 className="font-medium mb-4 text-sm uppercase tracking-wide">Support</h2>
        <ul className="space-y-3 text-xs">
          <li><Link href="/size-guide" className="hover:text-gray-500 cursor-pointer">Size Guide</Link></li>
          <li><Link href="/shipping-returns" className="hover:text-gray-500 cursor-pointer">Shipping & Returns</Link></li>
        </ul>
      </div>
  
      <div className="hidden md:block md:col-span-4">
        <div className="grid grid-cols-3 gap-3 h-full">
          <Link href="/brand/story" className="relative h-64 w-66 bg-gray-100 group cursor-pointer">
            <Image
              className="absolute inset-0 group-hover:bg-opacity-10 transition-all duration-300"
              src={four.src}
              alt="Brand Story"
              fill
            />
          </Link>
          <Link href="/brand/craftsmanship" className="relative h-64 w-66 bg-gray-100 group cursor-pointer">
            <Image
              className="absolute inset-0 group-hover:bg-opacity-10 transition-all duration-300"
              src={five.src}
              alt="Craftsmanship"
              fill
            />
          </Link>
          <Link href="/brand/sustainability" className="relative h-64 w-66 bg-gray-100 group cursor-pointer">
            <Image
              className="absolute inset-0 group-hover:bg-opacity-10 transition-all duration-300"
              src={six.src}
              alt="Sustainability"
              fill
            />
          </Link>
        </div>
      </div>
    </div>
  );
  

  const dropdownContent: Record<string, JSX.Element> = {
    "shop-all-content": shopAllContent,
    "collections-content": collectionsContent,
    "brand-content": brandContent,
  };

  const isExpanded = hoveredOption !== null && !isMobile;

  // Mobile menu component
  const MobileMenu = () => {
    const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
    
    return (
      <div className={`fixed inset-0 bg-white z-50 overflow-y-auto transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <Link href="/" className="h-10 px-2 bg-black-600 flex items-center justify-center">
            <Image 
              src={logo.src}
              alt="SEUL LUMION Logo"
              width={24}
              height={24}
              className="mr-1"
            />
            <span className="text-white text-xs font-bold tracking-wider">SEUL LUMION</span>
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
              {/* Language selector */}
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-2">Deutsch</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-2">Eur</span>
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
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-1"
                >
                  <Menu size={24} className={mobileIconColor} />
                </button>
                <Link href="/search">
                  <Search size={20} className={mobileIconColor} />
                </Link>
              </div>
              
              <Link href="/" className="h-10 px-2 bg-black flex items-center justify-center">
                <Image 
                  src={logo.src}
                  alt="SEUL LUMION Logo"
                  width={24}
                  height={24}
                  className="mr-1"
                />
                <span className="text-white text-xs font-bold tracking-wider">SEUL LUMION</span>
              </Link>
              
              <Link href="/cart">
                <ShoppingBag size={20} className={mobileIconColor} />
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-between h-16">
              {/* Left Section */}
              <div className="flex items-center">
                <div className="mr-16">
                  <Link href="/" className="h-12 -ml-12 px-3 bg-black flex items-center justify-center">
                    <Image 
                      src={logo.src}
                      alt="SEUL LUMION Logo"
                      width={32}
                      height={32}
                      className="mr-2"
                    />
                    <span className="text-white text-xs font-bold tracking-wider">SEUL LUMION</span>
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
                    onMouseEnter={() => setHoveredOption(null)}
                  >
                    <Link
                      href={option.href || '#'}
                      className={`cursor-pointer transition-colors duration-300 py-1 text-sm font-medium ${
                        isExpanded ? "text-black" : textColor
                      } hover:border-b ${hoverBorderColor}`}
                    >
                      {option.title}
                    </Link>
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