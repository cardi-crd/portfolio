const fs = require('fs');
const path = require('path');

// Function to get all image files from a directory
function getImageFiles(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  const files = fs.readdirSync(dirPath);
  return files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext);
  });
}

// Function to generate image data for a subcategory
function generateSubCategoryData(categoryPath, subCategoryKey, subCategoryTitle) {
  const imageFiles = getImageFiles(categoryPath);
  
  return {
    key: subCategoryKey,
    title: subCategoryTitle,
    images: imageFiles.map((file, index) => {
      const name = path.parse(file).name;
      const title = name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      return {
        id: index + 1,
        src: `/images/rodeo/${subCategoryKey}/${file}`,
        title: title,
        category: subCategoryTitle
      };
    })
  };
}

// Function to generate image data
function generateImageData() {
  const basePath = path.join(__dirname, '../public/images');
  
  // Generate rodeo subcategories
  const tucsonData = generateSubCategoryData(
    path.join(basePath, 'rodeo/tucson'),
    'tucson',
    'Tucson: La Fiesta De Los Vaqueros'
  );
  
  const prescottData = generateSubCategoryData(
    path.join(basePath, 'rodeo/prescott'),
    'prescott',
    'Prescott 4th of July Rodeo'
  );
  
  // Generate other categories
  const portraitureFiles = getImageFiles(path.join(basePath, 'portraiture'));
  const brandworkFiles = getImageFiles(path.join(basePath, 'brandwork'));
  
  const categories = [
    {
      key: 'rodeo',
      title: 'Rodeo',
      hasSubCategories: true,
      subCategories: [tucsonData, prescottData]
    },
    {
      key: 'portraiture',
      title: 'Portraiture',
      hasSubCategories: false,
      images: portraitureFiles.map((file, index) => {
        const name = path.parse(file).name;
        const title = name
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        return {
          id: index + 1,
          src: `/images/portraiture/${file}`,
          title: title,
          category: 'Portraiture'
        };
      })
    },
    {
      key: 'brandwork',
      title: 'Brand Work',
      hasSubCategories: false,
      images: brandworkFiles.map((file, index) => {
        const name = path.parse(file).name;
        const title = name
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        return {
          id: index + 1,
          src: `/images/brandwork/${file}`,
          title: title,
          category: 'Brand Work'
        };
      })
    }
  ];
  
  return categories;
}

// Generate and log the image data
const imageData = generateImageData();

console.log('Generated Image Data:');
console.log(JSON.stringify(imageData, null, 2));

// Save to a JSON file for easy copying
const outputPath = path.join(__dirname, '../image-data.json');
fs.writeFileSync(outputPath, JSON.stringify(imageData, null, 2));
console.log(`\nImage data saved to: ${outputPath}`);

// Log summary
console.log('\n📊 Image Summary:');
imageData.forEach(category => {
  if (category.hasSubCategories && category.subCategories) {
    console.log(`${category.title}:`);
    category.subCategories.forEach(sub => {
      console.log(`  - ${sub.title}: ${sub.images.length} images`);
    });
  } else {
    console.log(`${category.title}: ${category.images.length} images`);
  }
});
