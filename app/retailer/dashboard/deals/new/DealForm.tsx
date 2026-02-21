'use client';

/**
 * Deal Form Component
 * Form for creating and editing deals
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Toast from '@/components/ui/Toast';
import { supabase } from '@/lib/supabase/config';

interface Category {
  id: string;
  name: string;
  slug: string;
  is_active: boolean;
}

interface DealFormProps {
  retailerId: string;
  categories: Category[];
  initialData?: {
    id: string;
    title: string;
    description: string;
    original_price: number;
    discounted_price: number;
    category_id: string;
    deal_url: string;
    image_url: string;
    images?: string[];
    start_date: string;
    end_date: string;
    is_active: boolean;
  };
}

export default function DealForm({ retailerId, categories, initialData }: DealFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; show: boolean }>({
    message: '',
    type: 'info',
    show: false,
  });
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    original_price: initialData?.original_price?.toString() || '',
    discounted_price: initialData?.discounted_price?.toString() || '',
    category_id: initialData?.category_id || '',
    deal_url: initialData?.deal_url || '',
    image_url: initialData?.image_url || '',
    start_date: initialData?.start_date ? new Date(initialData.start_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    end_date: initialData?.end_date ? new Date(initialData.end_date).toISOString().split('T')[0] : '',
    is_active: initialData?.is_active ?? true,
    sku: '',
    condition: 'Overstock',
    quantity: '1',
    location: '',
    minimum_price: '',
  });
  const [uploadedImages, setUploadedImages] = useState<string[]>(
    initialData?.images && initialData.images.length > 0 
      ? initialData.images 
      : initialData?.image_url 
        ? [initialData.image_url] 
        : []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : e.target.value;
    
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setError(null);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        // Validate file type
        const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
        if (!validTypes.includes(file.type)) {
          throw new Error(`Invalid file type: ${file.name}. Only PNG, JPG, and WEBP are allowed.`);
        }

        // Validate file size (50MB)
        const maxSize = 50 * 1024 * 1024; // 50MB
        if (file.size > maxSize) {
          const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
          throw new Error(`File too large: ${file.name} (${sizeMB}MB). Maximum size is 50MB.`);
        }

        // Create unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${retailerId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        // Upload to Supabase Storage
        const { data, error: uploadError } = await supabase.storage
          .from('deal-images')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) {
          throw new Error(`Upload failed for ${file.name}: ${uploadError.message}`);
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('deal-images')
          .getPublicUrl(fileName);

        return publicUrl;
      });

      const newImageUrls = await Promise.all(uploadPromises);
      const allImages = [...uploadedImages, ...newImageUrls];
      
      setUploadedImages(allImages);
      setFormData({
        ...formData,
        image_url: allImages[0], // Set first image as primary
      });

      setToast({
        message: `${newImageUrls.length} image(s) uploaded successfully`,
        type: 'success',
        show: true,
      });
    } catch (err) {
      console.error('Error uploading files:', err);
      setError(err instanceof Error ? err.message : 'Failed to upload images');
      setToast({
        message: err instanceof Error ? err.message : 'Failed to upload images',
        type: 'error',
        show: true,
      });
    } finally {
      setIsUploading(false);
      // Reset file input
      e.target.value = '';
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const newImages = uploadedImages.filter((_, index) => index !== indexToRemove);
    setUploadedImages(newImages);
    setFormData({
      ...formData,
      image_url: newImages[0] || '', // Set first remaining image as primary
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Get current user ID for RLS policy
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('You must be logged in to create a deal');
        setIsLoading(false);
        return;
      }

      const originalPrice = parseFloat(formData.original_price);
      const discountedPrice = parseFloat(formData.discounted_price);
      const minimumPrice = formData.minimum_price ? parseFloat(formData.minimum_price) : null;
      const quantity = parseInt(formData.quantity) || 1;

      if (isNaN(originalPrice) || isNaN(discountedPrice)) {
        setError('Please enter valid prices');
        setIsLoading(false);
        return;
      }

      if (discountedPrice >= originalPrice) {
        setError('Discounted price must be less than original price');
        setIsLoading(false);
        return;
      }

      if (minimumPrice && discountedPrice < minimumPrice) {
        setError('Current price must be greater than or equal to minimum price');
        setIsLoading(false);
        return;
      }

      if (quantity < 1) {
        setError('Quantity must be at least 1');
        setIsLoading(false);
        return;
      }

      const dealData = {
        title: formData.title,
        description: formData.description,
        original_price: originalPrice,
        discounted_price: discountedPrice,
        minimum_price: minimumPrice,
        category_id: formData.category_id,
        retailer_id: retailerId,
        deal_url: formData.deal_url,
        image_url: uploadedImages[0] || formData.image_url, // Primary image
        images: uploadedImages.length > 0 ? uploadedImages : (formData.image_url ? [formData.image_url] : []), // All images
        start_date: formData.start_date,
        end_date: formData.end_date || null,
        is_active: formData.is_active,
        status: 'pending',
        sku: formData.sku || null,
        condition: formData.condition,
        quantity: quantity,
        location: formData.location || null,
        created_by: user.id,
        // Legacy fields for backward compatibility (trigger will auto-populate these)
        product_name: formData.title,
        price: discountedPrice, // Now in dollars, not cents
        savings_percentage: Math.round(((originalPrice - discountedPrice) / originalPrice) * 100),
      };

      if (initialData?.id) {
        const { error: updateError } = await supabase
          .from('deals')
          .update(dealData)
          .eq('id', initialData.id)
          .eq('retailer_id', retailerId);

        if (updateError) {
          setError('Failed to update deal: ' + updateError.message);
          setIsLoading(false);
          return;
        }

        setToast({
          message: 'Deal updated successfully! Changes will be reviewed by admin.',
          type: 'success',
          show: true,
        });
        
        setTimeout(() => {
          router.push('/retailer/dashboard/deals');
        }, 1500);
      } else {
        const { error: insertError } = await supabase
          .from('deals')
          .insert(dealData);

        if (insertError) {
          setError('Failed to create deal: ' + insertError.message);
          setIsLoading(false);
          return;
        }

        setToast({
          message: 'Deal submitted successfully! It will be reviewed by our team.',
          type: 'success',
          show: true,
        });
        
        setTimeout(() => {
          router.push('/retailer/dashboard/deals');
        }, 1500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsLoading(false);
    }
  };

  const discountPercentage = formData.original_price && formData.discounted_price
    ? Math.round(((parseFloat(formData.original_price) - parseFloat(formData.discounted_price)) / parseFloat(formData.original_price)) * 100)
    : 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* SKU and Title Row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-[5px]">
          <label className="text-[12px] font-semibold text-[#0d0d0d] tracking-[0.4px] uppercase">
            SKU <span className="text-[#c8401a]">*</span>
          </label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            required
            placeholder="APX-0055"
            className="border-[1.5px] border-[#d6d0c4] rounded-[6px] px-3 py-[9px] font-body text-[14px] bg-[#ede9df] text-[#0d0d0d] transition-all outline-none focus:border-[#0d0d0d] focus:bg-white"
          />
        </div>
        <div className="col-span-2 flex flex-col gap-[5px]">
          <label className="text-[12px] font-semibold text-[#0d0d0d] tracking-[0.4px] uppercase">
            Product Title <span className="text-[#c8401a]">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g. Sony XB700 Headphones  Overstock"
            className="border-[1.5px] border-[#d6d0c4] rounded-[6px] px-3 py-[9px] font-body text-[14px] bg-[#ede9df] text-[#0d0d0d] transition-all outline-none focus:border-[#0d0d0d] focus:bg-white"
          />
        </div>
      </div>

      {/* Category, Condition, Quantity Row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-[5px]">
          <label className="text-[12px] font-semibold text-[#0d0d0d] tracking-[0.4px] uppercase">
            Category <span className="text-[#c8401a]">*</span>
          </label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
            className="border-[1.5px] border-[#d6d0c4] rounded-[6px] px-3 py-[9px] font-body text-[14px] bg-[#ede9df] text-[#0d0d0d] transition-all outline-none focus:border-[#0d0d0d] focus:bg-white"
          >
            <option value="">Select...</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-[5px]">
          <label className="text-[12px] font-semibold text-[#0d0d0d] tracking-[0.4px] uppercase">
            Condition <span className="text-[#c8401a]">*</span>
          </label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="border-[1.5px] border-[#d6d0c4] rounded-[6px] px-3 py-[9px] font-body text-[14px] bg-[#ede9df] text-[#0d0d0d] transition-all outline-none focus:border-[#0d0d0d] focus:bg-white"
          >
            <option>Overstock</option>
            <option>Returned</option>
            <option>Open-box</option>
            <option>Seasonal</option>
            <option>Near-expiration</option>
          </select>
        </div>
        <div className="flex flex-col gap-[5px]">
          <label className="text-[12px] font-semibold text-[#0d0d0d] tracking-[0.4px] uppercase">
            Quantity <span className="text-[#c8401a]">*</span>
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="e.g. 25"
            min="1"
            className="border-[1.5px] border-[#d6d0c4] rounded-[6px] px-3 py-[9px] font-body text-[14px] bg-[#ede9df] text-[#0d0d0d] transition-all outline-none focus:border-[#0d0d0d] focus:bg-white"
          />
        </div>
      </div>

      {/* Pricing Row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-[5px]">
          <label className="text-[12px] font-semibold text-[#0d0d0d] tracking-[0.4px] uppercase">
            Original Price ($) <span className="text-[#c8401a]">*</span>
          </label>
          <input
            type="number"
            name="original_price"
            value={formData.original_price}
            onChange={handleChange}
            required
            step="0.01"
            min="0"
            placeholder="299.00"
            className="border-[1.5px] border-[#d6d0c4] rounded-[6px] px-3 py-[9px] font-body text-[14px] bg-[#ede9df] text-[#0d0d0d] transition-all outline-none focus:border-[#0d0d0d] focus:bg-white"
          />
        </div>
        <div className="flex flex-col gap-[5px]">
          <label className="text-[12px] font-semibold text-[#0d0d0d] tracking-[0.4px] uppercase">
            Current Price ($) <span className="text-[#c8401a]">*</span>
          </label>
          <input
            type="number"
            name="discounted_price"
            value={formData.discounted_price}
            onChange={handleChange}
            required
            step="0.01"
            min="0"
            placeholder="189.00"
            className="border-[1.5px] border-[#d6d0c4] rounded-[6px] px-3 py-[9px] font-body text-[14px] bg-[#ede9df] text-[#0d0d0d] transition-all outline-none focus:border-[#0d0d0d] focus:bg-white"
          />
          {discountPercentage > 0 && (
            <p className="text-[12px] text-[#1e8a52] font-medium mt-1">
              −{discountPercentage}% discount
            </p>
          )}
        </div>
        <div className="flex flex-col gap-[5px]">
          <label className="text-[12px] font-semibold text-[#0d0d0d] tracking-[0.4px] uppercase">
            Minimum Price ($) <span className="text-[#c8401a]">*</span>
          </label>
          <input
            type="number"
            name="minimum_price"
            value={formData.minimum_price}
            onChange={handleChange}
            required
            placeholder="150.00"
            step="0.01"
            min="0"
            className="border-[1.5px] border-[#d6d0c4] rounded-[6px] px-3 py-[9px] font-body text-[14px] bg-[#ede9df] text-[#0d0d0d] transition-all outline-none focus:border-[#0d0d0d] focus:bg-white"
          />
        </div>
      </div>

      {/* Storage Location and Dates Row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-[5px]">
          <label className="text-[12px] font-semibold text-[#0d0d0d] tracking-[0.4px] uppercase">
            Storage Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Chicago, IL"
            className="border-[1.5px] border-[#d6d0c4] rounded-[6px] px-3 py-[9px] font-body text-[14px] bg-[#ede9df] text-[#0d0d0d] transition-all outline-none focus:border-[#0d0d0d] focus:bg-white"
          />
        </div>
        <div className="flex flex-col gap-[5px]">
          <label className="text-[12px] font-semibold text-[#0d0d0d] tracking-[0.4px] uppercase">
            Expiration Date <span className="text-[#888070] font-normal">(optional)</span>
          </label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            className="border-[1.5px] border-[#d6d0c4] rounded-[6px] px-3 py-[9px] font-body text-[14px] bg-[#ede9df] text-[#0d0d0d] transition-all outline-none focus:border-[#0d0d0d] focus:bg-white"
          />
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-[5px]">
        <label className="text-[12px] font-semibold text-[#0d0d0d] tracking-[0.4px] uppercase">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Describe the product condition, what's included, and any relevant details..."
          className="border-[1.5px] border-[#d6d0c4] rounded-[6px] px-3 py-[9px] font-body text-[14px] bg-[#ede9df] text-[#0d0d0d] transition-all outline-none focus:border-[#0d0d0d] focus:bg-white resize-vertical"
        />
      </div>

      {/* Product Image */}
      <div className="flex flex-col gap-[5px]">
        <label className="text-[12px] font-semibold text-[#0d0d0d] tracking-[0.4px] uppercase">
          Product Images
        </label>
        <label className="border-2 border-dashed border-[#d6d0c4] rounded-[6px] p-5 text-center cursor-pointer bg-[#ede9df] text-[#888070] text-[13px] transition-all hover:border-[#0d0d0d] hover:text-[#0d0d0d] block">
          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            onChange={handleFileUpload}
            disabled={isUploading}
            multiple
            className="hidden"
          />
          {isUploading ? (
            <>
              <span className="text-[24px] block mb-[6px]">⏳</span>
              Uploading...
            </>
          ) : (
            <>
              <span className="text-[24px] block mb-[6px]">📁</span>
              Click to upload or drag & drop<br />
              <span className="text-[12px]">PNG, JPG, WEBP up to 50MB each • Multiple files supported</span>
            </>
          )}
        </label>
        
        {/* Image Previews */}
        {uploadedImages.length > 0 && (
          <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {uploadedImages.map((imageUrl, index) => (
              <div key={index} className="relative group">
                <img
                  src={imageUrl}
                  alt={`Product image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-[6px] border border-[#d6d0c4]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Invalid+Image';
                  }}
                />
                {index === 0 && (
                  <div className="absolute top-1 left-1 bg-[#1e8a52] text-white text-[10px] font-bold px-2 py-1 rounded">
                    Primary
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-[#c8401a] text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[14px] font-bold hover:bg-[#a83416]"
                  aria-label="Remove image"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Validation Warning */}
      <div className="p-[12px_14px] bg-[#fef8e7] border border-[#f0c040] rounded-[6px] text-[13px] text-[#856404]">
        ⚠️ Validation: Current price ≤ original price, current price ≥ min price, quantity must be positive.
      </div>

      {error && (
        <div className="p-3 bg-[#fef2f0] border border-[#f0b0a0] text-[#c8401a] text-[13px] rounded-[6px]">
          {error}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-[10px] justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-[7px] px-[22px] py-[10px] rounded-[6px] font-body text-[14px] font-semibold cursor-pointer border-[1.5px] border-[#d6d0c4] bg-transparent text-[#0d0d0d] transition-all hover:border-[#0d0d0d] tracking-[0.2px]"
        >
          Save as Draft
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center gap-[7px] px-[22px] py-[10px] rounded-[6px] font-body text-[14px] font-semibold cursor-pointer border-none bg-[#0d0d0d] text-white transition-all hover:bg-[#2a2a2a] hover:-translate-y-px tracking-[0.2px] disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? 'Publishing...' : initialData ? 'Update Listing' : 'Publish Listing →'}
        </button>
      </div>

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </form>
  );
}
