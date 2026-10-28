import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MessageSquare, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { LocalizedString } from '../types/index.ts';

export interface LightboxItem {
  title: LocalizedString | string;
  image: string;
  arabicText?: string;
  scriptStyle?: string;
  medium?: LocalizedString | string;
  dimensions?: string;
  description?: LocalizedString | string;
  category?: string;
  client?: string;
  externalUrl?: string;
  forSale?: boolean;
  commissionAvailable?: boolean;
}

interface LightboxModalProps {
  item: LightboxItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  onCommission?: (title: string) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  onClose,
  onPrev,
  onNext,
  onCommission,
}) => {
  const { t, ui, isRtl } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full max-h-[92vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-white bg-slate-950/70 hover:bg-slate-800 rounded-full transition-colors border border-slate-700/60"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Preview Column */}
        <div className="relative md:w-3/5 bg-black flex items-center justify-center p-4 min-h-[300px] md:min-h-[500px]">
          <img
            src={item.image}
            alt={t(item.title)}
            referrerPolicy="no-referrer"
            className="max-h-[80vh] w-auto max-w-full object-contain rounded-lg shadow-md"
          />

          {/* Navigation Controls */}
          {onPrev && (
            <button
              onClick={onPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/80 hover:bg-amber-400 hover:text-slate-950 text-slate-200 transition-all border border-slate-800"
              aria-label="Previous artwork"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/80 hover:bg-amber-400 hover:text-slate-950 text-slate-200 transition-all border border-slate-800"
              aria-label="Next artwork"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Details Column */}
        <div className="md:w-2/5 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-[85vh] bg-slate-900/90 text-slate-200">
          <div className="space-y-4">
            {/* Category / Script badge */}
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
              {item.scriptStyle && <span>{item.scriptStyle} Script</span>}
              {item.category && <span>{item.category}</span>}
              {item.dimensions && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-400">{item.dimensions}</span>
                </>
              )}
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold font-display text-white tracking-tight">
              {t(item.title)}
            </h3>

            {/* Arabic sacred text snippet */}
            {item.arabicText && (
              <div
                dir="rtl"
                className="p-4 bg-slate-950/70 border border-amber-500/20 rounded-xl text-center text-xl md:text-2xl font-serif text-amber-300 leading-loose tracking-wide select-all"
              >
                {item.arabicText}
              </div>
            )}

            {/* Medium & archival details */}
            {item.medium && (
              <div className="text-xs text-slate-400">
                <span className="font-semibold text-slate-300">{ui.medium}:</span> {t(item.medium)}
              </div>
            )}

            {/* Client */}
            {item.client && (
              <div className="text-xs text-slate-400">
                <span className="font-semibold text-slate-300">{ui.client}:</span> {item.client}
              </div>
            )}

            {/* Description */}
            {item.description && (
              <p className="text-sm text-slate-300 leading-relaxed pt-1">
                {t(item.description)}
              </p>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-6 mt-6 border-t border-slate-800 flex flex-col gap-2.5">
            {onCommission && (
              <button
                onClick={() => {
                  onCommission(t(item.title));
                  onClose();
                }}
                className="w-full py-2.5 px-4 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{ui.commissionArt}</span>
              </button>
            )}

            {item.externalUrl && (
              <a
                href={item.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-4 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 rounded-lg flex items-center justify-center gap-2 transition-colors border border-slate-700/60"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{ui.externalLink}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
