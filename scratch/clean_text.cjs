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
    
    function toTitleCase(str) {
        if (!str) return '';
        return str.trim().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
    }
    
    function cleanType(str) {
        if (!str) return '';
        let cleaned = str.trim();
        if (cleaned.endsWith(',')) cleaned = cleaned.slice(0, -1);
        return cleaned.trim();
    }
    
    function cleanPrice(str) {
        if (!str || str === 'TBD' || str === 'Not decided') return 'Price on Request';
        // Basic cleanup
        let cleaned = String(str).trim().toUpperCase();
        if (cleaned === '1.5CR AND 95 LAKH') return '₹ 95 L - 1.5 Cr';
        if (cleaned === '4 CR') return '₹ 4 Cr';
        if (cleaned === '13999') return '₹ 13,999 / sqyd';
        if (cleaned === '87.5 L') return '₹ 87.5 L';
        if (cleaned === '3.5 CR') return '₹ 3.5 Cr';
        if (cleaned === '1.8 CR') return '₹ 1.8 Cr';
        if (cleaned === '12.10 CR PER ACRE') return '₹ 12.10 Cr / Acre';
        if (cleaned === '6400 PER SQFT') return '₹ 6,400 / sqft';
        if (cleaned === '1.35 CR') return '₹ 1.35 Cr';
        if (cleaned === '75LAC') return '₹ 75 L';
        if (cleaned === '8.5CR') return '₹ 8.5 Cr';
        if (cleaned === '1.30 CR') return '₹ 1.30 Cr';
        if (cleaned === '8000PER SQYD') return '₹ 8,000 / sqyd';
        if (cleaned === '1.25 CR') return '₹ 1.25 Cr';
        return str;
    }
    
    function cleanLocation(str) {
        if (!str) return 'TBD';
        if (str.toLowerCase().includes('corbett')) return 'Jim Corbett';
        if (str.toLowerCase().includes('baghpat')) return 'Baghpat, UP';
        if (str.toLowerCase().includes('shakumbhri')) return 'Badkala Hills';
        if (str.toLowerCase().includes('neemrana')) return 'Neemrana, Rajasthan';
        if (str.toLowerCase().includes('bicholim')) return 'Bicholim, Goa';
        if (str.toLowerCase().includes('goa maharashtra border')) return 'Patra Devi, Goa';
        if (str.toLowerCase().includes('rohtak')) return 'Rohtak, Haryana';
        if (str.toLowerCase().includes('faridabad')) return 'Sector 89, Faridabad';
        if (str.toLowerCase().includes('khalapur')) return 'Khalapur, Maharashtra';
        if (str.toLowerCase().includes('ramnagar')) return 'Ramnagar, Uttarakhand';
        if (str.toLowerCase().includes('shahpura')) return 'Shahpura';
        if (str.toLowerCase().includes('dharampur')) return 'Dharampur, HP';
        if (str.toLowerCase().includes('barsana')) return 'Barsana, UP';
        if (str.toLowerCase().includes('mahendargarh')) return 'Mahendargarh';
        if (str.toLowerCase().includes('mirzapur')) return 'Mirzapur, UP';
        return toTitleCase(str.split(',')[0]);
    }

    properties.forEach(prop => {
        prop.name = toTitleCase(prop.name);
        prop.type = cleanType(prop.type);
        if (prop.area === '?') prop.area = 'TBD';
        prop.price = cleanPrice(prop.price);
        prop.location = cleanLocation(prop.location);
    });

    const newPropertiesCode = 'export const properties: Property[] = ' + JSON.stringify(properties, null, 2) + ';\n\nexport const neighbourhoods =';
    siteDataContent = siteDataContent.substring(0, startIndex) + newPropertiesCode + siteDataContent.substring(endIndex + endStr.length);
    fs.writeFileSync(siteDataPath, siteDataContent);
    console.log('Successfully cleaned up text in site-data.ts');
} else {
    console.error('Could not find properties array in site-data.ts');
}
