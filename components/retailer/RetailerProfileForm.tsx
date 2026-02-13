'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface RetailerProfileFormProps {
  retailer: {
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
  };
  userEmail: string;
}

export default function RetailerProfileForm({ retailer, userEmail }: RetailerProfileFormProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: retailer.name,
    website_url: retailer.website_url || '',
    affiliate_id: retailer.affiliate_id || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSaving(true);

    try {
      const response = await fetch('/api/retailer/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          retailer_id: retailer.id,
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }

      setSuccess('Profile updated successfully');
      setIsEditing(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: retailer.name,
      website_url: retailer.website_url || '',
      affiliate_id: retailer.affiliate_id || '',
    });
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Business Information</h2>
        {!isEditing && retailer.status === 'approved' && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors"
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* Messages */}
      {error && (
        <div className="mx-6 mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="mx-6 mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800">{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Business Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Name <span className="text-red-500">*</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                  required
                />
              ) : (
                <p className="text-gray-900 py-2">{retailer.name}</p>
              )}
            </div>

            {/* Website URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL <span className="text-red-500">*</span>
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={formData.website_url}
                  onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                  required
                />
              ) : (
                <a
                  href={retailer.website_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:text-teal-700 py-2 inline-block"
                >
                  {retailer.website_url || 'Not provided'}
                </a>
              )}
            </div>

            {/* Affiliate ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Affiliate ID
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.affiliate_id}
                  onChange={(e) => setFormData({ ...formData, affiliate_id: e.target.value })}
                  placeholder="Optional affiliate tracking ID"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                />
              ) : (
                <p className="text-gray-900 py-2">{retailer.affiliate_id || 'Not provided'}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <p className="text-gray-900 py-2">{userEmail}</p>
              <p className="text-xs text-gray-500 mt-1">
                Contact support to change your email address
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Logo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Logo
              </label>
              {retailer.logo_url ? (
                <div className="relative w-32 h-32 border border-gray-200 rounded-lg overflow-hidden bg-white">
                  <Image
                    src={retailer.logo_url}
                    alt={retailer.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                  <span className="text-gray-400 text-sm">No logo</span>
                </div>
              )}
              <p className="text-xs text-gray-500 mt-2">
                Contact support to update your business logo
              </p>
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Slug
              </label>
              <p className="text-gray-900 py-2 font-mono text-sm">{retailer.slug}</p>
              <p className="text-xs text-gray-500 mt-1">
                This is your unique identifier in URLs
              </p>
            </div>

            {/* Commission Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Commission Rate
              </label>
              <p className="text-gray-900 py-2">{retailer.commission}%</p>
              <p className="text-xs text-gray-500 mt-1">
                Contact support to discuss commission adjustments
              </p>
            </div>
          </div>
        </div>

        {/* Account Statistics */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Statistics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Account Status</p>
              <p className="text-lg font-semibold text-gray-900 capitalize">{retailer.status}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Active Deals</p>
              <p className="text-lg font-semibold text-gray-900">{retailer.deal_count}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Member Since</p>
              <p className="text-lg font-semibold text-gray-900">
                {new Date(retailer.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Account ID</p>
              <p className="text-gray-900 font-mono text-xs mt-1">{retailer.id}</p>
            </div>
            <div>
              <p className="text-gray-600">Account Active</p>
              <p className="text-gray-900 mt-1">
                {retailer.is_active ? (
                  <span className="inline-flex items-center gap-1 text-green-600">
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
                  <span className="inline-flex items-center gap-1 text-gray-600">
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
              <p className="text-gray-600">Last Updated</p>
              <p className="text-gray-900 mt-1">
                {new Date(retailer.updated_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="mt-8 pt-6 border-t border-gray-200 flex items-center gap-3">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
