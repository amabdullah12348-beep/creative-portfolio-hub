import React, { useState } from 'react';
import { X, Copy, Check, QrCode as QrIcon, Share2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title?: string;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({ isOpen, onClose, url, title }) => {
  const { ui } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate standard QR code URL using pure public SVG API or inline SVG QR pattern
  const qrSvgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    url
  )}&bgcolor=080d1a&color=f59e0b&margin=1`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-sm w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors"
          aria-label="Close QR dialog"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <QrIcon className="w-4 h-4" />
          <span>{ui.qrCode}</span>
        </div>

        <h3 className="text-lg font-bold font-display text-white mb-1">
          {title || 'Scan to Connect'}
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Scan with your smartphone camera to access instant portfolio &amp; links.
        </p>

        {/* QR Code Container */}
        <div className="p-4 bg-[#080d1a] border border-amber-500/20 rounded-2xl inline-block shadow-inner mx-auto mb-6">
          <img
            src={qrSvgUrl}
            alt="QR Code"
            className="w-48 h-48 rounded-lg"
            onError={(e) => {
              // Fallback styled pattern if offline
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* URL Display and Copy Button */}
        <div className="flex items-center gap-2 p-2 bg-slate-950 border border-slate-800 rounded-lg text-left text-xs mb-4">
          <span className="text-slate-300 truncate flex-1 font-mono text-[11px]">{url}</span>
          <button
            onClick={handleCopy}
            className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold rounded text-[11px] flex items-center gap-1 shrink-0 transition-colors"
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? ui.copied : ui.copyLink}</span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-lg transition-colors"
        >
          {ui.close}
        </button>
      </div>
    </div>
  );
};
