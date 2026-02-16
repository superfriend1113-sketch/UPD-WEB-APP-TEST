'use client';

/**
 * Retailer Application Form Component
 * Pixel-perfect implementation matching UPD design
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Toast from '@/components/ui/Toast';

interface Props {
  userEmail: string;
  userId: string;
}

export default function RetailerApplicationForm({ userEmail, userId }: Props) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  
  // Toast state
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({
    show: false,
    message: '',
    type: 'info'
  });

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ show: true, message, type });
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };
  
  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Business Identity
    businessName: '',
    dbaName: '',
    entityType: '',
    state: '',
    yearEstablished: '',
    ein: '',
    
    // Step 2: Business Contact
    email: userEmail,
    phone: '',
    website: '',
    hasPhysicalStore: 'yes',
    storeAddress: '',
    cityState: '',
    
    // Step 3: Inventory Profile
    categories: [] as string[],
    conditions: [] as string[],
    volume: '$5k–$25k',
    discountRange: '',
    storageLocation: '',
    
    // Step 4: Operational Controls
    minMargin: '',
    allowDynamicMarkdowns: 'yes',
    allowFlashSales: 'no',
    
    // Step 5: Legal Agreement
    legal1: false,
    legal2: false,
    legal3: false,
  });

  const showStep = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextStep = () => {
    if (currentStep < 5) showStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) showStep(currentStep - 1);
  };

  const toggleCategory = (cat: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat]
    }));
  };

  const toggleCondition = (cond: string) => {
    setFormData(prev => ({
      ...prev,
      conditions: prev.conditions.includes(cond)
        ? prev.conditions.filter(c => c !== cond)
        : [...prev.conditions, cond]
    }));
  };

  const handleSubmit = async () => {
    if (!formData.legal1 || !formData.legal2 || !formData.legal3) {
      showToast('Please confirm all three agreements.', 'error');
      return;
    }

    try {
      // Submit application
      const response = await fetch('/api/retailer/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userId }),
      });

      if (response.ok) {
        setSubmitted(true);
        showToast('Application submitted successfully!', 'success');
      } else {
        showToast('Failed to submit application. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      showToast('An error occurred. Please try again.', 'error');
    }
  };

  if (submitted) {
    return (
      <div className="max-w-[500px] mx-auto py-20 px-4 text-center">
        <div className="w-[72px] h-[72px] bg-[#0d0d0d] rounded-full flex items-center justify-center text-[32px] mx-auto mb-6">
          📋
        </div>
        <h1 className="font-display text-[40px] mb-3">Application Submitted</h1>
        <p className="text-[#888070] text-[15px] leading-[1.7] mb-5">
          Thank you for applying to Unlimited Perfect Deals. Your business is currently under review by our partner team.
        </p>
        <span className="inline-flex items-center gap-[6px] text-[12px] font-semibold px-[14px] py-[6px] rounded-[20px] bg-[#fef8e7] text-[#856404] border border-[#f0c040] uppercase tracking-[0.4px]">
          <span className="w-[6px] h-[6px] rounded-full bg-[#856404]"></span>
          PENDING REVIEW
        </span>
        <p className="text-[13px] text-[#888070] mt-5">
          You will receive an email notification once your application has been evaluated. Access to the retailer dashboard requires manual approval.
        </p>
        <div className="mt-8 p-4 bg-[#ede9df] border border-[#d6d0c4] rounded-[6px] text-left">
          <div className="font-bold mb-2 text-[11px] uppercase tracking-[0.8px] text-[#888070]">
            Submitted Business
          </div>
          <div className="font-semibold text-[16px]">{formData.businessName}</div>
          <div className="text-[#888070] text-[13px] mt-[2px]">{formData.email}</div>
        </div>
        <button
          onClick={() => router.push('/')}
          className="mt-6 px-[22px] py-[10px] border-[1.5px] border-[#d6d0c4] rounded-[6px] text-[14px] font-semibold hover:border-[#0d0d0d] transition-all"
        >
          ← Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[680px] mx-auto py-12 px-4 pb-20">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="font-display font-extrabold text-[52px] tracking-[1px] leading-none">
          Turn Excess Inventory<br />Into <span className="text-[#c8401a]">Revenue</span>
        </h1>
        <p className="text-[#888070] mt-[10px] text-[15px] max-w-[460px] mx-auto">
          Apply to join a controlled marketplace designed to protect your brand while recovering margin from surplus inventory.
        </p>
      </div>

      {/* Step Progress */}
      <div className="flex items-center mb-9 gap-0">
        {[1, 2, 3, 4, 5].map((step, idx) => (
          <div key={step} className="flex items-center flex-1">
            <div
              className={`w-[32px] h-[32px] rounded-full flex items-center justify-center text-[12px] font-semibold border-2 transition-all cursor-pointer z-10 ${
                step < currentStep
                  ? 'bg-[#1e8a52] border-[#1e8a52] text-white'
                  : step === currentStep
                  ? 'bg-[#0d0d0d] border-[#0d0d0d] text-white'
                  : 'bg-[#ede9df] border-[#d6d0c4] text-[#888070]'
              }`}
              onClick={() => showStep(step)}
            >
              {step < currentStep ? '✓' : step}
            </div>
            {idx < 4 && (
              <div
                className={`flex-1 h-[2px] transition-all ${
                  step < currentStep ? 'bg-[#1e8a52]' : 'bg-[#d6d0c4]'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Card */}
      <div className="bg-white border border-[#d6d0c4] rounded-[6px] p-8 shadow-[0_2px_12px_rgba(13,13,13,0.10)]">

        {/* Step 1: Business Identity */}
        {currentStep === 1 && (
          <>
            <h2 className="font-display font-extrabold text-[26px] tracking-[0.5px] mb-1">Business Identity</h2>
            <p className="text-[#888070] text-[13px] mb-6">Tell us about your legal business entity.</p>
            
            <div className="grid grid-cols-2 gap-[16px] mb-[16px]">
              <div className="flex flex-col gap-[5px]">
                <label className="text-[12px] font-semibold text-[#0d0d0d] tracking-[0.4px] uppercase">
                  Business Legal Name <span className="text-[#c8401a]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="e.g. Apex Retail Solutions LLC"
                  className="border-[1.5px] border-[#d6d0c4] rounded-[6px] px-[12px] py-[9px] text-[14px] bg-[#ede9df] focus:border-[#0d0d0d] focus:bg-white outline-none transition-all"
                />
              </div>
              <div className="flex flex-col gap-[5px]">
                <label className="text-[12px] font-semibold text-[#0d0d0d] tracking-[0.4px] uppercase">
                  DBA Name <span className="text-[#888070] font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.dbaName}
                  onChange={(e) => setFormData({ ...formData, dbaName: e.target.value })}
                  placeholder="Doing business as..."
                  className="border-[1.5px] border-[#d6d0c4] rounded-[6px] px-[12px] py-[9px] text-[14px] bg-[#ede9df] focus:border-[#0d0d0d] focus:bg-white outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-[16px] mb-[16px]">
              <div className="flex flex-col gap-[5px]">
                <label className="text-[12px] font-semibold text-[#0d0d0d] tracking-[0.4px] uppercase">
                  Legal Entity Type <span className="text-[#c8401a]">*</span>
                </label>
                <select
                  value={formData.entityType}
                  onChange={(e) => setFormData({ ...formData, entityType: e.target.value })}
                  className="border-[1.5px] border-[#d6d0c4] rounded-[6px] px-[12px] py-[9px] text-[14px] bg-[#ede9df] focus:border-[#0d0d0d] focus:bg-white outline-none transition-all"
                >
                  <option value="">Select type…</option>
                  <option>LLC</option>
                  <option>Corporation</option>
                  <option>Sole Proprietorship</option>
                  <option>Partnership</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-[5px]">
                <label className="text-[12px] font-semibold text-[#0d0d0d] tracking-[0.4px] uppercase">
                  State of Registration <span className="text-[#c8401a]">*</span>
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="border-[1.5px] border-[#d6d0c4] rounded-[6px] px-[12px] py-[9px] text-[14px] bg-[#ede9df] focus:border-[#0d0d0d] focus:bg-white outline-none transition-all"
                >
                  <option value="">Select state…</option>
                  <option>California</option>
                  <option>Texas</option>
                  <option>New York</option>
                  <option>Florida</option>
                  <option>Illinois</option>
                  <option>Ohio</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-[16px]">
              <div className="flex flex-col gap-[5px]">
                <label className="text-[12px] font-semibold text-[#0d0d0d] tracking-[0.4px] uppercase">
                  Year Established <span className="text-[#c8401a]">*</span>
                </label>
                <input
                  type="number"
                  value={formData.yearEstablished}
                  onChange={(e) => setFormData({ ...formData, yearEstablished: e.target.value })}
                  placeholder="e.g. 2018"
                  min="1900"
                  max="2025"
                  className="border-[1.5px] border-[#d6d0c4] rounded-[6px] px-[12px] py-[9px] text-[14px] bg-[#ede9df] focus:border-[#0d0d0d] focus:bg-white outline-none transition-all"
                />
              </div>
              <div className="flex flex-col gap-[5px]">
                <label className="text-[12px] font-semibold text-[#0d0d0d] tracking-[0.4px] uppercase">
                  EIN <span className="text-[#888070] font-normal">(optional in MVP)</span>
                </label>
                <input
                  type="text"
                  value={formData.ein}
                  onChange={(e) => setFormData({ ...formData, ein: e.target.value })}
                  placeholder="XX-XXXXXXX"
                  className="border-[1.5px] border-[#d6d0c4] rounded-[6px] px-[12px] py-[9px] text-[14px] bg-[#ede9df] focus:border-[#0d0d0d] focus:bg-white outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-7 pt-5 border-t border-[#d6d0c4]">
              <span className="text-[12px] text-[#888070] font-mono">Step 1 of 5</span>
              <button
                onClick={nextStep}
                className="px-[22px] py-[10px] bg-[#0d0d0d] text-white rounded-[6px] text-[14px] font-semibold hover:bg-[#2a2a2a] transition-all tracking-[0.2px]"
              >
                Continue →
              </button>
            </div>
          </>
        )}

        {/* Step 2: Business Contact */}
        {currentStep === 2 && (
          <>
            <h2 className="font-display font-extrabold text-[26px] tracking-[0.5px] mb-1">Business Contact</h2>
            <p className="text-[#888070] text-[13px] mb-6">How we reach you — and how buyers find you.</p>
            
            <div className="grid grid-cols-2 gap-[16px] mb-[16px]">
              <div className="flex flex-col gap-[5px]">
                <label className="text-[12px] font-semibold text-[#0d0d0d] tracking-[0.4px] uppercase">
                  Business Email <span className="text-[#c8401a]">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@yourcompany.com"
                  className="border-[1.5px] border-[#d6d0c4] rounded-[6px] px-[12px] py-[9px] text-[14px] bg-[#ede9df] focus:border-[#0d0d0d] focus:bg-white outline-none transition-all"
                />
              </div>
              <div className="flex flex-col gap-[5px]">
                <label className="text-[12px] font-semibold text-[#0d0d0d] tracking-[0.4px] uppercase">
                  Phone Number <span className="text-[#c8401a]">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(555) 000-0000"
                  className="border-[1.5px] border-[#d6d0c4] rounded-[6px] px-[12px] py-[9px] text-[14px] bg-[#ede9df] focus:border-[#0d0d0d] focus:bg-white outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-[5px] mb-[16px]">
              <label className="text-[12px] font-semibold text-[#0d0d0d] tracking-[0.4px] uppercase">
                Website URL <span className="text-[#c8401a]">*</span>
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://www.yourcompany.com"
                className="border-[1.5px] border-[#d6d0c4] rounded-[6px] px-[12px] py-[9px] text-[14px] bg-[#ede9df] focus:border-[#0d0d0d] focus:bg-white outline-none transition-all"
              />
            </div>

            <div className="flex flex-col gap-[5px] mb-[16px]">
              <label className="text-[12px] font-semibold text-[#0d0d0d] tracking-[0.4px] uppercase">
                Do you operate a physical store?
              </label>
              <div className="grid grid-cols-2 gap-[8px] mt-1 max-w-[280px]">
                <div
                  onClick={() => setFormData({ ...formData, hasPhysicalStore: 'yes' })}
                  className={`flex items-center gap-[8px] px-[12px] py-[9px] border-[1.5px] rounded-[6px] cursor-pointer transition-all text-[13px] select-none ${
                    formData.hasPhysicalStore === 'yes'
                      ? 'border-[#0d0d0d] bg-[#0d0d0d] text-white'
                      : 'border-[#d6d0c4] bg-[#ede9df] hover:border-[#0d0d0d]'
                  }`}
                >
                  Yes
                </div>
                <div
                  onClick={() => setFormData({ ...formData, hasPhysicalStore: 'no' })}
                  className={`flex items-center gap-[8px] px-[12px] py-[9px] border-[1.5px] rounded-[6px] cursor-pointer transition-all text-[13px] select-none ${
                    formData.hasPhysicalStore === 'no'
                      ? 'border-[#0d0d0d] bg-[#0d0d0d] text-white'
                      : 'border-[#d6d0c4] bg-[#ede9df] hover:border-[#0d0d0d]'
                  }`}
                >
                  No
                </div>
              </div>
            </div>

            {formData.hasPhysicalStore === 'yes' && (
              <div className="grid grid-cols-2 gap-[16px]">
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[12px] font-semibold text-[#0d0d0d] tracking-[0.4px] uppercase">
                    Store Address
                  </label>
                  <input
                    type="text"
                    value={formData.storeAddress}
                    onChange={(e) => setFormData({ ...formData, storeAddress: e.target.value })}
                    placeholder="123 Commerce Blvd"
                    className="border-[1.5px] border-[#d6d0c4] rounded-[6px] px-[12px] py-[9px] text-[14px] bg-[#ede9df] focus:border-[#0d0d0d] focus:bg-white outline-none transition-all"
                  />
                </div>
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[12px] font-semibold text-[#0d0d0d] tracking-[0.4px] uppercase">
                    City / State
                  </label>
                  <input
                    type="text"
                    value={formData.cityState}
                    onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
                    placeholder="Chicago, IL"
                    className="border-[1.5px] border-[#d6d0c4] rounded-[6px] px-[12px] py-[9px] text-[14px] bg-[#ede9df] focus:border-[#0d0d0d] focus:bg-white outline-none transition-all"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between items-center mt-7 pt-5 border-t border-[#d6d0c4]">
              <button
                onClick={prevStep}
                className="px-[22px] py-[10px] border-[1.5px] border-[#d6d0c4] rounded-[6px] text-[14px] font-semibold hover:border-[#0d0d0d] transition-all tracking-[0.2px]"
              >
                ← Back
              </button>
              <span className="text-[12px] text-[#888070] font-mono">Step 2 of 5</span>
              <button
                onClick={nextStep}
                className="px-[22px] py-[10px] bg-[#0d0d0d] text-white rounded-[6px] text-[14px] font-semibold hover:bg-[#2a2a2a] transition-all tracking-[0.2px]"
              >
                Continue →
              </button>
            </div>
          </>
        )}

        {/* Step 3: Inventory Profile */}
        {currentStep === 3 && (
          <>
            <h2 className="font-display text-[26px] tracking-[0.5px] mb-1">Inventory Profile</h2>
            <p className="text-[#888070] text-[13px] mb-6">Help us understand what you sell and how much surplus you typically have.</p>
            
            <div className="flex flex-col gap-[5px] mb-[16px]">
              <label className="text-[12px] font-semibold text-[#0d0d0d] tracking-[0.4px] uppercase">
                Inventory Categories <span className="text-[#c8401a]">*</span> <span className="text-[#888070] font-normal normal-case text-[11px]">Select all that apply</span>
              </label>
              <div className="grid grid-cols-3 gap-[8px] mt-1">
                {['Electronics', 'Apparel', 'Home & Kitchen', 'Sporting Goods', 'Beauty', 'Toys', 'Food & Bev', 'Office', 'Other'].map(cat => (
                  <div
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`flex items-center gap-[7px] px-[10px] py-[8px] border-[1.5px] rounded-[6px] cursor-pointer transition-all text-[13px] select-none ${
                      formData.categories.includes(cat)
                        ? 'border-[#0d0d0d] bg-[#0d0d0d] text-white'
                        : 'border-[#d6d0c4] bg-[#ede9df] hover:border-[#0d0d0d]'
                    }`}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-[5px] mb-[16px]">
              <label className="text-[12px] font-semibold text-[#0d0d0d] tracking-[0.4px] uppercase">
                Condition Types Offered
              </label>
              <div className="grid grid-cols-3 gap-[8px] mt-1">
                {['Overstock', 'Returned', 'Open-box', 'Seasonal', 'Near-expiration'].map(cond => (
                  <div
                    key={cond}
                    onClick={() => toggleCondition(cond)}
                    className={`flex items-center gap-[7px] px-[10px] py-[8px] border-[1.5px] rounded-[6px] cursor-pointer transition-all text-[13px] select-none ${
                      formData.conditions.includes(cond)
                        ? 'border-[#0d0d0d] bg-[#0d0d0d] text-white'
                        : 'border-[#d6d0c4] bg-[#ede9df] hover:border-[#0d0d0d]'
                    }`}
                  >
                    {cond}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-[5px] mb-[16px]">
              <label className="text-[12px] font-semibold text-[#0d0d0d] tracking-[0.4px] uppercase">
                Estimated Monthly Surplus Volume <span className="text-[#c8401a]">*</span>
              </label>
              <div className="grid grid-cols-4 gap-[8px] mt-1">
                {['<$5k', '$5k–$25k', '$25k–$100k', '$100k+'].map(vol => (
                  <div
                    key={vol}
                    onClick={() => setFormData({ ...formData, volume: vol })}
                    className={`flex items-center gap-[8px] px-[12px] py-[9px] border-[1.5px] rounded-[6px] cursor-pointer transition-all text-[13px] select-none ${
                      formData.volume === vol
                        ? 'border-[#0d0d0d] bg-[#0d0d0d] text-white'
                        : 'border-[#d6d0c4] bg-[#ede9df] hover:border-[#0d0d0d]'
                    }`}
                  >
                    {vol}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-[16px]">
              <div className="flex flex-col gap-[5px]">
                <label className="text-[12px] font-semibold text-[#0d0d0d] tracking-[0.4px] uppercase">
                  Typical Discount Range (%)
                </label>
                <input
                  type="text"
                  value={formData.discountRange}
                  onChange={(e) => setFormData({ ...formData, discountRange: e.target.value })}
                  placeholder="e.g. 30–60%"
                  className="border-[1.5px] border-[#d6d0c4] rounded-[6px] px-[12px] py-[9px] text-[14px] bg-[#ede9df] focus:border-[#0d0d0d] focus:bg-white outline-none transition-all"
                />
              </div>
              <div className="flex flex-col gap-[5px]">
                <label className="text-[12px] font-semibold text-[#0d0d0d] tracking-[0.4px] uppercase">
                  Inventory Storage Location
                </label>
                <input
                  type="text"
                  value={formData.storageLocation}
                  onChange={(e) => setFormData({ ...formData, storageLocation: e.target.value })}
                  placeholder="City, State"
                  className="border-[1.5px] border-[#d6d0c4] rounded-[6px] px-[12px] py-[9px] text-[14px] bg-[#ede9df] focus:border-[#0d0d0d] focus:bg-white outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-7 pt-5 border-t border-[#d6d0c4]">
              <button onClick={prevStep} className="px-[22px] py-[10px] border-[1.5px] border-[#d6d0c4] rounded-[6px] text-[14px] font-semibold hover:border-[#0d0d0d] transition-all tracking-[0.2px]">← Back</button>
              <span className="text-[12px] text-[#888070] font-mono">Step 3 of 5</span>
              <button onClick={nextStep} className="px-[22px] py-[10px] bg-[#0d0d0d] text-white rounded-[6px] text-[14px] font-semibold hover:bg-[#2a2a2a] transition-all tracking-[0.2px]">Continue →</button>
            </div>
          </>
        )}

        {/* Step 4: Operational Controls */}
        {currentStep === 4 && (
          <>
            <h2 className="font-display text-[26px] tracking-[0.5px] mb-1">Operational Controls</h2>
            <p className="text-[#888070] text-[13px] mb-6">Define how your inventory should be managed on the platform.</p>
            
            <div className="flex flex-col gap-[5px] mb-5">
              <label className="text-[12px] font-semibold text-[#0d0d0d] tracking-[0.4px] uppercase">
                Minimum Acceptable Recovery Margin (%)
              </label>
              <input
                type="number"
                value={formData.minMargin}
                onChange={(e) => setFormData({ ...formData, minMargin: e.target.value })}
                placeholder="e.g. 35"
                min="0"
                max="100"
                className="border-[1.5px] border-[#d6d0c4] rounded-[6px] px-[12px] py-[9px] text-[14px] bg-[#ede9df] focus:border-[#0d0d0d] focus:bg-white outline-none transition-all max-w-[200px]"
              />
            </div>

            <div className="flex flex-col gap-[5px] mb-[16px]">
              <label className="text-[12px] font-semibold text-[#0d0d0d] tracking-[0.4px] uppercase">
                Allow Dynamic Markdowns?
              </label>
              <div className="grid grid-cols-2 gap-[8px] mt-1 max-w-[280px]">
                <div
                  onClick={() => setFormData({ ...formData, allowDynamicMarkdowns: 'yes' })}
                  className={`flex items-center gap-[8px] px-[12px] py-[9px] border-[1.5px] rounded-[6px] cursor-pointer transition-all text-[13px] select-none ${
                    formData.allowDynamicMarkdowns === 'yes'
                      ? 'border-[#0d0d0d] bg-[#0d0d0d] text-white'
                      : 'border-[#d6d0c4] bg-[#ede9df] hover:border-[#0d0d0d]'
                  }`}
                >
                  Yes
                </div>
                <div
                  onClick={() => setFormData({ ...formData, allowDynamicMarkdowns: 'no' })}
                  className={`flex items-center gap-[8px] px-[12px] py-[9px] border-[1.5px] rounded-[6px] cursor-pointer transition-all text-[13px] select-none ${
                    formData.allowDynamicMarkdowns === 'no'
                      ? 'border-[#0d0d0d] bg-[#0d0d0d] text-white'
                      : 'border-[#d6d0c4] bg-[#ede9df] hover:border-[#0d0d0d]'
                  }`}
                >
                  No
                </div>
              </div>
              <p className="text-[12px] text-[#888070] mt-[7px]">
                Allow the platform to gradually reduce price if inventory doesn't move within set thresholds.
              </p>
            </div>

            <div className="flex flex-col gap-[5px]">
              <label className="text-[12px] font-semibold text-[#0d0d0d] tracking-[0.4px] uppercase">
                Allow Flash Sales?
              </label>
              <div className="grid grid-cols-2 gap-[8px] mt-1 max-w-[280px]">
                <div
                  onClick={() => setFormData({ ...formData, allowFlashSales: 'yes' })}
                  className={`flex items-center gap-[8px] px-[12px] py-[9px] border-[1.5px] rounded-[6px] cursor-pointer transition-all text-[13px] select-none ${
                    formData.allowFlashSales === 'yes'
                      ? 'border-[#0d0d0d] bg-[#0d0d0d] text-white'
                      : 'border-[#d6d0c4] bg-[#ede9df] hover:border-[#0d0d0d]'
                  }`}
                >
                  Yes
                </div>
                <div
                  onClick={() => setFormData({ ...formData, allowFlashSales: 'no' })}
                  className={`flex items-center gap-[8px] px-[12px] py-[9px] border-[1.5px] rounded-[6px] cursor-pointer transition-all text-[13px] select-none ${
                    formData.allowFlashSales === 'no'
                      ? 'border-[#0d0d0d] bg-[#0d0d0d] text-white'
                      : 'border-[#d6d0c4] bg-[#ede9df] hover:border-[#0d0d0d]'
                  }`}
                >
                  No
                </div>
              </div>
              <p className="text-[12px] text-[#888070] mt-[7px]">
                Enable time-limited promotional events on the platform.
              </p>
            </div>

            <div className="flex justify-between items-center mt-7 pt-5 border-t border-[#d6d0c4]">
              <button onClick={prevStep} className="px-[22px] py-[10px] border-[1.5px] border-[#d6d0c4] rounded-[6px] text-[14px] font-semibold hover:border-[#0d0d0d] transition-all tracking-[0.2px]">← Back</button>
              <span className="text-[12px] text-[#888070] font-mono">Step 4 of 5</span>
              <button onClick={nextStep} className="px-[22px] py-[10px] bg-[#0d0d0d] text-white rounded-[6px] text-[14px] font-semibold hover:bg-[#2a2a2a] transition-all tracking-[0.2px]">Continue →</button>
            </div>
          </>
        )}

        {/* Step 5: Legal Agreement */}
        {currentStep === 5 && (
          <>
            <h2 className="font-display text-[26px] tracking-[0.5px] mb-1">Legal Agreement</h2>
            <p className="text-[#888070] text-[13px] mb-6">Please confirm the following before submitting your application.</p>
            
            <div className="flex flex-col gap-[12px] mt-2">
              {[
                { key: 'legal1', text: 'I confirm that I own or am legally authorized to sell the inventory I will be listing on this platform.' },
                { key: 'legal2', text: 'I agree to the Unlimited Perfect Deals platform terms of service, seller agreement, and marketplace policies.' },
                { key: 'legal3', text: 'I understand that approval is required before I can list inventory, and that access will be granted following manual review.' }
              ].map(({ key, text }) => (
                <div
                  key={key}
                  onClick={() => setFormData({ ...formData, [key]: !formData[key as keyof typeof formData] })}
                  className={`flex items-start gap-[10px] p-[12px_14px] border-[1.5px] rounded-[6px] cursor-pointer text-[13px] leading-normal transition-all select-none ${
                    formData[key as keyof typeof formData]
                      ? 'border-[#1e8a52] bg-[#f0faf5]'
                      : 'border-[#d6d0c4] bg-[#ede9df]'
                  }`}
                >
                  <div className={`w-[18px] h-[18px] border-2 rounded-[3px] shrink-0 mt-px flex items-center justify-center text-[11px] transition-all ${
                    formData[key as keyof typeof formData]
                      ? 'border-[#1e8a52] bg-[#1e8a52] text-white'
                      : 'border-[#d6d0c4] bg-white'
                  }`}>
                    {formData[key as keyof typeof formData] && '✓'}
                  </div>
                  <div>{text}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 p-[14px_16px] bg-[#ede9df] border border-[#d6d0c4] rounded-[6px] text-[13px] text-[#888070]">
              ⚠️ Submitting this application will require manual approval. You will be notified by email once a decision has been made.
            </div>

            <div className="flex justify-between items-center mt-7 pt-5 border-t border-[#d6d0c4]">
              <button onClick={prevStep} className="px-[22px] py-[10px] border-[1.5px] border-[#d6d0c4] rounded-[6px] text-[14px] font-semibold hover:border-[#0d0d0d] transition-all tracking-[0.2px]">← Back</button>
              <span className="text-[12px] text-[#888070] font-mono">Step 5 of 5</span>
              <button 
                onClick={handleSubmit} 
                disabled={!formData.legal1 || !formData.legal2 || !formData.legal3}
                className={`px-[22px] py-[10px] rounded-[6px] text-[14px] font-semibold transition-all tracking-[0.2px] ${
                  formData.legal1 && formData.legal2 && formData.legal3
                    ? 'bg-[#1e8a52] text-white hover:bg-[#167343] cursor-pointer'
                    : 'bg-[#d6d0c4] text-[#888070] cursor-not-allowed opacity-60'
                }`}
              >
                Submit Application ✓
              </button>
            </div>
          </>
        )}
      </div>

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        show={toast.show}
        onClose={closeToast}
      />
    </div>
  );
}
