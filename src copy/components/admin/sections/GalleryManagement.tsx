import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Upload, Trash2, AlertCircle, Image as ImageIcon } from 'lucide-react';

interface GalleryImage {
  id: string;
  title: string;
  url: string;
  uploadedAt: string;
}

const mockImages: GalleryImage[] = [
  {
    id: '1',
    title: 'Corporate Leadership Summit',
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069',
    uploadedAt: '2024-03-15',
  },
  {
    id: '2',
    title: 'Tech Innovation Conference',
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070',
    uploadedAt: '2024-03-14',
  },
  {
    id: '3',
    title: 'Networking Event',
    url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070',
    uploadedAt: '2024-03-13',
  },
];

const GalleryManagement = () => {
  const [images, setImages] = useState<GalleryImage[]>(mockImages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newImageTitle, setNewImageTitle] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPEG, PNG, or WebP)');
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError('Image size must be less than 5MB');
      return;
    }

    try {
      setUploadingImage(true);
      setError(null);

      // Simulate upload progress
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(progressInterval);
          
          // Simulate successful upload
          const newImage: GalleryImage = {
            id: Date.now().toString(),
            title: newImageTitle.trim() || file.name,
            url: URL.createObjectURL(file),
            uploadedAt: new Date().toISOString().split('T')[0],
          };

          setImages([newImage, ...images]);
          setNewImageTitle('');
          setUploadingImage(false);
          setUploadProgress(0);
        }
      }, 300);

    } catch (err) {
      setError('Failed to upload image. Please try again.');
      setUploadingImage(false);
      setUploadProgress(0);
    }
  };

  const handleDeleteImage = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this image?')) {
      return;
    }

    setImages(images.filter(img => img.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div>
          <h2 className="text-3xl font-bold">Gallery Management</h2>
          <p className="text-neutral-400 mt-2">Upload and manage event images</p>
        </div>

        {/* Upload Section */}
        <div className="bg-neutral-900 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Upload New Image</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Image Title
              </label>
              <input
                type="text"
                value={newImageTitle}
                onChange={(e) => setNewImageTitle(e.target.value)}
                className="w-full px-4 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                placeholder="Enter image title (optional)"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="imageUpload"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              >
                <Upload className="w-5 h-5 mr-2" />
                Choose Image
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageUpload}
                className="hidden"
              />

              {uploadingImage && (
                <div className="mt-4">
                  <div className="w-full bg-neutral-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-violet-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-neutral-400 mt-2">Uploading... {uploadProgress}%</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <div className="flex items-center text-red-500">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative bg-neutral-900 rounded-xl overflow-hidden"
              >
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-lg font-medium text-white truncate">{image.title}</h4>
                      <p className="text-sm text-neutral-300">{image.uploadedAt}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeleteImage(image.id)}
                    className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && images.length === 0 && (
          <div className="text-center py-12 bg-neutral-900 rounded-xl">
            <ImageIcon className="w-12 h-12 mx-auto text-neutral-600 mb-4" />
            <p className="text-neutral-400">No images in the gallery yet. Upload some images to get started!</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default GalleryManagement;