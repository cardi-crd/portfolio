'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import Image from 'next/image';
import { normalizeImageSrc } from '@/lib/normalizeImageSrc';
import { AlbumGrid } from './AlbumGrid';
import { OptimizedImage } from './OptimizedImage';
import { imagePreloader } from '@/lib/imagePreloader';
import { useScrollLock } from '@/lib/useScrollLock';

type ImageData = {
  id: number;
  src: string;
  title: string;
  category: string;
};

type SubCategory = {
  key: string;
  title: string;
  images: ImageData[];
};

type Category = {
  key: string;
  title: string;
  hasSubCategories: boolean;
  subCategories?: SubCategory[];
  images?: ImageData[];
};

// ---- DATA (your existing paths) ----
const categories: Category[] = [
  {
    key: 'rodeo',
    title: 'Rodeo',
    hasSubCategories: false,
    images: [
      { id: 1,  src: '/images/rodeo/tucson/tucson.png',  title: 'Tucson',   category: 'Rodeo' },
      { id: 2,  src: '/images/rodeo/tucson/tucson1.png', title: 'Tucson1',  category: 'Rodeo' },
      { id: 3,  src: '/images/rodeo/tucson/tucson10.png', title: 'Tucson10', category: 'Rodeo' },
      { id: 4,  src: '/images/rodeo/tucson/tucson11.png', title: 'Tucson11', category: 'Rodeo' },
      { id: 5,  src: '/images/rodeo/tucson/tucson12.png', title: 'Tucson12', category: 'Rodeo' },
      { id: 6,  src: '/images/rodeo/tucson/tucson13.png', title: 'Tucson13', category: 'Rodeo' },
      { id: 7,  src: '/images/rodeo/tucson/tucson14.png', title: 'Tucson14', category: 'Rodeo' },
      { id: 8,  src: '/images/rodeo/tucson/tucson15.png', title: 'Tucson15', category: 'Rodeo' },
      { id: 9,  src: '/images/rodeo/tucson/tucson2.png',  title: 'Tucson2',  category: 'Rodeo' },
      { id: 10, src: '/images/rodeo/tucson/tucson3.png',  title: 'Tucson3',  category: 'Rodeo' },
      { id: 11, src: '/images/rodeo/tucson/tucson4.png',  title: 'Tucson4',  category: 'Rodeo' },
      { id: 12, src: '/images/rodeo/tucson/tucson5.png',  title: 'Tucson5',  category: 'Rodeo' },
      { id: 13, src: '/images/rodeo/tucson/tucson6.png',  title: 'Tucson6',  category: 'Rodeo' },
      { id: 14, src: '/images/rodeo/tucson/tucson7.png',  title: 'Tucson7',  category: 'Rodeo' },
      { id: 15, src: '/images/rodeo/tucson/tucson8.png',  title: 'Tucson8',  category: 'Rodeo' },
      { id: 16, src: '/images/rodeo/tucson/tucson9.png',  title: 'Tucson9',  category: 'Rodeo' },
      { id: 17, src: '/images/rodeo/prescott/prescott.jpg',  title: 'Prescott',  category: 'Rodeo' },
      { id: 18, src: '/images/rodeo/prescott/prescott1.jpg', title: 'Prescott1', category: 'Rodeo' },
      { id: 19, src: '/images/rodeo/prescott/prescott10.jpg',title: 'Prescott10',category: 'Rodeo' },
      { id: 20, src: '/images/rodeo/prescott/prescott2.jpg', title: 'Prescott2', category: 'Rodeo' },
      { id: 21, src: '/images/rodeo/prescott/prescott3.jpg', title: 'Prescott3', category: 'Rodeo' },
      { id: 22, src: '/images/rodeo/prescott/prescott4.jpg', title: 'Prescott4', category: 'Rodeo' },
      { id: 23, src: '/images/rodeo/prescott/prescott5.jpg', title: 'Prescott5', category: 'Rodeo' },
      { id: 24, src: '/images/rodeo/prescott/prescott6.jpg', title: 'Prescott6', category: 'Rodeo' },
      { id: 25, src: '/images/rodeo/prescott/prescott7.jpg', title: 'Prescott7', category: 'Rodeo' },
      { id: 26, src: '/images/rodeo/prescott/prescott8.jpg', title: 'Prescott8', category: 'Rodeo' },
      { id: 27, src: '/images/rodeo/prescott/prescott9.jpg', title: 'Prescott9', category: 'Rodeo' }
    ]
  },
  { 
    key: 'portraiture', 
    title: 'Portraiture', 
    hasSubCategories: false, 
    images: [
      { id: 1, src: '/images/portraiture/cn.avif', title: 'CN', category: 'Portraiture' },
      { id: 2, src: '/images/portraiture/cndesert.jpg', title: 'Cndesert', category: 'Portraiture' },
      { id: 3, src: '/images/portraiture/cat1.avif', title: 'Cat1', category: 'Portraiture' },
      { id: 4, src: '/images/portraiture/cat2.avif', title: 'Cat2', category: 'Portraiture' },
      { id: 5, src: '/images/portraiture/cat3.avif', title: 'Cat3', category: 'Portraiture' },
      { id: 6, src: '/images/portraiture/cat.png', title: 'Cat', category: 'Portraiture' },
      { id: 7, src: '/images/portraiture/rach1.avif', title: 'Rach1', category: 'Portraiture' },
      { id: 8, src: '/images/portraiture/ally.png', title: 'Ally', category: 'Portraiture' },
            { id: 9, src: '/images/portraiture/ally2.png', title: 'Ally2', category: 'Portraiture' },
      { id: 10, src: '/images/portraiture/ally3.png', title: 'Ally3', category: 'Portraiture' },
      { id: 11, src: '/images/portraiture/car.jpg', title: 'Car', category: 'Portraiture' },
      { id: 12, src: '/images/portraiture/port1.jpg', title: 'Port1', category: 'Portraiture' },
      { id: 13, src: '/images/portraiture/port2.jpg', title: 'Port2', category: 'Portraiture' }
    ] 
  },
  { 
    key: 'brandwork', 
    title: 'Brand Work', 
    hasSubCategories: false, 
    images: [
      { id: 1, src: '/images/brandwork/arlierecess.jpg', title: 'Recess Mood Drinks', category: 'Brand Work' },
      { id: 2, src: '/images/brandwork/arlierecess2.jpg', title: 'Recess Mood Drinks', category: 'Brand Work' },
      { id: 3, src: '/images/brandwork/bbc.JPG', title: 'Blue Bottle Coffee x Samara Origins', category: 'Brand Work' },
      { id: 4, src: '/images/brandwork/bbc2.JPG', title: 'Blue Bottle Coffee x Samara Origins', category: 'Brand Work' },
      { id: 5, src: '/images/brandwork/savage.png', title: 'Savage x Fenty', category: 'Brand Work' },
      { id: 6, src: '/images/brandwork/cristianxmakeup.png', title: 'Coachella w/ NYX cosmetics - @Nyane x @CristianDennis', category: 'Brand Work' },
      { id: 7, src: '/images/brandwork/-fatoil.png', title: 'Coachella x NYX Cosmetics - @ArlieKontic', category: 'Brand Work' },
      { id: 8, src: '/images/brandwork/-nickinana.png', title: 'Coachella x NYX Cosmetics - @Nikki.Bruner x @NanaBruner', category: 'Brand Work' }
    ] 
  }
];

