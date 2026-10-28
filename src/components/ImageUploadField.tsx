import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Check, AlertCircle, Link as LinkIcon, RefreshCw } from 'lucide-react';
import { api } from '../services/api.ts';
import { MediaAsset } from '../types/index.ts';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (newUrl: string) => void;
  mediaAssets?: MediaAsset[];
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  helpText?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  mediaAssets = [],
  aspectRatio = 'auto',
  helpText,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setIsError(true);
      setStatusMessage('Please select a valid image file (JPEG, PNG, WebP, SVG).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setIsError(true);
      setStatusMessage('Image size exceeds 10MB limit.');
      return;
    }

    setIsUploading(true);
    setIsError(false);
    setStatusMessage('Uploading to server storage...');

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = reader.result as string;
        const asset = await api.uploadMedia({
          fileName: file.name,
          fileData: base64Data,
          mimeType: file.type,
          altText: label,
        });

        onChange(asset.url);
        setIsError(false);
        setStatusMessage('Image successfully uploaded and updated!');
        setTimeout(() => setStatusMessage(null), 3000);
      } catch (err: any) {
        setIsError(true);
        setStatusMessage(err.message || 'Upload failed. You can paste an image URL directly.');
      } finally {
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    reader.readAsDataURL(file);
  };

  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square w-24 h-24';
      case 'video':
        return 'aspect-video w-36 h-auto';
      case 'portrait':
        return 'aspect-[3/4] w-24 h-auto';
      default:
        return 'w-24 h-24';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-200">
          {label}
        </label>
        {mediaAssets.length > 0 && (
          <button
            type="button"
            onClick={() => setShowMediaPicker(!showMediaPicker)}
            className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
          >
            <ImageIcon className="w-3 h-3" />
            <span>{showMediaPicker ? 'Hide Media Picker' : 'Choose from Uploaded'}</span>
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
        {/* Preview Container */}
        <div className={`relative ${getAspectClass()} rounded-lg overflow-hidden bg-slate-900 border border-slate-700/80 shrink-0 flex items-center justify-center group`}>
          {value ? (
            <img
              src={value}
              alt={label}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                // styled fallback on broken path
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="text-slate-500 text-center p-2">
              <ImageIcon className="w-6 h-6 mx-auto mb-1 opacity-50" />
              <span className="text-[10px] block">No Image</span>
            </div>
          )}

          {/* Quick upload overlay on hover */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-medium gap-1"
          >
            <Upload className="w-4 h-4 text-amber-400" />
            <span>Replace</span>
          </button>
        </div>

        {/* Input & Action controls */}
        <div className="flex-1 w-full space-y-2">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <LinkIcon className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Enter image URL or upload below..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-700/80 rounded-lg text-white font-mono placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Direct Upload Button */}
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg flex items-center gap-1.5 shrink-0 transition-colors disabled:opacity-50"
            >
              {isUploading ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Upload className="w-3.5 h-3.5" />
              )}
              <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Help text or Status message */}
          {statusMessage ? (
            <div className={`text-[11px] flex items-center gap-1.5 ${isError ? 'text-rose-400' : 'text-emerald-400'}`}>
              {isError ? <AlertCircle className="w-3.5 h-3.5 shrink-0" /> : <Check className="w-3.5 h-3.5 shrink-0" />}
              <span>{statusMessage}</span>
            </div>
          ) : (
            <p className="text-[11px] text-slate-400">
              {helpText || 'Upload from your computer (auto-saved to server) or paste any direct image link.'}
            </p>
          )}
        </div>
      </div>

      {/* Media Picker Grid */}
      {showMediaPicker && mediaAssets.length > 0 && (
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <span className="text-[11px] font-semibold text-slate-300 block">
            Click to select from previously uploaded media:
          </span>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-40 overflow-y-auto p-1">
            {mediaAssets.map((asset) => (
              <button
                key={asset.id}
                type="button"
                onClick={() => {
                  onChange(asset.url);
                  setShowMediaPicker(false);
                }}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  value === asset.url ? 'border-amber-400 scale-95 shadow-md' : 'border-slate-800 hover:border-slate-600'
                }`}
                title={asset.name}
              >
                <img
                  src={asset.url}
                  alt={asset.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
