const XLSX = require('xlsx');
const fs = require('fs');

const workbook = XLSX.readFile('/Users/rahul/Downloads/lovable-project-46cff0ec/src/assets/Developer Connect (Responses).xlsx');
const sheetNameList = workbook.SheetNames;
let allData = [];

sheetNameList.forEach(sheetName => {
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
    allData = allData.concat(data);
});

// Format the data into Property objects
const properties = allData.map((row, index) => {
    // Generate a unique ID
    const name = row['Project Name'] || row['Project name '] || `Project ${index + 1}`;
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + index;
    
    // Extract images if any
    let gallery = [];
    let image = "/assets/prop-living.jpg"; // Default image
    const photosRaw = row['Photos'] || row['Other Media (Floor Plan, Layout, Drone View etc)'];
    if (photosRaw && typeof photosRaw === 'string') {
        const links = photosRaw.split(',').map(l => l.trim()).filter(l => l.length > 0);
        if (links.length > 0) {
            // Using placeholder or links if needed, but since it's an app, they need actual images or we keep default
            // For now, let's keep default if it's a drive link since drive links won't render directly in <img> tags
        }
    }
    
    // Attempt to extract beds
    const configRaw = String(row['What Are The Configurations Offered? (eg. 1 BHK, 2 BHK, 3 BHK etc)'] || '');
    let bedsMatch = configRaw.match(/(\d+)/);
    let beds = bedsMatch ? parseInt(bedsMatch[1]) : 2;

    const highlights = [];
    if (row['What Is The Location Specialty?']) highlights.push(row['What Is The Location Specialty?']);
    if (String(row['Is Rental Program Offered? (managed rentals for end user)']).toLowerCase().includes('yes')) highlights.push('Rental potential');
    if (row['What Is The Furnishing Status At Handover?']) highlights.push(row['What Is The Furnishing Status At Handover?']);
    
    return {
        id,
        name: name,
        location: row['What Is The Full Address Of The Project?'] || row['Location'] || 'TBD',
        type: row['What Is The Type Of The Project? (choose one or more than one)'] || 'Property',
        price: row['What Is The Base Price (INR) (starting price per unit)?'] || 'TBD',
        psf: 'TBD',
        area: String(row['What Is The Total Area Of The Project (in acres)?'] || 'TBD'),
        beds: beds,
        image: "/assets/cat-forest.jpg",
        blurb: row['USP Points of project'] || 'A premium property with excellent amenities.',
        highlights: highlights.slice(0, 3), // Limit to 3
        gallery: ["/assets/bungalow-interior.jpg", "/assets/bungalow-exterior.jpg", "/assets/prop-living.jpg", "/assets/prop-pool.jpg"],
        developer: row['Name of the devloper:'] || row['Developer Name'] || '',
        status: row['What Is The Project Status (construction stage) ?'] || '',
        possessionDate: row['What Is Estimated Possession Date?'] || '',
        totalUnits: String(row['What Are The Total Units In The Project? (nos.)'] || ''),
        availableUnits: String(row['How Many Units Are Available For Sale? (current sellable stock) (nos.)'] || ''),
        furnishing: row['What Is The Furnishing Status At Handover?'] || '',
        rentalProgram: row['Is Rental Program Offered? (managed rentals for end user)'] || '',
        parking: String(row['Number Of Parking Slots Per Unit?'] || ''),
        ownership: row['What Is The Land Ownership Offered (ownership type)?'] || ''
    };
});

fs.writeFileSync('/Users/rahul/Downloads/lovable-project-46cff0ec/scratch/parsed_properties.json', JSON.stringify(properties, null, 2));
console.log('Successfully parsed ' + properties.length + ' properties.');
