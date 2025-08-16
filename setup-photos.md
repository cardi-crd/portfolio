# Photo Portfolio Setup Guide

## 📁 Folder Structure
Your photos should be organized in the following folders:

```
public/
├── images/
│   ├── rodeo/
│   │   ├── tucson/          # Tucson: La Fiesta De Los Vaqueros
│   │   └── prescott/        # Prescott 4th of July Rodeo
│   ├── portraiture/         # Portrait photography  
│   └── brandwork/           # Brand and commercial photography
```

## 📸 How to Add Your Photos

### Step 1: Organize Your Photos
1. **Create the folders** (already done):
   - `public/images/rodeo/tucson/` - Tucson rodeo photos
   - `public/images/rodeo/prescott/` - Prescott rodeo photos
   - `public/images/portraiture/` - Portrait photos
   - `public/images/brandwork/` - Brand work photos

2. **Add your photos** to the appropriate folders:
   - Copy your Tucson rodeo photos to `public/images/rodeo/tucson/`
   - Copy your Prescott rodeo photos to `public/images/rodeo/prescott/`
   - Copy your portrait photos to `public/images/portraiture/`
   - Copy your brand work photos to `public/images/brandwork/`

### Step 2: Supported Image Formats
- **JPEG** (.jpg, .jpeg) - Recommended for photos
- **PNG** (.png) - Good for images with transparency
- **WebP** (.webp) - Modern format, great compression
- **AVIF** (.avif) - Latest format, best compression

### Step 3: Image Naming
Use descriptive names for your images:
- `tucson-action-1.jpg`
- `prescott-cowboy-1.jpg`
- `studio-portrait-1.jpg`
- `brand-campaign-1.jpg`

### Step 4: Update the Code
After adding your photos, update the `src/components/ImageStack.tsx` file to use your local images.

## 🎯 Recommended Image Sizes
- **Width**: 1200-2000px (for good quality)
- **Height**: 800-1500px (maintain aspect ratio)
- **File size**: Under 500KB per image (for fast loading)

## 📝 Example Photo Structure
```
public/images/rodeo/tucson/
├── tucson-action-1.jpg
├── tucson-cowboy-1.jpg
├── tucson-arena-1.jpg
└── tucson-scene-1.jpg

public/images/rodeo/prescott/
├── prescott-action-1.jpg
├── prescott-cowboy-1.jpg
├── prescott-arena-1.jpg
└── prescott-scene-1.jpg

public/images/portraiture/
├── studio-portrait-1.jpg
├── natural-light-1.jpg
├── environmental-1.jpg
└── classic-portrait-1.jpg

public/images/brandwork/
├── product-shot-1.jpg
├── commercial-1.jpg
├── brand-campaign-1.jpg
└── corporate-1.jpg
```

## 🚀 Next Steps
1. Add your photos to the folders
2. Update the ImageStack component (I'll help with this)
3. Test the portfolio with your images

## 🎪 Navigation Flow
The portfolio now has a nested structure:
1. **Main Categories**: Rodeo, Portraiture, Brand Work
2. **Rodeo Subcategories**: 
   - Tucson: La Fiesta De Los Vaqueros
   - Prescott 4th of July Rodeo
3. **Direct Categories**: Portraiture and Brand Work go directly to photo viewing
