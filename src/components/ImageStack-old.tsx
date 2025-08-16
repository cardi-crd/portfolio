'use client'

import { useState } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { normalizeImageSrc } from '@/lib/normalizeImageSrc'

interface ImageData {
  id: number
  src: string
  title: string
  category: string
}

interface SubCategory {
  key: string
  title: string
  images: ImageData[]
}

interface Category {
  key: string
  title: string
  hasSubCategories: boolean
  subCategories?: SubCategory[]
  images?: ImageData[]
}

// Photo categories with support for nested subcategories
// To add your own photos:
// 1. Place your images in the public/images/ folders
// 2. Run: node scripts/generate-image-data.js
// 3. Copy the output and update this categories array
const categories: Category[] = [
  {
    key: 'rodeo',
    title: 'Rodeo',
    hasSubCategories: true,
    subCategories: [
      {
        key: 'tucson',
        title: 'Tucson: La Fiesta De Los Vaqueros',
        images: [
          {
            id: 1,
            src: '/images/rodeo/tucson/tucson.png',
            title: 'Tucson Rodeo',
            category: 'Tucson Rodeo'
          },
          {
            id: 2,
            src: '/images/rodeo/tucson/tucson4.png',
            title: 'Tucson Rodeo 4',
            category: 'Tucson Rodeo'
          },
          {
            id: 3,
            src: '/images/rodeo/tucson/tucson7.png',
            title: 'Tucson Rodeo 7',
            category: 'Tucson Rodeo'
          },
          {
            id: 4,
            src: '/images/rodeo/tucson/tucson10.png',
            title: 'Tucson Rodeo 10',
            category: 'Tucson Rodeo'
          },
          {
            id: 5,
            src: '/images/rodeo/tucson/tucson11.png',
            title: 'Tucson Rodeo 11',
            category: 'Tucson Rodeo'
          },
          {
            id: 6,
            src: '/images/rodeo/tucson/tucson12.png',
            title: 'Tucson Rodeo 12',
            category: 'Tucson Rodeo'
          },
          {
            id: 7,
            src: '/images/rodeo/tucson/tucson13.png',
            title: 'Tucson Rodeo 13',
            category: 'Tucson Rodeo'
          },
          {
            id: 8,
            src: '/images/rodeo/tucson/tucson14.png',
            title: 'Tucson Rodeo 14',
            category: 'Tucson Rodeo'
          },
          {
            id: 9,
            src: '/images/rodeo/tucson/tucson15.png',
            title: 'Tucson Rodeo 15',
            category: 'Tucson Rodeo'
          }
        ]
      },
      {
        key: 'prescott',
        title: 'Prescott 4th of July Rodeo',
        images: [
          {
            id: 10,
            src: '/images/rodeo/prescott/prescott.jpg',
            title: 'Prescott Rodeo',
            category: 'Prescott Rodeo'
          },
          {
            id: 11,
            src: '/images/rodeo/prescott/prescott1.jpg',
            title: 'Prescott Rodeo 1',
            category: 'Prescott Rodeo'
          },
          {
            id: 12,
            src: '/images/rodeo/prescott/prescott2.jpg',
            title: 'Prescott Rodeo 2',
            category: 'Prescott Rodeo'
          },
          {
            id: 13,
            src: '/images/rodeo/prescott/prescott3.jpg',
            title: 'Prescott Rodeo 3',
            category: 'Prescott Rodeo'
          },
          {
            id: 14,
            src: '/images/rodeo/prescott/prescott4.jpg',
            title: 'Prescott Rodeo 4',
            category: 'Prescott Rodeo'
          },
          {
            id: 15,
            src: '/images/rodeo/prescott/prescott5.jpg',
            title: 'Prescott Rodeo 5',
            category: 'Prescott Rodeo'
          },
          {
            id: 16,
            src: '/images/rodeo/prescott/prescott6.jpg',
            title: 'Prescott Rodeo 6',
            category: 'Prescott Rodeo'
          },
          {
            id: 17,
            src: '/images/rodeo/prescott/prescott7.jpg',
            title: 'Prescott Rodeo 7',
            category: 'Prescott Rodeo'
          },
          {
            id: 18,
            src: '/images/rodeo/prescott/prescott8.jpg',
            title: 'Prescott Rodeo 8',
            category: 'Prescott Rodeo'
          },
          {
            id: 19,
            src: '/images/rodeo/prescott/prescott9.jpg',
            title: 'Prescott Rodeo 9',
            category: 'Prescott Rodeo'
          },
          {
            id: 20,
            src: '/images/rodeo/prescott/prescott10.jpg',
            title: 'Prescott Rodeo 10',
            category: 'Prescott Rodeo'
          }
        ]
      }
    ]
  },
  {
    key: 'portraiture',
    title: 'Portraiture',
    hasSubCategories: false,
    images: [
      {
        id: 21,
        src: '/images/portraiture/ally.png',
        title: 'Ally Portrait',
        category: 'Portraiture'
      },
      {
        id: 22,
        src: '/images/portraiture/car.jpg',
        title: 'Car Portrait',
        category: 'Portraiture'
      },
      {
        id: 23,
        src: '/images/portraiture/cat.png',
        title: 'Cat Portrait',
        category: 'Portraiture'
      },
      {
        id: 24,
        src: '/images/portraiture/cat1.avif',
        title: 'Cat Portrait 1',
        category: 'Portraiture'
      },
      {
        id: 25,
        src: '/images/portraiture/cat2.avif',
        title: 'Cat Portrait 2',
        category: 'Portraiture'
      },
      {
        id: 26,
        src: '/images/portraiture/cat3.avif',
        title: 'Cat Portrait 3',
        category: 'Portraiture'
      },
      {
        id: 27,
        src: '/images/portraiture/cn.avif',
        title: 'CN Portrait',
        category: 'Portraiture'
      },
      {
        id: 28,
        src: '/images/portraiture/cndesert.jpg',
        title: 'CN Desert Portrait',
        category: 'Portraiture'
      },
      {
        id: 29,
        src: '/images/portraiture/port1.jpg',
        title: 'Portrait 1',
        category: 'Portraiture'
      },
      {
        id: 30,
        src: '/images/portraiture/port2.jpg',
        title: 'Portrait 2',
        category: 'Portraiture'
      },
      {
        id: 31,
        src: '/images/portraiture/rach1.avif',
        title: 'Rach Portrait',
        category: 'Portraiture'
      }
    ]
  },
  {
    key: 'brandwork',
    title: 'Brand Work',
    hasSubCategories: false,
    images: [
      {
        id: 32,
        src: '/images/brandwork/arlierecess.jpg',
        title: 'Arlie Recess',
        category: 'Brand Work'
      },
      {
        id: 33,
        src: '/images/brandwork/arlierecess2.jpg',
        title: 'Arlie Recess 2',
        category: 'Brand Work'
      },
      {
        id: 34,
        src: '/images/brandwork/bbc.JPG',
        title: 'BBC Brand Work',
        category: 'Brand Work'
      },
      {
        id: 35,
        src: '/images/brandwork/bbc2.JPG',
        title: 'BBC Brand Work 2',
        category: 'Brand Work'
      },
      {
        id: 36,
        src: '/images/brandwork/savage.png',
        title: 'Savage Brand Work',
        category: 'Brand Work'
      }
    ]
  }
]

