import React from 'react';
import Image from 'next/image';
import one from "@/assets/img/015.jpeg";
import two from "@/assets/img/007.jpeg";
import three from "@/assets/img/014.jpeg";
import four from "@/assets/img/011.jpeg";
import Navigation from '@/components/layout/nav';

const AboutPage = () => {
  const sections = [
    {
      id: 'hero',
      title: 'SEUL LUMION TOUR',
      description: 'The first ever Seul Lumion retail space comes in the form of a completely reworked overseas container. The 12 meter long container includes a fully functional luxury store with glass product displays and panel ceiling lighting.',
      linkText: 'JOIN UPDATES',
      linkUrl: '#',
      image: one,
      imageAlt: 'Seul Lumion container store being lifted by crane',
      reverse: false
    },
    {
      id: 'collections',
      title: 'COLLECTIONS',
      description: 'The Seul Lumion Collections embody the core of our brand. Created with great attention to detail, every Collection tells a story in itself. Stay up to date to know when we drop.',
      linkText: 'SHOP THE LATEST',
      linkUrl: '#',
      image: two,
      imageAlt: 'Three people wearing black Seul Lumion pieces',
      reverse: true
    },
    {
      id: 'essentials',
      title: 'ESSENTIALS',
      description: 'The Seul Lumion Essentials are our everyday staples, building the base of your wardrobe. Created out of the need for simple and well-fitting silhouettes that enhance your everyday look.',
      linkText: 'SHOP ESSENTIALS',
      linkUrl: '#',
      image: three,
      imageAlt: 'Three people in colorful loungewear on rocky landscape',
      reverse: false
    },
    {
      id: 'brand',
      title: 'SEUL LUMION',
      description: 'Seul Lumion stands for unique designs combined with high-quality manufacturing. Born out of the fascination with modern culture and minimalist aesthetics, we provide luxury-level streetwear and everyday essentials. We take special pride in the quality of our garments and innovative processes.',
      linkText: null,
      linkUrl: null,
      image: four,
      imageAlt: 'Man in black shirt sitting in elegant room interior',
      reverse: true
    }
  ];

  return (
    
    <div className="min-h-screen bg-white">
      <Navigation 
  textColor="text-gray-800" 
  hoverBorderColor="border-gray-800" 
  mobileIconColor="text-gray-800" 
/>
      {sections.map((section) => (
        <section key={section.id} className="w-full">
          <div className={`flex flex-col ${section.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} min-h-screen`}>
            {/* Image Side */}
            <div className="w-full lg:w-1/2 relative overflow-hidden">
              <div className="relative w-full h-full min-h-[50vh] lg:min-h-screen">
                <Image
                  src={section.image}
                  alt={section.imageAlt}
                  layout="fill"
                  objectFit="cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 xl:p-16">
              <div className="max-w-sm w-full space-y-4">
                <div>
                  <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-black mb-4 tracking-tight">
                    {section.title}
                  </h2>
                  <p className="text-gray-700 text-xs lg:text-sm leading-relaxed mb-4">
                    {section.description}
                  </p>
                </div>

                {section.linkText && (
                  <div>
                    <a
                      href={section.linkUrl}
                      className="inline-block text-black font-semibold text-xs tracking-wider border-b-2 border-black pb-1 hover:border-gray-600 transition-colors duration-200 uppercase"
                    >
                      {section.linkText}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default AboutPage;