import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/site/page";
import { properties } from "@/lib/site-data";
import { useSavedProperties } from "@/hooks/use-saved-properties";
import { Share, Heart, Award, DoorOpen, Maximize2, Wifi, Car, Tv, Snowflake, Shield, BedDouble, ChevronRight, Grid, Star, Flag, ChevronLeft } from "lucide-react";
import { PropertiesMap } from "@/components/site/PropertiesMap";

export const Route = createFileRoute("/properties/$id")({
  loader: ({ params }) => {
    const property = properties.find((p) => p.id === params.id);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.property) return {};
    const { property } = loaderData;
    return {
      meta: [
        { title: `${property.name} | Per Square Feet` },
        { name: "description", content: property.blurb },
      ],
    };
  },
  component: PropertyDetail,
});

function PropertyDetail() {
  const { property } = Route.useLoaderData();
  const { isSaved, toggleSave, isLoaded } = useSavedProperties();
  const [showGallery, setShowGallery] = useState(false);
  const saved = isLoaded ? isSaved(property.id) : false;

  // Ensure gallery has images
  const allImages = [property.image, ...(property.gallery || [])];
  
  // Grid images (exactly 5 for the layout)
  const gridImages = [...allImages].slice(0, 5);
  while (gridImages.length < 5 && gridImages.length > 0) {
    gridImages.push(gridImages[0]!);
  }

  // Generate a realistic base price number from the string for calculation
  const priceNumMatch = property.price.match(/[\d.]+/);
  const basePrice = priceNumMatch ? parseFloat(priceNumMatch[0]) : 1.5;
  const isCr = property.price.toLowerCase().includes("cr");
  const displayPriceNum = isCr ? basePrice * 100 : basePrice;

  if (showGallery) {
    return (
      <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
        {/* Gallery Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur flex items-center justify-between px-6 py-4 z-10 border-b border-border">
          <button 
            onClick={() => setShowGallery(false)}
            className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded-full transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-4 text-sm font-medium underline underline-offset-4 decoration-border">
            <button className="flex items-center gap-2 hover:bg-muted/50 px-2 py-1 rounded-md transition-colors">
              <Share size={16} />
              <span>Share</span>
            </button>
            <button
              onClick={() => toggleSave(property.id)}
              className="flex items-center gap-2 hover:bg-muted/50 px-2 py-1 rounded-md transition-colors"
            >
              <Heart size={16} className={saved ? 'fill-[#FF385C] stroke-[#FF385C]' : ''} />
              <span>{saved ? "Saved" : "Save"}</span>
            </button>
          </div>
        </div>
        
        {/* Gallery Content */}
        <div className="max-w-[760px] mx-auto px-6 py-12">
          <h2 className="text-3xl font-medium mb-8">Photo tour</h2>
          <div className="flex flex-col gap-4">
            {allImages.map((img, idx) => (
              <div key={idx} className="w-full">
                <img 
                  src={img} 
                  alt={`Property view ${idx + 1}`} 
                  className="w-full object-cover rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <PageShell>
      <div className="max-w-[1120px] mx-auto px-6 md:px-10 pt-24 pb-16">
        
        {/* Title & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <h1 className="font-display text-3xl font-medium text-foreground">{property.name}</h1>
          <div className="flex items-center gap-4 text-sm font-medium underline underline-offset-4 decoration-border shrink-0">
            <button className="flex items-center gap-2 hover:bg-muted/50 px-2 py-1 -mx-2 rounded-md transition-colors">
              <Share size={16} />
              <span>Share</span>
            </button>
            <button
              onClick={() => toggleSave(property.id)}
              className="flex items-center gap-2 hover:bg-muted/50 px-2 py-1 -mx-2 rounded-md transition-colors"
            >
              <Heart size={16} className={saved ? 'fill-[#FF385C] stroke-[#FF385C]' : ''} />
              <span>{saved ? "Saved" : "Save"}</span>
            </button>
          </div>
        </div>
        
        {/* Gallery Grid */}
        <div className="relative rounded-2xl overflow-hidden mb-12 bg-muted">
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 h-[50vh] md:h-[60vh] lg:h-[65vh]">
            <div className="md:col-span-2 md:row-span-2 relative h-full">
              <img
                onClick={() => setShowGallery(true)}
                src={gridImages[0]}
                alt={`${property.name} Main`}
                className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
              />
            </div>
            {gridImages.slice(1, 5).map((img, i) => (
              <div key={i} className={`hidden md:block relative h-full overflow-hidden ${i === 1 ? 'rounded-tr-2xl' : ''} ${i === 3 ? 'rounded-br-2xl' : ''}`}>
                <img
                  onClick={() => setShowGallery(true)}
                  src={img}
                  alt={`${property.name} Gallery ${i + 1}`}
                  className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
                />
              </div>
            ))}
          </div>
          <button 
            onClick={() => setShowGallery(true)}
            className="absolute bottom-6 right-6 bg-background px-4 py-1.5 rounded-lg shadow-md border border-border flex items-center gap-2 text-sm font-semibold hover:bg-muted transition-colors"
          >
            <Grid size={16} />
            Show all photos
          </button>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-[1.8fr_1.2fr] gap-12 lg:gap-20">
          
          {/* Left Column */}
          <div className="flex flex-col gap-8 pb-12 border-b border-border">
            
            {/* Header Details */}
            <div>
              <h2 className="text-2xl font-medium text-foreground mb-1">{property.type} in {property.location}, India</h2>
              <p className="text-foreground">{property.beds + 2} guests · {property.beds} bedroom{property.beds > 1 ? 's' : ''} · {property.beds + 1} bed{property.beds + 1 > 1 ? 's' : ''} · {property.beds + 1} bathroom{property.beds + 1 > 1 ? 's' : ''}</p>
            </div>

            {/* Guest Favourite Badge */}
            <div className="border border-border rounded-xl p-5 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <Award size={32} strokeWidth={1.5} />
                <div>
                  <h3 className="font-semibold text-lg">Guest favourite</h3>
                  <p className="text-muted-foreground text-sm leading-snug">One of the most loved homes on<br/>Airbnb, according to guests</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-center">
                <div>
                  <p className="font-semibold text-2xl">4.85</p>
                  <div className="flex gap-0.5 text-foreground justify-center">
                    <Star size={10} className="fill-foreground stroke-none" />
                    <Star size={10} className="fill-foreground stroke-none" />
                    <Star size={10} className="fill-foreground stroke-none" />
                    <Star size={10} className="fill-foreground stroke-none" />
                    <Star size={10} className="fill-foreground stroke-none" />
                  </div>
                </div>
                <div className="w-px h-10 bg-border"></div>
                <div>
                  <p className="font-semibold text-2xl">72</p>
                  <p className="text-xs text-foreground underline underline-offset-2">Reviews</p>
                </div>
              </div>
            </div>

            {/* Host Section */}
            <div className="flex items-center gap-4 py-2 border-b border-border pb-8">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                <img src="https://ui-avatars.com/api/?name=Karan+Singh&background=0D8ABC&color=fff" alt="Host avatar" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Hosted by Karan</h3>
                <p className="text-muted-foreground text-sm">3 years hosting</p>
              </div>
            </div>

            {/* Highlights */}
            <div className="flex flex-col gap-6 py-2 border-b border-border pb-8">
              <div className="flex gap-4">
                <DoorOpen size={24} className="shrink-0" strokeWidth={1.5} />
                <div>
                  <h4 className="font-medium">Self check-in</h4>
                  <p className="text-muted-foreground text-sm">You can check in with the building staff.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Maximize2 size={24} className="shrink-0" strokeWidth={1.5} />
                <div>
                  <h4 className="font-medium">Extra spacious</h4>
                  <p className="text-muted-foreground text-sm">Guests love this home's spaciousness for a comfortable stay.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Wifi size={24} className="shrink-0" strokeWidth={1.5} />
                <div>
                  <h4 className="font-medium">Dedicated workspace</h4>
                  <p className="text-muted-foreground text-sm">A room with wifi that's well suited for working.</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="py-2 border-b border-border pb-8">
              <p className="text-foreground leading-relaxed">
                {property.blurb || `${property.name} is an aesthetically designed stay located in ${property.location}. Surrounded by major attractions and natural beauty, it offers one of the best approach locations.`}
                <br /><br />
                The property features imported furniture, premium interiors, and thoughtfully designed spaces for a refined stay experience.
              </p>
              <button className="flex items-center gap-1 font-semibold underline underline-offset-4 mt-4">
                Show more <ChevronRight size={16} />
              </button>
            </div>

            {/* Where you'll sleep */}
            <div className="py-2 border-b border-border pb-8">
              <h3 className="text-xl font-medium mb-6">Where you'll sleep</h3>
              <div className="w-[300px] border border-border/50 rounded-xl overflow-hidden p-4">
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted mb-4">
                  <img src={gridImages[1]} alt="Bedroom" className="w-full h-full object-cover" />
                </div>
                <h4 className="font-medium">Bedroom</h4>
                <p className="text-sm text-muted-foreground">1 king bed</p>
              </div>
            </div>

            {/* What this place offers */}
            <div className="py-2 border-b border-border pb-8">
              <h3 className="text-xl font-medium mb-6">What this place offers</h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                <div className="flex items-center gap-4 text-foreground"><Wifi strokeWidth={1.5} /> Wifi</div>
                <div className="flex items-center gap-4 text-foreground"><Car strokeWidth={1.5} /> Free parking on premises</div>
                <div className="flex items-center gap-4 text-foreground"><Snowflake strokeWidth={1.5} /> Central air conditioning</div>
                <div className="flex items-center gap-4 text-foreground"><Tv strokeWidth={1.5} /> HDTV with Amazon Prime</div>
                <div className="flex items-center gap-4 text-foreground"><Shield strokeWidth={1.5} /> Exterior security cameras</div>
                <div className="flex items-center gap-4 text-foreground line-through opacity-50"><Snowflake strokeWidth={1.5} /> Carbon monoxide alarm</div>
              </div>
              <button className="mt-8 border border-foreground rounded-lg px-6 py-3 font-semibold hover:bg-muted/30 transition-colors">
                Show all 24 amenities
              </button>
            </div>
          </div>

          {/* Right Column Sticky Widget */}
          <div className="relative pb-12 border-b border-border lg:border-none">
            <div className="sticky top-28 bg-background border border-border shadow-xl shadow-black/5 rounded-xl p-6 mb-8 w-full">
              
              {/* Fee Notice */}
              <div className="flex items-center justify-center gap-2 bg-muted/30 py-3 rounded-lg mb-6 border border-border/50">
                <span className="text-[#FF385C]">🏷</span>
                <span className="text-sm font-medium">Prices include all fees</span>
              </div>

              {/* Price Header */}
              <div className="flex items-end gap-1.5 mb-6">
                <span className="text-xl font-semibold text-muted-foreground line-through decoration-1 opacity-70">
                  ₹{Math.floor(displayPriceNum * 1.5).toLocaleString()}
                </span>
                <span className="text-2xl font-semibold">{property.price}</span>
              </div>

              {/* Contact Form */}
              <form className="space-y-3 mb-4" onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Your name" className="w-full bg-background border border-foreground/30 rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-foreground transition-colors" />
                <input type="email" placeholder="Your email address" className="w-full bg-background border border-foreground/30 rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-foreground transition-colors" />
                <div className="flex gap-2">
                  <select className="bg-background border border-foreground/30 rounded-lg px-2 py-3 text-sm w-24 focus:outline-none focus:border-foreground transition-colors appearance-none text-center">
                    <option>🇮🇳 +91</option>
                  </select>
                  <input type="tel" placeholder="Phone number (optional)" className="flex-1 bg-background border border-foreground/30 rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-foreground transition-colors" />
                </div>
                <textarea placeholder={`Please contact me regarding ${property.name}`} rows={3} className="w-full bg-background border border-foreground/30 rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-foreground transition-colors resize-none"></textarea>
                
                <button className="w-full bg-[#FF385C] hover:bg-[#d90b41] text-white rounded-lg py-3.5 font-semibold transition-colors shadow-sm mt-2">
                  Request Details
                </button>
              </form>
              
              <p className="text-center text-sm text-muted-foreground mt-4">
                We'll get back to you shortly
              </p>
            </div>
            
            <div className="flex justify-center mt-6">
              <button className="flex items-center gap-2 text-muted-foreground text-sm underline underline-offset-4 font-medium hover:text-foreground">
                <Flag size={14} /> Report this listing
              </button>
            </div>
          </div>
        </div>
        
        {/* Where you'll be (Map Section) */}
        <div className="py-12 border-b border-border">
          <h3 className="text-2xl font-medium mb-2">Where you'll be</h3>
          <p className="text-foreground mb-6">{property.location}, India</p>
          <div className="w-full h-[480px] bg-muted rounded-xl relative overflow-hidden border border-border">
            <PropertiesMap properties={[property]} />
          </div>
          <div className="mt-6">
            <h4 className="font-medium">{property.location}, India</h4>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Surrounded by major attractions and natural beauty, it offers one of the city's best approach locations. Just 500m from the nearest transit station.
            </p>
            <button className="flex items-center gap-1 font-semibold underline underline-offset-4 mt-4">
              Show more <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Things to know */}
        <div className="py-12 border-b border-border">
          <h3 className="text-2xl font-medium mb-8">Things to know</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-4">House rules</h4>
              <p className="text-foreground mb-2">Check-in after 2:00 pm</p>
              <p className="text-foreground mb-2">Checkout before 11:00 am</p>
              <p className="text-foreground mb-4">2 guests maximum</p>
              <button className="font-semibold underline underline-offset-4">Show more</button>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Safety & property</h4>
              <p className="text-foreground mb-2">Carbon monoxide alarm not reported</p>
              <p className="text-foreground mb-2">Smoke alarm not reported</p>
              <p className="text-foreground mb-4">Exterior security cameras on property</p>
              <button className="font-semibold underline underline-offset-4">Show more</button>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Cancellation policy</h4>
              <p className="text-foreground mb-4">This reservation is non-refundable.<br/>Review the host's full policy for details.</p>
              <button className="font-semibold underline underline-offset-4">Show more</button>
            </div>
          </div>
        </div>

      </div>
    </PageShell>
  );
}
