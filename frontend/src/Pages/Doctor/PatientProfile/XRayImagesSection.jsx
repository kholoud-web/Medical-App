// src/components/XRayImagesSection.jsx

import React from 'react';
import { Plus } from 'lucide-react'; // تحتاج إلى تثبيت lucide-react

const XRayImageCard = ({ imageUrl, altText }) => (
  <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 transition duration-150 cursor-pointer">
    <img 
      src={imageUrl || "path/to/default/xray.png"} // استبدلها بمسار الصورة الفعلي
      alt={altText}
      className="w-full h-full object-cover"
    />
  </div>
);

const AddImageCard = () => (
  <div className="w-full h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition duration-150">
    <Plus className="w-6 h-6 text-gray-400" />
  </div>
);

const XRayImagesSection = ({ images }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">X-Ray Images</h3>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <XRayImageCard key={index} imageUrl={image.url} altText={image.alt} />
        ))}
        <AddImageCard />
      </div>
    </div>
  );
};

export default XRayImagesSection;