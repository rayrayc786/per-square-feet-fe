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

const propertiesImages = allData.map((row, index) => {
    const name = row['Project Name'] || row['Project name '] || `Project ${index + 1}`;
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + index;
    
    let links = [];
    const photosRaw = row['Photos'] || '';
    const otherRaw = row['Other Media (Floor Plan, Layout, Drone View etc)'] || row['Other Media '] || '';
    
    if (typeof photosRaw === 'string') {
        links = links.concat(photosRaw.split(',').map(l => l.trim()).filter(l => l.includes('drive.google.com')));
    }
    if (typeof otherRaw === 'string') {
        links = links.concat(otherRaw.split(',').map(l => l.trim()).filter(l => l.includes('drive.google.com')));
    }
    
    return {
        id,
        links: [...new Set(links)]
    };
}).filter(p => p.links.length > 0 && !p.id.startsWith('project-'));

fs.writeFileSync('/Users/rahul/Downloads/lovable-project-46cff0ec/scratch/image_links.json', JSON.stringify(propertiesImages, null, 2));
console.log('Successfully extracted image links for ' + propertiesImages.length + ' properties.');
