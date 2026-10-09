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
        { title: `${property.name} | THE CASSTLE CO` },
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
  const allImages = [property.image, ...(property.gallery || [])].filter(Boolean);
  const displayImages = allImages.slice(0, 5);

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
          <div className="flex flex-col gap-8">
            {allImages.map((img, idx) => (
              <div key={idx} className="w-full bg-muted/20 rounded-xl overflow-hidden flex items-center justify-center">
                <img 
                  src={img} 
                  alt={`Property view ${idx + 1}`} 
                  className="w-full h-auto object-contain rounded-xl"
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
        <div className="relative rounded-2xl overflow-hidden mb-12 bg-muted h-[50vh] md:h-[60vh] lg:h-[65vh]">
          {displayImages.length === 1 && (
             <img src={displayImages[0]} alt="Property" onClick={() => setShowGallery(true)} className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer" />
          )}

          {displayImages.length === 2 && (
             <div className="grid grid-cols-2 gap-2 h-full">
               <div className="relative h-full overflow-hidden">
                 <img src={displayImages[0]} onClick={() => setShowGallery(true)} className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer" />
               </div>
               <div className="relative h-full overflow-hidden rounded-tr-2xl rounded-br-2xl">
                 <img src={displayImages[1]} onClick={() => setShowGallery(true)} className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer" />
               </div>
             </div>
          )}

          {displayImages.length === 3 && (
             <div className="grid grid-cols-2 gap-2 h-full">
               <div className="relative h-full overflow-hidden">
                 <img src={displayImages[0]} onClick={() => setShowGallery(true)} className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer" />
               </div>
               <div className="grid grid-rows-2 gap-2 h-full overflow-hidden">
                 <div className="relative h-full overflow-hidden rounded-tr-2xl">
                   <img src={displayImages[1]} onClick={() => setShowGallery(true)} className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer" />
                 </div>
                 <div className="relative h-full overflow-hidden rounded-br-2xl">
                   <img src={displayImages[2]} onClick={() => setShowGallery(true)} className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer" />
                 </div>
               </div>
             </div>
          )}

          {displayImages.length === 4 && (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-2 h-full">
               <div className="md:col-span-2 relative h-full overflow-hidden">
                 <img src={displayImages[0]} onClick={() => setShowGallery(true)} className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer" />
               </div>
               <div className="grid grid-rows-3 gap-2 h-full overflow-hidden">
                 <div className="relative h-full overflow-hidden rounded-tr-2xl">
                   <img src={displayImages[1]} onClick={() => setShowGallery(true)} className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer" />
                 </div>
                 <div className="relative h-full overflow-hidden">
                   <img src={displayImages[2]} onClick={() => setShowGallery(true)} className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer" />
                 </div>
                 <div className="relative h-full overflow-hidden rounded-br-2xl">
                   <img src={displayImages[3]} onClick={() => setShowGallery(true)} className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer" />
                 </div>
               </div>
             </div>
          )}

          {displayImages.length >= 5 && (
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 h-full">
              <div className="md:col-span-2 md:row-span-2 relative h-full">
                <img onClick={() => setShowGallery(true)} src={displayImages[0]} alt={`${property.name} Main`} className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer" />
              </div>
              {displayImages.slice(1, 5).map((img, i) => (
                <div key={i} className={`hidden md:block relative h-full overflow-hidden ${i === 1 ? 'rounded-tr-2xl' : ''} ${i === 3 ? 'rounded-br-2xl' : ''}`}>
                  <img onClick={() => setShowGallery(true)} src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer" />
                </div>
              ))}
            </div>
          )}

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
              <h2 className="text-2xl font-medium text-foreground mb-1">{property.type} in {property.location}</h2>
              <p className="text-foreground">
                {property.totalUnits ? `${property.totalUnits} Units` : 'Exclusive Project'} · {property.beds ? `${property.beds} Bedrooms` : 'Various Layouts'} · {property.area ? property.area : 'Custom Sizes'} · {property.possessionDate ? `Possession by ${property.possessionDate}` : 'Ready to move'}
              </p>
            </div>

            {/* Developer Section (Based on Meet the Host) */}
            <div className="py-6 border-b border-border">
              <h3 className="text-xl font-medium mb-6">Meet your developer</h3>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Developer Card */}
                <div className="bg-background border border-border rounded-2xl p-6 shadow-xl shadow-black/5 flex flex-col items-center min-w-[280px]">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-muted mb-4">
                    <img src="https://ui-avatars.com/api/?name=DLF+Group&background=0D8ABC&color=fff" alt="Developer logo" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-1">{property.developer || 'Premium Developer'}</h3>
                  <div className="flex items-center gap-1 text-sm font-medium mb-6">
                    <Award size={14} className="text-[#FF385C]" /> Top Builder
                  </div>
                  
                  <div className="w-full flex justify-between border-t border-border pt-4">
                    <div className="text-center">
                      <div className="font-bold text-lg">761</div>
                      <div className="text-xs text-muted-foreground">Reviews</div>
                    </div>
                    <div className="w-px bg-border"></div>
                    <div className="text-center">
                      <div className="font-bold text-lg flex items-center justify-center gap-1">4.83 <Star size={12} className="fill-foreground" /></div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                    <div className="w-px bg-border"></div>
                    <div className="text-center">
                      <div className="font-bold text-lg">15</div>
                      <div className="text-xs text-muted-foreground">Years</div>
                    </div>
                  </div>
                </div>

                {/* Developer Info */}
                <div className="flex-1 space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg">{property.developer || 'Premium Developer'} is a Top Builder</h4>
                    <p className="text-muted-foreground mt-1">Top Builders are experienced, highly rated developers who are committed to providing great quality projects for buyers.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Developer details</h4>
                    <p className="text-muted-foreground mt-1 text-sm">Response rate: 98%<br/>Responds within an hour</p>
                  </div>
                  <button className="bg-foreground text-background px-6 py-2.5 rounded-lg font-medium hover:bg-foreground/90 transition-colors">
                    Message developer
                  </button>
                  <div className="pt-4 space-y-3 text-sm text-foreground">
                    <div className="flex gap-3 items-center"><Award size={18} className="text-muted-foreground" /> <span>RERA Registered projects</span></div>
                    <div className="flex gap-3 items-center"><Shield size={18} className="text-muted-foreground" /> <span>Clear titles & legal vetting</span></div>
                    <div className="flex gap-3 items-center"><Star size={18} className="text-muted-foreground" /> <span>Focus on premium lifestyles and sustainable living</span></div>
                  </div>
                </div>
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

            {/* Project Details */}
            <div className="py-2 border-b border-border pb-8">
              <h3 className="text-xl font-medium mb-6">Project highlights</h3>
              <div className="flex flex-wrap gap-2">
                {property.highlights && property.highlights.map((highlight, i) => (
                  <span key={i} className="bg-muted px-4 py-2 rounded-full text-sm text-foreground border border-border/50">
                    {highlight}
                  </span>
                ))}
                {!property.highlights && (
                   <span className="bg-muted px-4 py-2 rounded-full text-sm text-foreground border border-border/50">Premium Location</span>
                )}
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

        {/* Image Section After Map */}
        <div className="py-12 border-b border-border">
          <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden bg-muted">
            <img src={displayImages[0]} alt="Property feature" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        </div>

        {/* Reviews Section */}
        <div className="py-12 border-b border-border">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="flex justify-center items-center gap-4 mb-4">
              <span className="text-4xl text-muted-foreground shrink-0">🌿</span>
              <h2 className="text-[64px] font-bold tracking-tight">4.91</h2>
              <span className="text-4xl text-muted-foreground shrink-0">🌿</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Buyer favourite</h3>
            <p className="text-muted-foreground">This property is highly rated based on construction quality, location, and developer reliability.</p>
          </div>

          <div className="flex overflow-x-auto gap-4 pb-4 mb-12 hide-scrollbar border-b border-border">
            <div className="flex-1 min-w-[120px] pb-4 border-b-2 border-foreground">
              <div className="text-sm font-medium mb-2">Quality</div>
              <div className="font-semibold">4.9</div>
            </div>
            <div className="flex-1 min-w-[120px] pb-4 border-b-2 border-foreground/20 hover:border-foreground transition-colors">
              <div className="text-sm font-medium mb-2">Location</div>
              <div className="font-semibold">5.0</div>
            </div>
            <div className="flex-1 min-w-[120px] pb-4 border-b-2 border-foreground/20 hover:border-foreground transition-colors">
              <div className="text-sm font-medium mb-2">Value</div>
              <div className="font-semibold">4.8</div>
            </div>
            <div className="flex-1 min-w-[120px] pb-4 border-b-2 border-foreground/20 hover:border-foreground transition-colors">
              <div className="text-sm font-medium mb-2">Design</div>
              <div className="font-semibold">4.9</div>
            </div>
            <div className="flex-1 min-w-[120px] pb-4 border-b-2 border-foreground/20 hover:border-foreground transition-colors">
              <div className="text-sm font-medium mb-2">Amenities</div>
              <div className="font-semibold">4.8</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-lg font-medium">M</div>
                <div>
                  <h4 className="font-medium">Manu</h4>
                  <p className="text-sm text-muted-foreground">August 2026</p>
                </div>
              </div>
              <div className="flex gap-1 mb-2">
                <Star size={12} className="fill-foreground" />
                <Star size={12} className="fill-foreground" />
                <Star size={12} className="fill-foreground" />
                <Star size={12} className="fill-foreground" />
                <Star size={12} className="fill-foreground" />
              </div>
              <p className="text-foreground leading-relaxed">
                Beautiful location and excellent build quality. The developer was very transparent throughout the entire process and delivered ahead of schedule.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#113824] text-white flex items-center justify-center text-lg font-medium">R</div>
                <div>
                  <h4 className="font-medium">Rachel</h4>
                  <p className="text-sm text-muted-foreground">July 2026</p>
                </div>
              </div>
              <div className="flex gap-1 mb-2">
                <Star size={12} className="fill-foreground" />
                <Star size={12} className="fill-foreground" />
                <Star size={12} className="fill-foreground" />
                <Star size={12} className="fill-foreground" />
                <Star size={12} className="fill-foreground" />
              </div>
              <p className="text-foreground leading-relaxed">
                The amenities are top notch and exactly as described in the brochure. I'm very happy with this investment. Highly recommend this project.
              </p>
              <button className="underline font-medium mt-2">Show more</button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                  <img src="https://ui-avatars.com/api/?name=Raktim&background=random" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-medium">Raktim</h4>
                  <p className="text-sm text-muted-foreground">2 weeks ago</p>
                </div>
              </div>
              <div className="flex gap-1 mb-2">
                <Star size={12} className="fill-foreground" />
                <Star size={12} className="fill-foreground" />
                <Star size={12} className="fill-foreground" />
                <Star size={12} className="fill-foreground" />
                <Star size={12} className="fill-foreground" />
              </div>
              <p className="text-foreground leading-relaxed">
                Great place, completely hassle-free paperwork.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                  <img src="https://ui-avatars.com/api/?name=Nupur&background=random" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-medium">Nupur</h4>
                  <p className="text-sm text-muted-foreground">July 2026</p>
                </div>
              </div>
              <div className="flex gap-1 mb-2">
                <Star size={12} className="fill-foreground" />
                <Star size={12} className="fill-foreground" />
                <Star size={12} className="fill-foreground" />
                <Star size={12} className="fill-foreground" />
                <Star size={12} className="fill-foreground" />
              </div>
              <p className="text-foreground leading-relaxed">
                I enjoyed my visits to the site during construction. The team was accommodating, and the final finish of the property is fantastic.
              </p>
            </div>
          </div>
          
          <button className="mt-10 border border-foreground rounded-lg px-6 py-3 font-semibold hover:bg-muted/30 transition-colors">
            Show all 12 reviews
          </button>
        </div>

      </div>
    </PageShell>
  );
}
