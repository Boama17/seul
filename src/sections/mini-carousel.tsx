"use client"
import * as React from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

// Image imports
import one from "@/assets/img/001.jpeg"
import two from "@/assets/img/002.jpeg"
import three from "@/assets/img/003.jpeg"
import four from "@/assets/img/004.jpeg"
import five from "@/assets/img/005.jpeg"
import six from "@/assets/img/006.jpeg"
import seven from "@/assets/img/007.jpeg"
import eight from "@/assets/img/008.jpeg"
import nine from "@/assets/img/009.jpeg"
import ten from "@/assets/img/010.jpeg"
import eleven from "@/assets/img/011.jpeg"
import twelve from "@/assets/img/012.jpeg"
import thirteen from "@/assets/img/013.jpeg"
import fourteen from "@/assets/img/014.jpeg"
import fifteen from "@/assets/img/015.jpeg"
import sixteen from "@/assets/img/016.jpeg"
import seventeen from "@/assets/img/017.jpeg"
import eighteen from "@/assets/img/018.jpeg"
import nineteen from "@/assets/img/019.jpeg"
import twenty from "@/assets/img/020.jpeg"

const images = [
  one, two, three, four, five, six, seven, eight, nine, ten,
  eleven, twelve, thirteen, fourteen, fifteen, sixteen,
  seventeen, eighteen, nineteen, twenty
]

export default function ImgCarousel() {
  const [itemsPerView, setItemsPerView] = React.useState(6);

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setItemsPerView(2);
      } else if (width < 640) {
        setItemsPerView(3);
      } else if (width < 768) {
        setItemsPerView(4);
      } else if (width < 1024) {
        setItemsPerView(6);
      } else if (width < 1280) {
        setItemsPerView(8);
      } else {
        setItemsPerView(10);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full max-w-full mx-auto px-4 py-6">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-1 cursor-grab">
          {images.map((img, idx) => (
            <CarouselItem
              key={idx}
              className={`pl-1 basis-[calc(100%/${itemsPerView})]`}
            >
              <Card className="border-0 shadow-none max-w-[8rem] mx-auto">
                <CardContent className="p-0">
                  <div className="aspect-[5/6] relative">
                    <Image 
                      src={img.src} 
                      alt=""
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      priority={idx < itemsPerView}
                    />
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="flex justify-end gap-3 mt-4">
          <CarouselPrevious className="static transform-none mx-0 size-8" />
          <CarouselNext className="static transform-none mx-0 size-8" />
        </div>
      </Carousel>
    </div>
  )
}
