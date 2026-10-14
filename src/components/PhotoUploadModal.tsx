import React, { useState, useRef } from 'react';
import { X, Camera, Upload, Check, Image as ImageIcon, Sparkles, QrCode } from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';
import { processImageFile } from '../utils/imageUtils';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  focus?: 'avatar' | 'banner' | 'esewa_qr' | 'bank_qr';
  defaultFocus?: 'avatar' | 'banner' | 'esewa_qr' | 'bank_qr';
}

export const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({ isOpen, onClose, focus, defaultFocus }) => {
  const { campaign, updateCampaign, updatePaymentCredentials, showToast } = useCampaign();
  const initialFocus = focus || defaultFocus || 'avatar';
  const [selectedType, setSelectedType] = useState<'avatar' | 'banner' | 'esewa_qr' | 'bank_qr'>(initialFocus);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const base64 = await processImageFile(file);
      setPreviewUrl(base64);
      showToast('Image loaded and ready to apply!');
    } catch (err) {
      console.error(err);
      showToast('Failed to process image file.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSave = () => {
    if (!previewUrl) {
      showToast('Please select an image file first.', 'error');
      return;
    }

    if (selectedType === 'avatar') {
      updateCampaign({ creatorAvatar: previewUrl });
      showToast('Profile photo updated successfully!');
    } else if (selectedType === 'banner') {
      updateCampaign({ heroBanner: previewUrl });
      showToast('Cover photo banner updated successfully!');
    } else if (selectedType === 'esewa_qr') {
      updatePaymentCredentials({ esewaQrImage: previewUrl });
      showToast('eSewa QR code image updated successfully!');
    } else if (selectedType === 'bank_qr') {
      updatePaymentCredentials({ bankQrImage: previewUrl });
      showToast('Bank QR code image updated successfully!');
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-tight">
                Upload Real Photos &amp; Official QR Codes
              </h2>
              <p className="text-xs text-slate-300">Update campaign images</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-xs">
          {/* Target Type Selector */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">Select image type to update:</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'avatar', label: 'Bibek Profile Portrait' },
                { id: 'banner', label: 'Cover Banner Photo' },
                { id: 'esewa_qr', label: 'Official eSewa QR Code' },
                { id: 'bank_qr', label: 'Nepal SBI Bank QR Code' }
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setSelectedType(opt.id as any);
                    setPreviewUrl(null);
                  }}
                  className={`p-2.5 rounded-xl border text-left font-semibold transition-all ${
                    selectedType === opt.id
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Upload Dropzone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-emerald-50/20 space-y-2"
          >
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block text-xs">Click to select photo or screenshot</span>
              <span className="text-[11px] text-slate-500">Supports JPG, PNG, WEBP up to 25MB</span>
            </div>
          </div>

          {/* Preview */}
          {previewUrl && (
            <div className="space-y-2">
              <span className="font-semibold text-slate-700 block">Preview:</span>
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 max-h-48 flex items-center justify-center">
                <img src={previewUrl} alt="Preview" className="max-h-48 object-contain" />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 font-semibold hover:bg-slate-200 text-xs transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!previewUrl || isProcessing}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <Check className="w-4 h-4" />
            <span>Apply Image</span>
          </button>
        </div>
      </div>
    </div>
  );
};