// Helper function to get all images from a category (including subcategories)
function getAllImagesFromCategory(category: Category): ImageData[] {
  if (category.hasSubCategories && category.subCategories) {
    return category.subCategories.flatMap(sub => sub.images)
  }
  return category.images || []
}

// Helper function to get preview images for a category
function getPreviewImagesFromCategory(category: Category): ImageData[] {
  const allImages = getAllImagesFromCategory(category)
  return allImages.slice(0, 6) // Show first 6 images in preview
}

// Create photoStacks object from categories
const photoStacks: Record<string, ImageData[]> = {}
categories.forEach(category => {
  photoStacks[category.key] = getAllImagesFromCategory(category)
})

interface StackProps {
  stackKey: string
  images: ImageData[]
  title: string
}

function PhotoStack({ stackKey, images, title }: StackProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [exitDirection, setExitDirection] = useState(0)
  const [isViewingFullImage, setIsViewingFullImage] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false)
    const swipeThreshold = 50
    const { offset, velocity } = info

    if (Math.abs(offset.x) > swipeThreshold || Math.abs(velocity.x) > 500) {
      if (offset.x > 0) {
        // Swipe right - go to previous
        if (currentIndex > 0) {
          setExitDirection(-1)
          setCurrentIndex(currentIndex - 1)
        }
      } else {
        // Swipe left - go to next
        if (currentIndex < images.length - 1) {
          setExitDirection(1)
          setCurrentIndex(currentIndex + 1)
        }
      }
    }
  }

  const handleImageClick = () => {
    if (!isDragging) {
      setIsViewingFullImage(true)
    }
  }

  const handleCloseFullView = () => {
    setIsViewingFullImage(false)
  }

  const swipeVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotate: direction > 0 ? 15 : -15,
      zIndex: 20
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      zIndex: 20
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotate: direction < 0 ? 15 : -15,
      zIndex: 0
    })
  }

  // Generate stagger positions for realistic pile effect
  const getStackPosition = (index: number) => {
    const offsetFromCurrent = index - currentIndex
    // Use consistent randomness based on image ID for stable positioning
    const seed = images[index].id
    const randomRotation = ((seed * 9301 + 49297) % 233280) / 233280 // Pseudo-random 0-1
    const randomX = ((seed * 9301 + 49297 + 1000) % 233280) / 233280 // Different seed for X

    const rotation = (randomRotation - 0.5) * 20 // -10 to +10 degrees
    const xOffset = (randomX - 0.5) * 24 // -12 to +12 pixels
    const yOffset = Math.abs(offsetFromCurrent) * 4 // More depth layering

    return {
      rotate: rotation,
      x: xOffset,
      y: yOffset,
      scale: 1 - (Math.abs(offsetFromCurrent) * 0.03), // More pronounced scale for depth
      zIndex: images.length - Math.abs(offsetFromCurrent),
      opacity: index <= currentIndex ? (index === currentIndex ? 1 : 0.8) : 0.4
    }
  }

  return (
    <>
      <div className="flex-1 flex flex-col items-center">
        {/* Stack Title */}
        <h3 className="text-lg font-semibold text-white/90 mb-4 text-center">
          {title}
        </h3>

        {/* Photo Stack */}
        <div className="relative w-full max-w-[280px] h-[350px] perspective-1000">
          {/* Background pile - show all images up to current */}
          {images.map((image, index) => {
            return (
              <motion.div
                key={image.id}
                className={`absolute inset-0 rounded-2xl overflow-hidden shadow-2xl ${
                  index === currentIndex ? 'cursor-pointer' : 'pointer-events-none'
                }`}
                initial={getStackPosition(index)}
                animate={getStackPosition(index)}
                transition={{
                  duration: 0.5,
                  ease: 'easeOut',
                  delay: index <= currentIndex ? (currentIndex - index) * 0.05 : 0
                }}
                drag={index === currentIndex ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragStart={index === currentIndex ? handleDragStart : undefined}
                onDragEnd={index === currentIndex ? handleDragEnd : undefined}
                onClick={index === currentIndex ? handleImageClick : undefined}
                whileTap={index === currentIndex ? { scale: 0.98 } : undefined}
              >
                <div className="relative w-full h-full">
                  {(() => {
                    const s = normalizeImageSrc(image?.src);
                    if (!s) {
                      console.warn('Missing/invalid src', image);
                      return <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">Missing Image</div>;
                    }
                    return (
                      <img
                        src={s}
                        alt={image.title ?? ''}
                        className="object-cover w-full h-full"
                        loading="lazy"
                        onError={(e) => {
                          console.error('Image failed to load:', s);
                          console.error('Error:', e);
                        }}
                      />
                    );
                  })()}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Image Info - only show on current image */}
                  {index === currentIndex && (
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h4 className="font-semibold text-lg mb-1">
                        {image.title}
                      </h4>
                      <p className="text-white/70 text-sm">
                        {currentIndex + 1} of {images.length} • Tap to view full
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}

          {/* Animated top card for smooth swipe transitions */}
          <AnimatePresence initial={false} custom={exitDirection}>
            <motion.div
              key={currentIndex}
              custom={exitDirection}
              variants={swipeVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
                rotate: { duration: 0.3 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onClick={handleImageClick}
              className="absolute inset-0 cursor-pointer"
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                {(() => {
                  const s = normalizeImageSrc(images[currentIndex]?.src);
                  if (!s) {
                    console.warn('Missing/invalid src', images[currentIndex]);
                    return <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">Missing Image</div>;
                  }
                  return (
                    <img
                      src={s}
                      alt={images[currentIndex].title ?? ''}
                      className="object-cover w-full h-full"
                      loading="lazy"
                      onError={(e) => {
                        console.error('Image failed to load:', s);
                        console.error('Error:', e);
                      }}
                    />
                  );
                })()}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Image Info */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="font-semibold text-lg mb-1">
                    {images[currentIndex].title}
                  </h4>
                  <p className="text-white/70 text-sm">
                    {currentIndex + 1} of {images.length} • Tap to view full
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Swipe Indicators */}
        <div className="flex justify-center space-x-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white scale-125'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Swipe Hint */}
        <p className="text-white/50 text-xs mt-2 text-center">
          Swipe left/right to browse
        </p>
      </div>

      {/* Full Image Modal */}
      <AnimatePresence>
        {isViewingFullImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCloseFullView}
          >
            {/* Close button */}
            <button
              onClick={handleCloseFullView}
              className="absolute top-6 right-6 z-60 text-white/70 hover:text-white transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Full Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full max-w-4xl max-h-[90vh] rounded-xl overflow-hidden"
            >
              {(() => {
                const s = normalizeImageSrc(images[currentIndex]?.src);
                if (!s) {
                  console.warn('Missing/invalid src', images[currentIndex]);
                  return <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">Missing Image</div>;
                }
                return (
                  <img
                    src={s}
                    alt={images[currentIndex].title ?? ''}
                    className="object-contain w-full h-full"
                    loading="eager"
                    onClick={(e) => e.stopPropagation()}
                    onError={(e) => {
                      console.error('Image failed to load:', s);
                      console.error('Error:', e);
                    }}
                  />
                );
              })()}
            </motion.div>

            {/* Image Info */}
            <div className="absolute bottom-6 left-6 right-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="glass-morphism rounded-xl p-4 max-w-md mx-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-semibold text-white mb-1">
                  {images[currentIndex].title}
                </h3>
                <p className="text-white/70 text-sm">
                  {title} • {currentIndex + 1} of {images.length}
                </p>
                <p className="text-white/50 text-xs mt-2">
                  Tap anywhere outside to close
                </p>
              </motion.div>
            </div>


          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function ImageStack() {
  const [selectedStack, setSelectedStack] = useState<string | null>(null)
  const [hoveredStack, setHoveredStack] = useState<string | null>(null)
  const [clickedStack, setClickedStack] = useState<string | null>(null)

  const handleStackSelect = (stackKey: string) => {
    setClickedStack(stackKey)
    // Delay the actual selection to allow the 3D animation to play
    setTimeout(() => {
      setSelectedStack(stackKey)
      setClickedStack(null)
    }, 800)
  }

  const handleBackToSelection = () => {
    console.log('Back button clicked, setting selectedStack to null')
    setSelectedStack(null)
  }

  return (
    <div className="w-full min-h-screen flex flex-col justify-center px-4 py-8">
      {/* Instructions */}
      <div className="text-center mb-8">
        <p className="text-white/70 text-sm">
          {selectedStack
            ? "Swipe left for next • Swipe right for previous • Tap to view full image"
            : "Choose a category to explore"
          }
        </p>
      </div>

      <AnimatePresence mode="wait">
        {selectedStack ? (
        // Enlarged Stack View
        <motion.div
          key="enlarged"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center max-w-2xl mx-auto"
        >
          {/* Back Button */}
          <button
            onClick={handleBackToSelection}
            className="mb-6 flex items-center space-x-2 text-white/70 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/10 z-50 relative"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to categories</span>
          </button>

          {/* Selected Stack - Enlarged */}
          <PhotoStack
            stackKey={selectedStack}
            images={photoStacks[selectedStack]}
            title={selectedStack.charAt(0).toUpperCase() + selectedStack.slice(1)}
          />
        </motion.div>
      ) : (
        // Stack Selection View
        <motion.div
          key="selection"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center justify-center max-w-6xl mx-auto"
        >
          <h2 className="text-2xl font-semibold text-white/90 mb-8 text-center">
            Choose Your Story
          </h2>

          {/* Three Compact Stacks Side by Side */}
          <div className="flex flex-row gap-6 lg:gap-8 items-center justify-center w-full stack-container">
            {Object.entries(photoStacks).map(([stackKey, images], index) => {
              const isClicked = clickedStack === stackKey
              const isOtherClicked = clickedStack && clickedStack !== stackKey

              return (
                <motion.div
                  key={stackKey}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: isOtherClicked ? 0.3 : 1,
                    y: 0,
                    scale: isClicked ? 1.2 : 1,
                    rotateX: isClicked ? -10 : 0,
                    z: isClicked ? 100 : 0,
                    transformOrigin: "center center"
                  }}
                  transition={{
                    delay: index * 0.1,
                    duration: isClicked ? 0.8 : 0.6,
                    ease: isClicked ? "easeOut" : "easeInOut"
                  }}
                  className="flex-1 max-w-[200px] cursor-pointer"
                  onClick={() => handleStackSelect(stackKey)}
                  onHoverStart={() => setHoveredStack(stackKey)}
                  onHoverEnd={() => setHoveredStack(null)}
                  whileHover={!clickedStack ? {
                    scale: 1.05,
                    rotateX: -5,
                    z: 20,
                    transition: { duration: 0.3 }
                  } : {}}
                  whileTap={!clickedStack ? {
                    scale: 0.98,
                    transition: { duration: 0.1 }
                  } : {}}
                  style={{
                    transformStyle: "preserve-3d"
                  }}
                >
                {/* Compact Stack Preview */}
                <div className="relative">
                  {/* Category Title */}
                  <h3 className="text-lg font-semibold text-white/90 mb-4 text-center">
                    {stackKey.charAt(0).toUpperCase() + stackKey.slice(1)}
                  </h3>

                  {/* Stacked Images Preview */}
                  <div
                    className="relative w-full h-[320px] perspective-1000"
                    style={{
                      filter: isClicked ? 'drop-shadow(0 25px 50px rgba(0,0,0,0.8))' :
                              hoveredStack === stackKey ? 'drop-shadow(0 10px 25px rgba(0,0,0,0.4))' :
                              'drop-shadow(0 5px 15px rgba(0,0,0,0.2))'
                    }}
                  >
                    {images.slice(0, 6).map((image, imgIndex) => {
                      // Create a more realistic stacked effect with more images
                      const stackDepth = 6 // pixels between each image
                      const rotation = (imgIndex - 2.5) * 2 // -5, -3, -1, 1, 3, 5 degrees
                      const xOffset = (imgIndex - 2.5) * 1.5 // -3.75, -2.25, -0.75, 0.75, 2.25, 3.75 pixels
                      const yOffset = imgIndex * stackDepth // 0, 6, 12, 18, 24, 30 pixels
                      const scale = 1 - (imgIndex * 0.06) // Gradual scaling
                      const opacity = 1 - (imgIndex * 0.12) // Gradual fade

                      return (
                        <motion.div
                          key={image.id}
                          className="absolute inset-0 rounded-2xl overflow-hidden"
                          style={{
                            zIndex: 6 - imgIndex,
                            transform: `rotate(${rotation}deg) translateX(${xOffset}px) translateY(${yOffset}px) scale(${scale})`,
                            opacity: opacity,
                            boxShadow: imgIndex === 0 ? '0 12px 35px rgba(0,0,0,0.4)' : 
                                       imgIndex === 1 ? '0 10px 30px rgba(0,0,0,0.3)' :
                                       imgIndex === 2 ? '0 8px 25px rgba(0,0,0,0.25)' :
                                       imgIndex === 3 ? '0 6px 20px rgba(0,0,0,0.2)' :
                                       imgIndex === 4 ? '0 4px 15px rgba(0,0,0,0.15)' :
                                       '0 2px 10px rgba(0,0,0,0.1)'
                          }}
                          initial={{ opacity: 0, scale: 0.8, y: 20 }}
                          animate={{ 
                            opacity: opacity, 
                            scale: scale, 
                            y: yOffset,
                            rotate: rotation,
                            x: xOffset
                          }}
                          transition={{ 
                            delay: (index * 0.1) + (imgIndex * 0.12), 
                            duration: 0.8,
                            ease: [0.25, 0.46, 0.45, 0.94]
                          }}
                          whileHover={imgIndex === 0 ? {
                            scale: scale * 1.03,
                            rotate: rotation * 0.7,
                            y: yOffset - 2,
                            transition: { duration: 0.3 }
                          } : {}}
                        >
                          {(() => {
                            const s = normalizeImageSrc(image?.src);
                            if (!s) {
                              console.warn('Missing/invalid src', image);
                              return <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">Missing Image</div>;
                            }
                            return (
                              <img
                                src={s}
                                alt={image.title ?? ''}
                                className="object-cover w-full h-full"
                                loading="lazy"
                                onError={(e) => {
                                  console.error('Image failed to load:', s);
                                  console.error('Error:', e);
                                }}
                              />
                            );
                          })()}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                          
                          {/* Image border for better definition */}
                          <div className="absolute inset-0 border border-white/10 rounded-2xl" />
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Photo Count */}
                  <div className="mt-4 text-center">
                    <p className="text-white/60 text-sm">
                      {images.length} photos • {Math.min(6, images.length)} visible
                    </p>
                    <p className="text-white/40 text-xs mt-1">
                      Tap to explore all photos
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
            )}
          </div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Mobile tip */}
      <div className="text-center mt-8 lg:hidden">
        <p className="text-white/60 text-sm">
          {selectedStack
            ? "Touch and drag any photo to swipe • Tap to view full • Tap outside to close"
            : "Tap any category to start browsing"
          }
        </p>
      </div>
    </div>
  )
}
