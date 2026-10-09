import { Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { type Property } from "@/lib/site-data";
import { useSavedProperties } from "@/hooks/use-saved-properties";
import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductCardProps {
  property: Property;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function ProductCard({ property, onMouseEnter, onMouseLeave }: ProductCardProps) {
  const { isSaved, toggleSave } = useSavedProperties();
  const saved = isSaved(property.id);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const images = property.gallery?.length ? property.gallery : [property.image];

  const scrollPrev = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Use rating from data, default to 4.85 if missing
  const rating = property.rating ? property.rating.toString() : "4.85";

  return (
    <Link 
      to="/properties/$id"
      params={{ id: property.id }}
      className="group flex flex-col gap-3"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Image Container */}
      <div className="relative aspect-square sm:aspect-[4/3] rounded-xl overflow-hidden bg-muted">
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-background/95 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium shadow-sm flex items-center gap-1">
            Verified
          </div>
        </div>
        
        <button 
          onClick={(e) => { e.preventDefault(); toggleSave(property.id); }}
          className="absolute top-3 right-3 z-10 p-1.5 hover:scale-110 transition-transform"
        >
          <Heart 
            size={24} 
            className={`drop-shadow-md ${saved ? 'fill-[#FF385C] stroke-[#FF385C]' : 'fill-black/30 stroke-white'}`} 
          />
        </button>

        {/* Carousel */}
        <div className="overflow-hidden w-full h-full" ref={emblaRef}>
          <div className="flex w-full h-full">
            {images.map((img, idx) => (
              <div className="relative flex-[0_0_100%] h-full min-w-0" key={idx}>
                <img
                  src={img}
                  alt={`${property.name} view ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Controls */}
        {images.length > 1 && (
          <>
            <div className="absolute inset-0 flex items-center justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <button 
                onClick={scrollPrev}
                className="w-7 h-7 rounded-full bg-background/90 shadow-sm flex items-center justify-center pointer-events-auto hover:bg-background hover:scale-105 transition-all text-foreground"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={scrollNext}
                className="w-7 h-7 rounded-full bg-background/90 shadow-sm flex items-center justify-center pointer-events-auto hover:bg-background hover:scale-105 transition-all text-foreground"
              >
                <ChevronRight size={16} />
              </button>
            </div>
            
            {/* Dots */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
              {images.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`rounded-full transition-all ${
                    idx === selectedIndex 
                      ? 'bg-white w-2 h-2 opacity-100' 
                      : 'bg-white/60 w-1.5 h-1.5 opacity-70'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-foreground truncate">{property.location}</h3>
          <div className="flex items-center gap-1 text-sm shrink-0">
            <Star size={12} className="fill-foreground stroke-none" />
            <span>{rating}</span>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm truncate">{property.type} · {property.name}</p>
        <p className="text-muted-foreground text-sm truncate">{property.beds} bedrooms · {property.area}</p>
        
        <div className="mt-2 flex items-center gap-1">
          <span className="font-semibold text-foreground">{property.price}</span>
        </div>
      </div>
    </Link>
  );
}
