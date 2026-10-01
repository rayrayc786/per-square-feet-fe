const fs = require('fs');

const imageMap = require('./image_map.json');
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
        if (imageMap[prop.id] && imageMap[prop.id].length > 0) {
            prop.gallery = imageMap[prop.id];
            prop.image = imageMap[prop.id][0]; // set main image
        }
    });

    const newPropertiesCode = 'export const properties: Property[] = ' + JSON.stringify(properties, null, 2) + ';\n\nexport const neighbourhoods =';
    siteDataContent = siteDataContent.substring(0, startIndex) + newPropertiesCode + siteDataContent.substring(endIndex + endStr.length);
    fs.writeFileSync(siteDataPath, siteDataContent);
    console.log('Successfully updated site-data.ts with local images');
} else {
    console.error('Could not find properties array in site-data.ts');
}
