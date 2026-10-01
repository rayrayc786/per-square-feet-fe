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
  gallery?: string[];
  developer?: string;
  status?: string;
  possessionDate?: string | number;
  totalUnits?: string;
  availableUnits?: string;
  furnishing?: string;
  rentalProgram?: string;
  lat?: number;
  lng?: number;
  parking?: string;
  ownership?: string;
};

export const properties: Property[] = [
  {
    "id": "vana--0",
    "name": "Vana",
    "location": "Jim Corbett",
    "type": "Villa, Farmhouse",
    "price": "₹ 95 L - 1.5 Cr",
    "psf": "TBD",
    "area": "TBD",
    "beds": 3,
    "image": "/assets/properties/vana--0/image_1.jpg",
    "blurb": "A premium property with excellent amenities.",
    "highlights": [
      "Forest",
      "Rental potential",
      "Fully Furnished"
    ],
    "gallery": [
      "/assets/properties/vana--0/image_1.jpg",
      "/assets/properties/vana--0/image_2.jpg",
      "/assets/properties/vana--0/image_3.jpg",
      "/assets/properties/vana--0/image_4.jpg",
      "/assets/properties/vana--0/image_5.jpg"
    ],
    "developer": "CL INFRATECH",
    "status": "Under Construction",
    "possessionDate": 46284,
    "totalUnits": "15+22",
    "availableUnits": "6+22",
    "furnishing": "Fully Furnished",
    "rentalProgram": "Yes",
    "parking": "1",
    "ownership": "Freehold",
    "lat": 29.379630165550925,
    "lng": 79.42572026290797
  },
  {
    "id": "nova-reserve-1",
    "name": "Nova Reserve",
    "location": "Baghpat, UP",
    "type": "Villa, Plot only",
    "price": "Price on Request",
    "psf": "TBD",
    "area": "40",
    "beds": 2,
    "image": "/assets/properties/nova-reserve-1/image_1.jpg",
    "blurb": "A premium property with excellent amenities.",
    "highlights": [
      "Countryside",
      "Unfurnished"
    ],
    "gallery": [
      "/assets/properties/nova-reserve-1/image_1.jpg"
    ],
    "developer": "Nova Reseve",
    "status": "Planning",
    "possessionDate": 47383,
    "totalUnits": "300",
    "availableUnits": "50",
    "furnishing": "Unfurnished",
    "rentalProgram": "No",
    "parking": "Not decided",
    "ownership": "Freehold",
    "lat": 28.468800382973004,
    "lng": 77.03315396890932
  },
  {
    "id": "avacasa--2",
    "name": "Avacasa",
    "location": "Badkala Hills",
    "type": "Villa",
    "price": "₹ 4 Cr",
    "psf": "TBD",
    "area": "26 Acre",
    "beds": 3,
    "image": "/assets/properties/avacasa--2/image_1.jpg",
    "blurb": "A premium property with excellent amenities.",
    "highlights": [
      "Mountains",
      "Rental potential",
      "Semi Furnished"
    ],
    "gallery": [
      "/assets/properties/avacasa--2/image_1.jpg",
      "/assets/properties/avacasa--2/image_2.jpg",
      "/assets/properties/avacasa--2/image_3.jpg",
      "/assets/properties/avacasa--2/image_4.jpg",
      "/assets/properties/avacasa--2/image_5.jpg"
    ],
    "developer": "Lumora Estates ",
    "status": "Under Construction",
    "possessionDate": 46986,
    "totalUnits": "74",
    "availableUnits": "21",
    "furnishing": "Semi Furnished",
    "rentalProgram": "Yes",
    "parking": "2",
    "ownership": "Freehold",
    "lat": 28.838411556954124,
    "lng": 77.25078656693128
  },
  {
    "id": "nehlia-santosh-hills--3",
    "name": "Nehlia Santosh Hills",
    "location": "Neemrana, Rajasthan",
    "type": "Farmhouse",
    "price": "₹ 13,999 / sqyd",
    "psf": "TBD",
    "area": "75 Acres ",
    "beds": 2,
    "image": "/assets/cat-forest.jpg",
    "blurb": "Aravli view and 5 star resort ",
    "highlights": [
      "Mountains",
      "Unfurnished"
    ],
    "gallery": [
      "/assets/bungalow-interior.jpg",
      "/assets/bungalow-exterior.jpg",
      "/assets/prop-living.jpg",
      "/assets/prop-pool.jpg"
    ],
    "developer": "Nehlia Developer ",
    "status": "Under Construction",
    "possessionDate": 46997,
    "totalUnits": "Phase I,50 units and total units in our project 150 unit ",
    "availableUnits": "Phase I approx 15 units ",
    "furnishing": "Unfurnished",
    "rentalProgram": "",
    "parking": "4",
    "ownership": "Freehold",
    "lat": 28.032323466744344,
    "lng": 76.40045653344647
  },
  {
    "id": "one-goa-4",
    "name": "One Goa",
    "location": "Bicholim, Goa",
    "type": "Plot only, and apartment",
    "price": "₹ 87.5 L",
    "psf": "TBD",
    "area": "100 +",
    "beds": 1250,
    "image": "/assets/properties/one-goa-4/image_1.jpg",
    "blurb": "A premium property with excellent amenities.",
    "highlights": [
      "Forest",
      "plots"
    ],
    "gallery": [
      "/assets/properties/one-goa-4/image_1.jpg",
      "/assets/properties/one-goa-4/image_2.jpg"
    ],
    "developer": "The House of Abhinandan Lodha ",
    "status": "Under Construction",
    "possessionDate": 46387,
    "totalUnits": "1000 +",
    "availableUnits": "150",
    "furnishing": "plots",
    "rentalProgram": "Rental assistance",
    "parking": "1",
    "ownership": "Freehold",
    "lat": 15.335698585787648,
    "lng": 74.11033366962796
  },
  {
    "id": "golf-city-yugen-5",
    "name": "Golf City - Yugen",
    "location": "Patra Devi, Goa",
    "type": "Villa",
    "price": "₹ 3.5 Cr",
    "psf": "TBD",
    "area": "390 Sq Yrd",
    "beds": 3,
    "image": "/assets/properties/golf-city-yugen-5/image_1.jpg",
    "blurb": "A premium property with excellent amenities.",
    "highlights": [
      "Beach",
      "Rental potential",
      "Fully Furnished"
    ],
    "gallery": [
      "/assets/properties/golf-city-yugen-5/image_1.jpg"
    ],
    "developer": "Yugen Infra",
    "status": "Under Construction",
    "possessionDate": 47088,
    "totalUnits": "62",
    "availableUnits": "15",
    "furnishing": "Fully Furnished",
    "rentalProgram": "Yes",
    "parking": "2",
    "ownership": "Freehold",
    "lat": 15.31950558359002,
    "lng": 74.15234392963946
  },
  {
    "id": "buildtown-farmhouse-6",
    "name": "Buildtown Farmhouse",
    "location": "Rohtak, Haryana",
    "type": "Farmhouse",
    "price": "₹ 1.8 Cr",
    "psf": "TBD",
    "area": "35 Acre",
    "beds": 2,
    "image": "/assets/properties/buildtown-farmhouse-6/image_1.jpg",
    "blurb": "A premium property with excellent amenities.",
    "highlights": [
      "Agriculture Land",
      "Rental potential",
      "Farmhouse Plot "
    ],
    "gallery": [
      "/assets/properties/buildtown-farmhouse-6/image_1.jpg",
      "/assets/properties/buildtown-farmhouse-6/image_2.jpg"
    ],
    "developer": "Buildtown Infratech Pvt.Ltd",
    "status": "Under Construction",
    "possessionDate": 46599,
    "totalUnits": "28",
    "availableUnits": "28",
    "furnishing": "Farmhouse Plot ",
    "rentalProgram": "Yes",
    "parking": "No Any Paking from Builder Side",
    "ownership": "Freehold",
    "lat": 28.574185369448855,
    "lng": 77.4579350653066
  },
  {
    "id": "yashobhoomi-farms-7",
    "name": "Yashobhoomi Farms",
    "location": "Sector 89, Faridabad",
    "type": "Farmhouse",
    "price": "₹ 12.10 Cr / Acre",
    "psf": "TBD",
    "area": "16 Acres",
    "beds": 3000,
    "image": "/assets/properties/yashobhoomi-farms-7/image_1.jpg",
    "blurb": "Nearest to the developed sectors and developing sectors with proposed expressway and Metro stations underway",
    "highlights": [
      "in the Middle of the futuristic developments like FNG , Gurugram-Faridabad- Noida RRTS",
      "Semi Furnished"
    ],
    "gallery": [
      "/assets/properties/yashobhoomi-farms-7/image_1.jpg",
      "/assets/properties/yashobhoomi-farms-7/image_2.jpg",
      "/assets/properties/yashobhoomi-farms-7/image_3.jpg",
      "/assets/properties/yashobhoomi-farms-7/image_4.jpg",
      "/assets/properties/yashobhoomi-farms-7/image_5.jpg"
    ],
    "developer": "Mr. Mukesh Rawat",
    "status": "Under Construction",
    "possessionDate": 46327,
    "totalUnits": "19",
    "availableUnits": "12",
    "furnishing": "Semi Furnished",
    "rentalProgram": "No",
    "parking": "Self ",
    "ownership": "Freehold",
    "lat": 28.375709860084527,
    "lng": 77.10970919420956
  },
  {
    "id": "svb-amansara-earthstar--8",
    "name": "Svb Amansara Earthstar",
    "location": "Khalapur, Maharashtra",
    "type": "Plot only",
    "price": "₹ 6,400 / sqft",
    "psf": "TBD",
    "area": "30 acres",
    "beds": 2,
    "image": "/assets/properties/svb-amansara-earthstar--8/image_1.jpg",
    "blurb": "A premium property with excellent amenities.",
    "highlights": [
      "Mountains",
      "Only plot"
    ],
    "gallery": [
      "/assets/properties/svb-amansara-earthstar--8/image_1.jpg",
      "/assets/properties/svb-amansara-earthstar--8/image_2.jpg"
    ],
    "developer": "Svb Realty ",
    "status": "Under Construction",
    "possessionDate": 46356,
    "totalUnits": "140",
    "availableUnits": "50",
    "furnishing": "Only plot",
    "rentalProgram": "No",
    "parking": "Villa project ",
    "ownership": "Freehold",
    "lat": 28.616714757247486,
    "lng": 77.13734058941502
  },
  {
    "id": "corbett-county-9",
    "name": "Corbett County",
    "location": "Jim Corbett",
    "type": "Villa, Farmhouse, Plot only",
    "price": "₹ 1.35 Cr",
    "psf": "TBD",
    "area": "18",
    "beds": 2,
    "image": "/assets/properties/corbett-county-9/image_1.jpg",
    "blurb": "Resort theme, clubhouse, 4 acre green park area, 9m and 12m roads ,swimming pool,low density project",
    "highlights": [
      "Forest",
      "Fully Furnished"
    ],
    "gallery": [
      "/assets/properties/corbett-county-9/image_1.jpg",
      "/assets/properties/corbett-county-9/image_2.jpg",
      "/assets/properties/corbett-county-9/image_3.jpg",
      "/assets/properties/corbett-county-9/image_4.jpg",
      "/assets/properties/corbett-county-9/image_5.jpg"
    ],
    "developer": "Belvoir Realty Pvt.ltd",
    "status": "Under Construction",
    "possessionDate": 47330,
    "totalUnits": "274",
    "availableUnits": "30",
    "furnishing": "Fully Furnished",
    "rentalProgram": "Revnue sharing and rental fcilities available",
    "parking": "1",
    "ownership": "Freehold",
    "lat": 29.432384157093356,
    "lng": 79.43358090524904
  },
  {
    "id": "hill-view-farms-10",
    "name": "Hill View Farms",
    "location": "Shahpura",
    "type": "Farmhouse",
    "price": "₹ 75 L",
    "psf": "TBD",
    "area": "90 acres",
    "beds": 2,
    "image": "/assets/properties/hill-view-farms-10/image_1.jpg",
    "blurb": "Surrounded by aravali moutains",
    "highlights": [
      "Mountains",
      "Rental potential",
      "We deal in land and fully furnished as well"
    ],
    "gallery": [
      "/assets/properties/hill-view-farms-10/image_1.jpg",
      "/assets/properties/hill-view-farms-10/image_2.jpg",
      "/assets/properties/hill-view-farms-10/image_3.jpg",
      "/assets/properties/hill-view-farms-10/image_4.jpg",
      "/assets/properties/hill-view-farms-10/image_5.jpg"
    ],
    "developer": "AM REALTY SOLUTIONS ",
    "status": "Ready to Move",
    "possessionDate": 46646,
    "totalUnits": "112",
    "availableUnits": "12",
    "furnishing": "We deal in land and fully furnished as well",
    "rentalProgram": "Yes",
    "parking": "Depend upon the construction ",
    "ownership": "Freehold",
    "lat": 28.515600310699526,
    "lng": 77.08543070662238
  },
  {
    "id": "the-kasul-11",
    "name": "The Kasul",
    "location": "Dharampur, HP",
    "type": "Villa",
    "price": "₹ 8.5 Cr",
    "psf": "TBD",
    "area": "13",
    "beds": 4,
    "image": "/assets/properties/the-kasul-11/image_1.jpg",
    "blurb": "Lift in every villa, plunge pool, 3acres of green area",
    "highlights": [
      "Mountains",
      "Rental potential",
      "Semi Furnished"
    ],
    "gallery": [
      "/assets/properties/the-kasul-11/image_1.jpg",
      "/assets/properties/the-kasul-11/image_2.jpg",
      "/assets/properties/the-kasul-11/image_3.jpg"
    ],
    "developer": "Vineet Manchanda",
    "status": "Under Construction",
    "possessionDate": 46919,
    "totalUnits": "35",
    "availableUnits": "26",
    "furnishing": "Semi Furnished",
    "rentalProgram": "Yes",
    "parking": "5",
    "ownership": "Freehold",
    "lat": 28.72122881629146,
    "lng": 77.30906083674954
  },
  {
    "id": "shri-divine-vasundhara--12",
    "name": "Shri Divine Vasundhara",
    "location": "Barsana, UP",
    "type": "Villa",
    "price": "₹ 1.30 Cr",
    "psf": "TBD",
    "area": "36 Acres approx ",
    "beds": 2,
    "image": "/assets/properties/shri-divine-vasundhara--12/image_1.jpg",
    "blurb": " simplex in MIVAN technology, 70 % greenery, cottage style construction, closes to main temple in barsana , ",
    "highlights": [
      "Temple Town",
      "Semi Furnished"
    ],
    "gallery": [
      "/assets/properties/shri-divine-vasundhara--12/image_1.jpg",
      "/assets/properties/shri-divine-vasundhara--12/image_2.jpg"
    ],
    "developer": "Shri divine group ",
    "status": "Under Construction",
    "possessionDate": 46813,
    "totalUnits": "340",
    "availableUnits": "90",
    "furnishing": "Semi Furnished",
    "rentalProgram": "No",
    "parking": "1",
    "ownership": "Freehold",
    "lat": 28.631470111251247,
    "lng": 76.96537830619397
  },
  {
    "id": "nirvana-hills-13",
    "name": "Nirvana Hills",
    "location": "Mahendargarh",
    "type": "Farmhouse",
    "price": "₹ 8,000 / sqyd",
    "psf": "TBD",
    "area": "200",
    "beds": 2,
    "image": "/assets/properties/nirvana-hills-13/image_1.jpg",
    "blurb": "200 acres surrounded by Aravali , 3.5acres of clubhouse with 25+ modern amenities ,5.5acres of Golf Range",
    "highlights": [
      "Mountains",
      "Rental potential",
      "We are providing land"
    ],
    "gallery": [
      "/assets/properties/nirvana-hills-13/image_1.jpg",
      "/assets/properties/nirvana-hills-13/image_2.jpg"
    ],
    "developer": "SEAD REALTY",
    "status": "Under Construction",
    "possessionDate": 46553,
    "totalUnits": "240",
    "availableUnits": "140",
    "furnishing": "We are providing land",
    "rentalProgram": "Yes",
    "parking": "You have to park inside your land parcel",
    "ownership": "Freehold",
    "lat": 28.513232331449824,
    "lng": 77.34919307702805
  },
  {
    "id": "soul-prakriti--14",
    "name": "Soul Prakriti",
    "location": "Mirzapur, UP",
    "type": "Villa, Farmhouse",
    "price": "₹ 1.25 Cr",
    "psf": "TBD",
    "area": "100",
    "beds": 2,
    "image": "/assets/cat-forest.jpg",
    "blurb": "1. From three side covers from jungle and river in front. 2  105 amenities ",
    "highlights": [
      "Forest",
      "Semi Furnished"
    ],
    "gallery": [
      "/assets/bungalow-interior.jpg",
      "/assets/bungalow-exterior.jpg",
      "/assets/prop-living.jpg",
      "/assets/prop-pool.jpg"
    ],
    "developer": "Soul Agro farms Pvt. Ltd.",
    "status": "Under Construction",
    "possessionDate": 46753,
    "totalUnits": "125",
    "availableUnits": "100",
    "furnishing": "Semi Furnished",
    "rentalProgram": "Optional through AIR BNB",
    "parking": "1",
    "ownership": "Freehold",
    "lat": 28.85137768675527,
    "lng": 77.27072726345122
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
