import p1 from "@/assets/property-1.jpg";
import p2 from "@/assets/property-2.jpg";
import p3 from "@/assets/property-3.jpg";
import p4 from "@/assets/property-4.jpg";

export type Property = {
  id: string;
  name: string;
  location: string;
  type: string;
  price: string;
  psf: string;
  area: string;
  beds: number;
  image: string;
  blurb: string;
  highlights: string[];
};

export const properties: Property[] = [
  {
    id: "the-forest-estate",
    name: "The Forest Estate",
    location: "Jim Corbett",
    type: "Private Villa",
    price: "₹4.75 Cr onwards",
    psf: "₹11310 / sq ft",
    area: "4,200 sq ft",
    beds: 4,
    image: "/assets/cat-forest.jpg",
    blurb: "A low, quiet house built to disappear into sal forest — designed so the trees, not the architecture, remain the subject.",
    highlights: ["Privacy", "Nature", "Wellness", "Rental potential"],
  },
  {
    id: "the-quiet-ridge",
    name: "The Quiet Ridge",
    location: "Mukteshwar",
    type: "Mountain Residence",
    price: "₹3.40 Cr onwards",
    psf: "₹10968 / sq ft",
    area: "3,100 sq ft",
    beds: 3,
    image: "/assets/cat-mountains.jpg",
    blurb: "A three-bedroom house placed along a single contour so every room faces the Himalayan skyline without terracing the hillside.",
    highlights: ["Views", "Privacy", "Weekend escape"],
  },
  {
    id: "the-river-sanctuary",
    name: "The River Sanctuary",
    location: "Rishikesh",
    type: "Wellness Estate",
    price: "₹6.20 Cr onwards",
    psf: "₹12917 / sq ft",
    area: "4,800 sq ft",
    beds: 4,
    image: "/assets/cat-wellness.jpg",
    blurb: "A residence organised around stillness — water, shade and a single long axis toward the river valley.",
    highlights: ["Wellness", "Hospitality", "Privacy", "Rental potential"],
  },
  {
    id: "the-country-house",
    name: "The Country House",
    location: "Sohna",
    type: "Villa",
    price: "₹2.85 Cr onwards",
    psf: "₹8382 / sq ft",
    area: "3400 sq ft",
    beds: 3,
    image: "/assets/cat-country.jpg",
    blurb: "An hour from Gurugram: a low country house on a full acre, built for Friday evenings rather than annual holidays.",
    highlights: ["Family", "Accessibility", "Weekend escape"],
  },
  {
    id: "the-pine-pavilion",
    name: "The Pine Pavilion",
    location: "Kasauli",
    type: "Villa",
    price: "₹5.10 Cr onwards",
    psf: "₹13421 / sq ft",
    area: "3800 sq ft",
    beds: 4,
    image: "/assets/bungalow-exterior.jpg",
    blurb: "A pavilion-plan villa among deodar, planned so the living volume can be opened entirely to the pines.",
    highlights: ["Views", "Community", "Weekend escape"],
  },
  {
    id: "the-cloud-house",
    name: "The Cloud House",
    location: "Dhanaulti",
    type: "Villa",
    price: "₹3.95 Cr onwards",
    psf: "₹13621 / sq ft",
    area: "2900 sq ft",
    beds: 3,
    image: "/assets/prop-pool.jpg",
    blurb: "A compact retreat at 2,200 metres, built for two people and occasional guests.",
    highlights: ["Wellness", "Privacy", "Views"],
  },
  {
    id: "the-orchard-residences",
    name: "The Orchard Residences",
    location: "Nainital",
    type: "Villa",
    price: "₹2.20 Cr onwards",
    psf: "₹10476 / sq ft",
    area: "2100 sq ft",
    beds: 2,
    image: "/assets/prop-living.jpg",
    blurb: "An entry point into Kumaon ownership without compromising on siting or construction quality.",
    highlights: ["Community", "Accessibility", "Rental potential"],
  },
  {
    id: "the-walled-garden",
    name: "The Walled Garden",
    location: "Alwar",
    type: "Villa",
    price: "₹2.60 Cr onwards",
    psf: "₹8125 / sq ft",
    area: "3200 sq ft",
    beds: 3,
    image: "/assets/bungalow-interior.jpg",
    blurb: "A courtyard house behind a garden wall, on the approach to the Sariska landscape.",
    highlights: ["Privacy", "Family", "Nature"],
  }
];

export const neighbourhoods = [
  {
    name: "Indiranagar, Bengaluru",
    tag: "Established",
    psf: "₹ 16,400",
    growth: "+7.2% YoY",
    note: "Low-rise streets, walkable retail and a steady resale market that rarely sits idle.",
  },
  {
    name: "Alipore, Kolkata",
    tag: "Heritage",
    psf: "₹ 14,100",
    growth: "+4.8% YoY",
    note: "Wide colonial avenues, large plots and slow, deliberate turnover of ownership.",
  },
  {
    name: "Kharadi, Pune",
    tag: "Emerging",
    psf: "₹ 9,750",
    growth: "+11.6% YoY",
    note: "Employment-led demand with new arterial road work due for completion next year.",
  },
  {
    name: "Kochi Marine Drive",
    tag: "Waterfront",
    psf: "₹ 11,300",
    growth: "+6.1% YoY",
    note: "Backwater frontage with limited developable land and firm rental yields.",
  },
];