// helpers
function getAllImagesFromCategory(category: Category): ImageData[] {
  if (category.hasSubCategories && category.subCategories) {
    return category.subCategories.flatMap(s => s.images);
  }
  return category.images || [];
}

// Optimized image component with preloading and lazy loading
const Img = ({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) => {
  return (
    <div className="w-full h-full relative">
      <OptimizedImage
        src={src}
        alt={alt ?? ''}
        className="object-cover w-full h-full"
        priority={priority}
        onError={(e) => {
          console.error('Image failed to load:', src);
          console.error('Error:', e);
        }}
      />
    </div>
  );
};

// Stacked preview component with mode support
function StackedPreview({ images, mode = 'stacked' }: { images: ImageData[]; mode?: 'stacked' | 'flat' }) {
  const preview = images.slice(0, 6);
  
  // Preload the first few images for faster album preview
  useEffect(() => {
    preview.slice(0, 3).forEach(img => {
      const s = normalizeImageSrc(img.src);
      if (s) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = s;
        document.head.appendChild(link);
      }
    });
  }, [preview]);
  
  if (mode === 'flat') {
    // Flat mode: only top image visible, no rotation/offset
    return (
      <div className="relative w-full h-full">
        {preview.map((img, index) => (
          <div
            key={img.id}
            className="absolute inset-0"
            style={{
              opacity: index === 0 ? 1 : 0.1,
              zIndex: preview.length - index
            }}
          >
            <Img src={img.src} alt={img.title} priority={index === 0} />
          </div>
        ))}
      </div>
    );
  }

  // Stacked mode: staggered with rotation and translation
  const rotations = [-6, -3, 0, 3, 6, 9];
  const xOffsets = [-6, -3, 0, 3, 6, 8];
  const yOffsets = [0, 2, 4, 6, 8, 10];
  const scales = [1, 0.98, 0.96, 0.94, 0.92, 0.9];
  const opacities = [1, 0.9, 0.8, 0.7, 0.6, 0.5];

  return (
    <div className="relative w-full h-full">
      {preview.map((img, index) => (
        <div
          key={img.id}
          className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10"
          style={{
            transform: `rotate(${rotations[index]}deg) translate(${xOffsets[index]}px, ${yOffsets[index]}px) scale(${scales[index]})`,
            opacity: opacities[index],
            zIndex: preview.length - index,
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            pointerEvents: index === 0 ? 'auto' : 'none'
          }}
        >
          <Img src={img.src} alt={img.title} />
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
        </div>
      ))}
    </div>
  );
}

