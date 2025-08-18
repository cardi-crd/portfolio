// Image preloader utility for faster loading
class ImagePreloader {
  private preloadedImages = new Set<string>();
  private preloadQueue: string[] = [];
  private isProcessing = false;

  // Preload a single image
  preloadImage(src: string): Promise<void> {
    if (this.preloadedImages.has(src)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.preloadedImages.add(src);
        resolve();
      };
      img.onerror = () => {
        console.warn('Failed to preload image:', src);
        resolve(); // Don't reject, just continue
      };
      img.src = src;
    });
  }

  // Preload multiple images in parallel
  async preloadImages(sources: string[]): Promise<void> {
    const uniqueSources = sources.filter(src => !this.preloadedImages.has(src));
    
    if (uniqueSources.length === 0) return;

    // Preload in batches to avoid overwhelming the browser
    const batchSize = 3;
    for (let i = 0; i < uniqueSources.length; i += batchSize) {
      const batch = uniqueSources.slice(i, i + batchSize);
      await Promise.allSettled(batch.map(src => this.preloadImage(src)));
    }
  }

  // Preload images for a specific category
  async preloadCategory(category: any): Promise<void> {
    const images = this.getAllImagesFromCategory(category);
    const sources = images.map(img => img.src).filter(Boolean);
    await this.preloadImages(sources);
  }

  // Get all images from a category (helper function)
  private getAllImagesFromCategory(category: any): any[] {
    if (category.hasSubCategories && category.subCategories) {
      return category.subCategories.flatMap((s: any) => s.images);
    }
    return category.images || [];
  }

  // Check if an image is already preloaded
  isPreloaded(src: string): boolean {
    return this.preloadedImages.has(src);
  }

  // Clear preloaded images (useful for memory management)
  clear(): void {
    this.preloadedImages.clear();
  }
}

export const imagePreloader = new ImagePreloader();
