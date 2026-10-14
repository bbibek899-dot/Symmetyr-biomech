import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import { PhotoUploadModal } from './PhotoUploadModal';
import {
  Share2,
  Smartphone,
  Monitor,
  Check,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Camera,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  MessageCircle,
  HelpCircle,
  Video
} from 'lucide-react';

export const TopNavbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    canGoBack,
    canGoForward,
    goBack,
    goForward,
    previewDevice,
    setPreviewDevice,
    campaign,
    showToast,
    setIsDonateModalOpen,
    setIsLegalGuideOpen,
    setIsShareModalOpen
  } = useCampaign();

  const [copiedLink, setCopiedLink] = useState(false);
  const [isPhotoUploadOpen, setIsPhotoUploadOpen] = useState(false);

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Zone 1: Navigation Controls & Wordmark */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Back & Forward Button Controls */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={goBack}
              aria-label="Back"
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                canGoBack
                  ? 'bg-white text-slate-900 shadow-xs hover:bg-slate-50 border border-slate-200/80 active:scale-95'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/60'
              }`}
              title="Go Back to previous page or section"
            >
              <ChevronLeft className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
              <span className="font-bold">Back</span>
            </button>
            <button
              type="button"
              onClick={goForward}
              aria-label="Forward"
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                canGoForward
                  ? 'bg-white text-slate-900 shadow-xs hover:bg-slate-50 border border-slate-200/80 active:scale-95'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/60'
              }`}
              title="Go Forward"
            >
              <span className="font-bold">Forward</span>
              <ChevronRight className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
            </button>
          </div>

          <button
            onClick={() => setCurrentView('public')}
            className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-2 hover:opacity-90 transition-opacity text-left cursor-pointer"
          >
            <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              CF
            </span>
            <span className="hidden sm:inline">CreatorFund</span>
          </button>
        </div>

        {/* Zone 2: Navigation tabs (Desktop & Tablet) */}
        <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
          <button
            onClick={() => setCurrentView('public')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              currentView === 'public'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Campaign Page
          </button>
          <button
            onClick={() => setCurrentView('tracker')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              currentView === 'tracker'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <span>Donation Tracker</span>
          </button>
          <button
            onClick={() => setCurrentView('chat_video')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              currentView === 'chat_video'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-emerald-500" />
            <span>Chat &amp; Video Call</span>
          </button>
          <button
            onClick={() => setCurrentView('faq')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              currentView === 'faq'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
            <span>FAQ</span>
          </button>
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              currentView === 'dashboard'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Creator Ledger
          </button>
          <button
            onClick={() => setCurrentView('social_studio')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              currentView === 'social_studio'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Social Playbook
          </button>
          <button
            onClick={() => setCurrentView('qr_story_generator')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              currentView === 'qr_story_generator'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Story Cards
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {currentView === 'public' && (
            <div className="hidden xl:flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setPreviewDevice('desktop')}
                title="Desktop View"
                className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                  previewDevice === 'desktop' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                title="Mobile Bio-Link View"
                className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                  previewDevice === 'mobile' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          )}

          <button
            onClick={() => setIsPhotoUploadOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors whitespace-nowrap shadow-2xs"
            title="Upload real photos & official bank/eSewa QR screenshots"
          >
            <Camera className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden md:inline">Upload Photos &amp; QR</span>
            <span className="md:hidden">Photos</span>
          </button>

          <button
            onClick={handleShareClick}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-lg transition-all whitespace-nowrap shadow-xs"
            title="Copy clean public link for Messenger, WhatsApp, or iOS/Android"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Copy Link</span>
          </button>

          <button
            onClick={() => setIsDonateModalOpen(true)}
            className="px-3.5 py-2 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] rounded-lg shadow-sm transition-all whitespace-nowrap flex items-center gap-1.5"
          >
            <span>Donate / QR</span>
          </button>
        </div>
      </div>

      {/* Mobile Quick-Navigation Strip (Below Main Header on Mobile & Tablet) */}
      <div className="lg:hidden border-t border-slate-200/80 bg-slate-50/95 px-3 py-2 overflow-x-auto scrollbar-none flex items-center gap-1.5 text-xs">
        <button
          onClick={() => setCurrentView('public')}
          className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors ${
            currentView === 'public'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          Campaign
        </button>
        <button
          onClick={() => setCurrentView('tracker')}
          className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1 ${
            currentView === 'tracker'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          <TrendingUp className="w-3 h-3 text-emerald-600" />
          <span>Tracker</span>
        </button>
        <button
          onClick={() => setCurrentView('chat_video')}
          className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1 ${
            currentView === 'chat_video'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          <Video className="w-3 h-3 text-emerald-600" />
          <span>Chat &amp; Video</span>
        </button>
        <button
          onClick={() => setCurrentView('faq')}
          className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1 ${
            currentView === 'faq'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          <HelpCircle className="w-3 h-3 text-blue-600" />
          <span>FAQ</span>
        </button>
        <button
          onClick={() => setCurrentView('dashboard')}
          className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors ${
            currentView === 'dashboard'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          Ledger
        </button>
      </div>

      <PhotoUploadModal
        isOpen={isPhotoUploadOpen}
        onClose={() => setIsPhotoUploadOpen(false)}
      />
    </header>
  );
};
