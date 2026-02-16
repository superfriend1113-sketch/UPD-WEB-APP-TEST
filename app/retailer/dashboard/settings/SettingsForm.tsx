'use client';

/**
 * Settings Form Component
 * Pixel-perfect implementation matching UPD design
 * Includes all fields from profile page
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Retailer {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  website_url: string | null;
  affiliate_id: string | null;
  commission: number;
  status: string;
  is_active: boolean;
  deal_count: number;
  created_at: string;
  updated_at: string;
}

interface SettingsFormProps {
  retailer: Retailer;
  userEmail: string;
}

export default function SettingsForm({ retailer, userEmail }: SettingsFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: retailer.name || '',
    website_url: retailer.website_url || '',
    affiliate_id: retailer.affiliate_id || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/retailer/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          retailerId: retailer.id,
          ...formData,
        }),
      });

      if (response.ok) {
        setSuccess('Settings updated successfully');
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to update settings');
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      setError('An error occurred while updating settings');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Success/Error Messages */}
      {success && (
        <div className="mb-4 p-[12px_14px] bg-[#f0faf5] border border-[#1e8a52] rounded-[6px] text-[13px] text-[#1e8a52]">
          ✓ {success}
        </div>
      )}
      {error && (
        <div className="mb-4 p-[12px_14px] bg-[#fef2f0] border border-[#c8401a] rounded-[6px] text-[13px] text-[#c8401a]">
          ⚠️ {error}
        </div>
      )}

      {/* Editable Fields Section */}
      <div className="mb-6">
        {/* Form Row - 2 columns */}
        <div className="grid grid-cols-2 gap-[16px] mb-4">
          <div className="form-group flex flex-col gap-[5px]">
            <label className="text-[12px] font-semibold uppercase tracking-[0.4px] text-[#0d0d0d]">
              Business Name <span className="text-[#c8401a]">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-[12px] py-[9px] bg-[#ede9df] border-[1.5px] border-[#d6d0c4] rounded-[6px] text-[14px] text-[#0d0d0d] focus:outline-none focus:bg-white focus:border-[#0d0d0d] transition-all"
              required
            />
          </div>
          <div className="form-group flex flex-col gap-[5px]">
            <label className="text-[12px] font-semibold uppercase tracking-[0.4px] text-[#0d0d0d]">
              Email Address
            </label>
            <input
              type="email"
              value={userEmail}
              disabled
              className="px-[12px] py-[9px] bg-[#f5f5f5] border-[1.5px] border-[#d6d0c4] rounded-[6px] text-[14px] text-[#888070] cursor-not-allowed"
            />
            <p className="text-[11px] text-[#888070] mt-[2px]">Contact support to change email</p>
          </div>
        </div>

        {/* Full Width Row - Website */}
        <div className="mb-4">
          <div className="form-group flex flex-col gap-[5px]">
            <label className="text-[12px] font-semibold uppercase tracking-[0.4px] text-[#0d0d0d]">
              Website URL <span className="text-[#c8401a]">*</span>
            </label>
            <input
              type="url"
              value={formData.website_url}
              onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
              placeholder="https://www.example.com"
              className="px-[12px] py-[9px] bg-[#ede9df] border-[1.5px] border-[#d6d0c4] rounded-[6px] text-[14px] text-[#0d0d0d] focus:outline-none focus:bg-white focus:border-[#0d0d0d] transition-all placeholder:text-[#aaa]"
              required
            />
          </div>
        </div>

        {/* Affiliate ID */}
        <div className="mb-4">
          <div className="form-group flex flex-col gap-[5px]">
            <label className="text-[12px] font-semibold uppercase tracking-[0.4px] text-[#0d0d0d]">
              Affiliate ID
            </label>
            <input
              type="text"
              value={formData.affiliate_id}
              onChange={(e) => setFormData({ ...formData, affiliate_id: e.target.value })}
              placeholder="Optional affiliate tracking ID"
              className="px-[12px] py-[9px] bg-[#ede9df] border-[1.5px] border-[#d6d0c4] rounded-[6px] text-[14px] text-[#0d0d0d] focus:outline-none focus:bg-white focus:border-[#0d0d0d] transition-all placeholder:text-[#aaa]"
            />
          </div>
        </div>
      </div>

      {/* Read-Only Information Section */}
      <div className="mb-6 pb-6 border-t border-[#d6d0c4] pt-6">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.8px] text-[#888070] mb-4 pb-[6px] border-b border-[#d6d0c4]">
          Account Information
        </h3>
        
        {/* Logo */}
        <div className="mb-6">
          <label className="block text-[12px] font-semibold uppercase tracking-[0.4px] text-[#0d0d0d] mb-[8px]">
            Business Logo
          </label>
          {retailer.logo_url ? (
            <div className="relative w-[80px] h-[80px] border border-[#d6d0c4] rounded-[6px] overflow-hidden bg-white">
              <Image
                src={retailer.logo_url}
                alt={retailer.name}
                fill
                className="object-contain p-2"
              />
            </div>
          ) : (
            <div className="w-[80px] h-[80px] border-[1.5px] border-dashed border-[#d6d0c4] rounded-[6px] flex items-center justify-center bg-[#f5f2eb]">
              <span className="text-[#888070] text-[11px]">No logo</span>
            </div>
          )}
          <p className="text-[11px] text-[#888070] mt-[6px]">Contact support to update logo</p>
        </div>

        {/* Grid of read-only fields */}
        <div className="grid grid-cols-2 gap-[16px] mb-4">
          <div>
            <p className="text-[11px] text-[#888070] mb-[4px]">URL Slug</p>
            <p className="font-mono text-[13px] text-[#0d0d0d]">{retailer.slug}</p>
            <p className="text-[11px] text-[#888070] mt-[2px]">Unique identifier in URLs</p>
          </div>
          <div>
            <p className="text-[11px] text-[#888070] mb-[4px]">Commission Rate</p>
            <p className="text-[13px] text-[#0d0d0d]">{retailer.commission}%</p>
            <p className="text-[11px] text-[#888070] mt-[2px]">Contact support for changes</p>
          </div>
        </div>
      </div>

      {/* Account Statistics */}
      <div className="mb-6 pb-6 border-t border-[#d6d0c4] pt-6">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.8px] text-[#888070] mb-4 pb-[6px] border-b border-[#d6d0c4]">
          Account Statistics
        </h3>
        <div className="grid grid-cols-3 gap-[12px]">
          <div className="bg-[#ede9df] rounded-[6px] p-[12px]">
            <p className="text-[11px] text-[#888070] mb-[4px]">Status</p>
            <p className="text-[14px] font-semibold text-[#0d0d0d] capitalize">{retailer.status}</p>
          </div>
          <div className="bg-[#ede9df] rounded-[6px] p-[12px]">
            <p className="text-[11px] text-[#888070] mb-[4px]">Active Deals</p>
            <p className="text-[14px] font-semibold text-[#0d0d0d]">{retailer.deal_count}</p>
          </div>
          <div className="bg-[#ede9df] rounded-[6px] p-[12px]">
            <p className="text-[11px] text-[#888070] mb-[4px]">Member Since</p>
            <p className="text-[14px] font-semibold text-[#0d0d0d]">
              {new Date(retailer.created_at).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Account Details */}
      <div className="mb-6 pb-6 border-t border-[#d6d0c4] pt-6">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.8px] text-[#888070] mb-4 pb-[6px] border-b border-[#d6d0c4]">
          Account Details
        </h3>
        <div className="grid grid-cols-2 gap-[16px]">
          <div>
            <p className="text-[11px] text-[#888070] mb-[4px]">Account ID</p>
            <p className="font-mono text-[11px] text-[#0d0d0d] break-all">{retailer.id}</p>
          </div>
          <div>
            <p className="text-[11px] text-[#888070] mb-[4px]">Account Active</p>
            <p className="text-[13px] text-[#0d0d0d]">
              {retailer.is_active ? (
                <span className="inline-flex items-center gap-[4px] text-[#1e8a52]">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Yes
                </span>
              ) : (
                <span className="inline-flex items-center gap-[4px] text-[#888070]">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  No
                </span>
              )}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-[#888070] mb-[4px]">Last Updated</p>
            <p className="text-[13px] text-[#0d0d0d]">
              {new Date(retailer.updated_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-[7px] px-[22px] py-[10px] bg-[#0d0d0d] text-white font-semibold rounded-[6px] hover:bg-[#2a2a2a] hover:-translate-y-px transition-all text-[14px] disabled:opacity-40 disabled:cursor-not-allowed tracking-[0.2px] border-none"
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}
