"use client";
import React from 'react';
import Image from 'next/image';
import { Hubot_Sans } from 'next/font/google';

// Image imports - only importing the ones we're using
import image001 from "@/assets/img/001.jpeg";
import image004 from "@/assets/img/004.jpeg";
import image006 from "@/assets/img/006.jpeg";
import image009 from "@/assets/img/009.jpeg";
import image012 from "@/assets/img/002.jpeg";
import image015 from "@/assets/img/015.jpeg";

// Configure Hubot Sans font with specific weights
const hubotSans = Hubot_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hubot-sans',
  weight: ['200', '400', '700', '900'],
  style: ['normal'],
  adjustFontFallback: false,
});

// Unique class names for different text elements
const textClasses = {
  heroTitle: 'hubot-sans-hero-title',
  sectionTitle: 'hubot-sans-section-title',
  buttonText: 'hubot-sans-button-text',
  bodyText: 'hubot-sans-body-text',
  captionText: 'hubot-sans-caption-text',
};

const Hero = () => {


  return (
    <div className={`relative w-full bg-black text-white overflow-hidden ${hubotSans.variable} font-sans`}>
      
      <div className="w-full h-[70vh] relative overflow-hidden">
        {/* Grid layout for multiple portrait images side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-full">

        
          {/* First portrait image */}
          <div className="col-span-1 relative overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <Image 
                src={image001} 
                alt="Model wearing PESO outfit" 
                fill 
                className="object-cover object-top" 
                priority
              />
            </div>
          </div>
          
          {/* Second portrait image - cropped to show different part */}
          <div className="col-span-1 relative overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <Image 
                src={image004} 
                alt="Model wearing PESO outfit" 
                fill 
                className="object-cover object-center" 
                priority
              />
            </div>
          </div>
          
          {/* Third portrait image - cropped differently */}
          <div className="col-span-1 relative overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <Image 
                src={image006} 
                alt="Model wearing PESO outfit" 
                fill 
                className="object-cover object-bottom" 
                priority
              />
            </div>
          </div>
          
          {/* Fourth portrait image */}
          <div className="col-span-1 relative overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <Image 
                src={image009} 
                alt="Model wearing PESO outfit" 
                fill 
                className="object-cover object-top" 
                priority
              />
            </div>
          </div>
        </div>
        
        {/* Overlay text content - keeping the original style */}
        <div className="absolute z-10 bottom-12 left-12">
          <div className="text-white">
            <p className="text-lg font-normal">See All</p>
            <h2 className="text-4xl font-bold">NEW SUMMER BASICS</h2>
            <button className="mt-4 bg-white text-black px-6 py-2 text-sm font-medium hover:bg-gray-200 transition-all">
              SHOP NOW
            </button>
          </div>
        </div>
        
        {/* Gradient overlay to unify the images */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50"></div>
      </div>
      {/* Product Showcase Section */}
      <section className="w-full pb-16">
        <div className="flex flex-col lg:flex-row gap-0">
          {/* Product Card 1 */}
          <div className="w-full lg:w-1/2">
            <div className="relative w-full">
              <div className="relative overflow-hidden w-full aspect-[2/3] group">
                {/* Replace background color with image */}
                <div className="w-full h-full relative">
                  <Image 
                    src={image012} 
                    alt="PESO signature shirt" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/50"></div>
                <div className="absolute bottom-8 left-8">
                  <p 
                    className={`text-white mb-1 ${textClasses.captionText}`}
                    style={{ 
                      fontVariationSettings: '"wdth" 100',
                      fontWeight: 400
                    }}
                  >
                    New Release
                  </p>
                  <h2 
                    className={`text-white text-xl mb-6 ${textClasses.sectionTitle}`}
                    style={{ 
                      fontVariationSettings: '"wdth" 100',
                      fontWeight: 700
                    }}
                  >
                    SIGNATURE SHIRT
                  </h2>
                  <button 
                    className={`bg-white text-black px-6 py-2 text-xs tracking-widest hover:bg-gray-200 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 ${textClasses.buttonText}`}
                    style={{ 
                      fontVariationSettings: '"wdth" 100',
                      fontWeight: 700
                    }}
                  >
                    SHOP NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Card 2 */}
          <div className="w-full lg:w-1/2">
            <div className="relative w-full">
              <div className="relative overflow-hidden w-full aspect-[2/3] group">
                
                <div className="w-full h-full relative">
                  <Image 
                    src={image015} 
                    alt="PESO classic shirt" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60" />
                <div className="absolute bottom-8 left-8">
                  <p 
                    className={`text-white mb-1 ${textClasses.captionText}`}
                    style={{ 
                      fontVariationSettings: '"wdth" 100',
                      fontWeight: 400
                    }}
                  >
                    New Release
                  </p>
                  <h2 
                    className={`text-white text-xl mb-6 ${textClasses.sectionTitle}`}
                    style={{ 
                      fontVariationSettings: '"wdth" 100',
                      fontWeight: 700
                    }}
                  >
                    CLASSIC SHIRT
                  </h2>
                  <button 
                    className={`bg-white text-black px-6 py-2 text-xs tracking-widest hover:bg-gray-200 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 ${textClasses.buttonText}`}
                    style={{ 
                      fontVariationSettings: '"wdth" 100',
                      fontWeight: 700
                    }}
                  >
                    SHOP NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global styles for Hubot Sans classes */}
      <style jsx global>{`
        .hubot-sans-hero-title {
          font-family: "Hubot Sans", sans-serif;
          font-optical-sizing: auto;
          font-style: normal;
        }
        .hubot-sans-section-title {
          font-family: "Hubot Sans", sans-serif;
          font-optical-sizing: auto;
          font-style: normal;
        }
        .hubot-sans-button-text {
          font-family: "Hubot Sans", sans-serif;
          font-optical-sizing: auto;
          font-style: normal;
        }
        .hubot-sans-body-text {
          font-family: "Hubot Sans", sans-serif;
          font-optical-sizing: auto;
          font-style: normal;
        }
        .hubot-sans-caption-text {
          font-family: "Hubot Sans", sans-serif;
          font-optical-sizing: auto;
          font-style: normal;
        }
      `}</style>
    </div>
  );
};

export default Hero;