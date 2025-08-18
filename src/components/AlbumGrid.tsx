import { motion } from 'framer-motion';

// Helper function to get all images from a category
function getAllImagesFromCategory(category: any): any[] {
  if (category.hasSubCategories && category.subCategories) {
    return category.subCategories.flatMap((s: any) => s.images);
  }
  return category.images || [];
}

// Stacked preview component
function StackedPreview({ images, mode = 'stacked' }: { images: any[]; mode?: 'stacked' | 'flat' }) {
  const preview = images.slice(0, 6);
  
  if (mode === 'flat') {
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
            <img
              src={img.src}
              alt={img.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

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
          <img
            src={img.src}
            alt={img.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
        </div>
      ))}
    </div>
  );
}

interface AlbumGridProps {
  categories: any[];
  onAlbumClick: (key: string) => void;
  renderKey: number;
}

export function AlbumGrid({ categories, onAlbumClick, renderKey }: AlbumGridProps) {
  return (
    <div className="grid [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))] gap-8 md:gap-10 w-full max-w-screen-2xl px-4">
      {categories.map(cat => {
        const imgs = getAllImagesFromCategory(cat);
        const layoutId = `album-card-${cat.key}`;
        
        return (
          <div key={`${cat.key}-${renderKey}`} className="text-left group min-w-[220px]">
            <h3 className="text-white/90 font-semibold mb-2">{cat.title}</h3>
            
            {/* Album card with stacked preview */}
            <motion.button
              key={`${cat.key}-${renderKey}`}
              layoutId={layoutId}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Album card clicked:', cat.key);
                onAlbumClick(cat.key);
              }}
              onTouchStart={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Album card touched:', cat.key);
                onAlbumClick(cat.key);
              }}
              className="w-full aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden bg-white/5 block touch-manipulation cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ pointerEvents: 'auto' }}
            >
              <StackedPreview images={imgs} mode="stacked" />
            </motion.button>
            
            <p className="text-white/60 text-sm mt-2">{imgs.length} photos</p>
          </div>
        );
      })}
    </div>
  );
}
