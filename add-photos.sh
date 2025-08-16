#!/bin/bash

echo "📸 Photo Portfolio Setup"
echo "========================"

# Check if folders exist
if [ ! -d "public/images" ]; then
    echo "Creating image folders..."
    mkdir -p public/images/rodeo/tucson public/images/rodeo/prescott public/images/portraiture public/images/brandwork
fi

echo ""
echo "📁 Your image folders are ready:"
echo "   public/images/rodeo/tucson/     - Tucson: La Fiesta De Los Vaqueros photos"
echo "   public/images/rodeo/prescott/   - Prescott 4th of July Rodeo photos"
echo "   public/images/portraiture/      - Portrait photos"
echo "   public/images/brandwork/        - Brand and commercial photos"
echo ""

echo "📋 Next steps:"
echo "1. Copy your photos to the appropriate folders"
echo "2. Use descriptive names like: tucson-action-1.jpg, prescott-cowboy-1.jpg"
echo "3. Run: node scripts/generate-image-data.js"
echo "4. Copy the output and replace the categories in src/components/ImageStack.tsx"
echo ""

echo "🎯 Supported formats: .jpg, .jpeg, .png, .webp, .avif"
echo "📏 Recommended size: 1200-2000px width, under 500KB per image"
echo ""

# Check if there are any images
tucson_count=$(find public/images/rodeo/tucson -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.webp" -o -name "*.avif" 2>/dev/null | wc -l)
prescott_count=$(find public/images/rodeo/prescott -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.webp" -o -name "*.avif" 2>/dev/null | wc -l)
portrait_count=$(find public/images/portraiture -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.webp" -o -name "*.avif" 2>/dev/null | wc -l)
brand_count=$(find public/images/brandwork -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.webp" -o -name "*.avif" 2>/dev/null | wc -l)

echo "📊 Current image count:"
echo "   Tucson Rodeo: $tucson_count images"
echo "   Prescott Rodeo: $prescott_count images"
echo "   Portraiture: $portrait_count images"
echo "   Brand Work: $brand_count images"
echo ""

if [ $tucson_count -gt 0 ] || [ $prescott_count -gt 0 ] || [ $portrait_count -gt 0 ] || [ $brand_count -gt 0 ]; then
    echo "🔄 Generating image data..."
    node scripts/generate-image-data.js
    echo ""
    echo "✅ Image data generated! Check image-data.json for the output."
fi

echo ""
echo "🚀 Ready to add your photos!"
