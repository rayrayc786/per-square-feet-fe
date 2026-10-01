const fs = require('fs');
const properties = require('./parsed_properties.json');

// Filter out empty projects
const validProperties = properties.filter(p => p.name && !p.name.startsWith('Project '));

const siteDataPath = '/Users/rahul/Downloads/lovable-project-46cff0ec/src/lib/site-data.ts';
let siteDataContent = fs.readFileSync(siteDataPath, 'utf8');

// The file structure has:
// export const properties: Property[] = [ ... ];
// export const neighbourhoods = [ ... ];

const startStr = 'export const properties: Property[] = [';
const startIndex = siteDataContent.indexOf(startStr);
const endStr = '];\n\nexport const neighbourhoods =';
let endIndex = siteDataContent.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
    const newPropertiesCode = 'export const properties: Property[] = ' + JSON.stringify(validProperties, null, 2) + ';\n\nexport const neighbourhoods =';
    siteDataContent = siteDataContent.substring(0, startIndex) + newPropertiesCode + siteDataContent.substring(endIndex + endStr.length);
    fs.writeFileSync(siteDataPath, siteDataContent);
    console.log('Successfully updated site-data.ts');
} else {
    console.error('Could not find properties array in site-data.ts');
}
