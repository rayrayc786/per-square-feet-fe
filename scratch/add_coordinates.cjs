const fs = require('fs');

const siteDataPath = '/Users/rahul/Downloads/lovable-project-46cff0ec/src/lib/site-data.ts';
let siteDataContent = fs.readFileSync(siteDataPath, 'utf8');

const startStr = 'export const properties: Property[] = [';
const startIndex = siteDataContent.indexOf(startStr);
const endStr = '];\n\nexport const neighbourhoods =';
let endIndex = siteDataContent.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
    const propertiesArrayStr = siteDataContent.substring(startIndex + startStr.length - 1, endIndex + 1);
    const properties = JSON.parse(propertiesArrayStr);
    
    properties.forEach(prop => {
        // Base coordinate (Delhi)
        let lat = 28.6139;
        let lng = 77.2090;
        
        // Slightly random distribution around Delhi / North India
        if (prop.location.toLowerCase().includes('corbett') || prop.location.toLowerCase().includes('nainital')) {
            lat = 29.3919 + (Math.random() * 0.1 - 0.05);
            lng = 79.4542 + (Math.random() * 0.1 - 0.05);
        } else if (prop.location.toLowerCase().includes('goa')) {
            lat = 15.2993 + (Math.random() * 0.1 - 0.05);
            lng = 74.1240 + (Math.random() * 0.1 - 0.05);
        } else if (prop.location.toLowerCase().includes('rajasthan') || prop.location.toLowerCase().includes('neemrana')) {
            lat = 27.9897 + (Math.random() * 0.1 - 0.05);
            lng = 76.3888 + (Math.random() * 0.1 - 0.05);
        } else {
            // Random near Delhi NCR
            lat += (Math.random() * 0.5 - 0.25);
            lng += (Math.random() * 0.5 - 0.25);
        }
        
        prop.lat = lat;
        prop.lng = lng;
    });

    const newPropertiesCode = 'export const properties: Property[] = ' + JSON.stringify(properties, null, 2) + ';\n\nexport const neighbourhoods =';
    siteDataContent = siteDataContent.substring(0, startIndex) + newPropertiesCode + siteDataContent.substring(endIndex + endStr.length);
    
    // add lat/lng to type
    siteDataContent = siteDataContent.replace('rentalProgram?: string;', 'rentalProgram?: string;\n  lat?: number;\n  lng?: number;');
    
    fs.writeFileSync(siteDataPath, siteDataContent);
    console.log('Successfully added mock coordinates to site-data.ts');
} else {
    console.error('Could not find properties array in site-data.ts');
}