export default function ImageStack() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [zoomedCategoryKey, setZoomedCategoryKey] = useState<string | null>(null);
  const [viewingPhoto, setViewingPhoto] = useState<{ images: ImageData[]; currentIndex: number } | null>(null);
  const [albumPhotoIndex, setAlbumPhotoIndex] = useState(0);
  const [renderKey, setRenderKey] = useState(0); // Force re-render key

  // Use robust scroll lock for album/lightbox states
  const isAlbumOpen = !!(selectedCategory || zoomedCategoryKey || viewingPhoto);
  useScrollLock(isAlbumOpen);

  // Cleanup effect to ensure proper state management
  useEffect(() => {
    return () => {
      // Cleanup on component unmount
      document.body.style.overflow = 'unset';
      document.body.classList.remove('no-scroll', 'modal-open');
      
      // Remove any leftover overlays
      document
        .querySelectorAll(
          [
            '.lightbox-portal',
            '.lightbox-backdrop',
            '.modal-backdrop',
            '.yarl__portal',
            '.pswp',
            '.swiper-aria-live',
            '.lenis-overlay',
          ].join(',')
        )
        .forEach((n) => n.remove());
    };
  }, []);

  // Cleanup effect for viewingPhoto and zoomedCategoryKey states
  useEffect(() => {
    let inst: any = undefined;
    // TODO: initialize your viewer/slider here and assign to 'inst'
    // e.g., inst = new Swiper(...); or photoswipe/yarl instance

    return () => {
      try { inst?.destroy?.(true, true); } catch {}
      document.body.classList.remove('no-scroll', 'modal-open');
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      (document.documentElement as HTMLElement).style.touchAction = '';
      document
        .querySelectorAll('.pswp, .yarl__portal, .lightbox-portal, .modal-backdrop')
        .forEach((n) => ((n as HTMLElement).style.pointerEvents = 'none'));
    };
  }, [viewingPhoto, zoomedCategoryKey]);

  // Cleanup overlays when viewingPhoto or zoomedCategoryKey change
  useEffect(() => {
    return () => {
      // If component unmounts while viewing photos or zoomed, clean up
      if (viewingPhoto || zoomedCategoryKey) {
        document.body.style.overflow = 'unset';
        document.body.classList.remove('no-scroll', 'modal-open');
      }
    };
  }, [viewingPhoto, zoomedCategoryKey]);

  const category = categories.find(c => c.key === selectedCategory) || null;
  const sub = category?.subCategories?.find(s => s.key === selectedSubCategory) || null;

  // Close zoom with ESC and handle photo viewer navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setZoomedCategoryKey(null);
        setViewingPhoto(null);
      }
      
      if (viewingPhoto) {
        if (e.key === 'ArrowLeft') {
          setViewingPhoto(prev => prev ? {
            ...prev,
            currentIndex: prev.currentIndex > 0 ? prev.currentIndex - 1 : prev.images.length - 1
          } : null);
        }
        if (e.key === 'ArrowRight') {
          setViewingPhoto(prev => prev ? {
            ...prev,
            currentIndex: prev.currentIndex < prev.images.length - 1 ? prev.currentIndex + 1 : 0
          } : null);
        }
      }
      
      if (zoomedCategoryKey) {
        const images = getAllImagesFromCategory(categories.find(c => c.key === zoomedCategoryKey)!);
        if (e.key === 'ArrowLeft') {
          setAlbumPhotoIndex(prev => prev > 0 ? prev - 1 : images.length - 1);
        }
        if (e.key === 'ArrowRight') {
          setAlbumPhotoIndex(prev => prev < images.length - 1 ? prev + 1 : 0);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [viewingPhoto, zoomedCategoryKey]);

  const openAlbumZoom = (key: string) => {
    console.log('Album clicked:', key);
    const category = categories.find(c => c.key === key);
    console.log('Category found:', category);
    if (category?.hasSubCategories) {
      // For categories with subcategories, navigate to subcategory selection
      console.log('Opening subcategory selection for:', key);
      setSelectedCategory(key);
      
      // Preload all subcategory images
      if (category.subCategories) {
        category.subCategories.forEach(sub => {
          imagePreloader.preloadCategory(sub);
        });
      }
    } else {
      // For categories without subcategories, open zoom overlay
      console.log('Opening zoom overlay for:', key);
      setZoomedCategoryKey(key);
      setAlbumPhotoIndex(0);
      
      // Preload images for the category
      imagePreloader.preloadCategory(category);
    }
  };
  const closeAlbumZoom = () => {
    console.log('Closing album zoom');
    setZoomedCategoryKey(null);
    setAlbumPhotoIndex(0);
  };
  
  const openAlbum = (key: string) => {
    console.log('Opening album:', key);
    setSelectedCategory(key);
    setZoomedCategoryKey(null);
    setAlbumPhotoIndex(0);
    
    // Preload images for the selected category
    const category = categories.find(c => c.key === key);
    if (category) {
      imagePreloader.preloadCategory(category);
    }
  };

  const resetToHomepage = () => {
    console.log('Resetting to homepage');
    // Force a complete state reset
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setZoomedCategoryKey(null);
    setViewingPhoto(null);
    setAlbumPhotoIndex(0);
    
    // Force re-render by updating a key
    setRenderKey(prev => prev + 1);
    
    // Ensure scroll is restored
    document.body.style.overflow = 'unset';
    
    setTimeout(() => {
      console.log('State reset complete');
    }, 100);
  };

  return (
    <div key={renderKey} className="w-full min-h-screen px-4 py-4 md:py-6 flex flex-col items-center">
      {/* ALBUM GRID (landing) - Fluid responsive grid */}
      {!selectedCategory && (
        <>
          <h2 className="text-2xl font-semibold text-white mb-4 md:mb-6">Ricardo "Cardi" Mendez</h2>
          <AlbumGrid 
            categories={categories} 
            onAlbumClick={openAlbumZoom}
            renderKey={renderKey}
          />
          
          {/* Cardimediakit Full Screen Image - Only on Home Page */}
          <section className="w-full mt-16">
            <img 
              src="/images/cardimediakit.avif" 
              alt="Cardi Media Kit" 
              className="w-full h-auto object-cover"
            />
          </section>
        </>
      )}

      {/* SUBCATEGORY SELECTION - 2 columns with stacked previews */}
      {selectedCategory && category && category.hasSubCategories && !selectedSubCategory && (
        <>
          <div className="w-full max-w-6xl mb-4 flex items-center">
            <button
              onClick={resetToHomepage}
              className="text-white/70 hover:text-white"
            >
              ← Back
            </button>
          </div>
          <h2 className="text-2xl font-semibold text-white mb-4 md:mb-6">{category.title}</h2>
          <div className="grid [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))] gap-8 md:gap-10 w-full max-w-screen-2xl px-4">
            {category.subCategories!.map(sc => (
              <button 
                key={sc.key} 
                onClick={() => {
                  console.log('Clicking subcategory:', sc.key);
                  console.log('Subcategory data:', sc);
                  setSelectedSubCategory(sc.key);
                  
                  // Preload images for the selected subcategory
                  imagePreloader.preloadCategory(sc);
                }}
                onTouchStart={() => {
                  console.log('Touch subcategory:', sc.key);
                  setSelectedSubCategory(sc.key);
                  
                  // Preload images for the selected subcategory
                  imagePreloader.preloadCategory(sc);
                }}
                className="text-left group min-w-[260px] touch-manipulation"
              >
                <h3 className="text-white/90 font-semibold mb-2">{sc.title}</h3>
                <div className="w-full aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden bg-white/5">
                  <StackedPreview images={sc.images} mode="stacked" />
                </div>
                <p className="text-white/60 text-sm mt-2">{sc.images.length} photos</p>
              </button>
            ))}
              </div>
        </>
      )}

      {/* SUBCATEGORY GRID OF PHOTOS (full browse) */}
      {selectedCategory && selectedSubCategory && sub && (
        <div className="fixed inset-0 bg-black z-30 overflow-y-auto">
          <div className="min-h-full px-4 py-4 md:py-6 flex flex-col items-center">
            <div className="w-full max-w-6xl mb-4 flex items-center justify-between">
              <button
                onClick={() => setSelectedSubCategory(null)}
                className="text-white/70 hover:text-white"
              >
                ← Back
              </button>
              <button
                onClick={resetToHomepage}
                className="text-white/70 hover:text-white"
              >
                Categories
              </button>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-4 md:mb-6">{sub.title}</h2>
            <div className="grid [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))] gap-4 md:gap-6 w-full max-w-screen-2xl px-4">
              {(() => {
                console.log('Rendering subcategory grid for:', sub.title);
                console.log('Number of images:', sub.images.length);
                console.log('First few images:', sub.images.slice(0, 3));
                return sub.images.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={() => {
                      setViewingPhoto({ images: sub.images, currentIndex: index });
                      
                      // Preload next few images for smooth navigation
                      const nextImages = sub.images.slice(index + 1, index + 4);
                      nextImages.forEach(img => {
                        imagePreloader.preloadImage(img.src);
                      });
                    }}
                    onTouchStart={() => {
                      setViewingPhoto({ images: sub.images, currentIndex: index });
                      
                      // Preload next few images for smooth navigation
                      const nextImages = sub.images.slice(index + 1, index + 4);
                      nextImages.forEach(img => {
                        imagePreloader.preloadImage(img.src);
                      });
                    }}
                    className="aspect-[4/5] rounded-xl overflow-hidden bg-white/5 hover:scale-105 transition-transform relative touch-manipulation"
                    style={{ minHeight: '200px' }}
                  >
                    <Img src={img.src} alt={img.title} />
                  </button>
                ));
              })()}
            </div>
          </div>
        </div>
      )}

      {/* INDIVIDUAL CATEGORY GRID OF PHOTOS (for categories without subcategories) */}
      {selectedCategory && category && !category.hasSubCategories && (
        <div className="fixed inset-0 bg-black z-30 overflow-y-auto">
          <div className="min-h-full px-4 py-4 md:py-6 flex flex-col items-center">
            <div className="w-full max-w-6xl mb-4 flex items-center">
              <button
                onClick={resetToHomepage}
                className="text-white/70 hover:text-white"
              >
                ← Back to Categories
              </button>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-4 md:mb-6">{category.title}</h2>
            <div className="grid [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))] gap-4 md:gap-6 w-full max-w-screen-2xl px-4">
              {category.images!.map((img, index) => (
                <button
                  key={img.id}
                  onClick={() => {
                    setViewingPhoto({ images: category.images!, currentIndex: index });
                    
                    // Preload next few images for smooth navigation
                    const nextImages = category.images!.slice(index + 1, index + 4);
                    nextImages.forEach(img => {
                      imagePreloader.preloadImage(img.src);
                    });
                  }}
                  onTouchStart={() => {
                    setViewingPhoto({ images: category.images!, currentIndex: index });
                    
                    // Preload next few images for smooth navigation
                    const nextImages = category.images!.slice(index + 1, index + 4);
                    nextImages.forEach(img => {
                      imagePreloader.preloadImage(img.src);
                    });
                  }}
                  className="aspect-[4/5] rounded-xl overflow-hidden bg-white/5 hover:scale-105 transition-transform touch-manipulation"
                >
                  <Img src={img.src} alt={img.title} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ZOOM OVERLAY (clicking an album morphs/zooms forward) */}
      <AnimatePresence>
        {zoomedCategoryKey && (
          <>
                         {/* Backdrop */}
             <motion.div
               className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.2 }}
               onClick={closeAlbumZoom}
             />
             
             {/* Enlarged card that shares layoutId with the grid card for a smooth morph */}
        <motion.div
               className="fixed inset-0 z-50 flex items-center justify-center p-4"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.2 }}
               onClick={closeAlbumZoom}
             >
        <motion.div
                 layoutId={`album-card-${zoomedCategoryKey}`}
                 className="relative w-full max-w-6xl aspect-[3/4] rounded-3xl overflow-hidden bg-white/5"
                 onClick={(e) => e.stopPropagation()}
                 transition={{ duration: 0.3, ease: "easeInOut" }}
               >
                                 {/* Big stacked preview (straightened) */}
                 <div className="absolute inset-0">
                   {(() => {
                     const images = getAllImagesFromCategory(
                       categories.find(c => c.key === zoomedCategoryKey)!
                     );
                     const currentImage = images[albumPhotoIndex];

              return (
                <motion.div
                         key={albumPhotoIndex}
                         className="absolute inset-0"
                         initial={{ opacity: 0, scale: 0.95 }}
                         animate={{ opacity: 1, scale: 1 }}
                         exit={{ opacity: 0, scale: 0.95 }}
                         transition={{ duration: 0.2, ease: "easeOut" }}
                         drag="x"
                         dragConstraints={{ left: 0, right: 0 }}
                         dragElastic={0.2}
                         onDragEnd={(event, info: PanInfo) => {
                           const swipeThreshold = 50;
                           if (info.offset.x > swipeThreshold) {
                             // Swipe right - go to previous photo
                             setAlbumPhotoIndex(prev => prev > 0 ? prev - 1 : images.length - 1);
                           } else if (info.offset.x < -swipeThreshold) {
                             // Swipe left - go to next photo
                             setAlbumPhotoIndex(prev => prev < images.length - 1 ? prev + 1 : 0);
                           }
                         }}
                         style={{ cursor: 'grab' }}
                         whileDrag={{ cursor: 'grabbing' }}
                       >
                         <Img src={currentImage.src} alt={currentImage.title} />
                         
                                                                           {/* Photo title overlay - only for Brand Work */}
                         {zoomedCategoryKey === 'brandwork' && (
                           <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                             <h3 className="text-white text-lg font-light tracking-wide">
                               {currentImage.title}
                             </h3>
                           </div>
                         )}
                       </motion.div>
                     );
                   })()}
                 </div>

                                 {/* Top bar actions */}
                 <div className="absolute top-3 right-3 flex gap-2">
                   <button
                     onClick={(e) => {
                       e.stopPropagation();
                       console.log('Grid button clicked for:', zoomedCategoryKey);
                       const category = categories.find(c => c.key === zoomedCategoryKey);
                       console.log('Category found:', category);
                       if (category?.hasSubCategories) {
                         console.log('Opening subcategory selection');
                         setSelectedCategory(zoomedCategoryKey);
                         setZoomedCategoryKey(null);
                       } else {
                         console.log('Opening grid view for', category!.images!.length, 'images');
                         setSelectedCategory(zoomedCategoryKey);
                         setZoomedCategoryKey(null);
                       }
                     }}
                     className="w-10 h-10 rounded-lg bg-white/20 text-white flex items-center justify-center hover:bg-white/30 backdrop-blur-sm transition-colors"
                     aria-label="View all photos"
                   >
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                     </svg>
                   </button>
                   <button
                     onClick={closeAlbumZoom}
                     className="w-10 h-10 rounded-lg bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                     aria-label="Close"
                   >
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                     </svg>
                   </button>
                 </div>

                 {/* Navigation buttons */}
                 {(() => {
                   const images = getAllImagesFromCategory(
                     categories.find(c => c.key === zoomedCategoryKey)!
                   );

                      return (
                     <>
                       <button
                         onClick={(e) => {
                           e.stopPropagation();
                           setAlbumPhotoIndex(prev => prev > 0 ? prev - 1 : images.length - 1);
                         }}
                         className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                       >
                         ←
                       </button>
                       
                       <button
                         onClick={(e) => {
                           e.stopPropagation();
                           setAlbumPhotoIndex(prev => prev < images.length - 1 ? prev + 1 : 0);
                         }}
                         className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                       >
                         →
                       </button>

                       {/* Swipe indicators */}
                       <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
                         {images.map((_, index) => (
                           <div
                             key={index}
                             className={`w-2 h-2 rounded-full transition-colors ${
                               index === albumPhotoIndex ? 'bg-white' : 'bg-white/30'
                             }`}
                           />
                         ))}
                  </div>
                     </>
                   );
                 })()}

                
              </motion.div>
        </motion.div>
          </>
      )}
      </AnimatePresence>

       {/* PHOTO VIEWER WITH SWIPE */}
       <AnimatePresence>
         {viewingPhoto && (
           <>
             {/* Backdrop */}
             <motion.div
               className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.2 }}
               onClick={() => setViewingPhoto(null)}
             />
             
             {/* Photo viewer */}
             <motion.div
               className="fixed inset-0 z-60 flex items-center justify-center p-4"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.2 }}
             >
               <div className="relative w-full max-w-5xl aspect-[4/5] rounded-2xl overflow-hidden">
                 {/* Current photo */}
                 <motion.div
                   key={viewingPhoto.currentIndex}
                   className="absolute inset-0"
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   transition={{ duration: 0.2, ease: "easeOut" }}
                   drag="x"
                   dragConstraints={{ left: 0, right: 0 }}
                   dragElastic={0.2}
                   onDragEnd={(event, info: PanInfo) => {
                     const swipeThreshold = 50;
                     if (info.offset.x > swipeThreshold) {
                       // Swipe right - go to previous photo
                       setViewingPhoto(prev => prev ? {
                         ...prev,
                         currentIndex: prev.currentIndex > 0 ? prev.currentIndex - 1 : prev.images.length - 1
                       } : null);
                     } else if (info.offset.x < -swipeThreshold) {
                       // Swipe left - go to next photo
                       setViewingPhoto(prev => prev ? {
                         ...prev,
                         currentIndex: prev.currentIndex < prev.images.length - 1 ? prev.currentIndex + 1 : 0
                       } : null);
                     }
                   }}
                   style={{ cursor: 'grab' }}
                   whileDrag={{ cursor: 'grabbing' }}
                 >
                   <Img 
                     src={viewingPhoto.images[viewingPhoto.currentIndex].src} 
                     alt={viewingPhoto.images[viewingPhoto.currentIndex].title} 
                   />
                 </motion.div>

                                    {/* Minimalist title overlay - only for Brand Work */}
                   {(() => {
                     // Check if we're viewing Brand Work images
                     const isBrandWork = viewingPhoto.images.some(img => img.category === 'Brand Work');
                     if (isBrandWork) {
                       return (
                         <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                           <h3 className="text-white text-lg font-light tracking-wide">
                             {viewingPhoto.images[viewingPhoto.currentIndex].title}
                           </h3>
                         </div>
                       );
                     }
                     return null;
                   })()}

                 {/* Navigation buttons */}
                 <button
                   onClick={(e) => {
                     e.stopPropagation();
                     setViewingPhoto(prev => prev ? {
                       ...prev,
                       currentIndex: prev.currentIndex > 0 ? prev.currentIndex - 1 : prev.images.length - 1
                     } : null);
                   }}
                   className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                 >
                   ←
                 </button>
                 
                 <button
                   onClick={(e) => {
                     e.stopPropagation();
                     setViewingPhoto(prev => prev ? {
                       ...prev,
                       currentIndex: prev.currentIndex < prev.images.length - 1 ? prev.currentIndex + 1 : 0
                     } : null);
                   }}
                   className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                 >
                   →
                 </button>

                 {/* Close button */}
                 <button
                   onClick={() => setViewingPhoto(null)}
                   className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                   aria-label="Close"
                 >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                   </svg>
                 </button>

                 {/* Swipe indicators */}
                 <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
                   {viewingPhoto.images.map((_, index) => (
                     <div
                       key={index}
                       className={`w-2 h-2 rounded-full transition-colors ${
                         index === viewingPhoto.currentIndex ? 'bg-white' : 'bg-white/30'
                       }`}
                     />
                   ))}
                 </div>
      </div>
             </motion.div>
           </>
         )}
       </AnimatePresence>
    </div>
   );
}